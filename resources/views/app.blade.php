<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>{{ config('app.name') }}</title>

        <script src="{{ asset('js/manifest.js') }}" defer></script>
        <script src="{{ asset('js/vendor.js') }}" defer></script>
        <script src="{{ asset('js/app.js') }}" defer></script>
        <link href="{{ asset('css/app.css') }}" rel="stylesheet">

        <meta name="apple-mobile-web-app-title" content="{{ config('app.name') }}">
        <meta name="theme-color" content="#4dc0b5">
    </head>
    <body class="bg-grey-lighter text-grey-darker">
        <div id="app">
            <app-nav></app-nav>
            <div class="container my-4">
                <div v-if="$auth.ready()">
                    <router-view></router-view>
                </div>
                <div v-if="!$auth.ready()">
                    Loading&hellip;
                </div>
            </div>
        </div>
    </body>
</html>
