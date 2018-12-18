/** 
 * 转账页面 
 */

<template>
  <div class="container-box userPower">
    <div class="container-header">
      <h2>{{$t('cusNavList.customerTransfer')}}</h2>
    </div>
    <div class="container-body">
      <Form ref="formValidate" :model="formValidate" :rules="ruleForm" :label-width="100" label-position="right">
        <Form-item :label="$t('depositTransferOrderAdd.label1')" prop="depositName" required class='treatAddObj' style="width:400px;">
          <Input v-model="formValidate.depositName" readonly icon="ios-search" :placeholder="$t('depositTransferOrderAdd.valid2')" @on-focus="show"></Input>
        </Form-item>
        <Form-item :label="$t('depositTransferOrderAdd.label2')" prop="amount" required>
          <cmptInputNumber :min="0" v-model="formValidate.amount" style="width:300px;" @on-change='setAmount'></cmptInputNumber>
        </Form-item>
        <Form-item :label="$t('depositTransferOrderAdd.label3')" prop="toCustomerId" style="width:400px;" required>
          <Input v-model="formValidate.toCustomerId" :placeholder="$t('depositTransferOrderAdd.valid1')"></Input>
        </Form-item>
        <Form-item :label="$t('depositTransferOrderAdd.label4')" prop="content">
          <Input v-model.trim="formValidate.content" type="textarea" :autosize="{minRows: 2,maxRows: 7}" :placeholder="$t('placeholderPublic.input')"></Input>
        </Form-item>
      </Form>
      <div class="footer-btnGroup">
        <Button type="primary" icon="checkmark" @click='save' :loading='saveLoad'>{{$t('publicSet.save')}}</Button>
        <Button type="primary" icon="android-arrow-back" @click='back'>{{$t('publicSet.back')}}</Button>
      </div>
      <Modal :title="$t('depositTransferOrderAdd.valid2')" width='700' v-model="modal" :closable="false" class-name="vertical-center-modal">
        <Table height="350" stripe :columns="col" :data="data" @on-row-click='choose'></Table>
      </Modal>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      const validateId = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('depositTransferOrderAdd.valid1')));
        } else {
          callback();
        }
      };
      const validateObj = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('depositTransferOrderAdd.valid2')));
        } else {
          callback();
        }
      };
      return {
        cusName: '',
        saveLoad: false,
        formValidate: {
          customerId: '',
          toCustomerId: '',
          depositId: '',
          depositName: '',
          amount: 0,
          content: '',
        },
        modal: false,
        col: [
          {
            title: this.$t('depositTransferOrderAdd.colTit1'),
            width: 60,
            key: 'id'
          },
          {
            title: this.$t('depositTransferOrderAdd.colTit2'),
            width: 100,
            key: 'chargeName'
          },
          {
            title: this.$t('depositTransferOrderAdd.colTit3'),
            width: 100,
            key: 'hospitalName'
          },
          {
            title: this.$t('depositTransferOrderAdd.label2'),
            width: 100,
            align: 'right',
            render: (h, params) => {
              if(Number.isFinite(params.row.amount)) {
                return h('span', params.row.amount.toFixed(2));
              }
            }
          },
          {
            title: this.$t('depositTransferOrderAdd.colTit4'),
            width: 100,
            align: 'right',
            render: (h, params) => {
              if(Number.isFinite(params.row.rest)) {
                return h('span', params.row.rest.toFixed(2));
              }
            }
          }
        ],
        data: [],
        ruleForm: {
          toCustomerId: [{
            validator: validateId,
            trigger: 'blur'
          }],
          depositName: [{
            validator: validateObj,
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
          url: 'guard-webManager/customerRecord/depositTransferOrderAdd.jhtml',
          data: {
            customerId: id
          },
          success: function (res) {
						_vm.data = res.data.content || [];
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
      show() {
        this.modal = true;
      },
      choose(data) {
        this.formValidate.depositId = data.id;
        this.formValidate.depositName = data.chargeName;
        this.modal = false;
      },
      save() {
        let _vm = this;
        _vm.$refs['formValidate'].validate((valid) => {
          if (valid) {
            _vm.saveLoad = true;
            _vm.$http.post({
              url: 'guard-webManager/customerRecord/addDepositTransferOrder.jhtml',
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
