/**
 * Created on 2017/5/2.
 * 该文件主要用于请求数据的公用方法
 */

//包引入
import axios from 'axios';
import qs from 'qs'

axios.defaults.timeout = 5000;
//axios.defaults.baseURL = 'http://www.hellodoctors.cn';

/**
 *  目前有用到的就这两中方法 post get 
 *  如果后面有需求可以继续封装方法api
 *  具体api 可查询下面地址
 *  https://github.com/mzabriskie/axios
 */
var ajax = {
	post: function(setting){
		return  axios({
		            method: 'post',
		            url: setting.url,
		            data: qs.stringify(setting.data),
		            headers: {
		                'X-Requested-With': 'XMLHttpRequest',
		                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
		            }
		        })
				.then(function(res){
					typeof setting.sussess == 'function' && setting.sussess(res)
				})
				.then(function(res){
					typeof setting.error == 'function' && setting.error(res)
				})
		
	},
	//TODO 目前 post 和 get 就method不一样,但是还是把他们抽成两个方法 
	//后面会根据项目具体情况再次封装
	get: function(setting) {
		return  axios({
		            method: 'get',
		            url: setting.url,
		            data: qs.stringify(setting.data),
		            headers: {
		                'X-Requested-With': 'XMLHttpRequest',
		                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
		            }
		        })
				.then(function(res){
					typeof setting.sussess == 'function' && setting.sussess(res)
				})
				.then(function(res){
					typeof setting.error == 'function' && setting.error(res)
				})
	},
	j
}

export default ajax;