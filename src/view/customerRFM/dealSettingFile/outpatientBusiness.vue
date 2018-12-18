/**
 *  门诊指标设置
 */

<template>
	<div class="container-box outpatient-business">
		<div class="container-header">
			<h2>经营指标设置</h2>
		</div>
		<div class="container-body">
            <Menu mode="horizontal" active-name="/outpatientBusiness" @on-select='toMenu'>
                <Menu-item name="/dealBusiness">成交指标</Menu-item>
                <Menu-item name="/outpatientBusiness">门诊指标</Menu-item>
                <Menu-item name="/performanceSet">绩效设置</Menu-item>
                <Menu-item name="/intentionSet">意向类型</Menu-item>
                <Menu-item name="/intentionDistinguish">意向识别</Menu-item>
            </Menu>
            <div class="table">
                <table>
                    <thead>
                        <tr>
                            <th colspan="2">门诊类型</th>
                            <th class="tit">新客</th>
                            <th class="tit">老客</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>初诊</td>
                            <td class="content">第1次上门（上门但未分诊的情况也计为初诊）的顾客。</td>
                            <td>
                                <Radio v-model="formEdit.first" :true-value='1' :false-value='2' disabled></Radio>
                            </td>
                            <td>
                                <Radio v-model="formEdit.first" :true-value='2' :false-value='1' disabled></Radio>
                            </td>
                        </tr>
                        <tr>
                            <td>复诊</td>
                            <td class="content">第2次上门起，到第1次成交（成交指标计算）的顾客。</td>
                            <td>
                                <Radio v-model="formEdit.twice" :true-value='1' :false-value='2'></Radio>
                            </td>
                            <td>
                                <Radio v-model="formEdit.twice" :true-value='2' :false-value='1'></Radio>
                            </td>
                        </tr>
                        <tr>
                            <td>再消费</td>
                            <td class="content">第1次成交（不含）之后上门（包括上门但未分诊）的顾客。</td>
                            <td>
                                <Radio v-model="formEdit.again" :true-value='1' :false-value='2' disabled></Radio>
                            </td>
                            <td>
                                <Radio v-model="formEdit.again" :true-value='2' :false-value='1' disabled></Radio>
                            </td>
                        </tr>
                        <tr>
                            <td>复查</td>
                            <td class="content">上门后，分诊选择“治疗”菜单，并分诊到科室的顾客。</td>
                            <td>
                                <Radio v-model="formEdit.check" :true-value='1' :false-value='2' disabled></Radio>
                            </td>
                            <td>
                                <Radio v-model="formEdit.check" :true-value='2' :false-value='1' disabled></Radio>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="jyw-footer-btn">
                <Button type="primary" @click='save' :loading='saveLoad'>保存</Button>
                <Button type="ghost" class='cancel' @click='cancel'>取消</Button>
                <Button type="ghost" class='cancel' @click='reset' :loading='saveLoad'>重置</Button>
            </div>
        </div>
	</div>
</template>

<script>
    export default {
        data () {
            return {
                saveLoad: false,
                formEdit: {
                    first: 1,
                    twice: 1,
                    again: 2,
                    check: 3
                }
            }
        },
        created () {
            this.getList()
        },
        methods: {
            getList () {
                let _vm = this
                _vm.$store.dispatch('setPageLoading', -1)
                _vm.$http.get({
                    url: 'guard-webManager/managerTarget/clinicSettingList.jhtml',
                    success: function(res){
                        if(res.data.code === 0){
                            _vm.formEdit = {
                                first: 1,
                                twice: res.data.content.twice * 1 || 1,
                                again: 2,
                                check: 3,
                            }
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
            toMenu (val) {
                const breadData = [
                    {
                        url: '/desktop',
                        text: '桌面'
                    },
                    {
                        url: val,
                        text: '经营指标设置'
                    }
                ]
                this.$store.dispatch('setBreadData', breadData)
                this.$router.push(val)
            },
            cancel () {
                this.getList()
            },
            save () {
                let _vm = this
                _vm.saveLoad = true
                _vm.$http.post({
                    url: 'guard-webManager/managerTarget/updateClinicSetting.jhtml',
                    data: _vm.formEdit,
                    success: function(res){
                        if(res.data.code === 0 ){
                            _vm.$Notice.success({
                                title: '系统提示！',
                                desc: '操作成功！'
                            })
                        } else {
                            _vm.$Notice.error({
                                title: '系统提示！',
                                desc: res.data.desc
                            })
                        }
                        _vm.saveLoad = false
                    },
                    error: function(res){
                        console.log(res)
                    }
                })
            },
            reset () {
                let _vm = this
                _vm.$http.get({
                    url: 'guard-webManager/managerTarget/resetClinicType.jhtml',
                    success: function(res){
                        if(res.data.code === 0 ){
                            _vm.$Notice.success({
                                title: '系统提示！',
                                desc: '操作成功！'
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
        }
    }
</script>

<style scoped lang='less'>
    .outpatient-business {
        .container-body {
            padding-top: 0;
        }
        .table {
            overflow: hidden;
            margin: 40px 0;
            border: 1px solid #dedede;
            border-radius: 4px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
        }
        th, td {
            height: 34px;
            padding: 0 10px;
            text-align: center;
        }
        td {
            border-right: 1px solid #dedede;
            border-top: 1px solid #dedede;
            &:last-child {
                border-right: 0px;
            }
            label {
                margin-right: 0px;
            }
        }
        th {
            border-right: 1px solid #dedede;
            &:last-child {
                border-right: 0px;
            }
        }
        .content {
            padding-left: 60px;
            text-align: left;
        }
        .jyw-footer-btn {
            padding: 13px 0;
        }
    }
</style>