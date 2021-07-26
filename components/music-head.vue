<template>
	<view class="music-head" style="background-color: #ff557f;">
		<view v-if="icon" class="music-head-icon">
			<text class="iconfont icon-zuojiantou" @tap="handleToBack()"></text>|
			<text class="iconfont icon-shouye1" @tap="handleToHome()"></text>
		</view>
		<text>{{title}}</text>
	</view>
</template>

<script>
	export default {
		props:{
			title:{
				type:String,
				default:'网易云音乐'
			},
			icon:{
				type:Boolean,
				default:true
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			handleToBack(){
				uni.navigateBack();
			},
			handleToHome(){
				uni.navigateTo({
					url: '/pages/index/index'
				});
			}
		}
	}
</script>

<style lang="less" scoped>
	.music-head{
		position: relative;
		height: 75px;
		width: 100%;
		font-size: 16px;
		line-height: 80px;
		text-align: center;
		.music-head-icon{
			position: absolute;
			top: 26px;
			left: 8px;
			width: 90px;
			height: 30px;
			line-height: 30px;
			background-color: rgba(0,0,0,0.4);
			color: white;
			border-radius: 15px;
			display: flex;
			justify-content: space-evenly;
		}
	}
</style>
