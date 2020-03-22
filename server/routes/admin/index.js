module.exports = app => {
  const express = require('express');
  const router = express.Router({
    mergeParams: true // 合并URL参数
  });
  /**
   * @desc 引入模型
   */
  // const Category = require('../../models/Category')

  /**
   * @desc api
   */
  // 创建分类
  router.post('/', async(req, res) => {
    const model = await req.Model.create(req.body)
    res.send(model)
  })
  // 编辑分类
  router.put('/:id', async(req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })
  // 删除分类
  router.delete('/:id', async(req, res) => {
    await req.Model.findOneAndDelete(req.params.id, req.body)
    res.send({
      success: true
    })
  })
  // 分类列表
  router.get('/', async(req, res) => {
    let queryOptions = {}
    if(req.Model.modelName === 'Category') {
      queryOptions.populate = 'parent'
    }
    const items = await req.Model.find().setOptions(queryOptions).limit(10) // populate 表示关联查询关联字段‘parent' 信息
    res.send(items)
  })
  // 分类详情
  router.get('/:id', async(req, res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })


  app.use('/admin/api/rest/:resource', async(req, res, next) => {
    // inflection 工具转换类名，如把categories转为req.Model
    const modelName = require('inflection').classify(req.params.resource)
    req.Model = require(`../../models/${modelName}`)
    next()
  }, router)

  /**
   * @desc 上传图片
   */
  const multer = require('multer')  // 引入上传数据的中间件multer
  const upload = multer({dest: __dirname + '/../../uploads'})
  app.post('/admin/api/upload', upload.single('file'), async(req, res) => {
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })
}