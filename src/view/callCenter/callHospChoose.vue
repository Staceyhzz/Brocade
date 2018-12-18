/**
 * 呼叫中心选择医院
 */

<template>
    <div class="container-box" ref="containerBox">
        <div class="container-header">
            <h2>呼叫中心</h2>
        </div>
        <div class="container-body">
            <Table stripe :columns="col" :data="data"></Table>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                col: [
                    {   
                        title: '序号',
                        type: 'index',
                        width: 100,
                        align: 'center',
                    },
                    {
                        title: '名称',
                        key: 'name'
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
                                            type: 'primary',
                                            size: 'small',
                                            icon: 'edit'
                                        },
                                        on: {
                                            click: () => {
                                                this.toHosp(params.row.id, params.row.name)
                                            }
                                        }
                                    }, '设置'),
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
                let _vm = this
                _vm.$store.dispatch('setPageLoading', -1)
                _vm.$http.get({
                    url: 'guard-webManager/manager/hospitalList.jhtml',
                    success: function(res){
                        if(res.data.code === 0 ){
                            _vm.data = res.data.content || []
                            _vm.$store.dispatch('setPageLoading', 1)
                        } else {
                            console.log(res.data.desc)
                            if (window.localStorage) {
                                let lg = window.localStorage;
                                _vm.toHosp(lg.hospId, lg.hospName)
                            }
                        }
                    },
                    error: function(res){
                        console.log(res)
                    }
                })
            },
            //跳转分院 
            toHosp (id, name) {
                let breadData = [
                    {
                        url: '/desktop',
                        text: '桌面'
                    },
                    {
                        url: '/callCenter',
                        text: '总机管理'
                    }
                ]
                this.$store.dispatch('setBreadData', breadData)
                this.$router.push({
                    path: '/callCenter',
                    query: {
                        id: id
                    }
                })
                const _query = {id: id}
                window.sessionStorage.setItem('query34', JSON.stringify(_query))
            },
        }
    }
</script>