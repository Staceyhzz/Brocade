<template>
  <Poptip trigger="hover" placement="left" class='resize-remark' width='300'>
    <p>{{remark}}</p>
    <div slot="content" class="content">{{remark}}</div>
  </Poptip>
</template>

<script>
  export default {
    name: 'tableResizeRemark',
    props: {
      remark: String,
    },
    data() {
      return {

      }
    },
  }
</script>
<style lang="less" scoped>
  .resize-remark {
    display: block;
    p {
      line-height: 1.5;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
    }
    .content {
      overflow: auto;
      max-height: 500px;
      white-space: normal;
    }
  }
</style>

<style>
  .resize-remark .ivu-poptip-rel {
    display: block;
  }
</style>
