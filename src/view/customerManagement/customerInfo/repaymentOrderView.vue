/** 
 * 查看还款单页面 
 */

<template>
  <div class="container-box userPower">
    <div class="container-header">
      <h2>{{$t('indexOrder.check3')}}</h2>
    </div>
    <div class="container-body">
      <h3 class="oreder-tit">{{$t('indexOrder.tit3')}}</h3>
      <Form ref="formValidate" :model="formValidate" :label-width="100" label-position="right">
        <Row type="flex" justify="start">
          <Col :xs='24' :sm='12' :md="8" :lg="6">
            <Form-item :label="$t('indexOrder.colTit13')">
              <span>{{formValidate.hospitalName}}</span>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6">
            <Form-item :label="$t('indexOrder.colTit19')">
              <span>{{formValidate.createtime}}</span>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6">
            <Form-item :label="$t('indexOrder.colTit18')">
              <span>{{formValidate.createUserName}}</span>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6">
            <Form-item :label="$t('indexOrder.colTit15')">
              <span>{{formValidate.amount}}</span>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6">
            <Form-item :label="$t('indexOrder.colTit16')">
              <span>{{formValidate.return}}</span>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6">
            <Form-item :label="$t('repaymentOrderView.colTit3')">
              <span>{{formValidate.cash}}</span>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6">
            <Form-item :label="$t('repaymentOrderView.colTit4')">
              <span>{{formValidate.card}}</span>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='24' :md="24" :lg="24">
            <Form-item :label="$t('labelPublic.ms')">
              <span>{{formValidate.remark}}</span>
            </Form-item>
          </Col>
        </Row>
      </Form>
      <Table :columns="col" :data="data" stripe></Table>
      <div class="footer-btnGroup">
        <Button type="primary" icon="android-arrow-back" @click='back'>{{$t('publicSet.back')}}</Button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        customerName: '',
        customerId: '',
        formValidate: {},
        data: [],
        col: [
          {
            title: this.$t('orderView.colTit1'),
            width: 60,
            key: 'chargeID'
          },
          {
            title: this.$t('orderView.colTit2'),
            width: 60,
            key: 'chargeName'
          },
          {
            title: this.$t('indexOrder.colTit12'),
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
            title: this.$t('repaymentOrderView.colTit1'),
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
            title: this.$t('repaymentOrderView.colTit2'),
            width: 60,
            key: 'return',
            align: 'right',
            render: (h, params) => {
              if(Number.isFinite(params.row.return)) {
                return h('span', params.row.return.toFixed(2));
              }
            }
          },
          {
            title: this.$t('repaymentOrderView.colTit3'),
            width: 60,
            key: 'cashamount',
            align: 'right',
            render: (h, params) => {
              if(Number.isFinite(params.row.cashamount)) {
                return h('span', params.row.cashamount.toFixed(2));
              }
            }
          },
          {
            title: this.$t('repaymentOrderView.colTit4'),
            width: 60,
            key: 'cardamount',
            align: 'right',
            render: (h, params) => {
              if(Number.isFinite(params.row.cardamount)) {
                return h('span', params.row.cardamount.toFixed(2));
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
        if(val === 'repaymentOrderView') {
          this.getId();
        }
      },
    },
    created() {
      this.customerId = sessionStorage.getItem('cusId');
      this.customerName = sessionStorage.getItem('cusName');
      this.getId();
    },
    methods: {
      // 判断权限
      getId() {
        let _vm = this;
        _vm.$store.dispatch('setPageLoading', -1);
        _vm.$http.getPage({
          url: 'guard-webManager/customerRecord/repaymentOrder.jhtml',
          data: {
            id: _vm.$route.query.id
          },
          success: function (res) {
            const obj = res.data.content.cashier || {};
            const show = {
              hospitalName: obj.hospitalName || '',
              createtime: obj.createtime || '',
              createUserName: obj.createUserName || '',
              amount: Number.isFinite(obj.amount)
                ? obj.amount.toFixed(2)
                : 0,
              debt: Number.isFinite(obj.debt)
                ? obj.debt.toFixed(2)
                : 0,
              return: Number.isFinite(obj.amount) && Number.isFinite(obj.debt)
                ? (obj.amount - obj.debt).toFixed(2)
                : 0,
              cash: Number.isFinite(obj.cash)
                ? obj.cash.toFixed(2)
                : 0,
              card: Number.isFinite(obj.card)
                ? obj.card.toFixed(2)
                : 0,
              remark: obj.remark || ''
            };
            const data = obj.detailList.map(item => {
              item.return = 0;
              if(Number.isFinite(item.amount) && Number.isFinite(item.debtamount)) {
                item.return = item.amount - item.debtamount;
              }
              return item;
            }) || [];
            const _col = _vm.tableCount(data, ['amount', 'return', 'finalPrice', 'cashamount', 'cardamount']);
            _col.map(item => {
              const index = _vm.col.findIndex(col => col.key === item.key);
              console.log(item)
              if(index >= 0) {
                _vm.col[index].width = item.width;
              }
            });
            if(_vm.langRouterKey !== 'repaymentOrderView') {
              _vm.data = data;
              _vm.formValidate = show;
            } else {
              _vm.requestList([show], ['remark']).then(res => _vm.formValidate = res[0]);
              _vm.requestList(data, ['chargeName']).then(res => _vm.data = res);
            }
						_vm.$store.dispatch('setPageLoading', 1);
          },
          error: function (res) {
            console.log(res);
          }
        });
      },
      back() {
        this.$router.back(-1);
      }
    }
  }

</script>
