<template>
	<div class="player-box">
		<div class="song-list-box" v-show="isShowSonglist">
			<div class="song-list-title">
				<div class="st sa"><a>收藏全部</a></div>
				<div class="st si"><p>播放列表({{songlistLen}})</p></div>
				<div class="st sa"><a @click="toEmptySongItem">清空</a></div>
			</div>
			<div class="list-div">
				<ul class="list-ul">
					<li v-for="(item,index) in songlist">
						<a class="select-song" @click="selectSongPlay(index)">{{item.name}}</a>
						<span class="delete-song" @click="deleteSong(index)"></span>
					</li>
				</ul>
			</div>
		</div>
		<div class="mini-player" v-show="!pbIsShow">
			<div class="time-line" :style="{'width':progressValues}"></div>
			<div class="mini-box">
				<router-link to="/play" class="m-album">
                    <img :src="songalbum" :alt="songname">
                </router-link>
				<div class="m-song-info">
					<h3>{{songname}}</h3>
					<p>{{songart}}</p>
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
		<audio id="audio" :src="songurl" preload="metadata" currenttime="true" @timeupdate="timeupdateAu" class="hide"></audio>
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
			height 7.3rem
			border-top 1px solid #dedede
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
			.list-div
				height 6rem
				width 100%
				position relative
				overflow hidden
				.list-ul
					height 6rem
					overflow-x hidden
					overflow-y auto
					li
						position relative
						overflow hidden
						.select-song
							margin 0 .3rem
							display block
							height 1.2rem
							line-height 1.2rem
							position relative
							white-space nowrap
							text-overflow ellipsis
							overflow hidden
						.select-song:after
							content ''
							position absolute
							bottom 0
							left 0
							width 100%
							height 1px
							background-color #dedede
							transform scaleY(0.5)
							transform-origin 0 bottom
						.active
							padding-left 0.6rem
							background url(../assets/pa.png) left center no-repeat
							background-size .5rem .5rem
							color #eb4f38
						.delete-song
							position absolute
							right .32rem
							top .15rem
							display block
							width 1rem
							height 1rem
							background url(../assets/delete.png) center no-repeat
							background-size .5rem .5rem
							overflow hidden
							z-index 5
		.play-bar-box
			width 100%
			height 30px
			display flex
			align-items center
			.now-time,.all-time
				flex 1
				text-align center
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
				background url(../assets/play.png) center no-repeat
				background-size 60%
			.pause-icon
				background url(../assets/pause.png) center no-repeat
				background-size 60%
			.prev-icon
				background url(../assets/prev.png) center no-repeat
				background-size 34%
			.next-icon
				background url(../assets/next.png) center no-repeat
				background-size 34%
			.random
				background url(../assets/random.png) center no-repeat
				background-size 34%
			.sloop
				background url(../assets/sloop.png) center no-repeat
				background-size 40%
			.loop
				background url(../assets/loop.png) center no-repeat
				background-size 36.8%
			.pmenu-icon
				background url(../assets/pmenu.png) center no-repeat
				background-size 42%

