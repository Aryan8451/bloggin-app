import React, { useEffect, useState } from 'react';
import Post from '../components/Post';

const Indexpage = () => {
  const [post, setPost] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/post');
        const posts = await response.json();
        setPost(posts);
       
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {post.length > 0 &&
        post.map((postItem) => (
          <Post key={postItem._id} {...postItem} />
        ))}
    </>
  );
};

export default Indexpage;
