import React, { useEffect, useState } from "react";

export default function Modal({ children }: { children: React.ReactNode}) {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {
        setIsOpen(true);
    }, [setIsOpen]);
    return (
        <div className={`fixed inset-0 bg-black/80 z-20 items-center justify-center flex flex-col duration-200 backdrop-blur-sm ${isOpen ? "scale-100" : "scale-0"}`}>
            {children}
        </div>
    )
}