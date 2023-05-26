import {configureStore} from '@reduxjs/toolkit';
import todoSlice from '../slice/postSlice';
import postSlice from '../slice/postSlice';

export const store = configureStore({
  reducer: {
    postSlice: postSlice,
  },
});
export type AppDispatch = typeof store.dispatch;
export type StateType = ReturnType<typeof store.getState>;
