'use client';

import BusCard from "@/components/BusCard";
import { Bus } from "@/lib/type";

export default function BusListSection({ buses }: { buses: Bus[] }) {
    // const [isEditing, setIsEditing]
    return (
        <section className="flex overflow-y-auto py-4 pr-4 scrollbar-thin">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full">
                {buses.map((bus, i) => (
                    <BusCard key={i} bus={bus} />
                ))}
            </div>
        </section>
    )
}