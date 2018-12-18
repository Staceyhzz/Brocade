
/**
 * 部门借用归还明细表
 */

<template>
    <div class="container-box" ref="containerBox">
        <div class="container-header">
            <h2>部门借用归还明细表</h2>
            <ul class="header-btn-group">
                <li class="header-item" @click="exportTable" v-if="exportKey === '1'"><Icon type="ios-download-outline"></Icon>导出</li>
            </ul>
        </div>
        <div class="container-body">
            <form :action="exportURL" method="get" ref="formSubmit" v-show="show">
                <input name="startTime" :value="formSearch.startTime">
                <input name="endTime" :value="formSearch.endTime">
                <input name="hospitalId" :value="formSearch.hospitalId">
                <input name="returnStatus" :value="formSearch.returnStatus">
                <input name="productName" :value="formSearch.productName">
                <input name="borrowUserId" :value="formSearch.borrowUserId">
                <input name="returnBorrowUserId" :value="formSearch.returnBorrowUserId">
                <input name="deptId" :value="formSearch.deptId">
                <input name="borrowNo" :value="formSearch.borrowNo">
                <input name="returnNo" :value="formSearch.returnNo">
                <input name="adminToken" :value="adminToken">
            </form>
            <Form :label-width="70" inline :model="formSearch" ref='formSearch'>
                <Form-item label="借用日期" prop='startTime'>
                    <Date-picker :transfer='true' type="daterange" placement="bottom-start" placeholder="选择日期" :clearable="false" style="width: 190px" @on-change='setDate' :value='dateBox'></Date-picker>
                </Form-item>
                <Form-item label="医院" prop='hospitalId' v-if='hospKey'>
                    <Select v-model="formSearch.hospitalId" style="width:200px">
                        <Option v-for="item in hospList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </Form-item>
                <Form-item label="借用单号" prop='borrowNo'>
                    <Input type="text" :maxlength='15' v-model.trim="formSearch.borrowNo" placeholder="请输入借用单号" @on-enter="getList(1, formSearch)"></Input>
                </Form-item>
                <Form-item label="物品名称" prop='productName'>
                    <Input type="text" :maxlength='15' v-model.trim="formSearch.productName" placeholder="请输入物品名称" @on-enter="getList(1, formSearch)"></Input>
                </Form-item>
                <Form-item label="借用部门" prop='deptId' v-if='hospKey'>
                    <cmptHospChooseDept _placeHolder="选择借用部门" :_style="{width:'162px'}" :_deptName="deptName" v-on:setDeptName="setDept"></cmptHospChooseDept>
                </Form-item>
                <Form-item label="借用部门" prop='deptId' v-if='!hospKey'>
                    <Select v-model="formSearch.deptId" style="width:162px">
                        <Option v-for="item in deptList" :value="item.id" :key="item.id">
                            {{item.name}}
                        </Option>
                    </Select>
                </Form-item>
                <Form-item label="借用人员" prop='borrowUserId' v-if='hospKey'>
                    <cmptHospChooseUser _placeHolder="请选择借用人员" :_style="{width:'162px'}" :_userName="borrowUserName" v-on:setUserName="setBorrowUser"></cmptHospChooseUser>
                </Form-item>
                <Form-item label="借用人员" prop='borrowUserId' v-if='!hospKey'>
                    <cmptDeptChooseUser _placeHolder="请选择借用人员" :_style="{width:'162px'}" :_userName="borrowUserName" v-on:setUserName="setBorrowUser"></cmptDeptChooseUser>
                </Form-item>
                <Form-item label="归还单号" prop='returnNo'>
                    <Input type="text" :maxlength='15' v-model.trim="formSearch.returnNo" placeholder="请输入归还单号" @on-enter="getList(1, formSearch)"></Input>
                </Form-item>
                <Form-item label="归还人员" prop='returnBorrowUserId' v-if='hospKey'>
                    <cmptHospChooseUser _placeHolder="请选择归还人员" :_style="{width:'162px'}" :_userName="returnUserName" v-on:setUserName="setReturnUser"></cmptHospChooseUser>
                </Form-item>
                <Form-item label="归还人员" prop='returnBorrowUserId' v-if='!hospKey'>
                    <cmptDeptChooseUser _placeHolder="请选择归还人员" :_style="{width:'162px'}" :_userName="returnUserName" v-on:setUserName="setReturnUser"></cmptDeptChooseUser>
                </Form-item>
                <Form-item label="归还状态" prop="returnStatus">
                    <Select v-model="formSearch.returnStatus" style="width:162px">
                        <Option value="未入库">未入库</Option>
                        <Option value="已入库">已入库</Option>
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
    import cmptHospChooseDept from 'components/hospChooseDept.vue'
    export default {
        components: {
            cmptHospChooseDept
        },
        data () {
            return {
                hospKey: true,
                show: false,
                adminToken: this.$token.readToken('adminToken') || '', exportKey: localStorage.getItem('exportKey'),
                total: 0,
                totalPages: 1,
                pageNumber: 1,
                borrowUserName: '',
                returnUserName: '',
                deptName: '',
                formSearch: {
                    startTime: moment().format('YYYY-MM-DD'),
                    endTime: moment().format('YYYY-MM-DD'),
                    hospitalId: '',
                    returnStatus: '',
                    productName: '',
                    borrowUserId: '',
                    returnBorrowUserId: '',
                    deptId: '',
                    borrowNo: '',
                    returnNo: '',
                },
                dateBox: [moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')],
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
                        title: '借用日期',
                        render: (h, params) => {
                            const _text = moment(params.row.createDate).format('YYYY-MM-DD')
                            return h('span', _text)
                        }
                    },
                    {
                        title: '借用单号',
                        key: 'borrowNo'
                    },
                    {
                        title: '物品类别',
                        key: 'productCategoryName'
                    },
                    {
                        title: '物品名称',
                        key: 'productName'
                    },
                    {
                        title: '成本单价',
                        render: (h, params) => {
                            if(params.row.price || params.row.price === 0) {
                                const _text = params.row.price.toFixed(2)
                                return h('span', _text)
                            }
                        }
                    },
                    {
                    	title: '借用部门',
                    	key: 'deptName'
                    },
                    {
                        title: '借用人',
                        key: 'borrowUserName'
                    },
                    {
                    	title: '归还单号',
                    	key: 'returnBorrowNo'
                    }, 
                    {
                        title: '归还人',
                        key: 'returnUserName'
                    },   
                    {
                        title: '归还状态',
                        key: 'returnborrowedStatus'
                    },
                    {
                        title: '借用数量',
                        key: 'num'
                    }, 
                    // {
                    //     title: '借用总价',
                    //     key: ''
                    // }, 
                    {
                        title: '使用数量',
                        key: 'useNum'
                    }, 
                    // {
                    //     title: '使用总价',
                    //     key: ''
                    // }, 
                    {
                        title: '归还数量',
                        render: (h, params) => {
                            const _text = params.row.num - params.row.useNum
                            return h('span', _text)
                        }
                    }, 
                    // {
                    //     title: '归还总价',
                    //     key: ''
                    // },  
                ],
                data: [],
            }
        },
        computed: {
            hospList () {
                return this.$store.getters.getSelectAllHospList
            },
            deptList () {
                return this.$store.getters.getSelectDeptList
            },
            pageSize () {
                return this.$store.getters.getPageSize
            },
            exportURL () {
                return this.$store.getters.getExportPrefixURL + '/guard-webManager/excelExport/returnBorrowedDetail.jhtml'
            }
        },
        created () {
            if(localStorage.getItem('hospId') == 1) {
                this.hospKey = true
            } else {
                this.hospKey = false
                this.formSearch.hospitalId = localStorage.getItem('hospId')
            }
            this.getList(1, this.formSearch)
        },
        mounted () {
            if(this.hospKey) {
            	this.$store.dispatch('setSelectAllHospList')
            } else {
                this.$store.dispatch('setSelectDeptList', this.formSearch.hospitalId)
            }
        },
        methods: {
            getList(pageNumber, form) {
                let _vm = this
                _vm.$store.dispatch('setPageLoading', -1)
                form['pageNumber'] = pageNumber
                form['pageSize'] = _vm.pageSize
                _vm.$http.get({
                    url: 'guard-webManager/report/returnBorrowedDetail.jhtml',
                    data: form,
                    success: function(res){
                        if(res.data.code == 0) {
                            let page = res.data.content.Page || {}
                            _vm.data = page.content || []
                            _vm.total = page.total || 0
                            _vm.pageNumber = page.pageNumber || 1
                            _vm.totalPages = page.totalPages || 1
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
            setBorrowUser (data) {
                this.borrowUserName = data.name
                this.formSearch.borrowUserId = data.id
            },
            setReturnUser (data) {
                this.returnUserName = data.name
                this.formSearch.returnBorrowUserId = data.id
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
                this.$refs[name].resetFields()
                this.formSearch.startTime = moment().format('YYYY-MM-DD')
                this.formSearch.endTime = moment().format('YYYY-MM-DD')
                this.dateBox = [moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')]
                this.borrowUserName = ''
                this.returnUserName = ''
                this.deptName = ''
                this.getList(1, this.formSearch)
            },
            exportTable () {
                this.$refs.formSubmit.submit()
            }
        }
    }
</script>
