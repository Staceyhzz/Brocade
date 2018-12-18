/**
* 添加账套页面
*/

<template>
  <div class="container-box">
    <div class="container-header">
      <h2>{{$t('setBooksIndex.msg1')}}</h2>
    </div>
    <div class="container-body">
      <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="110">
        <Row>
          <Col span="10" offset="7">
            <Form-item :label="$t('setBooksIndexAdd.label1')" prop="dbAccountName" required>
              <Input v-model.trim="formCustom.dbAccountName" :maxlength='20' :placeholder="$t('placeholderPublic.input')"></Input>
            </Form-item>
            <Form-item :label="$t('setBooksIndex.label2')">
              <span>mysql</span>
            </Form-item>
            <Form-item :label="$t('setBooksIndexAdd.label2')" prop="ip" required>
              <Input v-model.trim="formCustom.ip" :maxlength='100' :placeholder="$t('placeholderPublic.input')"></Input>
            </Form-item>
            <Form-item :label="$t('setBooksIndexAdd.label3')" prop="port" required>
              <Input v-model.trim="formCustom.port" :maxlength='100' :placeholder="$t('placeholderPublic.input')"></Input>
            </Form-item>
            <Form-item :label="$t('setBooksIndexAdd.label4')" prop="dbName" required>
              <Input v-model.trim="formCustom.dbName" :maxlength='20' :placeholder="$t('placeholderPublic.input')"></Input>
            </Form-item>
            <Form-item :label="$t('setBooksIndex.label6')" prop="user" required>
              <Input v-model.trim="formCustom.user" :maxlength='20' :placeholder="$t('placeholderPublic.input')"></Input>
            </Form-item>
            <Form-item :label="$t('setBooksIndex.label7')" prop="password" required>
              <Input type="password" v-model.trim="formCustom.password" :maxlength='20' :placeholder="$t('placeholderPublic.input')"></Input>
            </Form-item>
          </Col>
        </Row>
      </Form>
      <div class="footer-btnGroup">
        <Button type="primary"  icon="checkmark" @click='save' :loading='saveLoad' :disabled='key'>{{$t('publicSet.save')}}</Button>
        <Button type="primary"  icon="checkmark" @click='link' :loading='saveLoad'>{{$t('setBooksIndexAdd.btn')}}</Button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      const validateText = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('setBooksIndexAdd.valid')))
        } else {
          callback()
        }
      };
      return {
        saveLoad: false,
        key: true,
        formCustom: {
          ip: '',
          port: '',
          user: '',
          password: '',
          dbName: '',
          dbAccountName: '',
        },
        ruleCustom: {
          ip: [
            { validator: validateText, trigger: 'blur' }
          ],
          port: [
            { validator: validateText, trigger: 'blur' }
          ],
          user: [
            { validator: validateText, trigger: 'blur' }
          ],
          password: [
            { validator: validateText, trigger: 'blur' }
          ],
          dbName: [
            { validator: validateText, trigger: 'blur' }
          ],
          dbAccountName: [
            { validator: validateText, trigger: 'blur' }
          ],
        }
      }
    },
    created () {
      this.$store.dispatch('setPageLoading', 1)
    },
    methods: {
      save () {
        let _vm = this
        _vm.$refs['formCustom'].validate((valid) => {
          if(valid) { 
            _vm.saveLoad = true
            _vm.$http.post({
              url: 'guard-webManager/accountMode/saveDbACcount.jhtml',
              data: _vm.formCustom,
              success: function(res){
                console.log(res)
                if(res.data.code == 0) {
                  _vm.$router.push('/setBooksIndex')
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('setBooksIndexAdd.msg1')
                  })
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
                _vm.saveLoad = false
              }
            })
          }
        })
      },
      link () {
        let _vm = this
        _vm.$refs['formCustom'].validate((valid) => {
          if(valid) { 
            _vm.saveLoad = true
            _vm.$http.post({
              url: 'guard-webManager/accountMode/testDbConnect.jhtml',
              data: {
                ip: _vm.formCustom.ip,
                port: _vm.formCustom.port,
                dbName: _vm.formCustom.dbName,
                user: _vm.formCustom.user,
                password: _vm.formCustom.password
              },
              success: function(res){
                console.log(res)
                if(res.data.code == 0) {
                  _vm.key = false
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('setBooksIndexAdd.msg2')
                  })
                } else {
                  _vm.$Notice.error({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: res.data.desc
                  })
                  _vm.key = true
                }
                _vm.saveLoad = false
              },
              error: function(res){
                console.log(res)
                _vm.saveLoad = false
                _vm.key = true
                _vm.$Notice.error({
                  title: _vm.$t('publicSet.noticeTit'),
                  desc: _vm.$t('setBooksIndexAdd.msg3')
                })
              }
            })
          }
        })
      },
    }
  }
</script>

