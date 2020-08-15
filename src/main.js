import Vue from "vue";
import App from "./App.vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import Clipboard from "v-clipboard";

Vue.use(Vuetify);
Vue.use(Clipboard);

new Vue({
  render: (h) => h(App),
  vuetify: new Vuetify()
}).$mount("#app");
