function PlayersService(callback) {
  var playersData = [];
  var myTeam = [];

  function loadPlayersData() {
    //check if the player already has a copy of the NFL playersData
    var localData = localStorage.getItem('playersData');
    //if they do, pull from there
    if (localData) {
      playersData = JSON.parse(localData);
      //return will short-circuit the loadPlayersData function
      //this will prevent the code below from ever executing
      console.log(playersData)
      return // callback (playersData)
    }
    //if not go get that data
    var url = "https://bcw-getter.herokuapp.com/?url=";
    var endpointUri = "http://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=football&response_format=json";
    var apiUrl = url + encodeURIComponent(endpointUri);

    $.getJSON(apiUrl, function (data) {
      playersData = data.body.players;
      console.log('Player Data Ready')
      console.log('Writing Player Data to localStorage')
      localStorage.setItem('playersData', JSON.stringify(playersData))
      console.log('Finished Writing Player Data to localStorage')
      //  callback(playersData)
    });
  }
  loadPlayersData();

  //SEARCH

  this.getPlayer = function getPlayer(query) {
    var x = query.toLowerCase()
    var filteredResults = playersData.filter(function (player) {
      return player.fullname.toLowerCase().includes(x) || player.pro_team.toLowerCase().includes(x) || player.position.toLowerCase().includes(x)
    })
    return filteredResults
  }

  this.getPlayersByPosition = function (position) {
    return playersData.filter(function (player) {
      if (player.position == position) {
        return true;
      }
    })
  }

  this.getPlayersByTeam = function (teamName) {
    return playersData.filter(function (player) {
      if (player.pro_team == teamName) {
        return true;
      }
    });
  }

  //ADD TO MY ROSTER

  this.addToTeam = function addToTeam(addPlayerId, cb) {
    return playersData.filter(function (player) {
      if (player.id == addPlayerId) {
        if (!comparePlayer(player)) {
          if (!comparePosition(player)) {
            if (myTeam.length <= 9) {
              myTeam.push(player)
              return cb(myTeam);
            }
            else {
              alert("10 Players Only!")
            }
          }
          else {
            alert("That position is filled!")
          }
        }
        else {
          alert("We already have him!")
        }
      }
    });
  }

function comparePlayer(player) {
  for (var i = 0; i < myTeam.length; i++) {
    var element = myTeam[i];
    if (player.id == element.id) {
      return true
    }
  }
  return false
}

function comparePosition(position) {
  for (var i = 0; i < myTeam.length; i++) {
    var element = myTeam[i];
    if (position.id == element.id) {
      return true
    }
  }
  return false
}


this.removeFromTeam = function removeFromTeam(removePlayerId, cb) {

  var removePlayer = myTeam.indexOf(removePlayerId)
    myTeam.splice(removePlayer, 1)
    cb(myTeam)
}
}
    