/**
 * 部位模板管理
 */

<template>
  <div class="container-box">
    <div class="container-header">
      <h2>{{$t('layoutNav.positionTemplate')}}</h2>
      <ul class="header-btn-group">
        <li class="header-item" @click="add"><Icon type="plus-round"></Icon>{{$t('publicSet.add')}}</li>
      </ul>
    </div>
    <div class="container-body">
      <Table stripe :columns="columns" :data="data"></Table>
    </div>
    <Modal
      :title="modalTit"
      v-model="modalEdit"
      :closable="false"
      @on-ok="ok"
      :loading="loading"
      class-name="vertical-center-modal">
      <Form ref="formValidate" :model="formValidate" :rules="ruleForm" :label-width="100" label-position="right">
        <Form-item :label="$t('labelPublic.mc')" prop="templateName" required>
          <Input v-model.trim="formValidate.templateName" :placeholder="$t('placeholderPublic.input')" :maxlength='20'></Input>
        </Form-item>
        <Form-item :label="$t('labelPublic.zt')" prop="status" v-if='seen'>
          <Radio-group v-model="formValidate.status">
            <Radio :label="1">{{$t('publicSet.enable')}}</Radio>
            <Radio :label="0">{{$t('publicSet.disable')}}</Radio>
          </Radio-group>
        </Form-item>
        <Form-item :label="$t('labelPublic.ms')" prop="remarks">
          <Input v-model.trim="formValidate.remarks" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('placeholderPublic.input')"></Input>
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
        columns: [
          {   
            title: this.$t('labelPublic.xh'),
            type: 'index',
            width: 60
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
              }, text);
            }
          },
          {
            title: this.$t('labelPublic.ms'),
            key: 'remarksLang',
            width: 100
          },
          {
            title: this.$t('publicSet.tableAction'),
            key: 'action',
            width: 220,
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
                    type: 'info',
                    size: 'small',
                    icon: 'ios-color-wand'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.tobuild(params.row)
                    }
                  }
                }, this.$t('positionTemplate.btn')),
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
          }
        ],
        data: [],
        modalTit: '',
        modalEdit: false,
        loading: true,
        seen: true,
        formValidate: {
          templateId: '',
          templateName: '',
          status: '',
          remarks: ''
        },
        ruleForm: {
          templateName: [
            { validator: validateName, trigger: 'blur' }
          ],
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
        if(val === 'positionTemplate') {
          this.getList();
        }
      },
    },
    created () {
      this.getList();
    },
    methods: {
      getList () {
        let _vm = this;
        _vm.$store.dispatch('setPageLoading', -1);
        _vm.$http.getPage({
          url: 'guard-webManager/customerManagement/findAllSmarteffectrrackingtemplatetitle.jhtml',
          data: {status: 2},
          success: function(res){
            const _data = res.data.content.content.map(item => {
              return {
                ...item,
                nameLang: item.templateName,
                remarksLang: item.remarks || ''
              };
            });
            if(_vm.langRouterKey !== 'positionTemplate') {
              _vm.data = _data;
            } else {
              _vm.requestList(_data, ['nameLang', 'remarksLang']).then(res => _vm.data = res);
            }
            _vm.$store.dispatch('setPageLoading', 1);
          },
          error: function(res){
            console.log(res);
          }
        });
      },
      add () {
        this.modalTit = this.$t('positionTemplate.tit1');
        this.$refs['formValidate'].resetFields();
        this.formValidate.status = 1;
        this.seen = false;
        this.modalEdit = true;
      },
      edit (data) {
        this.modalTit = this.$t('positionTemplate.tit2');
        this.$refs['formValidate'].resetFields();
        this.formValidate = {
          templateId: data.id,
          templateName: data.templateName,
          remarks: data.remarks,
          status: data.status
        };
        this.seen = true;
        this.modalEdit = true;
      },
      remove (data) {
        let _vm = this;
        _vm.$Modal.confirm({
          title: _vm.$t('publicSet.noticeTit'),
          content: `<p>${_vm.$t('positionTemplate.msg1')}</p>
          <p>${_vm.$t('positionTemplate.msg2')}</p>
          <p>${_vm.$t('labelPublic.mc')}：${data.nameLang}</p>`,
          onOk: () => {
            _vm.$http.post({
              url: 'guard-webManager/customerManagement/deleteByIdTemplate.jhtml',
              data: {templateId: data.id},
              success: function(res){
                if(res.data.code === 0 ){
                  _vm.getList();
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('publicSet.noticeSuccess')
                  });
                } else {
                  if(_vm.langRouterKey !== 'positionTemplate') {
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
        });
      },
      ok () {
        let _vm = this;
        _vm.$refs['formValidate'].validate((valid) => {
          if (valid) {
            const url = _vm.seen
              ? 'guard-webManager/customerManagement/updateSmarteffectrrackingtemplatetitle.jhtml'
              : 'guard-webManager/customerManagement/addSmarteffectrrackingtemplatetitle.jhtml';
            _vm.$http.post({
              url: url,
              data: _vm.formValidate,
              success: function(res){
                if(res.data.code === 0 ){
                  _vm.getList()
                  _vm.modalEdit = false;
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('publicSet.noticeSuccess')
                  });
                } else {
                  if(_vm.langRouterKey !== 'positionTemplate') {
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
                  })
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
            })
          }
        })
      },
      tobuild(data) {
        let breadData = [
          {
            url: '/desktop',
            text: 'layoutNav.desk'
          },
          {
            url: '/positionTemplate',
            text: 'layoutNav.positionTemplate'
          },
          {
            url: '/positionTemplateEdit',
            text: 'positionTemplate.tit3'
          }
        ];
        this.$store.dispatch('setBreadData', breadData);
        this.$router.push({
          path: '/positionTemplateEdit',
          query: {
            id: data.id,
            name: data.templateName
          }
        })
      },
    }
  }
</script>