/**
 * 渠道登记
 */

<template>
  <div class="container-box user" ref="containerBox">
    <div class="container-header">
      <h2>渠道登记</h2>
    </div>
    <div class="container-body">
      <div class="customer-item">
        <div class="customer-item-title">
          <h3>
            <Icon type="pricetag"></Icon>{{$t('addNew.tit1')}}</h3>
        </div>
        <Form ref="formAdd" :model="formAdd" :rules="ruleForm" :label-width="100" label-position="right">
          <Form-item label="顾客姓名" prop="name" required>
            <Input v-model.trim="formAdd.name" :placeholder="$t('placeholderPublic.input')" style="width: 300px" :maxlength='20'></Input>
          </Form-item>
          <Form-item label="手机号码" prop="mobile" required>
            <Input v-model.trim="formAdd.mobile" :placeholder="$t('placeholderPublic.input')" style="width: 300px" :maxlength='11'></Input>
          </Form-item>
          <Form-item :label="$t('labelPublic.xb')" prop='gender' required>
            <Select v-model="formAdd.gender" style="width:300px">
              <Option value="1">{{$t('publicSet.man')}}</Option>
              <Option value="2">{{$t('publicSet.woman')}}</Option>
            </Select>
          </Form-item>
          <Form-item :label="$t('addNew.label2')" prop="districtId" required>
            <Select style="width:300px" @on-change='getCity' v-model="provinceId">
              <Option v-for="item in provinceList" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
            <Select style="width:300px" @on-change='getDistrict' v-model="cityId">
              <Option v-for="item in cityList" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
            <Select v-model="formAdd.districtId" style="width:300px">
              <Option v-for="item in districtList" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
          </Form-item>
          <Form-item label="分销渠道" prop='distributionUserID' required>
            <input-remote
              :list='parentList' 
              :asyncKey='asyncKeyParent' 
              @on-change-word='changeParent'
              idProp='id' 
              nameProp='name' 
              size='300px'
              style="width: 300px"
              v-model="formAdd.distributionUserID">
              <template slot="title">
                <p style="width: 60%">{{$t('labelPublic.mc')}}</p>
                <p style="width: 40%">手机号</p>
              </template>
              <template scope="label">
                <p style="width: 60%">{{label.data.name}}</p>
                <p style="width: 40%">{{label.data.mobile}}</p>
              </template>
            </input-remote>
          </Form-item>
          <Form-item :label="$t('labelPublic.kfry')" prop='userName' required>
            <Input v-model="formAdd.userName" readonly icon="ios-search" :placeholder="$t('placeholderPublic.kfry')" @on-focus='showUser' style='width:300px'></Input>
          </Form-item>
          <div class="customer-item-title">
            <h3>
              <Icon type="pricetag"></Icon>{{$t('addNew.tit2')}}</h3>
          </div>
          <Form-item :label="$t('addNew.label6')" prop='symptomId' required>
            <Select v-model="formAdd.symptomId" style="width:300px" @on-change='setSymId'>
              <Option v-for="item in symList" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
          </Form-item>
          <Form-item :label="$t('addNew.label7')">
            <Select style="width:300px" @on-change='symTags' :clearable='true' ref='select'>
              <Option v-for="item in symList" :value="item.id" :key="item.id" :disabled='formAdd.symptomId == item.id'>{{ item.name }}</Option>
            </Select>
            <span class="prompt">{{$t('addNew.msg')}}</span>
            <div class="tagBox">
              <div v-for='(item, index) in tagList' :key='item.name' class='tagList-item' @click.capture="closeSym(index)">
                <Tag type="border" closable color="blue">{{item.name}}</Tag>
              </div>
            </div>
          </Form-item>
          <Form-item :label="$t('addNew.label8')" prop="content">
            <Input v-model.trim="formAdd.content" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('placeholderPublic.input')"></Input>
          </Form-item>
        </Form>
      </div>
      <div class="footer-btnGroup">
        <Button type="primary" icon="checkmark" :loading="saveLoad" @click='save'>{{$t('publicSet.add')}}</Button>
        <Button type="primary" icon="android-arrow-back" @click='back'>{{$t('publicSet.back')}}</Button>
      </div>
    </div>
    <cmptChooseUserSinger :placeHolder="$t('placeholderPublic.kfry')" @setUserData="chooseUser" :openKey='userOpenKey'></cmptChooseUserSinger>
  </div>
</template>

