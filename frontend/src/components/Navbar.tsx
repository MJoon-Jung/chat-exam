import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../actions/user';
import { useAppDispatch, useAppSelector } from '../store/store';
const Navbar = () => {

  const { myInfo } = useAppSelector((state) => state.userSlice);
  const dispatch = useAppDispatch();
  const logoutHandler = useCallback(() => {
    dispatch(logout())
      .then(() => {
        window.location.replace('/');
      })
  }, [dispatch])
  return (
      <nav>
      <div className="">
        <div className="flex justify-between h-16 px-10 shadow items-center">
          <div className="flex items-center space-x-8">
            <div className="hidden md:flex justify-around space-x-4">
              <Link to="/" className="hover:text-indigo-600 text-gray-700">Home</Link>
              <Link to="/room" className="hover:text-indigo-600 text-gray-700">Room</Link>
            </div>
          </div>
          
            { myInfo && myInfo.id 
              ?
              <button onClick={logoutHandler} className="bg-indigo-600 px-4 py-2 rounded text-white hover:bg-indigo-500 text-sm">Logout</button>
              : 
              <div className="flex space-x-4 items-center">  
                <Link to="login" className="bg-indigo-600 px-4 py-2 rounded text-white hover:bg-indigo-500 text-sm">LOGIN</Link>
                <Link to="register" className="bg-indigo-600 px-4 py-2 rounded text-white hover:bg-indigo-500 text-sm">SIGNUP</Link>
              </div>
            }
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

// { myInfo && myInfo.id 
//   ? 
//   <Link to="/room" className="hover:text-indigo-600 text-gray-700">Room</Link>
//   :
//   null
//   }