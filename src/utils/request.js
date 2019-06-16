import {baseUrl,baseUrl2,baseUrl3,debug} from '@/config/env';
	
export default async(url = '', data = {}, type = 'GET', uri = 'node') => {
	uni.showLoading({
	    title: '加载中...'
	});
	if(uri=='php'){
		url = baseUrl2 + url 
	}else if(uri=='lumen'){
		url = baseUrl3 + url
	}else{
		url = baseUrl+ url
	}
	return new Promise((resolve, reject) => {
		var header = {
			Token:uni.getStorageSync('token')
		}
		var position = uni.getStorageSync('position')
		if (position){
			header.Lat = position.lat;
			header.Lng = position.lng;
		}
		if(debug==1){
			header.debug = 1;
		}
		uni.request({
			header: header,
			url: url, 
			data: data,
			method: type,
			success: (res) => {
				uni.hideLoading();
				if(uri=='php'){
					res.data.errno = res.data.Success-1;
					var $res = resolve(res.data)
					$res.data = $res.Data;
					return $res;
				}
				return resolve(res.data)
			},
			fail(res) {
				uni.hideLoading();
				return reject(JSON.stringify(res))
			}
		});
	})
}
