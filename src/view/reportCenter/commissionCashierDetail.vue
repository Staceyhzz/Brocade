<!-- 集团渠道佣金明细 -->

/**
 * 佣金付款记录明细表
 */

<template>
    <div class="container-box">
        <div class="container-header">
            <h2>渠道商佣金付款明细</h2>
            <ul class="header-btn-group">
                <li class="header-item" @click="exportTable" v-if="exportKey === '1'"><Icon type="ios-download-outline"></Icon>导出</li>
            </ul>
        </div>
        <div class="container-body">
            <form :action="exportPrefixURL" method="get" ref="formSubmit" v-show="show">
                <input name="startTime" :value="formSearch.startTime">
                <input name="endTime" :value="formSearch.endTime">
                <input name="hospitalID" :value="formSearch.hospitalID">
                <input name="storeCategoryID" :value="formSearch.storeCategoryID">
                <input name="storeID" :value="formSearch.storeID">
                <input name="createUserID" :value="formSearch.createUserID">
                <input name="status" :value="formSearch.status">
                <input name="adminToken" :value="adminToken">
            </form>
            <Form :label-width="60" inline :model="formSearch" ref='formSearch'>
                <Form-item label="提交日期" prop='startTime'>
                    <Date-picker :transfer='true' type="daterange" placement="bottom-start" placeholder="选择日期" :clearable="false" style="width: 190px" @on-change='setDate' :value='dateBox'></Date-picker>
                </Form-item>
                <Form-item label="医院" prop='hospitalID' v-if='hospKey'>
                    <Select v-model="formSearch.hospitalID" style="width:200px" :clearable='true'>
                        <Option v-for="item in hospList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </Form-item>
                <Form-item label="品牌" prop="storeCategoryID">
                    <cmptStoreCategoryChoose v-on:setStoreCategory="setStoreCategory" ref='remoteStoreCategory'></cmptStoreCategoryChoose>
                </Form-item>
                <Form-item label="渠道" prop='storeID' v-if='hospKey'>
                    <cmptRemoteFilterStore _placeHolder="选择渠道" @setStoreName="setStore" ref='remoteStore' :_type='3'></cmptRemoteFilterStore>
                </Form-item>
                <Form-item label="渠道" prop='storeID' v-else>
                    <cmptRemoteFilterStore _placeHolder="选择渠道" @setStoreName="setStore" ref='remoteStore'></cmptRemoteFilterStore>
                </Form-item>
                <Form-item label="提交人员" prop='createUserID' v-if='hospKey'>
                    <cmptHospChooseUser _placeHolder="请选择提交人员" :_style="{width:'162px'}" :_userName="createUserName" v-on:setUserName="setCreateUser"></cmptHospChooseUser>
                </Form-item>
                <Form-item label="提交人员" prop='createUserID' v-else>
                    <cmptDeptChooseUser _placeHolder="请选择提交人员" :_style="{width:'162px'}" :_userName="createUserName" v-on:setUserName="setCreateUser"></cmptDeptChooseUser>
                </Form-item>
                <Form-item label="支付状态" prop='status'>
                    <Select v-model="formSearch.status" style="width:168px" :clearable='true'>
                        <Option :value="-1">支付失败</Option>
                        <Option :value="0">待确认</Option>
                        <Option :value="1">支付成功</Option>
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
    import cmptStoreCategoryChoose from 'components/storeCategoryChoose.vue'
    export default {
        components: {cmptStoreCategoryChoose},
        data () {
            return {
                hospKey: true,
                show: false,
                adminToken: this.$token.readToken('adminToken') || '', exportKey: localStorage.getItem('exportKey'),
                total: 0,
                totalPages: 1,
                pageNumber: 1,
                createUserName: '',
                formSearch: {
                    startTime: moment().format('YYYY-MM-DD'),
                    endTime: moment().format('YYYY-MM-DD'),
                    hospitalID: '',
                    status: '',
                    createUserID: '',
                    storeID: '',
                    storeCategoryID: '',
                },
                dateBox: [moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')],
                col: [
                    {
                        title: '序号',
                        width: 60,
                        render: (h, params) => {
                            if(params.row.countKey) {
                                return h('span', params.row.name)
                            } else {
                                const _index = (this.pageNumber - 1) * 10
                                return h('span', params.index + 1 + _index)
                            }
                        }
                    },
                    {
                        title: '机构',
                        key: 'hospitalName'
                    },
                    {
                        title: '佣金单号',
                        key: 'id'
                    },
                    {
                        title: '金额',
                        render: (h, params) => {
                            const _text = params.row.amount.toFixed(2)
                            return h('span', _text)
                        }
                    },
                    {
                        title: '状态',
                        render: (h, params) => {
                            let _text = ''
                            switch (params.row.status){
                                case -1:
                                    _text = '支付失败'
                                    break
                                case 0:
                                    _text = '待确认'
                                    break
                                case 1:
                                    _text = '支付成功'
                                    break
                            }
                            return h('span', _text)
                        }
                    },
                    {
                        title: '渠道品牌',
                        key: 'storeCategoryName'
                    },
                    {
                    	title: '渠道名称',
                    	key: 'storeName'
                    },
                    {
                    	title: '提交日期',
                        render: (h, params) => {
                            if(params.row.createDate) {
                                const _text = params.row.createDate.split(' ')[0]
                                return h('span', _text)
                            }
                        }
                    },
                    {
                        title: '提交人员',
                        key: 'createUserName'
                    },
                    {
                        title: '支付日期',
                        render: (h, params) => {
                            if(params.row.confirmTime) {
                                const _text = params.row.confirmTime.split(' ')[0]
                                return h('span', _text)
                            }
                        }
                    },
                    {
                        title: '支付人员',
                        key: 'confirmUserName'
                    },
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
                return this.$store.getters.getExportPrefixURL + '/guard-webManager/excelExport/commissionCashierDetail.jhtml'
            }
        },
        created () {
            if(localStorage.getItem('hospId') == 1) {
                this.hospKey = true
                this.$store.dispatch('setSelectAllHospList')
            } else {
                this.hospKey = false
                this.formSearch.hospitalID = localStorage.getItem('hospId')
            }
            this.getList(1, this.formSearch)
        },
        methods: {
            getList(pageNumber, form) {
                let _vm = this
                _vm.$store.dispatch('setPageLoading', -1)
                form['pageNumber'] = pageNumber
                form['pageSize'] = _vm.pageSize
                _vm.$http.get({
                    url: 'guard-webManager/report/commissionCashierDetail.jhtml',
                    data: form,
                    success: function(res){
                        if(res.data.code == 0) {
                            _vm.data = res.data.content.page.content || []
                            _vm.total = res.data.content.page.total || 0
                            _vm.pageNumber = res.data.content.page.pageNumber || 1
                            _vm.totalPages = res.data.content.page.totalPages || 1
                            let _obj = {}
                            _obj.countKey = true
                            _obj.name = '合计'
                            _obj.amount = res.data.content.totalAmount || 0
                            _vm.data.push(_obj)
                            _vm.$store.dispatch('setPageLoading', 1)
                            console.log(res)
                        } else {
                            console.log(res.data.desc)
                        }
                    },
                    error: function(res){
                        console.log(res)
                    }
                })
            },
            setStoreCategory (data) {
                this.formSearch.storeCategoryID = data.id
            },
            setStore (data) {
                this.formSearch.storeID = data.id
            },
            setCreateUser (data) {
                this.createUserName = data.name
                this.formSearch.createUserID = data.id
            },
            setDate (date) {
                this.formSearch.startTime = date[0]
                this.formSearch.endTime = date[1]
            },
            changePage (num) {
                this.getList(num, this.formSearch)
            },
            handleReset (name) {
                this.$refs[name].resetFields()
                this.formSearch.startTime = moment().format('YYYY-MM-DD')
                this.formSearch.endTime = moment().format('YYYY-MM-DD')
                this.dateBox = [moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')]
                this.$refs.remoteStore.clean()
                this.$refs.remoteStoreCategory.clean()
                this.createUserName = ''
                this.getList(1, this.formSearch)
            },
            exportTable () {
                this.$refs.formSubmit.submit()
            }
        }
    }
</script>
