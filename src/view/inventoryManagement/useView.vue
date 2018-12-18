/**
 * 科室领用信息页面
 */

<template>
    <div class="container-box">
        <div class="container-header">
            <h2>科室领用信息</h2>
        </div>
        <div class="container-body">
            <h3 class="oreder-tit">领用申请单</h3>
            <Form ref="formValidate" :model="formValidate" :label-width="100" label-position="right">
                <Row>
                    <Col :sm='24' :md="12" :lg="6">
                        <Form-item label="单据类型：">
                            <span>领用申请单</span>
                        </Form-item>   
                    </Col>
                    <Col :sm='24' :md="12" :lg="6">
                        <Form-item label="单据编号：">
                            <span>{{formValidate.no}}</span>
                        </Form-item> 
                    </Col>
                    <Col :sm='24' :md="12" :lg="6"> 
                        <Form-item label="领用仓库：">
                            <span>{{formValidate.warehouseName}}</span>
                        </Form-item>
                    </Col>
                    <Col :sm='24' :md="12" :lg="6"> 
                        <Form-item label="领用日期：">
                            <span>{{createdate}}</span>
                        </Form-item>
                    </Col>
                    <Col :sm='24' :md="12" :lg="6"> 
                        <Form-item label="领用部门：">
                            <span>{{formValidate.deptName}}</span>
                        </Form-item>
                    </Col>
                    <Col :sm='24' :md="12" :lg="6"> 
                        <Form-item label="领用人：">
                            <span>{{formValidate.useUserName}}</span>
                        </Form-item>
                    </Col>
                    <Col :md='24' :lg="12">
                        <Form-item label="备注：">
                            <span>{{formValidate.remark}}</span>
                        </Form-item>
                    </Col>
                </Row>
            </Form>
            <hr class="oreder-line">
            <Table :columns="col" stripe :data="formValidate.detailList"></Table>
            <p class="sumCount">合计：
                <span>数量：{{totalNum}}</span>
            </p>
            <div class="footer-btnGroup">
                <Button type="primary"  icon="printer" @click='print'>打印</Button>
                <Button type="error"  icon="ios-trash-outline" @click='remove'>删除</Button>
                <Button type="primary"  icon="android-arrow-back" @click='back'>返回</Button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
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
                    url: 'guard-webManager/use/get.jhtml',
                    data: {id: _vm.$route.query.id},
                    success: function(res){
                        if(res.data.code == 0) {
                            console.log(res)
                            _vm.formValidate = res.data.content.entity
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
                let _vm = this;
                _vm.$Modal.confirm({
                    title: '系统提示',
                    content: '确定删除此领用信息?',
                    onOk: () => {
                        _vm.$http.post({
                            url: 'guard-webManager/use/del.jhtml',
                            data: {id: _vm.formValidate.id},
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
                        url: '/use',
                        text: '科室领用'
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
                        type: 'use',
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
</style>

