/** 
 *分组管理 
 */
<template>
  <div class="container-box">
    <div class="container-header">
      <h2>{{$t('customerGroupManagement.tit')}}————{{GroupManagementName}}</h2>
      <ul class="header-btn-group">
        <li class="header-item" @click="clear">
          <Icon type="plus-round"></Icon>{{$t('customerGroupManagement.btn1')}}</li>
        <li class="header-item" @click="add">
          <Icon type="plus-round"></Icon>{{$t('customerGroupManagement.btn2')}}</li>
        <li class="header-item" @click="importResult">
          <Icon type="plus-round"></Icon>{{$t('customerGroupManagement.btn3')}}</li>
      </ul>
    </div>
    <div class="container-body">
      <Table stripe :columns="columns" :data="data"></Table>
      <div class="table-page">
        <div class="table-info">{{$t('publicSet.pageMsg', [pageNumber, totalPages, total])}}</div>
        <Page class="table-paginate" :total="total" @on-change='changePage' :current='pageNumber' show-elevator></Page>
      </div>
      <Modal :title="$t('customerGroupManagement.btn2')" v-model="modalAdd" :closable="false" @on-ok="modalAddOk" :loading="loading" class-name="vertical-center-modal">
        <Form :model="modalAddForm" :label-width="100" label-position="right" ref='modalAddForm' :rules="ruleForm">
          <Form-item :label="$t('customerGroupManagement.label1')" prop="content" required>
            <Input v-model.trim="modalAddForm.content" type="textarea" :autosize="{minRows: 5,maxRows: 6}" :placeholder="$t('customerGroupManagement.input')"></Input>
          </Form-item>
        </Form>
      </Modal>

      <Modal :title="$t('customerGroupManagement.btn3')" v-model="modalImport" :closable="false" @on-ok="modalImportOk" :loading="loading" class-name="vertical-center-modal">
        <Form :model="modalImportForm" ref='modalImportForm' :label-width="100" label-position="right" :rules="ruleForm">
          <Form-item :label="$t('customerGroupManagement.label2')" prop='filterId' required>
            <Select v-model="modalImportForm.filterId" style="width:300px">
              <Option v-for="item in typeList" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
          </Form-item>
        </Form>
      </Modal>

    </div>
  </div>
</template>

