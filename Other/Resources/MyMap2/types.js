/**
 * @fileoverview JSDoc type definitions for a Static Railway Network Schema.
 * These types describe the fixed infrastructure of a railway network.
 */

// --- GeoJSON Base Types ---

/**
 * Basic coordinate representation (Longitude, Latitude, optional Altitude).
 * @typedef {[number, number] | [number, number, number]} Coordinate
 */

/**
 * GeoJSON Point geometry object.
 * @typedef {object} GeoJSONPoint
 * @property {"Point"} type - The geometry type.
 * @property {Coordinate} coordinates - The point's coordinates.
 */

/**
 * GeoJSON LineString geometry object.
 * @typedef {object} GeoJSONLineString
 * @property {"LineString"} type - The geometry type.
 * @property {Array<Coordinate>} coordinates - An array of coordinates forming the line.
 */

/**
 * GeoJSON Polygon geometry object. Represents an area with an outer ring and optional inner rings (holes).
 * @typedef {object} GeoJSONPolygon
 * @property {"Polygon"} type - The geometry type.
 * @property {Array<Array<Coordinate>>} coordinates - An array of linear rings (the first is the outer ring, subsequent are inner rings/holes).
 */

// --- Enumerated String Literal Types ---

/**
 * Possible types of railway electrification.
 * @typedef {"OHLE_25kV" | "ThirdRail_750V" | "Diesel" | "Other" | "None"} ElectrificationType
 */

/**
 * Possible track gauges. Allows standard values or custom strings.
 * @typedef {"Standard_1435mm" | "Narrow_1067mm" | "Broad_1600mm" | "Other" | string} TrackGauge
 */

/**
 * Possible types classifying a track segment's primary function.
 * @typedef {"Mainline" | "PassingLoop" | "Siding" | "YardTrack" | "DepotTrack"} TrackType
 */

/**
 * Specifies which side of the track platform access is located relative to train travel direction.
 * @typedef {"Left" | "Right" | "Both" | "None"} PlatformAccessSide
 */

/**
 * Types of point/switch mechanisms.
 * @typedef {"Facing" | "Trailing" | "SingleSlip" | "DoubleSlip" | "Other"} PointSwitchType
 */

/**
 * Direction of travel a signal applies to.
 * @typedef {"Up" | "Down" | "BiDirectional"} SignalDirection
 */

/**
 * Types of railway signals based on function/placement.
 * @typedef {"Home" | "Distant" | "Shunting" | "Automatic" | "Repeater" | "Other"} SignalType
 */

/**
 * Types of protection mechanisms at level crossings.
 * @typedef {"FlashingLights" | "GatesAndLights" | "StopSigns" | "Open" | "ManualGates" | "Other"} LevelCrossingProtection
 */

/**
 * Types of major railway structures.
 * @typedef {"Bridge" | "Tunnel" | "Viaduct" | "Culvert"} StructureType
 */

/**
 * Types of location markers along the track.
 * @typedef {"Milepost" | "KilometrePost" | "GradientPost" | "Other"} MarkerType
 */

/**
 * Types of railway facilities like yards and depots.
 * @typedef {"Siding" | "MarshallingYard" | "MaintenanceDepot" | "StablingYard"} FacilityType
 */

// --- Railway Element Object Types ---

/**
 * Represents a point with gradient information along a track segment.
 * @typedef {object} GradientPoint
 * @property {number} locationAlongSegment - Distance from start of segment (e.g., in meters).
 * @property {number} gradient - Gradient value (e.g., 1 in 100 = 0.01, -1 in 50 = -0.02).
 */

/**
 * Represents a continuous piece of track between two defined points.
 * @typedef {object} TrackSegment
 * @property {string} id - Unique identifier for the track segment.
 * @property {string} lineId - Identifier for the railway line this segment belongs to.
 * @property {string} trackIdentifier - Operational identifier (e.g., "Up Main", "Loop 1").
 * @property {GeoJSONLineString} geometry - Geographic path of the track.
 * @property {string} startNodeId - ID of the element (Junction, Signal, etc.) at the start.
 * @property {string} endNodeId - ID of the element at the end.
 * @property {?number} [maxPermittedSpeed] - Optional maximum permitted speed (e.g., km/h).
 * @property {ElectrificationType} electrification - Status of electrification.
 * @property {TrackGauge} gauge - Track gauge.
 * @property {TrackType} type - Functional type of the track.
 * @property {?Array<GradientPoint>} [gradientProfile] - Optional detailed gradient information.
 * @property {?number} [length] - Optional pre-calculated length in meters.
 */

/**
 * Represents a passenger or freight station.
 * @typedef {object} Station
 * @property {string} id - Unique identifier for the station.
 * @property {string} name - Official name of the station.
 * @property {?string} [code] - Optional short code (e.g., "BNE", "CST").
 * @property {GeoJSONPoint | GeoJSONPolygon} location - Geographic center point or boundary polygon.
 * @property {Array<string>} platformIds - List of IDs of platforms belonging to this station.
 * @property {Array<string>} connectingTrackSegmentIds - List of IDs of track segments directly serving or passing through the station area.
 */

/**
 * Represents a specific platform within a station.
 * @typedef {object} Platform
 * @property {string} id - Unique identifier for the platform.
 * @property {string} stationId - ID of the parent station.
 * @property {string} platformIdentifier - Public identifier (e.g., "1", "2A", "P3").
 * @property {string} associatedTrackSegmentId - ID of the track segment the platform directly serves.
 * @property {GeoJSONPoint | GeoJSONLineString} location - Geographic point or line representing platform location/extent.
 * @property {?number} [length] - Optional physical length of the platform (meters).
 * @property {PlatformAccessSide} accessSide - Side train doors open relative to track direction.
 */

