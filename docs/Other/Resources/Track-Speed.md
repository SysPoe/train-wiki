<style>
    /* General Styles */
    .track-calc-container {
        max-width: 32rem;
        margin-left: auto;
        margin-right: auto;
        font-family: 'Inter', sans-serif;
    }
    .message-box {
        position: fixed;
        bottom: 1rem;
        right: 1rem;
        max-width: 20rem;
        padding: 1rem;
        border-radius: 0.5rem;
        box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
        transition-property: opacity;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        transition-duration: 300ms;
        opacity: 0;
        visibility: hidden;
        z-index: 50;
        font-size: 0.875rem;
        line-height: 1.25rem;
    }
    .message-box.visible {
        opacity: 1;
        visibility: visible;
    }
    .message-box.success {
        background-color: #d1fae5;
        border: 1px solid #6ee7b7;
        color: #065f46;
    }
    .message-box.error {
        background-color: #fee2e2;
        border: 1px solid #fca5a5;
        color: #991b1b;
    }
    .calculator-section {
        background-color: white;
        padding: 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
        margin-bottom: 1.5rem;
    }
    h2 {
        font-size: 1.125rem;
        line-height: 1.75rem;
        font-weight: 600;
        color: #374151;
        margin-bottom: 0.5rem;
    }
     h3 {
        text-align: center;
        font-size: 0.875rem;
        line-height: 1.25rem;
        font-weight: 500;
        color: #374151;
        margin-bottom: 0.5rem;
    }
    label {
        display: block;
        font-size: 0.875rem;
        line-height: 1.25rem;
        font-weight: 500;
        color: #374151;
        margin-bottom: 0.25rem;
    }
    select, input[type="number"] {
        margin-top: 0.25rem;
        display: block;
        width: 100%;
        padding: 0.5rem 0.75rem;
        background-color: white;
        border: 1px solid #d1d5db;
        border-radius: 0.375rem;
        box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
        outline: 2px solid transparent;
        outline-offset: 2px;
        font-size: 0.875rem;
        line-height: 1.25rem;
    }
    select:focus, input[type="number"]:focus {
       border-color: #4f46e5;
       box-shadow: 0 0 0 1px #4f46e5;
    }
    input.auto-updated {
         background-color: #f3f4f6; /* Slightly different background for calculated fields */
    }
    .preset-select-container {
        margin-bottom: 1rem;
    }
    p.description {
        font-size: 0.875rem;
        line-height: 1.25rem;
        color: #6b7280;
        margin-bottom: 1rem;
    }
    .input-grid {
        display: grid;
        grid-template-columns: repeat(1, minmax(0, 1fr));
        gap: 0 1rem;
    }
    @media (min-width: 768px) {
        .input-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }
        hr.grid-span-2 {
             grid-column: span 2 / span 2;
        }
    }
    .input-group {
        margin-bottom: 1rem;
    }
    .tooltip-text {
        font-size: 0.75rem;
        line-height: 1rem;
        color: #6b7280;
        margin-top: 0.25rem;
    }
    hr {
        margin-top: 1rem;
        margin-bottom: 1rem;
        border-color: #e5e7eb;
        border-top-width: 1px;
    }
    .g-force-display {
        font-size: 0.875rem; /* text-sm */
        color: #4b5563; /* text-gray-600 */
        margin-top: 1rem; /* mt-4 */
        text-align: center;
    }
    .g-force-display span {
        font-weight: 600; /* font-semibold */
        color: #1f2937; /* text-gray-800 */
    }
    .visualization-section {
        margin-top: 1.5rem; /* mt-6 */
        padding-top: 1rem; /* pt-4 */
        border-top: 1px solid #e5e7eb; /* border-t border-gray-200 */
    }
    .visualization-container {
        padding: 1rem; /* p-4 */
        border: 1px solid #e5e7eb; /* border border-gray-200 */
        border-radius: 0.375rem; /* rounded-md */
        background-color: #f9fafb; /* bg-gray-50 */
        overflow: hidden;
    }
    #trackVisualization {
        width: 100%;
        height: auto;
        display: block;
    }
    #trackVisualization text {
        font-size: 10px; /* SVG text needs explicit size */
    }
    #visGaugeText { fill: #374151; }
    #visCantText { fill: #4338ca; }
    #visDeficiencyText { fill: #dc2626; }
    #visDeficiencyLine { color: #dc2626; } /* For arrowhead marker */

</style>

