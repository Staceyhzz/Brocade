/** 
 * 查看电子病例 
 */

<template>
  <div class="container-box case-management-cus-add">
    <div class="container-header">
      <h2>{{formShow.customerName}}的病例————{{formShow.caseNumber}}</h2>
      <ul class="header-btn-group">
        <li class="header-item" @click="print" v-show='!recordKey'><Icon type="printer"></Icon>{{$t('printView.btn')}}</li>
        <li class="header-item" @click="back"><Icon type="android-arrow-back"></Icon>{{$t('publicSet.back')}}</li>
      </ul>
    </div>
    <div class="container-body">
      <div class="left-box">
        <ul class="nav-left">
          <li v-for="(item, index) in navList" :key='index' @click="chooseNav(item)" :class="navId === item.id ? 'active' : ''">{{item.name}}</li>
        </ul>
        <div class="change-record">
          <p @click="showRecord" :class="recordKey ? 'active' : ''">变更记录</p>
        </div>
      </div>
      <div class="right-box">
        <div class="main-right" v-show='!recordKey' id="printer">
          <Row type="flex" justify="start">
            <Col v-for='(item, index) in formList' :key='index' :span='item.col' class="form-item" :style="printBox">
              <p class="view-msg" :style="printWord" v-if='item.type !== 11 && item.type !== 12 && item.type !== 10 && item.type !== 13'>{{item.name}}：{{item.result}} <span>{{item.unit}}</span></p>
              <div class="line-com" :style="{'borderStyle': item.lineStyle, 'borderTopWidth': item.size + 'px', 'borderBottomWidth': '0px', 'borderLeftWidth': '0px', 'borderRightWidth': '0px', 'borderColor': '#d7dde4'}" v-if='item.type === 11'></div>
              <p class="view-msg" :style="printWord" v-if='item.type === 12'>{{item.name}}</p>
              <div v-if='item.type === 10'>
                <span class="file-tit" :style="printWord">{{item.name}}：</span>
                <div class="upload-list" v-for="(item1, index1) in item.result" :key='index1'>
                  <div class="text">
                    <p>{{item1.name}}</p>
                  </div>
                  <div class="upload-list-cover">
                    <Icon type="arrow-down-c" @click.native="downFIle(item1)"></Icon>
                  </div>
                </div>
              </div>
              <div v-if='item.type === 13'>
                <span class="file-tit" :style="printWord">{{item.name}}：</span>
                <div class="upload-list" v-for="(item1, index1) in item.result" :key='index1'>
                  <img :src="item1.url">
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <div class="change-record-list" v-show='recordKey'>
          <Table stripe :columns="col" :data="data"></Table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import resizeTime from 'components/tableResizeTime';
  export default {
    components: {resizeTime},
    data() {
      return {
        formShow: {},

        navList: [],
        navId: '',

        resultList: [],

        formList: [],

        recordKey: false,
        data: [],
        col: [
          {
            title: '病历号',
            width: 80,
            key: 'caseNumber'
          },
          {
            title: '病例类型',
            width: 60,
            key: 'caseName'
          },
          {
            title: '变更表单',
            width: 60,
            key: 'templateName'
          },
          {
            title: '变更时间',
            width: 80,
            render: (h, params) => {
              if (params.row.createTime) {
                return h(resizeTime, {
                  props: {
                    time: params.row.createTime
                  }
                })
              }
            }
          },
          {
            title: '变更人',
            width: 60,
            key: 'userName'
          },
          {
            title: '变更字段',
            width: 60,
            key: 'field'
          },
          {
            title: '变更前',
            width: 80,
            key: 'front'
          },
          {
            title: '变更后',
            width: 80,
            key: 'back'
          }
        ],

        printKey: false,
      }
    },
    computed: {
      printWord() {
        if(this.printKey) {
          return {
            fontSize: '16px',
            lineHeight: '22px'
          };
        } else {
          return {};
        }
      },
      printBox() {
        if(this.printKey) {
          return {
            paddingTop: '10px',
            paddingBottom: '10px',
          };
        } else {
          return {};
        }
      },
    },
    created() {
      this.printKey = false;
      this.getList();
    },
    methods: {
      //获取模板
      getList() {
        let _vm = this;
        _vm.$store.dispatch('setPageLoading', -1);
        _vm.$http.getPage({
          url: 'guard-webManager/case/findByCaseNumberSmartCaseTemplateResultMap.jhtml',
          data: {
            caseNumber: _vm.$route.query.no,
            userId: localStorage.getItem('userId'),
            hospitalId: localStorage.getItem('hospId')
          },
          success: function (res) {
            _vm.formShow = {
              customerId: _vm.$route.query.cusId,
              customerName: _vm.$route.query.cusName,
              hospitalId: localStorage.getItem('hospId'),
              createUserId: localStorage.getItem('userId'),
              caseNumber: res.data.content.caseNumberList.caseNumber,
              caseNumberId: res.data.content.caseNumberList.Id,
              caseId: res.data.content.caseNumberList.caseId,
              resultId: res.data.content.caseTemplattResultList.Id,
              templateId: '',
              detailList: [],
              logDetailList: [],
            };
            _vm.data = res.data.content.caseLogList || [];
            const formList = res.data.content.caseTemplateList || [];
            const resultList = res.data.content.caseTemplattResultList.detailList || [];
            _vm.navList = formList.filter(item => item.status === '1').map(item => {
              return {
                name: item.name,
                id: item.Id,
                number: item.number * 1,
                list: item.contentList
              };
            }).sort((x, y) => x.number - y.number) || [];
            _vm.resultList = resultList;
            _vm.chooseNav(_vm.navList[0], false);
						_vm.$store.dispatch('setPageLoading', 1);
          },
          error: function (res) {
            console.log(res)
          }
        })
      },
      //选择模板
      chooseNav(data) {
        this.getForm(data);
      },
      //生成表单
      getForm(data) {
        this.recordKey = false;
        this.navId = data.id;
        const resultList = this.resultList.filter(item => item.templateId === data.id);
        this.formList = data.list.map(item1 => {
          let obj = {
            id: item1.Id,
            type: item1.type * 1,
            name: item1.name,
            content: item1.content,
            labelList: [],
            col: item1.layout * 1,
            lineStyle: item1.lineStyle,
            number: item1.number * 1,
            size: item1.size * 1,
            unit: item1.unit,
            result: '',
          };
          if(item1.type === '4' || item1.type === '5' || item1.type === '6' || item1.type === '7') {
            item1.labelList.map(item2 => {
              obj.labelList.push({
                id: item2.Id,
                contentId: item2.contentId,
                name: item2.name
              });
            });
          }
          if(item1.type === '1' || item1.type === '2' || item1.type === '3') {
            obj.result = obj.content;
          }
          if(item1.type === '13' || item1.type === '10') {
            obj.result = [];
          }
          if(resultList.length > 0) {
            const indexR = resultList.findIndex(i => i.contentId === obj.id);
            obj.result = resultList[indexR].value;
            if(obj.type === 4 || obj.type === 6) {
              const indexName = obj.labelList.findIndex(i => i.id === resultList[indexR].value);
              obj.result = obj.labelList[indexName].name;
            }
            if(obj.type === 5) {
              const resultBox = resultList[indexR].value.split(',');
              let nameList = [];
              resultBox.map(item2 => {
                const indexName = obj.labelList.findIndex(i => i.id === item2);
                nameList.push(obj.labelList[indexName].name);
              });
              obj.result = nameList.join('、');
            }
            if(obj.type === 7) {
              const resultBox = resultList[indexR].value.split(',');
              let nameList = [];
              resultBox.map(item2 => {
                const indexName = obj.labelList.findIndex(i => i.id === item2);
                nameList.push(obj.labelList[indexName].name);
              });
              obj.result = nameList.join('/');
            }
            if(obj.type === 10 || obj.type === 13) {
              obj.result = JSON.parse(resultList[indexR].value);
            }
          }
          return obj;
        }).sort((x, y) => x.number - y.number);
      },
      downFIle(data) {
        let eleLink = document.createElement('a');
        eleLink.download = data.name;
        eleLink.style.display = 'none';
        eleLink.href = data.url;
        document.body.appendChild(eleLink);
        eleLink.click();
        document.body.removeChild(eleLink);
      },
      showRecord() {
        this.recordKey = true;
        this.navId = '';
      },
      print() {
        this.printKey = true;
        this.$nextTick(() => {
          let box = window.document.body.innerHTML;
          let inner = document.getElementById('printer').innerHTML;
          window.document.body.innerHTML = inner;
          window.print();
          this.$router.go(0);
        });
      },
      back() {
        this.$router.back(-1);
      }
    }
  }

