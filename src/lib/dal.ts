import 'server-only';

import { cookies } from 'next/headers';
import { cache } from 'react';
import { decrypt } from './session';
import { User } from './type';

const baseUrl = process.env.BASE_URL;

export const verifySession = cache(async () => {
    const cookie = (await cookies()).get('session')?.value;
    const session = await decrypt(cookie);

    if (!session?.token) {
        return null;
    }

    return { token: session.token }
});

export const getUser = cache(async () => {
    const session = await verifySession();

    if (!session) return null;

    const { token } = session;

    try {
        const response = await fetch(`${baseUrl}/user`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (response.status === 200) {
            const user = await response.json();
            return user as User;
        } else {
            console.log('failed fetching user data');
            return null;
        }
    } catch (err) {
        console.log(err);
    }
})