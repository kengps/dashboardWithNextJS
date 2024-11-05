import { connectDatabases } from "@/utils/database/mongoose/connectDB";

import memberModel from "@/models/memberModel";
import profiles from "@/models/profiles";
import roleModel from "@/models/role";
import { generateHashPassword } from "@/utils/webserver/functions/generateHashPassword";
const adminModel = require("@/models/adminModel");
const { withDBConnection } = require("@/utils/hocRequest/hoc");
const { NextResponse } = require("next/server");


const register = async (req) => {
    try {
        const values = await req.json();
        const { username, password, role, parentId, permissions } = values;
        console.log(`⩇⩇:⩇⩇🚨  file: route.js:16  permissions :`, permissions);


        // ตรวจสอบว่ามี user หรือไม่            
        const existingUser = await profiles.findOne({ username });
        if (existingUser) {
            return NextResponse.json({ message: "Username already exists!!" });
        }

        // ค้นหา role
        let roleData = await roleModel.findOne({ name: role });

        // ถ้าไม่มี role ใดๆ ในระบบ แสดงว่าเป็นครั้งแรก ให้สร้าง role ใหม่
        if (!roleData) {
            roleData = new roleModel({
                name: role,
                roleMember: [],
                // defaultPermissions: ['Create', 'Read', 'Update', 'Delete']
                // defaultPermissions: {
                //     create: false,
                //     read: true,
                //     update: false,
                //     delete: false,
                // }
            });
            await roleData.save();
        }

        const hashedPassword = await generateHashPassword(password);
        // const userPermissions = permissions || roleData.defaultPermissions;
        // console.log(`⩇⩇:⩇⩇🚨  file: route.js:44  userPermissions :`, userPermissions);


        // สร้างผู้ใช้ใหม่
        const newUser = new profiles({
            username,
            password: hashedPassword,
            role: roleData._id,
            parentRoleId: parentId || null,
            permissions: {
                create: permissions.create,
                read: permissions.read,
                update: permissions.update,
                delete: permissions.delete,
            },
        });

        await newUser.save();

        // อัปเดต role เพื่อเพิ่ม user ID ใหม่เข้าไปในฟิลด์ roleMember
        const updatedRole = await roleModel.findByIdAndUpdate(
            roleData._id,
            { $push: { isProfiles: newUser._id } },
            { new: true }
        );

        console.log(`Updated role data after adding user:`, updatedRole); // ตรวจสอบผลลัพธ์ที่อัปเดตแล้ว

        return NextResponse.json({ message: 'register successfully', newUser });

    } catch (error) {
        console.log(`Error during registration:`, error);
        return NextResponse.json({ error: error.message });
    }
};



const getProfilesAll = async (req) => {
    try {
        const [admins, members, profile, role] = await Promise.all([
            adminModel.find(),
            memberModel.find(),
            profiles.find(),
            roleModel.find()
        ])
        return NextResponse.json({ message: 'getProfilesAll', admins, members, profile, role })

    } catch (error) {

    }
}



export const GET = withDBConnection(getProfilesAll);


export const POST = withDBConnection(register);