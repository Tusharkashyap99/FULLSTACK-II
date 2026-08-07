import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import {
    savePost,
    updatePost,
    cancelEditing,
    selectEditingPost,
} from "../features/posts/postsSlice";

import CharacterCounter from "./CharacterCounter";
import Spinner from "./Spinner";

const PLATFORM_LIMITS = {
    Twitter: 280,
    LinkedIn: 3000,
    Instagram: 2200,
};

function PostComposer() {
    const dispatch = useDispatch();

    const loading = useSelector((state) => state.posts.loading);
    const editingPost = useSelector(selectEditingPost);

    const [platform, setPlatform] = useState("Twitter");
    const [content, setContent] = useState("");

    useEffect(() => {
        if (editingPost) {
            setPlatform(editingPost.platform);
            setContent(editingPost.content);
        }
    }, [editingPost]);

    const maxLength = PLATFORM_LIMITS[platform];
    const isOverLimit = content.length > maxLength;

    const resetForm = () => {
        setPlatform("Twitter");
        setContent("");
    };

    const handleSubmit = async () => {
        if (!content.trim()) {
            toast.error("Please enter some content.");
            return;
        }

        if (isOverLimit) {
            toast.error("Character limit exceeded.");
            return;
        }

        if (editingPost) {
            dispatch(
                updatePost({
                    id: editingPost.id,
                    platform,
                    content,
                })
            );

            toast.success("Post updated successfully.");

            dispatch(cancelEditing());
            resetForm();
            return;
        }

        await dispatch(
            savePost({
                id: Date.now().toString(),
                platform,
                content,
            })
        );

        toast.success("Post saved successfully.");

        resetForm();
    };

    const handleCancel = () => {
        dispatch(cancelEditing());
        resetForm();
    };

    return (
        <div className="post-composer">

            <h2>
                {editingPost ? "Edit Post" : "Create Post"}
            </h2>

            <label>Platform</label>

            <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
            >
                <option value="Twitter">Twitter</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="Instagram">Instagram</option>
            </select>

            <label>Content</label>

            <textarea
                placeholder="Write your post..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />

            <CharacterCounter
                currentLength={content.length}
                maxLength={maxLength}
            />

            <div className="button-group">

                <button
                    className="save-btn"
                    onClick={handleSubmit}
                    disabled={loading || isOverLimit}
                >
                    {loading ? (
                        <>
                            <Spinner />
                            Saving...
                        </>
                    ) : editingPost ? (
                        "Update Post"
                    ) : (
                        "Save Post"
                    )}
                </button>

                {editingPost && (
                    <button
                        className="cancel-btn"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                )}

            </div>

        </div>
    );
}

export default PostComposer;