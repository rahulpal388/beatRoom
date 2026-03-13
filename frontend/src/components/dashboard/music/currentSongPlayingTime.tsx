"use client";
import { formateTime, formateTimePading } from "@/lib/formateTime";
import { useMusicPlayerStore } from "@/store/musicPlayerStore";

export function CurrentSongPlayingTime() {
  const currentPlayedTime = useMusicPlayerStore((s) => s.currentPlayedTime);
  const songDuration = useMusicPlayerStore((s) => s.songDuration);
  return (
    <>
      <p className="w-24 max-sm:hidden ">
        {formateTimePading(Math.trunc(currentPlayedTime))} /{" "}
        {formateTime(`${songDuration}`)}
      </p>
    </>
  );
}
