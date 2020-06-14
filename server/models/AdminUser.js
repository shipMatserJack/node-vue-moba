const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  username: { type: String },
  password: { 
    type: String,
    select: false, // 密码默认无法查出
    set(val) {
      return require('bcrypt').hashSync(val, 10) // 将密码散列加密
    } 
  }
})

// 导出分类模型
module.exports = mongoose.model('AdminUser', schema)