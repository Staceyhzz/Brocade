<!-- userConsultDetail -->
<!-- 用户咨询明细 -->
/**
 * 用户咨询明细
 */

<template>
    <div class="container-box" ref="containerBox">
        <div class="container-header">
            <h2>用户咨询明细</h2>
            <ul class="header-btn-group">
                <li class="header-item" @click="exportTable" v-if="exportKey === '1'"><Icon type="ios-download-outline"></Icon>导出</li>
            </ul>
        </div>
        <div class="container-body">
            <form :action="exportPrefixURL" method="get" ref="formSubmit" v-show="show">
                <input name="startTime" :value="formSearch.startTime">
                <input name="endTime" :value="formSearch.endTime">
                <input name="deptId" :value="formSearch.deptId">
                <input name="customerId" :value="formSearch.customerId">
                <input name="symptomId" :value="formSearch.symptomId">
                <input name="tool" :value="formSearch.tool">
                <input name="adminToken" :value="adminToken">
            </form>
            <Form :label-width="60" inline :model="formSearch" ref='formSearch'>
                <Form-item label="提交日期" prop='startTime'>
                    <Date-picker :transfer='true' type="daterange" placement="bottom-start" placeholder="选择日期" :clearable="false" style="width: 190px" @on-change='setDate_1' :value='dateBox_1'></Date-picker>
                </Form-item>
                <Form-item label="咨询项目" prop='symptomId'>
                    <Select v-model="formSearch.symptomId" clearable style="width:200px">
                        <Option v-for="item in symptomList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </Form-item>
                <Form-item label="方式" prop='tool'>
                    <Select v-model="formSearch.tool" clearable style="width:200px">
                        <Option v-for="item in toolList" :value="item.code" :key="item.id">{{ item.name }}</Option>
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
                createUserName: '',
                formSearch: {
                    startTime: moment().format('YYYY-MM-DD'),
                    endTime: moment().format('YYYY-MM-DD'),
                    symptomId: '',
                    tool: '',
                    customerId: '',
                },
                dateBox_1: [moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')],
                col: [
                    {
                        title: '序号',
                        width: 40,
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
                        title: '客户编号',
                        key: 'customerID'
                    },
                    {
                        title: '客户姓名',
                        key: 'customerName'
                    },
                    {
                    	title: '提交医院',
                    	key: 'hospitalName'
                    },
                    {
                        title: '提交用户',
                        key: 'createUserName'
                    },
                    {
                        title: '咨询项目',
                        key: 'symptomName',
                        render: (h,params) => {
                        	let arr = []
                        	if(params.row.symptomName == null){
                        		arr = []
                        	} else {
                        		arr.push(params.row.symptomName)
                        	}
                        	if (params.row.symptomName2 == null){
                        		arr = arr
                        	} else {
                        		arr.push(params.row.symptomName2)
                        	}
                        	if (params.row.symptomName3 == null){
                        		arr = arr
                        	} else {
                        		arr.push(params.row.symptomName3)
                        	}
                        	if (params.row.symptomName4 == null){
                        		arr = arr
                        	} else {
                        		arr.push(params.row.symptomName4)
                        	}
                        	if (params.row.symptomName5 == null){
                        		arr = arr
                        	} else {
                        		arr.push(params.row.symptomName5)
                        	}
                        	return h('div', {
                                style: {
                                    padding: '4px 0'
                                }
                            }, arr.map(item => {
                                return h('p', {
                                    style: {
                                        padding: "2px 0"
                                    }
                                },item)
                            }))
                        }
                    },
                    {
                    	title: '咨询方式',
                    	key: 'toolName'
                    }, 
                    {
                        title: '咨询内容',
                        key: 'content'
                    }    
                ],
                data: [],
            }
        },
        computed: {
            symptomList () {
            	return this.$store.getters.getSelectAllSymptomInfoList
            },
            toolList () {
            	return this.$store.getters.getSelectToolList
            },
            pageSize () {
                return this.$store.getters.getPageSize
            },
            exportPrefixURL () {
                return this.$store.getters.getExportPrefixURL + '/guard-webManager/excelExport/userConsultDetail.jhtml'
            }
        },
        created () {
            this.getList(1, this.formSearch)
        },
        mounted () {
            this.$store.dispatch('setSelectAllSymptomInfoList', {})
            this.$store.dispatch('setSelectToolList', {})
        },
        methods: {
            getList(pageNumber, form) {
                let _vm = this
                _vm.$store.dispatch('setPageLoading', -1)
                form['pageNumber'] = pageNumber
                form['pageSize'] = _vm.pageSize
                _vm.pageLodading = true
                _vm.$http.get({
                    url: 'guard-webManager/report/userConsultDetail.jhtml',
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
            setDate_1 (date) {
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
                    this.dateBox_1 = [moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')]
                    this.getList(1, this.formSearch)
                }
            },
            exportTable () {
                this.$refs.formSubmit.submit()
            }
        }
    }
</script>
