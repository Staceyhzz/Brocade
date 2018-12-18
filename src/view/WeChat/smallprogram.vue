/** * 小程序设置 */
<template>
	<div class="container-box">
		<div class="container-header">
		<h2>小程序设置</h2>
		</div>
		<div class="Member">
			<h2>接入小程序</h2>
            <div style="padding: 20px 150px 40px 150px;">
                <!-- <div style="float:left;width:100%;">
                    <img src="static/img/favicon.ico" alt="">
                    <span style="width:80%;margin-top:15px;">锦医卫服务中心A</span>
                    <span style="width:15%;color:#00cc66;">·正常</span>
                    <a style="float:left;color:#169bd5;" href="">更换公众号</a>
                </div> -->
                <p style="float:left;">接入后，可给顾客提供账户余额、券、积分查询及项目治疗预约功能</p>
                <button @click="modal11 = true">接入悦完美小程序</button>
                <p style="float:left;color:#a1a1a1;margin-bottom:20px;padding:0;">接入流程（需要公众号和小程序管理员双方确认）：</p>
                <ul>
                    <li>1.平台调用接口发起关联</li>
                    <li>2 公众号管理员收到模板消息，同意关联小程序。</li>
                    <li>3.小程序管理员收到模板消息，同意关联公众号。</li>
                    <li>4.关联成功</li>
                </ul>
            </div>
		</div>
        <div style="margin-bottom:30px;" class="Member">
            <h2>小程序管理</h2>
            <div style="width:100%;padding: 20px 150px 0 150px;">
                <ul>
                    <li v-for="(rab, index) in table" :key="index">
                        <img :src="rab.image" alt="">
                        <span style="width:80%;margin-top:15px;">{{ rab.fuwu }}</span>
                        <span style="width:15%;color:#00cc66;">{{ rab.stadius }}</span>
                        <a @click="modal10 = true" style="float:left;color:#169bd5;" href="javascript:void(0);">{{ rab.Relieve }}</a>
                    </li>
                </ul>
            </div>
        </div>
        <Modal title="解除绑定" v-model="modal10" class-name="vertical-center-modal">
            <p>确定解除绑定{{ jiechu }}吗？</p>
        </Modal>
        <Modal ok-text='提交申请' cancel-text='返回' title="关联悦完美小程序" v-model="modal11" class-name="vertical-center-modal">
            <p>APPID：{{ appid }}</p>
            <div style="width:300px;margin:20px 0 20px 0;padding:20px;border:1px solid #e8e7eb;">
                <img style="margin: 0 10px 0 0;" src="static/img/logo2.png" alt="">
                <span>悦完美</span>
            </div>
            <CheckboxGroup style="margin:0 0 0 30px;" v-model="fruit">
                <Checkbox style="width:100%;" label="香蕉">关联后展示在公众号资料页</Checkbox>
                <Checkbox label="苹果">关联后给已关注公众号的用户发送通知</Checkbox>
            </CheckboxGroup>
        </Modal>
	</div>
</template>

<script>
export default {
    data() {
      	return {
            fruit: ['苹果'],
            appid: 'wx3bf33f34a706f917',
            jiechu: 'XXXXXXX',
            modal10: false,
            modal11: false,
            table: [
                {
                    image: 'static/img/favicon.ico',
                    fuwu: '锦医卫服务中心A',
                    Relieve: '解除绑定',
                    stadius: '·正常'
                },
            ]
      	}
    },
    created() {
    
    },
    methods: {

    }
}

</script>
<style lang='less' scoped>
.container-box {
    h2 {
        width: 100%;
        height: 40px;
        font-size: 18px;
        padding-left: 20px;
        line-height: 40px;
        border-bottom: 1px solid #cccccc;
    }
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
		width: 250px;
		height: 40px;
		// margin-top: 30px;
		cursor: pointer;
		color: white;
		outline: none;
		border: #169bd5;
		border-radius: 5px;
		background: #169bd5;
	}
	button:active {
		background: #1291c9;
    }
    p {
        width: 100%;
        margin-top: 30px;
        padding: 0 0 20px 0;
    }
    .Member {
        float: left;
        width: 100%;
        margin-top: 30px;
        border: 1px solid #cccccc;
        border-radius: 5px;
        background-color: white;
        h2 {
            width: 100%;
            height: 40px;
            padding-left: 20px;
            line-height: 40px;
            border-bottom: 1px solid #cccccc;
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
        li {
            color: #a1a1a1;
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
    }
}
</style>