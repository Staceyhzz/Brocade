/**
 *  无限滚动快捷搜索组件
 */
<template>
  <div class="input-remote-scroll" v-clickoutside="closeMenu">
    <!-- 输入框 -->
    <Input v-model.trim="query" @on-change='changeWord' @on-focus='showMenu' :placeholder="localePlaceholder" :icon='inputIcon' @on-click='cleanQuery'>
      <Select slot="prepend" style="width: 80px" v-if="prependSelect" v-model='prependValue' @on-change='changePrependSelect' @on-open-change='openPrepend'>
        <Option v-for='(item, index) in prependSelectList' :key="index" :value="item.id">{{item.name}}</Option>
      </Select>
    </Input>
    <!-- 内容区域 -->
    <div class="select-box" v-show='selectMenuKey' :style="mainStyle">
      <!-- 标题 -->
      <div class="select-tit" :style="titStyle">
        <slot name="title"></slot>
      </div>
      <!-- 无限滚动区 -->
      <div class="infinite-list">
        <infinite-scroll
          :listLength='list.length'
          :asyncKey='asyncKey'
          :itemHeight='itemHeight'
          @reset-list='setList'>
          <ul slot='scroll' ref='scrollUl'>
            <li v-for="(item, index) in previewList" :key='index' @click="chooseLabel(item)" :class="[item[idProp] === labelId  && item[nameProp] === labelName ? 'active' : '']">
              <slot v-bind:data="item"></slot>
            </li>
          </ul>
        </infinite-scroll>
      </div>
    </div>
  </div>
</template>

<script>
  import clickoutside from 'utils/clickoutside.js';
  import infiniteScroll from './InfiniteScroll';
  export default {
    name: 'infinite-list',
    directives: {clickoutside},
    components: { infiniteScroll },
    props: {
      //双向绑定id
      value: {
        type: [String, Number],
        default: ''
      },
      //真实大数据列表
      list: {
        type: Array,
        default: () => {
          return [];
        }
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
      //关键辅助标识id
      idProp: {
        type: String,
        default: ''
      },
      //关键辅助标识value
      nameProp: {
        type: String,
        default: ''
      },
      placeholder: {
        type: String,
        default: ''
      },
      //弹窗方向
      placement: {
        type: String,
        default: 'bottom'
      },
      //弹窗大小
      size: {
        type: String,
        default: 'small'
      },
      //是否开启输入框前置下拉
      prependSelect: {
        type: Boolean,
        default: false
      },
      //输入框前置下拉默认值
      prependSelectId: {
        type: Number,
        default: null
      },
      //输入框前置下拉列表
      prependSelectList: {
        type: Array,
        default: () => {
          return [];
        }
      },
      //默认值
      inputVal: {
        type: String,
        default: ''
      },
      //默认值
      inputId: {
        type: [String, Number],
        default: ''
      },
      //是否开启清除按钮
      clearable: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {

        //虚拟展示滚动的小数据列表
        previewList: [],


        //用户搜索词
        query: '',

        //内容区展示
        selectMenuKey: false,

        //标题宽度随内容区滚动条宽度变化
        titleWidth: 100,

        //标识展示数据字段
        labelId: '',
        labelName: '',

        //搜索频率
        timer: null,

        //输入框前置下拉
        prependValue: null,
      };
    },
    watch: {
      inputVal(val) {
        this.setQuery();
      },
    },
    computed: {
      //弹窗样式
      mainStyle() {
        let size = '';
        if(this.size === 'large') {
          size = '500px';
        } else if(this.size === 'samll') {
          size = '100%';
        } else {
          size = this.size;
        }
        if(this.placement === 'bottom') {
          
          return {
            top: `calc(100% + 5px)`,
            minWidth: size
          };
        } else {
          return {
            bottom: `calc(100% + 5px)`,
            minWidth: size
          };
        }
      },
      //标题样式
      titStyle() {
        return {
          width: `${this.titleWidth}px`
        };
      },
      //placeholder
      localePlaceholder() {
        if(this.placeholder) {
          return this.placeholder;
        } else {
          return this.$t('placeholderPublic.filter');
        }
      },
      //输入框icon
      inputIcon() {
        if(this.clearable) {
          return this.query ? 'ios-close' : 'ios-search';
        } else {
          return 'ios-search';
        }
      },
    },
    mounted() {
      this.setQuery();
      this.prependValue = this.prependSelectId;
    },
    methods: {
      //输入搜索
      changeWord(val) {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.showMenu();
        }, 200);
      },
      cleanQuery() {
        if(this.clearable) {
          this.clearQuery();
          this.$emit('on-clean');
        }
      },
      setQuery() {
        this.query = this.inputVal;
        this.labelName = this.inputVal;
        this.labelId = this.inputId;
      },
      //暴露清空query方法
      clearQuery() {
        this.query = '';
        this.labelId = '';
        this.labelName = '';
      },
      //展示操作区
      showMenu() {
        this.$emit('on-change-word', this.query);
        this.selectMenuKey = true;
        this.$nextTick(() => {
          this.titleWidth = this.$refs.scrollUl.offsetWidth;
        });
      },
      closeMenu() {
        this.selectMenuKey = false;
        if(this.labelName && this.labelId) {
          this.query = this.labelName;
        } else {
          this.clearQuery();
        }
      },
      setList(from, to) {
        this.previewList.splice(0);
        for(let i = from; i < to; i++) {
          this.previewList.push(this.list[i]);
        }
        this.$nextTick(() => {
          this.titleWidth = this.$refs.scrollUl.offsetWidth;
        });
      },
      //选择选项
      chooseLabel(data) {
        this.query = data[this.nameProp];
        this.labelId = data[this.idProp];
        this.labelName = data[this.nameProp];
        this.closeMenu();
        this.$emit('input', data[this.idProp]);
        this.$emit('on-select', data);
      },
      //输入框前缀下拉选择
      changePrependSelect(val) {
        this.$emit('on-prepend-select', val);
      },
      //修复前置下拉与弹窗层级互相影响覆盖
      openPrepend(val) {
        this.closeMenu();
      }
    }
  };
</script>

<style lang="less" scoped>
  .input-remote-scroll {
    position: relative;
    height: 100;
    width: 100;
  }
  .select-box {
    position: absolute;
    left: 0;
    width: 100%;
    height: 216px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
    z-index: 950;
  }
  .select-tit {
    height: 36px;
    box-shadow: inset 0 -1px 0 0 rgba(65, 65, 65, 0.1);
    p {
      float: left;
      height: 36px;
      padding: 0 10px;
      font-size: 14px;
      line-height: 36px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
</style>

<style lang='less'>
  .input-remote-scroll {
    .infinite-list {
      width: 100%;
      height: ~'calc(100% - 36px)';
      ul {
      margin: 0;
      padding: 0;
        li {
          text-decoration: none;
          height: 36px;
          font-size: 14px;
          line-height: 36px;
          text-align: left;
          box-sizing: border-box;
          background: #fff;
          cursor: pointer;
          p {
            float: left;
            height: 36px;
            padding: 0 10px;
            font-size: 14px;
            line-height: 36px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          &:hover p {
            color: #fff;
            background: rgba(65, 114, 246, 0.9);
          }
        }
        .active {
          color: #fff;
          background: rgba(65, 114, 246, 0.9);
        }
      }
    }
  }
</style>