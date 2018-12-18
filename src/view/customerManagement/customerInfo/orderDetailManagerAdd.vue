/** 
 * 修改主诊医生页面 
 */

<template>
  <div class="container-box userPower">
    <div class="container-header">
      <h2>{{$t('cusNavList.customerOrderDetailManager')}}</h2>
    </div>
    <div class="container-body">
      <Form ref="formValidate" :model="formValidate" :rules="ruleForm" :label-width="100" label-position="right">
        <Form-item :label="$t('orderDetailManagerAdd.label1')" prop="detailName" required>
          <Input v-model="formValidate.detailName" readonly icon="ios-search" :placeholder="$t('orderDetailManagerAdd.valid1')" style='width:300px;' @on-focus='show'></Input>
        </Form-item>
        <Form-item :label="$t('orderDetailManagerAdd.label2')" prop="userId" required>
          <Select v-model="formValidate.userId" style="width:300px">
            <Option v-for="item in hospList" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
        </Form-item>
        <Form-item :label="$t('labelPublic.ms')" prop="content">
          <Input v-model.trim="formValidate.content" type="textarea" :autosize="{minRows: 2,maxRows: 7}" :placeholder="$t('placeholderPublic.input')"></Input>
        </Form-item>
      </Form>
      <div class="footer-btnGroup">
        <Button type="primary" icon="checkmark" @click='save' :loading='saveLoad'>{{$t('publicSet.save')}}</Button>
        <Button type="primary" icon="android-arrow-back" @click='back'>{{$t('publicSet.back')}}</Button>
      </div>
      <Modal :title="$t('orderDetailManagerAdd.valid1')" width='700' v-model="modal" :closable="false" class-name="vertical-center-modal">
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
          callback(new Error(this.$t('orderDetailManagerAdd.valid1')));
        } else {
          callback();
        }
      };
      const validateList = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('orderDetailManagerAdd.valid2')));
        } else {
          callback();
        }
      };
      return {
        cusName: '',
        modal: false,
        saveLoad: false,
        formValidate: {
          customerId: '',
          detailId: '',
          detailName: '',
          userId: '',
          content: '',
        },
        col: [
          {
            title: this.$t('orderDetailManagerAdd.colTit1'),
            width: 80,
            render: (h, params) => {
              if(params.row.orderPaidTime) {
                const _text = params.row.orderPaidTime.split(' ')[0];
                return h('span', _text);
              }
            }
          },
          {
            title: this.$t('orderDetailManagerAdd.colTit2'),
            width: 60,
            key: 'chargeName'
          },
          {
            title: this.$t('labelPublic.lx'),
            width: 60,
            key: 'chargeCategoryName'
          },
          {
            title: this.$t('orderDetailManagerAdd.colTit3'),
            width: 60,
            key: 'num'
          },
          {
            title: this.$t('orderDetailManagerAdd.colTit4'),
            width: 60,
            key: 'orderCreateUserName'
          },
          {
            title: this.$t('orderDetailManagerAdd.colTit5'),
            width: 60,
            key: 'doctorUserName'
          }
        ],
        data: [],
        hospList: [],
        ruleForm: {
          userId: [{
            validator: validateList,
            trigger: 'change'
          }],
          detailName: [{
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
        _vm.$store.dispatch('setPageLoading', -1)
        _vm.$http.getPage({
          url: 'guard-webManager/customerRecord/orderDetailManagerAdd.jhtml',
          data: {
            customerId: id
          },
          success: function (res) {
						_vm.hospList = res.data.content.UserList || [];
						_vm.data = res.data.content.DetailList || [];
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
        this.formValidate.detailName = data.chargeName;
        this.modal = false;
      },
      save() {
        let _vm = this;
        _vm.$refs['formValidate'].validate((valid) => {
          if (valid) {
            _vm.saveLoad = true;
            _vm.$http.post({
              url: 'guard-webManager/customerRecord/editOrderDetailManager.jhtml',
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
                  _vm.$router.push('/indexAudit')
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
