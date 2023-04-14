function AddingDropDown(data) {
  let stationNames = "<option value='default'>show all</option>";
  let dates = "<option value='default'>show all</option>";
  let times = "<option value='default'>show all</option>";
  const uniqueDates = new Set();
  const uniqueTimes = new Set();

  for (const stationName in data.value) {
    const stationData = data.value[stationName];
    stationNames +=
      "<option value='" + stationName + "'>" + stationName + "</option>";

    for (const date in stationData) {
      if (!uniqueDates.has(date)) {
        uniqueDates.add(date);
        dates += "<option value='" + date + "'>" + date + "</option>";
      }
      const dateData = stationData[date];

      for (const time in dateData) {
        if (!uniqueTimes.has(time)) {
          uniqueTimes.add(time);
          times += "<option value='" + time + "'>" + time + "</option>";
        }
      }
    }
  }

  document.getElementById("start").innerHTML = stationNames;
  document.getElementById("dest").innerHTML = stationNames;
  document.getElementById("date").innerHTML = dates;
  document.getElementById("time").innerHTML = times;
}

function getToolsData() {
  fetch("/predicttools")
    .then((response) => response.json())
    .then((data) => {
      console.log("fetch predicttools response", data);
      AddingDropDown(data);
    });
}
