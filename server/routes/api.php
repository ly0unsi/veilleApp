<?php

use App\Http\Controllers\UserController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['auth:sanctum', 'verified'])->get('/user', function (Request $request) {
    return User::with('role:id,name')->find($request->user()->id);
});

// Define your admin routes here
Route::get('user/demandes', [UserController::class, 'getDemandes']);
Route::middleware(['auth:sanctum', 'verified'])->put('user/demandes/confirm/{id}', [UserController::class, 'confirmDemande']);

    // ... other admin routes