import { deleteSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function InvalidPage() {
    const handleInvalid = async () => {
        'use server';
        await deleteSession();
        redirect('/');
    }
    return (
    <main className="flex justify-center items-center min-h-screen">
        <div className="flex flex-col gap-y-3 py-4 px-6 rounded-md shadow-xl bg-white text-black">
            <p>Invalid Token!</p>
            <button onClick={handleInvalid} className="py-2 w-full rounded-md bg-red-500 cursor-pointer hover:bg-red-400 duration-300 text-white px-4">Delete Session</button>
        </div>
    </main>
    )
}
