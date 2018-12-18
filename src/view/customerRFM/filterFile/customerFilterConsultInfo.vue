/**
 * 咨询条件查询页面
 */

<template>
    <div class="container-box">
        <div class="container-header">
            <h2>咨询条件查询</h2>
        </div>
        <div class="container-body">
            <Form :label-width="100" ref="formAdd" :model="formAdd" label-position="right">
                <Form-item label="咨询项目：" prop='symptomId'>
                    <Select v-model="formAdd.symptomId" clearable style="width:300px">
                        <Option v-for="item in symptomList" :value="item.id" :key="item.id" :disabled="item.status == 0">{{ item.name }}</Option>
                    </Select>
                </Form-item>
                <Form-item label="咨询日期：" prop='consultStart'>
                    <Date-picker :transfer='true' type="daterange" placement="bottom-start" placeholder="选择日期" style="width: 300px" @on-change='consultTime' ref='consultDate'></Date-picker>
                </Form-item>
                <Form-item label="咨询次数：" prop='compare1'>
                    <Select v-model="formAdd.compare1" style="width:80px">
                        <Option v-for="item in typeList" :key="item.name" :label="item.name" :value="item.name">{{item.name}}</Option>
                    </Select>
                    <cmptInputNumber :min="0" :max='1000000' v-model="formAdd.consultTimes" style="width:215px"></cmptInputNumber>
                </Form-item>
                <Form-item label="咨询方式：" prop='tool'>
                    <Select v-model="formAdd.tool" style="width:300px">
                        <Option v-for="item in toolList" :value="item.code" :key="item.code">{{ item.name }}</Option>
                    </Select>
                </Form-item>
                <Form-item label="初次咨询：" prop='firstConsultStart'>
                    <Date-picker :transfer='true' type="daterange" placement="bottom-start" placeholder="选择日期" style="width: 300px" @on-change='firstTime' ref='firstDate'></Date-picker>
                </Form-item>
                <Form-item label="最后咨询：" prop='lastConsultStart'>
                    <Date-picker :transfer='true' type="daterange" placement="bottom-start" placeholder="选择日期" style="width: 300px" @on-change='lastTime' ref='lastDate'></Date-picker>
                </Form-item>
                <Form-item label="咨询内容：" prop='content'>
                    <Input v-model.trim="formAdd.content" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入咨询内容" :maxlength='100'></Input>
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
                    symptomId: '',
                    consultStart: '',
                    consultEnd: '',
                    tool: '',
                    compare1: '>=',
                    consultTimes: null,
                    firstConsultStart: '',
                    firstConsultEnd: '',
                    lastConsultStart: '',
                    lastConsultEnd: '',
                    content: '',
                },
                typeList: [
                    {
                        name: '>=',
                    },
                    {
                        name: '>',
                    },
                    {
                        name: '=',
                    },
                    {
                        name: '<=',
                    },
                    {
                        name: '<',
                    },
                ],
            }
        },
        computed: {
            symptomList () {
                return this.$store.getters.getSelectAllSymptomInfoList
            },
            toolList () {
                return this.$store.getters.getSelectToolList
            },
        },
        created () {
            this.$store.dispatch('setPageLoading', 1)
        },
        mounted () {
            this.$store.dispatch('setSelectAllSymptomInfoList')
            this.$store.dispatch('setSelectToolList')
        },
        methods: {
            consultTime (date) {
                this.formAdd.consultStart = date[0]
                this.formAdd.consultEnd = date[1]
            },
            firstTime (date) {
                this.formAdd.firstConsultStart = date[0]
                this.formAdd.firstConsultEnd = date[1]
            },
            lastTime (date) {
                this.formAdd.lastConsultStart = date[0]
                this.formAdd.lastConsultEnd = date[1]
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
                        type: '5'
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields()
                this.$refs['consultDate'].handleClear()
                this.$refs['firstDate'].handleClear()
                this.$refs['lastDate'].handleClear()
                this.formAdd.consultTimes = null
            }
        }
    }
</script>


