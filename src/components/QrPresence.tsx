import { Dispatch, SetStateAction } from "react";
import { MdClose } from "react-icons/md";
import QRCode from "react-qr-code";

export interface QrPresenceProps {
  setIsOpenQR: Dispatch<SetStateAction<boolean>>;
  ciphertext: string;
}

export default function QrPresence({
  setIsOpenQR,
  ciphertext
}: QrPresenceProps) {

  return (
    <div>
      <MdClose onClick={() => setIsOpenQR(false)} className="size-10 cursor-pointer -translate-8" />
      <div className="bg-white text-black flex flex-col gap-y-3 p-2 rounded-lg shadow-xl">
        <QRCode
          value={ciphertext}
          className="bg-white"
          size={260}
        />
      </div>
    </div>
  )
}