/**
 * 渠道分销收支总表
 */

<template>
  <div class="container-box user" ref="containerBox">
    <div class="container-header">
      <h2>渠道分销收支总表</h2>
    </div>
    <div class="container-body">
      <Form :label-width="90" ref="formSearch" :model="formSearch">
        <Row type="flex" justify="start">
          <Col :xs='24' :sm='12' :md="8" :lg="6">
            <Form-item label="日期" prop='startTime'>
              <Date-picker :transfer='true' type="daterange" placement="bottom-start" :clearable="false" @on-change='setDate' :value='dateBox' style='width:100%'></Date-picker>
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
      <!-- <div class="table-page">
        <div class="table-info">{{$t('publicSet.pageMsg', [pageNumber, totalPages, total])}}</div>
        <Page class="table-paginate" :total="total" @on-change='changePage' :current='pageNumber' show-elevator></Page>
      </div> -->
    </div>
  </div>
</template>

<script>
  import resizeTime from 'components/tableResizeTime.vue';
  export default {
    components: {resizeTime},
    data () {
      return {
        total: 0,
        totalPages: 1,
        pageNumber: 1,

        dateBox: [moment().startOf('isoWeek').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')],
        formSearch: {
          startTime: moment().startOf('isoWeek').format('YYYY-MM-DD'),
          endTime: moment().format('YYYY-MM-DD')
        },

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
            title: '日期',
            width: 80,
            render: (h, params) => {
              if(params.row.key) {
                if(params.row.createDate) {
                  return h(resizeTime, {
                    props: {
                      time: params.row.createDate
                    }
                  })
                }
              } else {
                return h('span', params.row.title);
              }
            }
          },
          {
            title: '收入',
            align: 'center',
            children: [
               {
                title: '升级充值',
                align: 'center',
                key: 'upgradeRecharge',
                render: (h, params) => {
                  if(Number.isFinite(params.row.upgradeRecharge)) {
                    return h('span', params.row.upgradeRecharge.toFixed(2));
                  }
                }
              },
              {
                  title: '顾客消费实缴部分',
                  align: 'center',
                  key: 'customerConsumptionPaid',
                  render: (h, params) => {
                    if(Number.isFinite(params.row.customerConsumptionPaid)) {
                      return h('span', params.row.customerConsumptionPaid.toFixed(2));
                    }
                  }
              }
            ]
          },
          {
            title: '支出',
            align: 'center',
            children: [
               {
                title: '升级佣金',
                align: 'center',
                key: 'upgradeCommission',
                render: (h, params) => {
                  if(Number.isFinite(params.row.upgradeCommission)) {
                    return h('span', params.row.upgradeCommission.toFixed(2));
                  }
                }
              },
              {
                title: '消费佣金',
                align: 'center',
                key: 'consumerCommission',
                render: (h, params) => {
                  if(Number.isFinite(params.row.consumerCommission)) {
                    return h('span', params.row.consumerCommission.toFixed(2));
                  }
                }
              }
            ]
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
          url: 'guard-webManager/report/distributionSZDetail.jhtml',
          data: form,
          success: function(res){
            const data = res.data.content.map(item => {
              item.upgradeRecharge = Number.isFinite(item.upgradeRecharge) ? item.upgradeRecharge : 0;
              item.customerConsumptionPaid = Number.isFinite(item.customerConsumptionPaid) ? item.customerConsumptionPaid : 0;
              item.upgradeCommission = Number.isFinite(item.upgradeCommission) ? item.upgradeCommission : 0;
              item.consumerCommission = Number.isFinite(item.consumerCommission) ? item.consumerCommission : 0;
              item.key = true;
              return item;
            }) || [];
            const obj = {
              key: false,
              title: '总计',
              upgradeRecharge: data.reduce((pre, cur) => cur.upgradeRecharge + pre, 0),
              customerConsumptionPaid: data.reduce((pre, cur) => cur.customerConsumptionPaid + pre, 0),
              upgradeCommission: data.reduce((pre, cur) => cur.upgradeCommission + pre, 0),
              consumerCommission: data.reduce((pre, cur) => cur.consumerCommission + pre, 0)
            }
            _vm.data = [...data, obj];
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
        this.formSearch.startTime = moment().startOf('isoWeek').format('YYYY-MM-DD');
        this.formSearch.endTime = moment().format('YYYY-MM-DD');
        this.dateBox = [moment().startOf('isoWeek').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')];
        this.getList(1, this.formSearch);
      },
      //分页
      changePage (num) {
        this.getList(num, this.formSearch);
      },
    }
  }
</script>
