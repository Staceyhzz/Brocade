/**
* 手术预约
*/
<template>
	<div class="container-box" ref='wrapper'>
    <div class="container-header">
      <h2>{{$t('layoutNav.appointmentToday')}}</h2>
      <ul class="header-btn-group">
        <li class="float-left">
          <Select v-model="formSearch.hospitalId" style="width:200px" v-if='key' @on-change='changeHosp'>
            <Option v-for="item in hospList" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
        </li>
      </ul>
    </div>
    <div class="container-body treat">
      <Menu mode="horizontal" :active-name="menuRouteUrl" @on-select='toMenu' class='menuTabs'>
        <Menu-item name="/appointmentToday">{{$t('appointmentToday.menu1')}}</Menu-item>
        <Menu-item name="/appointmentConsult">{{$t('appointmentToday.menu2')}}</Menu-item>
        <Menu-item name="/appointmentTreat">{{$t('appointmentToday.menu3')}}</Menu-item>
        <Menu-item name="/appointmentSurgery">{{$t('appointmentToday.menu4')}}</Menu-item>
        <Menu-item name="/appointmentCancel">{{$t('appointmentToday.menu5')}}</Menu-item>
      </Menu>
      <ul class="filter-btn">
        <li :class="[opacityKey === 100 ? 'active' : '']" @click='changeOpacity(100)'>{{$t('appointmentToday.btn1')}} ({{countData.length}})</li>
        <li :class="[opacityKey === 1 ? 'active' : '']" @click='changeOpacity(1)'>{{$t('appointmentToday.btn2')}} ({{yesCount}})</li>
        <li :class="[opacityKey === 0 ? 'active' : '']" @click='changeOpacity(0)'>{{$t('appointmentToday.btn3')}} ({{waitCount}})</li>
      </ul>
      <div class="time">
        <Date-picker :transfer='true' type="date" placement="bottom-start" style="width: 200px" :value="formSearch.startTime" @on-change="dateChange" :clearable='false'></Date-picker>
        <Input v-show='fixSub'></Input>
        <ul>
          <li class="yes"><span></span>{{$t('appointmentToday.btn2')}}</li>
          <li class="wait"><span></span>{{$t('appointmentToday.btn3')}}</li>
          <li>{{$t('appointmentToday.btn4')}}：{{count}}%</li>
        </ul>
      </div>
      <Table :columns="col" :data="data" border ref='treat' :width="bodyWidth" :height='bodyHeight' class='table' :disabled-hover='true'></Table>
    </div>
  </div>
</template>

