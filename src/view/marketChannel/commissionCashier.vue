/** * 佣金付款 */
<template>
  <div class="container-box">
    <div class="container-header">
      <h2>佣金付款</h2>
    </div>
    <div class="container-body">
      <Tabs :value="tabsName" ref='tab' :animated='false'>
        <Tab-pane label="待付款" name="name1">
          <Form :label-width="60" inline ref='formSearch' :model='formSearch'>
            <Form-item label="品牌" prop="categoryID">
              <cmptStoreCategoryChoose v-on:setStoreCategory="setStoreCategory" ref='remoteFilter'></cmptStoreCategoryChoose>
            </Form-item>
            <Form-item label="渠道" prop='storeID'>
              <cmptRemoteFilterStore _placeHolder="选择渠道" @setStoreName="setStore" ref='remoteStore'></cmptRemoteFilterStore>
            </Form-item>
            <ul class="header-btn-group not-float">
              <li class="header-item" @click="getList(1, 10, formSearch)">
                <Icon type="search"></Icon>查询</li>
              <li class="header-item" @click="handleReset('formSearch')">
                <Icon type="refresh"></Icon>重置</li>
            </ul>
          </Form>
          <Table stripe :columns="col" :data="data"></Table>
          <div class="table-page">
            <div class="table-info">当前第{{pageNumber}}页，共{{totalPages}}页，总共{{total}}条记录</div>
            <Page class="table-paginate" :total="total" @on-change='changePage' :current='pageNumber'></Page>
          </div>
          <div class="saveBtn">
            <Row>
              <Col span="4">本次佣金分析：</Col>
              <Col span="4">已选择渠道数：{{allCheck}}</Col>
              <Col span="4">支付合计：{{allNum}}</Col>
              <Col span="4" offset="8">
              <Button type="primary" icon="plus-round" long @click='save(1)' :loading='saveLoad'>提交支付</Button>
              </Col>
            </Row>
          </div>
        </Tab-pane>
        <Tab-pane label="待确认" name="name2">
          <Form :label-width="60" inline ref='formSearch2' :model='formSearch2'>
            <Form-item label="提交日期" prop='startTime'>
              <Date-picker :transfer='true' type="daterange" placement="bottom-start" placeholder="选择日期" :clearable="false" style="width: 180px" @on-change='setDate2'
                :value='dateBox2'></Date-picker>
            </Form-item>
            <Form-item label="品牌" prop="storeCategoryID">
              <cmptStoreCategoryChoose v-on:setStoreCategory="setStoreCategory2" ref='remoteFilter2'></cmptStoreCategoryChoose>
            </Form-item>
            <Form-item label="渠道" prop='storeID'>
              <cmptRemoteFilterStore @setStoreName="setStore2" ref='remoteStore2'></cmptRemoteFilterStore>
            </Form-item>
            <ul class="header-btn-group not-float">
              <li class="header-item" @click="getList2(1, 10, formSearch2)">
                <Icon type="search"></Icon>查询</li>
              <li class="header-item" @click="handleReset('formSearch2')">
                <Icon type="refresh"></Icon>重置</li>
            </ul>
          </Form>
          <Table stripe :columns="col2" :data="data2"></Table>
          <div class="table-page">
            <div class="table-info">当前第{{pageNumber2}}页，共{{totalPages2}}页，总共{{total2}}条记录</div>
            <Page class="table-paginate" :total="total2" @on-change='changePage2' :current='pageNumber2'></Page>
          </div>
          <div class="saveBtn">
            <Row>
              <Col span="4">本次佣金分析：</Col>
              <Col span="4">已支付渠道数：{{allCheck1}}</Col>
              <Col span="4">支付合计：{{allNum1}}</Col>
              <Col span="4" offset="8">
              <Button type="primary" icon="plus-round" long @click='save(2)' :loading='saveLoad'>确认支付</Button>
              </Col>
            </Row>
          </div>
        </Tab-pane>
        <Tab-pane label="付款记录" name="name3">
          <Form :label-width="60" inline ref='formSearch3' :model='formSearch3'>
            <Form-item label="提交日期" prop='startTime'>
              <Date-picker :transfer='true' type="daterange" placement="bottom-start" placeholder="选择日期" :clearable="false" style="width: 180px" @on-change='setDate3'
                :value='dateBox3'></Date-picker>
            </Form-item>
            <Form-item label="品牌" prop="storeCategoryID">
              <cmptStoreCategoryChoose v-on:setStoreCategory="setStoreCategory3" ref='remoteFilter3'></cmptStoreCategoryChoose>
            </Form-item>
            <Form-item label="渠道" prop='storeID'>
              <cmptRemoteFilterStore @setStoreName="setStore3" ref='remoteStore3'></cmptRemoteFilterStore>
            </Form-item>
            <ul class="header-btn-group not-float">
              <li class="header-item" @click="getList3(1, 10, formSearch3)">
                <Icon type="search"></Icon>查询</li>
              <li class="header-item" @click="handleReset('formSearch3')">
                <Icon type="refresh"></Icon>重置</li>
            </ul>
          </Form>
          <Table stripe :columns="col3" :data="data3"></Table>
          <div class="table-page" style="paddingBottom:130px;">
            <div class="table-info">当前第{{pageNumber3}}页，共{{totalPages3}}页，总共{{total3}}条记录</div>
            <Page class="table-paginate" :total="total3" @on-change='changePage3' :current='pageNumber3'></Page>
          </div>
        </Tab-pane>
      </Tabs>
    </div>
  </div>
