require.config({
    baseUrl: 'js',
    paths: {
        //RequireJS Plugins
        async: 'libs/require/plugins/async',
        domReady: 'libs/require/plugins/domReady',
        jqueryBridget: 'libs/require/plugins/jquery.bridget',
        i18n: 'libs/require/plugins/i18n',
        hbs: 'libs/hbs',

        //Libs
        jquery : 'libs/jquery-2.1.1.min',
        bootstrap: 'libs/bootstrap.min',

        //Models
        game: 'models/Game',
        player: 'models/Player',
        localStorage: 'models/LocalStorage'

    },
    shim: {
        'bootstrap': {
            deps : ['jquery']
        }
    }
});

require.config({
    config: {
        i18n: {
            locale: localStorage.getItem('locale')
        }
    }
});

require(["app/app"]);