/**
* 标签管理
*/

<template>
  <div class="container-box">
    <div class="container-header">
      <h2>{{$t('layoutNav.tagManage')}}</h2>
      <ul class="header-btn-group">
        <li class="header-item" @click="add"><Icon type="plus-round"></Icon>{{$t('publicSet.add')}}</li>
      </ul>
    </div>
    <div class="container-body">
      <Form :label-width="50" inline ref='formSearch' :model='formSearch' @submit.native.prevent>
        <Form-item :label="$t('labelPublic.mc')" prop='name'>
          <Input v-model.trim="formSearch.name" :placeholder="$t('placeholderPublic.input')" @on-enter="getList('1', '10', formSearch.name)"></Input>
        </Form-item>
        <ul class="header-btn-group not-float">
          <li class="header-item" @click="getList('1', '10', formSearch.name)"><Icon type="search"></Icon>{{$t('publicSet.search')}}</li>
          <li class="header-item" @click="handleReset('formSearch')"><Icon type="refresh"></Icon>{{$t('publicSet.reset')}}</li>
        </ul>
      </Form>
      <Table stripe :columns="columns" :data="data"></Table>
      <div class="table-page">
        <div class="table-info">{{$t('publicSet.pageMsg', [pageNumber, totalPages, total])}}</div>
        <Page class="table-paginate" :total="total" @on-change='changePage' :current='pageNumber' show-elevator></Page>
      </div>
      <Modal
        :title="modalTit"
        v-model="modalEdit"
        :closable="false"
        @on-ok="ok"
        :loading="loading"
        class-name="vertical-center-modal">
          <Form ref="formValidate" :model="formValidate" :rules="ruleForm" :label-width="100" label-position="right">
            <Form-item :label="$t('labelPublic.mc')" prop="name" required>
              <Input v-model.trim="formValidate.name" :placeholder="$t('placeholderPublic.input')" :maxlength='20'></Input>
            </Form-item>
            <Form-item :label="$t('labelPublic.zt')" prop="status" v-if='seen'>
              <Radio-group v-model="formValidate.status">
                <Radio :label="1">{{$t('publicSet.enable')}}</Radio>
                <Radio :label="0">{{$t('publicSet.disable')}}</Radio>
              </Radio-group>
            </Form-item>
          </Form>
      </Modal>
    </div>
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
        columns: [
          {   
            title: this.$t('labelPublic.xh'),
            width: 60,
            render: (h, params) => {
              const _index = (this.pageNumber - 1) * 10
              return h('span', params.index + 1 + _index)
            }
          },
          {
            title: this.$t('labelPublic.mc'),
            key: 'nameLang',
            width: 60
          },
          {
            title: this.$t('labelPublic.zt'),
            width: 70,
            key: 'status',
            render: (h, params) => {
              const color = params.row.status === 1 
                ? '#4172F6' 
                : '#FF6F76';
              const text = params.row.status === 1 
                ? this.$t('publicSet.enable') 
                : this.$t('publicSet.disable');
              return h('span', {
                style: {
                  color: color
                }
              },text)
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
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.edit(params.row)
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
        total: 0,
        totalPages: 0,
        pageNumber: 1,
        modalTit: '',
        modalEdit: false,
        loading: true,
        seen: true,
        formSearch: {
          name: ''
        },
        formValidate: {
          id: '',
          name: '',
          status: ''
        },
        ruleForm: {
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
        if(val === 'tag') {
          this.getList(this.pageNumber, 10, this.formSearch.name);
        }
      },
    },
    created () {
      this.getList('1', '10', this.formSearch.name)
    },
    methods: {
      getList (pageNumber, pageSize, name) {
        let _vm = this;
        _vm.$store.dispatch('setPageLoading', -1);
        if(name.length == 0) {
          name = null
        }
        _vm.$http.getPage({
          url: 'guard-webManager/tag/page.jhtml',
          data: {
            pageNumber: pageNumber,
            pageSize: pageSize,
            name: name
          },
          success: function(res){
            const props = ['name'];
            const _data = res.data.content.content.map(item => {
              let obj = {
                ...item
              };
              props.map(p => {
                obj[p + 'Lang'] = obj[p];
              });
              return obj;
            }) || [];
            if(_vm.langRouterKey !== 'tag') {
              _vm.data = _data;
            } else {
              const list = props.map(item => item + 'Lang');
              _vm.requestList(_data, list).then(res => _vm.data = res);
            }
            _vm.total = res.data.content.total || 0;
            _vm.pageNumber = res.data.content.pageNumber || 1;
            _vm.totalPages = res.data.content.totalPages || 1;
            console.log(res)
            _vm.$store.dispatch('setPageLoading', 1);
          },
          error: function(res){
            console.log(res);
          }
        });
      },
      add () {
        this.modalTit = this.$t('tag.modalTit1');
        this.$refs['formValidate'].resetFields();
        this.seen = false;
        this.modalEdit = true;
      },
      edit (data) {
        this.modalTit = this.$t('tag.modalTit2');
        this.$refs['formValidate'].resetFields();
        this.formValidate.id = data.id;
        this.formValidate.name = data.name;
        this.formValidate.status = data.status;
        this.seen = true;
        this.modalEdit = true;
      },
      remove (data) {
        let _vm = this;
        _vm.$Modal.confirm({
          title: _vm.$t('publicSet.noticeTit'),
          content: `<p>${_vm.$t('tag.msg1')}</p>
          <p>${_vm.$t('tag.msg2')}</p>
          <p>${_vm.$t('labelPublic.mc')}：${data.nameLang}</p>`,
          onOk: () => {
            _vm.$http.post({
              url: 'guard-webManager/tag/del.jhtml',
              data: {id: data.id},
              success: function(res){
                if(res.data.code === 0 ){
                  _vm.getList('1', '10', _vm.formSearch.name)
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('publicSet.noticeSuccess')
                  });
                } else {
                  if(_vm.langRouterKey !== 'tag') {
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
        _vm.$refs['formValidate'].validate((valid) => {
          if (valid) {
            let url = '';
            let data = {};
            if(_vm.seen) {
              url = 'guard-webManager/tag/edit.jhtml'
              data = _vm.formValidate
            } else {
              url = 'guard-webManager/tag/add.jhtml'
              data = {
                name: _vm.formValidate.name
              }
            }
            _vm.$http.post({
              url: url,
              data: data,
              success: function(res){
                if(res.data.code == 0 ){
                  _vm.getList('1', '10', _vm.formSearch.name)
                  _vm.$refs['formValidate'].resetFields();
                  _vm.modalEdit = false;
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('publicSet.noticeSuccess')
                  });
                } else {
                  if(_vm.langRouterKey !== 'tag') {
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
                  _vm.loading = false;
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
            _vm.loading = false;
            _vm.$nextTick(() => {
              _vm.loading = true;
            });
          }
        })
      }, 
      changePage (num) {
        this.getList(num, '10', this.formSearch.name)
      },
      handleReset (name) {
        this.$refs[name].resetFields();
        this.getList('1', '10', this.formSearch.name)
      }
    }
  }
</script>