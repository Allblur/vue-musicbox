<template>
	<div>
		<topbar></topbar>
        <div class="playlist-detail" v-if="playlistDetail.name">
        	<div class="detail-header" :style="style">
        		<div class="dh">
        			<img :src="playlistDetail.coverImgUrl" :alt="playlistDetail.name" class="block cover-img">
					<div class="detail-info">
						<h3>{{playlistDetail.name}}</h3>
						<div class="pl-creator">
							<span v-if="playlistDetail.creator">创建者：{{playlistDetail.creator.nickname}}</span>
						</div>
						<div class="pl-info">
							<span v-if="playlistDetail.playCount">播放次数：{{playlistDetail.playCount}}</span>&nbsp;&nbsp;
							<span v-if="playlistDetail.trackCount">收藏：{{playlistDetail.trackCount}}</span>
						</div>
					</div>
        		</div>
        	</div>
        	<div class="dl">
        		<a class="play-all" @click="playAll">播放全部<span>(共{{playlistcount}}首)</span></a>
        	</div>
        	<div class="playlist-item">
        		<ul>
        			<li v-for="(item,index) in playlistDetail.tracks">
        				<span class="block item-index">{{index+1}}</span>
        				<div class="song-info" @click="playSong(index)">
        					<span class="song-name">{{item.name}}</span>
							<span class="song-art">
							{{item.album.artists[0].name}} - {{item.album.name}}
							</span>
        				</div>
        				<span class="block add-playsongitem" @click="addPlaysongItem(index)"></span>
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
		.detail-header
			padding .3rem .3rem
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
						overflow hidden
						font-weight normal
						font-size .48rem
					.pl-creator
						height 1.1rem
						line-height 1.1rem
		.dl,.playlist-item
			padding 0 .3rem
		.dl
			height 1.4rem
			line-height 1.4rem
			position relative
			font-size 16px
			.play-all
				display block
				padding-left .63rem
				background url(../../assets/img/play.png) left center / 6% no-repeat
			span
				color #9a9a9a
		.dl::after
			content ''
			position absolute
			bottom 0
			left 0
			width 100%
			height 1px
			background-color #dedede
			transform scaleY(0.5)
			transform-origin 0 bottom
		.playlist-item
			ul
				li
					height 1.6rem
					position relative
					overflow hidden
					.item-index
						height 1.6rem
						line-height 1.6rem
						width .7rem
						float left
					.song-info
						height 1.25rem
						position relative
						padding .174rem 0
						margin-left .71rem
						margin-right .8rem
						span
							height .625rem
							line-height .625rem
							display block
							overflow hidden
						.song-name
							font-size .46rem
						.song-art
							color #9a9a9a
					.song-info::before
						content ''
						position absolute
						bottom 0
						left 0
						width 100%
						height 1px
						background-color #dedede
						transform scaleY(0.5)
						transform-origin 0 bottom
					.add-playsongitem
						position absolute
						width 1rem
						height 1.6rem
						top 0
						right 0
						background #fff url(../../assets/img/delete.png) center / 40% no-repeat
						transform rotate(45deg)
	.ds
		p
			height 1.2rem
			line-height 1.2rem
			text-align center
			font-size .48rem
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
                playlistDetail:'playlistDetail',
                songItme:'songItme'
            }),
            playlistcount(){
            	return this.playlistDetail.tracks ? this.playlistDetail.tracks.length : 0
            },
            backgroundImg(){
            	return this.playlistDetail.coverImgUrl 
            			? this.playlistDetail.coverImgUrl 
            			: ''
            },
            style(){
            	return {
            		/*background:'url('+this.backgroundImg+') center center / cover no-repeat'*/
            	}
            }
        },
		components:{
			topbar:TopBar
		},
		methods:{
			...mapActions(['updatePlaylistDetail','updateSongItem','addSongItem','setSongIndex','changeSongAlbum','changeSongName','changeSongArt','changeSongUrl','changeCplayclass']),
			setPlaylistDetail(){
				this.updatePlaylistDetail({})
				const id = this.$route.params.playlistId
				const url = 'http://odetoall.applinzi.com/weixin/playlistdetail/'+id+'/'
				this.updatePlaylistDetail({ajaxurl:url,querydata:{}})
			},
			upDatePlayerData(index){
				const audio = document.getElementById('audio')
				const slist = this.playlistDetail.tracks
				this.setSongIndex(index)
				this.changeSongAlbum(slist[index].album.picUrl)
				this.changeSongName(slist[index].name)
				this.changeSongArt(slist[index].artists[0].name)
				this.changeSongUrl(slist[index].mp3Url)
				setTimeout(()=>{
					audio.play()
					this.changeCplayclass('pause-icon')
				},1000)
			},
			playAll(){
				const slist = this.playlistDetail.tracks
				this.updateSongItem(slist)
				this.upDatePlayerData(0)
				localStorage.setItem("songItem", JSON.stringify(slist))
				localStorage.setItem("activeindex", 0)
			},
			playSong(index){
				this.addPlaysongItem(index)
				this.upDatePlayerData(index)
			},
			addPlaysongItem(index){
				const list = [this.playlistDetail.tracks[index]]
				this.addSongItem(list)
				localStorage.setItem("songItem", JSON.stringify(this.songItme))
			}
		},
		created(){
			this.setPlaylistDetail()
		}
   }
</script>