<div class="track-calc-container">

    <div id="messageBox" class="message-box">
        <span id="messageText"></span>
    </div>

    <div class="calculator-section">
        <h2>Enter Parameters</h2>

        <div class="preset-select-container">
             <label for="presets">Load Preset:</label>
             <select id="presets" name="presets">
                 </select>
        </div>

        <p class="description">Adjust Radius or Speed. Values update automatically.</p>

        <div class="input-grid">
            <div class="input-group">
                <label for="gauge">Track Gauge (mm)</label>
                <input type="number" id="gauge" value="1435">
            </div>
            <div class="input-group">
                 <label for="superelevation">Superelevation (Cant) (mm)</label>
                 <input type="number" id="superelevation" value="100">
                 <p class="tooltip-text">
                    The difference in elevation (height) between the outer and inner rail on a curve. Helps counteract centrifugal force. Also known as 'cant'.
                 </p>
            </div>
            <div class="input-group">
                <label for="cantDeficiency">Max Cant Deficiency (mm)</label>
                <input type="number" id="cantDeficiency" value="110">
                 <p class="tooltip-text">
                    Difference between actual cant and the theoretical cant needed for equilibrium. Represents unbalanced force felt by passengers. Limited by regulations.
                 </p>
            </div>
            <div></div> <hr class="grid-span-2">

            <div class="input-group">
                <label for="radius">Curve Radius (m)</label>
                <input type="number" id="radius" value="500">
            </div>
            <div class="input-group">
                <label for="speed">Max Speed (km/h)</label>
                <input type="number" id="speed" value=""> </div>
        </div>

        <div class="g-force-display">
            Approx. Lateral Force: <span id="gForceValue">0.000</span> G
        </div>

         <div class="visualization-section">
             <h3>Track Geometry Visualization (Approx.)</h3>
             <div class="visualization-container">
                 <svg id="trackVisualization" viewBox="0 0 400 150" preserveAspectRatio="xMidYMid meet">
                    <defs>
                        <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto" markerUnits="userSpaceOnUse">
                             <path d="M0,0 L8,3 L0,6 Z" fill="currentColor"/>
                        </marker>
                    </defs>
                    <g id="visGroup" transform="translate(0 5)">
                        <rect id="visSleeper" x="50" y="100" width="300" height="15" fill="#a1887f" rx="2"/>
                        <rect id="visLowRail" x="75" y="90" width="15" height="10" fill="#616161" rx="1"/>
                        <rect id="visHighRail" x="310" y="90" width="15" height="10" fill="#616161" rx="1"/>
                        <line id="visGaugeLine" x1="82.5" y1="90" x2="317.5" y2="90" stroke="#424242" stroke-width="1" stroke-dasharray="4 2"/>
                        <text id="visGaugeText" x="200" y="85" text-anchor="middle">Gauge: 1435 mm</text>
                        <line id="visCantLine" x1="317.5" y1="100" x2="317.5" y2="90" stroke="#3f51b5" stroke-width="2"/>
                        <text id="visCantText" x="325" y="95" text-anchor="start">E: 100 mm</text>
                        <line id="visDeficiencyLine" x1="317.5" y1="90" x2="357.5" y2="70" stroke="#f44336" stroke-width="2" marker-end="url(#arrowhead)"/>
                        <text id="visDeficiencyText" x="360" y="70" text-anchor="start">Cd: 110 mm</text>
                    </g>
                 </svg>
             </div>
        </div>
    </div>

