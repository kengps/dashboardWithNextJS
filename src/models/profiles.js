// models/User.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profilesSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: Schema.Types.ObjectId,
        ref: 'Role',
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    parentRoleId: {
        type: Schema.Types.ObjectId,
        ref: 'Profile', // อ้างอิงไปยังผู้ใช้งานที่สร้าง user นี้
        default: null, // สำหรับกรณี user ระดับสูงสุด (เช่น Dev) ที่ไม่มี parent
    },
    childrenUser: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Profile', default: null, }],
    //subUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Profile' }], // ฟิลด์สำหรับเก็บผู้ใช้ลูก
    // permissions: {
    //     type: [String],
    //     enum: ['Create', 'Read', 'Update', 'Delete'], // ค่าการอนุญาต
    //     default: null, // ถ้า null จะใช้ permissions จาก RoleDev
    // },
    permissions: {
        create: { type: Boolean, default: null },
        read: { type: Boolean, default: true },
        update: { type: Boolean, default: null },
        delete: { type: Boolean, default: null },
    },
}, { timestamps: true });

// module.exports = mongoose.model('Profile', profilesSchema);

// Check if the model already exists
const profiles = mongoose.models.Profile || mongoose.model('Profile', profilesSchema);

module.exports = profiles;