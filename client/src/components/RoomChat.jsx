import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";

import ChatInput from "./ChatInput";
import PublicChat from "./PublicChat";

import { sendMessageRoomRoute, getAllMsgRoomRoute } from "../utils/APIRoutes";


export default function RoomChat({ currentUser, currentRoom, socket }) {
   const [messages, setMessages] = useState([]);
   const [arrivalMessage, setArrivalMessage] = useState(null);

   const handleSendMsgRoom = async (msg) => {
      axios.post(sendMessageRoomRoute, {
         from: currentUser._id,
         room: currentRoom._id,
         message: msg
      })
      socket.current.emit("send_msg_room", {
         room: currentRoom.name,
         message: msg
      })
      const msgs = [...messages];
      msgs.push({ fromSelf: true, message: msg });
      setMessages(msgs);
   }
   useEffect(() => {
      arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
   }, [arrivalMessage]);

   useEffect(() => {
      if (currentRoom) {
         (async function () {
            const { data } = await axios.post(getAllMsgRoomRoute, {
               from: currentUser._id,
               room: currentRoom._id
            })
            setMessages(data.messages);
         })()
      }
   }, [currentRoom])

   useEffect(() => {
      socket.current.on("server_message", message => {
         // sự kiện này sẽ duy trì xuốt quá trình hoạt động
         console.log(message)
      })
   }, [])
   useEffect(() => {
      if (socket.current) {
         socket.current.on("msg_room_recieve", (msg) => {
            setArrivalMessage({ fromSelf: false, message: msg });
         });
      }
   }, [])
   return (
      <>
         {currentRoom && (
            <Container>
               <PublicChat
                  currentRoom={currentRoom}
                  messages={messages}
               />
               <ChatInput handleSendMsg={handleSendMsgRoom} />
            </Container>
         )}
      </>
   )
}

const Container = styled.div`
  padding-top: 1rem;
  display: grid;
  grid-template-rows: 10% 78% 12%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
        p {
          color: white;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #4f04ff21;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #9900ff20;
      }
      .avatar-recieved {
         width: 40px;
      }
    }
  }
`;
