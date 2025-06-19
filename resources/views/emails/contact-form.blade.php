<!DOCTYPE html>
<html>

<head>
    <title>New Contact Form Submission</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }

        .header {
            background-color: #f8f9fa;
            padding: 20px;
            border-radius: 5px;
            margin-bottom: 20px;
        }

        .content {
            background-color: #ffffff;
            padding: 20px;
            border-radius: 5px;
            border: 1px solid #dee2e6;
        }

        .field {
            margin-bottom: 15px;
        }

        .label {
            font-weight: bold;
            color: #495057;
        }

        .value {
            color: #212529;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <h2>New Contact Form Submission</h2>
            <p>A new message has been submitted through the contact form.</p>
        </div>

        <div class="content">
            <div class="field">
                <div class="label">Name:</div>
                <div class="value">{{ $data['name'] }}</div>
            </div>

            <div class="field">
                <div class="label">Email:</div>
                <div class="value">{{ $data['email'] }}</div>
            </div>

            @if (isset($data['phone']))
                <div class="field">
                    <div class="label">Phone:</div>
                    <div class="value">{{ $data['phone'] }}</div>
                </div>
            @endif

            <div class="field">
                <div class="label">Subject:</div>
                <div class="value">{{ $data['subject'] }}</div>
            </div>

            <div class="field">
                <div class="label">Message:</div>
                <div class="value">{{ $data['message'] }}</div>
            </div>
        </div>
    </div>
</body>

</html>
