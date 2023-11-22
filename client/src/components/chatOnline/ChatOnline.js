import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './chatonline.css'
import VarificationRequest from '../../VarificationRequest/VarificationRequest.js'


const ChatOnline = ({onlineUsers, currentUserId, setCurrentChat}) => {
  const [friends, setFriends] = useState([]);
  const [onlineActiveFriends, setOnlineActiveFriends] = useState([]);
  const api = VarificationRequest();

  useEffect(() => {
    const getfriends = async () => {
      const res = await axios.get(`${api}/users/friends/${currentUserId}`);
      setFriends(res.data)
    }
    getfriends();
  },[currentUserId]);

  console.log(friends)
  console.log(onlineUsers)

  useEffect(() => {
    setOnlineActiveFriends(friends.filter((f) => onlineUsers.includes(f._id)));
  }, [friends, onlineUsers]);

  const handleClick = async (user) => {
    try {
      const res = await axios.get(`${api}/conversations/find/${currentUserId}/${user._id}`)
      setCurrentChat(res.data)
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="chatOnline">
    {onlineActiveFriends?.map((friend) => (
      <div className="chatOnlineFriend" onClick={()=>{handleClick(friend)}}>
        <div className="chatOnlineImageContainer">
            <img className="chatOnlineImage" src={friend?.profilePicture || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp6_RVjqsnYl8AV72tFiEdyimGkQyRkcjMyyTG-bYcow&s"}  alt=""/>
            <div className="chatOnlineBadge"></div>
        </div>
        <span className="chatOnlineName">{friend?.username}</span>
      </div>
      ))}
    </div>
  )
}

export default ChatOnline
