<template>
	<view class="list">
		<musichead title="网易云音乐"></musichead>
		list
	</view>
</template>

<script>
	import '@/common/iconfont.css'
	import musichead from '@/components/music-head'
	import {playListDetail} from '@/common/api.js'
	export default {
		components:{
			musichead:musichead
		},
		data() {
			return {
				musicList:[],
				
			};
		},
		onLoad(options){
			playListDetail(options.listId).then(res=>{
				this.musicList = res.data
			})
		}
	}
</script>

<style lang="less">

</style>
