/**
 * 顾客接诊表
 *【原表】医院咨询师成交统计。
 */

<template>
  <div class="container-box">
    <div class="container-header">
      <h2>{{$t('reportSetting.cusConsultationRecord')}}</h2>
    </div>
    <div class="container-body">
      <!-- 查询 -->
      <div class="jyw-reporter-tit">
        <h3>{{$t('reportPublic.title1')}}</h3>
      </div>
      <Form :label-width="90" :model="formSearch" ref='formSearch' label-position="right">
        <Row type="flex" justify="start" align="top">
          <Col :xs='24' :sm='12' :md="8" :lg="6">
            <Form-item :label="$t('cusConsultationRecord.label1')" prop='startTime'>
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
            <Form-item :label="$t('labelPublic.zxry')" prop='userId'>
              <cmptInputOpen :value='userName' :placeholder="$t('placeholderPublic.zxry')" @on-open='showUser' @on-clear='clearUser'></cmptInputOpen>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6">
            <Form-item :label="$t('labelPublic.gkbh')" prop='customerId'>
              <Input v-model.trim="formSearch.customerId" :placeholder="$t('placeholderPublic.input')" :maxlength='15' @on-enter='getList(1, formSearch)'></Input>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6">
            <Form-item :label="$t('labelPublic.gkxm')" prop='customerName'>
              <Input v-model.trim="formSearch.customerName" :placeholder="$t('placeholderPublic.input')" :maxlength='15' @on-enter='getList(1, formSearch)'></Input>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6">
            <Form-item :label="$t('labelPublic.yxfl')" prop='itemGroupId'>
              <Select v-model="formSearch.itemGroupId" clearable>
                <Option v-for="item in itemGroupList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                <Option :value="0" :key="0">{{$t('treatPostServiceRecord.positionNull')}}</Option>
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
            <Form-item :label="$t('cusConsultationRecord.label2')" prop='symptomId'>
              <Select v-model="formSearch.symptomId" clearable>
                <Option v-for="item in symptomList" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6">
            <Form-item :label="$t('cusConsultationRecord.label3')" prop='chargeId'>
              <cmptInputOpen :value='chargeName' :placeholder="$t('cusConsultationRecord.placeholder')" @on-open='showCharge' @on-clear='clearCharge'></cmptInputOpen>
            </Form-item>
          </Col>
          <!-- <Col :xs='24' :sm='12' :md="8" :lg="6">
            <Form-item :label="$t('labelPublic.gklx')" prop='newOldType'>
              <Select v-model="formSearch.newOldType" clearable>
                <Option :value="1">{{$t('publicSet.newCus')}}</Option>
                <Option :value="2">{{$t('publicSet.oldCus')}}</Option>
              </Select>
            </Form-item>
          </Col> -->
          <Col :xs='24' :sm='12' :md="8" :lg="6">
            <Form-item :label="$t('labelPublic.mzlx')" prop='clinicType'>
              <Select v-model="formSearch.clinicType" clearable>
                <Option v-for="item in clinicTypeList" :value="item.id" :key="item.id">{{$t(item.lang)}}</Option>
              </Select>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6">
            <Form-item :label="$t('labelPublic.cjzt')" prop='dealStatus'>
              <Select v-model="formSearch.dealStatus" clearable>
                <Option :value="0">{{$t('publicSet.wcj')}}</Option>
                <Option :value="1">{{$t('publicSet.ycj')}}</Option>
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
      <cmptChooseUserSinger :placeHolder="$t('placeholderPublic.zxry')" @setUserData="setUser" :dimension='dimension' :openKey='openKey'></cmptChooseUserSinger>
      <cmptChargeChoose :placeHolder="$t('cusConsultationRecord.placeholder')" @on-change="setCharge" :openKey='chargeOpenKey'></cmptChargeChoose>
      <!-- 导出 -->
      <form :action="exportPrefixURL" method="get" ref="formSubmit" v-show="show">
        <input name="type" :value="formSearch.type">
        <input name="auth" :value="formSearch.auth">
        <input name="startTime" :value="formSearch.startTime">
        <input name="endTime" :value="formSearch.endTime">
        <input name="hospitalId" :value="formSearch.hospitalId">
        <input name="userId" :value="formSearch.userId">
        <input name="customerId" :value="formSearch.customerId">
        <input name="customerName" :value="formSearch.customerName">
        <input name="itemGroupId" :value="formSearch.itemGroupId">
        <input name="itemId" :value="formSearch.itemId">
        <input name="symptomId" :value="formSearch.symptomId">
        <input name="chargeId" :value="formSearch.chargeId">
        <input name="newOldType" :value="formSearch.newOldType">
        <input name="clinicType" :value="formSearch.clinicType">
        <input name="dealStatus" :value="formSearch.dealStatus">
        <input name="adminToken" :value="adminToken">
      </form>
      <!-- 图表 -->
      <div class="jyw-reporter-tit">
        <h3>{{$t('cusConsultationRecord.title')}}</h3>
        <div class="export" v-if="exportKey === '1'" @click="exportTable"></div>
        <div class="info">
          <Icon type="information"></Icon>
          <div class="info-msg">
            <p>{{$t('reportPublic.title3')}}</p>
            <p class="msg">{{$t('reportSetting.cusConsultationRecordMsg1')}}</p>
            <p>{{$t('reportPublic.title4')}}</p>
            <p class="msg">{{$t('reportSetting.cusConsultationRecordMsg2')}}</p>
          </div>
        </div>
      </div>
      <Menu mode="horizontal" :active-name="chartType" @on-select='changeChartType' class='jyw-report-chart-menu'>
        <Menu-item name="record_0">{{$t('cusConsultationRecord.menuTit1')}}</Menu-item>
        <Menu-item name="item_1">{{$t('cusConsultationRecord.menuTit2')}}</Menu-item>
        <Menu-item name="cus_2">{{$t('cusConsultationRecord.menuTit3')}}</Menu-item>
        <Menu-item name="price_3">{{$t('cusConsultationRecord.menuTit4')}}</Menu-item>
      </Menu>
      <!-- 表格 -->
      <Table stripe :columns="columns" :data="data" v-if="chartType === 'record_0' || chartType === 'cus_2'"></Table>
      <div class="jyw-complex-table"  v-if="chartType === 'item_1'">
        <table>
          <thead>
            <tr>
              <th>{{$t('cusConsultationRecord.label1')}}</th>
              <th>{{$t('labelPublic.yy')}}</th>
              <th>{{$t('labelPublic.zxry')}}</th>
              <th>{{$t('labelPublic.yxfl')}}</th>
              <th>{{$t('cusConsultationRecord.label8')}}</th>
              <th>{{$t('cusConsultationRecord.label5')}}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for='(item, index) in itemData' :key='index'>
              <td class="time" :rowspan='item.createTimeMerge.rowSpanNum' :class="{hidden: item.createTimeMerge.display}">{{item.createTime}}</td>
              <td class="text" :rowspan='item.hospitalNameMerge.rowSpanNum' :class="{hidden: item.hospitalNameMerge.display}">{{item.hospitalName}}</td>
              <td class="text" :rowspan='item.consultantMerge.rowSpanNum' :class="{hidden: item.consultantMerge.display}">{{item.consultant}}</td>
              <td class="text">{{item.itemGroupName}}</td>
              <td class="num">{{item.dealRate.toFixed(2)}}%</td>
              <td class="num" :rowspan='item.consultantMerge.rowSpanNum' :class="{hidden: item.consultantMerge.display}">{{item.averageRate.toFixed(2)}}%</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="jyw-complex-table"  v-if="chartType === 'price_3'">
        <table>
          <thead>
            <tr>
              <th>{{$t('cusConsultationRecord.label1')}}</th>
              <th>{{$t('labelPublic.yy')}}</th>
              <th>{{$t('labelPublic.zxry')}}</th>
              <th>{{$t('cusConsultationRecord.label6')}}</th>
              <th>{{$t('labelPublic.yxfl')}}</th>
              <th>{{$t('cusConsultationRecord.label9')}}</th>
              <th>{{$t('cusConsultationRecord.label10')}}</th>
              <th>{{$t('cusConsultationRecord.label7')}}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for='(item, index) in priceData' :key='index'>
              <td class="time" :rowspan='item.createTimeMerge.rowSpanNum' :class="{hidden: item.createTimeMerge.display}">{{item.createTime}}</td>
              <td class="text" :rowspan='item.hospitalNameMerge.rowSpanNum' :class="{hidden: item.hospitalNameMerge.display}">{{item.hospitalName}}</td>
              <td class="text" :rowspan='item.consultantMerge.rowSpanNum' :class="{hidden: item.consultantMerge.display}">{{item.consultant}}</td>
              <td class="num" :rowspan='item.consultantMerge.rowSpanNum' :class="{hidden: item.consultantMerge.display}">{{item.totalNumber}}</td>
              <td class="text">{{item.itemGroupName}}</td>
              <td class="price">{{item.customerUnitPrice.toFixed(2)}}</td>
              <td class="price" :rowspan='item.consultantMerge.rowSpanNum' :class="{hidden: item.consultantMerge.display}">{{item.customerTotalPrice.toFixed(2)}}</td>
              <td class="price" :rowspan='item.consultantMerge.rowSpanNum' :class="{hidden: item.consultantMerge.display}">{{item.averagePrice.toFixed(2)}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="table-page">
        <div class="table-info">{{$t('publicSet.pageMsg', [pageNumber, totalPages, total])}}</div>
        <Page class="table-paginate" :total="total" @on-change='changePage' :current='pageNumber' show-elevator show-sizer transfer @on-page-size-change='changeSize'></Page>
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
        formSearch: {
          type: 0,
          auth: 3,
          startTime: moment().startOf('isoWeek').format('YYYY-MM-DD'),
          endTime: moment().format('YYYY-MM-DD'),
          hospitalId: '',
          userId: '',
          customerId: '',
          customerName: '',
          itemGroupId: '',
          itemId: '',
          symptomId: '',
          chargeId: '',
          newOldType: '',
          clinicType: '',
          dealStatus: ''
        },
        dateBox: [moment().startOf('isoWeek').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')],
        userName: '',
        openKey: false,
        chargeName: '',
        chargeOpenKey: false,
        chartType: 'record_0',
        exportKey: localStorage.getItem('exportKey'),
        adminToken: this.$token.readToken('adminToken') || '',
        show: false,

        pageNumber: 1,
        pageSize: 10,
        totalPages: 1,
        total: 0,
        data: [],
        colBox: [
          {
            type: 'record_0',
            url: 'guard-webManager/newReport/cusConsultationRecord.jhtml',
            col: [
              {
                title: this.$t('labelPublic.xh'),
                width: 50,
                render: (h, params) => {
                  const _index = (this.pageNumber - 1) * this.pageSize;
                  return h('span', params.index + 1 + _index);
                }
              },
              {
                title: this.$t('cusConsultationRecord.label1'),
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
                title: this.$t('labelPublic.zxry'),
                width: 60,
                key: 'consultant'
              },
              {
                title: this.$t('labelPublic.gkbh'),
                width: 60,
                key: 'customerId'
              },
              {
                title: this.$t('labelPublic.gkxm'),
                width: 60,
                key: 'customerName'
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
                title: this.$t('cusConsultationRecord.label2'),
                width: 60,
                key: 'symptomName'
              },
              {
                title: this.$t('cusConsultationRecord.label3'),
                width: 60,
                key: 'chargeNames'
              },
              {
                title: this.$t('labelPublic.gklx'),
                width: 50,
                render: (h, params) => {
                  const text = params.row.netOldTypeOInt === '1'
                    ? this.$t('publicSet.newCus')
                    : this.$t('publicSet.oldCus');
                  const color = params.row.netOldTypeOInt === '1'
                    ? '#FF6F76' 
                    : '#4172F6';
                  return h('span', {
                    style: {
                      color: color
                    }
                  }, text);
                }
              },
              {
                title: this.$t('labelPublic.mzlx'),
                width: 50,
                key: 'clientType',
              },
              {
                title: this.$t('labelPublic.cjzt'),
                width: 50,
                render: (h, params) => {
                  const list = params.row.isDeal.split(',') || [];
                  const index = list.findIndex(item => item === '1');
                  const text = index >= 0
                    ? this.$t('publicSet.ycj')
                    : this.$t('publicSet.wcj');
                  const color = index >= 0 
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
                title: this.$t('cusConsultationRecord.label4'),
                width: 60,
                align: 'right',
                key: 'turnoverAmount',
                render: (h, params) => {
                  if(Number.isFinite(params.row.turnoverAmount)) {
                    return h('span', params.row.turnoverAmount.toFixed(2))
                  }
                }
              }
            ]
          },
          {
            type: 'item_1',
            url: 'guard-webManager/newReport/cusConsultationRecordStat.jhtml',
          },
          {
            type: 'cus_2',
            url: 'guard-webManager/newReport/cusConsultationRecordStat.jhtml',
            col: [
              {
                title: this.$t('labelPublic.xh'),
                width: 50,
                render: (h, params) => {
                  const _index = (this.pageNumber - 1) * this.pageSize;
                  return h('span', params.index + 1 + _index);
                }
              },
              {
                title: this.$t('cusConsultationRecord.label1'),
                width: 80,
                render: (h, params) => {
                  if(params.row.createTime) {
                    const text = params.row.createTime.split(' ')[0];
                    return h('span', text);
                  }
                }
              },
              {
                title: this.$t('labelPublic.yy'),
                width: 60,
                key: 'hospitalName'
              },
              {
                title: this.$t('labelPublic.zxry'),
                width: 60,
                key: 'consultant'
              },
              {
                title: this.$t('publicSet.newCus'),
                width: 60,
                render: (h, params) => {
                  if(Number.isFinite(params.row.netTypeAverageRate)) {
                    const text = params.row.netTypeAverageRate.toFixed(2) + '%';
                    return h('span', text);
                  }
                }
              },
              {
                title: this.$t('publicSet.oldCus'),
                width: 60,
                render: (h, params) => {
                  if(Number.isFinite(params.row.oldTypeAverageRate)) {
                    const text = params.row.oldTypeAverageRate.toFixed(2) + '%';
                    return h('span', text);
                  }
                }
              },
              {
                title: this.$t('cusConsultationRecord.label5'),
                width: 60,
                render: (h, params) => {
                  const num = (params.row.oldTypeAverageRate + params.row.netTypeAverageRate) || 0;
                  const text = (num / 2).toFixed(2) + '%';
                  return h('span', text);
                }
              }
            ]
          },
          {
            type: 'price_3',
            url: 'guard-webManager/newReport/cusConsultationRecordStat.jhtml',
          },
        ],
        itemData: [],
        priceData: []
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
      symptomList () {
        return this.$store.getters.getSelectAllSymptomInfoList;
      },
      clinicTypeList () {
        return this.$store.getters.getClinicTypeList.filter(item => item.id !== 3);
      },
      columns () {
        const index = this.colBox.findIndex(item => item.type === this.chartType);
        return this.colBox[index].col;
      },
      exportPrefixURL () {
        return this.$store.getters.getExportPrefixURL + '/guard-webManager/excelExport/cusConsultationRecordStat.jhtml'
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
      langRouterKey () {
        return this.$store.getters.getLandRouterKey;
      },
    },
    watch: {
      langRouterKey (val) {
        if(val === 'cusConsultationRecord') {
          this.getList(this.pageNumber, this.formSearch);
        }
      },
    },
    created () {
      this.formSearch.auth = this.getReporterPower('cusConsultationRecord');
      this.initPower();
    },
    mounted () {
      this.$store.dispatch('setSelectAllHospList');
      this.$store.dispatch('setSelectAllItemGroupList');
      this.$store.dispatch('setSelectAllItemList');
      this.$store.dispatch('setSelectAllSymptomInfoList');
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
            let data = res.data.content.content || [];
            let list = [];
            const index = _vm.colBox.findIndex(item => item.type === _vm.chartType);
            if(_vm.chartType === 'record_0') {
              let _col = _vm.tableCount(data, ['turnoverAmount']);
              _col.map(item => {
                const index1 = _vm.colBox[index].col.findIndex(col => col.key === item.key);
                console.log(item)
                if(index1 >= 0) {
                  _vm.colBox[index].col[index1].width = item.width;
                }
              });
            }
            if(_vm.chartType === 'record_0' || _vm.chartType === 'cus_2') {
              if(_vm.langRouterKey !== 'cusConsultationRecord') {
                _vm.data = data;
              } else {
                _vm.requestList(data, ['itemGroupName', 'itemName', 'symptomName', 'chargeNames', 'clientType']).then(res => _vm.data = res);
              }
            } else {
              data.map(item => {
                item.createTime = item.createTime
                  ? item.createTime.split(' ')[0]
                  : '';
                // item.percent = item.dealNum / item.totalNum * 100 || 0;
                // item.dealAmount = item.dealAmount
                //   ? item.dealAmount
                //   : 0;
                // item.allNum = item.allNum
                //   ? item.allNum
                //   : 0;
                // item.totalDealAmount = item.totalDealAmount
                //   ? item.totalDealAmount
                //   : 0;
              });
              list = _vm.combineCell(data, 'createTime');
              list = _vm.combineCell(data, 'hospitalName', ['createTime']);
              list = _vm.combineCell(data, 'consultant', ['createTime', 'hospitalName']);
            }
            if(_vm.chartType === 'item_1') {
              // list.map((item, index) => {
              //   let count = 0;
              //   if(!item.consultantMerge.display) {
              //     for(let i = 0; i < item.consultantMerge.rowSpanNum; i++) {
              //       count += list[index + i].percent;
              //     }
              //     count = count / item.consultantMerge.rowSpanNum
              //   }
              //   item.count = count;
              // });
              if(_vm.langRouterKey !== 'cusConsultationRecord') {
                _vm.itemData = list;
              } else {
                _vm.requestList(data, ['itemGroupName']).then(res => _vm.itemData = res);
              }
            }
            if(_vm.chartType === 'price_3') {
              list.map((item, index) => {
                item.averagePrice = item.averagePrice * 1;
              });
              if(_vm.langRouterKey !== 'cusConsultationRecord') {
                _vm.priceData = list;
              } else {
                _vm.requestList(data, ['itemGroupName']).then(res => _vm.priceData = res);
              }
            }
            _vm.total = res.data.content.total || 0;
            _vm.pageNumber = res.data.content.pageNumber || 1;
            _vm.totalPages = res.data.content.totalPages || 1;
            _vm.$store.dispatch('setPageLoading', 1);
          },
          error: function(res){
            console.log(res);
          }
        });
      },
      changeChartType (val) {
        if(val !== this.chartType) {
          this.formSearch.type = val.split('_')[1];
          this.chartType = val;
          this.getList(1, this.formSearch);
        }
      },
      setDate (date) {
        this.formSearch.startTime = date[0];
        this.formSearch.endTime = date[1];
      },
      showCharge () {
        this.chargeOpenKey = !this.chargeOpenKey;
      },
      setCharge (data) {
        this.chargeName = data.name;
        this.formSearch.chargeId = data.id;
      },
      clearCharge () {
        this.chargeName = '';
        this.formSearch.chargeId = '';
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
      changePage (num) {
        this.getList(num, this.formSearch);
      },
      changeSize (num) {
        this.pageSize = num;
        this.getList(1, this.formSearch);
      },
      handleReset (name) {
        this.$refs[name].resetFields();
        this.formSearch.startTime = moment().startOf('isoWeek').format('YYYY-MM-DD');
        this.formSearch.endTime = moment().format('YYYY-MM-DD');
        this.dateBox = [moment().startOf('isoWeek').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')];
        this.userName = '';
        this.chargeName = '';
        this.initPower();
      },
      exportTable () {
        this.$refs.formSubmit.submit();
      },
    }
  }
</script>
