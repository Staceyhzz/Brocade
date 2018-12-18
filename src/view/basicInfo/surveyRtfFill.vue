/**
* 填空题页面
*/

<template>
  <div class="container-box">
    <div class="container-header">
      <h2>{{titMsg}}</h2>
    </div>
    <div class="container-body">
      <Form :label-width="100" ref="formValidate" :model="formValidate" label-position="right" :rules="ruleForm">
        <Form-item :label="$t('surveyRtfChoice.label2')" prop='content' required>
          <cmptUeditor :value='formValidate.content' @setUedContent='setContent'></cmptUeditor>
        </Form-item>
      </Form>
      <div class="footer-btnGroup">
        <Button type="primary"  icon="checkmark" @click='save' :loading='saveLoad'>{{$t('publicSet.save')}}</Button>
        <Button type="primary"  icon="android-arrow-back" @click='back'>{{$t('publicSet.back')}}</Button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      const validateText = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('surveyRtfChoice.valid2')));
        } else {
          callback();
        }
      };
      return {
        saveLoad: false,
        key: true,
        titMsg: '',
        formValidate: {
          id: '',
          content: '',
        },
        ruleForm: {
          content: [
            { validator: validateText, trigger: 'blur' }
          ],
        },
      }
    },
    created () {
      this.formValidate.id = this.$route.query.id
      if(this.$route.query.type == '1') {
        this.titMsg = this.$t('surveyEdit.msg4');
        this.getId()
      } else {
        this.titMsg = this.$t('surveyEdit.msg3');
        this.key = false
        this.$store.dispatch('setPageLoading', 1)
      }
    },
    methods: {
      setContent (data) {
        this.formValidate.content = data
      },
      getId () {
        let _vm = this
        _vm.$store.dispatch('setPageLoading', -1);
        _vm.$http.getPage({
          url: 'guard-webManager/surveyTitle/get.jhtml',
          data: {id: _vm.formValidate.id},
          success: function(res){
            console.log(res.data.content)
            _vm.formValidate.content = res.data.content.content
            _vm.$store.dispatch('setPageLoading', 1);
          },
          error: function(res){
            console.log(res);
          }
        });
      },
      save () {
        let _vm = this,
        _url = ''
        _vm.$refs['formValidate'].validate((valid) => {
          if(valid) {
            if(_vm.key) {
              _url = 'guard-webManager/surveyTitle/updateCompletion.jhtml'
            } else {
              _url = 'guard-webManager/surveyTitle/addCompletion.jhtml'
            }
            _vm.saveLoad = true
            _vm.$http.post({
              url: _url,
              data: _vm.formValidate,
              success: function(res){
                if(res.data.code === 0 ){
                  _vm.$router.push('/surveyEdit')
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('publicSet.noticeSuccess')
                  });
                } else {
                  _vm.$Notice.error({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: res.data.desc
                  });
                  _vm.saveLoad = false
                }
              },
              error: function(res){
                console.log(res)
              }
            });
          }
        })
      },
      back () {
        this.$router.back(-1)
      }
    }
  }
</script>
