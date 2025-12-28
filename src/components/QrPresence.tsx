import { cryptoEncrypt, generateAscii, m_digit, PUBLIC_KEY } from "@/lib/crypto";
import { Seat } from "@/lib/type/seat";
import { Dispatch, SetStateAction } from "react";
import { MdClose } from "react-icons/md";
import QRCode from "react-qr-code";

export default function QrPresence({
    setIsOpenQr,
    userSeat
}: {
    setIsOpenQr: Dispatch<SetStateAction<boolean>>,
    userSeat: Seat
}) {
    const information = userSeat.seatId;
    const text = JSON.stringify(information);
    const ascii = generateAscii(text, m_digit);
    const cipher = cryptoEncrypt(ascii, PUBLIC_KEY, m_digit);

    return (
        <div>
            <MdClose onClick={() => setIsOpenQr(false)} className="size-10 cursor-pointer -translate-8" />
            <div className="bg-white text-black flex flex-col gap-y-3 px-6 py-4 rounded-lg shadow-xl">
                <QRCode
                    size={256}
                    value={cipher}
                    className="bg-white p-6"
                />
                <p className="w-full text-center">{cipher}</p>
            </div>
        </div>
    )
}