/**
 * 呼叫中心流程
 */

<template>
	<div class="container-box call-center">
		<div class="container-header">
            <div class="steps">
    			<Steps :current="1">
                    <Step title="设置总机号码"></Step>
                    <Step title="设置分机号码"></Step>
                    <Step title="设置接听模式"></Step>
                    <Step title="完成"></Step>
                </Steps>
            </div>
        </div>
        <div class="container-body">
            <h3 class="oreder-tit">设置分机号码</h3>
            <Form  :label-width="60" inline ref="formSearch" :model="formSearch">
                <Form-item label="账号" prop='account'>
                    <Input v-model.trim="formSearch.account" @on-enter="getList(1, 10, formSearch)" placeholder="请输入账号" :maxlength='20'></Input>
                </Form-item>
                <Form-item label="姓名" prop='name'>
                    <Input v-model.trim="formSearch.name" @on-enter="getList(1, 10, formSearch)" placeholder="请输入姓名" :maxlength='20'></Input>
                </Form-item>
                <Form-item label="所属医院" prop="hospitalId" v-if='key'>
                    <Select v-model="formSearch.hospitalId" clearable style="width:200px">
                        <Option v-for="item in hospList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </Form-item>
                <Form-item label="部门" prop='deptId' v-else>
                    <Select v-model="formSearch.deptId" clearable style="width:162px">
                        <Option v-for="item in deptList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </Form-item>
                <Form-item label="角色" prop='roleId'>
                    <Select v-model="formSearch.roleId" clearable style="width:162px">
                        <Option v-for="item in roleList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </Form-item>
                <Form-item label="状态" prop='status'>
                    <Select v-model="formSearch.status" clearable style="width:162px">
                        <Option value="1">启用</Option>
                        <Option value="0">禁用</Option>
                    </Select>
                </Form-item>
                <ul class="header-btn-group not-float">
                    <li class="header-item"  @click="getList(1, 10, formSearch)"><Icon type="search"></Icon>查询</li>
                    <li class="header-item" @click="handleReset('formSearch')"><Icon type="refresh"></Icon>重置</li>
                </ul>
            </Form>
            <p>请给员工添加分机号码吧，员工才能正常拨打和接听电话哦~</p>
            <Table stripe :columns="columns" :data="data"></Table>
            <div class="table-page">
                <div class="table-info">当前第{{pageNumber}}页，共{{totalPages}}页，总共{{total}}条记录</div>
                <Page class="table-paginate" :total="total" @on-change='changePage' :current='pageNumber'></Page>
            </div>
            <div class="footer-btn">
                <Button type="primary" @click='next' size='large'>前往下一步</Button>
            </div>
		</div>
        <Modal
            title="添加分机/直线号码"
            v-model="modal"
            :closable="false"
            @on-ok="ok"
            :loading="loading"
            class-name="vertical-center-modal">
            <p>外线用户可通过拨打企业总机转分机或拨打直线号码的方式联系到企业内部用户。</p>
            <Form ref="formAdd" :model="formAdd" :rules="ruleForm" :label-width="100" label-position="right">
                <Form-item label="账号">
                    <span>{{formAdd.account}}</span>
                </Form-item>
                <Form-item label="绑定电话号码" prop="phone" required>
                    <Input v-model.trim="formAdd.phone" placeholder="请输入绑定电话号码" :maxlength='20'></Input>
                </Form-item>
                <!-- <Form-item label="显示名称" prop="displayName">
                    <Input v-model.trim="formAdd.displayName" placeholder="请输入显示名称" :maxlength='20'></Input>
                </Form-item> -->
                <Form-item label="直线号码" prop="directNumber">
                    <Input v-model.trim="formAdd.directNumber" placeholder="请输入直线号码" :maxlength='20'></Input>
                </Form-item>
                <Form-item label="呼叫时间限制(分钟)" prop="callTime">
                    <Input v-model.trim="formAdd.callTime" placeholder="请输入呼叫时间限制" :maxlength='20'></Input>
                </Form-item>
                <!-- <Form-item label="无应答转接到手机号码时间" prop="d">
                    <RadioGroup v-model="formAdd.d" vertical>
                        <Radio :label="1">立即转到手机</Radio>
                        <Radio :label="2">30秒</Radio>
                        <Radio :label="3">1分钟</Radio>
                        <Radio :label="4">2分钟</Radio>
                    </RadioGroup>
                    <span style='color:red'>需先配置好员工手机号码</span>
                </Form-item> -->
            </Form>
        </Modal>
	</div>
</template>

