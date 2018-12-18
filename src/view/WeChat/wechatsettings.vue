/** * 基础设置 */
<template>
	<div class="container-box">
		<!-- <div class="container-header">
		<h2>设置</h2>
		</div> -->
		<div class="container-body-main">
            <!-- 基础设置 -->
            <div style="float:left;width:100%;">
            <div class="BasicSettings">
                <h2>基础设置</h2>
                <div class="BasicSettings-main">
                    <div style="width: 100%;height: 40px;">
                        <span style="float:left;margin:0 50px 0 5px;padding-left:35px;">功能开启</span>                
                        <i-switch style="float:left;" v-model="register" :true-value='1' :false-value='0' @on-change="shentthree" size="large">
                            <span slot="open">ON</span>
                            <span slot="close">OFF</span>
                        </i-switch>  
                        <span style="float:left;margin:0 0 0 10%;color:#aeaeae;">启状态下，微信端的功能才能正常使用，关闭后，微信端所有功能无法使用。</span>
                    </div>
                    <div v-show="isShowthree">
                        <div style="width: 100%;height: 40px;">
                            <span style="float:left;margin:0 50px 0 0;">推荐人注册限制</span>
                            <i-switch style="float:left;" v-model="limit" :true-value='1' :false-value='0' size="large">
                                <span slot="open">公开</span>
                                <span slot="close">内部</span>
                            </i-switch>
                            <span style="float:left;margin:0 0 0 122px;color:#aeaeae;">内部选项下，仅允许现有顾客的手机号码注册为推荐人。公开选项下，任意手机号均可注册为推荐人。</span>
                        </div>
                        <div style="width: 100%;height: 40px;">
                            <span style="margin:0 50px 0 13px;padding-left:12px;">代金券营销</span>
                            <i-switch v-model="switct" :true-value='1' :false-value='0' size="large">
                                <span slot="open">ON</span>
                                <span slot="close">OFF</span>
                            </i-switch>
                            <span style="margin:0 0 0 118px;color:#aeaeae;">开启后，客户被推荐后得到一张券，主要用于促进被推荐客户上门使用</span>
                        </div>
                        <div class="volume">
                            <span style="border-right: 1px solid #cccccc;border-left: 1px solid #cccccc;">券类型</span>
                            <span style="width:159px;border-right: 1px solid #cccccc;">券金额</span>
                            <strong style="width:120px;border-right:0;">
                                <settingspopup :disabled = !switct _placeHolder="选择代金券类型 " :_style="{width:'100px'}" :_supplierName="supplierName" v-on:setSupplierName="setSupplier"></settingspopup>
                            </strong>
                            <strong style="width:160px;"><Input :disabled="!switct" v-model="Amount" style="width: 100px;"></Input><em style="margin-left:20px;">元</em></strong>
                            <span style="color:red;" class="err-plchod">{{errname}}</span>
                        </div>
                        <div style="margin-top:40px;" class="seetfooter">
                            <span style="margin:0 55px 0 0;padding-left:40px;"><em style="font-weight:bold;color:red;">*</em>推荐时限</span>
                            <label for="">
                                <Input :maxlength="4" v-model="shixian" placeholder="30" style="width:100px;margin-right:20px;"></Input>
                                天
                            </label>
                            <span style="float:right;width:380px;margin:0 535px 0 0;color:#aeaeae;">被推荐的客户超过推荐时限而未上门登记，变为无效推荐，不计算佣金主要用于防止推荐人占位推荐</span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 提成比例设置 -->
            <div class="BasicSettings">
                <h2>提成比例设置</h2>
                <div class="BasicSettings-main">
                    <p style="margin:0 0 30px 0;">顾客预存时，推荐人没有任何提点。必须在顾客消费项目时，推荐人获得客户实缴金额和使用预存金的提点。</p>
                    <div style="width: 100%;height: 20px;">
                        <span style="margin:0 50px 0 0;padding-left:35px;">佣金提成开关</span>
                        <i-switch v-model="switctt" :true-value='1' :false-value='0' @on-change="shenttwo" size="large">
                            <span slot="open">ON</span>
                            <span slot="close">OFF</span>
                        </i-switch>
                        <span style="margin:0 0 0 150px;color:#aeaeae;">关闭后，推荐顾客上门消费无佣金提成</span>
                    </div>
                    <div v-show="isShowtwo">
                        <div class="seetfooter">
                            <span style="margin:0 53px 0 0;padding-left:30px;"><em style="font-weight:bold;color:red;">*</em>订单折扣低于</span>
                            <label for="">
                                <InputNumber :disabled="!switctt" v-model="discount" style="width:55px;margin-right:10px;"></InputNumber>
                                % 不参与提点
                            </label>
                            <span style="margin:0 0 0 65px;color:#aeaeae;">推荐顾客项目单折扣小于等于此值时，不参与提点</span>
                        </div>
                        <div class="form-one">
                            <h3 style="margin-bottom:15px;">*提成比例</h3>
                            <Table stripe height="150" :columns="columns1" :data="data1"></Table>
                            <label style="width:100%;margin:0 10px 0 30px;" for="">超出统一提点
                                <Input v-model="beyond1" placeholder="" style="width: 120px;margin:6px 0 0 30px;"></Input>
                            </label>
                            <Button @click="tdone" style="margin:15px 0 0 20px;">添加</Button>
                        </div>
                        <div class="form-two">
                            <div style="width: 100%;height: 40px;">
                                <h3 style="float:left;margin:0 50px 0 0;">额外提点</h3>
                                <i-switch v-model="switcttt" :true-value='1' :false-value='0' size="large">
                                    <span slot="open">ON</span>
                                    <span slot="close">OFF</span>
                                </i-switch>
                                <span style="float:right;width:230px;margin:0 0 0 0;color:#aeaeae;">开启后，每产生一笔消费，就会有一笔提成（业绩），这笔提成又额外产生了一笔提成</span>
                            </div>
                            <Table stripe style="float:left;" height="150" :columns="columns2" :data="data2"></Table>
                            <label style="width:100%;margin:6px 10px 0 30px;" for="">超出统一提点
                                <Input v-model="beyond2" placeholder="" style="width: 157px;margin:0 0 0 67px;"></Input>
                            </label>
                            <Button @click="tdtwo" style="margin:15px 0 0 20px;">添加</Button>
                        </div>
                        <p style="float: left;width: 100%;margin-left: 13%;padding:10px 0;color:#aeaeae;">
                            <Icon style="padding:0 10px 0 0;" type="ios-lightbulb-outline"></Icon>超出统一提点说明：级别超过级别提点中设定的范围，都采用统一提点
                        </p>
                    </div>
                </div>
            </div>
            <!-- 会费模式 -->
            <div style="margin-bottom:30px;" class="Member">
                <h2>会费模式</h2>
                <div style="padding: 20px 150px 0 150px;">
                    <span style="margin:0 50px 0 0;padding-left:35px;">如果需要交纳会费才能成为推荐人，请开启会费模式</span>
                </div>
                <div style="padding: 20px 150px 0 150px;height:60px;">
                    <span style="margin:0 50px 0 0;padding-left:35px;">会费模式</span>
                    <i-switch v-model="qwer" :true-value='1' :false-value='0' @on-change="shent" size="large">
                        <span slot="open">ON</span> 
                        <span slot="close">OFF</span>
                    </i-switch>
                    <span style="margin:0 0 0 150px;color:#aeaeae;">开启后，入会需要支付会费才能成为推荐人，享受佣金提点</span>
                </div>
                <!-- 隐藏div -->
                <div v-show="isShow" class="paymentmodel">
                    <div style="padding: 0 100px 0 37px;">
                        <div style="margin:0 0 0 85px;">
                            <span style="color:#aeaeae;">使用会费模式时，需要在系统中预先设置好会费的收费项目</span>
                            <span style="float:left;width:100%;color:#aeaeae;">1、请点击添<em style="">收费项目类型</em>添加会费的项目类型；</span>
                            <span style="float:left;width:100%;color:#aeaeae;">2、添加好会费的项目类型后，请点击<em style="">添加收费项目</em>设置会费项目；</span>
                            <span style="float:left;width:100%;margin:20px 0 20px 0;">如已设置好会费收费项目，请设置会费的项目</span>
                        </div>
                        <strong style="float:left;width:100%;height:50px;"><span style="float:left;margin:5px 30px 0 0;"><em style="font-weight:bold;color:red;">*</em>会费项目</span>
                            <Input style="width:120px;" v-model="chargeName" readonly icon="ios-search" placeholder="选择收费项目" @on-focus="showCharge"></Input>
                            <cmptChargeChoose placeHolder="选择指定项目" @on-change="setCharge" :openKey='chargeOpenKey'></cmptChargeChoose>
                        </strong>
                        <div class="form-one">
                            <h3 style="margin-bottom:15px;">*会费提点</h3>
                            <Table stripe height="150" :columns="columns3" :data="data3"></Table>
                            <label style="width:100%;margin:0 10px 0 30px;" for="">超出统一提点
                                <Input v-model="beyond3" placeholder="" style="width: 120px;margin:6px 0 0 30px;"></Input>
                            </label>
                            <Button @click="tdthree" style="margin:15px 0 0 20px;">添加</Button>
                        </div>
                        <div class="form-two">
                            <div style="width: 100%;height: 40px;">
                                <h3 style="float:left;margin:0 50px 0 0;">额外提点</h3>
                                <i-switch v-model="switctttt" :true-value='1' :false-value='0' size="large">
                                    <span slot="open">ON</span>
                                    <span slot="close">OFF</span>
                                </i-switch>
                                <span style="float:right;width:230px;margin:0 0 0 0;color:#aeaeae;">开启后，每产生一笔消费，就会有一笔提成（业绩），这笔提成又额外产生了一笔提成</span>
                            </div>
                            <Table stripe style="float:left;" height="150" :columns="columns4" :data="data4"></Table>
                            <label style="width:100%;margin:6px 10px 0 30px;" for="">超出统一提点
                                <Input v-model="beyond4" placeholder="" style="width: 157px;margin:0 0 0 67px;"></Input>
                            </label>
                            <Button @click="tdfour" style="margin:15px 0 0 20px;">添加</Button>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            <div style="float:left;width:85%;text-align:center;margin: 0 0 -100px 0;">
                <Button type="primary"  @click="next">保存</Button>
            </div>
		</div>
        <!-- 弹窗 -->
        <Modal
            title="添加"
            v-model="modal10"
            @on-ok="saveLevel"
            class-name="vertical-center-modal">
            <label style="margin-right:50px;" for="">
                级别：
                <span>{{ jibie1 }}</span>
                <!-- <Input v-model="jibie1" placeholder="" style="width: 100px"></Input> -->
            </label>
            <label for="">
                提点(%)：
                <Input v-model="tidian2" placeholder="" style="width: 100px"></Input>
            </label>
        </Modal>
        <Modal
            title="添加"
            v-model="modal11"
            @on-ok="saveLevel2"
            class-name="vertical-center-modal">
            <label style="margin-right:50px;" for="">
                级别：
                <span>{{ jibie11 }}</span>
                <!-- <Input v-model="jibie11" placeholder="" style="width: 100px"></Input> -->
            </label>
            <label for="">
                提点(%)：
            <Input v-model="tidian22" placeholder="" style="width: 100px"></Input>
            </label>
        </Modal>
        <Modal
            title="添加"
            v-model="modal111"
            @on-ok="Add"
            class-name="vertical-center-modal">
            <label style="margin-right:50px;" for="">
                级别：
                <span>{{ level1 }}</span>
                <!-- <Input v-model="level1" placeholder="" style="width: 100px"></Input> -->
            </label>
            <label for="">
                提点(%)：
            <Input v-model="points2" placeholder="" style="width: 100px"></Input>
            </label>
        </Modal>
        <Modal
            title="添加"
            v-model="modal1111"
            @on-ok="eait"
            class-name="vertical-center-modal">
            <label style="margin-right:50px;" for="">
                级别：
                <span>{{ level11 }}</span>
                <!-- <Input v-model="level11" placeholder="" style="width: 100px"></Input> -->
            </label>
            <label for="">
                提点(%)：
            <Input v-model="points22" placeholder="" style="width: 100px"></Input>
            </label>
        </Modal>
	</div>
