<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Official;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\RegisteredOfficial;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;

class RegisteredOfficialController extends Controller
{
    /**
     * Display the registration view.
     *
     * @return \Inertia\Response
     */
    public function create()
    {
        return Inertia::render('Auth/RegisterOfficial');
    }

    /**
     * Handle an incoming registration request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {
        $request->validate([
            'first_name' => 'required|string|max:255',
			'last_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:'.Official::class,
			'id_number' => 'required|integer|min:8|unique:'.Official::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $official = Official::create([
            'first_name' => $request->first_name,
			'last_name' => $request->last_name,
            'email' => $request->email,
			'id_number' => $request->id_number,
            'password' => Hash::make($request->password),
        ]);

        event(new Registered($official));

        Auth::guard('official')->login($official);

		return redirect('/official-home');
    }
}
