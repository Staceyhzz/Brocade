/**
 * 添加照片页面
 */
<template>
  <div class="container-box userPower">
    <div class="container-header">
      <h2>{{$t('cusNavList.customerPhoto')}}</h2>
    </div>
    <div class="container-body">
      <Form ref="formValidate" :model="formValidate" :label-width="100" label-position="right" :rules="ruleForm">
        <Form-item :label="$t('photoAdd.label1')" prop="createTime" required>
          <Date-picker :transfer='true' type="date" style="width: 300px" :clearable='false' @on-change='setTime' :value='timeVal'></Date-picker>
        </Form-item>
        <Form-item :label="$t('photoAdd.label2')" prop='type' required>
          <Select v-model="formValidate.type" style="width:300px">
            <Option :value="1">{{$t('photoAdd.label6')}}</Option>
            <Option :value="2">{{$t('photoAdd.label7')}}</Option>
            <Option :value="3">{{$t('photoAdd.label8')}}</Option>
            <Option :value="4">{{$t('photoAdd.label9')}}</Option>
            <Option :value="5">{{$t('photoAdd.label10')}}</Option>
          </Select>
        </Form-item>
        <Form-item :label="$t('photoAdd.label3')" prop='symptomId' required v-if='formValidate.type == 1'>
          <Select v-model="formValidate.symptomId" style="width:300px">
            <Option v-for="item in symptomList" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
        </Form-item>
        <Form-item :label="$t('photoAdd.label4')" prop='chargeId' required v-if='formValidate.type > 1 && formValidate.type < 5'>
          <Input v-model="formValidate.chargeName" readonly icon="ios-search" :placeholder="$t('photoAdd.msg2')" @on-focus="showCharge" style='width:300px;'></Input>
        </Form-item>
        <Form-item :label="$t('labelPublic.ms')" prop="remark">
          <Input v-model.trim="formValidate.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('placeholderPublic.input')"></Input>
        </Form-item>
        <Form-item :label="$t('photoAdd.label5')" required  prop='uploadList'>
          <div class="upload-list" v-for="(item, index) in showList" :key='index'>
            <img :src="item">
            <div class="upload-list-cover">
              <Icon type="ios-eye-outline" @click.native="handleView(item)"></Icon>
              <Icon type="ios-trash-outline" @click.native="handleRemove(index)"></Icon>
            </div>
          </div>
          <Upload
            ref="upload"
            :before-upload="handleBeforeUpload"
            type="drag"
            action="//"
            style="display: inline-block;width:58px;">
            <div style="width: 58px;height:58px;line-height: 58px;">
              <Icon type="camera" size="20"></Icon>
            </div>
          </Upload>
        </Form-item>
      </Form>
      <div class="footer-btnGroup">
        <Button type="primary"  icon="checkmark" @click='save' :loading='saveLoad'>{{$t('publicSet.save')}}</Button>
        <Button type="primary"  icon="android-arrow-back" @click='back'>{{$t('publicSet.back')}}</Button>
      </div>
    </div>
    <Modal :title="$t('photoAdd.msg1')" v-model="visible">
      <img :src="modalUrl" v-if="visible" style="maxWidth: 100%">
    </Modal>
    <cmptChargeChoose :placeHolder="$t('photoAdd.msg2')" @on-change="setCharge" :openKey='openKey'></cmptChargeChoose>
  </div>
