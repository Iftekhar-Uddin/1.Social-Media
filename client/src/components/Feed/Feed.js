import React, { useContext, useEffect} from 'react'
import axios from 'axios'
import './feed.css'
import Share from '../Share/Share.js'
import Post from '../Post/Post.js'
import { AuthContext } from '../../Context/AuthContext/AuthContext'
import { PostContext } from '../../Context/PostContext/PostContext'
import VarificationRequest from '../../VarificationRequest/VarificationRequest.js'


const Feed = () =>  {
  const {user} = useContext(AuthContext);
  const {posts, dispatch} = useContext(PostContext);
  const userid = user.result._id;
  const api = VarificationRequest();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`${api}/posts/timeline/${userid}`);
          res.data.sort((p1, p2) => (
            new Date(p2.createdAt) - new Date(p1.createdAt)
          ))
        dispatch({ type: "FETCH_ALL", payload: res.data});
      } catch (error) {
        console.log(error)
      }
    };
    fetchPosts();
  },[user?.result?._id, dispatch]);

  return (
    <div className="feed">
      <div className="feedWrapper"/>
      <Share/>
      {posts?.map((p) => (
        <Post key={p._id} post={p}/>
      ))}
    </div>
  )
}

export default Feed;
