/**
 * 医院下拉用户弹窗选择组件
 */
<template>
    <div id="hospChooseUser" :style="_style">
        <Input v-model="_userName" readonly icon="ios-search" :placeholder="_placeHolder" @on-focus="showUser"></Input>
        <Modal
            :title="_placeHolder"
            width='700'
            v-model="modal"
            :closable="false"
            class-name="vertical-center-modal">
            <Form :label-width="50" inline ref='hospFormUser' :model='hospFormUser'>
                <Form-item label="医院" prop='hospitalId'>
                    <Select v-model="hospFormUser.hospitalId" clearable style="width:200px">
                        <Option v-for="item in hospList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </Form-item>
                <Form-item label="账号" prop='account'>
                    <Input v-model.trim="hospFormUser.account" placeholder="请输入账号" @on-enter="getUser"></Input>
                </Form-item>
                <Form-item label="姓名" prop='name'>
                    <Input v-model.trim="hospFormUser.name" placeholder="请输入姓名" @on-enter="getUser"></Input>
                </Form-item>
                <ul class="header-btn-group not-float">
                    <li class="header-item" @click="getUser"><Icon type="search"></Icon>查询</li>
                    <li class="header-item" @click="handleReset('hospFormUser')"><Icon type="refresh"></Icon>重置</li>
                </ul>
            </Form>
            <Table height="350" stripe :columns="userCol" :data="userData" @on-row-click='chooseUser'></Table>
        </Modal>
    </div>
</template>

<script>
    export default {
        name: 'hospChooseUser',
        props: {
            _placeHolder: String,
            _userName: String,
            _style: Object,
        },
        data () {
            return {
                once: false,
                modal: false,
                hospFormUser: {
                    hospitalId: '',
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
                        title: '医院',
                        key: 'hospitalName'
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
            hospList () {
                if(this.$store.getters.getHospList[0] === 1) {
                    this.once = true
                    return []
                } else {
                    this.once = false
                    return this.$store.getters.getHospList
                }
            },
            userData () {
                if(this.$store.getters.getHospUserList[0] === 1) {
                    this.once = true
                    return []
                } else {
                    this.once = false
                    return this.$store.getters.getHospUserList
                }
            },
        },
        created () {

        },
        methods: {
            //获取医院下拉
            getHospList () {
                let _vm = this;
                _vm.$http.get({
                    url: 'guard-webManager/select/hospitalInfo.jhtml',
                    success: function(res){
                        if(res.data.code == 0) {
                            _vm.$store.dispatch('setHospList', res.data.content);
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
                    url: 'guard-webManager/select/userList.jhtml',
                    data: _vm.hospFormUser,
                    success: function(res){
                        if(res.data.code == 0 ) {
                            _vm.$store.dispatch('setHospUserList', res.data.content);
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
                    this.getHospList()
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