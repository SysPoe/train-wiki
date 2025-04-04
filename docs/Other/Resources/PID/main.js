// Constants and Configuration
const CONFIG = {
  zones: [
    {
      north: {
        display: "North",
        zones: [],
      },
      south: {
        display: "City & South",
        zones: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
      },
      order: 0,
      stations: [
        "gympie north",
        "traveston",
        "cooran",
        "pomona",
        "cooroy",
        "eumundi",
        "yandina",
      ],
    },
    {
      north: {
        display: "North",
        zones: [0],
      },
      south: {
        display: "City & South",
        zones: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
      },
      order: 0,
      stations: [
        "nambour",
        "woombye",
        "palmwoods",
        "eudlo",
        "mooloolah",
        "landsborough",
        "beerwah",
        "glasshouse mountains",
        "beerburrum",
        "elimbah",
      ],
    },
    {
      north: {
        display: "North",
        zones: [0, 1],
      },
      south: {
        display: "City & South",
        zones: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
      },
      order: 0,
      stations: [
        "caboolture",
        "morayfield",
        "burpengary",
        "narangba",
        "dakabin",
      ],
    },
    {
      north: {
        display: "East",
        zones: [],
      },
      south: {
        display: "City & South",
        zones: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
      },
      order: 1,
      stations: [
        "kallangur",
        "murrumba downs",
        "mango hill",
        "mango hill east",
        "rothwell",
        "kippa-ring",
      ],
    },
    {
      north: {
        display: "North & East",
        zones: [0, 1, 2, 3],
      },
      south: {
        display: "City & South",
        zones: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
      },
      order: 0,
      stations: [
        "petrie",
        "lawnton",
        "bray park",
        "strathpine",
        "bald hills",
        "carseldine",
        "zillmere",
        "geebung",
        "sunshine",
        "virginia",
      ],
    },
    {
      north: {
        display: "East",
        zones: [],
      },
      south: {
        display: "City & South",
        zones: [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
      },
      order: 0,
      stations: [
        "bindha",
        "banyo",
        "nudgee",
        "boondall",
        "north boondall",
        "deagon",
        "sandgate",
        "shorncliffe",
      ],
    },
    {
      north: {
        display: "North & East",
        zones: [0, 1, 2, 3, 4, 5],
      },
      south: {
        display: "City & South",
        zones: [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
      },
      order: 0,
      stations: ["northgate", "nundah", "toombul"],
    },
    {
      north: {
        display: "North",
        zones: [],
      },
      south: {
        display: "City & South",
        zones: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
      },
      order: 1,
      stations: ["international airport", "domestic airport"],
    },
    {
      north: {
        display: "East",
        zones: [0, 1, 2, 3, 4, 5, 6, 7],
      },
      south: {
        display: "City & South",
        zones: [9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
      },
      order: 1,
      stations: ["clayfield", "hendra", "ascot", "doomben"],
    },
    {
      north: {
        display: "North & East",
        zones: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      },
      south: {
        display: "City & South",
        zones: [10, 11, 12, 13, 14, 15, 16, 17, 18],
      },
      order: 0,
      stations: ["eagle junction", "wooloowin", "albion"],
    },
    {
      north: {
        display: "North",
        zones: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      },
      south: {
        display: "City & South",
        zones: [11, 12, 13, 14, 15, 16, 17, 18],
      },
      order: 0,
      stations: [
        "ferny grove",
        "keperra",
        "grovely",
        "oxford park",
        "michleton",
        "gaythorne",
        "enoggera",
        "alderley",
        "newmarket",
        "wilston",
      ],
    },
    {
      north: {
        display: "North & East",
        zones: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      },
      south: {
        display: "City & South/West",
        zones: [12, 13, 14, 15, 16, 17, 18],
      },
      order: 0,
      stations: [
        "bowen hills",
        "fortitude valley",
        "central",
        "roma street",
        "exhibition",
      ],
    },
    {
      north: {
        display: "City & North",
        zones: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      },
      south: {
        display: "South & East",
        zones: [13, 14, 15, 16, 17, 18],
      },
      order: 0,
      stations: [
        "south brisbane",
        "south bank",
        "boggo rd",
        "park rd",
        "boggo rd/park rd",
        "boggo rd / park rd",
        "boggo road",
        "park road",
        "boggo road/park road",
        "boggo road / park road",
      ],
    },
    {
      north: {
        display: "City & North",
        zones: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      },
      south: {
        display: "West",
        zones: [14, 15, 16, 17, 18],
      },
      order: 0,
      stations: [
        "milton",
        "auchenflower",
        "toowong",
        "taringa",
        "indooroopilly",
        "chelmer",
        "graceville",
        "sherwood",
        "corinda",
        "oxley",
        "darra",
      ],
    },
    {
      north: {
        display: "City & West",
        zones: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
      },
      south: {
        display: "East",
        zones: [15, 16, 17, 18],
      },
      order: 0,
      stations: [
        "buranda",
        "coorparoo",
        "norman park",
        "morningside",
        "cannon hill",
        "murarrie",
        "hemmant",
        "lindum",
        "wynnum north",
        "wynnum",
        "wynnum central",
        "manly",
        "lota",
        "thorneside",
        "birkdale",
        "wellington point",
        "ormiston",
        "cleveland",
      ],
    },
    {
      north: {
        display: "City & North",
        zones: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
      },
      south: {
        display: "South",
        zones: [16, 17, 18],
      },
      order: 0,
      stations: [
        "dutton park",
        "fairfield",
        "yeronga",
        "yeerongpilly",
        "moorooka",
        "rocklea",
        "coopers plains",
        "banoon",
        "sunnybank",
        "altandi",
        "runcorn",
        "fruitgrove",
        "kuraby",
        "trinder park",
        "woodridge",
        "kingston",
        "loganlea",
        "bethania",
        "edens landing",
        "holmview",
        "beenleigh",
      ],
    },
    {
      north: {
        display: "City & North",
        zones: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
      },
      south: {
        display: "South",
        zones: [15, 18],
      },
      order: 0,
      stations: ["richlands", "springfield", "springfield central"],
    },
    {
      north: {
        display: "City & North",
        zones: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
      },
      south: {
        display: "South",
        zones: [15, 18],
      },
      order: 0,
      stations: [
        "wacol",
        "gailes",
        "goodna",
        "redbank",
        "riverview",
        "dinmore",
        "ebbw vale",
        "bundamba",
        "booval",
        "east ipswich",
        "ipswich",
        "thomas street",
        "wulkuraka",
        "karrabin",
        "walloon",
        "thagoona",
        "rosewood",
      ],
    },
    {
      north: {
        display: "City & North",
        zones: [
          0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
        ],
      },
      south: {
        display: "South",
        zones: [],
      },
      order: 0,
      stations: [
        "ormeau",
        "pimpama",
        "coomera",
        "hope island",
        "nerang",
        "merrimac",
        "robina",
        "varsity lakes",
      ],
    },
  ],
  innerInnerCity: [
    "bowen hills",
    "fortitude valley",
    "central",
    "roma street",
    "exhibition",
    "south brisbane",
    "south bank",
    "boggo rd",
    "park rd",
    "boggo rd/park rd",
    "boggo rd / park rd",
    "boggo road",
    "park road",
    "boggo road/park road",
    "boggo road / park road",
  ],
  innerCity: {
    color: "#c7c8ca",
    stations: [
      "northgate",
      "nundah",
      "toombul",
      "eagle junction",
      "wooloowin",
      "albion",
      "bowen hills",
      "fortitude valley",
      "central",
      "roma street",
      "exhibition",
      "south brisbane",
      "south bank",
      "boggo rd",
      "park rd",
      "boggo rd/park rd",
      "boggo rd / park rd",
      "boggo road",
      "park road",
      "boggo road/park road",
      "boggo road / park road",
    ],
  },
  nameOverrides: {
    "Kippa-Ring": "Redcliffe",
    "Varsity Lakes": "Gold Coast",
  },
  colorOptions: {
    "#00871C": "Ipswich / Sunshine Coast",
    "#E31837": "Beenleigh / Ferny Grove",
    "#1578BE": "Springfield Central / Redcliffe",
    "#00467F": "Cleveland / Shorncliffe",
    "#FFC425": "Gold Coast / Airport",
    "#A54399": "Doomben",
  },
};

/**
 * @typedef {Object} Stop
 * @property {string} id - Stop ID
 * @property {string | null} code - Stop code
 * @property {string[]} modes - Transport modes available at this stop
 * @property {string} locality - Stop locality
 * @property {Object} name - Stop name information
 * @property {string} name.station_name - Station name
 * @property {string} name.platform_readable_name - Human-readable platform name
 * @property {string} name.station_readable_name - Human-readable station name
 * @property {string} [name.platform_name] - Platform number/identifier
 * @property {string} [name.platform_type] - Type of platform
 * @property {Object} disassembled - Disassembled stop information
 * @property {string} disassembled.fullName - Full name of the stop
 * @property {string} disassembled.stationName - Station name
 * @property {string | null} disassembled.platformCombinedName - Combined platform name
 * @property {string | null} disassembled.platformType - Type of platform
 * @property {string | null} disassembled.platformName - Platform number/identifier
 * @property {string} [disassembled.platformTypeAbbreviation] - Abbreviated platform type (e.g., "Plt")
 * @property {string} fullName - Full name of the stop
 * @property {Object} coordinates - Geographic coordinates
 * @property {number} coordinates.lat - Latitude
 * @property {number} coordinates.lon - Longitude
 * @property {boolean | null} wheelchair - Wheelchair accessibility
 * @property {Stop} [parent] - Parent stop information
 * @property {Stop[]} [children] - Child stops
 * @property {string} _path - API path for the stop
 */

/**
 * @typedef {Object} Vehicle
 * @property {string} id - Vehicle ID
 * @property {string} vehicleModel - Vehicle model identifier
 * @property {string} reportedTripId - Reported trip ID
 * @property {Object} lastPosition - Last known position
 * @property {number} lastPosition.time - Timestamp of last position
 * @property {number} lastPosition.bearing - Vehicle bearing
 * @property {number|null} lastPosition.speed - Vehicle speed
 * @property {number} lastPosition.status - Vehicle status code
 * @property {number} lastPosition.distance - Distance traveled
 * @property {string} lastPosition.statusString - Human-readable status
 * @property {Object} lastPosition.coordinates - Geographic coordinates
 * @property {number} lastPosition.coordinates.lat - Latitude
 * @property {number} lastPosition.coordinates.lon - Longitude
 * @property {number} lastResetTime - Last reset timestamp
 * @property {boolean} current - Whether this is the current vehicle
 */

/**
 * @typedef {Object} Trip
 * @property {string} id - Trip ID
 * @property {string} tripHash - Trip hash
 * @property {Object} headsign - Trip headsign
 * @property {string} headsign.headline - Destination headline
 * @property {string|null} headsign.subtitle - Headsign subtitle
 * @property {string|null} shortName - Short name
 * @property {number} directionId - Direction identifier
 * @property {string} shapeId - Shape identifier
 * @property {Object} route - Route information
 * @property {string} route.id - Route ID
 * @property {string} route.name - Route name
 * @property {string} route.longName - Route long name
 * @property {string} route.description - Route description
 * @property {string} route.color - Route color
 * @property {string} route.textColor - Route text color
 * @property {string} route.mode - Transport mode
 * @property {Object} route.agency - Agency information
 * @property {string[]} serviceDates - Service dates
 * @property {boolean} tripContinues - Whether trip continues
 */

/**
 * @typedef {Object} StopTime
 * @property {Stop} stop - Stop information
 * @property {number} stopSequence - Stop sequence number
 * @property {number} index - Stop index
 * @property {Object} arrival - Arrival information
 * @property {number} arrival.time - Arrival timestamp
 * @property {number} arrival.delay - Arrival delay in seconds
 * @property {number[]} [arrival.occupancy] - Arrival occupancy levels
 * @property {Object} departure - Departure information
 * @property {number} departure.time - Departure timestamp
 * @property {number} departure.delay - Departure delay in seconds
 * @property {number[]} [departure.occupancy] - Departure occupancy levels
 * @property {number} pickUp - Pickup type
 * @property {number} dropOff - Dropoff type
 * @property {number} timepoint - Timepoint indicator
 * @property {boolean} [firstStop] - Whether this is the first stop
 * @property {boolean} [lastStop] - Whether this is the last stop
 * @property {number} shapeDistance - Distance along shape
 */

/**
 * @typedef {Object} TripInstance
 * @property {Trip} trip - Trip information
 * @property {string} startDate - Start date
 * @property {number} instanceNumber - Instance number
 * @property {number|null} realtimeState - Realtime state
 * @property {number} realtimeStatus - Realtime status
 * @property {string} routeVariantKey - Route variant key
 * @property {string|null} realtimeBlockId - Realtime block ID
 * @property {boolean} tripContinues - Whether trip continues
 * @property {string} shapeId - Shape identifier
 * @property {number} time - Timestamp
 * @property {boolean} current - Whether this is the current trip
 * @property {string} _path - Trip path
 */

/**
 * @typedef {Object} Departure
 * @property {Vehicle} vehicle - Vehicle information
 * @property {TripInstance} tripInstance - Trip instance
 * @property {StopTime} stopTimeInstance - Stop time instance
 */

const DOM = {
  container: document.querySelector(".container"),
  timeDisplay: document.querySelector(".time"),
  middleHeader: document.querySelector(".lmrmiddle"),
  stationInput: document.querySelector(".select-station input"),
  stationList: document.querySelector("#station-list"),
  goto: document.querySelector("#goto"),
  rows: Array.from(document.querySelectorAll("[id^='tr']")),
};

/**
 * @typedef {Object} Station
 * @property {Stop} stop - Stop information
 */

/**
 * @typedef {Object} State
 * @property {boolean} ctrlKeyPressed - Whether the Control key is currently pressed
 * @property {Station[]} stations - Array of station information
 * @property {Map<string, string>} nameToID - Map of station names to their IDs
 */

/** @type {State} */
let state = {
  ctrlKeyPressed: false,
  stations: [],
  nameToID: new Map(),
};

const utils = {
  /**
   * Calculate distance between two coordinates using Haversine formula
   * @param {number} lat1 - Latitude of first point
   * @param {number} lon1 - Longitude of first point
   * @param {number} lat2 - Latitude of second point
   * @param {number} lon2 - Longitude of second point
   * @returns {number} Distance in kilometers
   */
  calculateDistance: (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c; // Distance in km
  },

  /**
   * Find the closest station to given coordinates
   * @returns {Promise<void>}
   */
  findClosestStop: async () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }

    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const { latitude, longitude } = position.coords;
      
      let closestStation = null;
      let minDistance = Infinity;

      state.stations.forEach(station => {
        const distance = utils.calculateDistance(
          latitude,
          longitude,
          station.stop.coordinates.lat,
          station.stop.coordinates.lon
        );

        if (distance < minDistance) {
          minDistance = distance;
          closestStation = station;
        }
      });

      if (closestStation) {
        DOM.stationInput.value = closestStation.stop.fullName;
      } else {
        alert('No stations found');
      }
    } catch (error) {
      alert('Error getting your location. Please make sure location services are enabled.');
      console.error(error);
    }
  },

  /**
   * @param {Date} date
   * @returns {string}
   */
  formatTime: (date) => {
    const hours = ((date.getHours() - 1) % 12) + 1;
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  },

  /**
   * @param {string} name
   * @returns {string}
   */
  normalizeStationName: (name) =>
    name.toLowerCase().replace("station", "").trim(),

  /**
   * @param {string} stationName
   * @returns {number}
   */
  getZone: (stationName) => {
    const normalized = utils.normalizeStationName(stationName);
    return CONFIG.zones.findIndex((zone) => zone.stations.includes(normalized));
  },

  /**
   * @param {string} url
   * @returns {string}
   */
  getURL: (url) => {
    let qurl = new URL("https://corsproxy.io/");
    qurl.searchParams.set("url", url);
    return qurl.href;
  },
};

