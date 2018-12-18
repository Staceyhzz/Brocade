/** 
 * 医院编辑设置 
 */

<template>
  <div class="container-box manager-hosp">
    <div class="container-header">
      <h2>{{formValidate.hospName}}</h2>
      <ul class="header-btn-group">
        <li class="header-item" @click="add">
          <Icon type="plus-round"></Icon>{{$t('publicSet.add')}}</li>
      </ul>
    </div>
    <div class="container-body">
			<div class="msg">
				<p>{{$t('manager.msg1')}}</p>
				<p class="list">{{rule}}</p>
			</div>
			<div class="jyw-complex-table">
				<table>
					<thead>
						<tr>
							<th>{{$t('manager.label2')}}</th>
							<th>{{$t('manager.label3')}}</th>
							<th>{{$t('publicSet.tableAction')}}</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for='(item, index) in data' :key='index'>
							<td :class="['tit',item.typeMerge.display ? 'hidden' : '']" :rowspan='item.typeMerge.rowSpanNum'>{{$t('manager.' + item.type)}}</td>
							<td class="con">{{item.userName}}</td>
							<td class="action">
								<Button type="error" icon='ios-trash-outline' size='small' @click="remove(item)">{{$t('publicSet.del')}}</Button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
    </div>
    <Modal :title="$t('manager.modalTit')" v-model="modal" :closable="false" @on-ok="ok" :loading="loading" class-name="vertical-center-modal">
      <Form ref="formValidate" :model="formValidate" :rules="ruleForm" :label-width="100" label-position="right">
        <Form-item :label="$t('manager.label2')" prop="type" required>
          <Select v-model="formValidate.type">
            <Option v-for="item in typeList" :value="item.val" :key="item.id">{{ $t('manager.' + item.val) }}</Option>
          </Select>
        </Form-item>
        <Form-item :label="$t('manager.label3')" prop="name" required>
          <Input v-model="formValidate.name" readonly icon="ios-search" :placeholder="$t('manager.valid2')" @on-focus='showUser'></Input>
        </Form-item>
      </Form>
    </Modal>
		<cmptChooseUserSinger :placeHolder="$t('manager.valid2')" @setUserData="chooseUser" :openKey='userOpenKey' :defaultUser='false' :hospId='formValidate.hospitalId'></cmptChooseUserSinger>
  </div>
</template>

