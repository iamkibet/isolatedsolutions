<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use App\Mail\ContactFormMail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Config;

class ContactController extends Controller
{
    public function show()
    {
        return Inertia::render('contact-us');
    }

    public function store(Request $request)
    {
        try {
            // Log mail configuration (excluding sensitive data)
            Log::info('Mail configuration', [
                'driver' => config('mail.default'),
                'host' => config('mail.mailers.smtp.host'),
                'port' => config('mail.mailers.smtp.port'),
                'encryption' => config('mail.mailers.smtp.encryption'),
                'from_address' => config('mail.from.address'),
                'from_name' => config('mail.from.name'),
            ]);

            // Validate the request
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'email' => 'required|email|max:255',
                'phone' => 'nullable|string|max:20',
                'subject' => 'required|string|max:255',
                'message' => 'required|string',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            $validated = $validator->validated();

            // Log the attempt to send email
            Log::info('Attempting to send contact form email', [
                'to' => config('mail.from.address'),
                'from' => $validated['email'],
                'subject' => $validated['subject']
            ]);

            // Send email
            Mail::to(config('mail.from.address'))->send(new ContactFormMail($validated));

            // Log successful email send
            Log::info('Contact form email sent successfully');

            return response()->json([
                'message' => 'Thank you for your message. We will get back to you soon!'
            ], 200);
        } catch (\Exception $e) {
            // Log the specific error with more details
            Log::error('Failed to send contact form email', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'request_data' => $request->all(),
                'mail_config' => [
                    'driver' => config('mail.default'),
                    'host' => config('mail.mailers.smtp.host'),
                    'port' => config('mail.mailers.smtp.port'),
                    'encryption' => config('mail.mailers.smtp.encryption'),
                    'from_address' => config('mail.from.address'),
                    'from_name' => config('mail.from.name'),
                ]
            ]);

            return response()->json([
                'message' => 'Error: ' . $e->getMessage()
            ], 500);
        }
    }
}
