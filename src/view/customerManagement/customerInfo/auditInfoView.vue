/** 
 * 查看审核情况页面 
 */

<template>
  <div class="container-box userPower">
    <div class="container-header">
      <h2>{{$t('indexAudit.tit15')}}</h2>
    </div>
    <div class="container-body">
      <Table :columns="col" :data="data" stripe></Table>
      <div class="footer-btnGroup">
        <Button type="primary" icon="android-arrow-back" @click='back'>{{$t('publicSet.back')}}</Button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        customerName: '',
        formValidate: {
          customerId: '',
          type: '',
          id: '',
        },
        data: [],
        result: [],
        col: [
          {
            title: this.$t('auditInfoView.colTit1'),
            width: 60,
            key: 'level'
          },
          {
            title: this.$t('auditInfoView.colTit2'),
            width: 120,
            render: (h, params) => {
              if(this.result.length !== 0 && this.result[0].level === params.row.level) {
                const text = `【${this.result[0].hospitalName}】【${this.result[0].userName}】`;
                return h('span', text);
              } else {
                return h('ul', params.row.userList.map(item => {
                  const text = `【${item.userHospitalName}】【${item.userName}】`;
                  return h('li', text);
                }));
              }
            }
          },
          {
            title: this.$t('auditInfoView.colTit3'),
            width: 70,
            render: (h, params) => {
              if(this.result.length !== 0 && this.result[0].level === params.row.level) {
                return h('span', this.result[0].status);
              } else {
                return h('span', this.$t('auditInfoView.colTit4'));
              }
            }
          },
          {
            title: this.$t('auditInfoView.colTit5'),
            width: 80,
            render: (h, params) => {
              if(this.result.length !== 0 && this.result[0].level === params.row.level) {
                return h('span', this.result[0].auditTime);
              }
            }
          },
          {
            title: this.$t('auditInfoView.colTit6'),
            width: 100,
            render: (h, params) => {
              if(this.result.length !== 0 && this.result[0].level === params.row.level) {
                return h('p', this.result[0].content);
              }
            }
          }
        ]
      }
    },
    computed: {
      langRouterKey () {
        return this.$store.getters.getLandRouterKey;
      },
    },
		watch: {
      langRouterKey (val) {
        if(val === 'auditInfoView') {
          this.getId();
        }
      },
    },
    created() {
      this.formValidate.customerId = sessionStorage.getItem('cusId');
      this.customerName = sessionStorage.getItem('cusName');
      this.formValidate.id = this.$route.query.id;
      this.formValidate.type = this.$route.query.type;
      this.getId();
    },
    methods: {
      // 判断权限
      getId() {
        let _vm = this;
        _vm.$store.dispatch('setPageLoading', -1);
        _vm.$http.getPage({
          url: 'guard-webManager/customerRecord/auditInfoView.jhtml',
          data: _vm.formValidate,
          success: function (res) {
            const rule = res.data.content.rule || {};
            const result = res.data.content.auditList || [];
            let list = [];
            for(let i = 1; i <= rule.level; i++) {
              const userList = rule.detailList.filter(item => item.level === i);
              list.push({
                level: i,
                userList: userList
              });
            }
            if(_vm.langRouterKey !== 'auditInfoView') {
              _vm.result = result;
              _vm.data = list;
            } else {
              _vm.requestList(result, ['status', 'content']).then(res => {
                _vm.result = res;
                _vm.data = list;
              });
            }
						_vm.$store.dispatch('setPageLoading', 1);
          },
          error: function (res) {
            console.log(res);
          }
        });
      },
      back() {
        this.$router.back(-1);
      }
    }
  }

</script>
