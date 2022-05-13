const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/mydb", (err) => {
    if (err) {
        console.log("Database connect failed!");
    } else {
        console.log("Database connect successfully!");
    }
});

module.exports = mongoose;