<script>
  import cmptAppointmentHover from 'components/appointmentHover.vue'
  export default {
    components: {cmptAppointmentHover},
    data () {
      return {
        fixSub: false,
        key: true,
        timer: true,
        bodyWidth: 0,
        bodyHeight: null,
        opacityKey: 100,
        menuRouteUrl: '/appointmentSurgery',
        formSearch: {
          startTime: moment().format('YYYY-MM-DD'),
          hospitalId: ''
        },
        hospList: [],
        col: [
          {
            title: this.$t('appointmentToday.colTit1'),
            width: 80,
            fixed: 'left',
            key: 'time',
            render: (h, params) => {
              return h('div', {
                style: {
                  height: params.row.realHeight + 'px',
                  lineHeight: params.row.realHeight + 'px'
                }
              }, params.row.time)
            }
          }
        ],
        data: [],
        countData: [],
        docList: [],
        timeBox: [],
      }
    },
    watch: {
      viewResize (val) {
        this.init()
        console.log(val)
      },
      langRouterKey (val) {
        if(val === 'appointmentSurgery') {
          this.getList();
        }
      },
    },
    computed: {
      viewResize () {
        return this.$store.getters.getViewResize;
      },
      yesCount () {
        const _data = this.countData.filter(item => item.status === 1)
        return _data.length
      },
      waitCount () {
        const _data = this.countData.filter(item => item.status === 0)
        return _data.length
      },
      count () {
        if(this.countData.length) {
          return (this.yesCount / this.countData.length * 100).toFixed(2)
        } else {
          return 0
        }
      },
      langRouterKey () {
        return this.$store.getters.getLandRouterKey;
      },
    },
    created () {
      this.key = this.getHeadquarters();
      if(this.$route.query.date) {
        this.formSearch.startTime = this.$route.query.date
      }
      if(sessionStorage.getItem('appointmentHospId')) {
        this.formSearch.hospitalId = sessionStorage.getItem('appointmentHospId') * 1;
      } else {
        this.formSearch.hospitalId = localStorage.getItem('hospId') * 1;
        sessionStorage.setItem('appointmentHospId', this.formSearch.hospitalId);
      }
      this.getList()
    },
    mounted () {
      let _vm = this
      window.addEventListener('resize', _vm.init)
    },
    beforeDestroy () {
      let _vm = this
      window.removeEventListener('resize', _vm.init)
    },
    methods: {
      changeHosp (val) {
        console.log(val)
        sessionStorage.setItem('appointmentHospId', val);
        this.getList()
      },
      toMenu (url) {
        let breadData = [
          {
            url: '/desktop',
            text: 'layoutNav.desk'
          },
          {
            url: url,
            text: 'layoutNav.appointmentToday'
          }
        ]
        this.$store.dispatch('setBreadData', breadData)
        this.$router.push(url)
      },
      changeOpacity (val) {
        this.opacityKey = val
      },
      getList () {
        let _vm = this
        _vm.timeBox.splice(0)
        _vm.$store.dispatch('setPageLoading', -1)
        _vm.$http.getPage({
          url: 'guard-webManager/appointmentDesk/surgeryIndex.jhtml',
          data: _vm.formSearch,
          success: function(res){
            _vm.hospList = res.data.content.hospital || []
            _vm.countData = res.data.content.surgeryList.map(item => {
              item.status = item.status === 0 ? 0 : 1
              return item
            }) || []
            const _docList = res.data.content.userList || []
            const _docStatusList = res.data.content.shiftList || []
            let start = moment().format('YYYY-MM-DD') + ' ' + res.data.content.surgeryStart.split(' ')[1]
            const end = moment().format('YYYY-MM-DD') + ' ' + res.data.content.surgeryEnd.split(' ')[1]
            const interval = res.data.content.surgeryInterval
            _vm.timeBox.push(moment(start).format('HH:mm'))
            for(let j = 1; moment(start).isBefore(end); j++) {
              _vm.timeBox.push(moment(start).add(interval, 'minute').format('HH:mm'))
              start = moment(start).add(interval, 'minute')
            }
            const _data = res.data.content.surgeryList.map(item => {
              item.status = item.status === 0 ? 0 : 1
              item.chargeText = item.detailList.map(charge => charge.chargeName).join(',') || '';
              return item
            }) || []
            if(_vm.langRouterKey !== 'appointmentSurgery') {
              _vm.docList = _docList.map(item => {
                const _index = _docStatusList.findIndex(user => user.userid === item.id)
                if(_index >= 0) {
                  item.workName = _docStatusList[_index].categoryName
                  item.workType = _docStatusList[_index].categoryType
                } else {
                  item.workName = ''
                  item.workType = ''
                }
                return item
              })
              _vm.setColumns()
              _vm.setData(_data, interval)
              _vm.init();
            } else {
              _vm.requestList(_docStatusList, ['categoryName']).then(res => {
                _vm.docList = _docList.map(item => {
                  const _index = res.findIndex(user => user.userid === item.id)
                  if(_index >= 0) {
                    item.workName = res[_index].categoryName
                    item.workType = res[_index].categoryType
                  } else {
                    item.workName = ''
                    item.workType = ''
                  }
                  return item
                })
                _vm.setColumns()
                _vm.init();
              });
              _vm.requestList(_data, ['remark', 'chargeText']).then(res => {
                _vm.setData(res, interval)
              });
            }
            _vm.$store.dispatch('setPageLoading', 1);
          },
          error: function(res){
            console.log(res)
          }
        })
      },
      dateChange (date) {
        this.formSearch.startTime = date
        this.getList()
      },
      init () {
        let _vm = this
        if(_vm.timer) {
          _vm.timer = false
          setTimeout(() => {
            _vm.$nextTick(() => {
              console.log(_vm.$refs.treat)
              console.log(document.documentElement.clientHeight + '------------')
              _vm.bodyWidth = _vm.$refs.wrapper.offsetWidth - 40
              if(_vm.$refs.treat.$el.clientHeight + 50 > document.documentElement.clientHeight - 330) {
                _vm.bodyHeight = document.documentElement.clientHeight - 330
              } else {
                _vm.bodyHeight = null
              }
              console.log(_vm.columns)
              _vm.col.map(item => {
                if(item.key == 'treatList') {
                  if((_vm.bodyWidth - 100) / _vm.docList.length > 120) {
                    item.width = (_vm.bodyWidth - 100) / _vm.docList.length
                  }
                }
              })
            })
            _vm.timer = true
          }, 400)
        }
      },
      setColumns () {
        this.col.splice(1)
        this.docList.map(item => {
          let _col = {
            width: 110,
            key: 'treatList',
            className: item.workType === 0 ? 'table-row-un-work' : '',
            renderHeader: (h, params) =>{
              return h('ul', {
                class: 'tableTit',
                on: {
                  click: () => {
                    this.toUser(item.id, item.name, this.formSearch.startTime)
                  }
                },
              }, [
              h('li', item.name),
              h('li', this.$t('appointmentToday.colTit2') + item.workName)
              ]
              )
            },
            render: (h, params) => {
              if(item.workType === 0) {} else {
                if(params.row.dataKey) {
                  let _dataList = params.row.dataList.filter(cus => cus.userid === item.id)
                  return h('div', {
                    class: 'table-box',
                    style: {
                      height: params.row.realHeight + 'px'
                    },
                    on: {
                      dblclick: () => {
                        const _time = params.row.time.split('-')
                        this.toAdd(item.id, this.formSearch.startTime, _time[0], _time[1], '1')
                      }
                    }
                  }, _dataList.map(_data => {
                    return h('div', [
                      h('div', {
                        class: 'table-cus',
                        style: {
                          height: _data.height,
                          top: _data.top,
                          background: _data.openKey === true ? _data.borderColor : _data.color,
                          borderColor: _data.borderColor,
                          opacity: this.opacityKey === 100 ? '1' : this.opacityKey === _data.status ? '1' : '0.25'
                        },
                        on: {
                          click: (e) => {
                            e.stopPropagation()
                            _data.openKey = !_data.openKey
                          },
                          dblclick: (e) => {
                            e.stopPropagation()
                          }
                        }
                      }, [
                      h('div', {
                        class: 'table-cus-box',
                        style: {
                          color: _data.openKey === true ? '#fff' : _data.borderColor 
                        }
                      }, [
                        // h('p', _data.appointmentStartTime),
                        h('p', [
                          h('icon', {
                            props: {
                              type: 'person'
                            },
                            style: {
                              marginRight: '3px'
                            }
                          }),
                          h('span', _data.customerName)
                        ]),
                        h('p', [
                          h('icon', {
                            props: {
                              type: 'ios-pricetags'
                            },
                            style: {
                              marginRight: '3px'
                            }
                          }),
                          h('span', _data.chargeText)
                        ]),
                      ])
                      ]),
                      h(cmptAppointmentHover, {
                        props: {
                          data: _data,
                          openKey: _data.openKey,
                          type: 'surgery',
                          way: '1',
                          topStyle: _data.top
                        },
                        on: {
                          'closeHover': () => {
                            _data.openKey = !_data.openKey
                          }
                        }
                      })
                    ])
                  }))
                } else {
                  return h('div', {
                    class: 'table-box',
                    style: {
                      height: params.row.realHeight + 'px'
                    },
                    on: {
                      dblclick: () => {
                        const _time = params.row.time.split('-')
                        this.toAdd(item.id, this.formSearch.startTime, _time[0], _time[1], '1')
                      }
                    }
                  })
                }
              }
            }
          }
          this.col.push(_col)
        })
      },
      setData (data, interval) {
        this.data.splice(0)
        this.timeBox.map((item, index) => {
          if(index < this.timeBox.length - 1) {
            const _start = moment().format('YYYY-MM-DD') + ' ' + item + ':00'
            const _end = moment().format('YYYY-MM-DD') + ' ' + this.timeBox[index + 1] + ':00'
            const _surgeryList = data.filter(cus => {
              const _now = moment().format('YYYY-MM-DD') + ' ' + cus.appointmenttimestart.split(' ')[1]
              if((moment(_now).isAfter(_start) && moment(_end).isAfter(_now)) || moment(_now).isSame(_start)) {
                return cus
              }
            })
            let _obj = {
              time: item + '-' + this.timeBox[index + 1],
              dataKey: false,
              realHeight: (interval * 1) < 30 ? 60 : interval * 2,
              dataList: []
            }
            if(_surgeryList.length) {
              _obj.dataKey = true
              _surgeryList.map(surgery => {
                const _heightStart = moment(surgery.appointmenttimestart)
                const _heightEnd = moment(surgery.appointmenttimeend)
                const _topStart = moment(surgery.appointmentdate.split(' ')[0] + ' ' + item + ':00')
                const _heightDiff = _heightEnd.diff(_heightStart, 'm')
                const _topDiff = _heightStart.diff(_topStart, 'm')
                surgery.height = _heightDiff / (interval * 1) * (_obj.realHeight + 1) + 'px'
                surgery.top = _topDiff / (interval * 1) * _obj.realHeight + 'px'
                surgery.time = item + '-' + this.timeBox[index + 1]
                surgery.color = surgery.status === -1 ? 'rgba(24,24,24,0.15)' : surgery.status === 1 ? 'rgba(65,114,246,0.25)' : 'rgba(255,111,118,0.25)'
                surgery.borderColor = surgery.status === -1 ? '#3d3d3d' : surgery.status === 1 ? '#4172F6' : '#FF6F76'
                surgery.startText = surgery.status === -1 ? '已取消' : surgery.status === 1 ? '已上门' : '未上门'
                surgery.openKey = false
                // 统一格式数据
                surgery.customerID = surgery.customerid
                surgery.appointmentStartTime = surgery.appointmenttimestart.split(' ')[1]
                surgery.appointmentEndTime = surgery.appointmenttimeend.split(' ')[1]
                // surgery.chargeBox = surgery.detailList.map(item => item.chargeName)
                _obj.dataList.push(surgery)
              })
            }
            this.data.push(_obj)
          }
        })
        console.log(this.data)
      },
      //添加
      toAdd(id, date, start, end, type) {
        let breadData = [
          {
            url: '/desktop',
            text: 'layoutNav.desk'
          },
          {
            url: '/appointmentSurgery',
            text: 'appointmentToday.menu4'
          },
          {
            url: '/appointmentSurgeryAdd',
            text: 'treatSchedulerAdd.tit3'
          }
        ]
        this.$store.dispatch('setBreadData', breadData)
        this.$router.push({
          path: '/appointmentSurgeryAdd',
          query: {
            id: id,
            date: date,
            start: start,
            end: end,
            type: type,
          }
        })
      },
      //查看当月医生
      toUser (id, name, date) {
        let breadData = [
          {
            url: '/desktop',
            text: 'layoutNav.desk'
          },
          {
            url: '/appointmentSurgery',
            text: 'appointmentToday.menu4'
          },
          {
            url: '/appointmentSurgeryUser',
            text: name
          }
        ]
        this.$store.dispatch('setBreadData', breadData)
        this.$router.push({
          path: '/appointmentSurgeryUser',
          query: {
            id: id,
            date: date,
          }
        })
      },
    }
  }
