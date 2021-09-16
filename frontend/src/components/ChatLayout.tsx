import React from 'react';
import { useAppSelector } from '../store/store';
import ChatForm from './ChatForm';
import MyChat from './MyChat';
import OtherChat from './OtherChat';

const ChatLayout = () => {

  const { myInfo, chatsInfo, currentRoom, loadRoomChatsLoading } = useAppSelector((state) => state.userSlice);
  const { ChannelChats }: any = chatsInfo;


    return (
        <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
          { loadRoomChatsLoading 
          ? 
          <h1>Loading</h1>
          :
          <>
          <div className="flex flex-col h-full overflow-x-auto mb-4">
            <div className="flex flex-col h-full">
              <div className="grid grid-cols-12 gap-y-2">
                { ChannelChats.map((chat: any) => chat.UserId === myInfo.id 
                ? 
                <MyChat userId={chat.UserId} content={chat.content}/> 
                : 
                <OtherChat userId={chat.UserId} content={chat.content} />)}
                {/* <OtherChat />
                <MyChat /> */}
              </div>
            </div>
          </div>
          <ChatForm />
          </>
        }
          
        </div>
    );
};

export default ChatLayout;