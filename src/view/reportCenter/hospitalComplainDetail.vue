<!-- 医院投诉明细 -->
/**
 * 医院投诉明细
 */

<template>
    <div class="container-box" ref="containerBox">
        <div class="container-header">
            <h2>医院投诉明细</h2>
            <ul class="header-btn-group">
                <li class="header-item" @click="exportTable" v-if="exportKey === '1'"><Icon type="ios-download-outline"></Icon>导出</li>
            </ul>
        </div>
        <div class="container-body">
            <form :action="exportPrefixURL" method="get" ref="formSubmit" v-show="show">
                <input name="startTime" :value="formSearch.startTime">
                <input name="endTime" :value="formSearch.endTime">
                <input name="targetUserId" :value="formSearch.targetUserId">
                <input name="customerId" :value="formSearch.customerId">
                <input name="status" :value="formSearch.status">
                <input name="adminToken" :value="adminToken">
            </form>
            <Form :label-width="60" inline :model="formSearch" ref='formSearch'>
                <Form-item label="提交日期" prop='startTime'>
                    <Date-picker :transfer='true' type="daterange" placement="bottom-start" placeholder="选择日期" :clearable="false" style="width: 190px" @on-change='setDate' :value='dateBox'></Date-picker>
                </Form-item>
                <Form-item label="投诉用户" prop='targetUserId'>
                    <cmptHospChooseUser _placeHolder="选择用户" :_style="{width:'162px'}" :_userName="targetUserName" v-on:setUserName="setTargetUser"></cmptHospChooseUser>
                </Form-item>
                <Form-item label="投诉类型" prop='categoryId'>
                    <Select v-model="formSearch.categoryId" clearable style="width:200px">
                        <Option v-for="item in categoryList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
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
                targetUserName: '',
                formSearch: {
                    startTime: moment().format('YYYY-MM-DD'),
                    endTime: moment().format('YYYY-MM-DD'),
                    customerId: '',
                    status: '',
                    targetUserId: ''
                },
                dateBox: [moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')],
                statusList: [
                	{id: 0, name: '未处理'},{id: 1, name: '已处理'}
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
                        title: '提交日期',
                        render: (h, params) => {
                            const _text = moment(params.row.createTime).format('YYYY-MM-DD')
                            return h('span', _text)
                        }
                    },
                    {
                        title: '提交时间',
                        key: 'createTime'
                    },
                    {
                        title: '提交用户',
                        key: 'createUserName'
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
                        title: '投诉医院',
                        key: 'hospitalName'
                    },
                    {
                        title: '投诉用户',
                        key: 'targetUserName'
                    },
                    {
                        title: '投诉类型',
                        key: 'categoryName'
                    },
                    {
                        title: '投诉项目',
                        key: 'chargeName'
                    },
                    {
                        title: '投诉内容',
                        key: 'content'
                    },
                    {
                        title: '状态',
                        key: 'status',
                        render: (h, params) => {
                        	const color = params.row.status == 1? 'blue':'red'
                        	const text = params.row.status == 1? '已处理':'未处理'
                        	return h('span', {
                        		style: {
                                    color: color
                                }
                        	},text)
                        }
                    },
                    {
                        title: '处理时间',
                        key: 'finishTime'
                    },
                    {
                        title: '处理用户',
                        key: 'finishUserName'
                    },
                    {
                        title: '处理措施',
                        key: 'solution'
                    },
                    {
                        title: '客户反馈',
                        key: 'feedback'
                    }
                ],
                data: [],
            }
        },
        computed: {
            categoryList () {
                return this.$store.getters.getSelectAllComplainCategoryList
            },
            pageSize () {
                return this.$store.getters.getPageSize
            },
            exportPrefixURL () {
                return this.$store.getters.getExportPrefixURL + '/guard-webManager/excelExport/hospitalComplainDetail.jhtml'
            }
        },
        created () {
            this.getList(1, this.formSearch)
        },
        mounted () {
            this.$store.dispatch('setSelectAllComplainCategoryList', {});
        },
        methods: {
            getList(pageNumber, form) {
                let _vm = this
                _vm.$store.dispatch('setPageLoading', -1);
                form['pageNumber'] = pageNumber
                form['pageSize'] = _vm.pageSize
                _vm.$http.get({
                    url: 'guard-webManager/report/hospitalComplainDetail.jhtml',
                    data: form,
                    success: function(res){
                        if(res.data.code == 0) {
                            _vm.data = res.data.content.Page.content
                            _vm.total = res.data.content.Page.total
                            _vm.pageNumber = res.data.content.Page.pageNumber
                            _vm.totalPages = res.data.content.Page.totalPages
                            // _vm.TotalText = res.data.content.TotalText
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
            setTargetUser (data) {
                this.targetUserName = data.name
                this.formSearch.targetUserId = data.id
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
                    this.targetUserName = ''
                }
            },
            exportTable () {
                this.$refs.formSubmit.submit()
            }
        }
    }
</script>
