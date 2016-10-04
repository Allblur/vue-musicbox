<template>
	<div>
		<topbar></topbar>
		<div class="play-wrap">
	   		<div class="album-box">
	   			<div class="album-bg">
	   				<div class="album">
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
.play-wrap
	display flex
	flex-direction column
	flex-wrap wrap
	align-content space-between
	.album-box
		margin-top 1.2rem
		flex 1
		.album-bg
			width 72%
			max-height 400px
			margin-left 14%
			overflow hidden
			.album
				width 100%
				img
					width 100%
		.song-info-box
			text-align center
			h2
				margin-top .5rem
				margin-bottom .2rem
				line-height 23px
				overflow hidden
				font-size .52rem
				font-weight normal
				color #1a1a1a
			p
				line-height 24px
				font-size 14px
				color #7a7a7a
</style>
<script>
	import { mapGetters, mapActions } from 'vuex'
	import TopBar from '../../components/TopBar.vue'

	export default {
		data() {
			return {
				msg:'wellcome to vue-musicbox'
			}
		},
		methods:{
			...mapActions(['changePbIsShow'])
		},
		computed:{
			...mapGetters({
				pbIsShow:'pbIsShow',
				songItme:'songItme',
				songIndex:'songIndex',
				songalbum:'songAlbum',
				songname:'songName',
				songart:'songArt'
			})
		},
		components:{
			topbar:TopBar
		},
		created(){
			//changePbIsShow(true)
		},
		mounted (){
			this.changePbIsShow(true)
		}
    }
</script>