<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
// use App\Models\Official;
// use Illuminate\Support\Facades\Hash;

class AuthenticatedOfficialController extends Controller
{
	public function __construct()
	{
		$this->middleware('guest:official');
	}
	// protected $guard = 'official';

    /**
     * Display the login view.
     *
     * @return \Inertia\Response
     */
    public function create()
    {
        return Inertia::render('Auth/OfficialLogin', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     *
     * @param  \App\Http\Requests\Auth\LoginRequest  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request)
    {
		$credentials = $request->validate([
			'email' => ['required', 'email'],
			'password' => ['required']
		]);

		if (Auth::attempt($credentials)){
			$request->session()->regenerate();

			return redirect()->intended(RouteServiceProvider::OFFICIALHOME);
		}
        // $request->authenticate();
		// $x = Official::where('email', $request->email)->get();
		// dd(Hash::check($request->password, $x[0]->password));

        // $request->session()->regenerate();

        return back()->withErrors([
			'email' => 'Invalid email or password'
		])->onlyInput('email');
    }

    /**
     * Destroy an authenticated session.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Request $request)
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
