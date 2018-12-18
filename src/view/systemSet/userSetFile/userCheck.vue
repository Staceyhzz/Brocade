/**
* 用户查看权限页面
*/
<template>
  <div class="container-box user-check">
    <div class="container-header">
      <h2>{{userName}}</h2>
      <ul class="header-btn-group">
        <li class="header-item" @click="back"><Icon type="android-arrow-back"></Icon>{{$t('publicSet.back')}}</li>
      </ul>
    </div>
    <div class="container-body">
      <Tabs :animated='false'>
        <Tab-pane :label="$t('userCheck.menuTit1')">
          <Table stripe :columns="menuColumns" :data="menuData"></Table>
        </Tab-pane>
        <Tab-pane label="可查看报表">
          <Table stripe :columns="reportColumns" :data="reportData"></Table>
        </Tab-pane>
        <Tab-pane :label="$t('userCheck.menuTit3')">
          <Table stripe :columns="powerColumns" :data="powerData"></Table>
        </Tab-pane>
        <Tab-pane :label="$t('userCheck.menuTit2')">
          <Table stripe :columns="cusColumns" :data="cusData"></Table>
        </Tab-pane>
        <Tab-pane :label="$t('userCheck.menuTit5')">
          <p class="msg">{{$t('userCheck.msg1')}}{{priceType}}</p>
          <p class="msg" v-show='key'>{{$t('userCheck.msg2')}}</p>
          <Table stripe :columns="priceColumns" :data="priceData" v-show='key'></Table>
        </Tab-pane>
        <Tab-pane :label="$t('userCheck.menuTit4')">
          <div class="jyw-complex-table">
            <table>
              <thead>
                <tr>
                  <th>{{$t('userCheck.colTit3')}}</th>
                  <th>{{$t('labelPublic.mc')}}</th>
                  <th>{{$t('labelPublic.ms')}}</th>
                  <th>{{$t('userCheck.colTit4')}}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for='(item, index) in newReportList' :key='index'>
                  <td :class="['tit',item.tagsIdMerge.display ? 'hidden' : '']" :rowspan='item.tagsIdMerge.rowSpanNum'>{{$t('reportSetting.' + item.tags)}}</td>
                  <td class="name">{{$t('reportSetting.' + item.id)}}</td>
                  <td class="con">{{$t('reportSetting.' + item.content)}}</td>
                  <td class="tit">{{item.powerText}}</td>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Tab-pane>
      </Tabs>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        key: false,
        userName: '',
        menuColumns: [
          {   
            title: this.$t('labelPublic.xh'),
            type: 'index',
            width: 60
          },
          {
            title: this.$t('userCheck.colTit1'),
            render: (h, params) => {
              const text = this.$t('layoutNav.' + params.row.id);
              return h('span', text);
            }
          },
          {
            title: this.$t('userCheck.colTit2'),
            render: (h, params) => {
              const text = this.$t('layoutNav.' + params.row.module);
              return h('span', text);
            }
          },
          {
            title: this.$t('labelPublic.ms'),
            key: 'content'
          }
        ],
        menuData: [],
        reportColumns: [
          {   
            title: '序号',
            type: 'index',
            width: 60
          },
          {
            title: '报表名称',
            key: 'name'
          },
          {
            title: '报表编号',
            key: 'no'
          },
          {
            title: '报表模块',
            key: 'tags'
          },
          {
            title: '报表介绍',
            key: 'content'
          }
        ],
        reportData: [],
        powerColumns: [
          {
            title: this.$t('labelPublic.xh'),
            type: 'index',
            width: 60
          },
          {
            title: this.$t('labelPublic.mc'),
            key: 'name',
            render: (h, params) => {
              const text = this.$t('userPermissions.' + params.row.id);
              return h('span', text);
            }
          },
          {
            title: this.$t('labelPublic.ms'),
            key: 'content',
            render: (h, params) => {
              const text = this.$t('userPermissions.' + params.row.id + 'Remark');
              return h('span', text);
            }
          }
        ],
        powerData: [],
        cusColumns: [
          {
            title: this.$t('labelPublic.xh'),
            type: 'index',
            width: 60
          },
          {
            title: this.$t('userCheck.colTit1'),
            render: (h, params) => {
              const text = this.$t('cusMenuTabs.' + params.row.id);
              return h('span', text);
            }
          },
        ],
        cusData: [],
        priceColumns: [
          {
            title: this.$t('labelPublic.bh'),
            key: 'id'
          },
          {
            title: this.$t('labelPublic.lx'),
            key: 'categoryName'
          },
          {
            title: this.$t('labelPublic.mc'),
            key: 'name'
          },
          {
            title: this.$t('labelPublic.pym'),
            key: 'pinYin'
          },
          {
            title: this.$t('labelPublic.gg'),
            key: 'size'
          },
          {
            title: this.$t('labelPublic.dw'),
            key: 'unitName'
          }
        ],
        priceData: [],
        priceType: '',

        newReportList: [],
        reportType: [
          {
            id: 0,
            name: '无权限',
            lang: 'userCheck.power1'
          },
          {
            id: 1,
            name: '集团',
            lang: 'userCheck.power2'
          },
          {
            id: 2,
            name: '医院',
            lang: 'userCheck.power3'
          },
          {
            id: 3,
            name: '个人',
            lang: 'userCheck.power4'
          }
        ],
      }
    },
    created () {
      this.getId()
    },
    methods: {
      getId () {
        let _vm = this
        _vm.$store.dispatch('setPageLoading', -1)
        _vm.$http.getPage({
          url: 'guard-webManager/user/premissons.jhtml',
          data: {
            id: _vm.$route.query.id
          },
          success: function(res){
            console.log(res)
            _vm.userName = res.data.content.user.name
            _vm.menuData = res.data.content.menu || []
            _vm.$store.dispatch('setPageLoading', 1)
            _vm.reportData = res.data.content.reportList || []
            _vm.powerData = res.data.content.authCodeList || []
            _vm.cusData = res.data.content.cuMenu || []
            _vm.priceData = res.data.content.productList || []
            if(res.data.content.priceHideAuth === 'parthide') {
              _vm.priceType = _vm.$t('userCheck.price1');
              _vm.key = true
            } else if(res.data.content.priceHideAuth === 'allhide') {
              _vm.priceType = _vm.$t('userCheck.price2');
            } else {
              _vm.priceType = _vm.$t('userCheck.price3');
            }
            let newReport = res.data.content.newReportList || [];
            newReport.map(item => {
              const index = _vm.reportType.findIndex(re => re.id === item.scope);
              if(index >= 0) {
                item.powerText = _vm.$t(_vm.reportType[index].lang);
              }
            });
            const newReport1 = newReport.sort((x, y) => x.tagsId - y.tagsId);
            _vm.newReportList = _vm.combineCell(newReport1, 'tagsId');
          },
          error: function(res){
            console.log(res)
          }
        })
      },
      back () {
        this.$router.back(-1)
      }
    }
  }
</script>

<style scoped lang='less'>
  .user-check {
    .tit {
      min-width: 80px;
      text-align: center;
    }
    .con {
      min-width: 200px;
    }
    .name {
      min-width: 100px;
      text-align: center;
    }
  }
</style>