/**
 * 添加发票信息
 */

<template>
    <div class="container-box">    
        <div class="container-header">
            <h2>添加发票信息</h2>
        </div>
        <div class="container-body">
            <Form ref="formEdit" :model='formEdit' :label-width="70" label-position="right" style='margin-top:10px;' :rules="ruleForm">
                <Form-item label="供应商" prop='supplierName' required>
                    <cmptSupplierChoose _placeHolder="选择供应商" :_style="{width:'300px'}" :_supplierName="formEdit.supplierName" v-on:setSupplierName="setSupplier"></cmptSupplierChoose>
                </Form-item>
                <Form-item label="发票号" prop='code' required>
                    <Input v-model.trim="formEdit.code" placeholder="请输入发票号" style="width:300px" :maxlength='20'></Input>
                </Form-item>
                <Form-item label="名称" prop='name'>
                    <Input v-model.trim="formEdit.name" placeholder="请输入名称" style="width:300px" :maxlength='20'></Input>
                </Form-item>
                <Form-item label="金额" prop='amount' required>
                    <cmptInputNumber :min="0" :max='1000000' v-model="formEdit.amount" style="width:300px"></cmptInputNumber>
                </Form-item>
                <Form-item label="备注" prop="remark">
                    <Input v-model="formEdit.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入备注" :maxlength='100'></Input>
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
            <h2>选择采购单</h2>
        </div>
        <div class="container-body">
            <Form :label-width="60" inline :model="formSearch" ref='formSearch'>
                <Form-item label="仓库" prop='warehouseId' required>
                    <Select v-model="formSearch.warehouseId" clearable style="width:180px">
                        <Option v-for="item in warehouseList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </Form-item>   
                <Form-item label="进货日期" prop='startTime'>
                    <Date-picker :transfer='true' type="daterange" placement="bottom-start" placeholder="选择日期" style="width: 180px" @on-change='setDate' ref='cleanDate'></Date-picker>
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
            const validateObj = (rule, value, callback) => {
                if (this.editData.length == 0) {
                    callback(new Error('请选择列表信息'));
                } else {
                    callback();
                }
            };
            const validateText = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请填写发票号'));
                } else {
                    callback();
                }
            };
            return {
                saveLoad: false,
                formEdit: {
                    supplierId: '',
                    supplierName: '',
                    code: '',
                    name: '',
                    amount: 0,
                    remark: '',
                    detailListStr: '',
                },
                formSearch: {
                    warehouseId: '',
                    supplierId: '',
                    startTime: '',
                    endTime: '',
                },
                categoryName: '',
                editCol: [
                    {
                        title: '单号',
                        key: 'no'
                    },
                    {
                        title: '仓库',
                        key: 'warehouseName'
                    },
                    {
                        title: '供应商',
                        key: 'supplierName'
                    },
                    {
                        title: '入库日期',
                        key: 'createdate',
                        render: (h, params) => {
                            const _text = params.row.createdate.split(' ')[0]
                            return h('span', _text)
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
                        title: '单号',
                        key: 'no'
                    },
                    {
                        title: '仓库',
                        key: 'warehouseName'
                    },
                    {
                        title: '供应商',
                        key: 'supplierName'
                    },
                    {
                        title: '入库日期',
                        key: 'createdate',
                        render: (h, params) => {
                            const _text = params.row.createdate.split(' ')[0]
                            return h('span', _text)
                        }
                    },
                ],
                editData: [],
                addData:  [],
                selectBox: [],
                ruleForm: {
                    code: [
                        { validator: validateText, trigger: 'blur' }
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
                    _obj.PurchaseID = item.id
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
        },
        methods: {
            //查询项目
            getList () {
                let _vm = this;
                _vm.$http.get({
                    url: 'guard-webManager/invoice/purchaseList.jhtml',
                    data: _vm.formSearch,
                    success: function(res){
                        if(res.data.code == 0) {
                            _vm.addData = res.data.content.content
                        } else {
                            console.log(res)
                        }
                    },
                    error: function(res){
                        console.log(res);
                    }
                });
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
                        if(item1.id == item.id) {
                            _bool = false
                        }
                    })
                    if(_bool) {
                        _vm.editData.push(item)
                    } else {
                        _bool = true
                    }
                })
            },
            remove (index) {
                this.editData.splice(index, 1)
            },
            //重置
            handleReset (name) {
                this.$refs[name].resetFields();
                if(name == 'formSearch') {
                    this.$refs['cleanDate'].handleClear();
                }
                this.getList()
            },
            setDate (date) {
                this.formSearch.startTime = date[0]
                this.formSearch.startTime = date[1]
            },
            save () {
                let _vm = this
                _vm.$refs['formEdit'].validate((valid) => { 
                    if (valid) {
                        _vm.saveLoad = true
                        _vm.formEdit.detailListStr = _vm.setSave
                        _vm.$http.post({
                            url: 'guard-webManager/invoice/add.jhtml',
                            data: _vm.formEdit,
                            success: function(res){
                                if(res.data.code == 0) {
                                    _vm.$router.push('/invoice')
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