/**
 * 销售出库
 */

<template>
    <div class="container-box">      
        <div class="container-header">
            <h2>销售出库</h2>
        </div>
        <div class="container-body">
            <h3 class="oreder-tit">销售单</h3>
            <Form :model='formShow' :label-width="80" label-position="right">
                <Row>
                    <Col :sm='12' :md="6" :lg="4">
                        <Form-item label="订单编号：">
                            <span>{{formShow.id}}</span>
                        </Form-item>
                    </Col>
                    <Col :sm='12' :md="6" :lg="4">
                        <Form-item label="下单人员：">
                            <span>{{formShow.createUserName}}</span>
                        </Form-item>
                    </Col>
                    <Col :sm='12' :md="6" :lg="4">
                        <Form-item label="订单日期：">
                            <span>{{createTime}}</span>
                        </Form-item>
                    </Col>
                    <Col :sm='12' :md="6" :lg="4">
                        <Form-item label="支付日期：">
                            <span>{{paidTime}}</span>
                        </Form-item>
                    </Col>
                    <Col :sm='12' :md="6" :lg="4">
                        <Form-item label="客户姓名：">
                            <span>{{formShow.customerName}}</span>
                        </Form-item>
                    </Col>
                    <Col :sm='12' :md="6" :lg="4">
                        <Form-item label="执行人员：">
                            <span>{{formShow.userName}}</span>
                        </Form-item>
                    </Col>
                    <Col :sm='12' :md="6" :lg="4">
                        <Form-item label="出库机构：">
                            <span>{{formShow.hospName}}</span>
                        </Form-item>
                    </Col>
                    <Col :sm='24' :md="12" :lg="8">
                        <Form-item label="订单备注：">
                            <p>{{formShow.remark}}</p>
                        </Form-item>
                    </Col>
                </Row>
                <hr>
            </Form>
            <Form ref="formEdit" :model='formEdit' :rules="ruleForm">
                <Form-item prop='detailListStr'>
                    <div v-for='(item, index) in editData' :key='index' class="stockSale-item">
                        <p>出货仓库：{{item.name}}</p>
                        <Table stripe :columns="editCol" :data="item.detailList" v-if='item.status === 1'></Table>
                        <p v-else>您不属于此仓库管理员！</p>
                    </div>
                </Form-item> 
            </Form>
            <div class="footer-btnGroup">
                <Button type="primary"  icon="checkmark"  @click='save' :loading='saveLoad'>保存</Button>
                <Button type="primary"  icon="android-arrow-back" @click='back'>返回</Button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            const validateObj = (rule, value, callback) => {
                let _bool = false
                this.editData.map(list => {
                    if(list.status === 1) {
                        let _box = list.detailList || []
                        _box.map(item => {
                            if(item.checkKey) {
                                _bool = true
                            }
                        })
                    }
                })
                if(_bool) {
                    callback()
                } else {
                    callback(new Error('请选择出库药品'))
                }
            };
            return {
                saveLoad: false,
                formShow: {
                    userName: '',
                    hospName: '',
                },
                formEdit: {
                    detailListStr: '',
                },
                editCol: [
                    {
                        title: '操作',
                        render: (h, params) => {
                            return h('Checkbox', {
                                props: {
                                    disabled: params.row._disabled,
                                    value: params.row.checkKey
                                },
                                on: {
                                    'on-change': (val) => {
                                        this.editData[params.row.parentIndex].detailList[params.index].checkKey = val
                                    }
                                }
                            })
                        }
                    },
                    {
                        title: '商品名称',
                        render: (h, params) => {
                            return h('span', params.row.prductEntity.name)
                        }
                    },
                    {
                        title: '别名',
                        render: (h, params) => {
                            return h('span', params.row.prductEntity.alias)
                        }
                    },
                    {
                        title: '状态',
                        render: (h, params) => {
                            const _text = params.row.outStatus === 0 ? '未发货' : '已发货'
                            const _color = params.row.outStatus === 0 ? 'blue' : 'red'
                            return h('span', {
                                style: {
                                    color: _color
                                }
                            }, _text)
                        }
                    },
                    {
                        title: '规格',
                        render: (h, params) => {
                            return h('span', params.row.prductEntity.size)
                        }
                    },
                    {
                        title: '单位',
                        render: (h, params) => {
                            return h('span', params.row.prductEntity.unitName)
                        }
                    },
                    {
                        title: '进价',
                        render: (h, params) => {
                            return h('span', params.row.price)
                        }
                    },
                    {
                        title: '数量',
                        key: 'outNum',
                    },
                    {
                        title: '金额',
                        render: (h, params) => {
                            return h('span', params.row.amount)
                        }
                    },
                    {
                        title: '库存',
                        key: 'num',
                    },
                ],
                editData: [],
                selectData: [],
                ruleForm: {
                    detailListStr: [
                        { validator: validateObj, trigger: 'change' }
                    ],
                }
            }
        },
        computed: {
            createTime () {
                let _date = typeof this.formShow.createtime === 'string' ? this.formShow.createtime.split(' ')[0] : ''
                return _date
            },
            paidTime () {
                let _date = typeof this.formShow.paidtime === 'string' ? this.formShow.paidtime.split(' ')[0] : ''
                return _date
            },
            setSave () {
                let _box = [],
                    _obj = {},
                    _itemObj = {}
                this.editData.map(list => {
                    if(list.status === 1) {
                        _obj.WarehouseID = list.warehouseID
                        _obj.name = list.name
                        _obj.detailList  = []
                        let _item = list.detailList || []
                        _item.map(item => {
                            if(item.checkKey) {
                                _itemObj.ID = item.id
                                _itemObj.Num = item.outNum
                                _itemObj.ProductID = item.prductEntity.id
                                _itemObj.productName = item.prductEntity.name
                                _obj.detailList.push(_itemObj)
                                _itemObj = {}
                            }
                        })
                        _box.push(_obj)
                        _obj = {}
                    }
                })
                return JSON.stringify(_box)
            },
        },
        created () {
            this.getId()
        },
        mounted () {
            this.$store.dispatch('setSelectUserWarehouseList', localStorage.getItem('userId'))
        },
        methods: {
            getId () {
                let _vm = this
                _vm.$store.dispatch('setPageLoading', -1)
                _vm.$http.get({
                    url: 'guard-webManager/stockOut/getaddSaleStockOut.jhtml',
                    data: {
                        orderID: _vm.$route.query.id,
                        customerID: _vm.$route.query.cusId,
                    },
                    success: function(res){
                        if(res.data.code == 0) {
                            console.log(res)
                            _vm.formShow = res.data.content.order || {}
                            let _data = res.data.content.list || []
                            _data.map((list, index) => {
                                if(list.status === 1) {
                                    let _box = list.detailList || []
                                    _box.map(item => {
                                        if(item.outStatus === 1) {
                                            item._disabled = true
                                        } else {
                                            item._disabled = false
                                        }
                                        item.checkKey = false
                                        item.parentIndex = index
                                    })
                                }
                            })
                            _vm.editData = _data
                            _vm.formShow.userName = localStorage.getItem('userAccount')
                            _vm.formShow.hospName = localStorage.getItem('hospName')
                            _vm.$store.dispatch('setPageLoading', 1)
                        } else {
                            console.log(res)
                        }
                    },
                    error: function(res){
                        console.log(res);
                    }
                })
            },
            save () {
                let _vm = this
                _vm.$refs['formEdit'].validate((valid) => { 
                    if (valid) {
                        _vm.saveLoad = true
                        _vm.formEdit.detailListStr = _vm.setSave
                        _vm.$http.post({
                            url: 'guard-webManager/stockOut/addSaleStockOut.jhtml',
                            data: {
                                customerID: _vm.$route.query.cusId,
                                remark: _vm.formShow.remark,
                                detailListStr: _vm.formEdit.detailListStr
                            },
                            success: function(res){
                                if(res.data.code == 0) {
                                    _vm.$router.push('/stockOut')
                                    _vm.$Notice.success({
                                        title: '系统提示！',
                                        desc: '操作成功！'
                                    })
                                } else {
                                    _vm.saveLoad = false
                                    _vm.$Notice.error({
                                        title: '系统提示！',
                                        desc: res.data.desc
                                    })
                                }
                            },
                            error: function(res){
                                console.log(res)
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

<style scoped>
    hr {
        width: 100%;
        height: 1px;
        margin-bottom: 15px;
        border: none;
        background: rgba(65, 65, 65, 0.1);
   }
   .stockSale-item {
    margin-bottom: 20px;
   }
</style>