<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AllocationController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->get('/official', function (Request $request) {
    return $request->official();
});

Route::get('applications', [ApplicationController::class, 'index']);

Route::post('applications', [ApplicationController::class, 'store']);

Route::patch('applications', [ApplicationController::class, 'edit']);

Route::get('users', [UserController::class, 'index']);

Route::get('allocations', [AllocationController::class, 'index']);

Route::post('allocations', [AllocationController::class, 'store']);
