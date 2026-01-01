import { Seat } from "@/lib/type";
import { useState } from "react";
import { LuCopy, LuCopyCheck } from "react-icons/lu";

export default function FilledSeatList({ seats }: { seats: Seat[] }) {
  return seats.length > 0 ? (
    <table className="table-fixed border-collapse text-xs md:text-base">
      <thead>
        <tr>
          <th className="text-center pb-2 border-b border-white/40">Name</th>
          <th className="text-center pb-2 border-b border-white/40">Seat Number</th>
          <th className="text-center pb-2 border-b border-white/40">Verified</th>
          <th className="text-center pb-2 border-b border-white/40">Copy Id</th>
        </tr>
      </thead>
      <tbody>
        {seats.map((seat, i) => (
          <SeatComponent key={i} seat={seat} />
        ))}
      </tbody>
    </table>
  ) : (
    <div className="w-full text-center">No passengers has booked</div>
  )
}

function SeatComponent({ seat }: { seat: Seat }) {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(seat.seatId);
      setIsCopied(true);
    } catch (err) {
      console.error(`fail to copy ${err}`);
    }
  }
  return (
    <tr>
      <td className="text-center py-2">{seat.user?.name}</td>
      <td className="text-center py-2">{seat.seatNumber}</td>
      <td className="flex justify-center py-2">
        <div className={`px-4 py-2 ${seat.verified ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"} w-fit rounded-full font-semibold`}>{seat.verified ? "Verified" : "Unverified"}</div>
      </td>
      <td className="text-center py-2">
        <div className="w-full flex justify-center">
          <div onClick={() => handleCopy()} className={`flex w-fit text-center duration-300 justify-center items-center p-1 rounded-md cursor-pointer ${isCopied ? 'hover:bg-green-500/20 text-green-500' : 'hover:bg-white/20 text-white'}`}>
            {isCopied ? <LuCopyCheck className="size-6" />
            : <LuCopy className="size-6" />}
          </div>
        </div>
      </td>
    </tr>
  )
}