const ui = {
  /**
   * Updates the time display
   */
  updateTime: () => {
    DOM.timeDisplay.textContent = utils.formatTime(new Date());
  },

  /**
   * Updates the direction display on the top middle
   * @param {Number} zone
   * @param {String} direction
   */
  updateDirection: (zone, direction) => {
    switch (direction) {
      case "NE": {
        DOM.middleHeader.innerText = `Next (1-6) Trains ${CONFIG.zones[zone].north.display}`;
        break;
      }

      case "SW": {
        DOM.middleHeader.innerText = `Next (1-6) Trains ${CONFIG.zones[zone].south.display}`;
        break;
      }

      default: {
        DOM.middleHeader.innerText = `Next Inbound and Outbound Trains`;
        break;
      }
    }
  },

  /**
   * @param {number} rowNumber
   * @param {string} [setTo]
   */
  toggleRowVisibility: (rowNumber, setTo) => {
    const row = DOM.rows[rowNumber - 1];
    if (!row) return;

    const action =
      setTo !== undefined ? setTo : row.style.opacity === "1" ? "0" : "1";
    row.style.opacity = action;
    row.classList.toggle("hidden", action === "0");

    const button = document.querySelector(`#hide${rowNumber}`);
    if (button) {
      button.textContent = `${action === "1" ? "Hide" : "Show"} #${rowNumber}`;
    }
  },

  /**
   * @param {number} rowNumber
   * @param {string | null} [set]
   */
  toggleCarType: (rowNumber, set = null) => {
    const row = DOM.rows[rowNumber - 1];
    if (!row) return;

    const ngr = row.querySelector(".ngr");
    const tcar = row.querySelector(".tcar");
    const isNGRVisible = set == null ? ngr.style.display === "" : set === "0";

    ngr.style.display = isNGRVisible ? "none" : "";
    tcar.style.display = isNGRVisible ? "" : "none";

    const button = document.querySelector(`#tcar${rowNumber}`);
    if (button) {
      button.textContent = `${isNGRVisible ? "NGR" : "3car"} #${rowNumber}`;
    }
  },

  /**
   * @param {number} rowNumber
   * @param {string} color
   */
  setRowColor: (rowNumber, color) => {
    const row = DOM.rows[rowNumber - 1];
    if (row) {
      row.style.backgroundColor = color;
      document.querySelector(`#colsel${rowNumber}`).value = color;
    }
  },
};

