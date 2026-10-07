const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGOOSE_URI);
    console.log(`Server connected to: ${conn.connection.host}/${conn.connection.name}`);
  } catch (error) {
    console.log(`Server could not connect, error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
