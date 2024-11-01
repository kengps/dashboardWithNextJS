import { generateHashPassword } from "@/utils/webserver/functions/generateHashPassword";

const adminModel = require("@/models/adminModel");
const { withDBConnection } = require("@/utils/hocRequest/hoc");
const { NextResponse } = require("next/server");



const register = async (req) => {
    const values = await req.json();  // อ่าน request body เป็น JSON
    console.log(`⩇⩇:⩇⩇🚨  file: route.js:11  values :`, values);


    // return NextResponse.json({ message: 'success' })

    try {
        const { username, password, cfpassword } = values

        if (!username || !password || !cfpassword) return NextResponse.json({ message: 'Please fill in all fields!' })



        const admins = await adminModel.findOne({ username })

        if (admins) return NextResponse.json({ message: 'Username is already exists!' })

        if (password !== cfpassword) return NextResponse.json({ message: 'Password must match!!' })
            
        const hashedPassword = await generateHashPassword(password)


        const newAdminData = new adminModel({
            username,
            password: hashedPassword
        })


        await newAdminData.save();

        return NextResponse.json({ message: 'register success', newAdminData })

    } catch (error) {

    }
}


const getAdmin = async () => {
    try {

        const admins = await adminModel.find({})

        return NextResponse.json({ admins })

    } catch (error) {

    }
}




export const GET = withDBConnection(getAdmin);


export const POST = withDBConnection(register);