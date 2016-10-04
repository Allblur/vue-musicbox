<template>
	<div class="header">
		<div class="inner">
			<router-link :to="{ name: 'homepage' }" class="block" v-show="changeIocn">
				<i class="block play-pic" id="comeback"></i>
			</router-link>
			<div :class="[isActive ? 'activeSearchClass' : '', 'search-wrap']">
				<input placeholder="搜索音乐、歌手、歌单" class="search-input" v-model="keyword" type="text" @focus="changeSearchbox" @blur="reisActive">
				<button class="block tosearch" @click="toSearch" v-show="isActive"></button>
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
		flex-wrap wrap
		width 100%
		height 1.47rem
		box-sizing border-box
		margin 0px auto
		padding 10px !important
		.search-wrap
			width 7.8rem
			height 1rem
			.search-input
				padding 5px 10px
				height 22px
				width 6.94rem
				line-height 22px
				background-color #fff
				border 1px solid #fefefe
				border-radius 4px
				color #353535
				font-size 14px
		.search-wrap.activeSearchClass
			position absolute
			width 96%
			top 10px
			left 2%
			.search-input
				width 8rem
			.tosearch
				position absolute
				width 1.4rem
				height 34px
				line-height 34px
				top 0px
				right 1px
				border #fff solid 1px
				border-left-width 0px
				border-radius 0 4px 4px 0
				background #fff url(../assets/search.png) center no-repeat
				background-size 50%
				
		a
			width 1.6rem
			height 1rem
			.play-pic
				width 100%
				height 100%
				flex 1
				background url(../assets/music.png) center no-repeat
				background-size 100%
		a
			width 10%
			height 34px
			line-height 34px
			margin-right 0px
			display inline-block
			color #fff
		#comeback
			background url(../assets/comeback.png) center no-repeat
			background-size 70%
</style>
<script>
	import { mapGetters, mapActions } from 'vuex'
	export default {
		data(){
			return {
				changeIocn:true,
				isActive:false,
				keyword:''
			}
		},
		created(){
			//console.info(this.$route.path)
			if (this.$route.path.indexOf('index') != -1) {
				this.changeIocn = false
			}
			this.isActive = false
		},
		conputed:{
			...mapGetters({searchKeyword:'searchKeyword'})
		},
		methods:{
			...mapActions(['updateSearchResult','changeSearchKeyword']),
			search(t,n,after){
	            //t 1：单曲，2：歌单，3：歌手，4：专辑，5：mv
	            //n 默认100条
	            let tt = t || 2
	            let nn = n || 100
	            let url = 'http://odetoall.applinzi.com/weixin/sreach/'
	            let data = {w:this.keyword,t:tt,n:nn}
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
				            this.$router.push({path: '/search'})
		                }, 100)
		            })
	        	})
	        },
	        changeSearchbox(){
				this.isActive = true
	        },
	        reisActive(){
	        	this.$nextTick(() => {
	                setTimeout(() => {
	                	this.keyword = ''
			            this.isActive = false
	                }, 200)
	            })
	        	
	        }
		}
	}
</script>