/**
 * 集团治疗预约明细
 */

<template>
    <div class="container-box" ref="containerBox">
        <div class="container-header">
            <h2>集团治疗预约明细</h2>
            <ul class="header-btn-group">
                <li class="header-item" @click="exportTable" v-if="exportKey === '1'"><Icon type="ios-download-outline"></Icon>导出</li>
            </ul>
        </div>
        <div class="container-body">
            <form :action="exportPrefixURL" method="get" ref="formSubmit" v-show="show">
                <input name="startTime" :value="formSearch.startTime">
                <input name="endTime" :value="formSearch.endTime">
                <input name="hospitalId" :value="formSearch.hospitalId">
                <input name="userId" :value="formSearch.userId">
                <input name="customerId" :value="formSearch.customerId">
                <input name="status" :value="formSearch.status">
                <input name="type" :value="formSearch.type">
                <input name="adminToken" :value="adminToken">
            </form>
            <Form :label-width="80" inline :model="formSearch" ref='formSearch'>
                <Form-item label="预约日期" prop='startTime'>
                    <Date-picker :transfer='true' type="daterange" placement="bottom-start" placeholder="选择日期" :clearable="false" style="width: 180px" @on-change='setDate' :value='dateBox'></Date-picker>
                </Form-item>
                <Form-item label="预约医院" prop='hospitalId'>
                    <Select v-model="formSearch.hospitalId" clearable style="width:200px">
                        <Option v-for="item in hospList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </Form-item>
                <Form-item label="类型" prop='type'>
                    <Select v-model="formSearch.type" style="width:200px">
                        <Option :value="3">全部</Option>
                        <Option :value="1">线下预约</Option>
                        <Option :value="2">线上预约</Option>
                    </Select>
                </Form-item>
                <Form-item label="预约医生" prop='userId'>
                    <cmptHospChooseUser _placeHolder="选择用户" :_style="{width:'162px'}" :_userName="userName" v-on:setUserName="setUser"></cmptHospChooseUser>
                </Form-item>
                <Form-item label="客户编号" prop='customerId'>
                    <Input type="text" :maxlength='15' v-model.trim="formSearch.customerId" placeholder="请输入客户编号" @on-enter="getList(1, formSearch)"></Input>
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
                adminToken: this.$token.readToken('adminToken') || '', 
                exportKey: localStorage.getItem('exportKey'),
                total: 0,
                message: '',
                totalPages: 1,
                pageNumber: 1,
                userName: '',
                formSearch: {
                    startTime: moment().format('YYYY-MM-DD'),
                    endTime: moment().format('YYYY-MM-DD'),
                    hospitalId: '',
                    userId: '',
                    customerId: '',
                    type: 3,
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
                        title: '类型',
                        render: (h, params) => {
                            const _text = params.row.type === 1 ? '线上预约' : '线下预约'
                            return h('span', _text)
                        }
                    },
                    {
                        title: '预约日期',
                        render: (h, params) => {
                            const _text = moment(params.row.appointmentDate).format('YYYY-MM-DD')
                            return h('span', _text)
                        }
                    },
                    {
                        title: '预约时间',
                        render: (h, params) => {
                            const _text = moment(params.row.appointmentStartTime).format('HH:mm') + '-' + moment(params.row.appointmentEndTime).format('HH:mm')
                            return h('span', _text)
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
                        title: '状态',
                        render: (h, params) => {
                          const color = params.row.status === 1 ? 'blue' : 'red';
                          const text = params.row.status === 1 ? '已到院' : '未到院';
                          return h('span', {
                              style: {
                                  color: color
                              }
                          },text)
                        }
                    },
                    {
                        title: '预约医院',
                        key: 'hospitalName'
                    },
                    {
                        title: '医生',
                        key: 'userName'
                    },
                    {
                        title: '项目',
                        key: 'chargeName'
                    },
                    {
                        title: '登记时间',
                        key: 'createTime'
                    },
                    {
                        title: '登记医院',
                        key: 'createUserHospitalName'
                    },
                    {
                        title: '登记用户',
                        key: 'createUserName'
                    },
                    {
                        title: '备注',
                        key: 'remark'
                    }
                ],
                data: [],
            }
        },
        computed: {
            hospList () {
                return this.$store.getters.getSelectAllHospList
            },
            pageSize () {
                return this.$store.getters.getPageSize
            },
            exportPrefixURL () {
                return this.$store.getters.getExportPrefixURL + '/guard-webManager/excelExport/treatDetail.jhtml'
            }
        },
        created () {
            this.getList(1, this.formSearch)
        },
        mounted () {
            this.$store.dispatch('setSelectAllHospList', {});
        },
        methods: {
            getList(pageNumber, form) {
                let _vm = this
                _vm.$store.dispatch('setPageLoading', -1);
                form['pageNumber'] = pageNumber
                form['pageSize'] = _vm.pageSize
                _vm.$http.get({
                    url: 'guard-webManager/report/treatDetail.jhtml',
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
            //获取弹窗用户
            setUser (data) {
                this.userName = data.name
                this.formSearch.userId = data.id
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
                    this.getList(1, this.formSearch);
                    this.userName = ''
                }
            },
            exportTable () {
                this.$refs.formSubmit.submit()
            }
        }
    }
</script>
