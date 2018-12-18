/** 
 * 欠款订单记录 
 */

<template>
  <div class="container-box">
    <div class="container-header">
      <h2>{{$t('debtOrder.tit')}}</h2>
      <ul class="header-btn-group">
        <li class="header-item" @click="back">
          <Icon type="android-arrow-back"></Icon>{{$t('publicSet.back')}}</li>
      </ul>
    </div>
    <div class="container-body">
      <Form :label-width="90" inline ref='formSearch' :model='formSearch' :rules="ruleForm">
				<Row type="flex" justify="start">
          <Col :xs='24' :sm='12' :md="8" :lg="6">
						<Form-item :label="$t('debtOrder.colTit1')" prop='startTime'>
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
  export default {
    components: {resizeTime},
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
            title: this.$t('debtOrder.colTit1'),
            width: 80,
            render: (h, params) => {
              if(params.row.paidtime) {
                return h(resizeTime, {
                  props: {
                    time: params.row.paidtime
                  }
                })
              }
            }
          },
          {
            title: this.$t('labelPublic.gkbh'),
            width: 60,
            key: 'customerid',
          },
          {
            title: this.$t('labelPublic.gkxm'),
            width: 60,
            key: 'customerName',
          },
          {
            title: this.$t('debtOrder.colTit2'),
            width: 60,
            key: 'createUserName'
          },
          {
            title: this.$t('debtOrder.colTit3'),
            width: 60,
            key: 'id'
          },
          {
            title: this.$t('debtOrder.colTit4'),
            width: 60,
            key: 'finalprice',
            align: 'right',
            render: (h, params) => {
              if(Number.isFinite(params.row.finalprice)) {
                return h('span', params.row.finalprice.toFixed(2))
              }
            }
          },
          {
            title: this.$t('debtOrder.colTit5'),
            width: 60,
            align: 'right',
            key: 'doNum'
          },
          {
            title: this.$t('debtOrder.colTit6'),
            width: 60,
            align: 'right',
            key: 'debtamount',
            render: (h, params) => {
              if(Number.isFinite(params.row.debtamount)) {
                return h('span', params.row.debtamount.toFixed(2))
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
                      this.toPay(params.row.customerid)
                    }
                  }
                }, this.$t('cashierDesk.btn3'))
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
        },
        ruleForm: {
          customerId: [{
            validator: validateId,
            trigger: 'blur'
          }],
        },
      }
    },
    mounted() {
      this.getList('1', '10', this.formSearch)
    },
    methods: {
      getList(pageNumber, pageSize, form) {
        let _vm = this;
        _vm.$refs['formSearch'].validate((valid) => {
          if (valid) {
            _vm.$store.dispatch('setPageLoading', -1)
            form['pageIndex'] = pageNumber
            form['pageSize'] = pageSize
            _vm.$http.getPage({
              url: 'guard-webManager/cashierDesk/debtOrder.jhtml',
              data: form,
              success: function (res) {
                let _data = res.data.content.content.map(item => {
                  let obj = {...item};
                  obj.doNum = Number.isFinite(item.finalprice - item.debtamount)
                    ? (item.finalprice - item.debtamount).toFixed(2)
                    : '0.00';
                  return obj;
                }) || [];
                const _col = _vm.tableCount(_data, ['finalprice', 'debtamount', 'doNum']);
                _col.map(item => {
                  const index = _vm.col.findIndex(col => col.key === item.key);
                  console.log(item)
                  if(index >= 0) {
                    _vm.col[index].width = item.width;
                  }
                });
                _vm.data = _data
                _vm.total = res.data.content.total
                _vm.pageNumber = res.data.content.pageNumber
                _vm.totalPages = res.data.content.totalPages
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
      //跳转还款详情
      toPay(id) {
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
            url: '/repayment',
            text: 'repayment.tit'
          }
        ];
        this.$store.dispatch('setBreadData', breadData);
        this.$router.push({
          path: '/repayment',
          query: {
            id: id
          }
        })
      },
    }
  }

</script>
