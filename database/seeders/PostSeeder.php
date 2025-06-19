<?php

namespace Database\Seeders;

use App\Models\Post;
use App\Models\User;
use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class PostSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::first();
        $categories = [
            'Career Development' => 'Insights and guidance for advancing your tech career',
            'Best Practices' => 'Industry standards and recommended approaches',
            'Productivity' => 'Tips and tools to boost your development efficiency',
            'Emerging Tech' => 'Latest trends and innovations in technology',
            'Code Quality' => 'Writing better, more maintainable code',
        ];

        // Create categories
        foreach ($categories as $name => $description) {
            Category::create([
                'name' => $name,
                'slug' => Str::slug($name),
                'description' => $description,
            ]);
        }

        $posts = [
            [
                'title' => '10 Essential Skills Every Modern Software Engineer Needs',
                'excerpt' => 'Discover the crucial skills that will set you apart in today\'s competitive tech landscape.',
                'content' => 'In today\'s rapidly evolving tech landscape, being a successful software engineer requires more than just coding skills. The modern developer needs to be a well-rounded professional who can navigate complex technical challenges while maintaining strong communication and collaboration abilities.

First and foremost, mastering version control systems like Git is non-negotiable. Understanding branching strategies, merge conflicts, and collaborative workflows is essential for any team environment. Additionally, proficiency in containerization tools like Docker has become increasingly important for ensuring consistent development and deployment environments.

Beyond technical skills, soft skills play a crucial role. Effective communication, both written and verbal, is vital for collaborating with team members, stakeholders, and clients. Problem-solving abilities and critical thinking help developers tackle complex challenges efficiently.

Understanding cloud platforms (AWS, Azure, or GCP) and their services is another crucial skill. As more applications move to the cloud, developers need to be comfortable with cloud-native development practices and infrastructure as code.

Finally, continuous learning and adaptability are perhaps the most important skills of all. The tech industry evolves rapidly, and successful developers must stay current with new technologies, frameworks, and best practices.',
                'category' => 'Career Development',
            ],
            [
                'title' => 'Common Pitfalls in React Development and How to Avoid Them',
                'excerpt' => 'Learn about the most frequent mistakes React developers make and how to write more maintainable code.',
                'content' => 'React has revolutionized frontend development, but even experienced developers can fall into common traps. Understanding these pitfalls is crucial for writing better, more maintainable code.

One of the most common issues is prop drilling, where props are passed through multiple levels of components. This can make code harder to maintain and understand. Solutions include using Context API, Redux, or other state management solutions for global state.

Another frequent mistake is not properly handling side effects in useEffect. Developers often forget to include all dependencies in the dependency array or fail to clean up effects properly. This can lead to memory leaks and unexpected behavior.

Performance issues often arise from unnecessary re-renders. Using React.memo, useMemo, and useCallback appropriately can help optimize performance, but they should be used judiciously.

State management is another area where developers commonly struggle. Choosing between local state, Context, and external state management libraries depends on the specific use case. Over-engineering with complex state management solutions for simple applications is a common mistake.

Finally, not following React\'s best practices for component composition and not properly handling error boundaries can lead to brittle applications. Understanding these concepts and implementing them correctly is crucial for building robust React applications.',
                'category' => 'Best Practices',
            ],
            [
                'title' => 'Boosting Developer Productivity: Tools and Techniques',
                'excerpt' => 'Discover powerful tools and techniques that can significantly improve your development workflow.',
                'content' => 'Developer productivity isn\'t just about writing code faster—it\'s about working smarter and more efficiently. Here are some essential tools and techniques that can transform your development workflow.

First, invest in a good IDE or code editor with powerful features. VS Code, for example, offers extensive customization options, integrated debugging, and a vast ecosystem of extensions. Learning keyboard shortcuts and customizing your environment can save hours of work.

Version control is crucial, but it\'s not just about Git. Tools like GitHub Copilot can help with code completion and suggestions, while automated testing tools like Jest and Cypress ensure code quality without manual intervention.

Documentation is often overlooked but is crucial for productivity. Tools like Swagger for API documentation and Storybook for component documentation can save time in the long run.

Automation is key to productivity. CI/CD pipelines, automated testing, and deployment scripts reduce manual work and potential errors. Tools like GitHub Actions or GitLab CI can automate many routine tasks.

Finally, don\'t underestimate the power of a good development environment setup. Using Docker for consistent environments, implementing proper logging and monitoring, and setting up efficient debugging tools can significantly reduce development time and frustration.',
                'category' => 'Productivity',
            ],
            [
                'title' => 'The Rise of AI in Software Development: What Developers Need to Know',
                'excerpt' => 'Explore how artificial intelligence is transforming the software development landscape.',
                'content' => 'Artificial Intelligence is revolutionizing software development in ways we couldn\'t have imagined a few years ago. From code generation to testing and debugging, AI tools are becoming an integral part of the development process.

One of the most significant developments is the rise of AI-powered code assistants like GitHub Copilot and Amazon CodeWhisperer. These tools can suggest code completions, generate entire functions, and even help with documentation. While they\'re not perfect, they can significantly speed up development and help developers learn new patterns and best practices.

AI is also transforming testing and quality assurance. Automated testing tools powered by AI can generate test cases, identify potential bugs, and even suggest fixes. This not only improves code quality but also frees up developers to focus on more creative aspects of development.

In the realm of DevOps, AI is helping with predictive analytics, automated scaling, and intelligent monitoring. Systems can now predict potential issues before they occur and automatically adjust resources as needed.

However, it\'s important to note that AI is a tool, not a replacement for developers. Understanding the underlying principles of software development, algorithms, and data structures remains crucial. Developers need to learn how to effectively use AI tools while maintaining their core skills and knowledge.',
                'category' => 'Emerging Tech',
            ],
            [
                'title' => 'Writing Clean Code: Principles Every Developer Should Follow',
                'excerpt' => 'Learn the fundamental principles of writing clean, maintainable code that stands the test of time.',
                'content' => 'Clean code is the foundation of maintainable and scalable software. It\'s not just about making code work—it\'s about making it readable, understandable, and easy to modify.

The first principle is meaningful naming. Variables, functions, and classes should have clear, descriptive names that reveal their intent. Avoid abbreviations and be consistent with naming conventions.

Functions should be small and do one thing well. The Single Responsibility Principle applies not just to classes but to functions as well. A function should have a clear purpose and be easy to understand at a glance.

Comments are often a sign of unclear code. Instead of relying on comments, write self-documenting code. Use clear variable names, break complex logic into smaller functions, and structure your code logically.

Error handling is crucial for clean code. Use proper exception handling, validate inputs, and provide meaningful error messages. Don\'t ignore errors or use empty catch blocks.

Testing is an integral part of clean code. Write unit tests that are readable and maintainable. Follow the Arrange-Act-Assert pattern and make sure your tests are independent and repeatable.

Finally, remember that clean code is a continuous process. Regular refactoring, code reviews, and learning from others are essential for maintaining code quality over time.',
                'category' => 'Code Quality',
            ],
        ];

        // Add more posts to reach 20
        $additionalPosts = [
            [
                'title' => 'Mastering Git: Advanced Techniques for Team Collaboration',
                'excerpt' => 'Learn advanced Git techniques that will make you a more effective team player.',
                'content' => 'Git is more than just a version control system—it\'s a powerful tool for collaboration and code management. Understanding advanced Git techniques can significantly improve your workflow and team collaboration.

One of the most important concepts is branching strategy. Whether you use Git Flow, GitHub Flow, or Trunk-Based Development, having a clear branching strategy helps maintain a clean and organized repository.

Rebasing is another powerful technique that helps maintain a linear, clean history. However, it should be used carefully, especially when working with shared branches. Understanding when to use merge vs. rebase is crucial.

Git hooks can automate various tasks in your workflow. From running tests before commits to enforcing coding standards, hooks can help maintain code quality and consistency.

Advanced features like git bisect for finding bugs, git stash for temporary changes, and git worktree for managing multiple working directories can save time and improve productivity.

Finally, understanding Git internals—how commits, trees, and blobs work—can help you better understand and use Git\'s features effectively.',
                'category' => 'Best Practices',
            ],
            // Add more posts here...
        ];

        $posts = array_merge($posts, $additionalPosts);

        foreach ($posts as $post) {
            $category = Category::where('name', $post['category'])->first();

            Post::create([
                'title' => $post['title'],
                'slug' => Str::slug($post['title']),
                'excerpt' => $post['excerpt'],
                'content' => $post['content'],
                'category_id' => $category->id,
                'user_id' => $user->id,
                'is_published' => true,
                'views' => rand(100, 1000),
            ]);
        }
    }
}
