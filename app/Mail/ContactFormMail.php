<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class ContactFormMail extends Mailable
{
    use Queueable, SerializesModels;

    public $data;

    public function __construct(array $data)
    {
        $this->data = $data;
        Log::info('ContactFormMail constructed with data', ['data' => $data]);
    }

    public function envelope(): Envelope
    {
        Log::info('Building envelope for ContactFormMail', [
            'subject' => "New Contact Form Submission: {$this->data['subject']}",
            'replyTo' => $this->data['email']
        ]);

        return new Envelope(
            subject: "New Contact Form Submission: {$this->data['subject']}",
            replyTo: $this->data['email'],
        );
    }

    public function content(): Content
    {
        Log::info('Building content for ContactFormMail');

        return new Content(
            view: 'emails.contact-form',
            with: [
                'data' => $this->data,
            ],
        );
    }
}
