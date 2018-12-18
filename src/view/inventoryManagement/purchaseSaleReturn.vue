/**
 * 退药入库
 */

<template>
    <div class="order-view">
        <div class="container-box">       
            <div class="container-header">
                <h2>退药入库</h2>
            </div>
            <div class="container-body">
                <h3 class="oreder-tit">退药单</h3>
                <Form :model='formShow' :label-width="80" label-position="right">
                    <Row>
                        <Col :sm='12' :md="6" :lg="4">
                            <Form-item label="单据编号：">
                                <span>{{formShow.id}}</span>
                            </Form-item>
                        </Col>
                        <Col :sm='12' :md="6" :lg="4">
                            <Form-item label="科室：">
                                <span>{{formShow.deptName}}</span>
                            </Form-item>
                        </Col>
                        <Col :sm='12' :md="6" :lg="4">
                            <Form-item label="日期：">
                                <span>{{createDate}}</span>
                            </Form-item>
                        </Col>
                        <Col :sm='12' :md="6" :lg="4">
                            <Form-item label="姓名：">
                                <span>{{formShow.customerName}}</span>
                            </Form-item>
                        </Col>
                        <Col :sm='12' :md="6" :lg="4">
                            <Form-item label="性别：">
                                <span>{{gender}}</span>
                            </Form-item>
                        </Col>
                        <Col :sm='12' :md="6" :lg="4">
                            <Form-item label="年龄：">
                                <span>{{year}}</span>
                            </Form-item>
                        </Col>
                        <Col :sm='24' :md="12" :lg="8">
                            <Form-item label="原因：">
                                <p>{{formShow.remark}}</p>
                            </Form-item>
                        </Col>
                    </Row>
                    <hr>
                    <Row>
                        <Col :sm='12' :md="6" :lg="4">
                            <Form-item label="执行人员：">
                                <span>{{formShow.createUserName}}</span>
                            </Form-item>
                        </Col>
                        <Col :sm='12' :md="6" :lg="4">
                            <Form-item label="执行时间：">
                                <span>{{formShow.createTime}}</span>
                            </Form-item>
                        </Col>
                        <Col :sm='12' :md="6" :lg="4">
                            <Form-item label="审核人：">
                                <span>{{formShow.auditName}}</span>
                            </Form-item>
                        </Col>
                        <Col :sm='12' :md="6" :lg="4">
                            <Form-item label="审核时间：">
                                <span>{{formShow.auditTime}}</span>
                            </Form-item>
                        </Col>
                    </Row>
                    <hr>
                </Form>
                <Form ref="formEdit" :model='formEdit' :label-width="80" label-position="right" :rules="ruleForm">
                    <Row>
                        <Col :sm='24' :md="12" :lg="8">
                            <Form-item label="入库仓库" prop='warehouseId' required>
                                <Select v-model="formEdit.warehouseId">
                                    <Option v-for="item in warehouseList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                                </Select>
                            </Form-item>   
                        </Col>
                    </Row>
                    <Form-item label="退药列表" prop='detailListStr' required>
                        <Table stripe :columns="editCol" :data="editData"></Table>
                    </Form-item> 
                </Form>
                <div class="footer-btnGroup">
                    <Button type="primary"  icon="checkmark"  @click='save' :loading='saveLoad'>保存</Button>
                    <Button type="primary"  icon="android-arrow-back" @click='back'>返回</Button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            const validateList = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请选择入库仓库'));
                } else {
                    callback();
                }
            };
            const validateObj = (rule, value, callback) => {
                let _bool = false
                this.editData.map(item => {
                    if(item.num > 0) {
                        _bool = true
                        if(item.expiration === '') {
                            callback(new Error('请选择到期日期'))
                        }
                    }
                })
                if(_bool) {
                    callback()
                } else {
                    callback(new Error('请选择入库药品'))
                }
            };
            return {
                saveLoad: false,
                formShow: {},
                formEdit: {
                    id: '',
                    warehouseId: '',
                    detailListStr: '',
                },
                editCol: [
                    {
                        title: '商品名称',
                        key: 'chargeName'
                    },
                    {
                        title: '规格',
                        key: 'chargeSize'
                    },
                    {
                        title: '单位',
                        key: 'unitName'
                    },
                    {
                        title: '应退数量',
                        key: 'backNum'
                    },
                    {
                        title: '实退数量',
                        key: 'num',
                        render: (h, params) => {
                            return h('cmptInputNumber', {
                                props: {
                                    size: 'small',
                                    min: 0,
                                    max: params.row.backNum,
                                    value: params.row.num,
                                },
                                on: {
                                    'on-change': (val) => {
                                        params.row.num = parseInt(val);
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
                        title: '进价',
                        key: 'price',
                        render: (h, params) => {
                            return h('cmptInputNumber', {
                                props: {
                                    size: 'small',
                                    min: 0,
                                    value: params.row.price,
                                    max: 1000000,
                                },
                                on: {
                                    'on-change': (val) => {
                                        params.row.price = parseFloat(val.toFixed(2));
                                        this.editData[params.index] = params.row;
                                    },
                                    'on-blur': () => {
                                        this.editData[params.index].amount = params.row.price * params.row.num;
                                        this.editData.splice(params.index, 1, this.editData[params.index]);
                                    }
                                }
                            })
                        }
                    },
                    {
                        title: '金额',
                        key: 'amount',
                        render: (h, params) => {
                            const _text = parseFloat((params.row.price * params.row.num).toFixed(2))
                            return h('span', _text)
                        }
                    },
                    {
                        title: '到期日期',
                        key: 'expiration',
                        width: 120,
                        render: (h, params) => {
                            return h('Date-picker', {
                                props: {
                                    type: 'date',
                                    size: 'small',
                                    placeholder: '选择日期',
                                    value: params.row.expiration,
                                    transfer: true,
                                    options: {
                                        disabledDate (date) {
                                            return date && date.valueOf() < Date.now() - 86400000
                                        }
                                    }
                                },
                                on: {
                                    'on-change': (val) => {
                                        this.editData[params.index].expiration = val
                                    }
                                }
                            })
                        }
                    },
                    {
                        title: '产品批号',
                        key: 'batch',
                        render: (h, params) => {
                            let _val = '',
                                _bool = false
                            return h('Input', {
                                props: {
                                    size: 'small',
                                    value: params.row.batch,
                                    placeholder: '填写批号',
                                },
                                on: {
                                    input: (val) => {
                                        console.log(val)
                                        _val = val
                                    },
                                    'on-change': () => {
                                        _bool = true
                                    },
                                    'on-blur': () => {
                                        if(_bool) {
                                            this.editData[params.index].batch = _val
                                        }
                                    }
                                }
                            })
                        }
                    },
                ],
                editData: [],
                ruleForm: {
                    warehouseId: [
                        { validator: validateList, trigger: 'change' }
                    ],
                    detailListStr: [
                        { validator: validateObj, trigger: 'change' }
                    ],
                }
            }
        },
        computed: {
            createDate () {
                let _date = typeof this.formShow.createTime === 'string' ? this.formShow.createTime.split(' ')[0] : ''
                return _date
            },
            gender () {
                let _text = this.formShow.customerGender == 1 ? '男' : '女'
                return _text
            },
            year () {
                let _text = ''
                if(typeof this.formShow.customerAge != 'string') {
                    return _text
                } else {
                    const date = new Date()
                    const year = date.getFullYear()
                    return year - this.formShow.customerAge
                }
            },
            warehouseList () {
                return this.$store.getters.getSelectUserWarehouseList
            },
            setSave () {
                return JSON.stringify(this.editData)
            },
        },
        created () {
            this.formEdit.id = this.$route.query.id
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
                    url: 'guard-webManager/stockIn/getAddSalesReturn.jhtml',
                    data: {
                        id: _vm.$route.query.id
                    },
                    success: function(res){
                        if(res.data.code == 0) {
                            console.log(res)
                            let _box = res.data.content.sales || {},
                                _list = _box.detailList || [],
                                _audit = res.data.content.audit || {},
                                _auditName = [],
                                _auditTime = []
                            _list.map(item => {
                                item.backNum = item.num
                                item.amount = item.num * item.price
                                item.batch = ''
                                item.expiration = ''
                            })
                            _vm.editData = _list
                            _vm.formShow = _box
                            if(typeof _audit.userName5 === 'string') {
                                _auditName.push(_audit.userName5)
                            }
                            if(typeof _audit.userName4 === 'string') {
                                _auditName.push(_audit.userName4)
                            }
                            if(typeof _audit.userName3 === 'string') {
                                _auditName.push(_audit.userName3)
                            }
                            if(typeof _audit.userName2 === 'string') {
                                _auditName.push(_audit.userName2)
                            }
                            if(typeof _audit.userName === 'string') {
                                _auditName.push(_audit.userName)
                            }
                            _vm.formShow.auditName = _auditName.length > 0 ? _auditName[0] : ''
                            if(typeof _audit.audittime5 === 'string') {
                                _auditTime.push(_audit.audittime5)
                            }
                            if(typeof _audit.audittime4 === 'string') {
                                _auditTime.push(_audit.audittime4)
                            }
                            if(typeof _audit.audittime3 === 'string') {
                                _auditTime.push(_audit.audittime3)
                            }
                            if(typeof _audit.audittime2 === 'string') {
                                _auditTime.push(_audit.audittime2)
                            }
                            if(typeof _audit.audittime === 'string') {
                                _auditTime.push(_audit.audittime)
                            }
                            _vm.formShow.auditTime = _auditTime.length > 0 ? _auditTime[0] : ''
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
                            url: 'guard-webManager/stockIn/addSalesReturn.jhtml',
                            data: _vm.formEdit,
                            success: function(res){
                                if(res.data.code == 0) {
                                    console.log(res)
                                    let breadData = [
                                        {
                                            url: '/desktop',
                                            text: '桌面'
                                        },
                                        {
                                            url: '/purchase',
                                            text: '入库管理'
                                        },
                                        {
                                            url: '/printView',
                                            text: '打印预览'
                                        }
                                    ]
                                    _vm.$store.dispatch('setBreadData', breadData)
                                    _vm.$router.push({
                                        path: '/printView',
                                        query: {
                                            id: res.data.content.id,
                                            type: res.data.content.type,
                                        }
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
</style>