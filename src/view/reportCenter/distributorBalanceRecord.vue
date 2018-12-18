/**
 * 渠道当前收支余额明细
 */

<template>
  <div class="container-box user" ref="containerBox">
    <div class="container-header">
      <h2>渠道当前收支余额明细</h2>
    </div>
    <div class="container-body">
      <Form :label-width="90" ref="formSearch" :model="formSearch">
        <Row type="flex" justify="start">
          <Col :xs='24' :sm='12' :md="8" :lg="6">
            <Form-item label="渠道账户" prop='id'>
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
                v-model="formSearch.id">
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
            <Form-item label="手机号" prop='mobile'>
              <Input v-model.trim="formSearch.mobile" @on-enter="getList(1, formSearch)" :placeholder="$t('placeholderPublic.input')" :maxlength='20'></Input>
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
  </div>
</template>

<script>
  import inputRemote from 'components/InputRemote';
  export default {
    components: {inputRemote},
    data () {
      return {
        total: 0,
        totalPages: 1,
        pageNumber: 1,

        formSearch: {
          id: '',
          mobile: '',
        },


        parentList: [],
        asyncKeyParent: true,
        searchParentIndex: 0,

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
            title: '渠道账户',
            width: 60,
            key: 'name'
          },
          {
            title: '手机号',
            width: 90,
            key: 'mobile'
          },
          {
            title: '充值总额',
            width: 60,
            align: 'right',
            key: 'rechargeAmount',
            render: (h, params) => {
              if(Number.isFinite(params.row.rechargeAmount)) {
                return h('span', params.row.rechargeAmount.toFixed(2));
              }
            }
          },
          {
            title: '佣金总额',
            width: 60,
            align: 'right',
            key: 'commissionAmount',
            render: (h, params) => {
              if(Number.isFinite(params.row.commissionAmount)) {
                return h('span', params.row.commissionAmount.toFixed(2));
              }
            }
          },
          {
            title: '已提现总额',
            width: 60,
            align: 'right',
            key: 'putForwardAmount',
            render: (h, params) => {
              if(Number.isFinite(params.row.putForwardAmount)) {
                return h('span', params.row.putForwardAmount.toFixed(2));
              }
            }
          },
          {
            title: '现金余额',
            width: 60,
            align: 'right',
            key: 'cashAmount',
            render: (h, params) => {
              if(Number.isFinite(params.row.cashAmount)) {
                return h('span', params.row.cashAmount.toFixed(2));
              }
            }
          },
          {
            title: '冻结额度',
            width: 60,
            align: 'right',
            key: 'freezeAmount',
            render: (h, params) => {
              if(Number.isFinite(params.row.freezeAmount)) {
                return h('span', params.row.freezeAmount.toFixed(2));
              }
            }
          },
          {
            title: '虚拟币余额',
            width: 60,
            align: 'right',
            key: 'virtualCurrencyBalance',
            render: (h, params) => {
              if(Number.isFinite(params.row.virtualCurrencyBalance)) {
                return h('span', params.row.virtualCurrencyBalance.toFixed(2));
              }
            }
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
    },
    methods: {
      // 获取分页
      getList(pageNumber, form) {
        let _vm = this;
        _vm.$store.dispatch('setPageLoading', -1);
        form['pageIndex'] = pageNumber;
        form['pageSize'] = _vm.pageSize;
        _vm.$http.getPage({
          url: 'guard-webManager/report/distributorUserCurrentAmount.jhtml',
          data: form,
          success: function(res){
            const _data = res.data.content.content || [];
            const _col = _vm.tableCount(_data, ['virtualCurrencyBalance', 'freezeAmount', 'cashAmount', 'putForwardAmount', 'commissionAmount', '']);
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
      //重置
      handleReset () {
        this.$refs.parent.clearQuery();
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
        this.formSearch.id = '';
      },
    }
  }
</script>
