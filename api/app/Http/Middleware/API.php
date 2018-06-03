<?php

namespace App\Http\Middleware;

use Closure;

class API
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        // Credits to Balazs Szabo at https://stackoverflow.com/questions/40934415/cross-origin-request-blocked-issue-on-sending-headers-in-angular2-post-request
        return $next($request)
            ->header('Access-Control-Allow-Origin', '*')
            ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
            ->header('Access-Control-Allow-Headers', '*');
    }
}
