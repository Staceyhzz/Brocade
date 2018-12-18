/**
* 复杂项目页面
*/

<template>
  <div class="container-box">
    <div class="container-header">
      <h2>{{titMsg}}</h2>
    </div>
    <div class="container-body">
      <Form :label-width="100" ref="formValidate" :model="formValidate" label-position="right" :rules="ruleForm" v-show="key">
        <Form-item :label="$t('labelPublic.mc')" prop="title" required>
          <Input v-model.trim="formValidate.title" :placeholder="$t('placeholderPublic.input')" :maxlength='100'></Input>
        </Form-item>
        <Form-item :label="$t('medicalRecordRtf.label')" prop='content' required>
          <!-- <cmptUeditor :value='formValidate.content' @setUedContent='setContent'></cmptUeditor> -->
          <tinymce :value="formValidate.content" @on-change='setContent'></tinymce>
        </Form-item>
      </Form>
      <div id="eee" v-html="eee">{{eee}}</div>
      <div class="footer-btnGroup">
        <Button type="primary"  icon="checkmark" @click='save' :loading='saveLoad'>{{$t('publicSet.save')}}</Button>
        <Button type="primary"  icon="android-arrow-back" @click='back'>{{$t('publicSet.back')}}</Button>
      </div>
    </div>
  </div>
</template>

<script>
  import tinymce from 'components/Tinymce';
  export default {
    components: { tinymce },
    data () {
      const validateText = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('medicalRecordRtf.valid')));
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
          title: '',
          content: '',
        },
        ruleForm: {
          content: [
            { validator: validateText, trigger: 'blur' }
          ],
          title: [
            { validator: validateText, trigger: 'blur' }
          ],
        },
        eee: '',
      }
    },
    created () {
      this.formValidate.id = this.$route.query.id
      if(this.$route.query.type == '1') {
        this.titMsg = this.$t('medicalRecordEdit.msg4');
        this.getId()
      } else {
        this.titMsg = this.$t('medicalRecordEdit.msg3');
        this.key = false
        this.$store.dispatch('setPageLoading', 1)
      }
    },
    mounted() {
      let box = document.getElementById('eee');
      box.addEventListener('click', (e) => {
        const target = e.target || e.srcElement;
        if (!!target && target.className.toLowerCase() === 'sed-form-ctrl') {
          console.log(target);
        }
      });



      // this.$nextTick(() => {

      //   let obj = document.getElementsByTagName("iframe")[0].contentWindow; 
      //   let rrr = obj.document.getElementById("tinymce");
      //   rrr.addEventListener('click', (e) => {
      //     const target = e.target || e.srcElement;
      //     if (!!target && target.className.toLowerCase()==='sed-form-ctrl') {
      //       console.log(target);
      //       e.stopPropagation();
      //     }
      //   });
      // })
    },
    methods: {
      setContent (val) {
        this.formValidate.content = val;
      },
      setContent (data) {
        this.formValidate.content = data
      },
      getId () {
        let _vm = this
        _vm.$store.dispatch('setPageLoading', -1);
        _vm.$http.getPage({
          url: 'guard-webManager/medicalRecordDetail/getComplex.jhtml',
          data: {id: _vm.formValidate.id},
          success: function(res){
            console.log(res.data.content)
            _vm.formValidate.content = res.data.content.detail.content
            _vm.formValidate.title = res.data.content.detail.title
            _vm.eee = res.data.content.detail.content
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
              _url = 'guard-webManager/medicalRecordDetail/updateComplex.jhtml'
            } else {
              _url = 'guard-webManager/medicalRecordDetail/addComplex.jhtml'
            }
            _vm.saveLoad = true
            _vm.$http.post({
              url: _url,
              data: _vm.formValidate,
              success: function(res){
                if(res.data.code === 0 ){
                  _vm.$router.push('/medicalRecordEdit')
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

<style lang="less">
.sed-form-ctrl {
  &::after {
    content: attr(data-ctrl-afterContent);
  }
}
</style>
