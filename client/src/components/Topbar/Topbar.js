import React, {useContext} from 'react';
import {Search, Person, Chat, Notifications} from '@material-ui/icons';
import './topbar.css';
import {Link} from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext/AuthContext';
import { PostContext } from '../../Context/PostContext/PostContext';


const Topbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="topbarContainer">

        <div className="topbarLeft">
            <Link to='/' style={{textDecoration:"none"}}>
            <span className='logo'>Social Media</span>
            </Link>
        </div>

        <div className="topbarCenter">
            <div className='searchBar'>
                {/* <Search className="searchIcon"/> */}
                <input className="searchInput" placeholder='Search for friend and media'></input>
            </div>
        </div>

        <div className="topbarRight">
            <div className="topbarLinks">
            <Link to="/" style={{textDecoration: "none", color: "white"}}>
                <span className='topbarLink1'>Homepage</span>
                </Link>
                <span className='topbarLink23'>Timeline</span>
            </div>
            <div className='topbarIcons'>
                <div className='topbarIconItems'>
                    <Person/>
                    <span className="topbarIconBadge">2</span>
                </div>
                <div className='topbarIconItems'>
                    <Link to="/messenger">
                    <Chat style={{color: "white"}}/>
                    </Link>
                    <span className="topbarIconBadge">5</span>
                </div>
                <div className='topbarIconItems'>
                    <Notifications/>
                    <span className="topbarIconBadge">7</span>
                </div>
            </div>
            <div>
                <Link className="linkoftopbar" to={`/profile/${user?.result?.username}`}>
                    <img className="topbarImg" 
                    src={user? user?.result?.profilePicture : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp6_RVjqsnYl8AV72tFiEdyimGkQyRkcjMyyTG-bYcow&s"} 
                    alt=""    
                    />
                </Link>
            </div>
        </div>
    </div>
  )
};

export default Topbar;
