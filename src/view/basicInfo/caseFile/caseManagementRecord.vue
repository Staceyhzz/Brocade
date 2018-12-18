/**
* 病例记录管理
*/

<template>
  <div class="container-box">
    <div class="container-header">
      <h2>病例记录管理</h2>
    </div>
    <div class="container-body">
      <Form :label-width="90" :model="formSearch" ref='formSearch'>
        <Row type="flex" justify="start">
          <Col :xs='24' :sm='12' :md="8" :lg="6">
            <Form-item label="病历号" prop='caseNumber'>
              <Input :maxlength='20' v-model.trim="formSearch.caseNumber" :placeholder="$t('placeholderPublic.input')" @on-enter="getList(1, formSearch)"></Input>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6">
            <Form-item label="病例类型" prop='caseId'>
              <Select v-model="formSearch.caseId" clearable>
                <Option :value="item.Id" v-for="(item, index) in caseList" :key="index">{{item.name}}</Option>
              </Select>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6">
            <Form-item label="顾客编号" prop='customerId'>
              <Input :maxlength='15' v-model.trim="formSearch.customerId" :placeholder="$t('placeholderPublic.input')" @on-enter="getList(1, formSearch)"></Input>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6">
            <Form-item label="创建时间">
              <Date-picker :transfer='true' type="daterange" placement="bottom" :placeholder="$t('customer.placeholder2')" @on-change='setCreatTime' :value='createBox' style='width:100%'></Date-picker>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6">
            <Form-item label="创建人" prop='createUserId'>
              <input-remote
                :list='userList' 
                :asyncKey='userAsyncKey' 
                @on-change-word='changeWordUser' 
                @on-clean='cleanUser'
                idProp='id' 
                nameProp='name' 
                :clearable='true'
                v-model="formSearch.createUserId"
                ref='createUser'
                :placeholder="$t('placeholderPublic.filter')">
                <template slot="title">
                  <p style="width: 100%">{{$t('labelPublic.mc')}}</p>
                </template>
                <template scope="label">
                  <p style="width: 100%">{{label.data.name}}</p>
                </template>
              </input-remote>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6">
            <Form-item label="归档状态" prop='status'>
              <Select v-model="formSearch.status" clearable>
                <Option :value="1">已归档</Option>
                <Option :value="0">未归档</Option>
              </Select>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6">
            <Form-item label="归档时间">
              <Date-picker :transfer='true' type="daterange" placement="bottom" :placeholder="$t('customer.placeholder2')" @on-change='setFileTime' ref='fileDate' style='width:100%'></Date-picker>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6">
            <Form-item label="归档医院" prop='filingHospitalId'>
              <Select v-model="formSearch.filingHospitalId" clearable>
                <Option v-for="item in hospList" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6">
            <ul class="header-btn-group">
              <li class="header-item" @click="getList(1, formSearch)"><Icon type="search"></Icon>{{$t('publicSet.search')}}</li>
              <li class="header-item" @click="handleReset('formSearch')"><Icon type="refresh"></Icon>{{$t('publicSet.reset')}}</li>
            </ul>
          </Col>
        </Row>
      </Form>
      <Table stripe :columns="col" :data="data"></Table>
      <div class="table-page">
        <div class="table-info">{{$t('publicSet.pageMsg', [pageNumber, totalPages, total])}}</div>
        <Page class="table-paginate" :total="total" @on-change='changePage' :current='pageNumber' show-elevator></Page>
      </div>
    </div>
  </div>
</template>

