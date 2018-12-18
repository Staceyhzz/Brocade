/**
* 选择题页面
*/

<template>
  <div class="container-box">
    <div class="container-header">
      <h2>{{titMsg}}</h2>
    </div>
    <div class="container-body">
      <Form :label-width="100" ref="formValidate" :model="formValidate" label-position="right" :rules="ruleForm">
        <Form-item :label="$t('surveyRtfChoice.label1')" prop="type" required>
          <Select v-model="formValidate.type">
            <Option :value="1">{{$t('surveyEdit.radio')}}</Option>
            <Option :value="2">{{$t('surveyEdit.multiselect')}}</Option>
          </Select>
        </Form-item>
        <Form-item :label="$t('surveyRtfChoice.label2')" required prop="content">
          <cmptUeditor :value='formValidate.content' @setUedContent='setContent'></cmptUeditor>
        </Form-item>
        <Form-item :label="$t('surveyRtfChoice.label',['A'])" prop='option1'>
          <Input v-model.trim="formValidate.option1" :maxlength='100'></Input>
        </Form-item>
        <Form-item :label="$t('surveyRtfChoice.label',['B'])" prop='option2'>
          <Input v-model.trim="formValidate.option2" :maxlength='100'></Input>
        </Form-item>
        <Form-item :label="$t('surveyRtfChoice.label',['C'])" prop='option3'>
          <Input v-model.trim="formValidate.option3" :maxlength='100'></Input>
        </Form-item>
        <Form-item :label="$t('surveyRtfChoice.label',['D'])" prop='option4'>
          <Input v-model.trim="formValidate.option4" :maxlength='100'></Input>
        </Form-item>
        <Form-item :label="$t('surveyRtfChoice.label',['E'])" prop='option5'>
          <Input v-model.trim="formValidate.option5" :maxlength='100'></Input>
        </Form-item>
        <Form-item :label="$t('surveyRtfChoice.label',['F'])" prop='option6'>
          <Input v-model.trim="formValidate.option6" :maxlength='100'></Input>
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
      const validateType = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('surveyRtfChoice.valid1')));
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
          type: '',
          option1: '',
          option2: '',
          option3: '',
          option4: '',
          option5: '',
          option6: '',
        },
        ruleForm: {
          content: [
            { validator: validateText, trigger: 'blur' }
          ],
          type: [
            { validator: validateType, trigger: 'change' }
          ],
        },
      }
    },
    created () {
      this.formValidate.id = this.$route.query.id
      if(this.$route.query.type == '1') {
        this.titMsg = this.$t('surveyEdit.msg2');
        this.getId()
      } else {
        this.titMsg = this.$t('surveyEdit.msg1');
        this.key = false
        this.$store.dispatch('setPageLoading', 1);
      }
    },
    methods: {
      getId () {
        let _vm = this
        _vm.$store.dispatch('setPageLoading', -1);
        _vm.$http.getPage({
          url: 'guard-webManager/surveyTitle/get.jhtml',
          data: {id: _vm.formValidate.id},
          success: function(res){
            console.log(res.data.content)
            _vm.formValidate.content = res.data.content.content
            _vm.formValidate.option1 = res.data.content.option1
            _vm.formValidate.option2 = res.data.content.option2
            _vm.formValidate.option3 = res.data.content.option3
            _vm.formValidate.option4 = res.data.content.option4
            _vm.formValidate.option5 = res.data.content.option5
            _vm.formValidate.option6 = res.data.content.option6
            _vm.formValidate.type = res.data.content.type
            _vm.$store.dispatch('setPageLoading', 1);
          },
          error: function(res){
            console.log(res);
          }
        });
      },
      setContent (data) {
        this.formValidate.content = data
      },
      save () {
        let _vm = this,
        _url = ''
        _vm.$refs['formValidate'].validate((valid) => {
          if(valid) {
            if(_vm.key) {
              _url = 'guard-webManager/surveyTitle/updateChoice.jhtml'
            } else {
              _url = 'guard-webManager/surveyTitle/addChoice.jhtml'
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

<style>
  .surveyChoice .ql-editor {
    height: 150px;
  }
</style>