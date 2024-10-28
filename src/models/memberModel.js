const mongoose = require('mongoose')


const memberData = mongoose.Schema({

    username: {
        type: String,
        // required: true, // ห้ามใส่ค่าว่าง ต้องกรอกข้อมูลเสมอ
    },
    password: {
        type: String,
    },
    role: {
        type: String,
        default: "user",
    },
    enabled: {
        type: Boolean,
        default: true,
    },
    ipAddress: String,
    picture: Buffer
    // lastPasswordChange: { type: Date, default: Date.now },
    // mustChangePassword: { type: Boolean, default: true },
    // tokenIfLoggedIn: {
    //     type: String,
    // }
}, { timestamps: true })

const memberUser = mongoose.models.memberUser || mongoose.model('memberUser', memberData);

module.exports = memberUser;
// module.exports = mongoose.model('memberUser', memberUser)

// // Check if the model already exists
// const adminUser = mongoose.models.adminUser || mongoose.model('adminUser', adminData);

// module.exports = adminUser;