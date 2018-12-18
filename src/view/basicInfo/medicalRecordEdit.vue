/**
* 病历模板管理设计页面
*/

<template>
  <div class="container-box">
    <div class="container-header">
      <h2>{{$t('layoutNav.medicalRecordManage')}}————{{titMsg}}</h2>
      <ul class="header-btn-group">
        <li class="header-item" @click="add()"><Icon type="plus-round"></Icon>{{$t('medicalRecordEdit.msg1')}}</li>
        <li class="header-item" @click="toRtf(2)"><Icon type="plus-round"></Icon>{{$t('medicalRecordEdit.msg3')}}</li>
      </ul>
    </div>
    <div class="container-body">
      <Table stripe :columns="columns" :data="data"></Table>
    </div>
    <Modal
      :title="modalTit"
      v-model="modal"
      :closable="false"
      @on-ok="ok"
      :loading="loading"
      class-name="vertical-center-modal">
      <Form ref="formValidate" :model="formValidate" :rules="ruleForm" :label-width="100" label-position="right">
        <Form-item :label="$t('labelPublic.mc')" prop="title" required>
          <Input v-model.trim="formValidate.title" :placeholder="$t('placeholderPublic.input')" :maxlength='100'></Input>
        </Form-item>
      </Form>
    </Modal>
  </div>
</template>

<script>
  export default {
    data () {
      const validateName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('validPublic.name')));
        } else {
          callback();
        }
      };
      return {
        modalTit: '',
        modal: false,
        loading: true,
        seen: true,
        titMsg: '',
        id: '',
        formValidate: {
          id: '',
          title: '',
        },
        columns: [
          {   
            title: this.$t('labelPublic.xh'),
            type: 'index',
            width: 60
          },
          {
            title: this.$t('medicalRecordEdit.colTit1'),
            width: 60,
            key: 'titleLang'
          },
          {
            title: this.$t('medicalRecordEdit.colTit2'),
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
            align: 'center',
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
                      if(params.row.type == 1) {
                        this.edit(params.row)
                      } else {
                        this.toRtf(1, params.row.id)
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
        data: [],
        ruleForm: {
          title: [
            { validator: validateName, trigger: 'blur' }
          ]
        }
      }
    },
    computed: {
      langRouterKey () {
        return this.$store.getters.getLandRouterKey;
      },
    },
    watch: {
      langRouterKey (val) {
        if(val === 'medicalRecordEdit') {
          this.getList();
        }
      },
    },
    created () {
      if(typeof this.$route.query.id == 'string') {
        this.id = this.$route.query.id
        this.titMsg = this.$route.query.name
      } else {
        var lg = window.sessionStorage;
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
          url: 'guard-webManager/medicalRecord/getTemplate.jhtml',
          data: {id: _vm.id},
          success: function(res){
            const props = ['title'];
            const _data = res.data.content.list.map(item => {
              let obj = {
                ...item
              };
              props.map(p => {
                obj[p + 'Lang'] = obj[p];
              });
              return obj;
            }) || [];
            if(_vm.langRouterKey !== 'medicalRecordEdit') {
              _vm.data = _data;
            } else {
              const list = props.map(item => item + 'Lang');
              _vm.requestList(_data, list).then(res => _vm.data = res);
            }
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
          _url = 'guard-webManager/medicalRecordDetail/moveUp.jhtml'
        } else {
          _url = 'guard-webManager/medicalRecordDetail/moveDown.jhtml'
        }
        _vm.$http.post({
          url: _url,
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
              });
              _vm.saveLoad = false
            }
          },
          error: function(res){
            console.log(res);
          }
        })
      },
      add () {
        this.modalTit = this.$t('medicalRecordEdit.msg1');
        this.$refs['formValidate'].resetFields()
        this.formValidate.id = this.id
        this.seen = false
        this.modal = true
      },
      edit (data) {
        this.modalTit = this.$t('medicalRecordEdit.msg2');
        this.$refs['formValidate'].resetFields()
        this.formValidate.id = data.id
        this.formValidate.title = data.title
        this.seen = true
        this.modal = true
      },
      ok () {
        let _vm = this,
        _url = ''
        _vm.$refs['formValidate'].validate((valid) => {
          if (valid) {
            if(_vm.seen) {
              _url = 'guard-webManager/medicalRecordDetail/updateCommon.jhtml'
            } else {
              _url = 'guard-webManager/medicalRecordDetail/addCommon.jhtml'
            }
            _vm.$http.post({
              url: _url,
              data: _vm.formValidate,
              success: function(res){
                if(res.data.code === 0 ){
                  _vm.getList()
                  _vm.$refs['formValidate'].resetFields()
                  _vm.modal = false
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('publicSet.noticeSuccess')
                  });
                } else {
                  if(_vm.langRouterKey !== 'medicalRecordEdit') {
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
                  _vm.loading = false
                  _vm.$nextTick(() => {
                    _vm.loading = true
                  })
                }
              },
              error: function(res){
                console.log(res)
              }
            })
          } else {
            _vm.loading = false
            _vm.$nextTick(() => {
              _vm.loading = true
            })
          }
        })
      },
      remove (data) {
        let _vm = this
        _vm.$Modal.confirm({
          title: _vm.$t('publicSet.noticeTit'),
          content: _vm.$t('medicalRecordEdit.msg5') + data.titleLang + '?',
          onOk: () => {
            _vm.$http.post({
              url: 'guard-webManager/medicalRecordDetail/del.jhtml',
              data: {id: data.id},
              success: function(res){
                if(res.data.code === 0 ){
                  _vm.getList()
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('publicSet.noticeSuccess')
                  });
                } else {
                  if(_vm.langRouterKey !== 'medicalRecordEdit') {
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
              error: function(res){
                console.log(res)
              }
            });
          },
          onCancel: () => {

          }
        })
      },
      toRtf (type, id) {
        let _text = '',
        _id = ''
        if(type == 2) {
          _text = 'medicalRecordEdit.msg3'
          _id = this.id
        } else {
          _text = 'medicalRecordEdit.msg4'
          _id = id
        }
        let breadData = [
          {
            url: '/desktop',
            text: 'layoutNav.desk'
          },
          {
            url: '/medicalRecord',
            text: 'layoutNav.medicalRecordManage'
          },
          {
            url: '/medicalRecordEdit',
            text: this.titMsg
          },
          {
            url: '/medicalRecordRtf',
            text: _text
          },
        ]
        this.$store.dispatch('setBreadData', breadData);
        this.$router.push({
          path: '/medicalRecordRtf',
          query: {
            id: _id,
            type: type
          }
        })
      },
    }
  }
</script>