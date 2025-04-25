'use server';

import { verifySession } from "./dal";
import { dummyUser } from "./dummyData";
import { createSession } from "./session";

export const getUser = async () => {
    return dummyUser;
}

export const verifyCo = async () => {
    const user = await getUser();

    return user.role === "co" || user.role === "co_leader";
}