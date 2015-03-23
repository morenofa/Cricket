/**
 * Created by aitor on 9/3/15.
 */

({
    appDir: "../../../src",
    baseUrl: 'js',
    dir: "../../../dist",

    modules: [
        {
            name: "main",
            include: [
                "app/app"
            ]
        }
    ],

    mainConfigFile: '../../../src/js/main.js',

    optimize: "uglify2",
    optimizeCss: "standard",
    removeCombined: false,
    preserveLicenseComments: false
});