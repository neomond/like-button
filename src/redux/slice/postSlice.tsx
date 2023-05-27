import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

interface PostState {
  posts: Array<any>;
  loading: 'rejected' | 'pending' | 'fulfilled' | null;
  error: any;
}

const initialState: PostState = {
  posts: [],
  loading: null,
  error: null,
};

export const getPosts = createAsyncThunk('get/posts', async () => {
  const response = await axios.get(
    'https://telepatiaapi.onrender.com/api/posts/getAll',
  );
  return response.data.data;
});

export const likePosts = createAsyncThunk(
  'post/likes',
  async (payload: any, {rejectWithValue}) => {
    try {
      const response = await axios.post(
        'https://telepatiaapi.onrender.com/api/posts/likePost',
        payload,
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

const postSlice = createSlice({
  name: 'Posts',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getPosts.pending, state => {
        state.loading = 'pending';
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.loading = 'fulfilled';
        state.posts = action.payload;
      })
      .addCase(getPosts.rejected, state => {
        state.loading = 'rejected';
      })
      .addCase(likePosts.pending, state => {})
      .addCase(likePosts.fulfilled, (state, action) => {
        state.loading = 'fulfilled';
        const likedPosts = action.payload.data;
        const updatedPosts = state.posts.map(post => {
          if (post._id === likedPosts._id) {
            return {...post, likes: likedPosts.likes};
          }
          return post;
        });
        state.posts = updatedPosts;
      })
      .addCase(likePosts.rejected, (state, action) => {
        state.loading = 'rejected';
      });
  },
});

export default postSlice.reducer;

// Explanation
// Let's break down the .addCase(likePosts.fulfilled, (state, action) => { ... }) part in detail:

// .addCase(likePosts.fulfilled, ...) specifies that this case should be executed when the likePosts action is fulfilled.

// (state, action) => { ... } is the callback function that receives the current state and the action object.

// Inside the callback function:

// state.loading = 'fulfilled'; updates the loading property of the state to indicate that the action has been fulfilled. This is a common practice to track the status of an asynchronous action.

// const likedPosts = action.payload.data; extracts the data property from the payload of the action. Assuming the successful response from the server contains the liked post information, likedPosts will hold that data.

// const updatedPosts = state.posts.map(post => { ... }) creates a new array (updatedPosts) by mapping over the state.posts array.

// if (post._id === likedPosts._id) { ... } checks if the post in the loop has the same _id as the likedPosts. This comparison is used to find the specific post that has been liked.

// return {...post, likes: likedPosts.likes}; creates a new post object with the same properties as the original post (...post), but with an updated likes property set to likedPosts.likes. This update ensures that the likes count of the post is updated according to the likedPosts data received from the server.

// return post; is used in case the current post in the loop is not the one that has been liked. It returns the original post object without any changes.

// state.posts = updatedPosts; updates the state.posts array with the updatedPosts array, effectively replacing the previous state with the updated posts data.

// In summary, when the likePosts action is fulfilled, the code updates the loading status, finds the specific post that has been liked using its _id, and updates the likes count of that post in the state.posts array. This ensures that the state is updated with the latest likes count for the liked post.