</style>
<script>
	import { mapGetters, mapActions } from 'vuex'

	export default {
		data(){
			return {
				isShow:false,
				isShowSonglist:false,
				activeindex:0,
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
				cPlayClass:'play-icon',
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
				songItme:'songItme'
			}),
			songlistLen(){
				return this.songItme.length
			}
		},
		mounted(){
			this.getDefaultSonglist(77149051)
			this.$nextTick(() => {
	            setTimeout(() => {
	                this.initPlayer()
	            }, 500)
	        })
		},
		methods:{
			...mapActions(['setSongIndex','updateSongItem','emptySongItem','deleteSongItem','changeSongAlbum','changeSongName','changeSongArt']),
			changeIsShowSonglist(){
				this.isShowSonglist = !this.isShowSonglist
			},
			toEmptySongItem(){
				this.emptySongItem()
				localStorage.removeItem("songItem")
				localStorage.setItem("activeindex", 0)
			},
			deleteSong(index){
				this.deleteSongItem(index)
				localStorage.setItem("songItem", JSON.stringify(this.songItme))
			},
			updatePlayerSate(items){
				this.songurl = items.hmp3Url || items[i].mp3Url
				this.songalbum = items.album.picUrl
				this.songname = items.name
				this.songart = items.artists[0].name
				this.changeSongAlbum(this.songalbum)
				this.changeSongName(this.songname)
				this.changeSongArt(this.songart)
				this.addActive(this.activeindex)
			},
			initPlayer(){
				let i = localStorage.getItem('activeindex') ? localStorage.getItem('activeindex') : this.index
				let items = this.songItme
				this.setSongIndex(i)
				this.activeindex = i
				this.updatePlayerSate(this.songItme[i])
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
			addActive(index){
		        let element = document.querySelectorAll('.select-song')
		        for (let i = 0, j = element.length; i < j; i++) {
		            element[i].className = 'select-song'
		        }
		        element[index].className = 'select-song active'
		    },
		    playControll(index){
		    	this.songduration = '00:00'
		        this.songcurrentTime = '00:00'
		        this.updatePlayerSate(this.songItme[index])
		        document.title = 'vue-music - '+this.songname+' - '+this.songart
		        let audio = document.getElementById("audio")
		        this.addActive(index)
		        this.$nextTick(() => {
	                setTimeout(() => {
		        		audio.play()
		        		this.setSongIndex(this.activeindex)
		        		localStorage.setItem("activeindex", this.activeindex)
	                }, 2000)
	            })

		        this.$nextTick(() => {
	                setTimeout(() => {
			            if (audio.error.code) {
			                console.log("error::"+audio.error.code)
			                this.activeindex = index + 1
			                this.playControll(this.activeindex)
			            }
	                }, 7000)
	            })
		    },
		    selectSongPlay(index){
		        if (this.activeindex == index && !audio.paused) return false
		        let audio = document.getElementById("audio")
		    	this.songduration = '00:00'
		        this.songcurrentTime = '00:00'
		        this.progressValues = 0 + "px"
		        this.activeindex = index
		    	localStorage.setItem("activeindex", this.activeindex)
		        this.playControll(this.activeindex)
		    },
		    playNext() {
		        this.progressValues = 0 + "px"
		        if (this.playmodel === 'random') {
		            this.activeindex = Math.floor(Math.random()*this.songItme.length)
		        } else {
		            if (this.activeindex < this.songItme.length - 1) {
		                this.activeindex++
		            } else {
		                this.activeindex = 0
		            }
		        }
		        localStorage.setItem("activeindex", this.activeindex)
		        this.playControll(this.activeindex)
		    },
		    playPrev() {
		    	this.progressValues = 0 + "px"
		        if (this.playmodel === 'random') {
		            this.activeindex = Math.floor(Math.random()*this.songItme.length)
		        } else {
		            if (this.activeindex > 0) {
		                this.activeindex--
		            }
		            if (this.activeindex === 0) {
		                this.activeindex = this.songItme.length - 1
		            }
		        }
		        localStorage.setItem("activeindex", this.activeindex)
		        this.playControll(this.activeindex)
		    },
		    mstime(duration) {
			    let cduration = parseInt(duration / 1000, 10),dduration = parseInt(cduration / 60, 10),btime = cduration - dduration * 60
			    dduration = dduration < 0 ? "00" : dduration < 10 ? "0" + dduration : dduration //分
			    btime = btime < 0 ? "00" : btime < 10 ? "0" + btime : btime //秒
			    return dduration + ":" + btime
			},
		    timeupdateAu() {
		        let audio = document.getElementById("audio")
		        //let mmst = this.mstime((audio.duration - audio.currentTime)*1000)
		        this.songduration = this.mstime(audio.duration*1000)
		        this.songcurrentTime = this.mstime(audio.currentTime*1000)
		        //播放完一首歌后:
		        if (audio.currentTime === audio.duration) {
		            if (this.playmodel === 'random') {
		                this.activeindex = Math.floor(Math.random()*this.songItme.length)
		            }else if(this.playmodel === 'sloop'){
		                this.activeindex = this.activeindex
		            }else{
		                this.activeindex++
		                if (this.activeindex === this.songItme.length) {
		                    this.activeindex = 0
		                }
		            }
		            this.playControll(this.activeindex)
		        }
		        this.progressValues = ((audio.currentTime / audio.duration) * 100) + '%'
		    },
			play() {
				let audio = document.getElementById("audio")
				if (audio.paused) {
					audio.play()
					this.cPlayClass = 'pause-icon'
				} else {
					audio.pause()
					this.cPlayClass = 'play-icon'
				}
				document.title = 'vue-music - '+this.songname+' - '+this.songart
			},
			getDefaultSonglist(id){
                let url = "http://odetoall.applinzi.com/weixin/musiclist/"+id+"/"
                let data = {}
                let localsongItem = JSON.parse(localStorage.getItem("songItem"))
                if (localsongItem && localsongItem.length > 0) {
                    this.updateSongItem(localsongItem)
                    return false
                }
                this.updateSongItem({ajaxurl:url,querydata:data})//parse
                localStorage.setItem("songItem", JSON.stringify(this.songItme))
            }
		}
    }
</script>