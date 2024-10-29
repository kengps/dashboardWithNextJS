// src/app/api/auth/login/route.js
import { validateRequest, validateResult } from '@/domain/middleware/loginValidation';
import adminUser from '@/models/adminModel';
import memberUser from '@/models/memberModel';
import { withDBConnection } from '@/utils/hocRequest/hoc';

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
import { NextResponse } from 'next/server';


const loggedIn = async (request) => {
    console.log('====================================');
    console.log('ยังมีการทำงานที่นี้มั้ย');
    console.log('====================================');
    const req = await request.json(); // รับค่า JSON
  

    // ตรวจสอบค่าที่ได้รับ
    if (!req || !req.username || !req.password) {
        return NextResponse.json({ message: "Invalid input data." }, { status: 400 });
    }

    try {
        const body = { body: req }

        await validateRequest(body);
        const errors = validateResult(body);


        if (!errors.isEmpty()) {
            return NextResponse.json({ message: errors.array() }, { status: 400 });
        }

        const { username, password, role } = req;

        // ค้นหาผู้ใช้ใน adminUser
        let user = await adminUser.findOne({ username: { $regex: new RegExp(`^${username}$`, 'i') } });

        if (!user) {
            // ค้นหาใน memberUser ถ้าไม่พบใน adminUser
            user = await memberUser.findOne({ username: { $regex: new RegExp(`^${username}$`, 'i') } });

            if (!user) {
                return NextResponse.json({ message: "User or Admin is not found!" }, { status: 404 });
            }
        }

        // ตรวจสอบสถานะ enabled
        if (!user.enabled) {
            return NextResponse.json({ message: "Account is disabled" }, { status: 403 });
        }

        // ตรวจสอบรหัสผ่าน
        const passIsMatch = await bcrypt.compare(password, user.password);
        if (!passIsMatch) {
            return NextResponse.json({ message: "Password Invalid" }, { status: 401 });
        }

        // สร้าง user payload
        const userPayLoad = {
            user: {
                username: user.username,
                role: user.role,
                id: user._id,
            },
        };
        console.log(`⩇⩇:⩇⩇🚨  file: route.js:65  userPayLoad :`, userPayLoad);

       


        // ส่งค่าตอบสนองกลับ
        return NextResponse.json({
            message: "Login successfully",
            userPayLoad,
        }, { status: 200 });

    } catch (error) {
        console.error("Error: ", error);
        return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
}

export const POST = withDBConnection(loggedIn);