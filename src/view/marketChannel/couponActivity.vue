/** * 券活动管理 */
<template>
  <div class="container-box">
    <div class="container-header">
      <h2>券活动管理</h2>
      <ul class="header-btn-group">
        <li class="header-item" @click="add">
          <Icon type="plus-round"></Icon>增加</li>
      </ul>
    </div>
    <div class="container-body">
      <Form :label-width="80" inline ref='formSearch' :model='formSearch'>
        <Form-item label="发放日期" prop='startTime'>
          <Date-picker :transfer='true' type="daterange" placeholder="请选择日期" style="width: 200px" @on-change='setTime' ref='cleanDate'></Date-picker>
        </Form-item>
        <Form-item label="名称" prop="name">
          <Input type="text" :maxlength='20' v-model.trim="formSearch.name" placeholder="请输入名称" @on-enter="getList('1', '10', formSearch.name)"></Input>
        </Form-item>
        <ul class="header-btn-group not-float">
          <li class="header-item" @click="getList('1', '10', formSearch.name)">
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
      <Modal :title="modalTit" v-model="modalEdit" :closable="false" @on-ok="ok" :loading="loading" class-name="vertical-center-modal">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80" label-position="right">
          <Form-item label="名称" prop="name" required>
            <Input v-model.trim="formValidate.name" placeholder="请输入名称" :maxlength='20'></Input>
          </Form-item>
          <Form-item label="劵类型" prop="categoryId" required>
            <Select v-model="formValidate.categoryId" placeholder="请选择审核状态" clearable>
              <Option v-for="item in categoryList" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
          </Form-item>
          <Form-item label="券金额" prop="amount" required>
            <cmptInputNumber :min="0" :max='1000000' v-model="formValidate.amount" style="width: 408px"></cmptInputNumber>
          </Form-item>
          <Form-item label="销售价" prop="price" required>
            <cmptInputNumber :min="0" :max='1000000' v-model="formValidate.price" style="width: 408px"></cmptInputNumber>
          </Form-item>
          <Form-item label="来源" prop="channel" required>
            <Input v-model.trim="formValidate.channel" placeholder="请输入来源" :maxlength='20'></Input>
          </Form-item>
          <Form-item label="发放日期" prop="createDate" required>
            <Date-picker :transfer='true' type="date" placeholder="请选择发放日期" :value="formValidate.createDate" @on-change='createDate' ref="createDate"></Date-picker>
          </Form-item>
          <Form-item label="失效日期" prop="expiration" required>
            <Date-picker :transfer='true' type="date" placeholder="请选择生效日期" :value="formValidate.expiration" @on-change='expiration' ref="expiration"></Date-picker>
          </Form-item>
          <Form-item label="备注" prop="remark">
            <Input v-model.trim="formValidate.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入备注"></Input>
          </Form-item>
        </Form>
      </Modal>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      const validateName = (rule, value, callback) => {
        if (value == '') {
          callback(new Error('请选择'))
        } else {
          callback()
        }
      }
      const validateChannel = (rule, value, callback) => {
        if (value == '') {
          callback(new Error('请选择劵类型'))
        } else {
          callback()
        }
      }
      const validateCateId = (rule, value, callback) => {
        if (value == '') {
          callback(new Error('请选择劵类型'))
        } else {
          callback()
        }
      }
      const validateDate = (rule, value, callback) => {
        if (value == '') {
          callback(new Error('请选择日期'))
        } else {
          callback()
        }
      }
      return {
        modalTit: '',
        total: 0,
        totalPages: 1,
        pageNumber: 1,
        columns: [{
            title: '序号',
            type: 'index',
            width: 60
          },
          {
            title: '名称',
            key: 'name'
          },
          {
            title: '券类型',
            key: 'categoryName'
          },
          {
            title: '券金额	',
            key: 'amount'
          },
          {
            title: '价格',
            key: 'price'
          },
          {
            title: '发放来源',
            key: 'channel'
          },
          {
            title: '发放日期',
            key: 'createdate',
            render: (h, params) => {
              const _text = moment(params.row.createdate).format('YYYY-MM-DD')
              return h('span', _text)
            }
          },
          {
            title: '失效日期',
            key: 'expiration',
            render: (h, params) => {
              const _text = moment(params.row.expiration).format('YYYY-MM-DD')
              return h('span', _text)
            }
          },
          {
            title: '备注',
            key: 'remark'
          },
          {
            title: '操作',
            key: 'action',
            width: 220,
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
                }, '编辑'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small',
                    icon: 'ios-trash-outline'
                  },
                  style: {
                    marginRight: '2px'
                  },
                  on: {
                    click: () => {
                      this.remove(params.row)
                    }
                  }
                }, '删除'),
                h('Button', {
                  props: {
                    type: 'info',
                    size: 'small',
                    icon: 'wrench'
                  },
                  on: {
                    click: () => {
                      this.toPower(params.row)
                    }
                  }
                }, '管理活动'),
              ])
            }
          }
        ],
        data: [],
        formSearch: {
          name: '',
          startTime: '',
          endTime: ''
        },
        modalEdit: false,
        loading: true,
        seen: true,
        formValidate: {
          id: '',
          name: '',
          categoryId: '',
          amount: 0,
          price: 0,
          channel: '',
          createDate: '',
          expiration: '',
          remark: ''
        },
        ruleValidate: {
          name: [{
            validator: validateName,
            trigger: 'blur'
          }],
          categoryId: [{
            validator: validateCateId,
            trigger: 'change'
          }],
          channel: [{
            validator: validateChannel,
            trigger: 'change'
          }],
          createDate: [{
            validator: validateDate,
            trigger: 'change'
          }],
          expiration: [{
            validator: validateDate,
            trigger: 'change'
          }]

        }
      }
    },
    computed: {
      categoryList: function () {
        return this.$store.getters.getSelectCouponCateList
      }
    },
    created() {
      this.getList('1', '10', this.formSearch.name)
    },
    mounted() {
      this.$store.dispatch('setSelectCouponCateList')
    },
    methods: {
      getList(pageNumber, pageSize, name) {
        var _vm = this;
        _vm.$store.dispatch('setPageLoading', -1)
        if (name.length == 0) {
          name = null
        }
        _vm.$http.getPage({
          url: 'guard-webManager/couponActivity/page.jhtml',
          data: {
            pageNumber: pageNumber,
            pageSize: pageSize,
            name: name,
            startTime: this.formSearch.startTime,
            endTime: this.formSearch.endTime
          },
          success: function (res) {
            console.log(res)
						_vm.data = res.data.content.content
						_vm.total = res.data.content.total
						_vm.pageNumber = res.data.content.pageNumber
						_vm.totalPages = res.data.content.totalPages
						console.log(res)
						_vm.$store.dispatch('setPageLoading', 1);
          },
          error: function (res) {
            console.log(res);
          }
        });
      },
      setTime(date) {
        this.formSearch.startTime = date[0]
        this.formSearch.endTime = date[1]
      },
      //时间获取
      createDate(date) {
        this.formValidate.createDate = date
      },
      expiration(date) {
        this.formValidate.expiration = date
      },
      add: function () {
        var _vm = this
        _vm.modalTit = '添加券活动管理'
        _vm.$refs['formValidate'].resetFields();
        _vm.seen = false
        _vm.modalEdit = true
      },
      edit: function (data) {
        var _vm = this
        _vm.modalTit = '修改券活动管理'
        _vm.$refs['formValidate'].resetFields();
        _vm.formValidate.name = data.name
        _vm.formValidate.id = data.id
        _vm.formValidate.categoryId = data.categoryid
        _vm.formValidate.amount = data.amount
        _vm.formValidate.price = data.price
        _vm.formValidate.channel = data.channel
        _vm.formValidate.createDate = data.createdate
        _vm.formValidate.expiration = data.expiration
        _vm.formValidate.remark = data.remark
        this.modalEdit = true
        _vm.seen = true
      },
      remove(data) {
        let _vm = this
        _vm.$Modal.confirm({
          title: '系统提示',
          content: `<p>确定删除券活动？</p>
                            <p>券活动信息：</p>
                            <p>名称：${data.name}</p>`,
          onOk: () => {
            _vm.$http.post({
              url: 'guard-webManager/couponActivity/del.jhtml',
              data: {
                id: data.id
              },
              success: function (res) {
                if (res.data.code == 0) {
                  _vm.getList('1', '10', _vm.formSearch.name)
                  _this.$refs['formValidate'].resetFields()
                  _this.modalEdit = false
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
        let _vm = this,
          _url = ''
        _vm.$refs['formValidate'].validate((valid) => {
          if (valid) {
            if (_vm.seen) {
              _url = 'guard-webManager/couponActivity/edit.jhtml'
            } else {
              _url = 'guard-webManager/couponActivity/add.jhtml'
            }
            _vm.$http.post({
              url: _url,
              data: _vm.formValidate,
              success: function (res) {
                if (res.data.code == 0) {
                  _vm.getList('1', '10', _vm.formSearch.name)
                  _vm.$refs['formValidate'].resetFields();
                  _vm.modalEdit = false;
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
      changePage(num) {
        this.getList(num, '10', this.formSearch.name)
      },
      handleReset(name) {
        this.$refs[name].resetFields()
        this.$refs.cleanDate.handleClear()
        this.getList(1, '10', this.formSearch.name)
      },
      toPower(data) {
        let breadData = [{
            url: '/desktop',
            text: '桌面'
          },
          {
            url: '/couponActivity',
            text: '券活动'
          },
          {
            url: '/couponActivityRecord',
            text: data.name
          }
        ];
        this.$store.dispatch('setBreadData', breadData);
        this.$router.push({
          path: '/couponActivityRecord',
          query: {
            id: data.id,
            name: data.name,
          }
        })
      }
    }
  }

</script>
