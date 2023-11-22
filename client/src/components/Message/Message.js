import React, {useContext } from 'react'
import './message.css'
import moment from 'moment'
import { AuthContext } from '../../Context/AuthContext/AuthContext';

const Message = ({message, own}) => {
  const {user} = useContext(AuthContext);

    return (
      <div className={own ? "message own" : "message"}>
        <div className="mesaageTop">
          <img
            className="messageImg"
            src= {user.result.profilePicture || "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}
            alt=""
          />
          <p className="messageText">{message.text}</p>
        </div>
        <div className="messageBottom">{moment(message.createdAt).fromNow()}</div>
      </div>
    );
  }

export default Message
