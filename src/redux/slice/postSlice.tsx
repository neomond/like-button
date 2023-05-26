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
    console.log('geldim');
    try {
      console.log('payload', payload);
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
        console.log('geldim');

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
        console.log('red', action.payload);
      });
  },
});

export default postSlice.reducer;
