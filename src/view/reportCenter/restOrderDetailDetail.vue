<!-- 集团客户待消费明细 -->
/**
 * 集团客户待消费明细
 */

<template>
    <div class="container-box" ref="containerBox">
        <div class="container-header">
            <h2>集团客户待消费明细</h2>
            <ul class="header-btn-group">
                <li class="header-item" @click="exportTable" v-if="exportKey === '1'"><Icon type="ios-download-outline"></Icon>导出</li>
            </ul>
        </div>
        <div class="container-body">
            <form :action="exportPrefixURL" method="get" ref="formSubmit" v-show="show">
                <input name="startTime" :value="formSearch.startTime">
                <input name="endTime" :value="formSearch.endTime">
                <input name="hospitalId" :value="formSearch.hospitalId">
                <input name="chargeId" :value="formSearch.chargeId">
                <input name="customerId" :value="formSearch.customerId">
                <input name="doctorUserId" :value="formSearch.doctorUserId">
                <input name="customerName" :value="formSearch.customerName">
                <input name="adminToken" :value="adminToken">
            </form>
            <Form :label-width="80" inline :model="formSearch" ref='formSearch'>
                <Form-item label="购买日期" prop='startTime'>
                    <Date-picker :transfer='true' type="daterange" placement="bottom-start" placeholder="选择日期" :clearable="false" style="width: 190px" @on-change='setDate' :value='dateBox'></Date-picker>
                </Form-item>
                <Form-item label="医生" prop='doctorUserId'>
                    <cmptHospChooseUser _placeHolder="选择用户" :_style="{width:'162px'}" :_userName="doctorUserName" v-on:setUserName="setDoctorUser"></cmptHospChooseUser>
                </Form-item>
                <Form-item label="项目" prop='chargeId'>
                    <Input v-model="chargeName" readonly icon="ios-search" placeholder="选择项目" @on-focus="showCharge" style='width:162px;'></Input>
                </Form-item>
                <Form-item label="客户编号" prop='customerId'>
                    <Input type="text" :maxlength='15' v-model.trim="formSearch.customerId" placeholder="请输入客户编号" @on-enter="getList(1, formSearch)"></Input>
                </Form-item>
                <Form-item label="客户名称" prop='customerName'>
                    <Input type="text" :maxlength='15' v-model.trim="formSearch.customerName" placeholder="请输入名称" @on-enter="getList(1, formSearch)"></Input>
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
                doctorUserName: '',
                chargeName: '',
                formSearch: {
                    startTime: moment().format('YYYY-MM-DD'),
                    endTime: moment().format('YYYY-MM-DD'),
                    doctorUserId: '',
                    chargeId: '',
                    customerId: '',
                    customerName: '',
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
                        title: '购买日期',
                        render: (h, params) => {
                            const _text = moment(params.row.cashierTime).format('YYYY-MM-DD')
                            return h('span', _text)
                        }
                    },
                    {
                        title: '购买时间',
                        key: 'cashierTime'
                    },
                    {
                        title: '客户编号',
                        key: 'customerID'
                    },
                    {
                        title: '客户名称',
                        key: 'customerName'
                    },
                    {
                        title: '最近光临',
                        render: (h, params) => {
                            const _text = moment(params.row.lastVisitTime).format('YYYY-MM-DD')
                            return h('span', _text)
                        }
                    },
                    {
                        title: '现有余额',
                        key: 'deposit'
                    },
                    {
                        title: '现有劵额',
                        key: 'coupon'
                    },
                    {
                        title: '现有积分',
                        key: 'point'
                    },
                    {
                        title: '购买医院',
                        key: 'hospitalName'
                    },
                    {
                        title: '订单号',
                        key: 'orderID'
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
                        title: '咨询人员',
                        key: 'managerUserName'
                    },
                    {
                        title: '主诊医生',
                        key: 'doctorUserName'
                    },
                     {
                        title: '购买数量',
                        key: 'num'
                    },
                    {
                        title: '成交金额',
                        key: 'finalPrice'
                    },
                    {
                        title: '退款数量',
                        key: 'backNum'
                    },
                     {
                        title: '退款金额',
                        key: 'backAmount'
                    },
                    {
                        title: '划扣完成数量',
                        key: 'operationNum'
                    },
                    {
                        title: '剩余数量',
                        key: 'restNum'
                    }
                ],
                data: [],
            }
        },
        computed: {
            hospList () {
                return this.$store.getters.getSelectAllHospList
            },
            categoryList () {
                return this.$store.getters.getSelectAllFailtureCategoryList
            },
            pageSize () {
                return this.$store.getters.getPageSize
            },
            exportPrefixURL () {
                return this.$store.getters.getExportPrefixURL + '/guard-webManager/excelExport/restOrderDetailDetail.jhtml'
            }
        },
        created () {
            this.getList(1, this.formSearch)
        },
        mounted () {
            this.$store.dispatch('setSelectAllHospList', {});
            this.$store.dispatch('setSelectAllFailtureCategoryList', {});
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
                    url: 'guard-webManager/report/restOrderDetailDetail.jhtml',
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
            //获取弹窗用户
            setDoctorUser (data) {
                this.doctorUserName = data.name
                this.formSearch.doctorUserId = data.id
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
                    this.getList(1, this.formSearch);
                    this.doctorUserName = '',
                    this.chargeName = ''
                }
            },
            exportTable () {
                this.$refs.formSubmit.submit()
            }
        }
    }
</script>
