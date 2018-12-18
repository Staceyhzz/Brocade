/** 
 * 回访 
 */
<template>
  <div class="container-box">
    <div class="container-header">
      <h2>{{$t('callbackDesk.btn1')}}</h2>
      <ul class="header-btn-group">
        <li class="header-item" @click="back">
          <Icon type="android-arrow-back"></Icon>{{$t('publicSet.back')}}</li>
      </ul>
    </div>
    <div class="container-body">
      <Tabs :animated='false'>
        <Tab-pane :label="$t('callbackDeskInfo.menuTit1')">
          <div class="customer-item">
            <div class="customer-item-title">
              <h3>
                <Icon type="pricetag"></Icon>{{$t('callbackDeskInfo.tit1')}}</h3>
            </div>
            <table class="tableEdit">
              <tr>
                <td class="tit">{{$t('callbackDesk.colTit1')}}</td>
                <td>{{cusData.name}}</td>
                <td class="tit">{{$t('labelPublic.nl')}}</td>
                <td>{{cusData.age}}</td>
              </tr>
              <tr>
                <td class="tit">{{$t('labelPublic.xb')}}</td>
                <td>
                  <span v-if='cusData.gender == 1'>{{$t('publicSet.man')}}</span>
                  <span v-else>{{$t('publicSet.woman')}}</span>
                </td>
                <td class="tit">{{$t('labelPublic.jtly')}}</td>
                <td>{{cusData.channelName}}</td>
              </tr>
              <tr>
                <td class="tit">{{$t('callbackDeskInfo.label1')}}</td>
                <td>{{cusData.mobile}}</td>
                <td class="tit">{{$t('callbackDeskInfo.label2')}}</td>
                <td>{{cusData.mobileOther}}</td>
              </tr>
              <tr>
                <td class="tit">{{$t('callbackDeskInfo.label3')}}</td>
                <td colspan="3">{{cusData.remark}}</td>
              </tr>
            </table>
          </div>
          <div class="customer-item">
            <div class="customer-item-title">
              <h3>
                <Icon type="pricetag"></Icon>{{$t('callbackDeskInfo.tit2')}}</h3>
            </div>
            <Form ref="formAdd" :model="formAdd" :rules="ruleForm" :label-width="100" label-position="right" style='padding-bottom:40px;'>
              <Form-item :label="$t('callbackDesk.label2')">
                <span>{{formAdd.categoryName}}</span>
              </Form-item>
              <Alert v-if='key'>{{message}}</Alert>
              <Form-item :label="$t('callbackDesk.label8')" prop='tool' required>
                <Select v-model="formAdd.tool" style="width:300px">
                  <Option v-for="item in toolList" :value="item.code" :key="item.code">{{ item.name }}</Option>
                </Select>
              </Form-item>
              <Form-item :label="$t('callbackDesk.label9')" prop='content' required>
                <Input v-model="formAdd.content" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('placeholderPublic.input')"></Input>
              </Form-item>
              <div class="customer-item-title">
                <h3>
                  <Icon type="pricetag"></Icon>{{$t('callbackDeskInfo.tit3')}}</h3>
              </div>
              <Form-item :label="$t('callbackDeskInfo.label4')" prop="type">
                <Checkbox v-model="single" @on-change='setType'>{{$t('callbackDeskInfo.tit3')}}</Checkbox>
              </Form-item>
              <Form-item :label="$t('callbackDesk.label2')" prop='categoryId' required>
                <Select v-model="formAdd.categoryId" style="width:300px">
                  <Option v-for="item in categoryList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                </Select>
              </Form-item>
              <Form-item :label="$t('callbackDesk.label1')" prop='taskTime' required>
                <Date-picker :transfer='true' type="date" :placeholder="$t('callbackDeskInfo.placeholder1')" style="width: 300px" @on-change='setTime'></Date-picker>
              </Form-item>
              <Form-item :label="$t('callbackDesk.label7')" prop='name' required>
                <Input v-model="formAdd.name" :placeholder="$t('placeholderPublic.input')" style="width:300px"></Input>
              </Form-item>
              <Form-item :label="$t('callbackDesk.colTit2')" prop="userName" required>
								<Input v-model="formAdd.userName" readonly icon="ios-search" :placeholder="$t('callbackDeskInfo.placeholder2')" @on-focus="addUser" style="width:300px"></Input>
              </Form-item>
            </Form>
          </div>
          <div class="footer-btnGroup">
            <Button type="primary" icon="checkmark" @click='save' :loading='saveLoad'>{{$t('publicSet.save')}}</Button>
            <Button type="primary" icon="android-arrow-back" @click='back'>{{$t('publicSet.back')}}</Button>
          </div>
        </Tab-pane>
        <Tab-pane :label="$t('callbackDeskInfo.menuTit2')" v-if='consultKey'>
          <Table stripe :columns="col" :data="data"></Table>
        </Tab-pane>
        <Tab-pane :label="$t('callbackDeskInfo.menuTit3')" v-if='callBackKey'>
          <Table stripe :columns="col1" :data="data1"></Table>
        </Tab-pane>
        <Tab-pane :label="$t('callbackDeskInfo.menuTit4')" v-if='orderKey'>
          <Table stripe :columns="col2" :data="data2"></Table>
        </Tab-pane>
        <Tab-pane :label="$t('callbackDeskInfo.menuTit5')" v-if='operationKey'>
          <Table stripe :columns="col3" :data="data3"></Table>
        </Tab-pane>
      </Tabs>
    </div>
		<cmptChooseUserSinger :placeHolder="$t('callbackDeskInfo.placeholder2')" @setUserData="chooseUser" :openKey='userOpenKey' :defaultUser='false'></cmptChooseUserSinger>
  </div>
