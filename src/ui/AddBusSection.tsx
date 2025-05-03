'use client';

import { useState } from "react";

export default function AddBusSection() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    return (
        <section className={`flex flex-col items-center w-full md:w-fit fixed md:static ${isOpen ? "top-0" : "-top-[100vh]"} duration-300`}>
            <div className="w-full flex flex-col justify-between md:justify-center items-center gap-y-12 md:px-6 md:py-8 px-4 py-6 shadow-xl bg-black/30 h-screen backdrop-blur-xl">
                <h1 className="text-2xl font-semibold w-full text-center">Add Bus</h1>
                <form className="flex flex-col gap-y-4 w-fit items-center">
                    <div className="flex flex-col gap-y-2 w-full">
                        <label htmlFor="time" className="text-base md:text-lg font-semibold">Identity :</label>
                        <input id="time" name="time" type="text" placeholder="08" className="text-sm md:text-base bg-white text-black px-4 py-2 rounded-md" />
                    </div>
                    <div className="flex flex-col gap-y-2 w-full">
                        <label htmlFor="time" className="text-base md:text-lg font-semibold">Total Row :</label>
                        <input id="time" name="time" type="number" placeholder="0" min={0} className="text-sm md:text-base bg-white text-black px-4 py-2 rounded-md" />
                    </div>
                    <div className="flex flex-col gap-y-2 w-full">
                        <label htmlFor="time" className="text-base md:text-lg font-semibold">Total Column :</label>
                        <input id="time" name="time" type="number" placeholder="0" min={0} className="text-sm md:text-base bg-white text-black px-4 py-2 rounded-md" />
                    </div>
                    <div className="flex flex-col gap-y-2 w-full">
                        <label htmlFor="time" className="text-base md:text-lg font-semibold">Total Backseat :</label>
                        <input id="time" name="time" type="number" placeholder="0" min={0} className="text-sm md:text-base bg-white text-black px-4 py-2 rounded-md" />
                    </div>
                    <button className="py-2 w-full bg-purple-800 cursor-pointer rounded-md hover:bg-purple-600 duration-300">Create</button>
                </form>
                <button onClick={() => setIsOpen(false)} className="block md:hidden mt-auto py-2 w-full border border-white cursor-pointer rounded-md hover:bg-purple-600 duration-300">Cancel</button>
            </div>
            <button onClick={() => setIsOpen(true)} className="block md:hidden px-6 py-2 rounded-b-full bg-purple-500/70 text-xs">Add Bus</button>
        </section>
    )
}