<script>
  import inputRemote from 'components/InputRemote';
  import cmptChooseUserSinger from 'components/chooseUserSinger.vue';
  export default {
    components: {inputRemote, cmptChooseUserSinger},
    data () {
      const validateName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请填写顾客名称'));
        } else {
          callback();
        }
      };
      const validateMob = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请填写手机号码'));
        } else {
          callback();
        }
      };
      const validateAdd = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请选择地区'));
        } else {
          callback();
        }
      };
      const validateCan = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请选择渠道商'));
        } else {
          callback();
        }
      };
      const validateSym = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请选择咨询项目'));
        } else {
          callback();
        }
      };
      return {
        formAdd: {
          name: '',
          mobile: '',
          gender: '1',
          districtId: '',
          distributionUserID: '',
          userName: '',
          userId: '',
          symptomId: '',
          symptom2Id: '',
          symptom3Id: '',
          symptom4Id: '',
          symptom5Id: '',
          content: '',
        },

        parentList: [],
        asyncKeyParent: true,
        searchParentIndex: 0,

        provinceList: [],
        cityList: [],
        districtList: [],
        provinceId: '',
        cityId: '',

        userOpenKey: false,

        saveLoad: false,

        tagList: [],

        ruleForm: {
          name: [{
            validator: validateName,
            trigger: 'blur'
          }],
          mobile: [{
            validator: validateMob,
            trigger: 'blur'
          }],
          districtId: [{
            validator: validateAdd,
            trigger: 'change'
          }],
          distributionUserID: [{
            validator: validateAdd,
            trigger: 'change'
          }],
          symptomId: [{
            validator: validateSym,
            trigger: 'change'
          }],
        },
      }
    },
    computed: {
      symList() {
        return this.$store.getters.getSelectSymptomInfoList
      },
    },
    created () {
      this.formAdd.userName = localStorage.getItem('userAccount');
      this.formAdd.userId = localStorage.getItem('userId');
      this.$store.dispatch('setPageLoading', 1);
      this.getProvince();
      this.$store.dispatch('setSelectSymptomInfoList');
    },
    methods: {
      // 获取分页
      getList() {
        let _vm = this;
        _vm.$store.dispatch('setPageLoading', -1);
        _vm.$http.getPage({
          url: 'guard-webManager/distributionUser/storeTreeList.jhtml',
          data: {
            id: _vm.$route.query.id
          },
          success: function(res){
            const obj = res.data.content || {};
            _vm.list = [obj]
            _vm.$store.dispatch('setPageLoading', 1);
          },
          error: function(res){
            console.log(res);
          }
        });
      },
      //渠道商
      changeParent(val) {
        let _vm = this;
        _vm.asyncKeyParent = true;
        _vm.searchParentIndex++;
        const _index = _vm.searchParentIndex;
        _vm.$http.get({
          url: 'guard-webManager/distributionUser/finddistributionUserList.jhtml',
          data: {
            name: val
          },
          success: function(res){
            if(res.data.code === 0) {
              if(_index === _vm.searchParentIndex) {
                _vm.parentList = res.data.content.map(item => {
                  return {
                    id: item.id,
                    name: item.name,
                    mobile: item.mobile
                  };
                }) || [];
                _vm.asyncKeyParent = false;
              }
            }
          },
          error: function(res){
            console.log(res);
          }
        });
      },
      //省市区
      getProvince() {
        let _vm = this;
        _vm.$http.get({
          url: 'guard-webManager/select/provinceInfo.jhtml',
          success: function (res) {
            if (res.data.code === 0) {
              _vm.provinceList = res.data.content
            } else {
              console.log(res.data.desc)
            }
          },
          error: function (res) {
            console.log(res);
          }
        });
      },
      getCity(id) {
        let _vm = this;
        _vm.formAdd.districtId = ''
        if (id != '') {
          _vm.$http.get({
            url: 'guard-webManager/select/cityList.jhtml',
            data: {
              id: id
            },
            success: function (res) {
              if (res.data.code === 0) {
                _vm.cityList = res.data.content
              } else {
                console.log(res.data.desc)
              }
            },
            error: function (res) {
              console.log(res);
            }
          });
        }
      },
      getDistrict(id) {
        if (typeof id == 'number') {
          let _vm = this;
          _vm.$http.get({
            url: 'guard-webManager/select/districtList.jhtml',
            data: {
              id: id
            },
            success: function (res) {
              if (res.data.code == 0) {
                _vm.districtList = res.data.content
              } else {
                console.log(res.data.desc)
              }
            },
            error: function (res) {
              console.log(res);
            }
          });
        }
      },
      //获取弹窗用户选择列表
			showUser() {
				this.userOpenKey = !this.userOpenKey;
			},
      chooseUser(data) {
        this.formAdd.userId = data.id;
        this.formAdd.userName = data.name;
      },
      setSymId(id) {
        let _index = this.tagList.findIndex(item => item.id == id)
        if (_index >= 0) {
          this.closeSym(_index)
        }
      },
      //选择其他项目
      symTags(id) {
        var _vm = this;
        var bool = true
        if (_vm.tagList.length < 4) {
          for (let _item of _vm.tagList) {
            if (id == _item.id) {
              bool = false
            }
          }
          if (bool) {
            for (var i = 0; i < _vm.symList.length; i++) {
              if (id == _vm.symList[i].id) {
                _vm.tagList.push(_vm.symList[i])
                _vm.setSym()
              }
            }
          }
        }
      },
      //取消选择项目
      closeSym(index) {
        this.tagList.splice(index, 1)
        this.$refs['select'].clearSingleSelect()
        this.setSym()
      },
      //项目保持id
      setSym() {
        var _vm = this
        _vm.formAdd.symptom2Id = typeof _vm.tagList[0] == 'object' ? _vm.tagList[0].id : null
        _vm.formAdd.symptom3Id = typeof _vm.tagList[1] == 'object' ? _vm.tagList[1].id : null
        _vm.formAdd.symptom4Id = typeof _vm.tagList[2] == 'object' ? _vm.tagList[2].id : null
        _vm.formAdd.symptom5Id = typeof _vm.tagList[3] == 'object' ? _vm.tagList[3].id : null
      },
      save() {
        let _vm = this;
        _vm.$refs['formAdd'].validate((valid) => {
          if (valid) {
            _vm.saveLoad = true;
            _vm.$http.post({
              url: 'guard-webManager/distributionCustomer/addDistriburionCustomerEntity.jhtml',
              data: _vm.formAdd,
              success: function (res) {
                if (res.data.code === 0) {
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('publicSet.noticeSuccess')
                  });
                  _vm.$router.push('/distributorRecord');
                } else {
                  _vm.$Notice.error({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: res.data.desc
                  });
                  _vm.saveLoad = false;
                }
              },
              error: function (res) {
                console.log(res);
              }
            });
          }
        })
      },
      back () {
        this.$router.back(-1);
      }
    }
  }
</script>
