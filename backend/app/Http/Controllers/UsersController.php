<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UsersController extends Controller
{
    function index() {
        $user = User::select('id', 'name', 'email')->get();
        return response()->json($user);
    }
}
