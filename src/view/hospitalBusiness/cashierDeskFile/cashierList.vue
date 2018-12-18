/** 
 * 收银记录 
 */

<template>
  <div class="container-box">
    <div class="container-header">
      <h2>{{$t('cashierDesk.btn2')}}</h2>
      <ul class="header-btn-group">
        <li class="header-item" @click="back">
          <Icon type="android-arrow-back"></Icon>{{$t('publicSet.back')}}
				</li>
      </ul>
    </div>
    <div class="container-body">
      <Form :label-width="90" ref='formSearch' :model='formSearch' :rules="ruleForm">
				<Row type="flex" justify="start">
          <Col :xs='24' :sm='12' :md="8" :lg="6">
						<Form-item :label="$t('cashierDesk.colTit14')" prop='startTime'>
							<Date-picker :transfer='true' type="daterange" placement="bottom-start" :placeholder="$t('settlementList.placeholder')" style="width: 100%" @on-change='setTime' ref='clearDate'></Date-picker>
						</Form-item>
					</Col>
					<Col :xs='24' :sm='12' :md="8" :lg="6">
						<Form-item :label="$t('labelPublic.gkbh')" prop='customerId'>
							<Input v-model.trim="formSearch.customerId" :placeholder="$t('placeholderPublic.input')" :maxlength='15' @on-enter="getList('1', '10', formSearch)"></Input>
						</Form-item>
					</Col>
					<Col :xs='24' :sm='12' :md="8" :lg="6">
						<Form-item :label="$t('labelPublic.gkxm')" prop='customerName'>
							<Input v-model.trim="formSearch.customerName" :placeholder="$t('placeholderPublic.input')" :maxlength='20' @on-enter="getList('1', '10', formSearch)"></Input>
						</Form-item>
					</Col>
					<Col :xs='24' :sm='12' :md="8" :lg="6">
						<Form-item :label="$t('cashierDesk.colTit13')" prop='no'>
							<Input v-model.trim="formSearch.no" :placeholder="$t('placeholderPublic.input')" :maxlength='15' @on-enter="getList('1', '10', formSearch)"></Input>
						</Form-item>
					</Col>
					<Col :xs='24' :sm='12' :md="8" :lg="6">
						<ul class="header-btn-group">
							<li class="header-item" @click="getList('1', '10', formSearch)">
								<Icon type="search"></Icon>{{$t('publicSet.search')}}</li>
							<li class="header-item" @click="handleReset('formSearch')">
								<Icon type="refresh"></Icon>{{$t('publicSet.reset')}}</li>
						</ul>
					</Col>
				</Row>
      </Form>
      <Table stripe :columns="col" :data="data"></Table>
      <div class="table-page">
        <div class="table-info">{{$t('publicSet.pageMsg', [pageNumber, totalPages, total])}}</div>
        <Page class="table-paginate" :total="total" @on-change='changePage' :current='pageNumber' show-elevator></Page>
      </div>
    </div>
  </div>
</template>

