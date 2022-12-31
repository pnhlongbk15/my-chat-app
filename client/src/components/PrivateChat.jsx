import React, { useEffect, useRef } from 'react'

import { v4 as uuidv4 } from "uuid";
import Logout from "./Logout";
import Messages from "./Messages";

const PrivateChat = ({ currentChat, statusChat, messages, currentUser }) => {
    const scrollRef = useRef();

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
    }, [messages]);
    console.log(currentUser)
    return (
        <React.Fragment>
            <div className="chat-header">
                <div className="user-details">
                    <div className="avatar">
                        <img
                            alt="avatar"
                            src={`data:image/svg+xml;base64,${currentChat?.avatarImage}`}
                        />
                    </div>
                    <div className="username">
                        <h3>{currentChat?.username}</h3>
                        <p>{statusChat}</p>
                    </div>
                </div>
                <Logout />
            </div>
            <div className="chat-messages">
                {messages?.map((message) => (
                    <div key={uuidv4()} ref={scrollRef}>
                        <div
                            className={`message ${message.fromSelf ? "sended" : "recieved"
                                }`}
                        >
                            {!message?.fromSelf && (
                                <div className='avatar-recieved'>
                                    <img
                                        src={`data:image/svg+xml;base64,${currentChat?.avatarImage}`}
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

export default PrivateChat
