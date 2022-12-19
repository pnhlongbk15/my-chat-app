import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import axios from 'axios';

import Logo from "../assets/logo.svg";
import { loginRoute } from "../utils/APIRoutes";

const toastOptions = {
  position: "bottom-right",
  autoClose: 8000,
  pauseOnHover: true,
  draggable: true,
  theme: "dark"
}

export default function Login() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const { password, username } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      })
      if (data.status === false) {
        toast.error(data.msg, toastOptions)
      }
      if (data.status === true) {
        localStorage.setItem('chat-app-user', JSON.stringify(data.user))
        if (data.user.isAvatarImageSet) {
          navigate("/")
        } else {
          navigate("/setAvatar")
        }
      }
    }
  };

  const handleValidation = () => {
    const { password, username } = values;

    if (username === "") {
      toast.error(
        "Username and password is required",
        toastOptions
      );
      return false;

    } else if (password === "") {
      toast.error(
        "Username and password is required",
        toastOptions
      );
      return false;

    }

    return true;
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (localStorage.getItem('chat-app-user')) {
      navigate('/')
    }
    setIsLoading(false)
  }, [])

  return (
    <>
      {!isLoading && (
        <>
          <FormContainer>
            <form onSubmit={handleSubmit}>
              <div className="brand">
                <img src={Logo} alt="logo" />
                <h1>snappy</h1>
              </div>
              <input
                type="text"
                placeholder="Username"
                name="username"
                onChange={handleChange}
                min="3"
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
              />
              <button type="submit">Login</button>
              <span>
                Don't have an account ? <Link to="/register">Register</Link>
              </span>
            </form>
          </FormContainer>
          <ToastContainer />
        </>
      )}
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 4rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
      font-size: 1.5rem;
    }
  }
  form {
    @media screen and (max-width: 1024px) {
      width: 60vw;
    }
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 35vw;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 4rem;
    input {
      background-color: transparent;
      padding: 0.8rem;
      border: 0.1rem solid #4e0eff;
      border-radius: 0.4rem;
      font-size: 0.8rem;
      color: white;
      width: 100%;
      &:focus {
        border: 0.1rem solid #997af0;
        outline: none;
      }
    }
    button {
      background-color: #997af0;
      color: white;
      font-weight: bold;
      font-size: 0.8rem;
      padding: 0.8rem 2rem;
      border: none;
      border-radius: 0.4rem;
      cursor: pointer;
      text-transform: uppercase;
      letter-spacing: 1px;
      &:hover {
        background-color: #4e0eff;
      }
    }
    span {
      align-self: center;
      color: white;
      font-size: 0.6rem;
      text-transform: uppercase;
      a {
        color: #4e0eff;
        text-decoration: none;
        font-weight: bold;
      }
    }
  }
`;
