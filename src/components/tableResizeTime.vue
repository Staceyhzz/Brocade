<template>
  <div class="resize-time">
    <p class="first">{{time1}}</p>
    <p>{{time2}}</p>
  </div>
</template>

<script>
  export default {
    name: 'tableResizeTime',
    props: {
      time: String,
    },
    data() {
      return {

      }
    },
    computed: {
      time1 () {
        return this.time.split(' ')[0]
      },
      time2 () {
        return this.time.split(' ')[1]
      }
    }
  }
</script>
<style lang="less" scoped>
  .resize-time {
    width: 100%;
    .first {
      margin-right: 3px;
    }
    p {
      display: inline-block;
      vertical-align: middle;
    }
  }
</style>