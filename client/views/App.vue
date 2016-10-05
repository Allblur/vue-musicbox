<template>
    <div id="app">
        <transition name="fade" mode="out-in">
            <router-view class="view" style="margin-bottom:90px"></router-view>
        </transition>
        <player :songlist="songItme" :index="playindex"></player>
    </div>
</template>
<style lang="stylus">
    html,body
        width 100%
        min-height 100%

    body
        background-color #fff
        margin 0
        padding-top 55px
        font-family:"Segoe UI", Arial, "Microsoft Yahei", sans-serif
        font-size:15px
        color #454545

    a
        color #454545
        text-decoration none

    input,select,button,textarea,a
        -webkit-appearance none
        -webkit-tap-highlight-color rgba(0, 0, 0, 0)

    .view
        margin 0 auto
        position relative

    .fade-enter-active, .fade-leave-active
        transition all .2s ease

    .fade-enter, .fade-leave-active
        opacity 0

    .inline-block
        display inline-block

    .block
        display block
    .hide
        display none
</style>
<script>
    import { mapGetters, mapActions } from 'vuex'
    import Player from '../components/Player.vue'

    export default {
        data() {
            return {
                playindex:0
            }
        },
        components:{
            player:Player
        },
        computed:{
            ...mapGetters({
                songItme:'songItme'
            })
        }
    }
</script>
