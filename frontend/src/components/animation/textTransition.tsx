"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"

const text = ["connect", "stream", "vibe together"]

export function TextTransition() {
    const [textIndex, setTextIndex] = useState<number>(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setTextIndex(prev => (prev + 1) % text.length);
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex">
            <h1 className="md:text-7xl text-5xl dark:text-background text-foreground font-bold font-heading">
                Your room. Your beat. A space to


                <AnimatePresence mode="wait">
                    <motion.span
                        key={text[textIndex]}
                        initial={{ y: "30%", opacity: 0 }}
                        animate={{ y: "0%", opacity: 1 }}
                        exit={{ y: "-20%", opacity: 0 }}
                        transition={{ duration: 0.6 }}
                        className="pl-6  inline-block text-primary"
                    >
                        {text[textIndex]}
                    </motion.span>
                </AnimatePresence>

            </h1>
        </div>
    );
}
