<!-- 集团渠道佣金明细 -->

/**
 * 渠道佣金明细-按时间
 */

<template>
    <div class="container-box">
        <div class="container-body">
            <Menu mode="horizontal" :active-name="menuRouteUrl" @on-select='toMenu'>
                <Menu-item name="/commissionDetail">明细表</Menu-item>
                <Menu-item name="/commissionDetailTime">按时间分析</Menu-item>
                <Menu-item name="/commissionDetailCharge">按项目分析</Menu-item>
                <Menu-item name="/commissionDetailStore">按渠道商分析</Menu-item>
                <Menu-item name="/commissionDetailHosp">按医院分析</Menu-item>
            </Menu>
            <div style="overflow:hidden;paddingTop:5px;">
                <ul class="header-btn-group">
                    <li class="header-item" @click="exportTable" v-if="exportKey === '1'"><Icon type="ios-download-outline"></Icon>导出</li>
                </ul>
            </div>
            <form :action="exportPrefixURL" method="get" ref="formSubmit" v-show="show">
                <input name="startTime" :value="formSearch.startTime">
                <input name="endTime" :value="formSearch.endTime">
                <input name="hospitalID" :value="formSearch.hospitalID">
                <input name="dimension" :value="formSearch.dimension">
                <input name="dateType" :value="formSearch.dateType">
                <input name="adminToken" :value="adminToken">
            </form>
            <Form :label-width="60" inline :model="formSearch" ref='formSearch'>
                <Form-item label="医院" prop='hospitalID' v-if='hospKey'>
                    <Select v-model="formSearch.hospitalID" style="width:200px" :clearable='true'>
                        <Option v-for="item in hospList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </Form-item>
                <Form-item label="收银日期" prop='startTime'>
                    <Date-picker :transfer='true' type="daterange" placement="bottom-start" placeholder="选择日期" :clearable="false" style="width: 190px" @on-change='setDate' :value='dateBox'></Date-picker>
                </Form-item>
                <Form-item label="日期类型" prop='dateType'>
                    <Select v-model="formSearch.dateType" style="width:168px">
                        <Option :value="1">收银日期</Option>
                        <Option :value="2">结算日期</Option>
                    </Select>
                </Form-item>
                <Form-item label="日期维度" prop='dimension'>
                    <Select v-model="formSearch.dimension" style="width:60px">
                        <Option :value="1">日</Option>
                        <Option :value="2">周</Option>
                        <Option :value="3">月</Option>
                        <Option :value="4">年</Option>
                    </Select>
                </Form-item>
                <ul class="header-btn-group not-float">
                    <li class="header-item" @click="getList()"><Icon type="search"></Icon>查询</li>
                    <li class="header-item" @click="handleReset('formSearch')"><Icon type="refresh"></Icon>重置</li>
                </ul>
            </Form>
            <Table stripe :columns="col" :data="data"></Table>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                menuRouteUrl: '/commissionDetailTime',
                hospKey: true,
                show: false,
                key: true,
                adminToken: this.$token.readToken('adminToken') || '', exportKey: localStorage.getItem('exportKey'),
                formSearch: {
                    startTime: moment().startOf('month').format('YYYY-MM-DD'),
                    endTime: moment().endOf('month').format('YYYY-MM-DD'),
                    hospitalID: '',
                    dimension: 1,
                    dateType: 1,
                },
                dateBox: [moment().startOf('month').format('YYYY-MM-DD'), moment().endOf('month').format('YYYY-MM-DD')],
                col: [
                    {
                        renderHeader: (h, params) => {
                            let _text = ''
                            if(this.key) {
                                _text = '收银日期'
                            } else {
                                _text = '结算日期'
                            }
                            return h('span', _text)
                        },
                        key: 'cashierTime'
                    },
                    {
                        title: '下单医院',
                        key: 'hospitalName'
                    },
                    {
                        title: '应收总额',
                        render: (h, params) => {
                            const _text = (params.row.amount).toFixed(2)
                            return h('span', _text)
                        }
                    },
                    {
                        title: '实收总额',
                        render: (h, params) => {
                            const _text = (params.row.cardAmount + params.row.cashAmount).toFixed(2)
                            return h('span', _text)
                        }
                    },
                    {
                        title: '余额支付',
                        render: (h, params) => {
                            const _text = (params.row.depositAmount).toFixed(2)
                            return h('span', _text)
                        }
                    },
                    {
                        title: '佣金结算总额',
                        render: (h, params) => {
                            if(params.row.confirmAmount || params.row.confirmAmount == 0) {
                                const _text = (params.row.confirmAmount).toFixed(2)
                                return h('span', _text)
                            }
                        }
                    },
                ],
                data: [],
            }
        },
        computed: {
            hospList () {
                return this.$store.getters.getSelectAllHospList
            },
            exportPrefixURL () {
                return this.$store.getters.getExportPrefixURL + '/guard-webManager/excelExport/storeCommissionTimeCalculate.jhtml'
            }
        },
        created () {
            if(localStorage.getItem('hospId') == 1) {
                this.hospKey = true
                this.$store.dispatch('setSelectAllHospList')
            } else {
                this.hospKey = false
                this.formSearch.hospitalID = localStorage.getItem('hospId')
            }
            this.getList()
        },
        methods: {
            toMenu (url) {
                let breadData = [
                    {
                        url: '/desktop',
                        text: '桌面'
                    },
                    {
                        url: '/reportCenter',
                        text: '报表中心'
                    },
                    {
                        url: url,
                        text: '渠道佣金明细'
                    }
                ]
                this.$store.dispatch('setBreadData', breadData)
                this.$router.push(url)
            },
            getList() {
                let _vm = this
                _vm.$store.dispatch('setPageLoading', -1)
                _vm.$http.get({
                    url: 'guard-webManager/report/storeCommissionTimeCalculate.jhtml',
                    data: _vm.formSearch,
                    success: function(res){
                        if(res.data.code == 0) {
                            if(_vm.formSearch.dateType === 1) {
                                _vm.key = true
                            } else {
                                _vm.key = false
                            }
                            _vm.data = res.data.content.list || []
                            let _obj = {}
                            _obj.cashierTime = '合计'
                            _obj.amount = res.data.content.totalAmount || 0
                            _obj.cardAmount = res.data.content.totalCardAmount || 0
                            _obj.cashAmount = res.data.content.totalCashAmount || 0
                            _obj.couponAmount = res.data.content.totalCouponAmount || 0
                            _obj.depositAmount = res.data.content.totalDepositAmount || 0
                            _obj.confirmAmount = res.data.content.totalConfirmAmount || 0
                            _vm.data.push(_obj)
                            _vm.$store.dispatch('setPageLoading', 1)
                            console.log(res)
                        } else {
                            console.log(res.data.desc)
                        }
                    },
                    error: function(res){
                        console.log(res)
                    }
                });
            },
            setDate (date) {
                this.formSearch.startTime = date[0]
                this.formSearch.endTime = date[1]
            },
            handleReset (name) {
                this.$refs[name].resetFields()
                this.formSearch.startTime = moment().startOf('month').format('YYYY-MM-DD')
                this.formSearch.endTime = moment().endOf('month').format('YYYY-MM-DD')
                this.dateBox = [moment().startOf('month').format('YYYY-MM-DD'), moment().endOf('month').format('YYYY-MM-DD')]
                this.getList()
            },
            exportTable () {
                this.$refs.formSubmit.submit()
            }
        }
    }
</script>
