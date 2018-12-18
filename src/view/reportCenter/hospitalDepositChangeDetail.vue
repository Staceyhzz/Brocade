<!-- hospitalDepositChangeDetail -->
<!-- 医院预收款变动明细 -->
/**
 * 医院预收款变动明细
 */

<template>
    <div class="container-box" ref="containerBox">
        <div class="container-header">
            <h2>医院预收款变动明细</h2>
            <ul class="header-btn-group">
                <li class="header-item" @click="exportTable" v-if="exportKey === '1'"><Icon type="ios-download-outline"></Icon>导出</li>
            </ul>
        </div>
        <div class="container-body">
            <form :action="exportPrefixURL" method="get" ref="formSubmit" v-show="show">
                <input name="startTime" :value="formSearch.startTime">
                <input name="endTime" :value="formSearch.endTime">
                <input name="customerId" :value="formSearch.customerId">
                <input name="adminToken" :value="adminToken">
            </form>
            <Form :label-width="60" inline :model="formSearch" ref='formSearch'>
                <Form-item label="提交日期" prop='startTime'>
                    <Date-picker :transfer='true' type="daterange" placement="bottom-start" placeholder="选择日期" :clearable="false" style="width: 180px" @on-change='setDate' :value='dateBox'></Date-picker>
                </Form-item>
                <Form-item label="客户编号" prop='customerId'>
                    <Input type="text" :maxlength='15' v-model.trim="formSearch.customerId" placeholder="请输入客户编号" @on-enter="getList(1, formSearch)"></Input>
                </Form-item>
                <ul class="header-btn-group not-float">
                    <li class="header-item" @click="getList(1, formSearch)"><Icon type="search"></Icon>查询</li>
                    <li class="header-item" @click="handleReset('formSearch')"><Icon type="refresh"></Icon>重置</li>
                </ul>
            </Form>
            <!-- <Alert>
                <div v-html='message'>{{message}}</div>
            </Alert> -->
            <Table stripe :columns="col" :data="data"></Table>
            <div class="table-page">
                <div class="table-info">当前第{{pageNumber}}页，共{{totalPages}}页，总共{{total}}条记录</div>
                <Page class="table-paginate" :total="total" @on-change='changePage' :current='pageNumber'></Page>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                show: false,
                adminToken: this.$token.readToken('adminToken') || '', exportKey: localStorage.getItem('exportKey'),
                total: 0,
                totalPages: 1,
                pageNumber: 1,
                formSearch: {
                    startTime: moment().format('YYYY-MM-DD'),
                    endTime: moment().format('YYYY-MM-DD'),
                    customerId: ''
                },
                dateBox: [moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')],
                col: [
                	{
                		title: '变动日期',
                		key: 'createTime',
                        render: (h, params) => {
                            const _text = moment(params.row.createTime).format('YYYY-MM-DD')
                            return h('span', _text)
                        }
                	},
                	{
                        title: '変动时间',
                        key: 'createDate'
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
                        title: '操作医院',
                        key: 'hospitalName'
                    },
                    {
                        title: '操作用户',
                        key: 'createUserName'
                    },
                    {
                        title: '预收款类型',
                        key: 'depositChargeName'
                    },
                    {
                        title: '预收款编号',
                        key: 'depositID'
                    },
                    {
                        title: '预收款医院',
                        key: 'depositHospitalName'
                    },
                    {
                        title: '变动类型',
                        key: 'inOutType',
                        render: (h,params) => {
                        	let _text
                        	if (params.row.inOutType == 1) {
                                _text = '入'
                            } else if (params.row.inOutType == 2) {
                            	_text = '出'
                            }
                            return h('span', _text)
                        }
                    },
                    {
                    	title: '类型',
                    	key: 'type',
                    	render: (h, params) => {
                    		let _text
                    		if (params.row.inOutType == 1 && params.row.type == 1) {
                                _text = '预收款充值'
                            } else if (params.row.inOutType == 1 && params.row.type == 2) {
                                _text = '退单'
                            } else if (params.row.inOutType == 2 && params.row.type == 1) {
                                _text = '订单划扣'
                            } else if (params.row.inOutType == 2 && params.row.type == 5) {
                                _text = '退预收款'
                            }
                            return h('span', _text)
                        }
                    },
                    {
                    	title: '金额',
                        key: 'amount',
                        render: (h, params) => {
                            let text = params.row.amount.toFixed(2)
                            return h('span', text)
                        }
                    }
                ],
                data: [],
                ssHospId: ''
            }
        },
        computed: {
            pageSize () {
                return this.$store.getters.getPageSize
            },
            exportPrefixURL () {
                return this.$store.getters.getExportPrefixURL + '/guard-webManager/excelExport/hospitalDepositChangeDetail.jhtml'
            }
        },
        created () {
            this.getList(1, this.formSearch)
        },
        mounted () {
        },
        methods: {
            getList(pageNumber, form) {
                let _vm = this
                _vm.$store.dispatch('setPageLoading', -1)
                form['pageNumber'] = pageNumber
                form['pageSize'] = _vm.pageSize
                _vm.$http.get({
                    url: 'guard-webManager/report/hospitalDepositChangeDetail.jhtml',
                    data: form,
                    success: function(res){
                        if(res.data.code == 0) {
                        	// _vm.message = res.data.content.TotalText
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
                }
            },
            exportTable () {
                this.$refs.formSubmit.submit()
            }
        }
    }
</script>
