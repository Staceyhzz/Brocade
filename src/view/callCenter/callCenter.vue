/**
 * 总机管理
 */

<template>
	<div class="container-box">
		<div class="container-header">
			<h2>总机管理</h2>
		</div>
		<div class="container-body call-center">
            <div v-if='key'>
                <h3 class="call-tit">总机详情</h3>
                <Row>
                    <Col :md="{ span: 20, offset: 2 }" :lg="{ span: 16, offset: 4 }" :sm="{ span: 24, offset: 0 }">
                        <p class="item-tit">总机信息
                            <Button type="error" size='small' @click='remove'>删除</Button>
                        </p>
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
                        <p class="item-tit">模式信息
                            <Button type="primary" size='small' @click='toEdit'>编辑</Button>
                        </p>
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
            </div>
            <div class="add-call" v-else>
                <p>未添加总机号码</p>
                <Button type="primary" @click='add'>添加总机</Button>
            </div>
		</div>
	</div>
</template>

<script>
    export default {
        data () {
            return {
                key: true,
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
                            _vm.key = true
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
                            _vm.key = false
                            _vm.$store.dispatch('setPageLoading', 1)
                            console.log(res.data.desc)
                        }
                    },
                    error: function(res){
                        console.log(res)
                    }
                })
            },
            toEdit () {
                let breadData = [
                    {
                        url: '/desktop',
                        text: '桌面'
                    },
                    {
                        url: '/callCenter',
                        text: '总机管理'
                    },
                    {
                        url: '/callCenterEdit',
                        text: '修改总机模式'
                    }
                ]
                this.$store.dispatch('setBreadData', breadData)
                this.$router.push('/callCenterEdit')
            },
            add () {
                let _vm = this
                _vm.$http.post({
                    url: 'guard-webManager/callCenter/createSubAccount.jhtml',
                    data: _vm.formAdd,
                    success: function(res){
                        if(res.data.code === 0) {
                            let breadData = [
                                {
                                    url: '/desktop',
                                    text: '桌面'
                                },
                                {
                                    url: '/callCenter',
                                    text: '总机管理'
                                },
                                {
                                    url: '/callSwitchboard',
                                    text: '设置总机号码'
                                },
                            ]
                            _vm.$store.dispatch('setBreadData', breadData)
                            _vm.$router.push('/callSwitchboard')
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
            remove (data) {
                let _vm = this
                _vm.$Modal.confirm({
                    title: '系统提示',
                    content: `<p>确定删除呼叫总机号码以及总机号码下的接听设置？</p>
                            <p>总机号码：${_vm.formEdit.switchNumber}</p>`,
                    onOk: () => {
                        _vm.$http.post({
                            url: 'guard-webManager/callCenter/deleteCallSetting.jhtml',
                            data: _vm.formAdd,
                            success: function(res){
                                if(res.data.code == 0 ){
                                    _vm.key = false
                                    _vm.$Notice.success({
                                        title: '系统提示！',
                                        desc: '删除成功！'
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
                    onCancel: () => {
                        
                    }
                })
            },
        }
    }
</script>

<style scoped>
    .call-center .call-tit {
        margin: 10px 0 20px;
        font-size: 16px;
        font-weight: normal;
        line-height: 22px;
        color: #181818;
    }
    .call-center .item-tit {
        margin-bottom: 20px;
        font-size: 18px;
        line-height: 25px;
        color: #181818;
    }
    .call-center .item-tit button {
        float: right;
        margin-left: 10px;
    }
    .call-center .item-mes p {
        height: 40px;
        font-size: 14px;
        line-height: 40px;
        color: #3D3D3D;
    }
    .call-center .item-mes span {
        float: left;
        width: 80px;
        height: 40px;
        color: #181818;
    }
    .call-center .line {
        height: 1px;
        border: 0;
        margin: 20px 0;
        background: rgba(42,42,68,0.30);
    }
    .call-center .mes {
        margin-bottom: 10px;
        font-size: 16px;
        line-height: 22px;
        color: #181818;
    }
    .call-center .mes span {
        opacity: 0.5;
    }
    .call-center .old-user {
        margin: 5px 0 15px;
    }
    .call-center .add-call {
        max-width: 200px;
        padding: 20px;
        margin: 30px auto 0;
        border: 1px solid #d7dde4;
        border-color: #e3e8ee;
        text-align: center;
        background: #fff;
        border-radius: 4px;
        transition: all .2s ease-in-out;
        box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
    }
    .call-center .add-call p {
        margin-bottom: 15px;
        font-size: 16px;
        line-height: 22px;
        color: #404040;
    }
</style>