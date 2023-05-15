const mongoose = require("mongoose");
const { DB_URI } = require("../config");

module.exports = async () => {
  try {
    await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database is Connected");
  } catch (error) {
    console.log("=========== Error ============");
    console.log(error);
    process.exit(1);
  }
};
