/** * 销售回款 */
<template>
  <div class="container-box">
    <div class="container-header">
      <h2>销售回款</h2>
      <ul class="header-btn-group">
        <li class="header-item" @click="add">
          <Icon type="plus-round"></Icon>增加</li>
      </ul>
    </div>
    <div class="container-body">
      <Form :label-width="60" inline ref='formSearch' :model='formSearch'>
        <Form-item label="回款日期" prop="updateTime">
          <Date-picker :transfer='true' type="daterange" placeholder="请选择日期" style="width: 200px" :value="formValidate.updateTime" @on-change='setTime'
            ref='createDate'></Date-picker>
        </Form-item>
        <Form-item label="渠道编号" prop="storeid">
          <cmptStoreChoose _placeHolder="选择渠道" :_style="{width:'168px'}" :_storeName="storeName" v-on:setStoreName="setStore"></cmptStoreChoose>
        </Form-item>
        <Form-item label="渠道名称" prop="name">
          <Input type="text" placeholder="请输入渠道名称" :maxlength='15' v-model.trim="formSearch.name" @on-enter="getList('1','10',formSearch.storeid, formSearch.name)"></Input>
        </Form-item>
        <ul class="header-btn-group not-float">
          <li class="header-item" @click="getList('1','10',formSearch.storeid, formSearch.name)">
            <Icon type="search"></Icon>查询</li>
          <li class="header-item" @click="handleReset('formSearch')">
            <Icon type="refresh"></Icon>重置</li>
        </ul>
      </Form>
      <Table stripe :columns="columns" :data="data"></Table>
      <div class="table-page">
        <div class="table-info">当前第{{pageNumber}}页，共{{totalPages}}页，总共{{total}}条记录</div>
        <Page class="table-paginate" :total="total" @on-change='changePage' :current='pageNumber'></Page>
      </div>
      <Modal title="修改销售回款" v-model="modalEdit" :closable="false" @on-ok="ok" :loading="loading" class-name="vertical-center-modal">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100" label-position="right">
          <Form-item label="渠道" prop="storeName">
            {{formValidate.storeName}}
          </Form-item>
          <Form-item label="回款日期" prop='date'>
            <Date-picker :transfer='true' width="180" type="date" placeholder="请选择日期" :value='time' @on-change='getDate'></Date-picker>
          </Form-item>
          <Form-item label="回款金额" prop="amount">
            <Input v-model="formValidate.amount" placeholder="请输入排序号"></Input>
          </Form-item>
          <Form-item label="备注" prop="remark">
            <Input v-model="formValidate.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入描述"></Input>
          </Form-item>
        </Form>
      </Modal>
    </div>
  </div>
</template>

