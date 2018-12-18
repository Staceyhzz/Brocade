y/** * 科室发料中心 */

<template>
  <div class="container-box">
    <div class="container-header">
      <h2>科室发料中心</h2>
    </div>
    <div class="container-body">
      <Tabs :animated='false'>
        <Tab-pane label="发货请求">
          <Table stripe :columns="col" :data="data"></Table>
        </Tab-pane>
        <Tab-pane label="今日发货记录">
          <Table stripe :columns="col1" :data="data1"></Table>
        </Tab-pane>
      </Tabs>
      <Modal title="发货" v-model="modal" :closable="false" @on-ok="ok" :loading="loading" class-name="vertical-center-modal">
        <Form ref="formValidate" :model="formValidate" :label-width="90" label-position="right" :rules="ruleForm">
          <Form-item label="客户">
            <span>{{formValidate.customerName}} ({{formValidate.customerID}})</span>
          </Form-item>
          <Form-item label="划扣项目">
            <span>{{formValidate.chargeName}}</span>
          </Form-item>
          <Form-item label="划扣时间">
            <span>{{formValidate.operationTime}}</span>
          </Form-item>
          <Form-item label="发货仓库">
            <span>{{formValidate.warehouseName}}</span>
          </Form-item>
          <Form-item label="物品/药品">
            <span>{{formValidate.productName}} (编号：{{formValidate.productid}} 规格：{{formValidate.productSize}})</span>
          </Form-item>
          <Form-item label="请求发货数量">
            <span>{{formValidate.num}}</span>
          </Form-item>
          <Form-item label="当前仓库库存" prop='restNum'>
            <span style='color:red'>{{formValidate.restNum}}</span>
          </Form-item>
        </Form>
      </Modal>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      const validateNum = (rule, value, callback) => {
        if (value < this.formValidate.num) {
          callback(new Error('库存不足，不能发货'));
        } else {
          callback();
        }
      };
      return {
        modal: false,
        loading: true,
        formValidate: {},
        col: [{
            title: '序号',
            type: 'index',
            width: 60
          },
          {
            title: '客户',
            key: 'customerName',
            render: (h, params) => {
              return h('p', {
                on: {
                  click: () => {
                    this.toCusIndex(params.row.customerID, params.row.customerName)
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
                h('span', params.row.customerName + '(' + params.row.customerID + ')')
              ])
            }
          },
          {
            title: '划扣项目',
            key: 'chargeName'
          },
          {
            title: '划扣时间',
            key: 'operationTime'
          },
          {
            title: '发货仓库',
            key: 'warehouseName'
          },
          {
            title: '编号',
            key: 'productid'
          },
          {
            title: '名称',
            key: 'productName'
          },
          {
            title: '规格',
            key: 'productSize'
          },
          {
            title: '单位',
            key: 'productUnitName'
          },
          {
            title: '数量',
            key: 'num'
          },
          {
            title: '发货',
            key: 'action',
            width: 100,
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
                      this.edit(params.row)
                    }
                  }
                }, '发货'),
              ])
            }
          }
        ],
        col1: [{
            title: '序号',
            type: 'index',
            width: 60
          },
          {
            title: '操作时间',
            key: 'createDate',
            render: (h, params) => {
              const _text = moment(params.row.createDate).format('YYYY-MM-DD')
              return h('span', _text)
            }
          },
          {
            title: '客户',
            key: 'customerName',
            render: (h, params) => {
              return h('p', {
                on: {
                  click: () => {
                    this.toCusIndex(params.row.customerID, params.row.customerName)
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
                h('span', params.row.customerName + '(' + params.row.customerID + ')')
              ])
            }
          },
          {
            title: '仓库',
            key: 'warehouseName'
          },
          {
            title: '编号',
            key: 'productID'
          },
          {
            title: '名称',
            key: 'productName'
          },
          {
            title: '规格',
            key: 'productSize'
          },
          {
            title: '数量',
            key: 'num'
          },
          {
            title: '操作人员',
            key: 'createUserName'
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
                    type: 'error',
                    size: 'small',
                    icon: 'ios-trash-outline'
                  },
                  on: {
                    click: () => {
                      this.remove(params.row.stockOutID)
                    }
                  }
                }, '删除'),
              ])
            }
          }
        ],
        data: [],
        data1: [],
        ruleForm: {
          restNum: [{
            validator: validateNum,
            trigger: 'blur'
          }],
        }
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        let _vm = this
        _vm.$store.dispatch('setPageLoading', -1)
        _vm.$http.getPage({
          url: 'guard-webManager/deptStockOutDesk/list.jhtml',
          success: function (res) {
						_vm.data = res.data.content.ProductList
						_vm.data1 = res.data.content.DetailList
						_vm.$store.dispatch('setPageLoading', 1);
          },
          error: function (res) {
            console.log(res);
          }
        });
      },
      //发货
      edit(data) {
        this.$refs['formValidate'].resetFields();
        this.formValidate = data
        this.formValidate['restNum'] = data.warehouseRestNum
        this.modal = true
      },
      //删除
      remove(id) {
        let _vm = this;
        _vm.$Modal.confirm({
          title: '系统提示',
          content: '确定删除此发货记录？',
          onOk: () => {
            _vm.$http.post({
              url: 'guard-webManager/deptStockOutDesk/deleteStockOut.jhtml',
              data: {
                id: id
              },
              success: function (res) {
                if (res.data.code == 0) {
                  _vm.getList()
                  _vm.$Notice.success({
                    title: '系统提示！',
                    desc: '删除成功！'
                  });
                } else {
                  _vm.$Notice.error({
                    title: '系统提示！',
                    desc: res.data.desc
                  });
                }
              },
              error: function (res) {
                console.log(res);
              }
            });
          },
          onCancel: () => {

          }
        });
      },
      ok() {
        let _vm = this
        _vm.$refs['formValidate'].validate((valid) => {
          if (valid) {
            _vm.$http.post({
              url: 'guard-webManager/deptStockOutDesk/addSingle.jhtml',
              data: _vm.formValidate,
              success: function (res) {
                if (res.data.code == 0) {
                  _vm.getList()
                  _vm.$refs['formValidate'].resetFields();
                  _vm.modal = false;
                  _vm.$Notice.success({
                    title: '系统提示！',
                    desc: '保存成功！'
                  });
                } else {
                  _vm.$Notice.error({
                    title: '系统提示！',
                    desc: res.data.desc
                  });
                  _vm.loading = false;
                  _vm.$nextTick(() => {
                    _vm.loading = true;
                  });
                }
              },
              error: function (res) {
                console.log(res);
              }
            });
          } else {
            _vm.loading = false;
            _vm.$nextTick(() => {
              _vm.loading = true;
            });
          }
        })
      },
      //跳转客户详情
      toCusIndex(id, name) {
        var breadData = [{
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
        sessionStorage.setItem("cusName", name)
        sessionStorage.setItem("cusId", id)
        this.$store.dispatch('setBreadData', breadData);
        this.$router.push({
          path: '/customerIndex',
          query: {
            id: id
          }
        })
      },
    }
  }

</script>
