<template>
    <div id="app" :class="appClassName">
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
        font-family "Segoe UI", Arial, "Microsoft Yahei", sans-serif
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

    @keyframes uil-ripple
        0%
            width 0
            height 0
            opacity 0
            margin 0 0 0 0
        33%
            width 44%
            height 44%
            margin -22% 0 0 -22%
            opacity 1
        100%
            width 88%
            height 88%
            margin -44% 0 0 -44%
            opacity 0

    .loading
        background none
        position relative
        width 80px
        height 80px
        div
            position absolute
            top 50%
            left 50%
            margin 0
            width 0
            height 0
            opacity 0
            border-radius 50%
            border-width 12px
            border-style solid
            -webkit-animation uil-ripple 2s ease-out infinite
            animation uil-ripple 2s ease-out infinite
        div:nth-of-type(1)
            border-color #afafb7
        div:nth-of-type(2)
            border-color #5cffd6
            -webkit-animation-delay 1s
            animation-delay 1s
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
                songItme:'songItme',
                appClassName:'appClassName'
            })
        }
    }
</script>
