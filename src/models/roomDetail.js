const mongoose = require('mongoose');
const Schema = mongoose.Schema;



// Schema สำหรับห้องเช่า
const roomSchema = new Schema({
    floor: { type: Number },
    roomNumber: { type: Number },
    status: { type: String, default: 'available' },
    price: { type: Number, default: 0 },
    // rentalDate: { type: Date },
    // tenant: { type: Schema.Types.ObjectId, ref: 'memberUser' }, // อ้างอิงไปยังผู้เช่า
    tenet: { type: String }, // อ้างอิงไปยังผู้เช่า
}, { timestamps: true });


// Schema สำหรับรายละเอียดค่าเช่า
const rentDetailsSchema = new Schema({
    room: { type: Schema.Types.ObjectId, ref: 'Room', required: true },
    monthlyRent: { type: Number, required: true },
    water: {
        price: { type: Number, required: true },
        previousUnits: { type: Number, required: true },
        currentUnits: { type: Number, required: true },
        quality: { type: Number },
        total: { type: Number },
    },
    electricity: {
        price: { type: Number, required: true },
        previousUnits: { type: Number, required: true },
        currentUnits: { type: Number, required: true },
        quality: { type: Number },
        total: { type: Number },
    },
    internet: { type: Number, required: true },
    others: { type: Number, required: true },
    status: { type: String, default: 'noPaid' },
    additionalCharges: [{ type: Schema.Types.ObjectId, ref: 'AdditionalCharge' }], // อ้างอิงไปยังค่าใช้จ่ายเพิ่มเติม
}, { timestamps: true });

// Schema สำหรับค่าใช้จ่ายเพิ่มเติม
const additionalChargeSchema = new Schema({
    name: { type: String, required: true }, // ชื่อค่าใช้จ่าย เช่น ค่าจอดรถ
    amount: { type: Number, required: true },
    rentDetail: { type: Schema.Types.ObjectId, ref: 'RentDetails' }, // อ้างอิงไปยังรายละเอียดค่าเช่า
}, { timestamps: true });




const Room = mongoose.model('Room', roomSchema);
const RentDetails = mongoose.model('RentDetails', rentDetailsSchema);
const AdditionalCharge = mongoose.model('AdditionalCharge', additionalChargeSchema);

module.exports = { Room, RentDetails, AdditionalCharge };


// // Check if the model already exists
// const adminUser = mongoose.models.adminUser || mongoose.model('adminUser', adminData);

// module.exports = adminUser;