/**
 * 渠道提现明细
 */

<template>
  <div class="container-box user" ref="containerBox">
    <div class="container-header">
      <h2>渠道提现明细</h2>
    </div>
    <div class="container-body">
      <Form :label-width="90" ref="formSearch" :model="formSearch">
        <Row type="flex" justify="start">
          <Col :xs='24' :sm='12' :md="8" :lg="6">
            <Form-item label="申请日期" prop='startTime'>
              <Date-picker :transfer='true' type="daterange" placement="bottom-start" :clearable="false" @on-change='setDate' :value='dateBox' style='width:100%'></Date-picker>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6">
            <Form-item label="申请账户" prop='distributionUserId'>
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
                v-model="formSearch.distributionUserId">
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
            <Form-item label="申请状态" prop="status">
              <Select v-model="formSearch.status" clearable>
                <Option v-for="item in statusList" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6">
            <Form-item label="财务操作人" prop='createUserId'>
              <cmptInputOpen :value='createUserName' placeholder="请选择财务操作人" @on-open='showUser' @on-clear='clearUser'></cmptInputOpen>
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
          distributionUserId: '',
          status: '',
          createUserId: '',
        },

        createUserName: '',
        openKey: false,

        parentList: [],
        asyncKeyParent: true,
        searchParentIndex: 0,

        statusList: [
          {
            id: 0,
            name: '审核中',
            color: 'orange'
          },
          {
            id: 1,
            name: '已支付',
            color: '#4172F6'
          },
          {
            id: 2,
            name: '已拒绝',
            color: '#FF6F76'
          },
        ],

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
            title: '申请日期',
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
            title: '申请账户',
            width: 60,
            key: 'distributionUserName'
          },
          {
            title: '提现金额',
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
            title: '申请状态',
            width: 60,
            render: (h, params) => {
              const index = this.statusList.findIndex(item => item.id === params.row.status);
              if(index >= 0) {
                return h('span', {
                  style: {
                    color: this.statusList[index].color
                  }
                }, this.statusList[index].name);
              }
            }
          },
          {
            title: '财务操作人',
            width: 60,
            key: 'paidUserName'
          },
          {
            title: '操作时间',
            width: 80,
            render: (h, params) => {
              if(params.row.paidTime) {
                return h(resizeTime, {
                  props: {
                    time: params.row.paidTime
                  }
                })
              }
            }
          }
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
    },
    methods: {
      // 获取分页
      getList(pageNumber, form) {
        let _vm = this;
        _vm.$store.dispatch('setPageLoading', -1);
        form['pageIndex'] = pageNumber;
        form['pageSize'] = _vm.pageSize;
        _vm.$http.getPage({
          url: 'guard-webManager/report/distributorPutForwardRecord.jhtml',
          data: form,
          success: function(res){
            const _data = res.data.content.content || [];
            const _col = _vm.tableCount(_data, ['amount']);
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
      setDate (date) {
        this.formSearch.startTime = date[0];
        this.formSearch.endTime = date[1];
      },
      //重置
      handleReset () {
        this.$refs.formSearch.resetFields();
        this.$refs.parent.clearQuery();
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
      //充值人
      showUser () {
        this.openKey = !this.openKey;
      },
      setUser (data) {
        this.formSearch.createUserId = data.id;
        this.createUserName = data.name;
      },
      clearUser () {
        this.formSearch.createUserId = '';
        this.createUserName = '';
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
        this.formSearch.distributionUserId = '';
      },
    }
  }
</script>
