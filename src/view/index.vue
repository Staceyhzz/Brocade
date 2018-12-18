<template>
    <div class="layout-box" ref="layoutBox">
  		<div :class="['layout-main', menuType ? '' : 'layout-main-hidden']" >
        <div class="banner-mes-alret" v-if='alertStatus'>
          <Alert banner closable type="error" v-if='alertKey' @on-close='closeAlert'>{{message}}</Alert>
          <Alert banner type="error" v-else>{{message}}</Alert>
        </div>
        <transition name="call-slide-fade">
          <cmptCallPhoneScreen v-show='callKey' :_callInfo='callInfo' @closeCall='close'></cmptCallPhoneScreen>
        </transition>
        <cmptBreadcrumb :title="backGoPath"></cmptBreadcrumb> 
        <keep-alive :include="includes">
            <router-view v-if="$route.meta.keepAlive" v-show='powerLoad === 1'></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive" v-show='powerLoad === 1'></router-view>
        <div class="layout-error-loading" v-if='powerLoad === -1'>
          <Spin fix>
            <Icon type="load-c" size=40 class="demo-spin-icon-load"></Icon>
            <div>Loading</div>
          </Spin>
        </div>
      </div>
      <cmptMeun @on-change-type='menuOnChange' :menuType='menuType'></cmptMeun>
  	</div>
</template>
<script>
  import io from 'socket.io-client'
	import cmptBreadcrumb from 'components/breadcrumb.vue'
	import cmptMeun from 'components/menu.vue'
  import cmptCallPhoneScreen from 'components/callPhoneScreen.vue'
    export default {
        data() {
            return {
              callKey: false,
              callInfo: '',
              backGoPath: '',
              alertStatus: false,
              alertKey: true,
              message: '',
              socket: null,


              menuType: true,
            }
        },
        computed: {
          powerLoad () {
            return this.$store.getters.getPageLoading;
          },
          includes () {
            return this.$store.getters.getKeepAliveView;
          },
        },
        beforeRouteUpdate (to, from, next) {
          console.log(from.path + '============')
          this.backGoPath = to.path
          if(to.meta.title === 'cus') {
            document.title = sessionStorage.getItem('cusName');
          } else {
            document.title = '锦医卫HRP';
          }
          if(to.path !== '/error404') {
            this.$store.dispatch('setPowerLoading', {
              pageLoading: -1,
              powerErrorMsg: '',
            });
          } else {
            this.$store.dispatch('setPageLoading', 1);
          }
          next();
        },
        beforeRouteEnter(to, from, next) {
          console.log(from.path + '============')
            next(vm => {
              vm.backGoPath = to.path;
            });
        },
        beforeRouteLeave(to, from, next) {
          if(to.path === '/login') {
            if(localStorage.getItem('isCallLink') === '1') {
              if(this.socket) {
                this.socket.disconnect()
                sessionStorage.setItem('callStatus', '')
              }
            }
          }
          next()
        },
        components: {
            cmptBreadcrumb,
            cmptMeun,
            cmptCallPhoneScreen
        },
        created () {
          const lang = localStorage.getItem('locale');
          this.$i18n.locale = lang;
          const alertMsg = JSON.parse(localStorage.getItem('alertMsg'))
          const alertWeek = JSON.parse(localStorage.getItem('alertStatus'))
          this.message = alertMsg
          console.log(alertWeek)
          if(alertWeek) {
            this.alertKey = false
          }
          if(alertMsg) {
            this.alertStatus = true
          }
          if(localStorage.getItem('isCallLink') === '1') {
            this.setWebSocket()
          }
          this.$store.dispatch('setLangContentKeyFirst');
        },
        mounted () {
          if(localStorage.getItem('isCallLink') === '1') {
            console.log(sessionStorage.getItem('callStatus'))
            const _callStatus = sessionStorage.getItem('callStatus')
            let _callInfo = JSON.parse(sessionStorage.getItem('callInfo'))
            if(_callStatus) {
              _callInfo.time = moment().format()
              console.log(_callInfo)
              this.callKey = true
              this.callInfo = JSON.stringify(_callInfo)
              console.log(this.callInfo)
            }
          }
        },
        methods: {
          closeAlert () {
            localStorage.setItem('alertMsg', JSON.stringify(null));
          },
          setWebSocket () {
            const companyId = localStorage.getItem('companyId')
            const hospId = localStorage.getItem('hospId')
            const userId = localStorage.getItem('userId')
            const url = localStorage.getItem('callUrl')
            const link = url + '?clientId=' + companyId + '_' + hospId + '_' + userId
            this.socket = io.connect(link)
            this.socket.on('connect', () => {
              console.log('connectStart')
            })
            this.socket.on('advert_info', (data) => {
                this.callKey = true
                sessionStorage.setItem('callInfo', data)
                sessionStorage.setItem('callStatus', '1')
                let _data = JSON.parse(data)
                _data.time = moment().format()
                this.callInfo = JSON.stringify(_data)
            })
            this.socket.on('disconnect', () =>{
              console.log('connectEnd')
            })
          },
          close () {
            sessionStorage.setItem('callStatus', '')
            this.callKey = false
          },
          menuOnChange () {
            this.menuType = !this.menuType;
            this.$nextTick(() => {
              this.$store.dispatch('setViewResize');
            });
          },
        }
    }

</script>

<style scoped>
  .call-slide-fade-enter-active {
    transition: all .6s ease;
  }
  .call-slide-fade-leave-active {
    transition: all .6s ease;
  }
  .call-slide-fade-enter, .call-slide-fade-leave-to {
    transform: translateX(150px);
    opacity: 0;
  }
</style>