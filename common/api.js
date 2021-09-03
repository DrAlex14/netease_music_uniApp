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

export function songDetail(songId){
	return	uni.request({
			method:'GET',
			url:`${baseUrl}/song/detail?ids=${songId}`,
		})
}

export function simiSong(songId){       //相似歌曲
	return	uni.request({
			method:'GET',
			url:`${baseUrl}/simi/song?id=${songId}`
		})
}

export function songLyric(songId){       //歌词
	return	uni.request({
			method:'GET',
			url:`${baseUrl}/lyric?id=${songId}`
		})
}

export function songComment(songId){       //评论
	return uni.request({
			method:'GET',
			url:`${baseUrl}/comment/music?id=${songId}`,
		})
}

export function songUrl(songId){       //歌曲
	return uni.request({
			method:'GET',
			url:`${baseUrl}/song/url?id=${songId}`,
		})
}

