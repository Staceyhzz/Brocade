/**
 * 渠道编辑页面
 */

<template>
    <div class="container-box">
        <div class="container-header">
            <h2>{{titMsg}}</h2>
        </div>
        <div class="container-body">
            <Form :label-width="80" ref="formValidate" :model="formValidate" label-position="right" :rules="ruleForm">
                <div class="customer-item">
                    <div class="customer-item-title">
                        <h3><Icon type="pricetag"></Icon>基本信息</h3>
                    </div>
                    <Row>
                        <Col :sm="12" :md="8" :lg="6">
                            <Form-item label="渠道名称" prop="name" required>
                                <Input v-model.trim="formValidate.name" placeholder="请输入名称" :maxlength='20'></Input>
                            </Form-item>
                        </Col>
                        <Col :sm="12" :md="8" :lg="6">
                            <Form-item label="品牌" prop="categoryID" v-if='key'>
                                <cmptStoreCategoryChoose v-on:setStoreCategory="setStoreCategory"></cmptStoreCategoryChoose>
                            </Form-item>
                            <Form-item label="品牌" prop="categoryID" v-else style='height:33px'>
                                <span>{{storeCategoryName}}</span>
                            </Form-item>
                        </Col>
                        <Col :sm="12" :md="8" :lg="6">
                            <Form-item label="选择上级" prop="parentID">
                                <Input v-model="parentName" readonly icon="ios-search" placeholder="请选择上级" @on-focus='addObj'></Input>
                            </Form-item>
                        </Col>
                        <Col :sm="12" :md="8" :lg="6">
                            <Form-item label="地址" prop="address">
                                <Input v-model.trim="formValidate.address" placeholder="请输入地址" :maxlength='100'></Input>
                            </Form-item>
                        </Col>
                        <Col :md="24" :lg="12">
                            <Form-item label="备注" prop="remark">
                                <Input v-model.trim="formValidate.remark" type="textarea" :autosize="{minRows: 1,maxRows: 5}" placeholder="请输入备注" :maxlength='100'></Input>
                            </Form-item>
                        </Col>
                    </Row>
                </div>
                <div class="customer-item">
                    <div class="customer-item-title">
                        <h3><Icon type="pricetag"></Icon>联系人信息</h3>
                    </div>
                    <Row>
                        <Col :sm="12" :md="8" :lg="6">
                            <Form-item label="联系人" prop="linkman">
                                <Input v-model.trim="formValidate.linkman" placeholder="请输入联系人" :maxlength='20'></Input>
                            </Form-item>
                        </Col>
                        <Col :sm="12" :md="8" :lg="6">
                            <Form-item label="联系方式" prop="mobile">
                                <Input v-model.trim="formValidate.mobile" placeholder="请输入联系方式" :maxlength='20'></Input>
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
                            <Form-item label="账户名" prop="ownerName">
                                <Input v-model.trim="formValidate.ownerName" placeholder="请输入账户名" :maxlength='20'></Input>
                            </Form-item>
                        </Col>
                        <Col :sm="12" :md="8" :lg="6">
                            <Form-item label="开户行" prop="bank">
                                <Input v-model.trim="formValidate.bank" placeholder="请输入开户行" :maxlength='20'></Input>
                            </Form-item>
                        </Col>
                        <Col :sm="12" :md="8" :lg="6">
                            <Form-item label="银行卡号" prop="cardNo">
                                <Input v-model.trim="formValidate.cardNo" placeholder="请输入银行卡号" :maxlength='30'></Input>
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
                            <Form-item label="渠道抽成" prop="rate">
                                <cmptInputNumber :max="100" :min="0" v-model="formValidate.rate" style="width:80%" @on-change='setRate'></cmptInputNumber> %
                            </Form-item>
                        </Col>
                        <Col :md="12" :lg="8">
                            <span>例：设置为0时表示该渠道商无分成；设置为100时表示该渠道商拿全款；设置为40%，表示为该渠道商抽成40%</span>
                        </Col>
                    </Row>
                </div>
            </Form>
            <div class="footer-btnGroup">
                <Button type="primary"  icon="checkmark" @click='save' :loading='saveLoad'>保存</Button>
                <Button type="primary"  icon="android-arrow-back" @click='back'>返回</Button>
            </div>
        </div>
        <Modal
            title="选择上级渠道"
            width='700'
            v-model="modal"
            :closable="false"
            class-name="vertical-center-modal">
            <Table height="350" stripe :columns="col" :data="data" @on-row-click='chooseObj'></Table>
        </Modal>
    </div>
