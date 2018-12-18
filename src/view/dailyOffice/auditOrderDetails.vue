/** * 订单审核(审核请求&&订单详情) */
<template>
  <div class="container-box">
    <div class="container-header">
      <h2>订单审核</h2>
    </div>
    <div class="container-body">
      <Row :gutter="16">
        <Col span="12">
        <Card class="container-inner">
          <p slot="title">审核信息</p>
          <Table :columns="col" :data="data" stripe></Table>
        </Card>

        </Col>
        <Col span="12">
        <Card class="container-inner">
          <p slot="title">订单信息</p>
          <ul>
            <li>
              <span class="mini-title">客户：</span>
              <span style="cursor: pointer; color: orange;" @click='toCustomerIndex'>
                <i class="ivu-icon ivu-icon-person"></i>
                <span>{{orderCustomer.name}}({{orderCustomer.id}})</span>
              </span>
            </li>
            <li v-for="item in orderDetailList">
              <span class="mini-title">{{ item.title}}：</span>
              {{item.value}}
            </li>
            <!-- 项目单 -->
            <li v-show="orderType == 'order'" v-for="item in orderInfo">
              <span class="mini-title">{{ item.title}}：</span>
              {{item.value}}
            </li>
            <!-- 退预收款单 -->
            <li v-show="orderType == 'rebateDeposit'" v-for="item in rebateDepositInfo">
              <span class="mini-title">{{ item.title}}：</span>
              {{item.value}}
            </li>
            <!-- 退项目单 -->
            <li v-show="orderType == 'back' || orderType=='backSales'" v-for="item in backInfo">
              <span class="mini-title">{{ item.title}}：</span>
              {{item.value}}
            </li>
            <!-- 开发人变更 && 咨询人员变更 -->
            <li v-show="orderType =='exploitChange' || orderType=='managerChange'" v-for="item in personChangeInfo">
              <span class="mini-title">{{ item.title}}：</span>
              {{item.value}}
            </li>
            <!-- 会员 -->
            <li v-show="orderType == 'member'" v-for="item in memberInfo">
              <span class="mini-title">{{ item.title}}：</span>{{item.value}}</li>
            <!-- 增加权益 && 删除权益 -->
            <li v-show="orderType=='addEquity' || orderType=='deleteEquity'" v-for="item in equityInfo">
              <span class="mini-title">{{ item.title}}：</span>
              {{item.value}}</li>
            <!-- 赠送券 -->
            <li v-show="orderType == 'addCoupon'" v-for="item in addCouponInfo">
              <span class="mini-title">{{ item.title}}：</span>
              {{item.value}}
            </li>
            <!-- 退券 -->
            <li v-show="orderType == 'rebateCoupon'" v-for="item in rebateCouponInfo">
              <span class="mini-title">{{ item.title}}：</span>
              {{item.value}}
            </li>
            <!-- 赠送积分 -->
            <li v-show="orderType == 'addPoint'" v-for="item in addPointInfo">
              <span class="mini-title">{{ item.title}}：</span>
              {{item.value}}
            </li>
            <!-- 扣减积分 -->
            <li v-show="orderType == 'rebatePoint'" v-for="item in rebatePointInfo">
              <span class="mini-title">{{ item.title}} ：</span>
              {{item.value}}
            </li>
            <!-- 积分兑换券 -->
            <li v-show="orderType == 'pointCoupon'" v-for="item in pointCouponInfo">
              <span class="mini-title">{{ item.title}} ：</span>
              {{item.value}}
            </li>
            <!-- 更换医生 -->
            <li v-show="orderType == 'orderDetailManager'" v-for="item in orderDetailManagerInfo">
              <span class="mini-title">{{ item.title}}：</span>
              {{item.value}}
            </li>
            <!-- 黑名单 -->
            <li v-show="orderType == 'blacklist'" v-for="item in blacklistInfo">
              <span class="mini-title">{{ item.title}}：</span>
              {{item.value}}
            </li>
            <!-- 转账 -->
            <li v-show="orderType == 'depositTransfer'" v-for="item in depositTransferInfo">
              <span class="mini-title">{{ item.title}}：</span>
              {{item.value}}
            </li>
            <!-- 欠款划扣 -->
            <li v-show="orderType == 'debtOperation'" v-for="item in debtOperationInfo">
              <span class="mini-title">{{ item.title}}：</span>
              {{item.value}}
            </li>
            <li v-show="!detailDataList">
              <span class="mini-title">申请原因：</span>{{content}}
            </li>
            <li v-show="detailDataList">
              <span class="mini-title">详细：</span>
              <table v-if="orderType == 'order'" class="tableEdit">
                <thead>
                  <tr class="table-item">
                    <td>项目编号</td>
                    <td>项目名称</td>
                    <td>数量</td>
                    <td>金额</td>
                    <td>成交金额</td>
                    <td>套餐</td>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in detailDataList" class="table-item">
                    <td>{{ item.chargeID }}</td>
                    <td>{{ item.chargeName }}</td>
                    <td>{{ item.num }}</td>
                    <td>{{ item.price }}</td>
                    <td>{{ item.finalprice }}</td>
                    <td>{{ item.setName }}</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>
                      <b>合计</b>
                    </td>
                    <td></td>
                    <td>
                      <b>{{orderInfoObj.totalprice}}</b>
                    </td>
                    <td>
                      <b>{{orderInfoObj.finalprice}}</b>
                    </td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
              <table v-else-if="orderType == 'rebateDeposit'" class="tableEdit">
                <thead>
                  <tr class="table-item">
                    <td>预付款编号</td>
                    <td>类型</td>
                    <td>金额</td>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in detailDataList" class="table-item">
                    <td>{{item.depositid}}</td>
                    <td>{{item.depositChargeName}}</td>
                    <td>{{item.amount}}</td>
                  </tr>
                </tbody>
              </table>
              <table v-if="orderType == 'back' || orderType=='backSales'" class="tableEdit">
                <thead>
                  <tr class="table-item">
                    <td>项目编号</td>
                    <td>项目名称</td>
                    <td>数量</td>
                    <td>金额</td>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in detailDataList" class="table-item">
                    <td>{{ item.chargeID }} </td>
                    <td>{{ item.chargeName }}</td>
                    <td>{{ item.num }}</td>
                    <td>{{ item.amount }}</td>
                  </tr>
                </tbody>
              </table>
            </li>
          </ul>
        </Card>
        </Col>
      </Row>

    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        //左侧审核信息
        data: [],
        ruleList: [],
        auditContent: '',
        highest: {},
        col: [{
            title: '级别',
            key: 'level',
            width: 40,
          },
          {
            title: '审核人',
            render: (h, params) => {
              return h('ul', params.row.userList.map(item => {
                const _text = '【' + item.userHospitalName + '】 【' + item.userName + '】'
                return h('li', _text)
              }))
            }
          },
          {
            title: '审核意见',
            render: (h, params) => {
              let _box = []
              this.ruleList.map(item => {
                _box.push(item.level)
              })
              let _bool = _box.findIndex(val => {
                return val == params.row.level
              })
              if (_bool >= 0) {
                return h('p', this.ruleList[_bool].auditTime + ' ' + this.ruleList[_bool].userName + ' ' + this.ruleList[
                  _bool].status + ' ' + this.ruleList[_bool].content)
              } else {
                if (Object.is(this.highest.level, params.row.level)) {
                  return h('div', {
                    style: {
                      padding: '8px 0'
                    }
                  }, [
                    h('Input', {
                      props: {
                        type: 'textarea',
                        minRows: 2,
                        maxRows: 5,
                        placeholder: '请输入审核意见',
                        value: this.auditContent
                      },
                      style: {
                        marginBottom: '10px'
                      },
                      on: {
                        input: (val) => {
                          this.auditContent = val
                        },
                      }
                    }),
                    h('Button', {
                      props: {
                        type: 'primary',
                        size: 'small',
                        icon: 'checkmark'
                      },
                      style: {
                        marginRight: '30px'
                      },
                      on: {
                        click: () => {
                          this.auditEdit('1', this.auditId, this.detail.type, params.row.level, this.auditContent)
                        }
                      }
                    }, '审核通过'),
                    h('Button', {
                      props: {
                        type: 'error',
                        size: 'small',
                        icon: 'close'
                      },
                      on: {
                        click: () => {
                          this.auditEdit('0', this.auditId, this.detail.type, params.row.level, this.auditContent)
                        }
                      }
                    }, '审核不通过'),
                  ])
                }
              }
            }
          }
        ],
        auditId: '',
        detail: {},
        content: '',
        orderDetail: null,
        orderType: '',
        orderDetailList: [],
        orderCustomer: {},
        orderInfo: [],
        orderInfoObj: {},
        rebateDepositInfo: [],
        backInfo: [],
        personChangeInfo: [],
        memberInfo: [],
        equityInfo: [],
        addCouponInfo: [],
        rebateCouponInfo: [],
        addPointInfo: [],
        rebatePointInfo: [],
        pointCouponInfo: [],
        orderDetailManagerInfo: [],
        blacklistInfo: [],
        depositTransferInfo: [],
        debtOperationInfo: [],
        detailDataList: []
      }
    },
    created() {
      this.getDetail(this.$route.query.id, this.$route.query.type)
    },
    methods: {
      getDetail(id, type) {
        let _this = this,
          _obj = {}
        _this.$store.dispatch('setPageLoading', -1)
        _this.$http.getPage({
          url: 'guard-webManager/auditOrderDesk/order.jhtml',
          data: {
            id: id,
            type: type
          },
          success: function (res) {
						_this.$store.dispatch('setPageLoading', 1)
						// 左侧审核信息
						_this.highest = res.data.content.Level || {}
						_this.ruleList = res.data.content.auditList || []
						let _rule = res.data.content.Rule || {},
							_level = _rule.level || 0,
							_user = _rule.detailList || []
						for (let i = 1; i <= _level; i++) {
							_obj.userList = []
							_obj.level = i
							_this.data.push(_obj)
							_obj = {}
						}
						_user.map(item => {
							_this.data[item.level - 1].userList.push(item)
						})

						_this.auditId = res.data.content.Audit.id
						//审核请求类型
						_this.orderType = res.data.content.Rule.type
						//审核信息
						_this.detail = res.data.content.Rule
						//订单信息
						_this.orderDetail = res.data.content.Order
						//订单中的详情部分
						_this.detailDataList = _this.orderDetail.detailList
						//订单客户
						_this.orderCustomer.name = _this.orderDetail.customerName
						_this.orderCustomer.id = _this.orderDetail.customerID || _this.orderDetail.customerid
						//申请原因
						if (_this.orderDetail.content) {
							_this.content = _this.orderDetail.content
						}
						//订单基本信息
						_this.orderDetailList = [{
								title: '提交医院',
								value: _this.orderDetail.hospitalName
							},
							{
								title: '提交时间',
								value: _this.orderDetail.createtime || _this.orderDetail.createTime
							},
							{
								title: '提交用户',
								value: _this.orderDetail.createUserName
							}
						]
						//项目单
						_this.orderInfo = [{
								title: '原价',
								value: _this.orderDetail.totalprice
							},
							{
								title: '成交价',
								value: _this.orderDetail.finalprice
							},
							{
								title: '备注',
								value: _this.orderDetail.remark
							}
						]
						_this.orderInfoObj.totalprice = _this.orderDetail.totalprice
						_this.orderInfoObj.finalprice = _this.orderDetail.finalprice
						// 退预收款单
						_this.rebateDepositInfo = [{
								title: '退款金额',
								value: _this.orderDetail.deposit
							},
							{
								title: '备注',
								value: _this.orderDetail.remark
							}
						]
						// 退项目单
						_this.backInfo = [{
								title: '退款金额',
								value: _this.orderDetail.amount
							},
							{
								title: '备注',
								value: _this.orderDetail.remark
							}
						]
						// 开发人员&& 咨询人员变更
						_this.personChangeInfo = [{
								title: '原归属',
								value: _this.orderDetail.oldUserName
							},
							{
								title: '新归属',
								value: _this.orderDetail.newUserName
							}
						]
						//会员
						_this.memberInfo = [{
								title: '原会员',
								value: _this.orderDetail.oldMemberCategoryName
							},
							{
								title: '新会员',
								value: _this.orderDetail.newMemberCategoryName
							}
						]
						//增加权益 && 删除权益
						_this.equityInfo = [{
							title: '权益',
							value: _this.orderDetail.equityName
						}]
						// 赠送券
						_this.addCouponInfo = [{
								title: '劵类型',
								value: _this.orderDetail.categoryName
							},
							{
								title: '劵数量',
								value: _this.orderDetail.amount
							}
						]
						// 退券
						_this.rebateCouponInfo = [{
								title: '劵编号',
								value: _this.orderDetail.couponID
							},
							{
								title: '劵数量',
								value: _this.orderDetail.amount
							}
						]
						// 赠送积分
						_this.addPointInfo = [{
							title: '赠送积分数量',
							value: _this.orderDetail.amount
						}]
						// 扣减积分
						_this.rebatePointInfo = [{
							title: '扣减积分数量',
							value: _this.orderDetail.amount
						}]
						// 积分兑换券
						_this.pointCouponInfo = [{
								title: '兑换积分数量',
								value: _this.orderDetail.oldMemberCategoryName
							},
							{
								title: '劵数量',
								value: _this.orderDetail.newMemberCategoryName
							}
						]
						// 更换医生
						_this.orderDetailManagerInfo = [{
								title: '原医生',
								value: _this.orderDetail.oldUserName
							},
							{
								title: '新医生',
								value: _this.orderDetail.newUserName
							}
						]
						// 黑名单
						_this.blacklistInfo = []
						// 转账
						_this.depositTransferInfo = [{
								title: '转账对象',
								value: _this.orderDetail.toCustomerName
							},
							{
								title: '预收款编号',
								value: _this.orderDetail.depositID
							},
							{
								title: '预收款金额',
								value: _this.orderDetail.accout
							}
						]
						// 欠款划扣
						_this.debtOperationInfo = [];
          },
          error: function (res) {
            console.log(res.data.desc)
          }
        })
      },
      auditEdit(status, id, type, level, content) {
        var _this = this
        _this.$http.post({
          url: 'guard-webManager/auditOrderDesk/auditEdit.jhtml',
          data: {
            id: id,
            type: type,
            status: status,
            level: level,
            content: content
          },
          success: function (res) {
            if (res.data.code == 0) {
              _this.$Notice.success({
                title: '系统提示！',
                desc: '保存成功！'
              });
              _this.$router.push({
                path: '/auditOrderDesk'
              })
              console.log(res)
            } else {
              _this.$Notice.error({
                title: '系统提示！',
                desc: res.data.desc
              });
              console.log(res.data.desc)
            }
          },
          error: function (res) {
            _this.$Notice.error({
              title: '系统提示！',
              desc: res.data.desc
            });
            console.log(res);
          }
        })

      },
      toCustomerIndex() {
        var breadData = [{
            url: '/desktop',
            text: '桌面'
          },
          {
            url: '/customer',
            text: '客户管理'
          },
          {
            url: '/customerIndex',
            text: this.orderCustomer.name
          }
        ]
        sessionStorage.setItem("cusName", this.orderCustomer.name)
        sessionStorage.setItem("cusId", this.orderCustomer.id)
        this.$store.dispatch('setBreadData', breadData);
        this.$router.push({
          path: '/customerIndex',
          query: {
            id: this.orderCustomer.id
          }
        })
      }

    }
  }

</script>
<style lang="less" scoped>
  .container-inner {
    margin-bottom: 20px;
  }

  .container-inner li {
    padding: 10px 0;
  }

  .container-inner li .mini-title {
    display: inline-block;
    width: 120px;
  }

</style>
