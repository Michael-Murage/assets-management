<?php

namespace App\Http\Controllers;

use App\Models\Allocation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
// use Inertia\Inertia;

class AllocationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json('Hi there');
		// return Inertia::render('Allocations/Index', []);

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
		// dd(gettype($request->amount_allocated));
        $allocation = Allocation::create([
			"official_id" => intval($request->official_id),
			"user_id" => intval($request->user_id),
			"comment" => $request->comment,
			"amount_allocated" => intval($request->amount_allocated),
			"application_id" => intval($request->application_id)
		]);
		return response()->json(["success" => "Your response has been received"]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\allocation  $allocation
     * @return \Illuminate\Http\Response
     */
    public function show(allocation $allocation)
    {
		
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\allocation  $allocation
     * @return \Illuminate\Http\Response
     */
    public function edit(allocation $allocation, Request $request, $key)
    {
        $application_id = intval($key);
		$allocation = DB::table('allocations')->where('application_id', $application_id)->get();
		return response()->json($allocation[0]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\allocation  $allocation
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, allocation $allocation)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\allocation  $allocation
     * @return \Illuminate\Http\Response
     */
    public function destroy(allocation $allocation)
    {
        //
    }
}
