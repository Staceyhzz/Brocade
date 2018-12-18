/** 
 * 消费项目页面 
 */

<template>
  <div class="customer-box index-order-detail">
    <Form :label-width="70" inline ref='formSearch' :model='formSearch'>
      <Form-item :label="$t('indexOrderDetail.label1')" prop='startTime'>
        <Date-picker :transfer='true' type="daterange" placement="bottom-start" :placeholder="$t('indexOrderDetail.input')" style="width: 180px" @on-change='setTime' :clearable='false'
          ref='cleanDate'></Date-picker>
      </Form-item>
      <Form-item :label="$t('indexOrderDetail.label2')" prop='type'>
        <Select v-model="formSearch.type" style="width:162px">
          <Option :value="1">{{$t('indexOrderDetail.label3')}}</Option>
          <Option :value="2">{{$t('indexOrderDetail.label4')}}</Option>
          <Option :value="3">{{$t('indexOrderDetail.label5')}}</Option>
        </Select>
      </Form-item>
      <ul class="header-btn-group not-float">
        <li class="header-item" @click="getId(formSearch, 1, 10)">
          <Icon type="search"></Icon>{{$t('publicSet.search')}}</li>
        <li class="header-item" @click="handleReset('formSearch')">
          <Icon type="refresh"></Icon>{{$t('publicSet.reset')}}</li>
      </ul>
    </Form>
    <Alert type="success">
      <p>{{$t('indexOrderDetail.msg1')}}：￥{{formShow.totalFinalPrice}}</p>
      <p>{{$t('indexOrderDetail.msg2')}}：￥{{formShow.totalCashAmount}}；{{$t('indexOrderDetail.msg3')}}：￥{{formShow.totalDepositAmount}}；{{$t('indexOrderDetail.msg4')}}：￥{{formShow.totalCouponAmount}}；{{$t('indexOrderDetail.msg5')}}：￥{{formShow.totalDebtAmount}}</p>
      <p>{{$t('indexOrderDetail.msg6')}}：￥{{formShow.totalBackOrderDetailAmount}}</p>
    </Alert>
    <Table stripe :columns="col" :data="data"></Table>
    <div class="table-page">
      <div class="table-info">{{$t('publicSet.pageMsg', [pageNumber, totalPages, total])}}</div>
      <Page class="table-paginate" :total="total" @on-change='changePage' :current='pageNumber' show-elevator></Page>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        pageNumber: 1,
        totalPages: 1,
        total: 0,
        cusName: '',
        formSearch: {
          customerId: '',
          type: 1,
          startTime: '',
          endTime: '',
        },
        formShow: {
          totalFinalPrice: 0,
          totalCashAmount: 0,
          totalDepositAmount: 0,
          totalCouponAmount: 0,
          totalDebtAmount: 0,
          totalBackOrderDetailAmount: 0,
        },
        data: [],
        col: [
          {
            title: this.$t('labelPublic.xh'),
            type: 'index',
            width: 60,
            render: (h, params) => {
              const _index = (this.pageNumber - 1) * 10;
              return h('span', params.index + 1 + _index);
            }
          },
          {
            title: this.$t('indexOrderDetail.colTit1'),
            width: 60,
            key: 'hospitalName'
          },
          {
            title: this.$t('indexOrderDetail.colTit2'),
            width: 80,
            render: (h, params) => {
              if(params.row.orderPaidTime) {
                const _text = params.row.orderPaidTime.split(' ')[0];
                return h('span', _text);
              }
            }
          },
          {
            title: this.$t('indexOrderDetail.colTit3'),
            width: 60,
            key: 'orderID'
          },
          {
            title: this.$t('indexOrderDetail.colTit4'),
            width: 60,
            key: 'chargeID'
          },
          {
            title: this.$t('indexOrderDetail.colTit5'),
            width: 60,
            key: 'chargeName'
          },
          {
            title: this.$t('labelPublic.gg'),
            width: 60,
            key: 'chargeSize'
          },
          {
            title: this.$t('labelPublic.lx'),
            width: 60,
            key: 'chargeCategoryName'
          },
          {
            title: this.$t('labelPublic.dw'),
            width: 60,
            key: 'chargeUnitName'
          },
          {
            title: this.$t('indexOrderDetail.colTit6'),
            width: 60,
            key: 'num',
          },
          {
            title: this.$t('indexOrderDetail.colTit7'),
            width: 60,
            render: (h, params) => {
              if (params.row.type === 1) {
                const _text = params.row.num - params.row.restNum;
                return h('span', _text);
              } else {
                return h('span', params.row.operationNum);
              }
            }
          },
          {
            title: this.$t('indexOrderDetail.colTit8'),
            width: 60,
            render: (h, params) => {
              const _color = params.row.restNum === 0 
                ? '' 
                : '#FF6F76';
              return h('span', {
                style: {
                  color: _color
                }
              }, params.row.restNum);
            }
          },
          {
            title: this.$t('indexOrderDetail.colTit9'),
            width: 60,
            key: 'doctorUserName'
          },
          {
            title: this.$t('indexOrderDetail.colTit10'),
            width: 60,
            key: 'orderCreateUserName'
          },
          {
            title: this.$t('indexOrderDetail.colTit11'),
            width: 60,
            key: 'finalPrice',
            align: 'right',
            render: (h, params) => {
              if(Number.isFinite(params.row.finalPrice)) {
                return h('span', params.row.finalPrice.toFixed(2));
              }
            }
          },
          {
            title: this.$t('indexOrderDetail.colTit12'),
            width: 60,
            key: 'cashAmount',
            align: 'right',
            render: (h, params) => {
              if(Number.isFinite(params.row.cashAmount)) {
                return h('span', params.row.cashAmount.toFixed(2));
              }
            }
          },
          {
            title: this.$t('indexOrderDetail.colTit13'),
            width: 60,
            key: 'cardAmount',
            align: 'right',
            render: (h, params) => {
              if(Number.isFinite(params.row.cardAmount)) {
                return h('span', params.row.cardAmount.toFixed(2));
              }
            }
          },
          {
            title: this.$t('indexOrderDetail.colTit14'),
            width: 60,
            key: 'depositAmount',
            align: 'right',
            render: (h, params) => {
              if(Number.isFinite(params.row.depositAmount)) {
                return h('span', params.row.depositAmount.toFixed(2));
              }
            }
          },
          {
            title: this.$t('indexOrderDetail.colTit15'),
            width: 60,
            key: 'couponAmount',
            align: 'right',
            render: (h, params) => {
              if(Number.isFinite(params.row.couponAmount)) {
                return h('span', params.row.couponAmount.toFixed(2));
              }
            }
          },
          {
            title: this.$t('indexOrderDetail.colTit16'),
            width: 60,
            key: 'debtAmount',
            align: 'right',
            render: (h, params) => {
              if(Number.isFinite(params.row.debtAmount)) {
                const color = params.row.debtAmount > 0
                  ? '#FF6F76'
                  : '';
                return h('span', {
                  style: {
                    color: color
                  }
                }, params.row.debtAmount.toFixed(2));
              }
            }
          },
          {
            title: this.$t('indexOrderDetail.colTit17'),
            width: 60,
            align: 'right',
            render: (h, params) => {
              const _color = params.row.backNum > 0 
                ? '#FF6F76' 
                : '';
              return h('span', {
                style: {
                  color: _color
                }
              }, params.row.backNum);
            }
          },
          {
            title: this.$t('indexOrderDetail.colTit18'),
            width: 60,
            key: 'backAmount',
            align: 'right',
            render: (h, params) => {
              if(Number.isFinite(params.row.backAmount)) {
                const color = params.row.backAmount > 0
                  ? '#FF6F76'
                  : '';
                return h('span', {
                  style: {
                    color: color
                  }
                }, params.row.backAmount.toFixed(2));
              }
            }
          },
          {
            title: this.$t('publicSet.tableAction'),
            width: 100,
            key: 'action',
            render: (h, params) => {
              if (params.row.type === 1) {
                return h('div', [
                  h('Button', {
                    props: {
                      type: 'primary',
                      size: 'small',
                      icon: 'printer'
                    },
                    on: {
                      click: () => {
                        this.toPrint(params.row)
                      }
                    }
                  }, this.$t('indexOrderDetail.btn'))
                ])
              }
            }
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
        if(val === 'indexOrderDetail') {
          this.getId(this.formSearch, this.pageNumber, 10);
        }
      },
    },
    created() {
      this.formSearch.customerId = sessionStorage.getItem('cusId');
      this.cusName = sessionStorage.getItem('cusName');
      this.getId(this.formSearch, 1, 10);
    },
    methods: {
      // 获取资料
      getId(form, pageNumber, pageSize) {
        let _vm = this;
        form.pageNumber = pageNumber;
        form.pageSize = pageSize;
        _vm.$store.dispatch('setPageLoading', -1)
        _vm.$http.getPage({
          url: 'guard-webManager/customerRecord/getOrderDetail.jhtml',
          data: form,
          success: function (res) {
            const obj = res.data.content || {};
            _vm.formShow = {
              totalFinalPrice: Number.isFinite(obj.totalFinalPrice)
                ? obj.totalFinalPrice.toFixed(2)
                : '0.00',
              totalCashAmount: Number.isFinite(obj.totalCashAmount)
                ? obj.totalCashAmount.toFixed(2)
                : '0.00',
              totalDepositAmount: Number.isFinite(obj.totalDepositAmount)
                ? obj.totalDepositAmount.toFixed(2)
                : '0.00',
              totalCouponAmount: Number.isFinite(obj.totalCouponAmount)
                ? obj.totalCouponAmount.toFixed(2)
                : '0.00',
              totalDebtAmount: Number.isFinite(obj.totalDebtAmount)
                ? obj.totalDebtAmount.toFixed(2)
                : '0.00',
              totalBackOrderDetailAmount:Number.isFinite(obj.totalBackOrderDetailAmount)
                ? obj.totalBackOrderDetailAmount.toFixed(2)
                : '0.00'
            };
						const _page = res.data.content.page || {};
						const _data = _page.content || [];
						_vm.pageNumber = _page.pageNumber || 1;
						_vm.totalPages = _page.totalPages || 1;
            _vm.total = _page.total || 0;
            const _col = _vm.tableCount(_data, ['finalPrice', 'cashAmount', 'cardAmount', 'depositAmount', 'couponAmount', 'debtAmount', 'backAmount']);
            _col.map(item => {
              const index = _vm.col.findIndex(col => col.key === item.key);
              console.log(item)
              if(index >= 0) {
                _vm.col[index].width = item.width;
              }
            });
            if(_vm.langRouterKey !== 'indexOrderDetail') {
              _vm.data = _data;
            } else {
              _vm.requestList(_data, ['chargeName', 'chargeSize', 'chargeCategoryName', 'chargeUnitName']).then(res => _vm.data = res);
            }
						_vm.$store.dispatch('setPageLoading', 1);
          },
          error: function (res) {
            console.log(res)
          }
        })
      },
      setTime(date) {
        this.formSearch.startTime = date[0];
        this.formSearch.endTime = date[1];
      },
      handleReset(name) {
        this.$refs[name].resetFields();
        this.$refs.cleanDate.handleClear();
        this.getId(this.formSearch, 1, 10);
      },
      changePage(num) {
        this.getId(this.formSearch, num, 10);
      },
      toPrint(data) {
        const breadData = [
          {
            url: '/desktop',
            text: 'layoutNav.desk'
          },
          {
            url: '/customerMsg',
            text: this.cusName
          },
          {
            url: '/printView',
            text: 'printView.tit'
          }
        ];
        this.$store.dispatch('setBreadData', breadData);
        this.$router.push({
          path: '/printView',
          query: {
            id: this.formSearch.customerId,
            orderDetailId: data.id,
            type: 'prescription',
          }
        });
      },
    }
  }

</script>
<style scoped>
  .index-order-detail {
    padding-top: 20px;
  }

</style>
