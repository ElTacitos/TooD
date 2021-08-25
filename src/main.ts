import App from "./App.vue";
import LongPress from "vue-directive-long-press";
import Vue, { VNode } from "vue";

Vue.config.productionTip = false;

Vue.directive("long-press", LongPress);

new Vue({
    render: (render): VNode => render(App),
}).$mount("#app");
