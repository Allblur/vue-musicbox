import Vue from 'vue'
import App from './views/App.vue'
import store from './store/store'
import router from './router'
import { sync } from 'vuex-router-sync'
import * as filters from './filters'
import * as directives from './directives'

// sync the router with the vuex store.
// this registers `store.state.route`
sync(store, router)

// register global utility filters.
Object.keys(filters).forEach(key => {
  	Vue.filter(key, filters[key])
})

Object.keys(directives).forEach(key => {
  	Vue.directive(key, directives[key])
})

// create the app instance.
// here we inject the router and store to all child components,
// making them available everywhere as `this.$router` and `this.$store`.
const app = new Vue({
  	router,
  	store,
  	...App // Object spread copying everything from App.vue
})

// expose the app, the router and the store.
// note we not mounting the app here, since bootstrapping will be
// different depending on whether we are in browser or on the server.
export { app, router, store }
