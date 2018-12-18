/** 
 * 咨询医生设置 
 */

<template>
  <div class="container-box">
    <div class="container-header">
      <h2>{{$t('layoutNav.consultDoctorManage')}}</h2>
      <ul class="header-btn-group">
        <li class="header-item" @click='add'>
          <Icon type="plus-round"></Icon>{{$t('publicSet.add')}}</li>
      </ul>
    </div>
    <div class="container-body">
      <Table stripe :columns="columns" :data="data"></Table>
      <Modal :title="modalTit" v-model="modalEdit" :closable="false" @on-ok="ok" :loading="loading" class-name="vertical-center-modal">
        <Form ref="formValidate" :model="formValidate" :rules="ruleForm" :label-width="100" label-position="right">
          <Form-item :label="$t('treatDoctor.label1')" prop="userId" required>
            <Input v-model="userName" readonly icon="ios-search" :placeholder="$t('treatDoctor.valid2')" @on-focus='showUser' v-if='!key'></Input>
						<span v-else>{{userName}}</span>
          </Form-item>
          <Form-item :label="$t('consultDoctor.label1')">
            <Radio-group v-model="formValidate.triageStatus">
              <Radio :label="1">{{$t('consultDoctor.label5')}}</Radio>
              <Radio :label="0">{{$t('consultDoctor.label6')}}</Radio>
            </Radio-group>
          </Form-item>
          <Form-item :label="$t('consultDoctor.label2')">
            <Radio-group v-model="formValidate.appointmentStatus">
              <Radio :label="1">{{$t('consultDoctor.label5')}}</Radio>
              <Radio :label="0">{{$t('consultDoctor.label6')}}</Radio>
            </Radio-group>
          </Form-item>
          <Form-item :label="$t('consultDoctor.label3')">
            <Radio-group v-model="formValidate.shiftType">
              <Radio :label="1">{{$t('consultDoctor.label5')}}</Radio>
              <Radio :label="0">{{$t('consultDoctor.label6')}}</Radio>
            </Radio-group>
          </Form-item>
          <Form-item :label="$t('consultDoctor.label4')">
            <Input v-model.trim="formValidate.aliasName" :placeholder="$t('placeholderPublic.input')" :maxlength='20'></Input>
          </Form-item>
        </Form>
      </Modal>
			<cmptChooseUserSinger :placeHolder="$t('treatDoctor.valid2')" @setUserData="chooseUser" :openKey='userOpenKey' :defaultUser='false'></cmptChooseUserSinger>
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
          callback(new Error(this.$t('treatDoctor.valid2')));
        } else {
          callback();
        }
      };
      return {
				userOpenKey: false,
				userName: '',
        columns: [
					{
            title: this.$t('labelPublic.xh'),
            type: 'index',
            width: 60
          },
          {
            title: this.$t('treatDoctor.label1'),
            key: 'userName'
          },
          {
            title: this.$t('consultDoctor.label1'),
						render: (h, params) => {
              const color = params.row.triagestatus === 1 
                ? '#4172F6' 
                : '#FF6F76';
              const text = params.row.triagestatus === 1 
                ? this.$t('consultDoctor.label5') 
                : this.$t('consultDoctor.label6');
              return h('span', {
                style: {
                  color: color
                }
              }, text);
            }
          },
          {
            title: this.$t('consultDoctor.label2'),
						render: (h, params) => {
              const color = params.row.appointmentstatus === 1 
                ? '#4172F6' 
                : '#FF6F76';
              const text = params.row.appointmentstatus === 1 
                ? this.$t('consultDoctor.label5') 
                : this.$t('consultDoctor.label6');
              return h('span', {
                style: {
                  color: color
                }
              }, text);
            }
          },
          {
            title: this.$t('consultDoctor.label3'),
            render: (h, params) => {
              const color = params.row.shifttype === 1 
                ? '#4172F6' 
                : '#FF6F76';
              const text = params.row.shifttype === 1 
                ? this.$t('consultDoctor.label5') 
                : this.$t('consultDoctor.label6');
              return h('span', {
                style: {
                  color: color
                }
              }, text);
            }
          },
          {
            title: this.$t('consultDoctor.label4'),
            key: 'aliasname'
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
                }, this.$t('publicSet.del'))
              ])
            }
          }
        ],
        data: [],
        modalTit: '',
        modalEdit: false,
        loading: true,
        key: true,
        formValidate: {
          id: '',
          userId: '',
          triageStatus: 1,
          appointmentStatus: 1,
          aliasName: '',
          shiftType: 1
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
          url: 'guard-webManager/consultDoctor/list.jhtml',
          success: function (res) {
            console.log(res)
            _vm.data = res.data.content || [];
            _vm.$store.dispatch('setPageLoading', 1);
          },
          error: function (res) {
            console.log(res);
          }
        });
      },
      edit(data) {
        this.modalTit = this.$t('consultDoctor.modalTit2');
        this.$refs['formValidate'].resetFields();
        this.userName = data.userName;
				this.formValidate.id = data.id;
				this.formValidate.userId = data.userid;
        this.formValidate.triageStatus = data.triagestatus;
        this.formValidate.appointmentStatus = data.appointmentstatus;
        this.formValidate.shiftType = data.shifttype;
        this.formValidate.aliasName = data.aliasname;
        this.key = true;
        this.modalEdit = true;
      },
      add() {
        this.modalTit = this.$t('consultDoctor.modalTit1');
        this.$refs['formValidate'].resetFields();
        this.userName = ''
        this.key = false;
        this.modalEdit = true;
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
          content: `<p>${_vm.$t('consultDoctor.msg1')}</p>
          <p>${_vm.$t('consultDoctor.msg2')}</p>
          <p>${_vm.$t('labelPublic.mc')}：${data.userName}</p>`,
          onOk: () => {
            _vm.$http.post({
              url: 'guard-webManager/consultDoctor/del.jhtml',
              data: {
                id: data.id
              },
              success: function (res) {
                console.log(res)
                if (res.data.code === 0) {
                  _vm.getList()
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
				const url = _vm.key 
					? 'guard-webManager/consultDoctor/update.jhtml'
					: 'guard-webManager/consultDoctor/add.jhtml';
				_vm.$refs['formValidate'].validate((valid) => {
					if (valid) {
						_vm.$http.post({
							url: url,
							data: _vm.formValidate,
							success: function (res) {
								console.log(res)
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
									});
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
							_vm.loading = true;
						})
					}
				})
      },
    }

  }

</script>
