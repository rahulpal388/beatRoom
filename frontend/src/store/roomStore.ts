import { create } from "zustand";


type IMembers = {
    userId: string;
    username: string;
    isOnline: boolean;
    currentListeningSong: string | null;
    isAdmin: boolean
}

type IRoom = {
    roomId: string;
    roomName: string;
    members: IMembers[]
}

type RoomStoreActionType = {
    addRoom(roomInfo: IRoom): void;
    removeRoom(roomId: string): void;
    removeMember(userId: string, roomId: string): void;
    addMember(memberInfo: IMembers, roomId: string): void;
}

type RoomStoreType = {
    room: Record<string, IRoom>;
    actions: RoomStoreActionType
}


export const useRoomStore = create<RoomStoreType>((set, get) => ({
    room: {},
    actions: {
        addRoom: (roomInfo => {


            set(state => ({
                room: {
                    ...state.room,
                    [roomInfo.roomId]: roomInfo
                }
            }))
        }),
        removeRoom: (roomId => {


            set(state => {
                const { [roomId]: _, ...remainingRooms } = state.room
                return { room: remainingRooms }
            })
        }),
        removeMember: ((userId, roomId) => {
            set(state => {
                const room = state.room?.[roomId]

                if (!room) return state

                const updatedMembers = room.members.filter(
                    (member) => member.userId !== userId
                )

                return {
                    room: {
                        ...state.room,
                        [roomId]: {
                            ...room,
                            members: updatedMembers
                        }
                    }
                }
            })
        }),
        addMember: ((memberInfo, roomId) => {
            set(state => {
                const room = state.room?.[roomId]

                if (!room) return state

                return {
                    room: {
                        ...state.room,
                        [roomId]: {
                            ...room,
                            members: [...room.members, memberInfo]
                        }
                    }
                }
            })
        })
    }
}))