    "use client";
    import { useEffect, useRef } from "react";

    interface CalendlyModalProps {
        isOpen: boolean;
        onClose: () => void;
        url: string;
    }

    declare global {
        interface Window {
            Calendly?: {
                initInlineWidget: (opts: { url: string; parentElement: HTMLElement }) => void;
            };
        }
    }

    export default function CalendlyModal({ isOpen, onClose, url }: CalendlyModalProps) {
        const mountRef = useRef<HTMLDivElement | null>(null);

        // ESC + scroll lock
        useEffect(() => {
            if (!isOpen) return;

            const handleEsc = (e: KeyboardEvent) => {
                if (e.key === "Escape") onClose();
            };

            document.addEventListener("keydown", handleEsc);
            document.body.style.overflow = "hidden";

            return () => {
                document.removeEventListener("keydown", handleEsc);
                document.body.style.overflow = "auto";
            };
        }, [isOpen, onClose]);

        // Load script once
        useEffect(() => {
            if (!isOpen) return;

            const id = "calendly-script";
            if (document.getElementById(id)) return;

            const script = document.createElement("script");
            script.id = id;
            script.src = "https://assets.calendly.com/assets/external/widget.js";
            script.async = true;
            document.body.appendChild(script);
        }, [isOpen]);

        // Init widget every open (reliable)
        useEffect(() => {
            if (!isOpen) return;
            if (!mountRef.current) return;
            if (!url) return;

            const tryInit = () => {
                if (!mountRef.current) return;
                if (!window.Calendly?.initInlineWidget) return false;

                // Clear old iframe if any
                mountRef.current.innerHTML = "";
                window.Calendly.initInlineWidget({
                    url,
                    parentElement: mountRef.current,
                });
                return true;
            };

            // try now, then retry a few times until script is ready
            if (tryInit()) return;

            let tries = 0;
            const t = window.setInterval(() => {
                tries += 1;
                if (tryInit() || tries >= 20) window.clearInterval(t);
            }, 100);

            return () => window.clearInterval(t);
        }, [isOpen, url]);

        if (!isOpen) return null;

        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
                {/* overlay */}
                <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={onClose} />

                {/* modal */}
                <div className="relative z-10 w-[95%] max-w-4xl rounded-2xl border border-white/10 bg-[#0B0B0F] shadow-2xl">
                    <button
                        onClick={onClose}
                        className="absolute right-4 top-4 text-white/60 hover:text-white"
                        aria-label="Close"
                    >
                        ✕
                    </button>

                    <div className="p-6">
                        <h3 className="mb-2 text-xl font-semibold text-white">Book a 30-Min Reliability Call</h3>
                        <p className="mb-4 text-sm text-white/50">No sales pitch. Direct technical conversation.</p>

                        <div ref={mountRef} style={{ minWidth: "320px", height: "700px" }} />
                    </div>
                </div>
            </div>
        );
    }
