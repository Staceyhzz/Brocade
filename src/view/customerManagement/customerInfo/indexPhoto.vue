/** 
 * 照片管理页面 
 */

<template>
  <div class="index-photo">
    <div class="photo-item" v-if='symData.length !== 0'>
      <h2>{{$t('photoAdd.label6')}}</h2>
      <div class="box" v-for="(item, index) in symData" :key="index">
        <h3>{{item.titName}}</h3>
        <Row :gutter="48" type="flex" justify="start">
          <Col :lg='6' :md='8' :sm='12' :xs='24' v-for='(item1, indx1) in item.child' :key='indx1'>
            <div class="photo-list">
              <p>{{item1.createtime}}</p>
              <div class="action">
                <span @click='toEdit(item1.id)'>
                  <Icon type="edit" color='#3598dc'></Icon>
                </span>
                <span @click='remove(item1.id)'>
                  <Icon type="ios-trash-outline" color='red'></Icon>
                </span>
              </div>
              <img :src="item1.imageurl" alt="" class="img-item" @click='showPhoto(item1.imageurl)' />
              <p>{{item1.remark}}</p>
            </div>
          </Col>
        </Row>
      </div>
    </div>
    <div class="photo-item" v-if='chargeData.length !== 0'>
      <h2>{{$t('indexPhoto.label')}}</h2>
      <div class="box" v-for="(item, index) in chargeData" :key="index">
        <h3>{{item.titName}}</h3>
        <Row :gutter="48" type="flex" justify="start">
          <Col :lg='6' :md='8' :sm='12' :xs='24' v-for='(item1, indx1) in item.child' :key='indx1'>
            <div class="photo-list">
              <p>{{item1.createtime}}——{{item1.typeName}}</p>
              <div class="action">
                <span @click='toEdit(item1.id)'>
                  <Icon type="edit" color='#3598dc'></Icon>
                </span>
                <span @click='remove(item1.id)'>
                  <Icon type="ios-trash-outline" color='red'></Icon>
                </span>
              </div>
              <img :src="item1.imageurl" alt="" class="img-item" @click='showPhoto(item1.imageurl)' />
              <p>{{item1.remark}}</p>
            </div>
          </Col>
        </Row>
      </div>
    </div>
    <div class="photo-item" v-if='otherData.length !== 0'>
      <h2>{{$t('photoAdd.label10')}}</h2>
      <div class="box">
        <h3></h3>
        <Row :gutter="48" type="flex" justify="start">
          <Col :lg='6' :md='8' :sm='12' :xs='24' v-for="(item, index) in otherData" :key="index">
            <div class="photo-list">
              <p>{{item.createtime}}</p>
              <div class="action">
                <span @click='toEdit(item.id)'>
                  <Icon type="edit" color='#3598dc'></Icon>
                </span>
                <span @click='remove(item.id)'>
                  <Icon type="ios-trash-outline" color='red'></Icon>
                </span>
              </div>
              <img :src="item.imageurl" alt="" class="img-item" @click='showPhoto(item.imageurl)' />
              <p>{{item.remark}}</p>
            </div>
          </Col>
        </Row>
      </div>
    </div>
    <transition name="fade">
      <div class="show-photo" v-show='key'>
        <div class="photo-main" ref='pic'>
          <img :src="modalPhoto" alt="" :width="picWidth" :height="picHeight" :style='changeClass'/>
          <div class="btn-box">
            <Button type="primary" class='rotate' @click="rotate">{{$t('indexEffectrRackingtext.btn2')}}</Button>
            <Button type="primary" class='self' @click="resizeSelf">{{$t('indexPhoto.btn')}}</Button>
            <a :href="modalPhoto" download="pic" class='down'>{{$t('indexEffectrRackingtext.btn1')}}</a>
            <Button type="primary" icon="close-round" class='photo-close' @click='close'></Button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        key: false,
        data: [],
        typeList: [
          {
            id: 1,
            name: this.$t('photoAdd.label6')
          },
          {
            id: 2,
            name: this.$t('photoAdd.label7')
          },
          {
            id: 3,
            name: this.$t('photoAdd.label8')
          },
          {
            id: 4,
            name: this.$t('photoAdd.label9')
          },
          {
            id: 5,
            name: this.$t('photoAdd.label10')
          }
        ],
        cusId: '',
        cusName: '',
        modalPhoto: '',
        scale: 1,
        picWidth: '',
        picHeight: '',
        rotateNum: 0,
      }
    },
    computed: {
      baseImgURL() {
        return this.$store.getters.getBaseImgURL
      },
      changeClass() {
        return {
          transform: `scale(${this.scale}) rotate(${this.rotateNum * 90}deg)`
        }
      },
      symData() {
        if(this.data.length === 0) {
          return [];
        }
        const symList = this.data.filter(item => item.symptomid);
        if(symList.length === 0) {
          return [];
        }
        const propsList = symList.map(item => item.symptomid);
        const propsListSingle = [...new Set(propsList)];
        let result = [];
        propsListSingle.forEach(item => {
          const list = symList.filter(s => s.symptomid === item).sort((x, y) => x.time - y.time);
          result.push({
            titName: list[0].symptomName,
            titId: item,
            child: list
          });
        });
        return result;
      },
      chargeData() {
        if(this.data.length === 0) {
          return [];
        }
        const chargeList = this.data.filter(item => item.chargeid);
        if(chargeList.length === 0) {
          return [];
        }
        const propsList = chargeList.map(item => item.chargeid);
        const propsListSingle = [...new Set(propsList)];
        let result = [];
        propsListSingle.forEach(item => {
          const list = chargeList.filter(c => c.chargeid === item);
          const first = list.filter(l => l.type === 2).sort((x, y) => x.time - y.time);
          const second = list.filter(l => l.type === 3).sort((x, y) => x.time - y.time);
          const third = list.filter(l => l.type === 4).sort((x, y) => x.time - y.time);
          result.push({
            titName: list[0].chargeName,
            titId: item,
            child: [...first, ...second, ...third]
          });
        });
        return result;
      },
      otherData() {
        if(this.data.length === 0) {
          return [];
        }
        const otherList = this.data.filter(item => item.type === 5);
        if(otherList.length === 0) {
          return [];
        }
        return otherList.sort((x, y) => x.time - y.time);
      },
      langRouterKey () {
        return this.$store.getters.getLandRouterKey;
      },
    },
    watch: {
      langRouterKey (val) {
        if(val === 'indexPhoto') {
          this.getList();
        }
      },
    },
    created() {
      this.cusId = sessionStorage.getItem('cusId');
      this.cusName = sessionStorage.getItem('cusName');
      this.getList();
    },
    methods: {
      // 获取资料
      getList() {
        let _vm = this
        _vm.$store.dispatch('setPageLoading', -1)
        _vm.$http.getPage({
          url: 'guard-webManager/customerRecord/getPhoto.jhtml',
          data: {
            id: _vm.cusId
          },
          success: function (res) {
            const _data = res.data.content.map(item => {
              return {
                id: item.id,
                type: item.type,
                typeName: _vm.typeList.find(t => t.id === item.type).name || '',
                createtime: item.createtime
                  ? item.createtime.split(' ')[0]
                  : '',
                time: new Date(item.createtime),
                symptomName: item.symptomName,
                symptomid: item.symptomid,
                chargeName: item.chargeName,
                chargeid: item.chargeid,
                imageurl: item.imageurl,
                remark: item.remark
              };
            }) || [];
            if(_vm.langRouterKey !== 'indexPhoto') {
              _vm.data = _data;
            } else {
              _vm.requestList(_data, ['symptomName', 'chargeName', 'remark']).then(res => _vm.data = res);
            }
						_vm.$store.dispatch('setPageLoading', 1);
          },
          error: function (res) {
            console.log(res);
          }
        })
      },
      remove(id) {
        let _vm = this
        _vm.$Modal.confirm({
          title: _vm.$t('publicSet.noticeTit'),
          content: _vm.$t('indexPhoto.msg'),
          onOk: () => {
            _vm.$http.post({
              url: 'guard-webManager/customerRecord/deletePhoto.jhtml',
              data: {
                id: id
              },
              success: function (res) {
                if (res.data.code === 0) {
                  _vm.getList();
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('publicSet.noticeSuccess')
                  });
                } else {
                  if(_vm.langRouterKey !== 'indexPhoto') {
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
      toEdit(id) {
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
            url: '/photoUpdate',
            text: 'indexPhoto.tit'
          }
        ];
        this.$store.dispatch('setBreadData', breadData);
        this.$router.push({
          path: '/photoUpdate',
          query: {
            id: id
          }
        });
      },
      showPhoto(url) {
        let _vm = this
        _vm.modalPhoto = url
        _vm.rotateNum = 0;
        _vm.scale = 1;
        _vm.key = true
        _vm.resizeImg()
        _vm.pic()
      },
      rotate() {
        this.rotateNum++;
      },
      close() {
        this.key = false
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
        let _vm = this,
          _domPic = _vm.$refs.pic.childNodes[0],
          _picBox = _vm.$refs.pic
        _vm.$nextTick(() => {
          // _vm.scale = 1
          // _domPic.style.transform = "scale(1)"
          const _pWidth = _picBox.offsetWidth
          const _pHeight = _picBox.offsetHeight
          const _cWidth = _domPic.naturalWidth
          const _cHeight = _domPic.naturalHeight
          _vm.picWidth = _cWidth > _pWidth * 0.8 ? _pWidth * 0.8 : _cWidth
          _vm.picHeight = _cHeight > _pHeight * 0.8 ? _pHeight * 0.8 : _cHeight
          _domPic.style.top = `${(_pHeight - _vm.picHeight) / 2}px`
          _domPic.style.left = `${(_pWidth - _vm.picWidth ) / 2}px`
        })
      },
      resizeSelf() {
        let _vm = this,
          _domPic = _vm.$refs.pic.childNodes[0],
          _picBox = _vm.$refs.pic
        _vm.picWidth = _domPic.naturalWidth
        _vm.picHeight = _domPic.naturalHeight
        const _pWidth = _picBox.offsetWidth
        const _pHeight = _picBox.offsetHeight
        const _top = (_pHeight - _vm.picHeight) / 2
        const _left = (_pWidth - _vm.picWidth) / 2
        _vm.scale = 1
        _vm.rotateNum = 0;
        // _domPic.style.transform = "scale(1)"
        _domPic.style.top = `${_top}px`
        _domPic.style.left = `${_left}px`
      },
    }
  }

</script>

<style scoped lang='less'>
  .index-photo {
    padding-top: 30px;
    .photo-item {
      h2 {
        padding: 15px 0;
      }
      .box {
        overflow: hidden;
        padding-left: 150px;
        border-bottom: 1px solid #eee;
        margin-bottom: 10px;
      }
      h3 {
        float: left;
        width: 100px;
        height: 100%;
        margin-left: -130px;
        font-weight: normal;
      }
    }
    .photo-list {
      padding-bottom: 20px;
      p {
        font-size: 13px;
        word-break: break-all;
      }
    }
    .item-title {
      color: #f2784b;
    }
    .action {
      font-size: 14px;
      text-align: right;
      i {
        padding: 0 3px;
        cursor: pointer;
      }
    }
    .img-item {
      display: block;
      max-width: 100%;
      max-height: 150px;
      cursor: pointer;
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

<style>
  .show-photo .photo-close .ivu-icon {
    position: relative;
    top: 1px;
    left: 0px;
  }
</style>
