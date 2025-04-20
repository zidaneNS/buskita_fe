import ScheduleCardHome from "@/components/ScheduleCardHome";

export default function ScheduleHomeSection() {
    return (
        <div className="w-full min-h-full grid grid-rows-3 grid-cols-3 gap-y-6 gap-x-8">
            {Array.from({ length: 12}).map((_,i) => (
                <ScheduleCardHome key={i} id={i} />
            ))}
        </div>
    )
}