<script>
	import cmptChooseUserSinger from 'components/chooseUserSinger.vue';
  export default {
		components: {cmptChooseUserSinger},
    data() {
      const validateType = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('manager.valid1')));
        } else {
          callback();
        }
      };
      const validateUser = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('manager.valid2')));
        } else {
          callback();
        }
      };
      return {
        modal: false,
				
				userOpenKey: false,

        loading: true,
        formValidate: {
          hospitalId: '',
          hospName: '',
          type: '',
          userId: '',
          name: '',
        },
        
        typeList: [
					{
            val: 'updateChannel',
            name: '修改来源',
          },
          {
            val: 'updateSymptom',
            name: '修改咨询项目',
          },
          {
            val: 'updateStore',
            name: '修改渠道',
          },
          {
            val: 'updateMobile',
            name: '修改联系方式',
          },
          {
            val: 'consultUpdate',
            name: '修改咨询',
          },
          {
            val: 'consultDelete',
            name: '删除咨询',
          },
          {
            val: 'failtureUpdate',
            name: '修改未成交',
          },
          {
            val: 'failtureDelete',
            name: '删除未成交',
          },
          {
            val: 'tagDelete',
            name: '删除标签',
          },
          {
            val: 'relationDelete',
            name: '删除关系',
          },
          {
            val: 'surveyUpdate',
            name: '修改问卷',
          },
          {
            val: 'surveyDelete',
            name: '删除问卷',
          },
          {
            val: 'medicalRecordUpdate',
            name: '修改病历',
          },
          {
            val: 'medicalRecordDelete',
            name: '删除病历',
          },
          {
            val: 'photoUpdate',
            name: '修改照片',
          },
          {
            val: 'photoDelete',
            name: '删除照片',
          },
          {
            val: 'appointmentUpdate',
            name: '修改咨询预约',
          },
          {
            val: 'appointmentDelete',
            name: '删除咨询预约',
          },
          {
            val: 'treatUpdate',
            name: '修改治疗预约',
          },
          {
            val: 'treatDelete',
            name: '删除治疗预约',
          },
          {
            val: 'surgeryUpdate',
            name: '修改手术预约',
          },
          {
            val: 'surgeryDelete',
            name: '删除手术预约',
          },
          {
            val: 'callbackTaskUpdate',
            name: '修改回访提醒',
          },
          {
            val: 'callbackTaskDelete',
            name: '删除回访提醒',
          },
          {
            val: 'callbackUpdate',
            name: '修改回访',
          },
          {
            val: 'callbackDelete',
            name: '删除回访',
          },
          {
            val: 'operationUpdate',
            name: '修改划扣',
          },
          {
            val: 'operationDelete',
            name: '删除划扣',
          },
          {
            val: 'operationStockOutDelete',
            name: '删除划扣发货',
          },
          {
            val: 'commissionDelete',
            name: '删除渠道佣金',
          },
          {
            val: 'blacklistDelete',
            name: '删除黑名单',
          },
          {
            val: 'stockDelete',
            name: '删除进出库单',
          },
          {
            val: 'updateEffectrRacking',
            name: '修改效果追踪',
          },
          {
            val: 'deleteEffectrRacking',
            name: '删除效果追踪',
          }
				],
				
        ruleForm: {
          type: [{
            validator: validateType,
            trigger: 'change'
          }],
          name: [{
            validator: validateUser,
            trigger: 'change'
          }],
        },
        col: [
					{
            title: '用户',
            key: 'userName'
          },
          {
            title: '操作',
            key: 'action',
            width: 100,
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
                      this.remove(params.row)
                    }
                  }
                }, '删除'),
              ])
            }
          }
        ],
        data: []
      }
		},
		computed: {
			rule() {
				return this.typeList.map(item => this.$t('manager.' + item.val)).join('、');
			},
		},
    created() {
      this.formValidate.hospitalId = this.$route.query.id * 1;
      this.formValidate.hospName = this.$route.query.name
      this.getList()
    },
    methods: {
      getList() {
        let _vm = this;
        _vm.$store.dispatch('setPageLoading', -1)
        _vm.$http.getPage({
          url: 'guard-webManager/manager/list.jhtml',
          data: {
            id: _vm.$route.query.id
          },
          success: function (res) {
            const _data = res.data.content || [];
            let _list = [];
            _vm.typeList.map(item => {
              const box = _data.filter(i => i.type === item.val) || [];
              _list.push(...box);
            });
            _vm.data = _vm.combineCell(_list, 'type');
            _vm.$store.dispatch('setPageLoading', 1);
          },
          error: function (res) {
            console.log(res);
          }
        });
      },
      add() {
        this.modal = true;
      },
      showUser() {
        this.userOpenKey = !this.userOpenKey;
      },
      chooseUser(data) {
        this.formValidate.userId = data.id;
        this.formValidate.name = data.name;
      },
      remove(data) {
        let _vm = this;
        _vm.$Modal.confirm({
          title: _vm.$t('publicSet.noticeTit'),
          content: `${_vm.$t('manager.msg', [_vm.$t('manager.' + data.type)])}`,
          onOk: () => {
            _vm.$http.post({
              url: 'guard-webManager/manager/delete.jhtml',
              data: {
                id: data.id
              },
              success: function (res) {
                if (res.data.code == 0) {
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
        let _vm = this
        _vm.$refs['formValidate'].validate((valid) => {
          if (valid) {
            _vm.$http.post({
              url: 'guard-webManager/manager/add.jhtml',
              data: _vm.formValidate,
              success: function (res) {
                if (res.data.code === 0) {
                  _vm.getList()
                  _vm.$refs['formValidate'].resetFields();
                  _vm.modal = false;
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
                    _vm.loading = true
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
      }
    },
  }

</script>

<style scoped lang='less'>
	.manager-hosp {
		.tit {
			min-width: 80px;
		}
		.con {
			min-width: 120px;
		}
		.action {
			min-width: 80px;
			text-align: center;
		}
		.msg {
			margin-bottom: 30px;
			font-size: 14px;
		}
		.list {
			padding-left: 60px;
			margin-top: 5px;
		}
	}
</style>

