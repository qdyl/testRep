let express = require('express')
let router = express.Router()
let mongoose = require('mongoose')
let Goods = require('../models/goods') // 加载模型表

// 通过 mongoose 自带的 .connect()方法来连接数据库test。
// 如果有帐号、密码。mongoose.connect('mongodb://root:123456@127.0.0.1:27017/test')
mongoose.connect('mongodb://127.0.0.1:27017/test')

// 监听数据库连接成功
mongoose.connection.on('connected', function () {
  console.log('Mongoose 链接成功')
});
// 监听数据库连接失败
mongoose.connection.on('error', function () {
  console.log('Mongoose 链接失败')
});
// 监听数据库断开链接
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose 断开链接')
});

// 使用 router的get() 方法查询
router.get('/list', function (req, res, next) {
  // 通过 Goods 模型的 find() 方法来查询数据
  let page = parseInt(req.param('page')) // 因为是get请求，所以可以使用 params 来获取url参数。这里是获取页码
  let pageSize = parseInt(req.param('pageSize'))
  let priceLevel = req.param('priceLevel')
  let sort = req.param('sort') // 通过param 可以获得从前端url传递的参数。
  let skip = (page - 1) * pageSize
  let priceGt = ''
  let priceLte = ''
  let parmas = {}
  if (priceLevel !== 'all') {
    switch (priceLevel) {
      case '0':priceGt = 0; priceLte = 100; break;
      case '1':priceGt = 100; priceLte = 500; break;
      case '2':priceGt = 500; priceLte = 1000; break;
      case '3':priceGt = 1000; priceLte = 5000; break
    }
    parmas = { // 定义一个查询的条件
      salePrice: {
        $gt: priceGt,
        $lte: priceLte
      }
    }
  }
  let goodsModel = Goods.find(parmas).skip(skip).limit(pageSize)  // Goods.find() 会返回一个模型，返回的这个模型有很多方法，比如sort()\
  goodsModel.sort({'salePrice': sort}) // 使用 sort() 方法，对金额进行排序。1 是升序，-1 是降序
  goodsModel.exec(function (err, doc) { // 参数分别是 报错和 返回的文档
    if (err) {
      res.json({  // 报错的处理
        status: '1', // 报错的状态码
        msg: err.msg  // 报错的信息
      })
    } else {
      res.json({
        status: '0',
        msg: '',
        result: {
          cont: doc.length,  // 文档的长度
          list: doc // 文档内容
        }
      })
    }
  })
});

// 加入购物车的实现 （向服务器提交数据，使用post）
router.post('/addCart', function (req, res, next) {
  // 假设已经登录
  let userId = '100000077'
  let productId = req.body.productId // 使用 post 请求，获取参数，就需要使用req.body;与get 请求是不一样的
  let User = require('../models/users') // 获取模型，借助模型来执行 Mongoose 的 Api
  User.findOne({userId: userId}, function (err, userDoc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message
      })
    } else {
      if (userDoc) {  // 假设已经拿到用户
        let goodsItem = ''
        // 对用户的购物车遍历，看是否有该商品
        userDoc.cartList.forEach(function (item) {
          if (item.productId === productId) {  // 如果目前存在的id 等于传递过来的 id ,肯定用户用户已经选择了该商品，只要数量++ ，就可以
            goodsItem = item
            item.productNum ++
          }
        })
        if (goodsItem) { // goodItem 为 true，就说明有了商品。 如果有了，就保存
          userDoc.save(function (err2, doc2) {   // 保存到 MongoDB 数据库
            if (err2) {
              res.json({
                status: '1',
                msg: err2.message
              })
            } else {
              res.json({
                status: '0',
                msg: '',
                result: '添加成功'
              })
            }
          })
        } else {   // 假设用户没有选择商品。findOne() 是查询一件商品
          Goods.findOne({productId: productId}, function (err1, doc) {
            if (err1) {
              res.json({
                status: '1',
                msg: err1.message
              })
            } else {
              if (doc) {
                doc.productNum = 1 // 默认数量是1
                doc.checked = 1 // 选中
                userDoc.cartList.push(doc) // 将 goods 中的 商品数量直接添加到 User的数据库中。
                userDoc.save(function (err2, doc2) {   // 保存到 MongoDB 数据库
                  if (err2) {
                    res.json({
                      status: '1',
                      msg: err2.message
                    })
                  } else {
                    res.json({
                      status: '0',
                      msg: '',
                      result: '服务端：添加成功'
                    })
                  }
                })
              }
            }
          })
        }
      }
    }
  })
})

// 导出
module.exports = router;
