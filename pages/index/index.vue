<template>
	<view class="index">
		<musichead title="网易云音乐" :icon="false"></musichead>
		<view class="container">
			<scroll-view scroll-y="true">
				<view class="index-search">
					<text class="iconfont icon-fangdajing"></text>
					<input type="text" placeholder="搜索歌曲" />
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import '@/common/iconfont.css'
	import musichead from '@/components/music-head'
	export default {
		components:{
			musichead:musichead
		},
		data() {
			return {
				title: '网易云音乐'
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style lang="less" scoped>
	.index{
		.container{
			.index-search{
				border-radius: 15px;
				background-color: rgba(231, 231, 231, 0.8);
				height: 70rpx;
				margin: 50rpx 30rpx 30rpx 30rpx;
				display: flex;
				align-items: center;
				.iconfont{
					line-height: ;
					margin-left: 20rpx;
				}
				input{
					margin-left: 20rpx;
				}
			}
		}
	}
</style>
