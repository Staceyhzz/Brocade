/** * 入库管理 */
<template>
  <div class="container-box">
    <div class="container-header">
      <h2>入库管理</h2>
      <ul class="header-btn-group">
        <li class="header-item" @click="toView('add')">
          <Icon type="plus-round"></Icon>增加</li>
      </ul>
    </div>
    <div class="container-body">
      <Tabs value="name1" :animated='false'>
        <Tab-pane label="进货入库" name="name1">
          <Form :label-width="60" inline ref='formSearch1' :model='formSearch1'>
            <Form-item label="仓库" prop='warehouseId'>
              <Select v-model="formSearch1.warehouseId" clearable style="width:162px">
                <Option v-for="item in warehouseList" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
            </Form-item>
            <Form-item label="进货日期" prop='startTime'>
              <Date-picker :transfer='true' type="daterange" placement="bottom-start" placeholder="选择日期" style="width: 180px" @on-change='setTime1' :clearable='false'
                :value='dateBox1'></Date-picker>
            </Form-item>
            <Form-item label="供应商" prop='supplierId'>
              <cmptSupplierChoose _placeHolder="选择供应商" :_style="{width:'162px'}" :_supplierName="supplierName" v-on:setSupplierName="setSupplier"></cmptSupplierChoose>
            </Form-item>
            <Form-item label="进货单号" prop='no'>
              <Input v-model.trim="formSearch1.no" placeholder="请输入进货单号" :maxlength='20' @on-enter='getSearch1(1, 10, formSearch1)'></Input>
            </Form-item>
            <ul class="header-btn-group not-float">
              <li class="header-item" @click="getSearch1(1, 10, formSearch1)">
                <Icon type="search"></Icon>查询</li>
              <li class="header-item" @click="handleReset('formSearch1')">
                <Icon type="refresh"></Icon>重置</li>
            </ul>
          </Form>
          <Table stripe :columns="col4" :data="data4"></Table>
          <div class="table-page">
            <div class="table-info">当前第{{pageNumber1}}页，共{{totalPages1}}页，总共{{total1}}条记录</div>
            <Page class="table-paginate" :total="total1" @on-change='changePage1' :current='pageNumber1'></Page>
          </div>
        </Tab-pane>
        <Tab-pane label="借用归还" name="name2">
          <Table stripe :columns="col1" :data="data1"></Table>
        </Tab-pane>
        <Tab-pane label="退药换货" name="name3">
          <Table stripe :columns="col2" :data="data2"></Table>
        </Tab-pane>
        <Tab-pane label="入库明细" name="name4">
          <Form :label-width="70" inline ref='formSearch' :model='formSearch'>
            <Form-item label="入库日期" prop='startTime'>
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
        total1: 0,
        totalPages1: 1,
        pageNumber1: 1,
        supplierName: '',
        formSearch1: {
          startTime: moment().startOf('month').format('YYYY-MM-DD'),
          endTime: moment().endOf('month').format('YYYY-MM-DD'),
          warehouseId: '',
          supplierId: '',
          no: '',
        },
        dateBox1: [moment().startOf('month').format('YYYY-MM-DD'), moment().endOf('month').format('YYYY-MM-DD')],


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
            title: '借用科室',
            key: 'toName'
          },
          {
            title: '借用人员',
            key: 'doUserName'
          },
          {
            title: '单据类型',
            render: (h, params) => {
              return h('span', '借用归还单')
            }
          },
          {
            title: '单据日期',
            key: 'createDate',
            render: (h, params) => {
              const _text = typeof params.row.createDate === 'string' ? params.row.createDate.split(' ')[0] : ''
              return h('span', _text)
            }
          },
          {
            title: '单据编号',
            key: 'no'
          },
          {
            title: '入库仓库',
            key: 'toName'
          },
          {
            title: '单据状态',
            render: (h, params) => {
              return h('span', '待入库')
            }
          },
          {
            title: '数量',
            key: 'num'
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
                      this.toView(params.row)
                    }
                  }
                }, '入库'),
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
              return h('span', '退药单')
            }
          },
          {
            title: '单据日期',
            key: 'createTime',
            render: (h, params) => {
              const _text = typeof params.row.createTime === 'string' ? params.row.createTime.split(' ')[0] : ''
              return h('span', _text)
            }
          },
          {
            title: '单据编号',
            key: 'id'
          },
          {
            title: '单据状态',
            render: (h, params) => {
              const _text = params.row.auditStatus === 1 ? '待审核' : '待入库'
              const _color = params.row.auditStatus === 1 ? 'red' : 'blue'
              return h('span', {
                style: {
                  color: _color
                }
              }, _text)
            }
          },
          {
            title: '数量',
            key: 'totalNum'
          },
          {
            title: '执行人员',
            key: 'createUserName'
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
              if (params.row.auditStatus != 1) {
                return h('div', [
                  h('Button', {
                    props: {
                      type: 'primary',
                      size: 'small',
                      icon: 'edit'
                    },
                    on: {
                      click: () => {
                        this.toAdd(params.row, 1)
                      }
                    }
                  }, '入库'),
                ])
              }
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
            title: '入库单号',
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
            title: '入库日期',
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
              return h('span', '已入库')
            }
          },
          {
            title: '入库机构',
            key: 'hospitalName'
          },
          {
            title: '入库仓库',
            key: 'warehouseName'
          },
          {
            title: '应收数量',
            key: 'requestNum'
          },
          {
            title: '实收数量',
            key: 'inNum'
          },
          {
            title: '实收金额',
            key: 'inAmount'
          }
        ],
        col4: [{
            title: '序号',
            width: 70,
            render: (h, params) => {
              const _index = (this.pageNumber1 - 1) * 10
              return h('span', params.index + 1 + _index)
            }
          },
          {
            title: '进货单号',
            key: 'no'
          },
          {
            title: '进货日期',
            key: 'createdate',
            render: (h, params) => {
              const _text = params.row.createdate.split(' ')[0]
              return h('span', _text)
            }
          },
          {
            title: '仓库',
            key: 'warehouseName'
          },
          {
            title: '供应商',
            key: 'supplierName'
          },
          {
            title: '操作用户',
            key: 'createUserName'
          },
          {
            title: '备注',
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
                    icon: 'ios-eye'
                  },
                  on: {
                    click: () => {
                      this.toLook(params.row.id, 1)
                    }
                  }
                }, '查看'),
              ])
            }
          }
        ],
        data1: [],
        data2: [],
        data3: [],
        data4: [],
        typeList: [{
            id: 1,
            name: '进货入库',
            url: '/purchaseView',
          },
          {
            id: 2,
            name: '调拨入库',
            url: '/allocateView',
          },
          {
            id: 3,
            name: '盘点入库',
            url: '/checkView',
          },
          {
            id: 4,
            name: '退药换货入库',
            url: '/purchaseSaleReturnView',
          },
          {
            id: 6,
            name: '借用归还入库',
            url: '/purchaseBorrowView',
          },
        ],
      }
    },
    computed: {
      warehouseList() {
        return this.$store.getters.getSelectUserWarehouseList
      },
    },
    // created() {
    //   this.getSearch1(1, 10, this.formSearch1)
    // },
    // mounted() {
    //   this.$store.dispatch('setSelectUserWarehouseList', localStorage.getItem('userId'))
    //   this.getList()
    //   this.getSearch(1, 10, this.formSearch)
    // },
    activated() {
      this.getSearch1(this.pageNumber1, 10, this.formSearch1);
      this.getSearch(this.pageNumber, 10, this.formSearch);
      this.getList();
      this.$store.dispatch('setSelectUserWarehouseList', localStorage.getItem('userId'));
    },
    methods: {
      setSupplier(data) {
        this.formSearch1.supplierId = data.id
        this.supplierName = data.name
      },



      getList() {
        let _vm = this
        _vm.$http.get({
          url: 'guard-webManager/stockIn/list.jhtml',
          success: function (res) {
            if (res.data.code == 0) {
              console.log(res)
              _vm.data1 = res.data.content.returnBorrowedList || []
              _vm.data2 = res.data.content.salesList || []
            }
          },
          error: function (res) {
            console.log(res);
          }
        });
      },
      getSearch(pageNumber, pageSize, form) {
        let _vm = this
        form['pageNumber'] = pageNumber
        form['pageSize'] = pageSize
        _vm.$http.get({
          url: 'guard-webManager/stockIn/stockInDetail.jhtml',
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
      getSearch1(pageNumber, pageSize, form) {
        let _vm = this
        _vm.$store.dispatch('setPageLoading', -1)
        form['pageNumber'] = pageNumber
        form['pageSize'] = pageSize
        _vm.$http.getPage({
          url: 'guard-webManager/purchase/page.jhtml',
          data: form,
          success: function (res) {
						_vm.data4 = res.data.content.Page.content || []
						_vm.total1 = res.data.content.Page.total || 0
						_vm.pageNumber1 = res.data.content.Page.pageNumber || 1
						_vm.totalPages1 = res.data.content.Page.totalPages || 1
						_vm.$store.dispatch('setPageLoading', 1);
          },
          error: function (res) {
            console.log(res)
          }
        })
      },
      changePage(num) {
        this.getSearch(num, 10, this.formSearch)
      },
      changePage1(num) {
        this.getSearch1(num, 10, this.formSearch1)
      },
      setTime(date) {
        this.formSearch.startTime = date[0]
        this.formSearch.endTime = date[1]
      },
      setTime1(date) {
        this.formSearch1.startTime = date[0]
        this.formSearch1.endTime = date[1]
      },
      handleReset(name) {
        this.$refs[name].resetFields()
        if (name === 'formSearch') {
          this.formSearch.startTime = moment().startOf('month').format('YYYY-MM-DD')
          this.formSearch.endTime = moment().endOf('month').format('YYYY-MM-DD')
          this.dateBox = [moment().startOf('month').format('YYYY-MM-DD'), moment().endOf('month').format('YYYY-MM-DD')]
          this.getSearch(1, 10, this.formSearch)
        } else {
          this.formSearch1.startTime = moment().startOf('month').format('YYYY-MM-DD')
          this.formSearch1.endTime = moment().endOf('month').format('YYYY-MM-DD')
          this.dateBox1 = [moment().startOf('month').format('YYYY-MM-DD'), moment().endOf('month').format('YYYY-MM-DD')]
          this.supplierName = ''
          this.getSearch1(1, 10, this.formSearch1)
        }
      },
      toAdd(data, type) {
        let breadData = [{
            url: '/desktop',
            text: '桌面'
          },
          {
            url: '/purchase',
            text: '入库管理'
          },
          {
            url: '/purchaseSaleReturn',
            text: '退药入库'
          }
        ]
        this.$store.dispatch('setBreadData', breadData)
        this.$router.push({
          path: '/purchaseSaleReturn',
          query: {
            id: data.id
          }
        })
      },
      toView(data) {
        let _url = '',
          _text = '',
          _id = ''
        if (data === 'add') {
          _url = '/purchaseAdd'
          _text = '添加进货信息'
          _id = ''
        } else {
          _url = '/purchaseBorrow'
          _text = '借用归还单'
          _id = data.id
        }
        let breadData = [{
            url: '/desktop',
            text: '桌面'
          },
          {
            url: '/purchase',
            text: '入库管理'
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
            id: _id
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
              url: '/purchase',
              text: '入库管理'
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
    padding-bottom: 130px;
  }

</style>
