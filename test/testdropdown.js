function addingDropDown(data) {
  var predictData = data.predict;
  var startOption = "<option value='default'>show all</option>";
  var destOption = "<option value='default'>show all</option>";
  var dateOption = "<option value='default'>show all</option>";
  var timeOption = "<option value='default'>show all</option>";
  let stationNames = Object.keys(predictData);

  for (var i = 0; i < predictData; i++) {
    startOption +=
      "<option value='" +
      stationNames[i] +
      "'>" +
      stationNames[i] +
      "</option>";
    destOption +=
      "<option value='" +
      stationNames[i] +
      "'>" +
      stationNames[i] +
      "</option>";
    // predict time is from now on 5 day every 3 hours' data
    //5 * (24/3) = 40
    const dateArray = [];

    for (var h = 0; h < 40; h++) {
      const date = new Date(predictData[i][h][0]);
      dateArray += date.toDateString();
      timeOption +=
        "<option value='" +
        date.toTimeString().slice(0, 8) +
        "'>" +
        date.toTimeString().slice(0, 8) +
        "</option>";
    }
  }
  // omit the duplicated date
  const uniqueDteArray = [...new Set(dateArray)];
  uniqueDteArray.forEach((date) => {
    dateOption += "<option value='" + date + "'>" + date + "</option>";
  });

  document.getElementById("start").innerHTML = startOption;
  document.getElementById("dest").innerHTML = destOption;
  document.getElementById("date").innerHTML = dateOption;
  document.getElementById("time").innerHTML = timeOption;
}
