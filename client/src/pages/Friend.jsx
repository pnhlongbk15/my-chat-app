import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";

import { host, allUsersRoute } from "../utils/APIRoutes";

import ContactFriends from "../components/ContactFriends";
import Welcome from "../components/Welcome";
import FriendChat from "../components/FriendChat";

export default function Friend() {
  const socket = useRef();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(undefined);
  const [friends, setFriends] = useState([]);
  const [currentChat, setCurrnetChat] = useState(undefined);
  const [statusChat, setStatusChat] = useState(undefined);

  const handleChatChange = (friend) => {
    setCurrnetChat(friend);
    if (friend) {
      socket.current.emit("check-status", friend.username)
      socket.current.on("response-status", status => {
        setStatusChat(status)
      })
    }
  };


  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser.username)
    }
  }, [currentUser])

  useEffect(() => {
    (async function () {
      if (!localStorage.getItem("chat-app-user")) {
        navigate("/login")
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")))
      }
    })()
  }, [])

  useEffect(() => {
    (async function () {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          try {
            const { data } = await axios.get(`${allUsersRoute}/${currentUser._id}`)
            data.status && setFriends(data.listFriend)
          } catch (error) {
            console.log(error)
          }
        } else {
          navigate("/setAvatar")
        }
      }
    })()
  }, [currentUser])



  return (
    <>
      <Container>
        <div className="container">
          <ContactFriends
            currentUser={currentUser}
            contacts={friends}
            changeChat={handleChatChange}
          />
          {currentChat ? (
            <FriendChat
              statusChat={statusChat}
              currentChat={currentChat}
              currentUser={currentUser}
              socket={socket}
            />

          ) : (
            <Welcome currentUser={currentUser} />
          )}

        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;
