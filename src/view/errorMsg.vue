/** 
 * 错误页面 
 */

<template>
  <div class="container-box error-view">
    <div class="container-header">
      <h2>系统提示</h2>
    </div>
    <div class="container-body">
			<div class="box">
				<div class="error">
          <h3>{{errorMsg}}</h3>
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
        errorMsg: ''
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
            url: '/errorMsg',
            text: 'error'
          }
        ];
        vm.$store.dispatch('setBreadData', breadData);
      });
    },
    created() {
      this.errorMsg = sessionStorage.getItem('httpErrorMsg');
      this.$store.dispatch('setPageLoading', 1);
    },
    methods: {
      back() {
        this.$router.go(-2);
      }
    }
  }

</script>
