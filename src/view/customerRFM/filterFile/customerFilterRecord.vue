/**
 * 客户结果集明细
 */

<template>
    <div class="container-box" ref="containerBox">
        <div class="container-header">
            <h2>客户结果集————{{name}}</h2>
            <ul class="header-btn-group">
                <li class="header-item" @click="exportTable" v-if="exportKey === '1'"><Icon type="ios-download-outline"></Icon>导出</li>
            </ul>
        </div>
        <div class="container-body">
            <Table stripe :columns="col" :data="data"></Table>
            <div class="table-page">
                <div class="table-info">当前第{{pageNumber}}页，共{{totalPages}}页，总共{{total}}条记录</div>
                <Page class="table-paginate" :total="total" @on-change='changePage' :current='pageNumber'></Page>
            </div>
        </div>
        <form :action="exportURL" method="get" ref="formSubmit" v-show="show">
            <input name="id" :value="id">
            <input name="adminToken" :value="adminToken">
        </form>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                show: false,
                id: this.$route.query.id,
                exportKey: localStorage.getItem('exportKey'),
                adminToken: this.$token.readToken('adminToken') || '',
                total: 0,
                totalPages: 1,
                pageNumber: 1,
                name: '',
                col: [
                    {
                        title: '序号',
                        width: 70,
                        render: (h, params) => {
                            const _index = (this.pageNumber - 1) * 10
                            return h('span', params.index + 1 + _index)
                        }
                    },
                    {
                        title: '客户编号',
                        key: 'id',
                    },
                    {
                        title: '客户姓名',
                        key: 'name'
                    },
                    {
                        title: '性别',
                        key: 'gender',
                        render: (h, params) => {
                            const _text = params.row.gender == 1 ? '男' : '女'
                            return h('span', _text)
                        }
                    },
                    {
                        title: '来源',
                        key: 'channelName'
                    },
                    {
                        title: '主咨询项目',
                        key: 'symptomName'
                    },
                    {
                        title: '会员类型',
                        key: 'memberCategoryName'
                    },
                    {
                        title: '上门状态',
                        render: (h, params) => {
                            const _color = typeof params.row.firstVisitTime == 'string' ? 'blue' : 'red'
                            const _text = typeof params.row.firstVisitTime == 'string'? '已上门' : '未上门'
                            return h('span', {
                                style: {
                                    color: _color
                                }
                            }, _text)
                        }
                    },
                    {
                        title: '成交状态',
                        render: (h, params) => {
                            const _color = typeof params.row.firstDealTime == 'string' ? 'blue' : 'red'
                            const _text = typeof params.row.firstDealTime == 'string' ? '已成交' : '未成交'
                            return h('span', {
                                style: {
                                    color: _color
                                }
                            }, _text)
                        }
                    },
                ],
                data: [],
            }
        },
        computed: {
            exportURL () {
                return this.$store.getters.getExportPrefixURL + '/guard-webManager/customerFilter/exportFilter.jhtml'
            }
        },
        created () {
            this.getList(1, 10,)
        },
        methods: {
            getList(pageNumber, pageSize) {
                let _vm = this,
                    form = {}
                _vm.$store.dispatch('setPageLoading', -1)
                form['pageNumber'] = pageNumber
                form['pageSize'] = pageSize
                form['id'] = _vm.$route.query.id
                _vm.pageLodading = true
                _vm.$http.get({
                    url: 'guard-webManager/customerFilter/record.jhtml',
                    data: form,
                    success: function(res){
                        if(res.data.code == 0) {
                            _vm.name = res.data.content.CustomerFilter.name
                            _vm.data = res.data.content.Pager.content
                            _vm.total = res.data.content.Pager.total
                            _vm.pageNumber = res.data.content.Pager.pageNumber
                            _vm.totalPages = res.data.content.Pager.totalPages
                            _vm.$store.dispatch('setPageLoading', 1);
                            console.log(res)
                        } else {
                            console.log(res.data.desc)
                        }
                    },
                    error: function(res){
                        console.log(res);
                    }
                });
            },
            changePage (num) {
                this.getList(num, 10)
            },
            exportTable () {
                this.$refs.formSubmit.submit()
            }
        }
    }
</script>
