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