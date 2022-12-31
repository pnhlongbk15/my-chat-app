import React, { useEffect, useRef } from 'react'

import { v4 as uuidv4 } from "uuid";
import Logout from "./Logout";

const RoomChat = ({ messages, currentRoom, avatar }) => {
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

  return (
    <React.Fragment>
      <div className='chat-header'>
        <div className='room-details'>
          <div className='name'>{currentRoom.name}</div>
        </div>
      </div>
      <div className='chat-messages'>
        {messages.map((message) => (
          <div key={uuidv4()} ref={scrollRef}>
            <div
              className={`message ${message.fromSelf ? "sended" : "recieved"
                }`}
            >
              {!message.fromSelf && (
                <div className='avatar-recieved'>
                  <img
                    src={`data:image/svg+xml;base64,${message.avatarImage}`}
                    alt='img'
                  />
                </div>
              )}
              <div className="content">
                <p>{message.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </React.Fragment>
  )
}

export default RoomChat
