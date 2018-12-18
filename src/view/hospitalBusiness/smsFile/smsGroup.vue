/** 
 * 短信发送任务 
 */

<template>
  <div class="container-box">
    <div class="container-header">
      <h2>{{$t('layoutNav.smsGroup')}}</h2>
      <ul class="header-btn-group">
        <li class="header-item" @click="toView(1)">
          <Icon type="plus-round"></Icon>{{$t('publicSet.add')}}</li>
      </ul>
    </div>
    <div class="container-body">
      <Form :label-width="90" inline ref='formSearch' :model='formSearch'>
        <Form-item :label="$t('smsGroup.label')" prop='startTime'>
          <Date-picker :transfer='true' type="daterange" placement="bottom-start" :placeholder="$t('smsGroup.placeholder')" style="width: 180px" @on-change='setTime' ref='clearTime'></Date-picker>
        </Form-item>
        <Form-item :label="$t('labelPublic.mc')" prop='name'>
          <Input @on-enter="getList(1, 10, formSearch)" :maxlength='20' v-model.trim="formSearch.name" :placeholder="$t('placeholderPublic.input')"></Input>
        </Form-item>
        <ul class="header-btn-group not-float">
          <li class="header-item" @click="getList(1, 10, formSearch)">
            <Icon type="search"></Icon>{{$t('publicSet.search')}}</li>
          <li class="header-item" @click="handleReset('formSearch')">
            <Icon type="refresh"></Icon>{{$t('publicSet.reset')}}</li>
        </ul>
      </Form>
      <Table stripe :columns="col" :data="data"></Table>
      <div class="table-page">
        <div class="table-info">{{$t('publicSet.pageMsg', [pageNumber, totalPages, total])}}</div>
        <Page class="table-paginate" :total="total" @on-change='changePage' :current='pageNumber' show-elevator></Page>
      </div>
    </div>
    <Modal :title="$t('smsGroup.modalTit2')" v-model="modal" :closable="false" @on-ok="ok" :loading="loading" class-name="vertical-center-modal">
      <Form ref="formValidate" :model="formValidate" :rules="ruleForm" :label-width="100" label-position="right">
        <Form-item :label="$t('labelPublic.mc')" prop="name" required>
          <Input v-model.trim="formValidate.name" :placeholder="$t('placeholderPublic.input')" :maxlength='20'></Input>
        </Form-item>
        <Form-item :label="$t('labelPublic.ms')" prop="remark">
          <Input v-model.trim="formValidate.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('placeholderPublic.input')"></Input>
        </Form-item>
      </Form>
    </Modal>
  </div>
</template>

