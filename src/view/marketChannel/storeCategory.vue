/**
 * 品牌管理
 */

<template>
    <div class="container-box">
        <div class="container-header">
            <h2>品牌管理</h2>
            <ul class="header-btn-group">
                <li class="header-item" @click="add"><Icon type="plus-round"></Icon>增加</li>
            </ul>
        </div>
        <div class="container-body">
            <Form :label-width="50" inline ref='formSearch' :model='formSearch'>
                <Form-item label="名称" prop='name'>
                    <Input v-model.trim="formSearch.name" placeholder="请输入名称" @on-enter="getList(1, 10, formSearch)" :maxlength='20'></Input>
                    <Input v-show='fixSub'></Input>
                </Form-item>
                <ul class="header-btn-group not-float">
                    <li class="header-item" @click="getList(1, 10, formSearch)"><Icon type="search"></Icon>查询</li>
                    <li class="header-item" @click="handleReset('formSearch')"><Icon type="refresh"></Icon>重置</li>
                </ul>
            </Form>
            <Table stripe :columns="columns" :data="data"></Table>
            <div class="table-page">
                <div class="table-info">当前第{{pageNumber}}页，共{{totalPages}}页，总共{{total}}条记录</div>
                <Page class="table-paginate" :total="total" @on-change='changePage' :current='pageNumber'></Page>
            </div>
            <Modal
                :title="modalTit"
                v-model="modalEdit"
                :closable="false"
                @on-ok="ok"
                :loading="loading"
                class-name="vertical-center-modal">
                <Form ref="formValidate" :model="formValidate" :rules="ruleForm" :label-width="100" label-position="right">
                    <Form-item label="品牌名称" prop="name" required>
                        <Input v-model.trim="formValidate.name" placeholder="请输入名称" :maxlength='20'></Input>
                    </Form-item>
                    <Form-item label="描述" prop="remark">
                        <Input v-model.trim="formValidate.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入描述"></Input>
                    </Form-item>
                </Form>
            </Modal>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            const validateName = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入名称'))
                } else {
                    callback()
                }
            }
            return {
                fixSub: false,
                columns: [
                    {   
                        title: '序号',
                        width: 70,
                        render: (h, params) => {
                            const _index = (this.pageNumber - 1) * 10
                            return h('span', params.index + 1 + _index)
                        }
                    },
                    {
                        title: '品牌名称',
                        key: 'name'
                    },
                    {
                        title: '描述',
                        key: 'remark',
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 180,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                    h('Button', {
                                        props: {
                                            type: 'primary',
                                            size: 'small',
                                            icon: 'edit'
                                        },
                                        style: {
                                            marginRight: '2px'
                                        },
                                        on: {
                                            click: () => {
                                                this.edit(params.row)
                                            }
                                        }
                                    }, '编辑'),
                                    h('Button', {
                                        props: {
                                            type: 'error',
                                            size: 'small',
                                            icon: 'ios-trash-outline'
                                        },
                                        on: {
                                            click: () => {
                                                this.remove(params.row)
                                            }
                                        }
                                    }, '删除'),
                                ])
                        }
                    }
                ],
                data: [],
                total: 0,
                totalPages: 1,
                pageNumber: 1,
                modalTit: '',
                modalEdit: false,
                loading: true,
                seen: true,
                formSearch: {
                    name: ''
                },
                formValidate: {
                    id: '',
                    name: '',
                    remark: ''
                },
                ruleForm: {
                    name: [
                        { validator: validateName, trigger: 'blur' }
                    ],
                }
            }
        },
        created () {
            this.getList(1, 10, this.formSearch)
        },
        methods: {
            getList (pageNumber, pageSize, form) {
                let _vm = this
                form.pageNumber = pageNumber
                form.pageSize = pageSize
                _vm.$store.dispatch('setPageLoading', -1)
                _vm.$http.get({
                    url: 'guard-webManager/storeCategory/page.jhtml',
                    data: form,
                    success: function(res){
                        if(res.data.code == 0 ){
                            _vm.data = res.data.content.content || []
                            _vm.total = res.data.content.total || 0
                            _vm.pageNumber = res.data.content.pageNumber || 1
                            _vm.totalPages = res.data.content.totalPages || 1
                            console.log(res)
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
            add () {
                let _vm = this
                _vm.modalTit = '添加品牌'
                _vm.$refs['formValidate'].resetFields()
                _vm.seen = false
                _vm.modalEdit = true
            },
            edit (data) {
                let _vm = this
                _vm.modalTit = '修改品牌'
                _vm.$refs['formValidate'].resetFields()
                _vm.formValidate.id = data.id
                _vm.formValidate.name = data.name
                _vm.formValidate.remark = data.remark
                _vm.seen = true
                _vm.modalEdit = true
            },
            remove (data) {
                let _vm = this
                _vm.$Modal.confirm({
                    title: '系统提示',
                    content: `<p>确定删除品牌？</p>
                            <p>品牌信息：</p>
                            <p>名称：${data.name}</p>`,
                    onOk: () => {
                        _vm.$http.post({
                            url: 'guard-webManager/storeCategory/delete.jhtml',
                            data: {id: data.id},
                            success: function(res){
                                if(res.data.code == 0 ){
                                    _vm.getList(1, 10, _vm.formSearch)
                                    _vm.$Notice.success({
                                        title: '系统提示！',
                                        desc: '删除成功！'
                                    })
                                } else {
                                    _vm.$Notice.error({
                                        title: '系统提示！',
                                        desc: res.data.desc
                                    })
                                }
                            },
                            error: function(res){
                                console.log(res)
                            }
                        })
                    },
                    onCancel: () => {
                        
                    }
                });
            },
            ok () {
                let _vm = this,
                    _url = ''
                _vm.$refs['formValidate'].validate((valid) => {
                    if (valid) {
                        if(_vm.seen) {
                            _url = 'guard-webManager/storeCategory/update.jhtml'
                        } else {
                            _url = 'guard-webManager/storeCategory/add.jhtml'
                        }
                        _vm.$http.post({
                            url: _url,
                            data: _vm.formValidate,
                            success: function(res){
                                if(res.data.code == 0 ){
                                    _vm.getList(1, 10, _vm.formSearch)
                                    _vm.$refs['formValidate'].resetFields()
                                    _vm.modalEdit = false
                                    _vm.$Notice.success({
                                        title: '系统提示！',
                                        desc: '保存成功！'
                                    })
                                } else {
                                    _vm.$Notice.error({
                                        title: '系统提示！',
                                        desc: res.data.desc
                                    })
                                    _vm.loading = false
                                    _vm.$nextTick(() => {
                                        _vm.loading = true
                                    })
                                }
                            },
                            error: function(res){
                                console.log(res)
                            }
                        })
                    } else {
                        _vm.loading = false;
                        _vm.$nextTick(() => {
                            _vm.loading = true
                        })
                    }
                })
            }, 
            changePage (num) {
                this.getList(num, 10, this.formSearch)
            },
            handleReset (name) {
                this.$refs[name].resetFields()
                this.getList(1, 10, this.formSearch)
            }
        }
    }
</script>