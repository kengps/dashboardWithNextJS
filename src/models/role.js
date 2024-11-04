const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// roles.js
const RoleType = {
    MASTER: 'Master',
    ADMIN: 'Admin',
    MEMBER: 'Member',
};

Object.freeze(RoleType); // Prevents modification



const roleSchema = new Schema({
    name: {
        type: String,
        enum: Object.values(RoleType), // กำหนดว่า field นี้ต้องเป็นหนึ่งในค่าที่อยู่ใน RoleDev
        required: true,
        unique: true, // ป้องกันการซ้ำซ้อนของชื่อ role
    },
    roleMember: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Profile', default: [] }], // เก็บว่ามีใครอยู่ในนี้บ้าง
    defaultPermissions: {
        type: [String],
        enum: ['Create', 'Read', 'Update', 'Delete'], // กำหนดค่าที่อนุญาต
        default: ['Read'], // ค่า default เช่น ['Read'] หรือ ['Create', 'Read', 'Update', 'Delete'] ตามต้องการ
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },
});


// Check if the model already exists
const roles = mongoose.models.Role || mongoose.model('Role', roleSchema);

module.exports = roles;