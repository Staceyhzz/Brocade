/**
* 微信佣金明细
*/

<template>
  <div class="container-box" ref="containerBox">
    <div class="container-header">
      <h2>微信佣金明细</h2>
    </div>
    <div class="container-body">
      <Form :label-width="90" :model="formSearch" ref='formSearch' label-position="right" inline>
        <Form-item label="医院" prop='hospitalId'>
          <Select v-model="formSearch.hospitalId" clearable style="width:200px">
            <Option v-for="item in hospList" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
        </Form-item>
        <Form-item label="日期" prop='startTime'>
          <Date-picker :transfer='true' type="daterange" placement="bottom-start" @on-change='setDate' :value='showTime'
            style='width:200px'></Date-picker>
        </Form-item>
        <ul class="header-btn-group not-float">
          <li class="header-item" @click="getList(1, formSearch)">
            <Icon type="search"></Icon>查询
          </li>
          <li class="header-item" @click="handleReset('formSearch')">
            <Icon type="refresh"></Icon>重置
          </li>
        </ul>
      </Form>
      <Table stripe :columns="col" :data="data"></Table>
      <div class="table-page">
        <div class="table-info">当前第{{pageNumber}}页，共{{totalPages}}页，总共{{total}}条记录</div>
        <Page class="table-paginate" :total="total" @on-change='changePage' :curent='pageNumber'></Page>
      </div>
    </div>
  </div>
</template>r

