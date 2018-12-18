/** 
 * 账号信息页面 
 */

<template>
  <div class="living-box" style='padding:10px'>
    <div class="customer-item">
      <div class="customer-item-title">
        <h3>
          <Icon type="pricetag"></Icon>{{$t('liveDeskAccount.tit1')}}</h3>
      </div>
      <Row>
        <Col :md="12" :lg="8">{{$t('liveDeskAccount.label1')}}{{depositRestTotal}}</Col>
        <Col :md="12" :lg="8">{{$t('liveDeskAccount.label2')}}{{couponRestTotal}}</Col>
        <Col :md="12" :lg="8">{{$t('liveDeskAccount.label3')}}{{pointTotal}}</Col>
      </Row>
    </div>
    <div class="customer-item">
      <div class="customer-item-title">
        <h3>
          <Icon type="pricetag"></Icon>{{$t('liveDeskAccount.tit2')}}</h3>
      </div>
      <Table stripe :columns="col" :data="data"></Table>
    </div>
    <div class="customer-item">
      <div class="customer-item-title">
        <h3>
          <Icon type="pricetag"></Icon>{{$t('liveDeskAccount.tit3')}}</h3>
      </div>
      <Table stripe :columns="col1" :data="data1"></Table>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        depositRestTotal: '',
        couponRestTotal: '',
        pointTotal: '',
        col: [
					{
						title: this.$t('liveDeskAccount.colTit1'),
						width: 80,
            key: 'chargeName'
          },
          {
            title: this.$t('liveDeskAccount.colTit2'),
						width: 80,
            render: (h, params) => {
              if (params.row.hospitalIDs) {
                return h('span', params.row.hospitalIDs)
              } else {
                return h('span', this.$t('liveDeskAccount.colTit8'))
              }
            }
          },
          {
            title: this.$t('liveDeskAccount.colTit3'),
						width: 80,
            render: (h, params) => {
              if (params.row.chargeIDs) {
                return h('span', params.row.chargeIDs)
              } else {
                return h('span', this.$t('liveDeskAccount.colTit8'))
              }
            }
          },
          {
            title: this.$t('liveDeskAccount.colTit4'),
						width: 80,
            render: (h, params) => {
              if (params.row.chargeCategoryIDs) {
                return h('span', params.row.chargeCategoryIDs)
              } else {
                return h('span', this.$t('liveDeskAccount.colTit8'))
              }
            }
          },
          {
            title: this.$t('liveDeskAccount.colTit5'),
						width: 60,
						align: 'right',
						key: 'rest',
            render: (h, params) => {
              if (Number.isFinite(params.row.rest)) {
                const _text = params.row.rest.toFixed(2)
                return h('span', _text)
              }
            }
          },
        ],
        col1: [
					{
            title: this.$t('liveDeskAccount.colTit6'),
						width: 80,
            key: 'categoryName'
          },
          {
            title: this.$t('liveDeskAccount.colTit2'),
						width: 80,
            render: (h, params) => {
              if (params.row.hospitalIDs) {
                return h('span', params.row.hospitalIDs)
              } else {
                return h('span', this.$t('liveDeskAccount.colTit8'))
              }
            }
          },
          {
            title: this.$t('liveDeskAccount.colTit3'),
						width: 80,
            render: (h, params) => {
              if (params.row.chargeIDs) {
                return h('span', params.row.chargeIDs)
              } else {
                return h('span', this.$t('liveDeskAccount.colTit8'))
              }
            }
          },
          {
            title: this.$t('liveDeskAccount.colTit4'),
						width: 80,
            render: (h, params) => {
              if (params.row.chargeCategoryIDs) {
                return h('span', params.row.chargeCategoryIDs)
              } else {
                return h('span', this.$t('liveDeskAccount.colTit8'))
              }
            }
          },
          {
            title: this.$t('liveDeskAccount.colTit7'),
						width: 80,
            render: (h, params) => {
              if (params.row.expiration) {
                const _text = params.row.expiration.split(' ')[0]
                return h('span', _text)
              } else {
                return h('span', this.$t('liveDeskAccount.colTit8'))
              }
            }
          },
          {
            title: this.$t('liveDeskAccount.colTit5'),
						width: 60,
						align: 'right',
						key: 'rest',
            render: (h, params) => {
              if (Number.isFinite(params.row.rest)) {
                const _text = params.row.rest.toFixed(2)
                return h('span', _text)
              }
            }
          },
        ],
        data: [],
        data1: [],
      }
    },
    computed: {
      langRouterKey () {
        return this.$store.getters.getLandRouterKey;
      },
    },
    watch: {
      langRouterKey (val) {
        if(val === 'liveDeskAccount') {
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
          url: 'guard-webManager/liveDesk/getAccount.jhtml',
          data: {
            customerID: sessionStorage.getItem('liveId')
          },
          success: function (res) {
            console.log(res)
            console.log(res)
            _vm.pointTotal = res.data.content.pointTotal || 0
            _vm.couponRestTotal = (res.data.content.couponRestTotal).toFixed(2) || 0
            _vm.depositRestTotal = (res.data.content.depositRestTotal).toFixed(2) || 0
            const _data = res.data.content.depositList || [];
            const _data1 = res.data.content.couponList || [];
            const _col = _vm.tableCount(_data, ['rest']);
            _col.map(item => {
              const index = _vm.col.findIndex(col => col.key === item.key);
              console.log(item)
              if(index >= 0) {
                _vm.col[index].width = item.width;
              }
            });
            const _col1 = _vm.tableCount(_data1, ['rest']);
            _col1.map(item => {
              const index = _vm.col1.findIndex(col => col.key === item.key);
              console.log(item)
              if(index >= 0) {
                _vm.col1[index].width = item.width;
              }
            });
            if(_vm.langRouterKey !== 'liveDeskAccount') {
              _vm.data = _data;
              _vm.data1 = _data1;
            } else {
              _vm.requestList(_data, ['chargeName', 'chargeIDs', 'chargeCategoryIDs']).then(res => _vm.data = res);
              _vm.requestList(_data1, ['categoryName', 'chargeIDs', 'chargeCategoryIDs']).then(res => _vm.data1 = res);
            }
            _vm.$store.dispatch('setPageLoading', 1);
          },
          error: function (res) {
            console.log(res)
          }
        })
      },
    }
  }

</script>
