// import { ISong } from "@/types/songType";
// import { RefObject } from "react";
// import { create } from "zustand"



// type MediaPlayerStoreType = {
//     audioRef: HTMLAudioElement | null;
//     isPlaying: boolean;
//     isBuffering: boolean;
//     progress: number;
//     action: MediaPlayerStoreActionType
// }

// type MediaPlayerStoreActionType = {
//     setAudioRef(ref: HTMLAudioElement): void;
//     setIsBuffering(value: boolean): void;
//     setProgress(value: number): void;
//     play(): void;
//     pause(): void;
//     fetchAndSetUrl(song: ISong): void;
// }


// export const useMediaPlayerStore = create<MediaPlayerStoreType>((set, get) => ({
//     audioRef: null,
//     isPlaying: false,
//     isBuffering: false,
//     progress: 0,
//     action: {
//         setAudioRef: (ref) => {
//             if (!get().audioRef) {
//                 set({ audioRef: ref })
//             }
//         },
//         play: () => {
//             const { audioRef } = get();
//             if (!audioRef) return;
//             audioRef.play();
//         },
//         pause: () => {
//             const { audioRef } = get();
//             if (!audioRef) return;
//             audioRef.pause();
//         },
//         setIsBuffering: (value => {
//             set({
//                 isBuffering: value
//             })
//         }),
//         setProgress: (value => {
//             set({
//                 progress: value
//             })
//         }),
//         fetchAndSetUrl: (song => {

//         })
//     }
// }))