module.exports = app => {
  const mongoose = require("mongoose");
  mongoose.connect('mongodb://localhost:27017/node-vue-moba', {
    useNewUrlParser: true
  }).then(() => console.log("Connection Successful"))
  .catch(err => console.log(err));
}