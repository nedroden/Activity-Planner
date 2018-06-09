<?php

namespace App;

use App\Activity;
use Illuminate\Database\Eloquent\Model;

class Attachment extends Model
{
    public function activity()
    {
        return $this->belongsTo(Activity::class);
    }
}