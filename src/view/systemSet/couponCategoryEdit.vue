/**
* 添加/修改代金券类型页面
*/

<template>
  <div class="container-box depositChargeEdit">
    <div class="container-header">
      <h2>{{titMsg}}</h2>
    </div>
    <div class="container-body">
      <Form :label-width="100" ref="formValidate" :rules="ruleForm" :model="formValidate" label-position="right">
        <Form-item :label="$t('labelPublic.mc')" prop="name" required style="width:400px">
          <Input v-model.trim="formValidate.name" :placeholder="$t('placeholderPublic.input')" :maxlength='20'></Input>
        </Form-item>
        <Form-item :label="$t('depositCharge.colTit1')" prop="hospitalIds" required>
          <Select v-model="hospId" style="width:300px" @on-change='chooseHosp' clearable ref='select'>
            <Option v-for="item in hospList" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
          <span class="prompt">{{$t('depositChargeEdit.msg1')}}</span>
          <div class="tagbox">
            <div class="tagItem" v-for='(item, index) in hospTagsList' :key='item.name' @click.capture='removeHosp(index)'>
              <Tag type="border" closable color="blue">{{item.name}}</Tag>
            </div>
          </div>
        </Form-item>
        <Form-item :label="$t('labelPublic.zt')" prop="status" v-if='key'>
          <Radio-group v-model="formValidate.status">
            <Radio :label="1">{{$t('publicSet.enable')}}</Radio>
              <Radio :label="0">{{$t('publicSet.disable')}}</Radio>
          </Radio-group>
        </Form-item>
        <Form-item :label="$t('depositCharge.colTit2')" prop="scopeLimit" class='radioModal'>
          <Radio-group v-model="formValidate.scopeLimit">
            <Radio :label="1">{{$t('depositCharge.tit3')}}</Radio>
            <Radio :label="2">{{$t('depositCharge.tit1')}}</Radio>
            <div>
              <Button type="primary" icon="plus-round" @click="addTags('categoryOpenKey')">{{$t('publicSet.add')}}</Button>
            </div>
            <div class="tagbox">
              <div class="tagItem" v-for='(item, index) in categoryTagsList' :key='item.name' @click.capture="removeTags(index, 'categoryTagsList', 'chargeCategoryIds')">
                <Tag type="border" closable color="blue">{{item.name}}</Tag>
              </div>
            </div>
            <Radio :label="3">{{$t('depositCharge.tit2')}}</Radio>
            <div>
              <Button type="primary" icon="plus-round" @click="addTags('chargeOpenKey')">{{$t('publicSet.add')}}</Button>
            </div>
            <div class="tagbox">
              <div class="tagItem" v-for='(item, index) in chargeTagsList' :key='item.name' @click.capture="removeTags(index, 'chargeTagsList', 'chargeIds')">
                <Tag type="border" closable color="blue">{{item.name}}</Tag>
              </div>
            </div>
          </Radio-group>
        </Form-item>
        <Form-item :label="$t('couponCategory.label1')" prop="timeLimit" class='radioModal'>
          <Radio-group v-model="formValidate.timeLimit">
            <Radio :label="1">{{$t('depositCharge.tit3')}}</Radio>
            <Radio :label="2">{{$t('couponCategory.label2')}}</Radio>
            <Date-picker :transfer='true' :value='dateVal' type="date" placement="bottom-start" style="width: 300px" :options='options' @on-change='saveDate' :clearable='false'></Date-picker>
            <Radio :label="3">{{$t('couponCategory.label3')}}</Radio>
            <cmptInputNumber :max="10000" :min="0" v-model="formValidate.days" style="width:300px"></cmptInputNumber>
          </Radio-group>
        </Form-item>
        <Form-item :label="$t('labelPublic.ms')" prop="remark">
          <Input v-model="formValidate.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('placeholderPublic.input')"></Input>
        </Form-item>
      </Form>
      <div class="footer-btnGroup">
        <Button type="primary"  icon="checkmark" @click='save' :loading='saveLoad'>{{$t('publicSet.save')}}</Button>
        <Button type="primary"  icon="android-arrow-back" @click='back'>{{$t('publicSet.back')}}</Button>
      </div>
      <cmptChargeChoose :placeHolder="$t('placeholderPublic.sfxm')" @on-change="chooseTags" :openKey='chargeOpenKey'></cmptChargeChoose>
      <cmptChargeCategoryChoose :placeHolder="$t('depositChargeEdit.placeHolder2')" @on-change="chooseTags" :openKey='categoryOpenKey'></cmptChargeCategoryChoose>
    </div>
  </div>
