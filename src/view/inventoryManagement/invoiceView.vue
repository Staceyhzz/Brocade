/**
 * 采购发票信息页面
 */

<template>
    <div class="container-box">
        <div class="container-header">
            <h2>采购发票信息</h2>
        </div>
        <div class="container-body">
            <Form ref="formValidate" :model="formValidate" :label-width="100" label-position="right">
                <Form-item label="供应商">
                    <span>{{formValidate.supplierName}}</span>
                </Form-item>
                <Form-item label="开票日期">
                    <span>{{createtime}}</span>
                </Form-item>
                <Form-item label="操作用户">
                    <span>{{formValidate.createUserName}}</span>
                </Form-item>
                <Form-item label="发票号">
                    <span>{{formValidate.code}}</span>
                </Form-item>
                <Form-item label="发票抬头">
                    <span>{{formValidate.name}}</span>
                </Form-item>
                <Form-item label="金额">
                    <span>{{amount}}</span>
                </Form-item>
                <Form-item label="备注">
                    <span>{{formValidate.remark}}</span>
                </Form-item>
                <Form-item label="详细">
                    <Table :columns="col" stripe :data="formValidate.detailList"></Table>
                </Form-item>
            </Form>
            <div class="footer-btnGroup">
                <Button type="primary"  icon="ios-trash-outline" @click='remove'>删除</Button>
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
                        title: '入库单号',
                        key: 'purchaseNo'
                    },
                    {
                        title: '仓库',
                        key: 'purchaseWarehouseName'
                    },
                    {
                        title: '入库日期',
                        key: 'purchaseCreateDate',
                        render: (h, params) => {
                            const _text = params.row.purchaseCreateDate.split(' ')[0]
                            return h('span', _text)
                        }
                    },
                ]
            }
        },
        computed: {
            createtime () {
                const _text = typeof this.formValidate.createtime == 'string' ? this.formValidate.createtime.split(' ')[0] : ''
                return _text
            },
            amount () {
                const _text = typeof this.formValidate.amount == 'number' ? this.formValidate.amount.toFixed(2) : ''
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
                    url: 'guard-webManager/invoice/get.jhtml',
                    data: {id: _vm.$route.query.id},
                    success: function(res){
                        if(res.data.code == 0) {
                            console.log(res)
                            _vm.formValidate = res.data.content
                            _vm.$store.dispatch('setPageLoading', 1)
                        }
                    },
                    error: function(res){
                        console.log(res);
                    }
                });
            },
            remove () {
                let _vm = this;
                _vm.$Modal.confirm({
                    title: '系统提示',
                    content: '确定删除此采购发票信息?',
                    onOk: () => {
                        _vm.$http.post({
                            url: 'guard-webManager/invoice/del.jhtml',
                            data: {id: _vm.formValidate.id},
                            success: function(res){
                                if(res.data.code == 0 ){
                                    _vm.$router.push('/invoice')
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
            print () {},
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
</style>

