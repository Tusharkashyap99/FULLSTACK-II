import { useMemo } from "react";
import { useSelector } from "react-redux";

import {
    selectAllPosts,
} from "../features/posts/postsSlice";

import PostCard from "./PostCard";

function PostList() {
    const posts = useSelector(selectAllPosts);

    const renderedPosts = useMemo(() => {
        return posts.map((post) => (
            <PostCard
                key={post.id}
                post={post}
            />
        ));
    }, [posts]);

    if (posts.length === 0) {
        return (
            <div className="empty-state">
                <div className="empty-icon">📭</div>

                <h2>No Posts Yet</h2>

                <p>Create your first social media post.</p>
            </div>
        );
    }

    return (
        <div className="post-list">
            <h2>Saved Posts</h2>

            {renderedPosts}
        </div>
    );
}

export default PostList;