/**
 * 批量设置
 */
<template>
    <div class="container-box" id='addBulk'>
        <div class="container-header">
            <h2>批量设置</h2>
        </div>
        <div class="container-body">
            <Form :label-width="100" ref="formValidate" :model="formValidate" label-position="right" :rules="ruleForm">
                <Form-item label="用户" prop="userList" required>
                    <Row>
                        <Col span="20">
                            <Table stripe :columns="col" :data="formValidate.userList"></Table>
                        </Col>
                        <Col span="3" offset="1" class='table-left-btn'>
                            <Button type="primary"  icon="plus-round" @click='add'>增加</Button>
                            <Button type="primary"  icon="refresh" @click='clean(1)'>清空</Button>
                        </Col>
                    </Row>
                </Form-item>
                <Form-item label="日期" required prop="detailListStr">
                    <Row>
                        <Col span="20">
                            <Table stripe :columns="col2" :data="data2"></Table>
                        </Col>
                        <Col span="3" offset="1" class='table-left-btn'>
                            <Button type="primary"  icon="refresh" @click='clean(2)'>清空</Button>
                        </Col>
                    </Row>
                </Form-item>
            </Form>
            <Form :label-width="100" ref="formAdd" :model="formAdd" label-position="right" :rules="ruleForm">
                <div class="addBulk">
                    <Form-item label="日期" prop='startTime'>
                        <Date-picker :transfer='true' type="daterange" placement="bottom-start" placeholder="选择日期" style="width: 300px" @on-change='setTime' :clearable='false' :value='timeBox' ref='cleanDate'></Date-picker>
                    </Form-item>
                    <Form-item label="类型" prop="categoryId" required>
                        <Select v-model="formAdd.categoryId" style='width:300px'>
                            <Option v-for="item in categoryList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                        </Select>
                    </Form-item>
                </div>
                <Button type="primary"  icon="plus-round" @click='addTime'>增加</Button>
            </Form>
            <div class="footer-btnGroup">
                <Button type="primary"  icon="checkmark" @click='save' :loading='saveLoad'>保存</Button>
                <Button type="primary"  icon="android-arrow-back" @click='back'>返回</Button>
            </div>
        </div>
        <Modal
            title="选择用户"
            v-model="modal"
            width='700'
            :closable="false"
            @on-ok="ok"
            :loading="loading"
            class-name="vertical-center-modal">
            <Form  :label-width="50" inline ref='formSearch' :model='formSearch'>
                <Form-item label="部门" prop='deptId'>
                    <Select v-model="formSearch.deptId" clearable style="width:220px">
                        <Option v-for="item in deptList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </Form-item>
                <Form-item label="账号" prop='account'>
                    <Input :maxlength='20' v-model.trim="formSearch.account" placeholder="请输入账号"  @on-enter="getSearch"></Input>
                </Form-item>
                <Form-item label="姓名" prop='name'>
                    <Input :maxlength='20' v-model.trim="formSearch.name" placeholder="请输入姓名"  @on-enter="getSearch"></Input>
                </Form-item>
                <ul class="header-btn-group not-float">
                    <li class="header-item" @click="getSearch"><Icon type="search"></Icon>查询</li>
                    <li class="header-item" @click="handleReset('formSearch')"><Icon type="refresh"></Icon>重置</li>
                </ul>
            </Form>
            <Table height="350" stripe :columns="col1" :data="data1" @on-selection-change='change'></Table>
        </Modal>
    </div>
</template>

