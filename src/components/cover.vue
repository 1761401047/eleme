<template>
    <div class="cover-wrapper">
        <div class="header">
            <div class="title">{{sellerinfo.name}}</div>
            <div class="rating">
                <ul>
                    <li class="solid-start" v-for="n in solidStartCount" :key="n+'a'"></li>
                    <li class="hollow-start" v-for="n in (5-solidStartCount)" :key="n+'b'"></li>
                </ul>
            </div>
        </div>
        <div class="info-wrap">
            <div class="support-wrap">
                <div class="title">优惠信息</div>
                <div class="cont">
                    <ul>
                        <li class="item" v-for="(item,index) in sellerinfo.supports" :key="index">
                            <div class="icon" :class="iconClassArr[item.type]"></div>
                            <div class="text">{{item.description}}</div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="notice-wrap">
                <div class="title">商家公告</div>
                <div class="cont">{{sellerinfo.bulletin}}</div>
            </div>
        </div>
        <div class="close icon-close" @click="close"></div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return{
            sellerinfo:{},
            iconClassArr:[
                "decrease",
                "discount",
                "special",
                "invoice",
                "guarantee"
            ],
        }
    },
    computed:{
        solidStartCount(){
            var count = Math.round(this.sellerinfo.score);
            return count;
        }
    },
    methods:{
        close(){
            this.$emit('closeCover');
        }
    },
    created(){
        axios.get('/eleme/seller').then(
            (res)=>{
                console.log(res.data.data);
                this.sellerinfo = res.data.data;
            }
        )
    }
}
</script>

<style lang="less" scoped>
    @import '../../static/style.css';
    .cover-wrapper{
        width: 100%;
        height: 100%;
        font-size: 0px;     
        overflow: auto;
        background-color: rgba(7,17,27,0.6);
        .header{
            position: relative;
            width: 100%;
            height: 132px;
            .title{
                position: absolute;
                top: 64px;
                left: 50%;
                transform: translate3d(-50%,0,0);
                font-size: 16px;
                font-weight: 700;
                color: rgb(255,255,255);
                line-height: 32px;         
            }
            .rating{
                position: absolute;
                top: 96px;
                left: 50%;
                transform: translate3d(-50%,0,0);                
                height: 24px;
                ul{
                    height: 100%;
                    white-space: nowrap;
                    li{
                        display: inline-block;
                        width: 20px;
                        height: 20px;
                        background-size: 20px 20px;
                        margin: 0 10px;
                    }
                    .solid-start{
                        background-image: url('../assets/images/star48_on@2x.png')       
                    }
                    .hollow-start{
                        background-image: url('../assets/images/star48_off@2x.png')       
                    }
                }
            }
        }
        .info-wrap{
            position: absolute;
            top: 132px;
            width: 100%;
            padding: 0 36px;
            box-sizing: border-box;
            .support-wrap{
                width: 100%;
                .title{
                    display: inline-block;
                    width: 100%;
                    text-align: center;
                    font-size: 15px;
                    font-weight: 700;
                    color: rgb(255,255,255);
                    line-height: 25px;
                    &::before{
                        content: '';
                        display: inline-block;
                        width: 35%;
                        height: 2px;
                        background-color: rgba(255,255,255,0.2);
                        margin-right: 12px;
                        vertical-align: middle;
                    }
                    &::after{
                        content: '';
                        display: inline-block;
                        width: 35%;
                        height: 2px;
                        background-color: rgba(255,255,255,0.2);
                        margin-left: 12px;
                        vertical-align: middle;
                    }
                }
                .cont{
                    margin: 24px 12px;
                    ul{
                        width: 100%;
                        .item{
                            width: 100%;
                            margin-bottom: 8px;
                            .icon{  
                                display: inline-block;
                                margin-right: 6px;
                                border-radius: 2px;
                                vertical-align: middle;
                            }
                            .text{
                                display: inline-block;
                                font-size: 12px;
                                font-weight: 200;
                                color: rgb(255,255,255);
                                line-height: 12px;
                                vertical-align: middle;
                            }
                        }
                    }
                }
            }
            .notice-wrap{
                width: 100%;
                .title{
                    display: inline-block;
                    width: 100%;
                    text-align: center;
                    font-size: 15px;
                    font-weight: 700;
                    color: rgb(255,255,255);
                    line-height: 25px;
                    &::before{
                        content: '';
                        display: inline-block;
                        width: 35%;
                        height: 2px;
                        background-color: rgba(255,255,255,0.2);
                        margin-right: 12px;
                        vertical-align: middle;
                    }
                    &::after{
                        content: '';
                        display: inline-block;
                        width: 35%;
                        height: 2px;
                        background-color: rgba(255,255,255,0.2);
                        margin-left: 12px;
                        vertical-align: middle;
                    }
                } 
                .cont{
                    margin: 24px 12px;
                    font-size: 12px;
                    font-weight: 200;
                    color: rgb(255,255,255);
                    line-height: 24px;
                }
            }
        }
        .close{
            position: absolute;
            bottom: 32px;
            left: 50%;
            transform: translate3d(-50%,0,0);
            font-size: 32px;
            color: rgba(255,255,255,0.5);
        }
    }
    .decrease{
        width: 17px;
        height: 17px;
        background-image: url('../assets/images/decrease_1@2x.png');
        background-size: 17px 17px;
    }
    .discount{
        width: 17px;
        height: 17px;
        background-image: url('../assets/images/discount_1@2x.png');
        background-size: 17px 17px;
    }
    .special{
        width: 17px;
        height: 17px;
        background-image: url('../assets/images/special_1@2x.png');
        background-size: 17px 17px;
    }
    .invoice{
        width: 17px;
        height: 17px;
        background-image: url('../assets/images/invoice_1@2x.png');
        background-size: 17px 17px;
    }
    .guarantee{
        width: 17px;
        height: 17px;
        background-image: url('../assets/images/guarantee_1@2x.png');
        background-size: 17px 17px;
    }
</style>
