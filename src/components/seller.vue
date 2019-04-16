<template>
    <div class="seller-wrapper">
        <div class="header">
            <div class="des">
                <div class="name">{{sellerinfo.name}}</div>
                <div class="rating-and-sellcount">
                    <div class="rating">
                        <div class="rating-icon">
                            <ul>
                                <li class="solid-start" v-for="n in solidStartCount" :key="n+'a'"></li>
                                <li class="hollow-start" v-for="n in (5-solidStartCount)" :key="n+'b'"></li>
                            </ul>
                        </div>
                        <div class="rating-count">({{sellerinfo.ratingCount}})</div>
                    </div>
                    <div class="sellcount">
                        月售{{sellerinfo.sellCount}}单
                    </div>
                </div>
                <div class="collection" :class="{active:isCollection}">
                    <div class="icon icon-favorite" @click="isCollection=!isCollection"></div>
                    <div class="text" v-if="isCollection">已收藏</div>
                    <div class="text" v-else>收藏</div>                    
                </div>
            </div>
            <div class="info">
                <div class="minPrice">
                    <div class="title">起送价</div>
                    <div class="value">{{sellerinfo.minPrice}}<span class="unit">元</span></div>
                </div>
                <div class="deliveryPrice">
                    <div class="title">商家配送</div>
                    <div class="value">{{sellerinfo.deliveryPrice}}<span class="unit">元</span></div>
                </div>
                <div class="deliveryTime">
                    <div class="title">平均配送时间</div>
                    <div class="value">{{sellerinfo.deliveryTime}}<span class="unit">分钟</span></div>
                </div>
            </div>
        </div>
        <div class="notice-and-supports">
            <div class="title">公告与活动</div>
            <div class="notice">{{sellerinfo.bulletin}}</div>
            <div class="supports">
                <ul class="supports-list">
                    <li class="support-item" v-for="(item,index) in sellerinfo.supports" :key="index">
                        <div class="icon" :class="iconClassArr[item.type]"></div>
                        <div class="text">{{item.description}}</div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="seller-view">
            <div class="title">商家实景</div>
            <ul class="pics-list">
                <img v-for="(item,index) in sellerinfo.pics" :key="index" :src="item" alt="" class="pic-item">
            </ul>
        </div>
        <div class="seller-info">
            <div class="title">商家实景</div>
            <ul class="infos-list">  
                <li class="info-item" v-for="(item,index) in sellerinfo.infos" :key="index">{{item}}</li>
            </ul>
        </div>
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
            isCollection:false
        }
    },
    computed:{
        solidStartCount(){
            var count = Math.round(this.sellerinfo.score);
            return count;
        }
    },
    created(){
        axios.get('/eleme/seller').then((res)=>{
            console.log(res.data.data);
            this.sellerinfo = res.data.data;  
        })
    }
}
</script>
<style lang="less" scoped>
    @import '../../static/style.css';
    .seller-wrapper{
        position: absolute;
        top: 173px;
        bottom: 50px;
        width: 100%;
        font-size: 0;
        background-color: rgba(180,180,180,0.1);
        overflow: auto;
        .header{
            position: relative;
            width: 100%;
            margin-bottom: 18px;
            border-bottom: 1px solid rgba(7,17,27,0.1);
            background-color: rgb(255,255,255);
            .des{
                position: relative;
                margin: 0 18px;
                padding: 18px 0;
                border-bottom: 1px solid rgba(7,17,27,0.1);
                .name{
                    font-size: 15px;
                    font-weight: 700;
                    color: rgb(7,17,27);
                    margin-bottom: 8px;
                }
                .rating-and-sellcount{
                    .rating{
                        display: inline-block;
                        vertical-align: middle;
                        .rating-icon{
                            display: inline-block;
                            vertical-align: middle;
                            ul{
                                li{
                                    display: inline-block;
                                    width: 15px;
                                    height: 15px;
                                    background-size: 15px 15px;
                                }
                                .solid-start{
                                    background-image: url('../assets/images/star48_on@2x.png')       
                                }
                                .hollow-start{
                                    background-image: url('../assets/images/star48_off@2x.png')       
                                }
                            }
                        }
                        .rating-count{
                            display: inline-block;
                            vertical-align: middle;
                            margin-left: 8px;
                            margin-right: 12px;
                            font-size: 10px;
                            color: rgb(77,85,93);
                        }
                    }
                    .sellcount{
                        display: inline-block;
                        vertical-align: middle;
                        font-size: 10px;
                        color: rgb(77,85,93);
                    }
                }
                .collection{
                    position: absolute;
                    top: 50%;
                    right: 0;
                    transform: translate3d(0,-50%,0);
                    text-align: center;
                    &.active{
                        .icon{
                            color: rgb(240,20,20);
                        }
                        .text{
                            color: rgba(77,85,93,1); 
                        }
                    }
                    .icon{
                        font-size: 24px;
                        color: rgba(7,17,27,0.3);
                        margin-bottom: 4px;
                    }
                    .text{
                        font-size: 10px;
                        color: rgba(77,85,93,0.6); 
                    }
                }
            }
            .info{
                display: flex;
                padding: 18px 0;
                .minPrice,
                .deliveryPrice,
                .deliveryTime{
                    flex: 1 1 10px;
                    text-align: center;
                    border-right: 1px solid rgba(7,17,27,0.1);
                    .title{
                        font-size: 10px;
                        color: rgb(147,153,159);
                        margin-bottom: 4px;
                    }
                    .value{
                        font-size: 24px;
                        font-weight: 500;
                        color: rgba(7,17,27,1);
                        .unit{
                            font-size: 10px;
                            font-weight: 200;
                        }
                    }
                }
                .deliveryTime{
                    border: none;
                }
            }
        }
        .notice-and-supports{
            position: relative;
            padding: 18px 18px 0 18px;
            background-color: rgb(255,255,255);
            border-top: 1px solid rgba(7,17,27,0.1);
            border-bottom: 1px solid rgba(7,17,27,0.1);
            margin-bottom: 16px;
            .title{
                font-size: 15px;
                font-weight: 700;
                color: rgb(7,17,27);
                margin-bottom: 8px;
            }
            .notice{
                font-size: 12px;
                font-weight: 500;
                color: rgb(7,17,27);
                line-height: 24px;
                margin-left: 12px;
                margin-bottom: 16px;
            }
            .supports{
                width: 100%;
                .supports-list{
                    width: 100%;
                    .support-item{
                        width: 100%;
                        padding: 16px 12px;
                        box-sizing: border-box;
                        border-top: 1px solid rgba(7,17,27,0.1);
                        .icon{
                            display: inline-block;
                            width: 17px;
                            height: 17px;
                            background-size: 17px 17px;
                            border-radius: 1px;
                            margin-right: 6px;
                            vertical-align: middle;
                        }
                        .text{
                            display: inline-block;
                            font-size: 12px;
                            font-weight: 500;
                            color: rgb(7,17,27);
                            line-height: 17px;
                            vertical-align: middle;
                        }
                    }
                }
            }
        }
        .seller-view{
            width: 100%;
            padding: 18px;
            box-sizing: border-box;
            background-color: rgb(255,255,255);
            border-top: 1px solid rgba(7,17,27,0.1);
            border-bottom: 1px solid rgba(7,17,27,0.1);  
            margin-bottom: 18px;          
            .title{
                font-size: 15px;
                font-weight: 700;
                color: rgb(7,17,27);
                margin-bottom: 12px;
            }
            .pics-list{
                width: 100%;
                white-space: nowrap;
                overflow-x: auto;
                .pic-item{
                    display: inline-block;
                    width: 120px;
                    height: 90px;
                    margin-right: 6px;
                    border: 1px solid rgba(7,17,27,0.3);
                    &:nth-last-of-type(1){
                        margin-right: 0px;
                    }
                }
            }
        }
        .seller-info{
            width: 100%;
            padding: 18px 18px 0 18px;
            box-sizing: border-box;
            background-color: rgb(255,255,255);
            border-top: 1px solid rgba(7,17,27,0.1);  
            .title{
                font-size: 15px;
                font-weight: 700;
                color: rgb(7,17,27);
                margin-bottom: 12px;
            }
            .infos-list{
                width: 100%;
                .info-item{
                    padding: 16px 12px;
                    font-size: 12px;
                    font-weight: 500;
                    color: rgb(7,17,27);
                    line-height: 16px;
                    border-top: 1px solid rgba(7,17,27,0.1);
                }
            }
        }
    }
    .decrease{
        background-image: url('../assets/images/decrease_4@3x.png');
    }
    .discount{
        background-image: url('../assets/images/discount_4@3x.png');
    }
    .special{
        background-image: url('../assets/images/special_4@3x.png');
    }
    .invoice{
        background-image: url('../assets/images/invoice_4@3x.png');
    }
    .guarantee{     
        background-image: url('../assets/images/guarantee_4@3x.png');
    }
</style>