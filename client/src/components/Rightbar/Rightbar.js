import React from 'react'
import './rightbar.css'
import Online from '../Online/Online'
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext/AuthContext"
import { useContext, useEffect, useState, useRef } from "react"
import {io} from 'socket.io-client'
import VarificationRequest from '../../VarificationRequest/VarificationRequest.js'

const Rightbar = () => {
  const { user } = useContext(AuthContext);
  const [friends, setFriends] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const id = user.result._id;
  const socket = useRef();
  const api = VarificationRequest();


  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get(`${api}/users/friends/${id}`);
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user]);


  useEffect(() => {
    socket.current = io("ws://localhost:7000");
  }, []);

  useEffect(() => {
    socket.current.emit("addUser", user.result._id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(
        user.result.followings.filter((f) => users.some((u) => u.userId === f))
      );
    });
  },[user]);

  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
  }, [friends, onlineUsers]);

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        <div className="birthdayContainer">
          <img 
            className="birthdayImage" 
            src= {"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVg4MfLKfz21mmSHdJmrMFfyKE-z8c0pLWjw&usqp=CAU"} 
            alt=""
          />
          <span className="birthdayText"><b>Marina Afrin</b> and <b>2 other friends</b> birthday today.</span>
        </div>
        <img 
          className="rightbarAdd" 
          src= {"https://www.shutterstock.com/image-vector/birthday-cake-vector-background-design-600nw-2203971617.jpg"} 
          alt=""
        />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {onlineFriends.map((friend) => (
            <Online key={friend.id} activeFriend={friend} />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Rightbar
