/**
 * 已取消预约
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
    <div class="container-body">
      <Menu mode="horizontal" :active-name="menuRouteUrl" @on-select='toMenu' class='menuTabs'>
        <Menu-item name="/appointmentToday">{{$t('appointmentToday.menu1')}}</Menu-item>
        <Menu-item name="/appointmentConsult">{{$t('appointmentToday.menu2')}}</Menu-item>
        <Menu-item name="/appointmentTreat">{{$t('appointmentToday.menu3')}}</Menu-item>
        <Menu-item name="/appointmentSurgery">{{$t('appointmentToday.menu4')}}</Menu-item>
        <Menu-item name="/appointmentCancel">{{$t('appointmentToday.menu5')}}</Menu-item>
      </Menu>
      <Table stripe :columns="col" :data="data" class='cancel-table'></Table>
    </div>
  </div>
</template>

<script>
  import resizeTime from 'components/tableResizeTime.vue';
	import resizeCus from 'components/tableResizeCus.vue';
	import resizeRemark from 'components/tableResizeRemark.vue';
  export default {
    components: {
			resizeTime,
			resizeCus,
			resizeRemark
    },
    data () {
      return {
        key: true,
        menuRouteUrl: '/appointmentCancel',
        formSearch: {
          hospitalId: ''
        },
        col: [
          {   
            title: this.$t('labelPublic.xh'),
            type: 'index',
            width: 60
          },
          {   
            title: this.$t('appointmentConsultAdd.label1'),
            width: 80,
            key: 'appointmentDate'
          },
          {   
            title: this.$t('appointmentConsultAdd.label3'),
            width: 120,
            render: (h, params) => {
              const _start = params.row.appointmentStartTime
              const _end = params.row.appointmentEndTime
              return h('span', _start + '-' + _end)
            }
          },
          {
            title: this.$t('labelPublic.gkbh'),
            width: 60,
            key: 'customerID'
          },
          {
            title: this.$t('labelPublic.gkxm'),
            width: 60,
            render: (h, params) => {
              return h(resizeCus, {
                props: {
                  name: params.row.customerName,
                  id: params.row.customerID
                },
                on: {
                  'click': () => {
                    this.toCusIndex(params.row.customerID, params.row.customerName);
                  }
                }
              });
            }
          },
          {
            title: this.$t('labelPublic.zt'),
            width: 60,
            render: (h, params) => {
              return h('span', this.$t('appointmentCancel.colTit1'))
            }
          },
          {
            title: this.$t('appointmentConsultAdd.label2'),
            width: 60,
            key: 'userName'
          },
          {
            title: this.$t('treatSchedulerAdd.label'),
            width: 60,
            key: 'chargeName'
          },
          {
            title: this.$t('appointmentCancel.colTit2'),
            width: 80,
            render: (h, params) => {
              if (params.row.createTime) {
                return h(resizeTime, {
                  props: {
                    time: params.row.createTime
                  }
                })
              }
            }
          },
          {
            title: this.$t('labelPublic.ms'),
            width: 100,
            render: (h, params) => {
							if(params.row.remark) {
								return h(resizeRemark, {
									props: {
										remark: params.row.remark
									}
								})
							}
						}
          },
        ],
        data: []
      }
    },
    computed: {
      hospList () {
        return this.$store.getters.getSelectAllHospList;
      },
      langRouterKey () {
        return this.$store.getters.getLandRouterKey;
      },
    },
    watch: {
      langRouterKey (val) {
        if(val === 'appointmentCancel') {
          this.getList();
        }
      },
    },
    created () {
      this.$store.dispatch('setSelectAllHospList');
      this.key = this.getHeadquarters();
      if(sessionStorage.getItem('appointmentHospId')) {
        this.formSearch.hospitalId = sessionStorage.getItem('appointmentHospId') * 1;
      } else {
        this.formSearch.hospitalId = localStorage.getItem('hospId') * 1;
        sessionStorage.setItem('appointmentHospId', this.formSearch.hospitalId);
      }
      this.getList()
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
      getList () {
        let _vm = this
        _vm.$store.dispatch('setPageLoading', -1)
        _vm.$http.getPage({
          url: 'guard-webManager/appointmentDesk/getCancel.jhtml',
          data: _vm.formSearch,
          success: function(res){
            const _data = res.data.content || [];
            if(_vm.langRouterKey !== 'appointmentCancel') {
              _vm.data = _data;
            } else {
              _vm.requestList(_data, ['chargeName', 'remark']).then(res => _vm.data = res);
            }
            _vm.$store.dispatch('setPageLoading', 1);
          },
          error: function(res){
            console.log(res)
          }
        })
      },
      //跳转客户详情
      toCusIndex (id, name) {
        let breadData = [
          {
            url: '/desktop',
            text: 'layoutNav.desk'
          },
          {
            url: '/customer',
            text: 'layoutNav.customerManage'
          },
          {
            url: '/customerIndex',
            text: name
          }
        ]
        sessionStorage.setItem("cusName", name)
        sessionStorage.setItem("cusId", id)
        this.$store.dispatch('setBreadData', breadData);
        this.$router.push({
          path: '/customerIndex',
          query: {
            id: id
          }
        })
      },
    }
  }
</script>

<style type="scoped">
  .cancel-table {
    margin: 20px 0;
  }
</style>
