import { ISong } from "@/types/songType";
import { create } from "zustand"


type QueueStoreType = {
    queueSong: string[];
    currentIdx: number;
    isCurrentSong: boolean;
    actions: QueueStoreActionType
}


type QueueStoreActionType = {
    addQueueSongs(songs: ISong[]): void;
    addQueueSongAndSetCurrent(songs: ISong[]): void;
    updateQueueSongPosition(ids: string[]): void;
    removeQueueSong(id: string): void;
    getCurrentSongId(): string | null;
    moveForward(): void;
    moveBackward(): void;
}




export const useQueueStore = create<QueueStoreType>((set, get) => ({
    queueSong: [],
    currentIdx: 0,
    isCurrentSong: false,
    actions: {
        addQueueSongs: (songs => {
            set(state => {
                const { queueSong } = get()
                const uniqueSong = songs.filter(x => !queueSong.includes(x.id));
                const ids = uniqueSong.map(x => x.id);
                return {
                    queueSong: [...state.queueSong, ...ids],
                    isCurrentSong: true
                }
            })
        }),
        addQueueSongAndSetCurrent: (songs) => {
            set(state => {
                const ids = songs.map(x => x.id);
                return {
                    queueSong: [...ids],
                    currentIdx: 0,
                    isCurrentSong: true
                }
            })
        },
        updateQueueSongPosition: (ids) => {
            set(state => {
                const prevQueueSong = state.queueSong.slice(0, get().currentIdx + 1)
                return {
                    queueSong: [...prevQueueSong, ...ids],
                }
            })
        },
        removeQueueSong: (id => {
            set(() => {
                const { queueSong } = get()
                const ids = queueSong.filter(x => x !== id);
                return {
                    queueSong: ids
                }
            })
        }),
        moveForward: () => {
            const { currentIdx, queueSong } = get();
            const newCurrentIdx = currentIdx < queueSong.length - 1 ? currentIdx + 1 : currentIdx;
            set({
                currentIdx: newCurrentIdx
            })
        },
        moveBackward: () => {
            const { currentIdx } = get();
            const newCurrentIdx = currentIdx > 0 ? currentIdx - 1 : currentIdx;
            set({
                currentIdx: newCurrentIdx
            })
        },
        getCurrentSongId: () => {
            const { currentIdx, queueSong } = get();
            return queueSong[currentIdx] ?? null;
        }

    }
}))