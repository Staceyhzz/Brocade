/**
 *  无限滚动核心方法
 */
<template>
  <div class="infinite-main" @scroll="handleScroll" ref='scrollBox'>
    <div class="infinite-box" :style="paddingStyle" ref='scrollMain'>
      <slot name="scroll"></slot>
    </div>
    <!-- 加载更多，可开启关闭 -->
    <div class="load-more-gif" v-if="hasMore">loading...</div>
    <div class="load-loading" v-show='asyncKey'>
      <Spin fix>
        <Icon type="ios-loading" size=40 class="demo-spin-icon-load"></Icon>
        <div>Loading</div>
      </Spin>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      //总数据大小
      listLength: {
        type: Number,
        default: 0
      },
      //label高度
      itemHeight: {
        type: Number,
        default: 36
      },
      //数据更新时触发改动
      asyncKey: {
        type: Boolean,
        default: true
      },
      //是否开启加载更多
      hasMore: {
        type: Boolean,
        default: false
      },
      //数据加载更多时触发改动
      moreKey: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        lastScrollTop: 0,    // 最后一次滚动距离
        timeOutKey: true,    // 加载更多时间频率
        itemInMain: 0,       // 内容展示区子项个数
        fromNum: 0,          // 内容展示时数据起始索引
        toNum: 0             // 内容展示时数据结束索引
      };
    },
    watch: {
      //数据更新时触发改动
      asyncKey(val) {
        if(!val) {
          this.initData();
        }
      },
      //加载更多
      moreKey(val) {
        if(this.hasMore) {
          this.toNum = this.toNum + this.itemInBottom;
          this.timeOutKey = true;
          this.resetPreviewList();
        }
      },
    },
    computed: {
      //滚动样式
      paddingStyle() {
        return {
          paddingTop: `${this.fromNum * this.itemHeight}px`,
          paddingBottom: `${(this.listLength - this.toNum) * this.itemHeight}px`
        };
      },
      //滚动区顶部Label数
      itemInTop() {
        return this.itemInMain * 2;
      },
      //滚动区底部Label数
      itemInBottom() {
        return this.itemInMain;
      },
      //最大滚动区高度
      maxHeight() {
        return this.itemInMain * this.itemHeight;
      },
    },
    mounted() {
      this.initData();
    },
    methods: {
      //初始化
      initData() {
        this.itemInMain = Math.ceil(this.$refs.scrollBox.offsetHeight / this.itemHeight);
        this.$refs.scrollBox.scrollTop = 0;
        this.fromNum = 0;
        this.toNum = this.itemInTop + this.itemInMain + this.itemInBottom > this.listLength
          ? this.listLength
          : this.itemInTop + this.itemInMain + this.itemInBottom;
        this.resetPreviewList();
      },
      //无限滚动
      handleScroll() {
        const _scrollTop = this.$refs.scrollBox.scrollTop;
        const _height = this.$refs.scrollMain.offsetHeight;
        const _contentHeight = this.$refs.scrollBox.offsetHeight;

        //计算是否需要更新列表
        if(Math.abs(_scrollTop - this.lastScrollTop) > this.maxHeight) {
          this.lastScrollTop = _scrollTop;
        } else {
          if(this.toNum === this.listLength && _height - _scrollTop - _contentHeight < this.itemHeight && this.hasMore) {
            this.loadMore();
          }
          return;
        }

        //计算需要的列表
        const _from = parseInt(_scrollTop / this.itemHeight) - this.itemInTop;
        this.fromNum = _from < 0
          ? 0
          : _from;
        
        const _to = this.fromNum + this.itemInTop + this.itemInBottom + this.itemInMain;
        this.toNum = _to > this.listLength
          ? this.listLength
          : _to;

        this.resetPreviewList();
      },
      //触发加载更多
      loadMore() {
        if (!this.timeOutKey) return;
        this.timeOutKey = false;
        this.$emit('on-load-more');
      },
      //加载数据列表
      resetPreviewList() {
        this.$emit('reset-list', this.fromNum, this.toNum);
      },
    }
  };
</script>

<style lang="less" scoped>
  .infinite-main {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    &::scroll-bar{
      width: 0;
    }
    .load-more-gif {
      width: 100%;
      height: 36px;
      text-align: center;
      line-height: 36px;
      background: #fff;
      border-top: none;
      color: #48B884;
    }
  }
</style>