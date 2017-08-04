import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import VueMoment from "vue-moment";
import moment from "moment-timezone";
//Vue-Strap
//import {alert} from "vue-strap";
//Own components
import ServerStatus from "./components/ServerStatus.vue"

require('./bootstrap');


Vue.use(VueAxios, axios);
Vue.use(VueMoment, {
    moment
});

new Vue({
    components: {
        ServerStatus
    },
    el: '#app',
});