<script>
  import resizeTime from 'components/tableResizeTime.vue';
  import resizeCus from 'components/tableResizeCus.vue';
  export default {
    components: {
      resizeTime,
      resizeCus
    },
    data() {
      return {
        showTime: [moment().startOf('month').format('YYYY-MM-DD'), moment().endOf('month').format('YYYY-MM-DD')],

        total: 0,
        totalPages: 1,
        pageNumber: 1,

        formSearch: {
          startTime: moment().startOf('month').format('YYYY-MM-DD'),
          endTime: moment().endOf('month').format('YYYY-MM-DD'),
          hospitalId: localStorage.getItem('hospId') * 1,
        },

        typeList: [{
            id: 1,
            name: '消费提成'
          },
          {
            id: 2,
            name: '佣金提成'
          },
          {
            id: 3,
            name: '会费提成'
          },
        ],

        col: [{
            title: '序号',
            width: 60,
            render: (h, params) => {
              const _index = (this.pageNumber - 1) * 10
              return h('span', params.index + 1 + _index)
            }
          },
          {
            title: '医院',
            width: 60,
            key: 'hospitalName'
          },
          {
            title: '生成时间',
            width: 80,
            render: (h, params) => {
              if (params.row.createTime) {
                return h(resizeTime, {
                  props: {
                    time: params.row.createTime
                  }
                })
              }
            }
          },
          {
            title: '推荐人',
            width: 80,
            render: (h, params) => {
              return h('p', {
                on: {
                  click: () => {
                    this.toCus(params.row.promoterID, params.row.promoterName);
                  }
                },
                style: {
                  cursor: 'pointer',
                  color: 'orange'
                }
              }, [
                h('Icon', {
                  props: {
                    type: "person"
                  }
                }),
                h('span', params.row.promoterName)
              ]);
            }
          },
          {
            title: '消费客户',
            width: 80,
            render: (h, params) => {
              return h(resizeCus, {
                props: {
                  name: params.row.customerName,
                  id: params.row.customerID,
                },
                on: {
                  'click': () => {
                    this.toCusIndex(params.row);
                  }
                }
              });
            }
          },
          {
            title: '收银单号',
            width: 80,
            key: 'cashierNo'
          },
          {
            title: '类型',
            width: 60,
            render: (h, params) => {
              const index = this.typeList.findIndex(item => item.id === params.row.type);
              if (index >= 0) {
                return h('span', this.typeList[index].name);
              }
            }
          },
          {
            title: '提成金额',
            width: 60,
            align: 'right',
            key: 'amount',
            render: (h, params) => {
              if (Number.isFinite(params.row.amount)) {
                return h('span', params.row.amount.toFixed(2));
              }
            }
          },
          {
            title: '提成等级',
            width: 60,
            key: 'level'
          },
          {
            title: '提成比例(%)',
            width: 60,
            render: (h, params) => {
              if (Number.isFinite(params.row.rate)) {
                return h('span', (params.row.rate * 100).toFixed(2));
              }
            }
          },
          {
            title: '提成收益',
            width: 60,
            align: 'right',
            key: 'commission',
            render: (h, params) => {
              if (Number.isFinite(params.row.commission)) {
                return h('span', params.row.commission.toFixed(2));
              }
            }
          }
        ],
        data: [],
      }
    },
    computed: {
      hospList() {
        return this.$store.getters.getSelectAllHospList;
      },
      pageSize() {
        return this.$store.getters.getPageSize;
      },
    },
    created() {
      this.getList(1, this.formSearch);
    },
    mounted() {
      this.$store.dispatch('setSelectAllHospList');
    },
    methods: {
      getList(pageNumber, form) {
        let _vm = this;
        _vm.$store.dispatch('setPageLoading', -1);
        form['pageNumber'] = pageNumber
        form['pageSize'] = _vm.pageSize
        _vm.$http.get({
          url: 'guard-webManager/promoteRecord/recommendedcommission.jhtml',
          data: form,
          success: function (res) {
            if (res.data.code === 0) {
              const data = res.data.content.content;
              _vm.total = res.data.content.total;
              _vm.pageNumber = res.data.content.pageNumber;
              _vm.totalPages = res.data.content.totalPages;
              let _col = _vm.tableCount(data, ['commission', 'amount']);
              _col.map(item => {
                const index1 = _vm.col.findIndex(col => col.key === item.key);
                console.log(item)
                if(index1 >= 0) {
                  _vm.col[index1].width = item.width;
                }
              });
              _vm.data = data;
              _vm.$store.dispatch('setPageLoading', 1);
            } else {
              console.log(res.data.desc)
            }
          },
          error: function (res) {
            console.log(res);
          }
        });
      },
      setDate(val) {
        this.formSearch.startTime = val[0];
        this.formSearch.endTime = val[1];
      },
      changePage(num) {
        this.getList(num, this.formSearch)
      },
      handleReset(name) {
        this.$refs[name].resetFields();
        this.formSearch.startTime = moment().startOf('month').format('YYYY-MM-DD');
        this.formSearch.endTime = moment().endOf('month').format('YYYY-MM-DD');
        this.showTime = [moment().startOf('month').format('YYYY-MM-DD'), moment().endOf('month').format('YYYY-MM-DD')]
        this.getList(1, this.formSearch);
      },
      toCus(id, name) {
        let breadData = [{
            url: '/desktop',
            text: '桌面'
          },
          {
            url: '/promoteRecord',
            text: '推荐佣金记录'
          },
          {
            url: '/recordPromoterRecord',
            text: name
          }
        ]
        this.$store.dispatch('setBreadData', breadData)
        this.$router.push({
          path: '/recordPromoterRecord',
          query: {
            id: id
          }
        })
      },
      toCusIndex(data) {
        const breadData = [
          {
            url: '/desktop',
            text: 'layoutNav.desk'
          },
          {
            url: '/customer',
            text: 'layoutNav.customerManage'
          },
          {
            url: '/customerIndex',
            text: data.customerName
          }
        ];
        this.$store.dispatch('setBreadData', breadData);
        this.$router.push({
          path: '/customerIndex',
          query: {
            id: data.customerID
          }
        });
        sessionStorage.setItem("cusName", data.customerName);
        sessionStorage.setItem("cusId", data.customerID);
      },
    }
  }

</script>
