/** 
 * 结算 
 */

<template>
  <div class="container-box" ref='wrapper'>
    <div class="container-header">
      <h2>{{$t('cashierDesk.btn4')}}</h2>
    </div>
    <div class="container-body">
      <Alert type="success">
        <p class="sumCount">{{formShow.sum}}</p>
        <p class="sumCount">{{$t('cashierDesk.label2')}}
          <span>{{$t('addSettlement.colTit1')}}: {{formShow.amount}}</span>
          <span>{{$t('addSettlement.colTit8')}}: {{formShow.amountReal}}</span>
          <span>{{$t('addSettlement.colTit5')}}: {{formShow.cash}}</span>
          <span>{{coinName}}: {{formShow.virtualCurrencyBalance}}</span>
          <span v-for='item in cardBox' :key='item.name'>
            {{item.name}}: {{item.amount}}
          </span>
          <span>{{$t('cashierDesk.label10')}}: {{formShow.coupon}}</span>
          <span>{{$t('cashierDesk.label9')}}: {{formShow.deposit}}</span>
          <span>{{$t('addSettlement.colTit2')}}: {{formShow.debt}}</span>
          <span>{{$t('addSettlement.colTit3')}}: {{formShow.debtReal}}</span>
        </p>
      </Alert>
      <Table stripe :columns="col" :data="data" :height='550'></Table>
      <div class="footer-btnGroup">
        <Button type="primary" icon="checkmark" @click="save" :loading='saveLoad'>{{$t('cashierDesk.btn4')}}</Button>
        <Button type="primary" icon="android-arrow-back" @click='back'>{{$t('publicSet.back')}}</Button>
      </div>
    </div>
  </div>
</template>

