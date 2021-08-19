<template>
	<view class="detail">
		<view class="fixbg"></view>
		<musichead title="播放歌曲" color="#ffffff" :icon="true"></musichead>
		<view class="container" v-show="!isLoading">
			<scroll-view scroll-y="true">
				<view class="detail-play">
					<image src="../../static/logo.png" mode="widthFix"></image>
					<text class="iconfont icon-bofang1"></text>
					<view class=""></view>
				</view>
				<view class="detail-lyric">
					<view class="detail-lyric-wrap">
						<view class="detaill-lyric-item">歌词歌词歌词歌词</view>
						<view class="detaill-lyric-item active">歌词歌词歌词歌词</view>
						<view class="detaill-lyric-item">歌词歌词歌词歌词歌词歌词歌词歌词</view>
					</view>
				</view>
				<view class="detail-like">
					<view class="detail-like-head">
						喜欢这首歌的人也听
					</view>
					<view class="detail-like-item" v-for="index in 4">
						<view class="detail-like-img">
							<image src="../../static/wangyiyunyinyue.png"></image>
						</view>
						<view class="detail-like-song">
							<view style="font-size: 36rpx;">蓝</view>
							<image src="../../static/dujia.png" mode="widthFix"></image>
							<image src="../../static/sq.png" mode="widthFix"></image>
							<text style="color: #c6c2bf;font-size: 28rpx;">石白其 - 蓝</text>
						</view>
						<text class="iconfont icon-bofang3"></text>
					</view>
				</view>
				<view class="detail-comment">
					<view class="detail-comment-head">精彩评论</view>
					<view class="detail-comment-item" v-for="index in 4">
						<view class="detail-comment-img">
							<image src="../../static/wangyiyunyinyue.png" mode=""></image>
						</view>
						<view class="detail-comment-content">
							<view class="detail-comment-title">
								<view class="detail-comment-name">
									<view class="">是阿荣的荣</view>
									<view class="">2020年1月21日</view>
								</view>
								<view class="detail-comment-like">
									55027<text class="iconfont icon-dianzan"></text>
								</view>
							</view>
							<view class="detail-comment-text">
								测试文字测试文字测试文字测试文字测试文字测试文字
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import '@/common/iconfont.css'
	import musichead from '@/components/music-head'
	import {playListDetail , songDetail , songComment , songLyric , songUrl , simiSong} from '@/common/api.js'
	export default {
		components:{
			musichead:musichead
		},
		data() {
			return {
				isLoading:false
			};
		},
		onLoad(options) {
			const songId = options.songId;
			this.initMusic(songId);
		},
		methods:{
			initMusic(songId){
				debugger;
				Promise.all([songDetail(songId)]).then(res=>{
					console.log(res)
				})
			}
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
			background-image: url('https://p1.music.126.net/DrRIg6CrgDfVLEph9SNh7w==/18696095720518497.jpg');
			background-size: cover;
			background-position: center 0;
			filter: blur(20px);
			transform: scale(1.2);
		}
		.container{
			.detail-play{
				text-align: center;
				width: 580rpx;
				height: 580rpx;
				background-image: url(~@/static/docs.png);
				background-size: cover;
				margin: 214rpx auto 0 auto;
				position: relative;
				image{
					width: 370rpx;
					height: 370rpx;
					position: absolute;
					left: 0;
					top: 0;
					bottom: 0;
					right: 0;
					margin: auto;
					border-radius: 50%;
				}
				text{
					width: 100rpx;
					height: 100rpx;
					font-size: 100rpx;
					color: #000000;
					position: absolute;
					left: 0;
					top: 0;
					bottom: 0;
					right: 0;
					margin: auto;
				}
				view{
					width: 230rpx;
					height: 360rpx;
					background-image: url(~@/static/needle.png);
					background-size: cover;
					position: absolute;
					left: 100rpx;
					top: -600rpx;
					bottom: 0;
					right: 0;
					margin: auto;
					transform: rotate(-20deg);
					transform-origin:top left;
					animation: needleRotate 0.5s linear;;
				}
				@keyframes needleRotate
				{
				  from {transform: rotate(0);}
				  to {transform: rotate(-20deg);}
				}
			}
			.detail-lyric{
				font-size: 32rpx;
				font-weight: 500;
				line-height: 82rpx;
				height: 246rpx;
				align-items: center;
				overflow: hidden;
				color: #6f6e73;
				.detail-lyric-wrap{
					text-align: center;
					.detail-lyric-item{
						height: 82rpx;
					}
					.active{
						color: white;
					}
				}
			}
			.detail-like{
				margin: 0 30rpx;
				.detail-like-head{
					font-size: 36rpx;
					color: white;
					margin: 50rpx 0;
					
				}
				.detail-like-item{
					display: flex;
					align-items: center;
					color: #FFFFFF;
					margin-bottom: 20rpx;
					.detail-like-img{
						width: 82rpx;
						height: 82rpx;
						image{
							width: 100%;	
							height: 100%;
							border-radius: 20rpx;
						}
					}
				}
				.detail-like-song{
					flex: 1;
					margin-left: 20rpx;
					image{
						width: 40rpx;
						margin-right: 10rpx;
					}
				}
				text{
					font-size: 50rpx;
				}
			}
			.detail-comment{
				margin: 0 30rpx;
				.detail-comment-head{
					font-size: 36rpx;
					color: white;
					margin: 50rpx 0;
				}
				.detail-comment-item{
					display: flex;
					margin-bottom: 28rpx;
					.detail-comment-img{
						width: 64rpx;
						height: 64rpx;
						margin-right: 18rpx;
						image{
							width: 100%;
							height: 100%;
							border-radius: 50%;
							overflow: hidden;
						}
					}
					.detail-comment-content{
						flex: 1;
						border-bottom: 1px solid #e0e0e0;
						.detail-comment-title{
							display: flex;
							justify-content: space-between;
							.detail-comment-name{
								view:nth-child(1){
									font-size: 26rpx;
									color: #1a1a1a;
								}
								view:nth-child(2){
									font-size: 20rpx;
									color: #555555;
								}
							}
							.detail-comment-like{font-size: 28rpx;}
						}
						.detail-comment-text{
							font-size: 32rpx;
							line-height: 40rpx;
							color: #fff;
							margin: 20rpx 0;
						}
					}
				}
			}
		}
	}
</style>
