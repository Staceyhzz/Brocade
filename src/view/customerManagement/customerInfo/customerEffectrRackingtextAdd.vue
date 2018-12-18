/** 
 * 选择效果追踪模板页面 
 */

<template>
  <div class="container-box userPower">
    <div class="container-header">
      <h2>{{$t('customerEffectrRackingtextAdd.tit')}}</h2>
    </div>
    <div class="container-body">
      <Table stripe :columns="col" :data="data"></Table>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        customerName: '',
        customerId: '',
        col: [
          {
            title: this.$t('labelPublic.xh'),
            type: 'index',
            width: 60
          },
          {
            title: this.$t('labelPublic.mc'),
            key: 'templateName'
          },
          {
            title: this.$t('labelPublic.zt'),
            render: (h, params) => {
              const color = params.row.status === 1 
                ? '#4172F6' 
                : '#FF6F76';
              const text = params.row.status === 1 
                ? this.$t('publicSet.enable') 
                : this.$t('publicSet.disable');
              return h('span', {
                style: {
                  color: color
                }
              }, text);
            }
          },
          {
            title: this.$t('labelPublic.ms'),
            key: 'remarks'
          },
          {
            title: this.$t('publicSet.tableAction'),
            key: 'action',
            width: 90,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small',
                    icon: 'edit'
                  },
                  on: {
                    click: () => {
                      this.toChoose(params.row)
                    }
                  }
                }, this.$t('selectMedicalRecord.btn'))
              ])
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
    },
    watch: {
      langRouterKey (val) {
        if(val === 'customerEffectrRackingtextAdd') {
          this.getId();
        }
      },
    },
    created() {
      this.customerName = sessionStorage.getItem('cusName');
      this.customerId = sessionStorage.getItem('cusId');
      this.getId();
    },
    methods: {
      // 判断权限
      getId() {
        let _vm = this;
        _vm.$store.dispatch('setPageLoading', -1);
        _vm.$http.getPage({
          url: 'guard-webManager/customerRecord/getEffectrRackingtextTitleAdd',
          data: {
            customerId: _vm.customerId
          },
          success: function (res) {
            _vm.getList()
          },
          error: function (res) {
            console.log(res)
          }
        })
      },
      getList() {
        let _vm = this;
        _vm.$http.get({
          url: 'guard-webManager/customerManagement/findAllSmarteffectrrackingtemplatetitle.jhtml',
          data: {status: 1},
          success: function (res) {
            if(res.data.code === 0) {
              const _data = res.data.content.content || [];
              if(_vm.langRouterKey !== 'customerEffectrRackingtextAdd') {
                _vm.data = _data;
              } else {
                _vm.requestList(_data, ['templateName', 'remarks']).then(res => _vm.data = res);
              }
              _vm.$store.dispatch('setPageLoading', 1);
            }
          },
          error: function (res) {
            console.log(res)
          }
        })
      },
      toChoose(data) {
        const breadData = [
          {
            url: '/desktop',
            text: 'layoutNav.desk'
          },
          {
            url: '/customerMsg',
            text: this.customerName
          },
          {
            url: '/effectTrackingAdd',
            text: 'cusNavList.customerEffectrRackingtext'
          }
        ];
        this.$store.dispatch('setBreadData', breadData);
        this.$router.push({
          path: '/effectTrackingAdd',
          query: {
            id: data.id,
            name: data.templateName
          }
        })
      },
    }
  }

</script>
