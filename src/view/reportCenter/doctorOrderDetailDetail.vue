<!-- doctorOrderDetailDetail -->
<!-- 集团所有医生指定项目明细 -->
/**
 * 集团医生指定项目明细
 */

<template>
    <div class="container-box" ref="containerBox">
        <div class="container-header">
            <h2>集团医生指定项目明细</h2>
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
                <input name="status" :value="formSearch.status">
                <input name="adminToken" :value="adminToken">
            </form>
            <Form :label-width="80" inline :model="formSearch" ref='formSearch'>
                <Form-item label="提交日期" prop='startTime'>
                    <Date-picker :transfer='true' type="daterange" placement="bottom-start" placeholder="选择日期" :clearable="false" style="width: 190px" @on-change='setDate' :value='dateBox'></Date-picker>
                </Form-item>
                <Form-item label="医院" prop='hospitalId'>
                    <Select v-model="formSearch.hospitalId" clearable style="width:200px">
                        <Option v-for="item in hospList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </Form-item>
                <Form-item label="医生" prop='doctorUserId'>
                    <cmptHospChooseUser _placeHolder="选择用户" :_style="{width:'162px'}" :_userName="doctorUserName" v-on:setUserName="setDoctorUser"></cmptHospChooseUser>
                </Form-item>
                <Form-item label="项目" prop='chargeId'>
                    <Input v-model="chargeName" readonly icon="ios-search" placeholder="选择项目" @on-focus="showCharge" style='width:162px;'></Input>
                </Form-item>
                <Form-item label="状态 " prop='status'>
                    <Select v-model="formSearch.status" clearable style="width:200px">
                        <Option v-for="item in statusList" :value="item.id" :key="item.id">{{ item.name }}</Option>
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
			<Alert>
                <div v-html="TotalText">{{TotalText}}</div>
            </Alert>
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
            	TotalText: '',
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
                    customerId: '',
                    status: '',
                    chargeId: '',
                    hospitalId: ''
                },
                dateBox: [moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')],
                statusList: [
                	{id: 1, name: '未开始'},{id: 2, name: '进行中'},{id: 3, name: '已完成'}
                ],
                col: [
                    {
                        title: '序号',
                        width: 70,
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
                        title: '客户姓名',
                        key: 'customerName'
                    },
                    {
                        title: '年龄',
                        key: 'age'
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
                        title: '主诊医生',
                        key: 'doctorUserName'
                    },
                    {
                        title: '状态',
                        key: 'status',
                        render: (h, params) => {
                        	let color 
                        	let text
                        	switch(params.row.status){
                        		case 1:
	                        		text = '未开始'
	                        		color = 'red'
	                        		break
                        		case 2:
	                        		text = '进行中'
	                        		color = 'gray'
	                        		break
                        		case 3:
	                        		text = 'blue'
	                        		color = '已完成'
	                        		break
                        	}
                        	return h('span', {
                        		style: {
                                    color: color
                                }
                        	},text)
                        }
                    },
                    {
                        title: '购买数量',
                        key: 'num'
                    },
                    {
                        title: '退款数量',
                        key: 'backNum'
                    },
                    {
                        title: '完成数量',
                        key: 'operationNum'
                    },
                    {
                        title: '未完成数量',
                        key: 'restNum'
                    },
                    {
                        title: '成交金额',
                        key: 'finalPrice'
                    },
                    {
                        title: '退款金额',
                        key: 'backAmount'
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
                return this.$store.getters.getSelectAllComplainCategoryList
            },
            pageSize () {
                return this.$store.getters.getPageSize
            },
            exportPrefixURL () {
                return this.$store.getters.getExportPrefixURL + '/guard-webManager/excelExport/doctorOrderDetailDetail.jhtml'
            }
        },
        created () {
            this.getList(1, this.formSearch)
        },
        mounted () {
        	this.$store.dispatch('setSelectAllHospList', {});
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
                    url: 'guard-webManager/report/doctorOrderDetailDetail.jhtml',
                    data: form,
                    success: function(res){
                        if(res.data.code == 0) {
                            _vm.data = res.data.content.Page.content
                            _vm.total = res.data.content.Page.total
                            _vm.pageNumber = res.data.content.Page.pageNumber
                            _vm.totalPages = res.data.content.Page.totalPages
                            _vm.TotalText = res.data.content.TotalText
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
            setDoctorUser (data) {
            	this.doctorUserName = data.name
            	this.formSearch.doctorUserId = data.id
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
