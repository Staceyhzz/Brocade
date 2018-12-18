/**
* 添加/修改预收款项目页面
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
        <Form-item :label="$t('labelPublic.price')" prop="price" required>
          <cmptInputNumber :max="1000000" :min="0" v-model="formValidate.price" style="width:300px" @on-change='setPrice'></cmptInputNumber>
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
        <Form-item :label="$t('depositChargeEdit.label1')" prop="hasCoupon">
          <Checkbox v-model="formValidate.hasCoupon" :true-value='1' :false-value='0'>{{$t('depositChargeEdit.label2')}}</Checkbox>
        </Form-item>
        <Form-item :label="$t('depositChargeEdit.label3')" prop="couponCategoryId">
          <Input v-model="couponName" readonly icon="ios-search" :placeholder="$t('depositChargeEdit.placeHolder1')" style='width:300px;' @on-focus='addCoupon'></Input>
        </Form-item>
        <Form-item :label="$t('depositChargeEdit.label4')" prop="couponAmount" style="width:400px">
          <cmptInputNumber :max="1000000" :min="0" v-model="formValidate.couponAmount" style="width:300px"></cmptInputNumber>
        </Form-item>
        <Form-item :label="$t('labelPublic.ms')" prop="remark">
          <Input v-model="formValidate.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('placeholderPublic.input')"></Input>
        </Form-item>
      </Form>
      <div class="footer-btnGroup">
        <Button type="primary"  icon="checkmark" @click='save' :loading='saveLoad'>{{$t('publicSet.save')}}</Button>
        <Button type="primary"  icon="android-arrow-back" @click='back'>{{$t('publicSet.back')}}</Button>
      </div>
      <Modal
        :title="$t('depositChargeEdit.placeHolder1')"
        width='700'
        v-model="modalCoupon"
        :closable="false"
        class-name="vertical-center-modal">
        <Table height="350" stripe :columns="colCoupon" :data="dataCoupon" @on-row-click='chooseCoupon'></Table>
      </Modal>
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
      const validatePrice = (rule, value, callback) => {
        if (value === 0) {
          callback(new Error(this.$t('depositChargeEdit.valid2')));
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
      const validateCon = (rule, value, callback) => {
        if(this.formValidate.hasCoupon === 0) {
          callback();
        } else {
          if (this.formValidate.couponCategoryId === '') {
            callback(new Error(this.$t('depositChargeEdit.placeHolder1')));
          } else {
            callback();
          }
        }
      };
      const validateConPrice = (rule, value, callback) => {
        if(this.formValidate.hasCoupon === 0) {
          callback();
        } else {
          if (value === 0) {
            callback(new Error(this.$t('depositChargeEdit.valid2')));
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
          price: 0,
          hospitalIds: '',
          status: '',
          scopeLimit: 1,
          chargeCategoryIds: '',
          chargeIds: '',
          hasCoupon: 0,
          couponCategoryId: '',
          couponAmount: 0,
          remark: ''
        },

        hospId: '',
        hospTagsList: [],

        modalType: 'categoryOpenKey',  //项目与项目分类共用key

        categoryOpenKey: false,
        categoryTagsList: [],

        chargeOpenKey: false,
        chargeTagsList: [],

        modalCoupon: false,
        couponName: '',
        colCoupon: [
          {
            title: this.$t('labelPublic.bh'),
            key: 'id'
          },
          {
            title: this.$t('labelPublic.mc'),
            key: 'name'
          },
          {
            title: this.$t('depositCharge.colTit1'),
            key: 'hospitalList',
            render: (h, params) => {
              const data = params.row.hospitalList.map(item => item.name) || [];
              return h('span', data.join('、'));
            }
          },
          {
            title: this.$t('labelPublic.ms'),
            key: 'remark'
          }
        ],
        dataCoupon: [],

        ruleForm: {
          name: [
            { validator: validateName, trigger: 'blur' }
          ],
          price: [
            { validator: validatePrice, trigger: 'change' }
          ],
          hospitalIds: [
            { validator: validateHosp, trigger: 'change' }
          ],
          scopeLimit: [
            { validator: validateObj, trigger: 'change' }
          ],
          couponCategoryId: [
            { validator: validateCon, trigger: 'change' }
          ],
          couponAmount: [
            { validator: validateConPrice, trigger: 'change' }
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
        this.titMsg = this.$t('depositCharge.modalTit2');
        this.getId();
      } else {
        this.titMsg = this.$t('depositCharge.modalTit1');
        this.key = false;
        this.$store.dispatch('setPageLoading', 1);
      }
    },
    mounted () {
      this.$store.dispatch('setSelectRealHospList');
      this.getCouponList();
    },
    methods: {
      getId () {
        let _vm = this;
        _vm.$store.dispatch('setPageLoading', -1);
        _vm.$http.getPage({
          url: 'guard-webManager/depositCharge/get.jhtml',
          data: {id: _vm.$route.query.id},
          success: function(res){
            console.log(res)
            const obj = res.data.content || {};
            _vm.formValidate = {
              id: obj.id || '',
              name: obj.name || '',
              price: obj.price || 0,
              hospitalIds: obj.hospitalids || '',
              status: obj.status === 1
                ? 1
                : 0,
              scopeLimit: obj.scopelimit || 1,
              chargeCategoryIds: obj.chargecategoryids || '',
              chargeIds: obj.chargeids || '',
              hasCoupon: obj.hascoupon === 1
                ? 1
                : 0,
              couponCategoryId: obj.couponcategoryid || '',
              couponAmount: obj.couponamount || 0,
              remark: obj.remark || ''
            };
            _vm.hospTagsList = obj.hospitalList || [];
            _vm.categoryTagsList = obj.chargeCategoryList || [];
            _vm.chargeTagsList = obj.chargeList || [];
            _vm.couponName = obj.couponCategoryName || '';
            _vm.$store.dispatch('setPageLoading', 1);
          },
          error: function(res){
            console.log(res);
          }
        });
      },
      getCouponList () {
        let _vm = this;
        _vm.$http.get({
          url: 'guard-webManager/select/couponCategoryList.jhtml',
          success: function(res){
            if(res.data.code === 0 ){
              _vm.dataCoupon = res.data.content || [];
            } else {
              console.log(res.data.desc)
            }
          },
          error: function(res){
            console.log(res);
          }
        });
      },
      setPrice (val) {
        this.$nextTick(() => {
          this.formValidate.price = parseFloat((val).toFixed(2));
        })
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
      //选择券
      addCoupon () {
        this.modalCoupon = true;
      },
      chooseCoupon (data) {
        this.couponName = data.name;
        this.formValidate.couponCategoryId = data.id;
        this.modalCoupon = false
      },
      save () {
        let _vm = this;
        let url = '';
        _vm.$refs['formValidate'].validate((valid) => {
          if(valid) {
            if(_vm.key) {
              url = 'guard-webManager/depositCharge/update.jhtml';
            } else {
              url = 'guard-webManager/depositCharge/add.jhtml';
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
                  _vm.$router.push('/depositCharge')
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


