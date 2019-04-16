<template>
    <div class="ratings-wrapper">
        <div class="header">
            <div class="comprehensive">
                <div class="score">{{sellerinfo.score}}</div>
                <div class="tip">综合评分</div>
                <div class="des">高于周边商家{{sellerinfo.rankRate}}%</div>
            </div>
            <div class="detail">
                <div class="food-rating">
                    <div class="tip">食品质量</div>
                    <div class="icon">
                        <ul>
                            <li class="solid-start" v-for="n in foodsolidStartCount" :key="n+'a'"></li>
                            <li class="hollow-start" v-for="n in (5-foodsolidStartCount)" :key="n+'b'"></li>
                        </ul>
                    </div>
                    <div class="score">{{sellerinfo.foodScore}}</div>
                </div>
                <div class="service-rating">
                    <div class="tip">服务态度</div>
                    <div class="icon">
                        <ul>
                            <li class="solid-start" v-for="n in servicesolidStartCount" :key="n+'a'"></li>
                            <li class="hollow-start" v-for="n in (5-servicesolidStartCount)" :key="n+'b'"></li>
                        </ul>
                    </div>
                    <div class="score">{{sellerinfo.serviceScore}}</div>
                </div>
                <div class="deliveryTime">
                    <div class="tip">送达时间</div>
                    <div class="time">{{sellerinfo.deliveryTime}}分钟</div>
                </div>
            </div>
        </div>
        <div class="choose-wrap">
            <div class="tab">
                <div class="all-ratings" @click="changeTab(1)" :class="{active:flag1}"><span class="type">全部</span><span class="num">{{allRatings.length}}</span></div>
                <div class="satisfy-ratings" @click="changeTab(2)" :class="{active:flag2}"><span class="type">满意</span><span class="num">{{satisfyRatings.length}}</span></div>
                <div class="unsatisfy-ratings" @click="changeTab(3)" :class="{active:flag3}"><span class="type">不满意</span><span class="num">{{unsatisfyRatings.length}}</span></div>
            </div>
            <div class="onlyhascont">
                <div class="icon icon-check_circle" @click="onlyFlag=!onlyFlag" :class="{active:onlyFlag}"></div>
                <div class="text">只看有内容的评价</div>
            </div>
        </div>
        <div class="ratings-list">
            <ul>
                <li class="rating-item" v-for="(item,index) in activeRatings" :key="index">
                    <img :src="item.avatar" alt="" class="head-pic">
                    <div class="cont">
                        <div class="name">{{item.username}}</div>
                        <div class="des">
                            <div class="score-icon">
                                <ul>
                                    <li class="solid-start" v-for="(n,index) in Math.round(item.score)" :key="index+'a'"></li>
                                    <li class="hollow-start" v-for="(n,index) in (5-Math.round(item.score))" :key="index+'b'"></li>
                                </ul>
                            </div>
                            <div class="delivery-time">{{item.deliveryTime}}分钟送达</div>
                        </div>
                        <div class="rating-cont">{{item.text}}</div>
                        <div class="goods-type">
                            <div class="icon" :class="{'icon-thumb_up':item.rateType===0,'icon-thumb_down':item.rateType===1}"></div>
                            <ul class="goods-list">
                                <li class="good-item" v-for="(value,index) in item.recommend" :key="index">{{value}}</li>
                            </ul>
                        </div>
                    </div>
                    <div class="date">{{item.dateTime}}</div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data(){
        return{
            ratings:[],
            sellerinfo:{},
            flag1:true,
            flag2:false,
            flag3:false,
            onlyFlag:false
        }
    },
    computed:{
        foodsolidStartCount(){
            var count = Math.round(this.sellerinfo.foodScore);
            return count;
        },
        servicesolidStartCount(){
            var count = Math.round(this.sellerinfo.serviceScore);
            return count;
        },
        allRatings(){
            return this.ratings;
        },
        satisfyRatings(){
            var arr = [];
            this.ratings.forEach((item,index)=>{
                if(item.rateType === 0){
                    arr.push(item);
                }
            })
            return arr;
        },
        unsatisfyRatings(){
            var arr = [];
            this.ratings.forEach((item,index)=>{
                if(item.rateType === 1){
                    arr.push(item);
                }
            })
            return arr;
        },
        onlycontRatings(){
            var allArr = [],
                satisfyArr = [],
                unsatisfyArr = [];
            this.ratings.forEach((item,index)=>{
                if(Boolean(item.text)){
                    allArr.push(item);
                    if(item.rateType === 0){
                        satisfyArr.push(item);
                    }else{
                        unsatisfyArr.push(item);
                    }
                }
            })
            return {
                allArr,
                satisfyArr,
                unsatisfyArr
            }
        },
        activeRatings(){        
            if(this.onlyFlag === true){
                if(this.flag1 === true){
                    return this.onlycontRatings.allArr;
                }else if(this.flag2 === true){
                    return this.onlycontRatings.satisfyArr;
                }else{
                    return this.onlycontRatings.unsatisfyArr;
                }
            }else{
                if(this.flag1 === true){
                    return this.allRatings;
                }else if(this.flag2 === true){
                    return this.satisfyRatings;
                }else{
                    return this.unsatisfyRatings;
                }
            }
        }
    },
    methods:{
        changeTab(index){
            this.flag1 = false;
            this.flag2 = false;
            this.flag3 = false;
            this['flag'+index] = true;
        },
        transToDate(num){
            var date = new Date(num),
                dateStr = '',
                timeStr = '';
            dateStr = date.toLocaleDateString();
            dateStr = dateStr.split('/').join('-');
            var timeArr = date.toTimeString().split(' ')[0].split(':');
            timeArr.pop();
            timeStr = timeArr.join(':');
            return dateStr + ' ' + timeStr;
        },
    },
    created(){
        axios.get('/eleme/ratings').then((res)=>{
            // console.log(res.data.data);
            this.ratings = res.data.data;   
            this.ratings.forEach((item,index)=>{
                item.dateTime = this.transToDate(item.rateTime);
            });
        })
        axios.get('/eleme/seller').then((res)=>{
            // console.log(res.data.data);
            this.sellerinfo = res.data.data;  
        })
    }
}
</script>
<style lang="less" scoped>
    @import '../../static/style.css';
    .ratings-wrapper{
        position: absolute;
        width: 100%;
        top: 173px;
        bottom: 50px;
        overflow: auto;
        font-size: 0px;
        background-color: rgba(180,180,180,0.1);
        .header{
            display: flex;
            width: 100%;
            height: 100px;
            padding: 18px 24px;
            box-sizing: border-box;
            background-color: rgba(255,255,255);   
            min-width: 375px;
            margin-bottom: 18px;         
            .comprehensive{
                flex: 0 0 107px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: center;
                padding-right: 24px;
                border-right: 1px solid rgba(7,17,27,0.1);
                .score{
                    font-size: 24px;
                    color: rgb(255,153,0);
                }
                .tip{
                    font-size: 12px;
                    font-weight: 700;
                    color: rgb(7,17,27);
                }
                .des{
                    font-size: 10px;
                    color: rgba(7,17,27,0.4);
                }
            }
            .detail{
                flex: 1 0 100px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: flex-start;
                padding-left: 24px;
                .food-rating,
                .service-rating{
                    display: flex;
                    width: 100%;
                    align-items: center;
                    .tip{
                        font-size: 12px;
                        font-weight: 700;
                        color: rgb(7,17,27);
                        margin-right: 12px;
                    }
                    .icon{
                        margin-right: 12px;
                        ul{
                            li{
                                display: inline-block;
                                width: 12px;
                                height: 12px;
                                background-size: 12px 12px;
                                margin: 0 2px;
                            }
                            .solid-start{
                                background-image: url('../assets/images/star48_on@2x.png')       
                            }
                            .hollow-start{
                                background-image: url('../assets/images/star48_off@2x.png')       
                            }
                        }
                    }
                    .score{
                        font-size: 12px;
                        color: rgb(255,153,0);
                    }
                }
                .deliveryTime{
                    div{
                        display: inline-block;
                    }
                    .tip{
                        font-size: 12px;
                        font-weight: 700;
                        color: rgb(7,17,27);
                        margin-right: 12px;
                    }
                    .time{
                        font-size: 12px;
                        color: rgb(147,153,159);
                    }
                }
            }
        }
        .choose-wrap{
            display: inline-block;
            width: 100%;
            background-color: rgb(255,255,255);
            border-bottom: 1px solid rgba(7,17,27,0.1);
            .tab{
                margin: 18px 18px 0 18px;
                padding-bottom: 18px;
                border-bottom: 1px solid rgba(7,17,27,0.1);
                div{
                    display: inline-block;
                    font-size: 13px;
                    padding: 14px 15px;
                    margin-right: 10px;
                    border-radius: 2px;
                    color: rgb(7,17,27);
                    &.active{
                        color: rgba(255,255,255,1);
                        // font-weight: 700;
                    }
                    .type{
                        font-size: 13px;
                        margin-right: 3px;
                    }
                    .num{
                        font-size: 10px;
                    }
                }
                .all-ratings{
                    background-color:rgb(19, 177, 235);
                }
                .satisfy-ratings{
                    background-color:rgb(197, 233, 247);               
                }
                .unsatisfy-ratings{
                    background-color:rgb(221, 229, 230);                    
                }
            }
            .onlyhascont{
                margin: 12px 18px;            
                .icon{
                    display: inline-block;
                    font-size: 30px;  
                    color: rgba(180,180,180,0.9); 
                    vertical-align: middle;  
                    margin-right: 4px; 
                    &.active{
                        color:rgb(19, 177, 235);
                    }
                }
                .text{
                    display: inline-block;
                    font-size: 14px;
                    color: rgba(170,170,170,1);
                    vertical-align: middle;
                }
            }
        }
        .ratings-list{
            display: inline-block;
            width: 100%;
            background-color: rgba(255,255,255);               
            ul{
                width: 100%;
                .rating-item{
                    position: relative;
                    margin: 18px;
                    border-bottom: 1px solid rgba(7,17,27,0.1);   
                    .head-pic{
                        display: inline-block;
                        width: 38px;
                        height: 38px;
                        border-radius: 50%;
                        margin-right: 16px;
                        vertical-align: top;
                    }    
                    .cont{
                        display: inline-block;
                        vertical-align: top;
                        width: calc(100% - 54px);
                        .name{
                            font-size: 10px;
                            color: rgb(7,17,27);
                            margin-bottom: 4px;
                        }
                        .des{
                            margin-bottom: 6px;
                            .score-icon{
                                display: inline-block;
                                margin-right: 6px;
                                ul{
                                    li{
                                        display: inline-block;
                                        width: 11px;
                                        height: 11px;
                                        background-size: 11px 11px;
                                    }
                                    .solid-start{
                                        background-image: url('../assets/images/star48_on@2x.png')       
                                    }
                                    .hollow-start{
                                        background-image: url('../assets/images/star48_off@2x.png')       
                                    }
                                }
                            }
                            .delivery-time{
                                display: inline-block;
                                font-size: 10px;
                                font-weight: 200;
                                color: rgb(147,153,159);
                            }
                        }
                        .rating-cont{
                            font-size: 12px;
                            color: rgb(7,17,27);
                            line-height: 18px;
                            margin-bottom: 12px;
                        }
                        .goods-type{
                            margin-bottom: 15px;
                            .icon{
                                display: inline-block;
                                font-size: 12px;   
                                margin-right: 6px;  
                                vertical-align: top;
                            }
                            .icon-thumb_up{
                                color: rgb(14, 168, 224);
                            }
                            .icon-thumb_down{
                                color: rgb(183, 187, 191);
                            }
                            .goods-list{
                                display: inline-block;
                                width: calc(100% - 20px);
                                vertical-align: top;
                                margin-top: -4px;
                                .good-item{
                                    display: inline-block;
                                    font-size: 12px;
                                    text-align: center;
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                    white-space: nowrap;
                                    margin-right: 8px;
                                    margin-bottom: 6px;
                                    padding: 3px 6px;
                                    border: 1px solid rgba(7,17,27,0.1);
                                    font-size: 10px;
                                    color: rgb(147,153,159);
                                }
                            }
                        }
                    } 
                    .date{
                        position: absolute;
                        top: 0;
                        right: 0;
                        font-size: 12px;
                        color: rgb(147,153,159);
                    }
                }
            }
        }
    }
</style>