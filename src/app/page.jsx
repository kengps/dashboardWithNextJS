'use client'
import React, { useState, useEffect } from 'react'

export default function Page() {

  const [postData, setPostData] = useState([]);
  console.log(`⩇⩇:⩇⩇🚨  file: page.jsx:7  postData :`, postData);


  console.log(postData);

  const getPosts = async () => {
    try {
     // const res = await fetch("http://localhost:8080/api/admins/posts", {
      const res = await fetch("http://localhost:8080/api/admins/posts", {
        cache: "no-store"
      });

      if (!res.ok) {
        throw new Error("Failed to fetch posts");
      }
   
      const data = await res.json();
      setPostData(data.admins);

    } catch(error) {
      console.log("Error loading posts: ", error);
    }
  }
  useEffect(() => {

    getPosts();
  }, []);

  
  return (
    <h2 className='bg-red-300'>Hello welcome Page432423423</h2>
  );
}
