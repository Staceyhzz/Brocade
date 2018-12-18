/**
 * 渠道档案主结构模板
 */

<template>
    <div class="container-box">
        <div class="store-record-head">
            <Card shadow :padding='10'>
                <Row :gutter="16">
                    <Col :md="11">
                        <Card :bordered="false">
                            <Row>
                                <Col span="10">
                                    <img :src="userSrc" class="store-pic" @click='toView(1)'>
                                </Col>
                                <Col span="14">
                                    <h2>{{formShow.name}}</h2>
                                    <h3>
                                        <Icon type="ios-location"></Icon>
                                        {{formShow.address}}
                                    </h3>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                    <Col :md="13">
                        <Row :gutter="16">
                            <Col span="8">
                                <Card>
                                    <p slot="title">佣金余额
                                        <span style="float:right;cursor:pointer;color:#4172F6;" @click='toView(2)'>明细</span>
                                    </p>
                                    <p>¥{{amount}}</p>
                                </Card>
                            </Col>
                            <Col span="11">
                                <Card>
                                    <p slot="title">结算账户</p>
                                    <p>账户名：{{formShow.ownerName}}</p>
                                    <p>开户行：{{formShow.bank}}</p>
                                    <p>银行卡号：{{formShow.cardNo}}</p>
                                </Card>
                            </Col>
                            <Col span="5">
                                <Card>
                                    <p>渠道抽佣:</p>
                                    <div style="text-align:center">{{formShow.rate}}%</div>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Card>
        </div>
        <div class="container-body">
            <Menu mode="horizontal" :active-name="menuRouteUrl" @on-select='toMenu'>
                <Menu-item name="/storeBasicInfo">基础信息</Menu-item>
                <Menu-item name="/storeCusList">客户列表</Menu-item>
                <Menu-item name="/storeComList">佣金记录</Menu-item>
            </Menu>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                menuRouteUrl: '',
                formShow: {},
                amount: '',
                userSrc: '',
            }
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                if(to.path == '/storeRecord') {
                    vm.menuRouteUrl = '/storeBasicInfo'
                    let breadData = [
                        {
                            url: '/desktop',
                            text: '桌面'
                        },
                        {
                            url: '/store',
                            text: '渠道管理'
                        },
                        {
                            url: '/storeBasicInfo',
                            text: '基础信息'
                        }
                    ]
                    vm.$store.dispatch('setBreadData', breadData)
                } else {
                    vm.menuRouteUrl = to.path
                }
            })
        },
        beforeRouteUpdate (to, from, next) {
            this.menuRouteUrl = to.path
            next()
        },
        created () {
            this.getId(sessionStorage.getItem('storeId'))
        },
        methods: {
            getId (id) {
                let _vm = this
                _vm.$http.get({
                    url: 'guard-webManager/store/record.jhtml',
                    data: {id: id},
                    success: function(res){
                        if(res.data.code == 0 ){
                            console.log(res)
                            _vm.formShow = res.data.content.store || {}
                            if(res.data.content.store.imageUrl) {
                                _vm.userSrc = res.data.content.store.imageUrl
                            } else {
                                _vm.userSrc = require('assets/img/default-avatar.png')
                            }
                            _vm.amount = (res.data.content.commissionTotal - res.data.content.saleBackTotal).toFixed(2)
                        } else {
                            console.log(res.data.desc)
                        }
                    },
                    error: function(res){
                        console.log(res)
                    }
                })
            },
            toMenu (url) {
                let _text = ''
                if(url == '/storeBasicInfo') {
                    _text = '基础信息'
                } else if(url == '/storeCusList') {
                    _text = '客户列表'
                } else if(url == '/storeComList') {
                    _text = '佣金记录'
                }
                let breadData = [
                    {
                        url: '/desktop',
                        text: '桌面'
                    },
                    {
                        url: '/store',
                        text: '渠道管理'
                    },
                    {
                        url: url,
                        text: _text
                    }
                ]
                this.$store.dispatch('setBreadData', breadData)
                this.$router.push(url)
            },
            toView (type) {
                let _url = '',
                    _text = ''
                if(type === 1) {
                    _url = '/storePhoto'
                    _text = '设置渠道商图片'
                } else {
                    _url = '/storeAmount'
                    _text = '账户余额明细'
                }
                let breadData = [
                    {
                        url: '/desktop',
                        text: '桌面'
                    },
                    {
                        url: '/storeRecord',
                        text: '渠道档案'
                    },
                    {
                        url: _url,
                        text: _text
                    }
                ]
                this.$store.dispatch('setBreadData', breadData)
                this.$router.push(_url)
            },
            back () {
                this.$router.back(-1)
            }
        }
    }
</script>

<style scoped>
    .store-record-head {
        color: rgba(42,42,68,0.7);
    }
    .store-pic {
        display: block;
        width: 120px;
        height: 120px;
        cursor: pointer;
    }
    .store-record-head h2 {
        font-size: 20px;
        line-height: 40px;
    }
    .store-record-head h3 {
        font-size: 14px;
        font-weight: normal;
    }
</style>
