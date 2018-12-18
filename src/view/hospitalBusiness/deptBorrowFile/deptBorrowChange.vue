/** 
 * 查看物品变动 
 */

<template>
  <div class="container-box">
    <div class="container-header">
      <h2>{{$t('deptBorrowChange.tit')}}</h2>
    </div>
    <div class="container-body">
      <Table stripe :columns="col" :data="data"></Table>
      <div class="footer-btnGroup">
        <Button type="primary" icon="android-arrow-back" @click='back'>{{$t('publicSet.back')}}</Button>
      </div>
    </div>
  </div>
</template>

<script>
	import resizeTime from 'components/tableResizeTime.vue';
  export default {
		components: {resizeTime},
    data() {
      return {
        col: [
					{
            title: this.$t('labelPublic.xh'),
            type: 'index',
            width: 60
          },
          {
						title: this.$t('deptBorrowChange.colTit1'),
						width: 80,
            render: (h, params) => {
              if (params.row.createDate) {
                const _text = params.row.createDate.split(' ')[0];
                return h('span', _text);
              }
            }
          },
          {
            title: this.$t('deptBorrowChange.colTit2'),
						width: 60,
            key: 'no',
          },
          {
            title: this.$t('deptBorrowChange.colTit3'),
						width: 60,
            key: 'warehouseName',
          },
          {
            title: this.$t('deptBorrowChange.colTit3'),
						width: 80,
            render: (h, params) => {
							let lang = '';
							if(params.row.inOutType === -1) {
								const index = this.stockOutTypeList.findIndex(item => item.id === params.row.type);
								if(index >= 0) {
									lang = 'stockOutTypeList' + params.row.type;
								}
							}
							if(params.row.inOutType === 1) {
								const index = this.stockInTypeList.findIndex(item => item.id === params.row.type);
								if(index >= 0) {
									lang = 'stockInTypeList' + params.row.type;
								}
							}
							return h('span', this.$t(lang));
            }
          },
          {
            title: this.$t('labelPublic.lx'),
						width: 60,
            render: (h, params) => {
							const _text = params.row.inOutType === 1 
								? this.$t('deptBorrowChange.colTit5') 
								: this.$t('deptBorrowChange.colTit6');
              return h('span', _text);
            }
          },
          {
            title: this.$t('deptBorrow.colTit12'),
						width: 60,
            key: 'productID'
          },
          {
            title: this.$t('deptBorrow.colTit13'),
						width: 60,
            key: 'productName',
          },
          {
            title: this.$t('labelPublic.gg'),
						width: 60,
            key: 'productSize'
          },
          {
            title: this.$t('deptBorrow.colTit11'),
						width: 60,
            key: 'productCategoryName'
          },
          {
            title: this.$t('labelPublic.dw'),
						width: 60,
            key: 'productUnitName',
          },
          {
            title: this.$t('deptBorrow.colTit7'),
						width: 60,
            key: 'num',
          },
          {
            title: this.$t('deptBorrowChange.colTit7'),
						width: 60,
            key: 'createUserName',
          },
          {
            title: this.$t('deptBorrowChange.colTit8'),
						width: 80,
            render: (h, params) => {
              if(params.row.createTime) {
                return h(resizeTime, {
                  props: {
                    time: params.row.createTime
                  }
                })
              }
            }
          }
        ],
        data: [],
      }
		},
		computed: {
      langRouterKey () {
        return this.$store.getters.getLandRouterKey;
			},
			stockOutTypeList () {
        return this.$store.getters.getStockOutTypeList;
			},
			stockInTypeList () {
        return this.$store.getters.getStockInTypeList;
      },
    },
    watch: {
      langRouterKey (val) {
        if(val === 'deptBorrowChange') {
          this.getList();
        }
      },
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        let _vm = this
        _vm.$store.dispatch('setPageLoading', -1)
        _vm.$http.getPage({
          url: 'guard-webManager/deptBorrow/getChangeDetail.jhtml',
          data: {
            productId: _vm.$route.query.id
          },
          success: function (res) {
            const _data = res.data.content || [];
            if(_vm.langRouterKey !== 'deptBorrowChange') {
              _vm.data = _data;
            } else {
              _vm.requestList(_data, ['productCategoryName', 'productName', 'productUnitName', 'productSize', 'warehouseName']).then(res => _vm.data = res);
            }
            _vm.$store.dispatch('setPageLoading', 1);
          },
          error: function (res) {
            console.log(res)
          }
        })
      },
      back() {
        this.$router.back(-1)
      }
    }

  }

</script>
