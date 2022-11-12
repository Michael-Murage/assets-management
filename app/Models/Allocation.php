<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Allocation extends Model
{
    use HasFactory;
	/**
     * Get the user that is being given the allocation.
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
	public function application()
	{
		return $this->belongsTo(Application::class);
	}

	protected $fillable = [
		'user_id',
		'official_id',
		'amount_allocated',
		'comment'
	];
}
