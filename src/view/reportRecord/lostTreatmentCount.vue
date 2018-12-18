/**
 * 接诊流失率分析
 *【原表】由：集团未成交类型统计、医院类型统计、用户未成交类型统计合并。
 * 流失率=1-成交人数/门诊人数
 */

<template>
  <div class="container-box">
    <div class="container-header">
      <h2>接诊流失率分析</h2>
    </div>
    <div class="container-body">
      <!-- 查询 -->
      <div class="jyw-reporter-tit">
        <h3>检索</h3>
      </div>
      <Form :label-width="90" :model="formSearch" ref='formSearch' label-position="right">
        <Row>
          <Col :sm='12' :md="8" :lg="6">
            <Form-item label="接诊日期" prop='startTime'>
              <Date-picker :transfer='true' type="daterange" placement="bottom-start" placeholder="选择日期" :clearable="false" @on-change='setDate' :value='dateBox' style='width:100%'></Date-picker>
            </Form-item>
          </Col>
          <Col :sm='12' :md="8" :lg="6">
            <Form-item label="接诊医院" prop='hospitalId'>
              <Select v-model="formSearch.hospitalId" clearable>
                <Option v-for="item in hospList" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
            </Form-item>
          </Col>
          <Col :sm='12' :md="8" :lg="6">
            <Form-item label="接诊人员" prop='userId'>
              <Input v-model="userName" readonly icon="ios-search" placeholder="选择接诊人员" @on-focus="showUser"></Input>
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
            <Form-item label="流失类型" prop='categoryId'>
              <Select v-model="formSearch.categoryId" clearable>
                <Option v-for="item in categoryList" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
            </Form-item>
          </Col>
          <Col :sm='12' :md="8" :lg="6">
            <Form-item label="来源分类" prop='channelId'>
              <cmptRemoteFilterChannel _placeHolder='输入拼音汉字快捷搜索' @setChannelName='setChannel' ref='remoteChannel'></cmptRemoteFilterChannel>
            </Form-item>
          </Col>
          <Col :sm='12' :md="8" :lg="6">
            <Form-item label="渠道分类" prop='storeId'>
              <cmptRemoteFilterStore _placeHolder="输入拼音汉字快捷搜索" @setStoreName="setStore" ref='remoteStore' :_type='storeType'></cmptRemoteFilterStore>
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
      <cmptChooseUserSinger placeHolder="选择接诊人员" @setUserData="setUser" :dimension='dimension' :openKey='openKey'></cmptChooseUserSinger>
      <!-- 图表 -->
      <div class="jyw-reporter-tit">
        <h3>流失率分析</h3>
      </div>
      <Menu mode="horizontal" :active-name="chartType" @on-select='changeChartType' class='jyw-report-chart-menu'>
        <Menu-item name="user">接诊人员</Menu-item>
        <Menu-item name="clinicType">流失类型统计</Menu-item>
        <Menu-item name="channel">来源统计</Menu-item>
        <Menu-item name="store">渠道统计</Menu-item>
      </Menu>
      <div class='report-chart-container'>
        <div class="report-chart" ref='echarts'></div>
      </div>
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts';
  import resizeTime from 'components/tableResizeTime.vue';
  export default {
    components: {resizeTime},
    data () {
      return {
        formSearch: {
          startTime: moment().startOf('isoWeek').format('YYYY-MM-DD'),
          endTime: moment().format('YYYY-MM-DD'),
          hospitalId: '',
          userId: '',
          clinicType: '',
          channelId: '',
          storeId: '',
        },
        dateBox: [moment().startOf('isoWeek').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')],
        userName: '',
        openKey: false,
        dimension: true,
        storeType: 1,


        chart: null,
        timer: null,
        chartType: 'user',
        chartOption: {
          tooltip : {
            trigger: 'axis'
          },
          legend: {
            type: 'scroll',
            top: 10,
            data: []
          },
          grid: {
            left: '10px',
            right: '30px',
            bottom: '3%',
            containLabel: true
          },
          color: ['rgba(255, 0, 0, 0.5)','rgba(0, 255, 0, 0.5)','rgba(0, 0, 255, 0.5)'],
          yAxis: {
            type: 'value',
            name: '单位：%'
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: []
          },
          series: []
        },
        chartTypeBox: []
      }
    },
    computed: {
      hospList () {
        return this.$store.getters.getSelectAllHospList
      },
      clinicTypeList () {
        return this.$store.getters.getClinicTypeList
      },
      categoryList () {
        return this.$store.getters.getSelectAllFailtureCategoryList
      },
    },
    created () {
      this.$store.dispatch('setPageLoading', 1);
    },
    mounted () {
      let _vm = this;
      _vm.$store.dispatch('setSelectAllHospList');
      _vm.$store.dispatch('setSelectAllFailtureCategoryList');
      _vm.$nextTick(() => {
        _vm.initChart();
        window.addEventListener('resize', _vm.resizeChart);
      })
      setTimeout(() => {
        _vm.setChart()
      }, 1000)
    },
    methods: {
      getList() {
        let _vm = this;
        _vm.$store.dispatch('setPageLoading', -1);
        _vm.$http.get({
          url: 'guard-webManager/report/failtureDetail.jhtml',
          data: _vm.formSearch,
          success: function(res){
            if(res.data.code === 0) {
              _vm.$store.dispatch('setPageLoading', 1);
              console.log(res)
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
          this.chart.showLoading('default', 
            {
              text: 'loading...',
              color: '#4172F6',
              textColor: '#000',
              maskColor: 'rgba(255, 255, 255, 0.8)',
              zlevel: 0
            }
          )
          setTimeout(() => {
            this.setChart()
          }, 1000)
        }
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
        this.chart.showLoading('default', 
          {
            text: 'loading...',
            color: '#4172F6',
            textColor: '#000',
            maskColor: 'rgba(255, 255, 255, 0.8)',
            zlevel: 0
          }
        )
      },
      setChart () {
        this.chart.hideLoading();
        this.chart.setOption({
          legend: {
            data: ['1', '2', '3']
          },
          xAxis: {
              data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
          },
          series : [
            {
              name: '1',
              type:'line',
              smooth: true,
              data: [1, 2, 3, 5, 7]
            },
            {
              name: '2',
              type:'line',
              smooth: true,
              data: [3, 2, 1, 4, 2]
            },
            {
              name: '3',
              type:'line',
              smooth: true,
              data: [1, 1, 1, 2, 5]
            }
          ]
        })
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
      setChannel (data) {
        this.formSearch.channelId = data.id;
      },
      setStore (data) {
        this.formSearch.storeId = data.id;
      },
      handleReset (name) {
        this.$refs[name].resetFields();
        this.formSearch.startTime = moment().startOf('isoWeek').format('YYYY-MM-DD');
        this.formSearch.endTime = moment().format('YYYY-MM-DD');
        this.dateBox = [moment().startOf('isoWeek').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')];
        this.userName = '';
        this.$refs.remoteChannel.clean();
        this.$refs.remoteStore.clean();
        this.getList();
      },
    }
  }
</script>