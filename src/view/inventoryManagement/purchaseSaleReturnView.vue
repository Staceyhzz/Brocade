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
                                <span>{{formShow.no}}</span>
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
                            <Form-item label="入库仓库：">
                                <span>{{formShow.warehouseName}}</span>
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
                                <span>{{formShow.auditUserName}}</span>
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
                <Table stripe :columns="editCol" :data="formShow.detailList"></Table>
                <div class="footer-btnGroup">
                    <Button type="primary"  :loading='saveLoad' icon="printer" @click='print'>打印</Button>
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
                editCol: [
                    {
                        title: '商品名称',
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
                        title: '应退数量',
                        key: 'backNum'
                    },
                    {
                        title: '实退数量',
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
                        title: '到期日期',
                        render: (h, params) => {
                            if(params.row.expiration) {
                                const _text = params.row.expiration.split(' ')[0]
                                return h('span', _text)
                            }
                        }
                    },
                    {
                        title: '产品批号',
                        key: 'batch'
                    },
                ],
            }
        },
        computed: {
            createDate () {
                let _date = typeof this.formShow.createDate === 'string' ? this.formShow.createDate.split(' ')[0] : ''
                return _date
            },
            gender () {
                let _text = this.formShow.customerGender === 1 ? '男' : '女'
                return _text
            },
            year () {
                let _text = ''
                if(typeof this.formShow.birthYear != 'string') {
                    return _text
                } else {
                    const date = new Date()
                    const year = date.getFullYear()
                    return year - this.formShow.birthYear
                }
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
                    url: 'guard-webManager/stockIn/getSalesReturnDetail.jhtml',
                    data: {
                        ID: _vm.$route.query.id
                    },
                    success: function(res){
                        if(res.data.code == 0) {
                            console.log(res)
                            _vm.formShow = res.data.content.entity || {}
                            _vm.formShow.auditTime = res.data.content.auditTime
                            _vm.formShow.auditUserName = res.data.content.auditUserName
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
                        type: 'returnSales',
                    }
                })
            },
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