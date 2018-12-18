/**
* 治疗预约
*/
<template>
	<div class="container-box" ref='wrapper'>
    <div class="container-header">
      <h2>{{$t('appointmentToday.menu3')}}——{{userName}}</h2>
      <ul class="header-btn-group">
        <li class="header-item" @click="selectDate('before')"><Icon type="arrow-up-a"></Icon>{{$t('appointmentToday.btn5')}}</li>
        <li class="header-item" @click="selectDate('now')"><Icon type="navicon-round"></Icon></Icon>{{$t('appointmentToday.btn6')}}</li>
        <li class="header-item" @click="selectDate('after')"><Icon type="arrow-down-a"></Icon></Icon>{{$t('appointmentToday.btn7')}}</li>
      </ul>
    </div>
    <div class="container-body treat">
      <div class="time">
        <div class="filter-btn">
          <p :class="[opacityKey === 100 ? 'active' : '']" @click='changeOpacity(100)'>{{$t('appointmentToday.btn1')}} ({{countData.length}})</p>
          <p :class="[opacityKey === 1 ? 'active' : '']" @click='changeOpacity(1)'>{{$t('appointmentToday.btn2')}} ({{yesCount}})</p>
          <p :class="[opacityKey === 0 ? 'active' : '']" @click='changeOpacity(0)'>{{$t('appointmentToday.btn3')}} ({{waitCount}})</p>
        </div>
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
        opacityKey: 100,
        timer: true,
        bodyWidth: 0,
        bodyHeight: null,
        userName: '',
        formSearch: {
          startTime: '',
          userId: '',
        },
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
        monthsList: [],
        timeBox: [],
      }
    },
    watch: {
      viewResize (val) {
        this.init()
        console.log(val)
      },
      langRouterKey (val) {
        if(val === 'appointmentTreatUser') {
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
      this.formSearch.userId = this.$route.query.id
      this.formSearch.startTime = this.$route.query.date
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
      getList () {
        let _vm = this
        _vm.timeBox.splice(0)
        _vm.monthsList.splice(0)
        _vm.$store.dispatch('setPageLoading', -1)
        _vm.$http.getPage({
          url: 'guard-webManager/treatScheduler/user.jhtml',
          data: _vm.formSearch,
          success: function(res){
            _vm.userName = res.data.content.User.name || ''
            const _data = res.data.content.TreatList.map(item => {
              item.onlineKey = false
              item.onlineType = _vm.$t('appointmentToday.status4')
              item.chargeText = item.chargeName
              return item
            }) || []
            const _onlineData = res.data.content.betterTreatList.map(item => {
              item.appointmentDate = item.appointDate
              item.appointmentEndTime = item.appointEndTime
              item.appointmentStartTime = item.appointStartTime
              item.customerID = item.guardCustomerId
              item.chargeName = item.guardChargeName
              item.userID = item.guardDoctorId
              item.userName = item.guardDoctorName
              item.status = item.status ? 1 : 0
              item.onlineKey = true
              item.onlineType = _vm.$t('appointmentToday.status5')
              item.chargeText = item.guardChargeName
              return item
            }) || []
            _vm.countData = [..._data, ..._onlineData]
            const _days = moment(_vm.formSearch.startTime).daysInMonth()
            const _workList = res.data.content.ShiftList || []
            const _nameBox = res.data.content.StartTime.split('-')
            let start = res.data.content.AppointmentStart
            const end = res.data.content.AppointmentEnd
            const interval = res.data.content.AppointmentInterval
            _vm.timeBox.push(moment(start).format('HH:mm'))
            for(let j = 1; moment(start).isBefore(end); j++) {
              _vm.timeBox.push(moment(start).add(interval, 'minute').format('HH:mm'))
              start = moment(start).add(interval, 'minute')
            }
            if(_vm.langRouterKey !== 'appointmentTreatUser') {
              for(let i = 1; i <= _days; i++) {
                let _obj = {
                  name: moment(_nameBox[0] + '-' + _nameBox[1] + '-' + i, 'YYYY-MM-D').format('YYYY-MM-DD'),
                  workType: '',
                  workName: ''
                }
                const _index = _workList.findIndex(item => {
                  if(moment(_obj.name).isSame(item.shiftdate, 'd')){
                    return item
                  }
                })
                if(_index >= 0) {
                  _obj.workName = _workList[_index].categoryName
                  _obj.workType = _workList[_index].categoryType
                }
                _vm.monthsList.push(_obj)
              }
              _vm.setColumns()
              _vm.setData([..._data, ..._onlineData], interval)
              _vm.init();
            } else {
              _vm.requestList(_workList, ['categoryName']).then(res => {
                for(let i = 1; i <= _days; i++) {
                  let _obj = {
                    name: moment(_nameBox[0] + '-' + _nameBox[1] + '-' + i, 'YYYY-MM-D').format('YYYY-MM-DD'),
                    workType: '',
                    workName: ''
                  }
                  const _index = res.findIndex(item => {
                    if(moment(_obj.name).isSame(item.shiftdate, 'd')){
                      return item
                    }
                  })
                  if(_index >= 0) {
                    _obj.workName = res[_index].categoryName
                    _obj.workType = res[_index].categoryType
                  }
                  _vm.monthsList.push(_obj)
                }
                _vm.setColumns()
                _vm.init();
              });
              _vm.requestList([..._data, ..._onlineData], ['remark', 'chargeText']).then(res => {
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
      selectDate (type) {
        if(type == 'now'){
          this.formSearch.startTime = moment().format('YYYY-MM-DD')
        }else if(type == 'after'){
          this.formSearch.startTime = moment(this.formSearch.startTime).add(1, 'months').format('YYYY-MM-DD')
        }else{
          this.formSearch.startTime = moment(this.formSearch.startTime).subtract(1, 'months').format('YYYY-MM-DD')
        }
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
              if(_vm.$refs.treat.$el.clientHeight + 50 > document.documentElement.clientHeight - 200) {
                _vm.bodyHeight = document.documentElement.clientHeight - 200
              } else {
                _vm.bodyHeight = null
              }
              console.log(_vm.columns)
              _vm.col.map(item => {
                if(item.key == 'treatList') {
                  if((_vm.bodyWidth - 100) / _vm.monthsList.length > 120) {
                    item.width = (_vm.bodyWidth - 100) / _vm.monthsList.length
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
        this.monthsList.map(item => {
          let _col = {
            width: 110,
            key: 'treatList',
            className: item.workType === 0 ? 'table-row-un-work' : '',
            renderHeader: (h, params) =>{
              return h('ul', {
                class: 'tableTit',
              }, [
              h('li', item.name),
              h('li', this.$t('appointmentToday.colTit2') + item.workName)
              ]
              )
            },
            render: (h, params) => {
              if(item.workType === 0) {} else {
                if(params.row.dataKey) {
                  let _dataList = params.row.dataList.filter(cus => cus.appointmentDate === item.name)
                  return h('div', {
                    class: 'table-box',
                    style: {
                      height: params.row.realHeight + 'px'
                    },
                    on: {
                      dblclick: () => {
                        const _time = params.row.time.split('-')
                        this.toAdd(this.formSearch.userId, item.name, _time[0], _time[1], '2')
                      }
                    }
                  }, _dataList.map(_data => {
                    const _display = _data.onlineKey ? 'block' : 'none'
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
                        },
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
                          type: 'treat',
                          way: '2',
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
                        this.toAdd(this.formSearch.userId, item.name, _time[0], _time[1], '2')
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
            const _treatList = data.filter(cus => {
              const _now = moment().format('YYYY-MM-DD') + ' ' + cus.appointmentStartTime
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
            if(_treatList.length) {
              _obj.dataKey = true
              _treatList.map(treat => {
                const _heightStart = moment(treat.appointmentDate + ' ' + treat.appointmentStartTime)
                const _heightEnd = moment(treat.appointmentDate + ' ' + treat.appointmentEndTime)
                const _topStart = moment(treat.appointmentDate + ' ' + item + ':00')
                const _heightDiff = _heightEnd.diff(_heightStart, 'm')
                const _topDiff = _heightStart.diff(_topStart, 'm')
                treat.height = _heightDiff / (interval * 1) * (_obj.realHeight + 1) + 'px'
                treat.top = _topDiff / (interval * 1) * _obj.realHeight + 'px'
                treat.time = item + '-' + this.timeBox[index + 1]
                treat.color = treat.status === -1 ? 'rgba(24,24,24,0.15)' : treat.status === 1 ? 'rgba(65,114,246,0.25)' : 'rgba(255,111,118,0.25)'
                treat.borderColor = treat.status === -1 ? '#3d3d3d' : treat.status === 1 ? '#4172F6' : '#FF6F76'
                // treat.startText = treat.status === -1 ? '已取消' : treat.status === 1 ? '已上门' : '未上门'
                treat.openKey = false
                // 统一格式数据
                // treat.chargeBox = [treat.chargeName]
                _obj.dataList.push(treat)
              })
            }
            this.data.push(_obj)
          }
        })
        console.log(this.data)
      },
      changeOpacity (val) {
        this.opacityKey = val
      },
      //添加
      toAdd(id, date, start, end, type) {
        let breadData = [
          {
            url: '/desktop',
            text: 'layoutNav.desk'
          },
          {
            url: '/appointmentTreat',
            text: 'appointmentToday.menu3'
          },
          {
            url: '/treatSchedulerAdd',
            text: 'treatSchedulerAdd.tit1'
          }
        ]
        this.$store.dispatch('setBreadData', breadData)
        this.$router.push({
          path: '/treatSchedulerAdd',
          query: {
            id: id,
            date: date,
            start: start,
            end: end,
            type: type
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