/** * 佣金确认 */
<template>
  <div class="container-box">
    <div class="container-header">
      <h2>佣金确认</h2>
    </div>
    <div class="container-body">
      <Tabs value="name1" :animated='false'>
        <Tab-pane label="待确认" name="name1">
          <Form :label-width="60" inline ref='formSearch' :model='formSearch' :rules="ruleForm">
            <Form-item label="客户姓名" prop='customerName'>
              <Input v-model.trim="formSearch.customerName" placeholder="请输入客户姓名" @on-enter="getList(1, 10, formSearch)" :maxlength='20'></Input>
            </Form-item>
            <Form-item label="项目单号" prop='orderID'>
              <Input v-model.trim="formSearch.orderID" placeholder="请输入项目单号" @on-enter="getList(1, 10, formSearch)" :maxlength='15'></Input>
            </Form-item>
            <Form-item label="收银日期" prop='startTime'>
              <Date-picker :transfer='true' type="daterange" placement="bottom-start" placeholder="选择日期" :clearable="false" style="width: 180px" @on-change='setDate'
                :value='dateBox1'></Date-picker>
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
              <Col span="4">项目单：{{orderNum}}</Col>
              <Col span="4">退项目单：{{backNum}}</Col>
              <Col span="4">还款单：{{returnNum}}</Col>
              <Col span="4">应付总额：{{allNum}}</Col>
              <Col span="4">
              <Button type="primary" icon="plus-round" long @click='save' :loading='saveLoad'>确认佣金</Button>
              </Col>
            </Row>
          </div>
        </Tab-pane>
        <Tab-pane label="已确认" name="name2">
          <Form :label-width="60" inline ref='formSearch2' :model='formSearch2' :rules="ruleForm">
            <Form-item label="客户姓名" prop='customerName'>
              <Input v-model.trim="formSearch2.customerName" placeholder="请输入客户姓名" @on-enter="getList2(1, 10, formSearch2)" :maxlength='20'></Input>
            </Form-item>
            <Form-item label="项目单号" prop='orderID'>
              <Input v-model.trim="formSearch2.orderID" placeholder="请输入项目单号" @on-enter="getList2(1, 10, formSearch2)" :maxlength='20'></Input>
            </Form-item>
            <Form-item label="收银日期" prop='startTime'>
              <Date-picker :transfer='true' type="daterange" placement="bottom-start" placeholder="选择日期" :clearable="false" style="width: 180px" @on-change='setDate2'
                :value='dateBox2'></Date-picker>
            </Form-item>
            <Form-item label="渠道" prop='storeID'>
              <cmptRemoteFilterStore _placeHolder="选择渠道" @setStoreName="setStore2" ref='remoteStore2'></cmptRemoteFilterStore>
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
        </Tab-pane>
      </Tabs>
    </div>
    <Modal title="修改佣金" v-model="modal" :closable="false" @on-ok="ok" :loading="loading" class-name="vertical-center-modal">
      <Form ref="formValidate" :model="formValidate" :label-width="100" label-position="right">
        <Form-item label="佣金金额" prop="amount">
          <cmptInputNumber :max="1000000" :min="-1000000" v-model="formValidate.amount" @on-change='setAmount' style='width:300px'></cmptInputNumber>
        </Form-item>
      </Form>
    </Modal>
  </div>
</template>

