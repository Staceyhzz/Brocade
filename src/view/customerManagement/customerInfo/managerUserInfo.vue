/** 
 * 咨询人员历史详细 
 */

<template>
  <div class="container-box">
    <div class="container-header">
      <h2>{{$t('indexManager.tit5')}}</h2>
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
            key: 'hospitalName'
          },
          {
            title: this.$t('indexManager.colTit2'),
            width: 80,
            render: (h, params) => {
              const text = `【${params.row.userDeptName}】【${params.row.userName}】`;
              return h('span', text);
            }
          },
          {
            title: this.$t('indexManager.colTit3'),
            width: 140,
            key: 'starttime'
          },
          {
            title: this.$t('indexManager.colTit4'),
            width: 140,
            key: 'endtime'
          },
          {
            title: this.$t('labelPublic.ms'),
            width: 100,
            key: 'remark'
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
        if(val === 'managerUserInfo') {
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
          url: 'guard-webManager/customerRecord/managerUserInfo.jhtml',
          data: {
            customerId: id
          },
          success: function (res) {
            const _data = res.data.content;
            if(_vm.langRouterKey !== 'managerUserInfo') {
              _vm.data = _data;
            } else {
              _vm.requestList(_data, ['remark']).then(res => _vm.data = res);
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