</div> <script>
    // Constants - Metric Only
    const g = 9.81; const MM_TO_M = 0.001; const KMPH_TO_MPS = 1 / 3.6; const MPS_TO_KMPH = 3.6;

    // DOM Elements (Cached)
    const gaugeInput = document.getElementById('gauge');
    const radiusInput = document.getElementById('radius');
    const superelevationInput = document.getElementById('superelevation');
    const cantDeficiencyInput = document.getElementById('cantDeficiency');
    const speedInput = document.getElementById('speed');
    const presetSelector = document.getElementById('presets');
    const messageBox = document.getElementById('messageBox');
    const messageText = document.getElementById('messageText');
    const svgElement = document.getElementById('trackVisualization');
    const gForceValueSpan = document.getElementById('gForceValue'); // Added G-Force Span
    const visGaugeText = document.getElementById('visGaugeText');
    const visCantText = document.getElementById('visCantText');
    const visDeficiencyText = document.getElementById('visDeficiencyText');
    const visHighRail = document.getElementById('visHighRail');
    const visGaugeLine = document.getElementById('visGaugeLine');
    const visCantLine = document.getElementById('visCantLine');
    const visDeficiencyLine = document.getElementById('visDeficiencyLine');
    const visLowRail = document.getElementById('visLowRail');
    const visSleeper = document.getElementById('visSleeper');

    // State variable
    let lastManualInput = 'radius';
    let messageTimeout = null;

    // Preset Data
    const presets = {
        custom: { name: "-- Select Preset --", gauge: null, cant: null, deficiency: null },
        aus_xpt: { name: "AU XPT (Std Gauge)", gauge: 1435, cant: 150, deficiency: 110 },
        aus_qr_tilt: { name: "AU QR Tilt (Narrow)", gauge: 1067, cant: 180, deficiency: 150 },
        aus_qr_non_tilt: { name: "AU QR Non-Tilt (Narrow)", gauge: 1067, cant: 100, deficiency: 75 },
        eu_hs_non_tilt: { name: "EU High-Speed (Non-Tilt)", gauge: 1435, cant: 160, deficiency: 100 },
        eu_hs_tilt: { name: "EU High-Speed (Tilt)", gauge: 1435, cant: 180, deficiency: 260 },
        uk_pendolino: { name: "UK Pendolino (Std Gauge Tilt)", gauge: 1435, cant: 150, deficiency: 225 },
        uk_conventional: { name: "UK Conventional (Std Gauge)", gauge: 1435, cant: 150, deficiency: 110 },
        us_freight_c4: { name: "US Freight (Class 4)", gauge: 1435, cant: 100, deficiency: 75 },
        us_amtrak_nec: { name: "US Amtrak NEC (Acela)", gauge: 1435, cant: 150, deficiency: 180 },
        jp_shinkansen: { name: "JP Shinkansen (Std Gauge)", gauge: 1435, cant: 200, deficiency: 110 },
        in_broad_gauge: { name: "IN Broad Gauge (Generic)", gauge: 1676, cant: 165, deficiency: 100 }
     };

    // --- Populate Preset Dropdown ---
    function populatePresets() {
        presetSelector.innerHTML = '';
        for (const key in presets) {
            const option = document.createElement('option');
            option.value = key; option.textContent = presets[key].name;
            presetSelector.appendChild(option);
        }
    }

    // --- Event Listeners ---
    presetSelector.addEventListener('change', handlePresetChange);
    gaugeInput.addEventListener('input', () => { presetSelector.value = 'custom'; handleInputChange(); });
    superelevationInput.addEventListener('input', () => { presetSelector.value = 'custom'; handleInputChange(); });
    cantDeficiencyInput.addEventListener('input', () => { presetSelector.value = 'custom'; handleInputChange(); });
    radiusInput.addEventListener('input', () => {
        lastManualInput = 'radius';
        radiusInput.classList.remove('auto-updated');
        speedInput.classList.add('auto-updated');
        handleInputChange();
    });
    speedInput.addEventListener('input', () => {
        lastManualInput = 'speed';
        speedInput.classList.remove('auto-updated');
        radiusInput.classList.add('auto-updated');
        handleInputChange();
    });

    // --- Preset Handling ---
    function handlePresetChange() {
        const selectedKey = presetSelector.value; if (selectedKey === 'custom') return;
        const preset = presets[selectedKey];
        if (preset && preset.gauge !== null) {
            gaugeInput.value = preset.gauge;
            superelevationInput.value = preset.cant;
            cantDeficiencyInput.value = preset.deficiency;
            handleInputChange();
        }
    }

    // --- Visualization Update ---
    function updateVisualization() {
        let gaugeVal = parseFloat(gaugeInput.value) || 1435;
        let cantVal = parseFloat(superelevationInput.value) || 0;
        let deficiencyVal = parseFloat(cantDeficiencyInput.value) || 0;
        if (gaugeVal <= 0) gaugeVal = 1435;

        const gauge_mm = gaugeVal; const E_mm = cantVal; const Cd_mm = deficiencyVal;

        const svgWidth = 400; const trackCenterY = 105; const baseGaugeVisWidth = 240;
        const baseCantVisHeight = 30; const baseDeficiencyVisLength = 50; const railWidth = 15;
        const cantScaleRef = 300; const deficiencyScaleRef = 350;

        const currentGaugeVisWidth = baseGaugeVisWidth * (gauge_mm / 1435);
        const lowRailX = (svgWidth / 2) - (currentGaugeVisWidth / 2); const highRailX = (svgWidth / 2) + (currentGaugeVisWidth / 2);
        const cantScale = E_mm / cantScaleRef; const highRailYOffset = -cantScale * baseCantVisHeight;
        const deficiencyScale = Math.max(0, Cd_mm / deficiencyScaleRef);
        const deficiencyAngle = -Math.PI / 4; const deficiencyLength = deficiencyScale * baseDeficiencyVisLength;
        const deficiencyEndX = highRailX + deficiencyLength * Math.cos(deficiencyAngle);
        const deficiencyEndY = (trackCenterY + highRailYOffset - 5) + deficiencyLength * Math.sin(deficiencyAngle);

        const padding = 20;
        const topElementY = Math.min(trackCenterY - 5 + highRailYOffset, deficiencyEndY);
        const viewBoxMinY = Math.min(0, topElementY - padding);
        const bottomElementY = Math.max(trackCenterY + 15, trackCenterY - 5 + highRailYOffset);
        const viewBoxMaxY = Math.max(150, bottomElementY + padding);
        const viewBoxHeight = Math.max(150, viewBoxMaxY - viewBoxMinY);

        requestAnimationFrame(() => {
            if (!svgElement || !visLowRail || !visHighRail || !visGaugeLine || !visGaugeText || !visCantLine || !visCantText || !visDeficiencyLine || !visDeficiencyText || !visSleeper) return;

            svgElement.setAttribute('viewBox', `0 ${viewBoxMinY.toFixed(0)} ${svgWidth} ${viewBoxHeight.toFixed(0)}`);

            visLowRail.setAttribute('x', lowRailX - railWidth / 2); visHighRail.setAttribute('x', highRailX - railWidth / 2);
            visHighRail.setAttribute('y', trackCenterY - 5 + highRailYOffset); visLowRail.setAttribute('y', trackCenterY - 5);
            visGaugeLine.setAttribute('x1', lowRailX); visGaugeLine.setAttribute('y1', trackCenterY - 5);
            visGaugeLine.setAttribute('x2', highRailX); visGaugeLine.setAttribute('y2', trackCenterY - 5 + highRailYOffset);
            visGaugeText.setAttribute('x', svgWidth / 2); visGaugeText.setAttribute('y', trackCenterY - 15 + highRailYOffset / 2);
            visGaugeText.textContent = `Gauge: ${gaugeVal.toFixed(0)} mm`;
            visCantLine.setAttribute('x1', highRailX); visCantLine.setAttribute('y1', trackCenterY);
            visCantLine.setAttribute('x2', highRailX); visCantLine.setAttribute('y2', trackCenterY + highRailYOffset);
            visCantLine.setAttribute('visibility', Math.abs(E_mm) > 0.1 ? 'visible' : 'hidden');
            visCantText.setAttribute('x', highRailX + 8); visCantText.setAttribute('y', trackCenterY + highRailYOffset / 2);
            visCantText.textContent = `E: ${cantVal.toFixed(0)} mm`;
            visCantText.setAttribute('visibility', Math.abs(E_mm) > 0.1 ? 'visible' : 'hidden');
            visDeficiencyLine.setAttribute('x1', highRailX); visDeficiencyLine.setAttribute('y1', trackCenterY - 5 + highRailYOffset);
            visDeficiencyLine.setAttribute('x2', deficiencyEndX); visDeficiencyLine.setAttribute('y2', deficiencyEndY);
            visDeficiencyLine.setAttribute('visibility', Cd_mm > 0.1 ? 'visible' : 'hidden');
            visDeficiencyText.setAttribute('x', deficiencyEndX + 5); visDeficiencyText.setAttribute('y', deficiencyEndY);
            visDeficiencyText.textContent = `Cd: ${deficiencyVal.toFixed(0)} mm`;
            visDeficiencyText.setAttribute('visibility', Cd_mm > 0.1 ? 'visible' : 'hidden');
            const sleeperWidth = currentGaugeVisWidth + 60;
            visSleeper.setAttribute('x', (svgWidth / 2) - (sleeperWidth / 2)); visSleeper.setAttribute('width', sleeperWidth); visSleeper.setAttribute('y', trackCenterY);
        });
    }

    // --- Core Calculation Logic ---
    function handleInputChange() {
        let gForce = 0; // Initialize g-force
        try {
            const gaugeVal = parseFloat(gaugeInput.value) || 0;
            const radiusVal = parseFloat(radiusInput.value) || 0;
            const superelevationVal = parseFloat(superelevationInput.value) || 0;
            const cantDeficiencyVal = parseFloat(cantDeficiencyInput.value) || 0;
            const speedVal = parseFloat(speedInput.value);

            if (gaugeVal <= 0) { updateVisualization(); return; }

            const gauge_m = gaugeVal * MM_TO_M; const E_m = superelevationVal * MM_TO_M; const Cd_m = cantDeficiencyVal * MM_TO_M;
            const radius_m = radiusVal;

            // Calculate G-force (Cd / G)
            gForce = (gauge_m > 0) ? (Cd_m / gauge_m) : 0;

            // Calculate Speed or Radius
            if (lastManualInput === 'radius') {
                radiusInput.classList.remove('auto-updated'); speedInput.classList.add('auto-updated');
                if (isNaN(radiusVal) || radiusVal <= 0) { requestAnimationFrame(() => { speedInput.value = ''; gForceValueSpan.textContent = gForce.toFixed(3); }); updateVisualization(); return; }
                const V_max_squared = (g * radius_m * (E_m + Cd_m)) / gauge_m;
                if (V_max_squared < 0 || isNaN(V_max_squared) || gauge_m <= 0) throw new Error("Cannot calculate speed.");
                const V_max_mps = Math.sqrt(V_max_squared); const V_max_display = V_max_mps * MPS_TO_KMPH;
                requestAnimationFrame(() => {
                    speedInput.value = V_max_display.toFixed(2);
                    gForceValueSpan.textContent = gForce.toFixed(3); // Update Gs
                });
            } else { // lastManualInput === 'speed'
                speedInput.classList.remove('auto-updated'); radiusInput.classList.add('auto-updated');
                if (isNaN(speedVal) || speedVal <= 0) { requestAnimationFrame(() => { radiusInput.value = ''; gForceValueSpan.textContent = gForce.toFixed(3); }); updateVisualization(); return; }
                const speed_mps = speedVal * KMPH_TO_MPS;
                const total_cant_effect = g * (E_m + Cd_m);
                if (total_cant_effect <= 0 || gauge_m <= 0) throw new Error("Cannot calculate radius.");
                const R_min_m = (speed_mps * speed_mps * gauge_m) / total_cant_effect;
                if (isNaN(R_min_m) || R_min_m < 0) throw new Error("Invalid radius result.");
                const R_min_display = R_min_m;
                requestAnimationFrame(() => {
                    radiusInput.value = R_min_display.toFixed(2);
                    gForceValueSpan.textContent = gForce.toFixed(3); // Update Gs
                });
            }
             hideMessage(); updateVisualization();
        } catch (error) {
            showMessage(`Error: ${error.message}`, true);
             if (lastManualInput === 'radius') { requestAnimationFrame(() => { speedInput.value = ''; }); }
             else { requestAnimationFrame(() => { radiusInput.value = ''; }); }
             // Still update G-force display on error if possible
             const gaugeValOnError = parseFloat(gaugeInput.value) || 0;
             const cantDeficiencyValOnError = parseFloat(cantDeficiencyInput.value) || 0;
             if (gaugeValOnError > 0) {
                 const gauge_m_err = gaugeValOnError * MM_TO_M;
                 const Cd_m_err = cantDeficiencyValOnError * MM_TO_M;
                 gForce = Cd_m_err / gauge_m_err;
             } else {
                 gForce = 0;
             }
             requestAnimationFrame(() => { gForceValueSpan.textContent = gForce.toFixed(3); });
             updateVisualization(); console.error(error);
        }
    }

    // --- Utility Functions ---
    function showMessage(msg, isError = false) {
        if (messageTimeout) clearTimeout(messageTimeout); messageText.textContent = msg;
        messageBox.classList.remove('success', 'error', 'visible');
        messageBox.classList.add(isError ? 'error' : 'success');
        messageBox.classList.add('visible');
        messageTimeout = setTimeout(hideMessage, 4000);
    }
    function hideMessage() {
         if (messageTimeout) clearTimeout(messageTimeout); messageTimeout = null;
         messageBox.classList.remove('visible');
    }

    // --- Initial Setup ---
    function initialize() {
        populatePresets();
        speedInput.classList.add('auto-updated'); radiusInput.classList.remove('auto-updated');
        lastManualInput = 'radius'; handleInputChange();
        messageBox.classList.remove('visible');
    }
     if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }
</script>
