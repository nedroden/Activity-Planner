<?php

namespace App;

use App\Attachment;
use Illuminate\Database\Eloquent\Model;

class Activity extends Model
{
    protected $fillable = [
        'title', 'description', 'location',
        'starts_at', 'ends_at'
    ];

    public function attachments()
    {
        return $this->hasMany(Attachment::class);
    }
}
