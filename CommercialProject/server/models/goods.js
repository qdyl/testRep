let mongoose = require('mongoose')
let Schema = mongoose.Schema  // 表模型
let productSchema = new Schema({  // 通过 new Schema 来定义 模型数据
  'productId': String,
  'productName': String,
  'salePrice': Number,
  'productImage': String,
  'checked': String
})
// 通过 mongoose.model 定义一个商品 (Goods)，商品的模型就是productSchema 并输出。
module.exports = mongoose.model('Good', productSchema)
