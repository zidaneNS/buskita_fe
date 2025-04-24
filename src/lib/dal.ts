import { cookies } from 'next/headers';
import { cache } from 'react';
import 'server-only';
import { decrypt } from './session';

export const verifySession = cache(async () => {
    const cookie = (await cookies()).get('session')?.value;
    const session = await decrypt(cookie);

    console.log(session?.id);
});