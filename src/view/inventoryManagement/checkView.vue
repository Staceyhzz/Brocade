/**
 * 查看盘点信息
 */

<template>
    <div class="order-view">
        <div class="container-box">      
            <div class="container-header">
                <h2>查看盘点信息</h2>
            </div>
            <div class="container-body">
                <h3 class="oreder-tit">库存盘点单</h3>
                <Form ref="formShow" :model='formShow' :label-width="80" label-position="right" style='margin-top:10px;'>
                    <Row>
                        <Col :sm='24' :md="12" :lg="6">
                            <Form-item label="单据类型：">
                                <span>库存盘点单</span>
                            </Form-item>   
                        </Col>
                        <Col :sm='24' :md="12" :lg="6">
                            <Form-item label="单据编号：">
                                <span>{{formShow.no}}</span>
                            </Form-item>   
                        </Col>
                        <Col :sm='24' :md="12" :lg="6">
                            <Form-item label="盘点日期：">
                                <span>{{formShow.createtime}}</span>
                            </Form-item>   
                        </Col>
                        <Col :sm='24' :md="12" :lg="6">
                            <Form-item label="盘点仓库：">
                                <span>{{formShow.warehouseName}}</span>
                            </Form-item>   
                        </Col>
                        <Col :md='24' :lg="12">
                            <Form-item label="描述：">
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
                    <Button type="primary"  :loading='saveLoad' icon="printer" @click='print'>打印</Button>
                    <Button type="error"  @click='remove' :loading='saveLoad' icon="ios-trash-outline">删除</Button>
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
                saveLoad: false,
                formShow: {},
                couNum: '',
                couPrice: '',
                editCol: [
                    {
                        title: '商品名称',
                        key: 'productName'
                    },
                    {
                        title: '类别',
                        key: 'productCategoryName'
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
                        title: '盘点数量',
                        key: 'num',
                    },
                    {
                        title: '盘点金额',
                        key: 'amount',
                    },
                    {
                        title: '盘点状态',
                        render: (h, params) => {
                            const _text = params.row.status == 1 ? '盘盈' : '盘亏'
                            const _color = params.row.status == 1 ? 'blue' : 'red'
                            return h('span', {
                                style: {
                                    color: _color
                                }
                            }, _text)
                        }
                    },
                ],
                editData: [],
            }
        },
        created () {
            this.getList()
        },
        methods: {
            getList () {
                let _vm = this
                _vm.$store.dispatch('setPageLoading', -1)
                _vm.$http.get({
                    url: 'guard-webManager/check/get.jhtml',
                    data: {id: _vm.$route.query.id},
                    success: function(res){
                        if(res.data.code == 0) {
                            console.log(res)
                            let _obj = res.data.content.entity || {}
                            _vm.formShow = _obj
                            _vm.editData = _obj.detailList || []
                            _vm.couNum = res.data.content.totalNum
                            _vm.couPrice = res.data.content.totalAmount
                            _vm.$store.dispatch('setPageLoading', 1)
                        }
                    },
                    error: function(res){
                        console.log(res)
                    }
                })
            },
            remove () {
                let _vm = this
                _vm.$Modal.confirm({
                    title: '系统提示',
                    content: '确定删除盘点信息?此操作不可复原！',
                    onOk: () => {
                        _vm.$http.post({
                            url: 'guard-webManager/check/del.jhtml',
                            data: {id: _vm.$route.query.id},
                            success: function(res){
                                if(res.data.code == 0 ){
                                    _vm.$router.back(-1)
                                    _vm.$Notice.success({
                                        title: '系统提示！',
                                        desc: '删除成功！'
                                    });
                                } else {
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
                    onCancel: () => {
                        
                    }
                })
            },
            print () {
                let breadData = [
                    {
                        url: '/desktop',
                        text: '桌面'
                    },
                    {
                        url: '/check',
                        text: '库存盘点'
                    },
                    {
                        url: '/printView',
                        text: '打印预览'
                    }
                ]
                this.$store.dispatch('setBreadData', breadData)
                this.$router.push({
                    path: '/printView',
                    query: {
                        id: this.$route.query.id,
                        type: 'check',
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