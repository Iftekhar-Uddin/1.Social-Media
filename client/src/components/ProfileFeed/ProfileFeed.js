import React, { useContext, useEffect, useState } from 'react'
import './profileFeed.css'
import Share from '../Share/Share.js'
import Post from '../Post/Post.js'
import axios from 'axios';
import { AuthContext } from '../../Context/AuthContext/AuthContext';
import { PostContext } from '../../Context/PostContext/PostContext';
import VarificationRequest from '../../VarificationRequest/VarificationRequest.js'


const ProfileFeed = ({username}) =>  {
  const [posts, setPosts] = useState([]);
  const {dispatch} = useContext(PostContext);
  const {user} = useContext(AuthContext);
  const api = VarificationRequest();

  useEffect(() => {
    const fetchProfileUserData = async () => {
      try {
        const res = await axios.get(`${api}/posts/profile/${username}`);
        setPosts(
          res.data.sort((p1, p2) => {
           return new Date(p2.createdAt) - new Date(p1.createdAt);
          })
        )
        dispatch({ type: "FETCH_ALL", payload: res.data});
      } catch (error) {
        console.log(error)
      }
    };
    fetchProfileUserData();
  },[username, dispatch]);

  return (
    <div className="feed">
      <div className="feedWrapper"/>
      { username === user?.result?.username && <Share/>}
      {posts.map((p) => (
        <Post key={p._id} post={p}/>
      ))}
    </div>
  )
}

export default ProfileFeed;