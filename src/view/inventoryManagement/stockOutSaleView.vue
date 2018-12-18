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
                            <span>{{formShow.no}}</span>
                        </Form-item>
                    </Col>
                    <Col :sm='12' :md="6" :lg="4">
                        <Form-item label="下单人员：">
                            <span>{{formShow.createUserName}}</span>
                        </Form-item>
                    </Col>
                    <Col :sm='12' :md="6" :lg="4">
                        <Form-item label="订单日期：">
                            <span>{{createDate}}</span>
                        </Form-item>
                    </Col>
                    <Col :sm='12' :md="6" :lg="4">
                        <Form-item label="支付日期：">
                            <span>{{createTime}}</span>
                        </Form-item>
                    </Col>
                    <Col :sm='12' :md="6" :lg="4">
                        <Form-item label="客户姓名：">
                            <span>{{formShow.customerName}}</span>
                        </Form-item>
                    </Col>
                    <Col :sm='12' :md="6" :lg="4">
                        <Form-item label="出库仓库：">
                            <span>{{formShow.warehouseName}}</span>
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
            <Table stripe :columns="editCol" :data="data"></Table>
            <p class="sumCount">合计：
                <span>数量：{{totalNum}}</span>
                <span>金额：{{totalAmount}}</span>
            </p>
            <div class="footer-btnGroup">
                <Button type="primary"  icon="android-arrow-back" @click='back'>返回</Button>
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
                editCol: [
                    {
                        title: '商品编号',
                        key: 'productID',
                    },
                    {
                        title: '商品名称',
                        key: 'productName',
                    },
                    {
                        title: '类别',
                        key: 'productCategoryName',
                    },
                    {
                        title: '规格',
                        key: 'productSize',
                    },
                    {
                        title: '单位',
                        key: 'productUnitName',
                    },
                    {
                        title: '进价',
                        key: 'price',
                    },
                    {
                        title: '数量',
                        key: 'num',
                    },
                    {
                        title: '金额',
                        key: 'amount',
                    },
                ],
                data: [],
                totalNum: '',
            }
        },
        computed: {
            createDate () {
                let _date = typeof this.formShow.createDate === 'string' ? this.formShow.createDate.split(' ')[0] : ''
                return _date
            },
            createTime () {
                let _date = typeof this.formShow.createTime === 'string' ? this.formShow.createTime.split(' ')[0] : ''
                return _date
            },
            totalAmount () {
                let _text = 0
                this.data.map(item => {
                    _text += item.amount
                })
                return _text.toFixed(2)
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
                    url: 'guard-webManager/stockOut/getSaleStockOut.jhtml',
                    data: {
                        ID: _vm.$route.query.id,
                    },
                    success: function(res){
                        if(res.data.code == 0) {
                            console.log(res)
                            _vm.formShow = res.data.content.entity || {}
                            let _data = res.data.content.entity.detailList || []
                            _vm.data = _data.map(item => {
                                item.product.productCategoryName = item.productCategoryName
                                item.product.productName = item.productName
                                item.product.productSize = item.productSize
                                item.product.productUnitName = item.productUnitName
                                item.product.productID = item.productID
                                item.product.num = item.num
                                item.product.price = item.stockPrice
                                item.product.amount = item.stockAmount
                                return item.product
                            })
                            _vm.totalNum = res.data.content.totalNum
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
    .sumCount {
        padding: 15px 0;
    }
    .sumCount span {
        margin: 0px 15px;
    }
</style>