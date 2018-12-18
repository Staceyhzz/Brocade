/**
* 治疗预约
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
      <div class="time">
        <div class="filter-btn">
          <p :class="[opacityKey === 100 ? 'active' : '']" @click='changeOpacity(100)'>{{$t('appointmentToday.btn1')}} ({{countData.length}})</p>
          <p :class="[opacityKey === 1 ? 'active' : '']" @click='changeOpacity(1)'>{{$t('appointmentToday.btn2')}} ({{yesCount}})</p>
          <p :class="[opacityKey === 0 ? 'active' : '']" @click='changeOpacity(0)'>{{$t('appointmentToday.btn3')}} ({{waitCount}})</p>
          <!-- <p :class="[opacityKey === -1 ? 'active' : '']" @click='changeOpacity(-1)'>已取消 ({{cancelCount}})</p> -->
        </div>
        <ul>
          <li class="yes"><span></span>{{$t('appointmentToday.btn2')}}</li>
          <li class="wait"><span></span>{{$t('appointmentToday.btn3')}}</li>
          <!-- <li class="cancel"><span></span>已取消</li> -->
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
        key: true,
        timer: true,
        bodyWidth: 0,
        bodyHeight: null,
        opacityKey: 100,
        menuRouteUrl: '/appointmentToday',
        formSearch: {
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
        if(val === 'appointmentToday') {
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
      cancelCount () {
        const _data = this.countData.filter(item => item.status === -1)
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
          url: 'guard-webManager/appointmentDesk/todayIndex.jhtml',
          data: _vm.formSearch,
          success: function(res){
            _vm.hospList = res.data.content.Hospital || []
            // 统一格式数据
            const _realTreat = res.data.content.treatList.map(item => {
              item.dataType = 'treat'
              item.onlineKey = false
              item.onlineType = _vm.$t('appointmentToday.status4')
              item.chargeBox = [item.chargeName]
              item.chargeText = item.chargeBox.join(',')
              return item
            }) || []
            const _realOnline = res.data.content.betterTreatList.map(item => {
              item.appointmentDate = item.appointDate
              item.appointmentEndTime = item.appointEndTime
              item.appointmentStartTime = item.appointStartTime
              item.customerID = item.guardCustomerId
              item.chargeBox = [item.guardChargeName]
              item.dataType = 'treat'
              item.userID = item.guardDoctorId
              item.userName = item.guardDoctorName
              item.onlineKey = true
              item.status = item.status ? 1 : 0
              item.onlineType = _vm.$t('appointmentToday.status5')
              item.chargeText = item.chargeBox.join(',')
              return item
            }) || []
            const _realSurgery = res.data.content.surgeryList.map(item => {
              item.status = item.status === 0 ? 0 : 1
              item.appointmentDate = item.appointmentdate.split(' ')[0]
              item.appointmentStartTime = item.appointmenttimestart.split(' ')[1]
              item.appointmentEndTime = item.appointmenttimeend.split(' ')[1]
              item.customerID = item.customerid
              item.chargeBox = item.detailList.map(charge => charge.chargeName)
              item.dataType = 'surgery'
              item.userID = item.userid
              item.chargeText = item.chargeBox.join(',')
              return item
            }) || []
            const _realConsult = res.data.content.consultList.map(item => {
              item.status = item.status === 0 ? 0 : 1
              item.appointmentDate = item.appointmentdate.split(' ')[0]
              item.appointmentStartTime = item.appointmentstarttime
              item.appointmentEndTime = item.appointmentendtime
              item.customerID = item.customerid
              item.dataType = 'consult'
              item.userID = item.userid
              return item
            }) || []
            _vm.countData = [..._realTreat, ..._realOnline, ..._realSurgery, ..._realConsult]
            const _docList = res.data.content.userList || []
            const _docStatusList = res.data.content.shiftList || []
            let start = moment().format('YYYY-MM-DD') + ' ' + res.data.content.start.split(' ')[1]
            const end = moment().format('YYYY-MM-DD') + ' ' + res.data.content.end.split(' ')[1]
            const interval = 30
            _vm.timeBox.push(moment(start).format('HH:mm'))
            for(let j = 1; moment(start).isBefore(end); j++) {
              _vm.timeBox.push(moment(start).add(interval, 'minute').format('HH:mm'))
              start = moment(start).add(interval, 'minute')
            }
            if(_vm.langRouterKey !== 'appointmentToday') {
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
              _vm.setData(_vm.countData, interval)
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
              _vm.requestList(_vm.countData, ['remark', 'chargeText']).then(res => {
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
      init () {
        let _vm = this
        if(_vm.timer) {
          _vm.timer = false
          setTimeout(() => {
            _vm.$nextTick(() => {
              console.log(_vm.$refs.treat)
              console.log(document.documentElement.clientHeight + '------------')
              _vm.bodyWidth = _vm.$refs.wrapper.offsetWidth - 40
              if(_vm.$refs.treat.$el.clientHeight + 50 > document.documentElement.clientHeight - 260) {
                _vm.bodyHeight = document.documentElement.clientHeight - 260
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
                class: 'tableTit'
              }, [
              h('li', item.name),
              h('li', this.$t('appointmentToday.colTit2') + item.workName)
              ]
              )
            },
            render: (h, params) => {
              if(item.workType === 0) {} else {
                if(params.row.dataKey) {
                  let _dataList = params.row.dataList.filter(cus => cus.userID === item.id)
                  return h('div', {
                    class: 'table-box',
                    style: {
                      height: params.row.realHeight + 'px'
                    }
                  }, _dataList.map(_data => {
                    let _typeText = '',
                    _display = 'none',
                    _display1 = 'block',
                    _display2 = 'none'
                    if(_data.dataType === 'consult') {
                      _typeText = this.$t('appointmentToday.status1')
                      _display1 = 'none'
                      _display2 = 'block'
                    } else if(_data.dataType === 'treat') {
                      _display = _data.onlineKey ? 'block' : 'none'
                      _typeText = this.$t('appointmentToday.status2')
                    } else if(_data.dataType === 'surgery') {
                      _typeText = this.$t('appointmentToday.status3')
                    }
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
                          h('p', {
                            style: {
                              display: _display1
                            }
                          } ,[
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
                          h('p', {
                            style: {
                              display: _display2
                            }
                          }, [
                            h('icon', {
                              props: {
                                type: 'ios-barcode'
                              },
                              style: {
                                marginRight: '3px'
                              }
                            }),
                            h('span', _data.code)
                          ]),
                          h('p', {
                            style: {
                              textAlign: 'right'
                            }
                          } ,_typeText),
                          h('p', {
                            style: {
                              textAlign: 'right',
                              display: _display
                            }
                          },'App')
                        ])
                      ]),
                      h(cmptAppointmentHover, {
                        props: {
                          data: _data,
                          openKey: _data.openKey,
                          type: _data.dataType,
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
            const _allData = data.filter(cus => {
              const _now = moment().format('YYYY-MM-DD') + ' ' + cus.appointmentStartTime
              if((moment(_now).isAfter(_start) && moment(_end).isAfter(_now)) || moment(_now).isSame(_start)) {
                return cus
              }
            })
            let _obj = {
              time: item + '-' + this.timeBox[index + 1],
              dataKey: false,
              realHeight: 70,
              dataList: []
            }
            if(_allData.length) {
              _obj.dataKey = true
              _allData.map(_all => {
                const _heightStart = moment(_all.appointmentDate + ' ' + _all.appointmentStartTime)
                const _heightEnd = moment(_all.appointmentDate + ' ' + _all.appointmentEndTime)
                const _topStart = moment(_all.appointmentDate + ' ' + item + ':00')
                const _heightDiff = _heightEnd.diff(_heightStart, 'm')
                const _topDiff = _heightStart.diff(_topStart, 'm')
                _all.height = _heightDiff / (interval * 1) * (_obj.realHeight + 1) + 'px'
                _all.top = _topDiff / (interval * 1) * _obj.realHeight + 'px'
                _all.time = item + '-' + this.timeBox[index + 1]
                _all.color = _all.status === -1 ? 'rgba(24,24,24,0.15)' : _all.status === 1 ? 'rgba(65,114,246,0.25)' : 'rgba(255,111,118,0.25)'
                _all.borderColor = _all.status === -1 ? '#3d3d3d' : _all.status === 1 ? '#4172F6' : '#FF6F76'
                // _all.startText = _all.status === -1 ? '已取消' : _all.status === 1 ? '已上门' : '未上门'
                _all.openKey = false
                _obj.dataList.push(_all)
              })
            }
            this.data.push(_obj)
          }
        })
        console.log(this.data)
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
    float: left;
    padding-top: 2px;
    overflow: hidden;
  }
  .filter-btn p {
    float: left;
    min-width: 70px;
    height: 28px;
    padding: 0 10px;
    border: 1px solid #3D3D3D;
    margin: 0 20px 0px 0;
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
    position: relative;
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