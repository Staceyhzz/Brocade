/** 
 * 渠道页面 
 */

<template>
  <div class="customer-box">
    <div class="customer-item">
      <div class="customer-item-title">
        <h3>
          <Icon type="pricetag"></Icon>{{$t('indexStore.tit')}}</h3>
      </div>
      <table class="tableEdit">
        <tr>
          <td class="tit">{{$t('indexStore.label1')}}</td>
          <td>{{ cusData.id }}</td>
          <td class="tit">{{$t('labelPublic.mc')}}</td>
          <td>{{ cusData.name }}</td>
        </tr>
        <tr>
          <td class="tit">{{$t('indexStore.label2')}}</td>
          <td>{{cusData.linkman}}</td>
          <td class="tit">{{$t('indexStore.label3')}}</td>
          <td>{{cusData.mobile}}</td>
        </tr>
        <tr>
          <td class="tit">{{$t('indexStore.label4')}}</td>
          <td>{{cusData.address}}</td>
          <td class="tit">{{$t('indexStore.label5')}}</td>
          <td>{{cusData.ownerName}}</td>
        </tr>
        <tr>
          <td class="tit">{{$t('indexStore.label6')}}</td>
          <td>{{cusData.bank}}</td>
          <td class="tit">{{$t('indexStore.label7')}}</td>
          <td>{{cusData.cardNo}}</td>
        </tr>
        <tr>
          <td class="tit">{{$t('labelPublic.ms')}}</td>
          <td colspan="3">{{cusData.remark}}</td>
        </tr>
      </table>
    </div>
    <div class="customer-item">
      <div class="customer-item-title">
        <h3>
          <Icon type="pricetag"></Icon>{{$t('commissionAdd.label')}}</h3>
      </div>
      <Table stripe :columns="columns" :data="data"></Table>
      <p class="sumCount">{{$t('indexStore.msg1')}}
        <span>{{$t('indexStore.msg2')}}{{depositAll}}</span>
      </p>
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
        cusData: {},
        depositAll: '',
        columns: [
          {
            title: this.$t('labelPublic.xh'),
            type: 'index',
            width: 60
          },
          {
            title: this.$t('indexStore.colTit1'),
            width: 80,
            render: (h, params) => {
              if (params.row.createTime) {
                return h(resizeTime, {
                  props: {
                    time: params.row.createTime
                  }
                });
              }
            }
          },
          {
            title: this.$t('indexStore.colTit2'),
            width: 60,
            key: 'createUserName'
          },
          {
            title: this.$t('labelPublic.yy'),
            width: 60,
            key: 'hospitalName'
          },
          {
            title: this.$t('indexStore.colTit3'),
            width: 60,
            key: 'storeName'
          },
          {
            title: this.$t('indexStore.colTit4'),
            width: 60,
            key: 'amount',
            align: 'right',
            render: (h, params) => {
              if(Number.isFinite(params.row.amount)) {
                return h('span', params.row.amount.toFixed(2));
              }
            }
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
            title: this.$t('publicSet.tableAction'),
            key: 'action',
            width: 80,
            align: 'center',
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
        if(val === 'indexStore') {
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
          url: 'guard-webManager/customerRecord/getStore.jhtml',
          data: {
            id: id
          },
          success: function (res) {
						_vm.depositAll = res.data.content.commissionTotal.toFixed(2);
						const cusData = res.data.content.store || {}
            const data = res.data.content.commissionList || [];
            const _col = _vm.tableCount(data, ['amount']);
            _col.map(item => {
              const index = _vm.columns.findIndex(col => col.key === item.key);
              console.log(item)
              if(index >= 0) {
                _vm.columns[index].width = item.width;
              }
            });
            if(_vm.langRouterKey !== 'indexStore') {
              _vm.data = data;
              _vm.cusData = cusData;
            } else {
              _vm.requestList(data, ['storeName', 'remark']).then(res => _vm.data = res);
              _vm.requestList([cusData], ['name', 'address', 'bank', 'remark']).then(res => _vm.cusData = res[0]);
            }
						_vm.$store.dispatch('setPageLoading', 1);
          },
          error: function (res) {
            console.log(res)
          }
        })
      },
      remove(data) {
        let _vm = this;
        _vm.$Modal.confirm({
          title: _vm.$t('publicSet.noticeTit'),
          content: _vm.$t('indexStore.msg3'),
          onOk: () => {
            _vm.$http.post({
              url: 'guard-webManager/customerRecord/deleteCommission.jhtml',
              data: {
                id: data.id
              },
              success: function (res) {
                if (res.data.code === 0) {
                  _vm.getList(_vm.cusId)
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('publicSet.noticeSuccess')
                  });
                } else {
                  if(_vm.langRouterKey !== 'indexStore') {
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
    }
  }

</script>

<style scoped>
  .sumCount {
    padding: 15px 0;
  }

  .sumCount span {
    margin: 0px 15px;
  }

</style>
