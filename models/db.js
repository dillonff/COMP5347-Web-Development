const mongoose = require('mongoose');

mongoose
    .connect('mongodb://localhost/sellphone')
    .then(() => console.log('DB connection successful!'));

module.exports = mongoose;