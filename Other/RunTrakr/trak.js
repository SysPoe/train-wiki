/**
 * @typedef {object} ApiResponseHeader
 * @property {number} timestamp - UNIX timestamp of the response generation.
 * @property {number} apiVersion - Version of the API used.
 */
/**
 * @typedef {object} ApiRequestDepartures
 * @property {string} stopId - The unique identifier for the requested stop.
 * @property {string} ts - Timestamp string related to the request time.
 * @property {number} limit - The maximum number of departures requested.
 */
/**
 * @typedef {object} ApiRequest
 * @property {ApiRequestDepartures} departures - Details about the departure request.
 */
/**
 * @typedef {object} Coordinates
 * @property {number} lat - Latitude.
 * @property {number} lon - Longitude.
 */
/**
 * @typedef {object} StopName
 * @property {string} station_name - The full name including platform/stop details.
 * @property {string} platform_readable_name - Human-readable platform/stop name part.
 * @property {string} station_readable_name - Human-readable station name part.
 * @property {string|null} [platform_name] - The specific platform or stop number/letter (optional).
 * @property {string|null} [platform_type] - The type of the stop point (e.g., 'Platform', 'Stop') (optional).
 */
/**
 * @typedef {object} DisassembledStopName
 * @property {string} fullName - The reconstructed full name.
 * @property {string} stationName - The base name of the station/stop location.
 * @property {string|null} platformCombinedName - Combined platform/stop identifiers.
 * @property {string|null} [platformTypeAbbreviation] - Abbreviation for the platform type (e.g., 'Plt') (optional).
 * @property {string|null} platformType - The type of the stop point (e.g., 'Platform', 'Stop').
 * @property {string|null} platformName - The specific platform or stop number/letter.
 */
/**
 * @typedef {object} Stop
 * @property {string} id - The unique identifier for the stop.
 * @property {string|null} code - The stop code (often null for stations).
 * @property {string[]} modes - Transport modes served by this stop (e.g., "au4:trains", "au4:buses").
 * @property {string} locality - The suburb or locality of the stop.
 * @property {StopName} name - Object containing different representations of the stop name.
 * @property {DisassembledStopName} disassembled - Object containing parts of the stop name.
 * @property {string} fullName - The primary full name of the stop.
 * @property {Coordinates} coordinates - Geographic coordinates of the stop.
 * @property {boolean|null} wheelchair - Wheelchair accessibility status (null if unknown/not applicable).
 * @property {string} _path - Internal system path for the stop data.
 */
/**
 * @typedef {object} ChildStop
 * @property {string} id - The unique identifier for the child stop (e.g., platform).
 * @property {string|null} code - The stop code.
 * @property {string[]} modes - Transport modes served by this child stop.
 * @property {string} locality - The suburb or locality of the stop.
 * @property {StopName} name - Object containing different representations of the child stop name.
 * @property {DisassembledStopName} disassembled - Object containing parts of the child stop name.
 * @property {string} fullName - The primary full name of the child stop.
 * @property {Coordinates} coordinates - Geographic coordinates of the child stop.
 * @property {boolean|null} wheelchair - Wheelchair accessibility status (null if unknown/not applicable).
 * @property {Stop} parent - Reference to the parent stop/station object.
 * @property {string} _path - Internal system path for the child stop data.
 */
/**
 * @typedef {object} ActivePeriod
 * @property {number} start - Start timestamp (UNIX) of the active period.
 * @property {number} end - End timestamp (UNIX) of the active period (0 if ongoing).
 */
/**
 * @typedef {object} Agency
 * @property {string} id - Unique identifier for the transport agency.
 * @property {string} name - Name of the transport agency.
 * @property {string} url - Website URL of the agency.
 * @property {string} phone - Contact phone number for the agency.
 * @property {string} timezone - Timezone of the agency's operations.
 * @property {string} _path - Internal system path for the agency data.
 */
/**
 * @typedef {object} Route
 * @property {string} id - Unique identifier for the route.
 * @property {string} name - Short name/code of the route.
 * @property {string} longName - Full name of the route.
 * @property {string} description - Route description (often empty).
 * @property {string} color - Hex color code associated with the route.
 * @property {string} textColor - Hex color code for text on the route color.
 * @property {string} routeGroupId - Identifier for the parent route group.
 * @property {number} type - Numerical type classification of the route (e.g., 2 for Train, 3 for Bus).
 * @property {string} mode - Transport mode identifier (e.g., "au4:trains").
 * @property {Agency} agency - Agency operating this route.
 * @property {string} _path - Internal system path for the route data.
 */
