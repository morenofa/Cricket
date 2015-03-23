/**
 * Created by aitor on 14/12/14.
 */


define(function() {

    return {

        saveLocalGameData: function(key, value) {
            if (typeof value == "object") {
                value = JSON.stringify(value);
            }

            localStorage.setItem(key, value);
        },

        getLocalGameData: function(key) {
            var obj = localStorage.getItem(key);

            return JSON.parse(obj);
        },

        removeLocalGameData: function(key) {
            console.log("Remove");
            localStorage.removeItem(key);
        }

    }

});