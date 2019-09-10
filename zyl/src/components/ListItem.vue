<template>
    <div>
        <div class="wrap list-hook" v-for="(item, index) in list" :key="index">
            <ul>
                <li v-for="info in item.list" :key="info.No">
                    <div class="item-left" @click="imgPreview(info.url)">
                        <img :src="info.url" alt="">
                    </div>
                    <div class="item-right">
                        <div class="name">{{info.name}}</div>
                        <div class="num">{{info.No}}</div>
                        <div class="price">
                            <div>
                                &yen;<span>{{info.price}}</span>
                                <span style="color: #333;font-size:16px;" v-if="info.backup">起</span>
                            </div>
                            <div>
                                <cube-button primary v-if="info.backup" @click="checkDetail(info)">详情</cube-button>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div style="height: 200px;"></div>
    </div>
</template>
<script>

export default {
    props: ['list'],
    data() {
        return {
            
        }
    },
    
    methods: {
        checkDetail(data) {
            let temp = []
            if (data.backup) {
                let backup = data.backup.split(';');
                backup.forEach(item => {
                    if(item) {
                        temp.push({
                            title: item.split(',')[0],
                            price: item.split(',')[1]
                        })
                    }
                })
            }
            temp = temp.map(item => {
                return {
                    content: `<div style="display:flex;justify-content:space-between;font-size:18px;padding:0 15px;"><div>${item.title}</div><div style="color:#f63;">&yen; ${item.price}</div></div>`
                }
            })
            this.$createActionSheet({
                title: `${data.name} （ ${data.No} ）`,
                data: temp,
                onSelect: (item, index) => {}
            }).show()
        },
        imgPreview(url) {
            this.$createImagePreview({
                imgs: [url]
            }).show()
        }
    }
}   
</script>
<style lang="less" scoped>
.wrap {
    li {
        display: flex;
        margin-bottom: 15px;
        background-color: #fff;
    }
    .item-left {
        width: 50%;
        max-height: 130px;
        font-size: 0;
        overflow: hidden;
        img {
            width: 100%;
        }
    }
    .item-right {
        flex: 1;
        text-align: left;
        padding: 12px 15px;
        color: #333;
        .name {
            font-size: 18px;
            font-weight: bold;
        }
        .num {
            margin: 18px 0;
        }
        .price {
            display: flex;
            justify-content: space-between;
            margin: 10px 0 5px;
            font-size: #666;
            font-size: 16px;
            color: #f63;
            span {
                font-size: 20px;
            }
        }
        .cube-btn {
            padding: 4px;
            font-size: 12px;
        }
    }
    .space-between {
        display: flex;
        justify-content: space-between;
    }
}
</style>