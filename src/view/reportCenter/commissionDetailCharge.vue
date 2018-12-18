<!-- 集团渠道佣金明细 -->

/**
 * 渠道佣金明细-按项目
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
                <input name="chargeCategoryID" :value="formSearch.chargeCategoryID">
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
                <Form-item label="项目类型" prop='chargeCategoryID'>
                    <cmptCategoryChoose _placeHolder="选择项目类型" :_style="{width:'168px'}" :_categoryName="chargeCategoryName" v-on:setCategoryName="setCategoryName"></cmptCategoryChoose>
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
                menuRouteUrl: '/commissionDetailCharge',
                hospKey: true,
                show: false,
                adminToken: this.$token.readToken('adminToken') || '', exportKey: localStorage.getItem('exportKey'),
                chargeCategoryName: '',
                formSearch: {
                    startTime: moment().startOf('month').format('YYYY-MM-DD'),
                    endTime: moment().endOf('month').format('YYYY-MM-DD'),
                    hospitalID: '',
                    chargeCategoryID: '',
                },
                dateBox: [moment().startOf('month').format('YYYY-MM-DD'), moment().endOf('month').format('YYYY-MM-DD')],
                col: [
                    {
                        title: '项目分类',
                        key: 'chargeCategoryName'
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
                return this.$store.getters.getExportPrefixURL + '/guard-webManager/excelExport/storeCommissionChargeCalculate.jhtml'
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
                    url: 'guard-webManager/report/storeCommissionChargeCalculate.jhtml',
                    data: _vm.formSearch,
                    success: function(res){
                        if(res.data.code == 0) {
                            _vm.data = res.data.content.list || []
                            let _obj = {}
                            _obj.chargeCategoryName = '合计'
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
            setCategoryName (data) {
                this.formSearch.chargeCategoryID = data.id
                this.chargeCategoryName = data.name
            },
            handleReset (name) {
                this.$refs[name].resetFields()
                this.formSearch.startTime = moment().startOf('month').format('YYYY-MM-DD')
                this.formSearch.endTime = moment().endOf('month').format('YYYY-MM-DD')
                this.dateBox = [moment().startOf('month').format('YYYY-MM-DD'), moment().endOf('month').format('YYYY-MM-DD')]
                this.chargeCategoryName = ''
                this.getList()
            },
            exportTable () {
                this.$refs.formSubmit.submit()
            }
        }
    }
</script>
