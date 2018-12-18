/**
 * 个人设置页面
 */

<template>
  <div class="container-box personal-set">
    <div class="container-header">
      <h2>{{$t('otherRouter.modifyPassword')}}</h2>
    </div>
    <div class="container-body">
      <h3 class="tit">{{$t('modifyPassword.tit1')}}</h3>
      <div class="item">
        <p class="msg">{{$t('modifyPassword.msg1')}}</p>
        <Select v-model="lang" @on-change='setLang' class='lang'>
          <Option value="zh">CN</Option>
          <Option value="en">EN</Option>
          <Option value="kor">KR</Option>
        </Select>
      </div>
      <h3 class="tit">{{$t('modifyPassword.tit3')}}</h3>
      <div class="item">
        <p class="msg">{{$t('modifyPassword.msg3')}}</p>
        <i-switch v-model="langKey" @on-change="changeKey" :true-value='1' :false-value='0'></i-switch>
      </div>
      <h3 class="tit">{{$t('modifyPassword.tit2')}}</h3>
      <div class="item">
        <p class="msg">{{$t('modifyPassword.msg2')}}</p>
        <Button type="primary" icon="edit" @click='edit'>{{$t('publicSet.edit')}}</Button>
      </div>
      <Modal
        :title="$t('modifyPassword.tit2')"
        v-model="modal"
        :closable="false"
        @on-ok="ok"
        :loading="loading"
        class-name="vertical-center-modal">
        <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="100">
          <Form-item :label="$t('modifyPassword.label1')" prop="oldPassword" required>
            <Input type="password" :maxlength='20' v-model.trim="formCustom.oldPassword"></Input>
          </Form-item>
          <Form-item :label="$t('modifyPassword.label2')" prop="newPassword" required>
            <Input type="password" :maxlength='20' v-model.trim="formCustom.newPassword"></Input>
          </Form-item>
          <Form-item :label="$t('modifyPassword.label3')" prop="newPassword2" required>
            <Input type="password" :maxlength='20' v-model.trim="formCustom.newPassword2"></Input>
          </Form-item>
        </Form>
      </Modal>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.formCustom.newPassword2 !== '') {
            // 对第二个密码框单独验证
            this.$refs.formCustom.validateField('newPassword2');
          }
          callback();
        }
      };
      const validatePassCheck = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.formCustom.newPassword) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      const validateText = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入旧密码'));
        } else {
          callback();
        }
      };
      return {
        lang: '',
        loading: true,
        modal: false,
        langKey: 0,
        formCustom: {
          newPassword: '',
          newPassword2: '',
          oldPassword: ''
        },
        ruleCustom: {
          newPassword: [
            { validator: validatePass, trigger: 'blur' }
          ],
          newPassword2: [
            { validator: validatePassCheck, trigger: 'blur' }
          ],
          oldPassword: [
            { validator: validateText, trigger: 'blur' }
          ]
        }
      }
    },
    beforeRouteLeave(to, from, next) {
      this.$store.dispatch('setKeepAliveView');
      next()
    },
    created () {
      this.langKey = this.$store.getters.getLangContentKey;
      this.lang = localStorage.getItem('locale');
      this.$store.dispatch('setPageLoading', 1);
    },
    methods: {
      changeKey (val) {
        this.$store.dispatch('setLangContentKey', val);
        localStorage.setItem('langKey', val);
      },
      setLang (val) {
        this.$store.dispatch('cleanKeepAliveView');
        this.$i18n.locale = val;
        localStorage.setItem('locale', val);
      },
      edit () {
        this.$refs.formCustom.resetFields();
        this.modal = true;
      },
      ok () {
        let _vm = this;
        _vm.$refs['formCustom'].validate((valid) => {
          if(valid) { 
            _vm.$http.post({
              url: 'guard-webManager/modifyPassword/updatePassword.jhtml',
              data: _vm.formCustom,
              success: function(res){
                console.log(res)
                if(res.data.code === 0) {
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('publicSet.noticeSuccess')
                  });
                } else {
                  _vm.$Notice.error({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: res.data.desc
                  });
                  _vm.loading = false;
                  _vm.$nextTick(() => {
                    _vm.loading = true;
                  });
                }
              },
              error: function(res){
                console.log(res)
              }
            });
          } else {
            _vm.loading = false;
            _vm.$nextTick(() => {
              _vm.loading = true;
            });
          }
        });
      },
    }
  }
</script>

<style scoped lang='less'>
  .personal-set {
    .item {
      padding-left: 60px;
    }
    .tit {
      padding: 20px 0;
      font-size: 16px;
      font-weight: normal;
      line-height: 22px;
      color: #181818;
    }
    .msg {
      display: inline-block;
      min-width: 120px;
      margin-right: 20px;
      font-size: 14px;
      line-height: 18px;
    }
    .lang {
      width: 80px;
    }
  }
</style>