// --- Time Helper ---
/**
 * Formats a Unix timestamp (seconds) into a readable time string (e.g., "10:50 AM").
 * @param {number} timestampSeconds - Unix timestamp in seconds.
 * @returns {string} Formatted time string or 'N/A'.
 */
function formatTime(timestampSeconds) {
  if (!timestampSeconds && timestampSeconds !== 0) return "N/A"; // Allow 0 timestamp
  const date = new Date(timestampSeconds * 1000); // Convert seconds to milliseconds
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

/**
 * Formats a Date object into YYYY-MM-DDTHH:mm format for datetime-local input.
 * @param {Date} date - The date object.
 * @returns {string} Formatted string.
 */
function formatDateTimeLocal(date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

const BASE_TIMESTAMP = Math.floor(Date.now() / 1000);

let st_atob = null;
let st_btoa = null;

async function getAB() {
  let st_atobres = await fetch("atob.json");
  let st_btoares = await fetch("btoa.json");
  st_atob = await st_atobres.json();
  st_btoa = await st_btoares.json();
}

async function getDepartures(station, startTime = Date.now() / 1000) {
  console.log(
    `Fetching departures for ${station} after ${formatTime(
      startTime
    )} (${startTime})...`
  );

  if (st_atob == null || st_btoa == null) await getAB();

  station = station.trim().toLowerCase().replaceAll("station", "").trim();
  let stationID = st_btoa[station];
  let URL = `https://anytrip.com.au/api/v3/region/au4/departures/au4%3Aplace_${stationID}?depArr=deparr&limit=150&offset=0&ts=${startTime}&useRedis=true&modes=au4:trains`;
  let res = await fetch(URL);
  let jsres = await res.json();

  let dep = jsres.response.departures.map((v) => {
    let match = /(?<=\(run )[A-Z0-9]{4}(?=\))/.exec(v.vehicle.vehicleModel);
    let run = match ? match[0] : v.vehicle.vehicleModel;
    return {
      headline: v.tripInstance.trip.headsign.headline,
      run,
      tripID: v.tripInstance._path,
      routeName: v.tripInstance.trip.route.name,
      departureTimestamp: 
        v.stopTimeInstance.departure.time + v.stopTimeInstance.departure.delay,
      departureTime: formatTime(
        v.stopTimeInstance.departure.time + v.stopTimeInstance.departure.delay
      ),
    };
  });

  return dep;
}

async function getStops(train) {
  console.log(
    `Fetching stops for train ${train.run} (${
      train.routeName
    }) departing at ${formatTime(train.departureTimestamp)}...`
  );

  if (st_atob == null || st_btoa == null) await getAB();

  const res = await fetch(
    `https://anytrip.com.au/api/v3/region/au4/${train.tripID}`
  );
  const jsonData = await res.json();
  const realtimePattern = jsonData.response.realtimePattern;
  let stops = [];

  for (const stopTime of realtimePattern) {
    const arrivalTime = stopTime.arrival?.time;

    if (typeof arrivalTime === "number") {
      const stationName = stopTime.stop?.name?.station_name;

      if (stationName) {
        stops.push({
          station: stationName.replace(/station/i, "").trim(),
          arrivalTimestamp: arrivalTime,
          arrivalTime: formatTime(arrivalTime),
        });
      } else {
        console.warn(
          "Found an upcoming stop time but couldn't extract station name:",
          stopTime
        );
      }
    }
  }

  stops = stops
    .filter((v) => v.arrivalTimestamp > train.departureTimestamp)
    .sort((a, b) => a.arrivalTimestamp - b.arrivalTimestamp);

  console.log(`Stops for train ${train.run}:`, stops);
  return stops;
}

// --- Application Logic (Multi-Step) ---

const form = document.getElementById("route-form");
const originInput = document.getElementById("origin");
const departureTimeInput = document.getElementById("departure-time"); // Get departure time input
const destinationInput = document.getElementById("destination");
const viaStationsContainer = document.getElementById("via-stations-container");
const addViaBtn = document.getElementById("add-via-btn");
const resultsDiv = document.getElementById("results");
const loadingIndicator = document.getElementById("loading-indicator");
const errorMessageDiv = document.getElementById("error-message");

// --- Initialize Page ---
function initializePage() {
  // Set default departure time to now and min attribute
  const now = new Date();
  const formattedNow = formatDateTimeLocal(now);
  departureTimeInput.value = formattedNow;
  departureTimeInput.min = formattedNow; // Prevent selecting past dates/times
}

// Add Via Station Button Handler
addViaBtn.addEventListener("click", () => {
  const viaCount =
    viaStationsContainer.querySelectorAll(".via-station-row").length;
  const newViaRow = document.createElement("div");
  newViaRow.classList.add("via-station-row");
  newViaRow.innerHTML = `
                <input type="text" name="via_station_${viaCount}" placeholder="Via Station Name" required
                       class="w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm">
                <input type="number" name="wait_time_${viaCount}" placeholder="Wait" min="0" value="10" required
                       class="px-3 py-1.5 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm">
                <span class="text-sm text-gray-600">minutes</span>
                <button type="button" class="remove-via-btn bg-red-500 hover:bg-red-600 text-white text-xs font-bold py-1 px-2 rounded-md ml-auto">&times;</button>
            `;
  viaStationsContainer.appendChild(newViaRow);

  // Add event listener to the new remove button
  newViaRow.querySelector(".remove-via-btn").addEventListener("click", (e) => {
    e.target.closest(".via-station-row").remove();
  });
});

// Form Submit Handler
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  clearResults();
  clearError();
  showLoading(true);

  const origin = originInput.value.trim();
  const destination = destinationInput.value.trim();
  const departureTimeValue = departureTimeInput.value; // Get departure time value

  // Parse departure time
  let initialDepartureTimestamp;
  try {
    initialDepartureTimestamp = Math.floor(
      new Date(departureTimeValue).getTime() / 1000
    );
    if (isNaN(initialDepartureTimestamp)) {
      throw new Error("Invalid date/time format.");
    }
    if (initialDepartureTimestamp * 1000 < new Date().setSeconds(0, 0)) {
      console.warn(
        "Selected departure time is in the past. Searching from now."
      );
      // initialDepartureTimestamp = Math.floor(Date.now() / 1000); // Or keep user's value if API handles past times
    }
  } catch (e) {
    showError("Invalid departure time selected.");
    showLoading(false);
    return;
  }

  const viaPoints = [];
  viaStationsContainer.querySelectorAll(".via-station-row").forEach((row) => {
    // Use querySelectorAll to find inputs within the row, more robust than relying on index in name
    const stationInput = row.querySelector('input[type="text"]');
    const waitInput = row.querySelector('input[type="number"]');
    if (stationInput && waitInput && stationInput.value.trim()) {
      viaPoints.push({
        station: stationInput.value.trim(),
        waitTimeMinutes: parseInt(waitInput.value, 10) || 0,
      });
    }
  });

  // Construct the full station sequence
  const journeyStations = [
    { station: origin, waitTimeMinutes: 0 }, // Origin has 0 wait time
    ...viaPoints,
    { station: destination, waitTimeMinutes: 0 }, // Destination has 0 wait time
  ];

  // Basic validation
  if (!origin || !destination) {
    showError("Please enter both origin and destination stations.");
    showLoading(false);
    return;
  }

  try {
    const fullRoute = [];
    let currentDepartureTime = initialDepartureTimestamp;
    let possible = true;

    for (let i = 0; i < journeyStations.length - 1; i++) {
      const segmentOrigin = journeyStations[i].station;
      const segmentDestination = journeyStations[i + 1].station;
      const waitTimeAtDestination = journeyStations[i + 1].waitTimeMinutes;

      console.log(
        `Finding segment: ${segmentOrigin} -> ${segmentDestination} (earliest departure: ${formatTime(
          currentDepartureTime
        )})`
      );

      const segmentResult = await findDirectRouteSegment(
        segmentOrigin,
        segmentDestination,
        currentDepartureTime
      );

      if (segmentResult) {
        fullRoute.push(segmentResult);
        // Calculate next departure time: arrival time + wait time (if any)
        currentDepartureTime =
          segmentResult.arrivalTimestamp + waitTimeAtDestination * 60;
        console.log(
          `Segment found. Next earliest departure from ${segmentDestination} after waiting ${waitTimeAtDestination} min: ${formatTime(
            currentDepartureTime
          )}`
        );
      } else {
        // Construct a more informative error message
        const searchStartTimeStr = formatTime(
          i === 0
            ? initialDepartureTimestamp
            : fullRoute[i - 1].arrivalTimestamp +
                journeyStations[i].waitTimeMinutes * 60
        );
        showError(
          `No direct train found for segment: ${segmentOrigin} to ${segmentDestination} departing after ${searchStartTimeStr}.`
        );
        possible = false;
        break; // Stop searching if a segment fails
      }
    }

    if (possible) {
      displayMultiStepRoute(fullRoute, journeyStations);
    }
  } catch (error) {
    console.error("Error finding multi-step route:", error);
    showError(
      `An error occurred: ${error.message || "Could not fetch train data."}`
    );
  } finally {
    showLoading(false);
  }
});

