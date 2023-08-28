import React from "react";
import TimeAgo from 'javascript-time-ago'
import ReactTimeAgo from 'react-time-ago'

import en from 'javascript-time-ago/locale/en.json'
import ru from 'javascript-time-ago/locale/ru.json'
import { Link } from "react-router-dom";
TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(ru)


const Post = ({title,content,summary,author,_id,cover,createdAt}) => {
  const date = new Date(createdAt).getTime()
  return (
    <div  className="post" >
      <div className="image">
        <Link to={`/post/${_id}`}>
            <img src={'http://localhost:4000/'+cover}/>
        </Link>
      
      </div>
      <div className="content">
        <h2>
        <Link to={`/post/${_id}`}>
             {title} 
        </Link>
        </h2>
        <p className="info">
          <a className="author">{author.username}</a>
          <time><ReactTimeAgo date={date} locale="en-US"/> </time>
        </p>

        <p className="summary">
          {summary}
        </p>
      </div>
    </div>
  );
};

export default Post;
