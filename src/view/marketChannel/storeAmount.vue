/**
 * 账户余额明细
 */

<template>
    <div class="container-box">
        <div class="container-header">
            <h2>账户余额明细</h2>
        </div>
        <div class="container-body">
            <Table stripe :columns="col" :data="data"></Table>
            <div class="footer-btnGroup">
                <Button type="primary"  icon="android-arrow-back" @click='back'>返回</Button>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                col: [
                    {   
                        title: '序号',
                        type: 'index',
                        width: 60
                    },
                    {
                        title: '日期',
                        key: 'time',
                        sortable: true
                    },
                    {
                        title: '客户',
                        render: (h, params) => {
                            if(params.row.key) {
                                return h('p', {
                                    on: {
                                        click: () => {
                                            this.toCus(params.row.customerName, params.row.customerID)
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
                                    h('span', params.row.customerName)
                                ])
                            }
                        }
                    },
                    {
                        title: '类型',
                        key: 'type'
                    },
                    {
                        title: '项目',
                        key: 'chargeName'
                    },
                    {
                        title: '金额',
                        key: 'price'
                    },
                    {
                        title: '渠道抽成',
                        key: 'amount'
                    },
                    {
                        title: '收支记录',
                        render: (h, params) => {
                            const _color = params.row.money > 0 ? 'blue' : 'red'
                            const _text = params.row.money > 0 ? '+' + (params.row.money).toFixed(2) : params.row.money
                            return h('span', {
                                style: {
                                    color: _color
                                }
                            }, _text)
                        }
                    },
                ],
                data: [],
                orderType: [
                    {
                        id: 1,
                        name: '项目单'
                    },
                    {
                        id: 4,
                        name: '退项目单'
                    },
                    {
                        id: 10,
                        name: '还款单'
                    },
                ],
            }
        },
        created () {
            this.getId(sessionStorage.getItem('storeId'))
        },
        methods: {
            getId (id) {
                let _vm = this
                _vm.data = []
                _vm.$store.dispatch('setPageLoading', -1)
                _vm.$http.get({
                    url: 'guard-webManager/store/amountRecord.jhtml',
                    data: {storeID: id},
                    success: function(res){
                        if(res.data.code == 0 ){
                            console.log(res)
                            let _list1 = res.data.content.commissionList.map(item => {
                                item.time = item.confirmDate
                                item.price = (item.cardAmount + item.cashAmount + item.couponAmount + item.depositAmount).toFixed(2)
                                item.amount = (item.confirmAmount).toFixed(2)
                                item.money = item.confirmAmount
                                item.key = true
                                item.type = _vm.orderType.filter(item1 => item1.id == item.orderType)[0].name
                                _vm.data.push(item)
                            })
                            let _list2 = res.data.content.payList.map(item => {
                                item.time = item.createTime
                                item.money = -item.amount
                                item.amount = null
                                item.type = '佣金付款'
                                item.key = false
                                _vm.data.push(item)
                            })
                            _vm.$store.dispatch('setPageLoading', 1)
                        } else {
                            console.log(res.data.desc)
                        }
                    },
                    error: function(res){
                        console.log(res)
                    }
                })
            },
            back () {
                this.$router.back(-1)
            },
            toCus (name, id) {
                let breadData = [
                    {
                        url: '/desktop',
                        text: '桌面'
                    },
                    {
                        url: '/customer',
                        text: '客户管理'
                    },
                    {
                        url: '/customerIndex',
                        text: name
                    }
                ]
                this.$store.dispatch('setBreadData', breadData);
                this.$router.push({
                    path: '/customerIndex',
                    query: {
                        id: id
                    }
                })
                sessionStorage.setItem('cusId', id)
                sessionStorage.setItem('cusName', name)
            },
        }
    }
</script>



