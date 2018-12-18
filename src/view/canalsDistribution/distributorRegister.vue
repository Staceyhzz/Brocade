/**
 * 渠道注册审核管理管理
 */

<template>
  <div class="container-box user" ref="containerBox">
    <div class="container-header">
      <h2>渠道注册审核管理</h2>
    </div>
    <div class="container-body">
      <Form :label-width="90" ref="formSearch" :model="formSearch">
        <Row type="flex" justify="start">
          <Col :xs='24' :sm='12' :md="8" :lg="6">
            <Form-item label="注册时间" prop='startTime'>
              <Date-picker :transfer='true' type="daterange" placement="bottom-start" :clearable="false" @on-change='setDate' :value='dateBox' style='width:100%'></Date-picker>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6">
            <Form-item label="手机号" prop='mobile'>
              <Input v-model.trim="formSearch.mobile" @on-enter="getList(1, formSearch)" :placeholder="$t('placeholderPublic.input')" :maxlength='11'></Input>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6">
            <Form-item label="上级渠道" prop='promoterId'>
              <input-remote
                :list='parentList' 
                :asyncKey='asyncKeyParent' 
                @on-change-word='changeParent'
                idProp='id' 
                nameProp='name' 
                :clearable='true'
                @on-clean='cleanParent'
                ref='parent'
                size='300px'
                v-model="formSearch.promoterId">
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
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6">
            <Form-item label="注册方式" prop="logonMode">
              <Select v-model="formSearch.logonMode" clearable>
                <Option v-for="item in typeList" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6">
            <Form-item label="审核状态" prop="status">
              <Select v-model="formSearch.status" clearable>
                <Option v-for="item in statusList" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6">
            <Form-item label="入会状态" prop="duesMark">
              <Select v-model="formSearch.duesMark" clearable>
                <Option v-for="item in duesMarkList" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6">
            <ul class="header-btn-group">
              <li class="header-item"  @click="getList(1, formSearch)"><Icon type="search"></Icon>{{$t('publicSet.search')}}</li>
              <li class="header-item" @click="handleReset"><Icon type="refresh"></Icon>{{$t('publicSet.reset')}}</li>
            </ul>
          </Col>
        </Row>
      </Form>
      <Table stripe :columns="columns" :data="data"></Table>
      <div class="table-page">
        <div class="table-info">{{$t('publicSet.pageMsg', [pageNumber, totalPages, total])}}</div>
        <Page class="table-paginate" :total="total" @on-change='changePage' :current='pageNumber' show-elevator></Page>
      </div>
    </div>
    <Modal
      title="注册审核"
      v-model="modalAudit"
      :closable="false"
      @on-ok="okAudit"
      :loading="loadingAudit"
      class-name="vertical-center-modal">
      <Form ref="formAudit" :model="formAudit" :rules="ruleForm" :label-width="100" label-position="right">
        <Form-item label="审核结果" prop="status" required>
          <RadioGroup v-model="formAudit.status">
            <Radio :label="1">通过</Radio>
            <Radio :label="2">拒绝</Radio>
          </RadioGroup>
        </Form-item>
        <Form-item label="选择等级" prop="nowGrade" required v-show="formAudit.status === 1">
          <Select v-model="formAudit.nowGrade"  @on-change='changeLevel'>
            <Option v-for="item in levelList" :value="item.level" :key="item.id">{{ item.name }}</Option>
          </Select>
        </Form-item>
        <Form-item v-show="formAudit.status === 1">
          <p>充 {{formAudit.amount}} 得 {{formAudit.virtualCurrencyBalance}} {{codeName}}</p>
        </Form-item>
      </Form>
    </Modal>
    <Modal
      title="缴费"
      v-model="modalPay"
      :closable="false"
      @on-ok="okPay"
      :loading="loadingPay"
      class-name="vertical-center-modal">
      <Form ref="formPay" :model="formPay" :rules="ruleForm1" :label-width="100" label-position="right">
        <Form-item label="选择等级" prop="nowGrade" required>
          <Select v-model="formPay.nowGrade" @on-change='changeLevelPay'>
            <Option v-for="item in levelList" :value="item.level" :key="item.id">{{ item.name }}</Option>
          </Select>
        </Form-item>
        <Form-item >
          <p>充 {{formPay.amount}} 得 {{formPay.virtualCurrencyBalance}} {{codeName}}</p>
        </Form-item>
      </Form>
    </Modal>
  </div>
</template>

