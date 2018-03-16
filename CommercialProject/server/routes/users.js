let express = require('express');
let router = express.Router();
require('./../util/util')
let User = require('../models/users')

// req:请求；res:响应；next:向后流转(什么都不处理)
router.post('/login', function (req, res, next) {
  let param = {   // 拿到前端传递过来的参数
    userName: req.body.userName,
    userPwd: req.body.userPwd
  }
  User.findOne(param, function (err, doc) {  // 根据前端传来的帐号和密码，来查询
    if (err) {
      res.json({
        status: '1',
        msg: err.message
      })
    } else {  // 这是登录成功的操作
      if (doc) {  //
        res.cookie('userId', doc.userId, {  // 往服务端存入cookie
          path: '/',
          maxAge: 1000 * 60 * 60
        })
        res.cookie('userName', doc.userName, {  // 往服务端存入cookie
          path: '/',
          maxAge: 1000 * 60 * 60
        })
        // req.session.userId = doc
        res.json({
          status: '0',
          msg: '',
          result: {
            userName: doc.userName  // 后端传给前端用户名，（后端只有写入 cookie，前端才能拿到）
          }
        })
      }
    }
  })

})

// 登出接口
router.post('/logout', function (req, res, next) {
  res.cookie('userId', '', {   // 将 cookie 重置为空
    path: '/',
    maxAge: -1
  })
  res.json({
    status: '0',
    msg: '',
    result: ''
  })
})

// 登录校验
router.get('/checkLogin', function (req, res, next) {
  if (req.cookies.userId) {
    res.json({
      status: '0',
      msg: '',
      result: req.cookies.userName
    })
  } else {  // 取不到，就将 result 置为空
    res.json({
      status: '1',
      msg: '未登录',
      result: ''
    })
  }
})

// 获取购物车数量
router.get('/getCartCount', function (req, res, next) {
  if (req.cookies && req.cookies.userId) {
    let userId = req.cookies.userId
    User.findOne({userId: userId}, function (err, doc) {
      if (err) {
        res.json({
          status: '0',
          msg: err.message,
          result: ''
        })
      } else {
        let cartList = doc.cartList
        let cartCount = 0
        cartList.map((item) => {
          cartCount = parseInt(item.productNum) // 将字符串转换以下，防止字符串累加
        })
        res.json({
          status: '0',
          msg: '',
          result: cartCount
        })
      }
    })
  }
})

// 用户购物车数据的加载
router.get('/cartList', function (req, res, next) {
  // 首先判断用户是否登录
  let userId = req.cookies.userId  // res.cookies.userId 是向服务端写入 userId
  User.findOne({userId: userId}, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      if (doc) {
        res.json({
          status: '0',
          msg: '',
          result: doc.cartList  // 拿到用户的购物车数据
        })
      }
    }
  })
})

// 购物车数据删除
router.post('/cartDel', function (req, res, next) {
  var userId = req.cookies.userId, productId = req.body.productId
  User.update({userId: userId}, {$pull: {'cartList': {'productId': productId}}}, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      res.json({
        status: '0',
        msg: '',
        result: '成功删除'
      })
    }
  })
})

// 商品修改
router.post('/cartEdit', function (req, res, next) {
  let userId = req.cookies.userId  // 所有操作都是围绕用户 Id 来的，所以要获取用户 Id
  let productId = req.body.productId, productNum = req.body.productNum, checked = req.body.checked
  User.update({'userId': userId,'cartList.productId': productId}, {
    'cartList.$.productNum': productNum,
    'cartList.$.checked': checked
  }, function (err, doc) {
    if (err) {
      res.json({
        status: '',
        msg: err.message,
        result: ''
      })
    } else {
      res.json({
        status: '',
        msg: '',
        result: '商品修改成功'
      })
    }
  })
})

// 购物车的全选
router.post('/editCheckAll', function (req, res, next) {
  let userId = req.cookies.userId, checkAll = req.body.checkAll ? '1' : '0'  // 根据前端传递的值，来决定是 1 还是 0
  User.findOne({userId: userId}, function (err, user) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      if (user) {  // 通过批量遍历，来保存
        user.cartList.forEach((item) => {
          item.checked = checkAll
        })
        user.save(function (err1, doc) {  // 将用户的商品的选中状态，保存
          if (err1) {
            res.json({
              status: '1',
              msg: err1.message,
              result: ''
            })
          } else {
            res.json({
              status: '0',
              msg: '',
              result: '全选成功'
            })
          }
        })
      }
    }
  })
})

