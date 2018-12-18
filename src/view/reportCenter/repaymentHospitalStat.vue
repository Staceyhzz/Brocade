/**
 * 集团还款各医院统计
 * 无导出
 */

<template>
    <div class="container-box" ref="containerBox">
        <div class="container-header">
            <h2>集团还款各医院统计</h2>
            <!-- <ul class="header-btn-group">
                <li class="header-item"><Icon type="ios-download-outline"></Icon>导出</li>
            </ul> -->
        </div>
        <div class="container-body">
            <Form :label-width="80" inline :model="formSearch" ref='formSearch'>
                <Form-item label="提交日期" prop='startTime'>
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
                    hospitalId: ''
                },
                dateBox: [moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')],
                col: [
                    {
                        title: '序号',
                        width: 70,
                        render: (h, params) => {
                            return h('span', params.index + 1)
                        }
                    },
                    {
                        title: '医院',
                        key: 'hospitalName'
                    },
                    {
                        title: '还款数量',
                        key: 'num'
                    },
                    {
                        title: '还款客户数量',
                        key: 'customerNum'
                    },
                    {
                        title: '现金合计',
                        key: 'cash',
                        render: (h, params) => {
                        	let text = params.row.cash.toFixed(2)
                        	return h('span', text)
                        }
                    },
                    {
                        title: '刷卡合计',
                        key: 'card',
                        render: (h, params) => {
                        	let text = params.row.card.toFixed(2)
                        	return h('span', text)
                        }
                    },
                    {
                        title: '还款总额合计',
                        key: 'cashCard',
                        render: (h, params) => {
                        	let text = params.row.cashCard.toFixed(2)
                        	return h('span', text)
                        }
                    }
                ],
                data: [],
            }
        },
        created () {
            this.getList(this.formSearch)
        },
        methods: {
            getList(form) {
                let _vm = this
                _vm.$store.dispatch('setPageLoading', -1);
                _vm.pageLodading = true
                _vm.$http.get({
                    url: 'guard-webManager/report/repaymentHospitalStat.jhtml',
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
