/**
 * Created by aitor on 14/12/14.
 */

define(['jquery', 'player'], function($, Player) {

    function Game(num, gameMode) {

        /* Atributes */

        this.round = 1;
        this.numPlayers = num;
        this.currentPlayer = 0;
        this.gameMode = gameMode;
        this.winner = null;
        this.players = [];
        this.history = [];

        /* Functions */

        this.saveHistory = function() {
            var game = new Game(this.numPlayers, this.gameMode);
            game.round = this.round;
            game.currentPlayer = this.currentPlayer;
            game.winner = this.winner;

            $.each(this.players, function(i, p) {
                var player = new Player(p.name);
                player.retrieveFromJSON(p);

                game.players.push(player);
            });

            this.history.push(game);

            if (this.history.length >= 10) this.history.splice(0, 1);
        };

        this.restoreBackup = function(idBackup) {
            var backup = this.history[idBackup];

            this.numPlayers = backup.numPlayers;
            this.gameMode = backup.gameMode;
            this.round = backup.round;
            this.currentPlayer = backup.currentPlayer;
            this.winner = backup.winner;
            this.players = backup.players;

            console.log(backup.players);
            console.log(this.players);

            this.history.splice(idBackup, ((this.history.length)-idBackup));
        };

        this.addPoints = function(sector, type) {
            if (sector == "failures") {
                this.players[this.currentPlayer].addPointToSector(sector);
            } else {
                for (var i = 0; i < type; i++) {
                    if (!this.players[this.currentPlayer].isClosedSector(sector)) {
                        this.players[this.currentPlayer].addPointToSector(sector);
                    } else {
                        for (var j = 0; j < this.numPlayers; j++) {
                            var player = this.players[j];

                            if (this.gameMode == "clasic") {
                                if (!player.isClosedSector(sector)) {
                                    this.players[this.currentPlayer].addPoints(sector);
                                    break;
                                }
                            } else if (this.gameMode == "cutThroat") {
                                if (!player.isClosedSector(sector) && player.getName() != this.players[this.currentPlayer].getName()) {
                                    this.players[j].addPoints(sector);
                                }
                            }
                        }
                    }
                }
            }
        };

        this.getWinner = function() {
            if (this.winner == null) {
                var points = 0;

                for (var i = 0; i < (this.numPlayers); i++) {
                    var playerPoints = this.players[i].getPoints()['points'];

                    if (this.gameMode == "clasic") {
                        if (points < playerPoints ) {
                            points = playerPoints;
                        }
                    } else if (this.gameMode == "cutThroat") {
                        if (points > playerPoints || points == 0) {
                            points = playerPoints;
                        }
                    }
                }

                for (i = 0; i < (this.numPlayers); i++) {
                    var player = this.players[i];

                    if(player.getPoints()['points'] == points && player.hasAllSectorsClosed()) {
                        this.winner = player;
                    }
                }
            }

            return this.winner;
        };

        this.nextPlayer = function() {
            this.currentPlayer = (this.currentPlayer + 1) % this.numPlayers;
            if (this.currentPlayer == 0) this.round++;
        };

        this.retrieveFromJSON = function(retrievedJson) {
            this.numPlayers = retrievedJson.numPlayers;
            this.currentPlayer = retrievedJson.currentPlayer;
            this.round = retrievedJson.round;
            this.gameMode = retrievedJson.gameMode;

            if (retrievedJson.winner != null) {
                this.winner = new Player(retrievedJson.winner.name);
                this.winner.retrieveFromJSON(retrievedJson.winner);
            }

            var players = [];
            $.each(retrievedJson.players, function(i, jsonPlayer) {
                var player = new Player(jsonPlayer.name);
                player.retrieveFromJSON(jsonPlayer);
                players.push(player);
            });
            this.players = players;

            var history = [];
            $.each(retrievedJson.history, function(i, jsonGame) {
                var game = new Game(jsonGame.numPlayers, jsonGame.gameMode);
                game.retrieveFromJSON(jsonGame);
                history.push(game);
            });
            this.history = history;
        };

        /* Getters && Setters */

        this.getCurrentPlayer = function() {
            return this.players[this.currentPlayer];
        };
    }

    return Game;

});