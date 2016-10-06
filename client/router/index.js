import Vue from 'vue'
import Router from 'vue-router'

import Home from '../views/musicbox/Home.vue'
import Search from '../views/musicbox/Search.vue'
import Detail from '../views/musicbox/Detail.vue'
import Play from '../views/musicbox/Play.vue'
import HomePage from '../views/musicbox/HomePage.vue'

Vue.use(Router)

export default new Router({
	mode:'history',
	scrollBehavior:()=>({y:0}),
	routes:[
		{
			name:'index',
			path:'/index',
			component:Home,
			children:[
				{
					path:'/',
					name:'homepage',
					component:HomePage
				}
			]
		},
		{
			name:'search',
			path:'/search',
			component:Search,
			query: {q:'',t:2,n:10}
		},
		{
			name:'detail',
			path:'/detail/:playlistId',
			component:Detail
		},
		{
			name:'play',
			path:'/play',
			component:Play
		},
		{
			path:'*',
			redirect:'/index'
		}
	]
})