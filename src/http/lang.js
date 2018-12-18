// import axios from 'axios';
// import qs from 'qs';
// import md5 from '../utils/md5.js';
// axios.defaults.timeout = 30000;
// let defaultUrl = '';
// if(process.env.NODE_ENV == 'production') {
//     defaultUrl = 'http://api.fanyi.baidu.com/';
// }

// const lang = {
//   list: (obj, props, callback) => {
//     const textBox = props.map(item => {
//       return obj[item];
//     });
//     const query = textBox.join('\n');
//     const salt = (new Date).getTime();
//     const toLang = localStorage.getItem('locale');
//     axios({
//       method: 'post',
//       url: defaultUrl + 'api/trans/vip/translate',
//       data: qs.stringify({
//         q: query,
//         appid: '20180120000117187',
//         salt: salt,
//         from: 'auto',
//         to: toLang,
//         sign: md5('20180120000117187' + query + salt + 'mCuIYHHJ2Cm92s9MaS6u')
//       }),
//       headers: {
//         'X-Requested-With': 'XMLHttpRequest',
//         'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
//       }
//     })
//     .then((res) => {
//       callback(res.data.trans_result);
//     })
//     .catch((res) => {
//       console.log(res)
//     })
//   },
//   word: (query, callback) => {
//     const salt = (new Date).getTime();
//     const toLang = localStorage.getItem('locale');
//     axios({
//       method: 'post',
//       url: defaultUrl + 'api/trans/vip/translate',
//       data: qs.stringify({
//         q: query,
//         appid: '20180120000117187',
//         salt: salt,
//         from: 'auto',
//         to: toLang,
//         sign: md5('20180120000117187' + query + salt + 'mCuIYHHJ2Cm92s9MaS6u')
//       }),
//       headers: {
//         'X-Requested-With': 'XMLHttpRequest',
//         'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
//       }
//     })
//     .then((res) => {
//       callback(res.data.trans_result);
//     })
//     .catch((res) => {
//       console.log(res)
//     })
//   }
// };
// const lang = (settings) => {
//   return $.ajax({
//       type: 'post',
//       url: 'api/trans/vip/translate',
//       async: false,
//       data: {
//         q: settings.data.query,
//         appid: '20180120000117187',
//         salt: settings.data.date,
//         from: 'auto',
//         to: settings.data.toLang,
//         sign: md5('20180120000117187' + settings.data.query + settings.data.date + 'mCuIYHHJ2Cm92s9MaS6u')
//       },
//       success: (res) => {typeof settings.success == 'function' && settings.success(res)},
//       error: (res) => {typeof settings.error == 'function' && settings.error(res)}

//   })
// };
// exports.install = (Vue, ops) => {
//   // Vue.prototype.getLang = lang;
// };