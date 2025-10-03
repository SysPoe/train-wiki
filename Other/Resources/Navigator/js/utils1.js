/**
 * GTFS Console API
 *
 * Provides functions to query upcoming train departures and trip details
 * directly from the browser's developer console.
 *
 * Assumes GTFS files (stops.txt, stop_times.txt, trips.txt, routes.txt,
 * calendar.txt, calendar_dates.txt) are located in './SEQ_GTFS/'.
 *
 * Functions callable from console:
 * - findUpcomingTrainDepartures(placeCode, maxDepartures, timestampSeconds = null)
 * - getTripDetails(tripId)
 */

(function () {
  // IIFE to avoid polluting global scope unnecessarily, except for API functions

  // --- Configuration ---
  const GTFS_FOLDER_PATH = "./SEQ_GTFS"; // Relative path to the GTFS files
  const DEFAULT_MAX_DEPARTURES_TO_SHOW = 25; // Default max number of departures to return
  const TRAIN_ROUTE_TYPE = "2"; // GTFS route_type for Rail

  // --- GTFS Data Storage ---
  let gtfsData = null; // Cache for loaded and processed GTFS data
  let isLoading = false; // Flag to prevent concurrent loading
  let loadPromise = null; // Store the promise for ongoing load

  // --- Helper Functions ---

  /**
   * Parses CSV text into an array of objects, handling quoted fields.
   * Assumes the first row is the header.
   * @param {string} text - The CSV text content.
   * @returns {Array<Object>} Array of objects representing rows.
   */
  function parseCSV(text) {
    const lines = text.trim().split("\n");
    if (lines.length < 2) return [];

    const header = lines[0].split(",").map((h) => h.trim());
    const data = [];
    const csvRegex = /(?:,|\n|^)("(?:(?:"")*[^"]*)*"|[^",\n]*|(?:\n))/g; // Handles quoted fields

    for (let i = 1; i < lines.length; i++) {
      const row = {};
      let values = [];
      let match;
      let currentLine = lines[i];
      if (!currentLine) continue; // Skip empty lines

      csvRegex.lastIndex = 0; // Reset regex state

      while ((match = csvRegex.exec(currentLine)) !== null) {
        let value = match[1];
        if (value === undefined || value === null) value = "";
        if (value.startsWith('"') && value.endsWith('"')) {
          value = value.slice(1, -1).replace(/""/g, '"');
        }
        values.push(value.trim());
      }
      if (currentLine.endsWith(",")) values.push(""); // Handle trailing comma

      if (values.length === 0 || values.every((v) => v === "")) continue; // Skip empty rows

      if (values.length <= header.length) {
        header.forEach((key, index) => {
          row[key] = values[index] !== undefined ? values[index] : "";
        });
        data.push(row);
      } else {
        console.warn(
          `Skipping line ${i + 1}: has more columns (${
            values.length
          }) than header (${header.length}). Line: ${currentLine}`
        );
      }
    }
    return data;
  }

  /**
   * Fetches a GTFS file and parses it as CSV.
   * @param {string} filename - The name of the GTFS file (e.g., "stops.txt").
   * @returns {Promise<Array<Object>>} Promise resolving to the parsed data.
   */
  async function loadGTFSFile(filename) {
    const filePath = `${GTFS_FOLDER_PATH}/${filename}`;
    try {
      const response = await fetch(filePath);
      if (!response.ok) {
        throw new Error(
          `HTTP error! status: ${response.status} for ${filename}`
        );
      }
      const text = await response.text();
      console.log(`Successfully fetched ${filename}`); // Log success
      return parseCSV(text);
    } catch (error) {
      console.error(`Failed to load or parse ${filename}:`, error);
      throw new Error(
        `Could not load ${filename}. Ensure it exists at ${filePath}.`
      );
    }
  }

  /**
   * Loads and processes all necessary GTFS files. Caches the result.
   * Handles concurrent requests to prevent multiple loads.
   * @returns {Promise<Object>} Promise resolving to an object containing all parsed & indexed GTFS data.
   */
  function loadAllGTFSData() {
    // If data is already loaded, return it immediately
    if (gtfsData) {
      return Promise.resolve(gtfsData);
    }
    // If loading is already in progress, return the existing promise
    if (isLoading && loadPromise) {
      return loadPromise;
    }

    // Start loading
    isLoading = true;
    console.log("Loading and processing GTFS data...");

    loadPromise = (async () => {
      try {
        // Load files in parallel
        const [stops, stopTimes, trips, routes, calendar, calendarDates] =
          await Promise.all([
            loadGTFSFile("stops.txt"),
            loadGTFSFile("stop_times.txt"),
            loadGTFSFile("trips.txt"),
            loadGTFSFile("routes.txt"),
            loadGTFSFile("calendar.txt"),
            loadGTFSFile("calendar_dates.txt"),
          ]);

        // --- Data Preprocessing & Indexing ---
        console.log("Indexing GTFS data...");
        const stopsMap = new Map(stops.map((s) => [s.stop_id, s]));
        const stopsByParentMap = stops.reduce((acc, stop) => {
          if (stop.parent_station) {
            if (!acc.has(stop.parent_station)) acc.set(stop.parent_station, []);
            acc.get(stop.parent_station).push(stop);
          }
          return acc;
        }, new Map());
        const tripsMap = new Map(trips.map((t) => [t.trip_id, t]));
        const routesMap = new Map(routes.map((r) => [r.route_id, r]));
        const calendarMap = new Map(calendar.map((c) => [c.service_id, c]));
        const calendarDatesMap = calendarDates.reduce((acc, cd) => {
          const key = `${cd.service_id}_${cd.date}`;
          acc.set(key, cd.exception_type);
          return acc;
        }, new Map());

        // Pre-process stopTimes: link route/trip info and filter unnecessary ones
        const enrichedStopTimes = stopTimes
          .map((st) => {
            const trip = tripsMap.get(st.trip_id);
            if (!trip) return null;
            const route = routesMap.get(trip.route_id);
            if (!route) return null;
            // Keep only necessary fields + enriched data
            return {
              trip_id: st.trip_id,
              arrival_time: st.arrival_time,
              departure_time: st.departure_time,
              stop_id: st.stop_id,
              stop_sequence: parseInt(st.stop_sequence, 10), // Ensure numeric sequence
              pickup_type: st.pickup_type,
              drop_off_type: st.drop_off_type,
              service_id: trip.service_id,
              trip_headsign: trip.trip_headsign,
              route_id: trip.route_id, // Keep route_id for filtering
              route_type: route.route_type, // Add route_type
              route_short_name: route.route_short_name,
              route_long_name: route.route_long_name,
            };
          })
          .filter((st) => st !== null && !isNaN(st.stop_sequence)) // Remove nulls and ensure sequence is a number
          .sort((a, b) => a.stop_sequence - b.stop_sequence); // Sort by sequence for later efficiency

        // Group stopTimes by trip_id for faster lookup in getTripDetails
        const stopTimesByTripId = enrichedStopTimes.reduce((acc, st) => {
          if (!acc.has(st.trip_id)) acc.set(st.trip_id, []);
          acc.get(st.trip_id).push(st); // Assumes already sorted by sequence
          return acc;
        }, new Map());

        // Cache the processed and indexed data
        gtfsData = {
          stops: stopsMap,
          stopsByParent: stopsByParentMap,
          stopTimes: enrichedStopTimes, // Keep the flat, enriched list for departure finding
          stopTimesByTripId: stopTimesByTripId, // Indexed by trip_id for detail lookup
          // Keep base maps for potential lookups if needed (e.g., isServiceRunning)
          trips: tripsMap,
          routes: routesMap,
          calendar: calendarMap,
          calendarDates: calendarDatesMap,
        };

        console.log("GTFS Data Loaded and Processed Successfully.");
        isLoading = false;
        return gtfsData;
      } catch (error) {
        console.error("FATAL: GTFS data loading failed.", error);
        gtfsData = null; // Clear potentially partial cache
        isLoading = false;
        loadPromise = null; // Reset promise so retry is possible
        throw error; // Re-throw to calling function
      }
    })(); // Immediately invoke the async function

    return loadPromise;
  }

  /**
   * Checks if a service is running on a specific date using pre-indexed data.
   * @param {string} serviceId - The service_id to check.
   * @param {Date} date - The date to check against.
   * @param {Object} data - The loaded GTFS data object.
   * @returns {boolean} True if the service is running, false otherwise.
   */
  function isServiceRunning(serviceId, date, data) {
    const yyyymmdd =
      date.getFullYear() +
      ("0" + (date.getMonth() + 1)).slice(-2) +
      ("0" + date.getDate()).slice(-2);
    const dayOfWeek = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ][date.getDay()];

    // 1. Check calendar_dates Map for exceptions
    const exceptionKey = `${serviceId}_${yyyymmdd}`;
    if (data.calendarDates.has(exceptionKey)) {
      return data.calendarDates.get(exceptionKey) === "1"; // Runs only if exception type is 1 (added)
    }

    // 2. Check regular calendar Map
    const calendarEntry = data.calendar.get(serviceId);
    if (!calendarEntry) return false; // Service definition missing

    // Check day of week and date range
    return (
      calendarEntry[dayOfWeek] === "1" &&
      yyyymmdd >= calendarEntry.start_date &&
      yyyymmdd <= calendarEntry.end_date
    );
  }

  /**
   * Formats GTFS time (HH:MM:SS) into a displayable string and calculates the correct departure Date object.
   * @param {string} timeStr - GTFS time string (e.g., "25:30:00").
   * @param {Date} baseDate - The date the service *operates* on (midnight of the service day).
   * @returns {{displayTime: string, departureDateTime: Date}} Object with formatted time and Date object. Returns null if timeStr is invalid.
   */
  function formatGTFSTime(timeStr, baseDate) {
    if (!timeStr || !/^\d{1,2}:\d{2}:\d{2}$/.test(timeStr)) {
      // console.warn(`Invalid time string format: ${timeStr}`);
      return null; // Return null for invalid time strings
    }
    const parts = timeStr.split(":").map(Number);
    const hours = parts[0];
    const minutes = parts[1];
    const seconds = parts[2];

    const departureDateTime = new Date(baseDate);
    departureDateTime.setHours(hours, minutes, seconds, 0); // Handles hours > 23 correctly

    const displayHours = departureDateTime.getHours();
    const displayMinutes = departureDateTime.getMinutes();
    const ampm = displayHours >= 12 ? "PM" : "AM";
    const formattedHours = displayHours % 12 === 0 ? 12 : displayHours % 12;
    const displayTime = `${("0" + formattedHours).slice(-2)}:${(
      "0" + displayMinutes
    ).slice(-2)} ${ampm}`;

    return { displayTime, departureDateTime };
  }

  // --- Public API Functions ---

  /**
   * Finds upcoming train departures for a given place code, optionally relative to a specific time.
   * @param {string} placeCode - The parent_station code (e.g., "place_romsta").
   * @param {number} [maxDepartures=DEFAULT_MAX_DEPARTURES_TO_SHOW] - Optional limit for the number of departures returned.
   * @param {number} [timestampSeconds=null] - Optional Unix timestamp (seconds since epoch) to find departures after. Defaults to current time.
   * @returns {Promise<Array<Object>|null>} Promise resolving to a sorted list of upcoming
   * departure objects in the specified format or null if data loading fails.
   * Each object: { headline, departureTimestamp, departureTime, routeName, platform, tripId }
   */
  async function findUpcomingTrainDepartures(
    placeCode,
    maxDepartures = DEFAULT_MAX_DEPARTURES_TO_SHOW,
    timestampSeconds = null
  ) {
    if (!placeCode) {
      console.error("Error: placeCode is required.");
      return null;
    }

    // Validate maxDepartures
    if (
      typeof maxDepartures !== "number" ||
      isNaN(maxDepartures) ||
      maxDepartures <= 0
    ) {
      console.warn(
        `Invalid maxDepartures value (${maxDepartures}), using default: ${DEFAULT_MAX_DEPARTURES_TO_SHOW}`
      );
      maxDepartures = DEFAULT_MAX_DEPARTURES_TO_SHOW;
    } else {
      maxDepartures = Math.floor(maxDepartures); // Ensure integer
    }

    // Determine the reference time: use provided timestamp or current time
    let currentTime;
    if (
      timestampSeconds !== null &&
      typeof timestampSeconds === "number" &&
      !isNaN(timestampSeconds)
    ) {
      currentTime = new Date(timestampSeconds * 1000); // Convert seconds to milliseconds
      console.log(
        `Finding departures relative to timestamp: ${currentTime.toISOString()}`
      );
    } else {
      currentTime = new Date(); // Default to current time
      console.log(
        `Finding departures relative to current time: ${currentTime.toISOString()}`
      );
    }

    try {
      const data = await loadAllGTFSData(); // Ensure data is loaded
      if (!data) return null; // Loading failed

      const departures = [];
      // Use the determined currentTime to set the service date (midnight of that day)
      const serviceDate = new Date(currentTime);
      serviceDate.setHours(0, 0, 0, 0);

      // 1. Find relevant stop_ids and create platform map for the placeCode
      const relevantStops = data.stopsByParent.get(placeCode);
      if (!relevantStops || relevantStops.length === 0) {
        console.warn(`No stops found for place_code: ${placeCode}`);
        return []; // Return empty array if no stops match
      }
      const relevantStopIds = new Set(relevantStops.map((s) => s.stop_id));
      // Create map from stop_id to platform_code for quick lookup
      const stopIdToPlatformMap = new Map(
        relevantStops.map((s) => [s.stop_id, s.platform_code || "N/A"])
      );

      // 2. Iterate through all enriched stopTimes
      data.stopTimes.forEach((stopTime) => {
        // Filter by:
        // - Stop is one of the relevant platforms for the placeCode
        // - Route type is Train
        // - Is a valid pickup stop (pickup_type=0 or empty/undefined)
        if (
          relevantStopIds.has(stopTime.stop_id) &&
          stopTime.route_type === TRAIN_ROUTE_TYPE &&
          (stopTime.pickup_type === "0" || !stopTime.pickup_type)
        ) {
          // 3. Check if the service is running on the determined serviceDate
          if (isServiceRunning(stopTime.service_id, serviceDate, data)) {
            // 4. Format time relative to serviceDate and check if it's after currentTime
            const timeInfo = formatGTFSTime(
              stopTime.departure_time,
              serviceDate
            );
            // Ensure timeInfo is valid and the departure time is strictly after the reference time
            if (timeInfo && timeInfo.departureDateTime > currentTime) {
              // 5. Add to departures list (intermediate format, including platform)
              departures.push({
                // Keep necessary fields for sorting and final mapping
                tripId: stopTime.trip_id, // Keep tripId for final output
                departureDateTime: timeInfo.departureDateTime,
                displayTime: timeInfo.displayTime,
                routeShortName: stopTime.route_short_name || "N/A",
                tripHeadsign: stopTime.trip_headsign || "N/A",
                platform: stopIdToPlatformMap.get(stopTime.stop_id) || "N/A", // Get platform
              });
            }
          }
        }
      });

      // 6. Sort departures chronologically
      departures.sort((a, b) => a.departureDateTime - b.departureDateTime);

      // 7. Limit results and map to the final requested format
      return departures.slice(0, maxDepartures).map((dep) => ({
        headline: dep.tripHeadsign,
        departureTimestamp: Math.floor(dep.departureDateTime.getTime() / 1000), // Get Unix timestamp in seconds
        departureTime: dep.displayTime,
        routeName: dep.routeShortName,
        platform: dep.platform,
        tripId: dep.tripId,
        run: dep.tripId.split("-").at(-1).trim(),
      }));
    } catch (error) {
      console.error(`Error finding departures for ${placeCode}:`, error);
      return null; // Indicate failure
    }
  }

  /**
   * Retrieves the full sequence of stops and times for a given trip ID.
   * @param {string} tripId - The trip_id obtained from findUpcomingTrainDepartures.
   * @returns {Promise<Array<Object>|null>} Promise resolving to an array of stop objects
   * for the trip, sorted by sequence, or null if trip not found or data fails to load.
   * Each object: { stopSequence, stopName, platform, arrivalTime, departureTime }
   */
  async function getTripDetails(tripId) {
    if (!tripId) {
      console.error("Error: tripId is required.");
      return null;
    }

    try {
      const data = await loadAllGTFSData(); // Ensure data is loaded
      if (!data) return null; // Loading failed

      // 1. Get the pre-grouped stop times for this trip
      const tripStopTimes = data.stopTimesByTripId.get(tripId);

      if (!tripStopTimes || tripStopTimes.length === 0) {
        console.warn(`No stop times found for trip_id: ${tripId}`);
        return []; // Return empty array if trip has no stops (or doesn't exist)
      }

      // 2. Map stop times to detailed stop info (already sorted by sequence)
      // Determine the service date for this trip to format times correctly.
      // We need to look up the service_id from the first stopTime and then find a valid date for it.
      // This is complex; for simplicity, we still use 'today' as the base date for formatting.
      // A more robust solution would require tracking the specific service date.
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const detailedStops = tripStopTimes
        .map((st) => {
          const stopInfo = data.stops.get(st.stop_id);
          const arrivalTimeInfo = formatGTFSTime(st.arrival_time, today);
          const departureTimeInfo = formatGTFSTime(st.departure_time, today);

          // station: stationName.replace(/station/i, "").trim(),
          // arrivalTimestamp: arrivalTime,
          // arrivalTime: formatTime(arrivalTime),

          return {
            // stopSequence: st.stop_sequence,
            // stopName: stopInfo ? stopInfo.stop_name : "Unknown Stop",
            // platform: stopInfo ? stopInfo.platform_code || "N/A" : "N/A",
            // Use formatted display time. Note: Date object might be off if trip started prev day.
            // arrivalTime: arrivalTimeInfo ? arrivalTimeInfo.displayTime : "??:??",
            // departureTime: departureTimeInfo
            //   ? departureTimeInfo.displayTime
            //   : "??:??",
            // Include raw times for potential debugging
            // rawArrivalTime: st.arrival_time,
            // rawDepartureTime: st.departure_time,
            station: stopInfo ? stopInfo.stop_name : "Unknown Stop",
            arrivalTimestamp: arrivalTimeInfo
              ? arrivalTimeInfo.departureDateTime.getTime() / 1000
              : null,
            arrivalTime: arrivalTimeInfo
              ? arrivalTimeInfo.displayTime
              : "??:??",
          };
        })
        // .filter((v) => v.arrivalTimestamp * 1000 > startTime);

      return detailedStops;
    } catch (error) {
      console.error(`Error getting trip details for ${tripId}:`, error);
      return null; // Indicate failure
    }
  }

  // --- Expose API Functions to Global Scope ---
  // Make functions directly callable from the console
  window.findUpcomingTrainDepartures = findUpcomingTrainDepartures;
  window.getTripDetails = getTripDetails;

  console.log(
    "GTFS Console API loaded. Call findUpcomingTrainDepartures('place_code', optionalMaxDepartures, optionalTimestampInSeconds) or getTripDetails('trip_id')."
  );
  console.log(
    "Ensure GTFS files are in ./SEQ_GTFS/ and served via a local web server."
  );
})(); // End IIFE
