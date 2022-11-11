<?php

use App\Http\Controllers\AllocationController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Auth\AuthenticatedOfficialController;
use Illuminate\Http\Request;
use App\Models\Official;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
		'authenticated' => Auth::user()
    ]);
});

Route::resource('allocations', AllocationController::class)
	->only(['index', 'store'])
	->middleware(['auth', 'verified']);

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/official-dashboard', function (Request $request) {
	$session_id = $request->session()->get('key');
	$official = Official::find($session_id);
	if($official){
		return Inertia::render('OfficialDashboard', [
			'official' => $official
		]);
	}
	return redirect('/official-login');
});

Route::get('official-login', [AuthenticatedOfficialController::class, 'create'])
->name('official-login');

Route::post('official-login', [AuthenticatedOfficialController::class, 'store']);

Route::post('logout', function(Request $request){
	$request->session()->flush();
})->name('logout');

require __DIR__.'/auth.php';
