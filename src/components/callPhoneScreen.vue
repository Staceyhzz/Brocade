<template>
    <div class="call-phone-screen">
        <div class="call-cus-info">
            <img :src="formShow.src" alt="" />
            <div class="mes">
                <h3>{{formShow.name}}</h3>
                <p>{{formShow.mobile}}</p>
            </div>
            <div class="info">
                <p class="vip">{{formShow.vip}}</p>
                <p class="gender">{{formShow.gender}} {{formShow.age}}</p>
            </div>
        </div>
        <div class="call-cus-tags">
            <span v-for='item in symptomNameBox' :key='item'>{{item}}</span>
        </div>
        <div class="call-btn">
            <span @click='toCus' v-if='key'>打开客户界面</span>
            <span @click='toNew' v-else>添加客户</span>
            <span class='close' @click='close'>关闭</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'callPhoneScreen',
        props: {
            _callInfo: String,
        },
        watch: {
            _callInfo (val) {
                console.log(val)
                const data = JSON.parse(val)
                if(data.customerId) {
                    console.log('=====')
                    this.getCallInfo(data.customerId)
                    this.key = true
                } else {
                    this.formShow = {
                        src: require('assets/img/default-avatar.png'),
                        name: '未知客户',
                        mobile: data.callPhone,
                        id: '',
                        vip: '',
                        gender: '',
                        age: '',
                        symptomName: ''
                    }
                    this.key = false
                }
            }
        },
        data () {
            return {
                formShow: {
                    src: '',
                    name: '',
                    id: '',
                    mobile: '',
                    vip: '',
                    gender: '',
                    age: '',
                    symptomName: ''
                },
                key: true,
            }
        },
        computed: {
            baseImgURL () {
                return this.$store.getters.getBaseImgURL
            },
            otherTabUrl () {
                return this.$store.getters.getOpenOtherTabUrl
            },
            symptomNameBox () {
                if(this.formShow.symptomName) {
                    return this.formShow.symptomName.split(',')
                } else {
                    return []
                }
            },
        },
        methods: {
            getCallInfo (id) {
                let _vm = this
                _vm.$http.get({
                    url: 'guard-webManager/callCenter/getCustomerInfo.jhtml',
                    data: {customerId: id},
                    success: function(res){
                        if(res.data.code === 0 ){
                            let _data = res.data.content || {}
                            _vm.formShow = {
                                src: _data.imageUrl ? _vm.baseImgURL + _data.imageUrl : require('assets/img/default-avatar.png'),
                                name: _data.name || '',
                                id: _data.id || '',
                                mobile: _data.mobile || '',
                                vip: _data.memberCategoryName || '',
                                gender: _data.gender === 1 ? '男' : '女',
                                age: _vm.getAge(_data.birthYear),
                                symptomName: _data.symptomName || ''
                            }
                        }
                    },
                    error: function(res){
                        console.log(res)
                    }
                })
            },
            getAge (val) {
                if(val) {
                    const _now = moment().year()
                    return _now - val
                } else {
                    return ''
                }
            },
            toCus () {
                sessionStorage.setItem("cusNameBlank", this.formShow.name)
                sessionStorage.setItem("cusIdBlank", this.formShow.id)
                window.open(this.otherTabUrl)
            },
            close () {
                this.$emit('closeCall')
            },
            toNew () {
                let breadData = [
                    {
                        url: '/desktop',
                        text: '桌面'
                    },
                    {
                        url: '/frontDesk',
                        text: '接待工作台'
                    },
                    {
                        url: '/addNew',
                        text: '登记新客户'
                    }
                ]
                this.$store.dispatch('setBreadData', breadData);
                this.$router.push({
                    path: '/addNew',
                    query: {
                        type: 'front',
                        mobile: this.formShow.mobile
                    }
                })
            },
        }
    }
</script>
<style scoped>
    .call-phone-screen {
        position: fixed;
        right: 15px;
        bottom: 15px;
        padding: 15px;
        background: #FFFFFF;
        box-shadow: 0 4px 13px 0 rgba(42,42,68,0.10);
        border-radius: 3px;
        z-index: 99999999;
    }
    .call-phone-screen .call-cus-info {
        overflow: hidden;
    }
    .call-phone-screen .call-cus-info img {
        float: left;
        display: block;
        width: 60px;
        height: 60px;
        margin-right: 7px;
        border-radius: 1px;
    }
    .call-phone-screen .mes {
        float: left;
        margin-right: 30px;
    }
    .call-phone-screen .mes h3 {
        width: 100px;
        margin-bottom: 5px;
        font-size: 16px;
        font-weight: normal;
        line-height: 32px;
        color: #3D3D3D;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .call-phone-screen .mes p {
        font-size: 12px;
        color: #4172F6;
    }
    .call-phone-screen .info {
        float: left;
        width: 130px;
    }
    .call-phone-screen .vip {
        padding: 4px 0;
        font-size: 12px;
        line-height: 18px;
        text-align: right;
        color: #FD9A62;
    }
    .call-phone-screen .gender {
        font-size: 12px;
        line-height: 14px;
        text-align: right;
        color: #181818;
    }
    .call-phone-screen .call-cus-tags {
        width: 327px;
        margin: 20px 0 10px;
    }
    .call-phone-screen .call-cus-tags span {
        float: left;
        min-width: 64px;
        padding: 5px 8px;
        margin: 0 10px 10px 0;
        font-size: 12px;
        line-height: 1;
        text-align: center;
        color: #3D3D3D;
        background: rgba(169,169,169,0.20);
        border-radius: 2px;
    }
    .call-phone-screen .call-btn {
        overflow: hidden;
        width: 327px;
    }
    .call-phone-screen .call-btn span {
        float: right;
        padding: 3px 13px;
        border: 1px solid #4172F6;
        margin-left: 10px;
        font-size: 12px;
        line-height: 18px;
        text-align: center;
        color: #fff;
        background: #4172F6;
        border-radius: 3px;
        cursor: pointer;
    }
    .call-phone-screen .call-btn .close {
        color: #4172F6;
        background: #fff;
    }
</style>