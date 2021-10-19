<template>
	<view class="index">
		<musichead title="网易云音乐" :icon="false"></musichead>
		<view class="container">
			<scroll-view scroll-y="true">
				<view class="index-search" @click="handleSearch">
					<text class="iconfont icon-fangdajing"></text>
					<input type="text" placeholder="搜索歌曲"/>
				</view>
				<view class="index-list">
					<view class="index-list-item" v-for="item in topListData" :key="item.id" @tap="handleToList(item.id)">
						<view class="item-img">
							<image :src="item.coverImgUrl"></image>
							<text>{{item.updateFrequency}}</text>
						</view>
						<view class="item-right">
							<view v-for="(i,index) in item.tracks" :key="index">{{index+1}}.{{i.first}}——{{i.second}}</view>
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
	import {topList} from '../../common/api.js'
	export default {
		components:{
			musichead:musichead
		},
		data() {
			return {
				title: '网易云音乐',
				topListData:[]
			}
		},
		onLoad() {
			topList().then(res=>{
				this.topListData = res
			})
		},
		methods: {
			handleSearch(e){
				uni.navigateTo({
					url: "../search/search"
				})
			},
			handleToList(listId){
				debugger
				console.log(listId);
				uni.navigateTo({
					url:'/pages/list/list?listId='+listId
				})
			},
		}
	}
</script>

<style lang="less" scoped>
	.index{
		.container{
			.index-search{
				border-radius: 50px;
				background-color: rgba(231, 231, 231, 0.8);
				height: 70rpx;
				margin: 50rpx 30rpx 30rpx 30rpx;
				display: flex;
				align-items: center;
				.iconfont{
					line-height: 70rpx;
					margin-left: 28rpx;
				}
				input{
					margin-left: 25rpx;
				}
			}
			.index-list{
				margin: 0 30rpx;
				.index-list-item{
					display: flex;
					margin-bottom: 34rpx;
					.item-img{
						flex: 2;
						width: 212rpx;
						height: 212rpx;
						position: relative;
						margin-right: 22rpx;
						overflow: hidden;
						border-radius: 30rpx;
						image{
							width: 100%;
							height: 100%;
						}
						text{
							position: absolute;
							left: 12rpx;
							bottom: 12rpx;
							color: white;
							font-size: 20rpx;
						}
					}
					.item-right{
						flex: 3;
						view{
							width: 400rpx;
							line-height: 66rpx;
							font-size: 24rpx;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}
					}
				}
			}
		}
	}
</style>
