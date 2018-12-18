/** * 券活动管理页面 */

<template>
  <div class="container-box userPower">
    <div class="container-header">
      <h2>{{title}}</h2>
      <ul class="header-btn-group">
        <li class="header-item" @click="clean">
          <Icon type="ios-trash-outline"></Icon>清空</li>
        <li class="header-item" @click="add">
          <Icon type="plus-round"></Icon>增加</li>
      </ul>
    </div>
    <div class="container-body">
      <Table stripe :columns="col" :data="data"></Table>
    </div>
    <Modal title="导入代码" v-model="modal" :closable="false" @on-ok="ok" :loading="loading" class-name="vertical-center-modal">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80" label-position="right">
        <Form-item label="代码列表" prop="detailCode" required>
          <Input v-model="formValidate.detailCode" type="textarea" :autosize="{minRows: 5,maxRows: 7}" placeholder="请输入代码列表"></Input>
        </Form-item>
      </Form>
    </Modal>
  </div>
</template>

<script>
  export default {
    data() {
      const validateName = (rule, value, callback) => {
        if (value == '') {
          callback(new Error('请输入代码'))
        } else {
          callback()
        }
      }
      return {
        modal: false,
        loading: true,
        title: '',
        formValidate: {
          id: '',
          detailCode: '',
        },
        data: [],
        col: [{
            title: '序号',
            type: 'index',
            width: 60
          },
          {
            title: '代码',
            key: 'code'
          },
          {
            title: '状态',
            key: 'couponid',
            render: (h, params) => {
              const _text = (!params.row.couponid && params.row.couponid != 0) ? '未激活' : '已激活'
              const _color = (!params.row.couponid && params.row.couponid != 0) ? 'red' : 'blue'
              return h('span', {
                style: {
                  color: _color
                }
              }, _text)
            }
          },
          {
            title: '激活时间',
            key: 'activeTime'
          },
          {
            title: '激活客户',
            key: 'activeCustomerName',
            render: (h, params) => {
              if (!params.row.couponid && params.row.couponid != 0) {

              } else {
                return h('span', params.row.activeCustomerName + ' (' + params.row.activeCustomerID + ')')
              }
            }
          },
          {
            title: '激活医院',
            key: 'activeHospitalName'
          },
          {
            title: '激活用户',
            key: 'activeUserName'
          },
          {
            title: '激活券编号',
            key: 'couponid'
          },
        ],
        ruleValidate: {
          detailCode: [{
            required: true,
            validator: validateName,
            trigger: 'blur'
          }],
        }
      }
    },
    created() {
      this.title = this.$route.query.name
      this.formValidate.id = this.$route.query.id
      this.getId()
    },
    methods: {
      getId() {
        let _vm = this
        _vm.$store.dispatch('setPageLoading', -1)
        _vm.$http.getPage({
          url: 'guard-webManager/couponActivity/getCouponDetailList.jhtml',
          data: {
            id: _vm.$route.query.id
          },
          success: function (res) {
						_vm.data = res.data.content.detailList
						_vm.$store.dispatch('setPageLoading', 1);
          },
          error: function (res) {
            console.log(res);
          }
        })
      },
      clean() {
        let _vm = this
        _vm.$Modal.confirm({
          title: '系统提示',
          content: '确定清空?',
          onOk: () => {
            _vm.$http.post({
              url: 'guard-webManager/couponActivity/clear.jhtml',
              data: _vm.formValidate,
              success: function (res) {
                if (res.data.code == 0) {
                  _vm.getId()
                  _vm.$Notice.success({
                    title: '系统提示！',
                    desc: '清空成功！'
                  });
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
            });
          },
          onCancel: () => {

          }
        })
      },
      add() {
        this.modal = true
      },
      ok() {
        let _vm = this
        _vm.$refs['formValidate'].validate((valid) => {
          if (valid) {
            _vm.$http.post({
              url: 'guard-webManager/couponActivity/editImportDetail.jhtml',
              data: _vm.formValidate,
              success: function (res) {
                if (res.data.code == 0) {
                  _vm.getId()
                  _vm.$refs['formValidate'].resetFields()
                  _vm.modal = false
                  _vm.$Notice.success({
                    title: '系统提示！',
                    desc: res.data.content
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
              _vm.loading = true;
            })
          }
        })
      },
    }
  }

</script>
