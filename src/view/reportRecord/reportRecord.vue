/**
 * 新报表中心
 */

<template>
  <div class="container-box report-record">
    <div class="container-header">
      <h2>{{$t('layoutNav.reportRecord')}}</h2>
    </div>
    <div class="container-body clearfix">
      <ul class="report-nav clearfix">
        <li @click="changeType('collect')" :class="[type === 'collect' ? 'active' : '']">{{$t('reportSetting.cybb')}}</li>
        <li @click="changeType('all')" :class="[type === 'all' ? 'active' : '']">{{$t('reportSetting.sybb')}}</li>
        <li v-for='item in navList' :key='item.id' :class="[type === item.id ? 'active' : '']" @click="changeType(item.id)">{{$t('reportSetting.' + item.name)}}</li>
      </ul>
      <div class="report-content">
        <h3 class="tit">{{$t('reportRecord.tit')}}</h3>
        <ul class="report-box">
          <li v-for='(item, index) in reportList' :key='index' @click='toView(item)'>
            <span class='jyw-report-pic'></span>
            <div class="main">
              <h3>{{$t('reportSetting.' + item.id)}}</h3>
              <p>{{$t('reportSetting.' + item.content)}}</p>
            </div>
            <em :class="[item.collect ? 'collect' : '']" @click.stop='collect(item)'>
              <Icon type="android-favorite"></Icon>
            </em>
            <!-- <div class="remark">
              {{$t('reportSetting.' + item.content)}}
            </div> -->
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        type: 'collect',
        data: [],
        navList: [],
      }
    },
    computed: {
      reportList () {
        if(this.type === 'all') {
          return this.data;
        } else if(this.type === 'collect') {
          return this.data.filter(item => item.collect);
        } else {
          return this.data.filter(item => item.tagsId === this.type);
        }
      },
    },
    created () {
      this.getList();
    },
    methods: {
      getList() {
        const data = JSON.parse(localStorage.getItem('reportPower')) || [];
        this.data = data.filter(item => item.scope).sort((x, y) => x.scope - y.scope);
        this.data.map(item => {
          const index = this.navList.findIndex(nav => nav.id === item.tagsId);
          if(index < 0) {
            this.navList.push({
              id: item.tagsId,
              name: item.tags
            });
          }
        });
        this.$store.dispatch('setPageLoading', 1);
      },
      changeType (val) {
        this.type = val;
      },
      collect (data) {
        let _vm = this;
        const _collect = data.collect
          ? 0
          : 1;
        _vm.$http.post({
          url: 'guard-webManager/newReport/updateFvReport.jhtml',
          data: {
            id: data.id,
            collect: _collect
          },
          success: function(res){
            if(res.data.code === 0) {
              _vm.$Notice.success({
                title: _vm.$t('publicSet.noticeTit'),
                desc: _vm.$t('publicSet.noticeSuccess')
              });
              const index = _vm.data.findIndex(item => item.id === data.id);
              _vm.data[index].collect = _collect;
              localStorage.setItem('reportPower', JSON.stringify(_vm.data));
            } else {
              _vm.$Notice.error({
                title: _vm.$t('publicSet.noticeTit'),
                desc: res.data.desc
              });
            }
          },
          error: function(res){
            console.log(res);
          }
        });
      },
      toView (data) {
        const breadData = [
          {
            url: '/desktop',
            text: 'layoutNav.desk'
          },
          {
            url: '/reportRecord',
            text: 'layoutNav.reportRecord'
          },
          {
            url: data.url,
            text: 'reportSetting.' + data.id
          }
        ];
        this.$store.dispatch('setBreadData', breadData);
        this.$router.push(data.url);
      },
    }
  }
</script>
<style scoped lang='less'>
  .report-record {
    .tit {
      margin-bottom: 20px;
      font-size: 16px;
      line-height: 22px;
      font-weight: normal;
      color: #181818;
    }
    .report-nav {
      float: left;
      width: 162px;
      padding: 20px 10px;
      border: 1px solid #dedede;
      margin-right: 20px;
      border-radius: 4px;
      li {
        position: relative;
        padding: 8px 20px;
        margin-bottom: 10px;
        font-size: 14px;
        line-height: 18px;
        color: #181818;
        border-radius: 4px;
        cursor: pointer;
        &:hover {
          background: rgba(65,114,246,0.20);
        }
      }
      .active {
        background: rgba(65,114,246,0.20);
      }
    }
    .report-content {
      float: left;
      width: ~'calc(100% - 182px)';
      padding: 20px 30px;
      border: 1px solid #dedede;
      border-radius: 4px;
    }
    .report-box {
      li {
        position: relative;
        float: left;
        width: 208px;
        padding: 12px;
        border: 1px solid #fff;
        margin: 0 30px 30px 0;
        border-radius: 2px;
        cursor: pointer;
        &:hover {
          border-color: rgba(65,114,246,0.50);
        }
        &:hover em {
          display: block;
        }
        &:hover .remark {
          display: block;
        }
      }
      span {
        float: left;
        margin-right: 13px;
      }
      .main {
        float: left;
        width: 125px;
      }
      h3 {
        margin-bottom: 3px;
        font-size: 14px;
        line-height: 18px;
        font-weight: normal;
        color: #181818;
      }
      p {
        font-size: 12px;
        line-height: 14px;
        height: 28px;
        color: #2A2A2A;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        word-break: break-all;
      }
      em {
        position: absolute;
        right: 4px;
        bottom: 0px;
        display: none;
      }
      i {
        font-size: 15px;
        color: #C9C9C9;
      }
      .collect i {
        color: #FF6F76;
      }
      .remark {
        // display: none;
        // position: absolute;
        // top: 80px;
        // left: 0;
        // width: 208px;
        // padding: 10px;
        // background: #fff;
        // z-index: 10;
        // box-shadow: 0 1px 6px rgba(0,0,0,.2);
        // border-radius: 5px;
      }
    }
  }
</style>