</script>

<style scoped>
  .treat {
    padding: 0;
    overflow: hidden;
  }
  .menuTabs:after {
    display: none;
  }
  .filter-btn {
    overflow: hidden;
    padding: 20px 20px 0;
    border-bottom: 1px solid rgba(42,42,68,0.10);
  }
  .filter-btn li {
    float: left;
    min-width: 70px;
    height: 28px;
    padding: 0 10px;
    border: 1px solid #3D3D3D;
    margin: 0 20px 20px 0;
    font-size: 12px;
    line-height: 26px;
    text-align: center;
    color: #3D3D3D;
    cursor: pointer;
    border-radius: 3px;
  }
  .filter-btn .active {
    border-color: #4172F6;
    color: #fff;
    background: #4172F6;
  }
  .time {
    overflow: hidden;
    padding: 10px 20px;
  }
  .time ul {
    float: right;
    overflow: hidden;
  }
  .time li {
    float: left;
    margin-right: 20px;
    font-size: 12px;
    line-height: 32px;
    color: #181818;
  }
  .time li span {
    display: inline-block;
    vertical-align: middle;
    margin-right: 6px;
    width: 6px;
    height: 6px;
    background: #3D3D3D;
    border-radius: 50%;
  }
  .time .wait span {
    background: #FF6F76;
  }
  .time .yes span {
    background: #4172F6;
  }
  .table {
    margin: 0 20px;
  }
</style>

<style type="text/css">
  .treat .ivu-table-cell {
    overflow: visible;
    padding: 0px 5px !important;
  }
  .treat th {
    height: 70px !important;
  }
  .treat .tableTit {
    padding: 8px 5px;
    font-size: 11px;
    line-height: 16px;
    font-weight: normal;
    cursor: pointer;
  }
  .treat .table-box {
    position: relative;
    width: 100%;
  }
  .treat .table-cus {
    position: absolute;
    left: -5px;
    right: -5px;
    padding: 5px;
    font-size: 12px;
    line-height: 16px;
    border-left: 2px solid #4172F6;
    border-radius: 2px;
    cursor: pointer;
    z-index: 1;
  }
  .treat .table-cus-box {
    width: 100%;
  }
  .treat .table-row-un-work {
    background: rgba(42,42,68,0.08);
  }
  .treat .ivu-table-wrapper {
    border-width: 1px;
  }
  .treat .ivu-table table th, .treat .ivu-table table td {
    border-width: 1px;
  }
</style>