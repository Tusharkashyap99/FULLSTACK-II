import { memo } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import {
    deletePost,
    startEditing,
} from "../features/posts/postsSlice";

const PLATFORM_ICONS = {
    Twitter: "🐦",
    LinkedIn: "💼",
    Instagram: "📸",
};

function PostCard({ post }) {
    const dispatch = useDispatch();

    const handleEdit = () => {
        dispatch(startEditing(post.id));
    };

    const handleDelete = () => {
        dispatch(deletePost(post.id));
        toast.success("Post deleted successfully.");
    };

    return (
        <div
            className={`post-card ${post.platform.toLowerCase()}`}
        >
            <div className="post-header">

                <h3>
                    {PLATFORM_ICONS[post.platform]} {post.platform}
                </h3>

                <span className="post-date">
                    {new Date(post.createdAt).toLocaleString()}
                </span>

            </div>

            <p className="post-content">
                {post.content}
            </p>

            <div className="post-actions">

                <button
                    className="edit-btn"
                    onClick={handleEdit}
                >
                    ✏ Edit
                </button>

                <button
                    className="delete-btn"
                    onClick={handleDelete}
                >
                    🗑 Delete
                </button>

            </div>
        </div>
    );
}

export default memo(PostCard);