</template>

<script>
  import cmptStoreCategoryChoose from 'components/storeCategoryChoose.vue'
  export default {
    components: {
      cmptStoreCategoryChoose
    },
    data() {
      return {
        tabsName: 'name1',
        total: 0,
        totalPages: 1,
        pageNumber: 1,
        saveLoad: false,
        formSearch: {
          categoryID: '',
          storeID: '',
        },
        col: [{
            width: 40,
            renderHeader: (h, params) => {
              return h('Checkbox', {
                props: {
                  value: this.selectAll
                },
                on: {
                  'on-change': (val) => {
                    this.data.map(item => {
                      item.check = val
                    })
                  }
                }
              })
            },
            render: (h, params) => {
              return h('Checkbox', {
                props: {
                  value: params.row.check
                },
                on: {
                  'on-change': (val) => {
                    this.data[params.index].check = val
                    this.data.splice(params.index, 1, this.data[params.index])
                  }
                }
              })
            }
          },
          {
            title: '品牌',
            key: 'categoryName'
          },
          {
            title: '渠道名称',
            render: (h, params) => {
              return h('p', {
                style: {
                  color: 'orange',
                  cursor: 'pointer'
                },
                on: {
                  click: () => {
                    this.toRecord(params.row.id)
                  }
                },
              }, [
                h('Icon', {
                  props: {
                    type: 'podium',
                    size: 16,
                  },
                  style: {
                    marginRight: '5px'
                  }
                }),
                h('span', params.row.name)
              ])
            }
          },
          {
            title: '佣金余额',
            key: 'price'
          },
          {
            title: '付款金额',
            width: 85,
            render: (h, params) => {
              return h('cmptInputNumber', {
                props: {
                  size: 'small',
                  min: -1000000,
                  value: params.row.amount,
                  max: 1000000,
                },
                on: {
                  'on-change': (val) => {
                    params.row.amount = parseFloat((val).toFixed(2));
                    this.data[params.index].amount = params.row;
                  },
                  'on-blur': () => {
                    this.data.splice(params.index, 1, this.data[params.index]);
                  }
                }
              })
            }
          },
          {
            title: '账户名',
            key: 'ownerName',
          },
          {
            title: '开户行',
            key: 'bank'
          },
          {
            title: '银行卡号',
            key: 'cardNo'
          },
          {
            title: '备注',
            width: 85,
            render: (h, params) => {
              let _val = '',
                _bool = false
              return h('Input', {
                props: {
                  size: 'small',
                  value: params.row.remark
                },
                on: {
                  input: (val) => {
                    console.log(val)
                    _val = val
                  },
                  'on-change': () => {
                    _bool = true
                  },
                  'on-blur': () => {
                    if (_bool) {
                      this.data[params.index].remark = _val
                    }
                  }
                }
              })
            }
          },
        ],
        data: [],
        orderType: [{
            id: 1,
            name: '项目单'
          },
          {
            id: 4,
            name: '退项目单'
          },
          {
            id: 10,
            name: '还款单'
          },
        ],




        total2: 0,
        totalPages2: 1,
        pageNumber2: 1,
        formSearch2: {
          startTime: moment().startOf('month').format('YYYY-MM-DD'),
          endTime: moment().endOf('month').format('YYYY-MM-DD'),
          storeID: '',
          storeCategoryID: '',
        },
        dateBox2: [moment().startOf('month').format('YYYY-MM-DD'), moment().endOf('month').format('YYYY-MM-DD')],
        col2: [{
            title: '序号',
            width: 60,
            render: (h, params) => {
              const _index = (this.pageNumber2 - 1) * 10
              return h('span', params.index + 1 + _index)
            }
          },
          {
            title: '提交时间',
            key: 'createTime',
          },
          {
            title: '品牌',
            key: 'storeCategoryName'
          },
          {
            title: '渠道名称',
            render: (h, params) => {
              return h('p', {
                style: {
                  color: 'orange',
                  cursor: 'pointer'
                },
                on: {
                  click: () => {
                    this.toRecord(params.row.storeID)
                  }
                },
              }, [
                h('Icon', {
                  props: {
                    type: 'podium',
                    size: 16,
                  },
                  style: {
                    marginRight: '5px'
                  }
                }),
                h('span', params.row.storeName)
              ])
            }
          },
          {
            title: '付款金额',
            key: 'amount'
          },
          {
            title: '付款状态',
            render: (h, params) => {
              const _text = params.row.status == 0 ? '待确认' : '支付失败'
              const _color = params.row.status == 0 ? 'blue' : 'red'
              return h('span', {
                style: {
                  color: _color
                }
              }, _text)
            }
          },
          {
            title: '账户名',
            key: 'ownerName'
          },
          {
            title: '开户行',
            key: 'bank'
          },
          {
            title: '银行卡号',
            key: 'cardNo'
          },
          {
            title: '备注',
            key: 'remark'
          },
          {
            title: '提交用户',
            key: 'createUserName'
          },
          {
            title: '操作',
            key: 'action',
            width: 100,
            align: 'center',
            render: (h, params) => {
              if (params.row.status == 0) {
                return h('div', [
                  h('Button', {
                    props: {
                      type: 'error',
                      size: 'small',
                      icon: 'close-round'
                    },
                    on: {
                      click: () => {
                        this.remove(params.row, params.index)
                      }
                    }
                  }, '支付失败'),
                ])
              }
            }
          }
        ],
        data2: [],



        total3: 0,
        totalPages3: 1,
        pageNumber3: 1,
        formSearch3: {
          startTime: moment().startOf('month').format('YYYY-MM-DD'),
          endTime: moment().endOf('month').format('YYYY-MM-DD'),
          storeID: '',
          storeCategoryID: '',
        },
        dateBox3: [moment().startOf('month').format('YYYY-MM-DD'), moment().endOf('month').format('YYYY-MM-DD')],
        col3: [{
            title: '序号',
            width: 60,
            render: (h, params) => {
              const _index = (this.pageNumber3 - 1) * 10
              return h('span', params.index + 1 + _index)
            }
          },
          {
            title: '品牌',
            key: 'storeCategoryName'
          },
          {
            title: '渠道名称',
            render: (h, params) => {
              return h('p', {
                style: {
                  color: 'orange',
                  cursor: 'pointer'
                },
                on: {
                  click: () => {
                    this.toRecord(params.row.storeID)
                  }
                },
              }, [
                h('Icon', {
                  props: {
                    type: 'podium',
                    size: 16,
                  },
                  style: {
                    marginRight: '5px'
                  }
                }),
                h('span', params.row.storeName)
              ])
            }
          },
          {
            title: '付款金额',
            key: 'amount'
          },
          {
            title: '付款状态',
            render: (h, params) => {
              const _text = params.row.status === 1 ? '已支付' : '支付失败'
              const _color = params.row.status === 1 ? 'blue' : 'red'
              return h('span', {
                style: {
                  color: _color
                }
              }, _text)
            }
          },
          {
            title: '账户名',
            key: 'ownerName'
          },
          {
            title: '开户行',
            key: 'bank'
          },
          {
            title: '银行卡号',
            key: 'cardNo'
          },
          {
            title: '备注',
            key: 'remark'
          },
          {
            title: '提交用户',
            key: 'createUserName'
          },
          {
            title: '提交时间',
            key: 'createTime',
          },
        ],
        data3: [],


      }
    },
    computed: {
      selectAll() {
        let _bool = true
        this.data.map(item => {
          if (!item.check) {
            _bool = false
          }
        })
        return _bool
      },
      allNum() {
        let _text = 0
        this.data.map(item => {
          if (item.check) {
            _text += item.amount
          }
        })
        return _text.toFixed(2)
      },
      allCheck() {
        let _text = 0
        this.data.map(item => {
          if (item.check) {
            _text++
          }
        })
        return _text
      },
      allCheck1() {
        let _text = 0
        this.data2.map(item => {
          if (item.status == 0) {
            _text++
          }
        })
        return _text
      },
      allNum1() {
        let _text = 0
        this.data2.map(item => {
          if (item.status == 0) {
            _text += item.amount
          }
        })
        return _text.toFixed(2)
      },
    },
    created() {
      this.getList(1, 10, this.formSearch)
    },
    mounted() {
      this.getList2(1, 10, this.formSearch2)
      this.getList3(1, 10, this.formSearch3)
    },
    methods: {
      // tab1
      getList(pageNumber, pageSize, form) {
        let _vm = this
        form.pageNumber = pageNumber
        form.pageSize = pageSize
        _vm.$store.dispatch('setPageLoading', -1)
        _vm.$http.getPage({
          url: 'guard-webManager/commissionCashier/page.jhtml',
          data: form,
          success: function (res) {
						let _data = res.data.content.content || []
						_vm.data = _data.map(item => {
							item.remark = ''
							item.check = false
							item.storeID = item.id
							item.price = item.amount
							return item
						})
						_vm.total = res.data.content.total || 0
						_vm.totalPages = res.data.content.totalPages || 1
						_vm.pageNumber = res.data.content.pageNumber || 1
						_vm.$store.dispatch('setPageLoading', 1);
          },
          error: function (res) {
            console.log(res)
          }
        })
      },
      setStore(data) {
        this.formSearch.storeID = data.id
      },
      setStoreCategory(data) {
        this.formSearch.categoryID = data.id
      },
      changePage(num) {
        this.getList(num, 10, this.formSearch)
      },
      // tab2
      getList2(pageNumber, pageSize, form) {
        let _vm = this
        form.pageNumber = pageNumber
        form.pageSize = pageSize
        _vm.$http.get({
          url: 'guard-webManager/commissionCashier/unConfirmPage.jhtml',
          data: form,
          success: function (res) {
            if (res.data.code == 0) {
              console.log(res)
              _vm.data2 = res.data.content.content || []
              _vm.total2 = res.data.content.total || 0
              _vm.totalPages2 = res.data.content.totalPages || 1
              _vm.pageNumber2 = res.data.content.pageNumber || 1
            } else {
              console.log(res)
            }
          },
          error: function (res) {
            console.log(res)
          }
        })
      },
      setDate2(date) {
        this.formSearch2.startTime = date[0]
        this.formSearch2.endTime = date[1]
      },
      setStore2(data) {
        this.formSearch2.storeID = data.id
      },
      setStoreCategory2(data) {
        this.formSearch2.storeCategoryID = data.id
      },
      changePage2(num) {
        this.getList2(num, 10, this.formSearch2)
      },
      // tab3
      getList3(pageNumber, pageSize, form) {
        let _vm = this
        form.pageNumber = pageNumber
        form.pageSize = pageSize
        _vm.$http.get({
          url: 'guard-webManager/commissionCashier/confirmPage.jhtml',
          data: form,
          success: function (res) {
            if (res.data.code == 0) {
              console.log(res)
              _vm.data3 = res.data.content.content || []
              _vm.total3 = res.data.content.total || 0
              _vm.totalPages3 = res.data.content.totalPages || 1
              _vm.pageNumber3 = res.data.content.pageNumber || 1
            } else {
              console.log(res)
            }
          },
          error: function (res) {
            console.log(res)
          }
        })
      },
      setDate3(date) {
        this.formSearch3.startTime = date[0]
        this.formSearch3.endTime = date[1]
      },
      setStore3(data) {
        this.formSearch3.storeID = data.id
      },
      setStoreCategory3(data) {
        this.formSearch3.storeCategoryID = data.id
      },
      changePage3(num) {
        this.getList3(num, 10, this.formSearch3)
      },
      toRecord(id) {
        let breadData = [{
            url: '/desktop',
            text: '桌面'
          },
          {
            url: '/commissionCashier',
            text: '佣金付款'
          },
          {
            url: '/storeRecord',
            text: '渠道档案'
          }
        ]
        this.$store.dispatch('setBreadData', breadData)
        sessionStorage.setItem('storeId', id)
        this.$router.push('/storeRecord')
      },
      handleReset(name) {
        this.$refs[name].resetFields()
        if (name == 'formSearch') {
          this.$refs['remoteFilter'].clean()
          this.$refs['remoteStore'].clean()
          this.getList(1, 10, this.formSearch)
        } else if (name == 'formSearch2') {
          this.$refs['remoteStore2'].clean()
          this.$refs['remoteFilter2'].clean()
          this.formSearch2.startTime = moment().startOf('month').format('YYYY-MM-DD')
          this.formSearch2.endTime = moment().endOf('month').format('YYYY-MM-DD')
          this.dateBox2 = [moment().startOf('month').format('YYYY-MM-DD'), moment().endOf('month').format('YYYY-MM-DD')]
          this.getList2(1, 10, this.formSearch2)
        } else {
          this.$refs['remoteStore3'].clean()
          this.$refs['remoteFilter3'].clean()
          this.formSearch3.startTime = moment().startOf('month').format('YYYY-MM-DD')
          this.formSearch3.endTime = moment().endOf('month').format('YYYY-MM-DD')
          this.dateBox3 = [moment().startOf('month').format('YYYY-MM-DD'), moment().endOf('month').format('YYYY-MM-DD')]
          this.getList3(1, 10, this.formSearch3)
        }
      },
      save(type) {
        let _vm = this,
          _index = -1,
          _data = [],
          _url = ''
        if (type === 1) {
          _index = _vm.data.findIndex(item => item.check == true)
          _data = _vm.data.filter(item => item.check == true)
          _url = 'guard-webManager/commissionCashier/addCommission.jhtml'
        } else {
          _data = _vm.data2
          _index = _vm.data2.length === 0 ? -1 : 1
          _url = 'guard-webManager/commissionCashier/updateCommission.jhtml'
        }
        if (_index < 0) {
          _vm.$Notice.error({
            title: '系统提示！',
            desc: '请选择数据！'
          })
        } else {
          _vm.saveLoad = true
          _vm.$http.post({
            url: _url,
            data: {
              detailListStr: JSON.stringify(_data)
            },
            success: function (res) {
              if (res.data.code == 0) {
                _vm.getList(1, 10, _vm.formSearch)
                _vm.getList2(1, 10, _vm.formSearch2)
                if (type === 1) {
                  _vm.$refs.tab.handleChange(1)
                }
                if (type === 2) {
                  _vm.getList3(1, 10, _vm.formSearch3)
                  _vm.$refs.tab.handleChange(2)
                }
                _vm.$Notice.success({
                  title: '系统提示！',
                  desc: '操作成功！'
                })
              } else {
                _vm.$Notice.error({
                  title: '系统提示！',
                  desc: res.data.desc
                })
              }
              _vm.saveLoad = false
            },
            error: function (res) {
              console.log(res)
            }
          })
        }
      },
      remove(data, index) {
        let _vm = this
        _vm.$Modal.confirm({
          title: '系统提示',
          content: `<p>确定支付失败？</p>
                            <p>支付信息：</p>
                            <p>渠道名称：${data.storeName}</p>
                            <p>付款金额：${data.amount}</p>`,
          onOk: () => {
            data.status = -1
            this.data2.splice(index, 1, data)
          },
          onCancel: () => {

          }
        })
      },
    }
  }

</script>

<style scoped>
  .saveBtn {
    margin-top: 30px;
  }

</style>
