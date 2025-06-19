<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\Settings\ProfileController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\TechnologyController;
use App\Http\Controllers\IndustryController;
use App\Http\Controllers\WorkController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\CommentController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Auth;

// Main Pages
Route::get('/', [PageController::class, 'welcome'])->name('home');

Route::get('/team', [PageController::class, 'team'])->name('team');
Route::get('/careers', [PageController::class, 'careers'])->name('careers');
Route::get('/shop', fn() => Inertia::render('products/index'))->name('products.index');
Route::get('/about-us', fn() => Inertia::render('about-us'))->name('about-us');

// Post routes
Route::prefix('posts')->group(function () {
    Route::get('/', [PostController::class, 'index'])->name('posts.index');
    Route::get('/{post:slug}', [PostController::class, 'show'])->name('posts.show');
    Route::post('/{post:id}/thumbs-up', [PostController::class, 'thumbsUp'])->name('posts.thumbsUp')->whereNumber('post');
    Route::post('/{post:id}/thumbs-down', [PostController::class, 'thumbsDown'])->name('posts.thumbsDown')->whereNumber('post');
    Route::post('/{post}/increment-views', [PostController::class, 'incrementViews'])->name('posts.incrementViews')->whereNumber('post');

    // Comment routes
    Route::post('/{post}/comments', [CommentController::class, 'store'])->name('posts.comments.store')->middleware('auth')->whereNumber('post');
    Route::delete('/{post}/comments/{comment}', [CommentController::class, 'destroy'])->name('posts.comments.destroy')->middleware('auth')->whereNumber('post');
});

// Services Routes
Route::prefix('services')->name('services.')->group(function () {
    Route::get('/', fn() => Inertia::render('Services/Index'))->name('index');
    Route::get('/web-development', fn() => Inertia::render('Services/WebDevelopment'))->name('web-development');
    Route::get('/app-development', fn() => Inertia::render('Services/AppDevelopment'))->name('app-development');
    Route::get('/ecommerce', fn() => Inertia::render('Services/Ecommerce'))->name('ecommerce');
    Route::get('/consulting', fn() => Inertia::render('Services/Consulting'))->name('consulting');
    Route::get('/software-testing', fn() => Inertia::render('Services/SoftwareTesting'))->name('software-testing');
    Route::get('/devops', fn() => Inertia::render('Services/DevOps'))->name('devops');
    Route::get('/cloud-integration', fn() => Inertia::render('Services/CloudIntegration'))->name('cloud-integration');
});

// Technologies Routes
Route::prefix('technologies')->name('technologies.')->group(function () {
    Route::get('/mobile', fn() => Inertia::render('Technologies/Mobile'))->name('mobile');
    Route::get('/cloud', fn() => Inertia::render('Technologies/Cloud'))->name('cloud');
    Route::get('/cms', fn() => Inertia::render('Technologies/CMS'))->name('cms');
    Route::get('/frontend', fn() => Inertia::render('Technologies/Frontend'))->name('frontend');
    Route::get('/backend', fn() => Inertia::render('Technologies/Backend'))->name('backend');
    Route::get('/fullstack', fn() => Inertia::render('Technologies/Fullstack'))->name('fullstack');
});

// Industries Routes
Route::prefix('industries')->name('industries.')->group(function () {
    Route::get('/ecommerce', fn() => Inertia::render('Industries/Ecommerce'))->name('ecommerce');
    Route::get('/saas', fn() => Inertia::render('Industries/Saas'))->name('saas');
    Route::get('/fintech', fn() => Inertia::render('Industries/Fintech'))->name('fintech');
    Route::get('/edtech', fn() => Inertia::render('Industries/Edtech'))->name('edtech');
    Route::get('/wellness', fn() => Inertia::render('Industries/Wellness'))->name('wellness');
    Route::get('/agritech', fn() => Inertia::render('Industries/Agritech'))->name('agritech');
    Route::get('/insurance', fn() => Inertia::render('Industries/Insurance'))->name('insurance');
    Route::get('/government', fn() => Inertia::render('Industries/Government'))->name('government');
});

// Work Routes
Route::prefix('work')->name('work.')->group(function () {
    Route::get('/', [WorkController::class, 'index'])->name('index');
    Route::get('/portfolio', [WorkController::class, 'portfolio'])->name('portfolio');
    Route::get('/case-studies', [WorkController::class, 'caseStudies'])->name('case-studies');
});

// Contact Routes
Route::controller(ContactController::class)->group(function () {
    Route::get('/contact', 'show')->name('contact');
    Route::post('/contact', 'store')->name('contact.store');
});

