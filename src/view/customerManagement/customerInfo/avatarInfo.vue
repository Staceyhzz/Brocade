/** 
 * 设置头像页面 
 */

<template>
  <div class="container-box userPower">
    <div class="container-header">
      <h2>{{$t('cusNavList.customerAvatar')}}</h2>
    </div>
    <div class="container-body">
      <Form ref="formValidate" :model="formValidate" :label-width="100" label-position="right" :rules="ruleForm">
        <Form-item :label="$t('avatarInfo.label')" required prop='uploadList'>
          <div class="upload-list" v-for="(item, index) in showList" :key='item'>
            <img :src="item">
            <div class="upload-list-cover">
              <Icon type="ios-eye-outline" @click.native="handleView(item)"></Icon>
              <Icon type="ios-trash-outline" @click.native="handleRemove(index)"></Icon>
            </div>
          </div>
          <Upload ref="upload" :before-upload="handleBeforeUpload" type="drag" action="//" style="display: inline-block;width:58px;">
            <div style="width: 58px;height:58px;line-height: 58px;">
              <Icon type="camera" size="20"></Icon>
            </div>
          </Upload>
        </Form-item>
      </Form>
      <div class="footer-btnGroup">
        <Button type="primary" icon="checkmark" @click='save' :loading='saveLoad'>{{$t('publicSet.save')}}</Button>
        <Button type="primary" icon="android-arrow-back" @click='back'>{{$t('publicSet.back')}}</Button>
      </div>
    </div>
    <Modal :title="$t('avatarInfo.tit')" v-model="visible">
      <img :src="modalUrl" v-if="visible" style="width: 100%">
    </Modal>
  </div>
</template>
<script>
  export default {
    data() {
      const validateImg = (rule, value, callback) => {
        if (value.length == 0) {
          callback(new Error(this.$t('avatarInfo.valid')));
        } else {
          callback();
        }
      };
      return {
        saveLoad: false,
        visible: false,
        modalUrl: '',
        cusId: '',
        showList: [],
        uploadList: [],
        formValidate: {
          uploadList: [],
        },
        ruleForm: {
          uploadList: [{
            validator: validateImg,
            trigger: 'change'
          }]
        }
      }
    },
    created() {
      this.cusId = sessionStorage.getItem('cusId');
      this.getId();
    },
    methods: {
      // 获取资料
      getId() {
        let _vm = this;
        _vm.$store.dispatch('setPageLoading', -1);
        _vm.$http.getPage({
          url: 'guard-webManager/customerRecord/getAvatarInfo.jhtml',
          data: {
            customerId: _vm.cusId
          },
          success: function (res) {
						_vm.$store.dispatch('setPageLoading', 1);
          },
          error: function (res) {
            console.log(res)
          }
        })
      },
      // 上传之前
      handleBeforeUpload(data) {
        console.log(data)
        let translateBase = 10485760;
        if (/\.(gif|jpg|jpeg|bmp|png)$/.test((data.name).toLowerCase())) {
          if (data.size < translateBase) {
            this.formValidate.uploadList.splice(0, 1, data);
            this.showList.splice(0, 1, this.getObjectURL(data));
          } else {
            this.$Notice.error({
              title: this.$t('publicSet.noticeTit'),
              desc: this.$t('avatarInfo.msg1')
            })
          }
        } else {
          this.$Notice.error({
            title: this.$t('publicSet.noticeTit'),
            desc: this.$t('avatarInfo.msg2')
          })
        }
        return false;
      },
      //弹窗展示
      handleView(data) {
        this.modalUrl = data;
        this.visible = true;
      },
      // 删除
      handleRemove(index) {
        this.showList.splice(0);
        this.formValidate.uploadList.splice(0);
      },
      //展示小图片
      getObjectURL(file) {
        let url = null
        if (window.createObjectURL != undefined) { // basic
          url = window.createObjectURL(file)
        } else if (window.URL != undefined) { // mozilla(firefox)
          url = window.URL.createObjectURL(file)
        } else if (window.webkitURL != undefined) { // webkit or chrome
          url = window.webkitURL.createObjectURL(file)
        }
        return url
      },
      save() {
        let _vm = this,
          param = new FormData() //创建form对象
        _vm.$refs['formValidate'].validate((valid) => {
          if (valid) {
            _vm.saveLoad = true
            param.append('file', _vm.formValidate.uploadList[0])
            param.append('chunks', '0')
            param.append('customerId', _vm.cusId)
            _vm.$http.upload({
              url: 'guard-webManager/customerRecord/updateAvatar.jhtml',
              data: param,
              success: function (res) {
                console.log(res)
                if (res.data.code === 0) {
                  _vm.$router.push('/customerMsg')
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('publicSet.noticeSuccess')
                  });
                } else {
                  _vm.$Notice.error({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: res.data.desc
                  })
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
