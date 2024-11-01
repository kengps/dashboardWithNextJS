'use client'
import React, { useEffect, useState } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

import FormLogin from '@/components/forms/FormLogin'
import { loginSchema } from '@/utils/zodSchema/login'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { persistMiddleware, storeAuth } from '@/store'
import { toast, Zoom } from 'react-toastify';
import { signIn, useSession } from 'next-auth/react'


const LoginPage = () => {
    const searchParams = useSearchParams()
    const error = searchParams.get("error")
    const authRequired = searchParams.get("authRequired") // เปลี่ยนมาใช้ authRequired
    const router = useRouter();
    const { data: session, status } = useSession();



    useEffect(() => {

        if (authRequired) {
            toast.error('กรุณาล็อคอิน', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Zoom,
            });
        }

    }, [authRequired])

    //* Redirect based on session role ถ้ามี session แล้ว จะตรวจสอบ role แล้วไปยังหน้านั้นๆ (วิธีนี้จะมีแค่นี้ ไม่ต้องเพิ่ม middleware.js)
    useEffect(() => {
        if (session) {
            router.push('/')
        }
    }, [session, router]);

    //1 login โดยการใช้ useForm
    const { register, handleSubmit, formState: { errors }, } = useForm({
        resolver: zodResolver(loginSchema)
    });

    const [loadings, setLoadings] = useState(false)

    //zustand
    const { Login } = persistMiddleware();

    //2 ทำการตรวจสอบ Role
    const checkLevelRole = async (data) => {
        if (data.user.role === 'user') {
            router.push('/member/homepage')
        } else {

            if (session) {
                if (session.user.role === 'admin') {
                    router.push('/dashboard');
                } else {
                    router.push('/dashboard/setting'); // เปลี่ยนเส้นทางตาม role
                }
            }
        }
    }

    const onSubmit = async (value) => {
        console.log(`⩇⩇:⩇⩇🚨  file: page.jsx:74  value :`, value);


        setLoadings(true)
        try {


            const result = await signIn('credentials', {
                username: value.username,
                password: value.password,
                redirect: false
            })

            if (result.error) {
                toast.error(result.error);
            } else {

                router.push('/')
                // if (session) {
                //     if (session.user.role === 'admin') {
                //         router.push('/dashboard');
                //     } else {
                //         router.push('/dashboard/setting'); // เปลี่ยนเส้นทางตาม role
                //     }
                // }
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