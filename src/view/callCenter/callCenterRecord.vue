/**
 * 通话详情
 */

<template>
    <div class="container-box">
        <div class="container-header">
            <h2>话单详情</h2>
        </div>
        <div class="container-body call-center-record">
            <Row>
                <Col :md="{ span: 20, offset: 2 }" :lg="{ span: 16, offset: 4 }" :sm="{ span: 24, offset: 0 }">
                    <h3 class="call-tit">通话详情</h3>
                    <table class="call-box">
                        <tbody>
                            <tr>
                                <td class="call-item" colspan="2">
                                    <span>话单编号</span>
                                    <p>{{formShow.callID}}</p>
                                </td>
                            </tr>
                            <tr>
                                <td class="call-item">
                                    <span>医院名称</span>
                                    <p>{{formShow.hospitalName}}</p>
                                </td>
                                <td class="call-item">
                                    <span>总机号码</span>
                                    <p>{{formShow.cloudCallNumber}}</p>
                                </td>
                            </tr>
                            <tr>
                                <td class="call-item">
                                    <span>主叫人</span>
                                    <p>{{formShow.callerName}}</p>
                                </td>
                                <td class="call-item">
                                    <span>主叫号码</span>
                                    <p>{{formShow.caller}}</p>
                                </td>
                            </tr>
                            <tr>
                                <td class="call-item">
                                    <span>被叫人</span>
                                    <p>{{formShow.calledName}}</p>
                                </td>
                                <td class="call-item">
                                    <span>被叫号码</span>
                                    <p>{{formShow.called}}</p>
                                </td>
                            </tr>
                            <tr>
                                <td class="call-item">
                                    <span>通话建立时间</span>
                                    <p>{{formShow.establishTime}}</p>
                                </td>
                                <td class="call-item">
                                    <span>通话挂断时间</span>
                                    <p>{{formShow.hangupTime}}</p>
                                </td>
                            </tr>
                            <tr>
                                <td class="call-item">
                                    <span>通话持续时间</span>
                                    <p>{{formShow.duration}}秒</p>
                                </td>
                                <td class="call-item">
                                    <span>新老客户</span>
                                    <p>{{formShow.customerType === 1 ? '老客' : '新客'}}</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <hr class="line">
                    <h3 class="call-tit">通话录音</h3>
                    <audio controls :src='voiceSrc' ref='music' v-show='key'>
                    </audio>
                    <div class="music-box">
                        <div class="pic">
                            <Icon type="ios-musical-notes" :size='30'></Icon>
                        </div>
                        <p>时长：{{formShow.duration}}秒</p>
                        <span class='down' @click='download'><Icon type="arrow-down-c" color='#fff' :size='17'></Icon></span>
                        <span class='pause' @click='pause' v-if='!playKey'><Icon type="ios-pause" color='#fff' :size='17'></Icon></span>
                        <span class='play' @click='play' v-if='playKey'><Icon type="play" color='#fff' :size='14'></Icon></span>
                    </div>
                </Col>
            </Row>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                playKey: true,
                key: false,
                formShow: {},
                voiceSrc: '',
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
                    url: 'guard-webManager/callCenter/getCallRecordDetail.jhtml',
                    data: {callRecordID: _vm.$route.query.id},
                    success: function(res){
                        if(res.data.code === 0 ){
                            _vm.formShow = res.data.content || {}
                            if(res.data.content.recordUrl) {
                                _vm.voiceSrc = res.data.content.recordUrl || ''
                            } else {
                                _vm.getVoice()
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
            getVoice () {
                let _vm = this
                _vm.$http.get({
                    url: 'guard-webManager/callCenter/getCallRecord.jhtml',
                    data: {
                        id: _vm.$route.query.id,
                        companyCode: localStorage.getItem('companyId')
                    },
                    success: function(res){
                        if(res.data.code === 0 ){
                            _vm.voiceSrc = res.data.content || ''
                        } else {
                            console.log(res.data.desc)
                        }
                    },
                    error: function(res){
                        console.log(res)
                    }
                })
            },
            download () {
                console.log(this.voiceSrc)
                window.open(this.voiceSrc + '?attname=1.mp3')
            },
            play () {
                this.playKey = false
                this.$refs.music.play()
                this.$refs.music.onended = () => this.playKey = true
            },
            pause () {
                this.playKey = true
                this.$refs.music.pause()
            },
        }
    }
</script>
<style scoped>
    .call-center-record .call-tit {
        margin: 30px 0 20px;
        font-size: 18px;
        font-weight: normal;
        line-height: 25px;
        color: #181818;
    }
    .call-center-record .call-box {
        width: 100%;
        border-collapse: collapse;
        border-top: 1px solid rgba(42,42,68,0.30);
        border-left: 1px solid rgba(42,42,68,0.30);
    }
    .call-center-record .call-item {
        padding: 10px;
        border-right: 1px solid rgba(42,42,68,0.30);
        border-bottom: 1px solid rgba(42,42,68,0.30);
    }
    .call-center-record .call-item span {
        float: left;
        width: 30%;
        margin-right: 10%;
        font-size: 12px;
        font-weight: bold;
        line-height: 18px;
        color: #181818;
    }
    .call-center-record .call-item p {
        float: left;
        width: 60%;
        font-size: 12px;
        line-height: 18px;
        color: #3D3D3D;
        word-wrap: break-word;
    }
    .call-center-record .line {
        height: 1px;
        margin-top: 30px;
        border: 0;
        background-color: rgba(42,42,68,0.30);
    }
    .call-center-record .music-box {
        overflow: hidden;
        width: 60%;
        padding: 10px 20px;
        border: 1px solid rgba(42,42,68,0.30);
        border-radius: 2px;
    }
    .call-center-record .pic {
        float: left;
        width: 40px;
        height: 40px;
        margin-right: 20px;
        text-align: center;
        border: 1px solid #181818;
        border-radius: 2px;
    }
    .call-center-record .pic i {
        position: relative;
        top: 4px;
        left: -1px;
    }
    .call-center-record .music-box p {
        float: left;
        font-size: 12px;
        line-height: 40px;
        color: #797979;
    }
    .call-center-record .music-box span {
        float: right;
        width: 24px;
        height: 24px;
        margin: 8px 0 0 10px;
        line-height: 24px;
        text-align: center;
        border-radius: 50%;
        cursor: pointer;
    }
    .call-center-record .play {
        background: #4172F6;
    }
    .call-center-record .play i {
        position: relative;
        top: 1px;
        left: 1px;
    }
    .call-center-record .pause {
        background: #4172F6;
    }
    .call-center-record .pause i {
        position: relative;
        top: 3px;
        left: 0px;
    }
    .call-center-record .down {
        background: #34D64F;
    }
    .call-center-record .down i {
        position: relative;
        top: 3px;
        left: 0px;
    }
</style>