/** 
 * 添加划扣页面 
 */

<template>
  <div class="container-box dept-operation-add">
    <div class="container-header">
      <h2>{{$t('deptDeskOperationAdd.tit')}}</h2>
    </div>
    <div class="container-body">
      <Tabs value="name1" :animated='false'>
        <TabPane :label="$t('deptDeskOperationAdd.menu1')" name="name1">
          <Form :label-width="60" ref="formAdd" :model="formAdd" label-position="right" :rules="ruleForm">
            <Form-item :label="$t('deptDeskOperationAdd.label')" prop="operationListStr" required>
              <Table stripe :columns="col" :data="data"></Table>
            </Form-item>
            <Form-item :label="$t('labelPublic.ms')" prop="remark">
              <Input v-model="formAdd.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('placeholderPublic.input')"></Input>
            </Form-item>
          </Form>
          <div class="footer-btnGroup">
            <Button type="primary" icon="checkmark" @click='save' :loading='saveLoad'>{{$t('publicSet.save')}}</Button>
            <Button type="primary" icon="android-arrow-back" @click='back'>{{$t('publicSet.back')}}</Button>
          </div>
        </TabPane>
        <TabPane :label="$t('deptDeskOperationAdd.menu2')" name="name2">
          <Form :label-width="60" label-position="right">
            <Form-item :label="$t('deptDeskOperationAdd.label')">
              <Table stripe :columns="col2" :data="data2"></Table>
            </Form-item>
          </Form>
        </TabPane>
      </Tabs>
    </div>
  </div>
</template>

