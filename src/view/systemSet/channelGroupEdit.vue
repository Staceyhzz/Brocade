/**
 * 添加/修改客户来源归类页面
 */

<template>
    <div class="container-box">
        <div class="container-header">
            <h2>{{titMsg}}</h2>
        </div>
        <div class="container-body">
            <Form :label-width="100" ref="formValidate" :model="formValidate" label-position="right" :rules="ruleForm">
                <Form-item label="名称" prop="name" required style='width:400px;'>
                    <Input v-model.trim="formValidate.name" placeholder="请输入名称" :maxlength='20'></Input>
                </Form-item>
                <Form-item label="排序号" prop="sortNo" required>
                    <cmptInputNumber :max="10000" :min="1" v-model="formValidate.sortNo" style='width:300px;'></cmptInputNumber>
                </Form-item>
                <Form-item label="备注" prop="remark">
                    <Input v-model="formValidate.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入描述"></Input>
                </Form-item>
                <Form-item label="来源列表" prop="channels" required>
                    <Row>
                        <Col span="20">
                            <Table stripe :columns="col" :data="formValidate.channels"></Table>
                        </Col>
                        <Col span="3" offset="1" class='table-left-btn'>
                            <Button type="primary"  icon="plus-round" @click='add'>增加</Button>
                            <Button type="primary"  icon="refresh" @click='clean'>清空</Button>
                        </Col>
                    </Row>
                </Form-item>
            </Form>
            <div class="footer-btnGroup">
                <Button type="primary"  icon="checkmark" @click='save' :loading='saveLoad'>保存</Button>
                <Button type="primary"  icon="android-arrow-back" @click='back'>返回</Button>
            </div>
            <Modal
                title="选择来源"
                v-model="modalEdit"
                :closable="false"
                @on-ok="ok"
                :loading="loading"
                class-name="vertical-center-modal">
                <Table height="350" stripe :columns="col1" :data="data" @on-selection-change='change'></Table>
            </Modal>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            const validateName = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入名称'));
                } else {
                    callback();
                }
            };
            const validateList = (rule, value, callback) => {
                if (value.length === 0) {
                    callback(new Error('请选择标签'));
                } else {
                    callback();
                }
            };
            return {
                key: true,
                saveLoad: false,
                titMsg: '',
                col: [
                    {
                        title: '名称',
                        key: 'channelName'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 100,
                        align: 'center',
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
                data: [],
                selectBox: [],
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
                        title: '状态',
                        width: 70,
                        key: 'status',
                        render: (h, params) => {
                            const color = params.row.status === 1 ? 'blue' : 'red';
                            const text = params.row.status === 1 ? '启用' : '禁用';
                            return h('span', {
                                style: {
                                    color: color
                                }
                            },text)
                        }
                    },
                ],
                modalEdit: false,
                loading: true,
                formValidate: {
                    id: '',
                    name: '',
                    sortNo: 1,
                    remark: '',
                    channels: []
                },
                ruleForm: {
                    name: [
                        { validator: validateName, trigger: 'blur' }
                    ],
                    channels: [
                        { validator: validateList, trigger: 'blur' }
                    ]
                },
            }
        },
        created () {
            if(this.$route.query.id != 'add') {
                this.titMsg = '修改客户来源归类'
                this.getId()
            } else {
                this.titMsg = '添加客户来源归类'
                this.key = false
                this.$store.dispatch('setPageLoading', 1);
            }
        },
        mounted () {
            this.getList()
        },
        methods: {
            getId () {
                var _vm = this;
                _vm.$store.dispatch('setPageLoading', -1);
                _vm.$http.get({
                    url: 'guard-webManager/channelGroup/get.jhtml',
                    data: {id: _vm.$route.query.id},
                    success: function(res){
                        if(res.data.code == 0 ){
                            console.log(res)
                            _vm.formValidate.name = res.data.content.name
                            _vm.formValidate.sortNo = res.data.content.sortno
                            _vm.formValidate.remark = res.data.content.remark
                            _vm.formValidate.channels = res.data.content.detailList
                            _vm.$store.dispatch('setPageLoading', 1);
                        } else {
                            console.log(res.data.desc)
                        }
                    },
                    error: function(res){
                        console.log(res);
                    }
                });
            },
            getList () {
                var _vm = this
                _vm.$http.get({
                    url: 'guard-webManager/select/unUseChannelInfo.jhtml',
                    success: function(res){
                        if(res.data.code == 0 ){
                            console.log(res.data.content)
                            _vm.data = res.data.content
                        } else {
                            console.log(res.data.desc)
                        }
                    },
                    error: function(res){
                        console.log(res);
                    }
                });
            },
            add () {
                this.modalEdit = true
            },
            clean () {
                this.formValidate.channels.splice(0)
            },
            remove (index) {
                this.formValidate.channels.splice(index, 1)
            },
            change (data) {
                this.selectBox = data
            },
            ok () {
                this.selectBox.map(item => {
                    let _index = this.formValidate.channels.findIndex(channel => {
                        return channel.channelid == item.id
                    })
                    if(_index < 0) {
                        item.channelid = item.id
                        item.channelName = item.name
                        this.formValidate.channels.push(item)
                    }
                })
                this.modalEdit = false
            },
            save () {
                var _vm = this
                var url = ''
                var data = {}
                var idBox = []
                for(var id of _vm.formValidate.channels) {
                    idBox.push(id.channelid)
                }
                _vm.$refs['formValidate'].validate((valid) => {
                    if(valid) {
                        if(_vm.key) {
                            url = 'guard-webManager/channelGroup/update.jhtml'
                            data = {
                                id: _vm.$route.query.id,
                                name: _vm.formValidate.name,
                                sortNo: _vm.formValidate.sortNo,
                                remark: _vm.formValidate.remark,
                                channels: idBox.join(',')
                            }
                        } else {
                            url = 'guard-webManager/channelGroup/add.jhtml'
                            data = {
                                name: _vm.formValidate.name,
                                remark: _vm.formValidate.remark,
                                sortNo: _vm.formValidate.sortNo,
                                channels: idBox.join(',')
                            }
                        }
                        _vm.saveLoad = true
                        _vm.$http.post({
                            url: url,
                            data: data,
                            success: function(res){
                                if(res.data.code == 0 ){
                                    _vm.$router.push('/channelGroup')
                                    _vm.$Notice.success({
                                        title: '系统提示！',
                                        desc: '操作成功！'
                                    })
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
