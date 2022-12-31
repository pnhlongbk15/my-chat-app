import React, { useState, useEffect, useRef } from "react";

import styled from "styled-components";
import axios from "axios";

import Logo from "../assets/logo.svg";
import Search from "./Search";
import { searchRoute, addFriendRoute } from "../utils/APIRoutes";
import AddIcon from '@mui/icons-material/Add';
import DoneIcon from '@mui/icons-material/Done';

export default function ContactFriends({ contacts, currentUser, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [chatSelected, setChatSelected] = useState(undefined);
  const [onSearch, setOnSearch] = useState(false);
  const [searched, setSearched] = useState([])
  const search = useRef();
  const [isFriend, setIsFriend] = useState(false);

  const changeCurrentChat = (index, contact) => {
    if (onSearch) {
      contacts.forEach((contact, index) => {
        if (contact.username === searched[0].username) {
          contacts.splice(index, 1)
        }
      })
      contacts.unshift(...searched)
      setOnSearch(false)
    }

    setChatSelected(index);
    changeChat(contact);
  };


  const handleSearch = async (e) => {
    e.preventDefault()
    setOnSearch(true)
    const username = search.current.value;
    const { data } = await axios.get(`${searchRoute}/${username}`)
    if (currentUser.listFriend.includes(data.user._id)) {
      setIsFriend(true)
    }
    setSearched([data.user])
  }

  const addFriend = async (contact) => {
    const { data } = await axios.post(addFriendRoute, {
      userId: currentUser._id,
      friendId: contact._id
    })
  }

  useEffect(() => {
    if (currentUser) {
      setCurrentUserImage(currentUser.avatarImage);
      setCurrentUserName(currentUser.username);
    }
  }, [currentUser]);

  return (
    <>
      {currentUserImage && currentUserName && (
        <Container>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h3>snappy</h3>
          </div>
          <div className="contact">
            <Search handleSearch={handleSearch} useRef={search} />
            {(function () {
              return onSearch ? searched : contacts
            })().map((contact, index) => (
              <div
                className={`contact ${index === chatSelected ? "selected" : ""
                  }`}
                key={index}
                onClick={() => changeCurrentChat(index, contact)}
              >
                <div className="avatar">
                  <img
                    alt="avatar"
                    src={`data:image/svg+xml;base64,${contact?.avatarImage}`}
                  />
                </div>
                <div className="username">
                  <h3>{contact?.username}</h3>
                </div>
                {onSearch &&
                  <div className="add">
                    {isFriend ? <DoneIcon color="secondary" /> : <AddIcon color="secondary" onClick={() => addFriend(contact)} />}
                  </div>
                }
              </div>
            ))}
          </div>
          <div className="current-user">
            <div className="avatar">
              <img
                alt="avatar"
                src={`data:image/svg+xml;base64,${currentUserImage}`}
              />
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #080420;
  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
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