/**
 * 项目订单数据
 *【原表】由：集团项目单明细、医院项目单明细、用户项目单明细合并。
 */

<template>
  <div class="container-box">
    <div class="container-header">
      <h2>项目订单数据</h2>
    </div>
    <div class="container-body">
      <!-- 查询 -->
      <div class="jyw-reporter-tit">
        <h3>检索</h3>
      </div>
      <Form :label-width="90" :model="formSearch" ref='formSearch' label-position="right">
        <Row>
          <Col :sm='12' :md="8" :lg="6">
            <Form-item label="下单时间" prop='startTime'>
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
            <Form-item label="订单编号" prop='orderID'>
              <Input v-model.trim="formSearch.orderID" placeholder="请输入订单编号" :maxlength='15'></Input>
            </Form-item>
          </Col>
          <Col :sm='12' :md="8" :lg="6">
            <Form-item label="顾客编号" prop='customerID'>
              <Input v-model.trim="formSearch.customerID" placeholder="请输入顾客编号" :maxlength='15'></Input>
            </Form-item>
          </Col>
          <Col :sm='12' :md="8" :lg="6">
            <Form-item label="顾客姓名" prop='customerName'>
              <Input v-model.trim="formSearch.customerName" placeholder="请输入顾客姓名" :maxlength='15'></Input>
            </Form-item>
          </Col>
          <Col :sm='12' :md="8" :lg="6">
            <Form-item label="提交人员" prop='userId' v-if='power !== 3'>
              <Input v-model="userName" readonly icon="ios-search" placeholder="选择提交人员" @on-focus="showUser"></Input>
            </Form-item>
          </Col>
          <Col :sm='12' :md="8" :lg="6">
            <Form-item :label-width="90" label="应收金额" prop='compare' style='display:inline-block'>
              <Select v-model="formSearch.compare" clearable style='width:50px'>
                <Option v-for="item in compareList" :label="item" :value="item" :key="item">{{ item }}</Option>
              </Select>
            </Form-item>
            <Form-item :label-width='1' prop='amount' style="display:inline-block">
                <cmptInputNumber :max="1000000" :min="0" v-model="formSearch.amount"></cmptInputNumber>
            </Form-item>
          </Col>
          <Col :sm='12' :md="8" :lg="6">
            <Form-item label="订单备注" prop='remark'>
              <Input v-model.trim="formSearch.remark" placeholder="请输入订单备注" :maxlength='30'></Input>
            </Form-item>
          </Col>
          <Col :sm='12' :md="8" :lg="6">
            <Form-item label="审核状态" prop='auditStatus'>
              <Select v-model="formSearch.auditStatus" clearable>
                <Option v-for="item in auditStatusList" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
            </Form-item>
          </Col>
          <Col :sm='12' :md="8" :lg="6">
            <Form-item label="支付状态" prop='paidStatus'>
              <Select v-model="formSearch.paidStatus" clearable>
                <Option v-for="item in paidStatusList" :value="item.id" :key="item.id">{{ item.name }}</Option>
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
      <cmptChooseUserSinger placeHolder="选择提交人员" @setUserData="setUser" :dimension='dimension' :openKey='openKey'></cmptChooseUserSinger>
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
        <h3>订单分析</h3>
        <div class="export" v-if="exportKey === '1'"></div>
      </div>
      <Menu mode="horizontal" active-name="record" class='jyw-report-chart-menu'>
        <Menu-item name="record">订单记录</Menu-item>
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
  import resizeRemark from 'components/tableResizeRemark.vue';
  import resizeTime from 'components/tableResizeTime.vue';
  export default {
    components: {resizeTime, resizeRemark},
    data () {
      return {
        power: 1,
        formSearch: {
          startTime: moment().startOf('isoWeek').format('YYYY-MM-DD'),
          endTime: moment().format('YYYY-MM-DD'),
          hospitalId: '',
          orderID: '',
          customerName: '',
          customerID: '',
          userId: '',
          compare: '',
          amount: null,
          remark: '',
          auditStatus: '',
          paidStatus: '',
        },
        compareList: ['>=', '>', '=', '<=', '<'],
        dateBox: [moment().startOf('isoWeek').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')],
        exportKey: localStorage.getItem('exportKey'),
        adminToken: this.$token.readToken('adminToken') || '',
        show: false,

        userName: '',
        openKey: false,

        pageNumber: 1,
        totalPages: 1,
        total: 0,
        data: [],
        columns: [
          {
            title: '序号',
            width: 50,
            render: (h, params) => {
              const _index = (this.pageNumber - 1) * 10;
              return h('span', params.index + 1 + _index);
            }
          },
          {
            title: '下单时间',
            width: 80,
            render: (h, params) => {
              if(params.row.createTime) {
                return h(resizeTime, {
                  props: {
                    time: params.row.createTime
                  }
                })
              }
            }
          },
          {
            title: '医院',
            width: 60,
            key: 'hospitalName'
          },
          {
            title: '订单号',
            width: 60,
            key: 'orderID'
          },
          {
            title: '顾客编号',
            width: 60,
            key: 'customerID'
          },
          {
            title: '顾客姓名',
            width: 60,
            key: 'customerName'
          },
          {
            title: '提交人',
            width: 60,
            key: 'userName'
          },
          {
            title: '应收总额',
            align: 'right',
            width: 60,
            key: 'amount',
            render: (h, params) => {
              if(params.row.amount || params.row.amount === 0) {
                return h('span', params.row.amount.toFixed(2))
              }
            }
          },
          {
            title: '订单备注',
            width: 100,
            render: (h, params) => {
              if(params.row.remark) {
                return h(resizeRemark, {
                  props: {
                    remark: params.row.remark
                  }
                })
              }
            }
          },
          {
            title: '审核状态',
            width: 60,
            render: (h, params) => {
              const index = this.auditStatusList.findIndex(item => item.id === params.row.auditStatus);
              if(index >= 0) {
                return h('span', this.auditStatusList[index].name);
              }
            }
          },
          {
            title: '支付状态',
            width: 60,
            render: (h, params) => {
              const index = this.paidStatusList.findIndex(item => item.id === params.row.paidStatus);
              if(index >= 0) {
                return h('span', this.paidStatusList[index].name);
              }
            }
          },
          {
            title: '支付时间',
            width: 80,
            render: (h, params) => {
              if(params.row.paidTime) {
                return h(resizeTime, {
                  props: {
                    time: params.row.paidTime
                  }
                })
              }
            }
          }
        ]
      }
    },
    computed: {
      hospList () {
        return this.$store.getters.getSelectAllHospList;
      },
      auditStatusList () {
        return this.$store.getters.getOrderAuditTypeList;
      },
      paidStatusList () {
        return this.$store.getters.getOrderPaidTypeList;
      },
      pageSize () {
        return this.$store.getters.getPageSize
      },
      exportPrefixURL () {
        return this.$store.getters.getExportPrefixURL + '/guard-webManager/excelExport/failtureDetail.jhtml'
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
          url: 'http://aaanew13',
          // data: _vm.formSearch,
          success: function(res){
            console.log(res)
            if(res.data.code === 0) {
              const data = res.data.content.page.content || [];
              const _col = _vm.tableCount(data, ['amount']);
              _col.map(item => {
                const index = _vm.columns.findIndex(col => col.key === item.key);
                console.log(item)
                if(index >= 0) {
                  _vm.columns[index].width = item.width;
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