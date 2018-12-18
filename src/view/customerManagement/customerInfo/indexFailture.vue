/** 
 * 未成交情况页面 
 */

<template>
  <div class="customer-box">
    <Table stripe :columns="columns" :data="data"></Table>
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
        cusName: '',
        cusId: '',
        columns: [
          {
            title: this.$t('labelPublic.xh'),
            type: 'index',
            width: 60
          },
          {
            title: this.$t('indexFailture.colTit1'),
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
            title: this.$t('indexFailture.colTit2'),
            width: 80,
            key: 'hospitalName'
          },
          {
            title: this.$t('indexFailture.colTit3'),
            width: 80,
            render: (h, params) => {
              const text = `【${params.row.createUserDeptName}】【${params.row.createUserName}】`;
              return h('span', text);
            }
          },
          {
            title: this.$t('failtureAdd.label1'),
            width: 80,
            key: 'categoryName'
          },
          {
            title: this.$t('failtureAdd.label2'),
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
        if(val === 'indexFailture') {
          this.getList(this.cusId);
        }
      },
    },
    created() {
      this.cusName = sessionStorage.getItem('cusName');
      this.cusId = sessionStorage.getItem('cusId');
      this.getList(this.cusId);
    },
    methods: {
      getList(id) {
        let _vm = this;
        _vm.$store.dispatch('setPageLoading', -1)
        _vm.$http.getPage({
          url: 'guard-webManager/customerRecord/failtureList.jhtml',
          data: {
            id: id
          },
          success: function (res) {
            const _data = res.data.content.FailtureList || [];
            if(_vm.langRouterKey !== 'indexFailture') {
              _vm.data = _data;
            } else {
              _vm.requestList(_data, ['categoryName', 'content']).then(res => _vm.data = res);
            }
						_vm.$store.dispatch('setPageLoading', 1);
          },
          error: function (res) {
            console.log(res);
          }
        });
      },
      //修改
      toEdit(data) {
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
            url: '/failtureUpdate',
            text: 'indexFailture.tit'
          }
        ];
        this.$store.dispatch('setBreadData', breadData);
        this.$router.push({
          path: '/failtureUpdate',
          query: {
            id: data.id
          }
        });
      },
      //取消
      remove(data) {
        let _vm = this;
        _vm.$Modal.confirm({
          title: _vm.$t('publicSet.noticeTit'),
          content: _vm.$t('indexFailture.msg'),
          onOk: () => {
            _vm.$http.post({
              url: 'guard-webManager/customerRecord/failtureDelete.jhtml',
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
                  if(_vm.langRouterKey !== 'indexFailture') {
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
    }
  }

</script>
