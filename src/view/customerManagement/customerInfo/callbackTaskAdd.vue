/** 
 * 添加回访提醒页面 
 */

<template>
  <div class="container-box userPower">
    <div class="container-header">
      <h2>{{$t('cusNavList.customerCallbackTask')}}</h2>
    </div>
    <div class="container-body">
      <Form ref="formValidate" :model="formValidate" :rules="ruleForm" :label-width="100" label-position="right">
        <Form-item :label="$t('callbackAdd.label1')" prop="categoryId" required>
          <Select v-model="formValidate.categoryId" style="width:300px">
            <Option v-for="item in typeList" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
        </Form-item>
        <Form-item :label="$t('callbackTaskAdd.label1')" required prop="taskTime">
          <Date-picker :transfer='true' type="date" placement="bottom-start" :placeholder="$t('callbackTaskAdd.valid1')" style="width: 300px" :options='options' @on-change='saveDate'></Date-picker>
        </Form-item>
        <Form-item :label="$t('callbackTaskAdd.label2')" prop="name" required>
          <Input v-model.trim="formValidate.name" type="textarea" :maxlength='100' :autosize="{minRows: 2,maxRows: 7}" :placeholder="$t('callbackTaskAdd.valid2')"></Input>
        </Form-item>
        <Form-item :label="$t('callbackTaskAdd.label3')" prop="userId" required>
          <Input v-model="userName" readonly icon="ios-search" :placeholder="$t('callbackTaskAdd.valid3')" @on-focus="addUser" style="width:300px"></Input>
        </Form-item>
      </Form>
      <div class="footer-btnGroup">
        <Button type="primary" icon="checkmark" @click='save' :loading='saveLoad'>{{$t('publicSet.save')}}</Button>
        <Button type="primary" icon="android-arrow-back" @click='back'>{{$t('publicSet.back')}}</Button>
      </div>
    </div>
    <cmptChooseUserSinger :placeHolder="$t('callbackTaskAdd.valid3')" @setUserData="setUser" :openKey='userOpenKey' :defaultUser='false'></cmptChooseUserSinger>
  </div>
</template>

<script>
  export default {
    data() {
      const validateType = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('callbackAdd.valid1')))
        } else {
          callback()
        }
      }
      const validateDay = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('callbackTaskAdd.valid1')))
        } else {
          callback()
        }
      }
      const validateCon = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('callbackTaskAdd.valid2')))
        } else {
          callback()
        }
      }
      const validateUser = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('callbackTaskAdd.valid3')))
        } else {
          callback()
        }
      }
      return {
        cusName: '',
        saveLoad: false,
        formValidate: {
          customerId: '',
          taskTime: '',
          categoryId: '',
          name: '',
          userId: '',
        },
        userName: '',
        userOpenKey: false,
        options: {
          disabledDate(date) {
            return date && date.valueOf() < Date.now() - 86400000;
          }
        },
        ruleForm: {
          taskTime: [{
            validator: validateDay,
            trigger: 'change'
          }],
          categoryId: [{
            validator: validateType,
            trigger: 'change'
          }],
          name: [{
            validator: validateCon,
            trigger: 'blur'
          }],
          userId: [{
            validator: validateUser,
            trigger: 'blur'
          }]
        }
      }
    },
    computed: {
      typeList() {
        return this.$store.getters.getSelectCallbackCategoryInfoList;
      }
    },
    created() {
      this.formValidate.customerId = sessionStorage.getItem('cusId');
      this.cusName = sessionStorage.getItem('cusName');
      this.getId(this.formValidate.customerId);
      this.userName = localStorage.getItem('userAccount');
      this.formValidate.userId = localStorage.getItem('userId');
    },
    methods: {
      // 获取资料
      getId(id) {
        let _vm = this;
        _vm.$store.dispatch('setPageLoading', -1);
        _vm.$http.getPage({
          url: 'guard-webManager/customerRecord/callbackTaskAdd.jhtml',
          data: {
            customerId: id
          },
          success: function (res) {
						_vm.$store.dispatch('setPageLoading', 1);
						console.log(res)
						_vm.$store.dispatch('setSelectCallbackCategoryInfoList');
          },
          error: function (res) {
            console.log(res)
          }
        })
      },
      //获取弹窗用户选择列表
      addUser() {
        this.userOpenKey = !this.userOpenKey;
      },
      setUser(data) {
        this.formValidate.userId = data.id;
        this.userName = data.name;
      },
      saveDate(date) {
        this.formValidate.taskTime = date;
      },
      save() {
        let _vm = this;
        _vm.$refs['formValidate'].validate((valid) => {
          if (valid) {
            _vm.saveLoad = true;
            _vm.$http.post({
              url: 'guard-webManager/customerRecord/addCallBackTask.jhtml',
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
                  _vm.$store.dispatch('setBreadData', breadData)
                  _vm.$router.push('/indexCallback')
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
                console.log(res)
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
