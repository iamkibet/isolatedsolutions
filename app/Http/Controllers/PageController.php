<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class PageController extends Controller
{
    public function welcome()
    {
        return Inertia::render('welcome');
    }

    public function about()
    {
        return Inertia::render('about');
    }

    // public function team()
    // {
    //     return Inertia::render('team');
    // }

    // public function careers()
    // {
    //     return Inertia::render('careers');
    // }
}
