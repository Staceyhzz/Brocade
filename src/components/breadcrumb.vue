<template>
  <div class="layout-breadcrumb">
    <ul>
      <li v-for="(nav, index) in breadData" :key='index' :data-url="nav.url" :data-index="index" @click="toggleNav(nav.url, index)" class="bread-item"><span>{{setLangText(nav.text)}}</span></li> 
    </ul>
    <Button type="primary" size="small" @click='setLangData' v-if='langKey === 1'>译</Button>
  </div>
</template>

<script>
  export default {
    name: 'layoutBreadcrumb',
    props: ['title'],
    data() {
      return {
        lang: 'zh',
      }
    },
    watch: {
      title(val) {
        if(window.sessionStorage[val]) {
          const _breadData = JSON.parse(window.sessionStorage[val]);
          this.$store.dispatch('setBreadData', _breadData);
        }
      }
    },
    mounted: function(){
      console.log(this.title +'组件通信方式')
    },
    computed: {
      breadData: function() {
        console.log(this.$store.getters.getBreadData)
        return this.$store.getters.getBreadData
      },
      langKey () {
        return this.$store.getters.getLangContentKey;
      },
    },
    methods: {
      setLangText (val) {
        const hasKey = this.$te(val);
        console.log(val)
        console.log(hasKey)
        if(hasKey) {
          return this.$t(val);
        } else {
          return val;
        }
      },
      setLangData () {
        console.log(this.$router.currentRoute.path.replace(/^\//g, ''))
        const key = this.$router.currentRoute.path.replace(/^\//g, '');
        this.$store.dispatch('setLandRouterKey', key);
      },
      toggleNav (url, index){
        console.log(url + '==========')
        console.log(index + '==========')
        if(index < this.$store.getters.getBreadData.length - 1) {
          this.$router.push(url)
        }
      }
    }
  }
</script>