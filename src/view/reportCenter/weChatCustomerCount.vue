/**
* 微信顾客汇总
*/

<template>
  <div class="container-box" ref="containerBox">
    <div class="container-header">
      <h2>微信顾客汇总</h2>
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
  export default {
    components: {
      resizeTime
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

        col: [{
            title: '序号',
            width: 60,
            render: (h, params) => {
              const _index = (this.pageNumber - 1) * 10
              return h('span', params.index + 1 + _index)
            }
          },
          {
            title: '推荐人',
            width: 80,
            render: (h, params) => {
              return h('p', {
                on: {
                  click: () => {
                    this.toCus(params.row.id, params.row.promoterName);
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
            title: '推荐顾客数量',
            width: 60,
            align: 'right',
            key: 'recommendNumber'
          },
          {
            title: '消费客户数量',
            width: 60,
            align: 'right',
            key: 'consumerNumber'
          },
          {
            title: '消费提成金额',
            width: 60,
            align: 'right',
            key: 'consumptionSum',
            render: (h, params) => {
              if (Number.isFinite(params.row.consumptionSum)) {
                return h('span', params.row.consumptionSum.toFixed(2));
              }
            }
          },
          {
            title: '会费提成金额',
            width: 60,
            align: 'right',
            key: 'duesSum',
            render: (h, params) => {
              if (Number.isFinite(params.row.duesSum)) {
                return h('span', params.row.duesSum.toFixed(2));
              }
            }
          },
          {
            title: '佣金提成金额',
            width: 60,
            align: 'right',
            key: 'commissionSum',
            render: (h, params) => {
              if (Number.isFinite(params.row.commissionSum)) {
                return h('span', params.row.commissionSum.toFixed(2));
              }
            }
          },
          {
            title: '合计',
            width: 60,
            align: 'right',
            key: 'sum',
            render: (h, params) => {
              if (Number.isFinite(params.row.sum)) {
                return h('span', params.row.sum.toFixed(2));
              }
            }
          },
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
          url: 'guard-webManager/promoteRecord/customersummary.jhtml',
          data: form,
          success: function (res) {
            if (res.data.code === 0) {
              const data = res.data.content.content;
              _vm.total = res.data.content.total;
              _vm.pageNumber = res.data.content.pageNumber;
              _vm.totalPages = res.data.content.totalPages;
              let _col = _vm.tableCount(data, ['consumptionSum', 'duesSum', 'commissionSum', 'sum']);
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
    }
  }

</script>
