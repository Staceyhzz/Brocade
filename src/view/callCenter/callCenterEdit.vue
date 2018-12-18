/**
 * 修改总机模式
 */

<template>
	<div class="container-box call-pattern">
		<div class="container-header">
            <h2>总机管理</h2>
        </div>
        <div class="container-body">
            <h3 class="call-tit">修改总机模式</h3>
            <Form ref="formAdd" :model="formAdd" :rules="ruleForm" :label-width="1">
                <Row>
                    <Col :md="{ span: 20, offset: 2 }" :lg="{ span: 16, offset: 4 }" :sm="{ span: 24, offset: 0 }">
                        <p class="mes">1.老顾客来电时，电话转接给该顾客的<span>（注：咨询或开发需要配置好座机）</span></p>
                        <Form-item prop="detailListStr1">
                            <RadioGroup v-model="formAdd.type" @on-change='changeType'>
                                <Radio :label="1">开发人员</Radio>
                                <Radio :label="2">咨询人员</Radio>
                                <Radio :label="3">指定其他人员</Radio>
                            </RadioGroup>
                            <Table stripe :columns="oldCol" :data="oldData" class='old-user' v-show='key'></Table>
                            <Button type="primary" @click='add(1)' v-show='key'>添加</Button>
                        </Form-item>
                        <p class="mes">2.设置新顾客来电接听人员<span>（注：电话按下列顺序转拨）</span></p>
                        <Form-item prop="detailListStr2">
                            <Table stripe :columns="newCol" :data="newData" class='old-user' :disabled-hover='true'></Table>
                            <Button type="primary" @click='add(2)'>添加</Button>
                        </Form-item>
                    </Col>
                </Row>
            </Form>
            <div class="footer-btn">
                <ButtonGroup size="large">
                    <Button @click='back' style='width:116px'>取消</Button>
                    <Button type="primary" style='width:116px' :loading='saveLoad' @click='save'>保存</Button>
                </ButtonGroup>
            </div>
		</div>
        <cmptChooseUserCheckBox _placeHolder='选择接听人员' :_hospId='formAdd.hospitalID' :_modal='modal' @ok='setUser'></cmptChooseUserCheckBox>
	</div>
</template>

