/** 
 * 添加划扣页面 
 */

<template>
  <div class="container-box operation-add">
    <div class="container-header">
      <h2>{{$t('cusNavList.customerOperation')}}</h2>
    </div>
    <div class="container-body">
      <Form ref="formValidate" :model="formValidate" :label-width="100" label-position="right" :rules="ruleForm">
        <Form-item :label="$t('operationAdd.label1')" required prop="createDate">
          <Date-picker :transfer='true' type="datetime" placement="bottom-start" :placeholder="$t('operationAdd.valid3')" style="width: 300px" @on-change='saveDate' :options='options' ref='timeChange'></Date-picker>
        </Form-item>
        <Form-item :label="$t('labelPublic.ms')" prop="remark">
          <Input v-model.trim="formValidate.remark" type="textarea" :autosize="{minRows: 2,maxRows: 7}" :placeholder="$t('placeholderPublic.input')"></Input>
        </Form-item>
        <Form-item :label="$t('operationAdd.label2')" prop="operationListStr" required>
          <Table stripe :columns="col" :data="data"></Table>
        </Form-item>
      </Form>
      <div class="footer-btnGroup">
        <Button type="primary" icon="checkmark" @click='save' :loading='saveLoad'>{{$t('publicSet.save')}}</Button>
        <Button type="primary" icon="android-arrow-back" @click='back'>{{$t('publicSet.back')}}</Button>
      </div>
    </div>
  </div>
</template>

<script>
  import operationDoctor from 'components/operationDoctor.vue';
  export default {
    components: {
      operationDoctor
    },
    data() {
      const validateList = (rule, value, callback) => {
        const chooseList = this.data.filter(item => item.orderNum > 0);
        if (chooseList.length === 0) {
          callback(new Error(this.$t('operationAdd.valid1')));
        }
        const docList = chooseList.filter(item => item.editList.length === 0);
        console.log(docList)
        if (docList.length > 0) {
          callback(new Error(this.$t('operationAdd.valid2')));
        }
        callback();
      };
      const validateTime = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('operationAdd.valid3')));
        } else {
          callback();
        }
      };
      return {
        cusName: '',
        saveLoad: false,
        powerKey: true,
        formValidate: {
          customerId: '',
          createDate: '',
          remark: '',
          operationListStr: '',
          operatorListStr: '',
        },
        positionList: [],
        doctorList: [],
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
                    this.data[params.index]._expanded = data.length ?
                      true :
                      false;
                    this.$refs.formValidate.validateField('operationListStr');
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
            title: this.$t('operationAdd.colTit1'),
            width: 60,
            key: 'chargeName'
          },
          {
            title: this.$t('operationAdd.colTit2'),
            width: 60,
            key: 'hospitalName'
          },
          {
            title: this.$t('operationAdd.colTit3'),
            width: 80,
            render: (h, params) => {
              if(params.row.orderPaidTime) {
                const _text = params.row.orderPaidTime.split(' ')[0];
                return h('span', _text);
              }
            }
          },
          {
            title: this.$t('labelPublic.lx'),
            width: 60,
            key: 'chargeCategoryName'
          },
          {
            title: this.$t('operationAdd.colTit4'),
            width: 60,
            key: 'doctorUserName'
          },
          {
            title: this.$t('labelPublic.dw'),
            key: 'chargeUnitName',
            width: 40
          },
          {
            title: this.$t('operationAdd.colTit5'),
            key: 'num',
            width: 40
          },
          {
            title: this.$t('operationAdd.colTit6'),
            key: 'restNum',
            width: 40
          },
          {
            title: this.$t('labelPublic.ms'),
            width: 80,
            key: 'remark',
          },
          {
            title: this.$t('operationAdd.colTit7'),
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
                    if (params.row.orderNum !== 0) {
                      this.data[params.index]._expanded = true;
                    } else {
                      this.data[params.index]._expanded = false;
                    }
                    this.data.splice(params.index, 1, this.data[params.index]);
                    this.$refs.timeChange.handleClear();
                  }
                }
              })
            }
          },
        ],
        data: [],
        ruleForm: {
          operationListStr: [{
            validator: validateList,
            trigger: 'blur'
          }],
          createDate: [{
            validator: validateTime,
            trigger: 'change'
          }],
        }
      }
    },
    computed: {
      options () {
        const chooseList = this.data.filter(item => item.orderNum > 0);
        const timeList = chooseList.map(item => moment(item.orderPaidTime.split(' ')[0])) || [];
        const maxTime = moment.max(...timeList).format('x');
        return {
          disabledDate(date) {
            if(date.valueOf() < maxTime) {
              return true;
            } else if (Date.now() < date.valueOf()) {
              return true;
            } else {
              return false;
            }
          }
        }
      },
    },
    created() {
      this.formValidate.customerId = sessionStorage.getItem('cusId');
      this.cusName = sessionStorage.getItem('cusName');
      this.getId(this.formValidate.customerId);
    },
    methods: {
      // 获取资料
      getId(id) {
        let _vm = this;
        _vm.$store.dispatch('setPageLoading', -1)
        _vm.$http.getPage({
          url: 'guard-webManager/customerRecord/operationAdd.jhtml',
          data: {
            customerId: id
          },
          success: function (res) {
            console.log(res)
            let obj = res.data.content || {};
            _vm.powerKey = obj.isMedical === 1 ?
              true :
              false;
            _vm.data = obj.OrderDetailList.map(item => {
              return {
                ...item,
                orderNum: 0,
                editList: [],
                _expanded: false
              };
            }) || [];
            _vm.doctorList = obj.UserList || [];
            _vm.positionList = obj.PositionList || [];
            _vm.$store.dispatch('setPageLoading', 1);
          },
          error: function (res) {
            console.log(res);
          }
        });
      },
      saveDate(date) {
        this.formValidate.createDate = date;
      },
      save() {
        let _vm = this;
        _vm.$refs['formValidate'].validate((valid) => {
          if (valid) {
            const chooseList = _vm.data.filter(item => item.orderNum > 0);
            _vm.formValidate.operationListStr = JSON.stringify(chooseList.map(item => {
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
            _vm.formValidate.operatorListStr = JSON.stringify(docList);
            let obj = Object.assign(_vm.formValidate, {});
            obj.createDate = moment(_vm.formValidate.createDate).format('YYYY-MM-DD HH:mm:ss');
            _vm.saveLoad = true;
            _vm.$http.post({
              url: 'guard-webManager/customerRecord/addOperation.jhtml',
              data: obj,
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
                      url: '/indexOperation',
                      text: _vm.cusName
                    }
                  ];
                  _vm.$store.dispatch('setBreadData', breadData);
                  _vm.$router.push('/indexOperation');
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

<style type="text/css">
  .operation-add .ivu-table-wrapper {
    border-width: 1px;
  }

  .operation-add .ivu-table table th,
  .operation-add .ivu-table table td {
    border-width: 1px;
  }

  .operation-add .ivu-table:before,
  .operation-add .ivu-table:after {
    display: block;
  }

</style>