/**
 * @typedef {object} RouteGroup
 * @property {string} id - Unique identifier for the route group.
 * @property {string} name - Short name/code of the route group.
 * @property {string} longName - Full name of the route group.
 * @property {string} description - Route group description (often empty).
 * @property {string} color - Hex color code associated with the route group.
 * @property {string} textColor - Hex color code for text on the route group color.
 * @property {string} mode - Transport mode identifier (e.g., "au4:trains").
 * @property {string} _path - Internal system path for the route group data.
 */
/**
 * @typedef {object} AlertAffects
 * @property {Array<string|object>} trips - Affected trip identifiers (structure unknown from sample).
 * @property {RouteGroup[]} routeGroups - Affected route groups.
 * @property {Route[]} routes - Affected routes.
 * @property {Array<string|object>} stops - Affected stop identifiers (structure unknown from sample).
 * @property {Array<string|object>} agencies - Affected agency identifiers (structure unknown from sample).
 */
/**
 * @typedef {object} ParsedAffected
 * @property {Array<string|object>} busReplaceTrains - Details on bus replacements for trains (structure unknown).
 * @property {Array<string|object>} trainsSuspended - Details on suspended trains (structure unknown).
 * @property {Array<string|object>} reducedFrequency - Details on reduced frequency services (structure unknown).
 * @property {boolean} hasBusReplacement - Flag indicating if there are bus replacements.
 * @property {null} broadBusReplacement - Broad bus replacement details (null in sample).
 */
/**
 * @typedef {object} Alert
 * @property {string} id - Unique identifier for the alert.
 * @property {string} header - Title/header of the alert.
 * @property {string} description - Detailed description of the alert.
 * @property {number} createdTime - Timestamp (UNIX) when the alert was created.
 * @property {number} currentAtTime - Timestamp (UNIX) the alert data is current as of.
 * @property {ActivePeriod[]} activePeriods - Time periods when the alert is active.
 * @property {boolean} active - Current active status of the alert (may differ from activePeriods).
 * @property {string} url - URL for more information about the alert.
 * @property {AlertAffects} affects - Details on what services/stops are affected.
 * @property {ParsedAffected} parsedAffected - Parsed details about the effects.
 * @property {string} _path - Internal system path for the alert data.
 */
/**
 * @typedef {object} Headsign
 * @property {string} headline - The primary destination/headsign text.
 * @property {string|null} subtitle - Additional subtitle information (often null).
 */
/**
 * @typedef {object} Trip
 * @property {string} id - Unique identifier for the trip.
 * @property {string} tripHash - A hash representing the trip.
 * @property {Headsign} headsign - Destination information for the trip.
 * @property {string|null} shortName - Short name for the trip (often null).
 * @property {number} directionId - Direction identifier (e.g., 0 or 1).
 * @property {string} shapeId - Identifier for the geographic shape/path of the trip.
 * @property {string|null} blockId - Block identifier for scheduling (often null).
 * @property {boolean|null} wheelchair - Wheelchair accessibility of the trip vehicle (null if unknown).
 * @property {object|null} routeDirection - Route direction details (null in sample).
 * @property {Route} route - The route this trip belongs to.
 * @property {string[]} serviceDates - Dates this trip pattern is active.
 * @property {boolean} tripContinues - Flag indicating if the trip continues beyond this leg.
 * @property {boolean} hasDeadRunning - Flag indicating non-revenue movement.
 * @property {boolean} nonRevenue - Flag indicating if this is a non-revenue trip.
 * @property {string} _path - Internal system path for the trip data.
 */
