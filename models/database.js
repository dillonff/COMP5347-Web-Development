var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/mydb", (err) => {
    if (err) {
        console.log("user Connect failed!");
    } else {
        console.log("user Connect successfully!");
    }
});

module.exports = mongoose;