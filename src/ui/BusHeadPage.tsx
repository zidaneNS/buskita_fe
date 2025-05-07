'use client';

import Modal from "@/components/Modal";
import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import AddBusSection from "./AddBusSection";

export default function BusHeadPage() {
    const [isAdd, setIsAdd] = useState<boolean>(false);
    return (
        <section className="flex justify-between items-center">
            {isAdd && (
                <Modal>
                    <AddBusSection setIsAdd={setIsAdd} />
                </Modal>
            )}
            <h1 className="text-xl md:text-2xl font-bold">Buses</h1>
            <button onClick={() => setIsAdd(true)} className="flex w-fit px-4 py-2 rounded-md bg-midnight-purple cursor-pointer hover:bg-white hover:text-black duration-300 gap-x-2 items-center">
                <IoMdAdd className="size-4" />
                <p className="text-sm">Add</p>
            </button>
        </section>
    )
}