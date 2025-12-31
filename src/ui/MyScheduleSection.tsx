import MyScheduleCard from "@/components/MyScheduleCard";
import { EncryptedSeat, User } from "@/lib/type";

export interface MyScheduleSectionProps {
  seats: EncryptedSeat[];
  user: User;
}

export default function MyScheduleSection({
  seats,
  user
}: MyScheduleSectionProps) {
  return (
    <div className="max-h-full gap-y-4 grid grid-cols-1 w-full">
      {seats.length > 0 ?
        seats.map((seat, i) => (
          <MyScheduleCard key={i} seat={seat} user={user} />
        )) : (
          <div className="w-full text-center">Shcedule empty, pick your schedule</div>
        )
      }
    </div>
  )
}