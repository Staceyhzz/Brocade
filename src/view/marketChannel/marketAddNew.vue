/** * 市场登记新客户 */
<template>
  <div class="container-box">
    <div class="container-header">
      <h2>登记新客户</h2>
    </div>
    <div class="container-body">
      <div class="customer-item">
        <div class="customer-item-title">
          <h3>
            <Icon type="pricetag"></Icon>客户资料</h3>
        </div>
        <Form ref="formAdd" :model="formAdd" :rules="ruleForm" :label-width="100" label-position="right">
          <Row :gutter="50">
            <Col :lg="12">
            <Form-item label="联系方式" prop="mobile" required>
              <Input v-model="formAdd.mobile" placeholder="请输入联系方式" style="width: 300px"></Input>
            </Form-item>
            <Form-item label="姓名" prop="name" required>
              <Input v-model="formAdd.name" placeholder="请输入姓名" style="width: 300px"></Input>
            </Form-item>
            <Form-item label="年龄" prop="age">
              <Input v-model="formAdd.age" placeholder="请输入年龄" style="width: 300px"></Input>
            </Form-item>
            <Form-item label="生日" prop='birthday'>
              <Date-picker :transfer='true' type="date" placement="bottom-start" format="MM-dd" placeholder="选择日期" style="width: 300px"
                @on-change='setBirthday' :clearable='false'></Date-picker>
            </Form-item>
            <Form-item label="开发人员" prop='userName' required>
              <cmptDeptChooseUser _placeHolder="选择开发人员" :_style="{width:'300px'}" :_userName="formAdd.userName" v-on:setUserName="setUser"></cmptDeptChooseUser>
            </Form-item>
            </Col>
            <Col :lg="12">
            <Form-item label="性别" prop='gender' required>
              <Select v-model="formAdd.gender" style="width:300px">
                <Option value="1">男</Option>
                <Option value="2">女</Option>
              </Select>
            </Form-item>
            <Form-item label="地区" prop="districtId" required>
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
            <Form-item label="地址">
              <Input placeholder="请输入地址" style="width: 300px"></Input>
            </Form-item>
            <Form-item label="渠道" prop='storeId' required>
              <cmptRemoteFilterStore _placeHolder="选择渠道" :_style="{width:'300px'}" v-on:setStoreName="setStore" :_type='2'></cmptRemoteFilterStore>
            </Form-item>
            </Col>
          </Row>
          <div class="customer-item-title">
            <h3>
              <Icon type="pricetag"></Icon>咨询情况</h3>
          </div>
          <Form-item label="沟通方式" prop='tool' required>
            <Select v-model="formAdd.tool" style="width:300px">
              <Option v-for="item in toolList" :value="item.code" :key="item.code">{{ item.name }}</Option>
            </Select>
          </Form-item>
          <Form-item label="咨询项目" prop='symptomId' required>
            <Select v-model="formAdd.symptomId" style="width:300px" @on-change='setSymId'>
              <Option v-for="item in symList" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
          </Form-item>
          <Form-item label="其他咨询项目">
            <Select style="width:300px" @on-change='symTags' :clearable='true' ref='select' placeholder='请选择，可多选，最多可选4个'>
              <Option v-for="item in symList" :value="item.id" :key="item.id" :disabled='formAdd.symptomId == item.id'>{{ item.name }}</Option>
            </Select>
            <span class="prompt">请选择客户提及的其他咨询项目，可多选，最多可选4个</span>
            <div class="tagBox">
              <div v-for='(item, index) in tagList' :key='index' class='tagList-item' @click.capture="closeSym(index)">
                <Tag type="border" closable color="blue">{{item.name}}</Tag>
              </div>
            </div>
          </Form-item>
          <Form-item label="咨询内容" prop="content">
            <Input v-model.trim="formAdd.content" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入描述"></Input>
          </Form-item>
        </Form>
      </div>
      <div class="footer-btnGroup">
        <Button type="primary" icon="checkmark" :loading="saveLoad" @click='save'>保存</Button>
        <Button type="primary" icon="android-arrow-back" @click='back'>返回</Button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      const validateNum = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入信息'));
        } else {
          callback()
        }
      };
      const validateText = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入信息'));
        } else {
          callback();
        }
      };
      const validateAge = (rule, value, callback) => {
        if (/^\+?[1-9][0-9]*$/.test(value) || value === '') {
          callback();
        } else {
          callback(new Error('请输入正整数'));
        }
      };
      const validateChange = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请选择信息'));
        } else {
          callback();
        }
      };
      return {
        modal: false,
        saveLoad: false,
        formAdd: {
          name: '',
          mobile: '',
          age: '',
          birthday: '',
          gender: '',
          districtId: '',
          symptomId: '',
          symptom2Id: '',
          symptom3Id: '',
          symptom4Id: '',
          symptom5Id: '',
          content: '',
          storeId: '',
          userId: '',
          userName: '',
          tool: '',
        },
        provinceId: '',
        cityId: '',
        provinceList: [],
        cityList: [],
        districtList: [],
        tagList: [],
        formSearch: {
          name: ''
        },
        col: [{
            title: '名称',
            key: 'name'
          },
          {
            title: '品牌',
            key: 'categoryName'
          },
          {
            title: '联系人',
            key: 'linkman'
          },
          {
            title: '地址',
            key: 'address'
          },
        ],
        storeList: [],
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
            trigger: 'change'
          }],
          gender: [{
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
          storeId: [{
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
      this.getList()
    },
    mounted() {
      if (window.localStorage) {
        var lg = window.localStorage;
        this.formAdd.userName = lg.userAccount
        this.formAdd.userId = lg.userId
      }
      this.$store.dispatch('setSelectToolList')
      this.getProvince()
      this.$store.dispatch('setSelectSymptomInfoList')
    },
    methods: {
      getList() {
        let _vm = this
        _vm.$store.dispatch('setPageLoading', -1)
        _vm.$http.get({
          url: 'guard-webManager/frontDesk/addNew.jhtml',
          data: {
            mobile: _vm.$route.query.mobile
          },
          success: function (res) {
            if (res.data.code === 0) {
							console.log(res)
							if(res.data.content.Mobile) {
								_vm.formAdd.mobile = res.data.content.Mobile;
							}
							if(res.data.content.Name) {
								_vm.formAdd.name = res.data.content.Name;
							}
              _vm.provinceId = res.data.content.ProvinceID * 1
              _vm.cityId = res.data.content.CityID * 1
              _vm.$store.dispatch('setPageLoading', 1)
            } else {
              console.log(res.data.desc)
            }
          },
          error: function (res) {
            console.log(res);
          }
        });
      },
      setStore(data) {
        this.formAdd.storeId = data.id
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
      setUser(data) {
        this.formAdd.userId = data.id
        this.formAdd.userName = data.name
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
        _vm.$refs['formAdd'].validate((valid) => {
          if (valid) {
            _vm.saveLoad = true
            _vm.$http.post({
              url: 'guard-webManager/marketDesk/addNew.jhtml',
              data: _vm.formAdd,
              success: function (res) {
                console.log(res)
                if (res.data.code == 0) {
                  console.log(res)
                  var breadData = [{
                      url: '/desktop',
                      text: '桌面'
                    },
                    {
                      url: '/customer',
                      text: '客户管理'
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
                  _vm.$Notice.success({
                    title: '系统提示！',
                    desc: '操作成功！'
                  });
                } else {
                  _vm.$Notice.error({
                    title: '系统提示！',
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
