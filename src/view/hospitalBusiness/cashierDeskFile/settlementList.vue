/**
* 结算记录
*/

<template>
	<div class="container-box">
		<div class="container-header">
			<h2>{{$t('cashierDesk.btn1')}}</h2>
			<ul class="header-btn-group">
				<li class="header-item" @click="back"><Icon type="android-arrow-back"></Icon>{{$t('publicSet.back')}}</li>
			</ul>
		</div>
		<div class="container-body">
			<Form :label-width="80" inline ref='formSearch' :model='formSearch' @submit.native.prevent>
				<Form-item :label="$t('settlementList.colTit1')" prop='startTime'>
					<Date-picker :transfer='true' type="daterange" placement="bottom-start" :placeholder="$t('settlementList.placeholder')" style="width: 250px" @on-change='setTime' ref='clearDate'></Date-picker>
				</Form-item>
				<ul class="header-btn-group not-float">
					<li class="header-item" @click="getList(1, 10, formSearch)"><Icon type="search"></Icon>{{$t('publicSet.search')}}</li>
					<li class="header-item" @click="handleReset('formSearch')"><Icon type="refresh"></Icon>{{$t('publicSet.reset')}}</li>
				</ul>
			</Form>
		<Table stripe :columns="columns" :data="data"></Table>
		<div class="table-page">
			<div class="table-info">{{$t('publicSet.pageMsg', [pageNumber, totalPages, total])}}</div>
			<Page class="table-paginate" :total="total" @on-change='changePage' :current='pageNumber' show-elevator></Page>
		</div>
	</div>
</div>
</template>

