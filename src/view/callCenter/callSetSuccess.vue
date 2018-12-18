/**
 * 呼叫中心流程
 */

<template>
	<div class="container-box call-set-success">
		<div class="container-header">
            <h2>总机管理</h2>
        </div>
        <div class="container-body">
            <h3 class="call-tit">新建呼叫中心流程</h3>
            <h3 class="success-tit"><Icon type="ios-checkmark" color='#34D64F' size='38' class='set-success'></Icon>呼叫中心配置成功，拿起电话试用吧~</h3>
            <Row>
                <Col :md="{ span: 20, offset: 2 }" :lg="{ span: 16, offset: 4 }" :sm="{ span: 24, offset: 0 }">
                    <p class="item-tit">总机信息</p>
                    <Row :gutter="40" class='item-mes'>
                        <Col :sm="24" :md="12">
                            <p>
                                <span>医院名称</span>{{formEdit.hospName}}
                            </p>
                        </Col>
                        <Col :sm="24" :md="8">
                            <p>
                                <span>总机号码</span>{{formEdit.switchNumber}}
                            </p>
                        </Col>
                        <Col span='24'>
                            <p>
                                <span>云总机ID</span>{{formEdit.subAccountSid}}
                            </p>
                        </Col>
                    </Row>
                    <hr class="line">
                </Col>
                <Col :md="{ span: 20, offset: 2 }" :lg="{ span: 16, offset: 4 }" :sm="{ span: 24, offset: 0 }">
                    <p class="item-tit">模式信息</p>
                    <p class="mes">1.老顾客来电时，电话转接给该顾客的<span>（注：咨询或开发需要配置好座机）</span></p>
                    <div class="item-mes">
                        <p v-if='formEdit.type === 1'>开发人员</p>
                        <p v-if='formEdit.type === 2'>咨询人员</p>
                    </div>
                    <Table stripe :columns="oldCol" :data="oldData" class='old-user' v-if='formEdit.type === 3'></Table>
                    <p class="mes">2.设置新顾客来电接听人员<span>（注：电话按下列顺序转拨）</span></p>
                    <Table stripe :columns="newCol" :data="newData" class='old-user'></Table>
                </Col>
            </Row>
            <div class="footer-btn">
                <Button type="primary" @click='close'>关闭</Button>
            </div>
		</div>
	</div>
</template>

<script>
    export default {
        data () {
            return {
                formAdd: {
                    hospitalID: '',
                    companyCode: localStorage.getItem('companyId')
                },
                oldData: [],
                newData: [],
                formEdit: {
                    subAccountSid: '',
                    switchNumber: '',
                    hospitalID: '',
                    hospName: '',
                    type: '',
                },
                oldCol: [
                    {   
                        title: '顺序',
                        type: 'index',
                    },
                    {
                        title: '姓名',
                        key: 'userName'
                    },
                    {
                        title: '性别',
                        render: (h, params) => {
                            const _text = params.row.gender === 1 ? '男' : '女'
                            return h('span', _text)
                        }
                    },
                    {
                        title: '部门',
                        key: 'deptName'
                    },
                    {
                        title: '电话',
                        key: 'phone'
                    }
                ],
                newCol: [
                    {   
                        title: '顺序',
                        type: 'index',
                    },
                    {
                        title: '姓名',
                        key: 'userName'
                    },
                    {
                        title: '性别',
                        render: (h, params) => {
                            const _text = params.row.gender === 1 ? '男' : '女'
                            return h('span', _text)
                        }
                    },
                    {
                        title: '部门',
                        key: 'deptName'
                    },
                    {
                        title: '电话',
                        key: 'phone'
                    }
                ],
            }
        },
        created () {
            if(typeof this.$route.query.id == 'string') {
                this.formAdd.hospitalID = this.$route.query.id
            } else {
                let lg = window.sessionStorage
                this.formAdd.hospitalID  = JSON.parse(lg.query34).id
            }
            this.getList()
        },
        methods: {
            getList () {
                let _vm = this
                _vm.$store.dispatch('setPageLoading', -1)
                _vm.$http.get({
                    url: 'guard-webManager/callCenter/getCallSetting.jhtml',
                    data: _vm.formAdd,
                    success: function(res){
                        if(res.data.code === 0){
                            _vm.newData = res.data.content.newList.sort((x, y) => x.sorted - y.sorted)
                            _vm.oldData = res.data.content.oldList.sort((x, y) => x.sorted - y.sorted)
                            _vm.formEdit = {
                                subAccountSid: res.data.content.subAccountSid || '',
                                switchNumber: res.data.content.cloudCallNumber || '',
                                hospName: res.data.content.hospital || '',
                                hospitalID: _vm.formAdd.hospitalID,
                                type: res.data.content.type * 1 || 1
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
            close () {
                this.$router.push('/callCenter')
            },
        }
    }
</script>

<style scoped>
    .call-set-success .call-tit {
        margin: 10px 0 20px;
        font-size: 16px;
        font-weight: normal;
        line-height: 22px;
        color: #181818;
    }
    .call-set-success .success-tit {
        margin-bottom: 30px;
        font-size: 16px;
        font-weight: normal;
        line-height: 22px;
        text-align: center;
        color: #181818;
    }
    .call-set-success .success-tit i {
        position: relative;
        vertical-align: middle;
        top: -3px;
        margin-right: 20px;
    }
    .call-set-success .item-tit {
        margin-bottom: 20px;
        font-size: 18px;
        line-height: 25px;
        color: #181818;
    }
    .call-set-success .item-tit button {
        float: right;
        margin-left: 10px;
    }
    .call-set-success .item-mes p {
        height: 40px;
        font-size: 14px;
        line-height: 40px;
        color: #3D3D3D;
    }
    .call-set-success .item-mes span {
        float: left;
        width: 80px;
        height: 40px;
        color: #181818;
    }
    .call-set-success .line {
        height: 1px;
        border: 0;
        margin: 20px 0;
        background: rgba(42,42,68,0.30);
    }
    .call-set-success .mes {
        margin-bottom: 10px;
        font-size: 16px;
        line-height: 22px;
        color: #181818;
    }
    .call-set-success .mes span {
        opacity: 0.5;
    }
    .call-set-success .old-user {
        margin: 5px 0 15px;
    }
    .call-set-success .footer-btn {
        text-align: center;
    }
</style>