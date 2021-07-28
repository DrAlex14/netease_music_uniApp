<template>
	<view class="music-head">
		<view v-if="icon" class="music-head-icon">
			<text :style="{'color':color}" class="iconfont icon-zuojiantou" @tap="handleToBack()"></text>|
			<text :style="{'color':color}" class="iconfont icon-shouye1" @tap="handleToHome()"></text>
		</view>
		<text :style="{'color':color}">{{title}}</text>
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
			},
			color:{
				type:String,
				default:'black'
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
		text{
			color: #000000;
		}
	}
</style>
