const mix = require('laravel-mix');
const tailwindcss = require('tailwindcss');

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

mix.js('resources/js/app.js', 'public/js')
    .extract(['vue', 'vue-router', 'lodash', 'axios'])
    .postCss('resources/css/app.css', 'public/css', [
        require('postcss-easy-import'),
        tailwindcss('tailwind.js'),
    ]);

if (mix.inProduction()) {
    mix.version();
    mix.disableNotifications();
}
