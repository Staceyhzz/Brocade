/** * 基础设置 */
<template>
	<div class="container-box">
		<div class="container-header">
		<h2>基础设置</h2>
		</div>
		<div class="container-body">
            <Row>
                <Col class="" span="24">
                    <div class="top">
                        <h2 class="shezhi">基础设置</h2>
                        <Row>
                            <Col style="text-align: right;" span="9">
                                <span style="font-size:18px;margin:0 30px 0 0;">推荐人注册</span>                
                                <i-switch v-model="register" :true-value='1' :false-value='0' @on-change="shentthree" size="large">
                                    <span slot="open">NO</span>
                                    <span slot="close">OFF</span>
                                </i-switch>  
                            </Col>
                            <Col span="15">
                                <span style="font-size:18px;float:left;margin:0 0 0 9%;color:#aeaeae;">开启后，用户可以在微信中注册成为推荐人</span>
                            </Col>
                        </Row>
                        <Row style="margin-top: 20px;">
                            <Col style="text-align: right;" span="9">
                                <span style="font-size:18px;margin:0 30px 0 0;">推荐人注册</span>                
                                <i-switch v-model="register" :true-value='1' :false-value='0' @on-change="shentthree" size="large">
                                    <span slot="open">NO</span>
                                    <span slot="close">OFF</span>
                                </i-switch>  
                            </Col>
                            <Col span="15">
                                <span style="font-size:18px;float:left;margin:0 0 0 9%;color:#aeaeae;">开启后，用户可以在微信中注册成为推荐人</span>
                            </Col>
                        </Row>
                                                <Row style="margin-top: 20px;">
                            <Col style="text-align: right;" span="9">
                                <span style="font-size:18px;margin:0 30px 0 0;">推荐人注册</span>                
                                <i-switch v-model="register" :true-value='1' :false-value='0' @on-change="shentthree" size="large">
                                    <span slot="open">NO</span>
                                    <span slot="close">OFF</span>
                                </i-switch>  
                            </Col>
                            <Col span="15">
                                <span style="font-size:18px;float:left;margin:0 0 0 9%;color:#aeaeae;">开启后，用户可以在微信中注册成为推荐人</span>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
		</div>
	</div>
</template>

<script>
export default {
    data() {
      	return {
            register: 1,
      	}
    },
    created() {
    },
    methods: {
    }
}

</script>
<style lang='less' scoped>
.container-body {
    .top {
        height: 470px;
        border-radius: 5px;
        border: 1px solid #cccccc;
    }
    .shezhi {
        height: 38px;
        padding: 0 0 0 20px;
        line-height: 38px;
        font-size: 18px;
        border-bottom: 1px solid #cccccc;
    }
}
</style>