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
					<view class="">{{item.name}}-{{item.artists[0].name}}</view>
				</view>
			</scroll-view>							
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
		.search-history-head{
			display: flex;
			margin: 20rpx 30rpx 30rpx 30rpx;
			justify-content: space-around;
			.history-title{
				flex: 1;
				font-weight: 600;
				color: #4a4a37;
			}
		}		
	}
}
</style>
