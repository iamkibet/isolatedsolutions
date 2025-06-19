<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Category;
use App\Models\Tag;
use App\Models\Post;
use App\Models\Comment;
use Illuminate\Support\Str;

class TestDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create admin user if not exists
        $admin = User::firstOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Admin User',
                'password' => bcrypt('password'),
                'role' => 'A'
            ]
        );

        // Create regular user if not exists
        $user = User::firstOrCreate(
            ['email' => 'user@example.com'],
            [
                'name' => 'Regular User',
                'password' => bcrypt('password'),
                'role' => 'U'
            ]
        );

        // Create category
        $category = Category::firstOrCreate(
            ['name' => 'Technology'],
            ['slug' => Str::slug('Technology')]
        );

        // Create tags
        $tag1 = Tag::firstOrCreate(
            ['name' => 'Laravel'],
            ['slug' => Str::slug('Laravel')]
        );
        $tag2 = Tag::firstOrCreate(
            ['name' => 'React'],
            ['slug' => Str::slug('React')]
        );

        // Create post
        $post = Post::firstOrCreate(
            ['title' => 'Test Post for Comments'],
            [
                'slug' => 'test-post-for-comments',
                'content' => '# Test Post Content

This is a test post to verify that the comments functionality works properly.

## Features to Test

- Adding comments
- Replying to comments
- Admin approval/rejection
- Comment deletion

## Code Example

```php
// This is a PHP code block
echo "Hello, Comments!";
```

Let\'s see how this works!',
                'excerpt' => 'A test post to verify comments functionality',
                'category_id' => $category->id,
                'user_id' => $admin->id,
                'is_published' => true,
                'views' => 0
            ]
        );

        // Attach tags to post
        $post->tags()->sync([$tag1->id, $tag2->id]);

        // Create some test comments
        $comment1 = Comment::firstOrCreate(
            [
                'comment' => 'This is a great test post! I love the comments functionality.',
                'user_id' => $user->id,
                'post_id' => $post->id
            ],
            [
                'is_approved' => true
            ]
        );

        $comment2 = Comment::firstOrCreate(
            [
                'comment' => 'I agree! The comment system looks really well implemented.',
                'user_id' => $admin->id,
                'post_id' => $post->id
            ],
            [
                'is_approved' => true
            ]
        );

        // Create a reply to the first comment
        $reply = Comment::firstOrCreate(
            [
                'comment' => 'Thanks for the feedback! We worked hard on this feature.',
                'user_id' => $admin->id,
                'post_id' => $post->id,
                'parent_id' => $comment1->id
            ],
            [
                'is_approved' => true
            ]
        );

        // Create a pending comment for testing approval
        $pendingComment = Comment::firstOrCreate(
            [
                'comment' => 'This comment needs approval from an admin.',
                'user_id' => $user->id,
                'post_id' => $post->id
            ],
            [
                'is_approved' => false
            ]
        );

        $this->command->info('Test data created successfully!');
        $this->command->info('Admin user: admin@example.com / password');
        $this->command->info('Regular user: user@example.com / password');
        $this->command->info('Test post: /posts/test-post-for-comments');
    }
}
