/**
 * Created on 2017/5/2.
 * 该文件主要用于请求数据的公用方法
 */

//包引入
import router from '../router';
import axios from 'axios';
import qs from 'qs';
import cache from 'utils/cache'


axios.defaults.timeout = 30000;
process.env.NODE_ENV == 'production' && (axios.defaults.baseURL = '/');
// process.env.NODE_ENV == 'production' && (axios.defaults.baseURL = 'http://192.168.1.36:8080');
// process.env.NODE_ENV == 'production' && (axios.defaults.baseURL = 'https://www.easyhrp.com');
axios.interceptors.response.use(
    response => {
        if(response.data.code === 80007 || response.data.code === 80006 || response.data.code === 80009) {
          router.push('/login')
        }
        return response
    },
    error => {
        console.log(error)
        return Promise.reject(error.response.data)
    }
)

/**
 *  目前有用到的就这两中方法 post get 
 *  如果后面有需求可以继续封装方法api
 *  具体api 可查询下面地址
 *  https://github.com/mzabriskie/axios
 *  
 */


var http = {
	post: function(setting){
		return  axios({
		            method: 'post',
		            url: setting.url,
		            data: qs.stringify(setting.data || {}),
		            headers: {
		            	'X-Requested-With': 'XMLHttpRequest',
		                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
		                'adminToken' : cache.readToken('adminToken') || ''
		            }
		        })
				.then(function(res){
					typeof setting.success == 'function' && setting.success(res)
				})
				.catch(function(res){
					typeof setting.error == 'function' && setting.error(res)
				})
		
	},
    upload: function(setting){
        return  axios({
                    method: 'post',
                    url: setting.url,
                    data: setting.data || {},
                    headers: {
                        'X-Requested-With': 'XMLHttpRequest',
                        'Content-Type': 'multipart/form-data',
                        'adminToken' : cache.readToken('adminToken') || ''
                    }
                })
                .then(function(res){
                    typeof setting.success == 'function' && setting.success(res)
                })
                .catch(function(res){
                    typeof setting.error == 'function' && setting.error(res)
                })
        
    },
	//TODO 目前 post 和 get 就method不一样,但是还是把他们抽成两个方法 
	//后面会根据项目具体情况再次封装
	get: function(setting) {
		return  axios({
		            method: 'get',
		            url: setting.url,
		            params: setting.data || {},
		            headers: {
		                'X-Requested-With': 'XMLHttpRequest',
		                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
		                'adminToken' : cache.readToken('adminToken') || ''
		            }
		        })
				.then(function(res){
					typeof setting.success == 'function' && setting.success(res)
				})
				.catch(function(res){
					typeof setting.error == 'function' && setting.error(res)
				})
	},
	getPage: function(setting) {
		return  axios({
		            method: 'get',
		            url: setting.url,
		            params: setting.data || {},
		            headers: {
		                'X-Requested-With': 'XMLHttpRequest',
		                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
		                'adminToken' : cache.readToken('adminToken') || ''
		            }
		        })
				.then(function(res){
          if(res.data.code !== 0) {
            sessionStorage.setItem('httpErrorMsg', res.data.desc);
            router.push('/errorMsg');
          } else {
            typeof setting.success == 'function' && setting.success(res)
          }
				})
				.catch(function(res){
          console.log('444444444444444')
					typeof setting.error == 'function' && setting.error(res)
				})
	},
};
const lang = {
  list: (obj, props) => {
    const textBox = props.map(item => {
      return obj[item] || '';
    });
    const query = textBox.join('\n');
    const toLang = localStorage.getItem('locale');
    return axios({
      method: 'post',
      url: 'guard-webManager/select/transApi.jhtml',
      data: qs.stringify({
        query: query,
        to: toLang
      }),
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'adminToken' : cache.readToken('adminToken') || ''
      }
    })
    .then((res) => {
      const data = JSON.parse(res.data.content) || {};
      const list = data.trans_result || [];
      console.log('翻译成功')
      return list;
    })
    .catch((res) => {
      console.log(res)
      return Promise.reject(res);
    })
  },
  word: (query, callback) => {
    const toLang = localStorage.getItem('locale');
    axios({
      method: 'post',
      url: 'guard-webManager/select/transApi.jhtml',
      data: qs.stringify({
        query: query,
        to: toLang
      }),
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'adminToken' : cache.readToken('adminToken') || ''
      }
    })
    .then((res) => {
      const data = JSON.parse(res.data.content) || {};
      const list = data.trans_result || [];
      callback(list);
    })
    .catch((res) => {
      console.log(res)
    })
  }
};
const requestList = async (data, props) => {
  // 并发请求
  let arr = [];
  const textPromises = data.map(async (item, index) => {
    let obj = {
      ...item
    };
    const response = await lang.list(obj, props);
    props.map(p => {
      if(obj[p]) {
        obj[p] = response.find(w => w.src === obj[p])
          ? response.find(w => w.src === obj[p]).dst
          : obj[p];
      }
    });
    return obj;
  });
  // 按次序输出
  for (const textPromise of textPromises) {
    console.log(await textPromise);
    arr.push(await textPromise)
  }
  return arr;
};
// "Content-Type": "application/json"
// "Content-Type": "application/x-www-form-urlencoded" // 适用于大部分情况
// "Content-Type": "multipart/form-data" // 适用于文件上传
// var params = new URLSearchParams();
// params.append('title', 'titlecontent');
// axios.post("url", params).then( (response) => {
//     console.log(response.data)
// })
// exports.install = function (Vue, options) { 
//     Vue.prototype.$http = http
// }
export default {
    install: function (Vue, options) { 
        Vue.prototype.$http = http;
        Vue.prototype.getLang = lang;
        Vue.prototype.requestList = requestList;
    }
};