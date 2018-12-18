/** 
 * 查看预收款订单页面 
 */

<template>
  <div class="container-box userPower">
    <div class="container-header">
      <h2>{{$t('indexOrder.check1')}}</h2>
    </div>
    <div class="container-body">
      <h3 class="oreder-tit">{{$t('indexOrder.tit1')}}</h3>
      <Form ref="formValidate" :model="formValidate" :label-width="100" label-position="right">
        <Row type="flex" justify="start">
          <Col :xs='24' :sm='12' :md="8" :lg="6">
            <Form-item :label="$t('indexOrder.colTit1')">
              <span>{{formValidate.hospitalName}}</span>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6">
            <Form-item :label="$t('indexOrder.colTit4')">
              <span>{{formValidate.createtime}}</span>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6">
            <Form-item :label="$t('indexOrder.colTit3')">
              <span>{{formValidate.createUserName}}</span>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6">
            <Form-item :label="$t('indexOrder.colTit5')">
              <span>{{formValidate.amount}}</span>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6">
            <Form-item :label="$t('indexOrder.colTit6')">
              <span :style="{color: payColor}">{{payName}}</span>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6">
            <Form-item :label="$t('indexOrder.colTit7')">
              <span>{{formValidate.paidtime}}</span>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='24' :md="24" :lg="24">
            <Form-item :label="$t('labelPublic.ms')">
              <span>{{formValidate.remark}}</span>
            </Form-item>
          </Col>
        </Row>
      </Form>
      <Table :columns="col" stripe :data="data"></Table>
      <p>{{$t('depositOrderView.count')}}{{formValidate.amount}}</p>
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
            title: this.$t('depositOrderView.colTit'),
            key: 'chargeName'
          },
          {
            title: this.$t('depositOrderAdd.colTit1'),
            render: (h, params) => {
              if(Number.isFinite(params.row.price)) {
                return h('span', params.row.price.toFixed(2));
              }
            }
          },
          {
            title: this.$t('depositOrderAdd.colTit5'),
            key: 'num'
          },
          {
            title: this.$t('indexOrder.colTit5'),
            render: (h, params) => {
              if(Number.isFinite(params.row.total)) {
                return h('span', params.row.total.toFixed(2));
              }
            }
          }
        ]
      }
    },
    computed: {
      payName() {
        const _text = this.formValidate.paidstatus === 1 
          ? this.$t('indexOrder.paid1')
          : this.formValidate.paidstatus === 2 
          ? this.$t('indexOrder.paid2')
          : this.$t('indexOrder.paid3');
        return _text;
      },
      payColor() {
        const _color = this.formValidate.paidstatus === 1 
          ? '#FF6F76'
          : this.formValidate.paidstatus === 2 
          ? '#4172F6'
          : 'orange';
        return _color;
      },
      langRouterKey () {
        return this.$store.getters.getLandRouterKey;
      },
    },
    watch: {
      langRouterKey (val) {
        if(val === 'depositOrderView') {
          this.getId();
        }
      },
    },
    created() {
      this.customerName = sessionStorage.getItem('cusName');
      this.customerId = sessionStorage.getItem('cusId');
      this.getId();
    },
    methods: {
      // 判断权限
      getId() {
        let _vm = this;
        _vm.$store.dispatch('setPageLoading', -1);
        _vm.$http.getPage({
          url: 'guard-webManager/customerRecord/depositOrder.jhtml',
          data: {
            id: _vm.$route.query.id
          },
          success: function (res) {
            const obj = {
              hospitalName: res.data.content.hospitalName || '',
              createtime: res.data.content.createtime || '',
              createUserName: res.data.content.createUserName || '',
              amount: Number.isFinite(res.data.content.amount)
                ? res.data.content.amount.toFixed(2)
                : 0,
              paidstatus: res.data.content.paidstatus || 1,
              paidtime: res.data.content.paidtime || '',
              remark: res.data.content.remark || ''
            };
            const data = res.data.content.detailList || [];
            if(_vm.langRouterKey !== 'depositOrderView') {
              _vm.data = data;
              _vm.formValidate = obj;
            } else {
              _vm.requestList([obj], ['remark']).then(res => _vm.formValidate = res[0]);
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
