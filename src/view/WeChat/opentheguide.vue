/** * 开启引导 */
<template>
	<div class="container-box">
		<div class="container-header">
		<h2>微信分销</h2>
		</div>
		<div class="container-body">
			<span>如您需要使用微信分销，您需要做如下准备:</span>
			<ul>
				<li>1、注册微信公众号，用于推荐人登记顾客；<span @click="tiaozhuan" style="cursor: pointer;color:blue;">前往注册</span></li>
				<li>2、注册悦完美小程序，提供顾客查询和预约，联系锦医卫客服注册；</li>
				<li>3、开启会费模式时，需要在系统中预先设置好会费的收费项目，详见“设置”；</li>
			</ul>
			<h3>准备好后，点击“开启微信分销”按钮，引导开启</h3>
			<router-link to="/wxstep">
				<button>开启微信分销</button>
			</router-link>
		</div>
	</div>
</template>

<script>
export default {
    data() {
      	return {

      	}
    },
    created() {
		this.$store.dispatch('setPageLoading', 1)
    },
    methods: {
		tiaozhuan() {
			window.open("https://mp.weixin.qq.com/cgi-bin/registermidpage?action=index&lang=zh_CN")
		}
    }
}

</script>
<style lang='less' scoped>
.container-body {
	ul li {
		width: 100%;
		font-size: 18px;
	}
	ul li:nth-child(1) {
		margin-top: 20px;
	}
	span {
		font-size: 18px;
	}
	h3 {
		margin-top: 50px;
	}
	button {
		width: 140px;
		height: 40px;
		margin-top: 30px;
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
}
</style>