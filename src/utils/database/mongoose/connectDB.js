
const mongoose = require('mongoose');



const connection = {}
const connectMongoose = async (uri) => {

    try {
        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(uri);
            console.log(`Connected to MongoDB successfully...`);
        } else {
            console.log("MongoDB is already connected...");
        }
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        setTimeout(() => connectMongoose(uri), 5000);
    }
};

const DATABASE = process.env.MONGODB;
const DATABASE_II = process.env.DATABASE_II;

const connectDatabases = async () => {
    try {

        //ตรงนี้ก็คือ connectMongoose
        // if (connection.isConnected) return 
        // const db = await connectMongoose(DATABASE);
        // connection.isConnected = db.connections[0].readyState

        await connectMongoose(DATABASE);
        console.log("Connected to Database");
        // await connectMongoose(DATABASE_II);
        // console.log("Connected to Database for Products");

    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

module.exports = { connectDatabases };
