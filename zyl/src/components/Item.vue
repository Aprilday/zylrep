<template>
    <div class="wrap">
        <div class="item-top">
            <img :src="info.url" alt="">
            <div class="info">
                <!-- <div class="name">{{info.name}}</div> -->
                <div class="name">{{info.name}}</div>
            </div>
        </div>
        <div class="item-bottom">
            <div class="price">
                &yen;<span>{{info.price}}</span>
                <span v-show="info.backup">起</span>
            </div>
            <div class="num">{{info.No}}</div>
        </div>
    </div>
</template>
<script>
export default {
    props: ['info'],
    data() {
        return {

        }
    },
    methods: {

    }
}   
</script>
<style lang="less" scoped>
    .wrap {
        background-color: #fff;
        margin-bottom: 30px;
    }
    .item-top {
        position: relative;
    }
    img {
        display: block;
        width: 100%;
    }
    .info {
        z-index: 1;
        position: absolute;
        width: 100%;
        height: 40px;
        bottom: 0;
        left: 0;
        color: #fff;
        background: rgba(0,0,0,.4);
        text-align: left;
        .name {
            margin-left: 15px;
            line-height: 40px;
            font-size: 18px;
            font-weight: bold;
        }
    }
    .item-bottom {
        height: 50px;
        overflow: hidden;
        line-height: 50px;
        border-bottom: 1px solid #eee;
        .price {
            float: left;
            margin-left: 15px;
            color: #f63;
            font-size: 21px;
            span {
                font-size: 30px;
                font-weight: bold;
            }
        }
        .num {
            float: right;
            font-size: 18px;
            color: #999;
            margin-right: 15px;
        }
    }
</style>