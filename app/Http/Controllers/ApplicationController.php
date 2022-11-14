<?php

namespace App\Http\Controllers;

use App\Models\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ApplicationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
		$applications = Application::all();
        return response()->json($applications);
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
        $request->validate([
			'amount_requesting' => 'required|integer|min:4',
			'description' => 'required|string'
		]);

		$application = Application::create([
			'user_id' => $request->user_id,
			'description' => $request->description,
			'amount_requesting' => $request->amount_requesting,
			'official_id' => 1
		]);
		return response()->json([
			'success' => 'application received'
		]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Application  $application
     * @return \Illuminate\Http\Response
     */
    public function show(Application $application, $id)
    {
		$app = Application::find(intval($id));
		return response()->json($app);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Application  $application
     * @return \Illuminate\Http\Response
     */
    public function edit(Application $application, Request $request, $key)
    {
        $application = Application::find(intval($key));
		$application->amount_requesting = $request->amount_requesting;
		$application->description = $request->description;
		$application->save();
		return response()->json(["success" => "status updated"]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Application  $application
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Application $application)
    {
        $application = Application::find($request->id);
		$application->status = $request->status;
		$application->save();
		return response()->json(["success" => "status updated"]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Application  $application
     * @return \Illuminate\Http\Response
     */
    public function destroy(Application $application)
    {
        //
    }
}