</template>
<script>
  import cmptChargeChoose from 'components/chargeChoose.vue';
  export default {
    components: {
      cmptChargeChoose
    },
    data () {
      const validateImg = (rule, value, callback) => {
        if (value.length == 0) {
          callback(new Error(this.$t('photoAdd.valid2')));
        } else {
          callback();
        }
      };
      const validateChange = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('photoAdd.valid1')));
        } else {
          callback();
        }
      };
      return {
        openKey: false,
        saveLoad: false,
        visible: false,
        modalUrl: '',
        cusName: '',
        showList: [],
        timeVal: moment().format('YYYY-MM-DD'),
        formValidate: {
          customerId: '',
          createTime: moment().format('YYYY-MM-DD'),
          type: '',
          symptomId: '',
          chargeId: '',
          chargeName: '',
          remark: '',
          uploadList: [],
        },
        ruleForm: {
          type: [
            { validator: validateChange, trigger: 'change' }
          ],
          symptomId: [
            { validator: validateChange, trigger: 'change' }
          ],
          chargeId: [
            { validator: validateChange, trigger: 'change' }
          ],
          uploadList: [
            { validator: validateImg, trigger: 'change' }
          ],
        }
      }
    },
    computed: {
      symptomList () {
        return this.$store.getters.getSelectSymptomInfoList
      },
    },
    created () {
      this.formValidate.customerId = sessionStorage.getItem('cusId')
      this.cusName = sessionStorage.getItem('cusName')
      this.getId()
    },
    mounted () {
      this.$store.dispatch('setSelectSymptomInfoList')
    },
    methods: {
      // 获取资料
      getId () {
        let _vm = this
        _vm.$store.dispatch('setPageLoading', -1)
        _vm.$http.getPage({
          url: 'guard-webManager/customerRecord/getPhotoAdd.jhtml',
          data: {customerId: _vm.formValidate.customerId},
          success: function(res){
            console.log(res)
            _vm.$store.dispatch('setPageLoading', 1);
          },
          error: function(res){
            console.log(res)
          }
        })
      },
      setTime (date) {
        this.formValidate.createTime = date
      },
      showCharge () {
        this.openKey = !this.openKey;
      },
      setCharge (data) {
        this.formValidate.chargeId = data.id
        this.formValidate.chargeName = data.name
      },
      handleView (data) {
        this.modalUrl = data
        this.visible = true
      },
      handleRemove (index) {
        this.showList.splice(index, 1)
        this.formValidate.uploadList.splice(index, 1)
      },
      handleBeforeUpload (data) {
        let translateBase = 10485760
        if(/\.(gif|jpg|jpeg|bmp|png|)$/.test((data.name).toLowerCase())) {
          if(data.size < translateBase) {
            this.formValidate.uploadList.push(data)
            this.showList.push(this.getObjectURL(data));
            this.$refs.formValidate.validateField('uploadList');
          } else {
            this.$Notice.error({
              title: this.$t('publicSet.noticeTit'),
              desc: this.$t('photoAdd.valid3')
            })
          }
        } else {
          this.$Notice.error({
            title: this.$t('publicSet.noticeTit'),
            desc: this.$t('photoAdd.valid4')
          })
        }
        return false
      },
      getObjectURL (file) {
        let url = null
        if (window.createObjectURL!=undefined) { // basic
          url = window.createObjectURL(file)
        } else if (window.URL!=undefined) { // mozilla(firefox)
          url = window.URL.createObjectURL(file)
        } else if (window.webkitURL!=undefined) { // webkit or chrome
          url = window.webkitURL.createObjectURL(file)
        }
        return url
      },
      save () {
        let _vm = this,
        param = new FormData()
        _vm.$refs['formValidate'].validate((valid) => {
          if (valid) {
            _vm.saveLoad = true
            _vm.formValidate.uploadList.map((item, index) => {
              param.append('file', item)
              param.append('chunks', index)
            })
            param.append('customerId', _vm.formValidate.customerId)
            param.append('createTime', _vm.formValidate.createTime)
            param.append('type', _vm.formValidate.type)
            param.append('symptomId', _vm.formValidate.symptomId)
            param.append('chargeId', _vm.formValidate.chargeId)
            param.append('remark', _vm.formValidate.remark)
            _vm.$http.upload({
              url: 'guard-webManager/customerRecord/addPhoto.jhtml?',
              data: param,
              success: function(res){
                console.log(res)
                if(res.data.code === 0) {
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
                      url: '/indexPhoto',
                      text: _vm.cusName
                    }
                  ];
                  _vm.$store.dispatch('setBreadData', breadData);
                  _vm.$router.push('/indexPhoto');
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
              error: function(res){
                console.log(res)
              }
            })  
          }
        })
      },
      back () {
        this.$router.back(-1)
      }
    },
  }
</script>

