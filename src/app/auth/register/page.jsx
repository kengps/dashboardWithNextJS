'use client'
import React, { useEffect, useState } from 'react'
import FormRegister from '@/components/forms/FormRegister'
import { registerSchema } from '@/utils/zodSchema/register'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import axios from 'axios'
import { toast } from 'react-toastify'
// import { useQuery } from 'react-query'

import { useQuery } from "@tanstack/react-query";


const RegisterPage = () => {

    const [loadings, setLoadings] = useState(false)

    const { register, handleSubmit, watch, control, formState: { errors }, } = useForm({
        resolver: zodResolver(registerSchema)
    })
    //  //1 login โดยการใช้ useForm
    //  const { register, handleSubmit, formState: { errors }, } = useForm({
    //     resolver: zodResolver(registerSchema)
    // });

    const passwords = watch('password');
    const cfpassword = watch('cfpassword');
    const passwordsMatch = passwords === cfpassword;


    const currencies = [
        {
            value: 'admin',
            label: 'Admin',
        },
        {
            value: 'member',
            label: 'Member',
        },

    ];


    const fetchData = async ({ queryKey }) => {
        const url = `http://localhost:3000/api/profiles`;

        try {
            const res = await fetch(url);

            if (!res.ok) {
                throw new Error(`Error: ${res.status} ${res.statusText}`);
            }

            // Await the JSON response
            // const profiles = await res.json();
            // console.log(`⩇⩇:⩇⩇🚨  file: page.jsx:54  profiles :`, profiles);

            // // Transform the data as needed (example: map over profiles)
            // const transformedData = profiles.map(profile => ({
            //     ...profile,
            //     // Example transformation: adding a fullName property
            //     fullName: `${profile.firstName} ${profile.lastName}`, // Adjust this based on your profile structure
            // }));

            // console.log(`⩇⩇:⩇⩇🚨  file: page.jsx:56  transformedData :`, transformedData.role);
            return res.json();
        } catch (error) {
            console.error("Error fetching data:", error);
            throw error; // Propagate error for `useQuery` to catch
        }
    };

    const [result, setResult] = useState([])
    const { isLoading, isError, data, error, refetch } = useQuery({


        queryKey: ['fetchData'],
        queryFn: fetchData,
    });


   
    //     // Check if data is an array before mapping
    // const roles = Array.isArray(data) ? data.map(profile => profile.role) : [];

    if (isLoading) {
        return <span>Loading...</span>;
    }

    if (isError) {
        return <span>Error: {error.message}</span>;
    }



    // ตรวจสอบว่า data.role มีอยู่และเป็นอาร์เรย์
    const roles = Array.isArray(data.role) ? data.role.map(role => ({

        _id: role._id,
        name: role.name,
        roleMember: role.roleMember,
        defaultPermissions: role.defaultPermissions,
        createdAt: role.createdAt,
        __v: role.__v,
    })) : []; // ถ้าไม่มีข้อมูลให้คืนค่าเป็นอาร์เรย์ว่าง


    // วิธีที่ 1

    const names = Array.isArray(data.role) ? Object.values(data.role).map(role => role.name) : [];

    const names4 = Array.isArray(data) ? Object.values(data).map(role => role) : [];
    




    const names2 = Array.isArray(data.role) ? data.role.filter(role => role.name).map(role => role.name) : [];

    // วิธีที่ 3

    const role = Array.isArray(data.role) ? data.role.map(role => role.name) : [];


    const mapFromObject = new Map(Object.entries(data.role));
    const values = mapFromObject.values();
    const valueArray = []; // สร้างอาเรย์เพื่อเก็บค่า
    for (const value of values) {
        valueArray.push(value)
    }



    const onFinish = async (values) => {
        console.log(`⩇⩇:⩇⩇🚨  file: page.jsx:137  values :`, values);

        // try {


        //     const { username, password, cfpassword, role } = values

        //     // const url = `http://localhost:3000/api/profiles/${role}s`;
        //     const url = `http://localhost:3000/api/profiles`;


        //     await axios.post(url, values).then((res) => {
        //         toast.success(res.data.message)
        //     }).catch((err) => {
        //         console.log('err', err);

        //     })



        // } catch (error) {
        //     console.log(`⩇⩇:⩇⩇🚨  file: page.jsx:45  error :`, error);


        // }
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <FormRegister
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            handleSubmit={handleSubmit}
            register={register}
            errors={errors}
            loadings={loadings}
            passwordsMatch={passwordsMatch}
            currencies={currencies}
            data={roles}
            role={role}
            control={control}
        />
    )
}

export default RegisterPage