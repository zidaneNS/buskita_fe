import DropDown from "@/components/DropDown";
import ScheduleCardLanding from "@/components/ScheduleCardLanding";
import { dummyDates, dummyRoutes } from "@/lib/dummyData";
import LandingPictureSection from "@/ui/LandingPictureSection";
import Link from "next/link";

export default async function Page() {
  const routes = dummyRoutes;
  const dates = dummyDates;
  
  return (
    <main className="z-0 flex flex-col pt-20 min-h-screen">
      <section className="w-full flex flex-col md:flex-row justify-between items-center mb-10 px-6 md:px-32 min-h-screen gap-y-12">
        <div className="flex flex-col gap-y-2 max-w-80">
          <h2 className="text-lg md:text-2xl">Selamat Datang di</h2>
          <h1 className="text-4xl md:text-8xl font-bold"><span className="underline">BusK</span>ita</h1>
          <p className="text-sm md:text-base text-justify">BusKita adalah sebuah website yang dirancang untuk memudahkan mahasiswa dan tenaga kependidikan (tendik) Universitas Airlangga dalam melakukan pemesanan bus secara online. Dengan BusKita, pengguna dapat dengan mudah memilih jadwal perjalanan, memesan tiket, dan mengelola perjalanan mereka dengan lebih efisien.</p>
          <a href="#booking" className="py-2 px-4 text-xs md:text-base rounded-md bg-midnight-purple w-fit cursor-pointer hover:bg-gradient-end duration-300">Cara Booking</a>
        </div>
        
        <div className="bg-white rounded-2xl md:w-2/5 flex flex-col p-4 w-full md:p-10 gap-y-4 text-black">
          <div className="w-full border-b border-black">
            <p className="text-xs md:text-sm">Your Credits</p>
            <p className="text-base md:text-lg font-semibold">15 Credits</p>
          </div>
          <div className="flex flex-col gap-y-3 w-4/5">
            <h1 className="font-semibold">Pilih Rute</h1>
            <div className="flex gap-y-2 gap-x-3 text-white">
              <DropDown items={routes} />
              <DropDown items={dates} />
            </div>
          </div>
          <div className="flex flex-col gap-y-3 w-full">
            <ScheduleCardLanding />
            <ScheduleCardLanding />
          </div>
          <div className="flex flex-row-reverse w-full mt-6">
            <Link href="/schedule" className="text-xs md:text-base hover:underline cursor-pointer">Show More</Link>
          </div>
        </div>
      </section>

      <LandingPictureSection />
    </main>
  )
}