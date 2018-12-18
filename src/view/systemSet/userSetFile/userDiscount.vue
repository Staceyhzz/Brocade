/** 
 * 用户折扣 
 */

<template>
  <div class="container-box" ref="containerBox">
    <div class="container-header">
      <h2>{{$t('layoutNav.userDiscountManage')}}</h2>
      <ul class="header-btn-group">
        <li class="header-item" @click='add'>
          <Icon type="plus-round"></Icon>{{$t('publicSet.add')}}</li>
      </ul>
    </div>
    <div class="container-body">
      <Table stripe :columns="columns" :data="data"></Table>
      <Modal :title="modalTit" v-model="modalEdit" :closable="false" @on-ok="ok" :loading="loading" class-name="vertical-center-modal">
        <Form ref="formValidate" :model="formValidate" :rules="ruleForm" :label-width="100" label-position="right">
          <Form-item :label="$t('userDiscount.label')" prop="userId" required>
            <Input v-model="userName" readonly icon="ios-search" :placeholder="$t('userDiscount.valid')" @on-focus='showUser' v-if='!key' style='width:300px'></Input>
            <span v-else>{{userName}}</span>
          </Form-item>
          <Form-item :label="$t('chargeDiscount.label2')" prop="discount" required>
            <cmptInputNumber :max="100" :min="0" v-model="formValidate.discount" style='width:300px'></cmptInputNumber>
          </Form-item>
        </Form>
      </Modal>
			<cmptChooseUserSinger :placeHolder="$t('userDiscount.valid')" @setUserData="chooseUser" :openKey='userOpenKey'></cmptChooseUserSinger>
    </div>
  </div>
</template>

<script>
	import cmptChooseUserSinger from 'components/chooseUserSinger.vue';
  export default {
		components: {cmptChooseUserSinger},
    data() {
      const validateCid = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('userDiscount.valid')));
        } else {
          callback();
        }
      };
      return {
        columns: [
					{
            title: this.$t('labelPublic.xh'),
            type: 'index',
            width: 60
          },
          {
            title: this.$t('userDiscount.label'),
            key: 'userName'
          },
          {
            title: this.$t('chargeDiscount.label2'),
            key: 'discount',
            render: (h, params) => {
              return h('span', (params.row.discount * 100).toFixed(2))
            }
          },
          {
            title: this.$t('publicSet.tableAction'),
            key: 'action',
            width: 140,
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
                }, this.$t('publicSet.edit')),
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
                }, this.$t('publicSet.del')),
              ])
            }
          }
        ],
				data: [],
				
        modalTit: '',
        modalEdit: false,
				loading: true,

				userName: '',
				userOpenKey: false,
				
				key: true,
        formValidate: {
          id: '',
          discount: 100,
          userId: ''
				},
				
        ruleForm: {
          userId: [{
            validator: validateCid,
            trigger: 'change'
          }]
        }
      }
    },
    created() {
      this.getList();
    },
    methods: {
      getList() {
        let _vm = this;
        _vm.$store.dispatch('setPageLoading', -1);
        _vm.$http.getPage({
          url: 'guard-webManager/userDiscount/list.jhtml',
          success: function (res) {
            console.log(res)
            _vm.data = res.data.content
            _vm.$store.dispatch('setPageLoading', 1);
          },
          error: function (res) {
            console.log(res);
          }
        });
      },
      add() {
        this.modalTit = this.$t('userDiscount.modalTit1');
        this.$refs['formValidate'].resetFields();
        this.userName = '';
        this.key = false;
        this.modalEdit = true;
      },
      edit(data) {
        this.modalTit = this.$t('userDiscount.modalTit2');
        this.$refs['formValidate'].resetFields();
				this.userName = data.userName;
				this.formValidate = {
					id: data.id,
					discount: data.discount * 100,
					userId: data.userid
				};
        this.key = true
        this.modalEdit = true
      },
      showUser() {
        this.userOpenKey = !this.userOpenKey;
      },
      chooseUser(data) {
        this.formValidate.userId = data.id;
        this.userName = data.name;
      },
      remove(data) {
        let _vm = this;
        _vm.$Modal.confirm({
          title: _vm.$t('publicSet.noticeTit'),
          content: `<p>${_vm.$t('userDiscount.msg1')}</p>
          <p>${_vm.$t('userDiscount.msg2')}</p>
          <p>${_vm.$t('labelPublic.mc')}：${data.userName}</p>`,
          onOk: () => {
            _vm.$http.post({
              url: 'guard-webManager/userDiscount/del.jhtml',
              data: {
                id: data.id
              },
              success: function (res) {
                console.log(res)
                if (res.data.code === 0) {
                  _vm.getList();
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('publicSet.noticeSuccess')
                  });
                } else {
                  _vm.$Notice.error({
                    title: _vm.$t('publicSet.noticeTit'),
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
        let _vm = this;
        let url = '';
        _vm.$refs['formValidate'].validate((valid) => {
          if (valid) {
            if (_vm.key) {
              url = 'guard-webManager/userDiscount/update.jhtml'
            } else {
              url = 'guard-webManager/userDiscount/add.jhtml'
            }
            _vm.$http.post({
              url: url,
              data: _vm.formValidate,
              success: function (res) {
                if (res.data.code === 0) {
                  _vm.getList();
                  _vm.modalEdit = false;
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('publicSet.noticeSuccess')
                  });
                } else {
                  _vm.$Notice.error({
                    title: _vm.$t('publicSet.noticeTit'),
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
            });
          } else {
            _vm.loading = false
            _vm.$nextTick(() => {
              _vm.loading = true
            })
          }
        })
      },
    }
  }

</script>
