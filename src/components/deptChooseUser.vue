/**
 * 部门下拉用户弹窗选择组件
 */
<template>
    <div id="deptChooseUser" :style="_style">
        <Input v-model="_userName" readonly icon="ios-search" :placeholder="_placeHolder" @on-focus="showUser"></Input>
        <Modal
            :title="_placeHolder"
            width='700'
            v-model="modal"
            :closable="false"
            class-name="vertical-center-modal">
            <Form :label-width="50" inline ref='deptFormUser' :model='deptFormUser'>
                <Form-item label="部门" prop='deptId'>
                    <Select v-model="deptFormUser.deptId" style="width:162px">
                        <Option v-for="item in deptList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </Form-item>
                <Form-item label="账号" prop='account'>
                    <Input v-model.trim="deptFormUser.account" placeholder="请输入账号" @on-enter="getUser"></Input>
                </Form-item>
                <Form-item label="姓名" prop='name'>
                    <Input v-model.trim="deptFormUser.name" placeholder="请输入姓名" @on-enter="getUser"></Input>
                </Form-item>
                <ul class="header-btn-group not-float">
                    <li class="header-item" @click="getUser"><Icon type="search"></Icon>查询</li>
                    <li class="header-item" @click="handleReset('deptFormUser')"><Icon type="refresh"></Icon>重置</li>
                </ul>
            </Form>
            <Table height="350" stripe :columns="userCol" :data="userData" @on-row-click='chooseUser'></Table>
        </Modal>
    </div>
</template>

<script>
    export default {
        name: 'deptChooseUser',
        props: {
            _placeHolder: String,
            _userName: String,
            _style: Object,
        },
        data () {
            return {
                once: false,
                modal: false,
                deptFormUser: {
                    hospitalId: '',
                    deptId: '',
                    account: '',
                    name: '',
                },
                userCol: [
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
            }
        },
        computed: {
            deptList () {
                if(this.$store.getters.getDeptList[0] === 1) {
                    this.once = true
                    return []
                } else {
                    this.once = false
                    return this.$store.getters.getDeptList
                }
            },
            userData () {
                if(this.$store.getters.getDeptUserList[0] === 1) {
                    this.once = true
                    return []
                } else {
                    this.once = false
                    return this.$store.getters.getDeptUserList
                }
            },
        },
        created () {
            if (window.localStorage) {
                var lg = window.localStorage;
                this.deptFormUser.hospitalId= lg.hospId
            }
        },
        methods: {
            //获取部门下拉
            getDeptList () {
                let _vm = this;
                _vm.$http.get({
                    url: 'guard-webManager/select/hospitalDeptInfo.jhtml',
                    data: {hospitalId: _vm.deptFormUser.hospitalId},
                    success: function(res){
                        if(res.data.code == 0) {
                            _vm.$store.dispatch('setDeptList', res.data.content);
                        } else {
                            console.log(res.data.desc)
                        }
                    },
                    error: function(res){
                        console.log(res);
                    }
                });
            },
            //弹窗搜索
            getUser () {
                let _vm = this;
                _vm.$http.get({
                    url: 'guard-webManager/select/hospitalUserList.jhtml',
                    data: _vm.deptFormUser,
                    success: function(res){
                        if(res.data.code == 0) {
                            _vm.$store.dispatch('setDeptUserList', res.data.content);
                        } else {
                            console.log(res.data.desc)
                        }
                    },
                    error: function(res){
                        console.log(res);
                    }
                });
            },
            showUser () {
                if(this.once) {
                    this.getUser()
                    this.getDeptList()
                    this.once = false
                }
                this.modal = true
            }, 
            chooseUser (data) {
                let _data = {
                    id: data.id,
                    name: data.name,
                }
                this.$emit('setUserName', _data)
                this.modal = false
            },
            handleReset (name) {
                this.$refs[name].resetFields()
                this.getUser()
            }
        }
    }
</script>