import React from 'react';
import { Link } from 'react-router-dom';

const RoomList = () => {
    return (
        <div className="float-left">
        <nav className="flex flex-col bg-purple-900 w-64 h-screen px-4 tex-gray-900 border border-purple-900">
          <div className="flex flex-wrap mt-8" />
          <div className="mt-10 mb-4">
            <ul className="ml-4">
              <li><h2 className="text-white">My Rooms</h2></li>
              <li className="mb-2 px-4 py-4 text-gray-100 flex flex-row  border-gray-300 hover:text-black   hover:bg-gray-300  hover:font-bold rounded rounded-lg">
                <span>
                  <svg className="fill-current h-5 w-5" viewBox="0 0 24 24">
                    <path
                      d="M12 4a4 4 0 014 4 4 4 0 01-4 4 4 4 0 01-4-4 4 4 0
                            014-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4
                            8-4z"
                    />
                  </svg>
                </span>
                <Link to="">
                  <span className="ml-2">Team</span>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
};

export default RoomList;