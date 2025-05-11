import { UserProvider } from "@/context/UserContext";
import { getAllUsers } from "@/lib/action";
import UserFilterSection from "@/ui/UserFilterSection";
import UserListSection from "@/ui/UserListSection";
import { IoMdAdd } from "react-icons/io";

export default async function Page() {
    const initUsers = await getAllUsers() || [];
    return (
        <main className="h-screen px-8 py-6 md:px-10 md:py-8 w-full flex flex-col gap-y-4">
            <UserProvider initUsers={initUsers}>
                <section className="flex flex-col md:flex-row md:justify-between gap-y-3 w-full">
                    <h1 className="text-xl md:text-3xl font-bold">Users</h1>
                    <button className="py-3 px-4 rounded-md bg-midnight-purple hover:bg-white hover:text-black cursor-pointer duration-300 flex gap-x-2 items-center w-fit">
                        <IoMdAdd className="size-5" />
                        <p className="text-sm">Add User</p>
                    </button>
                </section>
                <UserFilterSection initUsers={initUsers} />
                <UserListSection />
            </UserProvider>
        </main>
    )
}