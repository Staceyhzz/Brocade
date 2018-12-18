/**
* 问卷模板设计页面
*/

<template>
  <div class="container-box">
    <div class="container-header">
      <h2>{{$t('layoutNav.surveyManage')}}————{{titMsg}}</h2>
      <ul class="header-btn-group">
        <li class="header-item" @click="toChoice(2)"><Icon type="plus-round"></Icon>{{$t('surveyEdit.msg1')}}</li>
        <li class="header-item" @click="toFill(2)"><Icon type="plus-round"></Icon>{{$t('surveyEdit.msg3')}}</li>
      </ul>
    </div>
    <div class="container-body">
      <Table stripe :columns="columns" :data="data"></Table>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        titMsg: '',
        id: '',
        columns: [
          {   
            title: this.$t('labelPublic.xh'),
            type: 'index',
            width: 60
          },
          {
            title: this.$t('surveyEdit.colTit1'),
            width: 60,
            key: 'type',
            render: (h, params) => {
              const index = this.typeList.findIndex(item => item.id === params.row.type);
              if(index >= 0) {
                return h('span', this.$t(this.typeList[index].lang));
              }
            }
          },
          {
            title: this.$t('surveyEdit.colTit2'),
            width: 100,
            render: (h, params) => {
              return h('div', {
                domProps: {
                  innerHTML: params.row.content
                }
              })
            }
          },
          {
            title: this.$t('surveyEdit.colTit3'),
            key: 'action',
            width: 120,
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small',
                    icon: 'arrow-up-c'
                  },
                  style: {
                    marginRight: '2px'
                  },
                  on: {
                    click: () => {
                      this.change(params.row, 'up')
                    }
                  }
                }),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small',
                    icon: 'arrow-down-c'
                  },
                  on: {
                    click: () => {
                      this.change(params.row, 'down')
                    }
                  }
                }),
                ])
            }
          },
          {
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
                    marginRight: '2px'
                  },
                  on: {
                    click: () => {
                      if(params.row.type == 3) {
                        this.toFill(1, params.row.id)
                      } else {
                        this.toChoice(1, params.row.id)
                      }
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
                }, this.$t('publicSet.del')),
                ])
            }
          }
        ],
        typeList: [
          {
            id: 1,
            name: '单选题',
            lang: 'surveyEdit.radio'
          },
          {
            id: 2,
            name: '多选题',
            lang: 'surveyEdit.multiselect'
          },
          {
            id: 3,
            name: '填空题',
            lang: 'surveyEdit.completion'
          }
        ],
        data: []
      }
    },
    created () {
      if(typeof this.$route.query.id == 'string') {
        this.id = this.$route.query.id
        this.titMsg = this.$route.query.name
      } else {
        let lg = window.sessionStorage;
        this.id = JSON.parse(lg.query34).id
        this.titMsg = JSON.parse(lg.query34).name
      }
      this.getList()
    },
    methods: {
      getList () {
        let _vm = this;
        _vm.$store.dispatch('setPageLoading', -1)
        _vm.$http.getPage({
          url: 'guard-webManager/survey/getTemplate.jhtml',
          data: {id: _vm.id},
          success: function(res){
            console.log(res)
            _vm.data = res.data.content || [];
            _vm.$store.dispatch('setPageLoading', 1);
          },
          error: function(res){
            console.log(res);
          }
        });
      },
      change (data, type) {
        let _vm = this,
        _url = ''
        if(type === 'up') {
          _url = 'guard-webManager/surveyTitle/moveUp.jhtml'
        } else {
          _url = 'guard-webManager/surveyTitle/moveDown.jhtml'
        }
        _vm.$http.post({
          url: _url,
          data: {id: data.id},
          success: function(res){
            if(res.data.code === 0 ){
              _vm.$Notice.success({
                title: _vm.$t('publicSet.noticeTit'),
                desc: _vm.$t('publicSet.noticeSuccess')
              });
              _vm.getList()
            } else {
              _vm.$Notice.error({
                title: _vm.$t('publicSet.noticeTit'),
                desc: res.data.desc
              });
              _vm.saveLoad = false
            }
          },
          error: function(res){
            console.log(res);
          }
        })
      },
      remove (data) {
        let _vm = this
        const index = _vm.typeList.findIndex(item => item.id === data.type);
        const lang = _vm.typeList[index].lang || '';
        _vm.$Modal.confirm({
          title: _vm.$t('publicSet.noticeTit'),
          content: `<p>${_vm.$t('surveyEdit.modalMsg')} ${_vm.$t(lang)}</p>`,
          onOk: () => {
            _vm.$http.post({
              url: 'guard-webManager/surveyTitle/del.jhtml',
              data: {id: data.id},
              success: function(res){
                if(res.data.code === 0 ){
                  _vm.getList()
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('publicSet.noticeSuccess')
                  });
                } else {
                  _vm.$Notice.error({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: res.data.desc
                  })
                }
              },
              error: function(res){
                console.log(res)
              }
            });
          },
          onCancel: () => {

          }
        })
      },
      toFill (type, id) {
        let _text = '',
        _id = ''
        if(type == 2) {
          _text = 'surveyEdit.msg3'
          _id = this.id
        } else {
          _text = 'surveyEdit.msg4'
          _id = id
        }
        let breadData = [
          {
            url: '/desktop',
            text: 'layoutNav.desk'
          },
          {
            url: '/survey',
            text: 'layoutNav.surveyManage'
          },
          {
            url: '/surveyEdit',
            text: this.titMsg
          },
          {
            url: '/surveyRtfFill',
            text: _text
          },
        ]
        this.$store.dispatch('setBreadData', breadData);
        this.$router.push({
          path: '/surveyRtfFill',
          query: {
            id: _id,
            type: type
          }
        })
      },
      toChoice (type, id) {
        let _text = '',
        _id = ''
        if(type == 2) {
          _text = 'surveyEdit.msg1'
          _id = this.id
        } else {
          _text = 'surveyEdit.msg2'
          _id = id
        }
        let breadData = [
          {
            url: '/desktop',
            text: 'layoutNav.desk'
          },
          {
            url: '/survey',
            text: 'layoutNav.surveyManage'
          },
          {
            url: '/surveyEdit',
            text: this.titMsg
          },
          {
            url: '/surveyRtfChoice',
            text: _text
          },
        ]
        this.$store.dispatch('setBreadData', breadData);
        this.$router.push({
          path: '/surveyRtfChoice',
          query: {
            id: _id,
            type: type
          }
        })
      },
    }
  }
</script>