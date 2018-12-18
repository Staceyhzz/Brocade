/**
 * 报表连锁机构辅助搜索权限
 * type 'h' 医院
 *      'u' 用户
 *      'c' 客户
 */
<template>
  <div class="report-power-search" v-clickoutside="handleClose">
    <span class='more' @click='toggle' ref='btn'>
      <Icon type="android-more-horizontal"></Icon>
    </span>
    <div class="box" v-show="key" ref='panel' :data-transfer="false" v-transfer-dom>
      <h4>{{$t('reportPowerSearch.title')}}</h4>
      <p class="tit" v-if='hData.length'>{{$t('labelPublic.yy')}}</p>
      <ul>
        <li v-for='item in hData' :key='item.name' :class="[item.key ? 'active' : '']" @click='change(item.key, item.name, item.type)'>
          {{item.name}}
          <span>
            <Icon type="checkmark-round"></Icon>
          </span>
        </li>
      </ul>
      <p class="tit" v-if='uData.length'>{{$t('labelPublic.yh')}}</p>
      <ul>
        <li v-for='item in uData' :key='item.name' :class="[item.key ? 'active' : '']" @click='change(item.key, item.name, item.type)'>
          {{item.name}}
          <span>
            <Icon type="checkmark-round"></Icon>
          </span>
        </li>
      </ul>
      <p class="tit" v-if='cData.length'>{{$t('reportPowerSearch.kh')}}</p>
      <ul>
        <li v-for='item in cData' :key='item.name' :class="[item.key ? 'active' : '']" @click='change(item.key, item.name, item.type)'>
          {{item.name}}
          <span>
            <Icon type="checkmark-round"></Icon>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import clickoutside from 'utils/clickoutside.js';
  import TransferDom from 'utils/transfer-dom.js';
  export default {
    name: 'reportPowerSearch',
    directives: { clickoutside, TransferDom},
    props: {
      list: Array,
    },
    data () {
      return {
        icon: 'ios-search',
        key: false,
      }
    },
    computed: {
      hData () {
        return this.list.filter(item => item.type === 'h');
      },
      uData () {
        return this.list.filter(item => item.type === 'u');
      },
      cData () {
        return this.list.filter(item => item.type === 'c');
      },
    },
    beforeDestroy () {
      // console.log('===============')
      // this.hide();
    },
    methods: {
      toggle () {
        this.key = !this.key;
      },
      handleClose() {
        this.key = false;
      },
      // toggle () {
      //   if(this.key) {
      //     this.hide();
      //   } else {
      //     this.open();
      //   }
      // },
      // open () {
      //   this.key = true;
      //   document.addEventListener('click', this.hidePanel, false);
      // },
      // hide () {
      //   this.key = false;
      //   document.removeEventListener('click', this.hidePanel, false);
      // },
      // hidePanel (e) {
      //   if(!this.$refs.panel.contains(e.target) && !this.$refs.btn.contains(e.target)) {
      //     this.hide();
      //   }
      // },
      change (key, name, type) {
        const index = this.list.findIndex(item => item.name === name);
        if(key) {
          const data = this.list.filter(item => item.type === type).filter(item => item.key);
          if(data.length > 1) {
            this.list[index].key = false;
            this.$emit('on-change', this.list, this.list[index]);
          }
        } else {
          this.list[index].key = true;
          this.$emit('on-change', this.list, this.list[index]);
        }
      },
    }
  }
</script>

<style scoped lang='less'>
  .report-power-search {
    position: relative;
    float: right;
    width: 30px;
    height: 22px; 
    .more {
      float: right;
      font-size: 18px;
      color: #797979;
      cursor: pointer;
    }
    .box {
      position: absolute;
      top: 5px;
      right: 20px;
      width: 160px;
      padding: 10px 0;
      background: #fff;
      border-radius: 4px;
      box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
      z-index: 940;
    } 
    h4 {
      padding-bottom: 10px;
      border-bottom: 1px solid #eee;
      font-size: 14px;
      font-weight: normal;
      text-align: center;
    }
    ul {
      padding: 0 20px;
    }
    li {
      position: relative;
      padding: 5px 30px 5px 15px;
      border-radius: 3px;
      cursor: pointer;
      span {
        display: none;
        position: absolute;
        top: 50%;
        right: 5px;
        width: 16px;
        height: 16px;
        margin-top: -8px;
        line-height: 16px;
        color: #2a2a2a;
      }
      &:hover {
        background-color: rgba(65, 114, 246, 0.07);
      }
    }
    .tit {
      padding-left: 20px;
      font-size: 13px;
      margin: 5px 0;
    }
    .active {
      background-color: rgba(65, 114, 246, 0.07);
      span {
        display: block;
      }
    }
    .btn {
      margin-top: 5px;
      text-align: center;
    }
  }
</style>