<template>
  <div>
    <nav-header class="header">
      <symbol id="icon-cart" viewBox="0 0 38 32">
        <title>cart</title>
        <path class="path1" d="M37.759 0h-4.133c-0.733 0.004-1.337 0.549-1.434 1.255l-0.546 4.342c-0.081 0.484-0.496 0.849-0.997 0.849-0.005 0-0.009-0-0.014-0h-27.604c-0.003 0-0.007-0-0.011-0-1.674 0-3.031 1.357-3.031 3.031 0 0.34 0.056 0.666 0.159 0.971l2.52 8.062c0.385 1.194 1.486 2.043 2.785 2.043 0.126 0 0.25-0.008 0.372-0.023l22.983 0.002c0.515 0.131 0.626 0.768 0.626 1.283 0.005 0.044 0.009 0.095 0.009 0.146 0 0.501-0.294 0.933-0.718 1.134l-22.439 0.003c-0.354 0-0.642 0.287-0.642 0.642s0.287 0.642 0.642 0.642h22.745l0.131-0.071c0.919-0.392 1.551-1.287 1.551-2.33 0-0.058-0.002-0.116-0.006-0.173 0.021-0.108 0.033-0.24 0.033-0.376 0-1.072-0.732-1.973-1.724-2.23l-23.357-0.004c-0.063 0.008-0.135 0.013-0.209 0.013-0.719 0-1.332-0.455-1.566-1.093l-2.53-8.095c-0.048-0.154-0.076-0.332-0.076-0.515 0-0.973 0.782-1.764 1.752-1.778h27.657c1.159-0.004 2.112-0.883 2.232-2.011l0.547-4.345c0.010-0.083 0.078-0.147 0.161-0.152l4.133-0c0.354 0 0.642-0.287 0.642-0.642s-0.287-0.642-0.642-0.642z"></path>
        <path class="path2" d="M31.323 9.69c-0.022-0.003-0.048-0.004-0.074-0.004-0.328 0-0.598 0.248-0.633 0.567l-0.809 7.268c-0.003 0.022-0.004 0.048-0.004 0.074 0 0.328 0.248 0.598 0.567 0.633l0.074 0c0.001 0 0.003 0 0.004 0 0.327 0 0.596-0.246 0.632-0.563l0.809-7.268c0.003-0.022 0.004-0.048 0.004-0.074 0-0.328-0.248-0.598-0.567-0.633z"></path>
        <path class="path3" d="M27.514 25.594c-1.769 0-3.203 1.434-3.203 3.203s1.434 3.203 3.203 3.203c1.769 0 3.203-1.434 3.203-3.203s-1.434-3.203-3.203-3.203zM27.514 30.717c-1.060 0-1.92-0.86-1.92-1.92s0.86-1.92 1.92-1.92c1.060 0 1.92 0.86 1.92 1.92s-0.86 1.92-1.92 1.92z"></path>
        <path class="path4" d="M9.599 25.594c-1.769 0-3.203 1.434-3.203 3.203s1.434 3.203 3.203 3.203c1.769 0 3.203-1.434 3.203-3.203s-1.434-3.203-3.203-3.203zM9.599 30.717c-1.060 0-1.92-0.86-1.92-1.92s0.86-1.92 1.92-1.92c1.060 0 1.92 0.86 1.92 1.92s-0.86 1.92-1.92 1.92z"></path>
      </symbol>
      <div class="navbar">
        <div class="navbar-left-container">
          <a href="/">
            <img class="navbar-brand-logo" src="/static/logo.png"></a>
        </div>
        <div class="navbar-right-container" style="display: flex;">
          <div class="navbar-menu-container">
            <!--<a href="/" class="navbar-link">我的账户</a>-->
            <span class="navbar-link"></span>
            <a href="javascript:void(0)" class="navbar-link">Login</a>
            <a href="javascript:void(0)" class="navbar-link">Logout</a>
            <div class="navbar-cart-container">
              <span class="navbar-cart-count"></span>
              <a class="navbar-link navbar-cart-link" href="/#/cart">
                <svg class="navbar-cart-logo">
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-cart"></use>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav-header>
    <nav-bread></nav-bread>
    <div class="accessory-result-page accessory-page">
      <div class="container">
        <div class="filter-nav">
          <span class="sortby">Sort by:</span>
          <a href="javascript:void(0)" class="default cur">Default</a>
          <a href="javascript:void(0)" class="price" @click="sortGoods">Price <svg class="icon icon-arrow-short" :class="{'sort-up':!sortFlag}"><use xlink:href="#icon-arrow-short"></use></svg></a>
          <a href="javascript:void(0)" class="filterby stopPop" @click="showFilterPop">Filter by</a>
        </div>
        <div class="accessory-result">
          <!-- filter -->
          <div class="filter stopPop" id="filter" v-bind:class="{'filterby-show': filterBy}">
            <dl class="filter-price">
              <dt>Price:</dt>
              <dd><a href="javascript:void(0)" v-bind:class="{'cur': priceChecked === 'all'}" @click="priceChecked='all'">All</a></dd>
              <dd v-for="(item, index) in priceFilter">
                <a href="javascript:void(0)" v-bind:class="{'cur':priceChecked === index }"  @click="setPriceFilter(index)">{{item.startPrice}} - {{item.endPrice}}</a>
              </dd>
            </dl>
          </div>

          <!-- search result accessories list -->
          <div class="accessory-list-wrap">
            <div class="accessory-list col-4">
              <ul>
                <li v-for="(item, index) in goodsList">
                  <div class="pic">
                    <a href="#"><img v-lazy="'/static/' + item.productImage" alt=""></a>
                  </div>
                  <div class="main">
                    <div class="name" v-text="item.productName"></div>
                    <div class="price">{{item.salePrice}}</div>
                    <div class="btn-area">
                      <a href="javascript:;" class="btn btn--m" @click="addCart(item.productId)">加入购物车</a>
                    </div>
                  </div>
                </li>
              </ul>
              <div class="loadmore" v-infinite-scroll='loadMore' infinite-scroll-disabled='busy' infinite-scroll-distance='30'>
                <img src="./../assets/loading-spinning-bubbles.svg" v-show="loading">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="md-overlay" v-show="overLayFlag" @click.stop="closePop"></div>
    <modal v-bind:mdShow="mdShow" v-on:close="closeModal">
      <p slot="message">请先登录，否则无法添加到购物车！</p>
      <div slot="btnGroup">
        <a href="#" class="btn" @click="mdShow=false">关闭</a>
      </div>
    </modal>
    <modal v-bind:mdShow="mdShowCart" v-on:close="closeModal">
      <p slot="message">
        <svg class="icon-status-ok">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-cart"></use>
        </svg>
        <span>加入购物车成功！</span>
      </p>
      <div slot="btnGroup">
        <a href="#" class="btn btn--m" @click="mdShowCart=false">继续购物</a>
        <router-link class="btn btn--m" to="/cart">查看购物车</router-link>
      </div>
    </modal>

    <nav-footer></nav-footer>
  </div>
