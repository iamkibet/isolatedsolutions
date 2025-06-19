<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class WorkController extends Controller
{
    public function index()
    {
        return Inertia::render('Work/Index');
    }

    public function portfolio()
    {
        return Inertia::render('Work/Portfolio');
    }

    public function caseStudies()
    {
        return Inertia::render('Work/CaseStudies');
    }
}
