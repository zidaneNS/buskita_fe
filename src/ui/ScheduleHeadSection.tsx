'use client';

import CreateScheduleForm from "@/components/CreateScheduleForm";
import Modal from "@/components/Modal";
import { Bus } from "@/lib/type/bus";
import { Route } from "@/lib/type/schedule";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { MdAdd } from "react-icons/md";

export default function ScheduleHeadSection({ buses, routes }: { buses: Bus[], routes: Route[] }) {
    const [isCreating, setIsCreating] = useState<boolean>(false);
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { replace } = useRouter();

    const handleSearch = (term: string) => {
        const params = new URLSearchParams(searchParams);
        if (term.length > 0) {
            params.set('search', term)
        } else {
            params.delete('search')
        }
        
        replace(`${pathname}?${params.toString()}`);
    }

    return (
        <section className="w-full flex flex-col gap-y-4">
            {isCreating && (
                <Modal>
                    <div className="flex flex-col max-h-4/5 md:w-1/3 overflow-y-auto px-6 py-4 rounded-lg shadow-xl bg-dark-purple gap-y-4">
                        <div className="flex flex-col gap-y-2">
                            <h1 className="text-2xl font-semibold">Create New Schedule</h1>
                            <p className="text-slate-200">Add a new bus schedule to the system</p>
                        </div>
                        <CreateScheduleForm buses={buses} routes={routes} setIsCreating={setIsCreating} />
                        <div className="flex flex-row-reverse gap-x-4 w-full">
                            <button onClick={() => setIsCreating(false)} className="py-2 px-4 rouned-md border border-slate-400 cursor-pointer hover:bg-slate-400 duration-300 rounded-md">Cancel</button>
                        </div>
                    </div>
                </Modal>
            )}
            <div className="w-full flex justify-between items-center">
                <h1 className="text-2xl font-bold">Schedules</h1>
                <button onClick={() => setIsCreating(true)} className="flex gap-x-2 items-center py-2 px-4 w-fit rounded-md bg-midnight-purple cursor-pointer hover:bg-white hover:text-black duration-300">
                    <MdAdd className="size-5" />
                    <p className="text-sm md:text-base">Add</p>
                </button>
            </div>
            <div className="w-full flex gap-x-3 px-4 rounded-md bg-black/40 items-center">
                <CiSearch className="size-6" />
                <input type="text" placeholder="search schedules" onChange={(e) => handleSearch(e.target.value)} className="py-3 flex-1 w-full outline-none" />
            </div>
        </section>
    )
}