# Run Guru

Enter a train number below to see a breakdown of its meaning for both suburban and regional services. For a complete overview, please refer to the main guide.

**[Full Train Numbering Guide](../../Train-Spotting/Train-Numbering-Guide.md)**

---


<div id="runguru-container">
    <div class="input-group">
        <label for="trainNumber">Enter Train Number:</label>
        <input type="text" id="trainNumber" placeholder="e.g., 1754, EI23, 0FB1" maxlength="6" autocomplete="off">
    </div>
    <div id="results" class="results"></div>
</div>

<style>
#runguru-container {
    max-width: 800px;
    margin: 0 auto;
    font-family: system-ui, -apple-system, sans-serif;
}

.input-group {
    margin-bottom: 16px;
}

label {
    display: block;
    margin-bottom: 6px;
    font-weight: 500;
}

input {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

input:focus {
    outline: none;
    border-color: #007acc;
}

.results {
    display: none;
}

.results.show {
    display: block;
}

.result-section {
    border: 1px solid #e0e0e0;
    padding: 12px;
    margin-bottom: 12px;
    border-radius: 4px;
}

.result-section h2 {
    margin: 0 0 10px 0;
    font-size: 16px;
    color: #333;
}

.result-item {
    margin-bottom: 10px;
    padding: 6px;
    background: #f9f9f9;
    border-radius: 3px;
}

.result-item:last-child {
    margin-bottom: 0;
}

.char-label {
    font-weight: 600;
    margin-bottom: 3px;
    display: block;
}

.char-value {
    color: #555;
    line-height: 1.4;
}

.highlight {
    background: #e3f2fd;
    padding: 1px 3px;
    border-radius: 2px;
    font-family: monospace;
}

.error {
    background: #ffebee;
    color: #c62828;
    padding: 10px;
    border-radius: 4px;
    border-left: 4px solid #f44336;
}

.warning {
    background: #fff3e0;
    color: #ef6c00;
    padding: 6px;
    border-radius: 3px;
    margin-top: 6px;
    font-size: 14px;
}

.multiple-options {
    margin-top: 6px;
}

.option {
    padding: 3px 0;
    border-bottom: 1px dashed #ddd;
}

.option:last-child {
    border-bottom: none;
}

.option::before {
    content: "• ";
    color: #666;
}

.special-pattern {
    background: #e8f5e8;
    border-left: 4px solid #4caf50;
}

.train-number-display {
    text-align: center;
    font-size: 20px;
    font-weight: 700;
    color: #333;
    margin: 12px 0;
    font-family: monospace;
}
</style>

<script>
const trainData = {
  "seqElectric": {
    "firstChar": {
      "1": "6 car SMU in revenue service",
      "2": "6 car SMU non-revenue service",
      "A": "6 car IMU non-revenue service",
      "B": "3 car IMU non-revenue service",
      "C": "3 car SMU non-revenue service",
      "D": "NGR train in revenue service",
      "E": "NGR non-revenue service",
      "J": "3 car SMU in revenue service",
      "T": "6 car IMU in revenue service",
      "U": "3 car IMU in revenue service",
      "W": "Unknown. Possibly train equipped w/ L2 ETCS non-revenue service or test train",
      "X": "Train equipped w/ L2 ETCS in revenue service"
    },
    "secondChar": {
      "0": "Electric Train Balloon; Bowen Hills or electric Train Shed South via Roma Street; Mayne area",
      "1": "Dakabin - Caboolture",
      "4": "Yandina - Gympie North",
      "5": "Riverview - Ipswich",
      "6": "Thomas Street - Rosewood",
      "7": "Trinder Park - Beenleigh",
      "8": "Lota - Cleveland",
      "9": "Roma Street; ETS turnback via main lines",
      "A": "Bindha - Banyo Yard - Shorncliffe",
      "B": "Clayfield - Doomben / Pinkenba",
      "C": "Corinda via South Brisbane; From Corinda to Yeerongpilly",
      "D": "Milton - Redbank",
      "E": "Windsor - Ferny Grove",
      "F": "Various destinations as determined by Control (0-79 Brisbane District, 80-89 Rockhampton District, 90-99 Townsville District)",
      "G": "Ormeau - Varsity Lakes",
      "K": "Richlands - Springfield Central",
      "L": "Elimbah - Nambour",
      "M": "Electric Train Shed via Bowen Hills; Electric Balloon and suburban lines",
      "N": "Exhibition via Brisbane Central",
      "P": "International - Domestic (Airport)",
      "R": "Roma Street; Electric Train Shed South via Suburban Lines",
      "S": "South Brisbane - Park Road",
      "U": "Wulkuraka NGR Maintenance Facility",
      "V": "Dutton Park - Kuraby",
      "W": "Albion - Northgate",
      "X": "Exhibition Direct",
      "Y": "Virginia - Kippa-Ring",
      "Z": "Exhibition"
    },
    "thirdChar": {
      "0": "Standard running (all stations for suburban lines; all-day express patterns for interurban lines)",
      "1": "Standard running (all stations for suburban lines; all-day express patterns for interurban lines)",
      "2": "Standard running (all stations for suburban lines; all-day express patterns for interurban lines)",
      "3": "Standard running (all stations for suburban lines; all-day express patterns for interurban lines)",
      "4": "Standard running (all stations for suburban lines; all-day express patterns for interurban lines)",
      "5": "Standard running (all stations for suburban lines; all-day express patterns for interurban lines)",
      "6": "Standard running (all stations for suburban lines; all-day express patterns for interurban lines)",
      "7": "Standard running (all stations for suburban lines; all-day express patterns for interurban lines)",
      "8": "Standard running (all stations for suburban lines; all-day express patterns for interurban lines)",
      "9": "Standard running (all stations for suburban lines; all-day express patterns for interurban lines)",
      "T": "AM express running as per standard pattern (Ipswich, Rosewood, Cleveland only)",
      "U": "AM express running as per standard pattern (Ipswich, Rosewood, Cleveland only)",
      "V": "AM express running as per standard pattern (Ipswich, Rosewood, Cleveland only)",
      "X": "PM express running as per standard pattern (Ipswich, Rosewood, Cleveland only)",
      "Y": "PM express running as per standard pattern (Ipswich, Rosewood, Cleveland only)",
      "Z": "PM express running as per standard pattern (Ipswich, Rosewood, Cleveland only)",
      "M": "PM peak only; Short-finishing PM peak services (Cleveland, Beenleigh lines)",
      "N": "PM peak only; Short-finishing PM peak services (Cleveland, Beenleigh lines)",
      "P": "School train (may be cancelled during school holidays)",
      "A": "Continuation of numerals (10th position)",
      "B": "Continuation of numerals (11th position)",
      "C": "Continuation of numerals (12th position)"
    },
    "fourthChar": {
      "even": "Service concludes travelling in the 'Up' direction",
      "odd": "Service concludes travelling in the 'Down' direction"
    },
    "specialPatterns": {
      "xDYn": "Via South Brisbane to Darra",
      "x5Yn": "Via South Brisbane to Ipswich",
      "xxTn": "Extra service for special events etc.",
      "xFXn": "Exhibition Circular Services"
    }
  },
  "regional": {
    "firstChar": {
      "0": "Diesel-hauled Infrastructure Work Train",
      "3": "Diesel-hauled passenger train (max 80km/h)",
      "4": "Diesel-hauled empty coaches",
      "5": "Railmotor in revenue service",
      "6": "Diesel-hauled freight train (max 80km/h)",
      "7": "Diesel-hauled freight train (max 60km/h)",
      "8": "Diesel-hauled freight train (max 100km/h)",
      "9": "Aurizon Diesel-hauled coal or mineral train",
      "A": "Electric-hauled passenger train (max 100km/h)",
      "B": ["BMA Over-Length Electric-hauled coal or mineral train", "Electric-hauled empty coaches"],
      "C": ["Electric-hauled freight train (max 80km/h)", "Pacific National Over-Length Electric-hauled coal or mineral train"],
      "D": "Electric-hauled freight train (max 60km/h)",
      "E": "Aurizon Electric-hauled coal or mineral train",
      "F": "Electric-hauled freight train (max 100km/h)",
      "G": "Electric light engine",
      "H": "Electric-hauled departmental/test train",
      "J": "JMA Rail Electric-hauled coal or mineral train",
      "K": "Standard Gauge train",
      "L": "Diesel light engine(s)",
      "M": ["Pacific National Diesel-hauled coal or mineral train", "Steam-hauled passenger train"],
      "N": "Non-revenue railmotor",
      "P": "Diesel-hauled passenger train (max 100km/h)",
      "Q": "Electric Tilt Train (empty or revenue service)",
      "R": ["Pacific National Over-Length Diesel-hauled coal or mineral train", "Steam light engine or empty cars"],
      "S": "Diesel yard shunt engine",
      "T": "Aurizon Over-Length Electric-hauled coal or mineral train",
      "U": "Pacific National Diesel-hauled coal or mineral train",
      "V": "Diesel Tilt Train (empty or revenue service)",
      "Y": "Freight hauled by a 2800 class locomotive",
      "Z": "On-track Machine / Hirail Vehicle"
    },
    "secondChar": {
      "coalMineral": {
        "1": "Saraji mine (Mackay Coal System)",
        "2": "Goonyella (Mackay Coal System)",
        "3": "Peak Downs (Mackay Coal System)",
        "4": "Norwich Park (Mackay Coal System)",
        "5": "German Creek (Mackay Coal System)",
        "6": "Oaky Creek (Mackay Coal System)",
        "7": "Blair Athol (Mackay Coal System)",
        "8": "Riverside (Mackay Coal System)",
        "9": "North Goonyella (Mackay Coal System)",
        "A": "Abbott Point (Bowen Coal System)",
        "B": ["Curragh (Gladstone)", "Box Flat (Brisbane)", "Sonoma Mine (Newlands)"],
        "C": "Yongala (Gladstone Coal System)",
        "D": "Callemondah (Gladstone Coal System)",
        "E": ["East End (Gladstone Limestone)", "Ensham (Gladstone)", "Ebenezer (Brisbane)"],
        "F": "Golding (Gladstone Coal System)",
        "G": "Hay Point (Mackay Coal System)",
        "H": "Boorgoon (Gladstone Coal System)",
        "I": "Boonal (Gladstone Coal System)",
        "J": "Jilalan (Mackay Coal System)",
        "K": "Kinrola (Gladstone Coal System)",
        "L": ["Fishermans Landing (Gladstone Limestone)", "Laleham (Gladstone)", "Lake Vermont (Goonyella)"],
        "M": "Gregory (Gladstone Coal System)",
        "N": ["Newlands (Bowen Coal System)", "Koorilgah (Gladstone Coal System)"],
        "P": ["Barney Point (Gladstone)", "Pring (Bowen Coal System)"],
        "Q": "Moura Mine (Gladstone Coal System)",
        "R": ["Callide Coalfields (Gladstone)", "Collinsville (Bowen)", "Burton (Mackay)"],
        "S": ["McNaughton (Bowen)", "Boundary Hill/Callide to QAL (Gladstone)", "Boorgoon to Stanwell (Gladstone)"],
        "T": ["Stuart-Calcium (Limestone)", "Moranbah North (Mackay Coal System)"],
        "V": "Dalrymple Bay (Mackay Coal System)",
        "W": ["Boundary Hill (Gladstone)", "Coppabella (Mackay)", "MacArthur (Mackay)"],
        "Y": "Gordonstone (Gladstone Coal System)",
        "Z": ["Gladstone Powerhouse (Gladstone)", "Mackay Harbour"]
      },
      "majorLocations": {
        "0": "Bowen Hills/Mayne Area",
        "2": "Townsville",
        "3": "Rockhampton",
        "4": "Gympie North",
        "5": "Beyond Darra to Grandchester (except Rosewood EMU services)",
        "6": "Beyond Grandchester to Toowoomba",
        "7": "Moolabin/Clapham/Acacia Ridge (Freight)",
        "8": "Fisherman Islands (Freight)",
        "9": "Roma Street",
        "A": ["Clermont", "Forsayth"],
        "B": "Clermont",
        "C": "Cairns",
        "D": ["Proserpine", "Dalby"],
        "E": ["Cloncurry", "Emerald", "Warwick"],
        "F": "Various destinations as determined by Control",
        "G": ["Gladstone", "From Maryborough to Monto", "Glenmorgan"],
        "H": ["Dirranbandi", "Hughenden"],
        "J": ["Bundaberg", "Jandowae"],
        "K": ["Kingaroy", "Kuranda"],
        "L": ["Cobarra", "Wandoan"],
        "M": ["Mount Isa", "Mareeba", "Maryborough", "From Gladstone to Monto"],
        "P": ["Saint Lawrence", "Milmerran", "Springsure"],
        "Q": ["Bowen", "Quilpie"],
        "R": ["Roma", "Gracemere"],
        "S": ["Sarina", "Charleville"],
        "T": ["Theodore", "Phosphate Hill"],
        "U": ["Mackay", "Rolleston"],
        "V": ["Cunnamulla", "Biloela"],
        "W": ["Wallangarra", "Beyond Emerald to Winton", "From Hughenden to Winton"],
        "Y": ["Yaraka", "Chinchilla", "Yeppoon"]
      }
    },
    "thirdChar": {
      "pacificNational": {
        "P": "Signifies a freight train operated by Pacific National"
      },
      "livestock": {
        "N": "Northern Division",
        "C": "Central Division",
        "S": "Southern Division"
      },
      "workTrains": {
        "B": "Ballast",
        "C": "Concrete Sleepers",
        "P": "Pantograph test train",
        "R": "Railset",
        "S": "Spoil/Sleepers",
        "T": "Test Engine/Train",
        "W": "Wiring Train"
      },
      "gladstoneBoonal": {
        "I": "Jellinbah coal",
        "Y": "Yarrabee coal"
      },
      "rockhampton": {
        "R": "Livestock trains from Gracemere to Rockhampton"
      }
    },
    "fourthChar": {
      "even": "Service concludes travelling in the 'Up' direction",
      "odd": "Service concludes travelling in the 'Down' direction",
      "exceptions": [
        "For trains with 2nd character 'F' (Various Destinations), the 4th character's parity does not necessarily indicate direction",
        "Freight trains entering Brisbane Suburban Area retain their original train number and directional digit, even if their direction changes"
      ]
    }
  }
};

const trainNumberInput = document.getElementById('trainNumber');
const resultsDiv = document.getElementById('results');

trainNumberInput.addEventListener('input', (e) => {
    const trainNumber = e.target.value.trim().toUpperCase();
    if (trainNumber.length >= 3) {
        decodeTrainNumber(trainNumber);
    } else {
        resultsDiv.classList.remove('show');
        resultsDiv.innerHTML = '';
    }
});

function decodeTrainNumber(trainNumber) {
    resultsDiv.innerHTML = '';

    const char1 = trainNumber[0];
    const char2 = trainNumber[1];
    const char3 = trainNumber[2];
    const char4 = trainNumber[3];

    let html = `<div class="train-number-display">${trainNumber}</div>`;

    // Check if it's SEQ Electric or Regional
    const isSeqElectric = trainData.seqElectric.firstChar[char1] !== undefined;
    const isRegional = trainData.regional.firstChar[char1] !== undefined;

    if (!isSeqElectric && !isRegional) {
        html += '<div class="error">Invalid train number. First character not recognized.</div>';
        resultsDiv.innerHTML = html;
        resultsDiv.classList.add('show');
        return;
    }

    // Decode SEQ Electric
    if (isSeqElectric) {
        html += decodeSeqElectric(trainNumber, char1, char2, char3, char4);
    }

    // Decode Regional
    if (isRegional) {
        html += decodeRegional(trainNumber, char1, char2, char3, char4);
    }

    resultsDiv.innerHTML = html;
    resultsDiv.classList.add('show');
}

function decodeSeqElectric(trainNumber, char1, char2, char3, char4) {
    let html = '<div class="result-section">';
    html += '<h2>SEQ Electric Service</h2>';

    // First character
    const firstCharDesc = trainData.seqElectric.firstChar[char1];
    if (firstCharDesc) {
        html += `<div class="result-item">
            <span class="char-label">1st Character <span class="highlight">${char1}</span> - Rollingstock Type:</span>
            <div class="char-value">${firstCharDesc}</div>
        </div>`;
    }

    // Second character
    const secondCharDesc = trainData.seqElectric.secondChar[char2];
    if (secondCharDesc) {
        html += `<div class="result-item">
            <span class="char-label">2nd Character <span class="highlight">${char2}</span> - Destination Range:</span>
            <div class="char-value">${secondCharDesc}</div>
        </div>`;
    } else if (char2) {
        html += `<div class="result-item">
            <span class="char-label">2nd Character <span class="highlight">${char2}</span>:</span>
            <div class="char-value">Unknown destination range</div>
        </div>`;
    }

    // Third character
    if (char3) {
        const thirdCharDesc = trainData.seqElectric.thirdChar[char3];
        if (thirdCharDesc) {
            html += `<div class="result-item">
                <span class="char-label">3rd Character <span class="highlight">${char3}</span> - Running Pattern:</span>
                <div class="char-value">${thirdCharDesc}</div>
            </div>`;
        } else {
            html += `<div class="result-item">
                <span class="char-label">3rd Character <span class="highlight">${char3}</span>:</span>
                <div class="char-value">Unknown running pattern</div>
            </div>`;
        }
    }

    // Fourth character (direction)
    if (char4) {
        const isEven = !isNaN(char4) && parseInt(char4) % 2 === 0;
        const direction = isEven ? trainData.seqElectric.fourthChar.even : trainData.seqElectric.fourthChar.odd;
        html += `<div class="result-item">
            <span class="char-label">4th Character <span class="highlight">${char4}</span> - Direction:</span>
            <div class="char-value">${direction}</div>
        </div>`;
    }

    // Check for special patterns
    const pattern = char2 + char3;
    for (const [key, value] of Object.entries(trainData.seqElectric.specialPatterns)) {
        const patternRegex = key.replace(/x/g, '.').replace(/n/g, '\\d');
        if (new RegExp(patternRegex).test(trainNumber)) {
            html += `<div class="result-item special-pattern">
                <span class="char-label">🌟 Special Pattern Detected:</span>
                <div class="char-value">${value}</div>
            </div>`;
        }
    }

    html += '</div>';
    return html;
}

function decodeRegional(trainNumber, char1, char2, char3, char4) {
    let html = '<div class="result-section">';
    html += '<h2>Regional Service</h2>';

    // First character
    const firstCharDesc = trainData.regional.firstChar[char1];
    if (firstCharDesc) {
        html += `<div class="result-item">
            <span class="char-label">1st Character <span class="highlight">${char1}</span> - Train Type:</span>
            <div class="char-value">`;
        
        if (Array.isArray(firstCharDesc)) {
            html += '<div class="multiple-options">';
            firstCharDesc.forEach(desc => {
                html += `<div class="option">${desc}</div>`;
            });
            html += '</div>';
        } else {
            html += firstCharDesc;
        }
        html += `</div></div>`;
    }

    // Second character (complex - check both coal/mineral and major locations)
    if (char2) {
        html += `<div class="result-item">
            <span class="char-label">2nd Character <span class="highlight">${char2}</span> - Destination/Area:</span>
            <div class="char-value">`;
        
        const coalMineral = trainData.regional.secondChar.coalMineral[char2];
        const majorLocation = trainData.regional.secondChar.majorLocations[char2];
        
        if (coalMineral || majorLocation) {
            html += '<div class="multiple-options">';
            
            if (coalMineral) {
                if (Array.isArray(coalMineral)) {
                    coalMineral.forEach(desc => {
                        html += `<div class="option">${desc}</div>`;
                    });
                } else {
                    html += `<div class="option">${coalMineral}</div>`;
                }
            }
            
            if (majorLocation) {
                if (Array.isArray(majorLocation)) {
                    majorLocation.forEach(desc => {
                        html += `<div class="option">${desc}</div>`;
                    });
                } else {
                    html += `<div class="option">${majorLocation}</div>`;
                }
            }
            
            html += '</div>';
        } else {
            html += 'Unknown destination/area';
        }
        html += `</div></div>`;
    }

    // Third character (special meanings)
    if (char3) {
        let thirdCharMeanings = [];
        
        // Check Pacific National
        if (trainData.regional.thirdChar.pacificNational[char3]) {
            thirdCharMeanings.push(trainData.regional.thirdChar.pacificNational[char3]);
        }
        
        // Check Livestock
        if (trainData.regional.thirdChar.livestock[char3]) {
            thirdCharMeanings.push('Livestock - ' + trainData.regional.thirdChar.livestock[char3]);
        }
        
        // Check Work Trains (if char1 is 0 and char2 is F)
        if (char1 === '0' && char2 === 'F' && trainData.regional.thirdChar.workTrains[char3]) {
            thirdCharMeanings.push(trainData.regional.thirdChar.workTrains[char3]);
        }
        
        // Check Gladstone Boonal (if char2 is I)
        if (char2 === 'I' && trainData.regional.thirdChar.gladstoneBoonal[char3]) {
            thirdCharMeanings.push(trainData.regional.thirdChar.gladstoneBoonal[char3]);
        }
        
        // Check Rockhampton
        if (trainData.regional.thirdChar.rockhampton[char3]) {
            thirdCharMeanings.push(trainData.regional.thirdChar.rockhampton[char3]);
        }

        if (thirdCharMeanings.length > 0) {
            html += `<div class="result-item">
                <span class="char-label">3rd Character <span class="highlight">${char3}</span> - Special Designation:</span>
                <div class="char-value">`;
            thirdCharMeanings.forEach(meaning => {
                html += `<div class="option">${meaning}</div>`;
            });
            html += `</div></div>`;
        } else if (isNaN(char3)) {
            html += `<div class="result-item">
                <span class="char-label">3rd Character <span class="highlight">${char3}</span>:</span>
                <div class="char-value">Part of train ID (locally agreed-upon character)</div>
            </div>`;
        } else {
            html += `<div class="result-item">
                <span class="char-label">3rd Character <span class="highlight">${char3}</span>:</span>
                <div class="char-value">Part of train ID</div>
            </div>`;
        }
    }

    // Fourth character (direction)
    if (char4) {
        const isEven = !isNaN(char4) && parseInt(char4) % 2 === 0;
        const direction = isEven ? trainData.regional.fourthChar.even : trainData.regional.fourthChar.odd;
        html += `<div class="result-item">
            <span class="char-label">4th Character <span class="highlight">${char4}</span> - Direction:</span>
            <div class="char-value">${direction}</div>
        </div>`;
        
        // Add exceptions warning if applicable
        if (char2 === 'F' || (char1 >= '6' && char1 <= '9')) {
            html += `<div class="warning">
                ⚠️ ${trainData.regional.fourthChar.exceptions.join(' ')}
            </div>`;
        }
    }

    html += '</div>';
    return html;
}
</script>