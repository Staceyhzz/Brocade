/**
 * 上门条件查询页面
 */

<template>
    <div class="container-box">
        <div class="container-header">
            <h2>上门条件查询</h2>
        </div>
        <div class="container-body">
            <Form :label-width="100" ref="formAdd" :model="formAdd" label-position="right">
                <Form-item label="上门次数：" prop='compare1'>
                    <Select v-model="formAdd.compare1" style="width:80px">
                        <Option v-for="item in typeList" :key="item.name" :label="item.name" :value="item.name">{{item.name}}</Option>
                    </Select>
                    <cmptInputNumber :min="0" :max='1000000' v-model="formAdd.visitTimes" style="width:215px"></cmptInputNumber>
                </Form-item>
                <Form-item label="初次上门：" prop='firstVisitStart'>
                    <Date-picker :transfer='true' type="daterange" placement="bottom-start" placeholder="选择日期" style="width: 300px" @on-change='firstTime' ref='firstDate'></Date-picker>
                </Form-item>
                <Form-item label="最后上门：" prop='lastVisitStart'>
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
                    compare1: '>=',
                    visitTimes: null,
                    firstVisitStart: '',
                    firstVisitEnd: '',
                    lastVisitStart: '',
                    lastVisitEnd: '',
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
        created () {
            this.$store.dispatch('setPageLoading', 1)
        },
        methods: {
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
                        type: '3'
                    }
                })
            },
            firstTime (date) {
                this.formAdd.firstVisitStart = date[0]
                this.formAdd.firstVisitEnd = date[1]
            },
            lastTime (date) {
                this.formAdd.lastVisitStart = date[0]
                this.formAdd.lastVisitEnd = date[1]
            },
            handleReset (name) {
                this.$refs[name].resetFields()
                this.formAdd.visitTimes = null
                this.$refs['firstDate'].handleClear()
                this.$refs['lastDate'].handleClear()
            }
        }
    }
</script>


