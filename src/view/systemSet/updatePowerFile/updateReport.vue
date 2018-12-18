/**
 * 设置查看报表
 */

<template>
    <div class="container-box">
        <div class="container-header">
            <h2>设置查看报表</h2>
        </div>
        <div class="container-body">
            <Table stripe :columns="col" :data="data" @on-selection-change='choose'></Table>
            <div class="footer-btnGroup">
                <Button type="primary"  icon="checkmark" @click='save' :loading='saveLoad'>保存</Button>
                <Button type="primary"  icon="android-arrow-back" @click='back'>返回</Button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                saveLoad: false,
                col: [
                    {   
                        title: '序号',
                        type: 'index',
                        width: 60
                    },
                    {
                        title: '报表名称',
                        key: 'name'
                    },
                    {
                        title: '报表编号',
                        key: 'no'
                    },
                    {
                        title: '菜单模块',
                        key: 'tags',
                    },
                    {
                        title: '报表介绍',
                        key: 'content'
                    },
                    {
                        type: 'selection',
                        title: '设为可操作',
                        width: 60,
                        align: 'center'
                    },
                ],
                data: [],
                selectBox: [],
                key: true,
            }
        },
        created () {
            if(this.$route.query.type === 'user') {
                this.key = true
            } else if(this.$route.query.type === 'role') {
                this.key = false
            }
            this.getList()
        },
        methods: {
            getList () {
                let _vm = this,
                    _url = ''
                if(_vm.key) {
                    _url = 'guard-webManager/userAuthCustom/record.jhtml'
                } else {
                    _url = 'guard-webManager/role/config.jhtml'
                }
                _vm.$store.dispatch('setPageLoading', -1)
                _vm.$http.getPage({
                    url: _url,
                    data: {id: _vm.$route.query.id},
                    success: function(res){
                        let _all = res.data.content.allReportList
                        let _now = res.data.content.reportList
                        _all.map(item => {
                            _now.map(item1 => {
                                if(item.id === item1.id) {
                                    item['_checked'] = true
                                }
                            })
                        })
                        _vm.data = _all
                        _vm.$store.dispatch('setPageLoading', 1)
                        _vm.choose(_now);
                    },
                    error: function(res){
                        console.log(res);
                    }
                });
            },
            choose (data) {
                this.selectBox = []
                data.map(item => {
                    this.selectBox.push(item.id)
                })
            },
            save () {
                let _vm = this,
                    _url = ''
                if(_vm.key) {
                    _url = 'guard-webManager/userAuthCustom/updateReport.jhtml'
                } else {
                    _url = 'guard-webManager/role/updateReportEdit.jhtml'
                }
                _vm.saveLoad = true
                _vm.$http.post({
                    url: _url,
                    data: {
                        id: _vm.$route.query.id,
                        reportList: _vm.selectBox.join(','),
                    },
                    success: function(res){
                        if(res.data.code == 0){
                            _vm.$router.back(-1)
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
                })
            },
            back () {
                this.$router.back(-1)
            }
        }
    }
</script>