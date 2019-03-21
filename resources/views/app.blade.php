<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>{{ config('app.name') }}</title>

        <script src="{{ mix('js/manifest.js') }}" defer></script>
        <script src="{{ mix('js/vendor.js') }}" defer></script>
        <script src="{{ mix('js/app.js') }}" defer></script>
        <link href="{{ mix('css/app.css') }}" rel="stylesheet">

        <meta name="apple-mobile-web-app-title" content="{{ config('app.name') }}">
        <meta name="theme-color" content="#4dc0b5">
    </head>
    <body class="bg-gray-200 text-gray-800 font-sans">
        <div id="app">
            <app-nav>
                <div class="navbar">
                    {{-- Placeholder for before Vue inits --}}
                    <div class="btn btn-nav invisible" aria-hidden="true">
                        Loading&hellip;
                    </div>
                </div>
            </app-nav>
            <div class="container my-4" v-if="$auth.ready()">
                <router-view ref="view"></router-view>
            </div>
            <post-modal ref="postModal" v-if="$auth.check()"></post-modal>
        </div>
    </body>
</html>
