/** 
 * 上门情况页面 
 */

<template>
  <div class="customer-box">
    <div class="customer-item">
      <div class="customer-item-title">
        <h3>
          <Icon type="pricetag"></Icon>{{$t('indexVisit.tit1')}}</h3>
      </div>
      <Table stripe :columns="columns" :data="data"></Table>
    </div>
    <div class="customer-item">
      <div class="customer-item-title">
        <h3>
          <Icon type="pricetag"></Icon>{{$t('indexVisit.tit2')}}</h3>
      </div>
      <Table stripe :columns="columns1" :data="data1"></Table>
    </div>
    <div class="customer-item">
      <div class="customer-item-title">
        <h3>
          <Icon type="pricetag"></Icon>{{$t('indexVisit.tit3')}}</h3>
      </div>
      <Table stripe :columns="columns3" :data="data3"></Table>
    </div>
    <div class="customer-item">
      <div class="customer-item-title">
        <h3>
          <Icon type="pricetag"></Icon>{{$t('indexVisit.tit4')}}</h3>
      </div>
      <Table stripe :columns="columns2" :data="data2"></Table>
    </div>
  </div>
</template>

<script>
  import resizeTime from 'components/tableResizeTime.vue';
	import resizeRemark from 'components/tableResizeRemark.vue';
  export default {
    components: {
			resizeTime,
			resizeRemark
    },
    data() {
      return {
        cusId: '',
        cusName: '',
        columns: [
          {
            title: this.$t('labelPublic.xh'),
            type: 'index',
            width: 60
          },
          {
            title: this.$t('indexVisit.colTit1'),
            width: 140,
            key: 'createTime'
          },
          {
            title: this.$t('indexVisit.colTit2'),
            width: 120,
            key: 'hospitalName'
          },
          {
            title: this.$t('indexVisit.colTit3'),
            width: 150,
            render: (h, params) => {
              const text = `【${params.row.createUserDeptName}】【${params.row.createUserName}】`;
              return h('span', text);
            }
          }
        ],
        columns1: [
          {
            title: this.$t('labelPublic.xh'),
            type: 'index',
            width: 60
          },
          {
            title: this.$t('indexVisit.colTit4'),
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
            title: this.$t('indexVisit.colTit2'),
            width: 80,
            key: 'hospitalName'
          },
          {
            title: this.$t('indexVisit.colTit5'),
            width: 80,
            render: (h, params) => {
              const text = `【${params.row.createUserDeptName}】【${params.row.createUserName}】`;
              return h('span', text);
            }
          },
          {
            title: this.$t('indexVisit.colTit6'),
            width: 80,
            render: (h, params) => {
              const text = `【${params.row.assignUserDeptName}】【${params.row.assignUserName}】`;
              return h('span', text);
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
          }
        ],
        data: [],
        data1: [],
        data2: [],
        data3: [],
        columns2: [
          {
            title: this.$t('labelPublic.xh'),
            type: 'index',
            width: 60
          },
          {
            title: this.$t('indexVisit.colTit2'),
            width: 80,
            key: 'hospitalName'
          },
          {
            title: this.$t('indexVisit.colTit10'),
            width: 80,
            render: (h, params) => {
              const text = `【${params.row.createUserDeptName}】【${params.row.createUserName}】`;
              return h('span', text);
            }
          },
          {
            title: this.$t('labelPublic.zt'),
            width: 70,
            render: (h, params) => {
              const color = params.row.status === 1 
                ? '#4172F6' 
                : '#FF6F76';
              const text = params.row.status === 1 
                ? this.$t('indexVisit.colTit12') 
                : this.$t('indexVisit.colTit11');
              return h('span', {
                style: {
                  color: color
                }
              }, text);
            }
          },
          {
            title: this.$t('indexVisit.colTit13'),
            width: 80,
            render: (h, params) => {
              if (params.row.intime) {
                return h(resizeTime, {
                  props: {
                    time: params.row.intime
                  }
                })
              }
            }
          },
          {
            title: this.$t('indexVisit.colTit14'),
            width: 60,
            key: 'bedName'
          },
          {
            title: this.$t('indexVisit.colTit15'),
            width: 80,
            render: (h, params) => {
              if (params.row.outtime) {
                return h(resizeTime, {
                  props: {
                    time: params.row.outtime
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
          }
        ],
        columns3: [
          {
            title: this.$t('labelPublic.xh'),
            type: 'index',
            width: 60
          },
          {
            title: this.$t('indexVisit.colTit4'),
            width: 80,
            render: (h, params) => {
              if (params.row.createtime) {
                return h(resizeTime, {
                  props: {
                    time: params.row.createtime
                  }
                })
              }
            }
          },
          {
            title: this.$t('indexVisit.colTit2'),
            width: 80,
            key: 'hospitalName'
          },
          {
            title: this.$t('indexVisit.colTit8'),
            width: 80,
            key: 'deptName'
          },
          {
            title: this.$t('indexVisit.colTit9'),
            width: 80,
            key: 'createUserName'
          }
        ]
      }
    },
    computed: {
      langRouterKey () {
        return this.$store.getters.getLandRouterKey;
      },
    },
    watch: {
      langRouterKey (val) {
        if(val === 'indexVisit') {
          this.getId(this.cusId);
        }
      },
    },
    created() {
      this.cusId = sessionStorage.getItem('cusId');
      this.cusName = sessionStorage.getItem('cusName');
      this.getId(this.cusId);
    },
    methods: {
      // 获取资料
      getId(id) {
        let _vm = this;
        _vm.$store.dispatch('setPageLoading', -1)
        _vm.$http.getPage({
          url: 'guard-webManager/customerRecord/getVisits.jhtml',
          data: {
            id: id
          },
          success: function (res) {
            _vm.data = res.data.content.visitList || [];
            _vm.data3 = res.data.content.deptVisitList || [];
            const _data1 = res.data.content.triageList || [];
            const _data2 = res.data.content.inpatientList || [];
            if(_vm.langRouterKey !== 'indexVisit') {
              _vm.data1 = _data1;
              _vm.data2 = _data2;
            } else {
              _vm.requestList(_data1, ['remark']).then(res => _vm.data1 = res);
              _vm.requestList(_data2, ['remark', 'bedName']).then(res => _vm.data2 = res);
            }
						_vm.$store.dispatch('setPageLoading', 1);
          },
          error: function (res) {
            console.log(res);
          }
        });
      },
    }
  }

</script>
