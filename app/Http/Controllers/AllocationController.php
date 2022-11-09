<?php

namespace App\Http\Controllers;

use App\Models\allocation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AllocationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return 'Hi there';
		return Inertia::render('Allocations/Index', []);
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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\allocation  $allocation
     * @return \Illuminate\Http\Response
     */
    public function show(allocation $allocation)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\allocation  $allocation
     * @return \Illuminate\Http\Response
     */
    public function edit(allocation $allocation)
    {
        //
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
