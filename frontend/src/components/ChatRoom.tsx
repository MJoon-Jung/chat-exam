import React, { useCallback, useState } from 'react';
import { loadRoomChats } from '../actions/user';
import { setCurrentRoom } from '../features/userSlice';
import { useAppDispatch, useAppSelector } from '../store/store';
import ChatLayout from './ChatLayout';
import Profile from './Profile';
import RoomCard from './RoomCard';
import RoomLogo from './RoomLogo';

const ChatRoom = () => {

    const { roomsInfo, myInfo, currentRoom } = useAppSelector((state) => state.userSlice);
    const dispatch = useAppDispatch();

    const loadRoomChat = useCallback((id: number) => {
      dispatch(loadRoomChats(id));
      dispatch(setCurrentRoom({ currentRoom: id }));
  }, [dispatch]);

    return (
        <div className="flex h-screen antialiased text-gray-800">
    <div className="flex flex-row h-full w-full overflow-x-hidden">
      <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
        <div className="flex flex-row items-center justify-center h-12 w-full">
          <RoomLogo />
        </div>
        <Profile name={myInfo?.nickname} />
        <div className="flex flex-col mt-8">
          <div className="flex flex-row items-center justify-between text-xs">
            <span className="font-bold">MY ROOM</span>
            <span
              className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full"
              >{ roomsInfo ? roomsInfo.length : 0 }</span>
          </div>
          <div className="flex flex-col space-y-1 mt-4 -mx-2 h-48 overflow-y-auto">
            { roomsInfo 
              ?
            roomsInfo.map((room: any) => <RoomCard room={room} loadRoomChat={loadRoomChat} />)
              :
              null
            }
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-auto h-full p-6">
        { currentRoom ? <ChatLayout /> : null }
      </div>
    </div>
  </div>
    );
};

export default ChatRoom;