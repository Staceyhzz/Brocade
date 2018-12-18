/**
* 账套密码页面
*/

<template>
  <div class="container-box">
    <div class="container-header">
      <h2>{{$t('layoutNav.setBooksManage')}}</h2>
    </div>
    <div class="container-body">
      <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
        <Row>
          <Col span="8" offset="8" v-if='key'>
            <p class="password-test">{{$t('setBooks.msg')}}</p>
            <Form-item :label="$t('setBooks.label1')" prop="newPassword" required>
              <Input type="password" v-model="formCustom.newPassword" icon="ios-eye"></Input>
            </Form-item>
            <Form-item :label="$t('setBooks.label2')" prop="newPassword2" required>
              <Input type="password" v-model="formCustom.newPassword2" icon="ios-eye"></Input>
            </Form-item>
          </Col>
          <Col span="8" offset="8" v-else>
            <Form-item :label="$t('setBooks.label1')" prop="newPassword" required>
              <Input type="password" v-model="formCustom.newPassword" icon="ios-eye" @on-enter='save'></Input>
              <Input v-show='fixSub'></Input>
            </Form-item>
          </Col>
        </Row>
      </Form>
      <div class="footer-btnGroup">
        <Button type="primary"  icon="checkmark" @click='save' :loading='saveLoad'>{{$t('publicSet.save')}}</Button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('setBooks.valid1')));
        } else if (value.length < 6) {
          callback(new Error(this.$t('setBooks.valid2')));
        } else {
          if (this.formCustom.newPassword2 !== '') {
            this.$refs.formCustom.validateField('newPassword2');
          }
          callback();
        }
      };
      const validatePassCheck = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('setBooks.valid3')));
        } else if (value !== this.formCustom.newPassword) {
          callback(new Error(this.$t('setBooks.valid4')));
        } else {
          callback();
        }
      };
      return {
        fixSub: false,
        key: true,
        saveLoad: false,
        formCustom: {
          newPassword: '',
          newPassword2: '',
        },
        ruleCustom: {
          newPassword: [
            { validator: validatePass, trigger: 'blur' }
          ],
          newPassword2: [
            { validator: validatePassCheck, trigger: 'blur' }
          ]
        }
      }
    },
    created () {
      this.getList()
    },
    methods: {
      getList () {
        let _vm = this
        _vm.$store.dispatch('setPageLoading', -1)
        _vm.$http.get({
          url: 'guard-webManager/accountMode/getPasswd.jhtml',
          success: function(res){
            console.log(res)
            if(res.data.code === 0 ){
              _vm.key = false
            } else if(res.data.code === 90006){
              _vm.key = true
            }
            _vm.$store.dispatch('setPageLoading', 1)
          },
          error: function(res){
            console.log(res)
          }
        })
      },
      save () {
        let _vm = this,
        _url = ''
        if(_vm.key) {
          _url = 'guard-webManager/accountMode/savePasswd.jhtml'
        } else {
          _url = 'guard-webManager/accountMode/verifyPasswd.jhtml'
        }
        _vm.$refs['formCustom'].validate((valid) => {
          if(valid) { 
            _vm.saveLoad = true
            _vm.$http.post({
              url: _url,
              data: {
                password: _vm.formCustom.newPassword
              },
              success: function(res){
                console.log(res)
                if(res.data.code === 0) {
                  let breadData = [
                    {
                      url: '/desktop',
                      text: 'layoutNav.desk'
                    },
                    {
                      url: '/setBooksIndex',
                      text: 'layoutNav.setBooksManage'
                    },
                  ]
                  _vm.$store.dispatch('setBreadData', breadData);
                  _vm.$router.push('/setBooksIndex')
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('publicSet.noticeSuccess')
                  });
                } else {
                  _vm.$Notice.error({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: res.data.desc
                  })
                  _vm.saveLoad = false
                }
              },
              error: function(res){
                console.log(res)
              }
            })
          }
        })
      },
    }
  }
</script>

<style scoped>
  .password-test {
    margin: 33px 0 20px 0;
    font-size: 13px;
    color: #4172F6;
  }
</style>
