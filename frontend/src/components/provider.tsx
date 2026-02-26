"use client";

import { GlobalPopoverProvider } from "@/context/globalPopover";
import { MusicPlayerProvider } from "@/context/musicPlayerContext";
import { PopoverContextProvider } from "@/context/popover";
import { QueueProvider } from "@/context/queueContext";
import React from "react";
import { ModalContextProvider } from "@/context/modalContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <QueueProvider>
        <GlobalPopoverProvider>
          <PopoverContextProvider>
            <MusicPlayerProvider>
              <ModalContextProvider>{children}</ModalContextProvider>
            </MusicPlayerProvider>
          </PopoverContextProvider>
        </GlobalPopoverProvider>
      </QueueProvider>
    </>
  );
}
