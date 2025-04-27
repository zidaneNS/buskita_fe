'use client';

import Modal from "@/components/Modal";
import LoginForm from "@/ui/LoginForm";
import RegisterForm from "@/ui/RegisterForm";
import { useState } from "react";

export default function Page() {
    const [isLogin, setIsLogin] = useState<boolean>(true);
    return (
        <Modal>
            {isLogin ? (
                <LoginForm setIsLogin={setIsLogin} />
            ) : (
                <RegisterForm setIsLogin={setIsLogin} />
            )}
        </Modal>
    )
}