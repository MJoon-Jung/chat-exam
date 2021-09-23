import React, { useCallback } from 'react';
import { createRoom, joinRoom, searchRoom } from '../actions/user';
import userSlice from '../features/userSlice';
import useInput from '../hooks/useInput';
import { useAppDispatch, useAppSelector } from '../store/store';

const WaitingRoom = () => {

    const { joinRoomError, joinRoomDone, joinRoomLoading, searchRoomDone, searchRoomError, searchRoomLoading } = useAppSelector((state) => state.userSlice)

    const [createName, onChangeCreateName, setCreateName] = useInput('');
    const [joinName, onChangeJoinName, setJoinName] = useInput('');

    const dispatch = useAppDispatch();

    const setupValue = useCallback(() => {
        setCreateName('');
        setJoinName('');
    }, [setCreateName, setJoinName])
    

    const onClickCreateListener = useCallback(() => {
        dispatch(createRoom(createName));
        setupValue();
    }, [dispatch, createName, setupValue]);

    const onClickJoinListener = useCallback(async () => {
        const room: any = await dispatch(searchRoom(joinName))
        const roomInfo = room.payload;
        if(searchRoomError) {
            alert('잘못된 룸 이름입니다.')
            setupValue();
            return;
        }
        const ans = window.confirm(`${roomInfo[0].name}에 입장하시겠습니까?`)
        if(ans) {
            const z = await dispatch(joinRoom(roomInfo[0].id))
            if(joinRoomDone) {
                alert('입장 성공');
            }
            if(joinRoomError) {
                alert('입장 실패');
            }
        }
        setupValue();
        
    }, [dispatch, joinName, setupValue, joinRoomDone, joinRoomError, searchRoomError]);

    return (
        <div className="p-24">
            <div>
                <input type="text" value={createName} onChange={onChangeCreateName} className="rounded-sm px-4 py-3 mt-3 focus:outline-none bg-red-100" placeholder="channel name" />
                <button onClick={onClickCreateListener} className="py-3 px-6 text-white rounded-lg bg-purple-600 shadow-lg block md:inline-block">채널 방 생성하기</button>
            </div>
            <div>
            <input type="text" value={joinName} onChange={onChangeJoinName} className="rounded-sm px-4 py-3 mt-3 focus:outline-none bg-red-100" placeholder="channel name" />
                <button onClick={onClickJoinListener} className="py-3 px-6 text-white rounded-lg bg-green-400 shadow-lg block md:inline-block">채널 방 참여하기</button>
            </div>
        </div>
    );
};

export default WaitingRoom;