/**
 * 预约报表
 *【原表】由：集团治疗预约明细、医院治疗预约明细、用户治疗预约明细、集团登记治疗预约明细、医院、登记治疗预约明细、用户治疗预约每日统计、集团咨询预约明细、医院咨询预约明细、用户咨询预约明细合并。
 */

<template>
  <div class="container-box">
    <div class="container-header">
      <h2>{{$t('reportSetting.appointmentRecord')}}</h2>
    </div>
    <div class="container-body">
      <!-- 查询 -->
      <div class="jyw-reporter-tit">
        <h3>{{$t('reportPublic.title1')}}</h3>
        <reportSearch :list='searchList' @on-change='changeSearch'></reportSearch>
      </div>
      <Form :label-width="90" :model="formSearch" ref='formSearch' label-position="right">
        <Row type="flex" justify="start">
          <Col :xs='24' :sm='12' :md="8" :lg="6">
            <Form-item :label="$t('labelPublic.yyrq')" prop='startTime'>
              <Date-picker :transfer='true' type="daterange" placement="bottom-start" :clearable="false" @on-change='setDate' :value='dateBox' style='width:100%'></Date-picker>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6">
            <Form-item :label="$t('appointmentRecord.label1')" prop='appointmentType'>
              <Select v-model="formSearch.appointmentType" clearable>
                <Option v-for="item in typeList" :value="item.id" :key="item.id">{{$t(item.lang)}}</Option>
              </Select>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6">
            <Form-item :label="$t('appointmentRecord.label2')" prop='appointmentWay'>
              <Select v-model="formSearch.appointmentWay" clearable>
                <Option :value="1">{{$t('publicSet.line')}}</Option>
                <Option :value="2">{{$t('publicSet.onLine')}}</Option>
              </Select>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6" v-if='appointmentHospitalKey'>
            <Form-item :label="$t('labelPublic.yyyy')" prop='appointmentHospitalId'>
              <Select v-model="formSearch.appointmentHospitalId" clearable :disabled='formSearch.auth !== 1'>
                <Option v-for="item in hospList" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6" v-if='customerIdKey'>
            <Form-item :label="$t('labelPublic.gkbh')" prop='customerId'>
              <Input v-model.trim="formSearch.customerId" :placeholder="$t('placeholderPublic.input')" :maxlength='15' @on-enter='getList(1, formSearch)'></Input>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6" v-if='customerNameKey'>
            <Form-item :label="$t('labelPublic.gkxm')" prop='customerName'>
              <Input v-model.trim="formSearch.customerName" :placeholder="$t('placeholderPublic.input')" :maxlength='15' @on-enter='getList(1, formSearch)'></Input>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6">
            <Form-item :label="$t('appointmentRecord.label3')" prop='visitStatus'>
              <Select v-model="formSearch.visitStatus" clearable>
                <Option :value="0">{{$t('publicSet.wdz')}}</Option>
                <Option :value="1">{{$t('publicSet.ydz')}}</Option>
              </Select>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6" v-if='appointmentUserKey'>
            <Form-item :label="$t('appointmentRecord.label4')" prop='appointmentUserId'>
              <cmptInputOpen :value='appointmentUserName' :placeholder="$t('appointmentRecord.placeholder2')" @on-open='showUser(true)' @on-clear='clearUser(true)' :disabled='formSearch.auth === 3'></cmptInputOpen>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6">
            <Form-item :label="$t('appointmentRecord.label5')" prop='chargeId'>
              <cmptInputOpen :value='chargeName' :placeholder="$t('appointmentRecord.placeholder1')" @on-open='showCharge' @on-clear='clearCharge'></cmptInputOpen>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6" v-if='hospitalKey'>
            <Form-item :label="$t('labelPublic.tjyy')" prop='hospitalId'>
              <Select v-model="formSearch.hospitalId" clearable :disabled='formSearch.auth !== 1'>
                <Option v-for="item in hospList" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6" v-if='createUserKey'>
            <Form-item :label="$t('labelPublic.tjry')" prop='createUserId'>
              <cmptInputOpen :value='createUserName' :placeholder="$t('placeholderPublic.tjry')" @on-open='showUser(false)' @on-clear='clearUser(false)' :disabled='formSearch.auth === 3'></cmptInputOpen>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6">
            <Form-item :label="$t('labelPublic.ms')" prop='remark'>
              <Input v-model.trim="formSearch.remark" :placeholder="$t('placeholderPublic.input')" :maxlength='30' @on-enter='getList(1, formSearch)'></Input>
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
      <cmptChooseUserSinger :placeHolder="placeHolder" @setUserData="setUser" :dimension='dimension' :openKey='openKey'></cmptChooseUserSinger>
      <cmptChargeChoose :placeHolder="$t('appointmentRecord.placeholder1')" @on-change="setCharge" :openKey='chargeOpenKey'></cmptChargeChoose>
      <!-- 导出 -->
      <form :action="exportPrefixURL" method="get" ref="formSubmit" v-show="false">
        <input name="type" :value="formSearch.type">
        <input name="auth" :value="formSearch.auth">
        <input name="appointmentType" :value="formSearch.appointmentType">
        <input name="appointmentWay" :value="formSearch.appointmentWay">
        <input name="startTime" :value="formSearch.startTime">
        <input name="endTime" :value="formSearch.endTime">
        <input name="appointmentHospitalId" :value="formSearch.appointmentHospitalId">
        <input name="customerId" :value="formSearch.customerId">
        <input name="customerName" :value="formSearch.customerName">
        <input name="visitStatus" :value="formSearch.visitStatus">
        <input name="appointmentUserId" :value="formSearch.appointmentUserId">
        <input name="chargeId" :value="formSearch.chargeId">
        <input name="hospitalId" :value="formSearch.hospitalId">
        <input name="createUserId" :value="formSearch.createUserId">
        <input name="remark" :value="formSearch.remark">
        <input name="adminToken" :value="adminToken">
      </form>
      <!-- 图表 -->
      <div class="jyw-reporter-tit">
        <h3>{{$t('appointmentRecord.title')}}</h3>
        <div class="export" v-if="exportKey === '1'" @click="exportTable"></div>
        <div class="info">
          <Icon type="information"></Icon>
          <div class="info-msg">
            <p>{{$t('reportPublic.title3')}}</p>
            <p class="msg">{{$t('reportSetting.appointmentRecordMsg1')}}</p>
            <p>{{$t('reportPublic.title4')}}</p>
            <p class="msg">{{$t('reportSetting.appointmentRecordMsg2')}}</p>
          </div>
        </div>
      </div>
      <Menu mode="horizontal" :active-name="chartType" @on-select='changeChartType' class='jyw-report-chart-menu'>
        <Menu-item name="record_0">{{$t('appointmentRecord.menuTit1')}}</Menu-item>
        <Menu-item name="charge_1">{{$t('appointmentRecord.menuTit2')}}</Menu-item>
        <Menu-item name="user_2">{{$t('appointmentRecord.menuTit3')}}</Menu-item>
        <Menu-item name="doctor_3">{{$t('appointmentRecord.menuTit4')}}</Menu-item>
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
  import resizeRemark from 'components/tableResizeRemark.vue';
  import reportSearch from 'components/reportPowerSearch.vue';
  export default {
    components: {resizeRemark, cmptChargeChoose, reportSearch},
    data () {
      return {
        searchList: [
          {
            type: 'h',
            name: this.$t('labelPublic.yyyy'),
            prop: 'appointmentHospitalId',
            key: true,
          },
          {
            type: 'h',
            name: this.$t('labelPublic.tjyy'),
            prop: 'hospitalId',
            key: false,
          },
          {
            type: 'u',
            name: this.$t('appointmentRecord.label4'),
            prop: 'appointmentUserId',
            prop1: 'appointmentUserName',
            key: true,
          },
          {
            type: 'u',
            name: this.$t('labelPublic.tjry'),
            prop: 'createUserId',
            prop1: 'createUserName',
            key: false,
          },
          {
            type: 'c',
            name: this.$t('labelPublic.gkxm'),
            prop: 'customerName',
            key: true,
          },
          {
            type: 'c',
            name: this.$t('labelPublic.gkbh'),
            prop: 'customerId',
            key: false,
          }
        ],
        formSearch: {
          type: 0,
          auth: 3,
          appointmentType: '',
          appointmentWay: 1,
          startTime: moment().startOf('isoWeek').format('YYYY-MM-DD'),
          endTime: moment().format('YYYY-MM-DD'),
          appointmentHospitalId: '',
          customerId: '',
          customerName: '',
          visitStatus: '',
          appointmentUserId: '',
          chargeId: '',
          hospitalId: '',
          createUserId: '',
          remark: ''
        },
        dateBox: [moment().startOf('isoWeek').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')],
        typeList: [
          {
            id: 'appointment',
            name: '咨询预约',
            lang: 'publicSet.consult'
          },
          {
            id: 'treat',
            name: '治疗预约',
            lang: 'publicSet.treat'
          },
          {
            id: 'surgery',
            name: '手术预约',
            lang: 'publicSet.surgery'
          }
        ],
        appointmentUserName: '',
        createUserName: '',
        userType: true,
        openKey: false,
        chargeName: '',
        chargeOpenKey: false,
        chartType: 'record_0',
        exportKey: localStorage.getItem('exportKey'),
        adminToken: this.$token.readToken('adminToken') || '',

        pageNumber: 1,
        totalPages: 1,
        total: 0,
        data: [],
        colBox: [
          {
            type: 'record_0',
            url: 'guard-webManager/newReport/appointmentRecord.jhtml',
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
                title: this.$t('appointmentRecord.label1'),
                width: 50,
                render: (h, params) => {
                  const index = this.typeList.findIndex(item => item.id === params.row.appointmentType);
                  if(index >= 0) {
                    return h('span', this.$t(this.typeList[index].lang));
                  }
                }
              },
              {
                title: this.$t('appointmentRecord.label2'),
                width: 50,
                key: 'appointmentWay'
              },
              {
                title: this.$t('labelPublic.yyrq'),
                width: 80,
                render: (h, params) => {
                  if(params.row.appointmentTime) {
                    return h('span', params.row.appointmentTime.split(' ')[0]);
                  }
                }
              },
              {
                title: this.$t('appointmentRecord.colTit3'),
                width: 80,
                render: (h, params) => {
                  if(params.row.appointmentStartTime && params.row.appointmentEndTime) {
                    const _text = moment(params.row.appointmentStartTime).format('HH:mm') + '-' + moment(params.row.appointmentEndTime).format('HH:mm');
                    return h('span', _text);
                  }
                }
              },
              {
                title: this.$t('labelPublic.yyyy'),
                width: 60,
                key: 'appointmentHospitalName'
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
                title: this.$t('appointmentRecord.label3'),
                width: 60,
                render: (h, params) => {
                  const text = params.row.visitStatus === 1
                    ? this.$t('publicSet.ydz')
                    : this.$t('publicSet.wdz');
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
                title: this.$t('appointmentRecord.label4'),
                width: 60,
                key: 'appointmentUserName'
              },
              {
                title: this.$t('appointmentRecord.label5'),
                width: 60,
                key: 'chargeName'
              },
              {
                title: this.$t('labelPublic.tjyy'),
                width: 60,
                key: 'hospitalName'
              },
              {
                title: this.$t('labelPublic.tjry'),
                width: 60,
                key: 'createUserName'
              },
              {
                title: this.$t('labelPublic.ms'),
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
          },
          {
            type: 'charge_1',
            url: 'guard-webManager/newReport/appointmentRecordStat.jhtml',
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
                title: this.$t('labelPublic.yyrq'),
                width: 80,
                render: (h, params) => {
                  if(params.row.appointmentTime) {
                    return h('span', params.row.appointmentTime.split(' ')[0]);
                  }
                }
              },
              {
                title: this.$t('labelPublic.yyyy'),
                width: 80,
                key: 'hospitalName'
              },
              {
                title: this.$t('appointmentRecord.label5'),
                width: 80,
                key: 'chargeName'
              },
              {
                title: this.$t('appointmentRecord.colTit1'),
                width: 80,
                key: 'customerNum'
              },
            ]
          },
          {
            type: 'user_2',
            url: 'guard-webManager/newReport/appointmentRecordStat.jhtml',
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
                title: this.$t('labelPublic.yyrq'),
                width: 80,
                render: (h, params) => {
                  if(params.row.appointmentTime) {
                    return h('span', params.row.appointmentTime.split(' ')[0]);
                  }
                }
              },
              {
                title: this.$t('labelPublic.tjyy'),
                width: 60,
                key: 'hospitalName'
              },
              {
                title: this.$t('labelPublic.tjry'),
                width: 60,
                key: 'userName'
              },
              {
                title: this.$t('appointmentRecord.colTit1'),
                width: 100,
                key: 'customerNum'
              },
              {
                title: this.$t('appointmentRecord.colTit2'),
                width: 80,
                render: (h, params) => {
                  const text = (params.row.visitNum * 100 / params.row.customerNum).toFixed(2);
                  return h('span', text);
                }
              }
            ]
          },
          {
            type: 'doctor_3',
            url: 'guard-webManager/newReport/appointmentRecordStat.jhtml',
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
                title: this.$t('labelPublic.yyrq'),
                width: 80,
                render: (h, params) => {
                  if(params.row.appointmentTime) {
                    return h('span', params.row.appointmentTime.split(' ')[0]);
                  }
                }
              },
              {
                title: this.$t('labelPublic.yyyy'),
                width: 60,
                key: 'hospitalName'
              },
              {
                title: this.$t('appointmentRecord.label4'),
                width: 60,
                key: 'userName'
              },
              {
                title: this.$t('appointmentRecord.consult'),
                width: 100,
                key: 'appointmentNum'
              },
              {
                title: this.$t('appointmentRecord.treat'),
                width: 100,
                key: 'treatNum'
              },
              {
                title: this.$t('appointmentRecord.surgery'),
                width: 100,
                key: 'surgeryNum'
              }
            ]
          }
        ],

      }
    },
    computed: {
      appointmentHospitalKey () {
        const index = this.searchList.findIndex(item => item.prop === 'appointmentHospitalId');
        return this.searchList[index].key;
      },
      hospitalKey () {
        const index = this.searchList.findIndex(item => item.prop === 'hospitalId');
        return this.searchList[index].key;
      },
      appointmentUserKey () {
        const index = this.searchList.findIndex(item => item.prop === 'appointmentUserId');
        return this.searchList[index].key;
      },
      createUserKey () {
        const index = this.searchList.findIndex(item => item.prop === 'createUserId');
        return this.searchList[index].key;
      },
      customerNameKey () {
        const index = this.searchList.findIndex(item => item.prop === 'customerName');
        return this.searchList[index].key;
      },
      customerIdKey () {
        const index = this.searchList.findIndex(item => item.prop === 'customerId');
        return this.searchList[index].key;
      },
      hospList () {
        return this.$store.getters.getSelectAllHospList;
      },
      placeHolder () {
        if(this.userType) {
          return this.$t('appointmentRecord.placeholder2');
        } else {
          return this.$t('placeholderPublic.tjry');
        }
      },
      columns () {
        const index = this.colBox.findIndex(item => item.type === this.chartType);
        return this.colBox[index].col;
      },
      pageSize () {
        return this.$store.getters.getPageSize
      },
      exportPrefixURL () {
        return this.$store.getters.getExportPrefixURL + '/guard-webManager/excelExport/appointmentRecord.jhtml'
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
        if(val === 'appointmentRecord') {
          this.getList(this.pageNumber, this.formSearch);
        }
      },
    },
    created () {
      this.formSearch.auth = this.getReporterPower('appointmentRecord');
      this.initPower(this.searchList);
      this.getList(1, this.formSearch);
    },
    mounted () {
      this.$store.dispatch('setSelectAllHospList');
    },
    methods: {
      changeSearch (data, change) {
        this.searchList = data;
        this.initPower([change]);
      },
      initPower (data) {
        const hData = data.filter(item => item.type === 'h');
        const uData = data.filter(item => item.type === 'u');
        const cData = data.filter(item => item.type === 'c');
        hData.map(item => {
          if(item.key) {
            if(this.formSearch.auth === 1) {
              this.formSearch[item.prop] = '';
            } else {
              this.formSearch[item.prop] = localStorage.getItem('hospId') * 1;
            }
          } else {
            this.formSearch[item.prop] = '';
          }
        });
        uData.map(item => {
          if(item.key) {
            if(this.formSearch.auth === 3) {
              this.formSearch[item.prop] = localStorage.getItem('userId');
              this[item.prop1] = localStorage.getItem('userAccount');
            } else {
              this.formSearch[item.prop] = '';
              this[item.prop1] = '';
            }
          } else {
            this.formSearch[item.prop] = '';
            this[item.prop1] = '';
          }
        });
        cData.map(item => {
          this.formSearch[item.prop] = '';
        });
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
            const _data = res.data.content.page.content || [];
            if(_vm.langRouterKey !== 'appointmentRecord') {
              _vm.data = _data;
            } else {
              _vm.requestList(_data, ['appointmentWay', 'chargeName', 'remark']).then(res => _vm.data = res);
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
      showUser (val) {
        this.userType = val;
        this.openKey = !this.openKey;
      },
      setUser (data) {
        if(this.userType) {
          this.formSearch.appointmentUserId = data.id;
          this.appointmentUserName = data.name;
        } else {
          this.formSearch.createUserId = data.id;
          this.createUserName = data.name;
        }
      },
      clearUser (type) {
        if(type) {
          this.formSearch.appointmentUserId = '';
          this.appointmentUserName = '';
        } else {
          this.formSearch.createUserId = '';
          this.createUserName = '';
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
        this.chargeName = '';
        this.initPower(this.searchList);
        this.getList(1, this.formSearch);
      },
      exportTable () {
        this.$refs.formSubmit.submit();
      },
    }
  }
</script>