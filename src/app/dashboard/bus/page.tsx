import AddBusSection from "@/ui/AddBusSection";

export default function Page() {
    return (
        <main className="flex h-screen w-full relative">
            <AddBusSection />
            <section className="flex w-full px-4 py-2 md:px-12 md:py-10 h-full overflow-y-auto scrollbar-thin my-8">
                <table className="w-full table-auto h-fit">
                    <thead>
                        <tr className="text-xs md:text-base bg-black/50">
                            <th className="py-2 text-center border border-white/10">Identity</th>
                            <th className="py-2 text-center border border-white/10">Capacity</th>
                            <th className="py-2 text-center border border-white/10">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-black/20">
                            <td className="p-2 text-center border border-white/10">08</td>
                            <td className="p-2 text-center border border-white/10">30</td>
                            <td className="p-2 text-center border border-white/10">
                                <div className="w-full flex gap-x-3 justify-center">
                                    <button className="md:py-2 md:px-4 px-2 py-1 rounded-md text-xs md:text-sm bg-green-500 cursor-pointer hover:bg-green-300 duration-300">Edit</button>
                                    <button className="md:py-2 md:px-4 px-2 py-1 rounded-md text-xs md:text-sm bg-purple-500 cursor-pointer hover:bg-purple-300 duration-300">View Seat</button>
                                    <button className="md:py-2 md:px-4 px-2 py-1 rounded-md text-xs md:text-sm bg-red-500 cursor-pointer hover:bg-red-300 duration-300">Delete</button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </main>
    )
}