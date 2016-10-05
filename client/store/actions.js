import fetchItem from './api'

const makeAction = (type) => {
	return ({commit, state}, ...args) => commit(type, ...args)
}

const fetchMakeAction = (type) => {
		return ({commit, state},arg) => {
			if (arg.ajaxurl) {
				return fetchItem(arg).then((items) => {
					commit(type, items.list)
				})
			}
			commit(type, arg)
		}
}

export const changePbIsShow = makeAction('CHANGE_PDISSHOW')
export const updateSongItem = fetchMakeAction('UPDATE_SONGITEM')
export const emptySongItem = makeAction('EMPTY_SONGITEM')
export const addSongItem = makeAction('ADD_SONGITEM')
export const deleteSongItem = makeAction('DELETE_SONGITEM')
export const setSongIndex = makeAction('SET_SONGINDEX')
export const emptyLikePlaylist = makeAction('EMPTY_LIKEPLAYLIST')
export const addLikePlaylist = makeAction('ADD_LIKEPLAYLIST')
export const deleteLikePlaylist = makeAction('DELETE_LIKEPLAYLIST')
export const changeSongAlbum = makeAction('CHANGE_SONGALBUM')
export const changeSongName = makeAction('CHANGE_SONGNAME')
export const changeSongArt = makeAction('CHANGE_SONGART')
export const updateSearchResult = fetchMakeAction('UPDATE_SEARCHRESULT')
export const changeSearchKeyword = makeAction('CHANGE_SEARCHKEYWORD')
export const updateIndexData = fetchMakeAction('UPDATE_INDEXDATA')
export const updateBannerData = fetchMakeAction('UPDATE_BANNERDATA')
export const updatePlaylistDetail = fetchMakeAction('UPDATE_PLAYLISTDETAIL')