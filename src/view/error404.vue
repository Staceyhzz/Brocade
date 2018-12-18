/** 
 * 404页面 
 */

<template>
  <div class="container-box error-view">
    <div class="container-header">
      <h2>系统提示</h2>
    </div>
    <div class="container-body">
			<div class="box">
				<div class="error">
					<h3>请确认当前地址是否正确或者联系管理员查询当前权限！</h3>
					<div>
						<Button type="primary" icon="android-arrow-back" @click='back'>返回</Button>
					</div>
				</div>
			</div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
      }
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        let breadData = [
          {
            url: '/desktop',
            text: 'layoutNav.desk'
          },
          {
            url: '/error404',
            text: 'error404'
          }
        ];
        vm.$store.dispatch('setBreadData', breadData);
        console.log('进入404之前')
      });
    },
    created() {
      console.log('进入404')
      this.$store.dispatch('setPageLoading', 1);
    },
    methods: {
      back() {
        this.$router.go(-1);
      }
    }
  }

</script>