</template>

<script>
  import cmptChargeChoose from 'components/chargeChoose.vue';
  import cmptChargeCategoryChoose from 'components/chargeCategoryChoose.vue';
  export default {
    components: {cmptChargeChoose, cmptChargeCategoryChoose},
    data () {
      const validateName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('depositChargeEdit.valid1')));
        } else {
          callback();
        }
      };
      const validateHosp = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('depositChargeEdit.valid3')));
        } else {
          callback();
        }
      };
      const validateObj = (rule, value, callback) => {
        if(this.formValidate.scopeLimit === 1) {
          callback();
        }
        if(this.formValidate.scopeLimit === 2) {
          if(this.formValidate.chargeCategoryIds === '') {
            callback(new Error(this.$t('depositChargeEdit.placeHolder2')));
          } else {
            callback();
          }
        }
        if(this.formValidate.scopeLimit === 3) {
          if(this.formValidate.chargeIds === '') {
            callback(new Error(this.$t('placeholderPublic.sfxm')));
          } else {
            callback();
          }
        }
      };
      const validateTime = (rule, value, callback) => {
        if(this.formValidate.timeLimit === 1) {
          callback();
        }
        if(this.formValidate.timeLimit === 2) {
          if(this.formValidate.endDate === '') {
            callback(new Error(this.$t('couponCategory.valid1')));
          } else {
            callback();
          }
        }
        if(this.formValidate.timeLimit === 3) {
          if(this.formValidate.days === 0) {
            callback(new Error(this.$t('couponCategory.valid1')));
          } else {
            callback();
          }
        }
      };
      return {
        key: true,
        saveLoad: false,
        titMsg: '',
        formValidate: {
          id: '',
          name: '',
          hospitalIds: '',
          status: '',
          scopeLimit: 1,
          chargeCategoryIds: '',
          chargeIds: '',
          timeLimit: 1,
          endDate: '',
          days: 0,
          remark: ''
        },

        hospId: '',
        hospTagsList: [],

        modalType: 'categoryOpenKey',  //项目与项目分类共用key

        categoryOpenKey: false,
        categoryTagsList: [],

        chargeOpenKey: false,
        chargeTagsList: [],

        dateVal: '',
        options: {
          disabledDate (date) {
            return date && date.valueOf() < Date.now() - 86400000;
          }
        },

        ruleForm: {
          name: [
            { validator: validateName, trigger: 'blur' }
          ],
          hospitalIds: [
            { validator: validateHosp, trigger: 'change' }
          ],
          scopeLimit: [
            { validator: validateObj, trigger: 'change' }
          ],
          timeLimit: [
            { validator: validateTime, trigger: 'change' }
          ],
        }
      }
    },
    computed: {
      hospList () {
        return this.$store.getters.getSelectRealHospList;
      },
    },
    created () {
      if(this.$route.query.id !== 'add') {
        this.titMsg = this.$t('couponCategory.modalTit2');
        this.getId();
      } else {
        this.titMsg = this.$t('couponCategory.modalTit1');
        this.key = false;
        this.$store.dispatch('setPageLoading', 1);
      }
    },
    mounted () {
      this.$store.dispatch('setSelectRealHospList');
    },
    methods: {
      getId () {
        let _vm = this;
        _vm.$store.dispatch('setPageLoading', -1);
        _vm.$http.getPage({
          url: 'guard-webManager/couponCategory/get.jhtml',
          data: {id: _vm.$route.query.id},
          success: function(res){
            console.log(res)
            const obj = res.data.content || {};
            _vm.formValidate = {
              id: obj.id || '',
              name: obj.name || '',
              hospitalIds: obj.hospitalids || '',
              status: obj.status === 1
                ? 1
                : 0,
              scopeLimit: obj.scopelimit || 1,
              chargeCategoryIds: obj.chargecategoryids || '',
              chargeIds: obj.chargeids || '',
              timeLimit: obj.timelimit || 1,
              endDate: obj.enddate
                ? obj.enddate.split(' ')[0]
                : '',
              days: obj.days || 0,
              remark: obj.remark || ''
            };
            _vm.hospTagsList = obj.hospitalList || [];
            _vm.categoryTagsList = obj.chargeCategoryList || [];
            _vm.chargeTagsList = obj.chargeList || [];
            _vm.dateVal = _vm.formValidate.endDate;
            _vm.$store.dispatch('setPageLoading', 1);
          },
          error: function(res){
            console.log(res);
          }
        });
      },
      //选择医院
      chooseHosp (id) {
        if(!id) {
          return;
        }
        const index = this.hospTagsList.findIndex(item => item.id === id);
        if(index >= 0) {
          return;
        }
        const data = this.hospList.find(item => item.id === id);
        this.hospTagsList.push(data);
        this.formValidate.hospitalIds = this.hospTagsList.map(item => item.id).join(',');
      },
      removeHosp (index) {
        this.hospTagsList.splice(index, 1);
        this.formValidate.hospitalIds = this.hospTagsList.map(item => item.id).join(',') || '';
        this.$refs.select.clearSingleSelect();
      },
      //选择项目分类--收费项目
      addTags (key) {
        this.modalType = key;
        this[key] = !this[key];
      },
      chooseTags (data) {
        let formProp = '';
        let dataProp = '';
        if(this.modalType === 'chargeOpenKey') {
          formProp = 'chargeIds';
          dataProp = 'chargeTagsList';
        } else {
          formProp = 'chargeCategoryIds';
          dataProp = 'categoryTagsList';
        }
        const index = this[dataProp].findIndex(item => item.id === data.id);
        if(index >= 0) {
          return;
        }
        this[dataProp].push(data);
        this.formValidate[formProp] = this[dataProp].map(item => item.id).join(',');
        this.$refs.formValidate.validateField('scopeLimit');
      },
      removeTags (index, dataProp, formProp) {
        this[dataProp].splice(index, 1);
        this.formValidate[formProp] = this[dataProp].map(item => item.id).join(',');
      },
      //时间
      saveDate (date) {
        this.formValidate.endDate = date;
        this.$refs.formValidate.validateField('timeLimit');
      },
      save () {
        let _vm = this;
        let url = '';
        _vm.$refs['formValidate'].validate((valid) => {
          if(valid) {
            if(_vm.key) {
              url = 'guard-webManager/couponCategory/update.jhtml';
            } else {
              url = 'guard-webManager/couponCategory/add.jhtml';
            }
            _vm.saveLoad = true
            _vm.$http.post({
              url: url,
              data: _vm.formValidate,
              success: function(res){
                if(res.data.code === 0 ){
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('publicSet.noticeSuccess')
                  });
                  _vm.$router.push('/couponCategory')
                } else {
                  _vm.$Notice.error({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: res.data.desc
                  });
                  _vm.saveLoad = false;
                }
              },
              error: function(res){
                console.log(res);
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
  .depositChargeEdit .radioModal .ivu-radio-wrapper {
    display: block;
  }
</style>
<style scoped>
  .depositChargeEdit .prompt {
    margin-left: 20px;
    color: red;
  }
  .depositChargeEdit .tagItem {
    display: inline-block;
  }
</style>


