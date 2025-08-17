# Run Guru

Enter a train number below to see a breakdown of its meaning for both suburban and regional services. For a complete overview, please refer to the main guide.

**[Full Train Numbering Guide](../../../Train-Spotting/Train-Numbering-Guide.md)**

<style>
    .run-guru-container {
        background-color: #fdfdfd;
        border: 1px solid #e0e0e0;
        padding: 24px;
        border-radius: 4px;
        max-width: 700px;
        margin: 20px 0;
    }
    #runNumberInput {
        box-sizing: border-box;
        width: calc(100% - 115px);
        padding: 10px;
        font-size: 16px;
        border: 1px solid #ccc;
        border-radius: 4px;
        margin-right: 10px;
        vertical-align: middle;
    }
    .run-guru-container button {
        padding: 10px 18px;
        font-size: 16px;
        cursor: pointer;
        border-radius: 4px;
        border: 1px solid #007bff;
        background-color: #007bff;
        color: white;
        vertical-align: middle;
    }
    #results {
        margin-top: 25px;
        line-height: 1.7;
    }
    #results h3 {
        font-size: 1.4em;
        margin-bottom: 20px;
        font-weight: 600;
    }
    #results h4 {
        font-size: 1.2em;
        font-weight: 600;
        margin-top: 25px;
        margin-bottom: 15px;
        padding-bottom: 8px;
        border-bottom: 1px solid #eee;
    }
    .result-item {
        margin-bottom: 4px;
    }
    .result-item strong {
        font-weight: 600;
        margin-right: 5px;
    }
    .not-found {
        color: #999;
        font-style: italic;
    }
</style>

<div class="run-guru-container">
    <input type="text" id="runNumberInput" placeholder="e.g., T123, DFX3, 8CP1" onkeyup="if(event.keyCode===13){interpretRun();}">
    <button onclick="interpretRun()">Interpret</button>
    <div id="results"></div>
</div>

<script>
    function interpretRun() {
        const runNumber = document.getElementById('runNumberInput').value.trim().toUpperCase();
        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = '';

        if (!runNumber || runNumber.length < 2) {
            resultsDiv.innerHTML = '<p class="not-found">Please enter a valid train number (at least 2 characters).</p>';
            return;
        }

        fetch('data.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const [char1, char2, char3, char4] = [...runNumber];
                const combo23 = char2 && char3 ? char2 + char3 : null;
                let outputHtml = `<h3>Interpretation for: ${runNumber}</h3>`;
                
                // --- SUBURBAN INTERPRETATION ---
                outputHtml += `<h4>SEQ Suburban Interpretation</h4>`;
                
                const s_char1 = data.suburban.first[char1] || '<span class="not-found">No suburban meaning.</span>';
                outputHtml += `<div class="result-item"><strong>1st Char:</strong> ${s_char1}</div>`;

                const s_char2 = data.suburban.second[char2] || '<span class="not-found">Not a suburban route code.</span>';
                outputHtml += `<div class="result-item"><strong>2nd Char:</strong> ${s_char2}</div>`;
                
                let s_char3 = '<span class="not-found">Not specified.</span>';
                if (char3) {
                    if (/[0-9]/.test(char3)) {
                        s_char3 = data.suburban.third.numeric_default;
                    } else {
                        s_char3 = data.suburban.third[char3] || '<span class="not-found">No specific 3rd character interpretation.</span>';
                    }
                }
                outputHtml += `<div class="result-item"><strong>3rd Char:</strong> ${s_char3}</div>`;

                let s_char4 = '<span class="not-found">Not specified.</span>';
                if (char4 && /[0-9]/.test(char4)) {
                   s_char4 = parseInt(char4) % 2 === 0 ? data.suburban.fourth.even : data.suburban.fourth.odd;
                }
                outputHtml += `<div class="result-item"><strong>4th Char:</strong> ${s_char4}</div>`;

                if (combo23 && data.suburban.combinations[combo23]) {
                    const specialComboMeaning = data.suburban.combinations[combo23];
                    outputHtml += `<div class="result-item"><strong>Special Combo:</strong> ${specialComboMeaning}</div>`;
                }


                // --- REGIONAL INTERPRETATION ---
                outputHtml += `<h4>Regional Interpretation</h4>`;

                let r_char1 = data.regional.first[char1] || '<span class="not-found">No regional meaning.</span>';
                if (Array.isArray(r_char1)) {
                    r_char1 = r_char1.join('<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- ');
                }
                outputHtml += `<div class="result-item"><strong>1st Char:</strong> ${r_char1}</div>`;
                
                const r_char2 = findRegionalMeaning(data.regional.second, char2) || '<span class="not-found">Not a regional destination code.</span>';
                outputHtml += `<div class="result-item"><strong>2nd Char:</strong> ${r_char2}</div>`;

                let r_char3 = '<span class="not-found">Not specified.</span>';
                if (char3) {
                    if (/[0-9]/.test(char3)) {
                        r_char3 = "Part of the train's ID number.";
                    } else {
                        r_char3 = findRegionalMeaning(data.regional.third, char3) || '<span class="not-found">No specific 3rd character interpretation.</span>';
                    }
                }
                outputHtml += `<div class="result-item"><strong>3rd Char:</strong> ${r_char3}</div>`;

                let r_char4 = '<span class="not-found">Not specified.</span>';
                if (char4 && /[0-9]/.test(char4)) {
                   r_char4 = parseInt(char4) % 2 === 0 ? data.regional.fourth.even : data.regional.fourth.odd;
                }
                outputHtml += `<div class="result-item"><strong>4th Char:</strong> ${r_char4}</div>`;
                
                if (combo23 && data.regional.combinations[combo23]) {
                    const specialComboMeaning = data.regional.combinations[combo23];
                    outputHtml += `<div class="result-item"><strong>Special Combo:</strong> ${specialComboMeaning}</div>`;
                }

                resultsDiv.innerHTML = outputHtml;
            })
            .catch(error => {
                resultsDiv.innerHTML = `<p class="not-found">Error: Could not load interpretation data. Please check console for details.</p>`;
                console.error('Error fetching data.json:', error);
            });
    }

    function findRegionalMeaning(categoryData, char) {
        for (const category in categoryData) {
            if (categoryData[category][char]) {
                const categoryName = category.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                return `${categoryData[category][char]} (${categoryName})`;
            }
        }
        return null;
    }
</script>