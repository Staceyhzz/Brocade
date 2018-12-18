/** 
 * 退预收款页面 
 */
<template>
  <div class="container-box userPower">
    <div class="container-header">
      <h2>{{$t('cusNavList.customerDepositRebate')}}</h2>
    </div>
    <div class="container-body">
      <Alert type="success">
        <p>{{$t('depositRebateOrderAdd.msg1')}} {{showAmount}}</p>
      </Alert>
      <Form ref="formValidate" :model="formValidate" :label-width="100" label-position="right" :rules="ruleForm">
        <Form-item :label="$t('depositRebateOrderAdd.label')" prop="amount" required>
          <cmptInputNumber :min="0" v-model="formValidate.amount" style='width:300px;' @on-change='setAmount'></cmptInputNumber>
          <span class='prompt'>{{$t('depositRebateOrderAdd.msg2')}}</span>
        </Form-item>
        <Form-item :label="$t('depositOrderView.colTit')" prop="detailListStr" required>
          <Table stripe :columns="col" :data="data"></Table>
        </Form-item>
        <Form-item :label="$t('labelPublic.ms')" prop="remark">
          <Input v-model.trim="formValidate.remark" type="textarea" :autosize="{minRows: 2,maxRows: 7}" :placeholder="$t('placeholderPublic.input')"></Input>
        </Form-item>
      </Form>
      <div class="footer-btnGroup">
        <Button type="primary" icon="checkmark" @click="save" :loading='saveLoad'>{{$t('publicSet.save')}}</Button>
        <Button type="primary" icon="android-arrow-back" @click='back'>{{$t('publicSet.back')}}</Button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      const validateData = (rule, value, callback) => {
        const list = this.data.filter(item => item.backAmount);
        if (list.length === 0) {
          callback(new Error(this.$t('depositOrderAdd.valid')));
        } else {
          callback();
        }
      };
      return {
        cusName: '',
        saveLoad: false,
        formValidate: {
          customerId: '',
          amount: 0,
          remark: '',
          detailListStr: '',
        },
        data: [],
        col: [
          {
            title: this.$t('labelPublic.bh'),
            width: 60,
            key: 'id'
          },
          {
            title: this.$t('labelPublic.mc'),
            width: 80,
            key: 'chargeName'
          },
          {
            title: this.$t('indexOrder.colTit5'),
            width: 100,
            render: (h, params) => {
              if(Number.isFinite(params.row.amount)) {
                return h('span', params.row.amount.toFixed(2));
              }
            }
          },
          {
            title: this.$t('depositRebateOrderAdd.colTit1'),
            width: 100,
            render: (h, params) => {
              if(Number.isFinite(params.row.rest)) {
                return h('span', params.row.rest.toFixed(2));
              }
            }
          },
          {
            title: this.$t('depositRebateOrderAdd.colTit2'),
            width: 100,
            render: (h, params) => {
              return h('cmptInputNumber', {
                props: {
                  size: 'small',
                  min: 0,
                  value: params.row.backAmount,
                  max: params.row.rest,
                },
                on: {
                  'on-change': (val) => {
                    params.row.backAmount = parseFloat((val).toFixed(2));
                    this.data[params.index] = params.row;
                  },
                  'on-blur': () => {
                    this.data.splice(params.index, 1, this.data[params.index]);
                    let _sum = this.data.reduce((pre, cur) => cur.backAmount + pre, 0);
                    this.formValidate.amount = parseFloat(_sum.toFixed(2));
                  }
                }
              })
            }
          }
        ],
        ruleForm: {
          detailListStr: [{
            validator: validateData,
            trigger: 'change'
          }]
        }
      }
    },
    computed: {
      showAmount() {
        const num = this.data.reduce((pre, cur) => cur.backAmount + pre, 0);
        return num.toFixed(2);
      },
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
          url: 'guard-webManager/customerRecord/depositRebateOrderAdd.jhtml',
          data: {
            customerId: id
          },
          success: function (res) {
						_vm.data = res.data.content.DepositList.map(item => {
              item.backAmount = 0;
              return item;
            }) || [];
						_vm.$store.dispatch('setPageLoading', 1);
          },
          error: function (res) {
            console.log(res);
          }
        });
      },
      setAmount(val) {
        this.$nextTick(() => {
          this.formValidate.amount = parseFloat(this.formValidate.amount.toFixed(2));
        })
      },
      save() {
        let _vm = this;
        _vm.$refs['formValidate'].validate((valid) => {
          if (valid) {
            const list = _vm.data.filter(item => item.backAmount).map(item => {
              return {
                amount: item.backAmount,
                depositId: item.id
              };
            });
            _vm.formValidate.detailListStr = JSON.stringify(list);
            _vm.saveLoad = true;
            _vm.$http.post({
              url: 'guard-webManager/customerRecord/addDepositRebateOrder.jhtml',
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
                      url: '/indexOrder',
                      text: _vm.cusName
                    }
                  ];
                  _vm.$store.dispatch('setBreadData', breadData);
                  _vm.$router.push('/indexOrder');
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: res.data.content
                  })
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
            })
          }
        })
      },
      back() {
        this.$router.back(-1);
      }
    }
  }

</script>

<style scoped>
  .userPower .prompt {
    color: red;
    margin-left: 20px;
  }

</style>