<script>
    export default {
        data () {
            const validateList = (rule, value, callback) => {
                if (value.length === 0) {
                    callback(new Error('请选择人员'));
                } else {
                    callback();
                }
            };
            const validateDate = (rule, value, callback) => {
                if (this.data2.length === 0) {
                    callback(new Error('请选择日期'));
                } else {
                    callback();
                }
            };
            const validateType = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请选择类型'));
                } else {
                    callback();
                }
            };
            return {
                modal: false,
                loading: true,
                saveLoad: false,
                formValidate: {
                    detailListStr: '',
                    userList: [],
                },
                formAdd: {
                    startTime: moment(moment(moment().startOf('week')).format('YYYY-MM-DD')).add(1, 'd').format('YYYY-MM-DD'),
                    endTime: moment(moment(moment().endOf('week')).format('YYYY-MM-DD')).add(1, 'd').format('YYYY-MM-DD'),
                    categoryId: ''
                },
                timeBox: [moment(moment(moment().startOf('week')).format('YYYY-MM-DD')).add(1, 'd').format('YYYY-MM-DD'), moment(moment(moment().endOf('week')).format('YYYY-MM-DD')).add(1, 'd').format('YYYY-MM-DD'),],
                formSearch: {
                    hospitalId: '',
                    account: '',
                    name: '',
                    deptId: '',
                },
                col: [
                    {
                        title: '用户账号',
                        key: 'userAccount'
                    },
                    {
                        title: '用户姓名',
                        key: 'userName',
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 100,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                    h('Button', {
                                        props: {
                                            type: 'error',
                                            size: 'small',
                                            icon: 'ios-trash-outline'
                                        },
                                        on: {
                                            click: () => {
                                                this.remove(params.index, 1)
                                            }
                                        }
                                    }, '删除'),
                                ])
                        }
                    }
                ],
                col1: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
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
                        title: '部门',
                        key: 'deptName'
                    },
                    {
                        title: '性别',
                        key: 'gender'
                    },
                ],
                col2: [
                    {
                        title: '日期',
                        key: 'ShiftDate'
                    },
                    {
                        title: '排班类型',
                        key: 'CategoryID',
                        render: (h, params) => {
                            return h('Select', {
                                    props: {
                                        value: params.row.CategoryID
                                    },
                                    on: {
                                        'on-change': (val) => {
                                            this.data2[params.index].CategoryID = val
                                        }
                                    },
                            } ,this.categoryList.map(item => {
                                return h('Option', {
                                    props: {
                                        value: item.id,
                                        key: item,
                                    },
                                }, item.name)
                            }))
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 100,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                    h('Button', {
                                        props: {
                                            type: 'error',
                                            size: 'small',
                                            icon: 'ios-trash-outline'
                                        },
                                        on: {
                                            click: () => {
                                                this.remove(params.index, 2)
                                            }
                                        }
                                    }, '删除'),
                                ])
                        }
                    }
                ],
                data1: [],
                data2: [],
                selectBox: [],
                ruleForm: {
                    userList: [
                        { validator: validateList, trigger: 'change' }
                    ],
                    categoryId: [
                        { validator: validateType, trigger: 'change' }
                    ],
                    detailListStr: [
                        { validator: validateDate, trigger: 'change' }
                    ],
                },
            }
        },
        computed: {
            setSave () {
                return JSON.stringify(this.data2)
            },
            categoryList () {
                return this.$store.getters.getSelectShiftCategoryList
            },
            deptList () {
                return this.$store.getters.getSelectDeptList
            },
        },
        created () {
            if (window.localStorage) {
                let lg = window.localStorage;
                this.formSearch.hospitalId = lg.hospId
            }
            this.$store.dispatch('setPageLoading', 1);
        },
        mounted () {
            this.getSearch()
            this.$store.dispatch('setSelectDeptList', localStorage.getItem('hospId'))
            this.$store.dispatch('setSelectShiftCategoryList')
        },
        methods: {
            setTime (date) {
                this.formAdd.startTime = date[0]
                this.formAdd.endTime = date[1]
            },
            //获取弹窗用户选择
            getSearch () {
                let _vm = this;
                _vm.$http.get({
                    url: 'guard-webManager/myShift/getShiftUser.jhtml',
                    data: _vm.formSearch,
                    success: function(res){
                        if(res.data.code == 0 ){
                            _vm.data1 = res.data.content
                        } else {
                            console.log(res.data.desc)
                        }
                    },
                    error: function(res){
                        console.log(res);
                    }
                });
            },
            add () {
                this.modal = true
            },
            clean (type) {
                if(type === 1) {
                    this.formValidate.userList.splice(0)
                } else {
                    this.data2.splice(0)
                }
            },
            remove (index, type) {
                if(type === 1) {
                    this.formValidate.userList.splice(index, 1)
                } else {
                    this.data2.splice(index, 1)
                }
            },
            change (data) {
                this.selectBox = data
            },
            ok () {
                let _vm = this
                let _bool = true
                _vm.selectBox.map(item => {
                    _vm.formValidate.userList.map(item1 => {
                        if(item.id == item1.userid) {
                            _bool = false
                        }
                    })
                    if(_bool) {
                        item['userName'] = item.name
                        item['userid'] = item.id
                        item['userAccount'] = item.account
                        _vm.formValidate.userList.push(item)
                    } else {
                        _bool = true
                    }
                })
                _vm.modal = false
            },
            handleReset (name) {
                this.$refs[name].resetFields()
                this.getSearch()
            },
            // 添加时间
            addTime () {
                let _start = this.formAdd.startTime,
                    _data = []
                const _end = this.formAdd.endTime
                this.$refs.formAdd.validate((valid) => {
                    if(valid) {
                        _data.push({
                            ShiftDate: _start,
                            CategoryID: this.formAdd.categoryId,
                            time: new Date(_start)
                        })
                        for(let j = 1; moment(_start).isBefore(_end); j++) {
                            const _obj = {
                                ShiftDate: moment(_start).add(1, 'd').format('YYYY-MM-DD'),
                                CategoryID: this.formAdd.categoryId,
                                time: new Date(moment(_start).add(1, 'd').format('YYYY-MM-DD'))
                            }
                            _data.push(_obj)
                            _start = moment(_start).add(1, 'd').format('YYYY-MM-DD')
                        }
                        _data.map(item => {
                            const _index = this.data2.findIndex(time => time.ShiftDate === item.ShiftDate)
                            if(_index < 0) {
                                this.data2.push(item)
                            } else {
                                this.data2.splice(_index, 1, {
                                    ShiftDate: item.ShiftDate,
                                    CategoryID: item.CategoryID,
                                    time: item.time
                                })
                            }
                        })
                        this.data2 = this.data2.sort((x, y) => x.time - y.time)
                    }
                })
            },
            save () {
                let _vm = this
                let _url = ''
                let _data = {}
                let _box = []
                _vm.$refs['formValidate'].validate((valid) => {
                    if(valid) {
                        _vm.saveLoad = true
                        _vm.formValidate.userList.map(item => {
                            _box.push(item.userid)
                        })
                        _data = {
                            userList: _box.join(','),
                            detailListStr: _vm.setSave
                        }
                        _vm.$http.post({
                            url: 'guard-webManager/myShift/addBulkEdit.jhtml',
                            data: _data,
                            success: function(res){
                                if(res.data.code == 0 ){
                                    _vm.$router.push('/myShift')
                                    _vm.$Notice.success({
                                        title: '系统提示！',
                                        desc: res.data.content
                                    });
                                } else {
                                    _vm.saveLoad = false
                                    _vm.$Notice.error({
                                        title: '系统提示！',
                                        desc: res.data.desc
                                    });
                                }
                            },
                            error: function(res){
                                console.log(res);
                            }
                        });
                    }
                })
            },
            back () {
                this.$router.back(-1)
            }
        }
    }
</script>

<style scoped>
    #addBulk .addBulk {
        display: inline-block;
        width: 450px
    }
</style>