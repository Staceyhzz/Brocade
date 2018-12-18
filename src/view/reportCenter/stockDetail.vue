/**
 * 集团库存明细
 */

<template>
    <div class="container-box" ref="containerBox">
        <div class="container-header">
            <h2>集团库存明细</h2>
            <ul class="header-btn-group">
                <li class="header-item" @click="exportTable" v-if="exportKey === '1'"><Icon type="ios-download-outline"></Icon>导出</li>
            </ul>
        </div>
        <div class="container-body">
            <form :action="exportPrefixURL" method="get" ref="formSubmit" v-show="show">
                <input name="startTime" :value="formSearch.startTime">
                <input name="endTime" :value="formSearch.endTime">
                <input name="hospitalId" :value="formSearch.hospitalId">
                <input name="warehouseId" :value="formSearch.warehouseId">
                <input name="productCategoryId" :value="formSearch.productCategoryId">
                <input name="productId" :value="formSearch.productId">
                <input name="productName" :value="formSearch.productName">
                <input name="productPinYin" :value="formSearch.productPinYin">
                <input name="adminToken" :value="adminToken">
            </form>
            <Form :label-width="75" inline :model="formSearch" ref='formSearch'>
                <Form-item label="医院" prop='hospitalId'>
                    <Select v-model="formSearch.hospitalId" clearable style="width:200px">
                        <Option v-for="item in hospList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </Form-item>
                <Form-item label="仓库" prop='warehouseId'>
                    <Select v-model="formSearch.warehouseId" style="width:280px">
                        <Option v-for="item in warehouseList" :value="item.id" :key="item.id" :label='item.name'>
                            <span>{{item.name}}</span>
                            <span style="paddingLeft:10px">【{{item.hospitalName}}】</span>
                        </Option>
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
                <Form-item label="物品拼音码" prop='productPinYin'>
                    <Input type="text" :maxlength='15' v-model.trim="formSearch.productPinYin" placeholder="请输入物品拼音码" @on-enter="getList(1, formSearch)"></Input>
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
                message: '',
                totalPages: 1,
                pageNumber: 1,
                TotalText: '',
                formSearch: {
                    hospitalId: '',
                    warehouseId: '',
                    productCategoryId: '',
                    productId: '',
                    productName: '',
                    productPinYin: ''
                },
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
                        title: '医院',
                        key: 'hospitalName'
                    },
                    {
                        title: '仓库',
                        key: 'warehouseName'
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
                        title: '拼音码',
                        key: 'productPinYin'
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
                        title: '金额',
                        key: 'amount',
                        render: (h, params) => {
                            let text = params.row.amount.toFixed(2)
                            return h('span', text)
                        }
                    }
                ],
                data: [],
                hospitalId: null
            }
        },
        computed: {
            hospList () {
                return this.$store.getters.getSelectAllHospList
            },
            warehouseList () {
                return this.$store.getters.getSelectAllWarehouseList
            },
            productCategoryList () {
                return this.$store.getters.getSelectProductCategoryFirstList
            },
            pageSize () {
                return this.$store.getters.getPageSize
            },
            exportPrefixURL () {
                return this.$store.getters.getExportPrefixURL + '/guard-webManager/excelExport/stockDetail.jhtml'
            }
        },
        created () {
            this.hospitalId = localStorage.getItem('hospId')
            this.getList(1, this.formSearch)
        },
        mounted () {
            this.$store.dispatch('setSelectAllHospList', {})
            this.$store.dispatch('setSelectAllWarehouseList')
            this.$store.dispatch('setSelectProductCategoryFirstList', {})
        },
        methods: {
            getList(pageNumber, form) {
                let _vm = this
                _vm.$store.dispatch('setPageLoading', -1);
                form['pageNumber'] = pageNumber
                form['pageSize'] = _vm.pageSize
                _vm.$http.get({
                    url: 'guard-webManager/report/stockDetail.jhtml',
                    data: form,
                    success: function(res){
                        if(res.data.code == 0) {
                            _vm.data = res.data.content.StatStock.content
                            _vm.total = res.data.content.StatStock.total
                            _vm.pageNumber = res.data.content.StatStock.pageNumber
                            _vm.totalPages = res.data.content.StatStock.totalPages
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
            changePage (num) {
                this.getList(num, this.formSearch)
            },
            handleReset (name) {
                this.$refs[name].resetFields();
                if(name == 'formSearch') {
                    this.getList(1, this.formSearch)
                }
            },
            exportTable () {
                this.$refs.formSubmit.submit()
            }
        }
    }
</script>
