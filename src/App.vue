<template>
  <div id="app">
    <v-header :class="{headerActive:flag}" :sellerinfo='sellerinfo' class="header" @openCover="openCover"></v-header>
    <div class="tab" :class="{tabActive:flag}">
      <router-link to='/goods' tag='li'>商品</router-link>
      <router-link to='/ratings' tag='li'>评价</router-link>
      <router-link to='/seller' tag='li'>商家</router-link>
    </div>
    <router-view :class="{contActive:flag}" :goodsinfo="goodsinfo"></router-view>
    <shopcart :class="{shopActive:flag}" :goods="goodsinfo" class="shopcart"></shopcart>
    <cover class='cover' :class="{active:flag}" @closeCover="closeCover"></cover>
  </div>
</template>

<script>
import header from './components/header'
import cover from './components/cover'
import shopcart from './components/shopcart'
import axios from 'axios'
export default {
  data(){
    return{
      sellerinfo: {},
      goodsinfo:[],
      flag: false
    }
  },
  components:{
    'v-header' : header,
    shopcart,    
    cover
  },
  methods:{
    openCover(){
      this.flag = true;
    },
    closeCover(){
      this.flag = false;
    }
  },
  created(){
    axios.get('/eleme/seller').then((res)=>{
      // console.log(res.data.data);
      this.sellerinfo = res.data.data;  
    })
    axios.get('/eleme/goods').then((res)=>{
      // console.log(res.data.data);
      this.goodsinfo = res.data.data; 
    })
  }
}
</script>

<style lang="less" scoped>
  #app{
    .header{
      position: relative;
      width: 100%;
    }
    .tab{
      position: relative;
      display: flex;
      width: 100%;
      height: 40px;
      background-color: rgb(255, 255, 255);
      border-bottom: 1px solid rgba(7, 17,27,0.1);
      li{
        flex: 1 1 100px;
        height: 100%;
        line-height: 40px;
        text-align: center;
        font-size: 16px;
        font-weight: bold;
        color: rgb(77,85,93);
        &.router-link-exact-active{
          color: rgb(240,20,20);
        }
      }
    }
    .shopcart{
      position: fixed;
      bottom: 0;
      width: 100%;
    }
    .cover{
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      transform: translate3d(0,-100%,0);
      transition: all 0.2s linear 0s;
      &.active{
        transform: translate3d(0,0,0);
      }
    }
    .headerActive,
    .tabActive,
    .contActive,
    .shopActive{
      filter: blur(2px);
    }
  }
  
</style>


