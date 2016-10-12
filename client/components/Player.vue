<template>
	<div class="player-box">
		<div class="song-list-box" :class="[isShowSonglist ? 'show' : '']">
			<div class="song-list-title">
				<div class="st sa"><a>收藏全部</a></div>
				<div class="st si"><p>播放列表({{songlistLen}})</p></div>
				<div class="st sa"><a @click="toEmptySongItem">清空</a></div>
			</div>
			<div class="list-div">
				<ul class="list-ul">
					<li v-for="(item,index) in songlist">
						<a :class="[index==sIndex ? 'active' : '']" class="select-song" @click="selectSongPlay(index)">
							{{item.name}}&nbsp;-&nbsp;{{item.artists[0].name}}
						</a>
						<span class="delete-song" @click="deleteSong(index)"></span>
					</li>
				</ul>
			</div>
			<div class="close-list">
				<a href="javascript:;" class="block" @click="changeIsShowSonglist">关&nbsp;闭</a>
			</div>
		</div>
		<div class="mini-player" v-show="!pbIsShow">
			<div class="time-line" :style="{'width':progressValues}"></div>
			<div class="mini-box">
				<router-link to="/play" class="m-album">
                    <img :src="songAlbum" :alt="songName">
                </router-link>
				<div class="m-song-info">
					<h3>{{songName}}</h3>
					<p>{{songArt}}</p>
				</div>
				<div class="m-btns">
					<div class="play-btns"><a class="icons pmenu-icon" @click="changeIsShowSonglist">播放列表</a></div>
					<div class="play-btns"><a :class="[iconsClass,cPlayClass]" @click="play">暂停</a></div>
					<div class="play-btns"><a class="icons next-icon" @click="playNext">下一首</a></div>
				</div>
			</div>
		</div>
		<div v-show="pbIsShow">
			<div class="play-bar-box">
		        <div class="now-time">{{songcurrentTime}}</div>
		        <div class="play-bar" id="play_bar">
		            <div class="bar-box">
		                <div class="now-bar" :style="{'width':progressValues}"></div>
		            </div>
		            <div class="btn-circle" :style="{'left':progressValues}"></div>
		        </div>
		        <div class="all-time">{{songduration}}</div>
		    </div>
		    <div class="play-btn" id="playBtn">
		        <div class="play-btns">
		            <a :class="[iconsClass,playmodel]" @click="mPlaymodel">随机</a>
		        </div>
		        <div class="play-btns">
		            <a class="icons prev-icon" @click="playPrev">上一首</a>
		        </div>
		        <div class="play-btns">
		            <a :class="[iconsClass,cPlayClass]" @click="play">暂停</a>
		        </div>
		        <div class="play-btns">
		            <a class="icons next-icon" @click="playNext">下一首</a>
		        </div>
		        <div class="play-btns">
		            <a class="icons pmenu-icon" @click="changeIsShowSonglist">播放列表</a>
		        </div>
		    </div>
		</div>
		<audio id="audio" :src="songUrl" preload="metadata" currenttime="true" @timeupdate="timeupdateAu" class="hide"></audio>
	</div>
