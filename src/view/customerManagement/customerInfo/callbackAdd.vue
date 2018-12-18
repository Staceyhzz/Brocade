/** 
 * 添加回访页面 
 */

<template>
  <div class="container-box userPower">
    <div class="container-header">
      <h2>{{$t('cusNavList.customerCallback')}}</h2>
    </div>
    <div class="container-body">
      <Form ref="formValidate" :model="formValidate" :rules="ruleForm" :label-width="100" label-position="right">
        <Form-item :label="$t('callbackAdd.label1')" prop="categoryId" required>
          <Select v-model="formValidate.categoryId" style="width:300px">
            <Option v-for="item in typeList" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
        </Form-item>
        <Form-item :label="$t('callbackAdd.label2')" prop="tool" required>
          <Select v-model="formValidate.tool" style="width:300px">
            <Option v-for="item in wayList" :value="item.code" :key="item.code">{{ item.name }}</Option>
          </Select>
        </Form-item>
        <Form-item :label="$t('callbackAdd.label3')" prop="content" required>
          <Input v-model.trim="formValidate.content" type="textarea" :autosize="{minRows: 2,maxRows: 7}" :placeholder="$t('callbackAdd.valid3')"></Input>
        </Form-item>
      </Form>
      <div class="footer-btnGroup">
        <Button type="primary" icon="checkmark" @click='save' :loading='saveLoad'>{{$t('publicSet.save')}}</Button>
        <Button type="primary" icon="android-arrow-back" @click='back'>{{$t('publicSet.back')}}</Button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      const validateType = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('callbackAdd.valid1')));
        } else {
          callback();
        }
      };
      const validateWay = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('callbackAdd.valid2')));
        } else {
          callback();
        }
      };
      const validateCon = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('callbackAdd.valid3')));
        } else {
          callback();
        }
      };
      return {
        cusName: '',
        saveLoad: false,
        formValidate: {
          customerId: '',
          categoryId: '',
          tool: '',
          content: ''
        },
        ruleForm: {
          categoryId: [{
            validator: validateType,
            trigger: 'change'
          }],
          tool: [{
            validator: validateWay,
            trigger: 'change'
          }],
          content: [{
            validator: validateCon,
            trigger: 'blur'
          }],
        }
      }
    },
    computed: {
      typeList() {
        return this.$store.getters.getSelectCallbackCategoryInfoList;
      },
      wayList() {
        return this.$store.getters.getSelectToolList;
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
          url: 'guard-webManager/customerRecord/callbackAdd.jhtml',
          data: {
            customerId: id
          },
          success: function (res) {
						_vm.$store.dispatch('setPageLoading', 1);
						_vm.$store.dispatch('setSelectToolList');
						_vm.$store.dispatch('setSelectCallbackCategoryInfoList');
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
            _vm.saveLoad = true
            _vm.$http.post({
              url: 'guard-webManager/customerRecord/addCallback.jhtml',
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
                      url: '/indexCallback',
                      text: _vm.cusName
                    }
                  ];
                  _vm.$store.dispatch('setBreadData', breadData);
                  _vm.$router.push('/indexCallback');
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
