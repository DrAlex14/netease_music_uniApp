<template>
	<view class="detail">
		<view class="fixbg"></view>
		<musichead title="播放歌曲" color="#ffffff" :icon="true"></musichead>
		<view class="container" v-show="!isLoading">
			<scroll-view scroll-y="true">
				<view class="detail-play">
					<image src="../../static/docs.png" mode="widthFix"></image>
				</view>
			</scroll-view>
		</view>
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
				isLoading:false,
				songId:0
			};
		},
		onLoad(options) {
			this.songId = options.id
		}
	}
</script>

<style lang="less" scoped>
	.detail{
		.fixbg{
			height: 100vh;
			width: 100vw;
			position: fixed;
			top: 0;
			left: 0;
			background-image: url('/static/logo.png');
			background-size: cover;
			background-position: center 0;
			filter: blur(15px);
			transform: scale(1.2);
		}
		.container{
			.detail-play{
				text-align: center;
				image{
					
				}
			}
		}
	}
</style>
