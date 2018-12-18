/** 
 * 效果追踪管理页面 
 */

<template>
  <div class="effectr-racking">
    <div class="scorll-tit">
      <ul class="effectr-tit">
        <li v-for='(item, index) in templateList' :key='index' :class="[templateId === item.id ? 'active' : '']" @click='chooseTemplate(item.id)'>{{item.templateName}}</li>
      </ul>
    </div>
    <div class="customer-item">
      <div class="customer-item-title">
        <h3>
          <Icon type="pricetag"></Icon>{{$t('indexEffectrRackingtext.tit1')}}</h3>
      </div>
      <div class="photo-list-box" ref='box'>
        <Row type="flex" justify="start" :gutter="40" ref='list'>
          <Col :xs='24' :sm='12' :md="8" :lg="6" v-for="(item, index) in imgList" :key='index'>
            <div class="img-item" @click="showPhoto(item, index)">
              <img :src="item.url" alt="">
              <p>{{item.createTime}}</p>
            </div>
          </Col>
        </Row>
      </div>
      <p :class="['photo-btn', moreKey ? 'active' : '']" @click="showMore" v-if='showMoreKey'>
        <Icon type="arrow-down-b"></Icon>
      </p>
    </div>
    <div class="customer-item">
      <div class="customer-item-title">
        <h3>
          <Icon type="pricetag"></Icon>{{$t('indexEffectrRackingtext.tit2')}}</h3>
      </div>
      <Table stripe :columns="col" :data="data"></Table>
    </div>
    <transition name="fade">
      <div class="show-photo" v-show='key'>
        <div class="photo-main" ref='pic'>
          <img :src="modalPhoto" alt="" :width="picWidth" :height="picHeight" :style='changeClass'/>
          <div class="table">
            <Table stripe :columns="col1" :data="data1"></Table>
          </div>
          <div class="btn-box">
            <Button type="primary" class='rotate' @click="rotate">{{$t('indexEffectrRackingtext.btn2')}}</Button>
            <Button type="primary" class='self' @click="resizeSelf">{{$t('indexPhoto.btn')}}</Button>
            <a :href="modalPhoto" download="pic" class='down'>{{$t('indexEffectrRackingtext.btn1')}}</a>
            <Button type="primary" icon="close-round" class='photo-close' @click='close'></Button>
          </div>
          <Button type="primary" icon='chevron-right' class="right" v-if='rightKey' @click="leftRightImg(true)"></Button>
          <Button type="primary" icon='chevron-left' class="left" v-if="leftKey" @click="leftRightImg(false)"></Button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        cusId: '',
        cusName: '',

        templateList: [],
        templateId: '',

        data: [],
        imgList: [],
        col: [],

        data1: [],
        col1: [],

        showMoreKey: true,
        moreKey: false,

        timer: null,

        modalPhoto: '',
        scale: 1,
        picWidth: '',
        picHeight: '',
        key: false,
        imgIndex: 0,
        rotateNum: 0,
      }
    },
    computed: {
      baseImgURL() {
        return this.$store.getters.getBaseImgURL
      },
      langRouterKey () {
        return this.$store.getters.getLandRouterKey;
      },
      leftKey() {
        return this.imgIndex > 0
          ? true
          : false;
      },
      rightKey() {
        return this.imgIndex < this.imgList.length - 1
          ? true
          : false;
      },
      changeClass() {
        return {
          transform: `scale(${this.scale}) rotate(${this.rotateNum * 90}deg)`
        }
      },
    },
    watch: {
      langRouterKey (val) {
        if(val === 'indexEffectrRackingtext') {
          this.getTemplateList();
        }
      },
    },
    created() {
      this.cusId = sessionStorage.getItem('cusId');
      this.cusName = sessionStorage.getItem('cusName');
      this.getTemplateList();
    },
    mounted() {
      let _vm = this;
      window.addEventListener('resize', _vm.resizePhoto);
    },
    beforeDestroy () {
      let _vm = this;
      window.removeEventListener('resize', _vm.resizePhoto);
      _vm.timer = null;
    },
    methods: {
      // 获取模板
      getTemplateList() {
        let _vm = this
        _vm.$store.dispatch('setPageLoading', -1);
        _vm.$http.getPage({
          url: 'guard-webManager/customerManagement/findAllSmarteffectrrackingtemplatetitle.jhtml',
          data: {status: 2},
          success: function (res) {
            const _data = res.data.content.content || [];
            if(_vm.langRouterKey !== 'indexEffectrRackingtext') {
              _vm.templateList = _data;
            } else {
              _vm.requestList(_data, ['templateName']).then(res => _vm.templateList = res);
            }
            if(_data.length) {
              console.log(_vm.$route.query.templateId)
              _vm.templateId = _vm.$route.query.templateId
                ? _vm.$route.query.templateId * 1
                : _data[0].id;
              _vm.getFormList(_vm.templateId);
              _vm.getResult(_vm.templateId);
            }
						_vm.$store.dispatch('setPageLoading', 1);
          },
          error: function (res) {
            console.log(res);
          }
        })
      },
      //获取表单
      getFormList(id) {
        let _vm = this;
        _vm.$http.get({
          url: 'guard-webManager/customerManagement/findByIdSmarteffectrrackingtemplatetitle.jhtml',
          data: {
            Id: id,
            status: 1
          },
          success: function(res){
            if(res.data.code === 0) {
              const record = res.data.content.content.filter(item => item.type !== 5) || [];
              if(_vm.langRouterKey !== 'indexEffectrRackingtext') {
                _vm.resizeCol(record);
              } else {
                _vm.requestList(record, ['contentName']).then(res => _vm.resizeCol(res));
              }
            }
          },
          error: function(res){
            console.log(res);
          }
        });
      },
      //获取结果
      getResult(id) {
        let _vm = this;
        _vm.$http.get({
          url: 'guard-webManager/customerManagement/findByTemplateIdSmartEffectrRackingResult.jhtml',
          data: {
            templateId: id,
            customerId: _vm.cusId
          },
          success: function(res){
            if(res.data.code === 0) {
              const list = res.data.content.content || [];
              _vm.data = list;
              let _imgList = [];
              list.forEach(item => {
                const img = item.ResultDetail.filter(i => i.type === 5);
                img.map(r => {
                  _imgList.push({
                    createTime: item.createTime
                      ? item.createTime.split(' ')[0]
                      : '',
                    id: item.id,
                    url: _vm.baseImgURL + r.resultName
                  });
                });
              });
              _vm.imgList = _imgList;
              _vm.$nextTick(() => {
                console.log(_vm.$refs.list.$el.clientHeight)
                _vm.showMoreKey = _vm.$refs.list.$el.clientHeight > 180 
                  ? true
                  : false;
                _vm.$refs.box.style.height = _vm.imgList.length === 0
                  ? '0px'
                  : '150px';
                _vm.moreKey = false;
              });
            }
          },
          error: function(res){
            console.log(res);
          }
        });
      },
      //构建表格
      resizeCol(data) {
        const _time = {
          title: this.$t('effectTrackingAdd.label2'),
          width: 80,
          render: (h, params) => {
            if(params.row.createTime) {
              const text = params.row.createTime.split(' ')[0];
              return h('span', text);
            }
          }
        };
        const _col = data.map(item => {
          return {
            title: item.contentName,
            width: 60,
            render: (h, params) => {
              //判断是否为同一个模板
              if(params.row.templateId === item.templateId) {
                //获取表单对应的结果
                const index = params.row.ResultDetail.findIndex(r => r.contentId === item.contentId);
                if(index >= 0) {
                  let text = params.row.ResultDetail[index].resultName;
                  //处理单位
                  if(item.type === 2) {
                    text = params.row.ResultDetail[index].resultName + ' ' + params.row.ResultDetail[index].relevanceResult;
                  }
                  //处理单选
                  if(item.type === 3) {
                    const index1 = item.labelList.findIndex(l => l.id === params.row.ResultDetail[index].resultName * 1);
                    if(index1 >= 0) {
                      text = item.labelList[index1].labelName;
                    }
                  }
                  //处理多选
                  if(item.type === 4) {
                    const box = params.row.ResultDetail[index].resultName.split(',');
                    const list = box.map(b => {
                      const index1 = item.labelList.findIndex(l => l.id === b * 1);
                      if(index1 >= 0) {
                        return item.labelList[index1].labelName;
                      } else {
                        return '';
                      }
                    }).filter(b => b);
                    text = list.join('、');
                  }
                  return h('span', text);
                }
              }
            }
          };
        });
        const _action = {
          title: this.$t('publicSet.tableAction'),
          key: 'action',
          width: 140,
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small',
                  icon: 'edit'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.toEdit(params.row)
                  }
                }
              }, this.$t('publicSet.edit')),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small',
                  icon: 'ios-trash-outline'
                },
                on: {
                  click: () => {
                    this.remove(params.row)
                  }
                }
              }, this.$t('publicSet.del'))
            ])
          }
        };
        this.col = [_time, ..._col, _action];
        this.col1 = [_time, ..._col];
      },
      //选择表单部位
      chooseTemplate(id) {
        this.templateId = id;
        this.getFormList(id);
        this.getResult(id);
      },
      remove(data) {
        let _vm = this
        _vm.$Modal.confirm({
          title: _vm.$t('publicSet.noticeTit'),
          content: _vm.$t('indexEffectrRackingtext.msg'),
          onOk: () => {
            _vm.$http.post({
              url: 'guard-webManager/customerManagement/deleteByIdSmartEffectrRackingResult.jhtml',
              data: {
                resultId: data.id,
                authType: 'deleteEffectrRacking',
                createTime: data.createTime.split(' ')[0]
              },
              success: function (res) {
                if (res.data.code === 0) {
                  _vm.getResult(_vm.templateId);
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('publicSet.noticeSuccess')
                  });
                } else {
                  if(_vm.langRouterKey !== 'indexEffectrRackingtext') {
                    _vm.$Notice.error({
                      title: _vm.$t('publicSet.noticeTit'),
                      desc: res.data.desc
                    });
                  } else {
                    _vm.getLang.word(res.data.desc, (data) => {
                      _vm.$Notice.error({
                        title: _vm.$t('publicSet.noticeTit'),
                        desc: data[0].dst
                      });
                    });
                  }
                }
              },
              error: function (res) {
                console.log(res)
              }
            })
          },
          onCancel: () => {

          }
        })
      },
      toEdit(data) {
        const breadData = [
          {
            url: '/desktop',
            text: 'layoutNav.desk'
          },
          {
            url: '/customerMsg',
            text: this.cusName
          },
          {
            url: '/effectTrackingUpdate',
            text: 'indexEffectrRackingtext.tit3'
          }
        ];
        this.$store.dispatch('setBreadData', breadData);
        this.$router.push({
          path: '/effectTrackingUpdate',
          query: {
            id: data.id,
            templateId: data.templateId,
            createTime: data.createTime.split(' ')[0]
          }
        });
      },
      //显示更改照片
      showMore() {
        const height = this.$refs.list.$el.clientHeight;
        this.moreKey = !this.moreKey;
        if(this.moreKey) {
          this.$refs.box.style.height = height - 30 + 'px';
        } else {
          this.$refs.box.style.height = '150px';
        }
      },
      resizePhoto() {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          console.log(this.$refs.list.$el.clientHeight)
          this.showMoreKey = this.$refs.list.$el.clientHeight > 180
            ? true
            : false;
          this.moreKey = false;
          this.$refs.box.style.height = '150px';
        }, 200);
        // if(this.moreKey) {  
        // }
      },
      //操作图片
      showPhoto(data, index) {
        this.modalPhoto = data.url;
        this.imgIndex = index;
        this.rotateNum = 0;
        this.scale = 1;
        this.data1 = this.data.filter(item => item.id === data.id);
        this.key = true;
        this.resizeImg();
        this.pic();
      },
      close() {
        this.key = false;
      },
      leftRightImg(type) {
        const data = type
          ? this.imgList[this.imgIndex + 1]
          : this.imgList[this.imgIndex - 1];
        const index = type
          ? this.imgIndex + 1
          : this.imgIndex - 1;
        this.showPhoto(data, index);
      },
      rotate() {
        this.rotateNum++;
      },
      pic() {
        let _vm = this
        //放大
        document.body.onmousewheel = function (event) {
          event = event || window.event
          if (_vm.key == true) {
            if (event.deltaY > 0) {
              _vm.scale = _vm.scale > 0.2 ? _vm.scale - 0.1 : _vm.scale
            } else {
              _vm.scale += 0.1
            }
            // _vm.$refs.pic.childNodes[0].style.transform = "scale(" + _vm.scale + ")"
            console.log(event.deltaY)
          }
        }
        /* 拖拽 */
        setTimeout(function () {
          if (_vm.key) {
            let oDiv = _vm.$refs.pic.childNodes[0]
            oDiv.onmousedown = function (en) {
              let ev = ev || event,
                disX = en.clientX - oDiv.offsetLeft,
                disY = en.clientY - oDiv.offsetTop
              if (oDiv.setCapture) {
                oDiv.setCapture()
              }
              document.onmousemove = function (en) {
                let ev = ev || event
                if (en.clientY > 0 && en.clientY < _vm.$refs.pic.clientHeight && en.clientX > 0 && en.clientX <
                  _vm.$refs.pic.clientWidth) {
                  oDiv.style.top = en.clientY - disY + 'px'
                  oDiv.style.left = en.clientX - disX + 'px'
                }
              }
              document.onmouseup = function () {
                document.onmousemove = null
                if (oDiv.releaseCapture) {
                  oDiv.releaseCapture()
                }
              }
              return false
            }
          }
        }, 0)
      },
      resizeImg() {
        let _domPic = this.$refs.pic.childNodes[0];
        let _picBox = this.$refs.pic;
        this.$nextTick(() => {
          // this.scale = 1;
          // _domPic.style.transform = "scale(1)";
          const _pWidth = _picBox.offsetWidth;
          const _pHeight = _picBox.offsetHeight;
          const _cWidth = _domPic.naturalWidth;
          const _cHeight = _domPic.naturalHeight;
          this.picWidth = _cWidth > _pWidth * 0.8 
            ? _pWidth * 0.8 
            : _cWidth;
          this.picHeight = _cHeight > _pHeight * 0.8 
            ? _pHeight * 0.8 
            : _cHeight;
          _domPic.style.top = `${(_pHeight - this.picHeight) / 2}px`;
          _domPic.style.left = `${(_pWidth - this.picWidth ) / 2}px`;
        })
      },
      resizeSelf() {
        let _domPic = this.$refs.pic.childNodes[0];
        let _picBox = this.$refs.pic;
        this.picWidth = _domPic.naturalWidth;
        this.picHeight = _domPic.naturalHeight;
        const _pWidth = _picBox.offsetWidth;
        const _pHeight = _picBox.offsetHeight;
        const _top = (_pHeight - this.picHeight) / 2;
        const _left = (_pWidth - this.picWidth) / 2;
        this.scale = 1;
        this.rotateNum = 0;
        // _domPic.style.transform = "scale(1)";
        _domPic.style.top = `${_top}px`;
        _domPic.style.left = `${_left}px`;
      },
    }
  }

