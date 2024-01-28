// features/user/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User,Group } from '../interfaces';

// Define the initial state using the `User` type
const initialState: User = {
    id:'',
    name: '',
    email: '',
    phoneNumber: '',
    groups: [],
    friends: []
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // Automatically generates an action creator
        setUser: (state, action: PayloadAction<User>) => {
            return { ...state, ...action.payload };
        },
        addGroup: (state, action: PayloadAction<Group>) => {
            state.groups.push(action.payload);
        },
        logoutUser: (state) => {
            return { ...initialState }; // Reset to initial state
        },
    }
});

// Export the action creator
export const { setUser, addGroup, logoutUser } = userSlice.actions;

// Export the reducer
export default userSlice.reducer;