</template>

<script>
	import cmptChooseUserSinger from 'components/chooseUserSinger.vue';
  export default {
		components: {cmptChooseUserSinger},
    data() {
      const validateText = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('callbackDeskInfo.valid1')));
        } else {
          callback();
        }
      };
      const validateChange = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('callbackDeskInfo.valid2')));
        } else {
          callback();
        }
      };
      const validateTypeText = (rule, value, callback) => {
        if (this.formAdd.type == '1') {
          if (value === '') {
            callback(new Error(this.$t('callbackDeskInfo.valid1')));
          } else {
            callback();
          }
        } else {
          callback()
        }
      };
      const validateTypeChange = (rule, value, callback) => {
        if (this.formAdd.type == '1') {
          if (value === '') {
            callback(new Error(this.$t('callbackDeskInfo.valid2')));
          } else {
            callback();
          }
        } else {
          callback()
        }
      };
      return {
        consultKey: false,
        callBackKey: false,
        orderKey: false,
				operationKey: false,
				userOpenKey: false,
        key: true,
        message: '',
        saveLoad: false,
        single: false,
        cusData: {},
        formAdd: {
          categoryName: '',
          id: '',
          tool: '',
          content: '',
          type: '0',
          categoryId: '',
          taskTime: '',
          name: '',
          userId: '',
          userName: '',
        },
        ruleForm: {
          content: [{
            validator: validateText,
            trigger: 'blur'
          }],
          tool: [{
            validator: validateChange,
            trigger: 'change'
          }],
          name: [{
            validator: validateTypeText,
            trigger: 'blur'
          }],
          categoryId: [{
            validator: validateTypeChange,
            trigger: 'change'
          }],
          taskTime: [{
            validator: validateTypeChange,
            trigger: 'change'
          }],
          userName: [{
            validator: validateTypeChange,
            trigger: 'change'
          }],
        },
        col: [
					{
            title: this.$t('labelPublic.xh'),
            type: 'index',
            width: 60
          },
          {
						title: this.$t('callbackDeskInfo.colTit1'),
						width: 80,
            key: 'createtime'
          },
          {
            title: this.$t('callbackDeskInfo.colTit2'),
						width: 80,
            render: (h, params) => {
              return h('span', '【' + params.row.hospitalName + '】 【' + params.row.createUserDeptName + '】 【' +
                params.row.createUserName + '】')
            }
          },
          {
            title: this.$t('callbackDeskInfo.colTit3'),
						width: 60,
            key: 'toolName'
          },
          {
            title: this.$t('callbackDeskInfo.colTit4'),
						width: 100,
            render: (h, params) => {
              const _arr = []
              if (typeof params.row.symptomName == 'string') {
                _arr.push(params.row.symptomName)
              }
              if (typeof params.row.symptom2Name == 'string') {
                _arr.push(params.row.symptom2Name)
              }
              if (typeof params.row.symptom3Name == 'string') {
                _arr.push(params.row.symptom3Name)
              }
              if (typeof params.row.symptom4Name == 'string') {
                _arr.push(params.row.symptom4Name)
              }
              if (typeof params.row.symptom5Name == 'string') {
                _arr.push(params.row.symptom5Name)
              }
              return h('span', _arr.join('、'))
            }
          },
          {
            title: this.$t('callbackDeskInfo.colTit5'),
						width: 100,
            key: 'content'
          },
        ],
        col1: [
					{
            title: this.$t('labelPublic.xh'),
            type: 'index',
            width: 60
          },
          {
            title: this.$t('callbackDeskInfo.colTit6'),
            width: 80,
            render: (h, params) => {
              if(params.row.tasktime) {
                const _text = params.row.tasktime.split(' ')[0];
                return h('span', _text)
              }
            }
          },
          {
            title: this.$t('labelPublic.lx'),
            width: 60,
            key: 'categoryName'
          },
          {
            title: this.$t('callbackDesk.label7'),
            width: 80,
            key: 'name'
          },
          {
            title: this.$t('callbackDesk.label6'),
            width: 80,
            render: (h, params) => {
              return h('span', '【' + params.row.userHospitalName + '】 【' + params.row.userDeptName + '】 【' + params
                .row.userName + '】')
            }
          },
          {
            title: this.$t('labelPublic.zt'),
            width: 60,
            render: (h, params) => {
              const _text = params.row.status == 1 ? this.$t('callbackDesk.label4') : this.$t('callbackDesk.label5')
              const _color = params.row.status == 1 ? 'blue' : 'red'
              return h('span', {
                style: {
                  color: _color
                }
              }, _text)
            }
          },
          {
            title: this.$t('callbackDesk.colTit2'),
            width: 80,
            render: (h, params) => {
              if (typeof params.row.createUserName == 'string') {
                return h('span', '【' + params.row.createUserHospitalName + '】 【' + params.row.createUserDeptName +
                  '】 【' + params.row.createUserName + '】')
              }
            }
          },
          {
            title: this.$t('callbackDesk.colTit3'),
            width: 80,
            key: 'createtime'
          },
          {
            title: this.$t('callbackDeskInfo.colTit3'),
            width: 60,
            key: 'toolName'
          },
          {
            title: this.$t('callbackDesk.label9'),
            width: 80,
            key: 'content'
          },
          {
            title: this.$t('callbackDeskInfo.colTit8'),
            width: 60,
            key: 'taskCreateUserName'
          },
          {
            title: this.$t('callbackDeskInfo.colTit9'),
            width: 80,
            key: 'taskcreatetime'
          },
        ],
        col2: [
          {
            title: this.$t('labelPublic.xh'),
            type: 'index',
            width: 60
          },
          {
            title: this.$t('callbackDeskInfo.colTit10'),
            width: 60,
            key: 'hospitalName'
          },
          {
            title: this.$t('callbackDeskInfo.colTit11'),
            width: 80,
            render: (h, params) => {
              if(params.row.orderPaidTime) {
                const _text = params.row.orderPaidTime.split(' ')[0]
                return h('span', _text)
              }
            }
          },
          {
            title: this.$t('callbackDeskInfo.colTit12'),
            width: 60,
            key: 'orderID'
          },
          {
            title: this.$t('callbackDeskInfo.colTit13'),
            width: 60,
            key: 'chargeID'
          },
          {
            title: this.$t('callbackDeskInfo.colTit14'),
            width: 60,
            key: 'chargeName'
          },
          {
            title: this.$t('labelPublic.gg'),
            width: 60,
            key: 'chargeSize'
          },
          {
            title: this.$t('labelPublic.lx'),
            width: 60,
            key: 'chargeCategoryName'
          },
          {
            title: this.$t('labelPublic.dw'),
            width: 60,
            key: 'chargeUnitName'
          },
          {
            title: this.$t('callbackDeskInfo.colTit15'),
            width: 60,
            key: 'num'
          },
          {
            title: this.$t('callbackDeskInfo.colTit16'),
            width: 60,
            key: 'operationNum'
          },
          {
            title: this.$t('callbackDeskInfo.colTit17'),
            width: 60,
            key: 'restNum',
            render: (h, params) => {
              const _color = params.row.restNum == 0 ? '' : 'red'
              return h('span', {
                style: {
                  color: _color
                }
              }, params.row.restNum)
            }
          },
          {
            title: this.$t('callbackDeskInfo.colTit18'),
            width: 60,
            key: 'doctorUserName'
          },
          {
            title: this.$t('callbackDeskInfo.colTit19'),
            width: 60,
            key: 'orderCreateUserName'
          },
          {
            title: this.$t('callbackDeskInfo.colTit20'),
            width: 60,
            className: 'AutoNewline',
            render: (h, params) => {
              if (params.row.finalPrice || params.row.finalPrice == 0) {
                const _text = params.row.finalPrice.toFixed(2)
                return h('span', _text)
              }
            }
          },
          {
            title: this.$t('callbackDeskInfo.colTit21'),
            width: 60,
            key: 'cashAmount',
            render: (h, params) => {
              if (params.row.cashAmount || params.row.cashAmount == 0) {
                const _text = params.row.cashAmount.toFixed(2)
                return h('span', _text)
              }
            }
          },
          {
            title: this.$t('callbackDeskInfo.colTit22'),
            width: 60,
            key: 'cardAmount',
            render: (h, params) => {
              if (params.row.cardAmount || params.row.cardAmount == 0) {
                const _text = params.row.cardAmount.toFixed(2)
                return h('span', _text)
              }
            }
          },
          {
            title: this.$t('callbackDeskInfo.colTit23'),
            width: 60,
            key: 'depositAmount',
            render: (h, params) => {
              if (params.row.depositAmount || params.row.depositAmount == 0) {
                const _text = params.row.depositAmount.toFixed(2)
                return h('span', _text)
              }
            }
          },
          {
            title: this.$t('callbackDeskInfo.colTit24'),
            width: 60,
            key: 'couponAmount',
            render: (h, params) => {
              if (params.row.couponAmount || params.row.couponAmount == 0) {
                const _text = params.row.couponAmount.toFixed(2)
                return h('span', _text)
              }
            }
          },
          {
            title: this.$t('callbackDeskInfo.colTit25'),
            width: 60,
            key: 'debtAmount',
            render: (h, params) => {
              if (params.row.debtAmount || params.row.debtAmount == 0) {
                const _text = params.row.debtAmount.toFixed(2)
                const _color = params.row.debtAmount > 0 ? 'red' : ''
                return h('span', {
                  style: {
                    color: _color
                  }
                }, _text)
              }
            }
          },
          {
            title: this.$t('callbackDeskInfo.colTit26'),
            width: 60,
            key: 'backNum',
            render: (h, params) => {
              const _color = params.row.backNum > 0 ? 'red' : ''
              return h('span', {
                style: {
                  color: _color
                }
              }, params.row.backNum)
            }
          },
          {
            title: this.$t('callbackDeskInfo.colTit27'),
            width: 60,
            key: 'backAmount',
            render: (h, params) => {
              if (params.row.backAmount || params.row.backAmount == 0) {
                const _text = params.row.backAmount.toFixed(2)
                const _color = params.row.backAmount > 0 ? 'red' : ''
                return h('span', {
                  style: {
                    color: _color
                  }
                }, _text)
              }
            }
          },
        ],
        col3: [
          {
            title: this.$t('labelPublic.xh'),
            type: 'index',
            width: 60
          },
          {
            title: this.$t('callbackDeskInfo.colTit28'),
            width: 80,
            key: 'createtime',
            render: (h, params) => {
              if(params.row.createTime) {
                const _text = params.row.createTime.split(' ')[0]
                return h('span', _text)
              }
            }
          },
          {
            title: this.$t('callbackDeskInfo.colTit29'),
            width: 60,
            key: 'hospitalName'
          },
          {
            title: this.$t('callbackDeskInfo.colTit30'),
            width: 60,
            key: 'createUserName'
          },
          {
            title: this.$t('callbackDeskInfo.colTit14'),
            width: 60,
            key: 'chargeName'
          },
          {
            title: this.$t('callbackDeskInfo.colTit31'),
            width: 80,
            key: 'orderPaidTime',
            render: (h, params) => {
              if(params.row.orderPaidTime) {
                const _text = params.row.orderPaidTime.split(' ')[0]
                return h('span', _text)
              }
            }
          },
          {
            title: this.$t('labelPublic.dw'),
            width: 60,
            key: 'chargeUnitName'
          },
          {
            title: this.$t('callbackDeskInfo.colTit15'),
            width: 60,
            key: 'num'
          },
          {
            title: this.$t('labelPublic.ms'),
            width: 100,
            key: 'remark'
          },
          {
            title: this.$t('callbackDeskInfo.colTit32'),
            width: 100,
            key: 'operatorList',
            render: (h, params) => {
              return h('div', params.row.operatorList.map(item => {
                const _text = typeof item.positionName == 'string' ? '：' + item.positionName : ''
                return h('p', '【' + item.userDeptName + '】 【' + item.userName + '】' + _text)
              }))
            }
          },
        ],
        data: [],
        data1: [],
        data2: [],
        data3: [],
      }
    },
    computed: {
      toolList() {
        return this.$store.getters.getSelectToolList
      },
      categoryList() {
        return this.$store.getters.getSelectCallbackCategoryInfoList
			},
			langRouterKey () {
        return this.$store.getters.getLandRouterKey;
      },
		},
    watch: {
      langRouterKey (val) {
        if(val === 'callbackDeskInfo') {
          this.getList(this.$route.query.id);
        }
      },
    },
    created() {
      const _powerTabs = JSON.parse(localStorage.getItem('cusMenu'))
      const _consult = _powerTabs.findIndex(item => item.id === "indexConsult")
      this.consultKey = _consult < 0 ? false : true
      const _order = _powerTabs.findIndex(item => item.id === "indexOrderDetail")
      this.orderKey = _order < 0 ? false : true
      const _callBack = _powerTabs.findIndex(item => item.id === "indexCallback")
      this.callBackKey = _callBack < 0 ? false : true
      const _opera = _powerTabs.findIndex(item => item.id === "indexOperation")
      this.operationKey = _opera < 0 ? false : true
      this.getList(this.$route.query.id)
      this.formAdd.id = this.$route.query.id
      this.formAdd.userId = localStorage.getItem('userId')
      this.formAdd.userName = localStorage.getItem('userAccount')
    },
    mounted() {
      this.$store.dispatch('setSelectToolList')
      this.$store.dispatch('setSelectCallbackCategoryInfoList')
    },
    methods: {
      getList(id) {
        var _vm = this
        _vm.$store.dispatch('setPageLoading', -1)
        _vm.$http.getPage({
          url: 'guard-webManager/callbackDesk/callbackInfo.jhtml',
          data: {
            id: id
          },
          success: function (res) {
            const cusMsg = res.data.content.Customer || {};
            const callMsg = res.data.content.Callback || {};
            const consult = res.data.content.ConsultList || [];
            const callBack = res.data.content.CallbackList || [];
            const order = res.data.content.OrderDetailList || [];
            const operationList = res.data.content.OperationList || [];
            const showObj = {
              name: cusMsg.name || '',
              age: res.data.content.Age || '',
              gender: cusMsg.gender || 1,
              channelName: cusMsg.channelName || '',
              mobile: res.data.content.Mobile || '',
              mobileOther: res.data.content.MobileOther || '',
              remark: cusMsg.remark || '',
              message: res.data.content.Tip || '',
              categoryName: callMsg.categoryName || '',
              content: callMsg.name || ''
            };
            if(res.data.content.Tip) {
              _vm.key = true;
            } else {
              _vm.key = false;
            }
            if(_vm.langRouterKey !== 'callbackDeskInfo') {
              _vm.cusData = showObj;
              _vm.message = showObj.message;
              _vm.formAdd.categoryName = showObj.categoryName;
              _vm.formAdd.content = showObj.content;
              _vm.data = consult;
              _vm.data1 = callBack;
              _vm.data2 = order;
              _vm.data3 = operationList;
            } else {
              _vm.requestList([showObj], ['channelName', 'message', 'categoryName', 'remark']).then(res => {
                _vm.cusData = res[0];
                _vm.message = res[0].message;
                _vm.formAdd.categoryName = res[0].categoryName;
                _vm.formAdd.content = res[0].content;
              });
              _vm.requestList(consult, ['toolName', 'symptomName', 'symptom2Name', 'symptom3Name', 'symptom4Name', 'symptom5Name', 'content']).then(res => _vm.data = res);
              _vm.requestList(callBack, ['categoryName', 'name', 'toolName', 'content']).then(res => _vm.data1 = res);
              _vm.requestList(order, ['chargeName', 'chargeSize', 'chargeCategoryName', 'chargeUnitName']).then(res => _vm.data2 = res);
              _vm.requestList(operationList, ['chargeName', 'remark', 'chargeUnitName']).then(res => _vm.data3 = res);
            }
            _vm.$store.dispatch('setPageLoading', 1);
          },
          error: function (res) {
            console.log(res);
          }
        });
      },
      addUser() {
				this.userOpenKey = !this.userOpenKey;
			},
      chooseUser(data) {
        this.formAdd.userId = data.id
        this.formAdd.userName = data.name
      },
      setType(val) {
        if (val) {
          this.formAdd.type = 1
        } else {
          this.formAdd.type = 0
        }
      },
      setTime(date) {
        this.formAdd.taskTime = date
      },
      save() {
        var _vm = this;
        _vm.$refs['formAdd'].validate((valid) => {
          if (valid) {
            _vm.saveLoad = true
            _vm.$http.post({
              url: 'guard-webManager/callbackDesk/callbackSave.jhtml',
              data: _vm.formAdd,
              success: function (res) {
                console.log(res)
                if (res.data.code === 0) {
									_vm.$router.push('/callbackDesk')
									_vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('publicSet.noticeSuccess')
                  });
                } else {
                  if(_vm.langRouterKey !== 'callbackDeskInfo') {
                    _vm.$Notice.error({
                      title: _vm.$t('publicSet.noticeTit'),
                      desc: res.data.desc
                    });
                  } else {
                    _vm.getLang.word(res.data.desc, (data) => {
                      _vm.$Notice.error({
                        title: _vm.$t('publicSet.noticeTit'),
                        desc: data[0].dst
                      });
                    });
                  }
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
