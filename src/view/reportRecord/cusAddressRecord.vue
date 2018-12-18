/**
 * 顾客来源地理分布
 *【原表】地区明细。
 */

<template>
  <div class="container-box">
    <div class="container-header">
      <h2>顾客来源地理分布</h2>
    </div>
    <div class="container-body">
      <!-- 查询 -->
      <div class="jyw-reporter-tit">
        <h3>检索</h3>
      </div>
      <Form :label-width="90" :model="formSearch" ref='formSearch' label-position="right">
        <Row>
          <Col :sm='12' :md="8" :lg="6">
            <Form-item label="登记日期" prop='startTime'>
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
            <Form-item label="省" prop='provinceId'>
              <Select v-model="formSearch.provinceId" clearable @on-change='changeProvince'>
                <Option v-for="item in provinceList" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
            </Form-item>
          </Col>
          <Col :sm='12' :md="8" :lg="6">
            <Form-item label="市" prop='cityId'>
              <Select v-model="formSearch.cityId" clearable @on-change='changeCity'>
                <Option v-for="item in cityList" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
            </Form-item>
          </Col>
          <Col :sm='12' :md="8" :lg="6">
            <Form-item label="区" prop='districtId'>
              <Select v-model="formSearch.districtId" clearable>
                <Option v-for="item in districtList" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
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
            <Form-item label="意向分类" prop='itemGroupId'>
              <Select v-model="formSearch.itemGroupId" clearable>
                <Option v-for="item in itemGroupList" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
            </Form-item>
          </Col>
          <Col :sm='12' :md="8" :lg="6">
            <Form-item label="消费意向" prop='itemId'>
              <Select v-model="formSearch.itemId" clearable>
                <Option v-for="item in itemList" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
            </Form-item>
          </Col>
          <Col :sm='12' :md="8" :lg="6">
            <Form-item label="咨询项目" prop='chargeID'>
              <Select v-model="formSearch.chargeID" clearable>
                <Option v-for="item in chargeList" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
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
            <Form-item label="会员等级" prop='memberCategoryId'>
              <Select v-model="formSearch.memberCategoryId" clearable>
                <Option v-for="item in memberCategoryList" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
            </Form-item>
          </Col>
          <Col :sm='12' :md="8" :lg="6">
            <Form-item label="上门状态" prop='visitStatus'>
              <Select v-model="formSearch.visitStatus" clearable>
                <Option :value="1">已上门</Option>
                <Option :value="0">未上门</Option>
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
        <h3>位置分析</h3>
        <div class="export" v-if="exportKey === '1'"></div>
      </div>
      <Menu mode="horizontal" active-name="record" class='jyw-report-chart-menu'>
        <Menu-item name="record">地理明细</Menu-item>
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
  export default {
    components: {resizeTime},
    data () {
      return {
        power: 1,
        formSearch: {
          startTime: moment().startOf('isoWeek').format('YYYY-MM-DD'),
          endTime: moment().format('YYYY-MM-DD'),
          hospitalId: '',
          provinceId: '',
          cityId: '',
          districtId: '',
          customerName: '',
          customerID: '',
          itemGroupId: '',
          itemId: '',
          chargeID: '',
          channelGroupID: '',
          channelId: '',
          storeId: '',
          memberCategoryId: '',
          visitStatus: '',
          newOldType: ''
        },
        dateBox: [moment().startOf('isoWeek').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')],
        exportKey: localStorage.getItem('exportKey'),
        adminToken: this.$token.readToken('adminToken') || '',
        show: false,

        provinceList: [],
        cityList: [],
        districtList: [],

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
            title: '登记日期',
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
            title: '省',
            width: 60,
            key: 'provinceName'
          },
          {
            title: '市',
            width: 60,
            key: 'cityName'
          },
          {
            title: '区',
            width: 60,
            key: 'districtName'
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
            title: '意向分类',
            width: 60,
            key: 'itemGrounpName'
          },
          {
            title: '消费意向',
            width: 60,
            key: 'itemName'
          },
          {
            title: '咨询项目',
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
            title: '会员等级',
            width: 60,
            key: 'memberCategoryName'
          },
          {
            title: '上门状态',
            width: 60,
            render: (h, params) => {
              const text = params.row.visitStatus === 1
                ? '已上门'
                : '未上门';
              const color = params.row.visitStatus === 1
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
      itemGroupList () {
        return this.$store.getters.getSelectAllItemGroupList;
      },
      itemList () {
        return this.$store.getters.getSelectAllItemList;
      },
      chargeList () {
        return this.$store.getters.getSelectAllSymptomInfoList;
      },
      channelGroupList () {
        return this.$store.getters.getSelectChannelGroupList;
      },
      memberCategoryList () {
        return this.$store.getters.getSelectMemberList;
      },
      pageSize () {
        return this.$store.getters.getPageSize;
      },
      exportPrefixURL () {
        return this.$store.getters.getExportPrefixURL + '/guard-webManager/excelExport/failtureDetail.jhtml';
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
      this.$store.dispatch('setSelectAllItemGroupList');
      this.$store.dispatch('setSelectAllItemList');
      this.$store.dispatch('setSelectAllSymptomInfoList');
      this.$store.dispatch('setSelectChannelGroupList');
      this.$store.dispatch('setSelectMemberList');
      this.getProvinceList();
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
          url: 'http://aaanew18',
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
      getProvinceList () {
        let _vm = this;
        _vm.$http.get({
          url: 'guard-webManager/select/provinceInfo.jhtml',
          success: function(res){
            if(res.data.code === 0){
              _vm.provinceList = res.data.content || [];
            } else {
              console.log(res.data.desc)
            }
          },
          error: function(res){
            console.log(res);
          }
        });
      },
      getCityList (id) {
        let _vm = this;
        _vm.$http.get({
          url: 'guard-webManager/select/cityList.jhtml',
          data: {id: id},
          success: function(res){
            if(res.data.code === 0){
              _vm.cityList = res.data.content || [];
            } else {
              console.log(res.data.desc)
            }
          },
          error: function(res){
            console.log(res);
          }
        });
      },
      getDistrictList (id) {
        let _vm = this;
        _vm.$http.get({
          url: 'guard-webManager/select/districtList.jhtml',
          data: {id: id},
          success: function(res){
            if(res.data.code === 0){
              _vm.districtList = res.data.content || [];
            } else {
              console.log(res.data.desc)
            }
          },
          error: function(res){
            console.log(res);
          }
        });
      },
      changeProvince (id) {
        if(id) {
          this.formSearch.cityId = '';
          this.formSearch.districtId = '';
          this.getCityList(id);
        }
      },
      changeCity (id) {
        if(id) {
          this.formSearch.districtId = '';
          this.getDistrictList(id);
        }
      },
      setDate (date) {
        this.formSearch.startTime = date[0];
        this.formSearch.endTime = date[1];
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