const cacheWrapper = {
  /** @type {Map<string, {data: any, timestamp: number}>} */
  cache: new Map(),
  defaultTTL: 60, // 60 seconds default TTL

  /**
   * @template T
   * @param {string} key
   * @param {() => Promise<T>} fetchFn
   * @param {number} [ttl]
   * @returns {Promise<T>}
   */
  async fetch(url, ttl = this.defaultTTL) {
    const now = Date.now();
    const cached = this.cache.get(url);

    if (cached && now - cached.timestamp < ttl * 1000) return cached.data;

    const res = await fetch(url);
    const data = await res.json();
    this.cache.set(url, {
      data,
      timestamp: now,
    });

    return data;
  },
};

const apiService = {
  /**
   * @returns {Promise<void>}
   */
  fetchStations: async () => {
    try {
      const data = await cacheWrapper.fetch(
        utils.getURL(
          "https://anytrip.com.au/api/v3/region/au4/stops?limit=1000&modes=au4:trains&maxLat=-25.260733552498742&maxLon=155.34991455078128&minLat=-29.71149449264223&minLon=150.68798828125"
        ),
        3600
      );
      state.stations = data.response.stops;
      state.stations = state.stations.sort((a,b) => a.stop.fullName > b.stop.fullName);
      state.nameToID = new Map(
        state.stations.map((s) => [s.stop.fullName, s.stop.id])
      );
    } catch (error) {
      console.error("Failed to fetch stations:", error);
    }
  },

  /**
   * @param {string} stationId
   * @returns {Promise<{response: {departures: Departure[]}}>}
   */
  fetchDepartures: async (stationId) => {
    try {
      return await cacheWrapper.fetch(
        utils.getURL(
          `https://anytrip.com.au/api/v3/region/au4/departures/${encodeURIComponent(
            stationId
          )}?limit=250`
        ),
        60
      );
    } catch (error) {
      console.error("Failed to fetch departures:", error);
      return { response: { departures: [] } };
    }
  },

  /**
   * @param {string} tripPath
   * @returns {Promise<{response: {realtimePattern: any[]}}>}
   */
  fetchTripDetails: async (tripPath) => {
    try {
      return await cacheWrapper.fetch(
        utils.getURL(`https://anytrip.com.au/api/v3/region/au4/${tripPath}`)
      );
    } catch (error) {
      console.error("Failed to fetch trip details:", error);
      return { response: { realtimePattern: [] } };
    }
  },
};

