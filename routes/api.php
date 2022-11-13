<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AllocationController;
use App\Http\Controllers\OfficialController;

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

Route::patch('applications', [ApplicationController::class, 'update']);

Route::get("applications/{id}", [ApplicationController::class, 'show']);

Route::get('users', [UserController::class, 'index']);

Route::get('users/{id}', [UserController::class, 'show']);

Route::get('allocations', [AllocationController::class, 'index']);

Route::post('allocations', [AllocationController::class, 'store']);

Route::get('allocations-show/{id}', [AllocationController::class, 'edit']);

Route::get('officials/{id}', [OfficialController::class, 'show']);