// --- Time Helper ---
/**
 * Formats a Unix timestamp (seconds) into a readable time string (e.g., "10:50 AM").
 * @param {number} timestampSeconds - Unix timestamp in seconds.
 * @returns {string} Formatted time string or 'N/A'.
 */
function formatTime(timestampSeconds) {
  if (!timestampSeconds && timestampSeconds !== 0) return "??:??"; // Allow 0 timestamp
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

  /*
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
    */

  let dep = await findUpcomingTrainDepartures(
    `place_${stationID}`,
    150,
    startTime
  );

  return dep;
}

async function getStops(train, filter = true) {
  console.log(
    `Fetching stops for train ${train.run} (${
      train.routeName
    }) departing at ${formatTime(train.departureTimestamp)}...`
  );

  if (st_atob == null || st_btoa == null) await getAB();

  /*
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
    */

  let stops = await getTripDetails(train.tripId, filter);

  if (filter)
    stops = stops
      .filter((v) => v.arrivalTimestamp > train.departureTimestamp)
      .sort((a, b) => a.arrivalTimestamp - b.arrivalTimestamp);

  console.log(`Stops for train ${train.run}:`, stops);
  return stops;
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
    "bg-gray-50",
    "mt-4" // Remove styles, including margin-top
  );
}

function showLoading(isLoading) {
  const button = form.querySelector('button[type="submit"]');
  // Check if button exists before accessing properties
  if (!button) return;
  const buttonText = button.querySelector("span"); // Assuming the text is in a span

  if (isLoading) {
    loadingIndicator.classList.remove("hidden");
    if (buttonText) buttonText.textContent = "Searching...";
    button.disabled = true;
    button.classList.add("opacity-50", "cursor-not-allowed"); // Add disabled styles
  } else {
    loadingIndicator.classList.add("hidden");
    if (buttonText) buttonText.textContent = "Find Route";
    button.disabled = false;
    button.classList.remove("opacity-50", "cursor-not-allowed"); // Remove disabled styles
  }
}

function showError(message) {
  errorMessageDiv.textContent = message;
  errorMessageDiv.classList.remove("hidden", "opacity-0"); // Make visible
  errorMessageDiv.classList.add(
    "p-3",
    "bg-red-100",
    "border",
    "border-red-400",
    "text-red-700",
    "rounded-md",
    "mb-4"
  ); // Add styling
  // Clear results when showing a new error
  clearResults();
}

function clearError() {
  errorMessageDiv.textContent = "";
  errorMessageDiv.classList.add("hidden", "opacity-0"); // Hide it
  errorMessageDiv.classList.remove(
    "p-3",
    "bg-red-100",
    "border",
    "border-red-400",
    "text-red-700",
    "rounded-md",
    "mb-4"
  ); // Remove styles
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
      "bg-white",
      "mt-4",
      "shadow-sm" // Use bg-white for results, add margin-top
    );
    resultsDiv.classList.remove("text-gray-500"); // Remove placeholder text color if needed
  } else {
    // Ensure placeholder styles are correct
    resultsDiv.classList.add("text-center", "text-gray-500");
    resultsDiv.classList.remove(
      "p-4",
      "border",
      "border-gray-200",
      "rounded-md",
      "bg-white",
      "mt-4",
      "shadow-sm" // Remove result styles
    );
  }
}

// --- Helper Function for Formatting Durations ---

/**
 * Formats a duration in minutes into a string like "X hours, Y mins".
 * @param {number} totalMinutes - The duration in total minutes.
 * @returns {string} The formatted duration string.
 */
function formatDuration(totalMinutes) {
  if (isNaN(totalMinutes) || totalMinutes < 0) {
    return "Invalid duration";
  }
  if (totalMinutes === 0) {
    return "0 mins";
  }

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  let durationString = "";
  if (hours > 0) {
    durationString += `${hours} hour${hours > 1 ? "s" : ""}`;
  }
  if (minutes > 0) {
    if (hours > 0) {
      durationString += ", "; // Add comma if hours are also present
    }
    durationString += `${minutes} min${minutes > 1 ? "s" : ""}`;
  }
  return durationString;
}
