There are currently:

- <span class="reporting"></span> reporting their live location, including <span class="reporting-stats"></span>
- <span class="late-num"></span> running at least 5 minutes late. The latest one is a <a href="" class="latest-name"></a> <span class="latest-loc"></span>, running <span class="latest-time"></span> minutes late.
- <span class="crossing"></span> crossing the Victoria St Bridge.</li>

Vehicles:

<div class="vehicles"></div>

<script>
  function fill(id, fill) {
    document.querySelectorAll("." + id).forEach((v) => (v.innerText = fill));
  }
  function fillHref(id, fill) {
    document.querySelectorAll("." + id).forEach((v) => (v.href = fill));
  }
  function fillHtml(id, fill) {
    document.querySelectorAll("." + id).forEach((v) => (v.innerHTML = fill));
  }

  async function main() {
    let res = await fetch(
      "https://anytrip.com.au/api/v3/region/au4/vehicles?feeds=au4:se"
    );
    let js = await res.json();
    window.js = js;

    let totalV = js.response.vehicles.length;

    let rBuses = js.response.vehicles.filter(
      (v) => v.tripInstance.trip.route.mode == "au4:buses"
    ).length;
    let rFerries = js.response.vehicles.filter(
      (v) => v.tripInstance.trip.route.mode == "au4:ferries"
    ).length;
    let rTrams = js.response.vehicles.filter(
      (v) => v.tripInstance.trip.route.mode == "au4:lightrail"
    ).length;
    let rTrains = js.response.vehicles.filter(
      (v) => v.tripInstance.trip.route.mode == "au4:trains"
    ).length;

    fill("reporting", `${totalV} ${totalV == 1 ? "vehicle" : "vehicles"}`);
    fillHtml(
      "reporting-stats",
      `
    ${rBuses} ${rBuses == 1 ? "bus" : "buses"},
    ${rFerries} ${rFerries == 1 ? "ferry" : "ferries"},
    ${rTrams} ${rTrams == 1 ? "tram" : "trams"}, and
    ${rTrains} ${rTrains == 1 ? "train" : "trains"}.
    `
    );

    let late = js.response.vehicles.filter(
      (v) => v.vehicleInstance.lastPosition.linearDelay > 300
    );

    fill(
      "late-num",
      `${late.length} ${late.length == 1 ? "vehicle" : "vehicles"} (${
        Math.round((late.length / totalV) * 1000) / 10
      }%)`
    );

    let latest = late.sort((a, b) => {
      return (
        b.vehicleInstance.lastPosition.linearDelay -
        a.vehicleInstance.lastPosition.linearDelay
      );
    })[0];

    window.latest = latest;

    fill(
      "latest-time",
      Math.round(latest.vehicleInstance.lastPosition.linearDelay / 60)
    );
    fill(
      "latest-name",
      `${latest.tripInstance.trip.route.name} - ${latest.tripInstance.trip.route.longName}`
    );
    fillHtml(
      "latest-loc",
      `<code>${latest.vehicleInstance.lastPosition.statusString}</code>`
    );
    fillHref(
      "latest-name",
      "https://anytrip.com.au/region/qld?selectedTrip=" +
        encodeURIComponent(latest.vehicleInstance._tripInstancePath)
    );

    let crossingRes = await fetch(
      "https://anytrip.com.au/api/v3/region/au4/vehicles?feeds=au4:se&maxLat=-27.471401944265658&maxLon=153.0226213941208&minLat=-27.473325476734196&minLon=153.01966097887606"
    );
    let crossing = await crossingRes.json();
    crossing = crossing.response.vehicles.length;

    fill("crossing", `${crossing} ${crossing == 1 ? "bus" : "buses"}`);

    let vsSwap = {
      "au4:buses": "Buses",
      "au4:ferries": "",
      "au4:lightrail": "",
      "au4:trains": "Trains",
    };

    let vs = {};
    js.response.vehicles.forEach((v) => {
      let key = v.vehicleInstance.vehicleModel
        .trim()
        .replaceAll(/ +\(run.*\)/g, "")
        .replaceAll(/^\d+$/g, "")
        .replaceAll(/\(\d+\)$/g, "")
        .replaceAll(/[\"\“\”]/g, "")
        .replaceAll(/^.{2,3}$/g, "")
        .replaceAll(/^\d+, /g, "")
        .replace("6 car IMU", "6 car IMU or SMU")
        .replace(/^6 car EMU or SMU.*$/, "6 car non-NGR")
        .replace(/^3 car EMU or SMU.*$/, "3 car non-NGR")
        .trim();
      let k2 = v.tripInstance.trip.route.mode;
      k2 = vsSwap[k2];
      if (k2 == "Trains") {
        key = key.replace(/train$/, "");
        if (key.length == 4) {
          if (key[0] == "D") key = "New Generation Rollingstock (NGR)";
          else key = "6 car non-NGR";
        }
      }
      if (vs[k2] == undefined) vs[k2] = {};
      if (vs[k2][key] == undefined) vs[k2][key] = 0;
      vs[k2][key]++;
    });

    console.log(vs);

    let k2 = Object.keys(vs).sort();
    k2 = k2.filter(v => v.trim() != "")
    let ihtml = "<blockquote>";
    for (let k1 of k2) {
      let currH = vs[k1];
      let keys = Object.keys(currH).sort((a, b) => currH[b] - currH[a]);
      let totalK2 = 0;
      for (let key of keys) totalK2 += currH[key];
      ihtml += `<p>${k1}: ${totalK2}</p>  <ul>`;
      for (let key of keys) {
        if (key.trim() != "") ihtml += `<li>${currH[key]} x ${key}</li>`;
      }
      if (currH[""] != undefined) ihtml += `<li>${currH[""]} x Other</li>`;
      ihtml += "</ul>";
    }
    ihtml += "</blockquote>";
    fillHtml("vehicles", ihtml);
  }

  main();
</script>
