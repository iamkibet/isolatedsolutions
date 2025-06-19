<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class ServiceController extends Controller
{
    public function webDevelopment()
    {
        return Inertia::render('services/web-development');
    }

    public function appDevelopment()
    {
        return Inertia::render('services/app-development');
    }

    public function ecommerce()
    {
        return Inertia::render('services/ecommerce');
    }

    public function consulting()
    {
        return Inertia::render('services/consulting');
    }

    public function softwareTesting()
    {
        return Inertia::render('services/software-testing');
    }

    public function devops()
    {
        return Inertia::render('services/devops');
    }

    public function cloudIntegration()
    {
        return Inertia::render('services/cloud-integration');
    }
}
