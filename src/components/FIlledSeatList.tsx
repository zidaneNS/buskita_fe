import { Seat } from "@/lib/type";

export default function FilledSeatList({ seats }: { seats: Seat[] }) {
    return seats.length > 0 ? (
        <table className="table-fixed border-collapse text-xs md:text-base">
            <thead>
                <tr>
                    <th className="text-center pb-2 border-b border-white/40">Name</th>
                    <th className="text-center pb-2 border-b border-white/40">Seat Number</th>
                    <th className="text-center pb-2 border-b border-white/40">Verified</th>
                </tr>
            </thead>
            <tbody>
                {seats.map((seat, i) => (
                    <tr key={i}>
                        <td className="text-center py-2">{seat.user_name}</td>
                        <td className="text-center py-2">{seat.seat_number}</td>
                        <td className="flex justify-center py-2">
                            <div className={`px-4 py-2 ${seat.verified ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"} w-fit rounded-full font-semibold`}>{seat.verified ? "Verified" : "Unverified"}</div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    ) : (
        <div className="w-full text-center">No passengers has booked</div>
    )
}