<template>
    <div class="head-wrap">
        <div class="cont">
            <img class="cont-img" :src="sellerinfo.avatar" alt="">
            <div class="cont-info">
                <div class="title">
                    <div class="title-icon"></div>
                    <div class="title-name">{{sellerinfo.name}}</div>
                </div>
                <div class="delivery">
                    {{sellerinfo.description}}/{{sellerinfo.deliveryTime}}<span>分钟送达</span>
                </div>
                <div class="supports">
                    <div class="supports-icon"></div>
                    <div class="supports-cont">{{sellerinfo.supports[0].description}}</div>
                </div>
            </div>
            <div class="more" @click="showCover">
                <span>{{sellerinfo.supports.length}}</span><span>个</span><span class="icon-keyboard_arrow_right"></span>
            </div>
        </div>
        <div class="notice" @click="showCover">
            <div class="notice-icon">123</div>
            <div class="notice-cont">{{sellerinfo.bulletin}}</div>
            <span class="icon-keyboard_arrow_right"></span>
        </div>
        <div class="backgorund">
            <img :src="sellerinfo.avatar" alt="">
        </div>    
    </div>
</template>
<script>
export default {
    data(){
        return{
            data: 'header'
        }
    },
    methods:{
        showCover(){
            this.$emit('openCover');
        }
    },
    props:{
        sellerinfo:{
            type: Object,
            required: true
        }
    },
}
</script>

<style lang="less" scoped>
    @import '../../static/style.css';
    .head-wrap{
        font-size: 0px;
        overflow: hidden;
        .cont{
            position: relative;
            width: 100%;
            height: 104px;
            background-color: rgba(7, 17, 27, 0.5);
            .cont-img{
                position: absolute;
                top: 24px;
                left: 24px;
                width: 64px;
                height: 64px;
                border-radius: 2px;
            }
            .cont-info{
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                position: absolute;
                left: 104px;
                top: 24px;
                height: 64px;
                padding: 2px 0;
                box-sizing: border-box;
                .title{
                    .title-icon{
                        display: inline-block;
                        width: 30px;
                        height: 18px;
                        background-image: url('../assets/images/brand@2x.png');
                        background-size: 30px 18px;
                        vertical-align: middle;
                        margin-right: 6px;
                    }
                    .title-name{
                        display: inline-block;
                        vertical-align: middle;
                        font-size: 16px;
                        color: rgb(255,255,255);
                        font-weight: bold;
                        line-height: 18px;
                    }
                }
                .delivery{
                    font-size: 12px;
                    color: rgb(255,255,255);
                    font-weight: 200;
                    line-height: 12px;
                }
                .supports{
                    .supports-icon{
                        display: inline-block;
                        width: 15px;
                        height: 15px;
                        background-image: url('../assets/images/decrease_1@2x.png');                        
                        background-size: 15px 15px;
                        vertical-align: middle;
                        margin-right: 4px;
                    }
                    .supports-cont{
                        display: inline-block;
                        font-size: 10px;
                        color: rgb(255,255,255);
                        font-weight: 200;
                        line-height: 12px;
                        vertical-align: middle;
                    }
                }
            }
            .more{
                position: absolute;
                right: 12px;
                bottom: 14px;
                width: 40px;
                height: 24px;
                padding: 2px 6px;
                border-radius: 18px;
                font-size: 10px;
                color: rgb(255,255,255);
                font-weight: 200;
                text-align: center;
                line-height: 24px;
                background-color:rgba(50, 50, 50, 0.4);
                span{
                    vertical-align: middle;
                }
                .icon-keyboard_arrow_right{
                    margin-left: 4px;
                }
            }
        }
        .notice{
            position: relative;
            width: 100%;
            height: 28px;
            line-height: 28px;
            background-color: rgba(7, 17, 27, 0.6);
            .notice-icon{
                position: absolute;
                top: 50%;
                left: 12px;  
                transform: translate3d(0,-50%,0);
                width: 28px;
                height: 16px;
                background-image: url('../assets/images/bulletin@2x.png');                               
                background-size: 28px 16px;
           }
           .notice-cont{
               position: absolute;
               left: 44px;
               right: 24px; 
               font-size: 10px;
               color: rgb(255, 255, 255);
               font-weight: 200;
               line-height: 28px;    
               overflow: hidden; 
               text-overflow: ellipsis;
               white-space: nowrap;  
           }
           span{
               position: absolute;
               right: 12px;
               line-height: 28px;
               font-size: 10px;
               color: rgb(255, 255, 255);
           }
        }
        .backgorund{
            position: absolute;
            top: 0px;
            left: 0px;
            width: 100%;
            z-index: -1;
            filter: blur(5px);
            img{
                width: 100%;
            }
        }
    }
</style>
