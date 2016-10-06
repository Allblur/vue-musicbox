<template>
	<div class="header">
		<div class="inner">
			<a @click="back" class="block" v-show="changeIocn">
				<i class="block play-pic" id="comeback"></i>
			</a>
			<div class="search-wrap">
				<form action="/search" method="GET">
					<input placeholder="搜索音乐、歌单" class="search-input" v-model="keyword" type="search" name="q" @blur="reisActive">
					<input type="hidden" name="t" value="2">
					<input type="hidden" name="n" value="10">
				</form>
			</div>
			<router-link :to="{ name: 'play' }" class="block" v-show="!changeIocn">
				<i class="block play-pic"></i>
			</router-link>
		</div>
	</div>
</template>
<style lang="stylus">
	.inner
		position relative
		display flex
		flex-direction row
		justify-content space-around
		flex-wrap nowrap
		width 100%
		height 55px
		box-sizing border-box
		margin 0px auto
		padding 10px !important
		.search-wrap
			width 90%
			height 35px
			text-align center
			.search-input
				padding 5px
				height 35px
				width 7.5rem
				background-color #fff
				border 1px solid #fefefe
				border-radius 4px
				color #353535
				font-size 14px
		a
			width 1.6rem
			height 1rem
			.play-pic
				width 100%
				height 100%
				flex 1
				background url(../assets/img/music.png) center no-repeat
				background-size 100%
		a
			width 10%
			height 34px
			line-height 34px
			margin-right 0px
			display inline-block
			color #fff
		#comeback
			background url(../assets/img/comeback.png) center no-repeat
			background-size 70%
</style>
<script>
	import { mapGetters, mapActions } from 'vuex'
	export default {
		data(){
			return {
				changeIocn:true,
				keyword:''
			}
		},
		created(){
			//console.info(this.$route.path)
			if (this.$route.path.indexOf('index') != -1) {
				this.changeIocn = false
			}
		},
		/*conputed:{
			...mapGetters({searchKeyword:'searchKeyword'})
		},*/
		methods:{
			/*...mapActions(['updateSearchResult','changeSearchKeyword']),
			search(t,n,after){
	            const tt = t || 2
	            const nn = n || 20
	            const url = 'http://odetoall.applinzi.com/weixin/sreach/'
	            const data = {w:this.keyword,t:tt,n:nn}
	            this.updateSearchResult({ajaxurl:url,querydata:data})
	            this.changeSearchKeyword(this.keyword)
	            if (typeof after === 'function') {
            		after()
            	}
	        },
	        toSearch(){
	        	this.search(2,10,()=>{
	        		this.$nextTick(() => {
	                	setTimeout(() => {
				            this.$router.push({name: 'search',query: { q: this.keyword,t:2,n:10 }})
		                }, 100)
		            })
	        	})
	        },*/
	        back(){
	        	this.$router.go(-1)
	        },
	        reisActive(){
	        	this.$nextTick(() => {
	                setTimeout(() => {
	                	this.keyword = ''
	                }, 50)
	            })
	        	
	        }
		}
	}
</script>