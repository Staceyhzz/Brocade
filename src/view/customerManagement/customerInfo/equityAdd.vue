/** 
 * 添加权益页面 
 */

<template>
  <div class="container-box userPower">
    <div class="container-header">
      <h2>{{$t('cusNavList.customerAddEquity')}}</h2>
    </div>
    <div class="container-body">
      <Form ref="formValidate" :model="formValidate" :rules="ruleForm" :label-width="100" label-position="right">
        <Form-item :label="$t('equityAdd.label')" prop="equityName" required class='treatAddObj'>
          <Input v-model="formValidate.equityName" readonly icon="ios-search" :placeholder="$t('equityAdd.valid')" @on-focus="show" style="width:300px"></Input>
        </Form-item>
        <Form-item :label="$t('labelPublic.ms')" prop="content">
          <Input v-model.trim="formValidate.content" type="textarea" :autosize="{minRows: 2,maxRows: 7}" :placeholder="$t('placeholderPublic.input')"></Input>
        </Form-item>
      </Form>
      <div class="footer-btnGroup">
        <Button type="primary" icon="checkmark" @click='save' :loading='saveLoad'>{{$t('publicSet.save')}}</Button>
        <Button type="primary" icon="android-arrow-back" @click='back'>{{$t('publicSet.back')}}</Button>
      </div>
      <Modal :title="$t('equityAdd.valid')" width='700' v-model="modal" :closable="false" class-name="vertical-center-modal">
        <Table height="350" stripe :columns="col" :data="data" @on-row-click='choose'></Table>
      </Modal>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      const validateType = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('equityAdd.valid')));
        } else {
          callback();
        }
      };
      return {
        cusName: '',
        saveLoad: false,
        formValidate: {
          customerId: '',
          equityId: '',
          equityName: '',
          content: ''
        },
        modal: false,
        col: [
          {
            title: this.$t('labelPublic.mc'),
            key: 'name'
          },
          {
            title: this.$t('labelPublic.ms'),
            key: 'content'
          }
        ],
        data: [],
        ruleForm: {
          equityName: [
            {
            validator: validateType,
            trigger: 'change'
          }]
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
          url: 'guard-webManager/customerRecord/equityAdd.jhtml',
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
      show() {
        this.modal = true;
      },
      choose(data) {
        this.formValidate.equityId = data.id;
        this.formValidate.equityName = data.name;
        this.modal = false;
      },
      save() {
        let _vm = this;
        _vm.$refs['formValidate'].validate((valid) => {
          if (valid) {
            _vm.saveLoad = true
            _vm.$http.post({
              url: 'guard-webManager/customerRecord/addEquity.jhtml',
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
                      url: '/indexMember',
                      text: _vm.cusName
                    }
                  ];
                  _vm.$store.dispatch('setBreadData', breadData);
                  _vm.$router.push('/indexMember');
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
