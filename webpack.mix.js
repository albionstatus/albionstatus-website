/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */
const {mix} = require('laravel-mix');
let resourcePath = "src",
    jsPath = resourcePath + "/js",
    sassPath = resourcePath + "/scss",
    publicPath = "public";

mix.autoload({
    moment: "moment",
    lodash: ['window._', '_',],
    axios: ['window.axios', 'axios'],
    vue: ['window.Vue', 'vue'],
});


mix
    .sass(sassPath + "/app.scss", publicPath)
    .js(jsPath + "/app.js", publicPath)
    .copy("node_modules/font-awesome/fonts", publicPath + "/fonts")
    .copy(resourcePath + "/img", publicPath + "/img", false)
    .options({processCssUrls: false});
