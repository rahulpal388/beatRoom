"use client"
import { useMusicPlayer } from "@/context/musicPlayerContext";
import { formateTime, formateTimePading } from "@/lib/formateTime";
import { useEffect, useState } from "react";

export function CurrentSongPlayingTime() {
    const [currentTime, setCurrentTime] = useState(0);
    const { audioRef } = useMusicPlayer()

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const onTimeUpdate = () => {
            setCurrentTime(audio.currentTime);
        }
        audio.addEventListener("timeupdate", onTimeUpdate);
        return () => {
            return audio.removeEventListener("timeupdate", onTimeUpdate);
        }
    }, [audioRef])

    return <>
        <p className="w-24 max-sm:hidden ">
            {formateTimePading(
                Math.trunc(currentTime)
            )} / {formateTime(
                `${!audioRef.current ?
                    (
                        0.1
                    )
                    : (
                        Math.round(audioRef.current.duration)
                    )
                }`
            )}
        </p>
    </>

}