import React from 'react';
import Navbar from './Navbar';
import RoomList from './RoomList';

const AppLayout = () => {
    return (
        <div>
        <Navbar />
        <RoomList />
      </div>
    );
};

export default AppLayout;