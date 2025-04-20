import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default async function Page() {
    // const { id } = await params;
    return (
        <main className="min-h-screen flex flex-col w-full p-32 gap-y-4">
            <Link href="/schedule" className="w-fit flex gap-x-3 items-center">
                <ArrowLeftIcon className="size-6" />
                <p className="hover:underline">Back to all offers</p>
            </Link>
            <section className="w-full flex gap-x-18">
                <div className="w-1/2 flex flex-col py-8 px-12 gap-y-18 bg-gradient-end rounded-lg shadow-2xl">
                    <h1 className="text-xl font-semibold">Pick your seat</h1>
                    <div className="w-full grid grid-cols-6 gap-2">
                        {[...Array.from({length: 30})].map((_, i) => {
                            const index = i + 1;
                            const colStart = index <= 24 ?
                                index % 4 === 1 ? 1 :
                                index % 4 === 2 ? 2 :
                                index % 4 === 3 ? 5 :
                                index % 4 === 0 ? 6 :
                                index : index;
                            return (
                                <div key={i} className={`p-2 bg-white text-black text-sm text-center rounded-md col-start-${colStart}`}>
                                    {index}
                                </div>
                            )
                        })}
                    </div>
                    <div className="w-full px-4 flex justify-around">
                        <div className="w-fit flex flex-col gap-y-2 items-center">
                            <span className="size-10 bg-white rounded-md"></span>
                            <p className="text-xs">Available</p>
                        </div>
                        <div className="w-fit flex flex-col gap-y-2 items-center">
                            <span className="size-10 bg-lime-600 rounded-md"></span>
                            <p className="text-xs">Booked</p>
                        </div>
                        <div className="w-fit flex flex-col gap-y-2 items-center">
                            <span className="size-10 bg-teal-500 rounded-md"></span>
                            <p className="text-xs">Booked</p>
                        </div>
                    </div>
                </div>
                <div className="w-full flex flex-col py-8 px-10 bg-gradient-end rounded-lg shadow-xl">

                </div>
            </section>
        </main>
    )
}