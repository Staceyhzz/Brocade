<!-- userFailtureCategoryStat -->
<!-- 用户未成交类型统计 -->
/**
 * 用户未成交类型统计
 * 无导出
 */

<template>
    <div class="container-box" ref="containerBox">
        <div class="container-header">
            <h2>用户未成交类型统计</h2>
        </div>
        <div class="container-body">
            <Form :label-width="80" inline :model="formSearch" ref='formSearch'>
                <Form-item label="预约日期" prop='startTime'>
                    <Date-picker :transfer='true' type="daterange" placement="bottom-start" placeholder="选择日期" :clearable="false" style="width: 180px" @on-change='setDate' :value='dateBox'></Date-picker>
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
                formSearch: {
                    startTime: moment().format('YYYY-MM-DD'),
                    endTime: moment().format('YYYY-MM-DD'),
                },
                dateBox: [moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')],
                col: [
                    {
                        title: '未成交类型',
                        key: 'categoryName'
                    },
                    {
                        title: '数量',
                        key: 'num'
                    },
                    {
                        title: '百分比',
                        render: (h, params) => {
                            let text = ((params.row.rate * 10000)/100).toFixed(2) + '%'
                            return h('span', text)
                        }
                    }
                ],
                data: [],
            }
        },
        computed: {
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
                    url: 'guard-webManager/report/userFailtureCategoryStat.jhtml',
                    data: form,
                    success: function(res){
                        if(res.data.code == 0) {
                            _vm.data = res.data.content.List
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
            setDate (date) {
                this.formSearch.startTime = date[0]
                this.formSearch.endTime = date[1]
            },
            handleReset (name) {
                this.$refs[name].resetFields();
                if(name == 'formSearch') {
                    this.formSearch.startTime = moment().format('YYYY-MM-DD')
                    this.formSearch.endTime = moment().format('YYYY-MM-DD')
                    this.dateBox = [moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')]
                    this.getList(this.formSearch);
                }
            }
        }
    }
</script>