<script>
	import resizeTime from 'components/tableResizeTime.vue';
	import resizeRemark from 'components/tableResizeRemark.vue';
  export default {
		components: {
			resizeTime,
			resizeRemark
    },
    data() {
      const validateName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('validPublic.name')));
        } else {
          callback()
        }
      }
      return {
        total: 0,
        totalPages: 1,
        pageNumber: 1,
        formSearch: {
          startTime: '',
          endTime: '',
          name: '',
        },
        modal: false,
        loading: true,
        formValidate: {
          ID: '',
          name: '',
          remark: '',
        },
        col: [
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
            width: 60,
            key: 'nameLang'
          },
          {
            title: this.$t('smsTemplate.colTit1'),
            width: 60,
            key: 'templateNameLang'
          },
          {
						title: this.$t('labelPublic.zt'),
            width: 70,
						render: (h, params) => {
              const color = params.row.status === 1 
                ? '#4172F6' 
                : '#FF6F76';
              const text = params.row.status === 1 
                ? this.$t('smsGroup.colTit3') 
                : this.$t('smsGroup.colTit4');
              return h('span', {
                style: {
                  color: color
                }
              }, text);
            }
          },
          {
            title: this.$t('smsGroup.colTit1'),
            width: 60,
            key: 'createUserName',
          },
          {
            title: this.$t('smsGroup.colTit2'),
            width: 80,
            render: (h, params) => {
              if (params.row.createTime) {
                return h(resizeTime, {
                  props: {
                    time: params.row.createTime
                  }
                })
              }
            }
          },
          {
            title: this.$t('labelPublic.ms'),
            width: 100,
            render: (h, params) => {
							if(params.row.remarkLang) {
								return h(resizeRemark, {
									props: {
										remark: params.row.remarkLang
									}
								})
							}
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
                    margin: '5px 3px 5px 0',
                    verticalAlign: 'middle',
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
                    verticalAlign: 'middle',
                  },
                  on: {
                    click: () => {
                      this.remove(params.row)
                    }
                  }
                }, this.$t('publicSet.del')),
                h('Button', {
                  props: {
                    type: 'warning',
                    size: 'small',
                    icon: 'document-text'
									},
									style: {
                    margin: '5px 0px 5px 0',
                    verticalAlign: 'middle',
                  },
                  on: {
                    click: () => {
                      this.toView(params.row)
                    }
                  }
                }, this.$t('smsGroup.btn'))
              ])
            }
          }
        ],
        data: [],
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
        if(val === 'smsGroup') {
          this.getList(this.pageNumber, 10, this.formSearch);
        }
      },
    },
    created() {
      this.getList(1, 10, this.formSearch);
    },
    methods: {
      getList(pageNumber, pageSize, form) {
        let _vm = this
        form['pageNumber'] = pageNumber
        form['pageSize'] = pageSize
        _vm.$store.dispatch('setPageLoading', -1)
        _vm.$http.getPage({
          url: 'guard-webManager/smsGroup/page.jhtml',
          data: form,
          success: function (res) {
            const props = ['name', 'remark', 'templateName'];
            const _data = res.data.content.content.map(item => {
              let obj = {
                ...item
              };
              props.map(p => {
                obj[p + 'Lang'] = obj[p];
              });
              return obj;
            }) || [];
            if(_vm.langRouterKey !== 'smsGroup') {
              _vm.data = _data;
            } else {
              const list = props.map(item => item + 'Lang');
              _vm.requestList(_data, list).then(res => _vm.data = res);
            }
            _vm.total = res.data.content.total || 0
            _vm.pageNumber = res.data.content.pageNumber || 1
            _vm.totalPages = res.data.content.totalPages || 1
            _vm.$store.dispatch('setPageLoading', 1);
          },
          error: function (res) {
            console.log(res)
          }
        });
      },
      setTime(date) {
        this.formSearch.startTime = date[0]
        this.formSearch.endTime = date[1]
      },
      changePage(num) {
        this.getList(num, 10, this.formSearch)
      },
      handleReset(name) {
        this.$refs[name].resetFields()
        this.$refs['clearTime'].handleClear()
        this.getList(1, 10, this.formSearch)
      },
      edit(data) {
        this.$refs['formValidate'].resetFields()
        this.formValidate.ID = data.id
        this.formValidate.name = data.name
        this.formValidate.remark = data.remark
        this.modal = true
      },
      ok() {
        let _vm = this
        _vm.$refs['formValidate'].validate((valid) => {
          if (valid) {
            _vm.$http.post({
              url: 'guard-webManager/smsGroup/update.jhtml',
              data: _vm.formValidate,
              success: function (res) {
                if (res.data.code === 0) {
                  _vm.getList(1, 10, _vm.formSearch)
                  _vm.modal = false
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('publicSet.noticeSuccess')
                  });
                } else {
                  if(_vm.langRouterKey !== 'smsGroup') {
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
      remove(data) {
        let _vm = this
        _vm.$Modal.confirm({
          title: _vm.$t('publicSet.noticeTit'),
          content: `<p>${_vm.$t('smsGroup.msg1')}</p>
          <p>${_vm.$t('smsGroup.msg2')}</p>
					<p>${_vm.$t('labelPublic.mc')}：${data.nameLang}</p>
					<p>${_vm.$t('smsTemplate.colTit1')}：${data.templateNameLang}</p>`,
          onOk: () => {
            _vm.$http.post({
              url: 'guard-webManager/smsGroup/delete.jhtml',
              data: {
                ID: data.id
              },
              success: function (res) {
                if (res.data.code == 0) {
                  _vm.getList(1, 10, _vm.formSearch)
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('publicSet.noticeSuccess')
                  });
                } else {
                  if(_vm.langRouterKey !== 'smsGroup') {
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
        })
      },
      //跳转详情
      toView(data) {
        let _url = '',
          _text = '',
          _id = ''
        if (typeof data == 'object') {
          _url = '/smsGroupRecord'
          _text = data.nameLang
          _id = data.id
        } else {
          _url = '/smsGroupAdd'
          _text = 'smsGroup.modalTit1'
        }
        let breadData = [{
            url: '/desktop',
            text: 'layoutNav.desk'
          },
          {
            url: '/smsGroup',
            text: 'layoutNav.smsGroup'
          },
          {
            url: _url,
            text: _text
          }
        ]
        this.$store.dispatch('setBreadData', breadData)
        this.$router.push({
          path: _url,
          query: {
            id: _id
          }
        })
      },
    }
  }

</script>