</template>
<style lang="stylus">
	.player-box
		width 100%
		flex 1
		position fixed
		bottom 0px
		background-color rgba(255,255,255,.98)
		box-shadow 0 -1px 1px 1px #fdfdfd
		left 0px
		z-index: 9999
		.song-list-box
			height 9.5rem
			border-top 1px solid #dedede
			background-color #fff
			position absolute
			z-index 10000
			bottom -9.5rem
			left 0
			transition bottom .3s ease-in .1s
			overflow hidden
			.song-list-title
				height 1.3rem
				display flex
				border-bottom 1px solid #dfdfdf
				align-items center
				.st
					height 100%
					text-align center
				.sa
					flex 1
					display block
				.si
					width 60%
				a,p
					height 100%
					line-height 1.3rem
					margin-right 0
					font-size .36rem
			.close-list
				height 1.2rem
				line-height 1.2rem
				border-top 1px solid #dedede
				background-color #f3f3f3
				text-align center
				font-size 16px
			.list-div
				height 7rem
				width 100%
				position relative
				overflow hidden
				.list-ul
					height 7rem
					overflow-x hidden
					overflow-y auto
					-webkit-overflow-scrolling touch
					li
						position relative
						overflow hidden
						.select-song
							margin 0 2vw
							display block
							height 1.2rem
							line-height 1.2rem
							position relative
							white-space nowrap
							text-overflow ellipsis
							overflow hidden
						.select-song::after
							content ''
							position absolute
							bottom 0
							left 0
							width 96vw
							height 1px
							background-color #dedede
							transform scaleY(0.5)
							transform-origin 0 bottom
						.active
							padding-left 0.6rem
							background url(../assets/img/pa.png) left center no-repeat
							background-size .5rem .5rem
							color #eb4f38
						.delete-song
							position absolute
							right .32rem
							top .15rem
							display block
							width 1rem
							height 1rem
							background #fff url(../assets/img/delete.png) center no-repeat
							background-size .5rem .5rem
							overflow hidden
							z-index 5
		.song-list-box.show
			bottom 0px
		.play-bar-box
			width 100%
			height 30px
			display flex
			align-items center
			.now-time,.all-time
				flex 1
				text-align center
				color #fafafa
			.play-bar
				position relative
				width 70%
				height 6px
				text-align center
				.bar-box
					width 100%
					height 100%
					position absolute
					background-color #dcdcdc
					border-radius 5px
					.now-bar
						position absolute
						height 100%
						background-color #eb4f38
						border-radius 5px
						z-index 10
				.btn-circle
					position absolute
					width 16px
					height 16px
					background-color #eb4f38
					border-radius 50%
					border #ff4a38 1px solid
					top -6px
					margin-left -8px
					z-index 100
		.mini-player
			.time-line
				height 3px
				background-color #eb4f38
			.mini-box
				height 1.5rem
				.m-album
					width 1.2rem
					height 1.2rem
					display block
					float left
					margin-right 0
					img
						display block
						width 100%
						height 100%
				.m-song-info
					width 4.5rem
					margin-left .3rem
					float left
					h3
						height 22px
						line-height 22px
						overflow hidden
						font-size .48rem
						font-weight normal
					p
						font-size 14px
						color #777
				.m-btns
					margin-left 6.2rem
					width 3.8rem
					height 100%
					display flex
					flex 1
					.play-btns
						width 33%
						text-align center
						.pmenu-icon
							background-size 50%
						.next-icon
							background-size 40%

		.play-btn
			display flex
			width 100%
			height 2rem
			align-items center
		.play-btns
			width 20%
			height 100%
			text-align center
			.icons
				width 100%
				height 100%
				display block
				overflow hidden
				font-size 0px
			.play-icon
				background url(../assets/img/play.png) center no-repeat
				background-size 60%
			.pause-icon
				background url(../assets/img/pause.png) center no-repeat
				background-size 60%
			.prev-icon
				background url(../assets/img/prev.png) center no-repeat
				background-size 34%
			.next-icon
				background url(../assets/img/next.png) center no-repeat
				background-size 34%
			.random
				background url(../assets/img/random.png) center no-repeat
				background-size 34%
			.sloop
				background url(../assets/img/sloop.png) center no-repeat
				background-size 40%
			.loop
				background url(../assets/img/loop.png) center no-repeat
				background-size 36.8%
			.pmenu-icon
				background url(../assets/img/pmenu.png) center no-repeat
				background-size 42%

