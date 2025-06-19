<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class TechnologyController extends Controller
{
    public function mobile()
    {
        return Inertia::render('technologies/mobile');
    }

    public function cloud()
    {
        return Inertia::render('technologies/cloud');
    }

    public function cms()
    {
        return Inertia::render('technologies/cms');
    }

    public function frontend()
    {
        return Inertia::render('technologies/frontend');
    }

    public function backend()
    {
        return Inertia::render('technologies/backend');
    }

    public function fullstack()
    {
        return Inertia::render('technologies/fullstack');
    }
}
