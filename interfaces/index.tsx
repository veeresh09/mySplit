import { SET_USER } from "../components/types";

// interfaces/index.ts
export interface User {
    name: string;
    email: string;
    phoneNumber: string;
    groups: Group[];
    friends: string[];
}

export interface SetUserAction {
    type: typeof SET_USER;
    payload: User;
}


export interface Group {
    id: number;
    name: string;
    description: string;
    creator: string;
}

export interface AddGroupAction {
    type: 'ADD_GROUP';
    payload: Group;
}
