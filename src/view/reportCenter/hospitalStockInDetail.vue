/**
 * 医院入库明细
 */

<template>
    <div class="container-box" ref="containerBox">
        <div class="container-header">
            <h2>医院入库明细</h2>
            <ul class="header-btn-group">
                <li class="header-item" @click="exportTable" v-if="exportKey === '1'"><Icon type="ios-download-outline"></Icon>导出</li>
            </ul>
        </div>
        <div class="container-body">
            <form :action="exportPrefixURL" method="get" ref="formSubmit" v-show="show">
                <input name="startTime" :value="formSearch.startTime">
                <input name="endTime" :value="formSearch.endTime">
                <input name="warehouseId" :value="formSearch.warehouseId">
                <input name="productCategoryId" :value="formSearch.productCategoryId">
                <input name="productId" :value="formSearch.productId">
                <input name="productName" :value="formSearch.productName">
                <input name="type" :value="formSearch.type">
                <input name="adminToken" :value="adminToken">
            </form>
            <Form :label-width="60" inline :model="formSearch" ref='formSearch'>
            	<Form-item label="入库日期" prop='startTime'>
                    <Date-picker :transfer='true' type="daterange" placement="bottom-start" placeholder="选择日期" :clearable="false" style="width: 190px" @on-change='setDate' :value='dateBox'></Date-picker>
                </Form-item>
                <Form-item label="入库仓库" prop='warehouseId'>
                    <Select v-model="formSearch.warehouseId" clearable style="width:200px">
                        <Option v-for="item in warehouseList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </Form-item>
                <Form-item label="入库类型 " prop='type'>
                    <Select v-model="formSearch.type" clearable style="width:200px">
                        <Option v-for="item in outTypeList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
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
                    <Input type="text" :maxlength='15' v-model.trim="formSearch.productName" placeholder="请输入物品名称" @on-enter="getList(1, formSearch)"></Input>
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
                formSearch: {
                	startTime: moment().format('YYYY-MM-DD'),
                    endTime: moment().format('YYYY-MM-DD'),
                    warehouseId: '',
                    type: '',
                    productCategoryId: '',
                    productId: '',
                    productName: ''
                },
                outTypeList: [
                	{
                        id: 1,
                        name: '进货入库'
                    },
                    {
                        id: 2,
                        name: '调拨入库'
                    },
                    {
                        id: 3,
                        name: '盘点入库'
                    },
                    {
                        id: 4,
                        name: '退药换货入库'
                    },
                    {
                        id: 6,
                        name: '借用归还入库'
                    },
                	
                ],
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
                        title: '入库日期',
                        render: (h, params) => {
                            const _text = moment(params.row.createDate).format('YYYY-MM-DD')
                            return h('span', _text)
                        }
                    },
                    {
                        title: '入库单号',
                        key: 'no'
                    },
                    {
                        title: '入库仓库',
                        key: 'warehouseName'
                    },
                    {
                        title: '入库类型',
                        key: 'type',
                        render: (h, params) => {
                            let _box = this.outTypeList.filter(item => item.id === params.row.type),
                                _text = _box[0].name
                            return h('span', _text)
                        }
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
                        title: '国药准字',
                        key: 'approvalNumber'
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
            pageSize () {
                return this.$store.getters.getPageSize
            },
            exportPrefixURL () {
                return this.$store.getters.getExportPrefixURL + '/guard-webManager/excelExport/hospitalStockInDetail.jhtml'
            }
        },
        created () {
            this.hospitalId = localStorage.getItem('hospId')
            this.getList(1, this.formSearch)
        },
        mounted () {
            this.$store.dispatch('setSelectHospitalWarehouseList', this.hospitalId)
            this.$store.dispatch('setSelectProductCategoryFirstList', {})
        },
        methods: {
            getList(pageNumber, form) {
                let _vm = this
                _vm.$store.dispatch('setPageLoading', -1)
                form['pageNumber'] = pageNumber
                form['pageSize'] = _vm.pageSize
                _vm.$http.get({
                    url: 'guard-webManager/report/hospitalStockInDetail.jhtml',
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
