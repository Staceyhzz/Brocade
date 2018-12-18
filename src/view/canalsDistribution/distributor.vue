/**
 * 渠道分销管理管理
 */

<template>
  <div class="container-box user" ref="containerBox">
    <div class="container-header">
      <h2>渠道分销管理</h2>
      <ul class="header-btn-group">
        <li class="header-item" @click="toAddCus"><Icon type="plus-round"></Icon>渠道报单</li>
        <li class="header-item" @click="addDis"><Icon type="plus-round"></Icon>添加渠道</li>
      </ul>
    </div>
    <div class="container-body">
      <Form :label-width="90" ref="formSearch" :model="formSearch">
        <Row type="flex" justify="start">
          <Col :xs='24' :sm='12' :md="8" :lg="6">
            <Form-item label="渠道商" prop='name'>
              <Input v-model.trim="formSearch.name" @on-enter="getList(1, formSearch)" :placeholder="$t('placeholderPublic.input')" :maxlength='20'></Input>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6">
            <Form-item label="渠道等级" prop="distributionNameLeveL">
              <Select v-model="formSearch.distributionNameLeveL" clearable>
                <Option v-for="item in levelList" :value="item.level" :key="item.id">{{ item.name }}</Option>
              </Select>
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
            <Form-item label="市场人员" prop='auditUserID'>
              <cmptInputOpen :value='createUserName' placeholder="请选择市场人员" @on-open='showUser' @on-clear='clearUser'></cmptInputOpen>
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
      <cmptChooseUserSinger placeHolder="请选择人员" @setUserData="setUser" :dimension='false' :openKey='openKey'></cmptChooseUserSinger>
      <Table stripe :columns="columns" :data="data"></Table>
      <div class="table-page">
        <div class="table-info">{{$t('publicSet.pageMsg', [pageNumber, totalPages, total])}}</div>
        <Page class="table-paginate" :total="total" @on-change='changePage' :current='pageNumber' show-elevator></Page>
      </div>
      <Modal
        title="添加渠道信息"
        v-model="modalAdd"
        :closable="false"
        @on-ok="okAdd"
        :loading="loadingAdd"
        class-name="vertical-center-modal">
        <Form ref="formAdd" :model="formAdd" :rules="ruleForm" :label-width="100" label-position="right">
          <Form-item label="渠道商名称" prop="name" required>
            <Input v-model.trim="formAdd.name" :placeholder="$t('placeholderPublic.input')" :maxlength='20'></Input>
          </Form-item>
          <Form-item label="手机号码" prop="mobile" required>
            <Input v-model.trim="formAdd.mobile" :placeholder="$t('placeholderPublic.input')" :maxlength='11'></Input>
          </Form-item>
          <Form-item label="选择上级" prop="promoterId">
            <input-remote
              :list='parentList' 
              :asyncKey='asyncKeyParent' 
              @on-change-word='changeParent'
              idProp='id' 
              nameProp='name' 
              :clearable='true'
              @on-clean='cleanParentAdd'
              ref='parentAdd'
              v-model="formAdd.promoterId">
              <template slot="title">
                <p style="width: 65%">{{$t('labelPublic.mc')}}</p>
                <p style="width: 35%">手机号</p>
              </template>
              <template scope="label">
                <p style="width: 65%">{{label.data.name}}</p>
                <p style="width: 35%">{{label.data.mobile}}</p>
              </template>
            </input-remote>
          </Form-item>
        </Form>
      </Modal>
      <Modal
        :title="levelTit"
        v-model="modalLevel"
        :closable="false"
        @on-ok="okLevel"
        :loading="loadingLevel"
        class-name="vertical-center-modal">
        <Form ref="formLevel" :model="formLevel" :rules="ruleForm" :label-width="100" label-position="right">
          <Form-item>
            <span>{{formLevel.name}} 当前的等级是：{{formLevel.levelName}}</span>
          </Form-item>
          <Form-item :label="levelLabel" prop="distributionNameLeveL" required>
            <Select v-model="formLevel.distributionNameLeveL" v-if='modalLevel' @on-change='changeLevel'>
              <Option v-for="item in levelChangeList" :value="item.level" :key="item.id">{{ item.name }}</Option>
            </Select>
          </Form-item>
          <Form-item prop="status" v-show="levelType">
            <Checkbox v-model="formLevel.status" true-value='1' false-value='0'>补差额升级</Checkbox>
            <p>充值 {{showPay}} 得 {{formLevel.coin}} {{codeName}}</p>
          </Form-item>
        </Form>
      </Modal>
    </div>
  </div>
</template>

