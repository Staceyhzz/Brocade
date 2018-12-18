/** * 微信公众号设置 */
<template>
	<div class="container-box">
		<div class="container-header">
		<h2>微信公众号设置</h2>
		</div>
        <div style="float:left;box-shadow: 0 7px 14px 0 rgba(255, 255, 255, 0.1);" class="container-body">
		<div class="Member">
			<h2>绑定微信公众号</h2>
            <div style="padding: 20px 150px 0 150px;">
                <p>1、绑定后你可以使用锦医卫管理微信公众号，可进行素材管理、菜单管理、自动回复消息设置等更多功能</p>
                <button @click="button">去微信平台授权绑定</button> 
                <p>2、请输入获取到的APPID，进行绑定</p>
                <Form ref="formValidat" :model="formValidat" :rules="rule" :label-width="65">
                    <FormItem label="APPID" prop="wxappid">
                        <Input style="width:150px;" v-model="formValidat.wxappid"></Input>
                    </FormItem>
                </Form>
                <button @click="baocun">保存</button>
                <p>你的公众号必须是认证过的微信订阅号或服务号，绑定后，你之前设置好的菜单、自动回复等功能仍然有效</p>
            </div>
		</div>
        <div style="margin-bottom:30px;" class="Member">
            <h2>微信公众号管理</h2>
            <div style="float:left;width:100%;padding: 20px 150px 30px 150px;">
                <div style="">
                    1、请先填写外网域名
                    <button @click="modaww = true" style="width:100px;height:30px;font-size:14px;line-height:30px;margin:20px 400px 0 0;background: #169bd5;">外网域名</button>
                </div>
                <ul>
                    <li style="float:left;" v-for="(rab, index) in table" :key="index">
                        <div style="float:left;width:500px;">
                        <img :src="rab.headimg" alt="">
                        <span style="float:left;margin-top:15px;">{{ rab.nickname }}<strong style="margin:0 30px;">|</strong><strong style=" color: #a1a1a1">认证</strong>
                        <p style="margin:0;color:#82db3f;">正常</p></span>
                        </div>
                        <div class="meumain">
                            <strong @click="sucai(index)">素材管理</strong>
                            <strong @click="meu(index)">微信菜单</strong>
                            <strong @click="reply(index)">自动回复</strong>
                            <strong @click="unbind(index)">解除绑定</strong>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <Modal
            title="配置你的域名"
            v-model="modaww"
            @on-ok="url"
            class-name="vertical-center-modal">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <FormItem label="域名" prop="name">
                    <Input v-model="formValidate.name" placeholder="请输入域名"></Input>
                </FormItem>
            </Form>
        </Modal>
        <Modal
            title="解除绑定"
            v-model="modal10"
            @on-ok="jiechu"
            class-name="vertical-center-modal">
            <p>确定解除绑定{{ hostpp }}吗？</p>
        </Modal>
        </div>

	</div>
</template>

