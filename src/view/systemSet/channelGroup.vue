/**
 * 客户来源归类管理页面
 */

<template>
    <div class="container-box">
        <div class="container-header">
            <h2>客户来源归类管理</h2>
            <ul class="header-btn-group">
                <li class="header-item" @click="toCheck"><Icon type="settings"></Icon>检测</li>  
                <li class="header-item" @click="toEdit('add')"><Icon type="plus-round"></Icon>增加</li>          
            </ul>
        </div>
        <div class="container-body">
            <Table stripe :columns="columns" :data="data"></Table>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                columns: [
                    {   
                        title: '序号',
                        type: 'index',
                        width: 60
                    },
                    {
                        title: '名称',
                        key: 'name'
                    },
                    {
                        title: '排序号',
                        key: 'sortno'
                    },
                    {
                        title: '描述',
                        key: 'remark'
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
                                            marginRight: '5px'
                                        },
                                        on: {
                                            click: () => {
                                                this.toEdit(params.row)
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
                data: []
            }
        },
        created () {
            this.getList()
        },
        methods: {
            getList () {
                var _vm = this;
                _vm.$store.dispatch('setPageLoading', -1);
                _vm.$http.get({
                    url: 'guard-webManager/channelGroup/list.jhtml',
                    success: function(res){
                        if(res.data.code == 0) {
                            console.log(res)
                            _vm.data = res.data.content
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
            toEdit (data) {
                var breadText = ''
                var id = ''
                if(typeof data == 'object') {
                    breadText = '修改客户来源归类'
                    id = data.id
                } else {
                    breadText = '添加客户来源归类'
                    id = data
                }
                var breadData = [
                    {
                        url: '/desktop',
                        text: '桌面'
                    },
                    {
                        url: '/channelGroup',
                        text: '客户来源归类'
                    },
                    {
                        url: '/channelGroupEdit',
                        text: breadText
                    }
                ];
                this.$store.dispatch('setBreadData', breadData);
                this.$router.push({
                    path: '/channelGroupEdit',
                    query: {
                        id: id
                    }
                })
            },
            toCheck () {
                var breadData = [
                    {
                        url: '/desktop',
                        text: '桌面'
                    },
                    {
                        url: '/channelGroup',
                        text: '客户来源归类'
                    },
                    {
                        url: '/channelGroupCheck',
                        text: '客户来源归类检测'
                    }
                ];
                this.$store.dispatch('setBreadData', breadData);
                this.$router.push({
                    path: '/channelGroupCheck',
                    query: {
                        id: '1'
                    }
                })
            },
            remove (data) {
                var _vm = this;
                _vm.$Modal.confirm({
                    title: '系统提示',
                    content: '确定删除'+ data.name +'?',
                    onOk: () => {
                        _vm.$http.post({
                            url: 'guard-webManager/channelGroup/del.jhtml',
                            data: {id: data.id},
                            success: function(res){
                                if(res.data.code == 0) {
                                    _vm.getList()
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
        }
    }
</script>