<script>
	import resizeTime from 'components/tableResizeTime.vue';
	export default {
		components: {resizeTime},
		data () {
			return {
				columns: [
					{
						title: this.$t('settlementList.colTit1'),
						width: 80,
						render: (h, params) => {
							if(!params.row.countKey) {
								return h('span', this.$t('settlementList.colTit6'));
							}
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
						title: this.$t('cashierDesk.colTit22'),
						width: 50,
						key: 'createUserName'
					},
					{
						title: this.$t('settlementList.colTit2'),
						width: 80,
						render: (h, params) => {
							if(params.row.starttime) {
                return h(resizeTime, {
                  props: {
                    time: params.row.starttime
                  }
                })
              }
						}
					},
					{
						title: this.$t('settlementList.colTit3'),
						width: 80,
						render: (h, params) => {
							if(params.row.endtime) {
                return h(resizeTime, {
                  props: {
                    time: params.row.endtime
                  }
                })
              }
						}
					},
					{
						title: this.$t('cashierDesk.label4'),
						key: 'cash',
						align: 'right',
						width: 60,
						render: (h, params) => {
							if(!params.row.countKey) {
								return h('span', params.row.cash);
							}
							if(Number.isFinite(params.row.cash)) {
								return h('span', params.row.cash.toFixed(2));
							}
						}
					},
					{
            title: '虚拟币',
						width: 60,
						align: 'right',
						key: 'virtualCurrency',
            render: (h, params) => {
							if(!params.row.countKey) {
								return h('span', params.row.virtualCurrency);
							}
							if(Number.isFinite(params.row.virtualCurrency)) {
								return h('span', params.row.virtualCurrency.toFixed(2));
							}
						}
          },
				],
				data: [],
				total: 0,
				totalPages: 1,
				pageNumber: 1,
				formSearch: {
					startTime: '',
					endTime: '',
				},
			}
		},
		computed: {
      langRouterKey () {
        return this.$store.getters.getLandRouterKey;
      },
    },
    watch: {
      langRouterKey (val) {
        if(val === 'settlementList') {
          this.getList(this.pageNumber, 10, this.formSearch);
        }
      },
    },
		created () {
			this.getList(1, 10, this.formSearch);
			this.getCoinName();
		},
		methods: {
			getList (pageNumber, pageSize, form) {
				let _vm = this;
				_vm.$store.dispatch('setPageLoading', -1)
				form['pageIndex'] = pageNumber;
				form['pageSize'] = pageSize;
				_vm.$http.getPage({
					url: 'guard-webManager/cashierDesk/settlementList.jhtml',
					data: form,
					success: function(res){
						const _col = res.data.content.cardCategoryList.filter(item => item.status === 1) || [];
						const _unUse = res.data.content.cardCategoryList.filter(item => item.status === 0) || [];
						const _allPay = res.data.content.totalAmount || [];
						let _langCard = res.data.content.cardCategoryList || [];

						let _data = res.data.content.page.content.map(item => {
							item.countKey = true
							return item
						}) || [];
						//已禁用总额
						let unBox = [];
						_allPay.map(item => {
							const index = _unUse.findIndex(un => un.id === item.code * 1);
							if(index >= 0) {
								unBox.push(item);
							}
						});
						//合计信息
						let _obj = {
							cash: (_data.reduce((pre, cur) => cur.cash + pre, 0)).toFixed(2),
							virtualCurrency: (_data.reduce((pre, cur) => cur.virtualCurrency + pre, 0)).toFixed(2),
							all: (_data.reduce((pre, cur) => cur.cash + cur.card + cur.virtualCurrency + pre, 0)).toFixed(2),
							unAllCard: (unBox.reduce((pre, cur) => cur.name * 1 + pre, 0)).toFixed(2)
						};
						_allPay.map(item => {
							_obj['card' + item.code] = (item.name * 1).toFixed(2) * 1;
						});
						//计算数字宽度
						const props = Object.keys(_obj);
						const _columns = _vm.tableCount([_obj], props);
						//翻译
						if(_vm.langRouterKey !== 'settlementList') {
							_vm.initCol(_data, _col, _unUse, _allPay);
							_columns.map(item => {
								const index = _vm.columns.findIndex(col => col.key === item.key);
								console.log(item)
								if(index >= 0) {
									_vm.columns[index].width = item.width;
								}
							});
							_obj.countKey = false;
							_vm.data = [..._data, _obj];
						} else {
							_vm.requestList(_langCard, ['name']).then(res => {
								const u1 = res.filter(item => item.status === 1);
								const u2 = res.filter(item => item.status === 0);
								_vm.initCol(_data, u1, u2, _allPay);
								_columns.map(item => {
									const index = _vm.columns.findIndex(col => col.key === item.key);
									console.log(item)
									if(index >= 0) {
										_vm.columns[index].width = item.width;
									}
								});
								_obj.countKey = false;
								_vm.data = [..._data, _obj];
							});
						}
						_vm.total = res.data.content.page.total || 0;
						_vm.pageNumber = res.data.content.page.pageNumber || 1;
						_vm.totalPages = res.data.content.page.totalPages || 1;
						_vm.$store.dispatch('setPageLoading', 1);
					},
					error: function(res){
						console.log(res);
					}
				});
			},
			initCol (dataList, cardList, unCardList, allList) {
				let _box = this.columns.splice(0, 6);
				cardList.map(item => {
					_box.push({
						title: item.name,
						width: 60,
						align: 'right',
						key: 'card' + item.id,
						render: (h, params) => {
							if(params.row.countKey) {
								const _index = params.row.cardList.findIndex(_card => _card.id === item.id);
								if(_index >= 0) {
									return h('span', params.row.cardList[_index].amount.toFixed(2));
								} else {
									return h('span', '0.00');
								}
							} else {
								const _index = allList.findIndex(_all => _all.code * 1 === item.id);
								if(_index >= 0) {
									return h('span', (allList[_index].name * 1).toFixed(2));
								} else {
									return h('span', '0.00');
								}
							}
						}
					});
				});
				_box.push({
					title: this.$t('settlementList.colTit4'),
					width: 60,
					align: 'right',
					key: 'unAllCard',
					render: (h, params) => {
						if(params.row.countKey) {
							let unBox = [];
							params.row.cardList.map(item => {
								const index = unCardList.findIndex(un => un.id === item.id);
								if(index >= 0) {
									unBox.push(item);
								}
							});
							const sum = unBox.reduce((pre, cur) => cur.amount + pre, 0);
							return h('span', sum.toFixed(2));
						} else {
							let unBox = [];
							allList.map(item => {
								const index = unCardList.findIndex(un => un.id === item.code * 1);
								if(index >= 0) {
									unBox.push(item);
								}
							});
							const sum = unBox.reduce((pre, cur) => cur.name * 1 + pre, 0);
							return h('span', sum.toFixed(2));
						}
					}
				});
				_box.push({
					title: this.$t('settlementList.colTit5'),
					width: 60,
					align: 'right',
					key: 'all',
					render: (h, params) => {
						if(params.row.countKey) {
							return h('span', (params.row.card + params.row.cash + params.row.virtualCurrency).toFixed(2));
						} else {
							const sum = dataList.reduce((pre, cur) => cur.card + cur.cash + cur.virtualCurrency + pre, 0);
							return h('span', sum.toFixed(2));
						}
					}
				});
				_box.push({
					title: this.$t('publicSet.tableAction'),
					key: 'action',
					width: 80,
					render: (h, params) => {
						if(params.row.countKey) {
							return h('div', [
								h('Button', {
									props: {
										type: 'info',
										size: 'small',
										icon: 'printer'
									},
									on: {
										click: () => {
											this.toPrint(params.row)
										}
									}
								}, this.$t('printView.btn'))
								])
						}
					}
				});
				this.columns = [..._box];
			},
			getCoinName() {
        let _vm = this;
        _vm.$http.get({
          url: 'guard-webManager/distributionSet/getVirtualcurrencyName.jhtml',
          success: function (res) {
            if(res.data.code === 0) {
              _vm.columns.find(item => item.key === 'virtualCurrency').title = res.data.content ? res.data.content : '虚拟币';
            }
          },
          error: function (res) {
            console.log(res);
          }
        })
      },
			setTime (date) {
				this.formSearch.startTime = date[0]
				this.formSearch.endTime = date[1]
			},
			changePage (num) {
				this.getList(num, '10', this.formSearch)
			},
			handleReset (name) {
				this.$refs[name].resetFields();
				this.$refs['clearDate'].handleClear();
			},
			back () {
				this.$router.back(-1)
			},
			//打印
			toPrint (data) {
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
				this.$store.dispatch('setBreadData', breadData)
				this.$router.push({
					path: '/printView',
					query: {
						id: data.id,
						type: 'settlement',
					}
				})
			},
		}
	}
</script>