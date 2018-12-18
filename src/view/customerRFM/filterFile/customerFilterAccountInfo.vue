/**
 * 账户条件查询页面
 */

<template>
    <div class="container-box">
        <div class="container-header">
            <h2>账户条件查询</h2>
        </div>
        <div class="container-body">
            <Form :label-width="100" ref="formAdd" :model="formAdd" label-position="right">
                <Form-item label="余额：" prop='compare1'>
                    <Select v-model="formAdd.compare1" style="width:80px">
                        <Option v-for="item in typeList" :key="item.name" :label="item.name" :value="item.name">{{item.name}}</Option>
                    </Select>
                    <cmptInputNumber :min="0" :max='1000000' v-model="formAdd.deposit" style="width:215px"></cmptInputNumber>
                </Form-item>
                <Form-item label="券额：" prop='compare2'>
                    <Select v-model="formAdd.compare2" style="width:80px">
                        <Option v-for="item in typeList" :key="item.name" :label="item.name" :value="item.name">{{item.name}}</Option>
                    </Select>
                    <cmptInputNumber :min="0" :max='1000000' v-model="formAdd.coupon" style="width:215px"></cmptInputNumber>
                </Form-item>
                <Form-item label="积分：" prop='compare3'>
                    <Select v-model="formAdd.compare3" style="width:80px">
                        <Option v-for="item in typeList" :key="item.name" :label="item.name" :value="item.name">{{item.name}}</Option>
                    </Select>
                    <cmptInputNumber :min="0" :max='1000000' v-model="formAdd.point" style="width:215px"></cmptInputNumber>
                </Form-item>
                <Form-item label="净收总额：" prop='compare4'>
                    <Select v-model="formAdd.compare4" style="width:80px">
                        <Option v-for="item in typeList" :key="item.name" :label="item.name" :value="item.name">{{item.name}}</Option>
                    </Select>
                    <cmptInputNumber :min="0" :max='1000000' v-model="formAdd.cashCardAmount" style="width:215px"></cmptInputNumber>
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
                    deposit: null,
                    compare2: '>=',
                    coupon: null,
                    compare3: '>=',
                    point: null,
                    compare4: '>=',
                    cashCardAmount: null,
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
                        type: '2'
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields()
                this.formAdd.deposit = null
                this.formAdd.coupon = null
                this.formAdd.point = null
                this.formAdd.cashCardAmount = null
            }
        }
    }
</script>


