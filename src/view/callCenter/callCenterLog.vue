/**
 * 通话记录
 */

<template>
    <div class="container-box">
        <div class="container-header">
            <h2>通话记录</h2>
        </div>
        <div class="container-body call-center-log">
            <Form :label-width="80" :model="formSearch" ref='formSearch' label-position="right">
                <Row>
                    <Col :sm='12' :md="8" :lg="6">
                        <Form-item label="医院" prop='hospitalID' v-show='key'>
                            <Select v-model="formSearch.hospitalID" clearable>
                                <Option v-for="item in hospList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                            </Select>
                        </Form-item>
                    </Col>
                    <Col :sm='12' :md="8" :lg="6">
                        <Form-item label="总机号码" prop='cloudCallNumber'>
                            <Input v-model.trim="formSearch.cloudCallNumber" placeholder="请输入总机号码" @on-enter="getList(1, 10, formSearch)" :maxlength='20'></Input>
                        </Form-item>
                    </Col>
                    <Col :sm='12' :md="8" :lg="6">
                        <Form-item label="通话日期" prop='startTime'>
                            <Date-picker :transfer='true' type="daterange" placement="bottom" placeholder="选择日期" :options='options' @on-change='setTime' ref='cleanDate' style='width:100%' :value='timeBox' :clearable='false'></Date-picker>
                        </Form-item>
                    </Col>
                    <Col :sm='12' :md="8" :lg="6">
                        <Form-item label="主叫姓名" prop='callerName'>
                            <Input v-model.trim="formSearch.callerName" placeholder="请输入主叫姓名" @on-enter="getList(1, 10, formSearch)" :maxlength='20'></Input>
                        </Form-item>
                    </Col>
                    <Col :sm='12' :md="8" :lg="6">
                        <Form-item label="被叫姓名" prop='calledName'>
                            <Input v-model.trim="formSearch.calledName" placeholder="请输入被叫姓名" @on-enter="getList(1, 10, formSearch)" :maxlength='20'></Input>
                        </Form-item>
                    </Col>
                    <Col :sm='12' :md="8" :lg="6">
                        <ul class="header-btn-group not-float">
                            <li class="header-item" @click="getList(1, 10, formSearch)"><Icon type="search"></Icon>查询</li>
                            <li class="header-item" @click="handleReset('formSearch')"><Icon type="refresh"></Icon>重置</li>
                        </ul>
                    </Col>
                </Row>
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
        name: 'view_callCenterLog',
        data () {
            return {
                key: true,
                total: 0,
                totalPages: 0,
                pageNumber: 1,
                formSearch: {
                    hospitalID: localStorage.getItem('hospId') * 1,
                    startTime: moment().startOf('isoWeek').format('YYYY-MM-DD'),
                    endTime: moment().format('YYYY-MM-DD'),
                    cloudCallNumber: '',
                    callerName: '',
                    calledName: ''
                },
                timeBox: [moment().startOf('isoWeek').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')],
                options: {
                    disabledDate (date) {
                        return date && date.valueOf() > Date.now()
                    }
                },
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
                        title: '医院名称',
                        key: 'hospitalName'
                    },
                    {
                        title: '通话建立时间',
                        key: 'establishTime'
                    },
                    {
                        title: '话单ID',
                        key: 'callID'
                    },
                    {
                        title: '总机号码',
                        key: 'cloudCallNumber'
                    },
                    {
                        title: '主叫',
                        key: 'callerName'
                    },
                    {
                        title: '被叫',
                        key: 'calledName'
                    },
                    {
                        title: '新老客',
                        render: (h, params) => {
                            const _text = params.row.customerType === 1 ? '老客' : '新客'
                            const _color = params.row.customerType === 1 ? 'blue' : 'red'
                            return h('span', {
                                style: {
                                    color: _color
                                }
                            }, _text)
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 80,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                    h('Button', {
                                        props: {
                                            type: 'primary',
                                            size: 'small',
                                            icon: 'ios-eye'
                                        },
                                        on: {
                                            click: () => {
                                                this.toRecord(params.row.id)
                                            }
                                        }
                                    }, '查看'),
                                ])
                        }
                    }
                ],
                data: []
            }
        },
        computed: {
            hospList () {
                return this.$store.getters.getSelectAllHospList
            },
        },
        activated () {
            console.log(111111111)
            if(localStorage.getItem('hospId') === '1') {
                this.key = true
            } else {
                this.key = false
            }
            this.getList(this.pageNumber, 10, this.formSearch)
            this.$store.dispatch('setSelectAllHospList')
        },
        methods: {
            getList (pageNumber, pageSize, form) {
                let _vm = this
                form.pageNumber = pageNumber
                form.pageSize = pageSize
                _vm.$store.dispatch('setPageLoading', -1)
                _vm.$http.get({
                    url: 'guard-webManager/callCenter/getCallRecordList.jhtml',
                    data: form,
                    success: function(res){
                        if(res.data.code === 0 ){
                            _vm.data = res.data.content.content || []
                            _vm.pageNumber = res.data.content.pageNumber || 1
                            _vm.total = res.data.content.total || 0
                            _vm.totalPages = res.data.content.totalPages || 1
                            _vm.$store.dispatch('setPageLoading', 1)
                        } else {
                            console.log(res.data.desc)
                        }
                    },
                    error: function(res){
                        console.log(res)
                    }
                })
            },
            setTime (date) {
                this.formSearch.startTime = date[0]
                this.formSearch.endTime = date[1]
            },
            changePage (num) {
                this.getList(num, 10, this.formSearch)
            },
            handleReset (name) {
                this.$refs[name].resetFields()
                this.formSearch.startTime = moment().startOf('isoWeek').format('YYYY-MM-DD')
                this.formSearch.endTime = moment().format('YYYY-MM-DD')
                this.timeBox = [moment().startOf('isoWeek').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')]
                this.getList(1, 10, this.formSearch)
            },
            //跳转分院 
            toRecord (id) {
                let breadData = [
                    {
                        url: '/desktop',
                        text: '桌面'
                    },
                    {
                        url: '/callCenterLog',
                        text: '通话记录'
                    },
                    {
                        url: '/callCenterRecord',
                        text: '通话详情'
                    }
                ]
                this.$store.dispatch('setBreadData', breadData)
                this.$router.push({
                    path: '/callCenterRecord',
                    query: {
                        id: id
                    }
                })
            },
        }
    }
</script>
<style scoped>
    .call-center-log .header-btn-group {
        padding-left: 35px;
    }
</style>