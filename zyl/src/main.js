import Vue from 'vue'
import App from './App'
// import router from './router'
import {
  /* eslint-disable no-unused-vars */
  Style,
  Button,
  ActionSheet,
  Toast,
  ImagePreview
} from 'cube-ui';
Vue.use(Button);
Vue.use(ActionSheet);
Vue.use(Toast);
Vue.use(ImagePreview);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // router,
  render: h => h(App)
})