</style>
<script>
	import { mapGetters, mapActions } from 'vuex'

	export default {
		data(){
			return {
				isShow:false,
				isShowSonglist:false,
				songIndex:0,
				songurl:'',
				songalbum:'',
				songname:'',
				songart:'',
				songduration:'00:00', //音频时长
				songcurrentTime:'00:00', //播放时间
				progressValues:'0px', //播放进度条值 0px
				activeClass:false,
				cPlayClassName:'random',
				iconsClass:'icons',
				playmodel:'loop'
			}
		},
		props:{
			songlist:{
				type:Array,
				default: () => [],
				required: true
			},
			index:{
				type:Number,
				default: 0,  //默认从播放列表的第一首开始播放
				required: false
			},
			autoplay:false
		},
		computed:{
			...mapGetters({
				pbIsShow:'pbIsShow',
				songItme:'songItme',
				songUrl:'songUrl',
				songAlbum:'songAlbum',
				songName:'songName',
				songArt:'songArt',
				cPlayClass:'cPlayClass',
				songIndex:'songIndex'
			}),
			songlistLen(){
				return this.songItme.length
			},
			sIndex(){
				return this.songIndex
			}
		},
		mounted(){
			this.getDefaultSonglist(77149051)
			let n = 0
			let p = setInterval(()=>{
				n++
				this.initPlayer()
                localStorage.setItem("songItem", JSON.stringify(this.songItme))
                if (this.songItme.length > 0 || n > 15) {
                	clearInterval(p)
                	n = null
                }
			},1000)
		},
		methods:{
			...mapActions(['setSongIndex','updateSongItem','emptySongItem','deleteSongItem','changeSongAlbum','changeSongName','changeSongArt','changeSongUrl','changeCplayclass']),
			changeIsShowSonglist(){
				this.isShowSonglist = !this.isShowSonglist
				setTimeout(()=>{
					this.setPosition(this.songIndex)
				},0)
			},
			toEmptySongItem(){
				this.emptySongItem()
				localStorage.removeItem("songItem")
				localStorage.setItem("songIndex", 0)
			},
			deleteSong(index){
				this.deleteSongItem(index)
				localStorage.setItem("songItem", JSON.stringify(this.songItme))
			},
			updatePlayerState(item){
				this.changeSongAlbum(item.album.picUrl)
				this.changeSongName(item.name)
				this.changeSongArt(item.artists[0].name)
				this.changeSongUrl(item.mp3Url)
			},
			initPlayer(){
				const i = localStorage.getItem('songIndex') ? localStorage.getItem('songIndex') : this.index
				const items = this.songItme
				this.setSongIndex(i)
				this.updatePlayerState(items[i])
	            if (localStorage.getItem("playModel")) {
	                this.playmodel = localStorage.getItem("playModel")
	            } else {
	                this.playmodel = this.playmodel
	            }
			},
			mPlaymodel(event){
		        if (this.playmodel === "loop") {
		            this.playmodel = "sloop"
		        } else if (this.playmodel === "sloop") {
		            this.playmodel = "random"
		        } else {
		            this.playmodel = "loop"
		        }
		        localStorage.setItem("playModel", this.playmodel)
		    },
		    playControll(index){
		    	const audio = document.getElementById("audio")
		    	this.songduration = '00:00'
		        this.songcurrentTime = '00:00'
		        this.setPosition(this.songIndex)
		        try{
		        	this.updatePlayerState(this.songItme[index])
		        	setTimeout(() => {
		        		audio.play()
		        		this.setSongIndex(index)
		        		localStorage.setItem("songIndex", this.songIndex)
	                }, 3000)
		        } catch (e) {
		        	this.setSongIndex(index + 1)
			        this.playControll(this.songIndex)
		        }
		    },
		    selectSongPlay(index){
		    	const audio = document.getElementById("audio")
		        if (this.songIndex == index && !audio.paused) return false
		    	this.songduration = '00:00'
		        this.songcurrentTime = '00:00'
		        this.progressValues = 0 + "px"
		        this.setSongIndex(index)
		    	localStorage.setItem("songIndex", this.songIndex)
		        this.playControll(this.songIndex)
		    },
		    playNext() {
		        this.progressValues = 0 + "px"
		        if (this.playmodel === 'random') {
		            this.setSongIndex(Math.floor(Math.random()*this.songItme.length))
		        } else {
		            if (this.songIndex < this.songItme.length - 1) {
		                this.setSongIndex(this.songIndex+1)
		            } else {
		                this.setSongIndex(0)
		            }
		        }
		        localStorage.setItem("songIndex", this.songIndex)
		        this.playControll(this.songIndex)
		    },
		    playPrev() {
		    	this.progressValues = 0 + "px"
		        if (this.playmodel === 'random') {
		            this.setSongIndex(Math.floor(Math.random()*this.songItme.length))
		        } else {
		            if (this.songIndex > 0) {
		                this.setSongIndex(this.songIndex-1)
		            }
		            if (this.songIndex === 0) {
		                this.setSongIndex(this.songItme.length - 1)
		            }
		        }
		        localStorage.setItem("songIndex", this.songIndex)
		        this.playControll(this.songIndex)
		    },
		    mstime(duration) {
			    const cduration = isNaN(parseInt(duration / 1000, 10)) ? 0 : parseInt(duration / 1000, 10)
			    let dduration = isNaN(parseInt(cduration / 60, 10)) ? 0 : parseInt(cduration / 60, 10)
			    let btime = cduration - dduration * 60
			    dduration = dduration < 0 ? "00" : dduration < 10 ? "0" + dduration : dduration //分
			    btime = btime < 0 ? "00" : btime < 10 ? "0" + btime : btime //秒
			    return dduration + ":" + btime
			},
		    timeupdateAu() {
		        const audio = document.getElementById("audio")
		        //const mmst = this.mstime((audio.duration - audio.currentTime)*1000)
		        this.songduration = this.mstime(audio.duration*1000)
		        this.songcurrentTime = this.mstime(audio.currentTime*1000)
		        //播放完一首歌后:
		        if (audio.currentTime === audio.duration) {
		            if (this.playmodel === 'random') {
		                this.setSongIndex(Math.floor(Math.random()*this.songItme.length))
		            }else if(this.playmodel === 'sloop'){
		                this.setSongIndex(this.songIndex)
		            }else{
		                this.setSongIndex(this.songIndex+1)
		                if (this.songIndex === this.songItme.length) {
		                    this.setSongIndex(0)
		                }
		            }
		            this.playControll(this.songIndex)
		        }
		        this.progressValues = ((audio.currentTime / audio.duration) * 100) + '%'
		    },
			play(){
				const audio = document.getElementById("audio")
				const album = document.getElementById("album")
				if (audio.paused) {
					audio.play()
					this.changeCplayclass('pause-icon')
					album.style.animationPlayState = 'running'
				} else {
					audio.pause()
					this.changeCplayclass('play-icon')
					album.style.animationPlayState = 'paused'
				}
			},
			setPosition(index){
				const h = document.querySelectorAll('.list-ul li')[0].offsetHeight
				document.querySelector('.list-ul').scrollTop = index*h
			},
			getDefaultSonglist(id){
                const url = "http://odetoall.applinzi.com/weixin/musiclist/"+id+"/"
                const data = {}
                const localsongItem = JSON.parse(localStorage.getItem("songItem"))
                if (localsongItem && localsongItem.length > 0) {
                    this.updateSongItem(localsongItem)
                    return false
                }
                this.updateSongItem({ajaxurl:url,querydata:data})//parse
            }
		}
    }
</script>