/**
 * @typedef {object} TripInstance
 * @property {Trip} trip - The static trip details.
 * @property {string} startDate - The specific date this instance of the trip is running.
 * @property {number} instanceNumber - Instance number for the trip on this date.
 * @property {object|null} realtimeState - Realtime state details (null in sample).
 * @property {number|null} realtimeStatus - Realtime status code (e.g., 1 for scheduled/predicted).
 * @property {string} routeVariantKey - Key identifying the specific route variant.
 * @property {string} realtimeBlockId - Realtime block identifier.
 * @property {boolean} tripContinues - Flag indicating if this instance continues.
 * @property {string} shapeId - Shape identifier for this instance.
 * @property {number} time - Timestamp related to the trip instance (context unclear).
 * @property {boolean} current - Flag indicating if this is the current trip instance for the vehicle.
 * @property {string} _path - Internal system path for the trip instance data.
 */
/**
 * @typedef {object} TimePoint
 * @property {number} time - Scheduled or predicted time (UNIX timestamp).
 * @property {number} delay - Delay in seconds (positive for late, negative for early).
 * @property {number[]} occupancy - Occupancy level data (often [1]).
 * @property {number} [vehicleOccupancy] - Vehicle occupancy code (optional).
 */
/**
 * @typedef {object} StopTime
 * @property {Stop} stop - The stop associated with this time point.
 * @property {number} stopSequence - The sequence number of this stop in the trip.
 * @property {number} index - Index of the stop time (often sequence - 1).
 * @property {number} ts - Timestamp related to this stop time (context unclear).
 * @property {TimePoint} arrival - Arrival time details.
 * @property {TimePoint} departure - Departure time details.
 * @property {number} pickUp - Pickup type code.
 * @property {number} dropOff - Dropoff type code.
 * @property {number} timepoint - Timepoint flag (0 or 1).
 * @property {number} shapeDistance - Distance along the trip shape to this stop.
 * @property {string} _path - Internal system path for the stop time data.
 */
/**
 * @typedef {object} SurroundingStops
 * @property {StopTime|null} prev - Details about the previous stop.
 * @property {StopTime|null} at - Details if currently at a stop.
 * @property {StopTime|null} next - Details about the next stop.
 */
/**
 * @typedef {object} LastPosition
 * @property {number} time - Timestamp (UNIX) of the last position update.
 * @property {number|null} bearing - Vehicle bearing/direction (degrees).
 * @property {number|null} speed - Vehicle speed (null if unknown).
 * @property {number} status - Status code of the vehicle's position/movement.
 * @property {number|null} distance - Distance related to the status (e.g., distance from next stop).
 * @property {number} vdap - Vehicle distance along path.
 * @property {string} statusString - Human-readable description of the vehicle status.
 * @property {Coordinates} coordinates - Geographic coordinates of the last position.
 * @property {SurroundingStops} surroundingStops - Details about nearby stops relative to the vehicle.
 */
/**
 * @typedef {object} Vehicle
 * @property {string|null} id - Unique identifier for the vehicle (if available).
 * @property {string|null} reportedTripId - The trip ID the vehicle is currently reporting.
 * @property {LastPosition|null} lastPosition - Details about the vehicle's last known position and status.
 * @property {number|null} lastResetTime - Timestamp of the last reset event for the vehicle data.
 * @property {string} _tripInstancePath - Path relating to the trip instance.
 * @property {string|null} vehicleModel - Description of the vehicle model/type.
 * @property {boolean|null} current - Flag indicating if this is the current vehicle data.
 * @property {string} _path - Internal system path for the vehicle data.
 */
/**
 * @typedef {object} StopTimeInstance
 * @property {Stop} stop - The specific stop (platform/bay) for this departure instance.
 * @property {number} stopSequence - The sequence number of this stop in the trip instance.
 * @property {number} index - Index of this stop time instance.
 * @property {number} ts - Timestamp related to this stop time instance.
 * @property {TimePoint} arrival - Arrival time details for this instance.
 * @property {TimePoint} departure - Departure time details for this instance.
 * @property {number} pickUp - Pickup type code.
 * @property {number} dropOff - Dropoff type code.
 * @property {number} timepoint - Timepoint flag.
 * @property {boolean} [firstStop] - Flag if this is the first stop of the trip (optional).
 * @property {boolean} [firstRevenueStop] - Flag if this is the first revenue stop (optional).
 * @property {number} shapeDistance - Distance along the trip shape to this stop.
 * @property {boolean} [replaced] - Flag indicating if the stop has been moved/replaced (optional).
 * @property {Stop} [scheduledStop] - The originally scheduled stop if 'replaced' is true (optional).
 * @property {string} _path - Internal system path for the stop time instance data.
 */