<script>
	import resizeTime from 'components/tableResizeTime.vue';
  import resizeCus from 'components/tableResizeCus.vue';
  export default {
		name: 'view_cashierList',
		components: {resizeTime, resizeCus},
    data() {
      const validateId = (rule, value, callback) => {
        if ((/[^\d]/g).test(value)) {
          callback(new Error(this.$t('validPublic.number')));
        } else {
          callback()
        }
      }
      return {
        col: [
					{
            title: this.$t('labelPublic.xh'),
            width: 60,
            render: (h, params) => {
              const _index = (this.pageNumber - 1) * 10
              return h('span', params.index + 1 + _index)
            }
          },
          {
            title: this.$t('cashierDesk.colTit2'),
            width: 60,
            render: (h, params) => {
              const index = this.orderTypeList.findIndex(item => item.id === params.row.ordertype);
              if(index >= 0) {
                return h('span', this.$t(this.orderTypeList[index].lang));
              }
            }
          },
          {
            title: this.$t('labelPublic.zt'),
            width: 50,
            render: (h, params) => {
              const color = params.row.status === 1 
                ? '#4172F6' 
                : '#FF6F76';
              const text = params.row.status === 1 
                ? this.$t('cashierDesk.colTit19') 
                : this.$t('cashierDesk.colTit20');
              return h('span', {
                style: {
                  color: color
                }
              }, text);
            }
          },
          {
            title: this.$t('cashierDesk.colTit13'),
            width: 60,
            key: 'no',
          },
          {
						title: this.$t('cashierDesk.colTit3'),
            width: 60,
            render: (h, params) => {
              if(params.row.ordertype !== 7) {
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
              } else {
                return h('span', `渠道商 (${params.row.distributionUserName})`)
              }
            }
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
            title: this.$t('cashierDesk.colTit15'),
						width: 60,
            key: 'createUserName'
          },
          {
            title: this.$t('cashierDesk.label3'),
						width: 60,
						align: 'right',
						key: 'amount',
            render: (h, params) => {
							if(Number.isFinite(params.row.amount)) {
								return h('span', params.row.amount.toFixed(2));
							}
            }
          },
          {
            title: this.$t('cashierDesk.colTit16'),
						width: 60,
						align: 'right',
						key: 'all'
          },
          {
            title: this.$t('cashierDesk.label4'),
						width: 60,
						align: 'right',
						key: 'cash',
            render: (h, params) => {
							if(Number.isFinite(params.row.cash)) {
								return h('span', params.row.cash.toFixed(2))
							}
            }
          },
          {
            title: '虚拟币',
						width: 60,
						align: 'right',
						key: 'virtualCurrencyBalance',
            render: (h, params) => {
							if(Number.isFinite(params.row.virtualCurrencyBalance)) {
								return h('span', params.row.virtualCurrencyBalance.toFixed(2))
							}
            }
          },
          {
            title: this.$t('cashierDesk.label5'),
						width: 60,
						align: 'right',
						key: 'card',
            render: (h, params) => {
							if(Number.isFinite(params.row.card)) {
								return h('span', params.row.card.toFixed(2))
							}
            }
          },
          {
            title: this.$t('cashierDesk.colTit17'),
						width: 60,
            render: (h, params) => {
              let _text = [];
              if (typeof params.row.cardCategory1Name === 'string') {
                _text.push(params.row.cardCategory1Name);
              }
              if (typeof params.row.cardCategory2Name === 'string') {
                _text.push(params.row.cardCategory2Name);
              }
              if (typeof params.row.cardCategory3Name === 'string') {
                _text.push(params.row.cardCategory3Name);
              }
              if (typeof params.row.cardCategory4Name === 'string') {
                _text.push(params.row.cardCategory4Name);
              }
              if (typeof params.row.cardCategory5Name === 'string') {
                _text.push(params.row.cardCategory5Name);
              }
              return h('ul', _text.map(item => {
                return h('li', item);
              }))
            }
          },
          {
            title: this.$t('cashierDesk.label9'),
						width: 60,
						align: 'right',
						key: 'deposit',
            render: (h, params) => {
							if(Number.isFinite(params.row.deposit)) {
								return h('span', params.row.deposit.toFixed(2))
							}
            }
          },
          {
            title: this.$t('cashierDesk.label10'),
						width: 60,
						align: 'right',
						key: 'coupon',
            render: (h, params) => {
							if(Number.isFinite(params.row.coupon)) {
								return h('span', params.row.coupon.toFixed(2))
							}
            }
          },
          {
            title: this.$t('cashierDesk.colTit18'),
						width: 60,
						align: 'right',
						key: 'debt',
            render: (h, params) => {
							if(Number.isFinite(params.row.debt)) {
								return h('span', params.row.debt.toFixed(2))
							}
            }
          },
          {
            title: this.$t('labelPublic.ms'),
						width: 60,
            key: 'remark'
          },
          {
            title: this.$t('publicSet.tableAction'),
            key: 'action',
            width: 80,
            render: (h, params) => {
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
        ],
        data: [],
        total: 0,
        totalPages: 1,
        pageNumber: 1,
        formSearch: {
          startTime: '',
          endTime: '',
          customerId: '',
          customerName: '',
          no: '',
        },
        ruleForm: {
          customerId: [{
            validator: validateId,
            trigger: 'blur'
          }],
        },
      }
		},
		computed: {
      orderTypeList () {
        return this.$store.getters.getOrderTypeList;
      },
      langRouterKey () {
        return this.$store.getters.getLandRouterKey;
      },
		},
		watch: {
      langRouterKey (val) {
        if(val === 'cashierList') {
          this.getList(this.pageNumber, 10, this.formSearch);
        }
      },
    },
    activated() {
      console.log(111111111)
      this.getList(this.pageNumber, 10, this.formSearch);
      this.getCoinName();
    },
    methods: {
      getList(pageNumber, pageSize, form) {
        let _vm = this
        _vm.$refs['formSearch'].validate((valid) => {
          if (valid) {
            _vm.$store.dispatch('setPageLoading', -1)
            form['pageIndex'] = pageNumber
            form['pageSize'] = pageSize
            _vm.$http.getPage({
              url: 'guard-webManager/cashierDesk/cashierList.jhtml',
              data: form,
              success: function (res) {
                let _data = res.data.content.content.map(item => {
                  return {
                    ...item,
                    all: Number.isFinite(item.card) && Number.isFinite(item.cash) && Number.isFinite(item.virtualCurrencyBalance)
                      ? (item.card + item.cash + item.virtualCurrencyBalance).toFixed(2)
                      : '0.00'
                  };
                }) || [];
                const _col = _vm.tableCount(_data, ['amount', 'all', 'cash', 'virtualCurrencyBalance', 'card', 'deposit', 'coupon', 'dept']);
                _col.map(item => {
                  const index = _vm.col.findIndex(col => col.key === item.key);
                  console.log(item)
                  if(index >= 0) {
                    _vm.col[index].width = item.width;
                  }
                });
                if(_vm.langRouterKey !== 'cashierList') {
                  _vm.data = _data;
                } else {
                  _vm.requestList(_data, ['cardCategory1Name', 'cardCategory2Name', 'cardCategory3Name', 'cardCategory4Name', 'cardCategory5Name', 'remark']).then(res => _vm.data = res);
                }
                _vm.total = res.data.content.total || 0;
                _vm.pageNumber = res.data.content.pageNumber || 1;
                _vm.totalPages = res.data.content.totalPages || 1;
                console.log(res)
                _vm.$store.dispatch('setPageLoading', 1);
              },
              error: function (res) {
                console.log(res);
              }
            })
          }
        })
      },
      getCoinName() {
        let _vm = this;
        _vm.$http.get({
          url: 'guard-webManager/distributionSet/getVirtualcurrencyName.jhtml',
          success: function (res) {
            if(res.data.code === 0) {
              _vm.col.find(item => item.key === 'virtualCurrencyBalance').title = res.data.content ? res.data.content : '虚拟币';
            }
          },
          error: function (res) {
            console.log(res);
          }
        })
      },
      setTime(date) {
        this.formSearch.startTime = date[0]
        this.formSearch.endTime = date[1]
      },
      changePage(num) {
        this.getList(num, '10', this.formSearch)
      },
      handleReset(name) {
        this.$refs[name].resetFields();
        this.$refs['clearDate'].handleClear()
        this.getList(1, '10', this.formSearch)
      },
      back() {
        this.$router.back(-1)
      },
      //跳转客户详情
      toCusIndex(id, name) {
        const breadData = [
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
      //打印
      toPrint(data) {
        let _type = ''
        if (data.ordertype === 1) {
          _type = 'order'
        } else if (data.ordertype === 3) {
          _type = 'depositOrder'
        } else if (data.ordertype === 4) {
          _type = 'backOrder'
        } else if (data.ordertype === 5) {
          _type = 'depositRebateOrder'
        } else if (data.ordertype === 10) {
          _type = 'repaymentOrder'
        } else if(data.ordertype === 7) {
          _type = 'channelRecharge'
        }
        let breadData = [{
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
            type: _type,
          }
        })
      },
    }
  }

</script>
