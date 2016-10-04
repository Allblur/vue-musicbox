<template>
	<div>
        <div class="playlist-detail" v-if="playlistdetails.name">
        	<div class="detail-header">
        		<div class="dh">
        			<img :src="playlistdetails.coverImgUrl" :alt="playlistdetails.name" class="block cover-img">
					<div class="detail-info">
						<h3>{{playlistdetails.name}}</h3>
						<div class="pl-creator">
							<span v-if="playlistdetails.creator">创建者：{{playlistdetails.creator.nickname}}</span>
						</div>
					</div>
        		</div>
        	</div>
        	<div class="dl">
        		<a class="play-all" @click="playAll">播放全部<span>(共{{playlistcount}}首)</span></a>
        	</div>
        	<div class="playlist-item">
        		<ul>
        			<li v-for="(item,index) in playlistdetails.tracks">
        				<span class="block item-index">{{index+1}}</span>
        				<div class="song-info">
        					<span class="song-name">{{item.name}}</span>
							<span class="song-art">
							{{item.album.artists[0].name}} - {{item.album.name}}
							</span>
        				</div>
        				<span class="block add-playsongitem">添加到播放列表</span>
        			</li>
        		</ul>
        	</div>
        </div>
        <div class="ds" v-else>
        	<p>歌单信息加载中...</p>
        </div>
	</div>
</template>
<style lang="stylus">
	ul,li
		list-style none
	.playlist-detail
		margin-top -55px
		.detail-header
			padding .3rem .3rem 0
			.dh
				height 3.4rem
				overflow hidden
				img.cover-img
					width 3.4rem
					height 3.4rem
					float left
				.detail-info
					margin-left 3.8rem
					h3
						height 1.5rem
						line-height .7rem
						margin-top .5rem
						overflow hidden
						font-weight normal
						font-size .48rem
					.pl-creator
						height 1.1rem
						line-height 1.1rem
		.dl,.playlist-item
			padding 0 .3rem
		.dl
			height 1.2rem
			line-height 1.2rem
			font-size 16px
			.play-all
				display block
				padding-left .63rem
				background url(../../assets/play.png) left center / 6% no-repeat
			span
				color #9a9a9a
		.playlist-item
			ul
				li
					height 1.6rem
					overflow hidden
					.item-index
						height 1.6rem
						line-height 1.6rem
						width .7rem
						float left
					.song-info
						height 1.25rem
						border-top 1px solid #dedede
						padding .174rem 0
						margin-left .71rem
						span
							height .625rem
							line-height .625rem
							display block
							overflow hidden
						.song-name
							font-size .46rem
						.song-art
							color #9a9a9a

</style>
<script>
	import { mapGetters, mapActions } from 'vuex'
    import TopBar from '../../components/TopBar.vue'

	export default{
		data(){
			return{
				title:'Playlist detail page'
			}
		},
		computed:{
            ...mapGetters({
                playlistDetail:'playlistDetail'
            }),
            playlistdetails(){
                return this.playlistDetail
            },
            playlistcount(){
            	return this.playlistDetail.tracks ? this.playlistDetail.tracks.length : 0
            }
        },
		components:{
			topbar:TopBar
		},
		methods:{
			...mapActions(['updatePlaylistDetail','updateSongItem']),
			getPlaylistDetail(){
				let id = this.$route.params.playlistId
				let url = 'http://odetoall.applinzi.com/weixin/playlistdetail/'+id+'/'
				this.updatePlaylistDetail({ajaxurl:url,querydata:{}})
			},
			playAll(){
				this.updateSongItem(this.playlistDetail.tracks)
				localStorage.setItem("songItem", JSON.stringify(this.playlistDetail.tracks))
			}
		},
		created(){
			this.getPlaylistDetail()
		}
   }
</script>