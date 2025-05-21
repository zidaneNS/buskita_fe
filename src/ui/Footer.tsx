import Image from "next/image";
import Link from "next/link";
import LinkFooterSection from "./LinkFooterSection";

export default function Footer() {
    return (
        <footer className="h-screen w-full flex justify-center items-center bg-dark-purple text-white">
            <div className="w-fit flex flex-col gap-y-12">
                <div className="flex gap-x-4 w-full items-center justify-center">
                    <Image
                        src="/assets/bus-footer.png"
                        alt="bus footer"
                        width={56}
                        height={56}
                    />
                    <h1 className="text-5xl font-bold">BusKita</h1>
                </div>
                <div className="w-fit gap-y-6 flex flex-col">
                    <h3 className="text-base md:text-xl text-center">Transportasi Nyaman untuk Sivitas <span className="font-semibold">Universitas Airlangga!</span></h3>
                    <div className="w-full flex justify-center">
                        <Link href="#" className="py-3 px-10 rounded-full bg-gradient-end hover:bg-midnight-purple duration-300">Contact Us</Link>
                    </div>
                </div>
                <LinkFooterSection />
            </div>
        </footer>
    )
}