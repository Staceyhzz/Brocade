/**
* 角色管理配置页面
*/
<template>
  <div class="container-box role-set">
    <div class="container-header">
      <h2>{{userName}}</h2>
      <ul class="header-btn-group">
        <li class="header-item" @click="back"><Icon type="android-arrow-back"></Icon>{{$t('publicSet.back')}}</li>
      </ul>
    </div>
    <div class="container-body">
      <Tabs :animated='false'>
        <Tab-pane :label="$t('userCheck.menuTit1')">
          <Button type="primary"  icon="gear-b" style='margin-bottom:15px;' @click='toSet(1)'>{{$t('publicSet.set')}}</Button>
          <Table stripe :columns="menuColumns" :data="menuData"></Table>
        </Tab-pane>
        <Tab-pane label="可查看报表">
          <Button type="primary"  icon="gear-b" style='margin-bottom:15px;' @click='toSet(2)'>配置报表</Button>
          <Table stripe :columns="reportColumns" :data="reportData"></Table>
        </Tab-pane>
        <Tab-pane :label="$t('userCheck.menuTit3')">
          <Button type="primary"  icon="gear-b" style='margin-bottom:15px;' @click='toSet(3)'>{{$t('publicSet.set')}}</Button>
          <Table stripe :columns="powerColumns" :data="powerData"></Table>
        </Tab-pane>
        <Tab-pane :label="$t('userCheck.menuTit2')">
          <Button type="primary"  icon="gear-b" style='margin-bottom:15px;' @click='toSet(4)'>{{$t('publicSet.set')}}</Button>
          <Table stripe :columns="cusColumns" :data="cusData"></Table>
        </Tab-pane>
        <Tab-pane :label="$t('userCheck.menuTit5')">
          <Button type="primary"  icon="gear-b" style='margin-bottom:15px;' @click='toSet(5)'>{{$t('publicSet.set')}}</Button>
          <p class="msg">{{$t('userCheck.msg1')}}{{priceType}}</p>
          <p class="msg" v-show='key'>{{$t('userCheck.msg2')}}</p>
          <Table stripe :columns="priceColumns" :data="priceData" v-show='key'></Table>
        </Tab-pane>
        <Tab-pane :label="$t('userCheck.menuTit4')">
          <Button type="primary" icon="gear-b" style='margin-bottom:15px;' @click='setReportPower' v-if='newReportKey'>{{$t('publicSet.set')}}</Button>
          <Button type="primary" style='margin-bottom:15px;' @click='save' v-if='!newReportKey' :loading='saveLoad'>{{$t('publicSet.save')}}</Button>
          <Button type="primary" style='margin-bottom:15px;' @click='cancel' v-if='!newReportKey'>{{$t('publicSet.cancel')}}</Button>
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
                  <td class="tit" v-if='newReportKey'>{{item.powerText}}</td>
                  <td v-else class="do">
                    <RadioGroup v-model="item.scope">
                      <Radio :label="0">{{$t('userCheck.power1')}}</Radio>
                      <Radio :label="1">{{$t('userCheck.power2')}}</Radio>
                      <Radio :label="2">{{$t('userCheck.power3')}}</Radio>
                      <Radio :label="3">{{$t('userCheck.power4')}}</Radio>
                    </RadioGroup>
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
        id: '',
        userName: '',
        key: false,
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
        urlList: [
          {
            id: 1,
            url: '/updateMenu',
            text: 'userAuthCustomSet.msg3'
          },
          {
            id: 2,
            url: '/updateReport',
            text: '设置查看报表'
          },
          {
            id: 3,
            url: '/updateAuthCode',
            text: 'userAuthCustomSet.msg4'
          },
          {
            id: 4,
            url: '/updateCusMenu',
            text: 'userAuthCustomSet.msg5'
          },
          {
            id: 5,
            url: '/updatePriceMenu',
            text: 'userAuthCustomSet.msg6'
          }
        ],
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
        newReportKey: true,
        saveLoad: false,
      }
    },
    created () {
      if(typeof this.$route.query.id === 'string') {
        this.userName = this.$route.query.name
        this.id = this.$route.query.id
      } else {
        this.userName = JSON.parse(sessionStorage.getItem('query34')).name
        this.id = JSON.parse(sessionStorage.getItem('query34')).id
      }
      this.getId()
    },
    methods: {
      getId () {
        let _vm = this;
        _vm.$store.dispatch('setPageLoading', -1);
        _vm.$http.getPage({
          url: 'guard-webManager/role/config.jhtml',
          data: {
            id: _vm.id
          },
          success: function(res){
            console.log(res)
            _vm.menuData = res.data.content.menuList || [];
            _vm.$store.dispatch('setPageLoading', 1);
            _vm.reportData = res.data.content.reportList || [];
            _vm.powerData = res.data.content.authCodeList || [];
            _vm.cusData = res.data.content.cuMenuList || [];
            _vm.priceData = res.data.content.productList || [];
            if(res.data.content.priceHideAuth === 'parthide') {
              _vm.priceType = _vm.$t('userCheck.price1');
              _vm.key = true;
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
        });
      },
      toSet(type) {
        const _url = this.urlList.filter(item => item.id === type)[0].url 
        const _text = this.urlList.filter(item => item.id === type)[0].text
        const breadData = [
          {
            url: '/desktop',
            text: 'layoutNav.desk'
          },
          {
            url: '/role',
            text: 'layoutNav.roleManage'
          },
          {
            url: '/roleSet',
            text: this.userName,
          },
          {
            url: _url,
            text: _text
          }
        ]
        this.$store.dispatch('setBreadData', breadData)
        this.$router.push({
          path: _url,
          query: {
            id: this.id,
            type: 'role'
          }
        })
      },
      setReportPower () {
        this.newReportKey = false;
      },
      cancel () {
        this.getId();
        this.newReportKey = true;
      },
      save () {
        let _vm = this;
        _vm.saveLoad = true;
        const _data = _vm.newReportList.map(item => {
          return {
            id: item.id,
            scope: item.scope
          };
        });
        _vm.$http.post({
          url: 'guard-webManager/role/updateReportAuth.jhtml',
          data: {
            id: _vm.id,
            reportListStr: JSON.stringify(_data)
          },
          success: function(res){
            _vm.saveLoad = false;
            if(res.data.code === 0 ){
              _vm.$Notice.success({
                title: _vm.$t('publicSet.noticeTit'),
                desc: _vm.$t('publicSet.noticeSuccess')
              });
              _vm.newReportList.map(item => {
                const index = _vm.reportType.findIndex(re => re.id === item.scope);
                if(index >= 0) {
                  item.powerText = _vm.$t(_vm.reportType[index].lang);
                }
              });
              _vm.newReportKey = true;
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
      back () {
        this.$router.back(-1)
      }
    }
  }
</script>

<style scoped lang='less'>
  .role-set {
    .msg {
      margin-bottom: 20px;
      font-size: 14px;
      line-height: 20px;
    }
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
    .do {
      min-width: 250px;
      text-align: center;
    }
  }
</style>