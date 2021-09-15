import React from 'react';
import { Link } from 'react-router-dom';

const RoomCard = ({ room }: any) => {
    return (
        <Link to="#" className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
            <div className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
                { room.id }
            </div>
            <div className="ml-2 text-sm font-semibold">{ room.name }</div>
        </Link>
    );
};

export default RoomCard;
