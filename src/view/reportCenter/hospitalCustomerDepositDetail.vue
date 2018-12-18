<!-- hospitalCustomerDepositDetail -->
<!-- 医院客户预收款余额 -->
/**
 * 医院客户预收款余额
 */

<template>
    <div class="container-box" ref="containerBox">
        <div class="container-header">
            <h2>医院客户预收款余额</h2>
            <ul class="header-btn-group">
                <li class="header-item" @click="exportTable" v-if="exportKey === '1'"><Icon type="ios-download-outline"></Icon>导出</li>
            </ul>
        </div>
        <div class="container-body">
            <form :action="exportPrefixURL" method="get" ref="formSubmit" v-show="show">
                <input name="compare1" :value="formSearch.compare1">
                <input name="restDeposit" :value="formSearch.restDeposit">
                <input name="compare2" :value="formSearch.compare2">
                <input name="deposit" :value="formSearch.deposit">
                <input name="adminToken" :value="adminToken">
            </form>
            <Form inline :model="formSearch" ref='formSearch'>
                <Form-item :label-width="60" label="当前余额" prop='compare1'>
                	<Select v-model="formSearch.compare1" clearable style="width:100px;">
                        <Option v-for="item in compareList" :label="item" :value="item" :key="item">{{ item }}</Option>
                    </Select>
                </Form-item>
                <Form-item :label-width='1' prop='restDeposit'>
                    <Input type="text" v-model="formSearch.restDeposit" placeholder="输入金额" @on-enter="getList(1, formSearch)"></Input>
                </Form-item>
                <Form-item :label-width='110' label="累计获取预收款" prop='compare2'>
                	<Select v-model="formSearch.compare2" clearable style="width:100px;">
                        <Option v-for="item in compareList" :label="item" :value="item" :key="item">{{ item }}</Option>
                    </Select>
                </Form-item>
                <Form-item :label-width='1' prop='deposit'>
                    <Input type="text" v-model="formSearch.deposit" placeholder="输入金额" @on-enter="getList(1, formSearch)"></Input>
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
                compareList: ['>=','>','=','<=','<'],
                formSearch: {
                    compare1: '>=',
                    restDeposit: '',
                    compare2: '>=',
                    deposit: ''
                },
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
                        title: '客户编号',
                        key: 'customerID'
                    },
                    {
                        title: '客户姓名',
                        key: 'customerName'
                    },
                    {
                        title: '当前余额',
                        key: 'restDepositAmount',
                        render: (h, params) => {
                            let text = params.row.restDepositAmount.toFixed(2)
                            return h('span', text)
                        }
                    },
                    {
                        title: '累计获取预收款金额',
                        key: 'depositAmount',
                        render: (h, params) => {
                            let text = params.row.depositAmount.toFixed(2)
                            return h('span', text)
                        }
                    },
                    {
                        title: '第一次时间',
                        key: 'firstTime'
                    },
                    {
                        title: '最后一次时间',
                        key: 'lastTime'
                    }
                ],
                data: [],
                ssHospId: ''
            }
        },
        computed: {
        	totalNum  () {
                return this.total * 1
            },
            pageNum  () {
                return this.pageNumber * 1
            },
            pageSize () {
                return this.$store.getters.getPageSize
            },
            exportPrefixURL () {
                return this.$store.getters.getExportPrefixURL + '/guard-webManager/excelExport/hospitalCustomerDepositDetail.jhtml'
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
                    url: 'guard-webManager/report/hospitalCustomerDepositDetail.jhtml',
                    data: form,
                    success: function(res){
                        if(res.data.code == 0) {
                        	_vm.data = res.data.content.Page.content
                            _vm.total = res.data.content.Page.total
                            _vm.pageNumber = res.data.content.Page.pageNumber
                            _vm.totalPages = res.data.content.Page.totalPages
                            _vm.$store.dispatch('setPageLoading', 1)
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
                    this.getList(1, this.formSearch)
                }
            },
            exportTable () {
                this.$refs.formSubmit.submit()
            }
        }
    }
</script>
