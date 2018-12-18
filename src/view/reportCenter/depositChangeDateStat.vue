<!-- depositChangeDateStat -->
<!-- 集团预收款变动日统计 -->
/**
 * 预收款变动日统计
 */

<template>
    <div class="container-box" ref="containerBox">
        <div class="container-header">
            <h2>预收款变动日统计</h2>
            <ul class="header-btn-group">
                <li class="header-item" @click="exportTable" v-if="exportKey === '1'"><Icon type="ios-download-outline"></Icon>导出</li>
            </ul>
        </div>
        <div class="container-body">
            <form :action="exportPrefixURL" method="get" ref="formSubmit" v-show="show">
                <input name="startTime" :value="formSearch.startTime">
                <input name="endTime" :value="formSearch.endTime">
                <input name="hospitalId" :value="formSearch.hospitalId">
                <input name="adminToken" :value="adminToken">
            </form>
            <Form :label-width="60" inline :model="formSearch" ref='formSearch'>
                <Form-item label="提交日期" prop='startTime'>
                    <Date-picker :transfer='true' type="daterange" placement="bottom-start" placeholder="选择日期" :clearable="false" style="width: 180px" @on-change='setDate' :value='dateBox'></Date-picker>
                </Form-item>
                <Form-item label="医院" prop='hospitalId' v-if='hospKey'>
                    <Select v-model="formSearch.hospitalId" clearable style="width:200px">
                        <Option v-for="item in hospList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </Form-item>
                <ul class="header-btn-group not-float">
                    <li class="header-item" @click="getList(formSearch)"><Icon type="search"></Icon>查询</li>
                    <li class="header-item" @click="handleReset('formSearch')"><Icon type="refresh"></Icon>重置</li>
                </ul>
            </Form>
            <!-- <Alert>
                <div v-html='message'>{{message}}</div>
            </Alert> -->
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
                // message: '',
                formSearch: {
                    startTime: moment().format('YYYY-MM-DD'),
                    endTime: moment().format('YYYY-MM-DD'),
                    hospitalId: ''
                },
                dateBox: [moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')],
                col: [
                	{
                        title: '日期',
                        key: 'createDate'
                    },
                    {
                        title: '期初总额',
                        key: 'startAmount'
                    },
                    {
                        title: '期末总额',
                        key: 'endAmount'
                    },
                    {
                        title: '变动金额',
                        key: 'changeAmount',
                        render: (h, params) => {
                            let text = params.row.changeAmount.toFixed(2)
                            return h('span', text)
                        }
                    },
                    {
                        title: '入总金额',
                        key: 'inAmount',
                        render: (h, params) => {
                            let text = params.row.inAmount.toFixed(2)
                            return h('span', text)
                        }
                    },
                    {
                        title: '入1（预收款充值）',
                        key: 'inAmount1',
                        render: (h, params) => {
                            let text = params.row.inAmount1.toFixed(2)
                            return h('span', text)
                        }
                    },
                    {
                    	title: '入2（退单）',
                    	key: 'inAmount2',
                        render: (h, params) => {
                            let text = params.row.inAmount2.toFixed(2)
                            return h('span', text)
                        }
                    },
                    {
                    	title: '出总金额',
                    	key: 'outAmount',
                        render: (h, params) => {
                            let text = params.row.outAmount.toFixed(2)
                            return h('span', text)
                        }
                    },
                    {
                        title: '出1（订单划扣）',
                        key: 'outAmount1',
                        render: (h, params) => {
                            let text = params.row.outAmount1.toFixed(2)
                            return h('span', text)
                        }
                    },
                    {
                        title: '出2（退预收款）',
                        key: 'outAmount2',
                        render: (h, params) => {
                            let text = params.row.outAmount2.toFixed(2)
                            return h('span', text)
                        }
                    }
                ],
                data: [],
                hospKey: true,
            }
        },
        computed: {
        	hospList () {
                return this.$store.getters.getSelectAllHospList
            },
            exportPrefixURL () {
                return this.$store.getters.getExportPrefixURL + '/guard-webManager/excelExport/depositChangeDateStat.jhtml'
            }
        },
        created () {
            if(localStorage.getItem('hospId') == 1) {
                this.hospKey = true
            } else {
                this.hospKey = false
                this.formSearch.hospitalId = localStorage.getItem('hospId')
            }
            this.getList(this.formSearch)
        },
        mounted () {
            if(this.hospKey) {
        	   this.$store.dispatch('setSelectAllHospList', {})
            }
        },
        methods: {
            getList(form) {
                let _vm = this
                _vm.$store.dispatch('setPageLoading', -1)
                _vm.$http.get({
                    url: 'guard-webManager/report/depositChangeDateStat.jhtml',
                    data: form,
                    success: function(res){
                        if(res.data.code == 0) {
                        	// _vm.message = res.data.content.TotalText
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
                    this.getList(this.formSearch);
                }
            },
            exportTable () {
                this.$refs.formSubmit.submit()
            }
        }
    }
</script>
