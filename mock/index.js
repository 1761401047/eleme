import Mock from 'mockjs';
import data from '../data.json';

Mock.mock('/eleme/goods',{
    data: data.goods
})
Mock.mock('/eleme/ratings',{
    data: data.ratings
})
Mock.mock('/eleme/seller',{
    data: data.seller
})