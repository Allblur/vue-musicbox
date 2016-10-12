<template>
	<div class="play-box">
		<!-- <topbar></topbar> -->
		<div class="play-bg" :style="styleObj"></div>
		<div class="play-header">
			<a @click="back" class="block bk">
				<i class="block back-pic" id="comeback"></i>
			</a>
			<div class="song-names">
				<span>{{songname}}&nbsp;-&nbsp;{{songart}}</span>
			</div>
		</div>
		<div class="play-wrap">
	   		<div class="album-box">
	   			<div class="album-bg">
	   				<div class="album" id="album">
	   					<img :src="songalbum" :alt="songname">
	   				</div>
	   			</div>
	   			<div class="song-info-box">
	   				<h2>{{songname}}</h2>
	   				<p>{{songart}}</p>
	   			</div>
	   		</div>
		</div>
	</div>
</template>
<style lang="stylus">
.app
	position absolute
	top 0
	left 0
	.player-box
		background-color rgba(255,255,255,0) !important
		box-shadow none
		.play-bar-box
			.play-bar
				.bar-box
					background-color #e6e6e6 !important
.play-box
	width 100vw
	height 91.6vh
	margin-bottom 0px !important
	.play-bg
		position absolute
		width 100vw
		height 100vh
		top 0
		left 0
		filter blur(55px)
		z-index 1
.play-header
	height 55px
	position fixed
	z-index 999
	top 0
	left 0
	right 0
	background-color rgba(6,6,6,0.1)
	.bk
		width 15vw
		height 55px
		float left
		margin-right 0px !important
		#comeback
			width 15vw
			height 55px
			background url(../../assets/img/back.png) center / 50% no-repeat
.song-names
	margin 0 17vw
	height 55px
	line-height 55px
	overflow hidden
	text-align center
	color #fefefe

.play-wrap
	display flex
	flex-direction column
	flex-wrap wrap
	align-content space-between
	position absolute
	width 100vw
	height 68vh
	top 15vh
	left 0
	overflow hidden
	z-index 5
	.album-box
		flex 1
		.album-bg
			width 66vw
			height 66vw
			margin-left 17vw
			overflow hidden
			.album
				width 63vw
				height 63vw
				border 1.5vw solid #3e3e3e
				border-radius 50%
				animation rotate 10s linear infinite
				overflow hidden
				img
					width 100%
		.song-info-box
			width 100vw
			text-align center
			h2
				margin-top .5rem
				margin-bottom .2rem
				height 30px
				line-height 30px
				overflow hidden
				font-size .52rem
				font-weight normal
				color #efefef
			p
				line-height 24px
				font-size 14px
				color #c6c6c6

@keyframes rotate
	0%
	100%
		transform rotate(0deg)
	100%
		transform rotate(360deg)
</style>
<script>
	import { mapGetters, mapActions } from 'vuex'
	import TopBar from '../../components/TopBar.vue'

	export default {
		data() {
			return {
				title:'play page'
			}
		},
		methods:{
			...mapActions(['changePbIsShow','changeAppClassName']),
			back(){
	        	this.$router.go(-1)
	        }
		},
		computed:{
			...mapGetters({
				pbIsShow:'pbIsShow',
				songItme:'songItme',
				songIndex:'songIndex',
				songalbum:'songAlbum',
				songname:'songName',
				songart:'songArt',
				songUrl:'songUrl'
			}),
			styleObj(){
				return {
					background:'rgba(7,7,7,.6) url('+this.songalbum+') center center / cover no-repeat'
				}
			}
		},
		components:{
			topbar:TopBar
		},
		created(){
			this.changeAppClassName('app')
		},
		mounted(){
			this.changePbIsShow(true)
		}
    }
</script>