import { connectDatabases } from "@/utils/database/mongoose/connectDB";

const adminModel = require("@/models/adminModel");
const { withDBConnection } = require("@/utils/hocRequest/hoc");
const { NextResponse } = require("next/server");



const changeProfile = async (req, { params }) => {
    console.log(`⩇⩇:⩇⩇🚨  file: route.js:10  params :`, params.id);

    const values = await req.json();  // อ่าน request body เป็น JSON
    console.log(`⩇⩇:⩇⩇🚨  file: route.js:10  values :`, values);

    return NextResponse.json({ message: 'put success' })
}







export const PUT = withDBConnection(changeProfile);
