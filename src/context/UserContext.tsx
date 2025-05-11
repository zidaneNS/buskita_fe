'use client';

import { User } from "@/lib/type";
import React, { createContext, Dispatch, SetStateAction, useState } from "react";

type UserContextType = {
    users: User[],
    setUsers: Dispatch<SetStateAction<User[]>>
}

const initContext: UserContextType = {
    users: [],
    setUsers: () => {}
}

const userContext = createContext<UserContextType>(initContext);

export default userContext;

export function UserProvider({ children, initUsers }: { children: React.ReactNode, initUsers: User[] }) {
    const [users, setUsers] = useState<User[]>(initUsers);

    return <userContext.Provider value={{ users, setUsers }}>{children}</userContext.Provider>
}