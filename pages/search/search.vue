<template>
	<view class="search">
		<musichead title="搜索" :icon="true"></musichead>
		<view class="search-bar">
			<text class="iconfont icon-fangdajing" @click="handleSearch"></text>
			<input type="text" placeholder="搜索歌曲" v-model="searchKeyWords" @confirm="handleSearch" @input="handleInput"/>
			<text class="iconfont icon-guanbi" style="float: right;" @click="handleReSet"></text>
		</view>
		<view class="search-history">
			<view class="search-history-head">
				<text class="history-title">历史搜索</text>
				<text class="iconfont icon-lajitong" @click="handleClear"/>
			</view>
			<view class="search-history-main">
				<text v-for="(i,key) in searchHistory" :key="key">{{i}}</text>
			</view>
		</view>
		<view class="search-result">
			<scroll-view scroll-y="true">
				<view v-for="(item,index) in searchRes" :key="index">
					<view class="search-result-item">{{item.name}}-{{item.artists[0].name}}</view>
				</view>
			</scroll-view>							
		</view>
		<view class="search-hot">
			<view class="search-hot-head">热搜榜</view>
			<view class="search-hot-list">
				<view class="search-hot-list-item">
					<view class="search-hot-top">1</view>
					<view class="search-hot-word">
						少年 <image src="../../static/dujia.png" mode="aspectFit"></image>
					</view>
					<view class="">少年这个词实在是太美好了</view>
				</view>			
			</view>
		</view>
	</view>
</template>

<script>
	import '@/common/iconfont.css'
	import musichead from '@/components/music-head'
	import {search} from '@/common/api.js'
	export default {
		components:{
			musichead:musichead
		},
		data() {
			return {
				searchKeyWords: '',
				searchHistory: [],
				searchRes: []
			};
		},
		methods:{
			handleInput() {
				console.log(this.searchKeyWords)
			},
			handleSearch() {
				let searchKeyWords = this.searchKeyWords
				this.searchKeyWords = ''
				this.searchHistory.push(searchKeyWords)
				search(searchKeyWords).then(res => {
					console.log(res)
					this.searchRes = res.songs
				})
			},
			handleReSet() {
				this.searchKeyWords = ''
			},
			handleClear() {
				this.searchHistory = []
			}
		}
	}
</script>

<style lang="less">
.search{
	.search-bar{
		border-radius: 50px;
		background-color: rgba(231, 231, 231, 0.8);
		height: 70rpx;
		margin: 20rpx 30rpx 30rpx 30rpx;
		display: flex;
		align-items: center;
		.iconfont{
			line-height: 70rpx;
			margin: 0 26rpx;
		}
		input{
			flex: 1;
		}
	}
	.search-history{
		font-size: 26rpx;
		margin: 20rpx 30rpx 30rpx 30rpx;
		.search-history-head{
			display: flex;
			justify-content: space-between;
			margin-bottom: 20rpx;
			.history-title{
				flex: 1;
				font-weight: 600;
				color: #4a4a37;
			}
		}		
		.search-history-main{
			display: flex;
			flex-wrap: wrap;
			text{
				border-radius: 40rpx;
				background-color: #f7f7f7;
				padding: 16rpx 28rpx;
				margin-right: 20rpx;
				margin-bottom: 20rpx;
			}
		}
	}
	.search-result{
		margin: 20rpx 30rpx 30rpx 30rpx;
		background-color: #f7f7f7;
		.search-result-item{
			margin: 20rpx 20rpx;
			font-weight: 600;
		}
	}
	.search-hot{
		margin: 0 30rpx;
		font-size: 26rpx;
		.search-hot-head{
			margin-bottom: 58rpx;
		}
		.search-hot-list{
			
			.search-hot-list-item{
				display: flex;
				align-items: center;
				margin-bottom: 58rpx;
				.search-hot-top{
					color: #fb2222;
					width: 60rpx;
					margin-left: 8rpx;
					margin-bottom: 36rpx;
				}
				.search-hot-word{
					flex: 1;
					view:nth-child(0){
						font-size: 30rpx;
						color: black;
					}
					view:nth-child(1){
						font-size: 26rpx;
						color: #878787;
					}
					image{
						width: 48rpx;
						height: 22rpx;
					}
				}
			}
		}
	}
}
</style>
