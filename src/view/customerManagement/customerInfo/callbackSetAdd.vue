/** 
 * 添加回访计划页面 
 */

<template>
  <div class="container-box call-back-set">
    <div class="container-header">
      <h2>{{$t('cusNavList.callbackSet')}}</h2>
    </div>
    <div class="container-body">
      <Form ref="formBatch" :model="formBatch" :label-width="100" label-position="right" inline>
        <Form-item :label="$t('liveDeskCallback.colTit5')" prop="startTime">
          <Date-picker :transfer='true' type="date" placement="bottom-start" style="width: 164px" :options='options' @on-change='saveDate' :value='formBatch.startTime' :clearable='false'></Date-picker>
        </Form-item>
        <Form-item :label="$t('liveDeskCallback.label4')" prop="userId">
          <Input v-model="formBatch.userName" readonly icon="ios-search" @on-focus="addUser(-1)" style="width:164px"></Input>
        </Form-item>
      </Form>
      <Form ref="formValidate" :model="formValidate" :rules="ruleForm" :label-width="1" label-position="right">
        <Form-item prop="detailListStr">
          <div class="call-container">
            <div class="call-back-nav">
              <Input v-model="content" icon="ios-search" :placeholder="$t('liveDeskCallback.placeholder1_1')"></Input>
              <div class="nav-scroll">
                <ul>
                  <li v-for='(item, index) in searchList' :key='index' @click='chooseNav(item)' :class="[navId === item.id ? 'active' : '']">{{item.name}}</li>
                </ul>
              </div>
            </div>
            <div class="call-back-main">
              <Table height="430" stripe :columns="editCol" :data="editData"></Table>
            </div>
          </div>
        </Form-item>
      </Form>
      <Form ref="formAdd" :model="formAdd" :label-width="100" label-position="right" inline>
        <Form-item :label="$t('liveDeskCallback.colTit1')" prop='categoryid'>
          <Select v-model="formAdd.categoryid" style='width:164px'>
            <Option v-for="item in typeList" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
        </Form-item>
        <Form-item :label="$t('liveDeskCallback.colTit2')" prop='days'>
          <cmptInputNumber :max="1000000" :min="0" v-model="formAdd.days" @on-change='setDays'></cmptInputNumber>
        </Form-item>
        <Form-item :label="$t('liveDeskCallback.colTit4')" prop='name'>
          <Input v-model.trim="formAdd.name"></Input>
        </Form-item>
        <Button type="ghost" class='add' @click='add'>{{$t('publicSet.add')}}</Button>
      </Form>
      <div class="footer-btnGroup">
        <Button type="primary" icon="checkmark" @click='save' :loading='saveLoad'>{{$t('publicSet.save')}}</Button>
        <Button type="primary" icon="android-arrow-back" @click='back'>{{$t('publicSet.back')}}</Button>
      </div>
      <cmptChooseUserSinger :placeHolder="$t('liveDeskCallback.placeholder')" @setUserData="setUser" :openKey='userOpenKey' :defaultUser='false'></cmptChooseUserSinger>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      const validatePlan = (rule, value, callback) => {
        if (this.editData.length === 0) {
          callback(new Error(this.$t('callbackSetAdd.valid1')));
        }
        const list = this.editData.filter(item => !Number.isFinite(item.categoryid));
        if(list.length > 0) {
          callback(new Error(this.$t('callbackSetAdd.valid2')));
        }
        callback();
      };
      return {
        cusName: '',
        saveLoad: false,

        userKey: -1,
        userOpenKey: false,

        formBatch: {
          startTime: moment().format('YYYY-MM-DD'),
          userName: '',
          userId: ''
        },

        content: '',
        navList: [],
        navId: '',

        editData: [],
        editCol: [
					{
            title: this.$t('liveDeskCallback.colTit1'),
            width: 100,
            render: (h, params) => {
              return h('i-select', {
                props: {
                  value: params.row.categoryid,
                  size: 'small',
                },
                on: {
                  'on-change': (val) => {
                    this.editData[params.index].categoryid = val
                  }
                }
              }, this.typeList.map(item => {
                return h('i-option', {
                  props: {
                    value: item.id
                  }
                }, item.name)
              }))
            }
          },
          {
            title: this.$t('liveDeskCallback.colTit2'),
            width: 85,
            render: (h, params) => {
              return h('cmptInputNumber', {
                props: {
                  size: 'small',
                  min: 0,
                  value: params.row.days,
                  max: 1000000,
                },
                on: {
                  'on-change': (val) => {
                    params.row.days = parseInt(val);
                    this.editData[params.index] = params.row;
                  },
                  'on-blur': () => {
                    this.editData[params.index].time = moment(this.formBatch.startTime).add(params.row.days,
                      'd').format('YYYY-MM-DD');
                    this.editData.splice(params.index, 1, this.editData[params.index]);
                  }
                }
              })
            }
          },
          {
            title: this.$t('liveDeskCallback.colTit3'),
            width: 120,
            render: (h, params) => {
              return h('Date-picker', {
                props: {
                  type: 'date',
                  size: 'small',
                  value: params.row.time,
                  clearable: false,
                  options: this.options,
                  transfer: true
                },
                on: {
                  'on-change': (val) => {
                    this.editData[params.index].time = val
                    const end = moment(val)
                    const start = moment(this.formBatch.startTime)
                    const diff = end.diff(start, 'd')
                    this.editData[params.index].days = diff
                    this.editData.splice(params.index, 1, this.editData[params.index])
                  }
                }
              })
            }
          },
          {
            title: this.$t('liveDeskCallback.label4'),
            width: 85,
            render: (h, params) => {
              return h('Input', {
                props: {
                  value: params.row.userName,
                  readonly: true,
                  size: 'small',
                },
                on: {
                  'on-focus': () => {
                    this.addUser(params.index)
                  }
                }
              })
            }
          },
          {
            title: this.$t('liveDeskCallback.colTit4'),
            width: 120,
            render: (h, params) => {
              let _val = '',
                _bool = false
              return h('Input', {
                props: {
                  type: 'textarea',
                  value: params.row.name
                },
                on: {
                  input: (val) => {
                    console.log(val)
                    _val = val
                  },
                  'on-change': () => {
                    _bool = true
                  },
                  'on-blur': () => {
                    if (_bool) {
                      this.editData[params.index].name = _val
                    }
                  }
                }
              })
            }
          },
          {
            title: this.$t('publicSet.tableAction'),
            width: 60,
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small',
                    icon: 'ios-trash-outline'
                  },
                  on: {
                    click: () => {
                      this.remove(params.index)
                    }
                  }
                }, this.$t('publicSet.del'))
              ])
            }
          }
        ],

        formValidate: {
          customerId: '',
          startTime: moment().format('YYYY-MM-DD'),
          userId: '',
          detailListStr: '',
        },

        formAdd: {
          days: 0,
          name: '',
          categoryid: '',
          time: '',
          userId: '',
          userName: ''
        },

        options: {
          disabledDate(date) {
            return date && date.valueOf() < Date.now() - 86400000;
          }
        },
       
        ruleForm: {
          detailListStr: [{
            validator: validatePlan,
            trigger: 'change'
          }],
        }
      }
    },
    computed: {
      searchList() {
        if (this.content === '') {
          return this.navList;
        } else {
          return this.navList.filter(item => {
            console.log(item.name.indexOf(this.content))
            if (item.name.indexOf(this.content) >= 0) {
              return item;
            }
          });
        }
      },
      typeList() {
        return this.$store.getters.getSelectCallbackCategoryInfoList;
      },
    },
    created() {
      this.formBatch.userId = localStorage.getItem('userId');
      this.formBatch.userName = localStorage.getItem('userAccount');
      this.formValidate.userId = localStorage.getItem('userId');
      this.formValidate.customerId = sessionStorage.getItem('cusId');
      this.cusName = sessionStorage.getItem('cusName');
      this.getId(this.formValidate.customerId);
      this.$store.dispatch('setSelectCallbackCategoryInfoList');
    },
    methods: {
      // 获取资料
      getId(id) {
        let _vm = this;
        _vm.$store.dispatch('setPageLoading', -1);
        _vm.$http.getPage({
          url: 'guard-webManager/customerRecord/callbackSetAdd.jhtml',
          data: {
            customerId: id
          },
          success: function (res) {
						_vm.$store.dispatch('setPageLoading', 1);
						_vm.getList();
          },
          error: function (res) {
            console.log(res);
          }
        });
      },
      // 获取组列表
      getList() {
        let _vm = this;
        _vm.$http.get({
          url: 'guard-webManager/select/callbackSetList.jhtml',
          success: function (res) {
            if (res.data.code === 0) {
              _vm.navList = res.data.content || [];
            }
          },
          error: function (res) {
            console.log(res);
          }
        });
      },
      //获取弹窗用户选择列表
      addUser(type) {
        this.userKey = type;
        this.userOpenKey = !this.userOpenKey;
      },
      setUser(data) {
        if(this.userKey === -1) {
          this.formBatch.userId = data.id;
          this.formBatch.userName = data.name;
          const _data = this.editData.map(item => {
            item.userName = data.name;
            item.userId = data.id;
            return item;
          });
          this.editData.splice(0, this.editData.length, ..._data);
        } else {
          this.editData[this.userKey].userName = data.name;
          this.editData[this.userKey].userId = data.id;
          this.editData.splice(this.userKey, 1, this.editData[this.userKey]);
        }
      },
      saveDate(date) {
        this.formValidate.startTime = date;
        this.formBatch.startTime = date;
      },
      setDays(val) {
        this.$nextTick(() => {
          this.formAdd.days = parseInt(val);
        })
      },
      chooseNav(data) {
        if (this.editData.length) {
          this.$Modal.confirm({
            title: this.$t('publicSet.noticeTit'),
            content: `${this.$t('liveDeskCallback.msg1_1')}`,
            onOk: () => {
              this.pushDataIn(data);
            },
          });
        } else {
          this.pushDataIn(data);
        }
      },
      pushDataIn(data) {
        this.navId = data.id;
        let _data = data.detailList.map(item => {
          item.time = moment(this.formBatch.startTime).add(item.days, 'd').format('YYYY-MM-DD');
          item.userId = this.formBatch.userId;
          item.userName = this.formBatch.userName;
          return item;
        })
        _data = JSON.parse(JSON.stringify(_data));
        this.editData.splice(0, this.editData.length, ..._data);
        this.$refs.formValidate.validateField('detailListStr');
      },
      add() {
        this.formAdd.time = moment(this.formBatch.startTime).add(this.formAdd.days, 'd').format('YYYY-MM-DD');
        this.formAdd.userName = this.formBatch.userName;
        this.formAdd.userId = this.formBatch.userId;
        const _obj = Object.assign({}, this.formAdd);
        this.editData.push(_obj);
        this.$refs.formValidate.validateField('detailListStr');
      },
      remove(index) {
        this.editData.splice(index, 1);
      },
      save() {
        let _vm = this;
        _vm.$refs['formValidate'].validate((valid) => {
          if (valid) {
            _vm.saveLoad = true;
            _vm.formValidate.detailListStr = JSON.stringify(_vm.editData);
            _vm.$http.post({
              url: 'guard-webManager/liveDesk/addCallbackSet.jhtml',
              data: _vm.formValidate,
              success: function (res) {
                if (res.data.code === 0) {
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
                      url: '/indexCallback',
                      text: _vm.cusName
                    }
                  ];
                  _vm.$store.dispatch('setBreadData', breadData);
                  _vm.$router.push('/indexCallback')
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
              error: function (res) {
                console.log(res);
              }
            });
          }
        })
      },
      back() {
        this.$router.back(-1);
      }
    }
  }

</script>

<style scoped lang='less'>
  .call-back-set {
    .call-container {
      width: 100%;
      padding: 20px 0;
    }
    .call-back-nav {
      display: inline-block;
      width: 200px;
      vertical-align: top;
    }
    .nav-scroll {
      height: 400px;
      padding-top: 15px;
      overflow: hidden;
      ul {
        height: 100%;
        margin-right: -20px;
        overflow-y: auto;
      }
      li {
        width: 200px;
        padding: 8px;
        line-height: 17px;
        text-align: center;
        color: #2A2A2A;
        cursor: pointer;
        border-right: 3px;
        &:hover {
          color: #4172F6;
          background: rgba(65, 114, 246, 0.05);
        }
      }
      .active {
        color: #4172F6;
        background: rgba(65, 114, 246, 0.05);
      }
    }
    .call-back-main {
      display: inline-block;
      vertical-align: top;
      width: ~'calc(100% - 240px)';
      padding-left: 20px;
      margin-left: 15px;
      border-left: 1px dashed #181818;
    }
  }

</style>
