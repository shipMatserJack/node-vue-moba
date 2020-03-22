const express = require('express');

const app = express();

// 使用中间件
app.use(require('cors')()); //允许跨域
app.use(express.json()); //使用json
app.use('/uploads', express.static(__dirname + '/uploads')) //上传文件夹使用静态文件托管

// 引用数据库
require('./plugins/db')(app)
// 引入路由
require('./routes/admin')(app)

app.listen(3000, () => {
  console.log('http://localhost:3000')
})
