/** 
 * 激活券页面 
 */

<template>
  <div class="container-box userPower">
    <div class="container-header">
      <h2>{{$t('cusNavList.customerActiveCoupon')}}</h2>
    </div>
    <div class="container-body">
      <Form ref="formValidate" :model="formValidate" :rules="ruleForm" :label-width="100" label-position="right">
        <Form-item :label="$t('activeCoupon.label1')" prop="code" style="width:400px;" required>
          <Input v-model.trim="formValidate.code" :placeholder="$t('activeCoupon.valid')"></Input>
        </Form-item>
      </Form>
      <div class="footer-btnGroup">
        <Button type="primary" icon="checkmark" @click='save' :loading='saveLoad'>{{$t('activeCoupon.btn1')}}</Button>
        <Button type="primary" icon="android-arrow-back" @click='back'>{{$t('publicSet.back')}}</Button>
      </div>
    </div>
    <Modal :title="$t('cusNavList.customerActiveCoupon')" v-model="modal" :closable="false" @on-ok="ok" @on-cancel="cancel" :ok-text="$t('activeCoupon.btn2')" :loading="loading" class-name="vertical-center-modal">
      <Form ref="formAdd" :model="formAdd" :label-width="80" label-position="right">
        <Form-item :label="$t('activeCoupon.label1')">
          <span>{{formAdd.code}}</span>
        </Form-item>
        <Form-item :label="$t('activeCoupon.label2')">
          <span>{{formAdd.name}}</span>
        </Form-item>
        <Form-item :label="$t('activeCoupon.label3')">
          <span>{{formAdd.categoryName}}</span>
        </Form-item>
        <Form-item :label="$t('activeCoupon.label4')">
          <span>{{formAdd.amount}}</span>
        </Form-item>
        <Form-item :label="$t('activeCoupon.label5')">
          <span>{{formAdd.expiration}}</span>
        </Form-item>
      </Form>
    </Modal>
  </div>
</template>

<script>
  export default {
    data() {
      const validateId = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('activeCoupon.valid')));
        } else {
          callback();
        }
      };
      return {
        modal: false,
        loading: true,
        cusName: '',
        saveLoad: false,
        formValidate: {
          customerId: '',
          code: ''
        },
        formAdd: {
          id: '',
          code: '',
          name: '',
          categoryName: '',
          price: '',
          expiration: '',
        },
        ruleForm: {
          code: [{
            validator: validateId,
            trigger: 'blur'
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
          url: 'guard-webManager/customerRecord/activeCoupon.jhtml',
          data: {
            customerId: id
          },
          success: function (res) {
            _vm.$store.dispatch('setPageLoading', 1);
          },
          error: function (res) {
            console.log(res);
          }
        });
      },
      save() {
        let _vm = this;
        _vm.$refs['formValidate'].validate((valid) => {
          if (valid) {
            _vm.saveLoad = true;
            _vm.$http.post({
              url: 'guard-webManager/customerRecord/verifyActiveCoupon.jhtml',
              data: _vm.formValidate,
              success: function (res) {
                if (res.data.code === 0) {
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('activeCoupon.msg')
                  });
                  _vm.formAdd.id = res.data.content.id;
                  _vm.formAdd.code = res.data.content.code;
                  _vm.formAdd.name = res.data.content.activity.name;
                  _vm.formAdd.categoryName = res.data.content.activity.categoryName;
                  _vm.formAdd.amount = res.data.content.activity.amount.toFixed(2);
                  _vm.formAdd.expiration = moment(res.data.content.activity.createdate).format('YYYY-MM-DD');
                  _vm.modal = true;
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
        this.$router.back(-1)
      },
      cancel() {
        this.saveLoad = false
      },
      ok() {
        let _vm = this;
        _vm.$http.post({
          url: 'guard-webManager/customerRecord/activeCoupon.jhtml',
          data: {
            customerId: _vm.formValidate.customerId,
            id: _vm.formAdd.id,
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
              _vm.loading = false;
              _vm.$nextTick(() => {
                _vm.loading = true;
              })
            }
          },
          error: function (res) {
            console.log(res);
          }
        })
      }
    }
  }

</script>
