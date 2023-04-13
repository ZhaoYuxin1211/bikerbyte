filterBtnClicked(data){
   
    var senatorArray = parsedSenators.objects;

    //get the filter values
    var partyValue = document.getElementById("party").value;
    var stateValue = document.getElementById("state").value;
    var rankValue = document.getElementById("rank").value;
    let stationDropdown1 = document.getElementById("start-station").value;
    let stationDropdown2 = document.getElementById("destination-station").value;
    let dateDropdown = document.getElementById("date").value;
    let timeDropdown = document.getElementById("time").value;
    let stations = data.keys(Data);

    //innerHTML
    var senators = "<table class = 'table table-striped table-hover'>";
    senators +=
      "<tr><th scope='col'>Name</th><th scope='col'>Party</th><th scope='col'>State</th><th scope='col'>Gender</th><th scope='col'>Rank</th><th>Details</th></tr>";

    for (var i = 0; i < senatorArray.length; i++) {
      var leadership = senatorArray[i].leadership_title;
      var firstname = senatorArray[i].person.firstname;
      var lastname = senatorArray[i].person.lastname;
      var party = senatorArray[i].party;
      var gender = senatorArray[i].person.gender;
      var rank = senatorArray[i].senator_rank;
      var state = senatorArray[i].state;

      //single party
      if (partyValue != "default") {
        if (
          partyValue == party &&
          (state == stateValue || stateValue == "default") &&
          (rank == rankValue || rankValue == "default")
        ) {
          senators +=
            "<tr><td scope='row'>" +
            firstname +
            " " +
            lastname +
            "</td><td scope='row'>" +
            party +
            "</td><td scope='row'>" +
            state +
            "</td><td scope='row'>" +
            gender +
            "</td><td scope='row'>" +
            rank +
            "</td><td><button class='btn btn-primary m-3 w-10' id='Button' type='button' onclick='detailBtnClicked(" +
            i +
            ")'>Show Details</button></td scope='row'></tr scope='row'>";
        }
      } else {
        //multiple party: the Republican group
        if (
          party == "Democrat" &&
          (state == stateValue || stateValue == "default") &&
          (rank == rankValue || rankValue == "default")
        ) {
          senators +=
            "<tr><td scope='row'>" +
            firstname +
            " " +
            lastname +
            "</td><td scope='row'>" +
            party +
            "</td><td scope='row'>" +
            state +
            "</td><td scope='row'>" +
            gender +
            "</td><td scope='row'>" +
            rank +
            "</td><td><button class='btn btn-primary m-3 w-10' id='Button' type='button' onclick='detailBtnClicked(" +
            i +
            ")'>Show Details</button></td scope='row'></tr scope='row'>";
        }
      }
    }

    for (var i = 0; i < senatorArray.length; i++) {
      var leadership = senatorArray[i].leadership_title;
      var firstname = senatorArray[i].person.firstname;
      var lastname = senatorArray[i].person.lastname;
      var party = senatorArray[i].party;
      var gender = senatorArray[i].person.gender;
      var rank = senatorArray[i].senator_rank;
      var state = senatorArray[i].state;

      //Multi party: Democrat group
      if (
        partyValue == "default" &&
        party == "Republican" &&
        (state == stateValue || stateValue == "default") &&
        (rank == rankValue || rankValue == "default")
      ) {
        senators +=
          "<tr><td scope='row'>" +
          firstname +
          " " +
          lastname +
          "</td><td scope='row'>" +
          party +
          "</td><td scope='row'>" +
          state +
          "</td><td scope='row'>" +
          gender +
          "</td><td scope='row'>" +
          rank +
          "</td><td><button class='btn btn-primary m-3 w-10' id='Button' type='button' onclick='detailBtnClicked(" +
          i +
          ")'>Show Details</button></td scope='row'></tr scope='row'>";
      }
    }

    for (var i = 0; i < senatorArray.length; i++) {
      var leadership = senatorArray[i].leadership_title;
      var firstname = senatorArray[i].person.firstname;
      var lastname = senatorArray[i].person.lastname;
      var party = senatorArray[i].party;
      var gender = senatorArray[i].person.gender;
      var rank = senatorArray[i].senator_rank;
      var state = senatorArray[i].state;

      //Multi party: Independent group
      if (
        partyValue == "default" &&
        party == "Independent" &&
        (state == stateValue || stateValue == "default") &&
        (rank == rankValue || rankValue == "default")
      ) {
        senators +=
          "<tr><td scope='row'>" +
          firstname +
          " " +
          lastname +
          "</td><td scope='row'>" +
          party +
          "</td><td scope='row'>" +
          state +
          "</td><td scope='row'>" +
          gender +
          "</td><td scope='row'>" +
          rank +
          "</td><td><button class='btn btn-primary m-3 w-10' id='Button' type='button' onclick='detailBtnClicked(" +
          i +
          ")'>Show Details</button></td scope='row'></tr scope='row'>";
      }
    }

    senators += "</table>";
    document.getElementById("senators").innerHTML = senators;
  }