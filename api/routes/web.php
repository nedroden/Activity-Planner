<?php

//Route::group(['middleware' => 'api'], function() {
    Route::get('/activities/{start_date}', 'ActivityController@index');
    Route::get('/activity/{activity}/delete', 'ActivityController@destroy');
    Route::get('/activity/{activity}', 'ActivityController@show');

    Route::post('/activities', 'ActivityController@store');
    Route::post('/activity/{activity}', 'ActivityController@update');
//});