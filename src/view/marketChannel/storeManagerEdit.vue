/**
 * 添加负责人
 */

<template>
    <div class="container-box depositChargeEdit">
        <div class="container-header">
            <h2>添加负责人</h2>
        </div>
        <div class="container-body">
            <Form :label-width="100" :model="formSave" ref='formSave' :rules="ruleForm">
                <Form-item label="负责人" prop='userId'>
                    <cmptDeptChooseUser _placeHolder="选择负责人" :_style="{width:'162px'}" :_userName="showUser" v-on:setUserName="setUser"></cmptDeptChooseUser>
                </Form-item>
                <Form-item label="渠道" prop='storeList'>
                    <Row>
                        <Col span="20">
                            <Table stripe :columns="columns" :data="formSave.storeList"></Table>
                        </Col>
                        <Col span="3" offset="1" class='table-left-btn'>
                            <Button type="primary"  icon="plus-round" @click="addStore()">增加</Button>
                        </Col>
                    </Row>
                </Form-item>
            </Form>
            <div class="button-box">
                <Button type="primary"  icon="checkmark-round" :loading='saveLoad' @click="save" class="save-button">保存</Button>
                <Button type="warning"  icon="reply" @click="back">返回</Button>
            </div>
            <Modal
                title="选择渠道"
                width = "700"
                v-model="modalEdit"
                :closable="false"
                @on-ok="ok"
                :loading="loading"
                class-name="vertical-center-modal">
                <Form :label-width="60" inline ref="formSearch" :model="formSearch">
                    <Form-item label="姓名" prop='name'>
                        <Input :maxlength='20' v-model.trim="formSearch.name" placeholder="请输入姓名" @on-enter="getStoreList(formSearch.name)"></Input>
                    </Form-item>
                    <ul class="header-btn-group not-float">
                        <li class="header-item" @click="getStoreList(formSearch.name)"><Icon type="search"></Icon>查询</li>
                        <li class="header-item" @click="handleReset('formSearch')"><Icon type="refresh"></Icon>重置</li>
                    </ul>
                </Form>
                <Table height="350"stripe :columns="col1" :data="data1" @on-selection-change="change"></Table>
            </Modal>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            const validateList = (rule, value, callback) => {
                if (value.length === 0) {
                    callback(new Error('请选择人员'));
                } else {
                    callback();
                }
            };
            const validateUser = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请选择负责人'));
                } else {
                    callback();
                }
            };
            return {
                showUser: '',
                formSave : {
                    userId : '',
                    storeList: []
                },
                columns: [
                    {
                        title: '名称',
                        key: 'name',
                        algin: 'center',
                    },
                    {
                        title: '操作',
                        key: 'action',
                        algin: 'left',
                        width: '150',
                        render: (h, params) => {
                           return h('div', [
                                    h('Button', {
                                        props: {
                                            type: 'error',
                                            size: 'small',
                                            icon: 'ios-trash-outline'
                                        },
                                        on: {
                                            click: () => {
                                                this.remove(params.index)
                                            }
                                        }
                                    }, '删除'),
                                ])
                        }
                    }
                ],
                col1: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '名称',
                        key: 'name'
                    },
                    {
                        title: '联系人',
                        key: 'linkman'
                    },
                    {
                        title: '地址',
                        key: 'address',
                        width: 180
                    }
                ],
                data1: [],
                selectBox: [],
                formSearch: {
                    name: ''
                },
                loading: true,
                saveLoad: false,
                modalEdit: false,
                ruleForm: {
                    storeList: [
                        { validator: validateList, trigger: 'change' }
                    ],
                    userId: [
                        {validator: validateUser, trigger: 'change'}
                    ]
                },
            }
        },
        created () {
            this.$store.dispatch('setPageLoading', 1)
        },
        mounted () {
            this.getStoreList(this.formSearch.name)
        },
        methods: {
            getStoreList (name) {
                let _this = this
                _this.$http.get({
                    url: 'guard-webManager/select/hospitalStoreList.jhtml',
                    data: {
                        name: name
                    },
                    success: function(res) {
                        if(res.data.code == 0) {
                            _this.data1 = res.data.content
                            // 获取成功后打开模态框
                        } else {
                            console.log(res.data.desc)
                        }
                    },
                    error: function(res) {
                        console.log(res)
                    }
                })
            },
            setUser (data) {
                this.showUser = data.name
                this.formSave.userId = data.id
            },
            addStore () {
                var _this = this
                _this.modalEdit = true            },
            change (data) {
                this.selectBox = data
                console.log(this.selectBox)
            },
            ok () {
                this.formSave.storeList = this.selectBox
                this.modalEdit = false
            },
            handleReset (name) {
                this.$refs[name].resetFields()
                this.getStoreList(this.formSearch.name)
            },
            back () {
                this.$router.back(-1)
            },
            remove (index) {
                this.formSave.storeList.splice(index, 1)
            },
            save () {
                let _this = this
                let _box = []
                let _data = {}
                _this.$refs['formSave'].validate((valid) => {
                    if(valid) {
                        _this.saveLoad = true
                        _this.formSave.storeList.map(item => {
                            _box.push(item.id)
                        })
                        _data = {
                            storeList: _box.join(','),
                            userId: _this.formSave.userId
                        }
                        _this.$http.post({
                            url: 'guard-webManager/storeManager/addUser.jhtml',
                            data: _data,
                            success: function(res) {
                                if(res.data.code == 0) {
                                    _this.$router.push('/storeManager')
                                    _this.$Notice.success({
                                        title: '系统提示！',
                                        desc: '操作成功！'
                                    })
                                } else {
                                    _this.saveLoad = false
                                    _this.$Notice.error({
                                        title: '系统提示！',
                                        desc: res.data.desc
                                    });
                                }
                            },
                            error: function(res) {
                                console.log(res.data.desc)
                            }
                        })
                    }
                })
            }
        }
    }
</script>

<style>
    .depositChargeEdit .radioModal .ivu-radio-wrapper {
        display: block;
    }
    .button-box{
        border-top: 1px solid  #dedede;
        padding: 20px 0;
        text-align: center;
    }
    .button-box .save-button {
        margin-right: 20px;
    }
</style>
