/**
 * 医院库存变动统计
 */

 <template>
    <div class="container-box hospSCTS" ref="containerBox">
        <div class="container-header">
            <h2>医院库存变动统计</h2>
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
			<table class="tableEdit hospSCTS-table" border="1">
                <thead>
                    <tr class="table-item">
                        <th rowspan="2">序号</th>
                        <th rowspan="2">物品编号</th>
                        <th rowspan="2">物品名称</th>
                        <th rowspan="2">规格</th>
                        <th rowspan="2">分类</th>
                        <th rowspan="2">单位</th>
                        <th colspan="2">当前</th>
                        <th colspan="2">期初</th>
                        <th colspan="2">期末</th>
                        <th colspan="2">进货入库</th>
                        <th colspan="2">调拨入库</th>
                        <th colspan="2">盘盈入库</th>
                        <th colspan="2">借用归还入库</th>
                        <th colspan="2">退药入库</th>
                        <th colspan="2">消耗出库</th>
                        <th colspan="2">退货出库</th>
                        <th colspan="2">调拨出库</th>
                        <th colspan="2">盘亏出库</th>
                        <th colspan="2">领用出库</th>
                        <th colspan="2">借用出库</th>
                        <th colspan="2">销售出库</th>
                        <th colspan="2">合计入库</th>
                        <th colspan="2">合计出库</th>
                    </tr>
                    <tr class="table-item">
                        <th>库存</th>
                        <th>总额</th>
                        <th>库存</th>
                        <th>总额</th>
                        <th>库存</th>
                        <th>总额</th>
                        <th>数量</th>
                        <th>金额</th>
                        <th>数量</th>
                        <th>金额</th>
                        <th>数量</th>
                        <th>金额</th>
                        <th>数量</th>
                        <th>金额</th>
                        <th>数量</th>
                        <th>金额</th>
                        <th>数量</th>
                        <th>金额</th>
                        <th>数量</th>
                        <th>金额</th>
                        <th>数量</th>
                        <th>金额</th>
                        <th>数量</th>
                        <th>金额</th>
                        <th>数量</th>
                        <th>金额</th>
                        <th>数量</th>
                        <th>金额</th>
                        <th>数量</th>
                        <th>金额</th>
                        <th>数量</th>
                        <th>金额</th>
                        <th>数量</th>
                        <th>金额</th>
                    </tr>
                </thead>
                <tbody class="ivu-table-body">
                    <tr class="table-item" v-for="(item, index) in data">
                        <td><b>{{index+1}}</b></td>
                        <td>{{item.productID}}</td>
                        <td>{{item.productName}}</td>
                        <td>{{item.productSize}}</td>
                        <td>{{item.productCategoryName}}</td>
                        <td>{{item.productUnitName}}</td>
                        <td>{{item.stockNum}}</td>
                        <td>{{item.stockAmount}}</td>
                        <td>{{item.beginTotalNum}}</td>
                        <td>{{item.beginTotalAmount}}</td>
                        <td>{{item.endTotalNum}}</td>
                        <td>{{item.endTotalAmount}}</td>
                        <td>{{item.inNum1}}</td>
                        <td>{{item.inAmount1}}</td>
                        <td>{{item.inNum2}}</td>
                        <td>{{item.inAmount2}}</td>
                        <td>{{item.inNum3}}</td>
                        <td>{{item.inAmount3}}</td>
                        <td>{{item.inNum4}}</td>
                        <td>{{item.inAmount4}}</td>
                        <td>{{item.inNum5}}</td>
                        <td>{{item.inAmount5}}</td>
                        <td>{{item.outNum1}}</td>
                        <td>{{item.outAmount1}}</td>
                        <td>{{item.outNum2}}</td>
                        <td>{{item.outAmount2}}</td>
                        <td>{{item.outNum3}}</td>
                        <td>{{item.outAmount3}}</td>
                        <td>{{item.outNum4}}</td>
                        <td>{{item.outAmount4}}</td>
                        <td>{{item.outNum5}}</td>
                        <td>{{item.outAmount5}}</td>
                        <td>{{item.outNum6}}</td>
                        <td>{{item.outAmount6}}</td>
                        <td>{{item.outNum7}}</td>
                        <td>{{item.outAmount7}}</td>
                        <td>{{item.inNum}}</td>
                        <td>{{item.inAmount}}</td>
                        <td>{{item.outNum}}</td>
                        <td>{{item.outAmount}}</td>
                    </tr>
                </tbody>
            </table>
            
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
                dateBox: [moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')],
                data: [],
                hospitalId: null,
                TotalText: ''
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
                return this.$store.getters.getExportPrefixURL + '/guard-webManager/excelExport/hospitalStockChangeTypeStat.jhtml'
            }
        },
        created () {
            this.hospitalId = localStorage.getItem('hospId')
            this.$store.dispatch('setSelectHospitalWarehouseList', this.hospitalId)
        },
        mounted () {
            this.$store.dispatch('setSelectProductCategoryFirstList', {})
            // if(this.warehouseList.length > 0) {
            //     this.formSearch.warehouseId = this.warehouseList[0].id
            // }
            this.getList(this.formSearch)
        },
        methods: {
            getList(form) {
                let _vm = this
                _vm.$store.dispatch('setPageLoading', -1)
                _vm.$http.get({
                    url: 'guard-webManager/report/hospitalStockChangeTypeStat.jhtml',
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
<style type="text/css" scoped>
    .hospSCTS .hospSCTS-table {
        width: 100%;
    }
    .hospSCTS .hospSCTS-table thead tr{
        border-right: 1px solid #d7dde4;
    }
    .hospSCTS .hospSCTS-table tr {
        border-top: 1px solid #d7dde4;
        border-left: 1px solid #d7dde4;
    }
    .hospSCTS-table td, 
    .hospSCTS-table th {
        height: 32px;
        padding: 0 10px;
        text-align: center;
    }
    #app .tableEdit.hospSCTS-table td,#app .tableEdit.hospSCTS-table th{
        border-bottom: 1px solid #d7dde4;
        border-right: 1px solid #d7dde4;
    }
    .hidden {
        display: none;
    }
</style>