<script>
	import resizeCus from 'components/tableResizeCus.vue';
  export default {
		components: {
      resizeCus
    },
    data() {
      const validateType = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('customerGroupManagement.valid1')));
        } else {
          callback();
        }
			};
			const validateCon = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('customerGroupManagement.valid2')));
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
						title: this.$t('labelPublic.gkbh'),
						width: 60,
            key: 'id'
          },
          {
            title: this.$t('labelPublic.gkxm'),
						width: 80,
						render: (h, params) => {
              return h(resizeCus, {
                props: {
                  name: params.row.name,
                  id: params.row.id,
                  idKey: false
                },
                on: {
                  'click': () => {
                    this.toCusIndex(params.row.id, params.row.name);
                  }
                }
              });
            }
          },
          {
            title: this.$t('labelPublic.xb'),
            width: 60,
            render: (h, params) => {
							const _text = params.row.gender === 1
								? this.$t('publicSet.man')
								: this.$t('publicSet.woman');
              return h('span', _text);
            }
          },
          {
						title: this.$t('labelPublic.jtly'),
						width: 60,
            key: 'channelName'
          },
          {
						title: this.$t('customerGroupManagement.colTit1'),
						width: 60,
            key: 'symptomName'
          },
          {
						title: this.$t('customerGroupManagement.colTit2'),
						width: 60,
            key: 'memberCategoryName'
          }
        ],
        data: [],
        modalAdd: false,
        modalImport: false,
        loading: true,
        modalAddForm: {
          id: '',
          content: '',
        },
        modalImportForm: {
          id: '',
          filterId: '',
        },
				typeList: [],
				total: 0,
        totalPages: 0,
        pageNumber: 1,
        GroupManagementName: '',
        ruleForm: {
          filterId: [{
            validator: validateType,
            trigger: 'change'
					}],
					content: [{
            validator: validateCon,
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
        if(val === 'customerGroupManagement') {
          this.getList();
        }
      },
    },
    mounted: function () {
      this.modalAddForm.id = this.$route.query.id;
      this.modalImportForm.id = this.$route.query.id;
      this.GroupManagementName = this.$route.query.name;
      this.getList();
      this.getType();
    },
    methods: {
      getList() {
        let _vm = this;
        _vm.$store.dispatch('setPageLoading', -1);
        _vm.$http.getPage({
          url: 'guard-webManager/customerGroup/getGroupDetail.jhtml',
          data: {
            id: _vm.$route.query.id,
            pageNumber: _vm.pageNumber,
            pageSize: 10
          },
          success: function (res) {
						const data = res.data.content.content || [];
						_vm.total = res.data.content.total || 0;
            _vm.pageNumber = res.data.content.pageNumber || 1;
            _vm.totalPages = res.data.content.totalPages || 1;
            if(_vm.langRouterKey !== 'customerGroupManagement') {
              _vm.data = data;
            } else {
              _vm.requestList(data, ['channelName', 'symptomName', 'memberCategoryName']).then(res => _vm.data = res);
            }
            _vm.$store.dispatch('setPageLoading', 1);
          }
        });
      },
      getType() {
        let _vm = this;
        _vm.$http.get({
          url: 'guard-webManager/customerGroup/importFilter.jhtml',
          data: {
            id: _vm.modalImportForm.id
          },
          success: function (res) {
            if (res.data.code === 0) {
              _vm.typeList = res.data.content.FilterList || [];
            } else {
              console.log(res.data.desc)
            }
          },
          error: function (res) {
            console.log(res);
          }
        });
      },
      changePage(pageNum) {
        this.pageNumber = pageNum;
        this.getList();
      },
      clear() {
        let _vm = this;
        _vm.$Modal.confirm({
          title: _vm.$t('publicSet.noticeTit'),
          content: _vm.$t('customerGroupManagement.msg'),
          onOk: () => {
            _vm.$http.post({
              url: 'guard-webManager/customerGroup/clear.jhtml',
              data: {
                id: _vm.$route.query.id,
              },
              success: function (res) {
                if (res.data.code === 0) {
                  _vm.getList();
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('publicSet.noticeSuccess')
                  });
                } else {
                  if(_vm.langRouterKey !== 'customerGroupManagement') {
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
          }
        });
      },
      add() {
				this.$refs['modalAddForm'].resetFields();
        this.modalAdd = true;
      },
      modalAddOk() {
				let _vm = this;
				_vm.$refs['modalAddForm'].validate((valid) => {
          if (valid) {
						_vm.$http.post({
							url: 'guard-webManager/customerGroup/importCustomerEdit.jhtml',
							data: _vm.modalAddForm,
							success: function (res) {
								if (res.data.code === 0) {
									_vm.getList();
									_vm.modalAdd = false;
									_vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('publicSet.noticeSuccess')
                  });
								} else {
									if(_vm.langRouterKey !== 'customerGroupManagement') {
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
							error: function (res) {
								console.log(res);
							}
						});
					} else {
						_vm.loading = false;
            _vm.$nextTick(() => {
              _vm.loading = true;
            });
					}
				});
      },
      importResult() {
        this.$refs['modalImportForm'].resetFields();
        this.modalImport = true;
      },
      modalImportOk() {
        let _vm = this;
        _vm.$refs['modalImportForm'].validate((valid) => {
          if (valid) {
            _vm.$http.post({
              url: 'guard-webManager/customerGroup/importFilterEdit.jhtml',
              data: _vm.modalImportForm,
              success: function (res) {
                if (res.data.code === 0) {
                  _vm.getList();
                  _vm.modalImport = false;
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('publicSet.noticeSuccess')
                  });
                } else {
                  if(_vm.langRouterKey !== 'customerGroupManagement') {
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
              error: function (res) {
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
      //跳转客户详情
      toCusIndex(id, name) {
        const breadData = [
					{
            url: '/desktop',
            text: 'layoutNav.desk'
          },
          {
            url: '/customer',
            text: 'layoutNav.customerManage'
          },
          {
            url: '/customerIndex',
            text: name
          }
        ];
        sessionStorage.setItem("cusName", name);
        sessionStorage.setItem("cusId", id);
        this.$store.dispatch('setBreadData', breadData);
        this.$router.push({
          path: '/customerIndex',
          query: {
            id: id
          }
        });
      },
    }
  }

</script>
