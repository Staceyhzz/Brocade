/** * 开启引导 */
<template>
	<div class="container-box">
		<div class="container-header">
		    <h2>开启分销</h2>
		</div>
        <!-- 步骤条 -->
		<div class="container-body">
            <Steps :current="current">
                <Step title="基础设置"></Step>
                <Step title="微信公众号设置"></Step>
                <Step title="小程序关联"></Step>
                <Step title="完成"></Step>
            </Steps>
            <!-- 基础设置 -->
            <div style="float:left;width:100%;margin:0 0 0 0;">
                <wechatsettings v-show = "current == 0"></wechatsettings>
                <wechatpublicnumber v-show = "current == 1"></wechatpublicnumber>
                <smallprogram v-show = "current == 2"></smallprogram>
                <complete v-show = "current == 3"></complete>
                <router-view></router-view>
            </div>
            <div style="width:100%;text-align:center;margin:0 0 0 0;">
                <Button style="margin: 0 30px 0 0;" type="primary" @click="back" v-if="show">上一步</Button>
                <Button type="primary" @click="step">{{ dowm }}</Button>
            </div>
	    </div>
	</div>
</template>

<script>
import wechatsettings from 'view/WeChat/wechatsettings.vue'
import wechatpublicnumber from 'view/WeChat/wechatpublicnumber.vue'
import smallprogram from 'view/WeChat/smallprogram.vue'
import complete from 'view/WeChat/complete.vue'
export default {
    // 创建标签
    components: {
        wechatsettings,
        wechatpublicnumber,
        smallprogram,
        complete
    },
    data () {
        return {
            dowm: '下一步',
            show: false,
            current: 0,
        }
    },
    created() {
        this.$store.dispatch('setPageLoading', 1)
    },
    methods: {
        step() {
            
            // 判断步骤跳转
            if (this.current == 0) {
                this.show = true
                console.log('a')
            } 
            if (this.current == 1) {
                console.log('b')
            }
            if (this.current == 2) {
                this.dowm = "完成"
                this.show = false
                console.log('c')
            }
            if (this.current == 3) {
                this.current = 0;
                this.dowm = "下一步"
                this.show = false
            }
            else {
                this.current += 1;
            }
        },
        // 判断返回
        back() {
            this.current -= 1;
            if(this.current == 0) {
                this.show = false
            }
            if(this.current == 1) {
                console.log('1')
            }
        }
    }
}
</script>
<style lang='less' scoped>
.container-body {
    width: 1852.47px;
}
</style>