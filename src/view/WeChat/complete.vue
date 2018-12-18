/** * 完成 */
<template>
	<div class="container-box">
		<div class="container-header">
		<h2>完成</h2>
		</div>
		<div class="container-body">
            <img style="margin-bottom:20px;" src="static/img/wancheng.png" alt="">
			<span style="display:block;width:100%;margin-bottom:20px;">微信分销已开启</span>
            <span style="display:block;">向您的顾客和推荐人推广公众号吧~</span>
            <ul>
                <li>公众号可以</li>
                <li>1、推荐人进行客户推荐工作；</li>
                <li>2、顾客可进行账户查询和项目预约；</li>
            </ul>
			<!-- <router-link to="/wechatsettings">
				<button>完成</button>
			</router-link> -->
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
    
    },
    methods: {

    }
}

</script>
<style lang='less' scoped>
.container-body {
	box-shadow: none;
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
		width: 100px;
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