/** 
 * 客户组管理 
 */
<template>
  <div class="container-box" ref="containerBox">
    <div class="container-header">
      <h2>{{$t('layoutNav.customerGroupManage')}}</h2>
      <ul class="header-btn-group">
        <li class="header-item" @click="add">
          <Icon type="plus-round"></Icon>{{$t('publicSet.add')}}</li>
      </ul>
    </div>
    <div class="container-body">
      <Form :label-width="50" inline @submit.native.prevent>
        <Form-item :label="$t('labelPublic.mc')">
          <Input type="text" :placeholder="$t('placeholderPublic.input')" v-model.trim="keyName" @on-enter="getList"></Input>
        </Form-item>
        <ul class="header-btn-group not-float">
          <li class="header-item" @click="getList">
            <Icon type="search"></Icon>{{$t('publicSet.search')}}</li>
          <li class="header-item" @click="reset">
            <Icon type="refresh"></Icon>{{$t('publicSet.reset')}}</li>
        </ul>
      </Form>
      <Table stripe :columns="columns" :data="data"></Table>
      <Modal :title="modalTit" v-model="modalEdit" :closable="false" @on-ok="ok" :loading="loading" class-name="vertical-center-modal">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100" label-position="right">
          <Form-item :label="$t('labelPublic.mc')" prop="name">
            <Input v-model.trim="formValidate.name" :placeholder="$t('placeholderPublic.input')" :maxlength='20'></Input>
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
      return {
        modalTit: '',
        columns: [
					{
            title: this.$t('labelPublic.xh'),
            type: 'index',
            width: 60
          },
          {
						title: this.$t('labelPublic.mc'),
						width: 80,
            key: 'nameLang'
          },
          {
						title: this.$t('labelPublic.ms'),
						width: 120,
            key: 'remarkLang'
          },
          {
            title: this.$t('publicSet.tableAction'),
            key: 'action',
            width: 200,
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small',
                    icon: 'edit'
                  },
                  style: {
                    margin: '5px 3px 5px 0',
                    verticalAlign: 'middle'
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
                  style: {
                    margin: '5px 3px 5px 0',
                    verticalAlign: 'middle'
                  },
                  on: {
                    click: () => {
                      this.remove(params.row)
                    }
                  }
                }, this.$t('publicSet.del')),
                h('Button', {
                  props: {
                    type: 'info',
                    size: 'small',
                    icon: 'ios-people'
									},
									style: {
                    margin: '5px 0px 5px 0',
                    verticalAlign: 'middle'
                  },
                  on: {
                    click: () => {
                      this.groupManagement(params.row)
                    }
                  }
                }, this.$t('customerGroup.btn'))
              ])
            }
          }
        ],
        data: [],
        modalEdit: false,
        loading: true,
        editType: 'add',
        keyName: '',
        formValidate: {
          id: '',
          name: '',
          remark: ''
        },
        ruleValidate: {
          name: [{
            required: true,
            message: this.$t('validPublic.name'),
            trigger: 'blur'
          }]
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
        if(val === 'customerGroup') {
          this.getList();
        }
      },
    },
    mounted() {
      this.getList();
    },
    methods: {
      getList() {
        let _vm = this;
        _vm.$store.dispatch('setPageLoading', -1);
        _vm.$http.getPage({
          url: 'guard-webManager/customerGroup/list.jhtml',
          data: {
            name: _vm.keyName
          },
          success: function (res) {
            const _data = res.data.content.map(item => {
							item.nameLang = item.name;
							item.remarkLang = item.remark;
							return item;
            }) || [];
            if(_vm.langRouterKey !== 'customerGroup') {
              _vm.data = _data;
            } else {
              _vm.requestList(_data, ['nameLang', 'remarkLang']).then(res => _vm.data = res);
            }
            _vm.$store.dispatch('setPageLoading', 1);
          }
        });
      },
      reset() {
        this.keyName = '';
        this.getList();
      },
      add() {
        this.modalTit = this.$t('customerGroup.tit1');
        this.$refs['formValidate'].resetFields();
        this.modalEdit = true;
        this.editType = 'add';

      },
      edit(row) {
        this.modalTit = this.$t('customerGroup.tit2');
        this.$refs['formValidate'].resetFields();
        this.formValidate.name = row.name;
        this.formValidate.remark = row.remark;
        this.formValidate.id = row.id;
        this.modalEdit = true;
        this.editType = 'update';

      },
      groupManagement(row) {
        const breadData = [
					{
            url: '/desktop',
            text: 'layoutNav.desk'
          },
          {
            url: '/customerGroup',
            text: 'layoutNav.customerGroupManage'
          },
          {
            url: '/customerGroupManagement',
            text: row.name
          },
        ];
        this.$store.dispatch('setBreadData', breadData);
        this.$router.push({
          path: 'customerGroupManagement',
          query: {
            id: row.id,
            name: row.nameLang
          }
        });
      },
      remove(data) {
        let _vm = this;
        _vm.$Modal.confirm({
          title: _vm.$t('publicSet.noticeTit'),
          content: `<p>${_vm.$t('customerGroup.msg1')}</p>
          <p>${_vm.$t('customerGroup.msg2')}</p>
          <p>${_vm.$t('labelPublic.mc')}：${data.nameLang}</p>`,
          onOk: () => {
            _vm.$http.post({
              url: 'guard-webManager/customerGroup/del.jhtml',
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
                  if(_vm.langRouterKey !== 'customerGroup') {
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
        let _vm = this;
        let _url = '';
        _vm.$refs['formValidate'].validate((valid) => {
          if (valid) {
            if (_vm.editType === 'add') {
              _url = 'guard-webManager/customerGroup/add.jhtml';
            } else {
              _url = 'guard-webManager/customerGroup/update.jhtml';
            }
            _vm.$http.post({
              url: _url,
              data: _vm.formValidate,
              success: function (res) {
                if (res.data.code === 0) {
                  _vm.getList();
                  _vm.modalEdit = false;
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('publicSet.noticeSuccess')
                  });
                } else {
                  if(_vm.langRouterKey !== 'customerGroup') {
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
