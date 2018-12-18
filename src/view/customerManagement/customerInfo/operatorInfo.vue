/** 
 * 医护人员详细 
 */

<template>
  <div class="container-box">
    <div class="container-header">
      <h2>{{$t('indexManager.tit3')}}</h2>
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
            title: this.$t('labelPublic.xh'),
            type: 'index',
            width: 60
          },
          {
            title: this.$t('indexManager.colTit1'),
            width: 80,
            key: 'userHospitalName'
          },
          {
            title: this.$t('operatorUserInfo.colTit5'),
            width: 60,
            key: 'userName'
          },
          {
            title: this.$t('operatorUserInfo.colTit1'),
            width: 80,
            key: 'chargeName'
          },
          {
            title: this.$t('operatorUserInfo.colTit2'),
            width: 80,
            key: 'operationTime'
          },
          {
            title: this.$t('operatorUserInfo.colTit3'),
            width: 60,
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
      langRouterKey () {
        return this.$store.getters.getLandRouterKey;
      },
    },
    watch: {
      langRouterKey (val) {
        if(val === 'operatorInfo') {
          this.getId(this.$route.query.id);
        }
      },
    },
    created() {
      this.getId(this.$route.query.id);
    },
    methods: {
      // 判断权限
      getId(id) {
        let _vm = this;
        _vm.$store.dispatch('setPageLoading', -1);
        _vm.$http.getPage({
          url: 'guard-webManager/customerRecord/operatorInfo.jhtml',
          data: {
            customerId: id
          },
          success: function (res) {
            const _data = res.data.content;
            if(_vm.langRouterKey !== 'operatorInfo') {
              _vm.data = _data;
            } else {
              _vm.requestList(_data, ['rating', 'positionName', 'chargeName']).then(res => _vm.data = res);
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
