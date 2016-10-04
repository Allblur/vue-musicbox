import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'
import {fetchItem} from './api.js'

Vue.use(Vuex)

const state = {
    pbIsShow: false,
    songItme: [],
    likePlaylist:[],
    songIndex: 0,
    songAlbum:'http://p4.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
    songName:'',
    songArt:'',
    searchKeyword:'',
    searchResult:{},
    indexData:[],
    bannerData:[],
    playlistDetail:{}
}

export default new Vuex.Store({
    actions,
    getters,
    mutations,
    state,
})