<script>
  import resizeTime from 'components/tableResizeTime.vue';
  import inputRemote from 'components/InputRemote';
  export default {
    components: {inputRemote, resizeTime},
    data () {
      const validateLev = (rule, value, callback) => {
        if(this.formAudit.status === 2) {
          callback();
        }
        if (value === '') {
          callback(new Error('请选择等级'));
        } else {
          callback();
        }
      };
      const validateLev1 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请选择等级'));
        } else {
          callback();
        }
      };
      return {
        total: 0,
        totalPages: 1,
        pageNumber: 1,

        dateBox: [moment().startOf('isoWeek').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')],
        formSearch: {
          startTime: moment().startOf('isoWeek').format('YYYY-MM-DD'),
          endTime: moment().format('YYYY-MM-DD'),
          status: '',
          mobile: '',
          promoterId: '',
          logonMode: '',
          duesMark: ''
        },

        parentList: [],
        asyncKeyParent: true,
        searchParentIndex: 0,

        typeList: [
          {
            id: 0,
            name: '扫码'
          },
          {
            id: 1,
            name: '推荐码'
          },
          {
            id: 2,
            name: '员工登记'
          },
          {
            id: 3,
            name: '自主注册'
          }
        ],

        statusList: [
          {
            id: 0,
            name: '审核中',
            color: 'orange'
          },
          {
            id: 1,
            name: '已通过',
            color: '#4172F6'
          },
          {
            id: 2,
            name: '已拒绝',
            color: '#FF6F76'
          },
        ],

        duesMarkList: [
          {
            id: 0,
            name: '——',
            color: 'orange'
          },
          {
            id: 1,
            name: '待缴费',
            color: '#FF6F76'
          },
          {
            id: 2,
            name: '已缴费',
            color: '#4172F6'
          },
        ],

        levelList: [],

        columns: [
          {   
            title: this.$t('labelPublic.xh'),
            width: 50,
            render: (h, params) => {
              const _index = (this.pageNumber - 1) * 10;
              return h('span', params.index + 1 + _index);
            }
          },
          {
            title: '注册时间',
            width: 80,
            render: (h, params) => {
              if(params.row.registerDate) {
                return h(resizeTime, {
                  props: {
                    time: params.row.registerDate
                  }
                })
              }
            }
          },
          {
            title: '注册人',
            width: 60,
            key: 'name'
          },
          {
            title: '手机号',
            width: 100,
            key: 'mobile',
          },
          {
            title: '上级渠道',
            width: 60,
            key: 'promoterName'
          },
          {
            title: '注册方式',
            width: 60,
            render: (h, params) => {
              const index = this.typeList.findIndex(item => item.id === params.row.logonMode);
              if(index >= 0) {
                return h('span', this.typeList[index].name);
              }
            }
          },
          {
            title: '市场人员',
            width: 60,
            key: 'developUserName'
          },
          {
            title: '审核状态',
            width: 60,
            render: (h, params) => {
              const index = this.statusList.findIndex(item => item.id === params.row.status);
              if(index >= 0) {
                return h('span', {
                  style: {
                    color: this.statusList[index].color
                  }
                }, this.statusList[index].name);
              }
            }
          },
          {
            title: '入会状态',
            width: 60,
            render: (h, params) => {
              const index = this.duesMarkList.findIndex(item => item.id === params.row.duesMark);
              if(index >= 0) {
                return h('span', this.duesMarkList[index].name);
              }
            }
          },
          {
            title: '审核人',
            width: 60,
            key: 'auditUserName'
          },
          {
            title: '审核时间',
            width: 80,
            render: (h, params) => {
              if(params.row.auditUserDate) {
                return h(resizeTime, {
                  props: {
                    time: params.row.auditUserDate
                  }
                })
              }
            }
          },
          {
            title: this.$t('publicSet.tableAction'),
            key: 'action',
            width: 120,
            render: (h, params) => {
              const display1 = params.row.status === 0 ? 'inline-block' : 'none';
              const display2 = params.row.duesMark === 1 ? 'inline-block' : 'none';
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small',
                    icon: 'checkmark-round'
                  },
                  style: {
                    margin: '5px 3px 5px 0',
                    verticalAlign: 'middle',
                    display: display1
                  },
                  on: {
                    click: () => {
                      this.audit(params.row.id, 1);
                    }
                  }
                }, '通过'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small',
                    icon: 'close-round'
                  },
                  style: {
                    margin: '5px 3px 5px 0',
                    verticalAlign: 'middle',
                    display: display1
                  },
                  on: {
                    click: () => {
                      this.audit(params.row.id, 2);
                    }
                  }
                }, '拒绝'),
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small',
                    icon: 'cash'
                  },
                  style: {
                    margin: '5px 0px 5px 0',
                    verticalAlign: 'middle',
                    display: display2
                  },
                  on: {
                    click: () => {
                      this.pay(params.row.id);
                    }
                  }
                }, '缴费')
              ]);
            }
          }
        ],
        data: [],

        modalAudit: false,
        loadingAudit: true,
        formAudit: {
          id: '',
          status: '',
          originalGrade: 0,
          nowGrade: '',
          amount: 0,
          virtualCurrencyBalance: 0
        },

        modalPay: false,
        loadingPay: true,
        formPay: {
          id: '',
          originalGrade: 0,
          nowGrade: '',
          amount: 0,
          virtualCurrencyBalance: 0
        },

        codeName: '虚拟币',

        ruleForm: {
          nowGrade: [
            { validator: validateLev, trigger: 'change' }
          ]
        },
        ruleForm1: {
          nowGrade: [
            { validator: validateLev1, trigger: 'change' }
          ]
        },
      }
    },
    computed: {
      pageSize () {
        return this.$store.getters.getPageSize;
      },
    },
    created () {
      this.getList(1, this.formSearch);
      this.getLevel();
      this.getName();
    },
    methods: {
      // 获取分页
      getList(pageNumber, form) {
        let _vm = this;
        _vm.$store.dispatch('setPageLoading', -1);
        form['pageIndex'] = pageNumber;
        form['pageSize'] = _vm.pageSize;
        _vm.$http.getPage({
          url: 'guard-webManager/distributionUser/findUserListByDistributionUser.jhtml',
          data: form,
          success: function(res){
            _vm.data = res.data.content.content || [];
            _vm.total = res.data.content.total;
            _vm.pageNumber = res.data.content.pageNumber;
            _vm.totalPages = res.data.content.totalPages;
            _vm.$store.dispatch('setPageLoading', 1);
          },
          error: function(res){
            console.log(res);
          }
        });
      },
      //获取等级
      getLevel() {
        let _vm = this;
        _vm.$http.get({
          url: 'guard-webManager/distributionSet/getDistributionNameList.jhtml',
          success: function(res){
            if(res.data.code === 0) {
              _vm.levelList = res.data.content || [];
            }
          },
          error: function(res){
            console.log(res);
          }
        });
      },
      //获取名称
      getName() {
        let _vm = this;
        _vm.$http.get({
          url: 'guard-webManager/distributionSet/getVirtualcurrencyName.jhtml',
          success: function(res){
            if(res.data.code === 0) {
              _vm.codeName = res.data.content || '虚拟币';
            }
          },
          error: function(res){
            console.log(res);
          }
        });
      },
      setDate (date) {
        this.formSearch.startTime = date[0];
        this.formSearch.endTime = date[1];
      },
      //重置
      handleReset () {
        this.$refs.formSearch.resetFields();
        this.$refs.parent.clearQuery();
        this.formSearch.startTime = moment().startOf('isoWeek').format('YYYY-MM-DD');
        this.formSearch.endTime = moment().format('YYYY-MM-DD');
        this.dateBox = [moment().startOf('isoWeek').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')];
        this.getList(1, this.formSearch);
      },
      //分页
      changePage (num) {
        this.getList(num, this.formSearch);
      },
      //上级渠道商
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
      cleanParent() {
        this.formSearch.promoterId = '';
      },
      //审核
      audit(id, type) {
        this.$refs.formAudit.resetFields();
        this.formAudit.id = id;
        this.formAudit.status = type;
        this.formAudit.amount = 0;
        this.formAudit.virtualCurrencyBalance = 0;
        this.modalAudit = true;
      },
      changeLevel(id) {
        if(id) {
          this.$refs.formAudit.validateField('nowGrade');
          const obj = this.levelList.find(item => item.level === id);
          this.formAudit.amount = obj.recharge;
          this.formAudit.virtualCurrencyBalance = obj.getAmount;
        }
      },
      okAudit() {
        let _vm = this;
        _vm.$refs.formAudit.validate((valid) => {
          if (valid) {
            _vm.$http.post({
              url: 'guard-webManager/distributionUser/updateAuditStatus.jhtml',
              data: _vm.formAudit,
              success: function(res){
                if(res.data.code === 0) {
                  _vm.getList(1, _vm.formSearch);
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('publicSet.noticeSuccess')
                  });
                  _vm.modalAudit = false;
                } else {
                  _vm.$Notice.error({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: res.data.desc
                  });
                  _vm.loadingAudit = false;
                  _vm.$nextTick(() => {
                    _vm.loadingAudit = true;
                  });
                }
              },
              error: function(res){
                console.log(res);
              }
            });
          } else {
            _vm.loadingAudit = false;
            _vm.$nextTick(() => {
              _vm.loadingAudit = true;
            });
          }
        });
      },
      //缴费
      pay(id) {
        this.$refs.formPay.resetFields();
        this.formPay.id = id;
        this.formPay.amount = 0;
        this.formPay.virtualCurrencyBalance = 0;
        this.modalPay = true;
      },
      changeLevelPay(id) {
        if(id) {
          this.$refs.formPay.validateField('nowGrade');
          const obj = this.levelList.find(item => item.level === id);
          this.formPay.amount = obj.recharge;
          this.formPay.virtualCurrencyBalance = obj.getAmount;
        }
      },
      okPay() {
        let _vm = this;
        _vm.$refs.formPay.validate((valid) => {
          if (valid) {
            _vm.$http.post({
              url: 'guard-webManager/distributionUser/updateContinueAuditStatus.jhtml',
              data: _vm.formPay,
              success: function(res){
                if(res.data.code === 0) {
                  _vm.getList(1, _vm.formSearch);
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('publicSet.noticeSuccess')
                  });
                  _vm.modalPay = false;
                } else {
                  _vm.$Notice.error({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: res.data.desc
                  });
                  _vm.loadingPay = false;
                  _vm.$nextTick(() => {
                    _vm.loadingPay = true;
                  });
                }
              },
              error: function(res){
                console.log(res);
              }
            });
          } else {
            _vm.loadingPay = false;
            _vm.$nextTick(() => {
              _vm.loadingPay = true;
            });
          }
        });
      },
    }
  }
</script>
