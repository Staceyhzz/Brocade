<template>
  <div class='login-wrap'>
    <div class='login-header'>
      <img :src="loginImg"/>
      <h1>锦医卫</h1>
    </div>
    <div class='message'>
      <div v-if='!imgKey'>
        <h2>Welcome back !</h2>
        <p>{{$t('login.msg')}}</p>
      </div>
      <img :src="picImg" v-else/>
    </div>
    <div class='login'>
      <h2>锦医卫</h2>
      <h3>{{$t('login.login')}}</h3>
      <form action="" ref='formLogin'>
        <div class="item">
          <label for="company" :class="[labelKey === 1 || companyCode.length > 0 ? 'label-active' : '']">{{$t('login.label1')}}</label>
          <input v-model.trim="companyCode" v-on:blur='labelDown(1)' :class="[companyErrorKey ? '' : 'error']" @keyup.enter='handleSubmit' @keyup.tab='labelUp(1)' id='company' v-on:focus='labelUp(1)'/>
          <em :class="[labelKey === 1 ? 'em-enter' : '']"></em>
          <strong v-if='!companyErrorKey'>{{$t('login.valid1')}}</strong>
        </div>
        <div class="item">
          <label for="name" :class="[labelKey === 2 || name.length > 0 ? 'label-active' : '']">{{$t('login.label2')}}</label>
          <input v-model.trim="name" v-on:blur='labelDown(2)' :class="[nameErrorKey ? '' : 'error']" @keyup.enter='handleSubmit' @keyup.tab='labelUp(2)' id='name' v-on:focus='labelUp(2)'/>
          <em :class="[labelKey === 2 ? 'em-enter' : '']"></em>
          <strong v-if='!nameErrorKey'>{{$t('login.valid2')}}</strong>
        </div>
        <div class="item">
          <label for="password" :class="[labelKey === 3 || password.length > 0 ? 'label-active' : '']">{{$t('login.label3')}}</label>
          <input id='password' v-model.trim="password" type="password" v-on:blur='labelDown(3)' :class="[passwordErrorKey ? '' : 'error']" @keyup.enter='handleSubmit' @keyup.tab='labelUp(3)' v-on:focus='labelUp(3)'/>
          <em :class="[labelKey === 3 ? 'em-enter' : '']"></em>
          <strong v-if='!passwordErrorKey'>{{$t('login.valid3')}}</strong>
        </div>
        <button type="button" v-on:click='handleSubmit'>{{$t('login.login')}}</button>
      </form>
    </div>
    <img :src="picImg" class="message2" v-if='imgKey'/>
  </div> 
</template>