/**
 * Finds the *first available* direct train for a single segment of the journey.
 * @param {string} originStation
 * @param {string} destinationStation
 * @param {number} earliestDepartureTime - Unix timestamp (seconds)
 * @returns {Promise<object|null>} Route details or null if no direct route found.
 */
async function findDirectRouteSegment(
  originStation,
  destinationStation,
  earliestDepartureTime
) {
  const departures = await getDepartures(originStation, earliestDepartureTime);

  if (!departures || departures.length === 0) {
    return null; // No departures found from origin after the required time
  }

  // Check departures sequentially for the first one that stops at the destination
  for (const train of departures) {
    const stops = await getStops(train);
    const destinationStop = stops.find(
      (stop) =>
        stop.station.toLowerCase() === destinationStation.toLowerCase() &&
        stop.arrivalTimestamp !== null // Ensure it has an arrival time
    );

    if (destinationStop) {
      // Found the first valid train for this segment
      return {
        train,
        trainId: train.run,
        trainName: train.headline,
        departureStation: originStation,
        departureTime: train.departureTime,
        departureTimestamp: train.departureTimestamp,
        arrivalStation: destinationStation,
        arrivalTime: destinationStop.arrivalTime,
        arrivalTimestamp: destinationStop.arrivalTimestamp,
      };
    }
  }

  return null; // No train found for this segment
}

