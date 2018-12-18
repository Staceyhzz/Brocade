/** 
	* 还款订单记录 
	*/

<template>
  <div class="container-box repayment-rec">
    <div class="container-header">
      <h2>{{$t('repayment.tit')}}</h2>
      <ul class="header-btn-group">
        <li class="header-item" @click="back">
          <Icon type="android-arrow-back"></Icon>{{$t('publicSet.back')}}</li>
      </ul>
    </div>
    <div class="container-body">
      <Table stripe :columns="col" :data="data"></Table>
    </div>
  </div>
</template>

<script>
	import expandRow from './expand-row.vue';
	import resizeTime from 'components/tableResizeTime.vue';
  import resizeCus from 'components/tableResizeCus.vue';
  export default {
    components: {
			expandRow,
			resizeTime, 
			resizeCus
    },
    data() {
      return {
        col: [
					{
            type: 'expand',
            width: 30,
            render: (h, params) => {
              return h(expandRow, {
                props: {
                  row: params.row.cashierList
                }
              })
            }
          },
          {
            title: this.$t('labelPublic.xh'),
            type: 'index',
            width: 60
          },
          {
            title: this.$t('cashierDesk.colTit3'),
						width: 60,
						render: (h, params) => {
              return h(resizeCus, {
                props: {
                  name: params.row.customerName,
                  id: params.row.customerid
                },
                on: {
                  'click': () => {
                    this.toCusIndex(params.row.customerid, params.row.customerName);
                  }
                }
              });
            }
          },
          {
            title: this.$t('debtOrder.colTit3'),
						width: 60,
            key: 'id',
          },
          {
            title: this.$t('repayment.colTit1'),
						width: 60,
            key: 'hospitalName',
          },
          {
            title: this.$t('repayment.colTit2'),
						width: 60,
            key: 'createUserName',
          },
          {
            title: this.$t('repayment.colTit3'),
						width: 80,
            render: (h, params) => {
              if(params.row.createtime) {
                return h(resizeTime, {
                  props: {
                    time: params.row.createtime
                  }
                })
              }
            }
          },
          {
            title: this.$t('repayment.colTit4'),
						width: 60,
            key: 'finalprice',
            align: 'right',
            render: (h, params) => {
							if(Number.isFinite(params.row.finalprice)) {
								return h('span', params.row.finalprice.toFixed(2));
							}
            }
          },
          {
            title: this.$t('debtOrder.colTit5'),
						width: 60,
            key: 'doNum',
            align: 'right'
          },
          {
            title: this.$t('repayment.colTit5'),
						width: 60,
            align: 'right',
            key: 'debtamount',
            render: (h, params) => {
							if(Number.isFinite(params.row.debtamount)) {
								return h('span', {
									style: {
										color: 'red'
									}
								}, params.row.debtamount.toFixed(2));
							}
            }
          },
          {
            title: this.$t('publicSet.tableAction'),
            key: 'action',
            width: 100,
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'info',
                    size: 'small',
                    icon: 'cash'
                  },
                  on: {
                    click: () => {
                      this.toOrder(params.row.id)
                    }
                  }
                }, this.$t('cashierDesk.btn3'))
              ])
            }
          }
        ],
        data: [],
      }
    },
    created() {
      this.getList(this.$route.query.id)
    },
    methods: {
      getList(id) {
        let _vm = this
        _vm.$store.dispatch('setPageLoading', -1)
        _vm.$http.getPage({
          url: 'guard-webManager/cashierDesk/repayment.jhtml',
          data: {
            customerId: id
          },
          success: function (res) {
            const _data = res.data.content.map(item => {
              let obj = {...item};
              obj._expanded = true;
              obj.doNum = Number.isFinite(item.finalprice - item.debtamount)
                ? (item.finalprice - item.debtamount).toFixed(2)
                : '0.00';
              return obj;
            });
            const _col = _vm.tableCount(_data, ['finalprice', 'debtamount', 'doNum']);
            _col.map(item => {
              const index = _vm.col.findIndex(col => col.key === item.key);
              console.log(item)
              if(index >= 0) {
                _vm.col[index].width = item.width;
              }
            });
            _vm.data = _data;
            _vm.$store.dispatch('setPageLoading', 1);
          },
          error: function (res) {
            console.log(res);
          }
        });
      },
      back() {
        this.$router.back(-1)
      },
      //跳转客户详情
      toCusIndex(id, name) {
        var breadData = [{
            url: '/desktop',
            text: '桌面'
          },
          {
            url: '/customer',
            text: '客户管理'
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
      //跳转收银
      toOrder(id) {
        const breadData = [
					{
            url: '/desktop',
            text: 'layoutNav.desk'
          },
          {
            url: '/cashierDesk',
            text: 'layoutNav.cashierDesk'
          },
          {
            url: '/cashierRepayment',
            text: 'cashierDesk.btn3'
          }
        ];
        this.$store.dispatch('setBreadData', breadData);
        this.$router.push({
          path: '/cashierRepayment',
          query: {
            id: id
          }
        })
      },
    }
  }

</script>

<style lang='less'>
  .repayment-rec {
    .ivu-table th,
    .ivu-table td,
    .ivu-table-wrapper {
      border-width: 1px;
    }
    .ivu-table:before,
    .ivu-table:after {
      display: block;
		}
		.ivu-table-cell.ivu-table-cell-with-expand {
			padding: 0 !important;
		}
  }

</style>
