const mongoose = require('mongoose')

const imageFormLogin = mongoose.Schema({
    image: Buffer,
    status: Boolean
}, { timestamps: true })

module.exports = mongoose.model('imageLogin', imageFormLogin)

// Check if the model already exists
// const adminUser = mongoose.models.adminUser || mongoose.model('adminUser', adminData);

// module.exports = adminUser;