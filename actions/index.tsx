// actions/index.ts
import { SET_USER } from "../components/types";
import { SetUserAction, User } from '../interfaces';

export const setUser = (user: User): SetUserAction => ({
    type: SET_USER,
    payload: user
});
