import { connectDatabases } from "@/utils/database/mongoose/connectDB";

const adminModel = require("@/models/adminModel");
const { withDBConnection } = require("@/utils/hocRequest/hoc");
const { NextResponse } = require("next/server");



export async function GET() {
    await connectDatabases(); // Ensure the database connection is established

    try {
        // Fetch all admin users from the database
        const admins = await adminModel.find({}).lean(); // Use .lean() for better performance if you don't need Mongoose documents

        return NextResponse.json({ admins });
    } catch (error) {
        console.error("Error fetching admin users:", error);
        return NextResponse.json({ error: "Failed to fetch admin users" }, { status: 500 });
    }
}



// async function GET() {
//     try {
//         const admins = await adminModel.find({});

//         return NextResponse.json({ admins });

//     } catch (error) {
//         console.log(`⩇⩇:⩇⩇🚨  file: route.js:29  error :`, error);

//     }

// }
// export default withDBConnection(GET);