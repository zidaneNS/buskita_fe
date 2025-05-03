'use client';

// import ScheduleListCard from "@/components/ScheduleListCard";
import TableRow from "@/components/TableRow";

export default function ScheduleListSection() {
    return (
        // <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 w-full">
        //     <ScheduleListCard />
        //     <ScheduleListCard />
        //     <ScheduleListCard />
        //     <ScheduleListCard />
        //     <ScheduleListCard />
        //     <ScheduleListCard />
        //     <ScheduleListCard />
        // </div>
        <table className="w-full table-auto h-fit shadow-xl">
            <thead>
                <tr>
                    <th className="border border-white/10 bg-black/50 py-2">Time</th>
                    <th className="border border-white/10 bg-black/50 py-2">Bus</th>
                    <th className="border border-white/10 bg-black/50 py-2">Route</th>
                    <th className="border border-white/10 bg-black/50 py-2">Status</th>
                    <th className="border border-white/10 bg-black/50 py-2">Action</th>
                </tr>
            </thead>
            <tbody>
                {Array.from({ length: 8 }).map((_, i) => (
                    <TableRow key={i} />
                ))}
            </tbody>
        </table>
    )
}