/**
 * 基本条件查询页面
 */

<template>
    <div class="container-box">
        <div class="container-header">
            <h2>基本条件查询</h2>
        </div>
        <div class="container-body">
            <Form :label-width="100" ref="formAdd" :model="formAdd" label-position="right">
                <Form-item label="姓名" prop="name">
                    <Input v-model.trim="formAdd.name" placeholder="请输入姓名" style='width:300px'></Input>
                </Form-item>
                <Form-item label="手机" prop="mobile">
                    <Input v-model.trim="formAdd.mobile" placeholder="请输入手机" style='width:300px'></Input>
                </Form-item>
                <Form-item label="性别" prop='gender'>
                    <Select v-model="formAdd.gender" style="width:300px">
                        <Option value="1">男</Option>
                        <Option value="2">女</Option>
                    </Select>
                </Form-item>
                <Form-item label="来源" prop='channelId'>
                    <Select v-model="formAdd.channelId" style="width:300px">
                        <Option v-for="item in channelList" :value="item.id" :key="item.id" :disabled="item.status == 0">{{ item.name }}</Option>
                    </Select>
                </Form-item>
                <Form-item label="咨询项目" prop='symptomId'>
                    <Select v-model="formAdd.symptomId" style="width:300px">
                        <Option v-for="item in symptomList" :value="item.id" :key="item.id" :disabled="item.status == 0">{{ item.name }}</Option>
                    </Select>
                </Form-item>
                <Form-item label="会员" prop='memberCategoryId'>
                    <Select v-model="formAdd.memberCategoryId" style="width:300px">
                        <Option v-for="item in menberList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </Form-item>
                <Form-item label="开发人员" prop='exploitUserId'>
                    <cmptHospChooseUser _placeHolder="选择开发人员" :_style="{width:'300px'}" :_userName="formAdd.exploitUserName" v-on:setUserName="setExploitUser"></cmptHospChooseUser>
                </Form-item>
                <Form-item label="咨询人员" prop='managerUserId'>
                    <cmptHospChooseUser _placeHolder="选择咨询人员" :_style="{width:'300px'}" :_userName="formAdd.managerUserName" v-on:setUserName="setManagerUser"></cmptHospChooseUser>
                </Form-item>
                <Form-item label="上门状态" prop='visitStatus'>
                    <Select v-model="formAdd.visitStatus" style="width:300px">
                        <Option value="1">已上门</Option>
                        <Option value="0">未上门</Option>
                    </Select>
                </Form-item>
                <Form-item label="成交状态" prop='dealStatus'>
                    <Select v-model="formAdd.dealStatus" style="width:300px">
                        <Option value="1">已成交</Option>
                        <Option value="0">未成交</Option>
                    </Select>
                </Form-item>
                <Form-item label="微信状态" prop='wechatStatus'>
                    <Select v-model="formAdd.wechatStatus" style="width:300px">
                        <Option value="1">已绑定</Option>
                        <Option value="0">未绑定</Option>
                    </Select>
                </Form-item>
                <Form-item label="年龄" prop="ageStart">
                    >=<Input v-model.trim="formAdd.ageStart" placeholder="请输入年龄段" style='width:150px'></Input>
                    <<Input v-model.trim="formAdd.ageEnd" placeholder="请输入年龄段" style='width:150px'></Input>
                </Form-item>
                <Form-item label="登记日期" prop='createTimeStart'>
                    <Date-picker :transfer='true' type="daterange" placement="bottom-start" placeholder="选择日期" style="width: 300px" @on-change='createTime' ref='createDate'></Date-picker>
                </Form-item>
                <Form-item label="初诊时间" prop='firstVisitStart'>
                    <Date-picker :transfer='true' type="daterange" placement="bottom-start" placeholder="选择日期" style="width: 300px" @on-change='firstTime' ref='firstDate'></Date-picker>
                </Form-item>
                <Form-item label="最后光临" prop='lastVisitStart'>
                    <Date-picker :transfer='true' type="daterange" placement="bottom-start" placeholder="选择日期" style="width: 300px" @on-change='lastTime' ref='lastDate'></Date-picker>
                </Form-item>
            </Form>
            <div class="footer-btnGroup">
                <Button type="primary"  icon="search" @click='search'>查询</Button>
                <Button type="primary"  icon="refresh" @click="handleReset('formAdd')">重置</Button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                formAdd: {
                    name: '',
                    mobile: '',
                    gender: '',
                    channelId: '',
                    symptomId: '',
                    memberCategoryId: '',
                    exploitUserId: '',
                    exploitUserName: '',
                    managerUserId: '',
                    managerUserName: '',
                    visitStatus: '',
                    dealStatus: '',
                    appointmentStatus: '',
                    wechatStatus: '',
                    createTimeStart: '',
                    createTimeEnd: '',
                    firstVisitStart: '',
                    firstVisitEnd: '',
                    lastVisitStart: '',
                    lastVisitEnd: '',
                    ageStart: '',
                    ageEnd: '',
                },
                channelList: [],
                symptomList: [],
                menberList: [],
            }
        },
        created () {
            this.$store.dispatch('setPageLoading', 1)
        },
        mounted () {
            this.getChannelList()
            this.getSymptomList()
            this.getMenberList()
        },
        methods: {
            //获取来源下拉
            getChannelList () {
                let _vm = this
                _vm.$http.get({
                    url: 'guard-webManager/select/channelInfo.jhtml',
                    success: function(res){
                        if(res.data.code == 0){
                            _vm.channelList = res.data.content
                        } else {
                            console.log(res.data.desc)
                        }
                    },
                    error: function(res){
                        console.log(res);
                    }
                })
            },
            //获取咨询项目下拉
            getSymptomList () {
                let _vm = this
                _vm.$http.get({
                    url: 'guard-webManager/select/symptomInfo.jhtml',
                    success: function(res){
                        if(res.data.code == 0){
                            _vm.symptomList = res.data.content
                        } else {
                            console.log(res.data.desc)
                        }
                    },
                    error: function(res){
                        console.log(res);
                    }
                })
            },
            //获取会员下拉
            getMenberList () {
                let _vm = this
                _vm.$http.get({
                    url: 'guard-webManager/select/memberCategoryInfo.jhtml',
                    success: function(res){
                        if(res.data.code == 0){
                            _vm.menberList = res.data.content
                        } else {
                            console.log(res.data.desc)
                        }
                    },
                    error: function(res){
                        console.log(res);
                    }
                })
            },
            //获取弹窗用户选择列表
            setExploitUser (data) {
                this.formAdd.exploitUserName = data.name
                this.formAdd.exploitUserId = data.id
            },
            setManagerUser (data) {
                this.formAdd.managerUserName = data.name
                this.formAdd.managerUserId = data.id
            },
            createTime (date) {
                this.formAdd.createTimeStart = date[0]
                this.formAdd.createTimeEnd = date[1]
            },
            firstTime (date) {
                this.formAdd.firstVisitStart = date[0]
                this.formAdd.firstVisitEnd = date[1]
            },
            lastTime (date) {
                this.formAdd.lastVisitStart = date[0]
                this.formAdd.lastVisitEnd = date[1]
            },
            search () {
                let breadData = [
                    {
                        url: '/desktop',
                        text: '桌面'
                    },
                    {
                        url: '/customerFilter',
                        text: '客户选择器'
                    },
                    {
                        url: '/basicEdit',
                        text: '条件查找结果'
                    },
                ]
                sessionStorage.setItem('filterSearch', JSON.stringify(this.formAdd))
                this.$store.dispatch('setBreadData', breadData)
                this.$router.push({
                    path: '/basicEdit',
                    query: {
                        type: '1'
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields()
                this.$refs['createDate'].handleClear()
                this.$refs['firstDate'].handleClear()
                this.$refs['lastDate'].handleClear()
                this.formAdd.managerUserName = ''
                this.formAdd.exploitUserName = ''
                this.formAdd.ageEnd = ''
            }
        }
    }
</script>


