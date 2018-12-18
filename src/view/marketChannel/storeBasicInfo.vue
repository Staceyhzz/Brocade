/**
 * 基础信息页面
 */

<template>
    <Form :label-width="80" ref="formValidate" :model="formValidate" label-position="right">
        <div class="customer-item">
            <div class="customer-item-title">
                <h3><Icon type="pricetag"></Icon>联系人信息</h3>
            </div>
            <Row>
                <Col :sm="12" :md="8" :lg="6">
                    <Form-item label="联系人：">
                        <span>{{formValidate.linkman}}</span>
                    </Form-item>
                </Col>
                <Col :sm="12" :md="8" :lg="6">
                    <Form-item label="联系方式：">
                        <span>{{formValidate.mobile}}</span>
                    </Form-item>
                </Col>
            </Row>
        </div>
        <div class="customer-item">
            <div class="customer-item-title">
                <h3><Icon type="pricetag"></Icon>结算账户</h3>
            </div>
            <Row>
                <Col :sm="12" :md="8" :lg="6">
                    <Form-item label="账户名：">
                        <span>{{formValidate.ownerName}}</span>
                    </Form-item>
                </Col>
                <Col :sm="12" :md="8" :lg="6">
                    <Form-item label="开户行：">
                        <span>{{formValidate.bank}}</span>
                    </Form-item>
                </Col>
                <Col :sm="12" :md="8" :lg="6">
                    <Form-item label="银行卡号：">
                        <span>{{formValidate.cardNo}}</span>
                    </Form-item>
                </Col>
            </Row>
        </div>
        <div class="customer-item">
            <div class="customer-item-title">
                <h3><Icon type="pricetag"></Icon>抽成比例</h3>
            </div>
            <Row>
                <Col :sm="12" :md="8" :lg="6">
                    <Form-item label="渠道抽成：">
                        <span>{{formValidate.rate}}</span> %
                    </Form-item>
                </Col>
                <Col :md="12" :lg="8">
                    <span>例：设置为0时表示该渠道商无分成；设置为100时表示该渠道商拿全款；设置为40%，表示为该渠道商抽成40%</span>
                </Col>
            </Row>
        </div>
        <div class="customer-item">
            <div class="customer-item-title">
                <h3><Icon type="pricetag"></Icon>备注</h3>
            </div>
            <Row>
                <Col span='24'>
                    <Form-item label="备注：">
                        <span>{{formValidate.remark}}</span>
                    </Form-item>
                </Col>
            </Row>
        </div>
        <div class="customer-item">
            <div class="customer-item-title">
                <h3><Icon type="pricetag"></Icon>负责人</h3>
            </div>
            <Table stripe :columns="col" :data="data" :show-header='false'></Table>
        </div>
    </Form>
</template>

<script>
    export default {
        data () {
            return {
                formValidate: {},
                col: [
                    {
                        title: '负责人',
                        key: 'userName'
                    }
                ],
                data: [],
            }
        },
        beforeRouteEnter (to, from, next) {
            next(vm => {
                if(from.path == '/storeRecord') {
                    vm.$store.dispatch('setPageLoading', 1)
                }
            })
        },
        created () {
            this.getId(sessionStorage.getItem('storeId'))
        },
        methods: {
            getId (id) {
                let _vm = this
                _vm.$store.dispatch('setPageLoading', -1)
                _vm.$http.get({
                    url: 'guard-webManager/store/record.jhtml',
                    data: {id: id},
                    success: function(res){
                        if(res.data.code == 0 ){
                            console.log(res)
                            _vm.formValidate = res.data.content.store || {}
                            _vm.data = res.data.content.managerList || []
                            _vm.$store.dispatch('setPageLoading', 1)
                        } else {
                            console.log(res.data.desc)
                        }
                    },
                    error: function(res){
                        console.log(res)
                    }
                })
            },
        }
    }
</script>
