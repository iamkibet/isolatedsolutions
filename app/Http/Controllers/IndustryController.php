<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class IndustryController extends Controller
{
    public function ecommerce()
    {
        return Inertia::render('industries/ecommerce');
    }

    public function saas()
    {
        return Inertia::render('industries/saas');
    }

    public function fintech()
    {
        return Inertia::render('industries/fintech');
    }

    public function edtech()
    {
        return Inertia::render('industries/edtech');
    }

    public function wellness()
    {
        return Inertia::render('industries/wellness');
    }

    public function agritech()
    {
        return Inertia::render('industries/agritech');
    }

    public function insurance()
    {
        return Inertia::render('industries/insurance');
    }

    public function government()
    {
        return Inertia::render('industries/government');
    }
}
