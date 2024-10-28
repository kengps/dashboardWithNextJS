const { connectDatabases } = require("../database/mongoose/connectDB");



exports.handleRequestError = (callback) => {
    return async (req, res) => {
        try {
            await callback(req, res)
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error', error });
        }
    }
}


exports.withDBConnection = (handler) => async (req, res) => {
    await connectDatabases();

    return handler(req, res);
}