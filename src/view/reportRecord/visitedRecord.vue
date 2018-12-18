/**
 * 门诊分诊报表 
 *【原表】由：集团到诊明细表、医院到诊明细表、医院到诊明细（前台)合并
 */

<template>
  <div class="container-box">
    <div class="container-header">
      <h2>门诊分诊报表</h2>
    </div>
    <div class="container-body">
      <!-- 查询 -->
      <div class="jyw-reporter-tit">
        <h3>检索</h3>
      </div>
      <Form :label-width="90" :model="formSearch" ref='formSearch' label-position="right">
        <Row>
          <Col :sm='12' :md="8" :lg="6">
            <Form-item label="到诊日期" prop='startTime'>
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
            <Form-item label="分诊人员" prop='userId' v-if='power !== 3'>
              <Input v-model="userName" readonly icon="ios-search" placeholder="选择分诊人员" @on-focus="showUser"></Input>
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
            <Form-item label="联系方式" prop='mobile'>
              <Input v-model.trim="formSearch.mobile" placeholder="请输入联系方式" :maxlength='15'></Input>
            </Form-item>
          </Col>
          <Col :sm='12' :md="8" :lg="6">
            <Form-item label="咨询项目" prop='symptomID'>
              <Select v-model="formSearch.symptomID" clearable>
                <Option v-for="item in symptomList" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
            </Form-item>
          </Col>
          <Col :sm='12' :md="8" :lg="6">
            <Form-item label="成交项目" prop='chargeID'>
              <Input v-model="chargeName" readonly icon="ios-search" placeholder="选择成交项目" @on-focus="showCharge"></Input>
            </Form-item>
          </Col>
          <Col :sm='12' :md="8" :lg="6">
            <Form-item label="来源分类" prop='channelGroupID'>
              <Select v-model="formSearch.channelGroupID" clearable>
                <Option v-for="item in channelGroupList" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
            </Form-item>
          </Col>
          <Col :sm='12' :md="8" :lg="6">
            <Form-item label="具体来源" prop='channelId'>
              <cmptRemoteFilterChannel _placeHolder='输入拼音汉字快捷搜索' @setChannelName='setChannel' ref='remoteChannel'></cmptRemoteFilterChannel>
            </Form-item>
          </Col>
          <Col :sm='12' :md="8" :lg="6">
            <Form-item label="渠道分类" prop='storeId'>
              <cmptRemoteFilterStore _placeHolder="输入拼音汉字快捷搜索" @setStoreName="setStore" ref='remoteStore' :_type='storeType'></cmptRemoteFilterStore>
            </Form-item>
          </Col>
          <Col :sm='12' :md="8" :lg="6">
            <Form-item label="分诊情况" prop='type'>
              <Select v-model="formSearch.type" clearable>
                <Option v-for="item in typeList" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
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
      <cmptChargeChoose placeHolder="选择成交项目" @on-change="setCharge" :openKey='chargeOpenKey'></cmptChargeChoose>
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
      <Menu mode="horizontal" active-name="record" class='jyw-report-chart-menu'>
        <Menu-item name="record">门诊顾客分诊表</Menu-item>
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
  import cmptChargeChoose from 'components/chargeChoose.vue';
  import resizeTime from 'components/tableResizeTime.vue';
  export default {
    components: {resizeTime, cmptChargeChoose},
    data () {
      return {
        power: 1,
        formSearch: {
          startTime: moment().startOf('isoWeek').format('YYYY-MM-DD'),
          endTime: moment().format('YYYY-MM-DD'),
          hospitalId: '',
          userId: '',
          customerName: '',
          customerID: '',
          mobile: '',
          symptomID: '',
          chargeID: '',
          channelGroupID: '',
          channelId: '',
          storeId: '',
          type: '',
          clinicType: '',
          newOldType: ''
        },
        dateBox: [moment().startOf('isoWeek').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')],
        exportKey: localStorage.getItem('exportKey'),
        adminToken: this.$token.readToken('adminToken') || '',
        show: false,
        userName: '',
        chargeName: '',
        openKey: false,
        chargeOpenKey: false,
        typeList: [
          {
            id: 0,
            name: '未分诊'
          },
          {
            id: 1,
            name: '咨询'
          },
          {
            id: 2,
            name: '治疗'
          }
        ],

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
            title: '到诊日期',
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
            title: '联系方式',
            width: 60,
            key: 'mobile'
          },
          {
            title: '咨询项目',
            width: 60,
            key: 'symptomName'
          },
          {
            title: '成交项目',
            width: 60,
            key: 'chargeName'
          },
          {
            title: '来源分类',
            width: 60,
            key: 'channelGroupName'
          },
          {
            title: '具体来源',
            width: 60,
            key: 'channelName'
          },
          {
            title: '具体渠道',
            width: 60,
            key: 'storeName'
          },
          {
            title: '分诊情况',
            width: 50,
            render: (h, params) => {
              const index = this.typeList.findIndex(item => item.id === params.row.type);
              if(index >= 0) {
                return h('span', this.typeList[index].name);
              }
            }
          },
          {
            title: '门诊类型',
            width: 50,
            render: (h, params) => {
              const index = this.clinicTypeList.findIndex(item => item.id === params.row.clinicType);
              if(index >= 0) {
                return h('span', this.clinicTypeList[index].name);
              }
            }
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
          }
        ]
      }
    },
    computed: {
      hospList () {
        return this.$store.getters.getSelectAllHospList;
      },
      symptomList () {
        return this.$store.getters.getSelectAllSymptomInfoList;
      },
      channelGroupList () {
        return this.$store.getters.getSelectChannelGroupList;
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
      dimension () {
        if(this.power === 1) {
          return true;
        } else {
          return false;
        }
      },
      storeType () {
        if(this.power === 1) {
          return 3;
        } else if(this.power === 2) {
          return 1;
        } else {
          return 2;
        }
      },
    },
    created () {
      this.power = this.getReporterPower();
      this.initPower();
    },
    mounted () {
      this.$store.dispatch('setSelectAllHospList');
      this.$store.dispatch('setSelectAllSymptomInfoList');
      this.$store.dispatch('setSelectChannelGroupList');
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
          url: 'http://aaanew21',
          // data: _vm.formSearch,
          success: function(res){
            console.log(res)
            if(res.data.code === 0) {
              _vm.data = res.data.content.page.content || [];
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
      showCharge () {
        this.chargeOpenKey = !this.chargeOpenKey;
      },
      setCharge (data) {
        this.chargeName = data.name;
        this.formSearch.chargeID = data.id;
      },
      setChannel (data) {
        this.formSearch.channelId = data.id;
      },
      setStore (data) {
        this.formSearch.storeId = data.id;
      },
      changePage (num) {
        this.getList(num, this.formSearch);
      },
      handleReset (name) {
        this.$refs[name].resetFields();
        this.formSearch.startTime = moment().startOf('isoWeek').format('YYYY-MM-DD');
        this.formSearch.endTime = moment().format('YYYY-MM-DD');
        this.dateBox = [moment().startOf('isoWeek').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')];
        this.$refs.remoteChannel.clean();
        this.$refs.remoteStore.clean();
        this.initPower();
      },
      exportTable () {
        this.$refs.formSubmit.submit();
      },
    }
  }
</script>