<script>
  import operationDoctor from 'components/operationDoctor.vue'
  import onlineOperationDoctor from 'components/onlineOperationDoctor.vue'
  export default {
    components: {
      operationDoctor,
      onlineOperationDoctor
    },
    data() {
      const validateList = (rule, value, callback) => {
        const chooseList = this.data.filter(item => item.orderNum > 0);
        if(chooseList.length === 0) {
          callback(new Error(this.$t('deptDeskOperationAdd.valid')));
        }
        const docList = chooseList.filter(item => item.editList.length === 0);
        console.log(docList)
        if(docList.length > 0) {
          callback(new Error(this.$t('deptDeskOperationUpdate.valid')));
        }
        callback();
      };
      return {
        saveLoad: false,
        powerKey: true,
        doctorList: [],
        positionList: [],
        col: [
          {
            type: 'expand',
            width: 30,
            render: (h, params) => {
              return h(operationDoctor, {
                props: {
                  index: params.index,
                  powerKey: this.powerKey,
                  doctorList: this.doctorList,
                  positionList: this.positionList,
                  editList: params.row.editList
                },
                on: {
                  'on-change': (data) => {
                    this.data[params.index].editList = data;
                    this.data[params.index]._expanded = data.length
                      ? true
                      : false;
                    this.$refs.formAdd.validateField('operationListStr');
                  }
                }
              })
            }
          },
          {
            title: this.$t('labelPublic.xh'),
            type: 'index',
            width: 40
          },
          {
            title: this.$t('deptDesk.colTit7'),
            width: 60,
            key: 'chargeName'
          },
          {
            title: this.$t('deptDeskOperationAdd.colTit1'),
            width: 60,
            key: 'hospitalName'
          },
          {
            title: this.$t('deptDeskOperationAdd.colTit2'),
            key: 'orderPaidTime',
            width: 80,
            render: (h, params) => {
              const _text = params.row.orderPaidTime.split(' ')[0];
              return h('span', _text)
            }
          },
          {
            title: this.$t('labelPublic.lx'),
            width: 60,
            key: 'chargeCategoryName'
          },
          {
            title: this.$t('deptDeskOperationAdd.colTit3'),
            width: 60,
            key: 'doctorUserName'
          },
          {
            title: this.$t('labelPublic.dw'),
            key: 'chargeUnitName',
            width: 40
          },
          {
            title: this.$t('deptDeskOperationAdd.colTit4'),
            key: 'num',
            width: 40
          },
          {
            title: this.$t('deptDeskOperationAdd.colTit5'),
            key: 'finalPrice',
            width: 80,
            render: (h, params) => {
              return h('span', params.row.finalPrice.toFixed(2))
            }
          },
          {
            title: this.$t('deptDeskOperationAdd.colTit6'),
            key: 'restNum',
            width: 40
          },
          {
            title: this.$t('labelPublic.ms'),
            width: 60,
            key: 'remark',
          },
          {
            title: this.$t('deptDeskOperationAdd.colTit7'),
            key: 'orderNum',
            width: 110,
            render: (h, params) => {
              return h('cmptInputNumber', {
                props: {
                  size: 'small',
                  min: 0,
                  max: params.row.restNum,
                  value: params.row.orderNum
                },
                on: {
                  'on-change': (val) => {
                    params.row.orderNum = parseInt(val);
                    this.data[params.index] = params.row;
                  },
                  'on-blur': () => {
                    console.log(params.row.orderNum)
                    if (params.row.orderNum !== 0) {
                      this.data[params.index]._expanded = true;
                    } else {
                      this.data[params.index]._expanded = false;
                    }
                    this.data.splice(params.index, 1, this.data[params.index]);
                    this.$refs.formAdd.validateField('operationListStr');
                  }
                }
              })
            }
          },
        ],
        col2: [
          {
            type: 'expand',
            width: 30,
            render: (h, params) => {
              return h(onlineOperationDoctor, {
                props: {
                  powerKey: this.powerKey,
                  orderNum: params.row.orderNum,
                  orderId: params.row.id,
                  cusId: this.$route.query.id * 1,
                  doctorList: this.doctorList,
                  positionList: this.positionList,
                  editList: params.row.editList,
                  editRemark: params.row.editRemark
                },
                on: {
                  'setOnlineOrder': () => {
                    this.getOnlineList()
                  },
                  'on-change': (data) => {
                    this.data2[params.index].editList = data;
                    this.data2[params.index]._expanded = data.length
                      ? true
                      : false;
                  },
                  'on-change-text': (val) => {
                    this.data2[params.index].editRemark = val;
                    this.data2[params.index]._expanded = val.length > 0
                      ? true
                      : false;
                    console.log(this.data2[params.index].editRemark)
                  }
                }
              })
            }
          },
          {
            title: this.$t('labelPublic.xh'),
            type: 'index',
            width: 40
          },
          {
            title: this.$t('deptDesk.colTit7'),
            width: 60,
            key: 'productName'
          },
          {
            title: this.$t('deptDeskOperationAdd.colTit2'),
            width: 80,
            key: 'createDate',
            render: (h, params) => {
              const _text = params.row.createDate.split(' ')[0]
              return h('span', _text)
            }
          },
          {
            title: this.$t('deptDeskOperationAdd.colTit8'),
            width: 60,
            key: 'sn',
          },
          {
            title: this.$t('deptDeskOperationAdd.colTit4'),
            key: 'num',
            width: 40
          },
          {
            title: this.$t('deptDeskOperationAdd.colTit5'),
            width: 80,
            render: (h, params) => {
              return h('span', params.row.entireAmount.toFixed(2))
            }
          },
          {
            title: this.$t('deptDeskOperationAdd.colTit6'),
            key: 'restNum',
            width: 40
          },
          {
            title: this.$t('deptDeskOperationAdd.colTit10'),
            width: 50,
            render: (h, params) => {
              const _text = params.row.operationStatus === 1 ? this.$t('deptDeskOperationAdd.colTit11') : this.$t('deptDeskOperationAdd.colTit12')
              const _color = params.row.operationStatus === 1 ? 'red' : 'blue'
              return h('span', {
                style: {
                  color: _color
                }
              }, _text)
            }
          },
          {
            title: this.$t('deptDeskOperationAdd.colTit7'),
            key: 'orderNum',
            width: 110,
            render: (h, params) => {
              if (params.row.operationStatus != 1) {
                return h('cmptInputNumber', {
                  props: {
                    size: 'small',
                    min: 0,
                    max: params.row.restNum,
                    value: params.row.orderNum
                  },
                  on: {
                    'on-change': (val) => {
                      params.row.orderNum = parseInt(val);
                      this.data2[params.index] = params.row;
                    },
                    'on-blur': () => {
                      console.log(params.row.orderNum)
                      if (params.row.orderNum !== 0) {
                        this.data2[params.index]._expanded = true;
                      } else {
                        this.data2[params.index]._expanded = false;
                      }
                      this.data2.splice(params.index, 1, this.data2[params.index]);
                    }
                  }
                })
              }
            }
          },
        ],
        data: [],
        data2: [],
        formAdd: {
          remark: '',
          customerId: '',
          operationListStr: '',
          operatorListStr: '',
        },
        ruleForm: {
          operationListStr: [{
            validator: validateList,
            trigger: 'blur'
          }],
        }
      }
    },
    created() {
      this.getId()
      this.formAdd.customerId = this.$route.query.id
    },
    methods: {
      getId() {
        let _vm = this
        _vm.$store.dispatch('setPageLoading', -1)
        _vm.$http.getPage({
          url: 'guard-webManager/deptDesk/operationAdd.jhtml',
          data: {
            customerId: _vm.$route.query.id
          },
          success: function (res) {
            const obj = res.data.content || {};
            _vm.doctorList = obj.UserList || [];
            _vm.positionList = obj.PositionList || [];
            _vm.powerKey = obj.isMedical === 1
              ? true
              : false;
            _vm.data = obj.OrderDetailList.map(item => {
              return {
                ...item,
                orderNum: 0,
                _expanded: false,
                editList: []
              };
            }) || [];
            if (obj.isBetterCustomer === 1) {
              _vm.getOnlineList();
            }
            _vm.$store.dispatch('setPageLoading', 1);
          },
          error: function (res) {
            console.log(res);
          }
        });
      },
      getOnlineList() {
        let _vm = this;
        _vm.$http.get({
          url: 'guard-webManager/deptDesk/getOperationAdd.jhtml',
          data: {
            customerId: _vm.$route.query.id
          },
          success: function (res) {
            if (res.data.code === 0) {
              _vm.data2 = res.data.content.OrderDetailList.map(item => {
                return {
                  ...item,
                  editList: [],
                  orderNum: 0,
                  editRemark: '',
                  _expanded: false,
                  _disableExpand: item.operationStatus === 1
                    ? true
                    : false
                };
              }) || [];
            }
          },
          error: function (res) {
            console.log(res)
          }
        })
      },
      save() {
        let _vm = this;
        _vm.$refs['formAdd'].validate((valid) => {
          if (valid) {
            const chooseList = _vm.data.filter(item => item.orderNum > 0);
            _vm.formAdd.operationListStr = JSON.stringify(chooseList.map(item => {
              return {
                id: item.id,
                num: item.orderNum
              };
            }));
            let docList = [];
            chooseList.map(item => {
              item.editList.map(u => {
                docList.push({
                  id: item.id,
                  userId: u.userId,
                  positionId: u.positionId
                });
              });
            });
            _vm.formAdd.operatorListStr = JSON.stringify(docList);
            _vm.saveLoad = true;
            _vm.$http.post({
              url: 'guard-webManager/deptDesk/operationAddEdit.jhtml',
              data: _vm.formAdd,
              success: function (res) {
                if (res.data.code === 0) {
                  _vm.$router.push('/deptDesk');
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('publicSet.noticeSuccess')
                  });
                } else {
                  _vm.$Notice.error({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: res.data.desc
                  });
                  _vm.getId()
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

<style lang='less'>
  .dept-operation-add {
    .ivu-table th,
    .ivu-table td,
    .ivu-table-wrapper {
      border-width: 1px;
    }
    .ivu-table:before,
    .ivu-table:after {
      display: block;
    }
  }

</style>
