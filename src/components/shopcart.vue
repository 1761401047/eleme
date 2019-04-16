<template>
    <div class="shopcart">
        <div class="cart-info">
            <div class="icon icon-shopping_cart" :class="{active:goodCount}" @click="showcart"></div>
            <div class="tip" v-show="goodCount">{{goodCount}}</div>
            <div class="price">
                <div class="value" :class="{active:goodPrice}">￥{{goodPrice}}</div>
                <div class="des">另需配送费￥{{sellerinfo.deliveryPrice}}</div>
            </div>
            <div class="buy-btn" :class="{active:goodPrice>=sellerinfo.minPrice}">{{buyInfo}}</div>
        </div>
        <div class="cart-cont" :class="{active:flag}">
            <div class="header">
                <div class="title">购物车</div>
                <div class="clear" @click="clearcart">清空</div>
            </div>
            <div class="good-list">
                <ul>
                    <li class="good-item" v-for="(item,index) in goodArr" :key="index" v-show="item.count">
                        <div class="name">{{item.name}}</div>
                        <div class="single-price">￥{{item.price}}</div>
                        <countbtn class='btn' :singlefood="item"></countbtn>
                    </li>
                </ul>
            </div>
        </div>
        <div class="cover" :class="{active:flag}" @click="hidecart"></div>
    </div>
</template>

<script>
import goodsVue from './goods.vue';
import countbtn from './countbtn.vue';
import axios from 'axios';

export default {
    data(){
        return{ 
            sellerinfo: {},
            flag: false
        }
    },
    computed:{
        goodArr(){
            var arr = [];
            this.goods.forEach((item,index)=>{
                item.foods.forEach((value,index)=>{
                    if(value.count !== undefined){
                        arr.push(value);
                    }
                })
            })
            console.log(arr);
            return arr;
        },
        goodCount(){
            var count = 0;
            this.goodArr.forEach((item,index)=>{
                count += item.count;
            })
            return count;
        },
        goodPrice(){
            var totalPice = 0;
            if(this.goodCount > 0){
                this.goodArr.forEach((item,index)=>{
                    totalPice += item.price * item.count;
                })
            }    
            return totalPice;
        },
        buyInfo(){
            var str = '',
                minPrice = this.sellerinfo.minPrice;
            if(this.goodPrice === 0){
                str = '￥' + minPrice + '起送'
            }else if(this.goodPrice < minPrice){
                str = '还差￥' + (minPrice - this.goodPrice) + '起送'
            }else{
                str = '去结算'
            }
            return str;
        }
    },
    methods:{
        showcart(){
            if(this.goodCount){
                this.flag = !this.flag;
            }
        },
        hidecart(){
            this.flag = false;
        },
        clearcart(){
            this.goodArr.forEach((item,index)=>{
                item.count = 0;
            })
            this.flag = false;
        }
    },
    components:{
        countbtn
    },
    props:{
        goods:{
            type: Array,
            required: true
        }
    },
    created(){
        axios.get('/eleme/seller').then((res)=>{
            // console.log(res.data.data);
            this.sellerinfo = res.data.data;
        })
          
    }
}
</script>

<style lang="less" scoped>
    @import '../../static/style.css';
    .shopcart{
        width: 100%;
        font-size: 0px;   
        .cart-info{
            position: relative;
            width: 100%;
            height: 50px;
            background-color: #141d27;
            z-index: 2;
            .icon{
                position: absolute;
                top: -12px;
                left: 18px;
                display: inline-block;
                width: 45px;
                height: 45px;
                font-size: 24px;
                color: rgb(150,150,150);
                background-color: rgba(55,55,55,1);
                border-radius: 50%;
                border: 7px solid #141d27;
                text-align: center;
                line-height: 45px;
                &.active{
                    color: rgb(255,255,255);
                    background-color: rgb(0,160,220)
                }
            }
            .tip{
                position: absolute;
                top: -12px;
                left: 50px;
                width: 28px;
                height: 16px;
                border-radius: 18px;
                font-size: 11px;
                font-weight: 600;
                color: #fff;
                text-align: center;
                line-height: 16px;
                background-color: red;
            }
            .price{
                position: absolute;
                left: 85px;
                height: 100%;
                .value{
                    vertical-align: middle;
                    display: inline-block;
                    height: 25px;
                    line-height: 25px; 
                    font-size: 18px;
                    color: rgb(150,150,150);;
                    font-weight: 700;          
                    padding-right: 12px;
                    margin-right: 12px;
                    box-sizing: border-box;     
                    border-right: 1px solid rgba(255,255,255,0.2);
                    &.active{
                        color: rgb(255,255,255);
                    }
                }
                .des{
                    vertical-align: middle;
                    line-height: 50px;
                    display: inline-block;
                    font-size: 12px;
                    color: rgb(150,150,150);
                }
            }
            .buy-btn{
                position: absolute;
                right: 0;   
                width: 105px;
                height: 50px;
                line-height: 50px;
                text-align: center;
                font-size: 14px;
                color: rgb(150,150,150);;
                font-weight: 700;   
                background-color: rgba(50,50,50,0.5); 
                &.active{
                    color: rgb(255,255,255);
                    background-color: green;
                }
            }
        } 
        .cart-cont{
            position: absolute;
            bottom: 50px;
            width: 100%;
            background-color:rgb(255,255,255);
            z-index: 1;
            transform: translate3d(0,100%,0);
            transition: all 0.1s linear 0s;
            &.active{
                transform: translate3d(0,0,0);
            }
            .header{
                position: relative;
                width: 100%;
                height: 40px;
                background-color: rgba(200,200,200,0.4);
                border-bottom: 1px solid rgba(7,17,27,0.1);
                .title{
                    display: inline-block;
                    height: 100%;
                    line-height: 40px;
                    margin-left: 20px;
                    font-size: 16px; 
                    color: rgb(7,17,27)
                }
                .clear{
                    position: absolute;
                    top: 50%;
                    right: 20px;
                    transform: translate3d(0,-50%,0);
                    font-size: 15px;
                    color:rgb(0,160,200);           
                }
            }
            .good-list{
                position: relative;
                width: 100%;
                max-height: 237px;
                overflow: auto;
                ul{
                    width: 100%;
                    padding: 0 20px;
                    box-sizing: border-box;
                    li{
                        position: relative;
                        width: 100%;
                        height: 48px;
                        font-size: 16px;
                        border-bottom: 1px solid rgba(7,17,27,0.1);
                        .name{
                           position: absolute;
                           top: 50%;
                           left: 0;
                           transform: translate3d(0,-50%,0);
                           font-weight: 700;
                           color: rgb(7,17,27);
                        }
                        .single-price{
                           position: absolute;
                           top: 50%;
                           right: 85px;
                           transform: translate3d(0,-50%,0);
                           font-weight: bold;
                           color: rgb(240,20,20); 
                        }
                        .btn{
                           position: absolute;
                           top: 50%;
                           right: 0;
                           transform: translate3d(0,-50%,0);
                        }
                    }
                }
            }
        }     
        .cover{
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            background-color: rgba(7,17,27,0);
            z-index: -1;
            visibility: hidden;
            transition: all 0.1s linear 0s;
            &.active{
                visibility: visible;
                background-color: rgba(7,17,27,0.6);
            }
        }
    }
</style>


