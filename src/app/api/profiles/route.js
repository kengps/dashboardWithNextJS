import { connectDatabases } from "@/utils/database/mongoose/connectDB";

import memberModel from "@/models/memberModel";
const adminModel = require("@/models/adminModel");
const { withDBConnection } = require("@/utils/hocRequest/hoc");
const { NextResponse } = require("next/server");



const register = async (req) => {
    // const values = await req.json();  // อ่าน request body เป็น JSON
  
    // try {
    //     const { username, password, cfpassword } = values

    //     if (!username || !password || !cfpassword) return NextResponse.json({ message: 'Please fill in all fields!' })

            
    //     if (password !== cfpassword) return NextResponse.json({ message: 'Password must match!!' })
        
    //     const members = await memberModel.findOne({ username })

    //     if (members) return NextResponse.json({ message: 'Username is already exists!' })

    //     const hashedPassword = await generateHashPassword(password)


    //     const newAdminData = new memberModel({
    //         username,
    //         password: hashedPassword
    //     })


    //     await newAdminData.save();

    //     return NextResponse.json({ message: 'register success', newAdminData })

    // } catch (error) {

    // }
}




const getProfilesAll = async (req) => {
    try {
        const [admins, members] = await Promise.all([
            adminModel.find(),
            memberModel.find()
        ])
        return NextResponse.json({ message: 'getProfilesAll', admins, members })

    } catch (error) {
        console.log(`⩇⩇:⩇⩇🚨  file: route.js:60  error :`, error);


    }
}



export const GET = withDBConnection(getProfilesAll);


export const POST = withDBConnection(register);