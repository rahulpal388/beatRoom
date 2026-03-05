import { IAlbum } from "@/types/albumType";
import { IPlaylist } from "@/types/playlistType";
import { ISong } from "@/types/songType";

type Entity = IAlbum | IPlaylist | ISong

export function flattenRecord<T extends Entity>(
    record: Record<string, T>,
    item: T[]
): Record<string, T> {

    const updateItem = { ...record };
    item.forEach(x => {
        updateItem[x.id] = x
    })

    return updateItem;
}


