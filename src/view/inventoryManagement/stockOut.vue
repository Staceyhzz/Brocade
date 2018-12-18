/** * 出库管理 */
<template>
  <div class="container-box">
    <div class="container-header">
      <h2>出库管理</h2>
    </div>
    <div class="container-body">
      <Tabs value="name1" :animated='false'>
        <Tab-pane label="销售出库" name="name1">
          <Table stripe :columns="col1" :data="data1"></Table>
        </Tab-pane>
        <Tab-pane label="借用出库" name="name2">
          <Table stripe :columns="col2" :data="data2"></Table>
        </Tab-pane>
        <Tab-pane label="出库明细" name="name3">
          <Form :label-width="70" inline ref='formSearch' :model='formSearch'>
            <Form-item label="出库日期" prop='startTime'>
              <Date-picker :transfer='true' type="daterange" placement="bottom-start" placeholder="选择日期" style="width: 180px" @on-change='setTime' :clearable='false'
                :value='dateBox'></Date-picker>
            </Form-item>
            <Form-item label="仓库" prop='warehouseId'>
              <Select v-model="formSearch.warehouseId" style="width:180px">
                <Option v-for="item in warehouseList" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
            </Form-item>
            <Form-item label="单据类型" prop='type'>
              <Select v-model="formSearch.type" style="width:180px">
                <Option v-for="item in typeList" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
            </Form-item>
            <ul class="header-btn-group not-float">
              <li class="header-item" @click="getSearch(1, 10, formSearch)">
                <Icon type="search"></Icon>查询</li>
              <li class="header-item" @click="handleReset('formSearch')">
                <Icon type="refresh"></Icon>重置</li>
            </ul>
          </Form>
          <Table stripe :columns="col3" :data="data3"></Table>
          <div class="table-page">
            <div class="table-info">当前第{{pageNumber}}页，共{{totalPages}}页，总共{{total}}条记录</div>
            <Page class="table-paginate" :total="total" @on-change='changePage' :current='pageNumber'></Page>
          </div>
        </Tab-pane>
      </Tabs>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        total: 0,
        totalPages: 1,
        pageNumber: 1,
        formSearch: {
          startTime: moment().startOf('month').format('YYYY-MM-DD'),
          endTime: moment().endOf('month').format('YYYY-MM-DD'),
          warehouseId: '',
          type: '',
        },
        dateBox: [moment().startOf('month').format('YYYY-MM-DD'), moment().endOf('month').format('YYYY-MM-DD')],
        col1: [{
            title: '序号',
            type: 'index',
            width: 60
          },
          {
            title: '单据类型',
            render: (h, params) => {
              return h('span', '销售单')
            }
          },
          {
            title: '单据日期',
            key: 'createtime',
          },
          {
            title: '姓名',
            key: 'customerName'
          },
          {
            title: '单据编号',
            key: 'id'
          },
          {
            title: '单据状态',
            render: (h, params) => {
              return h('span', '待发药')
            }
          },
          {
            title: '出库机构',
            render: (h, params) => {
              const _text = localStorage.getItem('hospName')
              return h('span', _text)
            }
          },
          {
            title: '数量',
            key: 'amount'
          },
          {
            title: '单据备注',
            key: 'remark'
          },
          {
            title: '操作',
            key: 'action',
            width: 80,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small',
                    icon: 'edit'
                  },
                  on: {
                    click: () => {
                      this.toAdd(params.row)
                    }
                  }
                }, '出库'),
              ])
            }
          }
        ],
        col2: [{
            title: '序号',
            type: 'index',
            width: 60
          },
          {
            title: '单据类型',
            render: (h, params) => {
              return h('span', '借用出库单')
            }
          },
          {
            title: '单据日期',
            key: 'createTime',
          },
          {
            title: '单据编号',
            key: 'no'
          },
          {
            title: '单据状态',
            render: (h, params) => {
              return h('span', '待出库')
            }
          },
          {
            title: '出库仓库',
            key: 'toName'
          },
          {
            title: '药品数量',
            key: 'num'
          },
          {
            title: '借用科室',
            key: 'deptName'
          },
          {
            title: '借用人员',
            key: 'doUserName'
          },
          {
            title: '单据备注',
            key: 'remark'
          },
          {
            title: '操作',
            key: 'action',
            width: 140,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small',
                    icon: 'edit'
                  },
                  style: {
                    marginRight: '2px',
                  },
                  on: {
                    click: () => {
                      this.toView(params.row, 1)
                    }
                  }
                }, '出库'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small',
                    icon: 'ios-trash-outline'
                  },
                  on: {
                    click: () => {
                      this.toView(params.row, 2)
                    }
                  }
                }, '取消'),
              ])
            }
          }
        ],
        col3: [{
            title: '序号',
            width: 70,
            render: (h, params) => {
              const _index = (this.pageNumber - 1) * 10
              return h('span', params.index + 1 + _index)
            }
          },
          {
            title: '出库单号',
            key: 'no',
            render: (h, params) => {
              return h('p', {
                style: {
                  color: '#3399ff',
                  cursor: 'pointer'
                },
                on: {
                  click: () => {
                    this.toLook(params.row.referid, params.row.type)
                  }
                }
              }, params.row.no)
            }
          },
          {
            title: '出库日期',
            render: (h, params) => {
              const _text = typeof params.row.createdate === 'string' ? params.row.createdate.split(' ')[0] : ''
              return h('span', _text)
            }
          },
          {
            title: '引用单据类型',
            render: (h, params) => {
              let _box = this.typeList.filter(item => item.id === params.row.type),
                _text = _box[0].name
              return h('span', _text)
            }
          },
          {
            title: '引用单据编号',
            key: 'referid'
          },
          {
            title: '单据日期',
            key: 'createtime',
          },
          {
            title: '单据状态',
            render: (h, params) => {
              return h('span', '已出库')
            }
          },
          {
            title: '出库机构',
            key: 'hospitalName'
          },
          {
            title: '出库仓库',
            key: 'warehouseName'
          },
          {
            title: '应出数量',
            key: 'requestNum'
          },
          {
            title: '实出数量',
            key: 'outNum'
          },
          {
            title: '实出金额',
            key: 'outAmount'
          },
        ],
        data1: [],
        data2: [],
        data3: [],
        typeList: [{
            id: 1,
            name: '治疗出库',
            url: '/deptStockOutDeskView',
          },
          {
            id: 2,
            name: '退货出库',
            url: '/returnView',
          },
          {
            id: 3,
            name: '调拨出库',
            url: '/allocateView',
          },
          {
            id: 4,
            name: '销售出库',
            url: '/stockOutSaleView',
          },
          {
            id: 5,
            name: '盘点出库',
            url: '/checkView',
          },
          {
            id: 6,
            name: '领用出库',
            url: '/useView',
          },
          {
            id: 7,
            name: '借用出库',
            url: '/stockOutBorrow',
          },
        ],
      }
    },
    computed: {
      warehouseList() {
        return this.$store.getters.getSelectUserWarehouseList
      },
    },
    created() {
      this.getList()
    },
    mounted() {
      this.$store.dispatch('setSelectUserWarehouseList', localStorage.getItem('userId'))
      this.getSearch(1, 10, this.formSearch)
    },
    methods: {
      getList() {
        let _vm = this
        _vm.$store.dispatch('setPageLoading', -1)
        _vm.$http.getPage({
          url: 'guard-webManager/stockOut/list.jhtml',
          success: function (res) {
						_vm.data1 = res.data.content.SaleList || []
						_vm.data2 = res.data.content.borrowList || []
						console.log(res)
						_vm.$store.dispatch('setPageLoading', 1);
          },
          error: function (res) {
            console.log(res);
          }
        })
      },
      getSearch(pageNumber, pageSize, form) {
        let _vm = this
        form['pageNumber'] = pageNumber
        form['pageSize'] = pageSize
        _vm.$http.get({
          url: 'guard-webManager/stockOut/stockOutDetail.jhtml',
          data: form,
          success: function (res) {
            if (res.data.code == 0) {
              _vm.data3 = res.data.content.content || []
              _vm.total = res.data.content.total || 0
              _vm.pageNumber = res.data.content.pageNumber || 1
              _vm.totalPages = res.data.content.totalPages || 1
              console.log(res)
            } else {
              console.log(res)
            }
          },
          error: function (res) {
            console.log(res)
          }
        })
      },
      changePage(num) {
        this.getSearch(num, 10, this.formSearch)
      },
      setTime(date) {
        this.formSearch.startTime = date[0]
        this.formSearch.endTime = date[1]
      },
      handleReset(name) {
        this.$refs[name].resetFields()
        this.formSearch.startTime = moment().startOf('month').format('YYYY-MM-DD')
        this.formSearch.endTime = moment().endOf('month').format('YYYY-MM-DD')
        this.dateBox = [moment().startOf('month').format('YYYY-MM-DD'), moment().endOf('month').format('YYYY-MM-DD')]
        this.getSearch(1, 10, this.formSearch)
      },
      toAdd(data) {
        let breadData = [{
            url: '/desktop',
            text: '桌面'
          },
          {
            url: '/stockOut',
            text: '出库管理'
          },
          {
            url: '/stockOutSaleAdd',
            text: '销售出库'
          }
        ]
        this.$store.dispatch('setBreadData', breadData)
        this.$router.push({
          path: '/stockOutSaleAdd',
          query: {
            id: data.id,
            cusId: data.customerid
          }
        })
      },
      toView(data, type) {
        let breadData = [{
            url: '/desktop',
            text: '桌面'
          },
          {
            url: '/stockOut',
            text: '出库管理'
          },
          {
            url: '/stockOutBorrow',
            text: '借用出库单'
          }
        ]
        this.$store.dispatch('setBreadData', breadData);
        this.$router.push({
          path: '/stockOutBorrow',
          query: {
            id: data.id,
            type: type
          }
        })
      },
      toLook(id, type) {
        let _url = this.typeList.filter(item => item.id === type)[0].url,
          _text = this.typeList.filter(item => item.id === type)[0].name,
          breadData = [{
              url: '/desktop',
              text: '桌面'
            },
            {
              url: '/stockOut',
              text: '出库管理'
            },
            {
              url: _url,
              text: _text
            }
          ]
        this.$store.dispatch('setBreadData', breadData)
        this.$router.push({
          path: _url,
          query: {
            id: id
          }
        })
      },
    }
  }

</script>

<style scoped>
  .table-page {
    padding-bottom: 100px;
  }

</style>
