/**
 * 查看借用归还单
 */

<template>
    <div class="order-view">
        <div class="container-box">      
            <div class="container-header">
                <h2>借用归还单详情</h2>
            </div>
            <div class="container-body">
                <h3 class="oreder-tit">借用归还单</h3>
                <Form ref="formShow" :model='formShow' :label-width="80" label-position="right" style='margin-top:10px;'>
                    <Row>
                        <Col :sm='24' :md="12" :lg="6">
                            <Form-item label="单据类型：">
                                <span>借用归还单</span>
                            </Form-item>   
                        </Col>
                        <Col :sm='24' :md="12" :lg="6">
                            <Form-item label="单据编号：">
                                <span>{{formShow.no}}</span>
                            </Form-item>   
                        </Col>
                        <Col :sm='24' :md="12" :lg="6">
                            <Form-item label="单据状态：">
                                <span>待入库</span>
                            </Form-item>   
                        </Col>
                        <Col :sm='24' :md="12" :lg="6">
                            <Form-item label="借用部门：">
                                <span>{{formShow.fromName}}</span>
                            </Form-item>   
                        </Col>
                        <Col :sm='24' :md="12" :lg="6">
                            <Form-item label="借用人员：">
                                <span>{{formShow.doUserName}}</span>
                            </Form-item>   
                        </Col>
                        <Col :sm='24' :md="12" :lg="6">
                            <Form-item label="入库机构：">
                                <span>{{hospName}}</span>
                            </Form-item>   
                        </Col>
                        <Col :sm='24' :md="12" :lg="6">
                            <Form-item label="入库仓库：">
                                <span>{{formShow.toName}}</span>
                            </Form-item>    
                        </Col>
                        <Col :sm='24' :md="12" :lg="6">
                            <Form-item label="申请日期：">
                                <span>{{formShow.createDate}}</span>
                            </Form-item>
                        </Col>
                        <Col :md='24' :lg="12">
                            <Form-item label="借用原因：">
                                <span>{{formShow.remark}}</span>
                            </Form-item>
                        </Col>
                    </Row>
                    <hr>
                </Form>
                <Table stripe :columns="editCol" :data="editData"></Table>
                <p class="sumCount">合计：
                    <span>数量：{{couNum}}</span>
                    <span>金额：{{couPrice}}</span>
                </p>
                <div class="footer-btnGroup">
                    <Button type="primary"  @click='save' :loading='saveLoad' icon="checkmark">确认入库</Button>
                    <Button type="primary"  icon="android-arrow-back" @click='back'>返回</Button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                deptName: localStorage.getItem('deptName'),
                hospName: localStorage.getItem('hospName'),
                userName: localStorage.getItem('userAccount'),
                saveLoad: false,
                formShow: {},
                editCol: [
                    {
                        title: '商品名称',
                        key: 'name'
                    },
                    {
                        title: '别名',
                        key: 'alias'
                    },
                    {
                        title: '规格',
                        key: 'size'
                    },
                    {
                        title: '单位',
                        key: 'unitName'
                    },
                    {
                        title: '借用数量',
                        key: 'num',
                    },
                    {
                        title: '进价',
                        key: 'price',
                    },
                    {
                        title: '金额',
                        key: 'amount',
                    },
                    {
                        title: '备注',
                        key: 'remark',
                    },
                ],
                editData: [],
            }
        },
        computed: {
            couNum () {
                let _real = 0
                this.editData.map(item => {
                    _real += item.num
                })
                return _real.toFixed(0)
            },
            couPrice () {
                let _real = 0
                this.editData.map(item => {
                    _real += item.amount
                })
                return _real.toFixed(2)
            },
        },
        created () {
            this.getList()
        },
        methods: {
            getList () {
                let _vm = this
                _vm.$store.dispatch('setPageLoading', -1)
                _vm.$http.get({
                    url: 'guard-webManager/stockIn/getAddBorrowedReturn.jhtml',
                    data: {id: _vm.$route.query.id},
                    success: function(res){
                        if(res.data.code == 0) {
                            console.log(res)
                            let _obj = res.data.content || {},
                                _data = _obj.detailList || []
                            _vm.formShow = _obj
                            _vm.formShow.createDate = typeof _vm.formShow.createDate == 'string' ? _vm.formShow.createDate.split(' ')[0] : ''
                            _vm.editData = _data.map(item => {
                                item.product.num = item.num
                                item.product.price = item.price
                                item.product.amount = item.amount
                                return item.product
                            })
                            _vm.$store.dispatch('setPageLoading', 1)
                        }
                    },
                    error: function(res){
                        console.log(res)
                    }
                })
            },
            save () {
                let _vm = this
                _vm.saveLoad = true
                _vm.$http.post({
                    url: 'guard-webManager/stockIn/addBorrowedReturn.jhtml',
                    data: {
                        toWarehouseId: _vm.formShow.toWarehouseID,
                        id: _vm.formShow.id,
                    },
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
    .sumCount {
        padding: 15px 0;
    }
    .sumCount span {
        margin: 0px 15px;
    }
</style>