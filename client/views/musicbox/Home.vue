<template>
	<div>
        <div class="header">
            <topbar></topbar>
        </div>
        <router-view class="app-page"></router-view>
	</div>
</template>
<style lang="stylus">
@media (max-width 860px)
    .header .inner
        padding 10px

@media (max-height 568px)
    .header .inner
        height 55px

@media (max-width 600px)
    body
        font-size 14px
    .header
        .inner
            padding 15px
    a
        margin-right 1em
    .github
        display none

.header
    background-color rgba(12,12,12,.8)
    position fixed
    z-index 999
    top 0
    left 0
    right 0
.logo
    width 24px
    margin-right 10px
    display inline-block
    vertical-align middle
</style>
<script>
    import { mapGetters, mapActions } from 'vuex'
    import TopBar from '../../components/TopBar.vue'

    function fetchItem(store) {
        const url = 'http://odetoall.applinzi.com/weixin/gettop/'
        const data = {
            offset:6,
            limit:6
        }
        return store.dispatch('updateIndexData', {ajaxurl:url,querydata:data})
    }

	export default{
		data(){
			return{
                msg:'wellcome to vue-musicbox'
			}
		},
        components:{
            topbar:TopBar
        },
        preFetch:fetchItem,
		methods:{
            ...mapActions(['changePbIsShow'])
        },
        computed:{
            ...mapGetters({
                pbIsShow:'pbIsShow',
                searchKeyword:'searchKeyword'
            })
        },
        beforeMount(){
            fetchItem(this.$store)
        },
        created(){
            this.changePbIsShow(false)
        }
    }
</script>