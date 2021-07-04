import Vue from "vue";
import App from "./App.vue";
import moment from 'moment';
import VueMoment from 'vue-moment';

// Load Locales ('en' comes loaded by default)
require('moment/locale/ru');
moment.locale('ru');

Vue.use(VueMoment, { moment });

Vue.config.productionTip = false;
new Vue({
  render: (h) => h(App),
}).$mount("#app");
