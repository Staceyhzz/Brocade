<!-- hospitalVisitDetailCustom1 -->
<!-- 医院到诊明细（前台） -->
/**
 * 医院到诊明细（前台）
 */

<template>
    <div class="container-box" ref="containerBox">
        <div class="container-header">
            <h2>医院到诊明细（前台）</h2>
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
            <Form :label-width="60" inline :model="formSearch" ref='formSearch'>
                <Form-item label="到诊日期" prop='startTime'>
                    <Date-picker :transfer='true' type="daterange" placement="bottom-start" placeholder="选择日期" :clearable="false" style="width: 190px" @on-change='setDate' :value='dateBox'></Date-picker>
                </Form-item>
                <ul class="header-btn-group not-float">
                    <li class="header-item" @click="getList(1, formSearch)"><Icon type="search"></Icon>查询</li>
                    <li class="header-item" @click="handleReset('formSearch')"><Icon type="refresh"></Icon>重置</li>
                </ul>
            </Form>
            <Alert>
                <div v-html="TotalText">{{TotalText}}</div>
            </Alert>
            <Table stripe :columns="col" :data="data"></Table>
            <div class="table-page">
                <div class="table-info">当前第{{pageNumber}}页，共{{totalPages}}页，总共{{total}}条记录</div>
                <Page class="table-paginate" :total="total" @on-change='changePage' :current='pageNumber'></Page>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                show: false,
                adminToken: this.$token.readToken('adminToken') || '', 
                exportKey: localStorage.getItem('exportKey'),
                total: 0,
                totalPages: 1,
                pageNumber: 1,
                TotalText: '',
                formSearch: {
                    startTime: moment().format('YYYY-MM-DD'),
                    endTime: moment().format('YYYY-MM-DD'),
                },
                dateBox: [moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')],
                col: [
                    {
                        title: '序号',
                        width: 50,
                        render: (h, params) => {
                            const _index = (this.pageNumber - 1) * 10
                            return h('span', params.index + 1 + _index)
                        }
                    },
                    {
                        title: '到诊时间',
                        width: 80,
                        key: 'createTime'
                    },
                    {
                        title: '客户编号',
                        width: 60,
                        key: 'customerID'
                    },
                    {
                        title: '客户姓名',
                        width: 60,
                        key: 'customerName'
                    },
                    {
                        title: '联系方式',
                        width: 60,
                    	key: 'mobile'
                    },
                    {
                        title: '性别',
                        width: 60,
                        key: 'gender',
                        render: (h, params) => {
                        	const _text = params.row.gender == 1 ? '男':'女'
                        	return h('span', _text)
                        }
                    },
                    {
                        title: '年龄',
                        width: 60,
                        key: 'age'
                    },
                    {
                        title: '地区',
                        width: 60,
                        key: 'provinceName',
                        render: (h, params) => {
                        	const _text = params.row.provinceName + params.row.cityName +  params.row.districtName
                        	return h('span', _text)
                        }
                    },
                    {
                        title: '来源',
                        width: 60,
                        key: 'channelName'
                    },
                    {
                        title: '咨询项目',
                        width: 60,
                        key: 'symptomName'
                    },
                    {
                        title: '咨询人员',
                        width: 60,
                        key: 'managerUserName'
                    },
                    {
                        title: '首次成交时间',
                        width: 80,
                        key: 'firstDealTime'
                    },
                    {
                        title: '初次到诊时间',
                        width: 80,
                        key: 'firstVisitTime'
                    },
                    {
                        title: '新老客',
                        width: 60,
                        key: 'newOld',
                        render: (h, params) => {
                        	const _text = params.row.newOld == 1 ? '新客':'老客'
                        	const color = params.row.newOld == 1 ? 'blue':'red'
                        	return h('span', {
                        		style: {
                        			color: color
                        		}
                        	}, _text)
                        }
                    },
                    {
                        title: '门诊类别',
                        width: 60,
                        key: 'clinicType',
                        render: (h, params) => {
                            let text
                            switch(params.row.clinicType){
                                case 1: 
                                    text = '初诊'
                                    break
                                case 2: 
                                    text = '复诊'
                                    break
                                case 3: 
                                    text = '复查'
                                    break
                                case 4: 
                                    text = '再消费'
                                    break
                            }
                            return h('span', text)
                        }
                    },
                    {
                        title: '成交状态',
                        width: 60,
                        key: 'isDeal',
                        render: (h, params) => {
                        	const _text = params.row.isDeal == 1 ? '成交':'未成交'
                        	const color = params.row.isDeal == 1 ? 'blue':'red'
                        	return h('span', {
                        		style: {
                        			color: color
                        		}
                        	}, _text)
                        }
                    },
                    {
                        title: '成交项目',
                        key: 'charges',
                        width: 80,
                    }
                ],
                data: [],
            }
        },
        computed: {
            pageSize () {
                return this.$store.getters.getPageSize
            },
            exportPrefixURL () {
                return this.$store.getters.getExportPrefixURL + '/guard-webManager/excelExport/hospitalVisitDetailCustom1.jhtml'
            }
        },
        created () {
            this.getList(1, this.formSearch)
        },
        mounted () {
        },
        methods: {
            getList(pageNumber, form) {
                let _vm = this
                _vm.$store.dispatch('setPageLoading', -1)
                form['pageNumber'] = pageNumber
                form['pageSize'] = _vm.pageSize
                _vm.$http.get({
                    url: 'guard-webManager/report/hospitalVisitDetailCustom1.jhtml',
                    data: form,
                    success: function(res){
                        if(res.data.code == 0) {
                            _vm.data = res.data.content.Page.content
                            _vm.total = res.data.content.Page.total
                            _vm.pageNumber = res.data.content.Page.pageNumber
                            _vm.totalPages = res.data.content.Page.totalPages
                            _vm.TotalText = res.data.content.TotalText
                            _vm.$store.dispatch('setPageLoading', 1)
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
            changePage (num) {
                this.getList(num, this.formSearch)
            },
            handleReset (name) {
                this.$refs[name].resetFields();
                if(name == 'formSearch') {
                    this.formSearch.startTime = moment().format('YYYY-MM-DD')
                    this.formSearch.endTime = moment().format('YYYY-MM-DD')
                    this.dateBox = [moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')]
                    this.getList(1, this.formSearch)
                }
            },
            exportTable () {
                this.$refs.formSubmit.submit()
            }
        }
    }
</script>
