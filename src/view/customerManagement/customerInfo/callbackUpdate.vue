/** 
 * 修改回访信息页面 
 */

<template>
  <div class="container-box userPower">
    <div class="container-header">
      <h2>{{$t('indexCallback.tit1')}}</h2>
    </div>
    <div class="container-body">
      <Form ref="formValidate" :model="formValidate" :rules="ruleForm" :label-width="100" label-position="right">
        <Form-item :label="$t('callbackUpdate.label1')">
          <span>{{createtime}}</span>
        </Form-item>
        <Form-item :label="$t('callbackUpdate.label2')">
          <span>【{{createUserHospitalName}}】 【{{createUserDeptName}}】 【{{createUserName}}】</span>
        </Form-item>
        <Form-item :label="$t('callbackAdd.label1')">
          <span>{{categoryName}}</span>
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
        createtime: '',
        createUserName: '',
        createUserHospitalName: '',
        createUserDeptName: '',
        categoryName: '',
        formValidate: {
          id: '',
          tool: '',
          content: ''
        },
        ruleForm: {
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
      wayList() {
        return this.$store.getters.getSelectToolList;
      },
    },
    created() {
      this.cusName = sessionStorage.getItem('cusName');
      this.getId();
    },
    methods: {
      // 获取资料
      getId(id) {
        let _vm = this;
        _vm.$store.dispatch('setPageLoading', -1);
        _vm.$http.getPage({
          url: 'guard-webManager/customerRecord/callbackUpdate.jhtml',
          data: {
            id: _vm.$route.query.id
          },
          success: function (res) {
            const _obj = res.data.content.Callback || {};
						_vm.categoryName = _obj.categoryName || '';
						_vm.createUserDeptName = _obj.createUserDeptName || '';
						_vm.createUserHospitalName = _obj.createUserHospitalName || '';
						_vm.createUserName = _obj.createUserName || '';
            _vm.createtime = _obj.createtime || '';
            _vm.formValidate = {
              id: _obj.id || '',
              tool: _obj.tool || '',
              content: _obj.content || '',
            };
						_vm.$store.dispatch('setPageLoading', 1);
						_vm.$store.dispatch('setSelectToolList');
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
              url: 'guard-webManager/customerRecord/updateCallback.jhtml',
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