<script>
  import inputRemote from 'components/InputRemote';
  export default {
    components: {inputRemote},
    data () {
      const validateName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请填写名称'));
        } else {
          callback();
        }
      };
      const validateMob = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请填写手机号'));
        } else {
          callback();
        }
      };
      const validateLev = (rule, value, callback) => {
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

        formSearch: {
          name: '',
          distributionNameLeveL: '',
          mobile: '',
          promoterId: '',
          logonMode: '',
          auditUserID: '',
        },

        createUserName: '',
        openKey: false,

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
            title: '渠道商',
            width: 60,
            key: 'name'
          },
          {
            title: '当前等级',
            width: 60,
            key: 'distributionName'
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
            key: 'auditUserName'
          },
          {
            title: '推荐顾客',
            width: 60,
            render: (h, params) => {
              return h('span', {
                style: {
                  color: '#4172F6',
                  cursor: 'pointer'
                },
                on: {
                  click: () => {
                    this.toRecord(params.row.name, params.row.id);
                  }
                }
              }, params.row.promoterNumber);
            }
          },
          {
            title: '渠道商图谱',
            width: 70,
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'info',
                    size: 'small',
                    icon: 'merge'
                  },
                  on: {
                    click: () => {
                      this.toTree(params.row)
                    }
                  }
                }, '图谱')
              ])
            }
          },
          {
            title: this.$t('publicSet.tableAction'),
            key: 'action',
            width: 120,
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small',
                    icon: 'arrow-up-c'
                  },
                  style: {
                    margin: '5px 3px 5px 0',
                    verticalAlign: 'middle'
                  },
                  on: {
                    click: () => {
                      this.up(params.row)
                    }
                  }
                }, '升级'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small',
                    icon: 'arrow-down-c'
                  },
                  style: {
                    margin: '5px 0px 5px 0',
                    verticalAlign: 'middle'
                  },
                  on: {
                    click: () => {
                      this.down(params.row)
                    }
                  }
                }, '降级')
              ])
            }
          }
        ],
        data: [],

        modalAdd: false,
        loadingAdd: true,
        formAdd: {
          name: '',
          mobile: '',
          promoterId: ''
        },
        ruleForm: {
          name: [
            { validator: validateName, trigger: 'blur' }
          ],
          mobile: [
            { validator: validateMob, trigger: 'blur' }
          ],
          distributionNameLeveL: [
            { validator: validateLev, trigger: 'change' }
          ],
        },

        formLevel: {
          id: '',
          distributionNameLeveL: '',
          nowLevel: '',
          status: '0',
          name: '',
          levelName: '',
          monenyNow: 0,
          monenyNew: 0,
          monenyReal: 0,
          coin: 0
        },
        codeName: '',
        modalLevel: false,
        loadingLevel: true,
        levelType: true,
        levelChangeList: []
      }
    },
    computed: {
      pageSize () {
        return this.$store.getters.getPageSize;
      },
      levelTit() {
        if(this.levelType) {
          return '升级确认';
        } else {
          return '降级确认';
        }
      },
      levelLabel() {
        if(this.levelType) {
          return '升级到';
        } else {
          return '降级到';
        }
      },
      showPay() {
        if(this.formLevel.status === '0') {
          return this.formLevel.monenyReal;
        } else {
          return this.formLevel.monenyNew;
        }
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
          url: 'guard-webManager/distributionUser/findUserListByDistributionUserStatus.jhtml',
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
      //重置
      handleReset () {
        this.$refs.formSearch.resetFields();
        this.$refs.parent.clearQuery();
        this.createUserName = '';
        this.getList(1, this.formSearch);
      },
      //充值人
      showUser () {
        this.openKey = !this.openKey;
      },
      setUser (data) {
        this.formSearch.auditUserID = data.id;
        this.createUserName = data.name;
      },
      clearUser () {
        this.formSearch.auditUserID = '';
        this.createUserName = '';
      },
      //分页
      changePage (num) {
        this.getList(num, this.formSearch);
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
      //添加渠道
      addDis() {
        this.$refs.formAdd.resetFields();
        this.$refs.parentAdd.clearQuery();
        this.modalAdd = true;
      },
      cleanParentAdd() {
        this.formAdd.promoterId = '';
      },
      okAdd() {
        let _vm = this;
        _vm.$refs.formAdd.validate((valid) => {
          if (valid) {
            _vm.$http.post({
              url: 'guard-webManager/distributionUser/addDistributionUser.jhtml',
              data: _vm.formAdd,
              success: function(res){
                if(res.data.code === 0) {
                  _vm.getList(1, _vm.formSearch)
                  _vm.modalAdd = false;
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: '添加成功，请等待审核'
                  });
                } else {
                  _vm.$Notice.error({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: res.data.desc
                  });
                  _vm.loadingAdd = false;
                  _vm.$nextTick(() => {
                    _vm.loadingAdd = true;
                  });
                }
              },
              error: function(res){
                console.log(res);
              }
            });
          } else {
            _vm.loadingAdd = false;
            _vm.$nextTick(() => {
              _vm.loadingAdd = true;
            });
          }
        });
      },
      //升级
      up(data) {
        this.levelType = true;
        this.$refs.formLevel.resetFields();
        const level = data.distributionNameLevel || 0;
        this.formLevel = {
          id: data.id,
          distributionNameLeveL: '',
          nowLevel: level,
          status: '0',
          name: data.name,
          levelName: data.distributionName || '无',
          monenyNow: data.recharge || 0,
          monenyNew: 0,
          monenyReal: 0,
          coin: 0
        };
        this.levelChangeList = this.levelList.filter(item => item.level > level);
        this.modalLevel = true;
      },
      //降级
      down(data) {
        this.levelType = false;
        this.$refs.formLevel.resetFields();
        const level = data.distributionNameLevel || 0;
        this.formLevel = {
          id: data.id,
          distributionNameLeveL: '',
          nowLevel: level,
          status: '0',
          name: data.name,
          levelName: data.distributionName || '无',
          monenyNow: data.recharge || 0,
          monenyNew: 0,
          monenyReal: 0,
          coin: 0
        };
        this.levelChangeList = this.levelList.filter(item => item.level < level);
        this.modalLevel = true;
      },
      changeLevel(val) {
        const index = this.levelChangeList.findIndex(item => item.level === val);
        if(index >= 0) {
          this.formLevel.coin = this.levelChangeList[index].getAmount;
          this.formLevel.monenyNew = (this.levelChangeList[index].recharge - this.formLevel.monenyNow).toFixed(2);
          this.formLevel.monenyReal = this.levelChangeList[index].recharge;
        }
      },
      okLevel() {
        let _vm = this;
        _vm.$refs.formLevel.validate((valid) => {
          if (valid) {
            _vm.$http.post({
              url: 'guard-webManager/distributionUserRecharge/addRechargeOrder.jhtml',
              data: {
                distributionUserID: _vm.formLevel.id,
                nowGrade: _vm.formLevel.distributionNameLeveL,
                originalGrade: _vm.formLevel.nowLevel,
                amount: _vm.levelType ? _vm.formLevel.status === '0' ? _vm.formLevel.monenyReal : _vm.formLevel.monenyNew : '0',
                virtualCurrencyBalance: _vm.levelType ? _vm.formLevel.coin : '0',
                type: _vm.levelType ? 0 : 1
              },
              success: function(res){
                if(res.data.code === 0) {
                  _vm.modalLevel = false;
                  if(!_vm.levelType) {
                    _vm.getList(1, _vm.formSearch);
                  }
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('publicSet.noticeSuccess')
                  });
                } else {
                  _vm.$Notice.error({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: res.data.desc
                  });
                  _vm.loadingLevel = false;
                  _vm.$nextTick(() => {
                    _vm.loadingLevel = true;
                  });
                }
              },
              error: function(res){
                console.log(res);
              }
            });
          } else {
            _vm.loadingLevel = false;
            _vm.$nextTick(() => {
              _vm.loadingLevel = true;
            });
          }
        });
      },
      toTree(data) {
        const breadData = [
          {
            url: '/desktop',
            text: 'layoutNav.desk'
          },
          {
            url: '/distributor',
            text: 'layoutNav.distributor'
          },
          {
            url: '/distributorTree',
            text: '渠道商图谱'
          }
        ];
        this.$store.dispatch('setBreadData', breadData);
        this.$router.push({
          path: '/distributorTree',
          query: {
            id: data.id,
          }
        });
      },
      toAddCus() {
        const breadData = [
          {
            url: '/desktop',
            text: 'layoutNav.desk'
          },
          {
            url: '/distributor',
            text: 'layoutNav.distributor'
          },
          {
            url: '/distributorAddCus',
            text: '渠道登记'
          }
        ];
        this.$store.dispatch('setBreadData', breadData);
        this.$router.push('/distributorAddCus');
      },
      toRecord(name, id) {
        const breadData = [
          {
            url: '/desktop',
            text: 'layoutNav.desk'
          },
          {
            url: '/distributorRecord',
            text: 'layoutNav.distributorRecord'
          }
        ];
        this.$store.dispatch('setBreadData', breadData);
        this.$router.push({
          path: '/distributorRecord',
          query: {
            id: id,
            name: name
          }
        });
      }
    }
  }
</script>
