<?php

namespace App\Http\Controllers;

abstract class Controller
{
    function index() {
        return response()->json([
            'message' => 'Hello World'
        ]);
    }
}
