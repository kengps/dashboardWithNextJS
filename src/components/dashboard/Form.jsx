// components/dashboard/Form.js
'use client';

import React from 'react';
import { useSession, signIn, signOut } from "next-auth/react";

const ClientDashboard = () => {
    const { data: session } = useSession();
    // console.log(`⩇⩇:⩇⩇🚨  file: Form.jsx:9  session :`, session);

    if (!session) {
        return (
            <p>
                คุณยังไม่ได้ล็อกอิน
                <button onClick={() => signIn("credentials", { redirect: true })}>ล็อกอิน</button>

            </p>
        );
    }

    return (
        <div>
            <h1>ยินดีต้อนรับ {session?.user?.username}</h1>
            <button onClick={() => signOut({ callbackUrl: '/auth/login' })}>ออกจากระบบ</button>
        </div>
    );
};

export default ClientDashboard;
