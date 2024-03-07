import { configureStore } from '@reduxjs/toolkit';
import UserNoteReducer from './UserNoteReducer';

export const store = configureStore({
    reducer: UserNoteReducer
})