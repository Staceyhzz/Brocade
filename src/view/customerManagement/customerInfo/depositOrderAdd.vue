/** 
 * 客户预收款 
 */

<template>
  <div class="container-box">
    <div class="container-header">
      <h2>{{$t('cusNavList.customerDeposit')}}</h2>
    </div>
    <div class="container-body">
      <Alert type="success">
        <p>{{$t('depositOrderAdd.msg1')}} {{allPrice}}</p>
        <p>{{$t('depositOrderAdd.msg2')}} {{allCou}}</p>
      </Alert>
      <Form ref="formEdit" :model='formEdit' :label-width="50" label-position="right" style='margin-top:10px;' :rules="ruleForm">
        <Form-item prop="editData" required>
          <Table stripe :columns="editCol" :data="formEdit.editData"></Table>
        </Form-item>
        <Form-item :label="$t('labelPublic.ms')" prop="remark">
          <Input v-model.trim="formEdit.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('placeholderPublic.input')"></Input>
        </Form-item>
      </Form>
      <div class="footer-btnGroup">
        <Button type="primary" icon="checkmark" @click='save' :loading='saveLoad'>{{$t('publicSet.save')}}</Button>
        <Button type="primary" icon="android-arrow-back" @click='back'>{{$t('publicSet.back')}}</Button>
      </div>
    </div>
    <div class="container-header">
      <h2>{{$t('depositOrderAdd.tit')}}</h2>
    </div>
    <div class="container-body">
      <Table height="420" :columns="addCol" :data="addData" stripe @on-row-click='chooseCol'></Table>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      const validateData = (rule, value, callback) => {
        if (this.formEdit.editData.length === 0) {
          callback(new Error(this.$t('depositOrderAdd.valid')));
        } else {
          callback();
        }
      };
      return {
        cusId: '',
        cusName: '',
        saveLoad: false,
        formEdit: {
          editData: [],
          remark: ''
        },
        editCol: [
          {
            title: this.$t('labelPublic.mc'),
            width:80,
            key: 'name'
          },
          {
            title: this.$t('depositOrderAdd.colTit1'),
            width:80,
            render: (h, params) => {
              if(Number.isFinite(params.row.price)) {
                return h('span', params.row.price.toFixed(2));
              }
            }
          },
          {
            title: this.$t('depositOrderAdd.colTit5'),
            width: 100,
            render: (h, params) => {
              return h('cmptInputNumber', {
                props: {
                  size: 'small',
                  min: 1,
                  value: params.row.num,
                  max: 1000000,
                },
                on: {
                  'on-change': (val) => {
                    params.row.num = parseInt(val);
                    this.formEdit.editData[params.index] = params.row;
                  },
                  'on-blur': () => {
                    this.formEdit.editData[params.index].sum = this.formEdit.editData[params.index].price * params.row.num;
                    this.formEdit.editData[params.index].couAll = this.formEdit.editData[params.index].cou * params.row.num;
                    this.formEdit.editData.splice(params.index, 1, this.formEdit.editData[params.index]);
                  }
                }
              })
            }
          },
          {
            title: this.$t('depositOrderAdd.colTit2'),
            width: 80,
            render: (h, params) => {
              if(Number.isFinite(params.row.sum)) {
                return h('span', params.row.sum.toFixed(2));
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
        addCol: [
          {
            title: this.$t('labelPublic.mc'),
            width: 80,
            key: 'name'
          },
          {
            title: this.$t('depositOrderAdd.colTit1'),
            width: 80,
            key: 'price'
          },
          {
            title: this.$t('depositOrderAdd.colTit3'),
            width: 80,
            key: 'scope'
          },
          {
            title: this.$t('depositOrderAdd.colTit4'),
            width: 80,
            key: 'coupon'
          }
        ],
        addData: [],
        ruleForm: {
          editData: [{
            validator: validateData,
            trigger: 'change'
          }],
        }
      }
    },
    computed: {
      allPrice() {
        const num = this.formEdit.editData.reduce((pre, cur) => cur.sum + pre, 0);
        return num.toFixed(2);
      },
      allCou() {
        const num = this.formEdit.editData.reduce((pre, cur) => cur.couAll + pre, 0);
        return num.toFixed(2);
      },
    },
    created() {
      this.cusId = sessionStorage.getItem('cusId');
      this.cusName = sessionStorage.getItem('cusName');
      this.getId(this.cusId);
    },
    methods: {
      // 获取资料
      getId(id) {
        let _vm = this;
        _vm.$store.dispatch('setPageLoading', -1);
        _vm.$http.getPage({
          url: 'guard-webManager/customerRecord/depositOrderAdd.jhtml',
          data: {
            customerId: id
          },
          success: function (res) {
						_vm.addData = res.data.content.DepositChargeList || [];
						_vm.$store.dispatch('setPageLoading', 1);
          },
          error: function (res) {
            console.log(res);
          }
        });
      },
      remove(index) {
        this.formEdit.editData.splice(index, 1);
      },
      chooseCol(data) {
        let _vm = this;
        const index = _vm.formEdit.editData.findIndex(item => item.id === data.id);
        if(index < 0) {
          _vm.$http.get({
            url: 'guard-webManager/select/depositCharge.jhtml',
            data: {
              id: data.id
            },
            success: function (res) {
              if (res.data.code === 0) {
                const obj = res.data.content || {};
                _vm.formEdit.editData.push({
                  id: obj.id || id,
                  name: obj.name || '',
                  price: obj.price || 0,
                  num: 1,
                  sum: obj.price || 0,
                  cou: obj.couponamount || 0,
                  couAll: obj.couponamount || 0
                });
                _vm.$refs.formEdit.validateField('editData');
              } else {
                console.log(res.data.desc)
              }
            },
            error: function (res) {
              console.log(res);
            }
          });
        }
      },
      save() {
        let _vm = this;
        _vm.$refs['formEdit'].validate((valid) => {
          if (valid) {
            _vm.saveLoad = true;
            const _box = _vm.formEdit.editData.map(item => {
              return {
                chargeId: item.id,
                num: item.num
              };
            });
            _vm.$http.post({
              url: 'guard-webManager/customerRecord/addDepositOrder.jhtml',
              data: {
                customerId: _vm.cusId,
                remark: _vm.formEdit.remark,
                detailListStr: JSON.stringify(_box)
              },
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

<style>


</style>
