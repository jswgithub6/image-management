import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./styles.scss";
// 引入字体图标
import "@/icon/style.css";
import { MessageBox } from "@/components/MessageBox";

Vue.use(ElementUI);

Vue.prototype.$msg = MessageBox;

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
