/**
* 打印设置编辑模板页面
*/

<template>
  <div class="container-box">
    <div class="container-header">
      <h2>{{$t('print.modalTit3')}}</h2>
    </div>
    <div class="container-body">
      <Alert>
        <p>{{$t('print.' + keyInfo)}}</p>
      </Alert>
      <Form :label-width="100" ref="formValidate" :model="formValidate" label-position="right" :rules="ruleForm">
        <Form-item :label="$t('print.label5')" prop='content' required>
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
          callback(new Error(this.$t('print.valid')));
        } else {
          callback();
        }
      };
      return {
        saveLoad: false,
        key: true,
        type: '',
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
    computed: {
      keyInfo() {
        const typeList = this.$store.getters.getPrintTypeSet;
        const index = typeList.findIndex(item => item.id === this.type);
        if(index >= 0) {
          return typeList[index].remark;
        }
      },
    },
    created () {
      this.formValidate.id = this.$route.query.id
      this.type = this.$route.query.type
      this.getId()
    },
    methods: {
      setContent (data) {
        this.formValidate.content = data
      },
      getId () {
        let _vm = this
        _vm.$store.dispatch('setPageLoading', -1);
        _vm.$http.getPage({
          url: 'guard-webManager/printSet/getContent.jhtml',
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
        let _vm = this
        _vm.$refs['formValidate'].validate((valid) => {
          if(valid) {
            _vm.saveLoad = true
            _vm.$http.post({
              url: 'guard-webManager/printSet/updateContentEdit.jhtml',
              data: _vm.formValidate,
              success: function(res){
                if(res.data.code == 0 ){
                  _vm.$router.back(-1);
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
