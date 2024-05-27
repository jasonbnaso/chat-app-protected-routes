const mongoose = require("mongoose");

const connectDatabase = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Connect to Database:  ${connect.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error}`);
    process.exit();
  }
};
module.exports = connectDatabase;
