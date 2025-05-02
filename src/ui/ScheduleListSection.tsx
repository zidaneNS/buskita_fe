'use client';

import ScheduleListCard from "@/components/ScheduleListCard";

export default function ScheduleListSection() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 w-full">
            <ScheduleListCard />
            <ScheduleListCard />
            <ScheduleListCard />
            <ScheduleListCard />
            <ScheduleListCard />
            <ScheduleListCard />
            <ScheduleListCard />
        </div>
    )
}