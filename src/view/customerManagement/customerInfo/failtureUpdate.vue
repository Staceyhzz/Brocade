/** 
 * 修改未成交页面 
 */

<template>
  <div class="container-box userPower">
    <div class="container-header">
      <h2>{{$t('indexFailture.tit')}}</h2>
    </div>
    <div class="container-body">
      <Form ref="formValidate" :model="formValidate" :rules="ruleForm" :label-width="100" label-position="right">
        <Form-item :label="$t('indexFailture.colTit1')">
          <span>{{createtime}}</span>
        </Form-item>
        <Form-item :label="$t('indexFailture.colTit3')">
          <span>【{{hospitalName}}】</span>
          <span>【{{createUserDeptName}}】</span>
          <span>【{{createUserName}}】</span>
        </Form-item>
        <Form-item :label="$t('failtureAdd.label1')" prop="categoryId" required>
          <Select v-model="formValidate.categoryId" style="width:300px">
            <Option v-for="item in typeList" :value="item.id" :key="item.id" :disabled="item.status == 0">{{ item.name }}</Option>
          </Select>
        </Form-item>
        <Form-item :label="$t('failtureAdd.label2')" prop="content" required>
          <Input v-model.trim="formValidate.content" type="textarea" :autosize="{minRows: 2,maxRows: 7}" :placeholder="$t('failtureAdd.valid2')"></Input>
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
          callback(new Error(this.$t('failtureAdd.valid1')));
        } else {
          callback();
        }
      };
      const validateCon = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('failtureAdd.valid2')));
        } else {
          callback();
        }
      };
      return {
        cusName: '',
        saveLoad: false,
        createtime: '',
        createUserName: '',
        createUserDeptName: '',
        hospitalName: '',
        formValidate: {
          id: '',
          categoryId: '',
          content: ''
        },
        ruleForm: {
          categoryId: [{
            validator: validateType,
            trigger: 'change'
          }],
          content: [{
            validator: validateCon,
            trigger: 'blur'
          }]
        }
      }
    },
    computed: {
      typeList() {
        return this.$store.getters.getSelectAllFailtureCategoryList
      },
    },
    created() {
      this.cusName = sessionStorage.getItem('cusName');
      this.formValidate.id = this.$route.query.id
      this.getId(this.formValidate.id);
      this.$store.dispatch('setSelectAllFailtureCategoryList');
    },
    methods: {
      // 获取资料
      getId(id) {
        let _vm = this;
        _vm.$store.dispatch('setPageLoading', -1);
        _vm.$http.getPage({
          url: 'guard-webManager/customerRecord/failtureUpdate.jhtml',
          data: {
            id: id
          },
          success: function (res) {
            const obj = res.data.content.Failture || {};
						_vm.hospitalName = obj.hospitalName || '';
						_vm.createUserName = obj.createUserName || '';
						_vm.createtime = obj.createtime || '';
						_vm.createUserDeptName = obj.createUserDeptName || '';
						_vm.formValidate.categoryId = obj.categoryid || '';
						_vm.formValidate.content = obj.content || '';
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
              url: 'guard-webManager/customerRecord/updateFailture.jhtml',
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
                      url: '/indexFailture',
                      text: _vm.cusName
                    }
                  ];
                  _vm.$store.dispatch('setBreadData', breadData);
                  _vm.$router.push('/indexFailture');
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
