/**
 * 回访条件查询页面
 */

<template>
    <div class="container-box">
        <div class="container-header">
            <h2>回访条件查询</h2>
        </div>
        <div class="container-body">
            <Form :label-width="100" ref="formAdd" :model="formAdd" label-position="right">
                <Form-item label="回访类型：" prop='categoryId'>
                    <Select v-model="formAdd.categoryId" style="width:300px">
                        <Option v-for="item in typeList" :value="item.id" :key="item.id" :disabled='item.status == 0'>{{ item.name }}</Option>
                    </Select>
                </Form-item>
                <Form-item label="回访方式：" prop='tool'>
                    <Select v-model="formAdd.tool" style="width:300px">
                        <Option v-for="item in toolList" :value="item.code" :key="item.code">{{ item.name }}</Option>
                    </Select>
                </Form-item>
                <Form-item label="提醒日期：" prop='taskTimeStart'>
                    <Date-picker :transfer='true' type="daterange" placement="bottom-start" placeholder="选择日期" style="width: 300px" @on-change='taskTime' ref='taskDate'></Date-picker>
                </Form-item>
                <Form-item label="回访日期：" prop='createTimeStart'>
                    <Date-picker :transfer='true' type="daterange" placement="bottom-start" placeholder="选择日期" style="width: 300px" @on-change='createTime' ref='createDate'></Date-picker>
                </Form-item>
                <Form-item label="最后回访：" prop='lastCallbackStart'>
                    <Date-picker :transfer='true' type="daterange" placement="bottom-start" placeholder="选择日期" style="width: 300px" @on-change='lastTime' ref='lastDate'></Date-picker>
                </Form-item>
                <Form-item label="提醒内容：" prop='name'>
                    <Input v-model.trim="formAdd.name" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入提醒内容" :maxlength='100'></Input>
                </Form-item>
                <Form-item label="回访内容：" prop='content'>
                    <Input v-model.trim="formAdd.content" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入回访内容" :maxlength='100'></Input>
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
                    categoryId: '',
                    tool: '',
                    name: '',
                    content: '',
                    taskTimeStart: '',
                    taskTimeEnd: '',
                    createTimeStart: '',
                    createTimeEnd: '',
                    lastCallbackStart: '',
                    lastCallbackEnd: '',
                },
                typeList: [],
            }
        },
        computed: {
            toolList () {
                return this.$store.getters.getSelectToolList
            },
        },
        created () {
            this.$store.dispatch('setPageLoading', 1)
        },
        mounted () {
            this.$store.dispatch('setSelectToolList')
            this.getType()
        },
        methods: {
            //回访类型
            getType () {
                let _vm = this
                _vm.$http.get({
                    url: 'guard-webManager/select/callbackCategoryInfo.jhtml',
                    success: function(res){
                        if(res.data.code == 0 ){
                            _vm.typeList = res.data.content
                        } else {
                            console.log(res.data.desc)
                        }
                    }
                })
            },
            taskTime (date) {
                this.formAdd.taskTimeStart = date[0]
                this.formAdd.taskTimeEnd = date[1]
            },
            createTime (date) {
                this.formAdd.createTimeStart = date[0]
                this.formAdd.createTimeEnd = date[1]
            },
            lastTime (date) {
                this.formAdd.lastCallbackStart = date[0]
                this.formAdd.lastCallbackEnd = date[1]
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
                        type: '10'
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields()
                this.$refs['taskDate'].handleClear()
                this.$refs['createDate'].handleClear()
                this.$refs['lastDate'].handleClear()
            }
        }
    }
</script>


