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
})->name('official-dashboard');

Route::get('official-login', [AuthenticatedOfficialController::class, 'create'])
->name('official-login');

Route::post('official-login', [AuthenticatedOfficialController::class, 'store']);

Route::post('logout', function(Request $request){
	$request->session()->flush();
	return redirect('/');
})->name('logout');

Route::get('newapplication', function(){
	return Inertia::render('NewApplication');
})->middleware(['auth', 'verified'])->name('newapplication');

Route::get('allocation-form', function(Request $request){
	$user_id = $request->query->get('user_id');
	$application_id = $request->query->get('id');
	$session_id = $request->session()->get('key');
	$official = Official::find($session_id);
	if($official){
		return Inertia::render('AllocationForm', [
			'official' => $official,
			'user_id' => $user_id,
			'application_id' => $application_id
		]);
	}
	return redirect('/official-dashboard');
})->name('allocation-form');

Route::get('applications/{id}', function(Request $request, $key){
	return Inertia::render('ViewApplicationDetails', [
		'id' => intVal($key)
	]);
})->name('applications');

Route::get('new-official', function(Request $request){
    $id = $request->session()->get('key');
    $official = Official::find($id);
    $official->email;
    if ($official->email == "admin@gmail.com") {
        return Inertia::render('Auth/RegisterOfficial');   
    }else{
        return redirect('/official-dashboard');
    }
})->name('new-official');

require __DIR__.'/auth.php';