// 查询用户地址
router.get('/addressList', function (req, res, next) {
  let userId = req.cookies.userId
  User.findOne({userId: userId}, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      res.json({
        status: '0',
        msg: '',
        result: doc.addressList  // 将数据返回给前端
      })
    }

  })
})

// 设置默认数据
router.post('/setDefault', function (req, res, next) {
  let userId = req.cookies.userId, addressId = req.body.addressId
  if (!addressId) {
    res.json({
      status: '1003',
      msg: '地址为空',
      result: ''
    })
  } else {
    User.findOne({userId: userId}, function (err, doc) {
      if (err) {
        res.json({
          status: '1',
          msg: err.message,
          result: ''
        })
      } else {
        let addressList = doc.addressList
        addressList.forEach((item) => {
          if (item.addressId === addressId) {
            item.isDefault = true
          } else {
            item.isDefault = false
          }
        })
        doc.save(function (err1, doc1) {
          if (err1) {
            res.json({
              status: '1',
              msg: err1.message,
              result: ''
            })
          } else {
            res.json({
              status: '0',
              msg: '',
              result: ''
            })
          }
        })
      }
    })
  }
})

// 删除地址
router.post('/delAddress', function (req, res, next) {
  let userId = req.cookies.userId, addressId = req.body.addressId
  User.update({userId: userId}, {$pull: {'addressList': {'addressId': addressId}}}, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      res.json({
        status: '0',
        msg: '',
        result: '删除地址成功'
      })
    }
  })
})

// 订单支付
router.post('/payMent', function (req, res, next) {
  let userId = req.cookies.userId, orderTotal = req.body.orderTotal, addressId = req.body.addressId
  User.findOne({userId: userId}, function (err, doc) {
    if (err) {
      res.json({
        status: 1,
        msg: '',
        result: ''
      })
    } else {
      var address = ''
      var goodsList = []
      // 获取用户地址
      doc.addressList.forEach((item) => {
        if (addressId === item.addressId) {
          address = item
        }
      })
      // 获取用户的购买商品
      doc.cartList.forEach((item) => {
        if (item.checked === '1') {
          goodsList.push(item)
        }
      })
      var platform = '666'
      var r1 = Math.floor(Math.random() * 10)
      var r2 = Math.floor(Math.random() * 10)
      var sysDate = new Date().Format('yyyyMMddhhmmss')
      var createDate = new Date().Format('yyyy-MM-dd hh:mm:ss')
      var orderId = platform + r1 + sysDate + r2
      // 创建订单
      var order = {
        orderId: orderId,
        orderTotal: orderTotal,
        addressInfo: address,
        goodsList: goodsList,
        orderStatus: '1',
        createDate: createDate
      }
      doc.orderList.push(order)
      doc.save(function (err1, doc1) {
        if (err1) {
          res.json({
            status: '1',
            msg: err1.message,
            result: ''
          })
        }
      })
      //
      res.json({
        status: '0',
        msg: '',
        result: {
          orderId: order.orderId,
          orderTotal: order.orderTotal
        }
      })
    }
  })
})

// 根据订单 id 查询订单信息
router.get('/orderDetail', function (req, res, next) {
  let userId = req.cookies.userId, orderId = req.param('orderId')
  User.findOne({userId: userId}, function (err, userInfo) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      let orderList = userInfo.orderList
      if (orderList.length > 0) {  // 如果orderList 存在内容，就
        let orderTotal = 0
        orderList.forEach((item) => {
          if (item.orderId === orderId) {  // 如果数据库中的orderId等于传过来的orderId，就将订单总金额拿出来
            orderTotal = item.orderTotal
          }
        })
        if (orderTotal > 0) {  // 当订单的总金额大于0的时候，
          res.json({
            status: '0',
            msg: '',
            result: {
              orderId: orderId,
              orderTotal: orderTotal
            }
          })
        } else {
          // 遍历完成之后，通过res.json() 来输出
          res.json({
            status: '120002',
            msg: '无此订单',
            result: ''
          })
        }
      } else {  // 这个就不属于接口报错
        res.json({
          status: '120001',
          msg: '当前用户未创建订单',
          result: ''
        })
      }
    }
  })
})
module.exports = router;
