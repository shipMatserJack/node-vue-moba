const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  name: { type: String },
  items: [
    {
      image: { type: String },
      url: { type: String}
    }
  ]
})

// 导出分类模型
module.exports = mongoose.model('Ad', schema)