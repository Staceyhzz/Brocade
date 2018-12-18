<!-- couponChangeDateStat -->
<!-- 集团券变动日统计 -->
/**
 * 医院券变动日统计
 * 无导出按钮
 */

<template>
    <div class="container-box" ref="containerBox">
        <div class="container-header">
            <h2>医院券变动日统计</h2>
            <!-- <ul class="header-btn-group">
                <li class="header-item"><Icon type="ios-download-outline"></Icon>导出</li>
            </ul> -->
        </div>
        <div class="container-body">
            <Form :label-width="60" inline :model="formSearch" ref='formSearch'>
                <Form-item label="提交日期" prop='startTime'>
                    <Date-picker :transfer='true' type="daterange" placement="bottom-start" placeholder="选择日期" :clearable="false" style="width: 180px" @on-change='setDate' :value='dateBox'></Date-picker>
                </Form-item>
                <ul class="header-btn-group not-float">
                    <li class="header-item" @click="getList(formSearch)"><Icon type="search"></Icon>查询</li>
                    <li class="header-item" @click="handleReset('formSearch')"><Icon type="refresh"></Icon>重置</li>
                </ul>
            </Form>
            <!-- <Alert>
                <div v-html='message'>{{message}}</div>
            </Alert> -->
            <Table stripe :columns="col" :data="data"></Table>
            
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                // message: '',
                formSearch: {
                    status: 0,
                    startTime: moment().format('YYYY-MM-DD'),
                    endTime: moment().format('YYYY-MM-DD'),
                },
                dateBox: [moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')],
                col: [
                	{
                        title: '日期',
                        key: 'createDate'
                    },
                    {
                        title: '变动金额',
                        key: 'changeAmount'
                    },
                    {
                        title: '进总金额',
                        key: 'inAmount'
                    },
                    {
                        title: '进1（预收款订单）',
                        key: 'inAmount1'
                    },
                    {
                    	title: '进2（手工赠送）',
                    	key: 'inAmount2',
                    },
                    {
                    	title: '进3（积分兑换）',
                    	key: 'inAmount3',
                    },
                    {
                        title: '进4（激活获取）',
                        key: 'inAmount4'
                    },
                    {
                        title: '出总金额',
                        key: 'outAmount'
                    },
                    {
                        title: '出1（订单划扣）',
                        key: 'outAmount1'
                    },
                    {
                        title: '出2（退劵）',
                        key: 'outAmount2'
                    }
                ],
                data: [],
                ssHospId: ''
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
                    url: 'guard-webManager/report/couponChangeDateStat.jhtml',
                    data: form,
                    success: function(res){
                        if(res.data.code == 0) {
                        	// _vm.message = res.data.content.TotalText
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
            // changePage (num) {
            //     this.getList(num, this.formSearch)
            // },
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
