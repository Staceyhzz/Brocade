/** 
 * 添加发票页面 
 */

<template>
  <div class="container-box">
    <div class="container-header">
      <h2>{{$t('billAdd.tit')}}</h2>
    </div>
    <div class="container-body">
      <Form :label-width="100" ref="formValidate" :model="formValidate" label-position="right" :rules="ruleForm">
        <Form-item :label="$t('cashierDesk.colTit3')">
          <span>{{formValidate.customerName}}({{formValidate.customerId}})</span>
        </Form-item>
        <Form-item :label="$t('billAdd.label')" prop="code" required style='width:400px;'>
          <Input v-model="formValidate.code" :placeholder="$t('placeholderPublic.input')" :maxlength='20'></Input>
        </Form-item>
        <Form-item :label="$t('labelPublic.mc')" prop="name" style='width:400px;'>
          <Input v-model="formValidate.name" :placeholder="$t('placeholderPublic.input')" :maxlength='20'></Input>
        </Form-item>
        <Form-item :label="$t('cashierDesk.colTit4')" prop="amount" required>
          <cmptInputNumber :max='1000000' :min="0" v-model="formValidate.amount" style="width:300px" @on-change='setAmount'></cmptInputNumber>
        </Form-item>
        <Form-item :label="$t('labelPublic.ms')" prop="remark">
          <Input v-model="formValidate.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :maxlength='100' :placeholder="$t('placeholderPublic.input')"></Input>
        </Form-item>
        <Form-item :label="$t('cashierDesk.colTit12')" prop="detailListStr" required>
          <Row>
            <Col span="20">
            <Table stripe :columns="col" :data="data"></Table>
            </Col>
            <Col span="3" offset="1" class='table-left-btn'>
            <Button type="primary" icon="plus-round" @click='add'>{{$t('publicSet.add')}}</Button>
            <Button type="primary" icon="refresh" @click='clean'>{{$t('publicSet.clean')}}</Button>
            </Col>
          </Row>
        </Form-item>
      </Form>
      <div class="footer-btnGroup">
        <Button type="primary" icon="checkmark" @click='save' :loading='saveLoad'>{{$t('publicSet.save')}}</Button>
        <Button type="primary" icon="android-arrow-back" @click='back'>{{$t('publicSet.back')}}</Button>
      </div>
      <Modal :title="$t('billAdd.valid2')" v-model="modalEdit" width='800' :closable="false" @on-ok="ok" class-name="vertical-center-modal">
        <Table height="350" stripe :columns="col1" :data="data1" @on-selection-change='change'></Table>
      </Modal>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      const validateName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('billAdd.valid1')));
        } else {
          callback();
        }
      };
      const validateList = (rule, value, callback) => {
        if (this.data.length === 0) {
          callback(new Error(this.$t('billAdd.valid2')));
        } else {
          callback();
        }
      };
      return {
        col: [
					{
            title: this.$t('billAdd.colTit1'),
            width: 80,
            render: (h, params) => {
							if(params.row.orderPaidTime) {
								const _text = params.row.orderPaidTime.split(' ')[0];
								return h('span', _text);
							}
            }
          },
          {
            title: this.$t('labelPublic.mc'),
            width: 60,
            key: 'chargeName'
          },
          {
            title: this.$t('cashierDesk.colTit8'),
            width: 60,
            key: 'num'
          },
          {
            title: this.$t('billAdd.colTit2'),
						width: 100,
						align: 'right',
            render: (h, params) => {
							if(Number.isFinite(params.row.finalPrice)) {
								return h('span', params.row.finalPrice.toFixed(2));
							}
            }
          },
          {
            title: this.$t('billAdd.colTit3'),
						width: 100,
						align: 'right',
            render: (h, params) => {
							if(Number.isFinite(params.row.couponAmount)) {
								return h('span', params.row.couponAmount.toFixed(2));
							}
            }
          },
          {
            title: this.$t('billAdd.colTit4'),
						width: 100,
						align: 'right',
            render: (h, params) => {
							if(Number.isFinite(params.row.couponAmount)) {
								return h('span', params.row.noCouponAmount.toFixed(2));
							}
            }
          },
          {
            title: this.$t('publicSet.tableAction'),
            key: 'action',
            width: 80,
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small',
                    icon: 'ios-trash-outline'
                  },
                  on: {
                    click: () => {
                      this.remove(params.index)
                    }
                  }
                }, this.$t('publicSet.del'))
              ])
            }
          }
        ],
        data: [],
        selectBox: [],
        col1: [
					{
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: this.$t('billAdd.colTit1'),
            width: 80,
            render: (h, params) => {
							if(params.row.orderPaidTime) {
								const _text = params.row.orderPaidTime.split(' ')[0];
								return h('span', _text);
							}
            }
          },
          {
            title: this.$t('labelPublic.mc'),
            width: 60,
            key: 'chargeName'
          },
          {
            title: this.$t('cashierDesk.colTit8'),
            width: 60,
            key: 'num'
          },
          {
            title: this.$t('billAdd.colTit2'),
						width: 100,
						align: 'right',
            render: (h, params) => {
							if(Number.isFinite(params.row.finalPrice)) {
								return h('span', params.row.finalPrice.toFixed(2));
							}
            }
          },
          {
            title: this.$t('billAdd.colTit3'),
						width: 100,
						align: 'right',
            render: (h, params) => {
							if(Number.isFinite(params.row.couponAmount)) {
								return h('span', params.row.couponAmount.toFixed(2));
							}
            }
          },
          {
            title: this.$t('billAdd.colTit4'),
						width: 100,
						align: 'right',
            render: (h, params) => {
							if(Number.isFinite(params.row.couponAmount)) {
								return h('span', params.row.noCouponAmount.toFixed(2));
							}
            }
          },
        ],
        data1: [],
        modalEdit: false,
        saveLoad: false,
        formValidate: {
          customerId: '',
          customerName: '',
          code: '',
          name: '',
          remark: '',
          amount: 0,
          detailListStr: '',
        },
        ruleForm: {
          code: [{
            validator: validateName,
            trigger: 'blur'
          }],
          detailListStr: [{
            validator: validateList,
            trigger: 'change'
          }],
        },
      }
    },
    created() {
      this.getId();
    },
    methods: {
      getId() {
        let _vm = this
        _vm.$store.dispatch('setPageLoading', -1)
        _vm.$http.getPage({
          url: 'guard-webManager/cashierDesk/billAdd.jhtml',
          data: {
            customerId: _vm.$route.query.id
          },
          success: function (res) {
            console.log(res)
            _vm.formValidate.customerId = res.data.content.Customer.id || '';
            _vm.formValidate.customerName = res.data.content.Customer.name || '';
            _vm.data1 = res.data.content.OrderDetailList || [];
            _vm.$store.dispatch('setPageLoading', 1);
          },
          error: function (res) {
            console.log(res);
          }
        });
      },
      add() {
        this.modalEdit = true;
      },
      clean() {
        this.data.splice(0);
      },
      remove(index) {
        this.data.splice(index, 1);
      },
      change(data) {
        this.selectBox = data;
      },
      setAmount(val) {
        this.$nextTick(() => {
          this.formValidate.amount = parseFloat((val).toFixed(2));
        })
      },
      ok() {
				this.selectBox.map(item => {
					const index = this.data.findIndex(c => c.id === item.id);
					if(index < 0) {
						this.data.push(item);
					}
				});
				this.modalEdit = false;
				this.$refs.formValidate.validateField('detailListStr');
      },
      save() {
        let _vm = this;
        _vm.$refs['formValidate'].validate((valid) => {
          if (valid) {
            _vm.formValidate.detailListStr = JSON.stringify(_vm.data.map(item => {
							return {
								orderDetailID: item.id
							};
						}));
            _vm.saveLoad = true
            _vm.$http.post({
              url: 'guard-webManager/cashierDesk/addBill.jhtml',
              data: _vm.formValidate,
              success: function (res) {
                if (res.data.code === 0) {
									_vm.$router.push('/cashierDesk');
									_vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('publicSet.noticeSuccess')
                  });
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
          }
        })
      },
      back() {
        this.$router.back(-1)
      }
    }
  }

</script>
