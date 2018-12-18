/** 
 * 退券页面 
 */

<template>
  <div class="container-box userPower">
    <div class="container-header">
      <h2>{{$t('cusNavList.customerRebateCoupon')}}</h2>
    </div>
    <div class="container-body">
      <Form ref="formValidate" :model="formValidate" :rules="ruleForm" :label-width="100" label-position="right">
        <Form-item :label="$t('couponOrderAdd.label1')" prop="couponName" required class='treatAddObj'>
          <Input v-model="formValidate.couponName" readonly icon="ios-search" :placeholder="$t('couponOrderAdd.valid2')" @on-focus="show" style="width:300px"></Input>
        </Form-item>
        <Form-item :label="$t('couponOrderAdd.label2')" prop="amount" required>
          <cmptInputNumber :max="100000000" :min="0" v-model="formValidate.amount" style="width:300px;" @on-change='setPrice'></cmptInputNumber>
        </Form-item>
        <Form-item :label="$t('labelPublic.ms')" prop="content">
          <Input v-model.trim="formValidate.content" type="textarea" :autosize="{minRows: 2,maxRows: 7}" :placeholder="$t('placeholderPublic.input')"></Input>
        </Form-item>
      </Form>
      <div class="footer-btnGroup">
        <Button type="primary" icon="checkmark" @click='save' :loading='saveLoad'>{{$t('publicSet.save')}}</Button>
        <Button type="primary" icon="android-arrow-back" @click='back'>{{$t('publicSet.back')}}</Button>
      </div>
      <Modal :title="$t('couponOrderAdd.valid2')" width='700' v-model="modal" :closable="false" class-name="vertical-center-modal">
        <Table height="350" stripe :columns="col" :data="data" @on-row-click='choose'></Table>
      </Modal>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      const validatePoint = (rule, value, callback) => {
        if (value === 0) {
          callback(new Error(this.$t('couponOrderAdd.valid1')));
        } else {
          callback();
        }
      };
      const validateCou = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('couponOrderAdd.valid2')));
        } else {
          callback();
        }
      };
      return {
        cusName: '',
        saveLoad: false,
        formValidate: {
          customerId: '',
          couponId: '',
          couponName: '',
          amount: 0,
          content: '',
        },
        modal: false,
        col: [
          {
            title: this.$t('couponRebateOrderAdd.colTit1'),
            width: 60,
            key: 'id'
          },
          {
            title: this.$t('couponRebateOrderAdd.colTit2'),
            width: 60,
            key: 'categoryName'
          },
          {
            title: this.$t('couponRebateOrderAdd.colTit3'),
            width: 60,
            key: 'hospitalName'
          },
          {
            title: this.$t('couponRebateOrderAdd.colTit4'),
            width: 100,
            align: 'right',
            render: (h, params) => {
              if(Number.isFinite(params.row.amount)) {
                return h('span', params.row.amount.toFixed(2));
              }
            }
          },
          {
            title: this.$t('couponRebateOrderAdd.colTit5'),
            width: 100,
            align: 'right',
            render: (h, params) => {
              if(Number.isFinite(params.row.rest)) {
                return h('span', params.row.rest.toFixed(2));
              }
            }
          },
          {
            title: this.$t('couponRebateOrderAdd.colTit6'),
            width: 80,
            render: (h, params) => {
              if(params.row.expiration) {
                const text = params.row.expiration.split(' ')[0];
                return h('span', text);
              }
            }
          },
          {
            title: this.$t('labelPublic.zt'),
            width: 70,
            render: (h, params) => {
              const color = params.row.status === 1 
                ? '#4172F6' 
                : '#FF6F76';
              const text = params.row.status === 1 
                ? this.$t('couponRebateOrderAdd.colTit7') 
                : this.$t('couponRebateOrderAdd.colTit8');
              return h('span', {
                style: {
                  color: color
                }
              }, text);
            }
          }
        ],
        data: [],
        ruleForm: {
          amount: [{
            validator: validatePoint,
            trigger: 'change'
          }],
          couponName: [{
            validator: validateCou,
            trigger: 'change'
          }],
        }
      }
    },
    created() {
      this.formValidate.customerId = sessionStorage.getItem('cusId');
      this.cusName = sessionStorage.getItem('cusName');
      this.getId(this.formValidate.customerId);
    },
    methods: {
      // 获取资料
      getId(id) {
        let _vm = this;
        _vm.$store.dispatch('setPageLoading', -1);
        _vm.$http.getPage({
          url: 'guard-webManager/customerRecord/couponRebateOrderAdd.jhtml',
          data: {
            customerId: id
          },
          success: function (res) {
						_vm.$store.dispatch('setPageLoading', 1);
						_vm.data = res.data.content || [];
          },
          error: function (res) {
            console.log(res);
          }
        });
      },
      setPrice(val) {
        this.$nextTick(() => {
          this.formValidate.amount = parseFloat(val.toFixed(0));
        });
      },
      show() {
        this.modal = true;
      },
      choose(data) {
        this.formValidate.couponId = data.id;
        this.formValidate.couponName = data.categoryName;
        this.modal = false;
      },
      save() {
        let _vm = this;
        _vm.$refs['formValidate'].validate((valid) => {
          if (valid) {
            _vm.saveLoad = true;
            _vm.$http.post({
              url: 'guard-webManager/customerRecord/rebateCouponOrder.jhtml',
              data: _vm.formValidate,
              success: function (res) {
                if (res.data.code === 0) {
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
                      url: '/indexAccount',
                      text: _vm.cusName
                    }
                  ];
                  _vm.$store.dispatch('setBreadData', breadData);
                  _vm.$router.push('/indexAccount');
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: res.data.content
                  });
                } else {
                  _vm.$Notice.error({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: res.data.desc
                  });
                  _vm.saveLoad = false;
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
        this.$router.back(-1);
      }
    }
  }

</script>
