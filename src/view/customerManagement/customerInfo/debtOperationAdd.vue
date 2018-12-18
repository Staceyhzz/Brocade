/** 
 * 欠款划扣页面 
 */

<template>
  <div class="container-box userPower">
    <div class="container-header">
      <h2>{{$t('cusNavList.customerDebtOperation')}}</h2>
    </div>
    <div class="container-body">
      <Form ref="formValidate" :model="formValidate" :label-width="100" label-position="right" :rules="ruleForm">
        <Form-item :label="$t('debtOperationAdd.label1')" prop="detailName" required class='treatAddObj'>
          <Input v-model="formValidate.detailName" readonly icon="ios-search" :placeholder="$t('debtOperationAdd.valid1')" @on-focus="show" style="width:300px"></Input>
        </Form-item>
        <Form-item :label="$t('debtOperationAdd.label2')" prop="num" required>
          <cmptInputNumber :max="maxNum" :min="0" v-model="formValidate.num" style="width:300px"></cmptInputNumber>
        </Form-item>
        <Form-item :label="$t('debtOperationAdd.label3')" prop="content">
          <Input v-model.trim="formValidate.content" type="textarea" :autosize="{minRows: 2,maxRows: 7}" :placeholder="$t('placeholderPublic.input')"></Input>
        </Form-item>
      </Form>
      <div class="footer-btnGroup">
        <Button type="primary" icon="checkmark" @click='save' :loading='saveLoad'>{{$t('publicSet.save')}}</Button>
        <Button type="primary" icon="android-arrow-back" @click='back'>{{$t('publicSet.back')}}</Button>
      </div>
      <Modal :title="$t('debtOperationAdd.valid1')" width='700' v-model="modal" :closable="false" class-name="vertical-center-modal">
        <Table height="350" stripe :columns="col" :data="data" @on-row-click='choose'></Table>
      </Modal>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      const validateObj = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('debtOperationAdd.valid1')));
        } else {
          callback();
        }
      };
      const validateNum = (rule, value, callback) => {
        if (value === 0) {
          callback(new Error(this.$t('debtOperationAdd.valid2')));
        } else {
          callback();
        }
      };
      return {
        cusName: '',
        saveLoad: false,

        formValidate: {
          customerId: '',
          detailId: '',
          detailName: '',
          num: 0,
          content: '',
        },
        maxNum: 10,
        modal: false,
        col: [
          {
            title: this.$t('debtOperationAdd.colTit1'),
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
            width: 100,
            key: 'chargeName'
          },
          {
            title: this.$t('labelPublic.lx'),
            width: 60,
            key: 'chargeCategoryName'
          },
          {
            title: this.$t('debtOperationAdd.label2'),
            width: 60,
            key: 'num'
          },
          {
            title: this.$t('debtOperationAdd.colTit2'),
            width: 60,
            key: 'restNum'
          },
          {
            title: this.$t('debtOperationAdd.colTit3'),
            width: 100,
            render: (h, params) => {
              if(Number.isFinite(params.row.finalPrice)) {
                return h('span', params.row.finalPrice.toFixed(2));
              }
            }
          },
          {
            title: this.$t('debtOperationAdd.colTit4'),
            width: 100,
            render: (h, params) => {
              if(Number.isFinite(params.row.debtAmount)) {
                return h('span', params.row.debtAmount.toFixed(2));
              }
            }
          },
        ],
        data: [],
        ruleForm: {
          detailName: [{
            validator: validateObj,
            trigger: 'change'
          }],
          num: [{
            validator: validateNum,
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
          url: 'guard-webManager/customerRecord/debtOperationAdd.jhtml',
          data: {
            customerId: id
          },
          success: function (res) {
            console.log(res)
						_vm.data = res.data.content || [];
						_vm.$store.dispatch('setPageLoading', 1);
          },
          error: function (res) {
            console.log(res);
          }
        });
      },
      show() {
        this.modal = true;
      },
      choose(data) {
        this.formValidate.detailId = data.id;
        this.formValidate.detailName = data.chargeName + '(' + data.finalPrice + ')';
        this.formValidate.num = 0;
        this.maxNum = data.restNum || 0;
        this.modal = false;
      },
      save() {
        let _vm = this;
        _vm.$refs['formValidate'].validate((valid) => {
          if (valid) {
            _vm.saveLoad = true;
            _vm.$http.post({
              url: 'guard-webManager/customerRecord/addDebtOperation.jhtml',
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
                      url: '/indexAudit',
                      text: _vm.cusName
                    }
                  ];
                  _vm.$store.dispatch('setBreadData', breadData);
                  _vm.$router.push('/indexAudit');
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