<script>
export default {
    data() {
      	return {
            hostpp: '',
            hostp: '',
            jiebangid: '',
            modal10: false,
            formValidat: {
                wxappid: '',
            },
            rule: {
                wxappid: [
                    { required: true, message: '请输入appid', trigger: 'blur' }
                ],
                
            },
            formValidate: {
                name: ''
            },
            ruleValidate: {
                name: [
                    { required: true, message: '请输入域名', trigger: 'blur' }
                ],
            },
            modaww: false,
            tyid: '',
            table: [],
            appid: '',
      	}
    },
    created() {
        this.getappid()
        this.urlddata()
        this.wxauth()
    },
    methods: {
        getappid() {
            var self = this
			self.$http.post({
				url: '/guard-webManager/OpenWx/getappid.jhtml',
				data: {},
				success: function (res) {
                    console.log('APPID')
                    console.log(res)
                    self.formValidat.wxappid = res.data.content
                    console.log('wxappid')
                    console.log(self.formValidat.wxappid)
				}
			})	
        },
        baocun() {
            var self = this
			self.$http.post({
				url: '/guard-webManager/OpenWx/saveappid.jhtml',
				data: {
                    publicNumberAppid : self.formValidat.wxappid + ';'
                },
				success: function (res) {
                    self.wxauth()
                    if(res.data.code === 0) {
                        self.getappid()
                        alert('保存成功')
                    }
                    
				}
			})	
        },
        urlddata() {
            var self = this
			self.$http.get({
				url: '/guard-webManager/wxOption/optionlist.jhtml',
				data: {
				},
				success: function (res) {
                    console.log('url地址')
                    console.log(res)
                    self.formValidate.name = '';
                    self.$store.dispatch('setPageLoading', 1);
				}
			})	
        },
        url() {
            var self = this
            var reg= /(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
            if(!reg.test(self.formValidate.name)){
                self.$Message.error('请配置正确的域名');
            }
            else{
                self.$http.post({
                    url: '/guard-webManager/wxOption/updateurl.jhtml',
                    data: {
                        url : self.formValidate.name
                    },
                    success: function(res) {
                        console.log('asdasdssadasd')
                        console.log(res)
                        self.urlddata()
                        self.$Message.success('配置成功');
                    },
                })  
            }
        },
        button() {
            // window.open("http://qyy.4kb.cn/guard-webManager/OpenWx/index") 
            window.open("https://weixin.easyhrp.com/guard-webManager/OpenWx/index") 
        },
        // 列表
        wxauth() {
            setTimeout(() => {
                var self = this
                console.log('wxappid2')
                console.log(self.formValidat.wxappid)
                // self.$store.dispatch('setPageLoading', -1)
                self.$http.get({
                    url: '/guard-webManager/OpenWx/list',
                    data: {
                        appid : self.formValidat.wxappid
                    },
                    success: function(res) {
                        console.log('列表')
                        console.log(res)
                        self.table = res.data.content.content
                        self.appid = res.data.content.content.map(item => item.appid)
                        self.hostp = res.data.content.content.map(item => item.nickname)
                        console.log('列表appid')
                        console.log(self.appid)
                        // self.$store.dispatch('setPageLoading', 1)
                    }
                })
            }, 1000)
        },
        // 解除绑定
        unbind(index) {
            this.modal10 = true
            this.jiebangid = this.appid[index]
            this.hostpp = this.hostp[index]
        },
        jiechu() {
            var self = this
            self.$http.get({
                url: '/guard-webManager/OpenWx/quxiao',
                data: {
                    appid : self.jiebangid
                },
                success: function(res) {
                    self.wxauth()
                    self.$Message.success('解绑成功');
                }
            })
        },
        // 微信菜单
        meu(index) {
            console.log('222')
            console.log(this.appid[index])
            console.log('222')
            this.$router.push({
                path: '/wechatmenu',
                query: {
                    id: this.appid[index],
                }
			})
        },
        // 素材管理
        sucai(index) {
            console.log('111')
            console.log(this.appid[index])
            console.log('222')
            this.$router.push({
                path: '/materialmanagement',
                query: {
                    id: this.appid[index],
                }
			})
        },
        // 自动回复
        reply(index) {
            console.log('222')
            console.log(this.appid[index])
            console.log('222')
            this.$router.push({
                path: '/automaticreply',
                query: {
                    id: this.appid[index],
                }
			})
        }
    }
}

</script>
<style lang='less' scoped>
.container-box {
	ul li {
		width: 100%;
	}
	ul li:nth-child(1) {
		margin-top: 20px;
	}
	a {
		color: blue;
	}
	h3 {
		margin-top: 50px;
    }
    button {
        display: block;
        width: 250px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        cursor: pointer;
        color: white;
        outline: none;
        border: #169bd5;
        border-radius: 5px;
        background: #169bd5;
    }
	.mea:active {
		background: #1291c9;
    }
    p {
        width: 392px;
        margin-top: 30px;
        padding: 0 0 30px 0;
    }
    .Member {
        float: left;
        width: 1752.47px;
        margin-top: 30px;
        border: 1px solid #cccccc;
        border-radius: 5px;
        background-color: white;
        li {
            border-bottom: 1px solid #c9c9c9;
        }
        h2 {
            width: 100%;
            height: 40px;
            font-size: 18px;
            padding-left: 20px;
            line-height: 40px;
            border-bottom: 1px solid #cccccc;
        }
        img {
            float: left;
            width: 60px;
            height: 60px;
            margin-right: 10px;
        }
        span {
            float: left;
            // width:100%;
        }
        .paymentmodel {
            display: none;
            width: 100%;
            height: 410px;
            padding: 20px 150px 0 150px;
            .form-one {
                float: left;
                width: 390px;
                margin: 0 50px 0 85px;
            }
            .form-two {
                float: left;
                width: 500px;
            }
        }
    }
    .meumain {
        float: right !important;
        // width: 500px;
        margin: 15px 0 0 0;
    }
    .meumain strong {
        font-size: 14px;
        margin-right: 50px;
        color: #169bd5;
    }
}
</style>