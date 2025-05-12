document.addEventListener('DOMContentLoaded', () => {
    const svgPath = '../../../media/MapsPosters/QR-Network-Diagram.svg'; // Path to your SVG
    const svgContainer = document.getElementById('svg-render-area');
    const elementTypeSelect = document.getElementById('elementType');
    const elementNameInput = document.getElementById('elementName');
    const addMarkButton = document.getElementById('addMarkButton');
    const removeMarkButton = document.getElementById('removeMarkButton');
    const exportButton = document.getElementById('exportButton');
    const selectedElementIdDisplay = document.getElementById('selectedElementId');

    let svgElement = null; // Will hold the loaded SVG DOM element
    let selectedElement = null; // Will hold the currently clicked SVG element
    let markedData = {}; // Store markup: { 'svgElementId': { type: '...', name: '...' } }
    let idCounter = 0; // For elements without an ID
    let panZoomInstance = null; // To hold the svg-pan-zoom instance

    // --- Load SVG ---
    fetch(svgPath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(svgText => {
            // Use DOMParser to properly parse SVG and allow scripting
            const parser = new DOMParser();
            const svgDoc = parser.parseFromString(svgText, "image/svg+xml");
            svgElement = svgDoc.documentElement; // Get the <svg> root element

            if (svgElement.tagName.toLowerCase() !== 'svg') {
                 console.error("Failed to parse SVG or root element is not <svg>");
                 svgContainer.innerHTML = '<p style="color:red;">Error loading SVG.</p>';
                 return;
            }

            // Clear the container and append the parsed SVG element
            svgContainer.innerHTML = ''; // Clear previous content/errors
            svgContainer.appendChild(svgElement);

            // --- Initialize Pan and Zoom ---
            // Ensure the SVG element is fully in the DOM before initializing
            requestAnimationFrame(() => { // Use requestAnimationFrame for better timing
                 panZoomInstance = svgPanZoom(svgElement, {
                    zoomEnabled: true,
                    panEnabled: true,
                    controlIconsEnabled: false, // We'll use native controls (mouse drag/scroll)
                    fit: true,       // Fit SVG into the container initially
                    center: true,    // Center SVG in the container initially
                    minZoom: 0.1,    // Example: Set min zoom level
                    maxZoom: 20,     // Example: Set max zoom level
                    zoomScaleSensitivity: 0.2, // Adjust zoom sensitivity
                    // Important: preventMouseEventsDefault: false allows our click listener to work
                    preventMouseEventsDefault: false
                });

                // Optional: Resize panZoom instance if window resizes
                window.addEventListener('resize', () => {
                    if (panZoomInstance) {
                        panZoomInstance.resize();
                        panZoomInstance.fit();
                        panZoomInstance.center();
                    }
                });

                // Now setup SVG interaction AFTER pan/zoom is ready
                setupSvgInteraction();
            });

        })
        .catch(error => {
            console.error('Error loading SVG:', error);
            svgContainer.innerHTML = `<p style="color:red;">Could not load SVG: ${error.message}</p>`;
        });

    // --- SVG Interaction ---
    function setupSvgInteraction() {
        if (!svgElement) return;

        // Attach click listener directly to the SVG element
        svgElement.addEventListener('click', (event) => {
            // Check if the pan-zoom library is panning (mouse drag)
            // This check might need adjustment depending on the library's internal state/events
            if (panZoomInstance && panZoomInstance.isDragging && panZoomInstance.isDragging()) {
                 return; // Don't select if panning
            }

            let target = event.target;

            // Try to find a meaningful parent if a sub-element (like tspan) is clicked
            while (target && target !== svgElement && !target.id && target.parentElement !== svgElement) {
                 if (target.parentElement && target.parentElement.id) { // Prefer parent with ID
                     target = target.parentElement;
                     break;
                 }
                 // If parent has no ID, keep going up until we hit the SVG root or a group just under SVG
                 if (target.parentElement === svgElement || (target.parentElement && target.parentElement.tagName.toLowerCase() === 'g' && target.parentElement.parentElement === svgElement)) {
                     break;
                 }
                 target = target.parentElement;
            }


            if (target && target !== svgElement && target.tagName.toLowerCase() !== 'svg') { // Ensure we didn't click the background or SVG root itself
                // Assign a temporary ID if none exists
                if (!target.id) {
                    // Check if it already has our temp ID format
                    if (!target.getAttribute('id')?.startsWith('temp-markup-id-')) {
                         target.setAttribute('id', `temp-markup-id-${idCounter++}`);
                    }
                }
                const elementId = target.getAttribute('id'); // Get ID safely

                // Remove highlight from previously selected
                if (selectedElement) {
                    selectedElement.classList.remove('selected');
                }

                // Highlight new selection
                selectedElement = target;
                selectedElement.classList.add('selected');
                selectedElementIdDisplay.textContent = elementId || 'None (check console)';
                 if (!elementId) {
                    console.warn("Selected element still has no ID after assignment attempt:", selectedElement);
                 }


                // Pre-fill form if element was already marked
                if (elementId && markedData[elementId]) {
                    elementTypeSelect.value = markedData[elementId].type;
                    elementNameInput.value = markedData[elementId].name || '';
                } else {
                     elementNameInput.value = ''; // Clear name if not marked
                }

            } else {
                // Clicked background or SVG root
                if (selectedElement) {
                    selectedElement.classList.remove('selected');
                }
                selectedElement = null;
                selectedElementIdDisplay.textContent = 'None';
                elementNameInput.value = '';
            }
            // Prevent the click from propagating further if needed,
            // though preventMouseEventsDefault: false should handle most cases.
            // event.stopPropagation();
        });
    }

    // --- Markup Logic ---
    addMarkButton.addEventListener('click', () => {
        if (!selectedElement) {
            alert('Please select an element in the SVG first.');
            return;
        }
        const elementId = selectedElement.getAttribute('id');
        if (!elementId) {
             alert('Selected element has no ID. Cannot add mark.');
             console.error("Attempted to mark element without ID:", selectedElement);
             return;
        }


        const elementType = elementTypeSelect.value;
        const elementName = elementNameInput.value.trim();

        markedData[elementId] = {
            type: elementType,
            name: elementName || null, // Store name, or null if empty
        };

        console.log('Mark added:', elementId, markedData[elementId]);
        alert(`Marked element '${elementId}' as ${elementType}` + (elementName ? ` with name '${elementName}'` : ''));
    });

     removeMarkButton.addEventListener('click', () => {
        if (!selectedElement) {
            alert('Please select an element to remove its mark.');
            return;
        }
        const elementId = selectedElement.getAttribute('id');
         if (!elementId) {
             alert('Selected element has no ID. Cannot remove mark.');
             console.error("Attempted to remove mark from element without ID:", selectedElement);
             return;
         }

        if (markedData[elementId]) {
            delete markedData[elementId];
            selectedElement.classList.remove('selected'); // Deselect visually
            selectedElementIdDisplay.textContent = 'None';
            elementNameInput.value = '';
            selectedElement = null;
            alert(`Mark removed for element '${elementId}'.`);
            console.log('Mark removed:', elementId);
        } else {
            alert(`Element '${elementId}' has no mark to remove.`);
        }
    });


    // --- Export Logic ---
    exportButton.addEventListener('click', () => {
        if (Object.keys(markedData).length === 0) {
            alert('No elements have been marked yet.');
            return;
        }

        // Define the output structure based on your 'types.js' idea
        const railwayData = {
            stations: [],
            tracks: [],
            signals: [],
            junctions: [],
            labels: [],
            other: []
        };

        for (const id in markedData) {
            const mark = markedData[id];
            const elementData = {
                id: id, // The SVG element ID
                name: mark.name,
            };

            switch (mark.type) {
                case 'station':
                    railwayData.stations.push(elementData);
                    break;
                case 'track':
                    elementData.trackType = 'mainline'; // Example default
                    railwayData.tracks.push(elementData);
                    break;
                case 'signal':
                    railwayData.signals.push(elementData);
                    break;
                case 'junction':
                    railwayData.junctions.push(elementData);
                    break;
                case 'label':
                    railwayData.labels.push(elementData);
                    break;
                default:
                    elementData.originalType = mark.type;
                    railwayData.other.push(elementData);
            }
        }

        // Format as JSON string
        const dataStr = JSON.stringify(railwayData, null, 2); // Pretty print JSON

        // Create downloadable file
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'railway_data.json';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        console.log('Exported Data:', railwayData);
    });

}); // End DOMContentLoaded
