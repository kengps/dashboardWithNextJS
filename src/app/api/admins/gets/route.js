import { connectDatabases } from "@/utils/database/mongoose/connectDB";

const adminModel = require("@/models/adminModel");
const { withDBConnection } = require("@/utils/hocRequest/hoc");
const { NextResponse } = require("next/server");





// export async function GET() {

//     await connectDatabases();
//     const admins = await adminModel.find({})

//     return NextResponse.json({ admins })

// }

const getAdmin = async () => {
    try {
        const admins = await adminModel.find({})

        return NextResponse.json({ admins })

    } catch (error) {
        console.log(`⩇⩇:⩇⩇🚨  file: route.js:27  error :`, error);


    }
}


export const GET = withDBConnection(getAdmin);