const app = {
  /**
   * @returns {Promise<void>}
   */
  initialize: async () => {
    await apiService.fetchStations();
    app.populateStationList();
    app.setupEventListeners();

    window.SNFShown = false;

    if (window.location.hash) {
      document
        .querySelectorAll(".hide")
        .forEach((v) => (v.style.display = "none"));
      document.querySelectorAll(".show").forEach((v) => (v.style.display = ""));

      const { stationName, direction } = JSON.parse(
        decodeURIComponent(window.location.hash.substring(1))
      );
      DOM.stationInput.value = stationName;
      setInterval((v) => app.updateDisplay(direction, false), 1000);
    }
  },

  /**
   * @returns {void}
   */
  populateStationList: () => {
    DOM.stationList.innerHTML = state.stations
      .map(
        (s) => `<option value="${s.stop.fullName}">${s.stop.fullName}</option>`
      )
      .join("");
    DOM.stationInput.placeholder = "Enter station name...";
  },

  /**
   * @returns {void}
   */
  setupEventListeners: () => {
    document.addEventListener("keydown", (e) => {
      state.ctrlKeyPressed = e.key === "Control";
    });

    document.addEventListener("keyup", (e) => {
      if (e.key === "Control") state.ctrlKeyPressed = false;
    });

    document.querySelectorAll(".active").forEach((el) => {
      el.addEventListener("click", (e) => {
        if (!state.ctrlKeyPressed && e.target === el) {
          el.classList.toggle("active");
          el.classList.toggle("inactive");
        }
      });
    });

    document.querySelectorAll("[id^='colsel']").forEach((v) => {
      let num = Number.parseInt(v.id.replace("colsel", ""));
      v.onchange = () => ui.setRowColor(num, v.value);
    });

    document.querySelectorAll("td:nth-child(5)").forEach((v) => {
      v.onclick = () => {
        v.classList.toggle("active");
        v.classList.toggle("inactive");
      };
    });
  },
  /**
   * @param {string} direction
   * @param {bool} doCheck
   * @returns {Promise<void>}
   */
  updateDisplay: async (direction, doCheck = true) => {
    const stationName = DOM.stationInput.value;
    const stationId = state.nameToID.get(stationName);

    if (!stationId && !window.SNFShown) {
      window.SNFShown = true;
      alert(
        "Station not found. It is possible that the rate limit has been exceeded."
      );
      return;
    }

    if (
      doCheck &&
      DOM.goto.checked &&
      location.hash.substring(1).trim() == "" &&
      location.hash.substring(1).trim() !=
        JSON.stringify({ stationName, direction })
    ) {
      location.hash = JSON.stringify({ stationName, direction });
      location.reload();
      return;
    }

    const departures = await apiService.fetchDepartures(stationId);
    const filteredDepartures = app.filterDepartures(
      departures.response.departures,
      direction,
      utils.getZone(stationName)
    );

    ui.updateTime();
    ui.updateDirection(utils.getZone(stationName), direction);
    app.populateDepartureRows(
      filteredDepartures,
      stationId,
      utils.normalizeStationName(stationName)
    );
  },

  /**
   * @param {Departure[]} departures
   * @param {string} direction
   * @param {number} zoneSt
   * @returns {Departure[]}
   */
  filterDepartures: (departures, direction, zoneSt) => {
    const el = DOM.stationInput;
    const currentZone = utils.getZone(el.value);
    const now = Date.now() / 1000;

    const filters = {
      SW: (departure) => app.filterByDirection(departure, zoneSt, el, "south"),
      NE: (departure) => app.filterByDirection(departure, zoneSt, el, "north"),
    };

    departures = departures
      .filter((d) => d.tripInstance.trip.route.mode === "au4:trains")
      .filter((d) => d.stopTimeInstance.departure.time > now);

    window.departures = departures;

    if (filters[direction]) {
      departures = departures.filter(filters[direction]);
    }

    return departures
      .sort(
        (a, b) =>
          a.stopTimeInstance.departure.time - b.stopTimeInstance.departure.time
      )
      .slice(0, 6);
  },

  /**
   * @param {Departure} departure
   * @param {number} zoneSt
   * @param {HTMLInputElement} el
   * @param {string} direction
   * @returns {boolean}
   */
  filterByDirection: (departure, zoneSt, el, direction) => {
    const dest = departure.tripInstance.trip.headsign.headline;
    const destZone = utils.getZone(dest);
    const cel = el.value.toLowerCase().replace("station", "").trim();
    const del = dest.toLowerCase().replace("station", "").trim();

    if (zoneSt === destZone) {
      const celIndex = CONFIG.zones[zoneSt].stations.findIndex(
        (s) => s === cel
      );
      const delIndex = CONFIG.zones[zoneSt].stations.findIndex(
        (s) => s === del
      );

      if (
        (CONFIG.zones[zoneSt].order === 0 && celIndex < delIndex) ||
        (CONFIG.zones[zoneSt].order === 1 && celIndex > delIndex)
      ) {
        return direction == "south";
      }
    }

    return CONFIG.zones[zoneSt][direction].zones.includes(destZone);
  },

  /**
   * @param {number} i
   * @param {Departure} dep
   * @param {string} id
   * @param {string} thisStation
   * @returns {Promise<void>}
   */
  populateDepartureRow: async (i, dep, id, thisStation) => {
    const now = new Date();
    const time = now.getTime();
    const { nameOverrides, innerInnerCity, innerCity } = CONFIG;
    const plt = dep.stopTimeInstance.stop.disassembled.platformName;
    let det = dep.stopTimeInstance.departure.time;
    const delay = dep.stopTimeInstance.departure.delay || 0;
    const dest = app.getDestination(dep, nameOverrides);
    const isNGR = app.isNGR(dep);
    const isTCar = app.isTCar(dep);

    const stops = await app.fetchStops(dep);
    const upTo = stops.realtimePattern.findIndex(
      (v) => v.stop.parent.id === id
    );
    const futureStops = stops.realtimePattern
      .slice(upTo + 1)
      .map((v) =>
        v.stop.disassembled.stationName.replace("station", "").trim()
      );
      console.log(dep, futureStops);

    const color = app.getColor(dep, stops);
    const finalDest = app.getFinalDestination(futureStops, dest, thisStation);

    ui.setRowColor(i, color);
    app.updateRowContent(i, finalDest, plt, det, delay, time, isNGR, isTCar);
  },

  /**
   * @param {Departure} dep
   * @param {Record<string, string>} nameOverrides
   * @returns {string}
   */
  getDestination: (dep, nameOverrides) => {
    let dest = dep.tripInstance.trip.headsign.headline
      .trim()
      .replace(/ station$/, "")
      .trim();
    return nameOverrides[dest] || dest;
  },

  /**
   * @param {Departure} dep
   * @param {any} stops
   * @returns {string}
   */
  getColor: (dep, stops) => {
    let color = "#" + dep.tripInstance.trip.route.color;

    if (
      CONFIG.innerCity.stations.includes(
        utils.normalizeStationName(
          stops.realtimePattern[stops.realtimePattern.length - 1].stop.parent
            .fullName
        )
      )
    )
      color = CONFIG.innerCity.color;

    return color;
  },

  /**
   * @param {Departure} dep
   * @returns {boolean}
   */
  isNGR: (dep) => {
    return (
      dep.vehicle.vehicleModel &&
      (dep.vehicle.vehicleModel.includes("NGR") ||
        (dep.vehicle.vehicleModel.trim().length === 4 &&
          dep.vehicle.vehicleModel.trim()[0] === "D"))
    );
  },

  /**
   * @param {Departure} dep
   * @returns {boolean}
   */
  isTCar: (dep) => {
    return (
      dep.vehicle.vehicleModel &&
      (dep.vehicle.vehicleModel.includes("Run J") ||
        dep.vehicle.vehicleModel.includes("Run U") ||
        (dep.vehicle.vehicleModel.trim().length === 4 &&
          (dep.vehicle.vehicleModel.trim()[0] === "J" ||
            dep.vehicle.vehicleModel.trim()[0] === "U")))
    );
  },

  /**
   * @param {Departure} dep
   * @returns {Promise<any>}
   */
  fetchStops: async (dep) => {
    return (
      await cacheWrapper.fetch(
        utils.getURL(
          "https://anytrip.com.au/api/v3/region/au4/" + dep.tripInstance._path
        )
      )
    ).response;
  },

  /**
   * @param {string[]} futureStops
   * @param {string} dest
   * @param {string} thisStation
   * @returns {string}
   */
  getFinalDestination: (futureStops, dest, thisStation) => {
    if (
      futureStops.includes("Caboolture") &&
      futureStops[futureStops.length - 1] == "Nambour"
    ) {
      dest = "Caboolture / Namb";
    }

    if (
      !CONFIG.innerInnerCity.includes(
        thisStation.toLowerCase().replace(" station", "").trim()
      )
    ) {
      for (let stop of futureStops) {
        if (
          CONFIG.innerCity.stations.includes(stop.toLowerCase()) &&
          !futureStops[futureStops.length - 1].startsWith("Roma St")
        ) {
          dest = "City & " + dest;
          break;
        }
      }
    }
    return dest;
  },

  /**
   * @param {number} i
   * @param {string} dest
   * @param {string} plt
   * @param {number} det
   * @param {number} delay
   * @param {number} time
   * @param {boolean} isNGR
   * @param {boolean} isTCar
   */
  updateRowContent: (i, dest, plt, det, delay, time, isNGR, isTCar) => {
    const td = (v) =>
      document.querySelector("#tr" + i).querySelectorAll("td")[v];
    td(1).innerText = dest;
    td(2).classList.toggle("active", false);
    td(2).classList.add("inactive");
    td(2).setAttribute("contenteditable", "false");
    td(3).innerText = plt;

    ui.toggleCarType(i, isNGR ? "1" : "0");
    td(4).classList.toggle("active", isNGR || isTCar);
    td(4).classList.toggle("inactive", !(isNGR || isTCar));

    const detTime = det - delay;
    const deth = ((new Date(detTime * 1000).getHours() - 1) % 12) + 1;
    const detm = String(new Date(detTime * 1000).getMinutes()).padStart(2, "0");
    td(0).innerText = `${deth}:${detm}`;

    const estdepmin = Math.floor((det - time / 1000) / 60) % 60;
    const estdeph = Math.floor((det - time / 1000) / 3600);
    td(5).innerText = estdeph === 0 ? `${estdepmin} min` : `${deth}:${detm}`;
  },

  /**
   * @param {Departure[]} departures
   * @param {string} id
   * @param {string} thisStation
   * @returns {Promise<void>}
   */
  populateDepartureRows: async (departures, id, thisStation) => {
    DOM.rows.forEach((row, index) => {
      const departure = departures[index];
      if (departure) {
        app.populateDepartureRow(index + 1, departure, id, thisStation);
        ui.toggleRowVisibility(index + 1, "1");
      } else {
        ui.toggleRowVisibility(index + 1, "0");
      }
    });
  },
};

// Initialize the application
app.initialize();

// Expose needed functions to global scope for HTML event handlers
/**
 * @returns {void}
 */
window.takeshot = () => {
  html2canvas(DOM.container).then((canvas) => {
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "screenshot.png";
    link.click();
  });
};

/** @type {(rowNumber: number, setTo?: string) => void} */
window.hide = ui.toggleRowVisibility;
/** @type {(rowNumber: number, set?: string | null) => void} */
window.car3 = ui.toggleCarType;
/** @type {(rowNumber: number, color: string) => void} */
window.setColor = ui.setRowColor;
/** @type {() => Promise<void>} */
window.findClosestStop = utils.findClosestStop;
/** @type {() => Promise<void>} */
window.updateStationSW = () => app.updateDisplay("SW");
/** @type {() => Promise<void>} */
window.updateStationNE = () => app.updateDisplay("NE");
/** @type {() => Promise<void>} */
window.updateStationAll = () => app.updateDisplay("ALL");
