function PlayerController() {
    var playersService = new PlayersService(drawPlayers);

    // this.getPlayer = function getPlayer(e) {
    //     e.preventDefault();
    //     var player = e.target.player.value;
    //     playersService.loadPlayersData(playersData).then(drawPlayers);
    // }

    //SEARCH

    this.search = function search(e){
        e.preventDefault()
        var query = e.target.query.value
        var results = playersService.search(query)
        drawPlayers(results)
        };

    //LOADS MY PERSONAL TEAM

        function drawMyTeam(myPlayers) {
            var template = '<h1>My Team</h1>'
            for (let i = 0; i < myPlayers.length; i++) {
                var myPlayer = myPlayers[i];
                template += `
                <div>
        <ul>
        <li><img src="${myPlayer.photo}" alt=""></li>
        <li>Name: ${myPlayer.fullname}</li>
        <li>Team: ${myPlayer.pro_team}</li>
        <li>Position: ${myPlayer.position}</li>
        <li><button onsubmit="app.controllers.playerCtrl.removeFromTeam(${myPlayer.id})">Remove</button></li>
        </ul>
        </div>
            `
            }
            document.getElementById("myteam").innerHTML = template;
        }
        
    //LOADS ALL PLAYERS

    function drawPlayers(players) {
        var template = '<h1>Results:</h1>'
        for (let i = 0; i < players.length; i++) {
            var player = players[i];
            template += `
    <div>
            <ul>
        <li><img src="${player.photo}" alt=""></li>
        <li>Name: ${player.fullname}</li>
        <li>Team: ${player.pro_team}</li>
        <li>Position: ${player.position}</li>
        <li><button onsubmit="app.controllers.playerCtrl.addToTeam(${player.id})">Add</button></li>
    </ul>
    </div>
        `
        }
        document.getElementById("results").innerHTML = template;
    }

 
//ADD TO MY ROSTER

this.addToTeam = function addToTeam(id){
    playersService.addToTeam(id, drawMyTeam)
  }

//REMOVE FROM MY ROSTER

  this.removeFromTeam = function removeFromTeam(id) {
    playersService.removeFromTeam(id, drawMyTeam)
  };

}


