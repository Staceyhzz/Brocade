/** * 排班录入 */
<template>
  <div class="container-box">
    <div class="container-header">
      <h2>人员排班 </h2>
      <ul class="header-btn-group">
        <li class="header-item" @click="toView">
          <Icon type="plus-round"></Icon>批量增加</li>
        <li class="header-item" @click="selectDate('before')">
          <Icon type="arrow-up-a"></Icon>前一周</li>
        <li class="header-item" @click="selectDate('now')">
          <Icon type="navicon-round"></Icon>
          </Icon>本周</li>
        <li class="header-item" @click="selectDate('after')">
          <Icon type="arrow-down-a"></Icon>
          </Icon>后一周</li>
      </ul>
    </div>
    <div class="container-body">
      <Table stripe :columns="col" :data="data"></Table>
    </div>
    <Modal :title="modalTit" v-model="modal" :closable="false" class-name="vertical-center-modal">
      <Form ref="formValidate" :model="formValidate" :rules="ruleForm" :label-width="100" label-position="right">
        <Form-item label="用户">
          <span>{{formValidate.userName}}</span>
        </Form-item>
        <Form-item label="日期">
          <span>{{formValidate.createTime}}</span>
        </Form-item>
        <Form-item label="班次类型" prop="categoryId" required>
          <Select v-model="formValidate.categoryId">
            <Option v-for="item in categoryList" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
        </Form-item>
      </Form>
      <div slot="footer">
        <Button type="error" :loading="deleteLoading" @click="del" style='float:left' v-if='key'>删除</Button>
        <Button type="primary" :loading="saveLoading" @click="save">保存</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  moment.updateLocale('en', {
    weekdays: [
      '星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'
    ]
  });
  export default {
    data() {
      const validateChange = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请选择类型'));
        } else {
          callback();
        }
      };
      return {
        startTime: moment(moment(moment().startOf('week')).format('YYYY-MM-DD')).add(1, 'd').format('YYYY-MM-DD'),
        endTime: moment(moment(moment().endOf('week')).format('YYYY-MM-DD')).add(1, 'd').format('YYYY-MM-DD'),
        modalTit: '',
        saveLoading: false,
        deleteLoading: false,
        modal: false,
        key: false,
        formSearch: {
          startTime: '',
          endTime: '',
        },
        formValidate: {
          mode: '',
          id: '',
          categoryId: '',
          userId: '',
          userName: '',
          createTime: '',
        },
        col: [{
            title: '部门',
            key: 'deptName'
          },
          {
            title: '用户',
            key: 'name'
          },
        ],
        data: [],
        timeBox: [],
        ruleForm: {
          categoryId: [{
            validator: validateChange,
            trigger: 'change'
          }],
        }
      }
    },
    computed: {
      categoryList() {
        return this.$store.getters.getSelectShiftCategoryList
      },
    },
    created() {
      this.getList()
    },
    mounted() {
      this.$store.dispatch('setSelectShiftCategoryList')
    },
    methods: {
      getList() {
        let _vm = this
        _vm.timeBox = []
        _vm.$store.dispatch('setPageLoading', -1)
        _vm.$http.getPage({
          url: 'guard-webManager/myShift/list.jhtml',
          data: _vm.formSearch,
          success: function (res) {
						_vm.$store.dispatch('setPageLoading', 1)
						for (let i = 0; i < 7; i++) {
							_vm.timeBox.push(moment(res.data.content.StartTime).add(i, 'd').format('YYYY-MM-DD'))
						}
						_vm.setColumns()
						_vm.data = res.data.content.UserList;
          },
          error: function (res) {
            console.log(res);
          }
        });
      },
      setColumns() {
        this.col.splice(2)
        this.timeBox.map(item => {
          const _obj = {
            col: {
              title: moment(item).format('YYYY-MM-DD (dddd)'),
              key: item,
              render: (h, params) => {
                const _day = item + ' 00:00:00'
                return h('div', {
                  style: {
                    height: '60px',
                  },
                  on: {
                    click: () => {
                      this.add(item, params.row.name, params.row.id)
                    }
                  },
                }, params.row.shiftList.map(item1 => {
                  if (moment(_day).isSame(item1.shiftdate)) {
                    return h('p', {
                      style: {
                        lineHeight: '60px',
                        textAlign: 'center'
                      },
                      on: {
                        click: (event) => {
                          event.stopPropagation()
                          this.edit(item, params.row.name, params.row.id, item1.id, item1.categoryid)
                        }
                      },
                    }, item1.categoryName)
                  }
                }))
              }
            }
          }
          this.col.push(_obj.col)
        })
      },
      //添加
      add(date, name, id) {
        let _vm = this
        _vm.modalTit = '添加排班信息'
        _vm.$refs['formValidate'].resetFields();
        _vm.formValidate.mode = 'Add'
        _vm.formValidate.userId = id
        _vm.formValidate.createTime = date
        _vm.formValidate.userName = name
        _vm.key = false
        _vm.modal = true
      },
      // 修改
      edit(date, name, id, mesId, type) {
        let _vm = this
        _vm.modalTit = '修改排班信息'
        _vm.$refs['formValidate'].resetFields();
        _vm.formValidate.mode = 'Update'
        _vm.formValidate.userId = id
        _vm.formValidate.createTime = date
        _vm.formValidate.userName = name
        _vm.formValidate.id = mesId
        _vm.formValidate.categoryId = type
        _vm.key = true
        _vm.modal = true
      },
      selectDate(type) {
        if (type == 'now') {
          this.formSearch.startTime = this.startTime
          this.formSearch.endTime = this.endTime
        } else if (type == 'after') {
          this.formSearch.startTime = moment(this.timeBox[0]).add(7, 'd').format('YYYY-MM-DD')
          this.formSearch.endTime = moment(this.timeBox[6]).add(7, 'd').format('YYYY-MM-DD')
        } else {
          this.formSearch.startTime = moment(this.timeBox[0]).subtract(7, 'd').format('YYYY-MM-DD')
          this.formSearch.endTime = moment(this.timeBox[6]).subtract(7, 'd').format('YYYY-MM-DD')
        }
        this.getList()
      },
      save() {
        let _vm = this
        _vm.$refs['formValidate'].validate((valid) => {
          if (valid) {
            _vm.saveLoading = true
            _vm.$http.post({
              url: 'guard-webManager/myShift/edit.jhtml',
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
                }
                _vm.saveLoading = false
              },
              error: function (res) {
                console.log(res);
              }
            });
          } else {
            _vm.saveLoading = false
          }
        })
      },
      del() {
        let _vm = this
        _vm.deleteLoading = true
        _vm.$http.post({
          url: 'guard-webManager/myShift/delete.jhtml',
          data: {
            id: _vm.formValidate.id
          },
          success: function (res) {
            if (res.data.code == 0) {
              _vm.getList()
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
            }
            _vm.deleteLoading = false
          },
          error: function (res) {
            console.log(res);
          }
        });
      },
      toView() {
        let breadData = [{
            url: '/desktop',
            text: '桌面'
          },
          {
            url: '/myShift',
            text: '排班录入'
          },
          {
            url: '/shiftAddBulk',
            text: '批量设置'
          }
        ];
        this.$store.dispatch('setBreadData', breadData);
        this.$router.push('/shiftAddBulk')
      },
    }
  }

</script>
