<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SpaController extends Controller
{
    /**
     * Single-page application app route
     *
     * @return \Illuminate\Http\Response
     */
    public function app()
    {
        return view('app');
    }
}
