import { Schedule, Seat, User } from "@/lib/type";
import { Dispatch, SetStateAction } from "react";
import { MdClose } from "react-icons/md";
import QRCode from "react-qr-code";

export default function QrPresence({
    setIsOpenQr,
    user,
    schedule,
    userSeat
}: {
    setIsOpenQr: Dispatch<SetStateAction<boolean>>,
    user: User,
    schedule: Schedule,
    userSeat: Seat | null
}) {
    return (
        <div>
            <MdClose onClick={() => setIsOpenQr(false)} className="size-10 cursor-pointer -translate-8" />
            <div className="bg-white text-black flex flex-col gap-y-3 px-6 py-4 rounded-lg shadow-xl">
                <QRCode
                    size={256}
                    value={JSON.stringify({ user_id: user.id, schedule_id: schedule.id, seat_id: userSeat?.id })}
                    className="bg-white p-6"
                />
            </div>
        </div>
    )
}