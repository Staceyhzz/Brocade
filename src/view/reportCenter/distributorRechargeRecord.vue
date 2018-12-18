/**
 * 渠道充值明细管理
 */

<template>
  <div class="container-box user" ref="containerBox">
    <div class="container-header">
      <h2>渠道充值明细</h2>
    </div>
    <div class="container-body">
      <Form :label-width="90" ref="formSearch" :model="formSearch">
        <Row type="flex" justify="start">
          <Col :xs='24' :sm='12' :md="8" :lg="6">
            <Form-item label="充值日期" prop='startTime'>
              <Date-picker :transfer='true' type="daterange" placement="bottom-start" :clearable="false" @on-change='setDate' :value='dateBox' style='width:100%'></Date-picker>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6">
            <Form-item label="渠道" prop='distributionUserID'>
              <input-remote
                :list='parentList' 
                :asyncKey='asyncKeyParent' 
                @on-change-word='changeParent'
                idProp='id' 
                nameProp='name' 
                :clearable='true'
                @on-clean='cleanParent'
                ref='parent'
                size='300px'
                v-model="formSearch.distributionUserID">
                <template slot="title">
                  <p style="width: 60%">{{$t('labelPublic.mc')}}</p>
                  <p style="width: 40%">手机号</p>
                </template>
                <template scope="label">
                  <p style="width: 60%">{{label.data.name}}</p>
                  <p style="width: 40%">{{label.data.mobile}}</p>
                </template>
              </input-remote>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6">
            <Form-item label="充值等级" prop="distributionNameLeveL">
              <Select v-model="formSearch.distributionNameLeveL" clearable>
                <Option v-for="item in levelList" :value="item.level" :key="item.id">{{ item.name }}</Option>
              </Select>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6">
            <Form-item label="充值操作人" prop='createUserId'>
              <cmptInputOpen :value='createUserName' placeholder="请选择充值操作人" @on-open='showUser' @on-clear='clearUser'></cmptInputOpen>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6">
            <Form-item label="收银员" prop='paidUserId'>
              <cmptInputOpen :value='paidUserName' placeholder="请选择收银员" @on-open='showCreateUser' @on-clear='clearCreateUser'></cmptInputOpen>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6">
            <ul class="header-btn-group">
              <li class="header-item"  @click="getList(1, formSearch)"><Icon type="search"></Icon>{{$t('publicSet.search')}}</li>
              <li class="header-item" @click="handleReset"><Icon type="refresh"></Icon>{{$t('publicSet.reset')}}</li>
            </ul>
          </Col>
        </Row>
      </Form>
      <Table stripe :columns="columns" :data="data"></Table>
      <div class="table-page">
        <div class="table-info">{{$t('publicSet.pageMsg', [pageNumber, totalPages, total])}}</div>
        <Page class="table-paginate" :total="total" @on-change='changePage' :current='pageNumber' show-elevator></Page>
      </div>
    </div>
    <cmptChooseUserSinger placeHolder="请选择人员" @setUserData="setUser" :dimension='false' :openKey='openKey'></cmptChooseUserSinger>
  </div>
</template>

