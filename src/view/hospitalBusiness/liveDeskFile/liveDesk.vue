/** 
 * 接诊工作台 
 */
<template>
  <div class="container-box liveDesk">
    <div class="container-header">
      <h2>{{$t('layoutNav.liveDesk')}}</h2>
    </div>
    <div :class="['container-body', livingKey ? 'no-bg' : '']">
      <!-- <transition name="bounce"> -->
      <div :class="['view', !changeViewKey ? 'viewBig' : '']" v-if='livingKey'>
        <Row :gutter="24" class='view-tit'>
          <Button type="primary" size="small" :icon="changeViewKey? 'arrow-left-c' : 'arrow-right-c'" class='view-btn' @click='changeView'></Button>
          <Button type="primary" icon="backspace-outline" size="small" @click="close" class='view-close'></Button>
          <Button type="primary" icon="pricetags" size="small" @click="blank" class='view-blank'></Button>
          <Col :lg="16">
            <Row type="flex" justify="space-between" class="view-mes">
              <Col span="8">
                <h3>{{formShow.customerName}}</h3>
              </Col>
              <Col span="6">
                <p>{{formShow.memberCategoryName}}</p>
                <p>{{formShow.gender}}
                  <span v-if='formShow.age'>{{formShow.age}}{{$t('liveDesk.label1')}}</span>
                </p>
                <p>{{formShow.phone}}</p>
              </Col>
              <Col span="9">
                <p>{{$t('liveDesk.label2')}}{{formShow.storeName}}</p>
                <p>{{$t('liveDesk.label3')}}{{formShow.channelName}}</p>
              </Col>
            </Row>
            <p style="paddingLeft:20px;">{{formShow.remark}}</p>
          </Col>
          <Col :lg="8">
            <Tag class='view-sym' color='blue' v-if='formShow.symptomName'>{{formShow.symptomName}}</Tag>
            <Tag class='view-sym' v-if='formShow.symptom2Name'>{{formShow.symptom2Name}}</Tag>
            <Tag class='view-sym' v-if='formShow.symptom3Name'>{{formShow.symptom3Name}}</Tag>
            <Tag class='view-sym' v-if='formShow.symptom4Name'>{{formShow.symptom4Name}}</Tag>
            <Tag class='view-sym' v-if='formShow.symptom5Name'>{{formShow.symptom5Name}}</Tag>
          </Col>
        </Row>
        <hr>
        <Menu mode="horizontal" :active-name="menuRouteUrl" @on-select='toMenu'>
          <Menu-item name="/liveDeskBasicInfo">{{$t('liveDesk.menu1')}}</Menu-item>
          <Menu-item name="/liveDeskConsult">{{$t('liveDesk.menu2')}}</Menu-item>
          <Menu-item name="/liveDeskFailture">{{$t('liveDesk.menu3')}}</Menu-item>
          <Menu-item name="/liveDeskOrderDetail">{{$t('liveDesk.menu4')}}</Menu-item>
          <Menu-item name="/liveDeskOperation">{{$t('liveDesk.menu5')}}</Menu-item>
          <Menu-item name="/liveDeskCallback">{{$t('liveDesk.menu6')}}</Menu-item>
          <Menu-item name="/liveDeskAccount">{{$t('liveDesk.menu7')}}</Menu-item>
        </Menu>
        <router-view></router-view>
      </div>
      <!-- </transition> -->
      <div :class="{'liveDesk-left': livingKey}">
        <Table stripe :columns="col" :data="data" v-show='!livingKey && goUpKey'></Table>
        <hr v-show='!livingKey'>
        <div class="go-up" v-show='!livingKey'>
          <Button type="primary" size="small" :icon="goUpKey ? 'arrow-up-c' : 'arrow-down-c'" @click='changeUpDown'></Button>
        </div>
        <div class="table-box">
          <table class="search-tit">
            <thead>
              <tr>
                <th>
                  <Poptip placement="bottom" class='filterClinic' :transfer='true' trigger='hover'>
                    <p :class="[filterTit === 'status' ? 'blue' : '']">{{$t('liveDesk.colTit11')}}</p>
                    <ul slot="content">
                      <li @click="filterStatus(0, 'status')">{{$t('liveDesk.colTit12')}}</li>
                      <li @click="filterStatus(1, 'status')">{{$t('liveDesk.colTit13')}}</li>
                      <li @click="filterStatus(2, 'status')">{{$t('liveDesk.colTit14')}}</li>
                    </ul>
                  </Poptip>
                </th>
                <th>
                  <Poptip placement="bottom" class='filterClinic' :transfer='true' trigger='hover'>
                    <p :class="[filterTit === 'clinicType' ? 'blue' : '']">{{$t('labelPublic.lx')}}</p>
                    <ul slot="content">
                      <li @click="filterStatus(1, 'clinicType')">{{$t('clinicTypeList1')}}</li>
                      <li @click="filterStatus(2, 'clinicType')">{{$t('clinicTypeList2')}}</li>
                      <li @click="filterStatus(3, 'clinicType')">{{$t('clinicTypeList3')}}</li>
                      <li @click="filterStatus(4, 'clinicType')">{{$t('clinicTypeList4')}}</li>
                    </ul>
                  </Poptip>
                </th>
                <th @click="filterPinyin('filterStoreKey', 'filterStore')" :class="[filterTit === 'filterStoreKey' ? 'blue' : '']">{{$t('liveDesk.colTit15')}}</th>
                <th @click="filterPinyin('filterNameKey', 'customerName')" :class="[filterTit === 'filterNameKey' ? 'blue' : '']">{{$t('labelPublic.xm')}}</th>
                <th @click="filterPinyin('filterGenderKey', 'gender')" :class="[filterTit === 'filterGenderKey' ? 'blue' : '']">{{$t('labelPublic.xb')}}</th>
                <th @click="filterNum('filterAgeKey', 'age')" :class="[filterTit === 'filterAgeKey' ? 'blue' : '']">{{$t('labelPublic.nl')}}</th>
                <th @click="filterPinyin('filterSymKey', 'symptomName')" :class="[filterTit === 'filterSymKey' ? 'blue' : '']">{{$t('liveDesk.colTit16')}}</th>
                <th @click="filterNum('filterMemKey', 'memberLevel')" :class="[filterTit === 'filterMemKey' ? 'blue' : '']">{{$t('labelPublic.hy')}}</th>
                <th @click="filterNum('filterTimeKey', 'time')" :class="[filterTit === 'filterTimeKey' ? 'blue' : '']">{{$t('liveDesk.colTit17')}}</th>
              </tr>
            </thead>
          </table>
        </div>
        <div class="user-box">
          <Row :gutter="6" type="flex" justify="center" align="top">
            <Col :xs="24" :md="!livingKey ? 12 : 24" :lg="!livingKey ? 8 : 24" v-for='(item, index) in userList' :key='index'>
              <div :class="['user-item', item.status === 1 ? 'doing' : '']" @click='living(item)'>
                <div class="user-tit bb">
                  <span :class="['tit-status', item.newOldType === 1 ? 'red' : 'blue']">{{item.newOldType === 1 ? $t('publicSet.newCus') : $t('publicSet.oldCus')}}</span>
                  <span class='tit-status'>—</span>
                  <span :class="['tit-status', item.clinicType == 1 ? 'blue' : item.clinicType === 3 ? 'red' : item.clinicType === 2 ? 'purple' : 'orange']">{{item.clinicType === 1 ? $t('clinicTypeList1') : item.clinicType === 3 ? $t('clinicTypeList3') : item.clinicType === 2 ? $t('clinicTypeList2') : $t('clinicTypeList4')}}</span>
                  <span class='tit-time' v-if='item.status === 1'>
                    <cmptLiveCountTime :_startTime='item.startTime' :_index='index'></cmptLiveCountTime>
                  </span>
                  <span class='tit-time' v-else>{{item.createTime}}</span>
                </div>
                <Poptip placement="top" width="250" trigger='hover'>
                  <div class="user-mes bb">
                    <h3>{{item.customerName}}</h3>
                    <div class="vip">
                      <p>{{item.memberCategoryName}}</p>
                      <p>{{item.gender}}
                        <span v-if='item.age'>{{item.age}}{{$t('liveDesk.label1')}}</span>
                      </p>
                    </div>
                    <div class="ways">
                      <p v-if='item.storeName'>{{$t('liveDesk.label2')}}{{item.storeName}}</p>
                      <p v-if='!item.storeName && item.channelName'>{{$t('liveDesk.label3')}}{{item.channelName}}</p>
                    </div>
                  </div>
                  <div slot="content">
                    <p>{{$t('liveDesk.label4')}}{{item.customerName}}</p>
                    <p>{{$t('liveDesk.label5')}}{{item.memberCategoryName}}</p>
                    <p v-if='item.storeName'>{{$t('liveDesk.label2')}}{{item.storeName}}</p>
                    <p v-if='!item.storeName && item.channelName'>{{$t('liveDesk.label3')}}{{item.channelName}}</p>
                  </div>
                </Poptip>
                <div class="symtom bb">
                  <Tag color='blue' v-if='item.symptomName'>{{item.symptomName}}</Tag>
                  <Tag v-if='item.symptom2Name'>{{item.symptom2Name}}</Tag>
                  <Tag v-if='item.symptom3Name'>{{item.symptom3Name}}</Tag>
                  <Tag v-if='item.symptom4Name'>{{item.symptom4Name}}</Tag>
                  <Tag v-if='item.symptom5Name'>{{item.symptom5Name}}</Tag>
                </div>
                <div class="user-btn-again" v-if='item.status === 2'>
                  <p>{{$t('liveDesk.btn1')}}</p>
                  <p @click='changeStatus(item.status, item.triageID)'>{{$t('liveDesk.btn2')}}</p>
                </div>
                <div class="user-btn" @click='changeStatus(item.status, item.triageID)' v-else>
                  <span v-if='item.status === 0' style='color:#3399ff'>{{$t('liveDesk.btn3')}}</span>
                  <span v-if='item.status === 1' style='color:red'>{{$t('liveDesk.btn4')}}</span>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import cmptLiveCountTime from 'components/liveCountTime.vue'
  export default {
    components: {
      cmptLiveCountTime
    },
    data() {
      return {
        menuRouteUrl: '/liveDeskBasicInfo',
        livingKey: true,
        goUpKey: true,
        dateBox: [moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')],
        col: [
          {
            renderHeader: (h, params) => {
              return h('DatePicker', {
                props: {
                  type: 'daterange',
                  value: this.dateBox,
                  options: this.options,
                  clearable: false,
                  transfer: true,
                },
                on: {
                  'on-change': (date) => {
                    console.log(date)
                    this.getTotal(date[0], date[1])
                  }
                },
              })
            },
            width: 200,
            key: 'name'
          },
          {
            title: this.$t('liveDesk.colTit1'),
            key: 'triage'
          },
          {
            title: this.$t('liveDesk.colTit2'),
            key: 'triageNum'
          },
          {
            title: this.$t('liveDesk.colTit3'),
            key: 'dealNum'
          },
          {
            title: this.$t('liveDesk.colTit4'),
            render: (h, params) => {
              let num = 0;
              if (params.row.triageNum) {
                num = params.row.dealNum / params.row.triageNum * 100 > 100 ?
                  100 :
                  params.row.dealNum / params.row.triageNum * 100;
              } else {
                if (params.row.dealNum) {
                  num = 100
                } else {
                  num = 0
                }
              }
              return h('span', num.toFixed(2) + '%')
            }
          },
          {
            title: this.$t('liveDesk.colTit5'),
            key: 'dealAmount'
          },
        ],
        options: {
          shortcuts: [
            {
              text: this.$t('liveDesk.colTit7'),
              value() {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24)
                return [start, start]
              }
            },
            {
              text: this.$t('liveDesk.colTit8'),
              value() {
                const end = new Date()
                const start = new Date()
                return [start, start]
              }
            },
            {
              text: this.$t('liveDesk.colTit9'),
              value() {
                const end = new Date(moment().endOf('isoWeek'))
                const start = new Date(moment().startOf('isoWeek'))
                return [start, end]
              }
            },
            {
              text: this.$t('liveDesk.colTit10'),
              value() {
                const end = new Date(moment().endOf('month'))
                const start = new Date(moment().startOf('month'))
                return [start, end]
              }
            },
          ]
        },
        data: [],
        // 筛选
        filterTit: '',
        filterStoreKey: true,
        filterNameKey: true,
        filterGenderKey: true,
        filterSymKey: true,
        filterAgeKey: true,
        filterMemKey: true,
        filterTimeKey: true,

        //右侧顶部信息
        changeViewKey: true,

        //刷新
        liveTime: null,
        props: ['gender', 'memberCategoryName', 'storeName', 'channelName', 'remark', 'symptomName', 'symptom2Name', 'symptom3Name', 'symptom4Name', 'symptom5Name'],
      }
    },
    computed: {
      formShow() {
        return this.$store.getters.getLiveDeskMsg
      },
      userList() {
        return this.$store.getters.getLiveDeskUserList
      },
      otherTabUrl() {
        return this.$store.getters.getOpenOtherTabUrl
      },
      langRouterKey () {
        return this.$store.getters.getLandRouterKey;
      }
    },
    watch: {
      langRouterKey (val) {
        if(val === 'liveDesk') {
          this.getList();
        }
      },
    },
    beforeRouteUpdate(to, from, next) {
      console.log(1111)
      this.menuRouteUrl = to.path
      if (to.path == '/liveDesk') {
        this.livingKey = false
        this.menuRouteUrl = '/liveDeskBasicInfo'
        let breadData = [{
            url: '/desktop',
            text: 'layoutNav.desk'
          },
          {
            url: '/liveDesk',
            text: 'layoutNav.liveDesk'
          },
        ]
        this.$store.dispatch('setBreadData', breadData)
        this.$store.dispatch('setPageLoading', 1)
        sessionStorage.setItem('liveId', '')
      }
      next()
    },
    beforeRouteEnter(to, from, next) {
      console.log(2222)
      next(vm => {
        if (to.path == '/liveDesk') {
          vm.livingKey = false
          vm.menuRouteUrl = '/liveDeskBasicInfo'
          let breadData = [{
              url: '/desktop',
              text: 'layoutNav.desk'
            },
            {
              url: '/liveDesk',
              text: 'layoutNav.liveDesk'
            },
          ]
          vm.$store.dispatch('setBreadData', breadData)
          sessionStorage.setItem('liveId', '')
        } else {
          vm.menuRouteUrl = to.path
          vm.livingKey = true
        }
      })
    },
    mounted() {
      this.getList()
      this.getTotal(moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD'))
      this.getUpdateList()
    },
    beforeDestroy() {
      console.log('===============')
      window.clearTimeout(this.liveTime);
    },
    methods: {
      getList() {
        let _vm = this
        _vm.$store.dispatch('setPageLoading', -1)
        _vm.$http.getPage({
          url: 'guard-webManager/liveDesk/list.jhtml',
          success: function (res) {
            let _data = res.data.content.map(item => {
              if (item.birthYear) {
                const _time = new Date()
                item.age = (_time.getFullYear() - item.birthYear).toFixed(0)
              } else {
                item.age = null
              }
              if (item.storeName) {
                item.filterStore = item.storeName
              } else {
                item.filterStore = item.channelName
              }
              item.time = new Date(item.createTime)
              return item
            })
            if(_vm.langRouterKey !== 'liveDesk') {
              _vm.$store.dispatch('setLiveDeskUserList', _data)
            } else {
              _vm.requestList(_data, _vm.props).then(res => _vm.$store.dispatch('setLiveDeskUserList', res));
            }
            _vm.$store.dispatch('setPageLoading', 1);
          },
          error: function (res) {
            console.log(res)
          }
        })
      },
      getUpdateList() {
        let _vm = this
        window.clearTimeout(_vm.liveTime);
        _vm.liveTime = setTimeout(() => {
          _vm.$http.get({
            url: 'guard-webManager/liveDesk/list.jhtml',
            success: function(res){
              if(res.data.code === 0 ){
                let _data = res.data.content.map(item => {
                  if(item.birthYear) {
                    const _time = new Date()
                    item.age = (_time.getFullYear() - item.birthYear).toFixed(0)
                  } else {
                    item.age = null
                  }
                  if(item.storeName) {
                    item.filterStore = item.storeName
                  } else {
                    item.filterStore = item.channelName
                  }
                  item.time = new Date(item.createTime)
                  return item
                })
                const routerList = ['liveDeskBasicInfo', 'liveDesk', 'liveDeskConsult', 'liveDeskFailture', 'liveDeskOrderDetail', 'liveDeskOperation', 'liveDeskCallback', 'liveDeskAccount'];
                const index = routerList.findIndex(item => item === _vm.langRouterKey);
                if(index < 0) {
                  _vm.$store.dispatch('setLiveDeskUserList', _data)
                } else {
                  _vm.requestList(_data, _vm.props).then(res => _vm.$store.dispatch('setLiveDeskUserList', res));
                }
                _vm.getUpdateList();
              }
            }
        })
        }, 10000)
      },
      getTotal(startTime, endTime) {
        let _vm = this
        _vm.$http.get({
          url: 'guard-webManager/liveDesk/getDeailStat.jhtml',
          data: {
            startTime: startTime,
            endTime: endTime
          },
          success: function (res) {
            if (res.data.code === 0) {
              console.log(res)
              _vm.data = [
                {
                  name: _vm.$t('clinicTypeList1'),
                  triageNum: res.data.content.triageNum1,
                  triage: res.data.content.customerNum1,
                  dealNum: res.data.content.dealNum1,
                  dealAmount: (res.data.content.dealAmount1).toFixed(2)
                },
                {
                  name: _vm.$t('clinicTypeList2'),
                  triage: res.data.content.customerNum2,
                  triageNum: res.data.content.triageNum2,
                  dealNum: res.data.content.dealNum2,
                  dealAmount: (res.data.content.dealAmount2).toFixed(2)
                },
                {
                  name: _vm.$t('clinicTypeList4'),
                  triage: res.data.content.customerNum3,
                  triageNum: res.data.content.triageNum3,
                  dealNum: res.data.content.dealNum3,
                  dealAmount: (res.data.content.dealAmount3).toFixed(2)
                },
                {
                  name: _vm.$t('liveDesk.colTit6'),
                  triage: parseInt(res.data.content.customerNum3 + res.data.content.customerNum2 + res.data.content
                    .customerNum1),
                  triageNum: parseInt(res.data.content.triageNum3 + res.data.content.triageNum2 + res.data.content
                    .triageNum1),
                  dealNum: parseInt(res.data.content.dealNum3 + res.data.content.dealNum2 + res.data.content.dealNum1),
                  dealAmount: (res.data.content.dealAmount3 + res.data.content.dealAmount2 + res.data.content.dealAmount1)
                    .toFixed(2)
                },
              ]

            }
          },
          error: function (res) {
            console.log(res)
          }
        })
      },
      living(item) {
        sessionStorage.setItem('liveName', item.customerName)
        sessionStorage.setItem('liveId', item.customerID)
        this.$store.dispatch('setLiveDeskMsg', item.customerID)
        this.livingKey = true
        let breadData = [{
            url: '/desktop',
            text: 'layoutNav.desk'
          },
          {
            url: '/liveDesk',
            text: 'layoutNav.liveDesk'
          },
          {
            url: '/liveDeskBasicInfo',
            text: item.customerName
          }
        ]
        this.$store.dispatch('setBreadData', breadData)
        this.$router.push({
          path: '/liveDeskBasicInfo',
          query: {
            id: item.customerID
          }
        })
      },
      changeStatus(type, triageID) {
        console.log(type)
        console.log(triageID)
        let _vm = this
        _vm.$http.post({
          url: 'guard-webManager/liveDesk/triage.jhtml',
          data: {
            type: type,
            id: triageID
          },
          success: function (res) {
            if (res.data.code === 0) {
              console.log(res)
              _vm.getList()
            }
          },
          error: function (res) {
            console.log(res)
          }
        })
      },
      close() {
        this.livingKey = false
        this.$router.push('/liveDesk')
      },
      blank() {
        sessionStorage.setItem("cusNameBlank", this.formShow.customerName)
        sessionStorage.setItem("cusIdBlank", this.formShow.customerID)
        window.open(this.otherTabUrl)
      },
      toMenu(url) {
        let breadData = [
          {
            url: '/desktop',
            text: 'layoutNav.desk'
          },
          {
            url: '/liveDesk',
            text: 'layoutNav.liveDesk'
          },
          {
            url: url,
            text: sessionStorage.getItem('liveName')
          }
        ]
        this.$store.dispatch('setBreadData', breadData)
        this.$router.push(url)
      },
      filterStatus(type, key) {
        this.$store.dispatch('setLiveFilterStatus', {
          type: type,
          key: key,
          data: this.userList
        })
        this.filterTit = key
      },
      filterPinyin(status, key) {
        this.$store.dispatch('setLiveFilterPinyin', {
          status: this[status],
          key: key,
          data: this.userList
        })
        this[status] = !this[status]
        this.filterTit = status
      },
      filterNum(status, key) {
        this.$store.dispatch('setLiveFilterNum', {
          status: this[status],
          key: key,
          data: this.userList
        })
        this[status] = !this[status]
        this.filterTit = status
      },
      changeView() {
        this.changeViewKey = !this.changeViewKey
      },
      changeUpDown() {
        this.goUpKey = !this.goUpKey
      },
    }
  }

</script>

<style scoped>
  hr {
    width: 100%;
    height: 1px;
    margin: 15px 0;
    border: none;
    background: rgba(65, 65, 65, 0.1);
  }

  .red {
    color: red;
  }

  .blue {
    color: #3399ff;
  }

  .orange {
    color: orange;
  }

  .purple {
    color: purple;
  }

  .no-bg {
    padding: 0;
  }

  .liveDesk .container-body {
    position: relative;
  }

  .liveDesk .view {
    position: absolute;
    left: 350px;
    right: -10px;
    top: 10px;
    margin-bottom: 20px;
    background-color: #fff;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
    z-index: 10;
  }

  .liveDesk .viewBig {
    left: 100px;
  }

  .liveDesk-left {
    position: absolute;
    overflow: hidden;
    left: 0px;
    top: 30px;
    width: 325px;
    padding: 10px;
    background-color: #fff;
  }

  .liveDesk .bb {
    border-bottom: 1px solid rgba(65, 65, 65, 0.3);
    padding: 0 20px;
  }
  .liveDesk .table-box {
    width: 100%;
    overflow: auto;
  }
  .liveDesk .search-tit {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 15px;
  }

  .liveDesk .search-tit tr {
    border-right: 1px solid rgba(65, 65, 65, 0.3);
    border-bottom: 1px solid rgba(65, 65, 65, 0.3);
  }

  .liveDesk .search-tit th {
    font-weight: normal;
    padding: 5px;
    border-top: 1px solid rgba(65, 65, 65, 0.3);
    border-left: 1px solid rgba(65, 65, 65, 0.3);
    cursor: pointer;
  }

  .liveDesk .user-item {
    position: relative;
    width: 300px;
    margin: 0 3px 25px;
    border: 1px solid #d7dde4;
    border-color: #e3e8ee;
    font-size: 14px;
    background: #fff;
    border-radius: 4px;
    cursor: pointer;
  }

  .liveDesk .user-item.doing,
  .liveDesk .user-item:hover {
    transition: all .2s ease-in-out;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  }

  .liveDesk .user-tit {
    overflow: hidden;
    font-size: 12px;
  }

  .liveDesk .tit-status {
    float: left;
    line-height: 30px;
  }

  .liveDesk .tit-time {
    float: right;
    line-height: 30px;
  }

  .liveDesk .user-mes {
    width: 298px;
    height: 60px;
  }

  .liveDesk .user-mes h3 {
    float: left;
    width: 80px;
    height: 60px;
    font-size: 16px;
    font-weight: normal;
    line-height: 60px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .liveDesk .user-mes .vip,
  .liveDesk .user-mes .ways {
    float: left;
    margin-left: 5px;
    font-size: 12px;
  }

  .liveDesk .user-mes .vip {
    overflow: hidden;
    width: 70px;
    height: 60px;
    line-height: 30px;
  }

  .liveDesk .user-mes .vip p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    height: 30px;
  }

  .liveDesk .user-mes .ways p {
    width: 90px;
    height: 60px;
    line-height: 60px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .liveDesk .symtom {
    padding: 3px 20px;
    font-size: 13px;
  }

  .liveDesk .user-btn-again,
  .liveDesk .user-btn {
    height: 40px;
    font-size: 14px;
    line-height: 40px;
    text-align: center;
  }

  .liveDesk .user-btn-again p {
    float: left;
    width: 50%;
  }

  .liveDesk .user-btn-again p:first-child {
    border-right: 1px solid rgba(65, 65, 65, 0.3);
  }

  .bounce-enter-active {
    animation: bounce-in .5s;
  }

  .bounce-leave-active {
    animation: bounce-in .5s reverse;
  }

  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(1);
    }
  }

  .view .view-tit {
    position: relative;
    padding: 33px 10px 0;
  }

  .view-tit .view-sym {
    margin: 0 8px 10px 0;
  }

  .view-tit .view-mes p {
    margin-bottom: 5px;
    font-size: 14px;
    line-height: 20px;
  }

  .view-tit .view-mes h3 {
    font-size: 18px;
    line-height: 30px;
    text-align: center;
  }

  .view-tit .view-btn {
    position: absolute;
    left: 1px;
    top: 10px;
  }

  .view-tit .view-close {
    position: absolute;
    right: 20px;
    top: 5px;
  }

  .view-tit .view-blank {
    position: absolute;
    right: 60px;
    top: 5px;
  }

  .liveDesk .go-up {
    text-align: right;
    margin-top: -26px;
  }

</style>

<style>
  .v-transfer-dom.ivu-poptip-popper {
    min-width: 0;
    cursor: pointer;
  }

</style>
