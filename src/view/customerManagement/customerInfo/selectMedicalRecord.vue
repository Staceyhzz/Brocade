/** 
 * 选择电子病历模板页面 
 */

<template>
  <div class="container-box userPower">
    <div class="container-header">
      <h2>{{$t('selectSurvey.tit')}}</h2>
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
            key: 'name'
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
            key: 'remark'
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
        if(val === 'selectMedicalRecord') {
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
          url: 'guard-webManager/customerRecord/selectMedicalRecord.jhtml',
          data: {
            customerId: _vm.customerId
          },
          success: function (res) {
						const _data = res.data.content || [];
            if(_vm.langRouterKey !== 'selectMedicalRecord') {
              _vm.data = _data;
            } else {
              _vm.requestList(_data, ['name', 'remark']).then(res => _vm.data = res);
            }
						_vm.$store.dispatch('setPageLoading', 1);
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
            url: '/medicalRecordAdd',
            text: 'cusNavList.customerMedicalRecord'
          }
        ];
        this.$store.dispatch('setBreadData', breadData);
        this.$router.push({
          path: 'medicalRecordAdd',
          query: {
            id: data.id,
          }
        })
      },
    }
  }

</script>
