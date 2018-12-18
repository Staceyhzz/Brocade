/* 
 *管理活动 
 */
<template>
  <div class="container-box">
    <div class="container-header">
      <h2>{{$t('activityRecord.tit')}}————{{titName}}</h2>
      <ul class="header-btn-group">
        <li class="header-item" @click="clear">
          <Icon type="plus-round"></Icon>{{$t('publicSet.clean')}}</li>
        <li class="header-item" @click="add(true)">
          <Icon type="plus-round"></Icon>{{$t('activityRecord.btn1')}}</li>
        <li class="header-item" @click="add(false)">
          <Icon type="plus-round"></Icon>{{$t('activityRecord.btn2')}}</li>
      </ul>
    </div>
    <div class="container-body">
      <Table stripe :columns="columns" :data="data"></Table>
      <div class="table-page">
        <div class="table-info">{{$t('publicSet.pageMsg', [pageNumber, totalPages, total])}}</div>
        <Page class="table-paginate" :total="total" @on-change='changePage' :current='pageNumber' show-elevator></Page>
      </div>
			<Modal :title="modalTit" v-model="modal" :closable="false" @on-ok="ok" :loading="loading" class-name="vertical-center-modal">
				<Form :model="formEdit" ref='formEdit' :label-width="100" label-position="right" :rules="ruleForm">
					<Form-item :label="$t('activityRecord.label1')" prop="content" required v-if='typeKey'>
            <Input v-model="formEdit.content" type="textarea" :autosize="{minRows: 5,maxRows: 6}" :placeholder="$t('activityRecord.placeholder')"></Input>
          </Form-item>
					<Form-item :label="$t('activityRecord.label2')" prop='filterId' required v-else>
            <Select v-model="formEdit.filterId" style="width:300px">
              <Option v-for="item in filterList" :value="item.id" :key="item.id">{{ item.name }}</Option>
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
			resizeCus,
    },
    data() {
      const validateType = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('activityRecord.valid2')));
        } else {
          callback();
        }
			};
			const validateCon = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('activityRecord.valid1')));
        } else {
          callback();
        }
      };
      return {
				pageNumber: 1,
				total: 0,
				totalPages: 1,
				modalTit: '',
				titName: '',
				typeKey: true,
				modal: false,
				loading: true,
				formEdit: {
					id: '',
					content: '',
					filterId: '',
				},
				filterList: [],
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
            width: 60,
						render: (h, params) => {
              return h(resizeCus, {
                props: {
                  name: params.row.name,
                  id: params.row.id
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
								: this.$t('publicSet.woman') ;
              return h('span', _text)
            }
          },
          {
            title: this.$t('labelPublic.jtly'),
            width: 60,
            key: 'channelName'
          },
          {
            title: this.$t('activityRecord.colTit'),
            width: 60,
            key: 'symptomName'
          },
          {
            title: this.$t('labelPublic.hy'),
            width: 60,
            key: 'memberCategoryName'
          },

        ],
				data: [],
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
        if(val === 'activityRecord') {
          this.getList();
        }
      },
    },
    mounted () {
      this.formEdit.id = this.$route.query.id;
      this.getList();
      this.getType();
    },
    methods: {
      getList() {
        let _vm = this;
        _vm.$store.dispatch('setPageLoading', -1)
        _vm.$http.getPage({
          url: 'guard-webManager/activity/getRecord.jhtml',
          data: {
            id: _vm.$route.query.id,
            pageNumber: _vm.pageNumber || 1,
            pageSize: 10
          },
          success: function (res) {
						const obj = res.data.content || {};
            const _data = obj.page.content || [];
            if(_vm.langRouterKey !== 'activityRecord') {
              _vm.data = _data;
            } else {
              _vm.requestList(_data, ['channelName', 'symptomName', 'memberCategoryName']).then(res => _vm.data = res);
            }
						_vm.pageNumber = obj.page.pageNumber || 1;
						_vm.total = obj.page.total || 0;
						_vm.totalPages = obj.page.totalPages || 1;
						_vm.titName = obj.activity.name || '';
						_vm.$store.dispatch('setPageLoading', 1);
          }
        });
			},
      getType() {
        let _vm = this;
        _vm.$http.get({
          url: 'guard-webManager/customerGroup/importFilter.jhtml',
          data: {
            id: _vm.$route.query.id
          },
          success: function (res) {
            if (res.data.code === 0) {
              _vm.filterList = res.data.content.FilterList || [];
            } else {
              console.log(res.data.desc)
            }
          },
          error: function (res) {
            console.log(res);
          }
        });
      },
      changePage (pageNum) {
        this.pageNumber = pageNum;
        this.getList();
			},
      clear() {
        let _vm = this;
        _vm.$Modal.confirm({
          title: _vm.$t('publicSet.noticeTit'),
          content: `<p>${_vm.$t('activityRecord.msg')}</p>`,
          onOk: () => {
            _vm.$http.post({
              url: 'guard-webManager/activity/clear.jhtml',
              data: {
                id: _vm.$route.query.id,
              },
              success: function (res) {
                if (res.data.code === 0) {
                  _vm.getList()
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('publicSet.noticeSuccess')
                  });
                } else {
                  if(_vm.langRouterKey !== 'activityRecord') {
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
      add(type) {
				this.$refs.formEdit.resetFields();
				this.typeKey = type;
				this.modalTit = type
					? this.$t('activityRecord.btn1')
					: this.$t('activityRecord.btn2');
        this.modal = true;
      },
      ok() {
				let _vm = this;
				const _url = _vm.typeKey
					? 'guard-webManager/activity/importCustomer.jhtml'
					: 'guard-webManager/activity/importFilter.jhtml';
				_vm.$refs.formEdit.validate((valid) => {
					if(valid) {
						_vm.$http.post({
							url: _url,
							data: _vm.formEdit,
							success: function (res) {
								if (res.data.code === 0) {
									_vm.getList()
									_vm.modal = false
                  if(_vm.langRouterKey !== 'activityRecord') {
                    _vm.$Notice.success({
                      title: _vm.$t('publicSet.noticeTit'),
                      desc: res.data.content
                    })
                  } else {
                    _vm.getLang.word(res.data.content, (data) => {
                      _vm.$Notice.success({
                        title: _vm.$t('publicSet.noticeTit'),
                        desc: data[0].dst
                      })
                    });
                  }
								} else {
									if(_vm.langRouterKey !== 'activityRecord') {
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
						})
					} else {
						_vm.loading = false
						_vm.$nextTick(() => {
							_vm.loading = true
						})
					}
				});
      },
      //跳转客户详情
      toCusIndex(id, name) {
        const breadData = [{
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
        ]
        sessionStorage.setItem("cusName", name)
        sessionStorage.setItem("cusId", id)
        this.$store.dispatch('setBreadData', breadData);
        this.$router.push({
          path: '/customerIndex',
          query: {
            id: id
          }
        })
      },

    }
  }

</script>