// Profile Routes (if needed)
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// User Dashboard routes (for normal users)
Route::middleware(['auth'])->prefix('dashboard')->name('dashboard.')->group(function () {
    // Main dashboard - handle role-based redirect
    Route::get('/', function () {
        if (Auth::user()->role === 'A') {
            return redirect()->route('admin.dashboard');
        }
        return app(App\Http\Controllers\UserDashboardController::class)->index();
    })->name('index');

    // User posts management
    Route::get('/posts', [App\Http\Controllers\UserDashboardController::class, 'posts'])->name('posts.index');
    Route::get('/posts/create', [App\Http\Controllers\UserDashboardController::class, 'createPost'])->name('posts.create');
    Route::post('/posts', [App\Http\Controllers\UserDashboardController::class, 'storePost'])->name('posts.store');
    Route::get('/posts/{post:id}/edit', [App\Http\Controllers\UserDashboardController::class, 'editPost'])->name('posts.edit');
    Route::patch('/posts/{post:id}', [App\Http\Controllers\UserDashboardController::class, 'updatePost'])->name('posts.update');
    Route::delete('/posts/{post:id}', [App\Http\Controllers\UserDashboardController::class, 'destroyPost'])->name('posts.destroy');

    // Liked posts/photos
    Route::get('/liked-posts', [App\Http\Controllers\UserDashboardController::class, 'likedPosts'])->name('liked-posts');

    // Analytics
    Route::get('/analytics', [App\Http\Controllers\UserDashboardController::class, 'analytics'])->name('analytics');

    // Profile settings
    Route::get('/profile', [App\Http\Controllers\UserDashboardController::class, 'profile'])->name('profile');

    // Notifications
    Route::get('/notifications', [App\Http\Controllers\UserDashboardController::class, 'notifications'])->name('notifications');
    Route::post('/notifications/mark-read', [App\Http\Controllers\UserDashboardController::class, 'markNotificationAsRead'])->name('notifications.mark-read');
    Route::post('/notifications/mark-all-read', [App\Http\Controllers\UserDashboardController::class, 'markAllNotificationsAsRead'])->name('notifications.mark-all-read');
});

// Admin routes
Route::middleware(['auth', 'is_admin'])->prefix('admin')->name('admin.')->group(function () {
    // Dashboard
    Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('dashboard');

    // Posts management
    Route::get('/posts', [AdminController::class, 'posts'])->name('posts.index');
    Route::get('/posts/pending', [AdminController::class, 'pendingPosts'])->name('posts.pending');
    Route::patch('/posts/{post:id}/approve', [AdminController::class, 'approvePost'])->name('posts.approve');
    Route::patch('/posts/{post:id}/reject', [AdminController::class, 'rejectPost'])->name('posts.reject');
    Route::get('/posts/create', [PostController::class, 'create'])->name('posts.create');
    Route::post('/posts', [PostController::class, 'store'])->name('posts.store');
    Route::get('/posts/{post:id}/edit', [PostController::class, 'edit'])->name('posts.edit');
    Route::patch('/posts/{post:id}', [PostController::class, 'update'])->name('posts.update');
    Route::patch('/posts/{post:id}/publish', [PostController::class, 'publish'])->name('posts.publish');
    Route::delete('/posts/{post:id}', [PostController::class, 'destroy'])->name('posts.destroy');

    // Categories management
    Route::get('/categories', [CategoryController::class, 'index'])->name('categories.index');
    Route::get('/categories/create', [CategoryController::class, 'create'])->name('categories.create');
    Route::post('/categories', [CategoryController::class, 'store'])->name('categories.store');
    Route::get('/categories/{category}/edit', [CategoryController::class, 'edit'])->name('categories.edit');
    Route::patch('/categories/{category}', [CategoryController::class, 'update'])->name('categories.update');
    Route::delete('/categories/{category}', [CategoryController::class, 'destroy'])->name('categories.destroy');

    // Tags management
    Route::get('/tags', [TagController::class, 'index'])->name('tags.index');
    Route::get('/tags/create', [TagController::class, 'create'])->name('tags.create');
    Route::post('/tags', [TagController::class, 'store'])->name('tags.store');
    Route::get('/tags/{tag}/edit', [TagController::class, 'edit'])->name('tags.edit');
    Route::patch('/tags/{tag}', [TagController::class, 'update'])->name('tags.update');
    Route::delete('/tags/{tag}', [TagController::class, 'destroy'])->name('tags.destroy');

    // Comments management
    Route::get('/comments', [CommentController::class, 'index'])->name('comments.index');
    Route::patch('/comments/{comment}/approve', [CommentController::class, 'approve'])->name('comments.approve');
    Route::patch('/comments/{comment}/reject', [CommentController::class, 'reject'])->name('comments.reject');
    Route::delete('/comments/{comment}', [CommentController::class, 'adminDestroy'])->name('comments.destroy');

    // Users management
    Route::get('/users', [AdminController::class, 'users'])->name('users.index');
    Route::get('/users/{user}', [AdminController::class, 'showUser'])->name('users.show');
    Route::patch('/users/{user}/role', [AdminController::class, 'updateUserRole'])->name('users.update-role');
    Route::delete('/users/{user}', [AdminController::class, 'deleteUser'])->name('users.destroy');

    // Analytics
    Route::get('/analytics', [AdminController::class, 'analytics'])->name('analytics');
});

// Public category routes
Route::get('/categories/{category:slug}', [CategoryController::class, 'show'])->name('categories.show');

// Test route for mail configuration
Route::get('/test-mail', function () {
    try {
        Mail::raw('Test email from Laravel', function ($msg) {
            $msg->to('denniskibetdev@gmail.com')
                ->subject('Test Email');
        });
        return 'Mail sent successfully!';
    } catch (\Exception $e) {
        return 'Mail error: ' . $e->getMessage();
    }
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
