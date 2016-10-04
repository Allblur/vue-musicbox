export default {
	CHANGE_PDISSHOW(state,f){
		state.pbIsShow = f
	},

	UPDATE_SONGITEM(state,lists){
		state.songItme = lists
	},

	EMPTY_SONGITEM(state){
		state.songItme.length = 0
		state.songItme = []
	},

	ADD_SONGITEM(state,lists){
		let nItem = lists.concat(state.songItme)
        state.songItme = nItem
	},

	DELETE_SONGITEM(state,index){
		state.songItme.splice(index,1)
	},

	SET_SONGINDEX(state,index){
		state.songIndex = index
	},

	ADD_LIKEPLAYLIST(state,lists){
		let nItem = lists.concat(state.songItme)
		state.likePlaylist = nItem
	},

	EMPTY_LIKEPLAYLIST(state){
		state.likePlaylist.length = 0
		state.likePlaylist = []
	},

	DELETE_LIKEPLAYLIST(state,index){
		state.likePlaylist.splice(index,1)
	},

	CHANGE_SONGALBUM(state,album){
		state.songAlbum = album
	},

	CHANGE_SONGNAME(state,name){
		state.songName = name
	},

	CHANGE_SONGART(state,art){
		state.songArt = art
	},

	UPDATE_SEARCHRESULT(state,data){
		state.searchResult = data
	},
	CHANGE_SEARCHKEYWORD(state,w){
		state.searchKeyword = w
	},

	UPDATE_INDEXDATA(state,data){
		state.indexData = data
	},

	UPDATE_BANNERDATA(state,data){
		state.bannerData = data
	},

	UPDATE_PLAYLISTDETAIL(state,data){
		state.playlistDetail = data
	},
}
