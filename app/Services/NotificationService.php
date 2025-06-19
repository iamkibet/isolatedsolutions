<?php

namespace App\Services;

use App\Models\Notification;
use App\Models\Post;
use App\Models\User;

class NotificationService
{
    /**
     * Send post approval notification to user
     */
    public static function sendPostApprovedNotification(Post $post): void
    {
        Notification::create([
            'user_id' => $post->user_id,
            'type' => 'post_approved',
            'title' => 'Post Approved!',
            'message' => "Your post '{$post->title}' has been approved and is now published.",
            'data' => [
                'post_id' => $post->id,
                'post_title' => $post->title,
                'post_slug' => $post->slug,
            ],
            'is_read' => false,
        ]);
    }

    /**
     * Send post rejection notification to user
     */
    public static function sendPostRejectedNotification(Post $post, string $reason = null): void
    {
        Notification::create([
            'user_id' => $post->user_id,
            'type' => 'post_rejected',
            'title' => 'Post Rejected',
            'message' => "Your post '{$post->title}' has been rejected." . ($reason ? " Reason: {$reason}" : ''),
            'data' => [
                'post_id' => $post->id,
                'post_title' => $post->title,
                'post_slug' => $post->slug,
                'rejection_reason' => $reason,
            ],
            'is_read' => false,
        ]);
    }

    /**
     * Mark notification as read
     */
    public static function markAsRead(int $notificationId): bool
    {
        $notification = Notification::find($notificationId);

        if ($notification) {
            $notification->markAsRead();
            return true;
        }

        return false;
    }

    /**
     * Mark all notifications as read for a user
     */
    public static function markAllAsRead(int $userId): void
    {
        Notification::where('user_id', $userId)
            ->where('is_read', false)
            ->update([
                'is_read' => true,
                'read_at' => now(),
            ]);
    }
}
