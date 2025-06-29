const mongoose = require('mongoose');

const dbconn = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log("Mongoose Connected Successfully ");
        return conn;
    }
    catch (err) {
        console.log("Errors in connecting database ", err);
    }
}

module.exports = dbconn;