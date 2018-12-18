/**
 * 登记新客户
 */
<template>
    <div class="container-box">
        <div class="container-header">
            <h2>登记新客户</h2>
        </div>
        <div class="container-body">
            <div class="customer-item">
                <div class="customer-item-title">
                    <h3><Icon type="pricetag"></Icon>客户资料</h3>
                </div>
                <Form ref="formAdd" :model="formAdd" :rules="ruleForm" :label-width="100" label-position="right">
                    <Form-item label="姓名" prop="name" required>
                        <Input :maxlength='20' v-model.trim="formAdd.name" placeholder="请输入姓名" style="width: 300px"></Input>
                    </Form-item>
                    <Form-item label="来源" prop='channelId' required>
                        <cmptRemoteFilterChannel :_style="{width:'300px'}" _type='usable' _placeHolder='输入拼音汉字快捷搜索' @setChannelName='setChannelName'></cmptRemoteFilterChannel>
                    </Form-item>
                    <Form-item label="地区" prop="districtId" required>
                        <Select style="width:200px" @on-change='getCity' v-model="formAdd.provinceID">
                            <Option v-for="item in provinceList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                        </Select>
                        <Select style="width:200px" @on-change='getDistrict' v-model="formAdd.cityID">
                            <Option v-for="item in cityList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                        </Select>
                        <Select v-model="formAdd.districtId" style="width:200px">
                            <Option v-for="item in districtList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                        </Select>
                    </Form-item>
                    <div class="customer-item-title">
                        <h3><Icon type="pricetag"></Icon>咨询情况</h3>
                    </div>
                    <Form-item label="咨询项目" prop='symptomId' required>
                        <Select v-model="formAdd.symptomId" style="width:300px" @on-change='setSymId'>
                            <Option v-for="item in symList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                        </Select>
                    </Form-item>
                    <Form-item label="其他咨询项目">
                        <Select style="width:300px" @on-change='symTags' :clearable='true' ref='select' placeholder='请选择，可多选，最多可选4个'>
                            <Option v-for="item in symList" :value="item.id" :key="item.id" :disabled='formAdd.symptomId == item.id'>{{ item.name }}</Option>
                        </Select>
                        <span class="prompt">请选择客户提及的其他咨询项目，可多选，最多可选4个</span>
                        <div class="tagBox">
                            <div v-for='(item, index) in tagList' :key='item.name' class='tagList-item' @click.capture="closeSym(index)">
                                <Tag type="border" closable color="blue">{{item.name}}</Tag>
                            </div>
                        </div>
                    </Form-item>
                    <Form-item label="咨询内容" prop="content">
                        <Input v-model.trim="formAdd.content" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入描述"></Input>
                    </Form-item>
                </Form>
            </div>
            <div class="footer-btnGroup">
                <Button type="primary"  icon="checkmark" :loading="saveLoad" @click='save'>保存</Button>
                <Button type="primary"  icon="android-arrow-back" @click='back'>返回</Button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            const validateText = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入信息'));
                } else {
                    callback();
                }
            };
            const validateChange = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请选择信息'));
                } else {
                    callback();
                }
            };
            return {
                addType: true,
                saveLoad: false,
                formAdd: {
                    id: '',
                    audit: '',
                    name: '',
                    channelId: '',
                    provinceID: '',
                    cityID: '',
                    districtId: '',
                    symptomId: '',
                    symptom2Id: '',
                    symptom3Id: '',
                    symptom4Id: '',
                    symptom5Id: '',
                    content: '',
                },
                provinceList: [],
                cityList: [],
                districtList: [],
                tagList: [],
                ruleForm: {
                    name: [
                        { validator: validateText, trigger: 'blur' }
                    ],
                    districtId: [
                        { validator: validateChange, trigger: 'change' }
                    ],
                    channelId: [
                        { validator: validateChange, trigger: 'change' }
                    ],
                    symptomId: [
                        { validator: validateChange, trigger: 'change' }
                    ],
                }
            }
        },
        computed: {
            symList () {
                return this.$store.getters.getSelectSymptomInfoList
            },
        },
        created () {
            this.getId()
        },
        mounted () {
            if (window.localStorage) {
                var lg = window.localStorage;
                this.formAdd.userName = lg.userAccount
                this.formAdd.userId = lg.userId
            }
            this.getProvince()
            this.$store.dispatch('setSelectSymptomInfoList')
        },
        methods: {
            getId () {
                let _vm = this
                _vm.$store.dispatch('setPageLoading', -1)
                _vm.$http.get({
                    url: 'guard-webManager/promoteCustomer/getNewCustomer.jhtml',
                    data: {id: _vm.$route.query.id, audit: _vm.$route.query.remark},
                    success: function(res){
                        if(res.data.code == 0){
                            _vm.formAdd.id = res.data.content.id
                            _vm.formAdd.audit = res.data.content.audit
                            _vm.formAdd.name = res.data.content.promoteCustomer.name
                            _vm.formAdd.provinceID = res.data.content.provinceID * 1
                            _vm.formAdd.cityID = res.data.content.cityID * 1
                            _vm.$store.dispatch('setPageLoading', 1)
                        } else {
                            console.log(res.data.desc)
                        }
                    },
                    error: function(res){
                        console.log(res);
                    }
                });
            },
            //省市区
            getProvince () {
                var _vm = this;
                _vm.$http.get({
                    url: 'guard-webManager/select/provinceInfo.jhtml',
                    success: function(res){
                        if(res.data.code == 0){
                            _vm.provinceList = res.data.content
                        } else {
                            console.log(res.data.desc)
                        }
                    },
                    error: function(res){
                        console.log(res);
                    }
                });
            },
            getCity (id) {
                var _vm = this;
                _vm.formAdd.districtId = ''
                _vm.$http.get({
                    url: 'guard-webManager/select/cityList.jhtml',
                    data: {id: id},
                    success: function(res){
                        if(res.data.code == 0){
                            _vm.cityList = res.data.content
                        } else {
                            console.log(res.data.desc)
                        }
                    },
                    error: function(res){
                        console.log(res);
                    }
                });
            },
            getDistrict (id) {
                if(typeof id == 'number') {
                    var _vm = this;
                    _vm.$http.get({
                        url: 'guard-webManager/select/districtList.jhtml',
                        data: {id: id},
                        success: function(res){
                            if(res.data.code == 0){
                                _vm.districtList = res.data.content
                            } else {
                                console.log(res.data.desc)
                            }
                        },
                        error: function(res){
                            console.log(res);
                        }
                    });
                }
            },
            setSymId (id) {
                let _index = this.tagList.findIndex(item => item.id == id)
                if(_index >= 0) {
                    this.closeSym(_index)
                }
            },
            setChannelName (data) {
                this.formAdd.channelId = data.id
            },
            //选择其他项目
            symTags (id) {
                var _vm = this;
                var bool = true
                if(_vm.tagList.length < 4) {
                    for(let _item of _vm.tagList) {
                        if(id == _item.id) {
                            bool = false
                        }
                    }
                    if(bool) {
                        for(var i = 0; i < _vm.symList.length; i++) {
                            if(id == _vm.symList[i].id) {
                                _vm.tagList.push(_vm.symList[i])
                                _vm.setSym()
                            }
                        }
                    }
                }
            },
            //取消选择项目
            closeSym (index) {
                this.tagList.splice(index, 1)
                this.$refs['select'].clearSingleSelect()
                this.setSym()
            },
            //项目保持id
            setSym () {
                var _vm = this
                _vm.formAdd.symptom2Id = typeof _vm.tagList[0] == 'object' ? _vm.tagList[0].id : null
                _vm.formAdd.symptom3Id = typeof _vm.tagList[1] == 'object' ? _vm.tagList[1].id : null
                _vm.formAdd.symptom4Id = typeof _vm.tagList[2] == 'object' ? _vm.tagList[2].id : null
                _vm.formAdd.symptom5Id = typeof _vm.tagList[3] == 'object' ? _vm.tagList[3].id : null
            },
            save () {
                var _vm = this
                _vm.$refs['formAdd'].validate((valid) => {
                    if(valid) {
                        _vm.saveLoad = true
                        _vm.$http.post({
                            url: 'guard-webManager/promoteCustomer/addEdit.jhtml',
                            data: _vm.formAdd,
                            success: function(res){
                                console.log(res)
                                if(res.data.code == 0) {
                                    _vm.$router.push('/promoteCustomer')
                                } else {
                                    _vm.$Notice.error({
                                        title: '系统提示！',
                                        desc: res.data.desc
                                    });
                                    _vm.saveLoad = false
                                }
                            },
                            error: function(res){
                                console.log(res);
                            }
                        });
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
    .tagList-item {
        display: inline-block;
        margin: 3px 6px;
    }
    .prompt {
        margin-left: 20px;
        color: red;
    }
</style>