</template>

<script>
// 引入会费组件
import cmptChargeChoose from 'components/chargeChoose.vue'
import settingspopup from './settingspopup.vue'
export default {
    // 创建标签
    components: {
        cmptChargeChoose,
        settingspopup
    },
    data () {
        return {
            ratefour: '',
            ratethree: '',
            ratetwo: '',
            rateone: '',
            yigezhi: '1',
            errname: '',
            isShowthree: 1,
            isShowtwo: 1,
            isShow: 1,
            level1: 0,
            level11: 0,
            points2: '',
            points22: '',
            setChargeid: null,
            supplierNameid: null,
            jibie1: 0,
            tidian2: '',
            jibie11: 0,
            tidian22: '',
            beyond4: '',
            beyond3: '',
            beyond2: '',
            beyond1: '',
            modal111: false,
            modal1111: false,
            chargeOpenKey: false,
            chargeName: '',
            modal11: false,
            modal10: false,
            discount: 1,
            shixian: '',
            limit: 1,
            register: 1,
            switct: 1,
            switctt: 1,
            switcttt: 1,
            switctttt: 1,
            qwer: 1,
      
            supplierName: '',
            Amount: '',
            columns1: [
                {
                    title: '级别',
                    key: 'level',
                    align: 'center'
                },
                {
                    title: '提点（%）',
                    align: 'center',
                    key:'value',
                    render: (h, params) => {
                        var self = this
                        self.rateone = params.row.rate
                        return h('Input',{
                            props:{
                                disabled : !this.switctt,
                                type :'text',
                                value : params.row.rate
                            },    
                            on:{
                                'on-change' (event) {
                                    console.log('event')
                                    console.log(event) 
                                    //值改变时 
                                    //将渲染后的值重新赋值给单元格值     
                                    params.row.rate = event.target.value;
                                    self.data1[params.index] = params.row;
                                } 
                            }
                        })
                    }
                },
                {
                    title: '操作',
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small',
                                },
                                on: {
                                    click: () => {
                                        this.remove(params.index)
                                    }
                                }
                            }, '删除')
                        ]);
                    }
                }
            ],
            data1: [],
            columns2: [
                {
                    title: '级别',
                    key: 'level',
                    align: 'center'
                },
                {
                    title: '提点（%）',
                    align: 'center',
                    key:'value',
                    render: (h, params) => {
                        var self = this;
                        self.ratetwo = params.row.rate
                        return h('Input',{
                            props:{
                                disabled : !this.switcttt,
                                type:'text',
                                value : params.row.rate
                            },
                            on:{
                                'on-change' (event) {
                                    console.log('event')
                                    console.log(event) 
                                    //值改变时 
                                    //将渲染后的值重新赋值给单元格值     
                                    params.row.rate = event.target.value;
                                    self.data2[params.index] = params.row;
                                } 
                            }
                        })
                    }
                },
                {
                    title: '操作',
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small',
                                },
                                on: {
                                    click: () => {
                                        this.remove2(params.index)
                                    }
                                }
                            }, '删除')
                        ]);
                    }
                }
            ],
            data2: [],
            columns3: [
                {
                    title: '级别',
                    key: 'level',
                    align: 'center'
                },
                {
                    title: '提点（%）',
                    align: 'center',
                    key:'value',
                    render: (h, params) => {
                        var self = this
                        self.ratethree = params.row.rate
                        return h('Input',{
                            props:{
                                type:'text',
                                value: params.row.rate
                            },
                            on:{
                                'on-change' (event) {
                                    console.log('event')
                                    console.log(event) 
                                    //值改变时 
                                    //将渲染后的值重新赋值给单元格值 
                                    params.row.rate = event.target.value;
                                    self.data3[params.index] = params.row;
                                } 
                            }
                        })
                    }
                },
                {
                    title: '操作',
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small',
                                },
                                on: {
                                    click: () => {
                                        this.remove3(params.index)
                                    }
                                }
                            }, '删除')
                        ]);
                    }
                }
            ],
            data3: [],
            columns4: [
                {
                    title: '级别',
                    key: 'level',
                    align: 'center'
                },
                {
                    title: '提点（%）',
                    align: 'center',
                    key:'value',
                    render: (h, params) => {
                        var self = this
                        self.ratefour = params.row.rate
                        return h('Input',{
                            props:{
                                type:'text',
                                disabled : !self.switctttt,
                                value: params.row.rate
                            },
                            on:{
                                'on-change' (event) {
                                    console.log('event')
                                    console.log(event) 
                                    //值改变时 
                                    //将渲染后的值重新赋值给单元格值     
                                    params.row.rate = event.target.value;
                                    self.data4[params.index] = params.row;
                                } 
                            }
                        })
                    }
                },
                {
                    title: '操作',
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small',
                                },
                                on: {
                                    click: () => {
                                        this.remove4(params.index)
                                    }
                                }
                            }, '删除')
                        ]);
                    }
                }
            ],
            data4: []
        }
    },
    created() {
        this.$store.dispatch('setPageLoading', 1)
        this.setting()
    },
    methods: {
        tdone() {
            this.jibie1 =  this.data1.length + 1;
            this.tidian2 = ''
            this.modal10 = true
        },
        tdtwo() {
            this.jibie11 =  this.data2.length + 1;
            this.tidian22 = ''
            this.modal11 = true
        },
        tdthree() {
            this.level1 =  this.data3.length + 1;
            this.points2 = ''
            this.modal111 = true
        },
        tdfour() {
            this.level11 =  this.data4.length + 1;
            this.points22 = ''
            this.modal1111 = true
        },
        setting() {
            var self = this
            self.$store.dispatch('setPageLoading', -1)
            self.$http.get({
                url: '/guard-webManager/wxOption/list.jhtml',
                data: {},
                success: function(res) {
                    self.supplierNameid = res.data.content.PromoteCouponCategoryId
                    self.setChargeid = res.data.content.PromoteMembershipCategoryId
                    self.limit = res.data.content.PromoterNotCustomer
                    if(res.data.content.PromoterNotCustomer == 1) {
                        self.limit = 1
                    } else if (res.data.content.PromoterNotCustomer == 0) {
                        self.limit = 0
                    }
                    self.switct = res.data.content.PromoteCouponStatus
                    if(res.data.content.PromoteCouponStatus == 1) {
                        self.switct = 1
                    } else if (res.data.content.PromoteCouponStatus == 0) {
                        self.switct = 0
                    }
                    self.switcttt = res.data.content.PromoteExtralevelStatus
                    if(res.data.content.PromoteExtralevelStatus == 1) {
                        self.switcttt = 1
                    } else if (res.data.content.PromoteExtralevelStatus == 0) {
                        self.switcttt = 0
                    }
                    self.switctttt = res.data.content.PromoteExtralevelOpen
                    if(res.data.content.PromoteExtralevelOpen == 1) {
                        self.switctttt = 1
                    } else if (res.data.content.PromoteExtralevelOpen == 0) {
                        self.switctttt = 0
                    }
                    self.register = res.data.content.PromoterStatus
                    if(res.data.content.PromoterStatus == true) {
                        self.register = 1
                        self.isShowthree = true
                    } else if(res.data.content.PromoterStatus == false) {
                        self.register = 0
                        self.isShowthree = false
                    }
                    // 提成
                    self.switctt = res.data.content.PromoteCommissionStatus
                    if(res.data.content.PromoteCommissionStatus == 1) {
                        self.switctt = 1
                        self.isShowtwo = true
                    } else if (res.data.content.PromoteCommissionStatus == 0) {
                        self.switctt = 0
                        self.isShowtwo = false
                    }
                    // 会费
                    self.qwer = res.data.content.PromoteMembershipStatus
                    if(res.data.content.PromoteMembershipStatus == 1) {
                        self.qwer = 1
                        self.isShow = true
                    } else if (res.data.content.PromoteMembershipStatus == 0) {
                        self.qwer = 0
                        self.isShow = false
                    }
                    self.beyond1 = res.data.content.OverMaxRate
                    self.beyond2 = res.data.content.OverMaxExtraRate
                    self.beyond3 = res.data.content.PromoteOverMaxMembershipRate
                    self.beyond4 = res.data.content.PromoteOverMaxMembershipExtraRate
                    self.Amount = res.data.content.PromoteCouponAmount
                    self.supplierName = res.data.content.PromoteCouponCategory
                    self.chargeName = res.data.content.PromoteMembershipCategory
                    self.shixian = res.data.content.ValidDays
                    self.discount = res.data.content.PromoteDiscount
                    console.log('discount')
                    console.log(res.data.content.PromoteLevelList.length)
                    // 提成比例提成比例
                    self.data1 = res.data.content.PromoteLevelList
                    console.log('d')
                    console.log(res.data.content.PromoteLevelList.length)
                    // 额外提点
                    self.data2 = res.data.content.PromoteExtraLevelList
                    self.data4 = res.data.content.SmartPromoteMembershipExtraLevelList
                    // 会费提点
                    self.data3 = res.data.content.PromoteMembershipLevelList
                    console.log('a')
                    console.log(res)
                    console.log('b')
                    self.$store.dispatch('setPageLoading', 1)
                }
            })
        },
        // 一定要保证有值别传空，传空list接口就会报错
        // 保存
        next () {
            var regu = /^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/; // 正则匹配
            const regu1 = /^([1-9][\d]{0,7}|0)?$/;
            if(this.register == 0) {
                this.Amount = '0'
                this.shixian = '0'
            }
            if(this.switctt == 1) {
                if(this.switcttt == 1) {
                    if (this.data2 == '' || !regu.test(this.ratetwo) || this.ratetwo == 0 || this.ratetwo > 100) {
                        this.$Message.error('请添加额外提点或输入错误,请重新输入')
                        return false;
                    }
                }
                if (this.data1 == '' || !regu.test(this.rateone) || this.rateone == 0 || this.rateone > 100) {
                    this.$Message.error('请添加提成比例或输入错误,请重新输入')
                    return false;
                }
            } else if (this.switctt == 0) {
                this.discount = '0'
                this.beyond1 = '1'
                this.beyond2 = '1'
            }
            if(this.qwer == 1) {
                if(this.switctttt == 1) {
                    if (this.data4 == '' || !regu.test(this.ratefour) || this.ratefour == 0 || this.ratefour > 100) {
                        this.$Message.error('请添加额外提点或输入错误,请重新输入')
                        return false;
                    }
                }
                if (this.data3 == '' || !regu.test(this.ratethree) || this.ratethree == 0 || this.ratethree > 100) {
                    this.$Message.error('请添加会费提点或输入错误,请重新输入')
                    return false;
                } 
            } else if (this.qwer == 0) {
                this.beyond3 = '1'
                this.beyond4 = '1'
            }
            if(this.Amount == '' || !regu.test(this.Amount) || this.Amount == 0) {    
                this.$Message.error('请填写券金额或输入错误,请重新输入')
                return false;
            } 
            else if(this.shixian == '' || !regu1.test(this.shixian)) {
                this.$Message.error('请填写推荐时限或输入错误,请重新输入')
                return false;
            }
            else if(this.discount == null || !regu.test(this.discount)) {
                this.$Message.error('请填写订单折扣或输入错误,请重新输入')
                return false;
            }
            else if (this.beyond1 == null || !regu.test(this.beyond1) || this.beyond1 == 0 || this.beyond1 > 100) {
                this.$Message.error('请填写超出统一提点或输入错误,请重新输入')
                return false;
            } 
            else if (this.beyond2 == null || !regu.test(this.beyond2)  || this.beyond2 == 0|| this.beyond2 > 100) {
                this.$Message.error('请填写超出统一提点或输入错误,请重新输入')
                return false;
            } 
            else if (this.beyond3 == null || !regu.test(this.beyond3) || this.beyond3 > 100) {
                this.$Message.error('请填写超出统一提点或输入错误,请重新输入')
                return false;
            } 
            else if (this.beyond4 == null || !regu.test(this.beyond4) || this.beyond4 > 100) {
                this.$Message.error('请填写超出统一提点或输入错误,请重新输入')
            } 
            else {
                var self = this
                self.$http.post({
                    url: '/guard-webManager/wxOption/update.jhtml',
                    data: {
                        promoterOpen : self.register,
                        promoterNotCustomer : self.limit,
                        promoteGiveCoupon : self.switct,
                        couponCategoryId : self.supplierNameid,
                        amount1 : self.Amount,
                        days : self.shixian,
                        promoteCommissionOpen : self.switctt,
                        amount2 : self.discount,
                        detailListStr1: JSON.stringify(self.data1.map(item => {
                            return {
                                level: item.level,
                                rate: item.rate
                            }
                            
                            // self.tidian2 = item.rate
                        })),
                        amount3 : self.beyond1,
                        promoteExtralevelOpen : self.switcttt,
                        detailListStr2 : JSON.stringify(self.data2.map(item => {
                            return {
                                level: item.level,
                                rate: item.rate
                            }
                        })),
                        amount4 : self.beyond2,
                        promoteMembershipOpen : self.qwer,
                        membershipCategoryId : self.setChargeid,
                        detailListStr3 : JSON.stringify(self.data3.map(item => {
                            return {
                                level: item.level,
                                rate: item.rate
                            }
                        })),
                        amount5 : self.beyond3,
                        promoteMembershipExtraOpen : self.switctttt,
                        
                        detailListStr4 : JSON.stringify(self.data4.map(item => {
                            return {
                                level: item.level,
                                rate: item.rate
                            }
                        })),
                        amount6 : self.beyond4
                    },
                    success (res) {
                        console.log('保存')
                        console.log(res)
                        self.setting()
                        self.$Message.success('保存成功');    
                    }
                })      
            }
        },
        setSupplier(data) {
            // consoloe.log('asdasdsadasd')
            // console.log(data)
            this.supplierNameid = data.id
            // this.formSearch1.supplierId = data.id
            this.supplierName = data.name
        },
        // 开关div隐藏出现
        shent() {
            if (this.qwer == 1) {
                this.isShow = true
            } else if (this.qwer ==0) {
                this.isShow = false
            }
        },
        shenttwo() {
            if (this.switctt == 1) {
                this.isShowtwo = true
            } else if (this.switctt ==0) {
                this.isShowtwo = false
            }
        },
        shentthree() {
            if (this.register == 1) {
                this.isShowthree = true
            } else if (this.register ==0) {
                this.isShowthree = false
            }
        },
        showCharge () {
            this.chargeOpenKey = !this.chargeOpenKey;
        },
        setCharge (data) {
            this.setChargeid = data.id
            this.chargeName = data.name
        },
        // data1删除
        remove (index) {
            this.data1.splice(index, 1);
            this.data1.map((item,index) => {
                item.level = index + 1
            })
        },
        // data1添加
        saveLevel (data1) {
            this.data1.push({
                level: this.jibie1,
                rate: this.tidian2
            });
        },
        // data2删除
        remove2 (index) {
            this.data2.splice(index, 1);
            this.data2.map((item,index) => {
                item.level = index + 1
            })
        },
        // data2添加
        saveLevel2 (data2) {
            this.data2.push({
                level: this.jibie11,
                rate: this.tidian22
            });
        },
        // data3删除
        remove3 (index) {
            this.data3.splice(index, 1)
            this.data3.map((item,index) => {
                item.level = index + 1
            })
        },
        // data3添加
        Add(data3) {
            this.data3.push({
                level: this.level1,
                rate: this.points2
            })
        },
        // data4删除
        remove4 (index) {
            this.data4.splice(index, 1)
            this.data4.map((item,index) => {
                item.level = index + 1
            })
        },
        // data4添加
        eait(data4) {
            this.data4.push({
                level: this.level11,
                rate: this.points22
            })
        }
    }
}
</script>
<style lang='less' scoped>
.container-body-main {
    h2 {
        width: 100%;
        height: 40px;
        font-size: 18px;
        padding-left: 20px;
        line-height: 40px;
        border-bottom: 1px solid #cccccc;
    }
    .BasicSettings {
        float: left;
        width: 100%;
        margin-top: 30px;
        border: 1px solid #cccccc;
        border-radius: 5px;
        .BasicSettings-main {
            padding: 20px 150px 20px 150px;
            .ivu-switch-large {
                width: 59px;
            }
        }
        button {
            color: white;
            background-color: #678ef8;
        }
        .volume {
            float: none;
            width: 300px;
            height: 90px;
            margin: 10px 0 0 150px;
            span {
                float: left;
                width: 121px;
                font-size: 14px;
                font-weight: bold;
                line-height: 35px;
                text-align: center;
                border-top: 1px solid #cccccc;
                background: #f2f2f2;
            }
            strong {
                float: left;
                width: 99px;
                padding: 10px;
                border: 1px solid #cccccc;
            }
        }
        .seetfooter {
            float:left;
            width: 100%;
            height: 40px;
            margin-top: 20px;
        }
        .form-one {
            float: left;
            width: 24%;
            margin: 0 50px 0 163px;
        }
        .form-two {
            float: left;
            width: 40%;
        }
    }
    .Member {
        float: left;
        width: 100%;
        margin-top: 30px;
        border: 1px solid #cccccc;
        border-radius: 5px;
        h2 {
            width: 100%;
            height: 40px;
            padding-left: 20px;
            line-height: 40px;
            border-bottom: 1px solid #cccccc;
        }
                button {
            color: white;
            background-color: #678ef8;
        }
        .paymentmodel {
            width: 100%;
            height: 500px;
            padding: 20px 150px 0 150px;
            .form-one {
                float: left;
                width: 30%;
                margin: 0 50px 0 85px;
            }
            .form-two {
                float: left;
                width: 45%;
            }
        }
    }
}
</style>