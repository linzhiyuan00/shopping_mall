import axios from "axios";
import qs from 'qs'

const clearRequest = {
	source: axios.CancelToken.source(),
}

// 普通请求
const instance = axios.create({
	baseURL: 'https://usermanagement.71baomu.com/newsaasmanage/',
	// headers: {
	// 	"Access-Control-Allow-Origin" : "*",
	// 	// "X-Requested-With" : 'XMLHttpRequest',
	// 	// "Content-Type": "application/json;charset=utf-8",
	// 	// 'Content-Type':'application/x-www-form-urlencoded;charset=utf-8',
	// 	'Accept': '*/*',
	// },
// 	transformRequest: [function (data) {
// 		if(data&&data.is_json_data) {
// 				delete data.is_json_data;
				
// 				return JSON.stringify(data);
// 		}
// 		return qs.stringify(data);
// }],

	timeout: 30000, 
	withCredentials: true,//请求头带cookie
});

// form-data请求
const instance_formdata = axios.create({
	baseURL: 'https://usermanagement.71baomu.com/newsaasmanage/',
	headers: {
		"Content-Type": "multipart/form-data"
	
	},

	timeout: 30000, 
	withCredentials: true,//请求头带cookie
});
// 配置发送请求拦截器
instance.interceptors.request.use(config => {
	config.cancelToken = clearRequest.source.token;// 这句很重要
	if (config.method === 'post') {
		config.data = qs.stringify(config.data)
	}
	return config;
}, error => {
	return Promise.reject(error)
})
instance_formdata.interceptors.request.use(config => {
	config.cancelToken = clearRequest.source.token;// 这句很重要
	return config;
}, error => {
	return Promise.reject(error)
})


export {
	instance,
	instance_formdata,
	axios,
	clearRequest,
}
