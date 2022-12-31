import React, { useState, useEffect, useRef } from "react";

import styled from "styled-components";
import axios from "axios";

import { createRoomRoute } from "../utils/APIRoutes";
import AddIcon from '@mui/icons-material/Add';

export default function ContactRooms({ changeRoom, setRooms, contacts }) {

  const [roomSelected, setRoomSelected] = useState(undefined)

  const changeCurrentRoom = (index, room) => {
    setRoomSelected(index);
    changeRoom(room);
  }

  const handleCreateRoom = async () => {
    let room = prompt("Please enter your room:", "new_name");
    const { data } = await axios.post(createRoomRoute, {
      name: room
    })
    setRooms([...contacts, data.result])
  }

  
  return (
    <Container>
      <div className="create" onClick={handleCreateRoom}>
        <span>Create room</span>
        <AddIcon color="secondary" />
      </div>
      <div className="contact">
        {contacts.map((room, index) => (
          <div
            className={`contact ${index === roomSelected ? "selected" : ""
              }`}
            key={index}
            onClick={() => changeCurrentRoom(index, room)}
          >
            <div className="username">
              <h3>{room?.name}</h3>
            </div>
          </div>
        ))}
      </div> 
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #080420;
  .create {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    color: white;
    cursor: pointer;
    background-color: #ffffff39;
    img {
      height: 2rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }
  .contact {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .switch-box {
      display: flex;
      width: 100%;
      gap: 0.4rem;
      padding: 0 0.8rem;
      button {
        flex: 1;
        height: 2rem;
        background-color: #ffffff39;
        color: white;
        cursor: pointer;

        &.selected {
          background-color: #9186f3;
        }
      }
    }
    .contact {
      background-color: #ffffff39;
      min-height: 5rem;
      width: 90%;
      cursor: pointer;
      border-radius: 0.2rem;
      padding: 0.4rem;
      gap: 1rem;
      align-items: center;
      display: flex;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
      .add {
        z-index: 99;
      }
    }
    .selected {
      background-color: #9186f3;
    }
    
    .create {
      width: 90%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      background-color: #ffffff39;
      cursor: pointer;
    }
  }
  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      display: none;
      h2 {
        color: white;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;