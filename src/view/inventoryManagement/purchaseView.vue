/**
 * 进货信息页面
 */

<template>
    <div class="container-box">
        <div class="container-header">
            <h2>进货信息</h2>
        </div>
        <div class="container-body">
            <h3 class="oreder-tit">进货入库单</h3>
            <Form ref="formValidate" :model="formValidate" :label-width="100" label-position="right">
                <Row>
                    <Col :sm='24' :md="12" :lg="6">
                        <Form-item label="进货仓库：">
                            <span>{{formValidate.warehouseName}}</span>
                        </Form-item>
                    </Col>
                    <Col :sm='24' :md="12" :lg="6">
                        <Form-item label="供应商：">
                            <span>{{formValidate.supplierName}}</span>
                        </Form-item>
                    </Col>
                    <Col :sm='24' :md="12" :lg="6">
                        <Form-item label="进货日期：">
                            <span>{{createdate}}</span>
                        </Form-item>
                    </Col>
                    <Col :sm='24' :md="12" :lg="6">
                        <Form-item label="提交时间：">
                            <span>{{formValidate.createtime}}</span>
                        </Form-item>
                    </Col>
                    <Col :sm='24' :md="12" :lg="6">
                        <Form-item label="提交用户：">
                            <span>{{formValidate.createUserName}}</span>
                        </Form-item>
                    </Col>
                    <Col :md='24' :lg="12">
                        <Form-item label="备注：">
                            <span>{{formValidate.remark}}</span>
                        </Form-item>
                    </Col>
                </Row>
                <hr>
            </Form>
            <Table :columns="col" stripe :data="formValidate.detailList"></Table>
            <p class="sumCount">合计：
                <span>数量：{{totalNum}}</span>
                <span>金额：{{totalAmount}}</span>
            </p>
            <div class="footer-btnGroup">
                <Button type="primary"  icon="ios-trash-outline" @click='remove'>删除</Button>
                <Button type="primary"  icon="printer" @click='print'>打印</Button>
                <Button type="primary"  icon="android-arrow-back" @click='back'>返回</Button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                totalAmount: '',
                totalNum: '',
                formValidate: {},
                col: [
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
                        key: 'num'
                    },
                    {
                        title: '进价',
                        key: 'price',
                        className: 'table-num',
                        render: (h, params) => {
                            return h('span', params.row.price.toFixed(2))
                        }
                    },
                    {
                        title: '金额',
                        key: 'amount',
                        className: 'table-num',
                        render: (h, params) => {
                            return h('span', params.row.amount.toFixed(2))
                        }
                    },
                    {
                        title: '批号',
                        key: 'batch'
                    },
                    {
                        title: '有效日期',
                        render: (h, params) => {
                            if(params.row.expiration) {
                                const _text = params.row.expiration.split(' ')[0]
                                return h('span', _text)
                            }
                        }
                    },
                ]
            }
        },
        computed: {
            createdate () {
                const _text = typeof this.formValidate.createdate == 'string' ? this.formValidate.createdate.split(' ')[0] : ''
                return _text
            },
        },
        created () {
            this.getId()
        },
        methods: {
            getId () {
                let _vm = this
                _vm.$store.dispatch('setPageLoading', -1)
                _vm.$http.get({
                    url: 'guard-webManager/purchase/get.jhtml',
                    data: {id: _vm.$route.query.id},
                    success: function(res){
                        if(res.data.code == 0) {
                            console.log(res)
                            _vm.formValidate = res.data.content.entity
                            _vm.totalAmount = res.data.content.totalAmount.toFixed(2)
                            _vm.totalNum = res.data.content.totalNum
                            _vm.$store.dispatch('setPageLoading', 1)
                        }
                    },
                    error: function(res){
                        console.log(res);
                    }
                });
            },
            remove () {
                var _vm = this;
                _vm.$Modal.confirm({
                    title: '系统提示',
                    content: '确定删除此进货信息?',
                    onOk: () => {
                        _vm.$http.post({
                            url: 'guard-webManager/purchase/del.jhtml',
                            data: {id: _vm.formValidate.id},
                            success: function(res){
                                if(res.data.code == 0 ){
                                    _vm.$router.push('/purchase')
                                    _vm.$Notice.success({
                                        title: '系统提示！',
                                        desc: '删除成功！'
                                    });
                                } else {
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
                    },
                    onCancel: () => {
                        
                    }
                });
            },
            print () {
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
                this.$store.dispatch('setBreadData', breadData)
                this.$router.push({
                    path: '/printView',
                    query: {
                        id: this.$route.query.id,
                        type: 'purchase',
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
    .sumCount {
        padding: 15px 0;
    }
    .sumCount span {
        margin: 0px 15px;
    }
    hr {
        width: 100%;
        height: 1px;
        margin-bottom: 15px;
        border: none;
        background: rgba(65, 65, 65, 0.1);
    }
</style>

