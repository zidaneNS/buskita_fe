'use client';

import { Html5Qrcode } from "html5-qrcode";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { HiQrcode } from "react-icons/hi";

export default function QrScanner({ setCipher, setIsQR }: { setCipher: Dispatch<SetStateAction<number | string>>, setIsQR: Dispatch<SetStateAction<boolean>> }) {
    const [decodedText, setDecodedText] = useState<string>("");
    const [isScanning, setIsScanning] = useState<boolean>(false);
    const html5QrCodeRef = useRef<Html5Qrcode | null>(null);
    const readerId = "reader";

    const startScan = async () => {
        const qrCode = new Html5Qrcode(readerId);
        html5QrCodeRef.current = qrCode;

        try {
            await qrCode.start(
                { facingMode: "environment" },
                {
                    fps: 5,
                    qrbox: { width: 250, height: 250 }
                },
                (decoded) => {
                    setDecodedText(decoded);
                    setCipher(decoded);
                    stopScan();
                },
                (errorMessage) => {
                    // Optional: log scan errors
                    console.warn(errorMessage);
                }
            );
            setIsScanning(true);
        } catch (err) {
            console.error("Failed to start scanning:", err);
        }
    };

    const stopScan = async () => {
        if (html5QrCodeRef.current?.isScanning) {
            try {
                await html5QrCodeRef.current.stop();
                html5QrCodeRef.current.clear();
                setIsScanning(false);
            } catch (err) {
                console.error("Failed to stop scanning:", err);
            }
        }
    };

    useEffect(() => {
        return () => {
            // Cleanup on unmount
            stopScan();
        };
    }, []);

    useEffect(() => {
        if (decodedText) setIsQR(false);
        
    }, [decodedText, setCipher, setIsQR]);

    return (
        <div className="w-full flex flex-col items-center gap-y-4">
            <div id={readerId} className="w-64 h-auto" />
            {decodedText && (
                <div className="text-xl font-semibold text-center">
                    Result: {decodedText}
                </div>
                
            )}

            {!isScanning ? (
                <>
                    <HiQrcode className="size-32 text-white/30" />
                    <p className="text-center">Point your camera at QR code to get passenger information</p>
                    <button
                        onClick={startScan}
                        className="py-2 px-4 rounded-md bg-black/50 hover:bg-black/20 cursor-pointer duration-300 text-white"
                    >
                        Start Scan
                    </button>
                </>
            ) : (
                <button
                    onClick={stopScan}
                    className="py-2 px-4 rounded-md bg-black/50 hover:bg-black/20 cursor-pointer duration-300 text-white"
                >
                    Cancel
                </button>
            )}
        </div>
    );
}