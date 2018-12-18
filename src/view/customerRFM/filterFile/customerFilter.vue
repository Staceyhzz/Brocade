/** 
 * 客户选择器 
 */

<template>
  <div class="container-box" ref="containerBox">
    <div class="container-header">
      <h2>客户结果集</h2>
      <ul class="header-btn-group">
        <li class="header-item" @click="add">
          <Icon type="plus-round"></Icon>增加</li>
        <li class="header-item" @click="toMerge">
          <Icon type="social-buffer"></Icon>
          </Icon>合并</li>
        <li class="header-item">
          <Dropdown style="margin-left: 20px" @on-click='toSearch'>
            <a href="javascript:void(0)" class="header-item-drow">
              添加查询
              <Icon type="arrow-down-b"></Icon>
            </a>
            <Dropdown-menu slot="list">
              <Dropdown-item :name='1'>基本条件查询</Dropdown-item>
              <Dropdown-item :name='2'>账户条件查询</Dropdown-item>
              <Dropdown-item :name='3'>上门条件查询</Dropdown-item>
              <Dropdown-item :name='4'>订单条件查询</Dropdown-item>
              <Dropdown-item :name='5'>咨询条件查询</Dropdown-item>
              <Dropdown-item :name='6'>执行条件查询</Dropdown-item>
              <Dropdown-item :name='7'>会员条件查询</Dropdown-item>
              <Dropdown-item :name='8'>未成交条件查询</Dropdown-item>
              <Dropdown-item :name='9'>标签条件查询</Dropdown-item>
              <Dropdown-item :name='10'>回访条件查询</Dropdown-item>
              <Dropdown-item :name='11'>未设置回访查询</Dropdown-item>
              <Dropdown-item :name='12'>最后一次成交时间查询</Dropdown-item>
            </Dropdown-menu>
          </Dropdown>
        </li>
      </ul>
    </div>
    <div class="container-body">
      <Table stripe :columns="columns" :data="data"></Table>
      <!--增加 编辑模态框-->
      <Modal :title="modalReviseTitle" v-model="modalRevise" :closable="false" @on-ok="modalReviseOk" :loading="loading" class-name="vertical-center-modal">
        <Form :model="modalReviseForm" ref='modalReviseForm' :rules="modalReviseRules" :label-width="100" label-position="right">
          <Form-item label="名称" prop="name" require>
            <Input v-model.trim="modalReviseForm.name" placeholder="请输入名称" :maxlength='20'></Input>
          </Form-item>
          <Form-item label="备注" prop="remark">
            <Input v-model="modalReviseForm.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入备注" :maxlength='100'></Input>
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
        if (value === '') {
          callback(new Error('请输入名称'));
        } else {
          callback();
        }
      };
      return {
        columns: [
					{
            title: '序号',
            type: 'index',
            width: 60
          },
          {
            title: '名称',
            key: 'name'
          },
          {
            title: '创建用户',
            key: 'createUserName'
          },
          {
            title: '备注',
            key: 'remark'
          },
          {
            title: '操作',
            key: 'action',
            width: 300,
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
                  style: {
                    marginRight: '5px'
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
                    icon: 'ios-people'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.toDetailed(params.row)
                    }
                  }
                }, '详细'),
                h('Button', {
                  props: {
                    type: 'info',
                    size: 'small',
                    icon: 'ios-people'
                  },
                  on: {
                    click: () => {
                      this.toPower(params.row.id)
                    }
                  }
                }, '权限')
              ])
            }
          }
        ],
        data: [],
        modalRevise: false,
        modalReviseTitle: '',
        modalReviseType: 'edit',



        loading: true,
        modalReviseForm: {
          id: '',
          name: '',
          remark: ''
        },
        modalReviseRules: {
          name: [{
            validator: validateName,
            trigger: 'blur'
          }],
        },
      }
		},
		computed: {
      langRouterKey () {
        return this.$store.getters.getLandRouterKey;
      },
    },
    watch: {
      langRouterKey (val) {
        if(val === 'customerFilter') {
          this.getList();
        }
      },
    },
    mounted() {
      this.getList();
    },
    methods: {
      getList() {
        let _vm = this;
        _vm.$store.dispatch('setPageLoading', -1);
        _vm.$http.getPage({
          url: 'guard-webManager/customerFilter/list.jhtml',
          success: function (res) {
						const _data = res.data.content || [];
						if(_vm.langRouterKey !== 'customerFilter') {
							_vm.data = _data;
						} else {
							_vm.requestList(_data, ['name', 'remark']).then(res => _vm.data = res);
						}
						_vm.$store.dispatch('setPageLoading', 1);
          }
        })
      },
      add() {
        this.modalReviseTitle = '添加结果集'
        this.$refs['modalReviseForm'].resetFields()
        this.modalRevise = true
        this.modalReviseType = 'add'

      },
      edit(row) {
        this.modalReviseTitle = '修改'
        this.$refs['modalReviseForm'].resetFields()
        this.modalReviseForm.name = row.name
        this.modalReviseForm.remark = row.remark
        this.modalReviseForm.id = row.id
        this.modalRevise = true
        this.modalReviseType = 'edit'
      },
      toMerge() {
        let breadData = [{
            url: '/desktop',
            text: '桌面'
          },
          {
            url: '/customerFilter',
            text: '客户选择器'
          },
          {
            url: '/combineInfo',
            text: '合并结果集'
          },
        ]
        this.$store.dispatch('setBreadData', breadData)
        this.$router.push('/combineInfo')
      },
      toDetailed(data) {
        let breadData = [{
            url: '/desktop',
            text: '桌面'
          },
          {
            url: '/customerFilter',
            text: '客户选择器'
          },
          {
            url: '/customerFilterRecord',
            text: data.name
          },
        ]
        this.$store.dispatch('setBreadData', breadData)
        this.$router.push({
          path: 'customerFilterRecord',
          query: {
            id: data.id
          }
        })
      },
      toPower(id) {
        let breadData = [{
            url: '/desktop',
            text: '桌面'
          },
          {
            url: '/customerFilter',
            text: '客户选择器'
          },
          {
            url: '/customerFilterPower',
            text: '设置客户结果集权限'
          },
        ]
        this.$store.dispatch('setBreadData', breadData)
        this.$router.push({
          path: 'customerFilterPower',
          query: {
            id: id
          }
        })
      },
      toSearch(type) {
        let _text = '',
          _url = ''
        switch (type) {
          case 1:
            _url = '/customerFilterBasicInfo'
            _text = '基本条件查询'
            break;
          case 2:
            _url = '/customerFilterAccountInfo'
            _text = '账户条件查询'
            break;
          case 3:
            _url = '/customerFilterVisitInfo'
            _text = '上门条件查询'
            break;
          case 4:
            _url = '/customerFilterOrderInfo'
            _text = '订单条件查询'
            break;
          case 5:
            _url = '/customerFilterConsultInfo'
            _text = '咨询条件查询'
            break;
          case 6:
            _url = '/customerFilterOperationInfo'
            _text = '执行条件查询'
            break;
          case 7:
            _url = '/customerFilterMemberInfo'
            _text = '会员条件查询'
            break;
          case 8:
            _url = '/customerFilterFailtureInfo'
            _text = '未成交条件查询'
            break;
          case 9:
            _url = '/customerFilterTagInfo'
            _text = '标签查询'
            break;
          case 10:
            _url = '/customerFilterCallbackInfo'
            _text = '回访条件查询'
            break;
          case 11:
            _url = '/customerFilterNoCallbackInfo'
            _text = '未设置回访条件查询'
            break;
          case 12:
            _url = '/customerFilterLastDeal'
            _text = '最后一次成交时间查询'
            break;
        }
        let breadData = [{
            url: '/desktop',
            text: '桌面'
          },
          {
            url: '/customerFilter',
            text: '客户选择器'
          },
          {
            url: _url,
            text: _text
          },
        ]
        this.$store.dispatch('setBreadData', breadData)
        this.$router.push(_url)
      },
      remove(data) {
        let _vm = this
        _vm.$Modal.confirm({
          title: '系统提示',
          content: '确定删除' + data.name + '?',
          onOk: () => {
            _vm.$http.post({
              url: 'guard-webManager/customerFilter/delete.jhtml',
              data: {
                id: data.id
              },
              success: function (res) {
                if (res.data.code == 0) {
                  _vm.getList()
                  _vm.$Notice.success({
                    title: '系统提示！',
                    desc: '删除成功！'
                  })
                } else {
                  _vm.$Notice.error({
                    title: '系统提示！',
                    desc: res.data.desc
                  })
                }
              },
              error: function (res) {
                console.log(res);
              }
            })
          },
          onCancel: () => {

          }
        });
      },
      modalReviseOk() {
        let _vm = this,
          url = ''
        if (_vm.modalReviseType == 'add') {
          url = 'guard-webManager/customerFilter/add.jhtml'
        } else {
          url = 'guard-webManager/customerFilter/update.jhtml'
        }
        _vm.$refs['modalReviseForm'].validate((valid) => {
          if (valid) {
            _vm.$http.post({
              url: url,
              data: _vm.modalReviseForm,
              success: function (res) {
                if (res.data.code == 0) {
                  _vm.getList()
                  _vm.$refs['modalReviseForm'].resetFields();
                  _vm.modalRevise = false;
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
                    _vm.loading = true;
                  })
                }
              },
              error: function (res) {
                console.log(res);
              }
            })
          } else {
            _vm.loading = false
            _vm.$nextTick(() => {
              _vm.loading = true
            })
          }
        })
      },
      modalMergeOk: function () {

      }
    }
  }

</script>

<style scoped>
  .header-item-drow {
    color: #fff;
  }

</style>
