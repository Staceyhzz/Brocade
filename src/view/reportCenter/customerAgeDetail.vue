<!-- customerAgeDetail -->
<!-- 年龄明细 -->

/**
 * 年龄明细
 */

<template>
    <div class="container-box" ref="containerBox">
        <div class="container-header">
            <h2>年龄明细</h2>
            <ul class="header-btn-group">
                <li class="header-item" @click="exportTable" v-if="exportKey === '1'"><Icon type="ios-download-outline"></Icon>导出</li>
            </ul>
        </div>
        <div class="container-body">
            <form :action="exportPrefixURL" method="get" ref="formSubmit" v-show="show">
                <input name="startTime" :value="formSearch.startTime">
                <input name="endTime" :value="formSearch.endTime">
                <input name="hospitalId" :value="formSearch.hospitalId">
                <input name="channelId" :value="formSearch.channelId">
                <input name="symptomId" :value="formSearch.symptomId">
                <input name="memberCategoryId" :value="formSearch.memberCategoryId">
                <input name="age" :value="formSearch.age">
                <input name="adminToken" :value="adminToken">
            </form>
            <Form :label-width="80" inline :model="formSearch" ref='formSearch'>
                <Form-item label="提交日期" prop='startTime'>
                    <Date-picker :transfer='true' type="daterange" placement="bottom-start" placeholder="选择日期" :clearable="false" style="width: 190px" @on-change='setDate' :value='dateBox'></Date-picker>
                </Form-item>
                <Form-item label="来源" prop='channelId'>
                    <cmptRemoteFilterChannel _placeHolder='输入拼音汉字快捷搜索' @setChannelName='setChannelName' ref='remoteChannel'></cmptRemoteFilterChannel>
                </Form-item>
                <Form-item label="咨询项目" prop='symptomId'>
                    <Select v-model="formSearch.symptomId" clearable style="width:200px">
                        <Option v-for="item in symptomList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </Form-item>
                <Form-item label="会员" prop='memberCategoryId'>
                    <Select v-model="formSearch.memberCategoryId" clearable style="width:200px">
                        <Option v-for="item in memberCategoryList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </Form-item>
                <Form-item label="年龄" prop='age'>
                    <Input type="text" :maxlength='15' v-model.trim="formSearch.age" placeholder="请输入年龄" @on-enter="getList(1, formSearch)"></Input>
                </Form-item>
                <ul class="header-btn-group not-float">
                    <li class="header-item" @click="getList(1, formSearch)"><Icon type="search"></Icon>查询</li>
                    <li class="header-item" @click="handleReset('formSearch')"><Icon type="refresh"></Icon>重置</li>
                </ul>
            </Form>

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
                adminToken: this.$token.readToken('adminToken') || '', exportKey: localStorage.getItem('exportKey'),
                total: 0,
                message: '',
                totalPages: 1,
                pageNumber: 1,
                formSearch: {
                    startTime: moment().format('YYYY-MM-DD'),
                    endTime: moment().format('YYYY-MM-DD'),
                    channelId: '',
                    symptomId: '',
                    memberCategoryId: '',
                    age: ''
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
                        title: '客户编号',
                        key: 'customerID'
                    },
                    {
                        title: '客户姓名',
                        key: 'customerName'
                    },
                    {
                        title: '年龄',
                        key: 'age'
                    },
                    {
                        title: '性别',
                        key: 'gender',
                        render: (h, params) => {
                        	const text = params.row.gender == 1 ? '男':'女'
                        	const color = params.row.gender == 1 ? 'blue':'red'
                        	return h('span', {
                        		style: {
                        			color: color
                        		}
                        	}, text)
                        }
                    },
                    {
                        title: '来源',
                        key: 'channelName'
                    },
                    {
                        title: '咨询项目',
                        key: 'symptomName'
                    },
                    {
                        title: '会员类型',
                        key: 'memberCategoryName'
                    },
                    {
                        title: '上门状态',
                        key: 'visitStatus',
                        render: (h, params) => {
                        	const text = params.row.visitStatus == 1 ? '已上门':'未上门'
                        	const color = params.row.visitStatus == 1 ? 'blue':'red'
                        	return h('span', {
                        		style: {
                        			color: color
                        		}
                        	}, text)
                        }
                    },
                    {
                        title: '成交状态',
                        key: 'dealStatus',
                        render: (h, params) => {
                        	const text = params.row.dealStatus == 1 ? '已成交':'未成交'
                        	const color = params.row.dealStatus == 1 ? 'blue':'red'
                        	return h('span', {
                        		style: {
                        			color: color
                        		}
                        	}, text)
                        }
                    }
                ],
                data: [],
            }
        },
        computed: {
            pageSize () {
                return this.$store.getters.getPageSize
            },
            symptomList () {
            	return this.$store.getters.getSelectAllSymptomInfoList
            },
            memberCategoryList () {
            	return this.$store.getters.getSelectMemberList
            },
            exportPrefixURL () {
                return this.$store.getters.getExportPrefixURL + '/guard-webManager/excelExport/customerAgeDetail.jhtml'
            }
        },
        created () {
            this.getList(1, this.formSearch)
        },
        mounted () {
        	this.$store.dispatch('setSelectAllSymptomInfoList', {})
        	this.$store.dispatch('setSelectMemberList', {})
        },
        methods: {
            getList(pageNumber, form) {
                let _vm = this
                _vm.$store.dispatch('setPageLoading', -1);
                form['pageNumber'] = pageNumber
                form['pageSize'] = _vm.pageSize
                _vm.$http.get({
                    url: 'guard-webManager/report/customerAgeDetail.jhtml',
                    data: form,
                    success: function(res){
                        if(res.data.code == 0) {
                            _vm.data = res.data.content.Page.content
                            _vm.total = res.data.content.Page.total
                            _vm.pageNumber = res.data.content.Page.pageNumber
                            _vm.totalPages = res.data.content.Page.totalPages
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
            setChannelName (data) {
                this.formSearch.channelId = data.id
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
                    this.$refs.remoteChannel.clean()
                    this.getList(1, this.formSearch)
                }
            },
            exportTable () {
                this.$refs.formSubmit.submit()
            }
        }
    }
</script>
