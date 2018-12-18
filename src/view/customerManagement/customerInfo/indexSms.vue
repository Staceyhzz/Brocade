/** 
 * 短信记录页面 
 */

<template>
  <div class="customer-box">
    <Alert>
      <span>{{$t('indexSms.msg')}}</span>
      <Button type="primary" icon='refresh' @click='refresh' :loading='saveLoad'>{{$t('indexSms.btn')}}</Button>
    </Alert>
    <Table stripe :columns="col" :data="data"></Table>
  </div>
</template>

<script>
  import resizeTime from 'components/tableResizeTime.vue';
	import resizeRemark from 'components/tableResizeRemark.vue';
  export default {
    components: {
			resizeTime,
			resizeRemark
    },
    data() {
      return {
        typeList: [
          {
            id: -1,
            name: '发送中',
            color: '#000',
            lang: 'indexSms.type1'
          },
          {
            id: 0,
            name: '未发送',
            color: 'orange',
            lang: 'indexSms.type2'
          },
          {
            id: 1,
            name: '发送成功',
            color: '#4172F6',
            lang: 'indexSms.type3'
          },
          {
            id: 2,
            name: '发送失败',
            color: '#FF6F76',
            lang: 'indexSms.type4'
          }
        ],
        cusId: '',
        saveLoad: false,
        col: [
          {
            title: this.$t('labelPublic.xh'),
            type: 'index',
            width: 60
          },
          {
            title: this.$t('indexSms.colTit1'),
            width: 80,
            key: 'hospitalName'
          },
          {
            title: this.$t('indexSms.colTit2'),
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
            title: this.$t('indexSms.colTit3'),
            width: 60,
            key: 'createUserName',
          },
          {
            title: this.$t('indexSms.colTit4'),
            width: 60,
            key: 'templateName'
          },
          {
            title: this.$t('indexSms.colTit5'),
            width: 100,
            render: (h, params) => {
							if(params.row.content) {
								return h(resizeRemark, {
									props: {
										remark: params.row.content
									}
								})
							}
						}
          },
          {
            title: this.$t('indexSms.colTit6'),
            width: 60,
            key: 'smsGroupName'
          },
          {
            title: this.$t('indexSms.colTit7'),
            width: 70,
            render: (h, params) => {
              const index = this.typeList.findIndex(item => item.id === params.row.status);
              if(index >= 0) {
                const text = this.$t(this.typeList[index].lang);
                const color = this.typeList[index].color;
                return h('span', {
                  style: {
                    color: color
                  }
                }, text);
              }
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
        if(val === 'indexSms') {
          this.getList();
        }
      },
    },
    created() {
      this.cusId = sessionStorage.getItem('cusId');
      this.getList();
    },
    methods: {
      getList() {
        let _vm = this;
        _vm.$store.dispatch('setPageLoading', -1);
        _vm.$http.getPage({
          url: 'guard-webManager/customerRecord/getSms.jhtml',
          data: {
            customerId: _vm.cusId
          },
          success: function (res) {
            const _data = res.data.content.smsList || [];
            if(_vm.langRouterKey !== 'indexSms') {
              _vm.data = _data;
            } else {
              _vm.requestList(_data, ['templateName', 'content', 'smsGroupName']).then(res => _vm.data = res);
            }
						_vm.$store.dispatch('setPageLoading', 1);
          },
          error: function (res) {
            console.log(res)
          }
        })
      },
      refresh() {
        let _vm = this;
        _vm.saveLoad = true;
        _vm.$http.post({
          url: 'guard-webManager/customerRecord/getStatus.jhtml',
          data: {
            customerId: _vm.cusId
          },
          success: function (res) {
            if (res.data.code === 0) {
              _vm.$Notice.success({
                title: _vm.$t('publicSet.noticeTit'),
                desc: _vm.$t('publicSet.noticeSuccess')
              });
              _vm.saveLoad = false;
              _vm.getList();
            } else {
              vm.saveLoad = false;
              if(_vm.langRouterKey !== 'indexSms') {
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
            console.log(res)
          }
        })
      },
    }
  }

</script>
