<!-- hospitalStoreNewCustomerDetail -->
<!-- 医院渠道登记客户明细 -->
/**
 * 医院渠道登记客户明细
 */

<template>
    <div class="container-box" ref="containerBox">
        <div class="container-header">
            <h2>医院渠道登记客户明细</h2>
            <ul class="header-btn-group">
                <li class="header-item" @click="exportTable" v-if="exportKey === '1'"><Icon type="ios-download-outline"></Icon>导出</li>
            </ul>
        </div>
        <div class="container-body">
            <form :action="exportPrefixURL" method="get" ref="formSubmit" v-show="show">
                <input name="startTime" :value="formSearch.startTime">
                <input name="endTime" :value="formSearch.endTime">
                <input name="createUserId" :value="formSearch.createUserId">
                <input name="customerId" :value="formSearch.customerId">
                <input name="storeId" :value="formSearch.storeId">
                <input name="adminToken" :value="adminToken">
            </form>
            <Form :label-width="60" inline :model="formSearch" ref='formSearch'>
                <Form-item label="提交日期" prop='startTime'>
                    <Date-picker :transfer='true' type="daterange" placement="bottom-start" placeholder="选择日期" :clearable="false" style="width: 180px" @on-change='setDate' :value='dateBox'></Date-picker>
                </Form-item>
                <Form-item label="登记用户" prop='createUserId'>
                    <cmptHospChooseUser _placeHolder="选择用户" :_style="{width:'162px'}" :_userName="showChildUser" v-on:setUserName="setCreateUser"></cmptHospChooseUser>
                </Form-item>
                <Form-item label="推荐渠道" prop='storeId'>
                    <cmptRemoteFilterStore _placeHolder="选择渠道" @setStoreName="setStore" ref='remoteStore'></cmptRemoteFilterStore>
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
                totalPages: 1,
                pageNumber: 1,
                showChildUser: '',
                formSearch: {
                    startTime: moment().format('YYYY-MM-DD'),
                    endTime: moment().format('YYYY-MM-DD'),
                    createUserId: '',
                    customerId: '',
                    storeId: ''
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
                    	title: '来源',
                    	key: 'channelName',
                    },
                    {
                        title: '咨询项目',
                        key: 'symptomName'
                    },
                    {
                        title: '推荐渠道',
                        key: 'storeName'
                    },
                    {
                        title: '登记医院',
                        key: 'createUserHospitalName'
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
            pageSize () {
                return this.$store.getters.getPageSize
            },
            exportPrefixURL () {
                return this.$store.getters.getExportPrefixURL + '/guard-webManager/excelExport/hospitalStoreNewCustomerDetail.jhtml'
            }
        },
        created () {
            this.getList(1, this.formSearch)
        },
        methods: {
            getList(pageNumber, form) {
                let _vm = this
                _vm.$store.dispatch('setPageLoading', -1);
                form['pageNumber'] = pageNumber
                form['pageSize'] = _vm.pageSize
                _vm.$http.get({
                    url: 'guard-webManager/report/hospitalStoreNewCustomerDetail.jhtml',
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
            setStore (data) {
                this.formSearch.storeId = data.id
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
                    this.showChildUser = ''
                    this.$refs.remoteStore.clean()
                    this.getList(1, this.formSearch)
                }
            },
            exportTable () {
                this.$refs.formSubmit.submit()
            }
        }
    }
</script>
