<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Application extends Model
{
    use HasFactory;
	/**
     * Get the user doing the application.
     */
	public function user()
	{
		return $this->belongsTo(User::class);
	}
	
	/**
     * Get the official that is giving the allocation.
     */
	public function official()
	{
		return $this->belongsTo(Official::class);
	}

	/**
     * Get the application attached to the allocation.
     */
	public function allocation()
	{
		return $this->hasMany(Allocation::class);
	}

	protected $fillable = [
		'user_id',
		'official_id',
		'description',
		'amount_requesting',
		'status'
	];
}
