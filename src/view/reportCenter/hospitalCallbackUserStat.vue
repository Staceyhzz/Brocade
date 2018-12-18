<!-- hospitalCallbackUserStat -->
<!-- 医院用户回访统计 -->
/**
 * 医院用户回访统计
 */

<template>
    <div class="container-box" ref="containerBox">
        <div class="container-header">
            <h2>医院用户回访统计</h2>
            <ul class="header-btn-group">
                <li class="header-item" @click="exportTable" v-if="exportKey === '1'"><Icon type="ios-download-outline"></Icon>导出</li>
            </ul>
        </div>
        <div class="container-body">
            <form :action="exportPrefixURL" method="get" ref="formSubmit" v-show="show">
                <input name="startTime" :value="formSearch.startTime">
                <input name="endTime" :value="formSearch.endTime">
                <input name="adminToken" :value="adminToken">
            </form>
            <Form :label-width="100" inline :model="formSearch" ref='formSearch'>
                <Form-item label="提交日期" prop='startTime'>
                    <Date-picker :transfer='true' type="daterange" placement="bottom-start" placeholder="选择日期" :clearable="false" style="width: 190px" @on-change='setDate' :value='dateBox'></Date-picker>
                </Form-item>
                <ul class="header-btn-group not-float">
                    <li class="header-item" @click="getList(formSearch)"><Icon type="search"></Icon>查询</li>
                    <li class="header-item" @click="handleReset('formSearch')"><Icon type="refresh"></Icon>重置</li>
                </ul>
            </Form>
            <Table stripe :columns="col" :data="data"></Table>
            
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                show: false,
                adminToken: this.$token.readToken('adminToken') || '', exportKey: localStorage.getItem('exportKey'),
                formSearch: {
                    startTime: moment().format('YYYY-MM-DD'),
                    endTime: moment().format('YYYY-MM-DD'),
                },
                dateBox: [moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')],
                col: [
                    {
                        title: '用户',
                        key: 'userName'
                    },
                    {
                        title: '任务数量',
                        key: 'totalNum'
                    },
                    {
                        title: '完成数量',
                        key: 'doNum'
                    },
                    {
                        title: '完成比例（%）',
                        key: 'doPercent',
                        render: (h, params) => {
                            let text = ((params.row.doPercent * 10000)/100).toFixed(2) + '%'
                            return h('span', text)
                        }
                    },
                    {
                        title: '未完成数量',
                        key: 'notNum'
                    },
                    {
                        title: '未完成比例（%）',
                        key: 'notPercent',
                        render: (h, params) => {
                            let text = ((params.row.notPercent * 10000)/100).toFixed(2) + '%'
                            return h('span', text)
                        }
                    },
                    {
                        title: '本人完成数量',
                        key: 'doUserNum'
                    },
                    {
                        title: '本人完成比例（%）',
                        key: 'doUserPercent',
                        render: (h, params) => {
                            let text = ((params.row.doUserPercent * 10000)/100).toFixed(2) + '%'
                            return h('span', text)
                        }
                    },
                    {
                        title: '他人完成数量',
                        key: 'doOtherNum'
                    },
                    {
                        title: '他人完成比例（%）',
                        key: 'doOtherPercent',
                        render: (h, params) => {
                            let text = ((params.row.doOtherPercent * 10000)/100).toFixed(2) + '%'
                            return h('span', text)
                        }
                    },
                ],
                data: [],
                surveyList: []
            }
        },
        computed: {
            exportPrefixURL () {
                return this.$store.getters.getExportPrefixURL + '/guard-webManager/excelExport/hospitalCallbackUserStat.jhtml'
            }
        },
        created () {
            this.getList(this.formSearch)
        },
        mounted () {
        },
        methods: {
            getList(form) {
                let _vm = this
                _vm.$store.dispatch('setPageLoading', -1)
                _vm.$http.get({
                    url: 'guard-webManager/report/hospitalCallbackUserStat.jhtml',
                    data: form,
                    success: function(res){
                        if(res.data.code == 0) {
                            _vm.data = res.data.content.List
                            _vm.$store.dispatch('setPageLoading', 1)
                            console.log(res)
                        } else {
                            console.log(res.data.desc)
                        }
                    },
                    error: function(res){
                        console.log(res)
                    }
                });
            },
            setDate (date) {
                this.formSearch.startTime = date[0]
                this.formSearch.endTime = date[1]
            },
            changePage (num) {
                this.getList(this.formSearch)
            },
            handleReset (name) {
                this.$refs[name].resetFields()
                if(name == 'formSearch') {
                    this.formSearch.startTime = moment().format('YYYY-MM-DD')
                    this.formSearch.endTime = moment().format('YYYY-MM-DD')
                    this.dateBox = [moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')]
                    this.getList(this.formSearch)
                }
            },
            exportTable () {
                this.$refs.formSubmit.submit()
            }
        }
    }
</script>
