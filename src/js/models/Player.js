/**
 * Created by aitor on 14/12/14.
 */

define(function() {

    function Player(name) {

        /* Atributes */

        this.name = name;
        this.sector20 = 0;
        this.sector19 = 0;
        this.sector18 = 0;
        this.sector17 = 0;
        this.sector16 = 0;
        this.sector15 = 0;
        this.bull = 0;
        this.points = 0;
        this.failures = 0;

        /* Methods */

        this.addPointToSector = function (sector) {
            this[sector] += 1;
        };

        this.retrieveFromJSON = function(retrievedJson) {
            this.name = retrievedJson.name;
            this.sector20 = retrievedJson.sector20;
            this.sector19 = retrievedJson.sector19;
            this.sector18 = retrievedJson.sector18;
            this.sector17 = retrievedJson.sector17;
            this.sector16 = retrievedJson.sector16;
            this.sector15 = retrievedJson.sector15;
            this.bull = retrievedJson.bull;
            this.points = retrievedJson.points;
            this.failures = retrievedJson.failures;
        };

        this.addPoints = function(sector) {
            this.points += this.getSectorPoints(sector);
        };

        /* Getters && Setters */

        this.getSectorPoints = function (key) {
            var points = 0;

            switch(key) {
                case "sector20":
                    points = 20;
                    break;
                case "sector19":
                    points = 19;
                    break;
                case "sector18":
                    points = 18;
                    break;
                case "sector17":
                    points = 17;
                    break;
                case "sector16":
                    points = 16;
                    break;
                case "sector15":
                    points = 15;
                    break;
                case "bull":
                    points = 25;
                    break;
            }

            return points;
        };

        this.hasAllSectorsClosed = function() {
            var allSectorsClosed = true;

            allSectorsClosed = allSectorsClosed && this.isClosedSector("sector20");
            allSectorsClosed = allSectorsClosed && this.isClosedSector("sector19");
            allSectorsClosed = allSectorsClosed && this.isClosedSector("sector18");
            allSectorsClosed = allSectorsClosed && this.isClosedSector("sector17");
            allSectorsClosed = allSectorsClosed && this.isClosedSector("sector16");
            allSectorsClosed = allSectorsClosed && this.isClosedSector("sector15");
            allSectorsClosed = allSectorsClosed && this.isClosedSector("bull");

            return allSectorsClosed;
        };

        this.isClosedSector = function(sector) {
            return this[sector] >= 3;
        };

        this.getName = function() {
            return this.name;
        };

        this.getPoints = function() {
            return {
                sector20: this.sector20,
                sector19: this.sector19,
                sector18: this.sector18,
                sector17: this.sector17,
                sector16: this.sector16,
                sector15: this.sector15,
                bull: this.bull,
                points: this.points,
                failures: this.failures
            };
        };
    }

    return Player;

});