</template>

<script>
    import cmptStoreCategoryChoose from 'components/storeCategoryChoose.vue'
    export default {
        components: {cmptStoreCategoryChoose},
        data () {
            const validateName = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入名称'))
                } else {
                    callback()
                }
            }
            const validateCategory = (rule, value, callback) => {
                if(this.validKey) {
                    if (value === '') {
                        callback(new Error('请先选择品牌'))
                    } else {
                        callback()
                    }
                } else {
                    callback()
                }
            }
            return {
                validKey: false,
                saveLoad: false,
                titMsg: '',
                key: true,
                modal: false,
                col: [
                    {
                        title: '渠道名称',
                        key: 'name',
                        render: (h, params) => {
                            const level = params.row.level * 20 + 'px'
                            return h('span', {
                                style: {
                                    paddingLeft: level
                                }
                            }, params.row.name)
                        }
                    }
                ],
                data: [],
                parentName: '',
                storeCategoryName: '',
                formValidate: {
                    parentID: '',
                    categoryID: '',
                    rate: 0,
                    id: '',
                    name: '',
                    linkman: '',
                    mobile: '',
                    address: '',
                    ownerName: '',
                    bank: '',
                    cardNo: '',
                    remark: '',
                },
                ruleForm: {
                    name: [
                        { validator: validateName, trigger: 'blur' }
                    ],
                    categoryID: [
                        { validator: validateCategory, trigger: 'change' }
                    ],
                },
            }
        },
        created () {
            if(this.$route.query.id == '') {
                this.titMsg = '添加渠道'
                this.key = true
                this.$store.dispatch('setPageLoading', 1)
            }else {
                this.titMsg = '编辑渠道'
                this.key = false
                this.getId()
            }
        },
        methods: {
            getId () {
                let _vm = this
                _vm.$store.dispatch('setPageLoading', -1)
                _vm.$http.get({
                    url: 'guard-webManager/store/getUpdate.jhtml',
                    data: {ID: _vm.$route.query.id},
                    success: function(res){
                        if(res.data.code == 0 ){
                            console.log(res)
                            _vm.formValidate = res.data.content || {}
                            _vm.storeCategoryName = res.data.content.categoryName
                            _vm.parentName = res.data.content.parentName
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
            setStoreCategory (data) {
                this.formValidate.categoryID = data.id
            },
            setRate (val) {
                this.$nextTick(() => {
                    this.formValidate.rate = parseFloat((val).toFixed(2))
                })
            },
            getList () {
                let _vm = this
                _vm.$http.get({
                    url: 'guard-webManager/select/parentStoreList.jhtml',
                    data: {categoryID: _vm.formValidate.categoryID},
                    success: function(res){
                        if(res.data.code == 0 ){
                            _vm.data = res.data.content || []
                        } else {
                            console.log(res.data.desc)
                        }
                    },
                    error: function(res){
                        console.log(res)
                    }
                })
            },
            addObj () {
                this.validKey = true
                this.$refs.formValidate.validateField('categoryID')
                if(this.formValidate.categoryID != '') {
                    this.getList()
                    this.modal = true
                }
            },
            chooseObj (data) {
                this.formValidate.parentID = data.id
                this.parentName = data.name
                this.modal = false
            },
            save () {
                let _vm = this,
                    _url = ''
                _vm.validKey = false
                _vm.$refs['formValidate'].validate((valid) => {
                    if(valid) {
                        if(_vm.key) {
                            _url = 'guard-webManager/store/add.jhtml'
                        } else {
                            _url = 'guard-webManager/store/update.jhtml'
                        }
                        _vm.saveLoad = true
                        _vm.$http.post({
                            url: _url,
                            data: _vm.formValidate,
                            success: function(res){
                                if(res.data.code == 0 ){
                                    _vm.$router.push('/store')
                                    _vm.$Notice.success({
                                        title: '系统提示！',
                                        desc: '操作成功！'
                                    })
                                } else {
                                    _vm.$Notice.error({
                                        title: '系统提示！',
                                        desc: res.data.desc
                                    })
                                    _vm.saveLoad = false
                                }
                            },
                            error: function(res){
                                console.log(res)
                            }
                        })
                    }
                })
            },
            back () {
                this.$router.back(-1)
            }
        }
    }
</script>
