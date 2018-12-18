<!-- couponChangeDetail -->
<!-- 集团券变动明细 -->
/**
 * 集团券变动明细
 * 无导出
 */

<template>
    <div class="container-box" ref="containerBox">
        <div class="container-header">
            <h2>集团券变动明细</h2>
            <!-- <ul class="header-btn-group">
                <li class="header-item"><Icon type="ios-download-outline"></Icon>导出</li>
            </ul> -->
        </div>
        <div class="container-body">
            <Form :label-width="60" inline :model="formSearch" ref='formSearch'>
                <Form-item label="提交日期" prop='startTime'>
                    <Date-picker :transfer='true' type="daterange" placement="bottom-start" placeholder="选择日期" :clearable="false" style="width: 180px" @on-change='setDate' :value='dateBox'></Date-picker>
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
                <Page class="table-paginate" :total="totalNum" @on-change='changePage' :current='pageNum'></Page>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                total: '',
                // message: '',
                totalPages: '',
                pageNumber: '1',
                formSearch: {
                    status: 1,
                    startTime: moment().format('YYYY-MM-DD'),
                    endTime: moment().format('YYYY-MM-DD'),
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
                        title: '变动日期',
                        key: 'createDate',
                        render: (h, params) => {
                            const _text = params.row.createTime.split(' ')[0]
                            return h('span', _text)
                        }
                    },
                    {
                        title: '变动时间',
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
                    	title: '操作医院',
                    	key: 'hospitalName',
                    },
                    {
                    	title: '操作用户',
                    	key: 'createUserName',
                    },
                    {
                        title: '劵类型',
                        key: 'couponCategoryName'
                    },
                    {
                        title: '劵编号',
                        key: 'couponID'
                    },
                    {
                        title: '劵医院',
                        key: 'couponHospitalName'
                    },
                    {
                        title: '变动类型',
                        key: 'inOutType',
                        render: (h,params) => {
                        	let _text
                        	if(params.row.inOutType == 1) {
                        		_text = '入'
                        	} else if(params.row.inOutType == 2) {
                        		_text = '出'
                        	}
                        	return h('span', _text)
                        }
                    },
                    {
                        title: '类型',
                        key: 'type',
                        render: (h,params) => {
                        	let _text
                        	if(params.row.inOutType == 1 && params.row.type == 1){
                        		_text = '预收款'
                        	} else if(params.row.inOutType == 1 && params.row.type == 2){
                        		_text = '手工赠送'
                        	} else if(params.row.inOutType == 1 && params.row.type == 3){
                        		_text = '积分兑换'
                        	} else if(params.row.inOutType == 1 && params.row.type == 4){
                        		_text = '激活获取'
                        	} else if(params.row.inOutType == 2 && params.row.type == 1){
                        		_text = '订单划扣'
                        	} else if(params.row.inOutType == 2 && params.row.type == 2){
                        		_text = '退劵'
                        	}
                        	return h('span', _text)
                        }
                    },
                    {
                        title: '金额',
                        key: 'amount'
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
        },
        created () {
            this.getList(1, this.formSearch)
        },
        mounted () {
        },
        methods: {
            getList(pageNumber, form) {
                let _vm = this
                _vm.$store.dispatch('setPageLoading', -1);
                form['pageNumber'] = pageNumber
                form['pageSize'] = _vm.pageSize
                _vm.$http.get({
                    url: 'guard-webManager/report/couponChangeDetail.jhtml',
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
            }
        }
    }
</script>
