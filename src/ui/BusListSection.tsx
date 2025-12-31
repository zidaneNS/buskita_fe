'use client';

import BusCard from "@/components/BusCard";
import BusDeleteForm from "@/components/BusDeleteForm";
import BusEditForm from "@/components/BusEditForm";
import Modal from "@/components/Modal";
import { Bus } from "@/lib/type";
import { useState } from "react";

export default function BusListSection({ buses }: { buses: Bus[] }) {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const [selectedBus, setSelectedBus] = useState<Bus>(buses[0]);
    
    return (
        <section className="flex overflow-y-auto py-4 pr-4 scrollbar-thin">
            {isDeleting && (
                <Modal>
                    <BusDeleteForm selectedBus={selectedBus} setIsDeleting={setIsDeleting} />
                </Modal>
            )}
            {isEditing && (
                <Modal>
                    <BusEditForm setIsEditing={setIsEditing} selectedBus={selectedBus} />
                </Modal>
            )}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full">
                {buses.map((bus, i) => (
                    <BusCard key={i} bus={bus} setIsDeleting={setIsDeleting} setSelectedBus={setSelectedBus} setIsEditing={setIsEditing} />
                ))}
            </div>
        </section>
    )
}