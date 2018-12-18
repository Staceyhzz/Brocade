<!-- hospitalBackOrderDetail -->
<!-- 医院退项目单明细 -->
/**
 * 医院退项目单明细
 */

<template>
    <div class="container-box" ref="containerBox">
        <div class="container-header">
            <h2>医院退项目单明细</h2>
            <ul class="header-btn-group">
                <li class="header-item" @click="exportTable" v-if="exportKey === '1'"><Icon type="ios-download-outline"></Icon>导出</li>
            </ul>
        </div>
        <div class="container-body">
            <form :action="exportPrefixURL" method="get" ref="formSubmit" v-show="show">
                <input name="startTime" :value="formSearch.startTime">
                <input name="endTime" :value="formSearch.endTime">
                <input name="createUserId" :value="formSearch.createUserId">
                <input name="customerId" :value="formSearch.customerId">
                <input name="adminToken" :value="adminToken">
            </form>
            <Form :label-width="60" inline :model="formSearch" ref='formSearch'>
                <Form-item label="提交日期" prop='startTime'>
                    <Date-picker :transfer='true' type="daterange" placement="bottom-start" placeholder="选择日期" :clearable="false" style="width: 180px" @on-change='setDate' :value='dateBox'></Date-picker>
                </Form-item>
                <Form-item label="提交用户" prop='createUserId'>
                    <cmptHospChooseUser _placeHolder="选择用户" :_style="{width:'162px'}" :_userName="showChildUser" v-on:setUserName="setCreateUser"></cmptHospChooseUser>
                </Form-item>
                <Form-item label="客户编号" prop='customerId'>
                    <Input type="text" :maxlength='15' v-model.trim="formSearch.customerId" placeholder="请输入客户编号" @on-enter="getList(1, formSearch)"></Input>
                </Form-item>
                <ul class="header-btn-group not-float">
                    <li class="header-item" @click="getList(1, formSearch)"><Icon type="search"></Icon>查询</li>
                    <li class="header-item" @click="handleReset('formSearch')"><Icon type="refresh"></Icon>重置</li>
                </ul>
            </Form>
            <!-- <Alert>
                <div v-html='message'>{{message}}</div>
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
    export default {
        data () {
            return {
                show: false,
                adminToken: this.$token.readToken('adminToken') || '', exportKey: localStorage.getItem('exportKey'),
                total: 0,
                totalPages: 1,
                pageNumber: 1,
                showChildUser: '',
                formSearch: {
                    startTime: moment().format('YYYY-MM-DD'),
                    endTime: moment().format('YYYY-MM-DD'),
                    createUserId: '',
                    customerId: '',
                },
                dateBox: [moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')],
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
                        title: '日期',
                        key: 'createDate',
                        render: (h, params) => {
                            const _text = params.row.createTime.split(' ')[0]
                            return h('span', _text)
                        }
                    },
                    {
                        title: '时间',
                        key: 'createTime'
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
                        title: '提交医院',
                        key: 'hospitalName'
                    },
                    {
                        title: '提交用户',
                        key: 'createUserName'
                    },
                    {
                        title: '订单号',
                        key: 'id'
                    },
                    {
                        title: '退款金额',
                        key: 'amount',
                    },
                    {
                        title: '退积分',
                        key: 'point',
                    },
                    {
                        title: '审核状态',
                        key: 'auditStatus',
                        render: (h, params) => {
                            let _color 
                            let _text 
                            switch(params.row.auditStatus) {
                                case 1:
                                    _text = '待审核'
                                    _color = 'orange'
                                    break
                                case 3:
                                    _text = '审核不通过'
                                    _color = 'red'
                                    break
                                case 4:
                                    _text = '审核通过'
                                    _color = 'blue'
                                    break
                            }
                            return h('span', {
                                style: {
                                    color: _color
                                }
                            }, _text)
                        }
                    },
                    {
                        title: '支付状态',
                        key: 'paidStatus',
                        render: (h, params) => {
                            let _color 
                            let _text 
                            switch(params.row.paidStatus) {
                                case 1:
                                    _text = '未付款'
                                    _color = 'orange'
                                    break
                                case 2:
                                    _text = '已付款'
                                    _color = 'blue'
                                    break
                                case 3:
                                    _text = '欠款'
                                    _color = 'red'
                                    break
                            }
                            return h('span', {
                                style: {
                                    color: _color
                                }
                            }, _text)
                        }
                    },
                    {
                        title: '支付时间',
                        key: 'paidTime'
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
            pageSize () {
                return this.$store.getters.getPageSize
            },
            exportPrefixURL () {
                return this.$store.getters.getExportPrefixURL + '/guard-webManager/excelExport/hospitalBackOrderDetail.jhtml'
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
                _vm.$store.dispatch('setPageLoading', -1);
                form['pageNumber'] = pageNumber
                form['pageSize'] = _vm.pageSize
                _vm.$http.get({
                    url: 'guard-webManager/report/hospitalBackOrderDetail.jhtml',
                    data: form,
                    success: function(res){
                        if(res.data.code == 0) {
                        	// _vm.message = res.data.content.TotalText
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
            setCreateUser (data) {
                this.showChildUser = data.name
                this.formSearch.createUserId = data.id
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
                    this.showChildUser = ''
                }
            },
            exportTable () {
                this.$refs.formSubmit.submit()
            }
        }
    }
</script>
