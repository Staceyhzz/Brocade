/**
* 用户自定义配置页面
*/
<template>
  <div class="container-box user-auth-set">
    <div class="container-header">
      <h2>{{userName}}</h2>
      <ul class="header-btn-group">
        <li class="header-item" @click="back"><Icon type="android-arrow-back"></Icon>{{$t('publicSet.back')}}</li>
      </ul>
    </div>
    <div class="container-body">
      <Tabs :animated='false'>
        <Tab-pane :label="$t('userAuthCustomSet.menuTit')">
          <Form ref="formValidate" :model="formValidate" :rules="ruleForm" :label-width="100" label-position="right">
            <Form-item :label="$t('labelPublic.js')" prop="roleId" required v-if='key'>
              <Select v-model="formValidate.roleId" style='width:300px'>
                <Option v-for="item in roleList" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
            </Form-item>
            <Form-item :label="$t('userAuthCustomSet.msg1')" v-else>
              <span>{{formValidate.name}}</span>
            </Form-item>
          </Form>
          <div class="footer-btnGroup" style='paddingTop:200px'>
            <Button type="primary"  @click='save' :loading='saveLoad' icon="checkmark" v-if='key'>{{$t('publicSet.save')}}</Button>
            <Button type="primary"  @click='remove' icon="checkmark" v-else>{{$t('userAuthCustomSet.btn')}}</Button>
          </div>
        </Tab-pane>
        <Tab-pane :label="$t('userCheck.menuTit1')">
          <Button type="primary"  icon="gear-b" style='margin-bottom:15px;' @click='toSet(1)' v-if='key'>{{$t('publicSet.set')}}</Button>
          <Table stripe :columns="menuColumns" :data="menuData"></Table>
        </Tab-pane>
        <Tab-pane label="可查看报表">
          <Button type="primary"  icon="gear-b" style='margin-bottom:15px;' @click='toSet(2)' v-if='key'>配置报表</Button>
          <Table stripe :columns="reportColumns" :data="reportData"></Table>
        </Tab-pane>
        <Tab-pane :label="$t('userCheck.menuTit3')">
          <Button type="primary"  icon="gear-b" style='margin-bottom:15px;' @click='toSet(3)' v-if='key'>{{$t('publicSet.set')}}</Button>
          <Table stripe :columns="powerColumns" :data="powerData"></Table>
        </Tab-pane>
        <Tab-pane :label="$t('userCheck.menuTit2')">
          <Button type="primary"  icon="gear-b" style='margin-bottom:15px;' @click='toSet(4)' v-if='key'>{{$t('publicSet.set')}}</Button>
          <Table stripe :columns="cusColumns" :data="cusData"></Table>
        </Tab-pane>
        <Tab-pane :label="$t('userCheck.menuTit5')">
          <Button type="primary"  icon="gear-b" style='margin-bottom:15px;' @click='toSet(5)' v-if='key'>{{$t('publicSet.set')}}</Button>
          <p class="msg">{{$t('userCheck.msg1')}}{{priceType}}</p>
          <p class="msg" v-show='priceKey'>{{$t('userCheck.msg2')}}</p>
          <Table stripe :columns="priceColumns" :data="priceData" v-show='priceKey'></Table>
        </Tab-pane>
        <Tab-pane :label="$t('userCheck.menuTit4')">
          <Button type="primary" icon="gear-b" style='margin-bottom:15px;' @click='setReportPower' v-if='key && newReportKey'>{{$t('publicSet.set')}}</Button>
          <Button type="primary" style='margin-bottom:15px;' @click='savePower' v-if='key && !newReportKey' :loading='saveLoad'>{{$t('publicSet.save')}}</Button>
          <Button type="primary" style='margin-bottom:15px;' @click='cancel' v-if='key && !newReportKey'>{{$t('publicSet.cancel')}}</Button>
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
      const validateType = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('userAuthCustomSet.valid')));
        } else {
          callback();
        }
      };
      return {
        id: '',
        userName: '',
        key: true,
        priceKey: false,
        priceType: '',
        saveLoad: false,
        formValidate: {
          id: '',
          roleId: '',
          name: '',
        },
        roleList: [],
        ruleForm: {
          roleId: [
            { validator: validateType, trigger: 'change' }
          ],
        },
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
        urlList: [
          {
            id: 1,
            url: '/userUpdateMenu',
            text: 'userAuthCustomSet.msg3'
          },
          {
            id: 2,
            url: '/userUpdateReport',
            text: '设置查看报表'
          },
          {
            id: 3,
            url: '/userUpdateAuthCode',
            text: 'userAuthCustomSet.msg4'
          },
          {
            id: 4,
            url: '/userUpdateCusMenu',
            text: 'userAuthCustomSet.msg5'
          },
          {
            id: 5,
            url: '/userUpdatePriceMenu',
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
      }
    },
    created () {
      if(typeof this.$route.query.id == 'string') {
        this.userName = this.$route.query.name
        this.id = this.$route.query.id
        this.formValidate.id = this.$route.query.id
      } else {
        this.userName = JSON.parse(sessionStorage.getItem('query34')).name
        this.id = JSON.parse(sessionStorage.getItem('query34')).id
        this.formValidate.id = JSON.parse(sessionStorage.getItem('query34')).id
      }
      this.getId()
    },
    mounted () {
      this.getRole()
    },
    methods: {
      getId () {
        let _vm = this
        _vm.$store.dispatch('setPageLoading', -1)
        _vm.$http.getPage({
          url: 'guard-webManager/userAuthCustom/record.jhtml',
          data: {
            id: _vm.id
          },
          success: function(res){
            _vm.saveLoad = false
            console.log(res)
            if(!res.data.content.User.roleid && res.data.content.User.roleid != 0) {
              _vm.key = true
            } else {
              _vm.key = false
              _vm.formValidate.name = res.data.content.User.roleName
            }
            _vm.menuData = res.data.content.menuList || []
            _vm.$store.dispatch('setPageLoading', 1)
            _vm.reportData = res.data.content.reportList || []
            _vm.powerData = res.data.content.authCodeList || []
            _vm.cusData = res.data.content.cuMenuList || []
            _vm.priceData = res.data.content.productList || []
            if(res.data.content.priceHideAuth === 'parthide') {
              _vm.priceType = _vm.$t('userCheck.price1');
              _vm.priceKey = true
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
      //获取角色下拉
      getRole () {
        let _vm = this
        _vm.$http.get({
          url: 'guard-webManager/select/roleInfo.jhtml',
          success: function(res){
            if(res.data.code === 0) {
              _vm.roleList = res.data.content
            } else {
              console.log(res.data.desc)
            }
          },
          error: function(res){
            console.log(res)
          }
        })
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
            url: '/userAuthCustom',
            text: 'layoutNav.userAuthCustomManage'
          },
          {
            url: '/userAuthCustomSet',
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
            type: 'user',
          }
        })
      },
      remove () {
        let _vm = this
        _vm.$Modal.confirm({
          title: _vm.$t('publicSet.noticeTit'),
          content: _vm.$t('userAuthCustomSet.msg2'),
          onOk: () => {
            _vm.$http.post({
              url: 'guard-webManager/userAuthCustom/deleteRole.jhtml',
              data: {id: _vm.id},
              success: function(res){
                if(res.data.code === 0 ){
                  _vm.getId()
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('publicSet.noticeSuccess')
                  });
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
          onCancel: () => {

          }
        });
      },
      save () {
        let _vm = this
        _vm.$refs['formValidate'].validate((valid) => {
          if(valid) {
            _vm.saveLoad = true
            _vm.$http.post({
              url: 'guard-webManager/userAuthCustom/updateRole.jhtml',
              data: _vm.formValidate,
              success: function(res){
                if(res.data.code === 0 ){
                  _vm.getId()
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('publicSet.noticeSuccess')
                  });
                } else {
                  _vm.$Notice.error({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: res.data.desc
                  })
                  _vm.saveLoad = false
                }
              },
              error: function(res){
                console.log(res);
              }
            });
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
      savePower () {
        let _vm = this;
        _vm.saveLoad = true;
        const _data = _vm.newReportList.map(item => {
          return {
            id: item.id,
            scope: item.scope
          };
        });
        _vm.$http.post({
          url: 'guard-webManager/userAuthCustom/updateNewReport.jhtml',
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
  .user-auth-set {
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