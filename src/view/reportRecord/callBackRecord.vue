/**
 * 随访提醒完成统计
 *【原表】由：集团回访明细、医院回访明细、用户回访明细、医院回访类型统计、用户回访类型统计、医院用户回访统计合并。
 */

 <template>
  <div class="container-box">
    <div class="container-header">
      <h2>随访提醒完成统计</h2>
    </div>
    <div class="container-body">
      <!-- 查询 -->
      <div class="jyw-reporter-tit">
        <h3>检索</h3>
      </div>
      <Form :label-width="90" :model="formSearch" ref='formSearch' label-position="right">
        <Row>
          <Col :sm='12' :md="8" :lg="6">
            <Form-item label="任务日期" prop='startTime'>
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
            <Form-item label="提醒类型" prop='categoryId'>
              <Select v-model="formSearch.categoryId" clearable>
                <Option v-for="item in categoryList" :value="item.id" :key="item.id">{{ item.name }}</Option>
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
            <Form-item label="计划人员" prop='userId' v-if='power !== 3'>
              <Input v-model="createUserName" readonly icon="ios-search" placeholder="选择计划人员" @on-focus="showUser(true)"></Input>
            </Form-item>
          </Col>
          <Col :sm='12' :md="8" :lg="6">
            <Form-item label="完成状态" prop='status'>
              <Select v-model="formSearch.status" clearable>
                <Option :value="1">已完成</Option>
                <Option :value="0">未完成</Option>
              </Select>
            </Form-item>
          </Col>
          <Col :sm='12' :md="8" :lg="6">
            <Form-item label="回访方式" prop='tool'>
              <Select v-model="formSearch.tool" clearable>
                <Option v-for="item in toolList" :value="item.code" :key="item.code">{{ item.name }}</Option>
              </Select>
            </Form-item>
          </Col>
          <Col :sm='12' :md="8" :lg="6">
            <Form-item label="回访内容" prop='content'>
              <Input v-model.trim="formSearch.content" placeholder="请输入回访内容" :maxlength='30'></Input>
            </Form-item>
          </Col>
          <Col :sm='12' :md="8" :lg="6">
            <Form-item label="执行人员" prop='userId' v-if='power !== 3'>
              <Input v-model="userName" readonly icon="ios-search" placeholder="选择执行人员" @on-focus="showUser(false)"></Input>
            </Form-item>
          </Col>
          <Col :sm='12' :md="8" :lg="6">
            <Form-item label="完成时间" prop='finishStartTime'>
              <Date-picker :transfer='true' type="daterange" placement="bottom-start" placeholder="选择日期" :clearable="false" @on-change='setFinishDate' style='width:100%'></Date-picker>
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
      <cmptChooseUserSinger :placeHolder="placeHolder" @setUserData="setUser" :dimension='dimension' :openKey='openKey'></cmptChooseUserSinger>
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
        <h3>回访分析</h3>
        <div class="export" v-if="exportKey === '1'"></div>
      </div>
      <Menu mode="horizontal" :active-name="chartType" @on-select='changeChartType' class='jyw-report-chart-menu'>
        <Menu-item name="record">提醒记录</Menu-item>
        <Menu-item name="user">员工回访完成率统计</Menu-item>
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
          categoryId: '',
          customerID: '',
          customerName: '',
          createUserId: '',
          status: '',
          tool: '',
          content: '',
          finishStartTime: '',
          finishEndTime: ''
        },
        pageNumber: 1,
        totalPages: 1,
        total: 0,
        categoryList: [],
        userName: '',
        createUserName: '',
        userType: true,
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
            url: 'http://aaanew15-record',
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
                title: '任务日期',
                width: 80,
                render: (h, params) => {
                  if(params.row.createTime) {
                    const text = params.row.createTime.split(' ')[0];
                    return h('span', text);
                  }
                }
              },
              {
                title: '医院',
                width: 60,
                key: 'hospitalName'
              },
              {
                title: '提醒类型',
                width: 60,
                key: 'categoryName'
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
                title: '计划人员',
                width: 60,
                key: 'createUserName'
              },
              {
                title: '完成状态',
                width: 60,
                render: (h, params) => {
                  const text = params.row.status === 1
                    ? '已完成'
                    : '未完成';
                  const color = params.row.status === 1
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
                title: '回访方式',
                width: 60,
                key: 'toolName'
              },
              {
                title: '回访内容',
                width: 100,
                render: (h, params) => {
                  if(params.row.content) {
                    return h(resizeRemark, {
                      props: {
                        remark: params.row.content
                      }
                    })
                  }
                }
              },
              {
                title: '执行人员',
                width: 60,
                key: 'userName'
              },
              {
                title: '完成时间',
                width: 80,
                render: (h, params) => {
                  if(params.row.finishTime) {
                    return h(resizeTime, {
                      props: {
                        time: params.row.finishTime
                      }
                    })
                  }
                }
              }
            ]
          },
          {
            type: 'user',
            url: 'http://aaanew15-chart',
            col: [
              {
                title: '医院',
                width: 80,
                key: 'hospitalName'
              },
              {
                title: '计划人员',
                width: 80,
                key: 'createUserName'
              },
              {
                title: '提醒类型',
                width: 80,
                key: 'categoryName'
              },
              {
                title: '提醒任务量',
                align: 'right',
                width: 80,
                key: 'workNum'
              },
              {
                title: '完成量',
                align: 'right',
                width: 80,
                key: 'doNum'
              },
              {
                title: '完成率',
                align: 'right',
                width: 60,
                key: 'percent'
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
          yAxis: [
            {
              type: 'value',
              name: '任务量',
              axisLabel: {
                formatter: '{value} 次'
              }
            },
            {
              type: 'value',
              name: '完成率',
              axisLabel: {
                formatter: '{value} %'
              }
            }
          ],
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
          legend: {
            data: ['任务量','完成量','完成率']
          },
          series: [
            {
              name: '任务量',
              type: 'bar',
              label: {
                emphasis: {
                  show: true,
                  position: 'top'
                }
              },
              barGap: '-100%',
              data: [],
              itemStyle: {
                  emphasis: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
              }
            },
            {
              name: '完成量',
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
            },
            {
              name: '完成率',
              type: 'line',
              yAxisIndex: 1,
              label: {
                emphasis: {
                  show: true,
                  position: 'top'
                }
              },
              data: []
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
      toolList () {
        return this.$store.getters.getSelectToolList;
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
      placeHolder () {
        if(this.userType) {
          return '选择计划人员';
        } else {
          return '选择执行人员';
        }
      },
    },
    created () {
      this.power = this.getReporterPower();
      this.initPower();
    },
    mounted () {
      this.$store.dispatch('setSelectAllHospList');
      this.$store.dispatch('setSelectToolList');
      this.getCategoryList()
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
                const _col = _vm.tableCount(list, ['workNum', 'doNum']);
                _col.map(item => {
                  const index = _vm.colBox[1].col.findIndex(col => col.key === item.key);
                  console.log(item)
                  if(index >= 0) {
                    _vm.colBox[1].col[index].width = item.width;
                  }
                });
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
      getCategoryList () {
        let _vm = this;
        _vm.$http.get({
          url: 'guard-webManager/callbackCategory/list.jhtml',
          success: function(res){
            if(res.data.code === 0 ){
              _vm.categoryList = res.data.content || [];
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
      setFinishDate (date) {
        this.formSearch.finishStartTime = date[0];
        this.formSearch.finishEndTime = date[1];
      },
      showUser (bool) {
        this.userType = bool;
        this.openKey = !this.openKey;
      },
      setUser (data) {
        if(this.userType) {
          this.formSearch.createUserId = data.id;
          this.createUserName = data.name;
        } else {
          this.formSearch.userId = data.id;
          this.userName = data.name;
        }
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
        const workList = data.map(item => item.workNum);
        const doList = data.map(item => item.doNum);
        const percentList = data.map(item => item.percent);
        const xData = data.map(item => item.createUserName);
        this.chart.setOption({
          series : [
            {
              name: '任务量',
              data: workList
            },
            {
              name: '完成量',
              data: doList
            },
            {
              name: '完成率',
              data: percentList
            }
          ],
          xAxis: {
            data: xData
          }
        });
      },
    }
  }
</script>


