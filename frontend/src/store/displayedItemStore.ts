import { create } from "zustand"

type DisplayedItem = { type: "song", id: string }
    | { type: "playlist", id: string }
    | { type: "album", id: string }

export type DisplayedItemType = {
    displayedItem: DisplayedItem | null
    actions: DisplayedItemActionType
}

export type DisplayedItemActionType = {
    addDisplayedItem: (data: DisplayedItem) => void
}


export const useDisplayedItemStore = create<DisplayedItemType>(set => ({
    displayedItem: null,
    actions: {
        addDisplayedItem: (data => {
            set({
                displayedItem: data
            })
        })
    }
}))