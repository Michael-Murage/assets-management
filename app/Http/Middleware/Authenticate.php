<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;

class Authenticate extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    protected function redirectTo($request)
    {
        if (! $request->expectsJson()) {
            return route('login');
        }
    }
}

// if (! $request->expectsJson()) {
// 	$guard = array_get($exception->guards(), 0);

// 	switch ($guard) {
// 		case 'official':
// 			$login = 'official-login';
// 			break;
		
// 		default:
// 			$login = 'login';
// 			break;
// 	}
// 	return route($login);
// }