<script>
  import cmptStoreChoose from 'components/storeChoose.vue'
  export default {
    components: {
      cmptStoreChoose
    },
    data() {
      const validateDate = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请选择回款日期'));
        } else {
          callback();
        }
      }
      const validateAmount = (rule, value, callback) => {
        if (value === '') {
          console.log(value)
          callback(new Error('请选择回款金额'));
        } else {
          callback();
        }
      }
      return {
        total: 0,
        totalPages: 1,
        pageNumber: 1,
        columns: [{
            title: '序号',
            width: 60,
            render: (h, params) => {
              const _index = (this.pageNumber - 1) * 10
              return h('span', params.index + 1 + _index)
            }
          },
          {
            title: '渠道',
            key: 'storeName'
          },
          {
            title: '回款日期',
            render: (h, params) => {
              let _text = ''
              if (params.row.createDate) {
                _text = params.row.createDate.split(' ')[0]
              }
              return h('span', _text)
            }
          },
          {
            title: '金额',
            key: 'amount'
          },
          {
            title: '提交用户',
            key: 'createUserName'
          },
          {
            title: '提交时间',
            key: 'createTime'
          },
          {
            title: '备注',
            key: 'remark'
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
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.edit(params.row)
                    }
                  }
                }, '编辑'),
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
                }, '删除'),
              ])
            }
          }
        ],
        data: [],
        modalEdit: false,
        loading: true,
        formSearch: {
          name: '',
          storeid: '',
          startTime: '',
          endTime: ''
        },
        storeName: '',
        time: '',
        formValidate: {
          storeid: '',
          storeName: '',
          date: '',
          amount: '',
          remark: ''
        },
        ruleValidate: {
          date: [{
            required: true,
            validator: validateDate,
            trigger: 'change'
          }],
          amount: [{
            required: true,
            validator: validateAmount,
            trigger: 'blur'
          }]
        }
      }
    },
    created() {
      this.getList('1', '10', this.formSearch.storeid, this.formSearch.name)
    },
    methods: {
      getDate(date) {
        this.formValidate.date = date
      },
      setStore(data) {
        this.storeName = data.name
        this.formSearch.storeid = data.id
      },
      getList(pageNumber, pageSize, storeid, name) {
        var _this = this
        _this.$store.dispatch('setPageLoading', -1)
        if (name.length == 0) {
          name = null
        }
        _this.$http.getPage({
          url: 'guard-webManager/saleBack/index.jhtml',
          data: {
            pageNumber: pageNumber,
            pageSize: pageSize,
            name: name,
            storeId: storeid,
            startTime: _this.formSearch.startTime,
            endTime: _this.formSearch.endTime
          },
          success: function (res) {
						_this.data = res.data.content.content
						console.log(_this.data)
						_this.total = res.data.content.total
						_this.pageNumber = res.data.content.pageNumber
						_this.totalPages = res.data.content.totalPages
						console.log(res)
						_this.$store.dispatch('setPageLoading', 1);
          },
          error: function (res) {
            console.log(res);
          }
        });
      },
      add: function () {
        var breadData = [{
            url: '/desktop',
            text: '桌面'
          },
          {
            url: '/saleBack',
            text: '销售回款'
          },
          {
            url: '/addSaleBack',
            text: '添加回款'
          }
        ];
        this.$store.dispatch('setBreadData', breadData);
        this.$router.push({
          path: 'addSaleBack'
        })
      },
      edit: function (data) {
        console.log(data)
        let arr = data.createDate.split(' ')
        console.log(arr)
        console.log(arr[0])
        this.formValidate.id = data.id
        this.formValidate.storeName = data.storeName
        this.formValidate.date = arr[0]
        this.time = arr[0]
        this.formValidate.amount = data.amount
        this.formValidate.remark = data.remark
        this.modalEdit = true
      },
      remove: function (data) {
        var _this = this;
        _this.$Modal.confirm({
          title: '系统提示',
          content: '确定删除' + data.name + '?',
          onOk: () => {
            _this.$http.post({
              url: 'guard-webManager/saleBack/del.jhtml',
              data: {
                id: data.id
              },
              success: function (res) {
                if (res.data.code == 0) {
                  _this.getList('1', '10', _this.formSearch.storeid, _this.formSearch.name)
                  _this.$Notice.success({
                    title: '系统提示！',
                    desc: '删除成功！'
                  });
                } else {
                  _this.$Notice.error({
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
        let _this = this
        _this.$refs['formValidate'].validate((valid) => {
          if (valid) {
            _this.$http.post({
              url: 'guard-webManager/saleBack/edit.jhtml',
              data: {
                id: _this.formValidate.id,
                createDate: _this.formValidate.date,
                amount: _this.formValidate.amount,
                remark: _this.formValidate.remark
              },
              success: function (res) {
                if (res.data.code == 0) {
                  _this.getList('1', '10', _this.formSearch.storeid, _this.formSearch.name)
                  _this.$refs['formValidate'].resetFields();
                  _this.modalEdit = false
                  _this.$Notice.success({
                    title: '系统提示！',
                    desc: '操作成功！'
                  })
                } else {
                  _this.$Notice.error({
                    title: '系统提示！',
                    desc: res.data.desc
                  });
                  _this.loading = false;
                  _this.$nextTick(() => {
                    _this.loading = true;
                  });
                }
              },
              error: function (res) {
                console.log(res)
              }
            })
          } else {
            _this.loading = false;
            _this.$nextTick(() => {
              _this.loading = true
            })
          }
        })
      },
      setTime(date) {
        this.formSearch.startTime = date[0]
        this.formSearch.endTime = date[1]
      },
      changePage(num) {
        this.getList(num, '10', this.formSearch.deptId, this.formSearch.name)
      },
      handleReset(name) {
        this.formSearch.name = ''
        this.formSearch.storeid = ''
        this.formSearch.endTime = ''
        this.formSearch.startTime = ''
        this.storeName = ''
        this.$refs['createDate'].handleClear()
        this.getList(1, '10', this.formSearch.deptId, this.formSearch.name)
      }
    }
  }

</script>
