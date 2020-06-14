const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category'}],
  title: { type: String },
  body: {type: String}
})

// 导出分类模型
module.exports = mongoose.model('Article', schema)