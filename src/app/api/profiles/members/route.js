

import memberModel from "@/models/memberModel";
import { generateHashPassword } from "@/utils/webserver/functions/generateHashPassword";

const { withDBConnection } = require("@/utils/hocRequest/hoc");
const { NextResponse } = require("next/server");




const getMember = async () => {
    try {


        const members = await memberModel.find({})

        return NextResponse.json({ members })

    } catch (error) {
        console.log(`⩇⩇:⩇⩇🚨  file: route.js:27  error :`, error);


    }
}

const register = async (req) => {
    const values = await req.json();  // อ่าน request body เป็น JSON
    console.log(`⩇⩇:⩇⩇🚨  file: route.js:28  values :`, values);


    try {
        const { username, password, cfpassword } = values

        if (!username || !password || !cfpassword) return NextResponse.json({ message: 'Please fill in all fields!' })


        const members = await memberModel.findOne({ username })

        if (members) return NextResponse.json({ message: 'Username is already exists!' })


        if (password !== cfpassword) return NextResponse.json({ message: 'Password must match!!' })


        const hashedPassword = await generateHashPassword(password)


        const newMemberData = new memberModel({
            username,
            password: hashedPassword
        })


        await newMemberData.save();

        return NextResponse.json({ message: 'register success', newMemberData })

    } catch (error) {
    console.log(`⩇⩇:⩇⩇🚨  file: route.js:59  error :`, error);


    }
}


export const POST = withDBConnection(register);



export const GET = withDBConnection(getMember);


