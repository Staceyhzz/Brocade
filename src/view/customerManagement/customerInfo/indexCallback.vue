/** 
 * 回访情况页面 
 */

<template>
  <div class="customer-box">
    <Table :columns="columns" :data="data" stripe></Table>
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
      return {
        cusId: '',
        cusName: '',
        columns: [
          {
            title: this.$t('labelPublic.xh'),
            type: 'index',
            width: 60
          },
          {
            title: this.$t('indexCallback.colTit1'),
            width: 80,
            render: (h, params) => {
              if(params.row.tasktime) {
                const str = params.row.tasktime.split(' ')[0];
                return h('span', str);
              }
            }
          },
          {
            title: this.$t('labelPublic.lx'),
            width: 60,
            key: 'categoryName'
          },
          {
            title: this.$t('callbackTaskAdd.label2'),
            width: 100,
						render: (h, params) => {
							if(params.row.name) {
								return h(resizeRemark, {
									props: {
										remark: params.row.name
									}
								})
							}
						}
          },
          {
            title: this.$t('indexCallback.colTit2'),
            width: 80,
            render: (h, params) => {
              const str = `【${params.row.userHospitalName}】【${params.row.userDeptName}】【${params.row.userName}】`;
              return h('span', str);
            }
          },
          {
            title: this.$t('labelPublic.zt'),
            width: 60,
            render: (h, params) => {
              const color = params.row.status === 1 
                ? '#4172F6' 
                : '#FF6F76';
              const text = params.row.status === 1 
                ? this.$t('indexCallback.colTit4') 
                : this.$t('indexCallback.colTit3');
              return h('span', {
                style: {
                  color: color
                }
              }, text);
            }
          },
          {
            title: this.$t('callbackTaskAdd.label3'),
            width: 80,
            render: (h, params) => {
              if(params.row.status === 1) {
                const str = `【${params.row.createUserHospitalName}】【${params.row.createUserDeptName}】【${params.row.createUserName}】`;
                return h('span', str);
              }
            }
          },
          {
            title: this.$t('indexCallback.colTit5'),
            width: 80,
            render: (h, params) => {
              if (params.row.createtime) {
                return h(resizeTime, {
                  props: {
                    time: params.row.createtime
                  }
                })
              }
            }
          },
          {
            title: this.$t('callbackAdd.label2'),
            width: 60,
            key: 'toolName'
          },
          {
            title: this.$t('callbackAdd.label3'),
            width: 100,
						render: (h, params) => {
							if(params.row.content) {
								return h(resizeRemark, {
									props: {
										remark: params.row.content
									}
								})
							}
						}
          },
          {
            title: this.$t('indexCallback.colTit6'),
            width: 60,
            key: 'taskCreateUserName'
          },
          {
            title: this.$t('indexCallback.colTit7'),
            width: 80,
            render: (h, params) => {
              if (params.row.taskcreatetime) {
                return h(resizeTime, {
                  props: {
                    time: params.row.taskcreatetime
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
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.toEdit(params.row)
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
        data: []
      }
    },
    computed: {
      langRouterKey () {
        return this.$store.getters.getLandRouterKey;
      },
    },
    watch: {
      langRouterKey (val) {
        if(val === 'indexCallback') {
          this.getList(this.cusId);
        }
      },
    },
    created() {
      this.cusId = sessionStorage.getItem('cusId');
      this.cusName = sessionStorage.getItem('cusName');
      this.getList(this.cusId);
    },
    methods: {
      getList(id) {
        let _vm = this;
        _vm.$store.dispatch('setPageLoading', -1);
        _vm.$http.getPage({
          url: 'guard-webManager/customerRecord/getCallback.jhtml',
          data: {
            id: id
          },
          success: function (res) {
            const _data = res.data.content || [];
            if(_vm.langRouterKey !== 'indexCallback') {
              _vm.data = _data;
            } else {
              _vm.requestList(_data, ['categoryName', 'name', 'toolName', 'content']).then(res => _vm.data = res);
            }
						_vm.$store.dispatch('setPageLoading', 1);
          },
          error: function (res) {
            console.log(res);
          }
        });
      },
      remove(data) {
        let _vm = this;
        const url = data.status === 1
          ? 'guard-webManager/customerRecord/delCallback.jhtml'
          : 'guard-webManager/customerRecord/callbackTaskDelete.jhtml';
        const msg = data.status === 1
          ? _vm.$t('indexCallback.msg1')
          : _vm.$t('indexCallback.msg2');
        _vm.$Modal.confirm({
          title: _vm.$t('publicSet.noticeTit'),
          content: msg,
          onOk: () => {
            _vm.$http.post({
              url: url,
              data: {
                id: data.id
              },
              success: function (res) {
                if (res.data.code === 0) {
                  _vm.getList(_vm.cusId);
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('publicSet.noticeSuccess')
                  });
                } else {
                  if(_vm.langRouterKey !== 'indexCallback') {
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
        });
      },
      toEdit(data) {
        const url = data.status === 1
          ? '/callbackUpdate'
          : '/callbackTaskUpdate';
        const text = data.status === 1
          ? 'indexCallback.tit1'
          : 'indexCallback.tit2';
        const breadData = [
          {
            url: '/desktop',
            text: 'layoutNav.desk'
          },
          {
            url: '/customerMsg',
            text: this.cusName
          },
          {
            url: url,
            text: text
          }
        ];
        this.$store.dispatch('setBreadData', breadData);
        this.$router.push({
          path: url,
          query: {
            id: data.id
          }
        });
      },
    }
  }

</script>
