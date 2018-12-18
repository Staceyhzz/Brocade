/**
 * 治疗出库页面
 */

<template>
    <div class="container-box">
        <div class="container-header">
            <h2>治疗出库</h2>
        </div>
        <div class="container-body">
            <h3 class="oreder-tit">治疗出库单</h3>
            <Form ref="formValidate" :model="formValidate" :label-width="100" label-position="right">
                <Row>
                    <Col :sm='24' :md="12" :lg="6">
                        <Form-item label="单据类型：">
                            <span>治疗出库单</span>
                        </Form-item>   
                    </Col>
                    <Col :sm='24' :md="12" :lg="6">
                        <Form-item label="单据编号：">
                            <span>{{formValidate.id}}</span>
                        </Form-item> 
                    </Col>
                    <Col :sm='24' :md="12" :lg="6"> 
                        <Form-item label="划扣仓库：">
                            <span>{{formValidate.warehouseName}}</span>
                        </Form-item>
                    </Col>
                    <Col :sm='24' :md="12" :lg="6"> 
                        <Form-item label="划扣日期：">
                            <span>{{operationTime}}</span>
                        </Form-item>
                    </Col>
                    <Col :sm='24' :md="12" :lg="6"> 
                        <Form-item label="客户名称：">
                            <span>{{formValidate.customerName}}</span>
                        </Form-item>
                    </Col>
                    <Col :sm='24' :md="12" :lg="6"> 
                        <Form-item label="客户编号：">
                            <span>{{formValidate.customerID}}</span>
                        </Form-item>
                    </Col>
                </Row>
            </Form>
            <hr class="oreder-line">
            <Table :columns="col" stripe :data="data"></Table>
            <div class="footer-btnGroup">
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
                formValidate: {},
                col: [
                    {
                        title: '编号',
                        key: 'productid'
                    },
                    {
                        title: '类型',
                        key: 'chargeName'
                    },
                    {
                        title: '名称',
                        key: 'productName'
                    },
                    {
                        title: '规格',
                        key: 'productSize',
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
                data: [],
            }
        },
        computed: {
            operationTime () {
                const _text = typeof this.formValidate.operationTime == 'string' ? this.formValidate.operationTime.split(' ')[0] : ''
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
                    url: 'guard-webManager/stockOut/getOperation.jhtml',
                    data: {ID: _vm.$route.query.id},
                    success: function(res){
                        if(res.data.code == 0) {
                            console.log(res)
                            _vm.formValidate = res.data.content || {}
                            _vm.data.push({
                                productid: res.data.content.productid,
                                chargeName: res.data.content.chargeName,
                                productName: res.data.content.productName,
                                productSize: res.data.content.productSize,
                                productUnitName: res.data.content.productUnitName,
                                num: res.data.content.num,
                            })
                            _vm.$store.dispatch('setPageLoading', 1)
                        }
                    },
                    error: function(res){
                        console.log(res)
                    }
                })
            },
            back () {
                this.$router.back(-1)
            },
            print () {
                let breadData = [
                    {
                        url: '/desktop',
                        text: '桌面'
                    },
                    {
                        url: '/stockOut',
                        text: '出库管理'
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
                        type: 'stockOutDesk',
                    }
                })
            },
        }
    }
</script>

