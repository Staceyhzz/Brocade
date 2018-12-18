/** 
 * 划扣执行医务人员详细 
 */

<template>
  <div class="container-box">
    <div class="container-header">
      <h2>{{title}}</h2>
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
  export default {
    data() {
      return {
        col: [
          {
            title: this.$t('operatorUserInfo.colTit1'),
            width: 100,
            key: 'chargeName'
          },
          {
            title: this.$t('operatorUserInfo.colTit2'),
            width: 140,
            key: 'operationTime'
          },
          {
            title: this.$t('operatorUserInfo.colTit3'),
            width: 80,
            key: 'positionName'
          },
          {
            title: this.$t('operatorUserInfo.colTit4'),
            width: 100,
            key: 'rating'
          }
        ],
        data: [],
      }
    },
    computed: {
      title() {
        let _mes = ''
        if (this.data.length > 0) {
          _mes = this.data[0].userHospitalName + ' ' + this.data[0].userName
        } else {
          _mes = ''
        }
        return _mes
      },
      langRouterKey () {
        return this.$store.getters.getLandRouterKey;
      },
    },
    watch: {
      langRouterKey (val) {
        if(val === 'operatorUserInfo') {
          this.getId();
        }
      },
    },
    created() {
      this.getId();
    },
    methods: {
      // 判断权限
      getId() {
        let _vm = this;
        _vm.$store.dispatch('setPageLoading', -1)
        _vm.$http.getPage({
          url: 'guard-webManager/customerRecord/operator.jhtml',
          data: {
            customerId: _vm.$route.query.id,
            userId: _vm.$route.query.userId,
          },
          success: function (res) {
            const _data = res.data.content.OperatorList || [];
            if(_vm.langRouterKey !== 'operatorUserInfo') {
              _vm.data = _data;
            } else {
              _vm.requestList(_data, ['chargeName', 'positionName', 'rating']).then(res => _vm.data = res);
            }
						_vm.$store.dispatch('setPageLoading', 1);
          },
          error: function (res) {
            console.log(res);
          }
        })
      },
      back() {
        this.$router.back(-1);
      }
    }
  }

</script>
