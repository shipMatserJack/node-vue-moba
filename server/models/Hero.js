const mongoose = require('mongoose');
// 定义数据类型
const schema = new mongoose.Schema({
  name: { type: String },
  avatar: { type: String },
  title: {type: String},
  categories: [{type: mongoose.SchemaTypes.ObjectId, ref: 'Category'}],
  scores: {
    difficult: {type: Number},
    skills: {type: Number},
    attack: {type: Number},
    survive: {type: Number}
  },
  skills: [{
    icon: {tyep: String},
    name: {tyep: String},
    discription: {tyep: String},
    tips: {type: String}
  }],
  items1: [{type: mongoose.SchemaTypes.ObjectId, ref: 'Item'}],
  items2: [{type: mongoose.SchemaTypes.ObjectId, ref: 'Item'}],
  usageTips: {tyep: String},
  battleTips: {tyep: String},
  teamTips: {tyep: String},
  partners: [{
    // hero: {tyep: mongoose.SchemaTypes.ObjectId, ref: 'Hero'},
    description: {tyep: String}
  }]
})

// 导出分类模型
module.exports = mongoose.model('Hero', schema)