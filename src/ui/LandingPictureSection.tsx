import Image from "next/image"

type LandingPicture = {
    src: string,
    alt: string,
    title: string,
    description: string,
    height: number,
    width: number
}

export default function LandingPictureSection() {
    const pictures: LandingPicture[] = [
        {
            src: "/schedule.png",
            alt: "schedule",
            title: "Pilih Jadwal",
            description: "Cari jadwal bus yang sesuai dengan tujuan anda",
            width: 99,
            height: 99
        },
        {
            src: "/ticket.png",
            alt: "ticket",
            title: "Booking Ticket",
            description: "Pesan tiket bus anda secara online",
            width: 141,
            height: 106
        },
        {
            src: "/bus-landing.png",
            alt: "bus",
            title: "Nikmati Perjalanan",
            description: "Nikmati perjalanan bersama Bus Unair ft. BusKita",
            width: 95,
            height: 110
        }
    ]
    return (
        <section className="flex w-full flex-col items-center gap-y-18 bg-gradient-start py-10">
            <h1 className="text-5xl font-bold">Cara Booking</h1>
            <div className="w-full flex gap-x-20 mb-10 justify-center px-32">
                {pictures.map((picture, i) => (
                    <div key={i} className="flex flex-col gap-y-2 items-center">
                        <Image
                            src={`/assets${picture.src}`}
                            alt={picture.alt}
                            width={picture.width}
                            height={picture.height}
                        />
                        <h2 className="text-3xl font-semibold text-center">{picture.title}</h2>
                        <p className="text-center">{picture.description}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}