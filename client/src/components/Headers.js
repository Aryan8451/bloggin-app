
import React, { useContext, useEffect } from 'react'
import { Link} from 'react-router-dom'
import {UserContext} from '../UserContext'




const Headers = () => {
  
  const {setUserInfo,userInfo}= useContext(UserContext)
    useEffect(()=>{
    fetch('http://localhost:4000/profile',{
      credentials:'include',
    }).then(response=>{
      response.json().then(userInfo=>{
        setUserInfo(userInfo)
      })
    })
  },[])
  function Logout(){
    fetch('http://localhost:4000/logout',{
      credentials:"include",
      method:"POSt"
    })
   setUserInfo(null)
  }
  const username =userInfo?.username
  return (
  <header>
    <Link to="/" className="logo" >
      MyBlog
    </Link>
       <nav>
      { username && (
          <>
          <Link to={"/create"}>create new post</Link>
          <Link onClick={Logout}>Logout({username})</Link>
          </>
        )  }
      {
        !username &&(
          <>
          <Link to="/login">login</Link>
      <Link to="/register">register</Link>
          </>
        )
      }
     
    </nav>
  </header>
  )
}

export default Headers