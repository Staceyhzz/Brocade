/**
 * 账户充值消费记录
 *【原表】由：集团预收款单明细、医院预收款单明细、用户预收款单明细合并。
 */

<template>
  <div class="container-box">
    <div class="container-header">
      <h2>账户充值消费记录</h2>
    </div>
    <div class="container-body">
      <!-- 查询 -->
      <div class="jyw-reporter-tit">
        <h3>检索</h3>
      </div>
      <Form :label-width="90" :model="formSearch" ref='formSearch' label-position="right">
        <Row>
          <Col :sm='12' :md="8" :lg="6">
            <Form-item label="操作日期" prop='startTime'>
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
            <Form-item label="单号" prop='orderID'>
              <Input v-model.trim="formSearch.orderID" placeholder="请输入单号" :maxlength='15'></Input>
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
            <Form-item label="类型" prop='type'>
              <Select v-model="formSearch.type" clearable>
                <Option v-for="item in typeList" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
            </Form-item>
          </Col>
          <Col :sm='12' :md="8" :lg="6">
            <Form-item label="预收款项目" prop='chargeId'>
              <Select v-model="formSearch.chargeId" clearable>
                  <Option v-for="item in chargeList" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
            </Form-item>
          </Col>
          <Col :sm='12' :md="8" :lg="6">
            <Form-item label="提交用户" prop='userId' v-if='power !== 3'>
              <Input v-model="userName" readonly icon="ios-search" placeholder="选择提交用户" @on-focus="showUser"></Input>
            </Form-item>
          </Col>
          <Col :sm='12' :md="8" :lg="6">
            <Form-item label="订单" prop='remark'>
              <Input v-model.trim="formSearch.remark" placeholder="请输入订单" :maxlength='30'></Input>
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
      <cmptChooseUserSinger placeHolder="选择提交用户" @setUserData="setUser" :dimension='dimension' :openKey='openKey'></cmptChooseUserSinger>
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
        <h3>账号分析</h3>
        <div class="export" v-if="exportKey === '1'"></div>
      </div>
      <Menu mode="horizontal" active-name="record" class='jyw-report-chart-menu'>
        <Menu-item name="record">充值记录</Menu-item>
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
  import resizeTime from 'components/tableResizeTime.vue';
  import resizeRemark from 'components/tableResizeRemark.vue';
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
          type: '',
          chargeId: '',
          userId: '',
          remark: ''
        },
        typeList: [
          {
            id: 1,
            name: '充值'
          },
          {
            id: 2,
            name: '退换'
          },
          {
            id: 3,
            name: '消费'
          },
          {
            id: 4,
            name: '提现'
          }
        ],
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
            title: '操作日期',
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
            title: '类型',
            width: 60,
            render: (h, params) => {
              const index = this.typeList.findIndex(item => item.id === params.row.type);
              if(index >= 0) {
                return h('span', this.typeList[index].name);
              }
            }
          },
          {
            title: '预收款项目',
            width: 60,
            key: 'chargeName'
          },
          {
            title: '金额',
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
            title: '单号',
            width: 60,
            key: 'orderID'
          },
          {
            title: '提交用户',
            width: 60,
            key: 'userName'
          },
          {
            title: '操作备注',
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
          }
        ]
      }
    },
    computed: {
      hospList () {
        return this.$store.getters.getSelectAllHospList;
      },
      chargeList () {
        return this.$store.getters.getSelectAllDepositChargeList;
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
      this.$store.dispatch('setSelectAllDepositChargeList');
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
          url: 'http://aaanew8',
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
        this.userName = '';
        this.initPower();
      },
      exportTable () {
        this.$refs.formSubmit.submit();
      },
    }
  }
</script>