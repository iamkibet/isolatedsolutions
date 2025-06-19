<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        return Inertia::render('products/index');
    }

    public function show($product)
    {
        return Inertia::render('products/show', [
            'product' => $product
        ]);
    }
}