/**
 * Represents a location where tracks diverge or merge.
 * @typedef {object} Junction
 * @property {string} id - Unique identifier for the junction.
 * @property {?string} [name] - Optional name of the junction.
 * @property {GeoJSONPoint} location - Geographic point representing the junction center/reference.
 * @property {Array<string>} connectingTrackSegmentIds - List of IDs of track segments meeting at this junction.
 * @property {Array<string>} associatedPointIds - List of IDs of points/switches that form this junction.
 */

/**
 * Represents the physical location and identity of a set of points/switch.
 * (Static data only: location, type, connections - not current state).
 * @typedef {object} PointSwitch
 * @property {string} id - Unique identifier for the point/switch.
 * @property {string} identifier - Operational identifier (e.g., "21A", "P105B").
 * @property {GeoJSONPoint} location - Geographic location.
 * @property {Array<string>} associatedTrackSegmentIds - IDs of the track segments connected by this point.
 * @property {PointSwitchType} type - Type of point mechanism.
 * @property {?string} [normalPositionRoute] - Optional description of which route is set when the point is 'Normal'.
 */

/**
 * Represents the physical location and identity of a signal.
 * (Static data only: location, type, purpose - not current aspect).
 * @typedef {object} Signal
 * @property {string} id - Unique identifier for the signal.
 * @property {string} identifier - Operational identifier (e.g., "SY102", "R5").
 * @property {GeoJSONPoint} location - Geographic location.
 * @property {string} associatedTrackSegmentId - ID of the track segment this signal primarily applies to.
 * @property {SignalDirection} direction - Direction of travel the signal applies to.
 * @property {SignalType} type - Type of signal.
 * @property {?string} [function] - Optional description of purpose (e.g., "Block Section", "Junction Protection").
 * @property {?number} [kilometerMarker] - Optional precise location reference along the line.
 */

/**
 * Represents a location where the railway intersects a road at the same level.
 * @typedef {object} LevelCrossing
 * @property {string} id - Unique identifier for the level crossing.
 * @property {?string} [name] - Optional name or road identifier.
 * @property {GeoJSONPoint} location - Geographic location.
 * @property {Array<string>} associatedTrackSegmentIds - IDs of track segments crossing the road.
 * @property {LevelCrossingProtection} protectionType - Type of protection installed.
 */

/**
 * Represents significant engineering structures like bridges or tunnels.
 * @typedef {object} Structure
 * @property {string} id - Unique identifier for the structure.
 * @property {?string} [name] - Optional name of the structure.
 * @property {StructureType} type - "Bridge" or "Tunnel", etc.
 * @property {GeoJSONLineString | GeoJSONPolygon} geometry - Geographic representation (line or area).
 * @property {Array<string>} affectedTrackSegmentIds - IDs of track segments passing through/over the structure.
 */

/**
 * Represents reference points like mileposts or kilometre markers.
 * @typedef {object} Marker
 * @property {string} id - Unique identifier for the marker.
 * @property {MarkerType} type - "Milepost" or "KilometrePost", etc.
 * @property {string | number} value - The distance or gradient value displayed.
 * @property {GeoJSONPoint} location - Geographic location.
 * @property {string} associatedTrackSegmentId - ID of the track segment the marker is located on.
 */

/**
 * Represents areas used for stabling, marshalling, or maintenance (sidings, yards, depots).
 * @typedef {object} SidingYard
 * @property {string} id - Unique identifier for the facility.
 * @property {string} name - Name of the facility.
 * @property {FacilityType} type - Type of facility.
 * @property {GeoJSONPolygon} boundary - Geographic area covered by the facility.
 * @property {Array<string>} entryPointIds - IDs of points/junctions providing access.
 * @property {Array<string>} containedTrackSegmentIds - IDs of track segments primarily within this facility.
 */

// --- Root Schema Structure ---

/**
 * Collection container for all static railway network element arrays.
 * @typedef {object} RailwayNetworkElements
 * @property {Array<TrackSegment>} trackSegments
 * @property {Array<Station>} stations
 * @property {Array<Platform>} platforms
 * @property {Array<Junction>} junctions
 * @property {Array<PointSwitch>} pointsSwitches
 * @property {Array<Signal>} signals
 * @property {Array<LevelCrossing>} levelCrossings
 * @property {Array<Structure>} structures
 * @property {Array<Marker>} markers
 * @property {Array<SidingYard>} sidingsYards
 * @property {?Object.<string, Array<object>>} [additionalElements] - Optional placeholder for other custom element types.
 */

/**
 * Root object definition for the static railway network schema.
 * @typedef {object} StaticRailwayNetworkSchema
 * @property {string} schemaVersion - Version identifier for this schema structure.
 * @property {string} networkName - Name of the railway network represented.
 * @property {?string} [region] - Optional description of the geographic region covered.
 * @property {string} coordinateSystem - Identifier for the coordinate reference system used (e.g., "EPSG:4326").
 * @property {string} lastUpdated - ISO 8601 Date string indicating when the static data was last updated (e.g., "2025-04-11T00:00:00Z").
 * @property {RailwayNetworkElements} elements - The container object holding all network element arrays.
 */