<script>
  export default {
    data() {
      const validateId = (rule, value, callback) => {
        if ((/[^\d]/g).test(value)) {
          callback(new Error('请输入数字'))
        } else {
          callback()
        }
      }
      return {
        total: 0,
        totalPages: 1,
        pageNumber: 1,
        saveLoad: false,
        formSearch: {
          startTime: moment().format('YYYY-MM-DD'),
          endTime: moment().format('YYYY-MM-DD'),
          orderID: '',
          customerName: '',
          storeID: '',
        },
        dateBox1: [moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')],
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
            title: '客户',
            render: (h, params) => {
              return h('p', {
                on: {
                  click: () => {
                    this.toCus(params.row.customerName, params.row.customerID)
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
                h('span', params.row.customerName)
              ])
            }
          },
          {
            title: '类型',
            render: (h, params) => {
              let _type = this.orderType.filter(item => item.id == params.row.orderType),
                _text = _type[0].name
              return h('span', _text)
            }
          },
          {
            title: '项目单号',
            key: 'orderID'
          },
          {
            title: '项目名称',
            key: 'chargeName'
          },
          {
            title: '收银日期',
            key: 'createTime',
            sortable: true
          },
          {
            title: '券支付',
            key: 'couponAmount'
          },
          {
            title: '余额支付',
            key: 'depositAmount'
          },
          {
            title: '实收金额',
            render: (h, params) => {
              const _text = params.row.cardAmount + params.row.cashAmount
              return h('span', _text)
            }
          },
          {
            title: '抽成比例',
            render: (h, params) => {
              return h('span', params.row.rate + '%')
            }
          },
          {
            title: '佣金',
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
                    this.data[params.index] = params.row;
                  },
                  'on-blur': () => {
                    this.data.splice(params.index, 1, this.data[params.index]);
                  }
                }
              })
            }
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
            title: '分类',
            key: 'storeCategoryName'
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



        modal: false,
        loading: true,
        formValidate: {
          id: '',
          amount: 0,
        },
        total2: 0,
        totalPages2: 1,
        pageNumber2: 1,
        formSearch2: {
          startTime: moment().format('YYYY-MM-DD'),
          endTime: moment().format('YYYY-MM-DD'),
          orderID: '',
          customerName: '',
          storeID: '',
        },
        dateBox2: [moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')],
        col2: [{
            title: '客户',
            render: (h, params) => {
              return h('p', {
                on: {
                  click: () => {
                    this.toCus(params.row.customerName, params.row.customerID)
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
                h('span', params.row.customerName)
              ])
            }
          },
          {
            title: '类型',
            render: (h, params) => {
              let _type = this.orderType.filter(item => item.id == params.row.orderType),
                _text = _type[0].name
              return h('span', _text)
            }
          },
          {
            title: '项目单号',
            key: 'orderID'
          },
          {
            title: '项目名称',
            key: 'chargeName'
          },
          {
            title: '收银日期',
            key: 'createTime',
            sortable: true
          },
          {
            title: '券支付',
            key: 'couponAmount'
          },
          {
            title: '余额支付',
            key: 'depositAmount'
          },
          {
            title: '实收金额',
            render: (h, params) => {
              const _text = params.row.cardAmount + params.row.cashAmount
              return h('span', _text)
            }
          },
          {
            title: '抽成比例',
            render: (h, params) => {
              return h('span', params.row.rate + '%')
            }
          },
          {
            title: '佣金',
            key: 'confirmAmount'
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
            title: '分类',
            key: 'storeCategoryName'
          },
          {
            title: '备注',
            key: 'remark'
          },
          {
            title: '确认人',
            key: 'confirmUserName'
          },
          {
            title: '确认日期',
            key: 'confirmDate',
            sortable: true
          },
          {
            title: '操作',
            key: 'action',
            width: 180,
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
                    marginRight: '2px'
                  },
                  on: {
                    click: () => {
                      this.edit(params.row)
                    }
                  }
                }, '修改佣金'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small',
                    icon: 'ios-trash-outline'
                  },
                  on: {
                    click: () => {
                      this.remove(params.row)
                    }
                  }
                }, '撤回'),
              ])
            }
          }
        ],
        data2: [],
        ruleForm: {
          orderID: [{
            validator: validateId,
            trigger: 'blur'
          }],
        }
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
      orderNum() {
        let _text = 0
        this.data.map(item => {
          if (item.check && item.orderType === 1) {
            _text += item.amount
          }
        })
        return _text.toFixed(2)
      },
      backNum() {
        let _text = 0
        this.data.map(item => {
          if (item.check && item.orderType === 4) {
            _text += item.amount
          }
        })
        return _text.toFixed(2)
      },
      returnNum() {
        let _text = 0
        this.data.map(item => {
          if (item.check && item.orderType === 10) {
            _text += item.amount
          }
        })
        return _text.toFixed(2)
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
    },
    mounted() {
      this.getList(1, 10, this.formSearch)
      this.getList2(1, 10, this.formSearch2)
    },
    methods: {
      // tab1
      getList(pageNumber, pageSize, form) {
        let _vm = this
        _vm.$refs['formSearch'].validate((valid) => {
          if (valid) {
            form.pageNumber = pageNumber
            form.pageSize = pageSize
            _vm.$store.dispatch('setPageLoading', -1)
            _vm.$http.getPage({
              url: 'guard-webManager/commissionDesk/page.jhtml',
              data: form,
              success: function (res) {
								let _data = res.data.content.content || []
								_vm.data = _data.map(item => {
									item.remark = ''
									item.check = false
									item.amount = parseFloat(((item.cardAmount + item.cashAmount) * item.rate / 100).toFixed(
										2))
									item.createTime = item.createTime.split(' ')[0]
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
          }
        })
      },
      setDate(date) {
        this.formSearch.startTime = date[0]
        this.formSearch.endTime = date[1]
      },
      setStore(data) {
        this.formSearch.storeID = data.id
      },
      changePage(num) {
        this.getList(num, 10, this.formSearch)
      },
      // tab2
      getList2(pageNumber, pageSize, form) {
        let _vm = this
        _vm.$refs['formSearch2'].validate((valid) => {
          if (valid) {
            form.pageNumber = pageNumber
            form.pageSize = pageSize
            _vm.$http.get({
              url: 'guard-webManager/commissionDesk/confirmPage.jhtml',
              data: form,
              success: function (res) {
                if (res.data.code == 0) {
                  console.log(res)
                  let _data = res.data.content.content || []
                  _vm.data2 = _data.map(item => {
                    item.createTime = item.createTime.split(' ')[0]
                    item.confirmDate = item.confirmDate.split(' ')[0]
                    return item
                  })
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
      changePage2(num) {
        this.getList2(num, 10, this.formSearch2)
      },
      edit(data) {
        this.formValidate.id = data.commissionID
        this.formValidate.amount = data.confirmAmount
        this.modal = true
      },
      setAmount(val) {
        this.$nextTick(() => {
          this.formValidate.amount = parseFloat(val.toFixed(2))
        })
      },
      handleReset(name) {
        this.$refs[name].resetFields()
        if (name == 'formSearch') {
          this.$refs['remoteStore'].clean()
          this.formSearch.startTime = moment().format('YYYY-MM-DD')
          this.formSearch.endTime = moment().format('YYYY-MM-DD')
          this.dateBox1 = [moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')]
          this.getList(1, 10, this.formSearch)
        } else {
          this.$refs['remoteStore2'].clean()
          this.formSearch2.startTime = moment().format('YYYY-MM-DD')
          this.formSearch2.endTime = moment().format('YYYY-MM-DD')
          this.dateBox2 = [moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')]
          this.getList2(1, 10, this.formSearch2)
        }
      },
      toCus(name, id) {
        let breadData = [{
            url: '/desktop',
            text: '桌面'
          },
          {
            url: '/customer',
            text: '客户管理'
          },
          {
            url: '/customerIndex',
            text: name
          }
        ]
        this.$store.dispatch('setBreadData', breadData);
        this.$router.push({
          path: '/customerIndex',
          query: {
            id: id
          }
        })
        sessionStorage.setItem('cusId', id)
        sessionStorage.setItem('cusName', name)
      },
      toRecord(id) {
        let breadData = [{
            url: '/desktop',
            text: '桌面'
          },
          {
            url: '/commissionDesk',
            text: '佣金确认'
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
      save() {
        let _vm = this,
          _index = _vm.data.findIndex(item => item.check == true),
          _data = _vm.data.filter(item => item.check == true)
        if (_index < 0) {
          _vm.$Notice.error({
            title: '系统提示！',
            desc: '请选择数据！'
          })
        } else {
          _vm.saveLoad = true
          _vm.$http.post({
            url: 'guard-webManager/commissionDesk/addCommission.jhtml',
            data: {
              detailListStr: JSON.stringify(_data)
            },
            success: function (res) {
              if (res.data.code == 0) {
                _vm.getList(1, 10, _vm.formSearch)
                _vm.getList2(1, 10, _vm.formSearch2)
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
      remove(data) {
        let _vm = this
        _vm.$Modal.confirm({
          title: '系统提示',
          content: `<p>确定撤回？</p>
                            <p>佣金信息：</p>
                            <p>客户名称：${data.customerName}</p>
                            <p>客户名称：${data.chargeName}</p>
                            <p>佣金：${data.confirmAmount}</p>`,
          onOk: () => {
            _vm.$http.post({
              url: 'guard-webManager/commissionDesk/deleteCommission.jhtml',
              data: {
                id: data.commissionID
              },
              success: function (res) {
                if (res.data.code == 0) {
                  _vm.getList(1, 10, _vm.formSearch)
                  _vm.getList2(1, 10, _vm.formSearch2)
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
              },
              error: function (res) {
                console.log(res)
              }
            })
          },
          onCancel: () => {

          }
        })
      },
      ok() {
        let _vm = this
        _vm.$http.post({
          url: 'guard-webManager/commissionDesk/updateCommission.jhtml',
          data: _vm.formValidate,
          success: function (res) {
            if (res.data.code == 0) {
              _vm.getList2(1, 10, _vm.formSearch2)
              _vm.modal = false
              _vm.$Notice.success({
                title: '系统提示！',
                desc: '保存成功！'
              })
            } else {
              _vm.$Notice.error({
                title: '系统提示！',
                desc: res.data.desc
              })
              _vm.loading = false
              _vm.$nextTick(() => {
                _vm.loading = true
              })
            }
          },
          error: function (res) {
            console.log(res)
          }
        })
      }
    }
  }

</script>

<style scoped>
  .saveBtn {
    margin-top: 20px;
  }

  .table-page {
    padding-bottom: 130px;
  }

</style>
