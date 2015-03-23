/**
 * Created by aitor on 14/12/14.
 */

require(['jquery', 'game', 'player', "localStorage", "i18n!nls/lang", 'hbs!templates/body', "bootstrap"], function ($, Game, Player, LocalStorage, lang, body) {

    var localStorageKey = "GameData";
    var localeKey = "locale";
    var game;

    //When the page is loaded
    $(document).ready(function() {
        //Add view
        $("body").append(body({ lang: lang }));

        //Listeners
        $("#numJug").change(function() {
            generateInputPlayers($('#numJug').find(":selected").text());
        });

        $("#btnData").click(function() {
            setupData();
        });

        $("#btnNext").click(function() {
            modalPrepare();
        });

        $("#btnAccept").click(function() {
            saveHistory();
            updateResults();
            resetInputs();
            refreshHtml();
            LocalStorage.saveLocalGameData(localStorageKey, game);
        });

        $(document).delegate(".btnRestore", "click", function(event) {
            var backupId = parseInt($(event.target).data().attribute);

            game.restoreBackup(backupId);
            LocalStorage.saveLocalGameData(localStorageKey, game);

            location.reload();
        });

        $("#langMenu li a").click(function(event) {
            event.preventDefault();

            var locale = $(this).data( "locale" );
            LocalStorage.saveLocalGameData(localeKey, locale);

            location.reload();
        });

        $("#newGame").click(function(event) {
            event.preventDefault();

            LocalStorage.removeLocalGameData(localStorageKey);

            location.reload();
        });

        $(".changeScreen").click(function(event) {
            event.preventDefault();

            changeVisibility("#showHistory");
            changeVisibility("#showGame");

            changeVisibility(".game");
            changeVisibility(".history");
        });

        var attempts = ["f", "s", "t"];
        $.each(attempts, function(i, a) {
            $("#"+a+"Attempt").change(function() {
                changeTypeAttempt(a);
            });
            changeTypeAttempt(a);
        });

        if (LocalStorage.getLocalGameData(localStorageKey) != undefined) {
            retrievedDataGame();
            refreshHtml();
        }

        generateInputPlayers(1);
    });

    function changeVisibility(identifier) {
        var element = $(identifier);
        if (element.hasClass("noVisible")) {
            element.removeClass("noVisible");
        } else {
            element.addClass("noVisible");
        }
    }

    function modalPrepare() {
        var str = "";

        var attempts = ["f", "s", "t"];
        $.each(attempts, function(i, a) {
            var sector = $("#"+a+"Attempt").find(":selected").text();
            if (sector.indexOf("document.write") > -1) {
                sector = sector.split(";")[1];
            }

            var type = $("#"+a+"AttemptType").find(":selected").text();

            str += "<strong>" + lang['attemptNum'] + " " + (i+1) + "</strong>" + "<br/>" + "<strong>" + lang["sector"] + ": " + "</strong>" + sector + "<br/>" + "<strong>" + lang['type'] + ": " + "</strong>" + type + "<br/><br/>";
        });

        $(".modal .modal-body").html(str);
    }

    function resetInputs() {
        var attempts = ["f", "s", "t"];
        $.each(attempts, function(i, a) {
            $("#"+a+"Attempt").val("failures");
            $("#"+a+"AttemptType").val("1");
            changeTypeAttempt(a);
        });
    }

    function saveHistory() {
        game.saveHistory();
    }

    function retrievedDataGame() {
        var retrievedData = LocalStorage.getLocalGameData(localStorageKey);
        game = new Game(retrievedData.numPlayers);
        game.retrieveFromJSON(retrievedData);
    }

    function changeTypeAttempt(type) {
        var target = $("#"+type+"Attempt").find(":selected").val();
        var selector = $("#"+type+"AttemptType");

        selector.empty();

        selector.append($("<option></option>").attr("value", 1).text(lang["simple"]));
        if (target != "failures") selector.append($("<option></option>").attr("value", 2).text(lang["double"]));
        if (target != "failures" && target != "bull") selector.append($("<option></option>").attr("value", 3).text(lang["triple"]));
    }

    function generateInputPlayers(num) {
        var str = "";

        for (var i = 1; i <= num; i++) {
            str += '<div id="formGroupNamePlayer'+i+'" class="form-group"><label class="control-label" for="namePla'+i+'">'+lang['name_player']+' '+i+'</label><input type="text" class="form-control" id="namePla'+i+'" placeholder="'+lang['player']+' '+i+'"></div>';
        }

        $(".data .players").html(str);
    }

    function setupData() {
        var num      = $('#numJug').find(":selected").text();
        var gameMode = $('#gameMode').find(":selected").val();

        var error = false;
        var players = [];
        for (var i = 1; i <= num; i++) {
            var name = $('#namePla'+i).val();
            var formGroup = $("#formGroupNamePlayer"+i);

            if (name == "") {
                formGroup.addClass("has-error");
                error = true;
            } else {
                if (formGroup.hasClass("has-error")) {
                    formGroup.removeClass("has-error");
                }
                players.push(new Player(name));
            }
        }

        if (!error) {
            game = new Game(num, gameMode);
            game.players = players;
            LocalStorage.saveLocalGameData(localStorageKey, game);

            refreshHtml();
        }
    }

    function updateResults() {
        var attempts = ["f", "s", "t"];

        $.each(attempts, function(i, a) {
            var sector = $("#"+a+"Attempt").val();
            var type = parseInt($("#"+a+"AttemptType").val());

            game.addPoints(sector, type);
        });

        game.nextPlayer();
    }

    function refreshHtml() {
        $(".data").addClass("noVisible");

        if (game.getWinner() != null) {
            $("#winner").removeClass("noVisible");
            $("#winner a").text(lang["congratulations"]+" "+game.getWinner().getName()+"! "+lang["you_win"]);
        }

        var str = '';
        $.each(game.players, function(i, p) {
            str += "<tr>";
            str += "<td>"+p.getName()+"</td>";
            str += "<td>"+p.getPoints()['sector20']+"</td>";
            str += "<td>"+p.getPoints()['sector19']+"</td>";
            str += "<td>"+p.getPoints()['sector18']+"</td>";
            str += "<td>"+p.getPoints()['sector17']+"</td>";
            str += "<td>"+p.getPoints()['sector16']+"</td>";
            str += "<td>"+p.getPoints()['sector15']+"</td>";
            str += "<td>"+p.getPoints()['bull']+"</td>";
            str += "<td>"+p.getPoints()['points']+"</td>";
            str += "<td>"+p.getPoints()['failures']+"</td>";
            str += "</tr>";
        });

        $(".game table tbody").html(str);

        $(".currentPlayer a").text(game.getCurrentPlayer().getName() + lang['playerTurn']);

        $( ".game" ).removeClass("noVisible");

        var history = "";
        for (var i = game.history.length; i > 0; i--) {
            var h = game.history[i-1];
            history += '<div class="row"><div class="col-md-12">';
            history += '<h4>' + lang["information"] + '</h4><hr/><p><b>' + lang['round'] + ' :</b> '+h.round+'<br/><b>' + lang["player"] + ':</b> '+ h.players[h.currentPlayer].name+'</p>';
            history += generateResultsTable(h.players);
            history += '</div></div>';
            history += '<div class="row"><div class="col-md-12" style="text-align: right"><button type="button" class="btn btn-default btnRestore" data-attribute="'+(i-1)+'">'+lang['restore']+'</button></div></div>';
            history += "<br/>"
        }
        if (history == "") history += lang['no_history'];
        $(".backups").html(history);

        $( "#showHistory" ).removeClass("noVisible");
    }

    function generateResultsTable(players) {
        var table = '<table class="table table-condensed table-striped table-bordered"><thead><tr><th>'+lang['player']+'</th><th>20</th><th>19</th><th>18</th><th>17</th><th>16</th><th>15</th><th>'+lang['bull']+'</th><th>'+lang['points']+'</th><th>'+lang['failures']+'</th></tr></thead>';

        $.each(players, function(i, p) {
            table += "<tr>";
            table += "<td>"+p.getName()+"</td>";
            table += "<td>"+p.getPoints()['sector20']+"</td>";
            table += "<td>"+p.getPoints()['sector19']+"</td>";
            table += "<td>"+p.getPoints()['sector18']+"</td>";
            table += "<td>"+p.getPoints()['sector17']+"</td>";
            table += "<td>"+p.getPoints()['sector16']+"</td>";
            table += "<td>"+p.getPoints()['sector15']+"</td>";
            table += "<td>"+p.getPoints()['bull']+"</td>";
            table += "<td>"+p.getPoints()['points']+"</td>";
            table += "<td>"+p.getPoints()['failures']+"</td>";
            table += "</tr>";
        });

        table += '<tbody></tbody></table>';

        return table;
    }

});