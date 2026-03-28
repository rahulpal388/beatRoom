import { create } from "zustand";



export type IRoom = {
    roomId: string;
    roomName: string;

}

type RoomStoreActionType = {
    addRoom(roomInfo: IRoom): void;
    addRooms(roomInfo: IRoom[]): void;
    removeRoom(roomId: string): void;
}

type RoomStoreType = {
    room: IRoom[];
    actions: RoomStoreActionType
}


export const useRoomStore = create<RoomStoreType>((set, get) => ({
    room: [],
    actions: {
        addRooms: (roomInfo => {
            set(state => ({
                room: roomInfo
            }))
        }),
        addRoom: (roomInfo => {
            set(state => ({
                room: [...state.room, roomInfo]
            }))
        }),
        removeRoom: (roomId => {


            set(state => {
                const remainingRooms = get().room.filter(x => x.roomId !== roomId);
                return { room: remainingRooms }
            })
        }),

    }
}))