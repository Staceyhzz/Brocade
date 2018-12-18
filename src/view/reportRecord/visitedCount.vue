/**
 * 门诊概要报表  
 *【原表】由：集团到诊每日统计、医院到诊每日统计、医院咨询师到诊每日统计合并
 */

<template>
  <div class="container-box">
    <div class="container-header">
      <h2>门诊概要报表</h2>
    </div>
    <div class="container-body">
      <!-- 查询 -->
      <div class="jyw-reporter-tit">
        <h3>检索</h3>
      </div>
      <Form :label-width="90" :model="formSearch" ref='formSearch' label-position="right">
        <Row>
          <Col :sm='12' :md="8" :lg="6">
            <Form-item label="日期" prop='startTime'>
              <Date-picker :transfer='true' type="daterange" placement="bottom-start" placeholder="选择日期" :clearable="false" @on-change='setDate' :value='dateBox' style='width:100%'></Date-picker>
            </Form-item>
          </Col>
          <Col :sm='12' :md="8" :lg="6">
            <Form-item label="医院" prop='hospitalId' v-if='power === 1'>
              <Select v-model="formSearch.hospitalId" clearable>
                <Option v-for="item in hospList" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
            </Form-item>
          </Col>
          <Col :sm='12' :md="8" :lg="6">
            <Form-item label="咨询师" prop='userId' v-if='power !== 3'>
              <Input v-model="userName" readonly icon="ios-search" placeholder="选择咨询师" @on-focus="showUser"></Input>
            </Form-item>
          </Col>
          <Col :sm='12' :md="8" :lg="6">
            <Form-item label="门诊类型" prop='clinicType'>
              <Select v-model="formSearch.clinicType" clearable>
                <Option v-for="item in clinicTypeList" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
            </Form-item>
          </Col>
          <Col :sm='12' :md="8" :lg="6">
            <Form-item label="客户类别" prop='newOldType'>
              <Select v-model="formSearch.newOldType" clearable>
                <Option :value="1">新客</Option>
                <Option :value="0">老客</Option>
              </Select>
            </Form-item>
          </Col>
          <Col :sm='12' :md="8" :lg="6">
            <ul class="header-btn-group">
              <li class="header-item" @click="getList()"><Icon type="search"></Icon>查询</li>
              <li class="header-item" @click="handleReset('formSearch')"><Icon type="refresh"></Icon>重置</li>
            </ul>
          </Col>
        </Row>
      </Form>
      <cmptChooseUserSinger placeHolder="选择分诊人员" @setUserData="setUser" :dimension='dimension' :openKey='openKey'></cmptChooseUserSinger>
      <!-- 导出 -->
      <form :action="exportPrefixURL" method="get" ref="formSubmit" v-show="show">
        <input name="startTime" :value="formSearch.startTime">
        <input name="endTime" :value="formSearch.endTime">
        <input name="hospitalId" :value="formSearch.hospitalId">
        <input name="customerId" :value="formSearch.customerId">
        <input name="createUserId" :value="formSearch.createUserId">
        <input name="categoryId" :value="formSearch.categoryId">
        <input name="adminToken" :value="adminToken">
      </form>
      <!-- 图表 -->
      <div class="jyw-reporter-tit">
        <h3>分诊分析</h3>
        <div class="export" v-if="exportKey === '1'"></div>
      </div>
      <Menu mode="horizontal" :active-name="chartType" @on-select='changeChartType' class='jyw-report-chart-menu'>
        <Menu-item name="newOldType">按顾客类型成交率分析表</Menu-item>
        <Menu-item name="clinicType">按门诊类型成交率分析表</Menu-item>
      </Menu>
      <!-- 表格 -->
      <div class="jyw-reporter-tit">
        <h3>报表数据</h3>
      </div>
      <Table stripe :columns="columns" :data="data"></Table>
      <div class="table-page">
        <div class="table-info">当前第{{pageNumber}}页，共{{totalPages}}页，总共{{total}}条记录</div>
        <Page class="table-paginate" :total="total" @on-change='changePage' :current='pageNumber' show-elevator></Page>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        power: 1,
        formSearch: {
          startTime: moment().startOf('isoWeek').format('YYYY-MM-DD'),
          endTime: moment().format('YYYY-MM-DD'),
          hospitalId: '',
          userId: '',
          clinicType: '',
          newOldType: ''
        },
        dateBox: [moment().startOf('isoWeek').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')],
        exportKey: localStorage.getItem('exportKey'),
        adminToken: this.$token.readToken('adminToken') || '',
        show: false,
        userName: '',
        openKey: false,
        chartType: 'newOldType',
        pageNumber: 1,
        totalPages: 1,
        total: 0,
        data: [],
        colBox: [
          {
            type: 'newOldType',
            url: 'http://aaanew22',
            col: [
              {
                title: '序号',
                width: 50,
                render: (h, params) => {
                  const _index = (this.pageNumber - 1) * 10;
                  return h('span', params.index + 1 + _index);
                }
              },
              {
                title: '日期',
                width: 80,
                render: (h, params) => {
                  if(params.row.createTime) {
                    return h('span', params.row.createTime.split(' ')[0]);
                  }
                }
              },
              {
                title: '医院',
                width: 60,
                key: 'hospitalName'
              },
              {
                title: '咨询师',
                width: 60,
                key: 'userName'
              },
              {
                title: '客户类别',
                width: 60,
                render: (h, params) => {
                  const text = params.row.newOldType === 1
                    ? '新客'
                    : '老客';
                  const color = params.row.newOldType === 1
                    ? '#4172F6'
                    : '#FF6F76';
                  return h('span', {
                    style: {
                      color: color
                    }
                  }, text);
                }
              },
              {
                title: '接诊人数',
                width: 60,
                align: 'right',
                key: 'triageNum'
              },
              {
                title: '成交人数',
                width: 60,
                align: 'right',
                key: 'dealNum'
              },
              {
                title: '成交率',
                width: 60,
                align: 'right',
                key: 'percent'
              },
              {
                title: '成交总额',
                width: 60,
                align: 'right',
                key: 'amount',
                render: (h, params) => {
                  if(params.row.amount || params.row.amount === 0) {
                    return h('span', params.row.amount.toFixed(2));
                  }
                }
              },
              {
                title: '成交客均价',
                width: 60,
                align: 'right',
                key: 'price',
                render: (h, params) => {
                  if(params.row.price || params.row.price === 0) {
                    return h('span', params.row.price.toFixed(2));
                  }
                }
              }
            ]
          },
          {
            type: 'clinicType',
            url: 'http://aaanew22',
            col: [
              {
                title: '序号',
                width: 50,
                render: (h, params) => {
                  const _index = (this.pageNumber - 1) * 10;
                  return h('span', params.index + 1 + _index);
                }
              },
              {
                title: '日期',
                width: 80,
                render: (h, params) => {
                  if(params.row.createTime) {
                    return h('span', params.row.createTime.split(' ')[0]);
                  }
                }
              },
              {
                title: '医院',
                width: 60,
                key: 'hospitalName'
              },
              {
                title: '咨询师',
                width: 60,
                key: 'userName'
              },
              {
                title: '门诊类型',
                width: 50,
                render: (h, params) => {
                  const index = this.clinicTypeList.findIndex(item => item.id === params.row.clinicType);
                  if(index >= 0) {
                    return h('span', this.clinicTypeList[index].name)
                  }
                }
              },
              {
                title: '接诊人数',
                width: 60,
                align: 'right',
                key: 'triageNum'
              },
              {
                title: '成交人数',
                width: 60,
                align: 'right',
                key: 'dealNum'
              },
              {
                title: '成交率',
                width: 60,
                align: 'right',
                key: 'percent'
              },
              {
                title: '成交总额',
                width: 60,
                align: 'right',
                key: 'amount',
                render: (h, params) => {
                  if(params.row.amount || params.row.amount === 0) {
                    return h('span', params.row.amount.toFixed(2));
                  }
                }
              },
              {
                title: '成交客均价',
                width: 60,
                align: 'right',
                key: 'price',
                render: (h, params) => {
                  if(params.row.price || params.row.price === 0) {
                    return h('span', params.row.price.toFixed(2));
                  }
                }
              }
            ]
          }
        ],
      }
    },
    computed: {
      hospList () {
        return this.$store.getters.getSelectAllHospList;
      },
      clinicTypeList () {
        return this.$store.getters.getClinicTypeList;
      },
      pageSize () {
        return this.$store.getters.getPageSize;
      },
      exportPrefixURL () {
        return this.$store.getters.getExportPrefixURL + '/guard-webManager/excelExport/failtureDetail.jhtml';
      },
      columns () {
        const index = this.colBox.findIndex(item => item.type === this.chartType);
        return this.colBox[index].col;
      },
      url () {
        const index = this.colBox.findIndex(item => item.type === this.chartType);
        return this.colBox[index].url;
      },
      dimension () {
        if(this.power === 1) {
          return true;
        } else {
          return false;
        }
      },
    },
    created () {
      this.power = this.getReporterPower();
      this.initPower();
    },
    mounted () {
      this.$store.dispatch('setSelectAllHospList');
    },
    methods: {
      initPower () {
        if(this.power === 1) {
          this.formSearch.hospitalId = '';
        } else if(this.power === 2) {
          this.formSearch.hospitalId = localStorage.getItem('hospId');
        } else if(this.power === 3) {
          this.formSearch.hospitalId = localStorage.getItem('hospId');
        }
        this.getList(1, this.formSearch);
      },
      getList() {
        let _vm = this;
        _vm.$store.dispatch('setPageLoading', -1);
        _vm.$http.get({
          url: _vm.url,
          // data: _vm.formSearch,
          success: function(res){
            console.log(res)
            if(res.data.code === 0) {
              const data = res.data.content.page.content || [];
              const _col = _vm.tableCount(data, ['amount', 'price']);
              const index = _vm.colBox.findIndex(item => item.type === _vm.chartType);
              _col.map(item => {
                const index1 = _vm.colBox[index].col.findIndex(col => col.key === item.key);
                console.log(item)
                if(index1 >= 0) {
                  _vm.colBox[index].col[index1].width = item.width;
                }
              });
              _vm.data = data;
              _vm.total = res.data.content.page.total || 0;
              _vm.pageNumber = res.data.content.page.pageNumber || 1;
              _vm.totalPages = res.data.content.page.totalPages || 1;
              _vm.$store.dispatch('setPageLoading', 1);
            } else {
              console.log(res.data.desc)
            }
          },
          error: function(res){
            console.log(res);
          }
        });
      },
      changeChartType (val) {
        if(val !== this.chartType) {
          this.chartType = val;
          this.getList();
        }
      },
      setDate (date) {
        this.formSearch.startTime = date[0];
        this.formSearch.endTime = date[1];
      },
      showUser () {
        this.openKey = !this.openKey;
      },
      setUser (data) {
        this.formSearch.userId = data.id;
        this.userName = data.name;
      },
      changePage (num) {
        this.getList(num, this.formSearch);
      },
      handleReset (name) {
        this.$refs[name].resetFields();
        this.formSearch.startTime = moment().startOf('isoWeek').format('YYYY-MM-DD');
        this.formSearch.endTime = moment().format('YYYY-MM-DD');
        this.dateBox = [moment().startOf('isoWeek').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')];
        this.initPower();
      },
      exportTable () {
        this.$refs.formSubmit.submit();
      },
    }
  }
</script>