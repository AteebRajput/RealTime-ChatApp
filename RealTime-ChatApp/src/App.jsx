import React, { useRef, useState } from 'react';
import Auth from './component/Auth';
import Cookies from "universal-cookie";
import Chat from './component/chat/Chat';
import { signOut } from 'firebase/auth';
import { auth } from './Config';
import './App.css';

const cookies = new Cookies();

const App = () => {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(null);
  const roomInputRef = useRef(null);

  const signOutUser = async () => {
    cookies.remove("auth-token");
    setIsAuth(false);
    signOut(auth);
    setRoom("");
  };

  if (!isAuth) {
    return (
      <div>
        <Auth setIsAuth={setIsAuth} />
      </div>
    );
  }

  return (
    <>
      <div className='main'>
        {
          room ? (
            <div>
              <Chat room={room} />
            </div>
          ) : (
            <div className='room'>
              <div className='heading'>
                <label htmlFor="">Enter room name</label>
              </div>
              <input type="text" placeholder="Enter room name" ref={roomInputRef} className="room-input" />
              <button onClick={() => setRoom(roomInputRef.current.value)}>Join room</button>
            </div>
          )
        }

        <div className='signout'>
          <button onClick={signOutUser}>Sign Out</button>
        </div>
      </div>
    </>
  );
};

export default App;
