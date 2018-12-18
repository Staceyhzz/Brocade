<!-- userOperationDetail -->
<!-- 用户划扣记录 -->
/**
 * 用户划扣记录
 */

<template>
    <div class="container-box" ref="containerBox">
        <div class="container-header">
            <h2>用户划扣记录</h2>
            <ul class="header-btn-group">
                <li class="header-item" @click="exportTable" v-if="exportKey === '1'"><Icon type="ios-download-outline"></Icon>导出</li>
            </ul>
        </div>
        <div class="container-body">
            <form :action="exportPrefixURL" method="get" ref="formSubmit" v-show="show">
                <input name="startTime" :value="formSearch.startTime">
                <input name="endTime" :value="formSearch.endTime">
                <input name="chargeId" :value="formSearch.chargeId">
                <input name="itemId" :value="formSearch.itemId">
                <input name="itemGroupId" :value="formSearch.itemGroupId">
                <input name="orderHospitalId" :value="formSearch.orderHospitalId">
                <input name="customerId" :value="formSearch.customerId">
                <input name="adminToken" :value="adminToken">
            </form>
            <Form :label-width="80" inline :model="formSearch" ref='formSearch'>
                <Form-item label="提交日期" prop='startTime'>
                    <Date-picker :transfer='true' type="daterange" placement="bottom-start" placeholder="选择日期" :clearable="false" style="width: 190px" @on-change='setDate' :value='dateBox'></Date-picker>
                </Form-item>
                <Form-item label="项目" prop='chargeId'>
                    <Input v-model="chargeName" readonly icon="ios-search" placeholder="选择项目" @on-focus="showCharge" style='width:162px;'></Input>
                </Form-item>
                <Form-item label="意向分类" prop='itemGroupId'>
                    <Select v-model="formSearch.itemGroupId" clearable style="width:200px">
                        <Option v-for="item in itemGroupList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </Form-item>
                <Form-item label="消费意向" prop='itemId'>
                    <Select v-model="formSearch.itemId" clearable style="width:200px">
                        <Option v-for="item in itemList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </Form-item>
                <Form-item label="购买医院" prop='orderHospitalId'>
                    <Select v-model="formSearch.orderHospitalId" clearable style="width:200px">
                        <Option v-for="item in hospList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </Form-item>
                <Form-item label="客户编号" prop='customerId'>
                    <Input type="text" :maxlength='15' v-model.trim="formSearch.customerId" placeholder="请输入客户编号" @on-enter="getList(1, formSearch)"></Input>
                </Form-item>
                <ul class="header-btn-group not-float">
                    <li class="header-item" @click="getList(1, formSearch)"><Icon type="search"></Icon>查询</li>
                    <li class="header-item" @click="handleReset('formSearch')"><Icon type="refresh"></Icon>重置</li>
                </ul>
            </Form>

            <Table stripe :columns="col" :data="data"></Table>
            <div class="table-page">
                <div class="table-info">当前第{{pageNumber}}页，共{{totalPages}}页，总共{{total}}条记录</div>
                <Page class="table-paginate" :total="total" @on-change='changePage' :current='pageNumber'></Page>
            </div>
        </div>
        <cmptChargeChoose placeHolder="选择指定项目" @on-change="setCharge" :openKey='openKey'></cmptChargeChoose>
    </div>
</template>