</template>
<script>
  import '../assets/css/base.css'
  import '../assets/css/product.css'
  import NavHeader from '../components/NavHeader.vue'
  import NavFooter from '../components/NavFooter.vue'
  import NavBread from '../components/NavBread.vue'
  import Modal from '../components/Modal.vue'
  import axios from 'axios'
  export default {
    components: {
      NavHeader,
      NavFooter,
      NavBread,
      Modal
    },
    data () {
      return {
        goodsList: [],
        priceFilter: [
          {
            startPrice: 0,
            endPrice: 100
          },
          {
            startPrice: 100,
            endPrice: 500
          },
          {
            startPrice: 500,
            endPrice: 1000
          },
          {
            startPrice: 1000,
            endPrice: 5000
          }
        ],
        priceChecked: 'all',
        filterBy: false,
        overLayFlag: false,
        sortFlag: true,
        page: 1,
        pageSize: 8,
        busy: true,  // busy 是 false 可以滚动。
        loading: false,
        mdShow: false,
        mdShowCart: false
      }
    },
    mounted () {
      this.getGoodsList()  // 当函数初始化的时候，就调用这个函数
    },
    methods: {
      addCart (productId) {  // 接收商品 id
        axios.post('/goods/addCart', {
          productId: productId  // 传递给后端的商品id
        }).then((response) => {
          // console.log(res.status + '我是goods组件')
          let res = response.data
          if (res.status === '0') {
            this.mdShowCart = true
          } else {
            // alert(res.msg)
            this.mdShow = true
          }
        })
      },
      setPriceFilter (index) {
        this.priceChecked = index // 通过这个来获取价格过滤的原始参数。
        this.closePop()
        this.page = 1 // 从第一页开始排序
        this.getGoodsList()
      },
      getGoodsList (flag) {
        let param = {  // 这些参数，会传递给后端
          page: this.page,
          pageSize: this.pageSize,
          sort: this.sortFlag ? 1 : -1,
          priceLevel: this.priceChecked
        }
        this.loading = true  // 在接口请求之前，将加载开启
        axios.get('/goods/list', {
          params: param  // 将参数传递给后端
        }).then((result) => {  // axios 里面封装了 Promise,所以可以使用.then()
          let res = result.data
          this.loading = false  // 接口请求之后，关闭加载
          if (res.status === '0') {
            if (flag) {  // 如果是分页，就累加
              this.goodsList = this.goodsList.concat(res.result.list)  // 将数组合并
              if (res.result.count < 4) {  // 如果没有数据了，就禁止滚动
                this.busy = true
              } else {
                this.busy = false
              }
            } else {
              this.goodsList = res.result.list  // 不需要分页，就只要获取数据
              this.busy = false  // 开启滚动
            }
          } else {
            this.goodsList = []
          }
        })
      },
      showFilterPop () {
        this.filterBy = true
        this.overLayFlag = true
      },
      closePop () {
        this.filterBy = false
        this.overLayFlag = false
      },
      sortGoods () {  // 商品排序
        this.sortFlag = !this.sortFlag  // 是否排序
        this.page = 1 // 页面从第一页开始
        this.getGoodsList() // 数据重新加载(当用户在第三页的时候，点击排序，页面重新开始)
      },
      loadMore () { // 鼠标滚动的时候，调用的方法
        this.busy = true  // 刚开始 禁止滚动
        setTimeout(() => {
          this.page++
          this.getGoodsList(true) // 重新加载数据
        }, 1000)
      },
      closeModal () {
        this.mdShow = false
      }
    }
  }
</script>

<style lang="less">
  .loadmore {
    text-align: center;
    margin:0 auto;
  }
  .sort-up {
    transform: rotate(180deg);
    transition: all .3s ease-out
  }
  .icon-arrow-short {
    transition: all .3s ease-out
  }
  .btn:hover{
    background: #ee7a23;
    transition: all .3s ease-out
  }
</style>
