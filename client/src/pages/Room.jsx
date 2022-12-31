import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

import ContactRooms from "../components/ContactRooms";
import RoomChat from "../components/RoomChat";
import Welcome from "../components/Welcome";
import { host, getAllRoomsRoute } from "../utils/APIRoutes";

export default function Room() {
    const socket = useRef();
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(undefined);

    const [rooms, setRooms] = useState([]);
    const [currentRoom, setCurrentRoom] = useState(undefined);

    const handleRoomChange = (room) => {
        setCurrentRoom(room)
        // console.log('handle',room.name)
        if (room.name) {
            socket.current.emit("join_room", room.name, currentUser.username);
        }
    };
    useEffect(() => {
        (async function () {
            if (currentUser) {
                if (currentUser.isAvatarImageSet) {
                    try {
                        const { data } = await axios.get(getAllRoomsRoute)
                        data.status && setRooms(data.rooms)
                    } catch (error) {
                        console.log(error)
                    }
                } else {
                    navigate("/setAvatar")
                }
            }
        })()
    }, [currentUser])

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

    return (
        <>
            <Container>
                <div className="container">
                    <ContactRooms
                        currentUser={currentUser}
                        contacts={rooms}
                        changeRoom={handleRoomChange}
                        setRooms={setRooms}
                    />
                    {currentRoom ? (
                        <RoomChat
                            currentRoom={currentRoom}
                            currentUser={currentUser}
                            socket={socket}
                        />

                    ) : (
                        <Welcome currentUser={currentUser} />
                    )}

                </div>
            </Container>
        </>
    )
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