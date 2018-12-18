/** * 提现申请 */
<template>
	<div class="container-box">
            <Modal
            :title="name"
            v-model="modal10"
            class-name="vertical-center-modal">
            <table style="width: 100%;" border="1">
                <div class="color">
                    <tr>
                        <th>序号</th>
                        <td>
                            <span>{{ tabledata.id }}</span>
                        </td>
                    </tr>
                    <tr>
                        <th>提交时间</th>
                        <td>
                            <span>{{ tabledata.tjtime }}</span>
                        </td>
                    </tr>
                    <tr>
                        <th>提现金额</th>
                        <td>
                            ￥<span>{{ tabledata.tjmoney }}</span>
                        </td>
                    </tr>
                    <tr>
                        <th>姓名</th>
                        <td>
                            <span>{{ tabledata.username }}</span>
                        </td>
                    </tr>
                    <tr>
                        <th>手机号码</th>
                        <td>
                            <span>{{ tabledata.telephone }}</span>
                        </td>
                    </tr>
                    <tr>
                        <th>佣金余额</th>
                        <td>
                            ￥<span>{{ tabledata.yjmoney }}</span>
                        </td>
                    </tr>
                </div>
            </table>
            <!-- <table style="width:100%;margin-top:30px;" border="1">
                <tr>
                    <th>申请提现余额</th>
                    <td>
                        ￥<span>{{ tabledata.forward }}</span>
                    </td>
                </tr>
                <tr>
                    <th>用户佣金余额</th>
                    <td>
                        ￥<span>{{ tabledata.usermoney }}</span>
                    </td>
                </tr>
                <tr>
                    <th>实际结算金额</th>
                    <td>
                        ￥<span>{{ tabledata.Actual }}</span>
                    </td>
                </tr>
                <tr>
                    <th style="height:100px;">支付凭证</th>
                    <td>
                        <img style="float:left;width:80px;height:80px;" :src="image" alt="">
                    </td>
                </tr>
            </table> -->
            <table style="width:100%;margin-top:30px;" border="1">
                <tr>
                    <th>操作人</th>
                    <td>
                        <span>{{ tabledata.czuser }}</span>
                    </td>
                </tr>
                <tr>
                    <th>操作时间</th>
                    <td>
                        <span>{{ tabledata.cztime }}</span>
                    </td>
                </tr>
                <tr>
                    <th>操作结果</th>
                    <td>
                        <span>{{ tabledata.paidStatus === 1 ? '已确认' :  tabledata.paidStatus === 0 ? '已拒绝' : ''}}</span>
                    </td>
                </tr>
            </table>
        </Modal>
		<div class="container-header">
		<h2>提现申请</h2>
		</div>
		<div class="container-body">
            <RadioGroup type="button" v-model="vertical" @on-change="shent">
                <Radio style="margin:0 20px 0 0;" :label="1">
                    <span>待确认({{ management }})</span>
                </Radio>
                <Radio :label="2">
                    <span>已确认({{ ment }})</span>
                </Radio>x
            </RadioGroup>
            <div style="margin:30px 0 0 0;" v-show="ent">
                <Form :label-width="60" inline ref='formValidate' :model='formValidate'>
                    <FormItem label="姓名" prop="name">
                        <Input v-model="formValidate.name" placeholder="请输入姓名"></Input>
                    </FormItem>
                    <FormItem label="手机号" prop="number">
                        <Input v-model="formValidate.number" placeholder="请输入手机号"></Input>
                    </FormItem>
                    <ul class="header-btn-group not-float">
                    <li class="header-item" @click="hand('formValidate')">
                        <Icon type="search"></Icon>查询</li>
                    <li class="header-item" @click="Reset('formValidate')">
                        <Icon type="refresh"></Icon>重置</li>
                    </ul>
                </Form>
                <Table stripe :columns="col" :data="data"></Table>
                <div class="table-page">
                    <div style="float:right;margin: 20px 10px 0 0;">
                        <Page :total="dataCount" :current="pageNum" :page-size="pageSize" show-total class="paging" @on-change="changepage"></Page>
                    </div>
                </div>
            </div>
             <div style="margin:30px 0 0 0;" v-show="rnt">
                <Form :label-width="60" inline ref='formdata' :model='formdata'>
                    <FormItem label="姓名" prop="name">
                        <Input v-model="formdata.name" placeholder="请输入姓名"></Input>
                    </FormItem>
                    <FormItem label="手机号" prop="number">
                        <Input v-model="formdata.number" placeholder="请输入手机号"></Input>
                    </FormItem>
                    <ul class="header-btn-group not-float">
                    <li class="header-item" @click="hand('formdata')">
                        <Icon type="search"></Icon>查询</li>
                    <li class="header-item" @click="Reset('formdata')">
                        <Icon type="refresh"></Icon>重置</li>
                    </ul>
                </Form>
                <Table stripe :columns="col2" :data="data2"></Table>
                <div class="table-page">
                    <div style="float:right;margin: 20px 10px 0 0;">
                        <Page :total="dataCountt" :current="pageNum" :page-size="pageSize" show-total class="paging" @on-change="changepage"></Page>
                    </div>
                </div>
            </div>
		</div>
	</div>
