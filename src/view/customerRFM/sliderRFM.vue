/**
 *  RFM指标设置
 */

<template>
	<div class="container-box slider-RMF">
		<div class="container-header">
			<h2>RFM指标设置</h2>
		</div>
		<div class="container-body">
            <h3>R(Recency)值</h3>
            <div class="item">
                <p class="msg">R值代表顾客最近一次消费距离当前的时间间隔。理论上，上一次消费时间越近的顾客应该是比较好的顾客，对提供即时的商品或是服务也最有可能会有反应。最近一次消费的过程是持续变动的。在顾客距上一次购买时间满一个月之后，在数据库里就成为最近一次消费为两个月的客户。反之，同一天，最近一次消费为3个月前的客户作了其下一次的购买，他就成为最近一次消费为一天前的顾客，也就有可能在很短的期间内就收到新的折价信息。</p>
                <cmptRangeRMF :value="Rvalue" :bgColor="['#4172F6', '#FD9A62', '#FF6F76']" @on-change='setValueR' :min='1' :max='365' unit='天'></cmptRangeRMF>
                <Row>
                    <Col :sm="24" :md="8">
                        <p class="tit">活跃顾客: {{formEdit.leftR}}天以内</p>
                    </Col>
                    <Col :sm="24" :md="8">
                        <p class="tit">睡眠顾客: {{formEdit.leftR + 1}}天 - {{formEdit.rightR}}天</p>
                    </Col>
                    <Col :sm="24" :md="8">
                        <p class="tit">流失顾客: {{formEdit.rightR + 1}}天以上</p>
                    </Col>
                </Row>
            </div>
            <h3>F(Frequency)值</h3>
            <div class="item">
                <p class="msg">F值代表(Frequency)表示客户在一年（365天）内购买的订单数量（不是天数）。最常购买的顾客，也是满意度最高的顾客。如果相信品牌及商店忠诚度的话，最常购买的消费者，忠诚度也就最高。</p>
                <cmptRangeRMF :value="Fvalue" :bgColor="['#FF6F76', '#FD9A62', '#4172F6']" @on-change='setValueF' :min='1' :max='100' unit='次'></cmptRangeRMF>
                <Row>
                    <Col :sm="24" :md="8">
                        <p class="tit">新顾客: {{formEdit.leftF}}次以内</p>
                    </Col>
                    <Col :sm="24" :md="8">
                        <p class="tit">成熟顾客: {{formEdit.leftF + 1}}次 - {{formEdit.rightF}}次</p>
                    </Col>
                    <Col :sm="24" :md="8">
                        <p class="tit">忠诚顾客: {{formEdit.rightF + 1}}次以上</p>
                    </Col>
                </Row>
            </div>
            <h3>M(Monetary)值</h3>
            <div class="item">
                <p class="msg">M值表示客户在最近一年（365天）内购买的总金额。消费金额是所有数据库报告的支柱，也可以验证“帕雷托法则”(Pareto’s Law)——公司80%的收入来自20%的顾客。</p>
                <cmptRangeRMF :value="Mvalue" :bgColor="['#FF6F76', '#FD9A62', '#4172F6']" @on-change='setValueM' :min='0' :max='999999' unit='￥'></cmptRangeRMF>
                <Row>
                    <Col :sm="24" :md="8">
                        <p class="tit">低贡献顾客: {{formEdit.leftM}}￥以内</p>
                    </Col>
                    <Col :sm="24" :md="8">
                        <p class="tit">中贡献顾客: {{formEdit.leftM + 1}}￥ - {{formEdit.rightM}}￥</p>
                    </Col>
                    <Col :sm="24" :md="8">
                        <p class="tit">高贡献顾客: {{formEdit.rightM + 1}}￥以上</p>
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
    import cmptRangeRMF from 'components/rangeRMF.vue'
    export default {
        components: {cmptRangeRMF},
        data () {
            return {
                saveLoad: false,
                Rvalue: [90, 180],
                Fvalue: [1, 3],
                Mvalue: [2000, 10000],
                formEdit: {
                    leftR: 90,
                    rightR: 180,
                    leftF: 1,
                    rightF: 3,
                    leftM: 2000,
                    rightM: 10000
                },
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
                    url: 'guard-webManager/rfmOption/list.jhtml',
                    success: function(res){
                        if(res.data.code === 0){
                            _vm.formEdit = {
                                leftR: res.data.content.leftR * 1 || 90,
                                rightR: res.data.content.rightR * 1 || 180,
                                leftF: res.data.content.leftF * 1 || 1,
                                rightF: res.data.content.rightF * 1 || 3,
                                leftM: res.data.content.leftM * 1 || 2000,
                                rightM: res.data.content.rightM * 1 || 10000
                            }
                            _vm.$nextTick(() => {
                                console.log(_vm.formEdit)
                                _vm.Rvalue = [_vm.formEdit.leftR, _vm.formEdit.rightR]
                                _vm.Fvalue = [_vm.formEdit.leftF, _vm.formEdit.rightF]
                                _vm.Mvalue = [_vm.formEdit.leftM, _vm.formEdit.rightM]
                            })
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
            setValueR (val) {
                this.formEdit.leftR = val[0]
                this.formEdit.rightR = val[1]
            },
            setValueF (val) {
                this.formEdit.leftF = val[0]
                this.formEdit.rightF = val[1]
            },
            setValueM (val) {
                this.formEdit.leftM = val[0]
                this.formEdit.rightM = val[1]
            },
            save () {
                let _vm = this
                _vm.saveLoad = true
                _vm.$http.post({
                    url: 'guard-webManager/rfmOption/updateRfm.jhtml',
                    data: _vm.formEdit,
                    success: function(res){
                        if(res.data.code === 0){
                            _vm.$Notice.success({
                                title: '系统提示！',
                                desc: '保存成功！'
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
            cancel () {
                this.getList()
            },
        }
    }
</script>

<style scoped lang='less'>
    .slider-RMF {
        .item {
            margin: 0 40px 40px;
        }
        h3 {
            margin-bottom: 20px;
            font-size: 16px;
            line-height: 22px;
            font-weight: normal;
            color: #181818;
        }
        .msg {
            margin-bottom: 60px;
            font-size: 14px;
            line-height: 20px;
        }
        .tit {
            font-size: 14px;
            line-height: 20px;
            text-align: center;
        }
    }
    @media all and (max-width: 1100px) {
        .slider-RMF {
            .item {
                margin-left: 20px;
            }
        }
    }
</style>