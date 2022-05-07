const mongoose = require('mongoose');

mongoose
  .connect('mongodb://localhost/phoneZone', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log('DB connection successful!'));

module.exports = mongoose;
