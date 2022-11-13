<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    public function index()
	{
		return response()->json(User::all());
	}

	public function show($id)
	{
		$user = User::find(intval($id));
		return response()->json($user);
	}
}
