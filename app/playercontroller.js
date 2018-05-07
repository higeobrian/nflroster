function PlayerController() {
    var playersService = new PlayersService(drawPlayers);

    //SEARCH

    this.getPlayer = function getPlayer(e){
        e.preventDefault()
        var query = e.target.player.value
        var results = playersService.getPlayer(query)
        drawPlayers(results)
        };
        
    //LOADS ALL PLAYERS

    function drawPlayers(players) {
        var template = '<h1>Results:</h1>'
        console.log(players)
        for (let i = 0; i < players.length; i++) {
            var player = players[i];
            template += `
    <div>
            <ul>
        <li><img src="${player.photo}" alt=""></li>
        <li>Name: ${player.fullname}</li>
        <li>Team: ${player.pro_team}</li>
        <li>Position: ${player.position}</li>
        <li><button onclick="app.controllers.playerCtrl.addToTeam(${player.id})">Add</button></li>
    </ul>
    </div>
        `
        }
        document.getElementById("results").innerHTML = template;
    }

        //LOADS MY PERSONAL TEAM

        function drawMyTeam(myPlayers) {
        debugger
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
        <li><button onclick="app.controllers.playerCtrl.removeFromTeam(${myPlayer.id})">Remove</button></li>
        </ul>
        </div>
            `
            }
            document.getElementById("myteam").innerHTML = template;
        
        }

 
//ADD TO MY ROSTER


this.addToTeam = function addToTeam(id){
    console.log(id)
    playersService.addToTeam(id, drawMyTeam)
  }

//REMOVE FROM MY ROSTER

  this.removeFromTeam = function removeFromTeam(id) {
    playersService.removeFromTeam(id, drawMyTeam)
  };

}


