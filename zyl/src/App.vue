<template>
  <div id="app" >
    <div class="aside-wrap" ref="menu">
        <aside-menu :list="category" :currentIndex="currentIndex" @select-menu="selectMenu"/>
    </div>
    <div class="main-wrap" ref="list">
        <item :list="list" />
    </div>
  </div>
</template>

<script>
// import item from './components/Item';
import item from './components/ListItem';
import asideMenu from './components/menu';
import { BetterScroll } from 'cube-ui';
// const env = 'http://localhost:5050'
const env = 'https://cakesh.applinzi.com';
const API = {
    search: env + '/index/getList'
}
export default {
  name: 'App',
  data() {
    return {
      pageSize: 20,
      pageIndex: 1,
      list:[],
      category: [],
      listHeight: [],
      scrollY: 0
    }
  },
  components: {
    item,
    asideMenu
  },
  mounted() {
    this.search()
  },
  computed: {
    currentIndex() {
      for(let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i];
        let height2 = this.listHeight[i + 1];
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i;
        }
      }
      return 0;
    }
  },
  methods: {
    search() {
        const toast = this.$createToast({
          time: 0,
          txt: 'Loading...',
          mask: true
        })
        toast.show()
        fetch(API.search, {
            body: JSON.stringify({}),
            mode: 'cors',
            method: 'POST',
            headers: {
              'content-type': 'application/json'
            },
        }).then(res => res = res.json()).then(data => {
            toast.hide();
            this.category = Object.keys(data.data);
            for(let i in data.data) {
              // this.list.push(...data.data[i])
              this.list.push({
                name: i,
                list: data.data[i]
              })
            }
            this.$nextTick(() => {
              this._initScroll();
              this._calculateHeight();
            })
        }).catch(() => {
          toast.hide();
          this.$createToast({
            txt: '出错了！',
            type: 'error',
            time: 3000
          }).show()
        })
    },
    _initScroll() {
      this.listScroll = new BetterScroll(this.$refs.list, {
        click: true,
        probeType: 3
      });
      this.menuScroll = new BetterScroll(this.$refs.menu, {
        click: true
      });
      this.listScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y));
      })
    },
    _calculateHeight() {
      let list = this.$refs.list.getElementsByClassName('list-hook');
      let height = 0;
      this.listHeight.push(height);
      for (let i = 0; i < list.length;i++) {
        let item = list[i];
        height += item.clientHeight;
        this.listHeight.push(height);
      }
    },
    selectMenu(index) {
      let list = this.$refs.list.getElementsByClassName('list-hook');
      let el = list[index];
      this.listScroll.scrollToElement(el, 300);
    }
  }
}
</script>

<style>
* {
    margin: 0;
    padding: 0;
  }
html, body {
  height: 100%;
  overflow: hidden;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #f0f0f0;
  height: 100%;
  display: flex;
}
.aside-wrap {
  flex: 0 0 110px;
  width: 110px;
  background: #f3f5f7;
}
.main-wrap {
  flex: 1;
  padding-bottom: 100px;
}
</style>