</template>

<script>
export default {
    data() {
      	return {
            name: '',
            image: '',
            paidzf: [
                {
                    id: 0,
                    name: '待支付确认',
                },
                {
                    id: 1,
                    name: '支付',
                },
                {
                    id: 2,
                    name: '已取消',
                },
                {
                    id: 3,
                    name: '已关闭',
                },
                {
                    id: 4,
                    name: '可使用',
                },
                {
                    id: 5,
                    name: '治疗完成',
                },
                {
                    id: 8,
                    name: '退款中',
                },
                {
                    id: 9,
                    name: '退款成功',
                }
            ],
            shertList: [],
            orderid: '',
            tabledata: {
                id: '',
                tjtime: '',
                tjmoney: '',
                username: '',
                telephone: '',
                yjmoney: '',
                forward: '',
                usermoney: '',
                Actual: '',
                czuser: '',
                paidStatus: '',
                cztime: '',
                uploadList: []
            },
            modal10: false,
            pageNumber: 1,
            ajaxHistoryData:[],
            // 初始化信息总条数
            dataCountt: 0,
            dataCount: 0, // 初始化信息总条数
            pageNum: 1, // 页数
            pageSize: 10,
            type: null,
            management: '',
            ment: '',
            ent: 1,
			rnt: false,
            vertical: 1,
            formValidate: {
                name: '',
                number: ''
            },
            ruleValidate: {

            },
            formdata: {
                name: '',
                number: ''
            },
            ruleValidate: {

            },
            col: [
				{
					title: '序号',
                    key: 'id',
				},
                {
                    title: '提交时间',
                    key: 'createTime'
                },
                {
                    title: '提交金额',
                    key: 'amount'
                },
                {
                    title: '姓名',
                    key: 'name',
                    render: (h, params) => {
                        return h('p', {
                            on: {
                                click: () => {
                                    this.toCus(params.row.promoterID, params.row.promoterName)
                                }
                            },
                            style: {
                                cursor: 'pointer',
                                color: 'orange'
                            }
                        }, [
                            h('Icon', {
                                props: {
                                    type: "person"
                                }
                            }),
                            h('span', params.row.promoterName)
                        ])
                    }
                },
                {
                    title: '手机',
                    key: 'mobile'
                },
                {
                    title: '佣金余额',
                    key: 'balance'
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 150,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.showw(params.row)
                                    }
                                }
                            }, '确认支付'),
                        ]);
                    }
                }
            ],
            data: [],
            col2: [
				{
					title: '序号',
					render: (h, params) => {
						const _index = (this.pageNumber - 1) * 10
						return h('span', params.index + 1 + _index)
					}
				},
                {
                    title: '提交时间',
                    key: 'createTime'
                },
                {
                    title: '提交金额',
                    key: 'amount'
                },
                {
                    title: '姓名',
                    key: 'name',
                    render: (h, params) => {
                        return h('p', {
                            on: {
                                click: () => {
                                    this.toCus(params.row.promoterID, params.row.promoterName)
                                }
                            },
                            style: {
                                cursor: 'pointer',
                                color: 'orange'
                            }
                        }, [
                            h('Icon', {
                                props: {
                                    type: "person"
                                }
                            }),
                            h('span', params.row.promoterName)
                        ])
                    }
                },
                {
                    title: '手机',
                    key: 'mobile'
                },
                {
                    title: '佣金余额',
                    key: 'balance'
                },
                {
                    title: '状态',
                    render: (h, params) => {
                        const text = params.row.paidStatus === 1 ? '已确认' : '已拒绝';
                        return h('span', text);
                    }
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 150,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.show(params.row)
                                    }
                                }
                            }, '查看'),
                        ]);
                    }
                }
            ],
            data2: []
      	}
    },
    created() {
        this.$store.dispatch('setPageLoading', 1)
        // 提现列表
        this.confirmed()
    },
    methods: {
        // 提现列表
        confirmed() {
            var self = this
			self.$http.getPage({
				url: '/guard-webManager/Comission/list.jhtml',
				data: {
					pageSize : self.pageSize,
                    pageNumber : self.pageNum,
                    paidStatus : self.type,
                    name : !self.ent ? self.formdata.name : self.formValidate.name, 
                    mobile : !self.ent ? self.formdata.number : self.formValidate.number
				},
				success(res) {
                    console.log('提现列表')
                    console.log(res)
                    self.data = res.data.content.unpaid.content
                    self.management = res.data.content.unpaid.total
                    self.data2 = res.data.content.alreadypaid.content
                    self.ment = res.data.content.alreadypaid.total

                    self.dataCount = res.data.content.alreadypaid.total
                    self.pageNum = res.data.content.alreadypaid.pageNumber
                    self.dataCountt = res.data.content.alreadypaid.total
                    // 判断page
                    console.log('asdasd')
                    console.log(res.data.content.unpaid.total)
					if(self.type == 2){
                        self.ajaxHistoryData = rres.data.content.alreadypaid.content
                        self.dataCountt = res.data.content.alreadypaid.total
                       // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
                        if (res.data.content.alreadypaid.total < self.pageSize) {
                            self.data2 = self.ajaxHistoryData;
                        } else {
                            self.data2 = self.ajaxHistoryData.slice(0, self.pageSize);
                        }
                    }
					// 判断page
					if(res){
                        self.ajaxHistoryData = res.data.content.unpaid.content
                        self.dataCount = res.data.content.unpaid.total
                       // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
                        if (res.data.content.unpaid.total < self.pageSize) {
                            self.data = self.ajaxHistoryData;
                        } else {
                            self.data = self.ajaxHistoryData.slice(0, self.pageSize);
                        }
                    }
				},
				error(res) {
				    // console.log(res);
				}
			});
        },
            // 分页
        changepage (index) {
            this.pageNum = index;
            this.confirmed()
        },
        hand (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.confirmed()
                } else {
                }
            })
        },
        Reset (name) {
            this.$refs[name].resetFields();
            this.confirmed()
        },
        shent() {
			console.log(this.vertical)
			if(this.vertical == 1) {
				this.type = 1
				console.log('type0')
				console.log(this.type)
				this.confirmed()
				this.ent = true
				this.rnt = false
			} else if (this.vertical == 2) {
				this.type = 2
				console.log('type1')
				console.log(this.type)
				this.confirmed()
				this.ent = false
				this.rnt = true
			}
		},
        //跳转详情
        toCus(id, name) {
            let breadData = [
                {
                url: '/desktop',
                text: '桌面'
                },
                {
                    url: '/putforward',
                    text: '提现申请'
                },
                {
                    url: '/recordPromoterRecord',
                    text: name
                }
            ]
            this.$store.dispatch('setBreadData', breadData)
            this.$router.push({
                path: '/recordPromoterRecord',
                query: {
                    id: id
                }
            })
        },
        // 确认支付
        show(data) {
            this.modal10 = true
            this.paidzf = data.paidStatus
            this.name = ''
            // if (this.paidzf == 1) {
            //     this.name = '待支付' 
            // } else if (this.paidzf == 2) {
            //     this.name = '已支付'
            // } else if (this.paidzf == 3) {
            //     this.name = '已关闭'
            // } else if (this.paidzf == 4) {
            //     this.name = '可使用'
            // } else if (this.paidzf == 5) {
            //     this.name = '治疗完成'
            // } else if (this.paidzf == 8) {
            //     this.name = '退款中'
            // } else if (this.paidzf == 9) {
            //     this.name = '退款成功'
            // }
            this.tabledata.id = data.id
            this.tabledata.tjtime = data.createTime
            this.tabledata.tjmoney = data.amount
            this.tabledata.username = data.promoterName
            this.tabledata.telephone = data.mobile
            this.tabledata.yjmoney = data.balance
            this.tabledata.forward = data.amount
            this.tabledata.usermoney = data.balance
            this.tabledata.czuser = data.createUserName
            this.tabledata.cztime = data.createTime
            this.tabledata.paidStatus = data.paidStatus
            this.image = data.imageurl
            this.tabledata.Actual = data.passMoney
        },
        showw(data) {
            this.$router.push({
                path: '/handle',
                query: {
                    id: data.id,
                }
            })
            console.log(data.id)
        }
    }
}

</script>
<style lang='less' scoped>
table {
    border-color: #c9c9c9;
}
input {
    outline: none;
    border: none;
}
th {
    width: 200px;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    text-align: center;
}
td {
    width: 400px;
    font-size: 14px;
    padding: 0 0 0 20px;
}
.color th {
    background: #f2f2f2;
}
</style>