/**
 * Created by aitor on 9/3/15.
 *
 ****************
 *  FOR BUILD   *
 ****************
 *
 * npm install -g requirejs
 * cd src/js/tools/
 * r.js -o build.js
 *
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