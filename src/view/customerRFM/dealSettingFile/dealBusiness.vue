/**
 *  成交指标设置
 */

<template>
	<div class="container-box deal-business">
		<div class="container-header">
			<h2>经营指标设置</h2>
		</div>
		<div class="container-body">
            <Menu mode="horizontal" active-name="/dealBusiness" @on-select='toMenu'>
                <Menu-item name="/dealBusiness">成交指标</Menu-item>
                <Menu-item name="/outpatientBusiness">门诊指标</Menu-item>
                <Menu-item name="/performanceSet">绩效设置</Menu-item>
                <Menu-item name="/intentionSet">意向类型</Menu-item>
                <Menu-item name="/intentionDistinguish">意向识别</Menu-item>
            </Menu>
            <h3>还款单核算</h3>
            <div class="deal-item">
                <div class="radio-box">
                    <RadioGroup v-model="formEdit.repayment" vertical>
                        <Radio :label="1">
                            <span class='radio-tit'>单独核算</span>
                            <span class='radio-msg'>在统计周期内独立体现还款单数据，并计算成交金额和成交率。</span>
                        </Radio>
                        <Radio :label="2" disabled>
                            <span class='radio-tit'>按项目单核算</span>
                            <span class='radio-msg'>还款金额计入原始订单实收总额，如原始订单不在统计周期内，则不体现还款数据。</span>
                        </Radio>
                    </RadioGroup>
                </div>
            </div>
            <h3>成交金额核算</h3>
            <div class="deal-item">
                <div class="radio-box">
                    <RadioGroup v-model="formEdit.deposit" vertical>
                        <Radio :label="1">
                            <span class='radio-tit'>充值模式</span>
                            <span class='radio-msg'>成交金额 = 项目单实收额 + 还款额 - 赔款退现金额 - 退项目退现金额 + 预收款充值金额 - 退预收退现额</span>
                        </Radio>
                        <Radio :label="2">
                            <span class='radio-tit'>消费模式</span>
                            <span class='radio-msg'>成交金额 = 项目单支付额 + 还款额 - 赔款退现金额 - 退项目退现金额</span>
                        </Radio>
                    </RadioGroup>
                </div>
            </div>
            <h3>例外项目</h3>
            <div class="deal-item">
                <!-- <p class="tit">例外项目</p> -->
                <p class="info">以下项目不核算成交，标志为未成交。适用于排除体验、低价活动等项目不算成交考核。</p>
                <Row :gutter="24">
                    <Col :md="24" :lg="12">
                        <div class="table-item">
                            <p>收费项目列表</p>
                            <Form inline ref='formSearch' :model='formSearch'>
                                <Form-item prop='categoryId'>
                                    <cmptCategoryChoose _placeHolder="选择收费项目类型" :_categoryName="categoryName" v-on:setCategoryName="setCharge" :_style="{width: '140px'}"></cmptCategoryChoose>
                                </Form-item>
                                <Form-item prop='searchContent'>
                                    <Input v-model.trim="formSearch.searchContent" placeholder="请输入拼音码/编号/名称" @on-enter='getSearch(formSearch, 1)' icon="ios-search"></Input>
                                </Form-item>
                                <ul class="header-btn-group not-float">
                                    <li class="header-item" @click="getSearch(formSearch, 1)"><Icon type="search"></Icon>查询</li>
                                    <li class="header-item" @click="handleReset('formSearch')"><Icon type="refresh"></Icon>重置</li>
                                </ul>
                            </Form>
                            <Table stripe :columns="chargeCol" :data="chargeList" @on-row-click='chooseCharge'></Table>
                            <Page :current="pageNumber" :total="total" :page-size='10' simple @on-change='changePage' class='charge-page'></Page>
                        </div>
                    </Col>
                    <Col :md="24" :lg="12">
                        <div class="table-item">
                            <p>成交例外项目
                                <Button type="primary" icon="refresh" size='small' @click='clean'>清空</Button>
                            </p>
                            <Table stripe :columns="editCol" :data="editData"></Table>
                        </div>
                    </Col>
                </Row>
            </div>
            <div class="jyw-footer-btn">
                <Button type="primary" @click='save' :loading='saveLoad'>保存</Button>
                <Button type="ghost" class='cancel' @click='cancel'>取消</Button>
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
                    repayment: 1,
                    deposit: 1,
                    ids: '',
                },

                pageNumber: 1,
                total: 0,
                categoryName: '',
                formSearch: {
                    categoryId: '',
                    searchContent: '',
                    pageSize: 10
                },
                chargeCol: [
                    {
                        title: '项目分类',
                        key: 'categoryName'
                    },
                    {
                        title: '编号',
                        key: 'id'
                    },
                    {
                        title: '项目名称',
                        key: 'name'
                    }
                ],
                chargeList: [],
                editCol: [
                    {
                        title: '项目分类',
                        key: 'categoryName'
                    },
                    {
                        title: '编号',
                        key: 'id'
                    },
                    {
                        title: '项目名称',
                        key: 'name'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 70,
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
                                                this.remove(params.index)
                                            }
                                        }
                                    }, '删除')
                                ])
                        }
                    }
                ],
                editData: []
            }
        },
        created () {
            this.getList()
        },
        mounted () {
            this.getSearch(this.formSearch, 1)
        },
        methods: {
            getList () {
                let _vm = this
                _vm.$store.dispatch('setPageLoading', -1)
                _vm.$http.get({
                    url: 'guard-webManager/managerTarget/dealSettingList.jhtml',
                    success: function(res){
                        if(res.data.code === 0){
                            _vm.editData = res.data.content.unDealCharge || []
                            _vm.formEdit.deposit = res.data.content.deposit * 1 || 1 
                            _vm.formEdit.repayment = res.data.content.repayment * 1 || 1
                            _vm.formEdit.ids = _vm.editData.map(item => item.id).join(',') || ''
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
            getSearch (form, pageNumber) {
                let _vm = this
                form.pageNumber = pageNumber
                _vm.$http.get({
                    url: 'guard-webManager/managerTarget/getChargePage.jhtml',
                    data: form,
                    success: function(res){
                        if(res.data.code === 0 ){
                            console.log(res.data.content)
                            _vm.chargeList = res.data.content.content || []
                            _vm.pageNumber = res.data.content.pageNumber || 1
                            _vm.total = res.data.content.total || 0
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
            setCharge (data) {
                this.categoryName = data.name
                this.formSearch.categoryId = data.id
            },
            handleReset (name) {
                this.categoryName = ''
                this.$refs[name].resetFields()
                this.getSearch(this.formSearch, 1)
            },
            changePage (num) {
                this.getSearch(this.formSearch, num)
            },
            chooseCharge (data) {
                const _index = this.editData.findIndex(item => item.id === data.id)
                if(_index < 0) {
                    this.editData.unshift(data)
                } else {
                    this.$Notice.error({
                        title: '系统提示！',
                        desc: '项目已添加，请勿重复操作！'
                    })
                }
            },
            remove (index) {
                this.editData.splice(index, 1)
            },
            clean () {
                this.editData.splice(0)
            },
            cancel () {
                this.getList()
            },
            save () {
                let _vm = this
                _vm.saveLoad = true
                _vm.formEdit.ids = _vm.editData.map(item => item.id).join(',')
                _vm.$http.post({
                    url: 'guard-webManager/managerTarget/updateDealSetting.jhtml',
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
        }
    }
</script>

<style scoped lang='less'>
    .deal-business {
        .container-body {
            padding-top: 0;
        }
        h3 {
            padding: 20px 0;
            font-size: 16px;
            font-weight: normal;
            line-height: 22px;
            color: #181818;
        }
        .deal-item {
            padding: 0 40px;
            margin-bottom: 30px;
        }
        .radio-box {
            padding: 30px 46px;
            border: 1px solid #DEDEDE;
            border-radius: 4px;
            label {
                height: auto;
                word-wrap: break-word;
                white-space: normal;
            }
        }
        .radio-tit {
            display: inline-block;
            width: 100px;
            font-size: 14px;
        }
        .radio-msg {
            display: inline-block;
            padding-left: 30px;
            font-size: 14px;
        }
        .tit {
            font-size: 14px;
            line-height: 20px;
            color: #181818;
        }
        .info {
            margin: 2px 0 10px;
            font-size: 12px;
            line-height: 17px;
            color: #797979;
        }
        .table-item {
            padding: 10px;
            border: 1px solid #DEDEDE;
            margin-bottom: 20px;
            border-radius: 4px;
            p {
                overflow: hidden;
                padding-right: 10px;
                margin-bottom: 10px;
                font-size: 14px;
                line-height: 20px;
                button {
                    float: right;
                }
            }
        }
        .charge-page {
            margin-top: 15px;
            text-align: right;
        }
    }
</style>