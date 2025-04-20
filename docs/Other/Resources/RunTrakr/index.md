# RunTrakr Dashboard

_An automated service that catalogues SEQ run numbers. Data updated periodically._

<div id="intel">
    RunTrakr has currently catalogued ${total} distinct run numbers, operating ${servicesTotal} services.

    Here they are:

    <div id="services"></div>
</div>

<script type="module">
    function rep(l,n,e="intel"){let t=document.getElementById(e);if(!t){console.error(`"${e}" NF.`);return}let r=`\${${l}}`;t.innerHTML=t.innerHTML.replaceAll(r,n)}

    // Load runData.json
    let res = await fetch('runData.json');
    let runData = await res.json();
    console.log(runData);

    rep("total", Object.keys(runData).length);
    rep("servicesTotal", Object.keys(runData).reduce((a, b) => a + runData[b].contains.length, 0));

    let sEl = document.querySelector("#services");
    let keys = Object.keys(runData).sort();

    for(const run of keys) {
        sEl.innerHTML += `> ${run}: ${runData[run].contains.filter(v => v != null && v != undefined).map(v => v.display).join(", ")}<br>`;
    }
</script>