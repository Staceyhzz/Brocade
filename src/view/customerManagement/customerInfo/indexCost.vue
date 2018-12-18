/** 
 * 耗材成本页面 
 */

<template>
  <div class="customer-box">
    <Table stripe :columns="columns" :data="data"></Table>
    <p class="sumCount">{{$t('indexCost.label')}}：
      <span>{{$t('indexCost.colTit8')}}：{{couNum}}</span>
      <span>{{$t('indexCost.colTit10')}}：{{couAll}}</span>
    </p>
  </div>
</template>

<script>
  import resizeTime from 'components/tableResizeTime.vue';
  export default {
    components: {
			resizeTime
    },
    data() {
      return {
        cusId: '',
        cusName: '',
        couNum: '',
        couAll: '',
        columns: [
          {
            title: this.$t('labelPublic.xh'),
            type: 'index',
            width: 60
          },
          {
            title: this.$t('indexCost.colTit1'),
            width: 80,
            render: (h, params) => {
              if(params.row.createDate) {
                const _text = params.row.createDate.split(' ')[0];
                return h('span', _text);
              }
            }
          },
          {
            title: this.$t('indexCost.colTit2'),
            width: 60,
            key: 'chargeID'
          },
          {
            title: this.$t('indexCost.colTit3'),
            width: 60,
            key: 'chargeName'
          },
          {
            title: this.$t('indexCost.colTit4'),
            width: 60,
            key: 'hospitalName'
          },
          {
            title: this.$t('indexCost.colTit5'),
            width: 60,
            key: 'warehouseName'
          },
          {
            title: this.$t('indexCost.colTit6'),
            width: 60,
            key: 'productID'
          },
          {
            title: this.$t('indexCost.colTit7'),
            width: 60,
            key: 'productName'
          },
          {
            title: this.$t('labelPublic.gg'),
            width: 60,
            key: 'productSize'
          },
          {
            title: this.$t('labelPublic.lx'),
            width: 60,
            key: 'productCategoryName'
          },
          {
            title: this.$t('labelPublic.dw'),
            width: 60,
            key: 'productUnitName'
          },
          {
            title: this.$t('indexCost.colTit8'),
            width: 60,
            key: 'num'
          },
          {
            title: this.$t('indexCost.colTit9'),
            width: 60,
            key: 'price',
            align: 'right',
            render: (h, params) => {
              if(Number.isFinite(params.row.price)) {
                return h('span', params.row.price.toFixed(2));
              }
            }
          },
          {
            title: this.$t('indexCost.colTit10'),
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
            title: this.$t('indexCost.colTit11'),
            width: 60,
            key: 'createUserName'
          },
          {
            title: this.$t('indexCost.colTit12'),
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
            title: this.$t('publicSet.tableAction'),
            key: 'action',
            width: 80,
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
        if(val === 'indexCost') {
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
          url: 'guard-webManager/customerRecord/getCost.jhtml',
          data: {
            id: id
          },
          success: function (res) {
            _vm.couAll = Number.isFinite(res.data.content.totalAmount)
              ? res.data.content.totalAmount.toFixed(2)
              : '0.00';
						_vm.couNum = res.data.content.totalNum;
            const _data = res.data.content.Page.content || [];
            const _col = _vm.tableCount(_data, ['amount', 'price']);
            _col.map(item => {
              const index = _vm.columns.findIndex(col => col.key === item.key);
              console.log(item)
              if(index >= 0) {
                _vm.columns[index].width = item.width;
              }
            });
            if(_vm.langRouterKey !== 'indexCost') {
              _vm.data = _data;
            } else {
              _vm.requestList(_data, ['chargeName', 'warehouseName', 'productName', 'productSize', 'productCategoryName', 'productUnitName']).then(res => _vm.data = res);
            }
						_vm.$store.dispatch('setPageLoading', 1);
          },
          error: function (res) {
            console.log(res)
          }
        })
      },
      remove(data) {
        let _vm = this
        _vm.$Modal.confirm({
          title: _vm.$t('publicSet.noticeTit'),
          content: _vm.$t('indexCost.msg'),
          onOk: () => {
            _vm.$http.post({
              url: 'guard-webManager/customerRecord/deleteStockOut.jhtml',
              data: {
                id: data.stockOutID
              },
              success: function (res) {
                if (res.data.code === 0) {
                  _vm.getId(_vm.cusId);
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('publicSet.noticeSuccess')
                  });
                } else {
                  if(_vm.langRouterKey !== 'indexCost') {
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
