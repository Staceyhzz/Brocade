/** 
 * 登记新客户 
 */
<template>
  <div class="container-box">
    <div class="container-header">
      <h2>{{$t('onlineDesk.tit')}}</h2>
    </div>
    <div class="container-body">
      <div class="customer-item">
        <div class="customer-item-title">
          <h3>
            <Icon type="pricetag"></Icon>{{$t('addNew.tit1')}}</h3>
        </div>
        <Form ref="formAdd" :model="formAdd" :rules="ruleForm" :label-width="100" label-position="right">
          <Row :gutter="50">
            <Col :lg="12">
              <Form-item :label="$t('addNew.label1')" prop="mobile" required>
                <Input v-model.trim="formAdd.mobile" :placeholder="$t('placeholderPublic.input')" style="width: 300px" :maxlength='20'></Input>
              </Form-item>
              <Form-item :label="$t('labelPublic.xm')" prop="name" required>
                <Input v-model.trim="formAdd.name" :placeholder="$t('placeholderPublic.input')" style="width: 300px" :maxlength='20'></Input>
              </Form-item>
              <Form-item :label="$t('labelPublic.nl')" prop="age">
                <Input v-model.trim="formAdd.age" :placeholder="$t('placeholderPublic.input')" style="width: 300px"></Input>
              </Form-item>
              <Form-item :label="$t('addNew.label3')" prop='birthday'>
                <Date-picker :transfer='true' type="date" placement="bottom-start" format="MM-dd" :placeholder="$t('addNew.placeholder')" style="width: 300px" @on-change='setBirthday'
                  :clearable='false'></Date-picker>
              </Form-item>
              <Form-item :label="$t('labelPublic.kfry')" prop='userName' v-if='!addType' required>
                <Input v-model="formAdd.userName" readonly icon="ios-search" :placeholder="$t('placeholderPublic.kfry')" @on-focus='showUser' style='width:300px'></Input>
              </Form-item>
            </Col>
            <Col :lg="12">
              <Form-item :label="$t('labelPublic.xb')" prop='gender' required>
                <Select v-model="formAdd.gender" style="width:300px">
                  <Option value="1">{{$t('publicSet.man')}}</Option>
                  <Option value="2">{{$t('publicSet.woman')}}</Option>
                </Select>
              </Form-item>
              <Form-item :label="$t('labelPublic.jtly')" prop='channelId' required>
                <cmptRemoteFilterChannel :_style="{width:'300px'}" _type='usable' :_placeHolder="$t('placeholderPublic.filter')" @setChannelName='setChannelName'></cmptRemoteFilterChannel>
              </Form-item>
              <Form-item :label="$t('addNew.label2')" prop="districtId" required>
                <Select style="width:200px" @on-change='getCity' v-model="provinceId">
                  <Option v-for="item in provinceList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                </Select>
                <Select style="width:200px" @on-change='getDistrict' v-model="cityId">
                  <Option v-for="item in cityList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                </Select>
                <Select v-model="formAdd.districtId" style="width:200px">
                  <Option v-for="item in districtList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                </Select>
              </Form-item>
              <Form-item :label="$t('addNew.label4')">
                <Input :placeholder="$t('placeholderPublic.input')" style="width: 300px"></Input>
              </Form-item>
            </Col>
          </Row>
          <div class="customer-item-title">
            <h3>
              <Icon type="pricetag"></Icon>{{$t('addNew.tit2')}}</h3>
          </div>
          <Form-item :label="$t('addNew.label5')" prop='tool' required v-if='!addType'>
            <Select v-model="formAdd.tool" style="width:300px">
              <Option v-for="item in toolList" :value="item.code" :key="item.code">{{ item.name }}</Option>
            </Select>
          </Form-item>
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
	import cmptChooseUserSinger from 'components/chooseUserSinger.vue';
  export default {
		components: {cmptChooseUserSinger},
    data() {
      const validateNum = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('addNew.valid1')));
        } else {
          callback();
        }
      };
      const validateText = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('addNew.valid2')));
        } else {
          callback();
        }
      };
      const validateAge = (rule, value, callback) => {
        if (/^\+?[1-9][0-9]*$/.test(value) || value === '') {
          callback();
        } else {
          callback(new Error(this.$t('addNew.valid3')));
        }
      };
      const validateChange = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('addNew.valid4')));
        } else {
          callback();
        }
      };
      return {
        addType: true,
        saveLoad: false,
        formAdd: {
          name: '',
          mobile: '',
          age: '',
          birthday: '',
          gender: '',
          channelId: '',
          districtId: '',
          symptomId: '',
          symptom2Id: '',
          symptom3Id: '',
          symptom4Id: '',
          symptom5Id: '',
          content: '',

          userId: '',
          userName: '',
          tool: '',
				},
				userOpenKey: false,
        provinceId: '',
        cityId: '',
        channelList: [],
        provinceList: [],
        cityList: [],
        districtList: [],
        tagList: [],
        ruleForm: {
          mobile: [{
            validator: validateNum,
            trigger: 'blur'
          }],
          age: [{
            validator: validateAge,
            trigger: 'blur'
          }],
          name: [{
            validator: validateText,
            trigger: 'blur'
          }],
          districtId: [{
            validator: validateChange,
            trigger: 'blur'
          }],
          gender: [{
            validator: validateChange,
            trigger: 'change'
          }],
          channelId: [{
            validator: validateChange,
            trigger: 'change'
          }],
          symptomId: [{
            validator: validateChange,
            trigger: 'change'
          }],
          tool: [{
            validator: validateChange,
            trigger: 'change'
          }],
          userName: [{
            validator: validateChange,
            trigger: 'change'
          }],
        }
      }
    },
    computed: {
      toolList() {
        return this.$store.getters.getSelectToolList
      },
      symList() {
        return this.$store.getters.getSelectSymptomInfoList
      },
    },
    created() {
      if (this.$route.query.type == 'front') {
        this.addType = true
      } else if (this.$route.query.type == 'online') {
        this.addType = false
      }
      this.getList()
    },
    mounted() {
      if (window.localStorage) {
        var lg = window.localStorage;
        this.formAdd.userName = lg.userAccount
        this.formAdd.userId = lg.userId
      }
      if (!this.addType) {
        this.$store.dispatch('setSelectToolList')
      }
      this.getProvince()
      this.$store.dispatch('setSelectSymptomInfoList')
    },
    methods: {
      getList() {
        let _vm = this
        _vm.$store.dispatch('setPageLoading', -1)
        _vm.$http.getPage({
          url: 'guard-webManager/frontDesk/addNew.jhtml',
          data: {
            mobile: _vm.$route.query.mobile
          },
          success: function (res) {
            console.log(res)
            if(res.data.content.Mobile) {
              _vm.formAdd.mobile = res.data.content.Mobile;
            }
            if(res.data.content.Name) {
              _vm.formAdd.name = res.data.content.Name;
            }
            _vm.provinceId = res.data.content.ProvinceID * 1 || ''
            _vm.cityId = res.data.content.CityID * 1 || ''
            _vm.$store.dispatch('setPageLoading', 1);
          },
          error: function (res) {
            console.log(res);
          }
        });
      },
      //省市区
      getProvince() {
        var _vm = this;
        _vm.$http.get({
          url: 'guard-webManager/select/provinceInfo.jhtml',
          success: function (res) {
            if (res.data.code == 0) {
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
        var _vm = this;
        _vm.formAdd.districtId = ''
        if (id != '') {
          _vm.$http.get({
            url: 'guard-webManager/select/cityList.jhtml',
            data: {
              id: id
            },
            success: function (res) {
              if (res.data.code == 0) {
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
          var _vm = this;
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
      setChannelName(data) {
        this.formAdd.channelId = data.id
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
      setBirthday(date) {
        this.formAdd.birthday = date
      },
      save() {
        var _vm = this
        var _url = ''
        if (_vm.addType) {
          _url = 'guard-webManager/frontDesk/add.jhtml'
        } else {
          _url = 'guard-webManager/onlineDesk/add.jhtml'
        }
        _vm.$refs['formAdd'].validate((valid) => {
          if (valid) {
            _vm.saveLoad = true
            _vm.$http.post({
              url: _url,
              data: _vm.formAdd,
              success: function (res) {
                console.log(res)
                if (res.data.code == 0) {
                  if (_vm.addType) {
                    var breadData = [{
                        url: '/desktop',
                        text: 'layoutNav.desk'
                      },
                      {
                        url: '/frontDesk',
                        text: 'layoutNav.receptionFront'
                      },
                      {
                        url: '/triage',
                        text: 'addNew.bread'
                      },
                    ];
                    _vm.$store.dispatch('setBreadData', breadData);
                    _vm.$router.push({
                      path: '/triage',
                      query: {
                        id: res.data.content,
                        type: 'frontDesk'
                      }
                    })
                  } else {
                    var breadData = [{
                        url: '/desktop',
                        text: 'layoutNav.desk'
                      },
                      {
                        url: '/customer',
                        text: 'layoutNav.customerManage'
                      },
                      {
                        url: '/customerIndex',
                        text: res.data.content.CustomerName
                      }
                    ];
                    _vm.$store.dispatch('setBreadData', breadData);
                    _vm.$router.push({
                      path: '/customerIndex',
                      query: {
                        id: res.data.content.CustomerId
                      }
                    })
                    sessionStorage.setItem("cusName", res.data.content.CustomerName)
                    sessionStorage.setItem("cusId", res.data.content.CustomerId)
                  }
                } else {
                  _vm.$Notice.error({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: res.data.desc
                  });
                  _vm.saveLoad = false
                }
              },
              error: function (res) {
                console.log(res);
              }
            });
          }
        })
      },
      back() {
        this.$router.back(-1)
      }
    }
  }

</script>

<style scoped>
  .tagList-item {
    display: inline-block;
    margin: 3px 6px;
  }

  .prompt {
    margin-left: 20px;
    color: red;
  }

</style>
