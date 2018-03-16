let mongoose = require('mongoose')
let Schema = mongoose.Schema

let userSchema = new Schema({  // 定义字段(字段的定义，不是随意的，而是根据数据库中数据来定的)
  'userId': String,
  'userName': String,
  'userPwd': String,
  'orderList': Array,
  'cartList': [
    {
      'productId': String,
      'productName': String,
      'salePrice': String,
      'productImage': String,
      'checked': String,
      'productNum': String
    }
  ],
  'addressList': [
    {
      'addressId': String,
      'userName': String,
      'streetName': String,
      'postCode': Number,
      'tel': Number,
      'isDefault': Boolean
    }
  ]
})
// mongoose.model() 是定义一个模型，模型的名字是 User，
// 由 Schema 发布生成的模型model，具有抽象属性和行为的数据库操作
// 总结：Schema生成和关联 model；model又关联了集合 users（默认关联带s的集合）
module.exports = mongoose.model('User', userSchema)
