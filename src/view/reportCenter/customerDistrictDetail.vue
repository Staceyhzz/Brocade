<!-- customerDistrictDetail -->
<!-- 地区明细 -->
/**
 * 地区明细
 */

<template>
    <div class="container-box" ref="containerBox">
        <div class="container-header">
            <h2>地区明细</h2>
            <ul class="header-btn-group">
                <li class="header-item" @click="exportTable" v-if="exportKey === '1'"><Icon type="ios-download-outline"></Icon>导出</li>
            </ul>
        </div>
        <div class="container-body">
            <form :action="exportPrefixURL" method="get" ref="formSubmit" v-show="show">
                <input name="startTime" :value="formSearch.startTime">
                <input name="endTime" :value="formSearch.endTime">
                <input name="channelId" :value="formSearch.channelId">
                <input name="symptomId" :value="formSearch.symptomId">
                <input name="memberCategoryId" :value="formSearch.memberCategoryId">
                <input name="adminToken" :value="adminToken">
            </form>
            <Form :label-width="100" inline :model="formSearch" ref='formSearch'>
                <Form-item label="登记日期" prop='startTime'>
                    <Date-picker :transfer='true' type="daterange" placement="bottom-start" placeholder="选择日期" :clearable="false" style="width: 190px" @on-change='setDate_1' :value='dateBox_1'></Date-picker>
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
                <ul class="header-btn-group not-float">
                    <li class="header-item" @click="getList(1, formSearch)"><Icon type="search"></Icon>查询</li>
                    <li class="header-item" @click="handleReset('formSearch')"><Icon type="refresh"></Icon>重置</li>
                </ul>
            </Form>
            <!-- <Alert>
                <div v-html="TotalText">{{TotalText}}</div>
            </Alert> -->
            <Table stripe :columns="col" :data="data"></Table>
            <div class="table-page">
                <div class="table-info">当前第{{pageNumber}}页，共{{totalPages}}页，总共{{total}}条记录</div>
                <Page class="table-paginate" :total="total" @on-change='changePage' :current='pageNumber'></Page>
            </div>
        </div>
    </div>
</template>

<script>
    // import cmptStoreChoose from 'components/storeChoose.vue'
    export default {
        data () {
            return {
                show: false,
                adminToken: this.$token.readToken('adminToken') || '', exportKey: localStorage.getItem('exportKey'),
                total: 0,
                message: '',
                totalPages: 1,
                pageNumber: 1,
                // TotalText: '',
                managerUserName: '',
                exploitUserName: '',
                storeName: '',
                formSearch: {
                    startTime: moment().format('YYYY-MM-DD'),
                    endTime: moment().format('YYYY-MM-DD'),
                    channelId: '',
                    symptomId: '',
                    memberCategoryId: ''
                },
                dateBox_1: [moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')],
                col: [
                    {
                        title: '序号',
                        width: 40,
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
                        title: '省',
                        key: 'provinceName'
                    },
                    {
                        title: '市',
                        key: 'cityName'
                    },
                    {
                    	title: '区县',
                    	key: 'districtName'
                    },
                    {
                    	title: '性别',
                    	key: 'gender',
                    	render: (h, params) => {
                    		const _text = params.row.gender == 1 ? '男':'女'
                    		return h('span', _text)
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
                    	render: (h,params) => {
                    		const color = params.row.visitStatus == 1 ? 'blue':'red'
                    		const text = params.row.visitStatus == 1 ? '已上门':'未上门'
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
                        render: (h,params) => {
                    		const color = params.row.dealStatus == 1 ? 'blue':'red'
                    		const text = params.row.dealStatus == 1 ? '已成交':'未成交'
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
            symptomList () {
            	return this.$store.getters.getSelectAllSymptomInfoList
            },
            memberCategoryList () {
            	return this.$store.getters.getSelectMemberList
            },
            pageSize () {
                return this.$store.getters.getPageSize
            },
            exportPrefixURL () {
                return this.$store.getters.getExportPrefixURL + '/guard-webManager/excelExport/customerDistrictDetail.jhtml'
            }
        },
        // components: {
        //     cmptStoreChoose
        // },
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
                _vm.$store.dispatch('setPageLoading', -1)
                form['pageNumber'] = pageNumber
                form['pageSize'] = _vm.pageSize
                _vm.$http.get({
                    url: 'guard-webManager/report/customerDistrictDetail.jhtml',
                    data: form,
                    success: function(res){
                        if(res.data.code == 0) {
                            _vm.data = res.data.content.Page.content
                            _vm.total = res.data.content.Page.total
                            _vm.pageNumber = res.data.content.Page.pageNumber
                            _vm.totalPages = res.data.content.Page.totalPages
                            // _vm.TotalText = res.data.content.TotalText
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
            setDate_1 (date) {
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
                    this.dateBox_1 = [moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')]
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
