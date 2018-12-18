/**
 * 医院库存变动明细
 */

<template>
    <div class="container-box" ref="containerBox">
        <div class="container-header">
            <h2>医院库存变动明细</h2>
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
                <input name="adminToken" :value="adminToken">
            </form>
            <Form :label-width="60" inline :model="formSearch" ref='formSearch'>
            	<Form-item label="日期" prop='startTime'>
                    <Date-picker :transfer='true' type="daterange" placement="bottom-start" placeholder="选择日期" :clearable="false" style="width: 190px" @on-change='setDate' :value='dateBox'></Date-picker>
                </Form-item>
                <Form-item label="仓库" prop='warehouseId'>
                    <Select v-model="formSearch.warehouseId" clearable style="width:200px">
                        <Option v-for="item in warehouseList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </Form-item>
                <Form-item label="物品分类" prop='productCategoryId'>
                    <Select v-model="formSearch.productCategoryId" clearable style="width:200px">
                        <Option v-for="item in productCategoryList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </Form-item>
                <Form-item label="物品编号" prop='productId'>
                    <Input type="text" :maxlength='15' v-model.trim="formSearch.productId" placeholder="请输入客户编号" @on-enter="getList(1, formSearch)"></Input>
                </Form-item>
                <Form-item label="物品名称" prop='productName'>
                    <Input type="text" :maxlength='15' v-model.trim="formSearch.productName" placeholder="请输入名称" @on-enter="getList(1, formSearch)"></Input>
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
                    productCategoryId: '',
                    productId: '',
                    productName: ''
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
                        title: '变动日期',
                        render: (h, params) => {
                            const _text = moment(params.row.createTime).format('YYYY-MM-DD')
                            return h('span', _text)
                        }
                    },
                    {
                        title: '单号',
                        key: 'no'
                    },
                    {
                        title: '仓库',
                        key: 'warehouseName'
                    },
                    {
                        title: '变动类型',
                        key: 'inOutTyoe',
                        render: (h, params) => {
                        	const _text = params.row.inOutType === 1 ? '入库':'出库'
                        	return h('span', _text)
                        }
                    },
                    {
                        title: '类型',
                        render: (h, params) => {
                            let _text = ''
                            if(params.row.inOutType === 1) {
                                _text = this.inType.filter(item => item.id === params.row.type)[0].name || ''
                            } else {
                                _text = this.outType.filter(item => item.id === params.row.type)[0].name || ''
                            }
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
                ],
                inType: [
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
                        name: '退零售项目入库'
                    },
                    {
                        id: 5,
                        name: '借用入库'
                    },
                    {
                        id: 6,
                        name: '借用归还入库'
                    },
                ],
                outType: [
                    {
                        id: 1,
                        name: '治疗出库'
                    },
                    {
                        id: 2,
                        name: '退货出库'
                    },
                    {
                        id: 3,
                        name: '调拨出库'
                    },
                    {
                        id: 4,
                        name: '销售出库'
                    },
                    {
                        id: 5,
                        name: '盘点出库'
                    },
                    {
                        id: 6,
                        name: '领用出库'
                    },
                    {
                        id: 7,
                        name: '借用出库'
                    },
                    {
                        id: 8,
                        name: '借用归还出库'
                    },
                ],
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
                return this.$store.getters.getExportPrefixURL + '/guard-webManager/excelExport/hospitalStockChangeDetail.jhtml'
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
                    url: 'guard-webManager/report/hospitalStockChangeDetail.jhtml',
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
