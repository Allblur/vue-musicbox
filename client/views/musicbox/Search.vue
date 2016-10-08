<template>
	<div>
		<div class="header">
            <topbar></topbar>
        </div>
		<div class="search-tabs">
			<div class="search-tab">
				<a v-for="(val,index) in stype" class="inline-block search-tab-btn" :class="[val.type==t?'active':'']" @click="search(val.type,10)">
					<span>{{val.text}}</span>
				</a>
			</div>
		</div>
		<div class="search-result">
			<ul class="result-list" v-if="searchResult">
				<li v-for="(item,index) in searchResult">
					<router-link :to="{ name: 'detail', params: { playlistId: item.id } }" class="block" v-if="t==2">
						<img :src="item.coverImgUrl" :alt="item.name" class="block rsimg" width="50" height="50">
						<div class="result-info">
							<h3 class="result-t">{{item.name}}</h3>
							<p>
							{{item.trackCount}}首音乐&nbsp;by&nbsp;{{item.creator.nickname}}
							,播放<span v-if="item.playCount > 10000">{{item.playCount | msnum}}万</span>
							<span v-else>{{item.playCount}}</span>次
							</p>
						</div>
					</router-link>
					<a class="block" v-if="t==1">
						<img :src="item.artists[0].img1v1Url" :alt="item.name" class="block rsimg" width="50" height="50">
						<div class="result-info">
							<h3 class="result-t">{{item.name}}</h3>
							<p>
							{{item.artists[0].name}}&nbsp;-&nbsp;{{item.album.name}}
							</p>
						</div>
					</a>
					<a class="block" v-if="t==5">
						<img :src="item.cover" :alt="item.name" class="block rsimg" width="50" height="50">
						<div class="result-info">
							<h3 class="result-t">{{item.name}}</h3>
							<p>
							{{item.artists[0].name}}
							</p>
						</div>
					</a>
				</li>
			</ul>
			<h2 v-else class="none-result">暂无结果，请重新搜索</h2>
		</div>
	</div>
</template>
<style lang="stylus">
.search-tabs
	padding .25rem .25rem 0
	border-bottom 1px solid #ddd
	.search-tab
		height 38px
		a
			height 36px
			line-height 36px
			padding 0 .4rem 0 .4rem
			font-size .48rem
			overflow hidden
			color #757575
		.active
			border-bottom 2px solid #2a2a2a
			color #252525

.result-list
	margin-top .1rem
	li
		a.block
			margin 0 .25rem .1rem .25rem !important
			.result-info
				margin-left 1.65rem
				height 1.6rem
				position relative
				overflow hidden
				.result-t
					height .6rem
					overflow hidden
					font-size .48rem
					font-weight normal
				p
					height .95rem
					line-height .95rem
					overflow hidden
					color #777
			.result-info:after
				content ''
				position absolute
				bottom 0
				left 0
				width 100%
				height 1px
				background-color #dedede
				transform scaleY(0.5)
				transform-origin 0 bottom
			.rsimg
				width 1.5rem
				height 1.5rem
				float left
.none-result
	height 1.2rem
	line-height 1.2rem
	text-align center
	font-size 16px
	font-weight normal
</style>
<script>
	import { mapGetters, mapActions } from 'vuex'
	import TopBar from '../../components/TopBar.vue'

	const url = 'http://odetoall.applinzi.com/weixin/sreach/'

	function fetchSeacrchItem(store,w,t,n) {
        const tt = t || 2
	    const nn = n || 20
	    const ww = w //|| '华语'
        const data = {w:ww,t:tt,n:nn}
        return store.dispatch('updateSearchResult', {ajaxurl:url,querydata:data})
    }

	export default{
		data(){
			return{
				stype:[
					{type:2,text:'歌单'},
					{type:1,text:'单曲'},
					{type:5,text:'MV'}
				],
				msg:'wellcome to vue-musicbox',
				flag:true
			}
		},
		preFetch:fetchSeacrchItem,
		components:{
			topbar:TopBar
		},
		computed:{
			...mapGetters({searchResult:'searchResult',searchKeyword:'searchKeyword'}),
			t(){
				return this.$route.query.t
			}
		},
		methods:{
			...mapActions(['updateSearchResult','changeSearchKeyword']),
			search(t,n){
	            //搜索t 1：单曲，2：歌单，3：歌手，4：专辑，5：mv
	            //n 默认100条
	            if (this.searchKeyword === '') {
	            	alert('请输入搜索关键词')
	            	return false
	            }
	            const data = {w:this.searchKeyword,t:t,n:n}
	            this.updateSearchResult({ajaxurl:url,querydata:data})
	            this.$router.push({name: 'search',query: { q:this.searchKeyword,t:t,n:n }})
	        }
		},
		beforeMount(){
			this.changeSearchKeyword(this.$route.query.q)
			fetchSeacrchItem(this.$store,this.$route.query.q,this.$route.query.t,this.$route.query.n)
		}
   	}
</script>