/** * 投诉反馈页面 */

<template>
  <div class="customer-box">
    <div class="customer-item">
      <div class="customer-item-title">
        <h3>
          <Icon type="pricetag"></Icon>{{$t('indexComplain.tit1')}}</h3>
      </div>
      <Table stripe :columns="col" :data="data"></Table>
    </div>
    <div class="customer-item">
      <div class="customer-item-title">
        <h3>
          <Icon type="pricetag"></Icon>{{$t('indexComplain.tit2')}}</h3>
      </div>
      <Table stripe :columns="col1" :data="data1"></Table>
    </div>
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
        data: [],
        data1: [],
        col: [
          {
            title: this.$t('labelPublic.xh'),
            type: 'index',
            width: 60
          },
          {
            title: this.$t('indexComplain.colTit1'),
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
            title: this.$t('indexComplain.colTit2'),
            width: 60,
            key: 'createUserName'
          },
          {
            title: this.$t('indexComplain.colTit3'),
            width: 60,
            key: 'hospitalName'
          },
          {
            title: this.$t('indexComplain.colTit4'),
            width: 60,
            key: 'targetUserName'
          },
          {
            title: this.$t('indexComplain.colTit5'),
            width: 60,
            key: 'chargeName'
          },
          {
            title: this.$t('indexComplain.colTit6'),
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
            title: this.$t('labelPublic.zt'),
            width: 70,
            render: (h, params) => {
              const color = params.row.status === 1 
                ? '#4172F6' 
                : '#FF6F76';
              const text = params.row.status === 1 
                ? this.$t('indexComplain.colTit7') 
                : this.$t('indexComplain.colTit8');
              return h('span', {
                style: {
                  color: color
                }
              }, text);
            }
          },
          {
            title: this.$t('indexComplain.colTit9'),
            width: 60,
            key: 'finishUserName'
          },
          {
            title: this.$t('indexComplain.colTit10'),
            width: 80,
            render: (h, params) => {
              if (params.row.finishtime) {
                return h(resizeTime, {
                  props: {
                    time: params.row.finishtime
                  }
                })
              }
            }
          },
          {
            title: this.$t('indexComplain.colTit11'),
            width: 100,
						render: (h, params) => {
							if(params.row.solution) {
								return h(resizeRemark, {
									props: {
										remark: params.row.solution
									}
								})
							}
						}
          },
          {
            title: this.$t('indexComplain.colTit12'),
            width: 100,
						render: (h, params) => {
							if(params.row.feedback) {
								return h(resizeRemark, {
									props: {
										remark: params.row.feedback
									}
								})
							}
						}
          }
        ],
        col1: [
          {
            title: this.$t('labelPublic.xh'),
            type: 'index',
            width: 60
          },
          {
            title: this.$t('indexComplain.colTit1'),
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
            title: this.$t('indexComplain.colTit13'),
            width: 60,
            key: 'hospitalName'
          },
          {
            title: this.$t('indexComplain.colTit2'),
            width: 60,
            key: 'createUserName'
          },
          {
            title: this.$t('indexComplain.colTit14'),
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
            width: 100,
            render: (h, params) => {
              return h('div', [
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
      }
    },
    created() {
      this.cusName = sessionStorage.getItem('cusName');
      this.cusId = sessionStorage.getItem('cusId');
      this.getList(this.cusId);
    },
    computed: {
      langRouterKey () {
        return this.$store.getters.getLandRouterKey;
      },
    },
    watch: {
      langRouterKey (val) {
        if(val === 'indexComplain') {
          this.getList(this.cusId);
        }
      },
    },
    methods: {
      getList(id) {
        let _vm = this;
        _vm.$store.dispatch('setPageLoading', -1);
        _vm.$http.getPage({
          url: 'guard-webManager/customerRecord/getComplain.jhtml',
          data: {
            id: id
          },
          success: function (res) {
						const _data = res.data.content.complainList || [];
            const _data1 = res.data.content.blacklistOrderList || [];
            if(_vm.langRouterKey !== 'indexComplain') {
              _vm.data = _data;
              _vm.data1 = _data1;
            } else {
              _vm.requestList(_data, ['chargeName', 'content', 'solution', 'feedback']).then(res => _vm.data = res);
              _vm.requestList(_data1, ['content']).then(res => _vm.data1 = res);
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
        _vm.$Modal.confirm({
          title: _vm.$t('publicSet.noticeTit'),
          content: _vm.$t('indexComplain.msg'),
          onOk: () => {
            _vm.$http.post({
              url: 'guard-webManager/customerRecord/blacklistDelete.jhtml',
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
                  if(_vm.langRouterKey !== 'indexComplain') {
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
