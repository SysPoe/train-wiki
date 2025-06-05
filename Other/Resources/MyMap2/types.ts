// --- GeoJSON Base Types ---

// Basic coordinate representation (Longitude, Latitude, optional Altitude)
type Coordinate = [number, number] | [number, number, number];

interface GeoJSONPoint {
  type: "Point";
  coordinates: Coordinate;
}

interface GeoJSONLineString {
  type: "LineString";
  coordinates: Coordinate[];
}

// GeoJSON Polygon structure: outer ring + optional inner rings (holes)
interface GeoJSONPolygon {
  type: "Polygon";
  coordinates: Coordinate[][];
}

// --- Railway Element Types ---

export type ElectrificationType = "OHLE_25kV" | "ThirdRail_750V" | "Diesel" | "Other" | "None";
export type TrackGauge = "Standard_1435mm" | "Narrow_1067mm" | "Broad_1600mm" | "Other" | string; // Allow custom string gauges
export type TrackType = "Mainline" | "PassingLoop" | "Siding" | "YardTrack" | "DepotTrack";
export type PlatformAccessSide = "Left" | "Right" | "Both" | "None";
export type PointSwitchType = "Facing" | "Trailing" | "SingleSlip" | "DoubleSlip" | "Other";
export type SignalDirection = "Up" | "Down" | "BiDirectional";
export type SignalType = "Home" | "Distant" | "Shunting" | "Automatic" | "Repeater" | "Other";
export type LevelCrossingProtection = "FlashingLights" | "GatesAndLights" | "StopSigns" | "Open" | "ManualGates" | "Other";
export type StructureType = "Bridge" | "Tunnel" | "Viaduct" | "Culvert";
export type MarkerType = "Milepost" | "KilometrePost" | "GradientPost" | "Other";
export type FacilityType = "Siding" | "MarshallingYard" | "MaintenanceDepot" | "StablingYard";

export interface GradientPoint {
  locationAlongSegment: number; // Distance from start of segment (e.g., in meters)
  gradient: number; // e.g., 1 in 100 = 0.01, -1 in 50 = -0.02
}

export interface TrackSegment {
  id: string; // Unique identifier for the track segment
  lineId: string; // Identifier for the railway line
  trackIdentifier: string; // e.g., "Up Main", "Dn Main", "Loop 1", "Sdg 3"
  geometry: GeoJSONLineString; // Path of the track
  startNodeId: string; // ID of the element (Junction, Signal, Station boundary, etc.) at the start
  endNodeId: string; // ID of the element at the end
  maxPermittedSpeed?: number; // Speed limit (e.g., km/h), optional if varies significantly
  electrification: ElectrificationType;
  gauge: TrackGauge;
  type: TrackType;
  gradientProfile?: GradientPoint[]; // Optional detailed gradient info
  length?: number; // Optional pre-calculated length in meters
}

export interface Station {
  id: string; // Unique identifier for the station
  name: string; // Official name
  code?: string; // Short code (e.g., "BNE", "CST")
  location: GeoJSONPoint | GeoJSONPolygon; // Center point or boundary polygon
  platformIds: string[]; // List of IDs of platforms at this station
  connectingTrackSegmentIds: string[]; // Track segments serving or passing through
}

export interface Platform {
  id: string; // Unique identifier for the platform
  stationId: string; // ID of the parent station
  platformIdentifier: string; // Public ID (e.g., "1", "2A", "P3")
  associatedTrackSegmentId: string; // Track segment the platform directly serves
  location: GeoJSONPoint | GeoJSONLineString; // Point or line representing platform location/extent
  length?: number; // Physical length (meters)
  accessSide: PlatformAccessSide; // Side train doors open relative to track direction
}

export interface Junction {
  id: string; // Unique identifier for the junction
  name?: string; // Optional name
  location: GeoJSONPoint; // Geographic point of the junction center/reference
  connectingTrackSegmentIds: string[]; // Track segments meeting here
  associatedPointIds: string[]; // Points/switches forming this junction
}

export interface PointSwitch {
  id: string; // Unique identifier for the point/switch
  identifier: string; // Operational identifier (e.g., "21A", "P105B")
  location: GeoJSONPoint; // Geographic location
  associatedTrackSegmentIds: string[]; // IDs of tracks connected by this point (usually 2 or 3)
  type: PointSwitchType;
  normalPositionRoute?: string; // Optional description of the 'Normal' route
}

export interface Signal {
  id: string; // Unique identifier for the signal
  identifier: string; // Operational identifier (e.g., "SY102", "R5")
  location: GeoJSONPoint; // Geographic location
  associatedTrackSegmentId: string; // Track segment this signal primarily applies to
  direction: SignalDirection; // Direction of travel it applies to
  type: SignalType;
  function?: string; // e.g., "Block Section", "Junction Protection", "Station Limit"
  kilometerMarker?: number; // Optional precise location reference
}

export interface LevelCrossing {
  id: string; // Unique identifier
  name?: string; // Road name or identifier
  location: GeoJSONPoint; // Geographic location
  associatedTrackSegmentIds: string[]; // Tracks crossing the road
  protectionType: LevelCrossingProtection;
}

export interface Structure {
  id: string; // Unique identifier
  name?: string; // Optional name (e.g., "Story Bridge", "Airport Link Tunnel")
  type: StructureType;
  geometry: GeoJSONLineString | GeoJSONPolygon; // Extent of the structure
  affectedTrackSegmentIds: string[]; // Tracks passing through/over
}

export interface Marker {
  id: string; // Unique identifier
  type: MarkerType;
  value: string | number; // e.g., "105.5", "KM 23", "1 in 80"
  location: GeoJSONPoint; // Geographic location
  associatedTrackSegmentId: string; // Track segment marker is located on
}

export interface SidingYard {
  id: string; // Unique identifier
  name: string; // Name of the facility
  type: FacilityType;
  boundary: GeoJSONPolygon; // Geographic area
  entryPointIds: string[]; // IDs of points/junctions providing access
  containedTrackSegmentIds: string[]; // Track segments primarily within this facility
}

// --- Root Schema Structure ---

export interface RailwayNetworkElements {
  trackSegments: TrackSegment[];
  stations: Station[];
  platforms: Platform[];
  junctions: Junction[];
  pointsSwitches: PointSwitch[];
  signals: Signal[];
  levelCrossings: LevelCrossing[];
  structures: Structure[];
  markers: Marker[];
  sidingsYards: SidingYard[];
  // Can add other static element arrays here, e.g., baliseGroups, powerSections etc.
}

export interface StaticRailwayNetworkSchema {
  schemaVersion: string;
  networkName: string;
  region?: string; // Optional region description
  coordinateSystem: string; // e.g., "EPSG:4326" (WGS 84) or a projected CRS code
  lastUpdated: string; // ISO 8601 Date string (e.g., "2025-04-11T00:00:00Z")
  elements: RailwayNetworkElements;
}
