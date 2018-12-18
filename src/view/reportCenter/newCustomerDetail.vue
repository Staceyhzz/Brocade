<!-- newCustomerDetail -->
<!-- 集团登记客户明细 -->
/**
 * 集团登记客户明细
 */

<template>
    <div class="container-box" ref="containerBox">
        <div class="container-header">
            <h2>集团登记客户明细</h2>
            <ul class="header-btn-group">
                <li class="header-item" @click="exportTable" v-if="exportKey === '1'"><Icon type="ios-download-outline"></Icon>导出</li>
            </ul>
        </div>
        <div class="container-body">
            <form :action="exportPrefixURL" method="get" ref="formSubmit" v-show="show">
                <input name="startTime" :value="formSearch.startTime">
                <input name="endTime" :value="formSearch.endTime">
                <input name="hospitalId" :value="formSearch.hospitalId">
                <input name="createUserId" :value="formSearch.createUserId">
                <input name="deptId" :value="formSearch.deptId">
                <input name="adminToken" :value="adminToken">
            </form>
            <Form :label-width="60" inline :model="formSearch" ref='formSearch'>
                <Form-item label="提交日期" prop='startTime'>
                    <Date-picker :transfer='true' type="daterange" placement="bottom-start" placeholder="选择日期" :clearable="false" style="width: 180px" @on-change='setDate' :value='dateBox'></Date-picker>
                </Form-item>
                <Form-item label="登记医院" prop='hospitalId'>
                    <Select v-model="formSearch.hospitalId" clearable style="width:200px">
                        <Option v-for="item in hospList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </Form-item>
                <Form-item label="登记部门" prop='deptId'>
                    <cmpHospChooseDept _placeHolder="选择部门" :_style="{width:'162px'}" :_deptName="deptName" v-on:setDeptName="setDept"></cmpHospChooseDept>
                </Form-item>
                <Form-item label="登记用户" prop='createUserId'>
                    <cmptHospChooseUser _placeHolder="选择用户" :_style="{width:'162px'}" :_userName="showChildUser" v-on:setUserName="setCreateUser"></cmptHospChooseUser>
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
	import cmpHospChooseDept from 'components/hospChooseDept.vue'
    export default {
        data () {
            return {
                show: false,
                adminToken: this.$token.readToken('adminToken') || '', exportKey: localStorage.getItem('exportKey'),
                total: 0,
                totalPages: 1,
                pageNumber: 1,
                showChildUser: '',
                deptName: '',
                formSearch: {
                    startTime: moment().format('YYYY-MM-DD'),
                    endTime: moment().format('YYYY-MM-DD'),
                    hospitalId: '',
                    createUserId: '',
                    deptId: ''
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
                        title: '登记日期',
                        key: 'createDate',
                        render: (h, params) => {
                            const _text = params.row.createTime.split(' ')[0]
                            return h('span', _text)
                        }
                    },
                    {
                        title: '登记时间',
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
                    	title: '性别',
                    	key: 'gender',
                    	render: (h,params) => {
                    		const _text = params.row.gender == 1 ? '男':'女'
                    		return h('span', _text)
                    	}
                    },
                    {
                    	title: '客户来源归类',
                    	key: 'channelGroupName',
                    },
                    {
                    	title: '来源',
                    	key: 'channelName',
                    },
                    {
                        title: '咨询项目',
                        key: 'symptomName'
                    },
                    {
                        title: '意向分类',
                        key: 'itemGroupName'
                    },
                    {
                        title: '消费意向',
                        key: 'itemName'
                    },
                    {
                        title: '登记医院',
                        key: 'createUserHospitalName'
                    },
                    {
                        title: '登记部门',
                        key: 'createUserDeptName',
                    },
                    {
                        title: '登记用户',
                        key: 'createUserName',
                    },
                    {
                        title: '上门',
                        key: 'visitStatus',
                        render: (h, params) => {
                            const _color = params.row.visitStatus == 1 ? 'blue' : 'red'
                            const _text = params.row.visitStatus == 1 ? '已上门' : '未上门'
                            return h('span', {
                                style: {
                                    color: _color
                                }
                            }, _text)
                        }
                    },
                    {
                        title: '成交',
                        key: 'dealStatus',
                        render: (h, params) => {
                            const _color = params.row.dealStatus == 1 ? 'blue' : 'red'
                            const _text = params.row.dealStatus == 1 ? '已成交' : '未成交'
                            return h('span', {
                                style: {
                                    color: _color
                                }
                            }, _text)
                        }
                    }
                ],
                data: [],
            }
        },
        computed: {
            hospList () {
                return this.$store.getters.getSelectAllHospList
            },
            pageSize () {
                return this.$store.getters.getPageSize
            },
            exportPrefixURL () {
                return this.$store.getters.getExportPrefixURL + '/guard-webManager/excelExport/newCustomerDetail.jhtml'
            }
        },
        created () {
            this.getList(1, this.formSearch)
        },
        mounted () {
            this.$store.dispatch('setSelectAllHospList', {});
        },
        components: {
            cmpHospChooseDept
        },
        methods: {
            getList(pageNumber, form) {
                let _vm = this
                _vm.$store.dispatch('setPageLoading', -1);
                form['pageNumber'] = pageNumber
                form['pageSize'] = _vm.pageSize
                _vm.$http.get({
                    url: 'guard-webManager/report/newCustomerDetail.jhtml',
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
            //获取弹窗用户
            setCreateUser (data) {
                this.showChildUser = data.name
                this.formSearch.createUserId = data.id
            },
            setDept (data) {
                this.deptName = data.name
                this.formSearch.deptId = data.id
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
                    this.showChildUser = ''
                    this.deptName = ''
                }
            },
            exportTable () {
                this.$refs.formSubmit.submit()
            }
        }
    }
</script>
