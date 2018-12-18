/**
 * 编辑照片页面
 */
<template>
  <div class="container-box userPower">
    <div class="container-header">
      <h2>{{$t('indexPhoto.tit')}}</h2>
    </div>
    <div class="container-body">
      <Form ref="formValidate" :model="formValidate" :label-width="100" label-position="right" :rules="ruleForm">
        <Form-item :label="$t('photoUpdate.label1')">
          <img :src="imageUrl" alt="" style='maxWidth: 100%;'/>
        </Form-item>
        <Form-item :label="$t('photoUpdate.label2')">
          <span>【{{createUserHospitalName}}】【{{createUserDeptName}}】【{{createUserName}}】</span>
        </Form-item>
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
      </Form>
      <div class="footer-btnGroup">
        <Button type="primary"  icon="checkmark" @click='save' :loading='saveLoad'>{{$t('publicSet.save')}}</Button>
        <Button type="primary"  icon="android-arrow-back" @click='back'>{{$t('publicSet.back')}}</Button>
      </div>
    </div>
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
        cusName: '',
        timeVal: '',
        createUserHospitalName: '',
        createUserDeptName: '',
        createUserName: '',
        imageUrl: '',
        formValidate: {
          id: '',
          createTime: '',
          type: '',
          symptomId: '',
          chargeId: '',
          chargeName: '',
          remark: '',
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
        }
      }
    },
    computed: {
      symptomList () {
        return this.$store.getters.getSelectSymptomInfoList
      },
      baseImgURL () {
        return this.$store.getters.getBaseImgURL
      },
    },
    created () {
      this.cusName = sessionStorage.getItem('cusName');
      this.getId();
    },
    mounted () {
      this.$store.dispatch('setSelectSymptomInfoList');
    },
    methods: {
      // 获取资料
      getId () {
        let _vm = this;
        _vm.$store.dispatch('setPageLoading', -1);
        _vm.$http.getPage({
          url: 'guard-webManager/customerRecord/getPhotoUpdate.jhtml',
          data: {id: _vm.$route.query.id},
          success: function(res){
            const obj = res.data.content || {};
            _vm.imageUrl = _vm.baseImgURL + obj.imageurl || '';
            _vm.createUserHospitalName = obj.createUserHospitalName || '';
            _vm.createUserDeptName = obj.createUserDeptName || '';
            _vm.createUserName = obj.createUserName || '';
            _vm.timeVal = obj.createtime
              ? obj.createtime.split(' ')[0]
              : '';
            _vm.formValidate = {
              id: obj.id || '',
              createTime: _vm.timeVal,
              type: obj.type || '',
              symptomId: obj.symptomid || '',
              chargeId: obj.chargeid || '',
              chargeName: obj.chargeName || '',
              remark: obj.remark || '',
            };
            _vm.$store.dispatch('setPageLoading', 1);
          },
          error: function(res){
            console.log(res)
          }
        })
      },
      setTime (date) {
        this.formValidate.createTime = date;
      },
      showCharge () {
        this.openKey = !this.openKey;
      },
      setCharge (data) {
        this.formValidate.chargeId = data.id
        this.formValidate.chargeName = data.name
      },
      save () {
        let _vm = this;
        _vm.$refs['formValidate'].validate((valid) => {
          if(valid) { 
            _vm.saveLoad = true;
            _vm.$http.post({
              url: 'guard-webManager/customerRecord/updatePhoto.jhtml',
              data: _vm.formValidate,
              success: function(res){
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
        this.$router.back(-1);
      }
    },
  }
</script>

