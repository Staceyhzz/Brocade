<template>
  <div class="resize-cus">
    <p @click='onClick'>
      <Icon type="person"></Icon>
      <span>{{name}}</span>
      <span v-if='idKey'>({{id}})</span>
      <span class="btn" @click.stop='open' v-if='openKey'>
        <!-- <Icon type="ios-chatboxes"></Icon> -->
        <Icon type="ios-browsers-outline"></Icon>
      </span>
    </p>
  </div>
</template>

<script>
  export default {
    name: 'tableResizeTime',
    props: {
      name: String,
      id: [String, Number],
      openKey: {
        type: Boolean,
        default: true
      },
      idKey: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {

      }
    },
    computed: {
      otherTabUrl() {
        return this.$store.getters.getOpenOtherTabUrl;
      },
    },
    methods: {
      onClick () {
        this.$emit('click');
      },
      open () {
        if(this.name && this.id) {
          sessionStorage.setItem("cusNameBlank", this.name);
          sessionStorage.setItem("cusIdBlank", this.id);
          window.open(this.otherTabUrl);
        }
      },
    }
  }
</script>
<style lang="less" scoped>
  .resize-cus {
    width: 100%;
    p {
      word-break: break-all;
      cursor: pointer;
      color: #4172F6;
    }
    .btn {
      padding-left: 10px;
      font-size: 16px;
      // color: #FF6F76;
    }
  }
</style>