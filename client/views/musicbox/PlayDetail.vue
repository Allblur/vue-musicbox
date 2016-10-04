<template>
   <h1>playdetail</h1>
</template>
<style lang="stylus">
</style>
<script>
	import { mapGetters, mapActions } from 'vuex'
	export default{
		data(){
			return{
				title:'Playlist detail page'
			}
		},
		computed:{
            ...mapGetters({
                indexData:'indexData'
            }),
            indexdatas(){
                return this.indexData
            }
        }
   }
</script>