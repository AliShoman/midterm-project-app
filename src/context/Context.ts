import React from "react";
import { User } from "../models/User";

export const AuthContext = React.createContext({
    user: null as User | null,
    updateUserData: (data: User | any) => {},
});

