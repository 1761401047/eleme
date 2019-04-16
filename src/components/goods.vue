<template>
    <div class="good-wrapper">
        <ul class="menu-list" :class="{menuActive:flagtow}">   
            <li v-for="(item,index) in goodsinfo" :key="index" class="menu-item" :class="{active:activeIndex===index}" @click="selectIndex(index,$event)">
                <div class="item-wrap">
                    <span v-show="item.type >= 0" :class="iconClassArr[item.type]"></span>
                    <span class='item-name'>{{item.name}}</span>
                </div>
            </li>
        </ul>
        <div class="good-list" ref='scrollDiv' :class="{listActive:flagtow}">
            <div class="good-group" v-for="(item,index) in goodsinfo" :key="index" >
                <div class="group-title" ref="titleDiv">{{item.name}}</div>
                <div class="group-wrap">
                    <div class="good-item" v-for="(value,index) in item.foods" :key="index">                    
                        <img :src="value.image" alt="" class="item-pic">
                        <div class="item-info">
                            <div class="item-name">{{value.name}}</div>
                            <div class="description" v-show="value.description">{{value.description}}</div>
                            <div class="sellcount-and-rating">
                                <span>月售{{value.sellCount}}份</span><span class="rating">好评率{{value.rating}}%</span>
                            </div>
                            <div class="price">
                                <span class="new-price">￥{{value.price}}</span>
                                <span class="old-price" v-show="value.oldPrice">￥{{value.oldPrice}}</span>
                            </div>
                        </div> 
                        <countbtn class='btn' :singlefood="value"></countbtn>
                    </div>
                 </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import Vue from 'vue'
import countbtn from './countbtn'

export default {
    data(){
        return{
            iconClassArr:[
                "decrease",
                "discount",
                "special",
                "invoice",
                "guarantee"
            ],
            activeIndex: -1,
            titleArr: [],
            flag: true
        }
    },
    props:{
        goodsinfo:{
            type:Array,
            required:true
        }
    },
    methods:{
        selectIndex(index,e){
            var titleDiv = this.$refs.titleDiv;
            this.activeIndex = index;
            this.$refs.scrollDiv.scrollTop = titleDiv[index].offsetTop;
            if(this.flag){
                this.flag = false;
                titleDiv.forEach((item,index)=>{
                    this.titleArr = item.offsetTop;
                });
            }
        },
        throttle(method,delay){
            var last = 0;
            return function(){
                var now = +new Date();//等同于getTime
                if(now - last > delay){
                    method.apply(this,arguments);
                    last = now;
                }
            }
        }
    },
    components:{
        countbtn
    },
    mounted(){
        var that = this;
        var callback = function(){  
            if(that.flag){
                var titleDiv = that.$refs.titleDiv;
                that.flag = false;
                titleDiv.forEach((item,index)=>{
                    that.titleArr.push(item.offsetTop);
                });
            }
            var len = that.titleArr.length;
            for(var i = 0; i < len; i++){
                if(i === len - 1){
                    that.activeIndex = i;
                }else if(this.scrollTop > that.titleArr[i] - 50 && this.scrollTop < that.titleArr[i + 1] - 50){
                    that.activeIndex = i;
                    break;
                }
            }
        }
        this.$refs.scrollDiv.onscroll = this.throttle(callback,100)
    }
}
</script>
<style lang="less" scoped>
    @import '../../static/style.css';
    .good-wrapper{
        display: flex;
        position: absolute;
        top: 173px;
        bottom: 50px;
        width: 100%;
        border-bottom: 1px solid #ccc;
        background-color: rgb(255, 255, 255);
        .menu-list{   
            flex: 0 0 80px;
            overflow: auto;
            background-color: rgba(180, 180, 180, 0.2);      
            .menu-item{
                width: 100%;
                height: 54px;
                text-align: center;
                padding: 0 6px;
                box-sizing: border-box;
                font-size: 16px;
                .item-wrap{
                    display: flex;
                    align-items: center;
                    width: 100%;
                    height: 100%;
                    border-bottom: 1px solid rgba(7,17,27,0.1);  
                    .item-name{
                        flex: 1 1 10px;
                    }
                }
                &.active{
                    font-weight: bold;
                    background-color: rgb(255,255,255);
                    .item-wrap{
                        border-bottom: none;
                    }
                }
            }
        }
        .good-list{
            position: relative;
            flex: 1 1 auto;
            overflow: auto;
            .good-group{
                width: 100%;
                .group-title{
                    width: 100%;
                    height: 35px;
                    line-height: 35px;
                    padding-left: 15px;
                    font-size: 16px;
                    font-weight: 700;
                    color: rgba(100,100,100,0.9);
                    background-color: rgba(180,180,180,0.2);
                    border-left: 4px solid rgba(120,120,120,0.5);
                    box-sizing: border-box;
                }
                .group-wrap{
                    width: 100%;
                    padding: 0 18px;
                    box-sizing: border-box;
                    .good-item{
                        position: relative;
                        width: 100%;
                        border-bottom: 1px solid rgba(180,180,180,0.4);
                        .item-pic{
                            display: inline-block;
                            margin-top: 18px;
                            width: 64px;
                            height: 64px;
                            border-radius: 2px;
                            vertical-align: top;
                        }
                        .item-info{
                            display: inline-block;
                            width: 60%;
                            margin-top: 20px;
                            margin-left: 10px;
                            vertical-align: top;
                            .item-name{
                                margin-bottom: 8px;
                                font-size: 14px;
                                color: rgb(7,17,27);
                            }
                            .description,
                            .sellcount-and-rating{
                                margin-bottom: 8px;
                                font-size: 10px;
                                color: rgb(147,153,159);
                            }
                            .sellcount-and-rating{
                                .rating{
                                    margin-left: 12px;
                                }
                            }
                            .price{
                                margin-bottom: 18px;               
                                font-weight: 700;
                                line-height: 24px;
                                .new-price{  
                                    font-size: 14px;                                 
                                    color: rgb(240,20,20);     
                                }
                                .old-price{
                                    font-size: 10px;
                                    color: rgb(147,153,159);
                                    text-decoration: line-through;
                                }
                            }
                        }
                        .btn{
                            position: absolute;
                            right: 0px;
                            bottom: 18px;
                        }
                    }
                }
            }
        }  
    }
    .decrease{
        width: 12px;
        height: 12px;
        background-image: url('../assets/images/decrease_3@2x.png');
        background-size: 12px 12px;
    }
    .discount{
        width: 12px;
        height: 12px;
        background-image: url('../assets/images/discount_3@2x.png');
        background-size: 12px 12px;
    }
    .special{
        width: 12px;
        height: 12px;
        background-image: url('../assets/images/special_3@2x.png');
        background-size: 12px 12px;
    }
    .invoice{
        width: 12px;
        height: 12px;
        background-image: url('../assets/images/invoice_3@2x.png');
        background-size: 12px 12px;
    }
    .guarantee{
        width: 12px;
        height: 12px;
        background-image: url('../assets/images/guarantee_3@2x.png');
        background-size: 12px 12px;
    }
</style>



