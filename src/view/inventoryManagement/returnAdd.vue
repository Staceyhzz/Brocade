/**
 * 厂家退货信息
 */

<template>
    <div class="container-box">       
        <div class="container-header">
            <h2>厂家退货信息</h2>
        </div>
        <div class="container-body">
            <Form ref="formEdit" :model='formEdit' :label-width="70" label-position="right" style='margin-top:10px;' :rules="ruleForm">
                <Form-item label="仓库" prop='warehouseId' required>
                    <Select v-model="formEdit.warehouseId" style="width:300px" @on-change='changeWare' :disabled="formEdit.warehouseId == '' ? false : true">
                        <Option v-for="item in warehouseList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </Form-item>
                <Form-item label="退货日期" prop='createDate'>
                    <Date-picker :transfer='true' type="date" placeholder="选择日期" style="width: 300px" :value='formEdit.createDate' :clearable='false' @on-change='setTime'></Date-picker>
                </Form-item>
                <Form-item label="供应商" prop='supplierName' required>
                    <cmptSupplierChoose _placeHolder="选择供应商" :_style="{width:'300px'}" :_supplierName="formEdit.supplierName" v-on:setSupplierName="setSupplier"></cmptSupplierChoose>
                </Form-item>
                <Form-item label="备注" prop="remark">
                    <Input v-model.trim="formEdit.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入备注" :maxlength='100'></Input>
                </Form-item>
                <Form-item prop="detailListStr" required label="列表"> 
                    <Table stripe :columns="editCol" :data="editData"></Table>
                </Form-item>
            </Form>
            <div class="footer-btnGroup">
                <Button type="primary"  icon="checkmark"  @click='save' :loading='saveLoad'>保存</Button>
                <Button type="primary"  icon="android-arrow-back" @click='back'>返回</Button>
            </div>
        </div>
        <div class="container-header">
            <h2>选择库存</h2>
        </div>
        <div class="container-body">
            <Form :label-width="60" inline :model="formSearch" ref='formSearch'>
                <Form-item label="名称" prop='productName'>
                    <Input v-model.trim="formSearch.productName" placeholder="请输入名称" @on-enter='getList'></Input>
                </Form-item>
                <Form-item label="拼音码" prop='productPinYin'>
                    <Input v-model.trim="formSearch.productPinYin" placeholder="请输入拼音码" @on-enter='getList'></Input>
                </Form-item>
                <Form-item label="类型" prop='productCategoryId'>
                    <cmptProductChoose _placeHolder="选择类型" :_style="{width:'162px'}" :_productName="showProductName" v-on:setProductName="setProduct"></cmptProductChoose>
                </Form-item>
                <ul class="header-btn-group not-float">
                    <li class="header-item"  @click="getList"><Icon type="search"></Icon>查询</li>
                    <li class="header-item" @click="handleReset('formSearch')"><Icon type="refresh"></Icon>重置</li>
                </ul>
            </Form>
            <Table height="420" :columns="addCol" :data="addData" stripe @on-selection-change='chooseCol'></Table>
            <div class="footer-btnGroup">
                <Button type="primary"  icon="checkmark"  @click='setChoose'>选择</Button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            const validateList = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请选择信息'));
                } else {
                    callback();
                }
            };
            const validateWar = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请先选择仓库，一经选择无法修改'));
                } else {
                    callback();
                }
            };
            const validateObj = (rule, value, callback) => {
                if (this.editData.length == 0) {
                    callback(new Error('请选择列表信息'));
                } else {
                    callback();
                }
            };
            return {
                saveLoad: false,
                formEdit: {
                    warehouseId: '',
                    supplierId: '',
                    supplierName: '',
                    createDate: moment().format('YYYY-MM-DD'),
                    remark: '',
                    detailListStr: '',
                },
                formSearch: {
                    warehouseId: '',
                    productName: '',
                    productPinYin: '',
                    productCategoryId: '',
                },
                showProductName: '',
                editCol: [
                    {
                        title: '编号',
                        key: 'productid'
                    },
                    {
                        title: '名称',
                        key: 'productName'
                    },
                    {
                        title: '规格',
                        key: 'productSize'
                    },
                    {
                        title: '单位',
                        key: 'productUnitName'
                    },
                    {
                        title: '数量',
                        key: 'realNum',
                        render: (h, params) => {
                            return h('cmptInputNumber', {
                                props: {
                                    size: 'small',
                                    min: 1,
                                    max: params.row.num,
                                    value: params.row.realNum,
                                },
                                on: {
                                    'on-change': (val) => {
                                        params.row.realNum = parseInt(val);
                                        this.editData[params.index] = params.row;
                                    },
                                    'on-blur': () => {
                                        this.editData.splice(params.index, 1, this.editData[params.index]);
                                    }
                                }
                            })
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 80,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                    h('Button', {
                                        props: {
                                            type: 'error',
                                            size: 'small',
                                            icon: 'ios-trash-outline'
                                        },
                                        on: {
                                            click: () => {
                                                this.remove(params.index)
                                            }
                                        }
                                    }, '删除'),
                                ])
                        }
                    }
                ],
                addCol: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '编号',
                        key: 'productid'
                    },
                    {
                        title: '名称',
                        key: 'productName'
                    },
                    {
                        title: '规格',
                        key: 'productSize'
                    },
                    {
                        title: '分类',
                        key: 'productCategoryName',
                    },
                    {
                        title: '单位',
                        key: 'productUnitName'
                    },
                    {
                        title: '数量',
                        key: 'num'
                    },
                ],
                editData: [],
                addData:  [],
                selectBox: [],
                ruleForm: {
                    warehouseId: [
                        { validator: validateWar, trigger: 'change' }
                    ],
                    supplierName: [
                        { validator: validateList, trigger: 'change' }
                    ],
                    detailListStr: [
                        { validator: validateObj, trigger: 'change' }
                    ],
                }
            }
        },
        computed: {
            setSave () {
                let _box = []
                let _obj = {}
                this.editData.map(item => {
                    _obj.StockInDetailID = item.stockindetailid
                    _obj.Num = item.realNum
                    _box.push(_obj)
                    _obj = {}
                })
                return JSON.stringify(_box)
            },
            warehouseList () {
                return this.$store.getters.getSelectUserWarehouseList
            },
        },
        created () {
            this.$store.dispatch('setPageLoading', 1)
        },
        mounted () {
            this.$store.dispatch('setSelectUserWarehouseList', localStorage.getItem('userId'))
            this.$refs.formEdit.validateField('warehouseId')
        },
        methods: {
            //获取类型
            setProduct (data) {
                this.formSearch.productCategoryId = data.id
                this.showProductName = data.name
            },
            //查询项目
            getList () {
                let _vm = this;
                _vm.addCol.splice(7)
                if(_vm.formSearch.warehouseId != '') {
                    _vm.$http.get({
                        url: 'guard-webManager/return/productList.jhtml',
                        data: _vm.formSearch,
                        success: function(res){
                            if(res.data.code == 0) {
                                console.log(res)
                                if(res.data.content.ViewPrice == 1) {
                                    _vm.addCol.push(
                                        {
                                            title: '价格',
                                            key: 'amount',
                                        },
                                        {
                                            title: '金额',
                                            key: 'price',
                                        },
                                    )
                                }
                                _vm.addData = res.data.content.Stock
                            } else {
                                console.log(res)
                            }
                        },
                        error: function(res){
                            console.log(res);
                        }
                    });
                }
            },
            //供应商
            setSupplier (data) {
                this.formEdit.supplierId = data.id
                this.formEdit.supplierName = data.name
            },
            chooseCol (data) {
                this.selectBox = data
            },
            setChoose () {
                let _vm = this
                let _bool = true
                _vm.selectBox.map(item => {
                    _vm.editData.map(item1 => {
                        if(item1.stockindetailid == item.stockindetailid) {
                            _bool = false
                        }
                    })
                    if(_bool) {
                        item.realNum = item.num
                        _vm.editData.push(item)
                    } else {
                        _bool = true
                    }
                })
            },
            remove (index) {
                this.editData.splice(index, 1)
            },
            changeWare (id) {
                this.formSearch.warehouseId = id
            },
            //重置
            handleReset (name) {
                this.$refs[name].resetFields();
                if(name == 'formSearch') {
                    this.showProductName = '';
                }
                this.getList()
            },
            setTime (date) {
                this.formEdit.createDate = date
            },
            save () {
                let _vm = this
                _vm.$refs['formEdit'].validate((valid) => { 
                    if (valid) {
                        _vm.saveLoad = true
                        _vm.formEdit.detailListStr = _vm.setSave
                        _vm.$http.post({
                            url: 'guard-webManager/return/add.jhtml',
                            data: _vm.formEdit,
                            success: function(res){
                                if(res.data.code == 0) {
                                    _vm.$router.push('/return')
                                    _vm.$Notice.success({
                                        title: '系统提示！',
                                        desc: '操作成功'
                                    })
                                } else {
                                    _vm.saveLoad = false
                                    _vm.$Notice.error({
                                        title: '系统提示！',
                                        desc: res.data.desc
                                    });
                                }
                            },
                            error: function(res){
                                console.log(res);
                            }
                        });
                    }
                })
            },
            back () {
                this.$router.back(-1)
            }
        }

    }
</script>   

<style>
   
</style>