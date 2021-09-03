<template>
	<view class="detail">
		<view class="fixbg" :style="{'background-image':'url('+songDetail.al.picUrl+')'}"></view>
		<musichead :title="songDetail.name" color="#ffffff" :icon="true"></musichead>
		<view class="container" v-show="!isLoading">
			<scroll-view scroll-y="true">
				<view class="detail-play">
					<image :src="songDetail.al.picUrl" mode="widthFix" :class="{'detail-play-run': playType}"></image>
					<text class="iconfont" :class="playType?'icon-zanting1':'icon-bofang'" @click="handlePlay"></text>
					<view :class="playType?'needlePlay':'needlePause'"></view>
				</view>
				<view class="detail-lyric">
					<view class="detail-lyric-wrap" :style="{ transform: 'translateY('+ -(lyricIndex - 1) * 82 + 'rpx)' }">
						<view class="detaill-lyric-item" :class="{active: lyricIndex == index}" v-for="(item,index) in songLyric" :key="index">{{item.lyric}}</view>
					</view>
				</view>
				<view class="detail-like">
					<view class="detail-like-head">
						喜欢这首歌的人也听
					</view>
					<view class="detail-like-item" v-for="(item,index) in simiSong" :key="index">
						<view class="detail-like-img">
							<image :src="item.album.blurPicUrl" ></image>
						</view>
						<view class="detail-like-song">
							<view style="font-size: 36rpx;">{{item.name}}</view>
							<image v-if="item.privilege.flag>60 && item.privilege.flag<70" src="../../static/dujia.png" mode="widthFix"></image>
							<image v-if="item.privilege.maxbr == 999000" src="../../static/sq.png" mode="widthFix"></image>
							<text style="color: #c6c2bf;font-size: 28rpx;">{{item.album.artists[0].name}} - {{item.name}}</text>
						</view>
						<text class="iconfont icon-bofang3"></text>
					</view>
				</view>
				<view class="detail-comment">
					<view class="detail-comment-head">精彩评论</view>
					<view class="detail-comment-item" v-for="(item,index) in songComment">
						<view class="detail-comment-img">
							<image :src="item.user.avatarUrl" mode=""></image>
						</view>
						<view class="detail-comment-content">
							<view class="detail-comment-title">
								<view class="detail-comment-name">
									<view class="">{{item.user.nickname}}</view>
									<view class="">{{item.time | timeFormat}}</view>
								</view>
								<view class="detail-comment-like">
									{{item.likedCount | countFormat}}<text class="iconfont icon-dianzan"></text>
								</view>
							</view>
							<view class="detail-comment-text">
								{{item.content}}
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
				isLoading:false,
				songDetail: {
					al:{
						picUrl:''
					}
				},
				simiSong: [],
				songComment:[],
				songLyric: [],
				lyricIndex: 0,
				playType: true,
			};
		},
		onLoad(options) {
			const songId = options.songId;
			this.initMusic(songId);
		},
		methods:{
			initMusic(songId){
				Promise.all([songDetail(songId), simiSong(songId), songComment(songId), songLyric(songId), songUrl(songId)]).then(res=>{
					console.log(res);
					if(res[0][1].data.code == '200'){      //当前播放歌曲
						this.songDetail = res[0][1].data.songs[0];
					}
					if(res[1][1].data.code == '200'){      //相似歌曲
						this.simiSong = res[1][1].data.songs;
					}
					if(res[2][1].data.code == '200'){      //精彩评论
						this.songComment = res[2][1].data.hotComments;
					}
					if(res[3][1].data.code == '200'){      //歌词
						let lyric = res[3][1].data.lrc.lyric;
						let re = /\[([^\]]+)\]([^\[]+)/g;
						var result = []
						lyric.replace(re,($0,$1,$2)=>{
							result.push({"time":this.formatTimeToSec($1),"lyric":$2});
						})
						this.songLyric = result;
					}
					if(res[4][1].data.code == '200'){       //歌曲链接
						this.bgAudioManager = uni.getBackgroundAudioManager();
						this.bgAudioManager.title = this.songDetail.name;
						this.bgAudioManager.url = res[4][1].data.data[0].url || '';
						this.listenLyricIndex()
						this.bgAudioManager.onPlay(() => {
							this.listenLyricIndex()
						})
					}
				})
			},
			formatTimeToSec(time) {
				let arr = time.split(':');
				return Number((Number(arr[0]) * 60 + Number(arr[1])).toFixed(1));
			},
			handlePlay(songId){
				this.playType = !this.playType
				if(this.playType == false){
					this.bgAudioManager.pause();
				}else{
					this.bgAudioManager.play();
				}
			},
			listenLyricIndex() {
				clearInterval(this.timer);
				this.timer = setInterval(() => {
					for(let i = 0; i < this.songLyric.length; i++) {
						if(this.bgAudioManager.currentTime > this.songLyric[this.songLyric.length - 1 ].time) {
							this.lyricIndex = this.songLyric.length - 1;
							break;
						}
						if(this.bgAudioManager.currentTime > this.songLyric[i].time && this.bgAudioManager.currentTime < this.songLyric[i+1].time) {
							this.lyricIndex = i;
						}
					}
					console.log(this.lyricIndex)
				},500);
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
					animation: 10s linear playMove infinite;
					animation-play-state: paused;
				}
				.detail-play-run{
					animation-play-state: running;
				}
				@keyframes playMove
				{
					from {transform: rotate(0);}
					to {transform: rotate(360deg);}
				}
				text{
					width: 100rpx;
					height: 100rpx;
					font-size: 100rpx;
					color: #555555;
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
				}
				.needlePause{
					transform: rotate(-20deg);
					animation: needleRotatePause 1s linear;
				}
				.needlePlay{
					transform: rotate(0);
					animation: needleRotatePlay 1s linear;
				}
				@keyframes needleRotatePlay
				{
				  from {transform: rotate(-20deg);}
				  to {transform: rotate(0);}
				}
				@keyframes needleRotatePause
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
					transition: .5s;
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
									color: #016fff;
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
