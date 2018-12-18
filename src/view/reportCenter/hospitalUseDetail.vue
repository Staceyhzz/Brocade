<!-- 医院科室领用明细 -->
/**
 * 医院科室领用明细
 */

<template>
    <div class="container-box" ref="containerBox">
        <div class="container-header">
            <h2>医院科室领用明细</h2>
            <ul class="header-btn-group">
                <li class="header-item" @click="exportTable" v-if="exportKey === '1'"><Icon type="ios-download-outline"></Icon>导出</li>
            </ul>
        </div>
        <div class="container-body">
            <form :action="exportPrefixURL" method="get" ref="formSubmit" v-show="show">
                <input name="startTime" :value="formSearch.startTime">
                <input name="endTime" :value="formSearch.endTime">
                <input name="warehouseId" :value="formSearch.warehouseId">
                <input name="useUserId" :value="formSearch.useUserId">
                <input name="deptId" :value="formSearch.deptId">
                <input name="productCategoryId" :value="formSearch.productCategoryId">
                <input name="productId" :value="formSearch.productId">
                <input name="productName" :value="formSearch.productName">
                <input name="no" :value="formSearch.no">
                <input name="adminToken" :value="adminToken">
            </form>
            <Form :label-width="60" inline :model="formSearch" ref='formSearch'>
            	<Form-item label="领用日期" prop='startTime'>
                    <Date-picker :transfer='true' type="daterange" placement="bottom-start" placeholder="选择日期" :clearable="false" style="width: 190px" @on-change='setDate' :value='dateBox'></Date-picker>
                </Form-item>
                <Form-item label="仓库" prop='warehouseId'>
                    <Select v-model="formSearch.warehouseId" clearable style="width:200px">
                        <Option v-for="item in warehouseList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </Form-item>
                <Form-item label="领用部门" prop='deptId'>
                    <Select v-model="formSearch.deptId" clearable style="width:200px">
                        <Option v-for="item in deptList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </Form-item>
				<Form-item label="领用用户" prop='useUserId'>
                    <cmptHospChooseUser _placeHolder="选择用户" :_style="{width:'162px'}" :_userName="useUserName" v-on:setUserName="setUseUser"></cmptHospChooseUser>
                </Form-item>
                <Form-item label="物品分类" prop='productCategoryId'>
                    <Select v-model="formSearch.productCategoryId" clearable style="width:200px">
                        <Option v-for="item in productCategoryList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </Form-item>
                <Form-item label="物品编号" prop='productId'>
                    <Input type="text" :maxlength='15' v-model.trim="formSearch.productId" placeholder="请输入物品编号" @on-enter="getList(1, formSearch)"></Input>
                </Form-item>
                <Form-item label="物品名称" prop='productName'>
                    <Input type="text" :maxlength='15' v-model.trim="formSearch.productName" placeholder="请输入名称" @on-enter="getList(1, formSearch)"></Input>
                </Form-item>
                <Form-item label="领用单号" prop='no'>
                    <Input type="text" :maxlength='15' v-model.trim="formSearch.no" placeholder="请输入领用单号" @on-enter="getList(1, formSearch)"></Input>
                </Form-item>
                <ul class="header-btn-group not-float">
                    <li class="header-item" @click="getList(1, formSearch)"><Icon type="search"></Icon>查询</li>
                    <li class="header-item" @click="handleReset('formSearch')"><Icon type="refresh"></Icon>重置</li>
                </ul>
            </Form>

            <Alert>
                <div v-html="TotalText">{{TotalText}}</div>
            </Alert>

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
                TotalText: '',
                useUserName: '',
                formSearch: {
                	startTime: moment().format('YYYY-MM-DD'),
                    endTime: moment().format('YYYY-MM-DD'),
                    warehouseId: '',
                    useUserId: '',
                    deptId: '',
                    productCategoryId: '',
                    productId: '',
                    productName: '',
                    no: ''
                },
                dateBox: [moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')],
                data: [],
                hospitalId: null,
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
                        title: '领用日期',
                        render: (h, params) => {
                            const _text = moment(params.row.createDate).format('YYYY-MM-DD')
                            return h('span', _text)
                        }
                    },
                    {
                        title: '领用单号',
                        key: 'no'
                    },
                    {
                        title: '领用仓库',
                        key: 'warehouseName'
                    },
                    {
                        title: '领用部门',
                        key: 'deptName'
                    },
                    {
                        title: '领用人',
                        key: 'useUserName'
                    },
                    {
                        title: '物品编号',
                        key: 'productID'
                    },
                    {
                        title: '物品名称',
                        key: 'productName'
                    },
                    {
                        title: '规格',
                        key: 'productSize'
                    },
                    {
                        title: '类别',
                        key: 'productCategoryName'
                    },
                    {
                        title: '单位',
                        key: 'productUnitName'
                    },
                    {
                        title: '数量',
                        key: 'num'
                    },
                    {
                        title: '价格',
                        key: 'price'
                    },
                    {
                        title: '金额',
                        key: 'amount'
                    },
                    {
                        title: '备注',
                        key: 'remark'
                    },
                    {
                        title: '操作用户',
                        key: 'createUserName'
                    },
                    {
                        title: '操作时间',
                        key: 'createTime'
                    }
                ]
            }
        },
        computed: {
            warehouseList () {
                return this.$store.getters.getSelectHospitalWarehouseList
            },
            productCategoryList () {
                return this.$store.getters.getSelectProductCategoryFirstList
            },
            deptList () {
            	return this.$store.getters.getSelectDeptList
            },
            pageSize () {
                return this.$store.getters.getPageSize
            },
            exportPrefixURL () {
                return this.$store.getters.getExportPrefixURL + '/guard-webManager/excelExport/hospitalUseDetail.jhtml'
            }
        },
        created () {
            this.hospitalId = localStorage.getItem('hospId')
            this.getList(1, this.formSearch)
        },
        mounted () {
            this.$store.dispatch('setSelectHospitalWarehouseList', this.hospitalId)
            this.$store.dispatch('setSelectProductCategoryFirstList', {})
            this.$store.dispatch('setSelectDeptList', this.hospitalId)
        },
        methods: {
            getList(pageNumber, form) {
                let _vm = this
                _vm.$store.dispatch('setPageLoading', -1)
                form['pageNumber'] = pageNumber
                form['pageSize'] = _vm.pageSize
                _vm.$http.get({
                    url: 'guard-webManager/report/hospitalUseDetail.jhtml',
                    data: form,
                    success: function(res){
                        if(res.data.code == 0) {
                            _vm.data = res.data.content.Page.content
                            _vm.total = res.data.content.Page.total
                            _vm.pageNumber = res.data.content.Page.pageNumber
                            _vm.totalPages = res.data.content.Page.totalPages
                            _vm.TotalText = res.data.content.TotalText
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
            //供应商
            setUseUser (data) {
                this.formSearch.useUserId = data.id
                this.useUserName = data.name
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
                    this.useUserName = ''
                }
            },
            exportTable () {
                this.$refs.formSubmit.submit()
            }
        }
    }
</script>
