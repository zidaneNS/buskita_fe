import MyScheduleCard from "@/components/MyScheduleCard";
import { EncryptedSeat } from "@/lib/type";

export interface MyScheduleSectionProps {
  seats: EncryptedSeat[]
}

export default function MyScheduleSection({
  seats
}: MyScheduleSectionProps) {
  return (
    <div className="max-h-full gap-y-4 grid grid-cols-1 w-full">
      {seats.length > 0 ?
        seats.map((seat, i) => (
          <MyScheduleCard key={i} seat={seat} />
        )) : (
          <div className="w-full text-center">Shcedule empty, pick your schedule</div>
        )
      }
    </div>
  )
}