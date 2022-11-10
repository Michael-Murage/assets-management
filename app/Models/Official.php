<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\Official as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
// use Illuminate\Database\Eloquent\Model;

class Official extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

	protected $guard = 'official';
	
	/**
     * Get the official that is giving the allocation.
     */
	public function allocation()
	{
		return $this->hasMany(Allocation::class);
	}

	/**
     * Get the application attached to the allocation.
     */
	public function application()
	{
		return $this->hasMany(Application::class);
	}

	protected $fillable = [
        'first_name',
		'last_name',
		'id_number',
        'email',
        'password',
    ];

	protected $hidden = [
        'password',
        'remember_token',
    ];

	protected $casts = [
        'email_verified_at' => 'datetime',
    ];
}
