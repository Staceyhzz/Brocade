/** 
 * 添加审核规则 
 */

<template>
  <div class="container-box order-rule-add">
    <div class="container-header">
      <h2>{{$t('auditRule.add5')}}</h2>
    </div>
    <div class="container-body">
      <Form ref="formAdd" :model='formAdd' :label-width="100" label-position="right" :rules="ruleForm">
        <Form-item :label="$t('auditRule.colTit1')" prop='type' required>
          <Select v-model="formAdd.type" style="width:300px">
            <Option v-for="item in typeList" :value="item.value" :key="item.name">{{ $t('auditRule.' + item.value) }}</Option>
          </Select>
        </Form-item>
        <Form-item :label="$t('auditRule.colTit2')" prop='level'>
          <Select v-model="formAdd.level" style="width:300px">
            <Option :value="item.id" v-for='item in levelList' :key='item.id'>{{$t(item.name)}}</Option>
          </Select>
        </Form-item>
        <Form-item :label="$t('labelPublic.ms')" prop="remark">
          <Input v-model="formAdd.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('placeholderPublic.input')" :maxlength='100'></Input>
        </Form-item>
        <Form-item required prop="detailListStr">
					<div v-for="item in levelList" :key='item.id' v-show='formAdd.level >= item.id'>
						<p class="label">{{$t(item.label)}}</p>
						<Row>
							<Col span="20">
							<Table stripe :columns="col" :data="item.data" height="320"></Table>
							</Col>
							<Col span="3" offset="1" class='table-left-btn'>
							<Button type="primary" icon="plus-round" @click='add(item.id)'>{{$t('publicSet.add')}}</Button>
							<Button type="primary" icon="refresh" @click='clean(item.id)'>{{$t('publicSet.clean')}}</Button>
							</Col>
						</Row>
					</div>
        </Form-item>
      </Form>
      <div class="footer-btnGroup">
        <Button type="primary" icon="checkmark" @click="save" :loading='saveLaod'>{{$t('publicSet.save')}}</Button>
        <Button type="primary" icon="android-arrow-back" @click='back'>{{$t('publicSet.back')}}</Button>
      </div>
    </div>
		<cmptChooseUserCheckBox :_modal='openKey' :_placeHolder="$t('auditRule.placeholder')" :dimension='true' :defaultUser='false' @ok='ok'></cmptChooseUserCheckBox>
  </div>
</template>

<script>
  import cmptChooseUserCheckBox from 'components/chooseUserCheckBox.vue';
  export default {
		components: {cmptChooseUserCheckBox},
    data() {
      const validateUser = (rule, value, callback) => {
				let bool = true;
				this.levelList.map((item, index) => {
					if(this.formAdd.level - 1 >= index) {
						if(item.data.length === 0) {
							bool = false;
						}
					}
				});
        if (!bool) {
          callback(new Error(this.$t('auditRule.placeholder')));
        } else {
          callback();
        }
      };
      const validateType = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('auditRule.valid')));
        } else {
          callback();
        }
      };
      return {
				openKey: false,
				saveLaod: false,
				levelList: [
					{
						id: 1,
						name: 'auditRule.label1',
						label: 'auditRule.label5',
						data: []
					},
					{
						id: 2,
						name: 'auditRule.label2',
						label: 'auditRule.label6',
						data: []
					},
					{
						id: 3,
						name: 'auditRule.label3',
						label: 'auditRule.label7',
						data: []
					},
					{
						id: 4,
						name: 'auditRule.label4',
						label: 'auditRule.label8',
						data: []
					},
					{
						id: 5,
						name: 'auditRule.label12',
						label: 'auditRule.label9',
						data: []
					}
				],
        formAdd: {
          hospitalId: '',
          level: 1,
          type: '',
          remark: '',
          detailListStr: '',
        },
        typeList: [
					{
            name: '开发人变更',
            value: 'exploitChange'
          },
          {
            name: '咨询人员变更',
            value: 'managerChange'
          },
          {
            name: '会员',
            value: 'member'
          },
          {
            name: '增加权益',
            value: 'addEquity'
          },
          {
            name: '删除权益',
            value: 'deleteEquity'
          },
          {
            name: '赠送券',
            value: 'addCoupon'
          },
          {
            name: '退券',
            value: 'rebateCoupon'
          },
          {
            name: '赠送积分',
            value: 'addPoint'
          },
          {
            name: '扣减积分',
            value: 'rebatePoint'
          },
          {
            name: '积分兑换券',
            value: 'pointCoupon'
          },
          {
            name: '更换医生',
            value: 'orderDetailManager'
          },
          {
            name: '黑名单',
            value: 'blacklist'
          },
          {
            name: '欠款划扣',
            value: 'debtOperation'
          },
          {
            name: '预收款转账',
            value: 'depositTransfer'
          },
				],
				selectLevel: '',
        col: [
					{
            title: this.$t('labelPublic.zh'),
            key: 'account'
          },
          {
            title: this.$t('labelPublic.xm'),
            key: 'name',
          },
          {
            title: this.$t('publicSet.tableAction'),
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
                      this.remove(params.index, params.row.level);
                    }
                  }
                }, this.$t('publicSet.del'))
              ])
            }
          }
        ],
        ruleForm: {
          detailListStr: [{
            validator: validateUser,
            trigger: 'change'
          }],
          type: [{
            validator: validateType,
            trigger: 'change'
          }],
        }
      }
    },
    computed: {
      setSave() {
				let list = [];
				this.levelList.map((item, index) => {
					if(this.formAdd.level - 1 >= index) {
						item.data.map(user => {
							list.push({
								userId: user.id,
								level: user.level
							});
						});
					}
				});
				return JSON.stringify(list);
      }
    },
    created() {
      this.$store.dispatch('setPageLoading', 1);
      this.formAdd.hospitalId = this.$route.query.id;
    },
		methods: {
      //获取弹窗用户选择列表
      add(type) {
        this.selectLevel = type;
        this.openKey = !this.openKey;
      },
      clean(type) {
        this.levelList[type - 1].data.splice(0);
      },
      remove(index, type) {
        this.levelList[type - 1].data.splice(index, 1);
      },
      ok(data) {
				data.map(item => {
					const index = this.levelList[this.selectLevel - 1].data.findIndex(user => user.id === item.id);
					if(index < 0) {
						this.levelList[this.selectLevel - 1].data.push({
							account: item.account,
							name: item.name,
							id: item.id,
							level: this.selectLevel
						})
					}
				});
				this.$refs.formAdd.validateField('detailListStr');
      },
      setAmount(val) {
        this.$nextTick(() => {
          this.formAdd.amount = parseFloat(val.toFixed(2))
        })
			},
      save() {
        let _vm = this;
        _vm.$refs['formAdd'].validate((valid) => {
          if (valid) {
						_vm.saveLaod = true;
            _vm.formAdd.detailListStr = _vm.setSave;
            _vm.$http.post({
              url: 'guard-webManager/auditRule/baseRuleAddEdit.jhtml',
              data: _vm.formAdd,
              success: function (res) {
                if (res.data.code === 0) {
                  console.log(res)
									_vm.$router.back(-1)
									_vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('publicSet.noticeSuccess')
                  });
                } else {
									_vm.saveLaod = false;
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
          }
        })
      },
      back() {
        this.$router.back(-1)
      }
    },
  }

</script>

<style scoped lang='less'>
	.order-rule-add {
		.label {
			float: left;
			width: 100px;
			padding-right: 10px;
			margin-left: -100px;
			text-align: right;
		}
	}
</style>
