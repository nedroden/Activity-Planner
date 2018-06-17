<?php

namespace App;

use App\Activity;
use Illuminate\Database\Eloquent\Model;

class Attachment extends Model
{
    protected $fillable = ['filename', 'uploaded_name', 'activity_id'];

    public function activity()
    {
        return $this->belongsTo(Activity::class);
    }
}