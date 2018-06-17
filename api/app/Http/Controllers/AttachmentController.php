<?php

namespace App\Http\Controllers;

use App\Attachment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class AttachmentController extends Controller
{
    public function show(Attachment $attachment)
    {
        return response()->download(storage_path() . '/app/' . $attachment->uploaded_name, $attachment->filename, ['Content-Type' => 'application/octet-stream']);
    }

    public function destroy(Attachment $attachment)
    {
        if (File::exists($path = storage_path() . '/app/' . $attachment->uploaded_name))
            File::delete($path);

        return $attachment->destroy($attachment->id);
    }
}