/** Displays the multi-step route results. */
function displayMultiStepRoute(routeSegments, journeyStations) {
  if (!routeSegments || routeSegments.length === 0) {
    // Error message is now shown in the main handler if a segment fails
    // Only show this if the loop completed but somehow `fullRoute` is empty (shouldn't happen with current logic)
    showResults(
      `<p class="text-center text-gray-600">Could not find a complete route.</p>`
    );
    return;
  }

  let html = `<h2 class="text-xl font-semibold mb-4 text-gray-800">Your Journey Plan:</h2><div class="space-y-5">`;

  routeSegments.forEach((segment, index) => {
    html += `
                    <div class="bg-gray-50 p-4 rounded-md border border-gray-200 shadow-sm">
                        <p class="text-sm font-medium text-gray-500 mb-2">Step ${
                          index + 1
                        }: ${segment.departureStation} to ${
      segment.arrivalStation
    }</p>
                        <div class="font-medium text-blue-700">${
                          segment.trainName
                        } (${segment.trainId} - ${segment.train.routeName})</div>
                        <div>Departs from ${
                          segment.departureStation
                        }: <span class="font-semibold">${
      segment.departureTime
    }</span></div>
                        <div>Arrives at ${
                          segment.arrivalStation
                        }: <span class="font-semibold">${
      segment.arrivalTime
    }</span></div>
                    </div>
                `;
    // Add wait time information if it's not the last segment
    if (index < routeSegments.length - 1) {
      const waitTime = journeyStations[index + 1].waitTimeMinutes;
      if (waitTime > 0) {
        html += `
                        <div class="text-center my-2 text-sm text-gray-600 italic">
                            --- Wait ${waitTime} minutes at ${segment.arrivalStation} ---
                        </div>`;
      } else {
        html += `<div class="text-center my-1 text-sm text-gray-400">--- Connection ---</div>`;
      }
    }
  });

  html += `</div>`;
  // Add total journey time estimation
  const startTime = routeSegments[0].departureTimestamp;
  const endTime = routeSegments[routeSegments.length - 1].arrivalTimestamp;
  if (startTime && endTime && endTime >= startTime) {
    // Ensure end time is valid
    const durationMinutes = Math.round((endTime - startTime) / 60);
    html += `<p class="mt-4 text-center font-medium text-gray-700">Estimated total journey time: ${durationMinutes} minutes.</p>`;
  } else {
    html += `<p class="mt-4 text-center text-sm text-gray-500">Could not calculate total journey time.</p>`;
  }

  showResults(html);
}

// --- Utility Functions (showLoading, showError, clearError, clearResults, showResults) ---

function clearResults() {
  resultsDiv.innerHTML =
    '<p class="text-center text-gray-500">Enter origin, destination, departure time, and optional via points to find routes.</p>'; // Reset placeholder
  resultsDiv.classList.remove(
    "p-4",
    "border",
    "border-gray-200",
    "rounded-md",
    "bg-gray-50"
  );
}

function showLoading(isLoading) {
  const button = form.querySelector('button[type="submit"]');
  const buttonText = button.querySelector("span");
  if (isLoading) {
    loadingIndicator.classList.remove("hidden");
    buttonText.textContent = "Searching...";
    button.disabled = true;
  } else {
    loadingIndicator.classList.add("hidden");
    buttonText.textContent = "Find Route";
    button.disabled = false;
  }
}

function showError(message) {
  errorMessageDiv.textContent = message;
  errorMessageDiv.classList.remove("hidden");
  // Clear results when showing a new error
  resultsDiv.innerHTML = "";
  resultsDiv.classList.remove(
    "p-4",
    "border",
    "border-gray-200",
    "rounded-md",
    "bg-gray-50"
  );
}

function clearError() {
  errorMessageDiv.textContent = "";
  errorMessageDiv.classList.add("hidden");
}

function showResults(htmlContent) {
  resultsDiv.innerHTML = htmlContent;
  // Add styling only if it's not the placeholder message
  if (!htmlContent.includes("Enter origin, destination")) {
    resultsDiv.classList.add(
      "p-4",
      "border",
      "border-gray-200",
      "rounded-md",
      "bg-gray-50"
    );
  } else {
    resultsDiv.classList.remove(
      "p-4",
      "border",
      "border-gray-200",
      "rounded-md",
      "bg-gray-50"
    );
  }
}

// --- Initialize Page on Load ---
document.addEventListener("DOMContentLoaded", initializePage);
