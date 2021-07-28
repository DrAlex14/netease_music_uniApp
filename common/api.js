import {baseUrl} from './config.js'

export function topList(){
	return new Promise((resolve,reject)=>{
		uni.request({
			method:'GET',
			url:`${baseUrl}/toplist/detail`,
			success: (res) => {
				let result = res.data.list
				result.length = 4
				resolve(result)
			}
		})
	})
}

export function playListDetail(idx){
	return new Promise((resolve,reject)=>{
		uni.request({
			method:'GET',
			url:`${baseUrl}/playlist/detail?id=`+idx,
			success: (res) => {
				resolve(res)
			}
		})
	})
}