<template>
    <div class="banner">
        <div class="banner-box"
             :style="{ transform:'translateX(-'+n+'%)',transition:speed}">
            <div class="banner-img"
                 v-for="(m,k) in img"
                 :style="{ transform:'translateX('+k+'00%)' }"
                 @touchstart="tstart"
                 @touchmove="tmove"
                 @touchend="tend"
                 @click="toDetailPage(m.id)"
            >
                <img :src = "m.picUrl" :alt="m.name">
            </div>
        </div>
        <div class="control-box">
            <ul class="inline-block circle">
                <li v-for="(m,k) in img"
                    :class="[k==index ? 'on':'']" class="inline-block">
                </li>
            </ul>
        </div>
    </div>
</template>
<style lang="stylus">
.banner
    position relative
    width 100%
    height 3.5rem
    overflow hidden
    .banner-box
        position relative
        width 100%
        height 100%
        .banner-img
            position absolute
            width 100%
            height 100%
            overflow hidden
            img
                width 100%
                margin-top -1.8rem
    .control-box
        position absolute
        width 100%
        height 20px
        bottom 0px
        z-index 10
        .circle
            width 100%
            position relative
            text-align center
            li
                width 10px
                height 10px
                line-height 20px
                margin-left 5px
                background-color #fcfcfc
                border-radius 50%
            .on
                background-color #3f3f3f
</style>
<script>

    export default{
        data(){
            return{
                n:0,
                drag:{
                    _n:'',
                    _startX:'',
                    _scorllWidth:'',
                    _status:false,
                    _length:0
                },
                index:0,
                speed:'.3s'
            }
        },
        props:['img'],
        computed:{
            images(){
                return this.img
            }
        },
        methods:{
            tstart(event){
                let e = event || window.event
                this.drag._n = this.n
                this.drag._startX = e.touches[0].clientX
                this.drag._scorllWidth = e.currentTarget.scrollWidth
                this.drag._status = true
                this.drag._length = this.images.length
                this.speed = '0s'
            },
            tmove(event){
                let e = event || window.event
                let nowX = e.touches[0].clientX
                let moveX = nowX - this.drag._startX
                let percent = ( moveX / this.drag._scorllWidth )*100;
                if(this.n == 0 && moveX > 0 ){
                    this.n = (this.drag._length-1) *100 - percent
                }else if (this.n == (this.drag._length-1) *100 && moveX < 0){
                    this.n = 0 - percent
                }else{
                    this.n = this.drag._n - percent
                }
                e.preventDefault()
                //console.log(this.n)
            },
            tend(event){
                this.n = this.drag._n;
                let e = event || window.event
                let endX = e.changedTouches[0].clientX
                let dragDistance = endX-this.drag._startX;
                if(dragDistance && dragDistance > this.drag._scorllWidth/2){
                    this.turnPrev()
                }else{
                    if(Math.abs(dragDistance) > this.drag._scorllWidth/2){
                        this.turnNext()
                    }
                }
                this.drag._status = false
                this.speed = '.3s'
            },
            turnPrev(){
                if(this.n == 0 ){
                    this.n += (this.images.length-1) *100
                    this.setStyle()
                }else{
                    this.n -= 100;
                    this.setStyle()
                }
            },
            turnNext(){
                if(this.n == (this.images.length-1) *100 ){
                    this.n = 0 ;
                    this.setStyle()
                }else{
                    this.n += 100;
                    this.setStyle()
                }
            },
            setStyle(){
                let index = this.n/100
                this.index = index;
            },
            autoTurn(){
                if(!this.drag._status){
                    this.turnNext()
                }
            },
            toDetailPage(id){
                this.$router.push({name: 'detail', params: { playlistId: id }})
            }
        },
        mounted(){
            setTimeout(() => {
                setInterval(this.autoTurn,4000)
            }, 500)
        }
    }
</script>