<script>
	import resizeTime from 'components/tableResizeTime.vue';
  export default {
		components: {resizeTime},
    data() {
      return {
        saveLoad: false,
        col: [
					{
            title: this.$t('labelPublic.xh'),
            width: 60,
            render: (h, params) => {
              if (params.row.key) {
								return h('span', params.index + 1);
              } else {
                return h('span', this.$t('settlementList.colTit6'));
              }
            }
          },
          {
						title: this.$t('addSettlement.colTit4'),
						width: 60,
            key: 'createUserName',
          },
          {
						title: this.$t('cashierDesk.colTit14'),
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
						title: this.$t('cashierDesk.colTit3'),
						width: 60,
            key: 'customerName',
          },
          {
						title: this.$t('addSettlement.colTit5'),
						width: 60,
						align: 'right',
						key: 'cash',
            render: (h, params) => {
              if (params.row.key) {
								return h('span', params.row.cash.toFixed(2));
              } else {
                return h('span', params.row.cash);
              }
            }
          },
          {
						title: '虚拟币',
						width: 60,
						align: 'right',
						key: 'virtualCurrencyBalance',
            render: (h, params) => {
              if (params.row.key) {
								return h('span', params.row.virtualCurrencyBalance.toFixed(2));
              } else {
                return h('span', params.row.virtualCurrencyBalance);
              }
            }
          }
				],
				col2: [
					{
						title: this.$t('cashierDesk.label10'),
						width: 60,
						align: 'right',
						key: 'coupon',
            render: (h, params) => {
              if (params.row.key) {
                return h('span', params.row.coupon.toFixed(2));
              } else {
                return h('span', params.row.coupon);
              }
            }
          },
          {
						title: this.$t('cashierDesk.label9'),
						width: 60,
						align: 'right',
						key: 'deposit',
            render: (h, params) => {
              if (params.row.key) {
                return h('span', params.row.deposit.toFixed(2));
              } else {
                return h('span', params.row.deposit);
              }
            }
          },
          {
						title: this.$t('addSettlement.colTit6'),
						width: 60,
						align: 'right',
						key: 'debt',
            render: (h, params) => {
              if (params.row.key) {
								const _color = params.row.debt > 0 
									? 'red' 
									: '';
                return h('span', {
									style: {
										color: _color
                  }
                }, params.row.debt.toFixed(2));
              } else {
                return h('span', params.row.debt);
              }
            }
          },
          {
						title: this.$t('addSettlement.colTit7'),
						width: 60,
						align: 'right',
						key: 'amount',
            render: (h, params) => {
              if (params.row.key) {
                return h('span', params.row.amount.toFixed(2))
              } else {
                return h('span', params.row.amount)
              }
            }
          }
				],
        data: [],
				cardBox: [],
				formShow: {},
        formSave: {},
        coinName: '',
      }
    },
    created() {
      this.getList();
      this.getCoinName();
    },
    methods: {
      getList() {
        let _vm = this
        _vm.$store.dispatch('setPageLoading', -1)
        _vm.$http.getPage({
          url: 'guard-webManager/cashierDesk/getSettlementRecord.jhtml',
          success: function (res) {
            let cardList = res.data.content.cardCategoryList || [];
            const _data = res.data.content.cashierList.map(item => {
              item.virtualCurrencyBalance = Number.isFinite(item.virtualCurrencyBalance) ? item.virtualCurrencyBalance : 0;
              let _obj = {...item};
              cardList.map(card => {
                _obj['card' + card.id] = 0;
              });
              _obj.key = true;
              for (let i = 1; i <= 5; i++) {
                if(Number.isFinite(item['cardcategory' + i + 'id'])) {
                  _obj['card' + item['cardcategory' + i + 'id']] = item['card' + i];
                }
              }
              return _obj;
            }) || [];
            // 合计
            let _count = {
              cash: _data.reduce((pre, cur) => cur.cash + pre, 0).toFixed(2),
              coupon: _data.reduce((pre, cur) => cur.coupon + pre, 0).toFixed(2),
              deposit: _data.reduce((pre, cur) => cur.deposit + pre, 0).toFixed(2),
              debt: _data.reduce((pre, cur) => cur.debt + pre, 0).toFixed(2),
              amount: _data.reduce((pre, cur) => cur.amount + pre, 0).toFixed(2),
              virtualCurrencyBalance: _data.reduce((pre, cur) => cur.virtualCurrencyBalance + pre, 0).toFixed(2)
            };
            _vm.initCol(_data, cardList);
            _vm.cardBox = cardList.map(item => {
              _count['card' + item.id] = _data.reduce((pre, cur) => cur['card' + item.id] + pre, 0).toFixed(2);
              //顶部展示合计支付方式
              return {
                name: item.name,
                amount: _count['card' + item.id]
              };
            });
            const props = Object.keys(_count);
            _count.key = false;
            _data.push(_count);
            const _col = _vm.tableCount(_data, props);
            _col.map(item => {
              const index = _vm.col.findIndex(col => col.key === item.key);
              console.log(item)
              if(index >= 0) {
                _vm.col[index].width = item.width;
              }
            });
            _vm.data = [..._data];
            _count.amountReal = res.data.content.amount || '0.00';
            _count.debtReal = res.data.content.debtAmount || '0.00';
            _count.sum = res.data.content.sum || '';
            _vm.formShow = _count;
            _vm.formSave = {
              cash: res.data.content.cash,
              card: res.data.content.card,
              start: res.data.content.start,
              end: res.data.content.end,
              virtualCurrency: _count.virtualCurrencyBalance
            };
            _vm.$store.dispatch('setPageLoading', 1);
          },
          error: function (res) {
            console.log(res);
          }
        });
      },
      getCoinName() {
        let _vm = this;
        _vm.$http.get({
          url: 'guard-webManager/distributionSet/getVirtualcurrencyName.jhtml',
          success: function (res) {
            if(res.data.code === 0) {
              _vm.coinName = res.data.content ? res.data.content : '虚拟币';
              _vm.col.find(item => item.key === 'virtualCurrencyBalance').title = _vm.coinName;
            }
          },
          error: function (res) {
            console.log(res);
          }
        })
      },
			initCol(dataList, cardList) {
				let _columns = this.col.splice(0, 6);
				let _colBox = cardList.map(item => {
					return {
						title: item.name,
						width: 60,
						align: 'right',
						key: 'card' + item.id,
						render: (h, params) => {
							if(params.row.key) {
								return h('span', params.row['card' + item.id].toFixed(2));
							} else {
								return h('span', params.row['card' + item.id]);
							}
						}
					}
				});
				this.col = [..._columns, ..._colBox, ...this.col2];
			}, 
      save() {
        let _vm = this;
        _vm.saveLoad = true;
        _vm.$http.post({
          url: 'guard-webManager/cashierDesk/addSettlement.jhtml',
          data: _vm.formSave,
          success: function (res) {
            if (res.data.code === 0) {
              console.log(res)
              let breadData = [
								{
                  url: '/desktop',
                  text: 'layoutNav.desk'
                },
                {
                  url: '/cashierDesk',
                  text: 'layoutNav.cashierDesk'
                },
                {
                  url: '/printView',
                  text: 'printView.tit'
                }
              ]
              _vm.$store.dispatch('setBreadData', breadData)
              _vm.$router.push({
                path: '/printView',
                query: {
                  id: res.data.content.id,
                  type: res.data.content.type,
                }
              })
            } else {
              _vm.$Notice.error({
                title: _vm.$t('publicSet.noticeTit'),
                desc: res.data.desc
              });
              _vm.saveLoad = false
            }
          },
          error: function (res) {
            console.log(res);
          }
        });
      },
      back() {
        this.$router.back(-1)
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
