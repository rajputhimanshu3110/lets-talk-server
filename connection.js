const mongoose = require('mongoose');

const connection = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    if (conn) {
        console.log("Database Connected");
    }
}

module.exports = connection;