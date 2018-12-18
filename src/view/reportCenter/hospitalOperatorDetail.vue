/**
 * 医院工作量明细
 */

<template>
    <div class="container-box" ref="containerBox">
        <div class="container-header">
            <h2>医院工作量明细</h2>
            <ul class="header-btn-group">
                <li class="header-item" @click="exportTable" v-if="exportKey === '1'"><Icon type="ios-download-outline"></Icon>导出</li>
            </ul>
        </div>
        <div class="container-body">
            <form :action="exportPrefixURL" method="get" ref="formSubmit" v-show="show">
                <input name="startTime" :value="formSearch.startTime">
                <input name="endTime" :value="formSearch.endTime">
                <input name="userId" :value="formSearch.userId">
                <input name="positionId" :value="formSearch.positionId">
                <input name="itemId" :value="formSearch.itemId">
                <input name="itemGroupId" :value="formSearch.itemGroupId">
                <input name="adminToken" :value="adminToken">
            </form>
            <Form :label-width="80" inline :model="formSearch" ref='formSearch'>
                <Form-item label="提交日期" prop='startTime'>
                    <Date-picker :transfer='true' type="daterange" placement="bottom-start" placeholder="选择日期" :clearable="false" style="width: 180px" @on-change='setDate' :value='dateBox'></Date-picker>
                </Form-item>
                <Form-item label="提交用户" prop='userId'>
                    <cmptDeptChooseUser _placeHolder="选择用户" :_style="{width:'162px'}" :_userName="userName" v-on:setUserName="setUser"></cmptDeptChooseUser>
                </Form-item>
                <Form-item label="岗位" prop='positionId'>
                    <Select v-model="formSearch.positionId" clearable style="width:200px">
                        <Option v-for="item in positionList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </Form-item>
                <Form-item label="意向分类" prop='itemGroupId'>
                    <Select v-model="formSearch.itemGroupId" clearable style="width:200px">
                        <Option v-for="item in itemGroupList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </Form-item>
                <Form-item label="消费意向" prop='itemId'>
                    <Select v-model="formSearch.itemId" clearable style="width:200px">
                        <Option v-for="item in itemList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
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
                userName: '',
                formSearch: {
                    startTime: moment().format('YYYY-MM-DD'),
                    endTime: moment().format('YYYY-MM-DD'),
                    userId: '',
                    positionId: '',
                    itemId: '',
                    itemGroupId: ''
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
                        title: '划扣日期',
                        render: (h, params) => {
                            const _text = moment(params.row.operationTime).format('YYYY-MM-DD')
                            return h('span', _text)
                        }
                    },
                    {
                        title: '划扣时间',
                        key: 'operationTime'
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
                        title: '执行医院',
                        key: 'hospitalName'
                    },
                    {
                        title: '执行用户',
                        key: 'userName'
                    },
                    {
                        title: '分工',
                        key: 'positionName'
                    },
                    {
                        title: '意向分类',
                        key: 'itemGroupName'
                    },
                    {
                        title: '消费意向',
                        key: 'itemName'
                    },
                    {
                        title: '项目编号',
                        key: 'chargeID'
                    },
                    {
                        title: '项目名称',
                        key: 'chargeName'
                    },
                    {
                        title: '单位',
                        key: 'chargeUnitName'
                    },
                    {
                        title: '数量',
                        key: 'num'
                    }
                ],
                data: [],
            }
        },
        computed: {
            positionList () {
                return this.$store.getters.getSelectAllPositionList
            },
            itemList () {
                return this.$store.getters.getSelectAllItemList
            },
            itemGroupList () {
                return this.$store.getters.getSelectAllItemGroupList
            },
            pageSize () {
                return this.$store.getters.getPageSize
            },
            exportPrefixURL () {
                return this.$store.getters.getExportPrefixURL + '/guard-webManager/excelExport/hospitalOperatorDetail.jhtml'
            }
        },
        created () {
            this.getList(1, this.formSearch)
        },
        mounted () {
            this.$store.dispatch('setSelectAllPositionList', {});
            this.$store.dispatch('setSelectAllItemList', {});
            this.$store.dispatch('setSelectAllItemGroupList', {});
        },
        methods: {
            getList(pageNumber, form) {
                let _vm = this
                _vm.$store.dispatch('setPageLoading', -1);
                form['pageNumber'] = pageNumber
                form['pageSize'] = _vm.pageSize
                _vm.$http.get({
                    url: 'guard-webManager/report/hospitalOperatorDetail.jhtml',
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
