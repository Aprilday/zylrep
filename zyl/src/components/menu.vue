<template>
    <ul class="menu-list">
        <li v-for="(item, index) in list" :key="index" class="menu-item" :class="{'current': currentIndex===index}" @click="selectMenu(index, $event)">
            <span>{{item}}</span>
        </li>
    </ul>
</template>
<script>
export default {
    props: ['list', 'currentIndex'],
    methods: {
        selectMenu(index,e) {
            // console.log(index);
            this.$emit('select-menu', index)
        }
    }
}
</script>
<style lang="less" scoped>
.menu-list {
    width: 100%;
    .menu-item {
        display: table;
        height: 54px;
        width: 100%;
        line-height: 14px;
        span {
            display: table-cell;
            width: 100%;
            text-align: center;
            vertical-align: middle;
            font-size: 14px;
            border-bottom: 1px solid rgba(7, 17,27,.1);
        }
    }
    .current {
        color: #f63;
        background: #fff;
        font-weight: bold;
    }
}
</style>