<script>
    import cmptChooseUserCheckBox from 'components/chooseUserCheckBox.vue'
    export default {
        components: {cmptChooseUserCheckBox},
        data () {
            const validateOld = (rule, value, callback) => {
                if(this.formAdd.type === 3) {
                    if(this.oldData.length === 0) {
                        callback(new Error('设置老顾客来电接听人员'))
                    } else {
                        console.log(3333333333)
                        let _bool = true
                        this.oldData.map(item => {
                            console.log(item.phone.length)
                            if((/[^\d]/g).test(item.phone) || item.phone.length === 0 || item.phone.length > 12) {
                                _bool = false
                            }
                        })
                        if(_bool) {
                            callback()
                        } else {
                            callback(new Error('请输入正确格式号码'))
                        }
                    }
                } else {
                    callback()
                }
            }
            const validateNew = (rule, value, callback) => {
                console.log(this.newData.length)
                if(this.newData.length === 0) {
                    console.log(1231231)
                    callback(new Error('设置新顾客来电接听人员'))
                } else {
                    console.log(3333333333)
                    let _bool = true
                    this.newData.map(item => {
                        if((/[^\d]/g).test(item.phone) || item.phone.length === 0 || item.phone.length > 12) {
                            _bool = false
                        }
                    })
                    if(_bool) {
                        callback()
                    } else {
                        callback(new Error('请输入正确格式号码'))
                    }
                }
            }
            return {
                modal: false,
                key: false,
                saveLoad: false,
                userKey: null,
                formAdd: {
                    switchNumber: '',
                    hospitalID: '',
                    type: 1,
                    detailListStr1: '',
                    detailListStr2: '',
                },
                oldData: [],
                newData: [],
                oldCol: [
                    {   
                        title: '顺序',
                        type: 'index',
                        width: 60
                    },
                    {
                        title: '姓名',
                        key: 'userName'
                    },
                    {
                        title: '性别',
                        width: 60,
                        render: (h, params) => {
                            const _text = params.row.gender === 1 ? '男' : '女'
                            return h('span', _text)
                        }
                    },
                    {
                        title: '部门',
                        key: 'deptName'
                    },
                    {
                        title: '电话',
                        width: 110,
                        render: (h, params) => {
                            let _val = '',
                                _bool = false
                            return h('Input', {
                                props: {
                                    size: 'small',
                                    value: params.row.phone
                                },
                                on: {
                                    input: (val) => {
                                        console.log(val)
                                        _val = val
                                    },
                                    'on-change': () => {
                                        _bool = true
                                    },
                                    'on-blur': () => {
                                        if(_bool) {
                                            this.oldData[params.index].phone = _val
                                            this.oldData.splice(params.index, 1, this.oldData[params.index])
                                            this.$refs.formAdd.validateField('detailListStr1')
                                        }
                                    }
                                }
                            })
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 120,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                    h('Button', {
                                        props: {
                                            type: 'primary',
                                            size: 'small',
                                            icon: 'arrow-up-c'
                                        },
                                        style: {
                                            marginRight: '2px'
                                        },
                                        on: {
                                            click: () => {
                                                this.up(1, params.index)
                                            }
                                        }
                                    }),
                                    h('Button', {
                                        props: {
                                            type: 'warning',
                                            size: 'small',
                                            icon: 'arrow-down-c'
                                        },
                                        style: {
                                            marginRight: '2px'
                                        },
                                        on: {
                                            click: () => {
                                                this.down(1, params.index)
                                            }
                                        }
                                    }),
                                    h('Button', {
                                        props: {
                                            type: 'error',
                                            size: 'small',
                                            icon: 'ios-trash-outline'
                                        },
                                        on: {
                                            click: () => {
                                                this.remove(1, params.index)
                                            }
                                        }
                                    }, '删除'),
                                ])
                        }
                    }
                ],
                newCol: [
                    {   
                        title: '顺序',
                        type: 'index',
                        width: 60
                    },
                    {
                        title: '姓名',
                        key: 'userName'
                    },
                    {
                        title: '性别',
                        width: 60,
                        render: (h, params) => {
                            const _text = params.row.gender === 1 ? '男' : '女'
                            return h('span', _text)
                        }
                    },
                    {
                        title: '部门',
                        key: 'deptName'
                    },
                    {
                        title: '电话',
                        width: 110,
                        render: (h, params) => {
                            let _val = '',
                                _bool = false
                            return h('Input', {
                                props: {
                                    size: 'small',
                                    value: params.row.phone
                                },
                                on: {
                                    input: (val) => {
                                        console.log(val)
                                        _val = val
                                    },
                                    'on-change': () => {
                                        _bool = true
                                    },
                                    'on-blur': () => {
                                        if(_bool) {
                                            this.newData[params.index].phone = _val
                                            this.newData.splice(params.index, 1, this.newData[params.index])
                                            this.$refs.formAdd.validateField('detailListStr2')
                                        }
                                    }
                                }
                            })
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 120,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                    h('Button', {
                                        props: {
                                            type: 'primary',
                                            size: 'small',
                                            icon: 'arrow-up-c'
                                        },
                                        style: {
                                            marginRight: '2px'
                                        },
                                        on: {
                                            click: () => {
                                                this.up(2, params.index)
                                            }
                                        }
                                    }),
                                    h('Button', {
                                        props: {
                                            type: 'warning',
                                            size: 'small',
                                            icon: 'arrow-down-c'
                                        },
                                        style: {
                                            marginRight: '2px'
                                        },
                                        on: {
                                            click: () => {
                                                this.down(2, params.index)
                                            }
                                        }
                                    }),
                                    h('Button', {
                                        props: {
                                            type: 'error',
                                            size: 'small',
                                            icon: 'ios-trash-outline'
                                        },
                                        on: {
                                            click: () => {
                                                this.remove(2, params.index)
                                            }
                                        }
                                    }, '删除'),
                                ])
                        }
                    }
                ],
                ruleForm: {
                    detailListStr2: [
                        { validator: validateNew, trigger: 'change' }
                    ],
                    detailListStr1: [
                        { validator: validateOld, trigger: 'change' }
                    ]
                }
            }
        },
        computed: {
            saveOld () {
                const _data = this.oldData.map((item, index) => {
                    return {
                        userId: item.userID,
                        phone: item.phone,
                        sorted: index + 1
                    }
                })
                return JSON.stringify(_data)
            },
            saveNew () {
                const _data = this.newData.map((item, index) => {
                    return {
                        userId: item.userID,
                        phone: item.phone,
                        sorted: index + 1
                    }
                })
                return JSON.stringify(_data)
            },
        },
        created () {
            this.formAdd.hospitalID = JSON.parse(sessionStorage.getItem('query34')).id * 1
            this.getList()
        },
        methods: {
            getList () {
                let _vm = this
                _vm.$store.dispatch('setPageLoading', -1)
                _vm.$http.get({
                    url: 'guard-webManager/callCenter/getCallSetting.jhtml',
                    data: {
                        hospitalID: _vm.formAdd.hospitalID,
                        companyCode: localStorage.getItem('companyId')
                    },
                    success: function(res){
                        if(res.data.code === 0){
                            _vm.newData = res.data.content.newList.sort((x, y) => x.sorted - y.sorted)
                            _vm.oldData = res.data.content.oldList.sort((x, y) => x.sorted - y.sorted)
                            _vm.formAdd = {
                                switchNumber: res.data.content.cloudCallNumber || '',
                                hospitalID: _vm.formAdd.hospitalID,
                                type: res.data.content.type * 1 || 1,
                                detailListStr1: _vm.saveOld,
                                detailListStr2: _vm.saveNew
                            }
                            if(_vm.formAdd.type === 3) {
                                _vm.key = true
                            }
                            _vm.$store.dispatch('setPageLoading', 1)
                        } else {
                            _vm.$store.dispatch('setPageLoading', 1)
                            console.log(res.data.desc)
                        }
                    },
                    error: function(res){
                        console.log(res)
                    }
                })
            },
            changeType (val) {
                if(val === 3) {
                    this.key = true
                } else {
                    this.key = false
                }
            },
            add (val) {
                this.userKey = val
                this.modal = !this.modal;
            },
            setUser (data) {
                let _prop = ''
                if(this.userKey === 1) {
                    _prop = 'oldData'
                } else {
                    _prop = 'newData'
                }
                data.map(item => {
                    console.log(this[_prop])
                    const _index = this[_prop].findIndex(user => user.userID === item.id)
                    if(_index < 0) {
                        item.phone = ''
                        item.userID = item.id
                        item.userName = item.name
                        item.gender = item.gender === '男' ? 1 : 0
                        this[_prop].push(item)
                    }
                })
            },
            remove (type, index) {
                let _prop = ''
                if(type === 1) {
                    _prop = 'oldData'
                } else {
                    _prop = 'newData'
                }
                this[_prop].splice(index, 1)
            },
            up (type, index) {
                let _prop = ''
                if(type === 1) {
                    _prop = 'oldData'
                } else {
                    _prop = 'newData'
                }
                if(index) {
                    const up = this[_prop][index - 1]
                    const now = this[_prop][index]
                    this[_prop].splice(index - 1, 1, now)
                    this[_prop].splice(index, 1, up)
                }
            },
            down (type, index) {
                let _prop = ''
                if(type === 1) {
                    _prop = 'oldData'
                } else {
                    _prop = 'newData'
                }
                if(index < this[_prop].length - 1) {
                    const now = this[_prop][index]
                    const down = this[_prop][index + 1]
                    this[_prop].splice(index + 1, 1, now)
                    this[_prop].splice(index, 1, down)
                }
            },
            back () {
                this.$router.go(-1)
            },
            save () {
                let _vm = this
                _vm.$refs['formAdd'].validate((valid) => { 
                    console.log(valid)
                    if (valid) {
                        _vm.formAdd.detailListStr1 = _vm.saveOld
                        _vm.formAdd.detailListStr2 = _vm.saveNew
                        _vm.saveLoad = true
                        _vm.$http.post({
                            url: 'guard-webManager/callCenter/updateCallSetting.jhtml',
                            data: _vm.formAdd,
                            success: function(res){
                                if(res.data.code === 0) {
                                    _vm.$Notice.success({
                                        title: '系统提示！',
                                        desc: '操作成功！'
                                    })
                                    _vm.$router.push('/callCenter')
                                } else {
                                    _vm.saveLoad = false
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
                    }
                })
            },
        }
    }
</script>

<style scoped>
    .call-pattern .call-tit {
        margin: 10px 0 20px;
        font-size: 16px;
        font-weight: normal;
        line-height: 22px;
        color: #181818;
    }
    .call-pattern .step {
        margin: 0 12.5% 30px;
    }
    .call-pattern .mes {
        margin-bottom: 10px;
        font-size: 16px;
        line-height: 22px;
        color: #181818;
    }
    .call-pattern .mes span {
        opacity: 0.5;
    }
    .call-pattern .footer-btn {
        padding: 20px 0;
        text-align: center;
    }
    .call-pattern .old-user {
        margin: 10px 0;
    }
</style>