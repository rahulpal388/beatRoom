import { useEffect, useState } from "react";
import { SongPopover } from "./songPopover";
import { AlbumPopover } from "./albumPopover";
import { PlaylistPopover } from "./playlistPopover";
import { usePopoverCard } from "@/context/popover";
import {
  autoUpdate,
  flip,
  offset,
  shift,
  useFloating,
} from "@floating-ui/react-dom";

type ICardType = "song" | "album" | "playlist";
const Options = {
  song: <SongPopover />,
  album: <AlbumPopover />,
  playlist: <PlaylistPopover />,
};

export function ShowPopover() {
  const { cardType, popoverRef, openPopover, containerRef, setOpenPopover } =
    usePopoverCard();

  const { x, y, strategy, refs, update } = useFloating({
    placement: "bottom-start",
    middleware: [offset(8), flip(), shift()],
    whileElementsMounted: (reference, floating, update) => {
      return autoUpdate(reference, floating, () => {
        update();

        if (containerRef.current && reference) {
          const rect = reference.getBoundingClientRect();
          const containerRect = containerRef.current.getBoundingClientRect();

          // If icon is OUT of visible scroll area → close the popover
          if (
            rect.right < containerRect.left ||
            rect.left > containerRect.right
          ) {
            setOpenPopover(false);
          }
        }
      });
    },
  });

  useEffect(() => {
    if (popoverRef.current) {
      refs.setReference(popoverRef.current);
    }
  }, [popoverRef, openPopover]);

  return (
    <>
      <div
        className={`absolute  z-50 `}
        ref={refs.setFloating}
        style={{
          left: `${x}px`,
          top: `${y}px`,
        }}
      >
        {openPopover && Options[cardType as ICardType]}
      </div>
    </>
  );
}
