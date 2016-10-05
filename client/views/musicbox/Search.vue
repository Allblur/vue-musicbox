<template>
	<div>
		<div class="header">
            <topbar></topbar>
        </div>
		<div class="search-tabs">
			<div class="search-tab">
				<a class="inline-block search-tab-btn active" @click="search(2,10,1)" v-addactive="{classname:'active',vflag:flag,elclass:'inline-block search-tab-btn'}">
					<span>歌单</span>
				</a>
				<a class="inline-block search-tab-btn" @click="search(1,15,2)" v-addactive="{classname:'active',vflag:!flag,elclass:'inline-block search-tab-btn'}">
					<span>单曲</span>
				</a>
			</div>
		</div>
		<div class="search-result">
			<ul class="result-list" v-if="searchResult">
				<li v-for="(item,index) in searchResult">
					<router-link :to="{ name: 'detail', params: { playlistId: item.id } }" class="block" v-if="item.creator">
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
					<a class="block" v-else>
						<img :src="item.album.artist.img1v1Url" :alt="item.name" class="block rsimg" width="50" height="50">
						<div class="result-info">
							<h3 class="result-t">{{item.name}}</h3>
							<p>
							{{item.artists[0].name}}&nbsp;-&nbsp;{{item.album.name}}
							</p>
						</div>
					</a>
				</li>
			</ul>
			<h2 v-else>暂无结果，请重新搜索</h2>
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
				border-bottom 1px solid #dedede
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
			.rsimg
				width 1.5rem
				height 1.5rem
				float left
</style>
<script>
	import { mapGetters, mapActions } from 'vuex'
	import TopBar from '../../components/TopBar.vue'

	export default{
		data(){
			return{
				msg:'wellcome to vue-musicbox',
				flag:true
			}
		},
		components:{
			topbar:TopBar
		},
		computed:{
			...mapGetters({searchResult:'searchResult',searchKeyword:'searchKeyword'})
		},
		methods:{
			...mapActions(['updateSearchResult','changeSearchKeyword']),
			search(t,n,type){
	            //搜索t 1：单曲，2：歌单，3：歌手，4：专辑，5：mv
	            //条数n 默认100条
	            let url = 'http://odetoall.applinzi.com/weixin/sreach/'
	            let data = {w:this.searchKeyword,t:t,n:n}
	            this.updateSearchResult({ajaxurl:url,querydata:data})
	            this.flag = !this.flag
	        },
		}
   	}
</script>