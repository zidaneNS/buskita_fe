import QrScanner from "@/components/QrScanner";
import QRCode from "react-qr-code";

export default function Page() {
    return (
        <main className="w-full min-h-screen flex gap-x-8 justify-center items-center">
            <QRCode
                size={256}
                value="rustam"
                className="bg-white p-12"
            />
            <QrScanner />
        </main>
    )
}