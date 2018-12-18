/** 
 * 账户情况页面 
 */

<template>
  <div class="customer-box">
    <div class="customer-item">
      <div class="customer-item-title">
        <h3>
          <Icon type="pricetag"></Icon>{{$t('indexAccount.tit1')}}</h3>
      </div>
      <table class="tableEdit">
        <tr>
          <td class="tit">{{$t('indexAccount.label1')}}</td>
          <td>{{depositRestTotal}}</td>
          <td class="tit">{{$t('indexAccount.label2')}}</td>
          <td>{{couponRestTotal}}</td>
          <td class="tit">{{$t('indexAccount.tit4')}}</td>
          <td>{{pointTotal}}</td>
        </tr>
      </table>
    </div>
    <div class="customer-item">
      <div class="customer-item-title">
        <h3>
          <Icon type="pricetag"></Icon>{{$t('indexAccount.tit2')}}</h3>
      </div>
      <Table stripe :columns="col" :data="data"></Table>
      <p class="sumCount">{{$t('indexAccount.label3')}}：
        <span>{{$t('indexAccount.colTit5')}}：{{depositAll}}</span>
        <span>{{$t('indexAccount.colTit6')}}：{{depositAllReal}}</span>
      </p>
    </div>
    <div class="customer-item">
      <div class="customer-item-title">
        <h3>
          <Icon type="pricetag"></Icon>{{$t('indexAccount.tit3')}}</h3>
      </div>
      <Table stripe :columns="col1" :data="data1"></Table>
      <p class="sumCount">{{$t('indexAccount.label3')}}：
        <span>{{$t('indexAccount.colTit5')}}：{{couAll}}</span>
        <span>{{$t('indexAccount.colTit6')}}{{couAllReal}}</span>
      </p>
    </div>
    <div class="customer-item">
      <div class="customer-item-title">
        <h3>
          <Icon type="pricetag"></Icon>{{$t('indexAccount.tit4')}}</h3>
      </div>
      <Table stripe :columns="col2" :data="data2"></Table>
      <p class="sumCount">{{$t('indexAccount.label3')}}：
        <span>{{$t('indexAccount.colTit12')}}：{{pointAll}}</span>
      </p>
    </div>
    <div class="customer-item">
      <div class="customer-item-title">
        <h3>
          <Icon type="pricetag"></Icon>{{$t('indexAccount.tit5')}}</h3>
      </div>
      <Table stripe :columns="col3" :data="data3"></Table>
      <p class="sumCount">{{$t('indexAccount.label3')}}：
        <span>{{$t('indexAccount.colTit5')}}：{{depositAllChange}}</span>
      </p>
    </div>
    <div class="customer-item">
      <div class="customer-item-title">
        <h3>
          <Icon type="pricetag"></Icon>{{$t('indexAccount.tit6')}}</h3>
      </div>
      <Table stripe :columns="col4" :data="data4"></Table>
      <p class="sumCount">{{$t('indexAccount.label3')}}：
        <span>{{$t('indexAccount.colTit5')}}：{{couAllChange}}</span>
      </p>
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
        cusName: '',
        cusId: '',
        pointTotal: '',
        depositRestTotal: '',
        couponRestTotal: '',
        depositType: [
          {
            id: 1,
            name: '预收款充值'
          },
          {
            id: 2,
            name: '退单'
          },
          {
            id: 4,
            name: '转账'
          }
        ],
        couType: [
          {
            id: 1,
            name: '预收款赠送'
          },
          {
            id: 2,
            name: '手工赠送'
          },
          {
            id: 3,
            name: '积分兑换'
          },
          {
            id: 4,
            name: '激活券'
          }
        ],
        pointType: [
          {
            id: 11,
            name: '手工赠送',
          },
          {
            id: 12,
            name: '消费赠送',
          },
          {
            id: 21,
            name: '手工扣减',
          },
          {
            id: 22,
            name: '兑换券',
          },
          {
            id: 23,
            name: '兑换产品',
          },
          {
            id: 24,
            name: '退款扣减',
          },
          {
            id: 25,
            name: '退单扣减',
          }
        ],
        data: [],
        data1: [],
        data2: [],
        data3: [],
        data4: [],
        col: [
          {
            title: this.$t('labelPublic.xh'),
            type: 'index',
            width: 60
          },
          {
            title: this.$t('indexAccount.colTit1'),
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
            title: this.$t('labelPublic.lx'),
            width: 60,
            key: 'chargeName'
          },
          {
            title: this.$t('indexAccount.colTit2'),
            width: 60,
            key: 'hospitalName'
          },
          {
            title: this.$t('indexAccount.colTit3'),
            width: 70,
            render: (h, params) => {
              const index = this.depositType.findIndex(item => item.id === params.row.access);
              if(index >= 0) {
                return h('span', this.$t('indexAccount.depositType' + params.row.access));
              }
            }
          },
          {
            title: this.$t('indexAccount.colTit4'),
            width: 60,
            key: 'id'
          },
          {
            title: this.$t('indexAccount.colTit5'),
            width: 60,
            key: 'amount',
            align: 'right',
            render: (h, params) => {
              if(Number.isFinite(params.row.amount)) {
                return h('span', params.row.amount.toFixed(2));
              }
            }
          },
          {
            title: this.$t('indexAccount.colTit6'),
            width: 60,
            key: 'rest',
            align: 'right',
            render: (h, params) => {
              if(Number.isFinite(params.row.rest)) {
                return h('span', params.row.rest.toFixed(2));
              }
            }
          },
          {
            title: this.$t('indexAccount.colTit7'),
            width: 80,
            render: (h, params) => {
              const text = `【${params.row.createUserDeptName}】【${params.row.createUserName}】`;
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
        col1: [
          {
            title: this.$t('labelPublic.xh'),
            type: 'index',
            width: 60
          },
          {
            title: this.$t('indexAccount.colTit1'),
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
            title: this.$t('labelPublic.lx'),
            width: 60,
            key: 'categoryName'
          },
          {
            title: this.$t('indexAccount.colTit2'),
            width: 60,
            key: 'hospitalName'
          },
          {
            title: this.$t('indexAccount.colTit3'),
            width: 70,
            render: (h, params) => {
              const index = this.couType.findIndex(item => item.id === params.row.access);
              if(index >= 0) {
                return h('span', this.$t('indexAccount.couType' + params.row.access));
              }
            }
          },
          {
            title: this.$t('indexAccount.colTit8'),
            width: 60,
            key: 'id'
          },
          {
            title: this.$t('indexAccount.colTit5'),
            width: 60,
            key: 'amount',
            align: 'right',
            render: (h, params) => {
              if(Number.isFinite(params.row.amount)) {
                return h('span', params.row.amount.toFixed(2));
              }
            }
          },
          {
            title: this.$t('indexAccount.colTit6'),
            width: 60,
            key: 'rest',
            align: 'right',
            render: (h, params) => {
              if(Number.isFinite(params.row.rest)) {
                return h('span', params.row.rest.toFixed(2));
              }
            }
          },
          {
            title: this.$t('indexAccount.colTit7'),
            width: 80,
            render: (h, params) => {
              const text = `【${params.row.createUserDeptName}】【${params.row.createUserName}】`;
              return h('span', text);
            }
          },
          {
            title: this.$t('indexAccount.colTit9'),
            width: 80,
            render: (h, params) => {
              if (params.row.expiration) {
                return h(resizeTime, {
                  props: {
                    time: params.row.expiration
                  }
                })
              }
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
                ? this.$t('indexAccount.colTit10') 
                : this.$t('indexAccount.colTit11');
              return h('span', {
                style: {
                  color: color
                }
              }, text);
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
        col2: [
          {
            title: this.$t('labelPublic.xh'),
            type: 'index',
            width: 60
          },
          {
            title: this.$t('indexAccount.colTit1'),
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
            title: this.$t('labelPublic.lx'),
            width: 80,
            render: (h, params) => {
              const index = this.pointType.findIndex(item => item.id === params.row.type);
              if(index >= 0) {
                return h('span', this.$t('indexAccount.pointType' + params.row.type));
              }
            }
          },
          {
            title: this.$t('indexAccount.colTit2'),
            width: 80,
            key: 'hospitalName'
          },
          {
            title: this.$t('indexAccount.colTit12'),
            width: 60,
            key: 'amount',
            align: 'right',
            render: (h, params) => {
              if(Number.isFinite(params.row.amount)) {
                return h('span', params.row.amount.toFixed(2));
              }
            }
          },
          {
            title: this.$t('indexAccount.colTit7'),
            width: 80,
            render: (h, params) => {
              const text = `【${params.row.createUserDeptName}】【${params.row.createUserName}】`;
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
        col3: [
          {
            title: this.$t('labelPublic.xh'),
            type: 'index',
            width: 60
          },
          {
            title: this.$t('indexAccount.colTit1'),
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
            title: this.$t('indexAccount.colTit13'),
            width: 80,
            key: 'changeType'
          },
          {
            title: this.$t('indexAccount.colTit14'),
            width: 80,
            key: 'type'
          },
          {
            title: this.$t('indexAccount.colTit15'),
            width: 60,
            key: 'id'
          },
          {
            title: this.$t('indexAccount.colTit5'),
            width: 60,
            key: 'amount',
            align: 'right',
            render: (h, params) => {
              if(Number.isFinite(params.row.amount)) {
                return h('span', params.row.amount.toFixed(2));
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
        col4: [
          {
            title: this.$t('labelPublic.xh'),
            type: 'index',
            width: 60
          },
          {
            title: this.$t('indexAccount.colTit1'),
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
            title: this.$t('indexAccount.colTit13'),
            width: 80,
            key: 'changeType'
          },
          {
            title: this.$t('indexAccount.colTit16'),
            width: 80,
            key: 'type'
          },
          {
            title: this.$t('indexAccount.colTit17'),
            width: 60,
            key: 'id'
          },
          {
            title: this.$t('indexAccount.colTit5'),
            width: 60,
            key: 'amount',
            align: 'right',
            render: (h, params) => {
              if(Number.isFinite(params.row.amount)) {
                return h('span', params.row.amount.toFixed(2));
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
      }
    },
    computed: {
      pointAll() {
        const num = this.data2.reduce((pre, cur) => cur.amount + pre, 0);
        return num.toFixed(2);
      },
      couAll() {
        const num = this.data1.reduce((pre, cur) => cur.amount + pre, 0);
        return num.toFixed(2);
      },
      couAllReal() {
        const num = this.data1.reduce((pre, cur) => cur.rest + pre, 0);
        return num.toFixed(2);
      },
      couAllChange() {
        const num = this.data4.reduce((pre, cur) => cur.amount + pre, 0);
        return num.toFixed(2);
      },
      depositAllReal() {
        const num = this.data.reduce((pre, cur) => cur.rest + pre, 0);
        return num.toFixed(2);
      },
      depositAll() {
        const num = this.data.reduce((pre, cur) => cur.amount + pre, 0);
        return num.toFixed(2);
      },
      depositAllChange() {
        const num = this.data3.reduce((pre, cur) => cur.amount + pre, 0);
        return num.toFixed(2);
      },
      langRouterKey () {
        return this.$store.getters.getLandRouterKey;
      },
    },
    watch: {
      langRouterKey (val) {
        if(val === 'indexAccount') {
          this.getList(this.cusId);
        }
      },
    },
    created() {
      this.cusName = sessionStorage.getItem('cusName');
      this.cusId = sessionStorage.getItem('cusId');
      this.getList(this.cusId);
    },
    methods: {
      getList(id) {
        let _vm = this;
        _vm.$store.dispatch('setPageLoading', -1);
        _vm.$http.getPage({
          url: 'guard-webManager/customerRecord/getAccount.jhtml',
          data: {
            id: id
          },
          success: function (res) {
            _vm.pointTotal = Number.isFinite(res.data.content.pointTotal)
              ? res.data.content.pointTotal.toFixed(2)
              : '';
            _vm.depositRestTotal = Number.isFinite(res.data.content.depositRestTotal)
              ? res.data.content.depositRestTotal.toFixed(2)
              : '';
            _vm.couponRestTotal = Number.isFinite(res.data.content.couponRestTotal)
              ? res.data.content.couponRestTotal.toFixed(2)
              : '';
            const _data = res.data.content.depositList || [];
            const _data1 = res.data.content.couponList || [];
            const _data2 = res.data.content.pointList || [];
            const _data3 = res.data.content.depositChangeList || [];
            const _data4 = res.data.content.couponChangeList || [];
            const _col = _vm.tableCount(_data, ['amount', 'rest']);
            _col.map(item => {
              const index = _vm.col.findIndex(col => col.key === item.key);
              console.log(item)
              if(index >= 0) {
                _vm.col[index].width = item.width;
              }
            });
            const _col1 = _vm.tableCount(_data1, ['amount', 'rest']);
            _col1.map(item => {
              const index = _vm.col1.findIndex(col => col.key === item.key);
              console.log(item)
              if(index >= 0) {
                _vm.col1[index].width = item.width;
              }
            });
            const _col2 = _vm.tableCount(_data2, ['amount']);
            _col2.map(item => {
              const index = _vm.col2.findIndex(col => col.key === item.key);
              console.log(item)
              if(index >= 0) {
                _vm.col2[index].width = item.width;
              }
            });
            const _col3 = _vm.tableCount(_data3, ['amount']);
            _col3.map(item => {
              const index = _vm.col3.findIndex(col => col.key === item.key);
              console.log(item)
              if(index >= 0) {
                _vm.col3[index].width = item.width;
              }
            });
            const _col4 = _vm.tableCount(_data4, ['amount']);
            _col4.map(item => {
              const index = _vm.col4.findIndex(col => col.key === item.key);
              console.log(item)
              if(index >= 0) {
                _vm.col4[index].width = item.width;
              }
            });
            if(_vm.langRouterKey !== 'indexAccount') {
              _vm.data = _data;
              _vm.data1 = _data1;
              _vm.data2 = _data2;
              _vm.data3 = _data3;
              _vm.data4 = _data4;
            } else {
              _vm.requestList(_data, ['remark', 'chargeName']).then(res => _vm.data = res);
              _vm.requestList(_data1, ['remark', 'categoryName']).then(res => _vm.data1 = res);
              _vm.requestList(_data2, ['remark']).then(res => _vm.data2 = res);
              _vm.requestList(_data3, ['remark', 'changeType', 'type']).then(res => _vm.data3 = res);
              _vm.requestList(_data4, ['remark', 'changeType', 'type']).then(res => _vm.data4 = res);
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

<style scoped>
  .sumCount {
    padding: 15px 0;
  }

  .sumCount span {
    margin: 0px 15px;
  }

</style>
