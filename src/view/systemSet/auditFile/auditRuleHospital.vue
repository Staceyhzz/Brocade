/** 
 * 医院审核规则设置 
 */

<template>
  <div class="container-box audit-rule-hosp">
    <div class="container-header">
      <h2>{{title}}</h2>
      <Dropdown style="float: right;" @on-click='toRule'>
        <Button type="primary" icon='arrow-down-b'>{{$t('auditRule.btn')}}</Button>
        <Dropdown-menu slot="list">
          <Dropdown-item v-for="item in addTypeList" :key="item.id" :name='item.id'>{{$t(item.name)}}</Dropdown-item>
        </Dropdown-menu>
      </Dropdown>
    </div>
    <div class="container-body">
			<div class="msg">
				<p>{{$t('auditRule.msg1')}}</p>
				<p class="list">{{rule}}</p>
			</div>
			<div class="jyw-complex-table">
				<table>
					<thead>
						<tr>
							<th>{{$t('auditRule.colTit1')}}</th>
							<th>{{$t('auditRule.colTit2')}}</th>
							<th>{{$t('auditRule.colTit3')}}</th>
							<th>{{$t('auditRule.colTit4')}}</th>
							<th>{{$t('auditRule.colTit5')}}</th>
							<th>{{$t('labelPublic.ms')}}</th>
							<th>{{$t('publicSet.tableAction')}}</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for='(item, index) in data' :key='index'>
							<td :class="['tit',item.typeMerge.display ? 'hidden' : '']" :rowspan='item.typeMerge.rowSpanNum'>{{$t('auditRule.' + item.type)}}</td>
							<td class="level">{{item.level}}</td>
							<td class="rule">
								<p v-if='item.disKey'>{{(item.discount * 100).toFixed(2)}}</p>
								<p v-else>——</p>
							</td>
							<td class="rule">
								<p v-if='item.amountKey'>{{item.amount}}</p>
								<p v-else>——</p>
							</td>
							<td class="con">
								<p v-for='user in item.detailList' :key='user.id'>
									【{{user.level}}】【{{user.userHospitalName}}】【{{user.userName}}】
								</p>
							</td>
							<td class="con">{{item.remark}}</td>
							<td class="action">
								<Button type="error" icon='ios-trash-outline' size='small' @click="remove(item)">{{$t('publicSet.del')}}</Button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        title: '',
        hospId: '',
				typeList: [
					{
						id: 'order',
						name: '项目折扣',
					},
					{
						id: 'back',
						name: '退项目',
					},
					{
						id: 'backSales',
						name: '退药物品',
					},
					{
						id: 'rebateDeposit',
						name: '退预收款',
					},
					{
						id: 'depositTransfer',
						name: '预收款转账',
					},
					{
						id: 'exploitChange',
						name: '开发人员变更',
					},
					{
						id: 'managerChange',
						name: '咨询人员变更',
					},
					{
						id: 'member',
						name: '会员变更',
					},
					{
						id: 'addEquity',
						name: '增加权益',
					},
					{
						id: 'deleteEquity',
						name: '删除权益',
					},
					{
						id: 'addCoupon',
						name: '送券',
					},
					{
						id: 'rebateCoupon',
						name: '退券',
					},
					{
						id: 'addPoint',
						name: '送积分',
					},
					{
						id: 'rebatePoint',
						name: '扣减积分',
					},
					{
						id: 'pointCoupon',
						name: '积分兑换券',
					},
					{
						id: 'orderDetailManager',
						name: '更换医生',
					},
					{
						id: 'blacklist',
						name: '黑名单',
					},
					{
						id: 'debtOperation',
						name: '欠费划扣',
					}
				],
				addTypeList: [
					{
						id: 'add1',
						name: 'auditRule.order',
						url: '/orderRuleAdd'
					},
					{
						id: 'add2',
						name: 'auditRule.back',
						url: '/backRuleAdd'
					},
					{
						id: 'add3',
						name: 'auditRule.backSales',
						url: '/backSalesRuleAdd'
					},
					{
						id: 'add4',
						name: 'auditRule.rebateDeposit',
						url: '/rebateDepositRuleAdd'
					},
					{
						id: 'add5',
						name: 'auditRule.other',
						url: '/baseRuleAdd'
					}
				],
				data: [],
      }
		},
    watch: {
      langRouterKey (val) {
        if(val === 'auditRuleHospital') {
          this.getList(this.hospId);
        }
      },
    },
		computed: {
			rule() {
				return this.typeList.map(item => this.$t('auditRule.' + item.id)).join('、');
			},
			langRouterKey () {
        return this.$store.getters.getLandRouterKey;
      },
		},
    created() {
      if (typeof this.$route.query.id == 'string') {
        this.hospId = this.$route.query.id
      } else {
        var lg = window.sessionStorage;
        this.hospId = JSON.parse(lg.query34).id
      }
      this.getList(this.hospId);
    },
    methods: {
      getList(id) {
        let _vm = this;
        _vm.$store.dispatch('setPageLoading', -1);
        _vm.$http.getPage({
          url: 'guard-webManager/auditRule/list.jhtml',
          data: {
            id: id
          },
          success: function (res) {
						console.log(res)
						_vm.title = res.data.content.Hospital.name;
						const _data = res.data.content.list || [];
						let _list = [];
						_vm.typeList.map(item => {
							let box = _data.filter(t => t.type === item.id).sort((x, y) => x.level - y.level);
							box.map(i => {
								_list.push({
									...i,
									disKey: item.id === 'order'
										? true
										: false,
									amountKey: (item.id === 'back' || item.id === 'backSales' || item.id === 'rebateDeposit')
										? true
										: false
								});
							});
						});
						if(_vm.langRouterKey !== 'auditRuleHospital') {
							_vm.data = _vm.combineCell(_list, 'type');
						} else {
							_vm.requestList(_list, ['remark']).then(res => _vm.data = _vm.combineCell(res, 'type'));
						}
						_vm.$store.dispatch('setPageLoading', 1);
          },
          error: function (res) {
            console.log(res);
          }
        });
      },
      remove(data) {
        let _vm = this;
        _vm.$Modal.confirm({
          title: _vm.$t('publicSet.noticeTit'),
          content: _vm.$t('auditRule.msg2'),
          onOk: () => {
            _vm.$http.post({
              url: 'guard-webManager/auditRule/delete.jhtml',
              data: {
                id: data.id
              },
              success: function (res) {
                if (res.data.code === 0) {
                  _vm.getList(_vm.hospId)
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('publicSet.noticeSuccess')
                  });
                } else {
                  if(_vm.langRouterKey !== 'auditRuleHospital') {
                    _vm.$Notice.error({
                      title: _vm.$t('publicSet.noticeTit'),
                      desc: res.data.desc
                    });
                  } else {
                    _vm.getLang.word(res.data.desc, (data) => {
                      _vm.$Notice.error({
                        title: _vm.$t('publicSet.noticeTit'),
                        desc: data[0].dst
                      });
                    });
                  }
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
      toRule(id) {
				const index = this.addTypeList.findIndex(item => item.id === id);
				const _url = this.addTypeList[index].url;
				const _text = 'auditRule.' + id;
        var breadData = [{
            url: '/desktop',
            text: 'layoutNav.desk'
          },
          {
            url: '/auditRule',
            text: 'layoutNav.auditRuleManage'
          },
          {
            url: '/auditRuleHospital',
            text: this.title
          },
          {
            url: _url,
            text: _text
          }
        ];
        this.$store.dispatch('setBreadData', breadData);
        this.$router.push({
          path: _url,
          query: {
            id: this.hospId
          }
        })
      },
    }
  }

</script>

<style scoped lang='less'>
	.audit-rule-hosp {
		.action {
			min-width: 80px;
			text-align: center;
		}
		.con {
			min-width: 120px;
			text-align: left;
		}
		.rule {
			min-width: 80px;
			text-align: center;
		}
		.level {
			min-width: 60px;
			text-align: center;
		}
		.tit {
			min-width: 100px;
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

