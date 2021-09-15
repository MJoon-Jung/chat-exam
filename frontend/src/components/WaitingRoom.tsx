import React, { useCallback } from 'react';
import { createRoom, searchRoom } from '../actions/user';
import useInput from '../hooks/useInput';
import { useAppDispatch } from '../store/store';

const WaitingRoom = () => {

    const [createName, onChangeCreateName] = useInput('');
    const [joinName, onChangeJoinName] = useInput('');

    const dispatch = useAppDispatch();

    // const onClickCreateListener = (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     dispatch(createRoom(createName));
    // }

    const onClickCreateListener = useCallback(() => {
        dispatch(createRoom(createName));
    }, [dispatch, createName]);

    const onClickJoinListener = useCallback(async () => {
        const room = await dispatch(searchRoom(joinName))
        alert(room);
    }, [dispatch, joinName]);

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