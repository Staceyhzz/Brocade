/**
 * 客户新增报表
 *【原表】由：集团登记客户明细、医院登记客户明细、用户登记客户明细、集团渠道登记客户明细、医院、用户渠道登记客户明细合并。
 */

 <template>
  <div class="container-box">
    <div class="container-header">
      <h2>客户新增报表</h2>
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
            <Form-item label="登记部门" prop='deptId'>
              <cmptHospChooseDept _placeHolder='选择登记部门' :_deptName='deptName' :_type='deptType' @setDeptName='setDept'></cmptHospChooseDept>
            </Form-item>
          </Col>
          <Col :sm='12' :md="8" :lg="6">
            <Form-item label="登记人员" prop='userId' v-if='power !== 3'>
              <Input v-model="userName" readonly icon="ios-search" placeholder="选择登记人员" @on-focus="showUser"></Input>
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
            <Form-item label="成交状态" prop='dealStatus'>
              <Select v-model="formSearch.dealStatus" clearable>
                <Option :value="1">已成交</Option>
                <Option :value="0">未成交</Option>
              </Select>
            </Form-item>
          </Col>
          <Col :sm='12' :md="8" :lg="6">
            <ul class="header-btn-group">
              <li class="header-item" @click="getList(1, formSearch)"><Icon type="search"></Icon>查询</li>
              <li class="header-item" @click="handleReset('formSearch')"><Icon type="refresh"></Icon>重置</li>
            </ul>
          </Col>
        </Row>
      </Form>
      <cmptChooseUserSinger placeHolder="选择登记人员" @setUserData="setUser" :dimension='dimension' :openKey='openKey'></cmptChooseUserSinger>
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
        <h3>新增分析</h3>
        <div class="export" v-if="exportKey === '1'"></div>
      </div>
      <Menu mode="horizontal" :active-name="chartType" @on-select='changeChartType' class='jyw-report-chart-menu'>
        <Menu-item name="record">顾客新增记录表</Menu-item>
        <Menu-item name="user">按登记人员统计</Menu-item>
        <Menu-item name="channel">按新增来源统计</Menu-item>
        <Menu-item name="store">按新增渠道统计</Menu-item>
        <Menu-item name="item">按意向统计</Menu-item>
      </Menu>
      <div class='report-chart-container' v-if="chartType !== 'record'">
        <div class="report-chart" ref='echarts'></div>
      </div>
      <!-- 表格 -->
      <div class="jyw-reporter-tit">
        <h3>报表数据</h3>
      </div>
      <Table stripe :columns="columns" :data="data"></Table>
      <div class="table-page" v-if="chartType === 'record'">
        <div class="table-info">当前第{{pageNumber}}页，共{{totalPages}}页，总共{{total}}条记录</div>
        <Page class="table-paginate" :total="total" @on-change='changePage' :current='pageNumber' show-elevator></Page>
      </div>
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts';
  import cmptHospChooseDept from 'components/hospChooseDept.vue';
  import resizeTime from 'components/tableResizeTime.vue';
  export default {
    components: {resizeTime, cmptHospChooseDept},
    data () {
      return {
        power: 1,
        formSearch: {
          startTime: moment().startOf('isoWeek').format('YYYY-MM-DD'),
          endTime: moment().format('YYYY-MM-DD'),
          hospitalId: '',
          customerID: '',
          customerName: '',
          channelGroupID: '',
          channelId: '',
          storeId: '',
          itemGroupId: '',
          itemId: '',
          chargeID: '',
          deptId: '',
          userId: '',
          visitStatus: '',
          dealStatus: ''
        },
        pageNumber: 1,
        totalPages: 1,
        total: 0,
        userName: '',
        deptName: '',
        dateBox: [moment().startOf('isoWeek').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')],
        adminToken: this.$token.readToken('adminToken') || '',
        show: false,
        exportKey: localStorage.getItem('exportKey'),
        openKey: false,


        chartType: 'record',
        data: [],
        colBox: [
          {
            type: 'record',
            url: 'http://aaanew12-record',
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
                title: '登记时间',
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
                title: '意向分类',
                width: 60,
                key: 'itemName'
              },
              {
                title: '消费意向',
                width: 60,
                key: 'itemGrounpName'
              },
              {
                title: '咨询项目',
                width: 60,
                key: 'chargeName'
              },
              {
                title: '登记部门',
                width: 60,
                key: 'deptName'
              },
              {
                title: '登记人',
                width: 60,
                key: 'userName'
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
                title: '成交状态',
                width: 60,
                render: (h, params) => {
                  const text = params.row.dealStatus === 1
                    ? '已成交'
                    : '未成交';
                  const color = params.row.dealStatus === 1
                    ? '#4172F6'
                    : '#FF6F76';
                  return h('span', {
                    style: {
                      color: color
                    }
                  }, text);
                }
              },
            ]
          },
          {
            type: 'user',
            key: 'userName',
            name: '登记人员',
            url: 'http://aaanew12-chart',
            col: [
              {
                title: '医院',
                width: 80,
                key: 'hospitalName'
              },
              {
                title: '登记部门',
                width: 80,
                key: 'deptName'
              },
              {
                title: '登记人员',
                width: 80,
                key: 'userName'
              },
              {
                title: '新增人数',
                align: 'right',
                width: 80,
                key: 'num'
              }
            ]
          },
          {
            type: 'channel',
            key: 'channelName',
            name: '来源',
            url: 'http://aaanew12-chart',
            col: [
              {
                title: '医院',
                width: 80,
                key: 'hospitalName'
              },
              {
                title: '来源分类',
                width: 80,
                key: 'channelGroupName'
              },
              {
                title: '具体来源',
                width: 80,
                key: 'channelName'
              },
              {
                title: '新增人数',
                align: 'right',
                width: 80,
                key: 'num'
              }
            ]
          },
          {
            type: 'store',
            key: 'storeName',
            name: '渠道',
            url: 'http://aaanew12-chart',
            col: [
              {
                title: '医院',
                width: 80,
                key: 'hospitalName'
              },
              {
                title: '渠道',
                width: 80,
                key: 'storeName'
              },
              {
                title: '新增人数',
                align: 'right',
                width: 80,
                key: 'num'
              }
            ]
          },
          {
            type: 'item',
            key: 'chargeName',
            name: '消费意向',
            url: 'http://aaanew12-chart',
            col: [
              {
                title: '医院',
                width: 80,
                key: 'hospitalName'
              },
              {
                title: '意向分类',
                width: 80,
                key: 'itemGrounpName'
              },
              {
                title: '消费意向',
                width: 80,
                key: 'itemName'
              },
              {
                title: '咨询项目',
                width: 80,
                key: 'chargeName'
              },
              {
                title: '新增人数',
                align: 'right',
                width: 80,
                key: 'num'
              }
            ]
          }
        ],
        chart: null,
        timer: null,
        chartOption: {
          tooltip : {
            trigger: 'axis'
          },
          color: ['#3366cc', '#5733cc', '#ab33cc', '#d73681', '#f0463c', '#f0893c', '#f0ad3c', '#f0d13c', '#e9ee3d', '#a0dc37', '#33cc4c', '#339fcc'],
          yAxis: {
            type: 'value'
          },
          xAxis: {
            type: 'category',
            axisTick: {
              alignWithLabel: true
            },
            data: []
          },
          grid: {
            left: '10px',
            right: '20px',
            bottom: '3%',
            containLabel: true
          },
          series: [
            {
              type: 'bar',
              label: {
                emphasis: {
                  show: true,
                  position: 'top'
                }
              },
              data: [],
              itemStyle: {
                  emphasis: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
              }
            }
          ]
        }
      }
    },
    watch: {
      viewResize (val) {
        console.log('menuTodo');
        this.resizeChart();
      },
    },
    computed: {
      viewResize () {
        return this.$store.getters.getViewResize;
      },
      hospList () {
        return this.$store.getters.getSelectAllHospList;
      },
      channelGroupList () {
        return this.$store.getters.getSelectChannelGroupList;
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
      pageSize () {
        return this.$store.getters.getPageSize;
      },
      exportPrefixURL () {
        return this.$store.getters.getExportPrefixURL + '/guard-webManager/excelExport/failtureDetail.jhtml'
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
      deptType () {
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
      this.$store.dispatch('setSelectChannelGroupList');
      this.$store.dispatch('setSelectAllItemGroupList');
      this.$store.dispatch('setSelectAllItemList');
      this.$store.dispatch('setSelectAllSymptomInfoList');
    },
    beforeDestroy () {
      let _vm = this;
      if(_vm.chart) {
        _vm.chart.dispose();
        _vm.chart = null;
        window.removeEventListener('resize', _vm.resizeChart);
      }
      _vm.timer = null;
    },
    methods: {
      initPower () {
        if(this.power === 1) {
          this.formSearch.hospitalId = '';
          this.formSearch.userId = '';
        } else if(this.power === 2) {
          this.formSearch.hospitalId = localStorage.getItem('hospId');
          this.formSearch.userId = '';
        } else if(this.power === 3) {
          this.formSearch.hospitalId = localStorage.getItem('hospId');
          this.formSearch.userId = localStorage.getItem('userId');
        }
        this.getList(1, this.formSearch);
      },
      getList(pageNumber, form) {
        let _vm = this;
        _vm.$store.dispatch('setPageLoading', -1);
        form.pageNumber = pageNumber;
        form.pageSize = _vm.pageSize;
        _vm.$http.get({
          url: _vm.url,
          // data: form,
          success: function(res){
            console.log(res)
            if(res.data.code === 0) {
              if(_vm.chartType === 'record') {
                _vm.data = res.data.content.page.content || [];
                _vm.total = res.data.content.page.total || 0;
                _vm.pageNumber = res.data.content.page.pageNumber || 1;
                _vm.totalPages = res.data.content.page.totalPages || 1;
                _vm.$store.dispatch('setPageLoading', 1);
                if(_vm.chart) {
                  _vm.chart.dispose();
                  _vm.chart = null;
                  window.removeEventListener('resize', _vm.resizeChart);
                }
              } else {
                const list = res.data.content || [];
                _vm.data = list;
                _vm.$store.dispatch('setPageLoading', 1);
                _vm.$nextTick(() => {
                  _vm.initChart();
                  window.addEventListener('resize', _vm.resizeChart);
                  _vm.setChart(list);
                })
              }
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
        let _vm = this;
        if(val !== _vm.chartType) {
          _vm.chartType = val;
          _vm.getList(1, _vm.formSearch);
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
      setDept (data) {
        this.formSearch.deptId = data.id;
        this.deptName = data.name;
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
        this.userName = '';
        this.$refs.remoteChannel.clean();
        this.$refs.remoteStore.clean();
        this.initPower();
      },
      exportTable () {
        this.$refs.formSubmit.submit();
      },
      resizeChart () {
        console.log('---')
        if(this.chart) {  
          clearTimeout(this.timer);
          this.timer = setTimeout(() => {
              this.chart.resize();
          }, 200);
        }
      },
      initChart () {
        this.chart = echarts.init(this.$refs.echarts);
        this.chart.setOption(this.chartOption);
      },
      setChart (data) {
        const obj = this.colBox.filter(item => item.type === this.chartType)[0]
        const prop = obj.key;
        const name = obj.name;
        const legend = data.map(item => item[prop]);
        const series = data.map(item => item.num);
        console.log(legend)
        this.chart.setOption({
          xAxis: {
            data: legend
          },
          series : [
            {
              name: name,
              data: series
            }
          ]
        });
      },
    }
  }
</script>


