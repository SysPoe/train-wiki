# Run Guru

Enter your run number and find out what it means!

<input id="train" placeholder="Enter your run number!!!"><button onclick="interpretTrainNumber()">Search</button>

<div class="results"></div>

[Run Numbering Guide](../../../Train-Spotting/Run-Numbering-Guide.md)

<script>
  async function run() {
    let dataRes = await fetch("data.json");
    let data = await dataRes.json();

    document.querySelector("#train").onkeydown = ev => {
    if(ev.key == "Enter") interpretTrainNumber()};

    window.interpretTrainNumber = function (trainNumber) {
        document.querySelector("#train").value = document.querySelector("#train").value.toUpperCase();
        if(trainNumber == undefined) trainNumber = document.querySelector("#train").value;
      if (trainNumber.length !== 4) {
        document.querySelector(".results").innerHTML = "Invalid train number. It must be 4 characters long.";
        return;
      }

      const firstChar = trainNumber[0];
      const secondChar = trainNumber[1];
      const thirdChar = trainNumber[2];
      const fourthChar = trainNumber[3];

      // Interpret the first character
      const first = data.first[firstChar] || [];

      // Interpret the second character
      const second = data.second[secondChar] || [];

      const other = [];
      for (let pos of Object.keys(data.other)) {
        let matches = true;
        for (let i = 0; i < 4; i++) {
          if (pos[i] == "x") continue;
          if (pos[i] == "n" && !/[0-9]/.test(trainNumber[i])) {
            matches = false;
            break;
          } else if (pos[i] == "n") continue;
          if (pos[i] != trainNumber[i]) {
            matches = false;
            break;
          }
        }
        if (matches) other.push(data.other[pos]);
      }

      document.querySelector(".results").innerHTML = `
Train ${trainNumber} is a <code>[${first.join(
        " OR a "
      )}]</code> heading to <code>[${second.join(" OR ")}]</code>.${
        other.length > 0
          ? ` It might also be <code>[${other.join(
              " AND "
            )}]</code>`
          : ""
      }<br><br>
  `;
    };
  }

  run();
</script>
