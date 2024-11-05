'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { signIn, useSession } from 'next-auth/react'

import React, { useState, useEffect } from 'react'

export default function Page() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // const [postData, setPostData] = useState([]);



  // console.log(postData);

  // const getPosts = async () => {
  //   try {
  //     // const res = await fetch("http://localhost:8080/api/admins/posts", {
  //     const res = await fetch("http://localhost:8080/api/admins/posts", {
  //       cache: "no-store"
  //     });

  //     if (!res.ok) {
  //       throw new Error("Failed to fetch posts");
  //     }

  //     const data = await res.json();
  //     setPostData(data.admins);

  //   } catch (error) {
  //     console.log("Error loading posts: ", error);
  //   }
  // }
  // useEffect(() => {

  //   getPosts();
  // }, []);

  //* Redirect based on session role ถ้ามี session แล้ว จะตรวจสอบ role แล้วไปยังหน้านั้นๆ (วิธ๊นี้เป็นวิธีที่ 2 )
  useEffect(() => {
    if (session) {
      console.log(`⩇⩇:⩇⩇🚨  file: page.jsx:49  session :`, session);

      if (session.user.role === 'Admin') {
        router.push('/dashboard');
      } else if (session.user.role === 'Master') {
        router.push('/dashboard');
      } else {
        router.push('/member/homepage'); // เปลี่ยนเส้นทางตาม role
      }
    }
  }, [session, router]);


  // return (
  //   <h2 className='bg-red-300'>Hello welcome Page432423423</h2>
  // );
}
