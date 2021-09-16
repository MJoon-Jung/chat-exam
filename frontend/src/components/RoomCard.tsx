import React, { useCallback } from 'react';

const RoomCard = ({ room, loadRoomChat }: any) => {

    const handleLoadRoomChat = useCallback(() => {
        loadRoomChat(room.id);
    }, [loadRoomChat, room.id]);

    return (
        <button onClick={ handleLoadRoomChat } className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
            <div className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
                { room.id }
            </div>
            <div className="ml-2 text-sm font-semibold">{ room.name }</div>
        </button>
    );
};

export default RoomCard;
