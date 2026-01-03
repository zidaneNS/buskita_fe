import 'server-only';

import { cookies } from 'next/headers';
import { cache } from 'react';
import { decrypt } from './session';
import { DefaultResponse, User } from './type';

const baseUrl = process.env.BASE_URL;

export const verifySession = cache(async () => {
    const cookie = (await cookies()).get('session')?.value;
    const session = await decrypt(cookie);

    if (!session?.token) {
        return null;
    }

    return { token: session.token }
});

export const getUser = (async () => {
    const session = await verifySession();

    if (!session) return null;

    const { token } = session;

    try {
        const response = await fetch(`${baseUrl}/users/info`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        const result = await response.json() as DefaultResponse<User>;
        
        if (result.payloads?.data) {
            return result.payloads.data;
        } else {
            console.log('failed fetching user data');
            return null;
        }
    } catch (err) {
        console.log(err);
    }
})