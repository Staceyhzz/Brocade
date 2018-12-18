/**
* 收费项目类型管理
*/

<template>
  <div class="container-box charge-category">
    <div class="container-header">
      <h2>{{$t('layoutNav.chargeCategoryManage')}}</h2>
      <ul class="header-btn-group">
        <li class="header-item" @click='add'><Icon type="plus-round"></Icon>{{$t('publicSet.add')}}</li>
      </ul>
    </div>
    <div class="container-body">
      <Tree :data="treeData" :render="renderContent"></Tree>
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
          <Form-item :label="$t('chargeCategory.label')" prop="parentId">
            <Input v-model="objName" readonly icon="ios-search" :placeholder="$t('chargeCategory.placeHolder')" @on-focus='addObj'></Input>
          </Form-item>
          <Form-item :label="$t('labelPublic.pxh')" prop="sortNo" required>
            <cmptInputNumber :max="10000" :min="1" v-model="formValidate.sortNo"></cmptInputNumber>
          </Form-item>
          <Form-item :label="$t('labelPublic.ms')" prop="remark">
            <Input v-model.trim="formValidate.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('placeholderPublic.input')"></Input>
          </Form-item>
        </Form>
      </Modal>
      <Modal
        :title="$t('chargeCategory.modalTit')"
        width='700'
        v-model="modal1"
        :closable="false"
        class-name="modal-category-tree">
        <div class="box">
          <Tree :data="chooseTreeData" :render="renderChooseTree"></Tree>
        </div>
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
        treeData: [],
        chooseTreeData: [],

        modalTit: '',
        modalEdit: false,
        loading: true,
        seen: true,
        formValidate: {
          id: '',
          name: '',
          parentId: '',
          sortNo: 1,
          remark: ''
        },
        ruleForm: {
          name: [
            { validator: validateName, trigger: 'blur' }
          ],
        },
        objName: '',
        modal1: false,
      }
    },
    computed: {
      langRouterKey () {
        return this.$store.getters.getLandRouterKey;
      },
    },
    watch: {
      langRouterKey (val) {
        if(val === 'chargeCategory') {
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
          url: 'guard-webManager/chargeCategory/list.jhtml',
          success: function(res){
            let _data = res.data.content.map(item => {
              return {
                ...item,
                nameLang: item.name
              }
            }) || []
            if(_vm.langRouterKey !== 'chargeCategory') {
              _vm.treeData = _vm.getTypeTree(_data, ['id', 'parentid', 'parentName', 'sortno', 'remark', 'name', 'nameLang']);
            } else {
              _vm.requestList(_data, ['nameLang']).then(res => {
                _vm.treeData = _vm.getTypeTree(res, ['id', 'parentid', 'parentName', 'sortno', 'remark', 'name', 'nameLang']);
              });
            }
            _vm.chooseTreeData = _vm.getTypeTree(_data, ['id', 'name']);
            _vm.$store.dispatch('setPageLoading', 1);
          },
          error: function(res){
            console.log(res);
          }
        });
      },
      renderContent (h, {root, node, data}) {
        return h('span', {
          style: {
            display: 'inline-block',
            width: '100%'
          },
          class: 'tree-hover',
          on: {
            click: () => {
              data.expand = !data.expand;
            }
          }
        }, [
          h('span', data.nameLang),
          h('span', {
            style: {
              display: 'inline-block',
              float: 'right',
              marginRight: '32px',
              height: '25px'
            }
          }, [
            h('Button', {
              props: {
                type: 'primary',
                size: 'small',
                icon: 'edit'
              },
              style: {
                marginRight: '10px'
              },
              on: {
                click: (e) => {
                  e.stopPropagation();
                  this.edit(data)
                }
              }
            }),
            h('Button', {
              props: {
                type: 'error',
                size: 'small',
                icon: 'ios-trash-outline'
              },
              on: {
                click: (e) => {
                  e.stopPropagation();
                  this.remove(data)
                }
              }
            })
          ])
        ]);
      },
      renderChooseTree (h, {root, node, data}) {
        return h('span', {
          style: {
            display: 'inline-block',
            width: '100%'
          },
          class: 'tree-hover',
          on: {
            click: () => {
              data.expand = !data.expand;
            }
          }
        }, [
          h('span', data.name),
          h('Button', {
            style: {
              float: 'right',
              marginRight: '32px',
            },
            props: {
              type: 'primary',
              size: 'small',
              icon: 'checkmark-round'
            },
            on: {
              click: (e) => {
                e.stopPropagation();
                this.chooseObj(data)
              }
            }
          })
        ]);
      },
      add () {
        this.modalTit = this.$t('chargeCategory.modalTit1');
        this.$refs['formValidate'].resetFields();
        this.objName = ''
        this.seen = false
        this.modalEdit = true
      },
      edit (data) {
        this.modalTit = this.$t('chargeCategory.modalTit2');
        this.$refs['formValidate'].resetFields();
        this.objName = data.parentName
        this.formValidate.id = data.id
        this.formValidate.name = data.name
        this.formValidate.parentId = data.parentid
        this.formValidate.sortNo = data.sortno
        this.formValidate.remark = data.remark
        this.seen = true
        this.modalEdit = true
      },
      remove (data) {
        let _vm = this;
        _vm.$Modal.confirm({
          title: _vm.$t('publicSet.noticeTit'),
          content: `<p>${_vm.$t('chargeCategory.msg1')}</p>
          <p>${_vm.$t('chargeCategory.msg2')}</p>
          <p>${_vm.$t('labelPublic.mc')}：${data.nameLang}</p>`,
          onOk: () => {
            _vm.$http.post({
              url: 'guard-webManager/chargeCategory/del.jhtml',
              data: {id: data.id},
              success: function(res){
                if(res.data.code === 0) {
                  _vm.getList()
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('publicSet.noticeSuccess')
                  });
                } else {
                  if(_vm.langRouterKey !== 'chargeCategory') {
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
            if(_vm.seen) {
              url = 'guard-webManager/chargeCategory/update.jhtml'
            } else {
              url = 'guard-webManager/chargeCategory/add.jhtml'
            }
            _vm.$http.post({
              url: url,
              data: _vm.formValidate,
              success: function(res){
                if(res.data.code === 0 ){
                  _vm.getList()
                  _vm.$refs['formValidate'].resetFields();
                  _vm.modalEdit = false;
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('publicSet.noticeSuccess')
                  });
                } else {
                  if(_vm.langRouterKey !== 'chargeCategory') {
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
              _vm.loading = true;
            });
          }
        })
      },
      addObj () {
        this.modal1 = true
      },
      chooseObj (data) {
        this.objName = data.name
        this.formValidate.parentId = data.id
        this.modal1 = false
      }
    }
  }
</script>

<style lang='less'>
  .charge-category {
    .ivu-tree ul li {
      margin:  12px 0;
      min-height: 24px;
      span {
        vertical-align: middle;
        line-height: 24px;
      }
    }
    .tree-hover {
      &:hover {
        background: rgba(65, 114, 246, 0.1);
      }
    }
  }
</style>
