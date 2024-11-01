'use client'
import React, { useEffect, useState } from 'react'
import FormRegister from '@/components/forms/FormRegister'
import { registerSchema } from '@/utils/zodSchema/register'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { toast } from 'react-toastify'

const RegisterPage = () => {

    const [loadings, setLoadings] = useState(false)

    const { register, handleSubmit, watch, formState: { errors }, } = useForm({
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


    const postData = async (values) => {
        await axios.post(`http://localhost:3000/api/profiles/${values.role}s`, values).then((res) => {
            console.log('====================================');
            console.log(res);
            console.log('====================================');
            alert(res)
        }).catch((err) => {
            console.log('err', err);

        })
    }



    const onFinish = async (values) => {
        try {


            const { username, password, cfpassword, role } = values

            const url = `http://localhost:3000/api/profiles/${role}s`;


            await axios.post(url, values).then((res) => {
                toast.success(res.data.message)
            }).catch((err) => {
                console.log('err', err);

            })



        } catch (error) {
            console.log(`⩇⩇:⩇⩇🚨  file: page.jsx:45  error :`, error);


        }
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
        />
    )
}

export default RegisterPage