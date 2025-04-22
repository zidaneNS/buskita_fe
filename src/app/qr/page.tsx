import QrScanner from "@/components/QrScanner";
import QRCode from "react-qr-code";

export default function Page() {
    return (
        <main className="w-full min-h-screen flex flex-col justify-center items-center gap-y-12">
            <QRCode
                size={256}
                value="test"
            />
            <QrScanner />
        </main>
    )
}