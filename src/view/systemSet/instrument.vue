/** 
 * 仪器管理页面 
 */

<template>
  <div class="container-box">
    <div class="container-header">
      <h2>{{$t('layoutNav.InstrumentManage')}}</h2>
      <ul class="header-btn-group">
        <li class="header-item" @click="add">
          <Icon type="plus-round"></Icon>{{$t('publicSet.add')}}</li>
      </ul>
    </div>
    <div class="container-body">
      <Table stripe :columns="columns" :data="data"></Table>
      <Modal :title="modalTit" v-model="modalEdit" :closable="false" @on-ok="ok" :loading="loading" class-name="vertical-center-modal">
        <Form ref="formValidate" :model="formValidate" :rules="ruleForm" :label-width="100" label-position="right">
          <Form-item :label="$t('labelPublic.mc')" prop="name" required>
            <Input v-model.trim="formValidate.name" :placeholder="$t('placeholderPublic.input')" :maxlength='20'></Input>
          </Form-item>
          <Form-item :label="$t('instrument.label')" prop="num" required>
            <cmptInputNumber :min="0" :max='1000000' v-model="formValidate.num" style='width:388px'></cmptInputNumber>
          </Form-item>
          <Form-item :label="$t('labelPublic.ms')" prop="remark">
            <Input v-model.trim="formValidate.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('placeholderPublic.input')"></Input>
          </Form-item>
        </Form>
      </Modal>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
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
            key: 'nameLang'
          },
          {
            title: this.$t('instrument.label'),
            key: 'num'
          },
          {
            title: this.$t('labelPublic.ms'),
            key: 'remarkLang'
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
          id: '',
          name: '',
          num: 0,
          remark: '',
        },
        ruleForm: {
          name: [{
            validator: validateName,
            trigger: 'blur'
          }],
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
        if(val === 'instrument') {
          this.getList();
        }
      },
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        let _vm = this
        _vm.$store.dispatch('setPageLoading', -1)
        _vm.$http.getPage({
          url: 'guard-webManager/instrument/list.jhtml',
          success: function (res) {
            const props = ['name', 'remark'];
            const _data = res.data.content.map(item => {
              let obj = {
                ...item
              };
              props.map(p => {
                obj[p + 'Lang'] = obj[p];
              });
              return obj;
            }) || [];
            if(_vm.langRouterKey !== 'instrument') {
              console.log(_data)
              _vm.data = _data;
            } else {
              const list = props.map(item => item + 'Lang');
              _vm.requestList(_data, list).then(res => _vm.data = res);
            }
            _vm.$store.dispatch('setPageLoading', 1);
          },
          error: function (res) {
            console.log(res);
          }
        });
      },
      add() {
        this.modalTit = this.$t('instrument.modalTit1');
        this.$refs['formValidate'].resetFields()
        this.seen = false
        this.modalEdit = true
      },
      edit(data) {
        this.modalTit = this.$t('instrument.modalTit2');
        this.$refs['formValidate'].resetFields();
        this.formValidate.id = data.id
        this.formValidate.name = data.name
        this.formValidate.num = data.num
        this.formValidate.remark = data.remark
        this.seen = true
        this.modalEdit = true
      },
      remove(data) {
        let _vm = this;
        _vm.$Modal.confirm({
          title: _vm.$t('publicSet.noticeTit'),
          content: `<p>${_vm.$t('instrument.msg1')}</p>
          <p>${_vm.$t('instrument.msg2')}</p>
          <p>${_vm.$t('labelPublic.mc')}：${data.nameLang}</p>`,
          onOk: () => {
            _vm.$http.post({
              url: 'guard-webManager/instrument/del.jhtml',
              data: {
                id: data.id
              },
              success: function (res) {
                if (res.data.code === 0) {
                  _vm.getList()
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('publicSet.noticeSuccess')
                  });
                } else {
                  if(_vm.langRouterKey !== 'instrument') {
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
                console.log(res);
              }
            });
          },
          onCancel: () => {

          }
        });
      },
      ok() {
        let _vm = this
        let _url = ''
        _vm.$refs['formValidate'].validate((valid) => {
          if (valid) {
            if (_vm.seen) {
              _url = 'guard-webManager/instrument/update.jhtml'
            } else {
              _url = 'guard-webManager/instrument/add.jhtml'
            }
            _vm.$http.post({
              url: _url,
              data: _vm.formValidate,
              success: function (res) {
                if (res.data.code === 0) {
                  _vm.getList()
                  _vm.modalEdit = false
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('publicSet.noticeSuccess')
                  });
                } else {
                  if(_vm.langRouterKey !== 'instrument') {
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
              error: function (res) {
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
      }
    }
  }

</script>
