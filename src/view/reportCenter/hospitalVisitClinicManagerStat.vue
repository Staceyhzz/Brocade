<!-- hospitalVisitClinicManagerStat -->
<!-- 医院咨询师到诊每日统计 -->
/**
 * 医院咨询师到诊每日统计
 */

<template>
    <div class="container-box" ref="containerBox">
        <div class="container-header">
            <h2>医院咨询师到诊每日统计</h2>
            <ul class="header-btn-group">
                <li class="header-item" @click="exportTable" v-if="exportKey === '1'"><Icon type="ios-download-outline"></Icon>导出</li>
            </ul>
        </div>
        <div class="container-body">
            <form :action="exportPrefixURL" method="get" ref="formSubmit" v-show="show">
                <input name="startTime" :value="formSearch.startTime">
                <input name="endTime" :value="formSearch.endTime">
                <input name="adminToken" :value="adminToken">
            </form>
            <Form :label-width="80" inline :model="formSearch" ref='formSearch'>
                <Form-item label="提交日期" prop='startTime'>
                    <Date-picker :transfer='true' type="daterange" placement="bottom-start" placeholder="选择日期" :clearable="false" style="width: 190px" @on-change='setDate' :value='dateBox'></Date-picker>
                </Form-item>
                <ul class="header-btn-group not-float">
                    <li class="header-item" @click="getList(formSearch)"><Icon type="search"></Icon>查询</li>
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
                show: false,
                adminToken: this.$token.readToken('adminToken') || '', exportKey: localStorage.getItem('exportKey'),
                formSearch: {
                    startTime: moment().format('YYYY-MM-DD'),
                    endTime: moment().format('YYYY-MM-DD'),
                },
                dateBox: [moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')],
                col: [
                    {
                        title: '咨询人员',
                        key: 'managerUserName'
                    },
                    {
                        title: '到诊人数',
                        key: 'num'
                    },
                    {
                        title: '成交人数',
                        key: 'dealNum'
                    },
                    {
                        title: '成交率',
                        key: 'dealPercent',
                        render: (h, params) => {
                            let text = ((params.row.dealPercent * 10000)/100).toFixed(2) + '%'
                            return h('span', text)
                        }
                    },
                    {
                        title: '新客人数',
                        key: 'newNum'
                    },
                    {
                    	title: '占比',
                    	key: 'newPercent',
                        render: (h, params) => {
                            let text = ((params.row.newPercent * 10000)/100).toFixed(2) + '%'
                            return h('span', text)
                        }
                    },
                    {
                        title: '新客成交人数',
                        key: 'newDealNum'
                    },
                    {
                        title: '新客成交率',
                        key: 'newDealPercent',
                        render: (h, params) => {
                            let text = ((params.row.newDealPercent * 10000)/100).toFixed(2) + '%'
                            return h('span', text)
                        }
                    },
                    {
                        title: '老客人数',
                        key: 'oldNum'
                    },
                    {
                    	title: '占比',
                    	key: 'oldPercent',
                        render: (h, params) => {
                            let text = ((params.row.oldPercent * 10000)/100).toFixed(2) + '%'
                            return h('span', text)
                        }
                    },
                    {
                        title: '老客成交人数',
                        key: 'oldDealNum'
                    },
                    {
                        title: '老客成交率',
                        key: 'oldDealPercent',
                        render: (h, params) => {
                            let text = ((params.row.oldDealPercent * 10000)/100).toFixed(2) + '%'
                            return h('span', text)
                        }
                    },
                    {
                        title: '初诊人数',
                        key: 'firstNum'
                    },
                    {
                    	title: '占比',
                    	key: 'firstPercent',
                        render: (h, params) => {
                            let text = ((params.row.firstPercent * 10000)/100).toFixed(2) + '%'
                            return h('span', text)
                        }
                    },
                    {
                        title: '初诊成交人数',
                        key: 'firstDealNum'
                    },
                    {
                        title: '初诊成交率',
                        key: 'firstDealPercent',
                        render: (h, params) => {
                            let text = ((params.row.firstDealPercent * 10000)/100).toFixed(2) + '%'
                            return h('span', text)
                        }
                    },
                    {
                        title: '复诊人数',
                        key: 'twiceNum'
                    },
                    {
                    	title: '占比',
                    	key: 'twicePercent',
                        render: (h, params) => {
                            let text = ((params.row.twicePercent * 10000)/100).toFixed(2) + '%'
                            return h('span', text)
                        }
                    },
                    {
                        title: '复诊成交人数',
                        key: 'twiceDealNum'
                    },
                    {
                        title: '复诊成交率',
                        key: 'twiceDealPercent',
                        render: (h, params) => {
                            let text = ((params.row.twiceDealPercent * 10000)/100).toFixed(2) + '%'
                            return h('span', text)
                        }
                    },
                    {
                        title: '再消费人数',
                        key: 'againNum'
                    },
                    {
                    	title: '占比',
                    	key: 'againPercent',
                        render: (h, params) => {
                            let text = ((params.row.againPercent * 10000)/100).toFixed(2) + '%'
                            return h('span', text)
                        }
                    },
                    {
                        title: '复查人数',
                        key: 'checkNum'
                    },
                    {
                        title: '占比',
                        key: 'checkPercent',
                        render: (h, params) => {
                            let text = ((params.row.checkPercent * 10000)/100).toFixed(2) + '%'
                            return h('span', text)
                        }
                    }
                ],
                data: [],
            }
        },
        computed: {
            exportPrefixURL () {
                return this.$store.getters.getExportPrefixURL + '/guard-webManager/excelExport/hospitalVisitClinicManagerStat.jhtml'
            }
        },
        created () {
            this.getList(this.formSearch)
        },
        mounted () {
        },
        methods: {
            getList(form) {
                let _vm = this
                _vm.$store.dispatch('setPageLoading', -1)
                _vm.$http.get({
                    url: 'guard-webManager/report/hospitalVisitClinicManagerStat.jhtml',
                    data: form,
                    success: function(res){
                        if(res.data.code == 0) {
                            _vm.data = res.data.content.List
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
            handleReset (name) {
                this.$refs[name].resetFields();
                if(name == 'formSearch') {
                    this.formSearch.startTime = moment().format('YYYY-MM-DD')
                    this.formSearch.endTime = moment().format('YYYY-MM-DD')
                    this.dateBox = [moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')]
                    this.getList(this.formSearch)
                }
            },
            exportTable () {
                this.$refs.formSubmit.submit()
            }
        }
    }
</script>

