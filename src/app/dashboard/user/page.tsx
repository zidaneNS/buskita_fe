import { UserProvider } from "@/context/UserContext";
import { getAllUsers } from "@/lib/action";
import { getUser } from "@/lib/dal";
import UserFilterSection from "@/ui/UserFilterSection";
import UserHeadSection from "@/ui/UserHeadSection";
import UserListSection from "@/ui/UserListSection";

export default async function Page() {
    const initUsers = await getAllUsers() || [];
    const user = await getUser();
    return (
        <main className="h-screen px-8 py-6 md:px-10 md:py-8 w-full flex flex-col gap-y-4">
            <UserProvider initUsers={initUsers}>
                <UserHeadSection user={user!} />
                <UserFilterSection initUsers={initUsers} />
                <UserListSection />
            </UserProvider>
        </main>
    )
}