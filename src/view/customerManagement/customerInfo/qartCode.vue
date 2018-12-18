/** 
 * 生成二维码页面 
 */

<template>
  <div class="container-box userPower">
    <div class="container-header">
      <h2>{{$t('cusNavList.barCode')}}</h2>
    </div>
    <div class="container-body">
      <cmptVueQArt :config="config" :downloadButton="downloadButton" style='textAlign:center'></cmptVueQArt>
      <p style='textAlign:center'>{{$t('qartCode.msg')}}</p>
      <div class="footer-btnGroup">
        <Button type="primary" icon="android-arrow-back" @click='back'>{{$t('publicSet.back')}}</Button>
      </div>
    </div>
  </div>
</template>

<script>
  import cmptVueQArt from 'components/vueQArt.vue';
  export default {
    components: {
      cmptVueQArt
    },
    data() {
      return {
        config: {
          value: '',
          imagePath: require('assets/img/logo.png'),
          filter: 'color',
          size: 500,
        },
        downloadButton: false,
      }
    },
    created() {
      this.config.value = sessionStorage.getItem('cusId');
    },
    mounted() {
      this.$store.dispatch('setPageLoading', 1);
    },
    methods: {
      back() {
        this.$router.back(-1);
      }
    }
  }

</script>