</script>

<style lang="less" scoped>
  .case-management-cus-add {
    height: ~'calc(100% - 42px)';
    .container-body {
      height: ~'calc(100% - 68px)';
      padding: 0;
      position: relative;
      background: #F2F4F8;
      box-shadow: none;
      border-radius: 0;
    }
    .left-box {
      position: absolute;
      left: 0;
      top: 0;
      width: 300px;
      height: 100%;
      .change-record {
        padding: 30px 20px;
        margin-top: 30px;
        border-radius: 5px;
        background-color: #fff;
        box-shadow: 0 7px 14px 0 rgba(42,42,68,.1);
        p {
          padding: 8px 5px;
          font-size: 14px;
          line-height: 20px;
          border-radius: 3px;
          cursor: pointer;
          word-break: break-all;
          &.active, 
          &:hover {
            color: #4172f6;
            background: rgba(65, 114, 246, 0.07);
          }
        }
      }
    }
    .nav-left {
      overflow-y: auto;
      overflow-x: hidden;
      max-height: ~'calc(100% - 126px)';
      padding: 30px 20px;
      border-radius: 5px;
      background-color: #fff;
      box-shadow: 0 7px 14px 0 rgba(42,42,68,.1);
      li {
        padding: 8px 5px;
        font-size: 14px;
        line-height: 20px;
        border-radius: 3px;
        cursor: pointer;
        word-break: break-all;
        &.active, 
        &:hover {
          color: #4172f6;
          background: rgba(65, 114, 246, 0.07);
        }
      }
    }
    .right-box {
      position: absolute;
      right: 0;
      top: 0;
      left: 330px;
      min-width: 400px;
      height: 100%;
      .change-record-list {
        padding: 30px;
        border-radius: 5px;
        background-color: #fff;
        box-shadow: 0 7px 14px 0 rgba(42,42,68,.1);
      }
    }
    .main-right {
      overflow-y: auto;
      overflow-x: hidden;
      max-height: 100%;
      padding: 30px 20px;
      border-radius: 5px;
      background-color: #fff;
      box-shadow: 0 7px 14px 0 rgba(42,42,68,.1);
      .view-msg {
        font-size: 14px;
        line-height: 20px;
      }
    }
    .line-com {
      border-top-width: 1px;
      border-bottom-width: 0px;
      border-left-width: 0px;
      border-right-width: 0px;
      border-color: #d7dde4; 
    }
    .file-tit {
      display: inline-block;
      font-size: 14px;
      line-height: 20px;
    }
    .upload-list {
      .text {
        height: 100%;
        display: flex;
        align-items: center;
      }
      p {
        padding: 5px;
        font-size: 14px;
        line-height: 20px;
        word-break: break-all;
      }
    }
    .form-item {
      position: relative;
      padding: 10px;
    }
  }
</style>

