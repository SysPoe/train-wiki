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

// DOM Elements
const DOM = {
  container: document.querySelector(".container"),
  timeDisplay: document.querySelector(".time"),
  middleHeader: document.querySelector(".lmrmiddle"),
  stationInput: document.querySelector(".select-station input"),
  stationList: document.querySelector("#station-list"),
  rows: Array.from(document.querySelectorAll("[id^='tr']")),
};

// State Management
let state = {
  ctrlKeyPressed: false,
  stations: [],
  nameToID: new Map(),
};

// Utility Functions
const utils = {
  formatTime: (date) => {
    const hours = ((date.getHours() - 1) % 12) + 1;
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  },

  normalizeStationName: (name) =>
    name.toLowerCase().replace("station", "").trim(),

  getZone: (stationName) => {
    const normalized = utils.normalizeStationName(stationName);
    return CONFIG.zones.findIndex((zone) => zone.stations.includes(normalized));
  },

  getURL: (url) => {
    let qurl = new URL("https://corsproxy.io/");
    qurl.searchParams.set("url", url);
    return qurl.href;
  },
};

// UI Manipulation
const ui = {
  updateTime: () => {
    DOM.timeDisplay.textContent = utils.formatTime(new Date());
  },

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

  setRowColor: (rowNumber, color) => {
    const row = DOM.rows[rowNumber - 1];
    if (row) {
      row.style.backgroundColor = color;
      document.querySelector(`#colsel${rowNumber}`).value = color;
    }
  },
};

// API Service
const apiService = {
  fetchStations: async () => {
    try {
      const response = await fetch(
        utils.getURL(
          "https://anytrip.com.au/api/v3/region/au4/stops?limit=1000&modes=au4:trains&maxLat=-25.260733552498742&maxLon=155.34991455078128&minLat=-29.71149449264223&minLon=150.68798828125"
        )
      );
      const data = await response.json();
      state.stations = data.response.stops;
      state.nameToID = new Map(
        state.stations.map((s) => [s.stop.fullName, s.stop.id])
      );
    } catch (error) {
      console.error("Failed to fetch stations:", error);
    }
  },

  fetchDepartures: async (stationId) => {
    try {
      const response = await fetch(
        utils.getURL(
          `https://anytrip.com.au/api/v3/region/au4/departures/${encodeURIComponent(
            stationId
          )}?limit=250`
        )
      );
      return await response.json();
    } catch (error) {
      console.error("Failed to fetch departures:", error);
      return { response: { departures: [] } };
    }
  },

  fetchTripDetails: async (tripPath) => {
    try {
      const response = await fetch(
        utils.getURL(`https://anytrip.com.au/api/v3/region/au4/${tripPath}`)
      );
      return await response.json();
    } catch (error) {
      console.error("Failed to fetch trip details:", error);
      return { response: { realtimePattern: [] } };
    }
  },
};

// Core Application Logic
const app = {
  initialize: async () => {
    await apiService.fetchStations();
    app.populateStationList();
    app.setupEventListeners();

    if (window.location.hash) {
      const stationName = decodeURIComponent(window.location.hash.substring(1));
      DOM.stationInput.value = stationName;
      app.updateDisplay("NE");
    }
  },

  populateStationList: () => {
    DOM.stationList.innerHTML = state.stations
      .map(
        (s) => `<option value="${s.stop.fullName}">${s.stop.fullName}</option>`
      )
      .join("");
    DOM.stationInput.placeholder = "Enter station name...";
  },

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
  },
  updateDisplay: async (direction) => {
    const stationName = DOM.stationInput.value;
    const stationId = state.nameToID.get(stationName);

    if (!stationId) {
      console.error("Station not found");
      return;
    }

    const departures = await apiService.fetchDepartures(stationId);
    const filteredDepartures = app.filterDepartures(
      departures.response.departures,
      direction,
      utils.getZone(stationName)
    );

    ui.updateTime();
    app.populateDepartureRows(
      filteredDepartures,
      stationId,
      utils.normalizeStationName(stationName)
    );
  },

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
        return true;
      }
    }

    return CONFIG.zones[zoneSt][direction].zones.includes(destZone);
  },

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

    const color = app.getColor(dep, stops);
    const finalDest = app.getFinalDestination(futureStops, dest, thisStation);

    ui.setRowColor(i, color);
    app.updateRowContent(i, finalDest, plt, det, delay, time, isNGR, isTCar);
  },

  getDestination: (dep, nameOverrides) => {
    let dest = dep.tripInstance.trip.headsign.headline
      .trim()
      .replace(/ station$/, "")
      .trim();
    return nameOverrides[dest] || dest;
  },

  getColor: (dep, stops) => {
    let color = "#" + dep.tripInstance.trip.route.color;
    console.log(color);

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

  isNGR: (dep) => {
    return (
      dep.vehicle.vehicleModel &&
      (dep.vehicle.vehicleModel.includes("NGR") ||
        (dep.vehicle.vehicleModel.trim().length === 4 &&
          dep.vehicle.vehicleModel.trim()[0] === "D"))
    );
  },

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

  fetchStops: async (dep) => {
    const response = await fetch(
      utils.getURL(
        "https://anytrip.com.au/api/v3/region/au4/" + dep.tripInstance._path
      )
    );
    return (await response.json()).response;
  },

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
        if (CONFIG.innerCity.stations.includes(stop.toLowerCase())) {
          dest = "City & " + dest;
          break;
        }
      }
    }
    return dest;
  },

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
window.takeshot = () => {
  html2canvas(DOM.container).then((canvas) => {
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "screenshot.png";
    link.click();
  });
};

window.hide = ui.toggleRowVisibility;
window.car3 = ui.toggleCarType;
window.setColor = ui.setRowColor;
window.updateStationSW = () => app.updateDisplay("SW");
window.updateStationNE = () => app.updateDisplay("NE");
window.updateStationAll = () => app.updateDisplay("ALL");
