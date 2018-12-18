/** 
 * 划扣记录页面 
 */

<template>
  <div class="customer-box">
    <Table stripe :columns="col" :data="data"></Table>
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
        col: [
          {
            title: this.$t('labelPublic.xh'),
            type: 'index',
            width: 60
          },
          {
            title: this.$t('indexOperation.colTit1'),
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
            title: this.$t('indexOperation.colTit2'),
            width: 60,
            key: 'hospitalName'
          },
          {
            title: this.$t('indexOperation.colTit3'),
            width: 60,
            key: 'createUserName'
          },
          {
            title: this.$t('indexOperation.colTit4'),
            width: 60,
            key: 'chargeName'
          },
          {
            title: this.$t('indexOperation.colTit5'),
            width: 80,
            render: (h, params) => {
              if (params.row.orderPaidTime) {
                return h(resizeTime, {
                  props: {
                    time: params.row.orderPaidTime
                  }
                })
              }
            }
          },
          {
            title: this.$t('labelPublic.dw'),
            width: 60,
            key: 'chargeUnitName'
          },
          {
            title: this.$t('indexOperation.colTit6'),
            width: 60,
            key: 'num'
          },
          {
            title: this.$t('labelPublic.ms'),
            width: 100,
						render: (h, params) => {
							if(params.row.remark) {
								return h(resizeRemark, {
									props: {
										remark: params.row.remark
									}
								})
							}
						}
          },
          {
            title: this.$t('indexOperation.colTit7'),
            width: 80,
            render: (h, params) => {
              return h('ul', params.row.operatorList.map(item => {
                const text = typeof item.positionName === 'string'
                  ? `【${item.userDeptName}】【${item.userName}】【${item.positionName}】`
                  : `【${item.userDeptName}】【${item.userName}】`;
                return h('li', {
                  style: {
                    marginBottom: '5px'
                  }
                }, text);
              }));
            }
          },
          {
            title: this.$t('publicSet.tableAction'),
            key: 'action',
            width: 140,
            render: (h, params) => {
              const _online = params.row.betterOrderDetailID 
                ? 'none' 
                : 'inline-block';
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
                    display: _online
                  },
                  on: {
                    click: () => {
                      this.toView(params.row.id);
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
                    display: _online
                  },
                  on: {
                    click: () => {
                      this.remove(params.row)
                    }
                  }
                }, this.$t('indexOperation.btn')),
                h('Button', {
                  props: {
                    type: 'warning',
                    size: 'small',
                    icon: 'printer'
                  },
                  style: {
                    margin: '5px 0px 5px 0',
                    verticalAlign: 'middle'
                  },
                  on: {
                    click: () => {
                      this.toPrint(params.row)
                    }
                  }
                }, this.$t('publicSet.print'))
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
        if(val === 'indexOperation') {
          this.getId(this.cusId);
        }
      },
    },
    created() {
      this.cusId = sessionStorage.getItem('cusId');
      this.cusName = sessionStorage.getItem('cusName');
      this.getId(this.cusId);
    },
    methods: {
      // 获取资料
      getId(id) {
        let _vm = this;
        _vm.$store.dispatch('setPageLoading', -1);
        _vm.$http.getPage({
          url: 'guard-webManager/customerRecord/getOperation.jhtml',
          data: {
            id: id
          },
          success: function (res) {
            const _data = res.data.content
            if(_vm.langRouterKey !== 'indexOperation') {
              _vm.data = _data;
            } else {
              _vm.requestList(_data, ['chargeName', 'remark', 'chargeUnitName']).then(res => _vm.data = res);
            }
						_vm.$store.dispatch('setPageLoading', 1);
          },
          error: function (res) {
            console.log(res);
          }
        });
      },
      //删除划扣
      remove(data) {
        let _vm = this;
        _vm.$Modal.confirm({
          title: _vm.$t('publicSet.noticeTit'),
          content: _vm.$t('indexOperation.msg'),
          onOk: () => {
            _vm.$http.post({
              url: 'guard-webManager/customerRecord/delOperation.jhtml',
              data: {
                id: data.id
              },
              success: function (res) {
                if (res.data.code === 0) {
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('publicSet.noticeSuccess')
                  });
                  _vm.getId(_vm.cusId)
                } else {
                  if(_vm.langRouterKey !== 'indexOperation') {
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
      //跳转操作页面
      toView(id) {
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
            url: '/operationUpdate',
            text: 'indexOperation.tit'
          }
        ];
        this.$store.dispatch('setBreadData', breadData);
        this.$router.push({
          path: '/operationUpdate',
          query: {
            id: id
          }
        })
      },
      toPrint(data) {
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
            url: '/printView',
            text: 'printView.tit'
          }
        ];
        this.$store.dispatch('setBreadData', breadData);
        this.$router.push({
          path: '/printView',
          query: {
            id: data.id,
            type: 'operation',
          }
        });
      },
    }
  }

</script>