/**
 * @typedef {object} Departure
 * @property {TripInstance} tripInstance - Details of the specific trip instance for this departure.
 * @property {Vehicle} vehicle - Realtime vehicle information associated with this departure.
 * @property {StopTimeInstance} stopTimeInstance - Details about the arrival/departure at the requested stop.
 */
/**
 * @typedef {object} ApiResponse
 * @property {Array<object>} carParks - Car park information (empty in sample).
 * @property {Alert[]} alerts - Service alerts relevant to the request.
 * @property {Stop} stop - Details of the requested parent stop/station.
 * @property {ChildStop[]} childStops - Details of individual platforms/bays within the station.
 * @property {string[]} modes - Transport modes available at the parent stop.
 * @property {number} nowAt - Index indicating the current position in a sequence (context unclear).
 * @property {boolean} reachedEnd - Flag related to pagination or sequence end.
 * @property {boolean} reachedStart - Flag related to pagination or sequence start.
 * @property {Departure[]} departures - List of upcoming departures from the stop.
 */
/**
 * @typedef {object} TransitData
 * @property {ApiResponseHeader} header - Response header information.
 * @property {ApiRequest} request - Original request details.
 * @property {ApiResponse} response - The main response data containing stops, alerts, and departures.
 */

const FILE_PATH = "./runData.json";

const fs = require("fs");
const Holidays = require("date-holidays");
const PH = new Holidays("AU", "QLD").isHoliday(new Date());
if (PH) console.log("Today is a public holiday");
let data = JSON.parse(fs.readFileSync(FILE_PATH).toString());

async function fetchData() {
  try {
    const res = await fetch(
      `https://anytrip.com.au/api/v3/region/au4/departures/au4%3Aplace_romsta?limit=25&modes=au4:trains&ts=${Math.floor(
        Date.now() / 1000
      )}`
    );
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

    /** @type {TransitData} */
    const json = await res.json();
    const dep = json.response.departures;
    let models = dep
      .filter(
        (v) =>
          v.vehicle.vehicleModel != null && v.vehicle.vehicleModel != undefined
      )
      .map(async (v) => {
        let match = /(?<=\(run )[A-Z0-9]{4}(?=\))/.exec(v.vehicle.vehicleModel);
        let run = match ? match[0] : v.vehicle.vehicleModel;

        if (data[run] == undefined) {
          data[run] = { used: {}, contains: [], usedIDs: {} };
        }

        if (data[run].usedIDs[v.tripInstance.trip.id]) return undefined;
        data[run].usedIDs[v.tripInstance.trip.id] = true;

        let tripInstanceRes = await fetch(
          "https://anytrip.com.au/api/v3/region/au4/" + v.tripInstance._path
        );

        tripInstanceRes = await tripInstanceRes.json();

        let line = v.tripInstance.trip.route.name;
        let RTP = tripInstanceRes.response.realtimePattern;

        let timeDate = new Date(RTP[0].departure.time * 1000);
        let time = `${
          timeDate.getHours() < 10
            ? "0" + timeDate.getHours()
            : timeDate.getHours()
        }:${
          timeDate.getMinutes() < 10
            ? "0" + timeDate.getMinutes()
            : timeDate.getMinutes()
        }`;
        let day = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ][timeDate.getDay()];

        return {
          run,
          trPath: v.tripInstance._path,
          line,
          time,
          day,
          dest: RTP[RTP.length - 1].stop.name.station_name.replace(
            " station",
            ""
          ),
          origin: RTP[0].stop.name.station_name.replace(" station", ""),
        };
      });

    let resmodels = await Promise.all(models);
    resmodels = resmodels.filter((v) => v != undefined && v != null);

    for (const v of resmodels) {
      let display = `${v.day} ${v.time} ${v.origin} - ${v.dest} ${
        v.line
      } service${PH ? " (PH)" : ""}`;
      if (data[v.run].used[display] == true) continue;

      console.log(v.run, display);

      data[v.run].used[display] = true;
      data[v.run].contains.push({ display, data: v });
    }
  } catch (error) {
    console.error("Failed to fetch data:", error);
  } finally {
    fs.writeFileSync(FILE_PATH, JSON.stringify(data));
  }
}

fetchData();
