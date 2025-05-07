import RadioButton from "@/components/RadioButton";
import UserCard from "@/components/UserCard";
import { CiSearch } from "react-icons/ci";
import { IoMdAdd } from "react-icons/io";

export default function Page() {
    return (
        <main className="h-screen px-8 py-6 md:px-10 md:py-8 w-full flex flex-col gap-y-4">
            <section className="flex flex-col md:flex-row md:justify-between gap-y-3 w-full">
                <h1 className="text-xl md:text-3xl font-bold">Users</h1>
                <button className="py-3 px-4 rounded-md bg-midnight-purple hover:bg-white hover:text-black cursor-pointer duration-300 flex gap-x-2 items-center w-fit">
                    <IoMdAdd className="size-5" />
                    <p className="text-sm">Add User</p>
                </button>
            </section>
            <section className="flex flex-col md:flex-row gap-y-2 w-full md:gap-x-2">
                <div className="flex flex-1 items-center w-full bg-black/30 border border-dark-purple py-2 px-4 gap-x-3 rounded-md">
                    <CiSearch className="size-6" />
                    <input type="text" name="search" placeholder="Search users..." className="py-1 w-full flex-1 outline-none" />
                </div>
                <div className="flex gap-x-3 items-center">
                    <RadioButton text="All" />
                    <RadioButton text="Co" />
                    <RadioButton text="Passenger" />
                </div>
            </section>
            <section className="h-full overflow-y-auto pr-4 py-6 md:py-8 scrollbar-thin">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full">
                    {Array.from({ length: 20 }).map((_, i) => (
                        <UserCard key={i} />
                    ))}
                </div>
            </section>
        </main>
    )
}