<script>
    export default {
        data () {
            const validatePhone = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入绑定电话号码'))
                } else if(/^\d{10,}$/.test(value)) {
                    callback() 
                } else {
                    callback(new Error('请输入正确格式，号码长度至少10位'))
                }
            }
            const validateNum = (rule, value, callback) => {
                if(value) {
                    if(/^\d{10,}$/.test(value)) {
                        callback() 
                    } else {
                        callback(new Error('请输入正确格式，号码长度至少10位，可不填'))
                    }
                } else {
                    callback() 
                }
            }
            const validateTime = (rule, value, callback) => {
                if (value === '') {
                    callback() 
                } else if(/^\d{1,}$/.test(value)) {
                    if(value * 1 < 43200 && value * 1 > 0) {
                        callback() 
                    } else {
                        callback(new Error('最大值限制时间为一个月'))
                    }
                } else {
                    callback(new Error('请输入正确格式，可不填'))
                }
            }
            return {
                modal: false,
                loading: true,
                saveLoad: false,
                pageNumber: 1,
                totalPages: 1,
                total: 0,
                key: true,
                formSearch: {
                    account: '',
                    name: '',
                    deptId: '',
                    roleId: '',
                    status: '',
                    hospitalId: localStorage.getItem('hospId') * 1,
                },
                formAdd: {
                    workNumber: '',
                    phone: '',
                    displayName: '',
                    directNumber: '',
                    callTime: '',
                    account: '',
                },
                columns: [
                    {   
                        title: '序号',
                        width: 70,
                        render: (h, params) => {
                            const _index = (this.pageNumber - 1) * 10
                            return h('span', params.index + 1 + _index)
                        }
                    },
                    {
                        title: '编号',
                        key: 'id'
                    },
                    {
                        title: '账号',
                        key: 'account'
                    },
                    {
                        title: '姓名',
                        key: 'name'
                    },
                    {
                        title: '性别',
                        width: 70,
                        key: 'gender',
                        render: (h, params) => {
                            const text = params.row.gender === 1 ? '男' : '女';
                            return h('span',text)
                        }
                    },
                    {
                        title: '部门',
                        key: 'deptName'
                    },
                    {
                        title: '状态',
                        width: 70,
                        render: (h, params) => {
                            const color = params.row.status === 1 ? 'blue' : 'red';
                            const text = params.row.status === 1 ? '启用' : '禁用';
                            return h('span', {
                                style: {
                                    color: color
                                }
                            },text)
                        }
                    },
                    {
                        title: '角色',
                        key: 'roleName'
                    },
                    {
                        title: '电话',
                        key: 'phone'
                    },
                    {
                        title: '手机',
                        key: 'mobile'
                    },
                    {
                        title: '分机号',
                        key: 'exNumber'
                    },
                    // {
                    //     title: '无应答转接到手机时间',
                    // },
                    {
                        title: '操作',
                        key: 'action',
                        width: 130,
                        align: 'center',
                        render: (h, params) => {
                            const _display = params.row.exNumber ? 'inline-block' : 'none'
                            const _display1 = params.row.exNumber ? 'none' : 'inline-block'
                            return h('div', [
                                    h('Button', {
                                        props: {
                                            type: 'primary',
                                            size: 'small',
                                            icon: 'wrench'
                                        },
                                        style: {
                                            marginRight: '3px',
                                            display: _display1
                                        },
                                        on: {
                                            click: () => {
                                                this.add(params.row)
                                            }
                                        }
                                    }, '配置'),
                                    h('Button', {
                                        props: {
                                            type: 'info',
                                            size: 'small',
                                            icon: 'edit'
                                        },
                                        style: {
                                            marginRight: '3px',
                                            display: _display
                                        },
                                        on: {
                                            click: () => {
                                                this.edit(params.row)
                                            }
                                        }
                                    }, '编辑'),
                                    h('Button', {
                                        props: {
                                            type: 'error',
                                            size: 'small',
                                            icon: 'ios-trash-outline'
                                        },
                                        style: {
                                            display: _display
                                        },
                                        on: {
                                            click: () => {
                                                this.remove(params.row)
                                            }
                                        }
                                    }, '删除'),
                                ])
                        }
                    }
                ],
                data: [],
                roleList: [],
                ruleForm: {
                    phone: [
                        { validator: validatePhone, trigger: 'blur' }
                    ],
                    directNumber: [
                        { validator: validateNum, trigger: 'blur' }
                    ],
                    callTime: [
                        { validator: validateTime, trigger: 'blur' }
                    ],
                }
            }
        },
        computed: {
            hospList () {
                return this.$store.getters.getSelectAllHospList
            },
            deptList () {
                return this.$store.getters.getSelectDeptList
            },
        },
        created () {
            if(localStorage.getItem('hospId') === '1') {
                this.key = true
                this.$store.dispatch('setSelectAllHospList')
            } else {
                this.key = false
                this.$store.dispatch('setSelectDeptList', localStorage.getItem('hospId'))
            }
            this.getList(1, 10, this.formSearch)
        },
        mounted () {
            this.getRole()
        },
        methods: {
            getList(pageNumber, pageSize, form) {
                let _vm = this
                form.pageNumber = pageNumber
                form.pageSize = pageSize
                _vm.$store.dispatch('setPageLoading', -1)
                 _vm.$http.get({
                    url: 'guard-webManager/callCenter/page.jhtml',
                    data: form,
                    success: function(res){
                        if(res.data.code == 0) {
                            console.log(res.data.content)
                            _vm.total = res.data.content.total || 0
                            _vm.pageNumber = res.data.content.pageNumber || 1
                            _vm.totalPages = res.data.content.totalPages || 1
                            _vm.data = res.data.content.content || []
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
            getRole () {
                let _vm = this
                _vm.$http.get({
                    url: 'guard-webManager/select/roleInfo.jhtml',
                    success: function(res){
                        if(res.data.code == 0) {
                            _vm.roleList = res.data.content || []
                        } else {
                            console.log(res.data.desc)
                        }
                    },
                    error: function(res){
                        console.log(res)
                    }
                })
            },
            changePage (num) {
                this.getList(num, 10, this.formSearch)
            },
            handleReset (name) {
                this.$refs[name].resetFields()
                this.getList(1, 10, this.formSearch)
            },
            add (data) {
                this.$refs['formAdd'].resetFields()
                this.formAdd.account = data.account
                this.formAdd.workNumber = data.id
                this.formAdd.displayName = data.name
                this.modal = true
                this.key = true
            },
            edit (data) {
                this.$refs['formAdd'].resetFields()
                this.formAdd.account = data.account
                this.formAdd.workNumber = data.id
                this.formAdd.displayName = data.name
                this.formAdd.phone = data.bindPhone
                this.formAdd.directNumber = data.directNumber
                this.formAdd.callTime = data.callTime
                this.modal = true
                this.key = false
            },
            ok () {
                let _vm = this,
                    _url = ''
                _vm.$refs['formAdd'].validate((valid) => {
                    if (valid) {
                        if(_vm.key) {
                            _url = 'guard-webManager/callCenter/addUser.jhtml'
                        } else {
                            _url = 'guard-webManager/callCenter/updateUser.jhtml'
                        }
                        _vm.$http.post({
                            url: _url,
                            data: _vm.formAdd,
                            success: function(res){
                                if(res.data.code == 0 ){
                                    _vm.getList(1, 10, _vm.formSearch)
                                    _vm.$refs['formAdd'].resetFields()
                                    _vm.modal = false
                                    _vm.$Notice.success({
                                        title: '系统提示！',
                                        desc: '保存成功！'
                                    })
                                } else {
                                    _vm.$Notice.error({
                                        title: '系统提示！',
                                        desc: res.data.desc
                                    })
                                    _vm.loading = false
                                    _vm.$nextTick(() => {
                                        _vm.loading = true
                                    })
                                }
                            },
                            error: function(res){
                                console.log(res)
                            }
                        })
                    } else {
                        _vm.loading = false
                        _vm.$nextTick(() => {
                            _vm.loading = true
                        })
                    }
                })
            },
            remove (data) {
                let _vm = this
                _vm.$Modal.confirm({
                    title: '系统提示',
                    content: `<p>确定解除配置？</p>
                            <p>用户信息：</p>
                            <p>账号：${data.account}</p>`,
                    onOk: () => {
                        _vm.$http.post({
                            url: 'guard-webManager/callCenter/deleteUser.jhtml',
                            data: {
                                workNumber: data.id,
                                phone: data.bindPhone
                            },
                            success: function(res){
                                if(res.data.code == 0 ){
                                    _vm.getList(1, 10, _vm.formSearch)
                                    _vm.$Notice.success({
                                        title: '系统提示！',
                                        desc: '解除成功！'
                                    })
                                } else {
                                    _vm.$Notice.error({
                                        title: '系统提示！',
                                        desc: res.data.desc
                                    })
                                }
                            },
                            error: function(res){
                                console.log(res)
                            }
                        })
                    },
                })
            },
            next () {
                let breadData = [
                    {
                        url: '/desktop',
                        text: '桌面'
                    },
                    {
                        url: '/callCenter',
                        text: '呼叫中心'
                    },
                    {
                        url: '/callPattern',
                        text: '设置接听模式'
                    },
                ]
                this.$store.dispatch('setBreadData', breadData)
                this.$router.push('/callPattern')
            },
        }
    }
</script>

<style scoped>
    .call-center .steps {
        padding: 10px 0;
    }
    .call-center .footer-btn {
        padding: 20px 0;
        text-align: center;
    }
</style>