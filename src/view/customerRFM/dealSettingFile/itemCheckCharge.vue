/**
 * 检测收费项目匹配页面
 */

<template>
    <div class="container-box">
        <div class="container-header">
            <h2>消费项目</h2>
            <ul class="header-btn-group">
                <li class="header-item" @click="back"><Icon type="android-arrow-back"></Icon>返回</li>         
            </ul>
        </div>
        <div class="container-body">
            <Alert type="success">
                <p v-if='key == 0'>已全部配置</p>
                <p v-else>未配置数量：{{key}}</p>
            </Alert>
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
                    {
                        title: '客户意向归类名称',
                        key: 'itemName'
                    },
                    {
                        title: '配置状态',
                        width: 100,
                        key: 'itemID',
                        render: (h, params) => {
                            const color = !params.row.itemID && params.row.itemID != 0 ? 'red' : 'blue';
                            const text = !params.row.itemID && params.row.itemID != 0 ? '未配置' : '已配置';
                            return h('span', {
                                style: {
                                    color: color
                                }
                            },text)
                        }
                    },
                ],
                data: [],
                key: ''
            }
        },
        created () {
            this.getList()
        },
        methods: {
            getList () {
                let _vm = this
                _vm.$store.dispatch('setPageLoading', -1)
                _vm.$http.get({
                    url: 'guard-webManager/item/checkCharge.jhtml',
                    success: function(res){
                        if(res.data.code === 0){
                            console.log(res)
                            _vm.$store.dispatch('setPageLoading', 1)
                            _vm.data = res.data.content.List || []
                            _vm.key = res.data.content.Num
                        } else {
                            console.log(res.data.desc)
                        }
                    },
                    error: function(res){
                        console.log(res)
                    }
                })
            },
            back () {
                this.$router.back(-1)
            }
        }
    }
</script>