<script>
	import cmptChargeChoose from 'components/chargeChoose.vue'
    export default {
        data () {
            return {
                openKey: false,
                show: false,
                adminToken: this.$token.readToken('adminToken') || '', exportKey: localStorage.getItem('exportKey'),
                total: 0,
                message: '',
                totalPages: 1,
                pageNumber: 1,
                chargeName: '',
                formSearch: {
                    startTime: moment().format('YYYY-MM-DD'),
                    endTime: moment().format('YYYY-MM-DD'),
                    customerId: '',
                    chargeId: '',
                    orderHospitalId: '',
                    itemId: '',
                    itemGroupId: ''
                },
                dateBox: [moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')],
                col: [
                    {
                        title: '序号',
                        width: 50,
                        render: (h, params) => {
                            const _index = (this.pageNumber - 1) * 10
                            return h('span', params.index + 1 + _index)
                        }
                    },
                    {
                        title: '划扣日期',
                        render: (h, params) => {
                            const _text = moment(params.row.createTime).format('YYYY-MM-DD')
                            return h('span', _text)
                        }
                    },
                    {
                        title: '划扣时间',
                        key: 'createTime'
                    },
                    {
                        title: '客户编号',
                        key: 'customerID'
                    },
                    {
                        title: '客户姓名',
                        key: 'customerName'
                    },
                    {
                        title: '执行医院',
                        key: 'hospitalName'
                    },
                    {
                        title: '操作用户',
                        key: 'createUserName'
                    },
                    {
                        title: '意向分类',
                        key: 'itemGroupName'
                    },
                    {
                        title: '消费意向',
                        key: 'itemName'
                    },
                    {
                        title: '项目编号',
                        key: 'chargeID'
                    },
                    {
                        title: '项目名称',
                        key: 'chargeName'
                    },
                    {
                        title: '单位',
                        key: 'chargeUnitName'
                    },
                    {
                        title: '数量',
                        key: 'num'
                    },
                    {
                        title: '备注',
                        key: 'remark'
                    },
                    {
                        title: '购买日期',
                        key: 'orderPaidTime'
                    },
                    {
                        title: '购买医院',
                        key: 'orderHospitalName'
                    },
                    {
                        title: '购买数量',
                        key: 'orderDetailNum'
                    },
                    {
                        title: '成交价',
                        key: 'orderDetailAmount',
                        render: (h, params) => {
                        	let text = params.row.orderDetailAmount.toFixed(2)
                        	return h('span', text)
                        }
                    },
                    {
                        title: '成交单价',
                        key: 'unitAmount',
                        render: (h, params) => {
                        	let text = params.row.unitAmount.toFixed(2)
                        	return h('span', text)
                        }
                    },
                    {
                        title: '参考金额',
                        key: 'amount',
                        render: (h, params) => {
                        	let text = params.row.amount.toFixed(2)
                        	return h('span', text)
                        }
                    }
                ],
                data: [],
            }
        },
        computed: {
            pageSize () {
                return this.$store.getters.getPageSize
            },
            hospList () {
                return this.$store.getters.getSelectAllHospList
            },
            itemList () {
                return this.$store.getters.getSelectAllItemList
            },
            itemGroupList () {
                return this.$store.getters.getSelectAllItemGroupList
            },
            exportPrefixURL () {
                return this.$store.getters.getExportPrefixURL + '/guard-webManager/excelExport/userOperationDetail.jhtml'
            }
        },
        created () {
            this.getList(1, this.formSearch)
        },
        mounted () {
        	this.$store.dispatch('setSelectAllHospList', {})
            this.$store.dispatch('setSelectAllItemList', {})
            this.$store.dispatch('setSelectAllItemGroupList', {})
        },
        components: {
            cmptChargeChoose
        },
        methods: {
            getList(pageNumber, form) {
                let _vm = this
                _vm.$store.dispatch('setPageLoading', -1);
                form['pageNumber'] = pageNumber
                form['pageSize'] = _vm.pageSize
                _vm.$http.get({
                    url: 'guard-webManager/report/userOperationDetail.jhtml',
                    data: form,
                    success: function(res){
                        if(res.data.code == 0) {
                            _vm.data = res.data.content.Page.content
                            _vm.total = res.data.content.Page.total
                            _vm.pageNumber = res.data.content.Page.pageNumber
                            _vm.totalPages = res.data.content.Page.totalPages
                            _vm.$store.dispatch('setPageLoading', 1);
                            console.log(res)
                        } else {
                            console.log(res.data.desc)
                        }
                    },
                    error: function(res){
                        console.log(res);
                    }
                });
            },
            showCharge () {
                this.openKey = !this.openKey;
            },
            setCharge (data) {
                this.chargeName = data.name
                this.formSearch.chargeId = data.id
            },
            setDate (date) {
                this.formSearch.startTime = date[0]
                this.formSearch.endTime = date[1]
            },
            changePage (num) {
                this.getList(num, this.formSearch)
            },
            handleReset (name) {
                this.$refs[name].resetFields();
                if(name == 'formSearch') {
                    this.formSearch.startTime = moment().format('YYYY-MM-DD')
                    this.formSearch.endTime = moment().format('YYYY-MM-DD')
                    this.dateBox = [moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')]
                    this.getList(1, this.formSearch)
                    this.chargeName = ''
                }
            },
            exportTable () {
                this.$refs.formSubmit.submit()
            }
        }
    }
</script>
