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
    ];

    public function index(string $startingOn)
    {
        return response()->json(Activity::with('attachments')
            ->whereDate('starts_at', $startingOn)
            ->orderBy('starts_at', 'asc')
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

        $startingDateCheck = $this->parseStartAndEndDates('starting', $startsAt);
        $endDateCheck = $this->parseStartAndEndDates('end', $endsAt);

        if (!empty($startingDateCheck) || !empty($endDateCheck))
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

        $startsAt = '';
        $endsAt = '';

        $startingDateCheck = $this->parseStartAndEndDates('starting', $startsAt);
        $endDateCheck = $this->parseStartAndEndDates('end', $endsAt);

        if (!empty($startingDateCheck) || !empty($endDateCheck))
            return;

        $activity->update([
            'title' => request('title'),
            'description' => request('description'),
            'location' => request('location'),
            'starts_at' => $startsAt,
            'ends_at' => $endsAt
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
        return $activity->destroy($activity->id);
    }

    private function parseStartAndEndDates(string $prefix, string &$result) : ?string
    {
        $dateRegex = '/([a-zA-Z0-9]{4})\-([a-zA-Z0-9]{2})\-([a-zA-Z0-9]{2})/';
        $timeRegex = '/([a-zA-Z0-9]{2})\:([a-zA-Z0-9]{2})/';

        $dateInput = request($prefix . 'Date');
        $timeInput = request($prefix . 'Time');

        if (preg_match($dateRegex, $dateInput) && preg_match($timeRegex, $timeInput))
            $result = sprintf('%s %s:00', $dateInput, $timeInput);
        else
            return 'Invalid date/time format';

        return null;
    }
}
