/** 
 * 问卷情况页面 
 */

<template>
  <Table :columns="col" :data="data" stripe></Table>
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
        col: [
          {
            title: this.$t('labelPublic.xh'),
            type: 'index',
            width: 60
          },
          {
            title: this.$t('indexSurvey.colTit1'),
            width: 80,
            render: (h, params) => {
              if (params.row.createtime) {
                return h(resizeTime, {
                  props: {
                    time: params.row.createtime
                  }
                })
              }
            }
          },
          {
            title: this.$t('indexSurvey.colTit2'),
            width: 60,
            key: 'createUserHospitalName'
          },
          {
            title: this.$t('indexSurvey.colTit3'),
            width: 80,
            render: (h, params) => {
              const text = `【${params.row.createUserDeptName}】【${params.row.createUserName}】`;
              return h('span', text);
            }
          },
          {
            title: this.$t('indexSurvey.colTit4'),
            width: 60,
            key: 'surveyName'
          },
          {
            title: this.$t('labelPublic.ms'),
            width: 100,
            render: (h, params) => {
							if(params.row.remark) {
								return h(resizeRemark, {
									props: {
										remark: params.row.remark
									}
								})
							}
						}
          },
          {
            title: this.$t('publicSet.tableAction'),
            key: 'action',
            width: 140,
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small',
                    icon: 'ios-eye'
                  },
                  style: {
                    margin: '5px 3px 5px 0',
                    verticalAlign: 'middle'
                  },
                  on: {
                    click: () => {
                      this.toView(params.row, 1)
                    }
                  }
                }, this.$t('indexSurvey.btn')),
                h('Button', {
                  props: {
                    type: 'info',
                    size: 'small',
                    icon: 'edit'
                  },
                  style: {
                    margin: '5px 3px 5px 0',
                    verticalAlign: 'middle'
                  },
                  on: {
                    click: () => {
                      this.toView(params.row, 2)
                    }
                  }
                }, this.$t('publicSet.edit')),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small',
                    icon: 'ios-trash-outline'
                  },
                  style: {
                    margin: '5px 0px 5px 0',
                    verticalAlign: 'middle'
                  },
                  on: {
                    click: () => {
                      this.remove(params.row)
                    }
                  }
                }, this.$t('publicSet.del'))
              ])
            }
          }
        ],
        data: [],
        cusId: '',
        cusName: '',
      }
    },
    computed: {
      langRouterKey () {
        return this.$store.getters.getLandRouterKey;
      },
    },
    watch: {
      langRouterKey (val) {
        if(val === 'indexSurvey') {
          this.getList();
        }
      },
    },
    created() {
      this.cusId = sessionStorage.getItem('cusId');
      this.cusName = sessionStorage.getItem('cusName');
      this.getList();
    },
    methods: {
      // 获取资料
      getList() {
        let _vm = this;
        _vm.$store.dispatch('setPageLoading', -1);
        _vm.$http.getPage({
          url: 'guard-webManager/customerRecord/getSurvey.jhtml',
          data: {
            id: _vm.cusId
          },
          success: function (res) {
            const _data = res.data.content || [];
            if(_vm.langRouterKey !== 'indexSurvey') {
              _vm.data = _data;
            } else {
              _vm.requestList(_data, ['surveyName', 'remark']).then(res => _vm.data = res);
            }
						_vm.$store.dispatch('setPageLoading', 1);
          },
          error: function (res) {
            console.log(res);
          }
        })
      },
      remove(data) {
        let _vm = this;
        _vm.$Modal.confirm({
          title: _vm.$t('publicSet.noticeTit'),
          content: _vm.$t('indexSurvey.msg'),
          onOk: () => {
            _vm.$http.post({
              url: 'guard-webManager/customerRecord/delSurvey.jhtml',
              data: {
                id: data.id
              },
              success: function (res) {
                if (res.data.code === 0) {
                  _vm.getList();
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('publicSet.noticeSuccess')
                  });
                } else {
                  if(_vm.langRouterKey !== 'indexSurvey') {
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
          onCancel: () => {

          }
        })
      },
      toView(data, type) {
        const _text = type === 1
          ? data.surveyName
          : 'indexSurvey.tit1';
        const _url = type === 1
          ? '/surveyView'
          : '/surveyUpdate';
        const breadData = [
          {
            url: '/desktop',
            text: 'layoutNav.desk'
          },
          {
            url: '/customerMsg',
            text: this.cusName
          },
          {
            url: _url,
            text: _text
          }
        ]
        this.$store.dispatch('setBreadData', breadData);
        this.$router.push({
          path: _url,
          query: {
            id: data.id
          }
        });
      }
    }
  }

</script>
