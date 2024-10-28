'use client'
import React, { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import FormLogin from '@/components/forms/FormLogin'
import { loginSchema } from '@/utils/zodSchema/login'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { persistMiddleware, storeAuth } from '@/store'
import { toast } from 'react-toastify';
import { signIn } from 'next-auth/react'

const LoginPage = () => {





    //1 login โดยการใช้ useForm
    const { register, handleSubmit, formState: { errors }, } = useForm({
        resolver: zodResolver(loginSchema)
    });

    const [loadings, setLoadings] = useState(false)
    const redirect = useRouter()


    //zustand
    const { Login } = persistMiddleware();

    //2 ทำการตรวจสอบ Role
    const checkLevelRole = async (data) => {
        if (data.user.role === 'user') {
            redirect.push('/member/homepage')
        } else {
            redirect.push('/dashboard')
        }
    }

    const onSubmit = async (value) => {
        console.log(`⩇⩇:⩇⩇🚨  file: page.jsx:42  value :`, value);


        setLoadings(true)





        try {
            // const result = await signIn('cre', {
            //     username: value.username,
            //     password: value.password,
            //     redirect: false
            // });
            // console.log(`⩇⩇:⩇⩇🚨  file: page.jsx:52  result :`, result);

            // if (result?.error) {
            //     // หากล็อกอินไม่สำเร็จ แสดงข้อความแสดงข้อผิดพลาด
            //     toast(`🦄 ${result.error}`, {
            //         position: "top-right",
            //         autoClose: 5000,
            //         hideProgressBar: false,
            //         closeOnClick: true,
            //         pauseOnHover: true,
            //         draggable: true,
            //         progress: undefined,
            //         theme: "light",
            //     });
            // } else {
            //     // หากล็อกอินสำเร็จ เปลี่ยนเส้นทางไปยังหน้าแดชบอร์ด
            //     redirect('/dashboard');
            // }

            const result = await signIn('credentials', {
                username: value.username,
                password: value.password,
                redirect: false
            })

            if (result.error) {
                console.error(result.error)
            } else {
                redirect.push('/dashboard')
            }


        } catch (error) {
            console.log(`⩇⩇:⩇⩇🚨  file: page.jsx:59  error :`, error);
            toast(`🦄 ${error.message}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } finally {
            setLoadings(false);
        }
    }

    return (

        <FormLogin
            register={register}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            errors={errors}
            loadings={loadings}
        />
    )
}

export default LoginPage