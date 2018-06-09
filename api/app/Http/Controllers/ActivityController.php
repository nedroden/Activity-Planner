<?php

namespace App\Http\Controllers;

use App\Activity;
use Illuminate\Http\Request;

class ActivityController extends Controller
{
    private const VALIDATION_RULES = [
        'title' => 'required|min:5|max:50',
        'description' => 'max:500',
        'location' => 'max:50'
        //'starts_at' => 'required|date',
        //'ends_at' => 'required|date'
    ];

    public function index(string $startingOn)
    {
        return response()->json(Activity::with('attachments')
            ->whereDate('starts_at', $startingOn)
            ->get()
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, self::VALIDATION_RULES);

        $startsAt = '';
        $endsAt = '';

        $dateCheck = $this->parseStartAndEndDates($startsAt, $endsAt);

        if (!empty($dateCheck))
            return;

        return Activity::create([
            'title' => request('title'),
            'description' => request('description'),
            'location' => request('location'),
            'starts_at' => $startsAt,
            'ends_at' => $endsAt
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Activity $activity
     * @return \Illuminate\Http\Response
     */
    public function show(Activity $activity)
    {
        return response()->json($activity);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Activity $activity
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Activity $activity)
    {
        $this->validate($request, self::VALIDATION_RULES);

        $activity->update([
            'title' => request('title'),
            'description' => request('description'),
            'location' => request('location')
            //'starts_at' => request('starts_at'),
            //'ends_at' => request('ends_at')
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Activity $activity
     * @return \Illuminate\Http\Response
     */
    public function destroy(Activity $activity)
    {
        $activity->destroy();
    }

    private function parseStartAndEndDates(string &$start, string &$end) : ?string {
        $dateRegex = '/([a-zA-Z0-9]{4})\-([a-zA-Z0-9]{2})\-([a-zA-Z0-9]{2})/';
        $timeRegex = '/([a-zA-Z0-9]{2})\:([a-zA-Z0-9]{2})/';

        $startingDate = request('startingDate');
        $startingTime = request('startingTime');

        $endDate = request('endDate');
        $endTime = request('endTime');

        $startingMatches = [];
        $endMatches = [];

        if (preg_match($dateRegex, $startingDate) && preg_match($dateRegex, $endDate) &&
            preg_match($timeRegex, $startingTime) && preg_match($timeRegex, $endTime)) {

            $start = sprintf('%s %s:00', $startingDate, $startingTime);
            $end = sprintf('%s %s:00', $endDate, $endTime);
        }
        else
            return 'Invalid date/time format';

        return null;
    }
}