</script>

<style scoped lang='less'>
  .effectr-racking {
    position: relative;
    padding: 20px 0 0 80px;
    min-height: 550px;
    .scorll-tit {
      position: absolute;
      left: -46px;
      top: 10px;
      width: 110px;
      overflow: hidden;
    }
    .effectr-tit {
      width: 130px;
      height: 500px;
      overflow-y: auto;
      overflow-x: hidden;
      li {
        position: relative;
        border-color: rgb(38, 30, 182);
        box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.2), 0 1px 5px 0 rgba(0,0,0,0.12);
        // background-color: rgba(65, 114, 246, 0.7);
        background-color: #5cadff;
        margin: 5px 0 15px 2px;
        font-size: 14px;
        color: #fff;
        border-radius: 0 4px 4px 0;
        padding: 7px 11px 7px 16px;
        line-height: 1;
        max-width: 100px;
        cursor: pointer;
        word-break: break-all;
        &::after {
          position: absolute;
          content: "";
          top: 100%;
          left: 0;
          border-top: 0 solid transparent;
          border-right-width: 1em;
          border-right-color: inherit;
          border-right-style: solid;
          border-bottom: 1em solid transparent;
          border-left: 0 solid transparent;
          width: 0;
          height: 0;
        }
        &:hover {
          background-color: #4172F6;
        }
      }
      .active {
        background-color: #4172F6;
      }
    }
    .img-item {
      overflow: hidden;
      position: relative;
      height: 150px;
      margin-bottom: 30px;
      border-radius: 4px;
      cursor: pointer;
      img {
        display: block;
        max-width: 100%;
        max-height: 100%;
        margin: 0 auto;
      }
      p {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 30px;
        font-size: 14px;
        line-height: 30px;
        text-align: center;
        color: #fff;
        background: rgba(0,0,0,0.30);
      }
    }
    .photo-list-box {
      overflow: hidden;
      transition: 0.2s ease-in-out;
    }
    .photo-btn {
      width: 60px;
      height: 60px;
      margin: 0 auto;
      font-size: 30px;
      line-height: 60px;
      text-align: center;
      cursor: pointer;
      i {
        transition: 0.2s ease-in-out;
      }
      &.active i {
        transform: rotate(180deg);
      }
    }
    .show-photo {
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background-color: rgba(55, 55, 55, 0.6);
      z-index: 999999;
    }
    .photo-main {
      height: 100%;
      width: 100%;
      position: relative;
      img {
        position: absolute;
        cursor: move;
      }
    }
    .btn-box {
      position: absolute;
      right: 20px;
      top: 20px;
      z-index: 10;
      button {
        vertical-align: middle;
        margin: 0 10px;
      }
    }
    .photo-close {
      top: 1px;
    }
    .down {
      display: inline-block;
      margin: 0 10px;
      height: 32px;
      min-width: 56px;
      padding: 6px 15px;
      font-size: 12px;
      line-height: 20px;
      text-align: center;
      color: #fff;
      background-color: #4172F6;
      border-radius: 4px;
      z-index: 10;
    }
    .right {
      position: absolute;
      right: 50px;
      top: 50%;
      margin-top: -16px;
      z-index: 10;
    }
    .left {
      position: absolute;
      left: 50px;
      top: 50%;
      margin-top: -16px;
      z-index: 10;
    }
    .table {
      overflow: hidden;
      position: absolute;
      bottom: 100px;
      left: 13%;
      width: 74%;
      border-radius: 4px;
    }
    .fade-enter-active,
    .fade-leave-active {
      transition: opacity .5s
    }

    .fade-enter,
    .fade-leave-to {
      opacity: 0;
    }
  }
</style>
