/**
 * 治疗岗位业务
 *【原表】由：集团工作量明细、医院工作量明细、用户工作量明细、集团划扣记录、医院划扣记录、用户划扣记录、集团医生业绩明细、医院医生业绩明细、医生业绩明细合并。
 */

<template>
  <div class="container-box">
    <div class="container-header">
      <h2>{{$t('reportSetting.treatPostServiceRecord')}}</h2>
    </div>
    <div class="container-body">
      <!-- 查询 -->
      <div class="jyw-reporter-tit">
        <h3>{{$t('reportPublic.title1')}}</h3>
      </div>
      <Form :label-width="90" :model="formSearch" ref='formSearch' label-position="right">
        <Row type="flex" justify="start" align="top">
          <Col :xs='24' :sm='12' :md="8" :lg="6">
            <Form-item :label="$t('treatPostServiceRecord.label1')" prop='startTime'>
              <Date-picker :transfer='true' type="daterange" placement="bottom-start" :clearable="false" @on-change='setDate' :value='dateBox' style='width:100%'></Date-picker>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6" v-if='formSearch.auth === 1'>
            <Form-item :label="$t('treatPostServiceRecord.label2')" prop='hospitalId'>
              <Select v-model="formSearch.hospitalId" clearable>
                <Option v-for="item in hospList" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
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
            <Form-item :label="$t('treatPostServiceRecord.label3')" prop='chargeId'>
              <cmptInputOpen :value='chargeName' :placeholder="$t('treatPostServiceRecord.placeholder1')" @on-open='showCharge' @on-clear='clearCharge'></cmptInputOpen>
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
          <Col :xs='24' :sm='12' :md="8" :lg="6" v-if='formSearch.auth !== 3'>
            <Form-item :label="$t('treatPostServiceRecord.label4')" prop='operationUserId'>
              <cmptInputOpen :value='operationUserName' :placeholder="$t('treatPostServiceRecord.placeholder2')" @on-open='showUser' @on-clear='clearUser'></cmptInputOpen>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6">
            <Form-item :label="$t('treatPostServiceRecord.label5')" prop='positionId'>
              <Select v-model="formSearch.positionId" clearable>
                <Option v-for="item in positionList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                <Option :value="0" :key="0">{{$t('treatPostServiceRecord.positionNull')}}</Option>
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
      <cmptChooseUserSinger :placeHolder="$t('treatPostServiceRecord.placeholder2')" @setUserData="setUser" :dimension='dimension' :openKey='openKey'></cmptChooseUserSinger>
      <cmptChargeChoose :placeHolder="$t('treatPostServiceRecord.placeholder1')" @on-change="setCharge" :openKey='chargeOpenKey'></cmptChargeChoose>
      <!-- 导出 -->
      <form :action="exportPrefixURL" method="get" ref="formSubmit" v-show="false">
        <input name="type" :value="formSearch.type">
        <input name="auth" :value="formSearch.auth">
        <input name="startTime" :value="formSearch.startTime">
        <input name="endTime" :value="formSearch.endTime">
        <input name="hospitalId" :value="formSearch.hospitalId">
        <input name="customerId" :value="formSearch.customerId">
        <input name="customerName" :value="formSearch.customerName">
        <input name="chargeId" :value="formSearch.chargeId">
        <input name="itemGroupId" :value="formSearch.itemGroupId">
        <input name="itemId" :value="formSearch.itemId">
        <input name="operationUserId" :value="formSearch.operationUserId">
        <input name="positionId" :value="formSearch.positionId">
        <input name="adminToken" :value="adminToken">
      </form>
      <!-- 图表 -->
      <div class="jyw-reporter-tit">
        <h3>{{$t('treatPostServiceRecord.title')}}</h3>
        <div class="export" v-if="exportKey === '1'" @click="exportTable"></div>
        <div class="info">
          <Icon type="information"></Icon>
          <div class="info-msg">
            <p>{{$t('reportPublic.title3')}}</p>
            <p class="msg">{{$t('reportSetting.treatPostServiceRecordMsg1')}}</p>
            <p>{{$t('reportPublic.title4')}}</p>
            <p class="msg">{{$t('reportSetting.treatPostServiceRecordMsg2')}}</p>
          </div>
        </div>
      </div>
      <Menu mode="horizontal" :active-name="chartType" @on-select='changeChartType' class='jyw-report-chart-menu'>
        <Menu-item name="record_1">{{$t('treatPostServiceRecord.menuTit1')}}</Menu-item>
        <Menu-item name="buy_2">{{$t('treatPostServiceRecord.menuTit2')}}</Menu-item>
        <Menu-item name="user_3">{{$t('treatPostServiceRecord.menuTit3')}}</Menu-item>
      </Menu>
      <!-- 表格 -->
      <Table stripe :columns="columns" :data="data"></Table>
      <div class="table-page">
        <div class="table-info">{{$t('publicSet.pageMsg', [pageNumber, totalPages, total])}}</div>
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
        formSearch: {
          type: 1,
          auth: 3,
          startTime: moment().startOf('isoWeek').format('YYYY-MM-DD'),
          endTime: moment().format('YYYY-MM-DD'),
          hospitalId: '',
          customerId: '',
          customerName: '',
          chargeId: '',
          itemGroupId: '',
          itemId: '',
          operationUserId: '',
          positionId: ''
        },
        dateBox: [moment().startOf('isoWeek').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')],
        operationUserName: '',
        openKey: false,
        chargeName: '',
        chargeOpenKey: false,
        chartType: 'record_1',
        exportKey: localStorage.getItem('exportKey'),
        adminToken: this.$token.readToken('adminToken') || '',

        pageNumber: 1,
        totalPages: 1,
        total: 0,
        data: [],
        colBox: [
          {
            type: 'record_1',
            key: ['performance'],
            langKey: ['chargeName', 'itemGroupName', 'itemName', 'positionName', 'unitName'],
            url: 'guard-webManager/newReport/treatPostServiceRecord.jhtml',
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
                title: this.$t('treatPostServiceRecord.label1'),
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
                title: this.$t('treatPostServiceRecord.label2'),
                width: 60,
                key: 'hospitalName'
              },
              {
                title: this.$t('labelPublic.gkbh'),
                width: 60,
                key: 'customerID'
              },
              {
                title: this.$t('labelPublic.gkxm'),
                width: 60,
                key: 'customerName'
              },
              {
                title: this.$t('treatPostServiceRecord.label3'),
                width: 60,
                key: 'chargeName'
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
                title: this.$t('treatPostServiceRecord.label4'),
                width: 60,
                key: 'operationUserName'
              },
              {
                title: this.$t('treatPostServiceRecord.label5'),
                width: 60,
                key: 'positionName'
              },
              {
                title: this.$t('treatPostServiceRecord.colTit1'),
                width: 50,
                key: 'unitName'
              },
              {
                title: this.$t('treatPostServiceRecord.colTit2'),
                width: 60,
                key: 'num'
              },
              {
                title: this.$t('treatPostServiceRecord.colTit3'),
                width: 60,
                align: 'right',
                key: 'performance',
                render: (h, params) => {
                  if(params.row.performance || params.row.performance === 0) {
                    return h('span', params.row.performance.toFixed(2))
                  }
                }
              }
            ]
          },
          {
            type: 'buy_2',
            key: ['performance', 'payAmount'],
            langKey: ['chargeName'],
            url: 'guard-webManager/newReport/treatPostServiceRecord.jhtml',
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
                title: this.$t('treatPostServiceRecord.label1'),
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
                title: this.$t('treatPostServiceRecord.label2'),
                width: 60,
                key: 'hospitalName'
              },
              {
                title: this.$t('labelPublic.gkbh'),
                width: 60,
                key: 'customerID'
              },
              {
                title: this.$t('labelPublic.gkxm'),
                width: 60,
                key: 'customerName'
              },
              {
                title: this.$t('treatPostServiceRecord.label3'),
                width: 60,
                key: 'chargeName'
              },
              {
                title: this.$t('treatPostServiceRecord.label4'),
                width: 60,
                key: 'operationUserName'
              },
              {
                title: this.$t('labelPublic.tjry'),
                width: 60,
                key: 'orderUserName'
              },
              {
                title: this.$t('treatPostServiceRecord.colTit4'),
                width: 80,
                render: (h, params) => {
                  if(params.row.orderCreateTime) {
                    return h(resizeTime, {
                      props: {
                        time: params.row.orderCreateTime
                      }
                    })
                  }
                }
              },
              {
                title: this.$t('treatPostServiceRecord.colTit5'),
                width: 60,
                key: 'orderHospitalName'
              },
              {
                title: this.$t('treatPostServiceRecord.colTit6'),
                width: 60,
                key: 'totalNum'
              },
              {
                title: this.$t('treatPostServiceRecord.colTit7'),
                align: 'right',
                width: 60,
                key: 'payAmount',
                render: (h, params) => {
                  if(params.row.payAmount || params.row.payAmount === 0) {
                    return h('span', params.row.payAmount.toFixed(2))
                  }
                }
              },
              {
                title: this.$t('treatPostServiceRecord.colTit3'),
                width: 60,
                align: 'right',
                key: 'performance',
                render: (h, params) => {
                  if(params.row.performance || params.row.performance === 0) {
                    return h('span', params.row.performance.toFixed(2))
                  }
                }
              }
            ]
          },
          {
            type: 'user_3',
            key: ['performance'],
            langKey: ['positionName'],
            url: 'guard-webManager/newReport/treatPostServiceRecordStat.jhtml',
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
                title: this.$t('treatPostServiceRecord.label2'),
                width: 60,
                key: 'hospitalName'
              },
              {
                title: this.$t('treatPostServiceRecord.label4'),
                width: 60,
                key: 'operationUserName'
              },
              {
                title: this.$t('treatPostServiceRecord.label5'),
                width: 60,
                key: 'positionName'
              },
              {
                title: this.$t('treatPostServiceRecord.colTit8'),
                width: 60,
                key: 'customerNum'
              },
              {
                title: this.$t('treatPostServiceRecord.colTit2'),
                width: 60,
                key: 'num'
              },
              {
                title: this.$t('treatPostServiceRecord.colTit3'),
                width: 60,
                align: 'right',
                key: 'performance',
                render: (h, params) => {
                  if(params.row.performance || params.row.performance === 0) {
                    return h('span', params.row.performance.toFixed(2))
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
      itemGroupList () {
        return this.$store.getters.getSelectAllItemGroupList;
      },
      itemList () {
        return this.$store.getters.getSelectAllItemList;
      },
      positionList () {
        return this.$store.getters.getSelectAllPositionList;
      },
      columns () {
        const index = this.colBox.findIndex(item => item.type === this.chartType);
        return this.colBox[index].col;
      },
      pageSize () {
        return this.$store.getters.getPageSize
      },
      exportPrefixURL () {
        return this.$store.getters.getExportPrefixURL + '/guard-webManager/excelExport/treatPostServiceRecord.jhtml'
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
        if(val === 'treatPostServiceRecord') {
          this.getList(this.pageNumber, this.formSearch);
        }
      },
    },
    created () {
      this.formSearch.auth = this.getReporterPower('treatPostServiceRecord');
      this.initPower();
    },
    mounted () {
      this.$store.dispatch('setSelectAllHospList');
      this.$store.dispatch('setSelectAllItemGroupList');
      this.$store.dispatch('setSelectAllItemList');
      this.$store.dispatch('setSelectAllPositionList');
    },
    methods: {
      initPower () {
        if(this.formSearch.auth === 1) {
          this.formSearch.hospitalId = '';
          this.formSearch.operationUserId = '';
        } else if(this.formSearch.auth === 2) {
          this.formSearch.hospitalId = localStorage.getItem('hospId');
          this.formSearch.operationUserId = '';
        } else if(this.formSearch.auth === 3) {
          this.formSearch.hospitalId = localStorage.getItem('hospId');
          this.formSearch.operationUserId = localStorage.getItem('userId');
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
            const data = res.data.content.page.content || [];
            const index = _vm.colBox.findIndex(item => item.type === _vm.chartType);
            const keyBox = _vm.colBox[index].key;
            let _col = _vm.tableCount(data, keyBox);
            _col.map(item => {
              const index1 = _vm.colBox[index].col.findIndex(col => col.key === item.key);
              console.log(item)
              if(index1 >= 0) {
                _vm.colBox[index].col[index1].width = item.width;
              }
            });
            if(_vm.langRouterKey !== 'treatPostServiceRecord') {
              _vm.data = data;
            } else {
              _vm.requestList(data, _vm.colBox[index].langKey).then(res => _vm.data = res);
            }
            _vm.total = res.data.content.page.total || 0;
            _vm.pageNumber = res.data.content.page.pageNumber || 1;
            _vm.totalPages = res.data.content.page.totalPages || 1;
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
        this.formSearch.operationUserId = data.id;
        this.operationUserName = data.name;
      },
      clearUser () {
        this.formSearch.operationUserId = '';
        this.operationUserName = '';
      },
      changePage (num) {
        this.getList(num, this.formSearch);
      },
      handleReset (name) {
        this.$refs[name].resetFields();
        this.formSearch.startTime = moment().startOf('isoWeek').format('YYYY-MM-DD');
        this.formSearch.endTime = moment().format('YYYY-MM-DD');
        this.dateBox = [moment().startOf('isoWeek').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')];
        this.operationUserName = '';
        this.chargeName = '';
        this.initPower();
      },
      exportTable () {
        this.$refs.formSubmit.submit();
      },
    }
  }
</script>