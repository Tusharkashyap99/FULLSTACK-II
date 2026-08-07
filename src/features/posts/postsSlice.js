import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter,
    createSelector,
} from "@reduxjs/toolkit";
import { savePostApi } from "../../utils/fakeApi";

const postsAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt),
});

export const savePost = createAsyncThunk(
    "posts/savePost",
    async (post) => {
        const savedPost = await savePostApi(post);
        return savedPost;
    }
);

const initialState = postsAdapter.getInitialState({
    loading: false,
    error: null,
    editingPostId: null,
});

const postsSlice = createSlice({
    name: "posts",
    initialState,

    reducers: {
        deletePost: (state, action) => {
            postsAdapter.removeOne(state, action.payload);
        },

        startEditing: (state, action) => {
            state.editingPostId = action.payload;
        },

        cancelEditing: (state) => {
            state.editingPostId = null;
        },

        updatePost: (state, action) => {
            postsAdapter.updateOne(state, {
                id: action.payload.id,
                changes: {
                    platform: action.payload.platform,
                    content: action.payload.content,
                },
            });

            state.editingPostId = null;
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(savePost.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(savePost.fulfilled, (state, action) => {
                state.loading = false;

                postsAdapter.addOne(state, {
                    ...action.payload,
                    createdAt: new Date().toISOString(),
                });
            })

            .addCase(savePost.rejected, (state) => {
                state.loading = false;
                state.error = "Unable to save post.";
            });
    },
});

export const {
    deletePost,
    startEditing,
    cancelEditing,
    updatePost,
} = postsSlice.actions;

export default postsSlice.reducer;

export const {
    selectAll: selectAllPosts,
    selectById: selectPostById,
    selectIds: selectPostIds,
} = postsAdapter.getSelectors((state) => state.posts);

export const selectEditingPostId = (state) =>
    state.posts.editingPostId;

export const selectEditingPost = createSelector(
    [selectEditingPostId, selectAllPosts],
    (editingPostId, posts) =>
        posts.find((post) => post.id === editingPostId) || null
);