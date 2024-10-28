'use client'
import { getUser } from '@/domain/services/api'
import Link from 'next/link'
import React, { Suspense, useEffect, useState } from 'react'

// import { GETUser } from './api/route'


// const GETUser = async () => {
//     const res = await fetch('https://670e3a38073307b4ee45facf.mockapi.io/users')

//     if (!res.ok) {
//         throw new Error('fetch user error!');
//     }
//     return res.json()
// }

const Page = () => {
    const [data, setData] = useState([])
    console.log(`⩇⩇:⩇⩇🚨  file: page.jsx:18  data :`, data);



    const fetchDate = async () => {

        try {
            const result = await getUser();
            setData(result)

        } catch (error) {
            console.log(`⩇⩇:⩇⩇🚨  file: page.jsx:26  error :`, error);


        }


    }


    useEffect(() => {
        fetchDate();
    }, [])

    return (
        <Suspense fallback={<p>Loading...</p>}>
            <h1>Page</h1>
            {data.map((user, index) => (
                <>
                    <p>ลำดับ{index + 1} -  {user.name} อายุ : {user.age} ปี  <Link href={`/home/${user.id}`}>เพิ่มเติม...</Link></p>


                </>
            ))}

        </Suspense>
    )
}

export default Page