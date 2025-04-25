'use client';

import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";
import { useEffect, useState } from "react";

export default function Page() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isLogin, setIsLogin] = useState<boolean>(true);

    useEffect(() => {
        setIsOpen(true);
    }, []);
    return (
        <div className={`fixed inset-0 bg-black/80 z-20 items-center justify-center flex duration-200 backdrop-blur-sm ${isOpen ? "scale-100" : "scale-0"}`}>
            {isLogin ? (
                <LoginForm setIsLogin={setIsLogin} />
            ) : (
                <RegisterForm setIsLogin={setIsLogin} />
            )}
        </div>
    )
}