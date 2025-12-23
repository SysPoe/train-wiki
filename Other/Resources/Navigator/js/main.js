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
  // Assume formatDateTimeLocal exists and formats correctly for the input type="datetime-local"
  const formattedNow = formatDateTimeLocal(now);
  departureTimeInput.value = formattedNow;
  departureTimeInput.min = formattedNow; // Prevent selecting past dates/times
}

// Add Via Station Button Handler
addViaBtn.addEventListener("click", () => {
  const viaCount =
    viaStationsContainer.querySelectorAll(".via-station-row").length;
  const newViaRow = document.createElement("div");
  newViaRow.classList.add(
    "via-station-row",
    "flex",
    "items-center",
    "space-x-2",
    "mb-2"
  ); // Added flex for better alignment
  newViaRow.innerHTML = `
        <input type="text" name="via_station_${viaCount}" placeholder="Via Station Name" required
               class="flex-grow px-3 py-1.5 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm">
        <input type="number" name="wait_time_${viaCount}" placeholder="Wait" min="0" value="10" required
               class="w-20 px-3 py-1.5 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm">
        <span class="text-sm text-gray-600">minutes</span>
        <button type="button" class="remove-via-btn bg-red-500 hover:bg-red-600 text-white text-xs font-bold py-1 px-2 rounded-md">&times;</button>
    `;
  viaStationsContainer.appendChild(newViaRow);

  // Add event listener to the new remove button
  newViaRow.querySelector(".remove-via-btn").addEventListener("click", (e) => {
    e.target.closest(".via-station-row").remove();
    // Optional: Renumber inputs if needed, though form submission usually handles gaps
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
    // Ensure the input value is valid before creating a Date object
    if (!departureTimeValue) {
      throw new Error("Departure time is missing.");
    }
    const departureDate = new Date(departureTimeValue);
    if (isNaN(departureDate.getTime())) {
      // Check if date is valid
      throw new Error("Invalid date/time format.");
    }
    initialDepartureTimestamp = Math.floor(departureDate.getTime() / 1000);

    // Check if the selected time is in the past (allowing for a small buffer like 1 minute)
    if (initialDepartureTimestamp * 1000 < Date.now() - 60000) {
      console.warn(
        "Selected departure time is in the past. Results might be based on the next available service."
      );
      // Depending on API behavior, you might want to adjust the timestamp or just let the API handle it.
      // initialDepartureTimestamp = Math.floor(Date.now() / 1000); // Option: Search from now
    }
  } catch (e) {
    showError(`Invalid departure time: ${e.message}`);
    showLoading(false);
    return;
  }

  const viaPoints = [];
  viaStationsContainer.querySelectorAll(".via-station-row").forEach((row) => {
    const stationInput = row.querySelector('input[type="text"]');
    const waitInput = row.querySelector('input[type="number"]');
    if (stationInput && waitInput && stationInput.value.trim()) {
      const waitTime = parseInt(waitInput.value, 10);
      viaPoints.push({
        station: stationInput.value.trim(),
        // Ensure wait time is non-negative, default to 0 if parsing fails or value is negative
        waitTimeMinutes: !isNaN(waitTime) && waitTime >= 0 ? waitTime : 0,
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
  if (journeyStations.length < 2) {
    showError("Journey requires at least an origin and a destination.");
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
      // Wait time applies *after* arriving at the *next* station (journeyStations[i+1])
      // before departing for the subsequent segment.
      const waitTimeAtNextStation = journeyStations[i + 1].waitTimeMinutes;

      // Log the search attempt for this segment
      // Assume formatTime exists and formats the timestamp correctly
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
        // Calculate next departure time: arrival time of this segment + wait time at the arrival station
        currentDepartureTime =
          segmentResult.arrivalTimestamp + waitTimeAtNextStation * 60;

        // Log segment found and next departure time
        console.log(
          `Segment found. Arrives at ${segmentResult.arrivalStation} at ${segmentResult.arrivalTime}. ` +
            `Waiting ${formatDuration(waitTimeAtNextStation)}. ` + // Use formatted duration
            `Next earliest departure from ${segmentDestination}: ${formatTime(
              currentDepartureTime
            )}`
        );
      } else {
        // Construct a more informative error message using the intended departure time for the failed segment
        const searchStartTimeStr = formatTime(currentDepartureTime); // The time we started searching for this segment
        showError(
          `No direct train found for segment: ${segmentOrigin} to ${segmentDestination} departing after ${searchStartTimeStr}.`
        );
        possible = false;
        break; // Stop searching if a segment fails
      }
    }

    if (possible && fullRoute.length > 0) {
      // Ensure route is possible and has segments
      displayMultiStepRoute(fullRoute, journeyStations);
    } else if (possible && fullRoute.length === 0) {
      // This case might happen if origin and destination are the same and no via points exist
      showError(
        "Origin and destination are the same or no valid segments could be planned."
      );
    }
    // If !possible, the error is already shown within the loop
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
 * @param {string} originStation - Name of the origin station for this segment.
 * @param {string} destinationStation - Name of the destination station for this segment.
 * @param {number} earliestDepartureTime - Unix timestamp (seconds) for the earliest departure.
 * @returns {Promise<object|null>} Route details object or null if no direct route found.
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
    const ufstops = await getStops(train, false);
    const destinationStop = stops.find(
      (stop) =>
        stop.station.toLowerCase().split("station")[0].trim() ===
          destinationStation.toLowerCase().split("station")[0].trim() &&
        stop.arrivalTimestamp !== null // Ensure it has an arrival time
    );
    departureStation = ufstops.find(
      (stop) =>
        stop.station.toLowerCase().split("station")[0].trim() ===
          originStation.toLowerCase().split("station")[0].trim() &&
        stop.arrivalTimestamp !== null // Ensure it has an arrival time
    ).station;

    if (destinationStop) {
      // Found the first valid train for this segment
      return {
        train,
        trainId: train.run,
        trainName: train.headline,
        routeName: train.routeName,
        departureStation,
        departureTime: train.departureTime,
        departureTimestamp: train.departureTimestamp,
        arrivalStation: destinationStop.station,
        arrivalTime: destinationStop.arrivalTime,
        arrivalTimestamp: destinationStop.arrivalTimestamp,
      };
    }
  }

  console.log(
    `No direct train found from ${originStation} to ${destinationStation} meeting the criteria.`
  );
  return null; // No suitable train found for this segment
}

/** Displays the multi-step route results. */
function displayMultiStepRoute(routeSegments, journeyStations) {
  if (!routeSegments || routeSegments.length === 0) {
    showResults(
      `<p class="text-center text-gray-600">Could not find a complete route.</p>`
    );
    return;
  }

  let html = `<h2 class="text-xl font-semibold mb-4 text-gray-800">Your Journey Plan:</h2><div class="space-y-5">`;
  let totalWaitMinutes = 0; // Keep track of total wait time

  routeSegments.forEach((segment, index) => {
    // Calculate segment duration
    const segmentDurationSeconds =
      segment.arrivalTimestamp - segment.departureTimestamp;
    const segmentDurationMinutes = Math.round(segmentDurationSeconds / 60);
    const formattedSegmentDuration = formatDuration(segmentDurationMinutes); // Format the duration

    html += `
        <div class="bg-gray-50 p-4 rounded-md border border-gray-200 shadow-sm">
            <div class="flex justify-between items-baseline mb-2">
                 <p class="text-sm font-medium text-gray-500">Step ${
                   index + 1
                 }: ${segment.departureStation.split("station")[0].trim()} to ${
      segment.arrivalStation.split("station")[0].trim()
    }</p>
                 <p class="text-sm text-gray-600 font-medium">Travel time: ${formattedSegmentDuration}</p>
            </div>
            <div class="font-medium text-blue-700">${segment.trainName} (${
      segment.trainId
    } - ${segment.routeName || "Unknown Route"})</div>
            <div>Departs from ${
              segment.departureStation
            }: <span class="font-semibold">${segment.departureTime}</span></div>
            <div>Arrives at ${
              segment.arrivalStation
            }: <span class="font-semibold">${segment.arrivalTime}</span></div>
        </div>
    `;

    // Add wait time information if it's not the last segment
    if (index < routeSegments.length - 1) {
      const waitTime = Math.round(
        (routeSegments[index + 1].departureTimestamp -
          segment.arrivalTimestamp) /
          60
      );
      console.log(
        routeSegments[index + 1].departureTimestamp,
        segment.arrivalTimestamp
      );
      totalWaitMinutes += waitTime; // Add to total wait time
      const formattedWaitTime = formatDuration(waitTime); // Format the wait time

      if (waitTime > 0) {
        html += `
            <div class="text-center my-2 text-sm text-gray-600 italic">
                --- Wait ${formattedWaitTime} at ${segment.arrivalStation} ---
            </div>`;
      } else {
        // Indicate a direct connection if wait time is 0
        html += `<div class="text-center my-1 text-sm text-gray-400">--- Direct Connection ---</div>`;
      }
    }
  });

  html += `</div>`; // Close space-y-5 div

  // Calculate and display total journey time
  const firstDepartureTime = routeSegments[0].departureTimestamp;
  const lastArrivalTime =
    routeSegments[routeSegments.length - 1].arrivalTimestamp;

  if (
    firstDepartureTime &&
    lastArrivalTime &&
    lastArrivalTime >= firstDepartureTime
  ) {
    const totalDurationSeconds = lastArrivalTime - firstDepartureTime;
    const totalDurationMinutes = Math.round(totalDurationSeconds / 60);
    const formattedTotalDuration = formatDuration(totalDurationMinutes); // Format total duration
    const formattedTotalWait = formatDuration(totalWaitMinutes); // Format total wait time

    html += `
        <div class="mt-5 pt-4 border-t border-gray-200 text-center">
             <p class="font-medium text-gray-700">Estimated total journey time: ${formattedTotalDuration}</p>
             <p class="text-sm text-gray-500">(Including ${formattedTotalWait} of waiting time)</p>
        </div>
    `;
  } else {
    html += `<p class="mt-4 text-center text-sm text-gray-500">Could not calculate total journey time.</p>`;
  }

  showResults(html);
}

// --- Initialize Page on Load ---
document.addEventListener("DOMContentLoaded", initializePage);
