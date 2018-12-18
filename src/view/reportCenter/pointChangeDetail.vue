<!-- pointChangeDetail -->
<!-- 集团积分变动记录 -->

/**
 * 集团积分变动记录
 */

<template>
    <div class="container-box" ref="containerBox">
        <div class="container-header">
            <h2>集团积分变动记录</h2>
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
            <Form :label-width="80" inline :model="formSearch" ref='formSearch'>
                <Form-item label="提交日期" prop='startTime'>
                    <Date-picker :transfer='true' type="daterange" placement="bottom-start" placeholder="选择日期" :clearable="false" style="width: 190px" @on-change='setDate' :value='dateBox'></Date-picker>
                </Form-item>
                <Form-item label="医院" prop='hospitalId'>
                    <Select v-model="formSearch.hospitalId" clearable style="width:200px">
                        <Option v-for="item in hospitalList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
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
                message: '',
                totalPages: 1,
                pageNumber: 1,
                formSearch: {
                    startTime: moment().format('YYYY-MM-DD'),
                    endTime: moment().format('YYYY-MM-DD'),
                    hospitalId: ''
                },
                dateBox: [moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')],
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
                        title: '日期',
                        render: (h, params) => {
                            const _text = moment(params.row.createTime).format('YYYY-MM-DD')
                            return h('span', _text)
                        }
                    },
                    {
                        title: '时间',
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
                        title: '医院',
                        key: 'hospitalName'
                    },
                    {
                        title: '提交用户',
                        key: 'createUserName'
                    },
                    {
                        title: '类型',
                        key: 'type',
                        render: (h, params) => {
                        	let text
                        	switch(params.row.type) {
                        		case 11:
                        			text = '手工赠送'
                        			break
                    			case 12:
                        			text = '消费赠送'
                        			break
                    			case 21:
                        			text = '手工扣减'
                        			break
                    			case 22:
                        			text = '兑换券'
                        			break
                    			case 23:
                        			text = '兑换产品'
                        			break
                    			case 24:
                        			text = '退款扣减'
                        			break
                    			case 25:
                        			text = '退单扣减'
                        			break
                        	}
                        	return h('span', text)
                        }
                    },
                    {
                    	title: '积分',
                    	key: 'amount'
                    },
                    {
                        title: '消费金额',
                        key: 'consumeAmount',
                        render: (h, params) => {
                        	let text = params.row.amount.toFixed(2)
                        	return h('span', text)
                        }
                    },
                    {
                    	title: '备注',
                    	key: 'remark'
                    }
                ],
                data: [],
            }
        },
        computed: {
            pageSize () {
                return this.$store.getters.getPageSize
            },
            hospitalList () {
                return this.$store.getters.getSelectAllHospList
            },
            exportPrefixURL () {
                return this.$store.getters.getExportPrefixURL + '/guard-webManager/excelExport/pointChangeDetail.jhtml'
            }
        },
        created () {
            this.getList(1, this.formSearch)
        },
        mounted () {
            this.$store.dispatch('setSelectAllHospList', {})
        },
        methods: {
            getList(pageNumber, form) {
                let _vm = this
                _vm.$store.dispatch('setPageLoading', -1);
                form['pageNumber'] = pageNumber
                form['pageSize'] = _vm.pageSize
                _vm.pageLodading = true
                _vm.$http.get({
                    url: 'guard-webManager/report/pointChangeDetail.jhtml',
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
                }
            },
            exportTable () {
                this.$refs.formSubmit.submit()
            }
        }
    }
</script>
