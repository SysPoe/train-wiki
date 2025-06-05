document.addEventListener('DOMContentLoaded', () => {
    // --- Sample Data (Conforming to StaticRailwayNetworkSchema structure) ---
    // NOTE: Using simple X/Y coordinates directly for demonstration.
    // In a real application, these 'coordinates' would be derived from
    // geographic coordinates (Lat/Lon) via a projection function.
    /** @type {StaticRailwayNetworkSchema} */
    const sampleNetworkData = {
        schemaVersion: "1.0",
        networkName: "Sample Net",
        coordinateSystem: "Example XY", // Indicate not geographic
        lastUpdated: "2025-04-11T00:00:00Z",
        elements: {
            trackSegments: [
                { id: "ts-01", lineId: "L1", trackIdentifier: "Main", type: "Mainline", electrification: "None", gauge: "Standard", startNodeId: "j-01", endNodeId: "st-A", geometry: { type: "LineString", coordinates: [[50, 50], [250, 50]] } },
                { id: "ts-02", lineId: "L1", trackIdentifier: "Main", type: "Mainline", electrification: "None", gauge: "Standard", startNodeId: "st-A", endNodeId: "j-02", geometry: { type: "LineString", coordinates: [[250, 50], [450, 50]] } },
                { id: "ts-03", lineId: "L2", trackIdentifier: "Branch", type: "Mainline", electrification: "None", gauge: "Standard", startNodeId: "j-01", endNodeId: "st-B", geometry: { type: "LineString", coordinates: [[50, 50], [150, 150]] } },
                { id: "ts-04", lineId: "L1", trackIdentifier: "Sdg A", type: "Siding", electrification: "None", gauge: "Standard", startNodeId: "st-A", endNodeId: "buffer-01", geometry: { type: "LineString", coordinates: [[250, 50], [300, 80], [250, 110]] } }
            ],
            stations: [
                { id: "st-A", name: "Alpha Station", code: "ALP", location: { type: "Point", coordinates: [250, 50] }, platformIds: ["p1", "p2"], connectingTrackSegmentIds: ["ts-01", "ts-02", "ts-04"] },
                { id: "st-B", name: "Bravo Station", code: "BRV", location: { type: "Point", coordinates: [150, 150] }, platformIds: ["p3"], connectingTrackSegmentIds: ["ts-03"] }
            ],
            platforms: [ // Note: Platforms are not explicitly rendered in this basic example
                 { id: "p1", stationId: "st-A", platformIdentifier: "1", associatedTrackSegmentId: "ts-01", length: 100, accessSide: "Left" },
                 { id: "p2", stationId: "st-A", platformIdentifier: "2", associatedTrackSegmentId: "ts-02", length: 100, accessSide: "Right" },
                 { id: "p3", stationId: "st-B", platformIdentifier: "1", associatedTrackSegmentId: "ts-03", length: 80, accessSide: "Left" },
            ],
            junctions: [
                { id: "j-01", name: "West Junction", location: { type: "Point", coordinates: [50, 50] }, connectingTrackSegmentIds: ["ts-01", "ts-03"], associatedPointIds: ["sw-01"] },
                 { id: "j-02", name: "East Junction", location: { type: "Point", coordinates: [450, 50] }, connectingTrackSegmentIds: ["ts-02"], associatedPointIds: [] }
            ],
            pointsSwitches: [ // Note: Switches are not explicitly rendered in this basic example
                { id: "sw-01", identifier: "1A", location: { type: "Point", coordinates: [55, 50] }, associatedTrackSegmentIds: ["ts-01", "ts-03"], type: "Facing" }
             ],
            signals: [
                { id: "sig-01", identifier: "A1", location: { type: "Point", coordinates: [230, 40] }, associatedTrackSegmentId: "ts-01", direction: "Up", type: "Home" },
                { id: "sig-02", identifier: "A2", location: { type: "Point", coordinates: [270, 60] }, associatedTrackSegmentId: "ts-02", direction: "Down", type: "Home" },
                { id: "sig-03", identifier: "B1", location: { type: "Point", coordinates: [140, 140] }, associatedTrackSegmentId: "ts-03", direction: "Down", type: "Home" },
            ],
            // Add other element arrays as needed (levelCrossings, structures, markers, sidingsYards)
            levelCrossings: [],
            structures: [],
            markers: [],
            sidingsYards: []
        }
    };
    // --- SVG Namespace ---
    const SVG_NS = "http://www.w3.org/2000/svg";
    // --- DOM Elements ---
    const svg = document.getElementById('railway-map-svg');
    const resetButton = document.getElementById('reset-view-button'); // Still exists in original HTML, kept for potential future use
    let mainGroup; // Will be created in renderNetwork

    // --- View State ---
    let scale = 1.0;
    let translateX = 0;
    let translateY = 0;
    let isPanning = false;
    let startPanX = 0;
    let startPanY = 0;
    const minScale = 0.2;
    const maxScale = 10.0;
    const zoomSensitivity = 0.005;
    // --- Rendering Functions ---

    /**
     * Clears and renders the entire network.
     * @param {StaticRailwayNetworkSchema} networkData
     */
    function renderNetwork(networkData) {
        // Clear previous content
        while (svg.firstChild) {
            svg.removeChild(svg.firstChild);
        }

        // Create the main group for panning and zooming
        mainGroup = document.createElementNS(SVG_NS, 'g');
        mainGroup.id = 'map-content';
        svg.appendChild(mainGroup);

        // Render elements - Order matters for layering (draw tracks first)
        if (networkData.elements.trackSegments) {
            networkData.elements.trackSegments.forEach(segment => renderTrackSegment(segment, mainGroup));
        }
        if (networkData.elements.junctions) {
            networkData.elements.junctions.forEach(junction => renderJunction(junction, mainGroup));
        }
        if (networkData.elements.signals) {
            networkData.elements.signals.forEach(signal => renderSignal(signal, mainGroup));
        }
        if (networkData.elements.stations) {
            networkData.elements.stations.forEach(station => renderStation(station, mainGroup));
        }
        // Add calls to render other element types here...

        // Apply initial transform
        updateTransform();
    }

    /**
     * Renders a single track segment.
     * @param {TrackSegment} segment
     * @param {SVGGElement} group The parent group to append to.
     */
    function renderTrackSegment(segment, group) {
        const polyline = document.createElementNS(SVG_NS, 'polyline');
        // IMPORTANT: In a real app, segment.geometry.coordinates needs projection!
        const points = segment.geometry.coordinates.map(coord => `${coord[0]},${coord[1]}`).join(' ');
        polyline.setAttribute('points', points);
        polyline.setAttribute('class', `track ${segment.type.toLowerCase()}`); // e.g., track mainline, track siding
        group.appendChild(polyline);
    }

    /**
     * Renders a single station.
     * @param {Station} station
     * @param {SVGGElement} group The parent group to append to.
     */
    function renderStation(station, group) {
        // IMPORTANT: In a real app, station.location.coordinates needs projection!
        const [cx, cy] = station.location.coordinates;

        const stationGroup = document.createElementNS(SVG_NS, 'g');
        stationGroup.setAttribute('class', 'station-group');
        // Station Marker (Circle)
        const marker = document.createElementNS(SVG_NS, 'circle');
        marker.setAttribute('cx', cx);
        marker.setAttribute('cy', cy);
        // marker.setAttribute('r', 5 / scale); // Make radius scale inversely with zoom slightly? Or fixed: 5
        marker.setAttribute('r', 5);
        marker.setAttribute('class', 'station-marker');
        stationGroup.appendChild(marker);
        // Station Label (Text)
        const label = document.createElementNS(SVG_NS, 'text');
        label.setAttribute('x', cx);
        label.setAttribute('y', cy + 7); // Position slightly below marker
        label.setAttribute('class', 'station-label');
        label.textContent = station.code || station.name; // Use code if available, else name
        stationGroup.appendChild(label);
        group.appendChild(stationGroup);
    }

    /**
     * Renders a single junction.
     * @param {Junction} junction
     * @param {SVGGElement} group The parent group to append to.
     */
    function renderJunction(junction, group) {
        // IMPORTANT: In a real app, junction.location.coordinates needs projection!
        const [cx, cy] = junction.location.coordinates;
        const marker = document.createElementNS(SVG_NS, 'circle');
        marker.setAttribute('cx', cx);
        marker.setAttribute('cy', cy);
        marker.setAttribute('r', 3); // Smaller than station
        marker.setAttribute('class', 'junction-marker');
        group.appendChild(marker);
    }

     /**
     * Renders a single signal.
     * @param {Signal} signal
     * @param {SVGGElement} group The parent group to append to.
     */
    function renderSignal(signal, group) {
         // IMPORTANT: In a real app, signal.location.coordinates needs projection!
        const [x, y] = signal.location.coordinates;
        // Simple square for signal representation
        const marker = document.createElementNS(SVG_NS, 'rect');
        const size = 4;
        marker.setAttribute('x', x - size / 2);
        marker.setAttribute('y', y - size / 2);
        marker.setAttribute('width', size);
        marker.setAttribute('height', size);
        marker.setAttribute('class', 'signal-marker');
        // TODO: Could add rotation based on direction/track angle
        group.appendChild(marker);
    }

    // --- Interaction Logic ---

    /** Applies the current scale and translation to the main group */
    function updateTransform() {
        if (mainGroup) {
             mainGroup.setAttribute('transform', `translate(${translateX} ${translateY}) scale(${scale})`);
             // Optional: Update CSS variable for non-scaling elements if needed
             // svg.style.setProperty('--map-scale', scale);
        }
    }

    /** Resets view to initial state */
    function resetView() {
        scale = 1.0;
        translateX = 0;
        translateY = 0;
        updateTransform();
    }


    /** Handles mouse down for panning */
    function handleMouseDown(event) {
        // Only pan with left mouse button
        if (event.button !== 0) return;
        isPanning = true;
        startPanX = event.clientX;
        startPanY = event.clientY;
        svg.style.cursor = 'grabbing'; // Change cursor
        // Prevent text selection during drag
        event.preventDefault();
    }

    /** Handles mouse move for panning */
    function handleMouseMove(event) {
        if (!isPanning) return;
        const dx = event.clientX - startPanX;
        const dy = event.clientY - startPanY;
        // Update translation
        // No need to divide by scale here because the translation is applied
        // *before* the scale in the transform attribute's coordinate system.
        translateX += dx;
        translateY += dy;

        // Update start position for next move event
        startPanX = event.clientX;
        startPanY = event.clientY;

        updateTransform();
    }

    /** Handles mouse up / leave to stop panning */
    function handleMouseUpOrLeave(event) {
        if (isPanning) {
            isPanning = false;
            svg.style.cursor = 'grab'; // Restore cursor
        }
    }

    /** Handles wheel event for zooming */
    function handleWheel(event) {
        event.preventDefault(); // Prevent page scrolling

        const wheelDelta = event.deltaY;
        const zoomIntensity = Math.abs(wheelDelta) * zoomSensitivity;

        // Get mouse position relative to SVG element
        const svgRect = svg.getBoundingClientRect();
        const mouseX = event.clientX - svgRect.left;
        const mouseY = event.clientY - svgRect.top;
        // Calculate the point in the SVG's coordinate system *before* zoom
        // This is the point we want to keep stationary under the mouse
        const pointX = (mouseX - translateX) / scale;
        const pointY = (mouseY - translateY) / scale;

        // Calculate new scale
        let newScale = scale;
        if (wheelDelta < 0) { // Zoom in
            newScale = Math.min(maxScale, scale * (1 + zoomIntensity));
        } else { // Zoom out
            newScale = Math.max(minScale, scale / (1 + zoomIntensity));
        }

        // Calculate the new translation required to keep the mouse point stationary
        translateX = mouseX - pointX * newScale;
        translateY = mouseY - pointY * newScale;
        scale = newScale;

        updateTransform();
    }

    /** Sets up all interaction event listeners */
    function setupInteractionListeners() {
        svg.addEventListener('wheel', handleWheel, { passive: false }); // Need passive: false to preventDefault
        svg.addEventListener('mousedown', handleMouseDown);
        svg.addEventListener('mousemove', handleMouseMove);
        svg.addEventListener('mouseup', handleMouseUpOrLeave);
        svg.addEventListener('mouseleave', handleMouseUpOrLeave); // Stop panning if mouse leaves SVG

        // resetButton might be null if the element was removed from HTML
        if (resetButton) {
            resetButton.addEventListener('click', resetView);
        }
    }

    // --- Initialisation ---
    renderNetwork(sampleNetworkData); // Render the initial view
    setupInteractionListeners(); // Set up pan/zoom handlers

}); // End DOMContentLoaded