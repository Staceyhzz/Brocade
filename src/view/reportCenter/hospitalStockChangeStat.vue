/**
 * 医院库存存结余表
 */

<template>
    <div class="container-box" ref="containerBox">
        <div class="container-header">
            <h2>医院库存结余表</h2>
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
                    <Date-picker :transfer='true' type="daterange" placement="bottom-start" placeholder="选择日期" :clearable="false" style="width: 180px" @on-change='setDate' :value='dateBox'></Date-picker>
                </Form-item>
                <Form-item label="仓库" prop='warehouseId'>
                    <Select v-model="formSearch.warehouseId" style="width:200px">
                        <Option v-for="item in warehouseList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </Form-item>
                <Form-item label="物品分类" prop='productCategoryId'>
                    <Select v-model="formSearch.productCategoryId" style="width:200px">
                        <Option v-for="item in productCategoryList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </Form-item>
                <Form-item label="物品编号" prop='productId'>
                    <Input type="text" :maxlength='15' v-model.trim="formSearch.productId" placeholder="请输入物品编号" @on-enter="getList(formSearch)"></Input>
                </Form-item>
                <Form-item label="物品名称" prop='productName'>
                    <Input type="text" :maxlength='15' v-model.trim="formSearch.productName" placeholder="请输入名称" @on-enter="getList(formSearch)"></Input>
                </Form-item>
                <ul class="header-btn-group not-float">
                    <li class="header-item" @click="getList(formSearch)"><Icon type="search"></Icon>查询</li>
                    <li class="header-item" @click="handleReset('formSearch')"><Icon type="refresh"></Icon>重置</li>
                </ul>
            </Form>

            <Alert>
                <div v-html="TotalText">{{TotalText}}</div>
            </Alert>

            <Table stripe :columns="col" :data="data"></Table>
            

        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                show: false,
                adminToken: this.$token.readToken('adminToken') || '', exportKey: localStorage.getItem('exportKey'),
                formSearch: {
                	startTime: moment().format('YYYY-MM-DD'),
                    endTime: moment().format('YYYY-MM-DD'),
                    warehouseId: '',
                    productCategoryId: '',
                    productId: '',
                    productName: ''
                },
                TotalText: '',
                dateBox: [moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')],
                data: [],
                hospitalId: null,
                col: [
                    {
                        title: '序号',
                        type: 'index',
                        render: (h, params) => {
                            const _index = (this.pageNumber - 1) * 10
                            return h('span', params.index + 1 + _index)
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
                        title: '分类',
                        key: 'productCategoryName'
                    },
                    {
                        title: '单位',
                        key: 'productUnitName'
                    },
                    {
                        title: '当前库存',
                        key: 'stockNum'
                    },
                    {
                        title: '当前总额',
                        key: 'stockAmount'
                    },
                    {
                        title: '期初库存',
                        key: 'beginTotalNum'
                    },
                    {
                        title: '期初总额',
                        key: 'beginTotalAmount'
                    },
                    {
                        title: '期中入库数量',
                        key: 'inNum'
                    },
                    {
                        title: '期中入库总额',
                        key: 'inAmount'
                    },
                     {
                        title: '期中出库数量',
                        key: 'outNum'
                    },
                    {
                        title: '期中出库总额',
                        key: 'outAmount'
                    },
                     {
                        title: '期末库存',
                        key: 'endTotalNum'
                    },
                    {
                        title: '期末总额',
                        key: 'endTotalAmount'
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
            exportPrefixURL () {
                return this.$store.getters.getExportPrefixURL + '/guard-webManager/excelExport/hospitalStockChangeStat.jhtml'
            }
        },
        created () {
            this.hospitalId = localStorage.getItem('hospId')
            this.$store.dispatch('setSelectHospitalWarehouseList', this.hospitalId)
        },
        mounted () {
            this.$store.dispatch('setSelectProductCategoryFirstList', {})
            if(this.warehouseList.length > 0) {
                this.formSearch.warehouseId = this.warehouseList[0].id
            }
            this.getList(this.formSearch)
        },
        methods: {
            getList(form) {
                let _vm = this
                _vm.$store.dispatch('setPageLoading', -1)
                _vm.$http.get({
                    url: 'guard-webManager/report/hospitalStockChangeStat.jhtml',
                    data: form,
                    success: function(res){
                        if(res.data.code == 0) {
                            _vm.data = res.data.content.List
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
                    this.getList(this.formSearch)
                }
            },
            exportTable () {
                this.$refs.formSubmit.submit()
            }
        }
    }
</script>
