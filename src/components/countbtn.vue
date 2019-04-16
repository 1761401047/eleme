<template>
    <div class="btn-wrapper">
        <div class="dec icon-remove_circle_outline" :class="{active:singlefood.count}" @click="dec"></div>
        <div class="count" :class="{active:singlefood.count}">{{singlefood.count}}</div>
        <div class="add icon-add_circle" @click="add"></div>
    </div>
</template>

<script>
import Vue from 'vue'

export default {
    data(){
        return{
            
        }
    },
    props:{
        singlefood:{
            type: Object,
            required: true
        }
    },
    methods:{
        dec(){
            if(this.singlefood.count !== 0){
                 this.singlefood.count--;
                 if(this.singlefood.count === 0){
                     delete this.singlefood.count;
                 }
            }
        },
        add(){
            if(this.singlefood.count === undefined){
                Vue.set(this.singlefood,"count",0);   
            }     
            this.singlefood.count++;
        }
    }
}
</script>

<style lang="less" scoped>
    @import '../../static/style.css';
    .btn-wrapper{
        font-size: 0px;
        div{
            display: inline-block;
            vertical-align: middle;
        }
        .dec,
        .add{
            font-size: 24px;
            color: rgb(0,160,220)
        }
        .dec{
            visibility: hidden;
            transform: translate3d(48px,0,0) rotate3d(0,0,1,360deg);
            opacity: 0;
            transition: all 0.3s linear 0s;
            &.active{
                visibility: visible;
                transform: translate3d(0px,0,0) rotate3d(0,0,1,0deg);
                opacity: 1;
            }
        }
        .count{
            width: 24px;
            text-align: center;
            font-size: 10px;
            color: rgb(147,153,159);
            visibility: hidden;
            opacity: 0;
            transition: visibility 0.3s linear 0s,opacity 0.3s linear 0s;           
            &.active{
                visibility: visible;
                opacity: 1;
            }
        }
    }
</style>
