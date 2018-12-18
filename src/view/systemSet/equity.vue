/**
 * 权益管理
 */

<template>
  <div class="container-box">
    <div class="container-header">
      <h2>{{$t('layoutNav.equityManage')}}</h2>
    </div>
    <div class="container-body">
      <div class="equity-box">
        <h3><Icon type="pricetag"></Icon>{{$t('equity.tit1')}}</h3>
        <ul class="header-btn-group">
          <li class="header-item" @click="add(true)"><Icon type="plus-round"></Icon>{{$t('publicSet.add')}}</li>
        </ul>
      </div>
      <Table stripe :columns="col" :data="data"></Table>
      <div class="equity-box second">
        <h3><Icon type="pricetag"></Icon>{{$t('equity.tit2')}}</h3>
        <ul class="header-btn-group">
          <li class="header-item" @click="add(false)"><Icon type="plus-round"></Icon>{{$t('publicSet.add')}}</li>
        </ul>
      </div>
      <Table stripe :columns="col1" :data="data1"></Table>
    </div>
    <Modal
      :title="modalTit"
      v-model="modalEdit"
      :closable="false"
      @on-ok="ok"
      :loading="loading"
      class-name="vertical-center-modal">
      <Form ref="formEdit" :model="formEdit" :rules="rule" :label-width="100" label-position="right">
        <Form-item :label="$t('labelPublic.mc')" prop="name">
          <Input v-model.trim="formEdit.name" :placeholder="$t('placeholderPublic.input')" :maxlength='20'></Input>
        </Form-item>
        <Form-item :label="$t('equity.label')" prop="discount" v-if='typeKey'>
          <cmptInputNumber :max="100" :min="0" v-model="formEdit.discount" @on-change='setDiscount' style='width: 160px'></cmptInputNumber>
        </Form-item>
        <Form-item :label="$t('equity.colTit2')" prop="content">
          <Input v-model.trim="formEdit.content" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('placeholderPublic.input')"></Input>
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
        col: [
          {   
            title: this.$t('labelPublic.xh'),
            type: 'index',
            width: 60
          },
          {
            title: this.$t('labelPublic.mc'),
            key: 'nameLang'
          },
          {
            title: this.$t('equity.colTit1'),
            key: 'discount',
            render: (h, params) => {
              const text = (params.row.discount * 100).toFixed(2)
              return h('span', text)
            }
          },
          {
            title: this.$t('equity.colTit2'),
            key: 'contentLang'
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
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.edit(true, params.row)
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
        col1: [
          {   
            title: this.$t('labelPublic.xh'),
            type: 'index',
            width: 60
          },
          {
            title: this.$t('labelPublic.mc'),
            key: 'nameLang'
          },
          {
            title: this.$t('equity.colTit2'),
            key: 'contentLang'
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
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.edit(false, params.row)
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
        data1: [],

        modalTit: '',
        modalEdit: false,
        loading: true,

        typeKey: true,
        editKey: true,
        formEdit: {
          id: '',
          name: '',
          content: '',
          discount: 100
        },
        rule: {
          name: [
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
        if(val === 'equity') {
          this.getList();
        }
      },
    },
    created () {
      this.getList()
    },
    methods: {
      getList () {
        let _vm = this;
        _vm.$store.dispatch('setPageLoading', -1);
        _vm.$http.getPage({
          url: 'guard-webManager/equity/list.jhtml',
          success: function(res){
            const props = ['name', 'content'];
            const _data = res.data.content.DiscountList.map(item => {
              let obj = {
                ...item
              };
              props.map(p => {
                obj[p + 'Lang'] = obj[p];
              });
              return obj;
            }) || [];
            const _data1 = res.data.content.CustomList.map(item => {
              let obj = {
                ...item
              };
              props.map(p => {
                obj[p + 'Lang'] = obj[p];
              });
              return obj;
            }) || [];
            if(_vm.langRouterKey !== 'equity') {
              _vm.data = _data;
              _vm.data1 = _data1;
            } else {
              const list = props.map(item => item + 'Lang');
              _vm.requestList(_data, list).then(res => _vm.data = res);
              _vm.requestList(_data1, list).then(res => _vm.data1 = res);
            }
            _vm.$store.dispatch('setPageLoading', 1);
          },
          error: function(res){
            console.log(res);
          }
        });
      },
      setDiscount (val) {
        this.$nextTick(() => {
          this.formEdit.discount = parseFloat((val).toFixed(2));
        });
      },
      add (type) {
        if(type) {
          this.modalTit = this.$t('equity.modalTit1');
        } else {
          this.modalTit = this.$t('equity.modalTit3');
        }
        this.typeKey = type;
        this.editKey = true;
        this.$refs.formEdit.resetFields();
        this.modalEdit = true;
      },
      edit (type, data) {
        this.$refs.formEdit.resetFields();
        this.formEdit = {
          id: data.id,
          name: data.name || '',
          content: data.content,
          discount: data.discount || data.discount === 0
            ? data.discount * 100
            : 100
        };
        if(type) {
          this.modalTit = this.$t('equity.modalTit2');
        } else {
          this.modalTit = this.$t('equity.modalTit4');
        }
        this.typeKey = type;
        this.editKey = false;
        this.modalEdit = true;
      },
      remove (data) {
        let _vm = this;
        _vm.$Modal.confirm({
          title: _vm.$t('publicSet.noticeTit'),
          content: `<p>${_vm.$t('equity.msg1')}</p>
          <p>${_vm.$t('equity.msg2')}</p>
          <p>${_vm.$t('labelPublic.mc')}：${data.nameLang}</p>`,
          onOk: () => {
            _vm.$http.post({
              url: 'guard-webManager/equity/del.jhtml',
              data: {id: data.id},
              success: function(res){
                if(res.data.code === 0){
                  _vm.getList()
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('publicSet.noticeSuccess')
                  });
                } else {
                  if(_vm.langRouterKey !== 'equity') {
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
                console.log(res);
              }
            });
          },
          onCancel: () => {

          }
        });
      },
      ok () {
        let _vm = this;
        let _url = '';
        if(_vm.typeKey) {
          if(_vm.editKey) {
            _url = 'guard-webManager/equity/addDiscount.jhtml';
          } else {
            _url = 'guard-webManager/equity/updateDiscount.jhtml';
          }
        } else {
          if(_vm.editKey) {
            _url = 'guard-webManager/equity/addCustom.jhtml';
          } else {
            _url = 'guard-webManager/equity/updateCustom.jhtml';
          }
        }
        _vm.$refs.formEdit.validate((valid) => {
          if (valid) {
            _vm.$http.post({
              url: _url,
              data: _vm.formEdit,
              success: function(res){
                if(res.data.code === 0){
                  _vm.getList();
                  _vm.modalEdit = false;
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('publicSet.noticeSuccess')
                  });
                } else {
                  if(_vm.langRouterKey !== 'equity') {
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
                    _vm.loading = true;
                  });
                }
              },
              error: function(res){
                console.log(res);
              }
            });
          } else {
            _vm.loading = false
            _vm.$nextTick(() => {
              _vm.loading = true
            });
          }
        })
      }
    }
  }
</script>

<style scoped>
  .equity-box {
    overflow: hidden;
    padding-bottom: 15px;
  }
  .equity-box.second {
    padding-top: 15px;
  }
  .equity-box h3 {
    float: left;
    line-height: 29px;
    font-weight: normal;
  }
</style>
<style>
  .equity-box h3 i {
    margin-right: 10px;
  }
</style>



