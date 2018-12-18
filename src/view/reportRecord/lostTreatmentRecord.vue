/**
 * 接诊流失分析
 *【原表】由：集团未成交明细、医院未成交明细、用户未成交明细三张报表合并。
 */

 <template>
  <div class="container-box">
    <div class="container-header">
      <h2>{{$t('reportSetting.lostTreatmentRecord')}}</h2>
    </div>
    <div class="container-body">
      <!-- 查询 -->
      <div class="jyw-reporter-tit">
        <h3>{{$t('reportPublic.title1')}}</h3>
      </div>
      <Form :label-width="90" :model="formSearch" ref='formSearch' label-position="right">
        <Row type="flex" justify="start">
          <Col :xs='24' :sm='12' :md="8" :lg="6">
            <Form-item :label="$t('labelPublic.rq')" prop='startTime'>
              <Date-picker :transfer='true' type="daterange" placement="bottom-start" :clearable="false" @on-change='setDate' :value='dateBox' style='width:100%'></Date-picker>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6" v-if='formSearch.auth === 1'>
            <Form-item :label="$t('labelPublic.yy')" prop='hospitalId'>
              <Select v-model="formSearch.hospitalId" clearable>
                <Option v-for="item in hospList" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6" v-if='formSearch.auth !== 3'>
            <Form-item :label="$t('labelPublic.jzry')" prop='userId'>
              <cmptInputOpen :value='userName' :placeholder="$t('placeholderPublic.jzry')" @on-open='showUser' @on-clear='clearUser'></cmptInputOpen>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6">
            <Form-item :label="$t('labelPublic.mzlx')" prop='clinicType'>
              <Select v-model="formSearch.clinicType" clearable>
                <Option v-for="item in clinicTypeList" :value="item.id" :key="item.id">{{$t(item.lang)}}</Option>
              </Select>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6">
            <Form-item :label="$t('lostTreatmentRecord.label_lslx')" prop='categoryId'>
              <Select v-model="formSearch.categoryId" clearable>
                <Option v-for="item in categoryList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                <Option :value="0">{{$t('lostTreatmentRecord.label_none')}}</Option>
              </Select>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6">
            <Form-item :label="$t('lostTreatmentRecord.label_lsyy')" prop='content'>
              <Input v-model.trim="formSearch.content" :placeholder="$t('lostTreatmentRecord.placeholder_lsyy')" :maxlength='30' @on-enter='getList(1, formSearch)'></Input>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6">
            <Form-item :label="$t('labelPublic.yxfl')" prop='itemGroupId'>
              <Select v-model="formSearch.itemGroupId" clearable>
                <Option v-for="item in itemGroupList" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6">
            <Form-item :label="$t('labelPublic.xfyx')" prop='itemId'>
              <Select v-model="formSearch.itemId" clearable>
                <Option v-for="item in itemList" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6">
            <Form-item :label="$t('labelPublic.jtly')" prop='channelId'>
              <cmptRemoteFilterChannel :_placeHolder="$t('placeholderPublic.filter')" @setChannelName='setChannel' ref='remoteChannel'></cmptRemoteFilterChannel>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6">
            <Form-item :label="$t('labelPublic.jtqd')" prop='storeId'>
              <cmptRemoteFilterStore :_placeHolder="$t('placeholderPublic.filter')" @setStoreName="setStore" ref='remoteStore' :_type='storeType'></cmptRemoteFilterStore>
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
      <cmptChooseUserSinger :placeHolder="$t('placeholderPublic.jzry')" @setUserData="setUser" :dimension='dimension' :openKey='openKey'></cmptChooseUserSinger>
      <!-- 导出 -->
      <form :action="exportPrefixURL" method="get" ref="formSubmit" v-show="false">
        <input name="auth" :value="formSearch.auth">
        <input name="type" :value="formSearch.type">
        <input name="startTime" :value="formSearch.startTime">
        <input name="endTime" :value="formSearch.endTime">
        <input name="hospitalId" :value="formSearch.hospitalId">
        <input name="userId" :value="formSearch.userId">
        <input name="clinicType" :value="formSearch.clinicType">
        <input name="categoryId" :value="formSearch.categoryId">
        <input name="content" :value="formSearch.content">
        <input name="itemGroupId" :value="formSearch.itemGroupId">
        <input name="itemId" :value="formSearch.itemId">
        <input name="channelId" :value="formSearch.channelId">
        <input name="storeId" :value="formSearch.storeId">
        <input name="adminToken" :value="adminToken">
      </form>
      <!-- 图表 -->
      <div class="jyw-reporter-tit">
        <h3>{{$t('lostTreatmentRecord.title')}}</h3>
        <div class="export" v-if="exportKey === '1'" @click="exportTable"></div>
        <div class="info">
          <Icon type="information"></Icon>
          <div class="info-msg">
            <p>{{$t('reportPublic.title3')}}</p>
            <p class="msg">{{$t('reportSetting.lostTreatmentMsg1')}}</p>
            <p>{{$t('reportPublic.title4')}}</p>
            <p class="msg">{{$t('reportSetting.lostTreatmentMsg2')}}</p>
          </div>
        </div>
      </div>
      <Menu mode="horizontal" :active-name="chartType" @on-select='changeChartType' class='jyw-report-chart-menu'>
        <Menu-item name="all_0">{{$t('lostTreatmentRecord.menuTit1')}}</Menu-item>
        <Menu-item name="type_1">{{$t('lostTreatmentRecord.menuTit2')}}</Menu-item>
        <Menu-item name="user_2">{{$t('lostTreatmentRecord.menuTit3')}}</Menu-item>
        <Menu-item name="channel_3">{{$t('lostTreatmentRecord.menuTit4')}}</Menu-item>
        <Menu-item name="exploit_4">{{$t('lostTreatmentRecord.menuTit5')}}</Menu-item>
      </Menu>
      <div class='report-chart-container' v-if="chartType !== 'all_0'">
        <div class="report-chart" ref='echarts'></div>
      </div>
      <!-- 表格 -->
      <Table stripe :columns="columns" :data="data"></Table>
      <div class="table-page" v-show="chartType === 'all_0'">
        <div class="table-info">{{$t('publicSet.pageMsg', [pageNumber, totalPages, total])}}</div>
        <Page class="table-paginate" :total="total" @on-change='changePage' :current='pageNumber' show-elevator></Page>
      </div>
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts';
  import walden from 'utils/walden.js';
  import resizeTime from 'components/tableResizeTime.vue';
  import resizeRemark from 'components/tableResizeRemark.vue';
  export default {
    components: {resizeTime, resizeRemark},
    data () {
      return {
        formSearch: {
          auth: 3,
          type: 0,
          startTime: moment().startOf('isoWeek').format('YYYY-MM-DD'),
          endTime: moment().format('YYYY-MM-DD'),
          hospitalId: '',
          userId: '',
          clinicType: '',
          categoryId: '',
          content: '',
          itemGroupId: '',
          itemId: '',
          channelId: '',
          storeId: '',
        },
        pageNumber: 1,
        totalPages: 1,
        total: 0,
        userName: '',
        dateBox: [moment().startOf('isoWeek').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')],
        adminToken: this.$token.readToken('adminToken') || '',
        exportKey: localStorage.getItem('exportKey'),
        openKey: false,


        chartType: 'all_0',
        data: [],
        colBox: [
          {
            type: 'all_0',
            url: 'guard-webManager/newReport/statLostTreatment.jhtml',
            col: [
              {
                title: this.$t('labelPublic.xh'),
                width: 50,
                render: (h, params) => {
                  const _index = (this.pageNumber - 1) * 10;
                  return h('span', params.index + 1 + _index);
                }
              },
              {
                title: this.$t('labelPublic.rq'),
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
                title: this.$t('labelPublic.yy'),
                width: 60,
                key: 'hospitalName'
              },
              {
                title: this.$t('labelPublic.jzry'),
                width: 60,
                key: 'userName'
              },
              {
                title: this.$t('labelPublic.mzlx'),
                width: 50,
                render: (h, params) => {
                  const index = this.clinicTypeList.findIndex(item => item.id === params.row.clinicType);
                  if(index >= 0) {
                    return h('span', this.$t(this.clinicTypeList[index].lang))
                  }
                }
              },
              {
                title: this.$t('labelPublic.gkxm'),
                width: 60,
                key: 'customerName'
              },
              {
                title: this.$t('lostTreatmentRecord.label_lslx'),
                width: 60,
                key: 'categoryName'
              },
              {
                title: this.$t('lostTreatmentRecord.label_lsyy'),
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
                title: this.$t('labelPublic.yxfl'),
                width: 60,
                key: 'itemGroupName'
              },
              {
                title: this.$t('labelPublic.xfyx'),
                width: 60,
                key: 'itemName'
              },
              {
                title: this.$t('reportPublic.tableChannelStore'),
                width: 60,
                render: (h, params) => {
                  if(params.row.storeName) {
                    return h('span', params.row.storeName);
                  } else if(params.row.channelName) {
                    return h('span', params.row.channelName);
                  }
                }
              },
              {
                title: this.$t('labelPublic.zxry'),
                width: 60,
                key: 'managerUserName'
              },
              {
                title: this.$t('labelPublic.kfry'),
                width: 60,
                key: 'exploitUserName'
              }
            ]
          },
          {
            type: 'type_1',
            name: this.$t('lostTreatmentRecord.label_lslx'),
            url: 'guard-webManager/newReport/statLostTreatmentStat.jhtml',
            col: [
              {
                title: this.$t('labelPublic.yy'),
                width: 80,
                key: 'hospitalName'
              },
              {
                title: this.$t('lostTreatmentRecord.label_lslx'),
                width: 80,
                key: 'name'
              },
              {
                title: this.$t('lostTreatmentRecord.label_rs'),
                align: 'right',
                width: 80,
                key: 'num'
              },
              {
                title: this.$t('lostTreatmentRecord.label_bfb'),
                align: 'right',
                width: 80,
                key: 'percent',
                render: (h, params) => {
                  const count = this.data.reduce((result, item) => result + item.num, 0);
                  const percent = (params.row.num * 100 / count).toFixed(2);
                  return h('span', percent + '%');
                }
              }
            ]
          },
          {
            type: 'user_2',
            name: this.$t('labelPublic.jzry'),
            url: 'guard-webManager/newReport/statLostTreatmentStat.jhtml',
            col: [
              {
                title: this.$t('labelPublic.yy'),
                width: 80,
                key: 'hospitalName'
              },
              {
                title: this.$t('labelPublic.jzry'),
                width: 80,
                key: 'name'
              },
              {
                title: this.$t('lostTreatmentRecord.label_rs'),
                align: 'right',
                width: 80,
                key: 'num'
              },
              {
                title: this.$t('lostTreatmentRecord.label_bfb'),
                align: 'right',
                width: 80,
                key: 'percent',
                render: (h, params) => {
                  const count = this.data.reduce((result, item) => result + item.num, 0);
                  const percent = (params.row.num * 100 / count).toFixed(2);
                  return h('span', percent + '%');
                }
              }
            ]
          },
          {
            type: 'channel_3',
            name: this.$t('reportPublic.tableChannelStore'),
            url: 'guard-webManager/newReport/statLostTreatmentStat.jhtml',
            col: [
              {
                title: this.$t('labelPublic.yy'),
                width: 80,
                key: 'hospitalName'
              },
              {
                title: this.$t('reportPublic.tableChannelStore'),
                width: 80,
                key: 'name'
              },
              {
                title: this.$t('lostTreatmentRecord.label_rs'),
                align: 'right',
                width: 80,
                key: 'num'
              },
              {
                title: this.$t('lostTreatmentRecord.label_bfb'),
                align: 'right',
                width: 80,
                key: 'percent',
                render: (h, params) => {
                  const count = this.data.reduce((result, item) => result + item.num, 0);
                  const percent = (params.row.num * 100 / count).toFixed(2);
                  return h('span', percent + '%');
                }
              }
            ]
          },
          {
            type: 'exploit_4',
            name: this.$t('labelPublic.kfry'),
            url: 'guard-webManager/newReport/statLostTreatmentStat.jhtml',
            col: [
              {
                title: this.$t('labelPublic.yy'),
                width: 80,
                key: 'hospitalName'
              },
              {
                title: this.$t('labelPublic.kfry'),
                width: 80,
                key: 'name'
              },
              {
                title: this.$t('lostTreatmentRecord.label_rs'),
                align: 'right',
                width: 80,
                key: 'num'
              },
              {
                title: this.$t('lostTreatmentRecord.label_bfb'),
                align: 'right',
                width: 80,
                key: 'percent',
                render: (h, params) => {
                  const count = this.data.reduce((result, item) => result + item.num, 0);
                  const percent = (params.row.num * 100 / count).toFixed(2);
                  return h('span', percent + '%');
                }
              }
            ]
          }
        ],
        chart: null,
        timer: null,
        chartOption: {
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            type: 'scroll',
            orient: 'vertical',
            right: 10,
            top: 20,
            bottom: 20,
            data: []
          },
          // color: ['#3366cc', '#5733cc', '#ab33cc', '#d73681', '#f0463c', '#f0893c', '#f0ad3c', '#f0d13c', '#e9ee3d', '#a0dc37', '#33cc4c', '#339fcc'],
          series: [
            {
              type: 'pie',
              radius : ['50%', '90%'],
              center: ['40%', '50%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '16'
                  },
                  formatter (params) {
                    console.log(params)
                    const str = params.name.replace(/.{6}(?!$)/g, (a) => a + '\n');
                    return str + '\n' + params.value + '(' + params.percent + '%)';
                  }
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
      langRouterKey (val) {
        if(val === 'lostTreatmentRecord') {
          this.getList(this.pageNumber, this.formSearch);;
        }
      },
    },
    computed: {
      viewResize () {
        return this.$store.getters.getViewResize;
      },
      hospList () {
        return this.$store.getters.getSelectAllHospList;
      },
      clinicTypeList () {
        return this.$store.getters.getClinicTypeList.filter(item => item.id !== 3);
      },
      categoryList () {
        return this.$store.getters.getSelectAllFailtureCategoryList;
      },
      itemGroupList () {
        return this.$store.getters.getSelectAllItemGroupList;
      },
      itemList () {
        return this.$store.getters.getSelectAllItemList;
      },
      pageSize () {
        return this.$store.getters.getPageSize;
      },
      exportPrefixURL () {
        return this.$store.getters.getExportPrefixURL + '/guard-webManager/excelExport/statLostTreatment.jhtml'
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
        if(this.formSearch.auth === 1) {
          return true;
        } else {
          return false;
        }
      },
      storeType () {
        if(this.formSearch.auth === 1) {
          return 3;
        } else if(this.formSearch.auth === 2) {
          return 1;
        } else {
          return 2;
        }
      },
      langRouterKey () {
        return this.$store.getters.getLandRouterKey;
      },
    },
    created () {
      this.formSearch.auth = this.getReporterPower('lostTreatmentRecord');
      this.initPower();
    },
    mounted () {
      this.$store.dispatch('setSelectAllHospList');
      this.$store.dispatch('setSelectAllFailtureCategoryList');
      this.$store.dispatch('setSelectAllItemGroupList');
      this.$store.dispatch('setSelectAllItemList');
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
        if(this.formSearch.auth === 1) {
          this.formSearch.hospitalId = '';
          this.formSearch.userId = '';
        } else if(this.formSearch.auth === 2) {
          this.formSearch.hospitalId = localStorage.getItem('hospId');
          this.formSearch.userId = '';
        } else if(this.formSearch.auth === 3) {
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
        _vm.$http.getPage({
          url: _vm.url,
          data: form,
          success: function(res){
            console.log(res)
            if(_vm.chartType === 'all_0') {
              const _data = res.data.content.page.content || [];
              if(_vm.langRouterKey !== 'lostTreatmentRecord') {
                _vm.data = _data;
              } else {
                _vm.requestList(_data, ['categoryName', 'content', 'itemGroupName', 'itemName', 'storeName', 'channelName']).then(res => _vm.data = res);
              }
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
              const list = res.data.content.map(item => {
                item.name = item.name
                  ? item.name
                  : _vm.$t('lostTreatmentRecord.label_none');
                return item;
              }) || [];
              _vm.data = list;
              _vm.$store.dispatch('setPageLoading', 1);
              _vm.$nextTick(() => {
                if(!_vm.chart) {
                  _vm.initChart();
                  window.addEventListener('resize', _vm.resizeChart);
                }
                _vm.setChart(list);
              })
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
          this.formSearch.type = val.split('_')[1];
          this.getList(1, this.formSearch);
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
      clearUser () {
        this.formSearch.userId = '';
        this.userName = '';
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
        this.chart = echarts.init(this.$refs.echarts, walden.theme);
        this.chart.setOption(this.chartOption);
      },
      setChart (data) {
        const obj = this.colBox.filter(item => item.type === this.chartType)[0]
        const name = obj.name;
        const legend = data.map(item => item.name);
        console.log(legend)
        const series = data.map(item => {
          return {
            value: item.num,
            name: item.name
          }
        });
        this.chart.setOption({
          legend: {
              data: legend
          },
          series : [
            {
              name: name,
              data: series
            }
          ]
        });
        this.chart.dispatchAction({
          type: 'legendScroll',
          scrollDataIndex: 0
        });
      },
    }
  }
</script>


