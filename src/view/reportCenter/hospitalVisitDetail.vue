<!-- hospitalVisitDetail -->
<!-- 医院到诊明细表 -->
/**
 * 医院到诊明细表
 */

<template>
    <div class="container-box" ref="containerBox">
        <div class="container-header">
            <h2>医院到诊明细表</h2>
            <ul class="header-btn-group">
                <li class="header-item" @click="exportTable" v-if="exportKey === '1'"><Icon type="ios-download-outline"></Icon>导出</li>
            </ul>
        </div>
        <div class="container-body">
            <form :action="exportPrefixURL" method="get" ref="formSubmit" v-show="show">
                <input name="startTime" :value="formSearch.startTime">
                <input name="endTime" :value="formSearch.endTime">
                <input name="newOldType" :value="formSearch.newOldType">
                <input name="clinicType" :value="formSearch.clinicType">
                <input name="dealStatus" :value="formSearch.dealStatus">
                <input name="channelId" :value="formSearch.channelId">
                <input name="channelGroupId" :value="formSearch.channelGroupId">
                <input name="managerUserId" :value="formSearch.managerUserId">
                <input name="exploitUserId" :value="formSearch.exploitUserId">
                <input name="customerId" :value="formSearch.customerId">
                <input name="customerName" :value="formSearch.customerName">
                <input name="adminToken" :value="adminToken">
            </form>
            <Form :label-width="100" inline :model="formSearch" ref='formSearch'>
                <Form-item label="到诊日期" prop='startTime'>
                    <Date-picker :transfer='true' type="daterange" placement="bottom-start" placeholder="选择日期" :clearable="false" style="width: 190px" @on-change='setDate_1' :value='dateBox_1'></Date-picker>
                </Form-item>
                <Form-item label="新老客" prop='newOldType'>
                    <Select v-model="formSearch.newOldType" clearable style="width:200px">
                        <Option v-for="item in newOldTypeList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </Form-item>
                <Form-item label="门诊类型" prop='clinicType'>
                    <Select v-model="formSearch.clinicType" clearable style="width:200px">
                        <Option v-for="item in clinicTypeList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </Form-item>
                <Form-item label="成交状态" prop='dealStatus'>
                    <Select v-model="formSearch.dealStatus" clearable style="width:200px">
                        <Option v-for="item in dealStatusList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </Form-item>
                <Form-item label="客户来源归类" prop='channelGroupId'>
                    <Select v-model="formSearch.channelGroupId" clearable style="width:200px">
                        <Option v-for="item in channelGroupList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </Form-item>
                <Form-item label="来源" prop='channelId'>
                    <cmptRemoteFilterChannel _placeHolder='输入拼音汉字快捷搜索' @setChannelName='setChannelName' ref='remoteChannel'></cmptRemoteFilterChannel>
                </Form-item>
                <Form-item label="咨询人员" prop='managerUserId'>
                    <cmptDeptChooseUser _placeHolder="请选择用户" :_style="{width:'162px'}" :_userName="managerUserName" v-on:setUserName="setManagerUser"></cmptDeptChooseUser>
                </Form-item>
                <Form-item label="开发人员" prop='exploitUserId'>
                    <cmptDeptChooseUser _placeHolder="请选择用户" :_style="{width:'162px'}" :_userName="exploitUserName" v-on:setUserName="setExploitUser"></cmptDeptChooseUser>
                </Form-item>
                <Form-item label="客户编号" prop='customerId'>
                    <Input type="text" :maxlength='15' v-model.trim="formSearch.customerId" placeholder="请输入客户编号" @on-enter="getList(1, formSearch)"></Input>
                </Form-item>
                <Form-item label="客户名称" prop='customerName'>
                    <Input type="text" :maxlength='15' v-model.trim="formSearch.customerName" placeholder="请输入名称" @on-enter="getList(1, formSearch)"></Input>
                </Form-item>
                <ul class="header-btn-group not-float">
                    <li class="header-item" @click="getList(1, formSearch)"><Icon type="search"></Icon>查询</li>
                    <li class="header-item" @click="handleReset('formSearch')"><Icon type="refresh"></Icon>重置</li>
                </ul>
            </Form>
            <!-- <Alert>
                <div v-html="TotalText">{{TotalText}}</div>
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
                message: '',
                totalPages: 1,
                pageNumber: 1,
                managerUserName: '',
                exploitUserName: '',
                storeName: '',
                formSearch: {
                    startTime: moment().format('YYYY-MM-DD'),
                    endTime: moment().format('YYYY-MM-DD'),
                   	newOldType: '',
                   	clinicType: '',
                   	dealStatus: '',
                    channelId: '',
                    channelGroupId: '',
                    managerUserId: '',
                    exploitUserId: '',
                    customerId: '',
                    customerName: '',
                },
                dateBox_1: [moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')],
                newOldTypeList: [
                	{id: 1, name: '新客'}, {id: 2, name: '老客'}
            	],
                clinicTypeList: [
                	{id: 1, name: '初诊'},
                	{id: 2, name: '复诊'},
                	{id: 3, name: '复查'},
                	{id: 4, name: '再消费'}
            	],
                dealStatusList: [
                	{id: 0, name: '未成交'}, {id: 1, name: '已成交'}
                ],
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
                        title: '到诊时间',
                        key: 'createTime'
                    },
                    {
                    	title: '接待用户',
                    	key: 'createUserName',
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
                    	title: '客户来源归类',
                    	key: 'channelGroupName'
                    },
                    {
                        title: '来源',
                        key: 'channelName'
                    },
                    {
                        title: '开发人员',
                        key: 'exploitUserName'
                    },
                    {
                        title: '咨询人员',
                        key: 'managerUserName'
                    },
                    {
                    	title: '咨询项目',
                    	key: 'symptomName'
                    },
                    {
                        title: '首次成交时间',
                        key: 'firstDealTime'
                    },
                    {
                        title: '初次到诊时间',
                        key: 'firstVisitTime'
                    },
                    {
                        title: '新老客',
                        key: 'newOldType',
                        render: (h,params) => {
                        	const color = params.row.newOld == 1 ? 'blue':'red'
                        	const _text = params.row.newOld == 1 ? '新客':'老客'
                        	return h('span' , {
                        		style: {
                        			color: color
                        		}
                        	}, _text)
                        }
                    },
                    {
                        title: '门诊类别',
                        render: (h,params) => {
                            const _index = this.clinicTypeList.findIndex(item => item.id === params.row.clinicType)
                            if(_index >= 0) {
                                return h('span', this.clinicTypeList[_index].name)
                            }
                        }
                    },
                    {
                        title: '成交状态 ',
                        key: 'isDeal',
                        render: (h,params) =>{
                        	const color = params.row.isDeal == 1 ? 'blue':'red'
                        	const _text = params.row.isDeal == 1 ? '已成交':'未成交'
                        	return h('span' , {
                        		style: {
                        			color: color
                        		}
                        	}, _text)
                        }
                    },
                    {
                        title: '成交金额',
                        key: 'dealAmount'
                    }    
                ],
                data: [],
            }
        },
        computed: {
            hospList () {
                return this.$store.getters.getSelectAllHospList
            },
            channelGroupList () {
        		return this.$store.getters.getSelectChannelGroupList
            },
            pageSize () {
                return this.$store.getters.getPageSize
            },
            exportPrefixURL () {
                return this.$store.getters.getExportPrefixURL + '/guard-webManager/excelExport/hospitalVisitDetail.jhtml'
            }
        },
        created () {
            this.getList(1, this.formSearch)
        },
        mounted () {
        	this.$store.dispatch('setSelectAllHospList', {})
            this.$store.dispatch('setSelectChannelGroupList', {})
        },
        methods: {
            getList(pageNumber, form) {
                let _vm = this
                _vm.$store.dispatch('setPageLoading', -1)
                form['pageNumber'] = pageNumber
                form['pageSize'] = _vm.pageSize
                _vm.$http.get({
                    url: 'guard-webManager/report/hospitalVisitDetail.jhtml',
                    data: form,
                    success: function(res){
                        if(res.data.code == 0) {
                            _vm.data = res.data.content.Page.content
                            _vm.total = res.data.content.Page.total
                            _vm.pageNumber = res.data.content.Page.pageNumber
                            _vm.totalPages = res.data.content.Page.totalPages
                            // _vm.TotalText = res.data.content.TotalText
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
            //获取弹窗用户
            setManagerUser (data) {
                this.managerUserName = data.name
                this.formSearch.managerUserId = data.id
            },
            setExploitUser (data) {
            	this.exploitUserName = data.name
            	this.formSearch.exploitUserId = data.id
            },
            //获取弹窗项目
            setStore (data) {
                this.storeName = data.name
                this.formSearch.storeId = data.id
            },
            setDate_1 (date) {
                this.formSearch.startTime = date[0]
                this.formSearch.endTime = date[1]
            },
            setChannelName (data) {
                this.formSearch.channelId = data.id
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
                    this.$refs.remoteChannel.clean()
                    this.getList(1, this.formSearch)
                    this.managerUserName = ''
                    this.exploitUserName =  ''
                }
            },
            exportTable () {
                this.$refs.formSubmit.submit()
            }
        }
    }
</script>