<script>
  export default {
    data() {
      return {
        labelKey: '',
        companyErrorKey: true,
        nameErrorKey: true,
        passwordErrorKey: true,
        name: '',
        password: '',
        companyCode: '',

        imgKey: true,
        picImg: '',
        loginImg: require('assets/img/login.png'),

        loginKey: true,
      }
    },
    created () {
      //刷新路由
      console.log(localStorage.getItem('resetRouter'))
      const resetRouter = localStorage.getItem('resetRouter');
      if(resetRouter) {
        localStorage.setItem('resetRouter', '');
        location.reload();
      }
      let lang = navigator.language || navigator.userLanguage;
      lang = lang.substr(0, 2) === 'ko'
        ? 'kor'
        : lang.substr(0, 2);
      const locale = ['zh', 'en', 'kor'];
      const index = locale.findIndex(item => item === lang);
      if(index >= 0) {
        this.$i18n.locale = lang;
        console.log(lang + 'start')
        localStorage.setItem('locale', lang);
      } else {
        console.log(lang + 'error')
        localStorage.setItem('locale', 'zh');
      }
      this.getImg();
    },
    mounted () {    
      this.$token.delToken('adminToken');
      this.$token.delToken('xToken');
      console.log(this.$router);
    },
    methods: {
      labelUp(type) {
        this.labelKey = type;
      },
      labelDown(type) {
        this.labelKey = '';
        if(type === 1) {
          this.companyRule();
        } else if(type === 2) {
          this.nameRule();
        } else {
          this.passwordRule();
        }
      },
      companyRule() {
        this.companyErrorKey = this.companyCode.length
          ? true
          : false;
      },
      nameRule() {
        this.nameErrorKey = this.name.length
          ? true
          : false;
      },
      passwordRule() {
        this.passwordErrorKey = this.password.length
          ? true
          : false;
      },
      getImg() {
        let _vm = this;
        _vm.$http.get({
          url: 'guard-webManager/advertisingPage/getImage',
          success: function(res){
            if(res.data.code === 0) {
              const _obj = res.data.content[0] || {};
              if(_obj.fileKey && _obj.filePath) {
                _vm.imgKey = true;
                _vm.picImg = _obj.filePath + _obj.fileKey;
              } else {
                _vm.imgKey = false;
              }
            } else {
              _vm.imgKey = false;
            }
          },
          error: function(res){
            console.log(res);
            _vm.imgKey = false;
          }
        })
      },
      handleSubmit() {
        let _vm = this;
        _vm.nameRule();
        _vm.passwordRule();
        _vm.companyRule();
        if(_vm.companyErrorKey && _vm.nameErrorKey && _vm.passwordErrorKey) {
          if(_vm.loginKey) {
            _vm.loginKey = false
            _vm.$http.post({
              url: 'guard-webManager/login/companyLogin.jhtml',
              data: {
                account: _vm.name, 
                password: _vm.password, 
                companyCode: _vm.companyCode
              },
              success: function(res){
                if(res.data.code === 0) {
                  _vm.loginKey = true;
                  //token
                  _vm.$token.setToken('adminToken', res.data.content.access_token);

                  //导航
                  // window.localStorage.setItem('navLink', JSON.stringify(res.data.content.navLinks));
                  // 暂时兼容跳转
                  let navLink = res.data.content.navLinks;
                  const navLinkIndex = navLink.findIndex(item => item.id === 'hospital' && item.child.length);
                  if(navLinkIndex >= 0) {
                    const cusIndex =  navLink[navLinkIndex].child.findIndex(item => item.id === 'customerDirection');
                    if(cusIndex >= 0) {
                      navLink[navLinkIndex].child.splice(cusIndex, 0, {
                        child: [],
                        id: 'todayCusIndex',
                        imgClass: 'todayCusIndex.png',
                        module: 'hospital',
                        name: '今日顾客动态(内测版)',
                        url: '/customerDirection'
                      });
                      _vm.$token.setToken('xToken', res.data.content.access_token);
                    }
                  }
                  window.localStorage.setItem('navLink', JSON.stringify(res.data.content.navLinks));

                  //清除预约缓存
                  sessionStorage.setItem('appointmentHospId', '');

                  //客户档案tab
                  window.localStorage.setItem('cusMenu', JSON.stringify(res.data.content.cuMenu));

                  //客户档案导航
                  window.localStorage.setItem('cusNav', JSON.stringify(res.data.content.operationMenu));

                  //报表
                  window.localStorage.setItem('reportPower', JSON.stringify(res.data.content.reportList));

                  //加载路由
                  _vm.$store.dispatch('setAsyncRouter');

                  //用户资料
                  const userObj = res.data.content.user || {};
                  window.localStorage.setItem('userAccount', userObj.name);
                  window.localStorage.setItem('hospId', userObj.hospitalid);
                  window.localStorage.setItem('hospName', userObj.hospitalName);
                  window.localStorage.setItem('deptName', userObj.deptName);
                  window.localStorage.setItem('deptId', userObj.deptid);
                  window.localStorage.setItem('userId', userObj.id);

                  //登入拦截
                  window.sessionStorage.setItem('userAccount', userObj.name);

                  //导出权限
                  window.localStorage.setItem('exportKey', res.data.content.export);

                  //软件时效
                  window.localStorage.setItem('alertMsg', JSON.stringify(res.data.content.message));
                  window.localStorage.setItem('alertStatus', JSON.stringify(res.data.content.weekRest));

                  //公司编号
                  window.localStorage.setItem('companyId', res.data.content.companyCode);

                  //呼叫中心
                  window.sessionStorage.setItem('callStatus', '');
                  window.localStorage.setItem('isCallLink', res.data.content.socketConnect);
                  window.localStorage.setItem('callUrl', res.data.content.socketUrl);

                  //翻译
                  window.localStorage.setItem('langKey', '0');

                  //清除仓库
                  _vm.$store.dispatch('setCleanSelectStore');
                  _vm.$store.dispatch('setCleanModalStore');
                  _vm.$store.dispatch('setCleanRemoteFilterStore');

                  const breadData = [
                    {
                      url: '/desktop',
                      text: 'layoutNav.desk'
                    }
                  ];
                  _vm.$store.dispatch('setBreadData', breadData);
                  _vm.$router.push('/desktop');
                  localStorage.setItem('resetRouter', '1');
                } else {
                  _vm.$Notice.error({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: res.data.desc
                  });
                  _vm.loginKey = true;
                }
              },
              error: function(res){
                console.log(res);
                _vm.loginKey = true;
              }
            })
          }
        }
      },
    }
  }
