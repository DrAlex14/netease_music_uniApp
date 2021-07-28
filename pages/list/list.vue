<template>
	<view class="list">
		<view class="fixbg" :style="{'background-image': 'url('+musicList.playlist.coverImgUrl+')'}"></view>
		<musichead :title="musicList.playlist.name" color="#ffffff"></musichead>
		<view class="container">
			<scroll-view scroll-y="true" >
				<view class="list-head">
					<view class="list-head-img">
						<image src="../../static/logo.png" mode="">
							<text class="iconfont icon-bofang2">30亿</text>
						</image>
					</view>
					<view class="list-head-text">
						<view>{{musicList.playlist.name}}</view>
						<view>
							<image src="../../static/logo.png" mode=""></image>
							<view class="">网易云音乐</view>
						</view>
						<view>{{musicList.playlist.description}}</view>
					</view>
				</view>
				<!-- #ifdef MP-WEIXIN -->
				<button open-type="share" class="list-share">
					<text class="iconfont icon-fenxiang1"></text>分享给你的好友
				</button>
				<!-- #endif -->
				<view class="list-music">
					<view class="list-music-head">
						<text class="iconfont icon-bofang"></text>
						<text>播放全部</text>
						<text>(共{{musicList.playlist.tracks.length}}首)</text>
					</view>
					<view class="list-music-items" v-for="(item,index) in musicList.playlist.tracks" :key="index">
						<view class="item-top">{{index+1}}</view>
						<view class="item-song">
							<view class="song-name">{{item.name}}</view>
							<image src="../../static/dujia.png" mode="widthFix"></image>
							<image src="../../static/sq.png" mode="widthFix"></image>
							阿冗 — 与我无关
						</view>
						<text class="iconfont icon-bofang3" @tap="handlePlayMusic()"></text>
					</view>
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
				musicList:{},
			};
		},
		methods:{
			handlePlayMusic(){
				debugger
			}
		},
		onLoad(options){
			playListDetail(options.listId).then(res=>{
				this.musicList = res.data
			})
		}
	}
</script>

<style lang="less">
	.list{
		.fixbg{
			height: 100vh;
			width: 100vw;
			position: fixed;
			top: 0;
			left: 0;
			background-image: ;
			background-size: cover;
			background-position: center 0;
			filter: blur(15px);
			transform: scale(1.2);
		}
		.container{
			.list-head{
				display: flex;
				margin: 20rpx 30rpx;
				.list-head-img{
					margin-right: 42rpx;
					position: relative;
					image{
						height: 264rpx;
						width: 264rpx;
						border-radius: 30rpx;						
					}
					text{
						position: absolute;
						font-size: 26rpx;
						top: 8rpx;
						right: 8rpx;
						color: white;
					}
				}
				.list-head-text{
					view:nth-child(1){
						color: white;
						font-size: 34rpx;
					}
					view:nth-child(2){
						display: flex;
						margin: 20rpx 0;
						font-size: 24rpx;
						align-items: center;
						image{
							margin-right: 14rpx;
							width: 54rpx;
							height: 54rpx;
							border-radius: 50%;
						}
						view{
							color: white;
						}
					}
					view:nth-child(3){
						color: white;
						line-height: 34rpx;
						font-size: 22rpx;
					}
				}
			}
			.list-share{
				background-color: rgba(0,0,0,0.4);
				width: 330rpx;
				height: 74rpx;
				border-radius: 30rpx;
				margin: 0 auto;
				line-height: 74rpx;
				text-align: center;
				font-size: 28rpx;
				color: white;
				text{
					margin-right: 16rpx;
				}
			}
			.list-music{
				background-color: #fff;
				border-radius: 50rpx;
				height: 100%;
				overflow: hidden;
				margin-top: 20rpx;
				.list-music-head{
					margin: 20rpx 0 20rpx 30rpx;
					text:nth-child(1){
						font-size: 50rpx;
						height: 50rpx;
						margin-right: 15rpx;
					}
					text:nth-child(2){
						font-size: 30rpx;
					}
					text:nth-child(3){
						color: #999999;
						font-size: 26rpx;
					}
				}
				.list-music-items{
					margin: 10rpx;
					display: flex;
					.item-top{
						flex: 1;
						font-size: 36rpx;
						line-height: 84rpx;
						text-align: center;
					}
					.item-song{
						flex: 5;
						color: #999999;
						.song-name{
							color: #000000;
							font-size: 40rpx;
						}
						image{
							width: 40rpx;
							margin-right: 5rpx;
						}
					}
					text{
						flex: 1;
						line-height: 84rpx;
						text-align: center;
						font-size: 50rpx;
						margin-right: 32rpx;
					}
				}
			}
		}
	}
</style>
