import { SET_USER } from "../components/types";

// interfaces/index.ts
export interface User {
    name: string;
    email: string;
    phoneNumber: string;
    groups: string[];
    friends: string[];
}

export interface SetUserAction {
    type: typeof SET_USER;
    payload: User;
}
