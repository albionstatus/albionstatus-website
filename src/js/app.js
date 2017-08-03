import axios from "axios";
//import VueAxios from "vue-axios";
import Vue from "vue";
//Vue-Strap
//import {alert} from "vue-strap";
//Own components
import ServerStatus from "./components/ServerStatus.vue"

require('./bootstrap');
/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
//Vue.use(VueAxios, axios);
new Vue({
    components: {
        ServerStatus
    },
    el: '#app',
});