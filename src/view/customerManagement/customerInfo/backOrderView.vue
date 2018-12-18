/** 
 * 查看退项目订单页面 
 */

<template>
  <div class="container-box userPower">
    <div class="container-header">
      <h2>{{$t('indexOrder.check4')}}</h2>
    </div>
    <div class="container-body">
      <h3 class="oreder-tit">{{$t('indexOrder.tit4')}}</h3>
      <Form ref="formValidate" :model="formValidate" :label-width="100" label-position="right">
        <Row type="flex" justify="start">
          <Col :xs='24' :sm='12' :md="8" :lg="6">
            <Form-item :label="$t('indexOrder.colTit1')">
              <span>{{formValidate.hospitalName}}</span>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6">
            <Form-item :label="$t('indexOrder.colTit4')">
              <span>{{formValidate.createTime}}</span>
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
              <span>{{formValidate.paidTime}}</span>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6">
            <Form-item :label="$t('indexOrder.colTit8')">
              <span :style="{color: auditColor}">{{auditName}}</span>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='24' :md="24" :lg="24">
            <Form-item :label="$t('labelPublic.ms')">
              <span>{{formValidate.remark}}</span>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='24' :md="24" :lg="24">
            <Form-item :label="$t('depositRebateOrderView.label2')">
              <span v-if="formValidate.autoApprove === 1">{{$t('depositRebateOrderView.label3')}}</span>
              <Table stripe :columns="col1" :data="auditData" v-else></Table>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='24' :md="24" :lg="24">
            <Form-item :label="$t('depositRebateOrderView.label4')">
              <Table stripe :columns="col" :data="data"></Table>
            </Form-item>
            <Form-item :label="$t('depositOrderView.count')">
              <span style='margin-right:20px;'>{{$t('indexOrder.msg3')}}{{formValidate.amount}}</span>
            </Form-item>
          </Col>
        </Row>
      </Form>
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
        auditData: [],
        data: [],
        col: [
          {
            title: this.$t('orderView.colTit1'),
            key: 'chargeID'
          },
          {
            title: this.$t('orderView.colTit2'),
            key: 'chargeName'
          },
          {
            title: this.$t('orderAdd.label12'),
            key: 'num'
          },
          {
            title: this.$t('indexOrder.colTit5'),
            key: 'amount',
            render: (h, params) => {
              if(Number.isFinite(params.row.amount)) {
                return h('span', params.row.amount.toFixed(2));
              }
            }
          },
        ],
        col1: [
          {
            title: this.$t('depositRebateOrderView.colTit1'),
            key: 'level'
          },
          {
            title: this.$t('depositRebateOrderView.colTit2'),
            key: 'userName'
          },
          {
            title: this.$t('depositRebateOrderView.colTit3'),
            key: 'auditTime'
          },
          {
            title: this.$t('labelPublic.zt'),
            key: 'status',
          },
          {
            title: this.$t('depositRebateOrderView.colTit4'),
            key: 'content',
          }
        ],
      }
    },
    computed: {
      payName() {
        const _text = this.formValidate.paidStatus === 1 
          ? this.$t('indexOrder.paid1')
          : this.formValidate.paidStatus === 2 
          ? this.$t('indexOrder.paid2')
          : this.$t('indexOrder.paid3');
        return _text;
      },
      payColor() {
        const _color = this.formValidate.paidStatus === 1 
          ? '#FF6F76'
          : this.formValidate.paidStatus === 2 
          ? '#4172F6'
          : 'orange';
        return _color;
      },
      auditName() {
        const _text = this.formValidate.auditStatus === 1 
          ? this.$t('indexOrder.audit1')
          : this.formValidate.auditStatus === 3 
          ? this.$t('indexOrder.audit3')
          : this.$t('indexOrder.audit2');
        return _text;
      },
      auditColor() {
        const _color = this.formValidate.auditStatus === 1 
          ? '#FF6F76'
          : this.formValidate.auditStatus === 3 
          ? 'orange'
          : '#4172F6';
        return _color;
      },
      langRouterKey () {
        return this.$store.getters.getLandRouterKey;
      },
    },
    watch: {
      langRouterKey (val) {
        if(val === 'backOrderView') {
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
          url: 'guard-webManager/customerRecord/backOrder.jhtml',
          data: {
            id: _vm.$route.query.id
          },
          success: function (res) {
            const obj = res.data.content.BackOrder || {};
            const list = obj.detailList || [];
            const data = res.data.content.AuditList || [];
            const show = {
              hospitalName: obj.hospitalName || '',
              createTime: obj.createTime || '',
              createUserName: obj.createUserName || '',
              amount: Number.isFinite(obj.amount)
                ? obj.amount.toFixed(2)
                : '0.00',
              paidStatus: obj.paidStatus || 1,
              paidTime: obj.paidTime || '',
              auditStatus: obj.auditStatus || 1,
              autoApprove: obj.autoApprove,
              remark: obj.remark
            };
            if(_vm.langRouterKey !== 'backOrderView') {
              _vm.data = list;
              _vm.auditData = data;
              _vm.formValidate = show;
            } else {
              _vm.requestList([show], ['remark']).then(res => _vm.formValidate = res[0]);
              _vm.requestList(data, ['status', 'content']).then(res => _vm.auditData = res);
              _vm.requestList(list, ['chargeName']).then(res => _vm.data = res);
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
