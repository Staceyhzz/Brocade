/** 
 * 短信模板 
 */

<template>
  <div class="container-box">
    <div class="container-header">
      <h2>{{$t('layoutNav.smsTemplate')}}</h2>
    </div>
    <div class="container-body">
      <Alert>
        <p>{{message}}</p>
      </Alert>
      <Table stripe :columns="col" :data="data"></Table>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        message: '',
        col: [
					{
            title: this.$t('labelPublic.xh'),
            type: 'index',
            width: 60
          },
          {
						title: this.$t('labelPublic.mc'),
						width: 80,
            key: 'name'
          },
          {
            title: this.$t('smsTemplate.colTit1'),
						width: 120,
            key: 'content',
          },
          {
            title: this.$t('smsTemplate.colTit2'),
						width: 60,
            key: 'paramNum'
          },
          {
            title: this.$t('labelPublic.mc'),
						width: 120,
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
        if(val === 'smsTemplate') {
          this.getList();
        }
      },
    },
    created() {
      this.getList();
    },
    methods: {
      getList() {
        let _vm = this
        _vm.$store.dispatch('setPageLoading', -1)
        _vm.$http.getPage({
          url: 'guard-webManager/smsTemplate/list.jhtml',
          success: function (res) {
            const _msg = res.data.content.num || '';
            const _data = res.data.content.list || [];
            if(_vm.langRouterKey !== 'smsTemplate') {
              _vm.data = _data;
              _vm.message = _msg;
            } else {
              _vm.requestList(_data, ['name', 'content', 'remark']).then(res => _vm.data = res);
              _vm.getLang.word(_msg, (data) => {
                _vm.message = data[0].dst;
              });
            }
            console.log(res)
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
