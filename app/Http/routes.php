<?php

// Home
Route::get('/', function () {
    return view('home');
});

// Read-Only Api
Route::controller('api', 'ApiController');


// Authentication
Route::get('auth/login',   'Auth\AuthController@getLogin');
Route::post('auth/login',  'Auth\AuthController@postLogin');
Route::get('auth/logout',  'Auth\AuthController@getLogout');

// Admin (auth)
Route::controller('admin', 'AdminController');


// Registration
//Route::get('auth/register',   'Auth\AuthController@getRegister');
//Route::post('auth/register',  'Auth\AuthController@postRegister');
