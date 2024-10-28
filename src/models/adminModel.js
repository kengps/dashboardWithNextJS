const mongoose = require('mongoose');


const adminData = mongoose.Schema(
    {
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, enum: ['admin', 'adminUserManager', 'adminFinanceManager'], default: 'admin' },
        permissions: {
            manageUsers: { type: Boolean, default: true },  // จัดการผู้ใช้
            manageRentals: { type: Boolean, default: true }, // จัดการห้องเช่า
            manageFinance: { type: Boolean, default: true }  // จัดการการเงิน
        },
        enabled: {
            type: Boolean,
            default: true,
        },
        // picture: String,
        ipAddress: String,
        picture: Buffer
        // lastPasswordChange: { type: Date, default: Date.now },
        // mustChangePassword: { type: Boolean, default: true },
        // tokenIfLoggedIn: {
        //     type: String,
        // }
    }, { timestamps: true }
)


// module.exports = mongoose.model('adminUser', adminUser)

// Check if the model already exists
const adminUser = mongoose.models.adminUser || mongoose.model('adminUser', adminData);

module.exports = adminUser;