<script>
  import inputRemote from 'components/InputRemote';
  import resizeTime from 'components/tableResizeTime';
  export default {
    components: {inputRemote, resizeTime},
    data () {
      return {
        pageNumber: 1,
        totalPages: 1,
        total: 0,
        formSearch: {
          pageSize: 10,
          caseId: '',
          caseNumber: '',
          filingHospitalId: '',
          status: '',
          filingStartTime: '',
          filingEndTime: '',
          createUserId: '',
          createStartTime: '',
          createEndTime: '',
          customerId: '',
          hospitalId: '',
        },

        data: [],
        col: [
          {
            title: this.$t('labelPublic.xh'),
            type: 'index',
            width: 60,
            render: (h, params) => {
              const _index = (this.pageNumber - 1) * 10;
              return h('span', params.index + 1 + _index);
            }
          },
          {
            title: '病历号',
            width: 80,
            key: 'caseNumber'
          },
          {
            title: '病历类型',
            width: 60,
            key: 'caseName'
          },
          {
            title: '顾客编号',
            width: 60,
            key: 'customerId'
          },
          {
            title: '顾客姓名',
            width: 60,
            key: 'customerName'
          },
          {
            title: '创建时间',
            width: 80,
            render: (h, params) => {
              if (params.row.createTime) {
                return h(resizeTime, {
                  props: {
                    time: params.row.createTime
                  }
                })
              }
            }
          },
          {
            title: '创建人',
            width: 60,
            key: 'createUserName'
          },
          {
            title: '归档状态',
            width: 70,
            render: (h, params) => {
              const color = params.row.status === '1' ? '#4172F6' : '#FF6F76';
              const text = params.row.status === '1' ? '已归档' : '未归档';
              return h('span', {
                style: {
                  color: color
                }
              }, text);
            }
          },
          {
            title: '归档人',
            width: 60,
            key: 'filingUserName'
          },
          {
            title: '归档时间',
            width: 80,
            render: (h, params) => {
              if (params.row.filingPersonTime) {
                return h(resizeTime, {
                  props: {
                    time: params.row.filingPersonTime
                  }
                })
              }
            }
          },
          {
            title: '归档医院',
            width: 70,
            key: 'filingHospitalName'
          },
          {
            title: this.$t('publicSet.tableAction'),
            key: 'action',
            width: 140,
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small',
                    icon: 'edit'
                  },
                  style: {
                    display: params.row.status === '1' ? 'none' : 'inlineBlock',
                    margin: '5px 3px 5px 0',
                    verticalAlign: 'middle'
                  },
                  on: {
                    click: () => {
                      this.toEdit(params.row)
                    }
                  }
                }, this.$t('publicSet.edit')),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small',
                    icon: 'ios-trash-outline'
                  },
                  style: {
                    display: params.row.status === '1' ? 'none' : 'inlineBlock',
                    margin: '5px 3px 5px 0',
                    verticalAlign: 'middle'
                  },
                  on: {
                    click: () => {
                      this.remove(params.row)
                    }
                  }
                }, this.$t('publicSet.del')),
                h('Button', {
                  props: {
                    type: 'warning',
                    size: 'small',
                    icon: 'document-text'
                  },
                  style: {
                    margin: '5px 3px 5px 0',
                    verticalAlign: 'middle'
                  },
                  on: {
                    click: () => {
                      this.toView(params.row)
                    }
                  }
                }, '查看'),
                h('Button', {
                  props: {
                    type: 'info',
                    size: 'small',
                    icon: 'wrench'
                  },
                  style: {
                    display: params.row.status === '1' ? 'none' : 'inlineBlock',
                    margin: '5px 3px 5px 0',
                    verticalAlign: 'middle'
                  },
                  on: {
                    click: () => {
                      this.toDisable(params.row, true);
                    }
                  }
                }, '归档'),
                h('Button', {
                  props: {
                    type: 'info',
                    size: 'small',
                    icon: 'wrench'
                  },
                  style: {
                    display: params.row.status === '0' ? 'none' : 'inlineBlock',
                    margin: '5px 3px 5px 0',
                    verticalAlign: 'middle'
                  },
                  on: {
                    click: () => {
                      this.toDisable(params.row, false);
                    }
                  }
                }, '取消归档'),
              ])
            }
          }
        ],

        caseList: [],
        createBox: [],

        //创建人快捷搜索
        userList: [],
        userAsyncKey: true,
        userIndex: 0,
      }
    },
    computed: {
      hospList () {
        return this.$store.getters.getSelectAllHospList;
      },
    },
    created () {
      this.formSearch.hospitalId = localStorage.getItem('hospId');
      this.formSearch.createStartTime = moment().startOf('isoWeek').format('YYYY-MM-DD') + ' 00:00:00';
      this.formSearch.createEndTime = moment().endOf('isoWeek').format('YYYY-MM-DD') + ' 23:59:59';
      this.createBox = [this.formSearch.createStartTime, this.formSearch.createEndTime];
      this.getList(1, this.formSearch);
      this.getCaseList();
      this.$store.dispatch('setSelectAllHospList');
    },
    methods: {
      getList (pageNumber, form) {
        let _vm = this;
        form.pageNumber = pageNumber;
        _vm.$store.dispatch('setPageLoading', -1);
        _vm.$http.getPage({
          url: 'guard-webManager/case/findByAllSmartCaseTemplateResultPage.jhtml',
          data: form,
          success: function(res){
            _vm.data = res.data.content.list || [];
            _vm.total = res.data.content.total || 0;
            _vm.pageNumber = res.data.content.pageNum || 1;
            _vm.totalPages = res.data.content.pages || 1;
            _vm.$store.dispatch('setPageLoading', 1);
          },
          error: function(res){
            console.log(res);
          }
        });
      },
      getCaseList() {
        let _vm = this;
        _vm.$http.get({
          url: 'guard-webManager/case/findByAllSmartCaseList.jhtml',
          data: {
            hospitalId: _vm.formSearch.hospitalId
          },
          success: function(res){
            if(res.data.code === 0) {
              _vm.caseList = res.data.content || [];
            }
          },
          error: function(res){
            console.log(res);
          }
        });
      },
      changeWordUser(val) {
        let _vm = this;
        _vm.userAsyncKey = true;
        _vm.userIndex++;
        const _index = _vm.userIndex;
        _vm.$http.get({
          url: 'guard-webManager/todayCustomer/findByHospitalUserList.jhtml',
          data: {
            hospitalId: _vm.formSearch.hospitalId,
            value: val,
            type: '0'
          },
          success: function (res) {
						if(res.data.code === 0) {
              if(_index === _vm.userIndex) {
                _vm.userList = res.data.content.map(item => {
                  return {
                    id: item.Id,
                    name: item.name
                  };
                }) || [];
                _vm.userAsyncKey = false;
              }
            }
          },
          error: function (res) {
            console.log(res)
          }
        });
      },
      cleanUser() {
        this.formSearch.createUserId = '';
      },
      setCreatTime(date) {
        this.formSearch.createStartTime = date[0] + ' 00:00:00';
        this.formSearch.createEndTime = date[1] + ' 23:59:59';
      },
      setFileTime(date) {
        this.formSearch.filingStartTime = date[0] + ' 00:00:00';
        this.formSearch.filingEndTime = date[1] + ' 23:59:59';
      },
      changePage(num) {
        this.getList(num, this.formSearch);
      },
      handleReset(name) {
        this.$refs[name].resetFields();
        this.$refs.createUser.clearQuery();
        this.$refs.fileDate.handleClear();
        this.formSearch.createStartTime = moment().startOf('isoWeek').format('YYYY-MM-DD') + ' 00:00:00';
        this.formSearch.createEndTime = moment().endOf('isoWeek').format('YYYY-MM-DD') + ' 23:59:59';
        this.createBox = [this.formSearch.createStartTime, this.formSearch.createEndTime];
        this.$nextTick(() => {
          this.formSearch.filingStartTime = '';
          this.formSearch.filingEndTime = '';
          this.getList(1, this.formSearch);
        });
      },
      toDisable(data, type) {
        let _vm = this;
        const msg1 = type ? '确定归档' : '确定取消归档？';
        const msg2 = type ? '归档后此病历不能再次编辑修改' : '取消后此病历将可编辑修改，请慎重！';
        const status = type ? 1 : 0;
        _vm.$Modal.confirm({
          title: _vm.$t('publicSet.noticeTit'),
          content: `<p>${msg1}</p>
          <p>${msg2}</p>`,
          onOk: () => {
            _vm.$http.post({
              url: 'guard-webManager/case/updateByResultIdSmartCaseTemplateResultStatus.jhtml',
              data: {
                resultId: data.Id,
                filingHospitalId: localStorage.getItem('hospId'),
                filingUserId: localStorage.getItem('userId'),
                customerId: data.customerId,
                status: status
              },
              success: function(res){
                if(res.data.code === 0 ){
                  _vm.getList(1, _vm.formSearch);
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('publicSet.noticeSuccess')
                  });
                } else {
                  _vm.$Notice.error({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: res.data.desc
                  });
                }
              },
              error: function(res){
                console.log(res);
              }
            });
          },
        });
      },
      remove(data) {
        let _vm = this;
        _vm.$Modal.confirm({
          title: _vm.$t('publicSet.noticeTit'),
          content: `<p>确定删除此病例</p>
          <p>病例信息：</p>
          <p>病历号：${data.caseNumber}</p>`,
          onOk: () => {
            _vm.$http.post({
              url: 'guard-webManager/case/deleteByResultIdSmartCaseTemplateResult.jhtml',
              data: {
                userId: localStorage.getItem('userId'),
                resultId: data.Id,
                hospitalId: localStorage.getItem('hospId'),
                customerId: data.customerId
              },
              success: function(res){
                if(res.data.code === 0 ){
                  _vm.getList(1, _vm.formSearch);
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('publicSet.noticeSuccess')
                  });
                } else {
                  _vm.$Notice.error({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: res.data.desc
                  });
                }
              },
              error: function(res){
                console.log(res);
              }
            });
          }
        });
      },
      toEdit(data) {
        const breadData = [
          {
            url: '/desktop',
            text: 'layoutNav.desk'
          },
          {
            url: '/caseManagementRecord',
            text: '病例记录管理'
          },
          {
            url: '/caseManagementRecordEdit',
            text: '编辑病例'
          }
        ];
        this.$store.dispatch('setBreadData', breadData);
        this.$router.push({
          path: '/caseManagementRecordEdit',
          query: {
            no: data.caseNumber,
            cusId: data.customerId,
            cusName: data.customerName
          }
        });
      },
      toView(data) {
        const breadData = [
          {
            url: '/desktop',
            text: 'layoutNav.desk'
          },
          {
            url: '/caseManagementRecord',
            text: '病例记录管理'
          },
          {
            url: '/caseManagementRecordView',
            text: '查看病例'
          }
        ];
        this.$store.dispatch('setBreadData', breadData);
        this.$router.push({
          path: '/caseManagementRecordView',
          query: {
            no: data.caseNumber,
            cusId: data.customerId,
            cusName: data.customerName
          }
        });
      },
    }
  }
</script>



