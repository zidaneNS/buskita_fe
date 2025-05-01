import { getUser } from "@/lib/dal"
import ProfileSection from "@/ui/ProfileSection";

export default async function Page() {
    const user = await getUser();
    return (
        <main className="px-32 w-full h-screen py-10 overflow-y-auto scrollbar-thin">
            <ProfileSection user={user!} />
        </main>
    )
}