<script>
  import resizeTime from 'components/tableResizeTime.vue';
  import inputRemote from 'components/InputRemote';
  export default {
    components: {inputRemote, resizeTime},
    data () {
      return {
        total: 0,
        totalPages: 1,
        pageNumber: 1,

        dateBox: [moment().startOf('isoWeek').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')],
        formSearch: {
          startTime: moment().startOf('isoWeek').format('YYYY-MM-DD'),
          endTime: moment().format('YYYY-MM-DD'),
          distributionUserID: '',
          distributionNameLeveL: '',
          paidUserId: '',
          createUserId: '',
        },

        parentList: [],
        asyncKeyParent: true,
        searchParentIndex: 0,

        levelList: [],

        paidUserName: '',
        createUserName: '',
        openKey: false,
        userType: true,

        columns: [
          {   
            title: this.$t('labelPublic.xh'),
            width: 50,
            render: (h, params) => {
              const _index = (this.pageNumber - 1) * 10;
              return h('span', params.index + 1 + _index);
            }
          },
          {
            title: '充值日期',
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
            title: '渠道',
            width: 60,
            key: 'distributionUserName'
          },
          {
            title: '充值金额',
            width: 60,
            align: 'right',
            key: 'amount',
            render: (h, params) => {
              if(Number.isFinite(params.row.amount)) {
                return h('span', params.row.amount.toFixed(2));
              }
            }
          },
          {
            title: '虚拟币金额',
            width: 60,
            align: 'right',
            key: 'virtualCurrencyBalance',
            render: (h, params) => {
              if(Number.isFinite(params.row.virtualCurrencyBalance)) {
                return h('span', params.row.virtualCurrencyBalance.toFixed(2));
              }
            }
          },
          {
            title: '充值等级',
            width: 60,
            key: 'distributionName'
          },
          {
            title: '充值操作人',
            width: 60,
            key: 'createUserName'
          },
          {
            title: '收银员',
            width: 60,
            key: 'paidUserName'
          },
        ],
        data: [],

      }
    },
    computed: {
      pageSize () {
        return this.$store.getters.getPageSize;
      },
    },
    created () {
      this.getList(1, this.formSearch);
      this.getLevel();
    },
    methods: {
      // 获取分页
      getList(pageNumber, form) {
        let _vm = this;
        _vm.$store.dispatch('setPageLoading', -1);
        form['pageIndex'] = pageNumber;
        form['pageSize'] = _vm.pageSize;
        _vm.$http.getPage({
          url: 'guard-webManager/report/distributionUserRechargeDetail.jhtml',
          data: form,
          success: function(res){
            const _data = res.data.content.content || [];
            const _col = _vm.tableCount(_data, ['amount', 'virtualCurrencyBalance']);
            _col.map(item => {
              const index = _vm.columns.findIndex(col => col.key === item.key);
              console.log(item)
              if(index >= 0) {
                _vm.columns[index].width = item.width;
              }
            });
            _vm.data = _data;
            _vm.total = res.data.content.total;
            _vm.pageNumber = res.data.content.pageNumber;
            _vm.totalPages = res.data.content.totalPages;
            _vm.$store.dispatch('setPageLoading', 1);
          },
          error: function(res){
            console.log(res);
          }
        });
      },
      //获取等级
      getLevel() {
        let _vm = this;
        _vm.$http.get({
          url: 'guard-webManager/distributionSet/getDistributionNameList.jhtml',
          success: function(res){
            if(res.data.code === 0) {
              _vm.levelList = res.data.content || [];
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
      //充值人
      showUser () {
        this.openKey = !this.openKey;
        this.userType = true;
      },
      setUser (data) {
        if(this.userType) {
          this.formSearch.createUserId = data.id;
          this.createUserName = data.name;
        } else {
          this.formSearch.paidUserId = data.id;
          this.paidUserName = data.name;
        }
      },
      clearUser () {
        this.formSearch.createUserId = '';
        this.createUserName = '';
      },
      //操作人
      showCreateUser () {
        this.openKey = !this.openKey;
        this.userType = false;
      },
      clearCreateUser () {
        this.formSearch.paidUserId = '';
        this.paidUserName = '';
      },
      //重置
      handleReset () {
        this.$refs.formSearch.resetFields();
        this.$refs.parent.clearQuery();
        this.paidUserName = '';
        this.createUserName = '';
        this.formSearch.startTime = moment().startOf('isoWeek').format('YYYY-MM-DD');
        this.formSearch.endTime = moment().format('YYYY-MM-DD');
        this.dateBox = [moment().startOf('isoWeek').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')];
        this.getList(1, this.formSearch);
      },
      //分页
      changePage (num) {
        this.getList(num, this.formSearch);
      },
      //上级渠道商
      changeParent(val) {
        let _vm = this;
        _vm.asyncKeyParent = true;
        _vm.searchParentIndex++;
        const _index = _vm.searchParentIndex;
        _vm.$http.get({
          url: 'guard-webManager/distributionUser/finddistributionUserList.jhtml',
          data: {
            name: val
          },
          success: function(res){
            if(res.data.code === 0) {
              if(_index === _vm.searchParentIndex) {
                _vm.parentList = res.data.content.map(item => {
                  return {
                    id: item.id,
                    name: item.name,
                    mobile: item.mobile
                  };
                }) || [];
                _vm.asyncKeyParent = false;
              }
            }
          },
          error: function(res){
            console.log(res);
          }
        });
      },
      cleanParent() {
        this.formSearch.distributionUserID = '';
      },
    }
  }
</script>