</script>

<style lang='less' scoped>
  html, 
  body {
    width: 100%;
    height: 100%;
  }
  .login-wrap {
    position: relative;
    overflow: hidden;
    width: 1170px;
    height: 100%;
    min-height: 750px;
    margin: 0 auto;
  }
  .login-header {
    height: 150px;
    img {
      float: left;
      display: block;
      width: 47px;
      height: 50px;
      margin: 50px 35px 0 0;
    }
    h1 {
      float: left;
      font-size: 34px;
      line-height: 150px;
      color: rgba(0,0,0,0.87);
      letter-spacing: 0;
    }
  }
  .message {
    position: absolute;
    top: 50%;
    left: 190px;
    width: 500px;
    transform: translateY(-50%);
    animation: fadeInLeft 1s .2s ease both;
    h2 {
      margin-bottom: 35px;
      font-size: 45px;
      line-height: 63px;
      color: rgba(0,0,0,0.87);
      letter-spacing: 0;
    }
    p {
      font-size: 24px;
      line-height: 33px;
      color: rgba(0,0,0,0.54);
      letter-spacing: 0;
    }
    img {
      display: block;
      max-width: 500px;
      max-height: 500px;
    }
  }
  .login {
    position: absolute;
    right: 5px;
    top: 50%;
    width: 350px;
    height: 490px;
    padding: 35px 25px 0;
    transform: translateY(-50%);
    box-shadow: 0 0 2px 0 rgba(0,0,0,0.12), 0 2px 2px 0 rgba(0,0,0,0.24);
    border-radius: 2px;
    animation: fadeInRight 1s .2s ease both;
    h2 {
      margin-bottom: 35px;
      font-size: 34px;
      line-height: 48px;
      text-align: center;
      color: #5B8BEE;
      letter-spacing: 0;
    }
    h3 {
      font-size: 24px;
      font-weight: normal;
      line-height: 33px;
      text-align: center;
      color: rgba(0,0,0,0.87);
      letter-spacing: 0;
      margin-bottom: 25px;
    }
    div {
      position: relative;
      overflow: hidden;
      padding-top: 20px;
    }
    strong {
      position: absolute;
      right: 0;
      bottom: 7px;
      color: red;
    }
    label {
      position: absolute;
      left: 10px;
      top: 35px;
      font-size: 14px;
      color: rgba(0,0,0,0.38);
      letter-spacing: 0;
      transition: 0.2s ease-in-out;
    }
    .label-active {
      top: 10px;
    }
    em {
      position: absolute;
      left: -100%;
      bottom: 0;
      width: 100%;
      height: 2px;
      background-color: #5B8BEE;
      transition: 0.2s ease-in-out;
    }
    .em-enter {
      left: 0;
    }
    input {
      width: 100%;
      height: 40px;
      padding: 15px 10px 0;
      border: 0;
      border-bottom: 1px solid rgba(0,0,0,0.20);
      outline: none;
      font-size: 14px;
    }
    .error {
      border-bottom-color: red;
    }
    button {
      display: block;
      width: 100%;
      height: 40px;
      border: 0;
      margin: 40px 0 0px;
      font-size: 14px;
      line-height: 40px;
      letter-spacing: 0;
      text-align: center;
      color: #FFF;
      background: #5B8BEE;
      cursor: pointer;
      border-radius: 2px;
      outline: none;
    }
  }
  .message2 {
    position: absolute;
    left: 0;
    bottom: 30px;
    width: 100%;
    height: 160px;
    display: none;
  }
  @keyframes fadeInLeft{
    0% {
      opacity: 0;
      left: -2000px;
    }
    100% {
      opacity: 1;
      left: 190px;
    }
  }
  @keyframes fadeInLeft1{
    0% {
      opacity: 0;
      left: -2000px;
    }
    100% {
      opacity: 1;
      left: 5px;
    }
  }
  @keyframes fadeInRight {
    0% {
      opacity: 0;
      right: -2000px;
    }
    100% {
      opacity: 1;
      right: 5px;
    }
  }
  @media all and (max-width: 1169px) {
    .login-wrap {
      width: 880px;
    }
    .message {
      left: 5px;
      animation: fadeInLeft1 1s .2s ease both;
    }
  }
  @media all and (max-width: 879px) {
    .login-wrap {
      width: 360px;
    }
    .message {
      display: none;
    }
    .message2 {
      display: block;
    }
  }
</style>

