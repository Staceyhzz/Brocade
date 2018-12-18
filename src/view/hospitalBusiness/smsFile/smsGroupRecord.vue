/** 
 * 短信发送任务详情 
 */

<template>
  <div class="container-box">
    <div class="container-header">
      <h2>{{$t('smsGroupRecord.msg1')}}————{{titmes}}</h2>
      <ul class="header-btn-group">
        <li class="header-item" @click="add">
          <Icon type="plus-round"></Icon>{{$t('smsGroupRecord.btn1')}}</li>
      </ul>
    </div>
    <div class="container-body">
      <Alert>
        <span>{{$t('smsGroupRecord.msg2')}}</span>
        <Button type="primary" icon='refresh' @click='refresh'>{{$t('smsGroupRecord.btn2')}}</Button>
      </Alert>
      <Alert>
				<p>{{$t('smsGroupRecord.msg3', [waitNum, successNum, failNum])}}</p>
      </Alert>
      <Table stripe :columns="col" :data="data"></Table>
      <div class="table-page">
        <div class="table-info">{{$t('publicSet.pageMsg', [pageNumber, totalPages, total])}}</div>
        <Page class="table-paginate" :total="total" @on-change='changePage' :current='pageNumber' show-elevator></Page>
      </div>
    </div>
  </div>
</template>

<script>
	import resizeCus from 'components/tableResizeCus.vue';
  export default {
		components: {
			resizeCus,
    },
    data() {
      return {
        titmes: '',
        waitNum: 0,
        successNum: 0,
        failNum: 0,
        total: 0,
        totalPages: 1,
        pageNumber: 1,
        col: [
					{
            title: this.$t('labelPublic.xh'),
            width: 60,
            render: (h, params) => {
              const _index = (this.pageNumber - 1) * 10
              return h('span', params.index + 1 + _index)
            }
          },
          {
						title: this.$t('smsGroupRecord.colTit6'),
						width: 60,
						render: (h, params) => {
              return h(resizeCus, {
                props: {
                  name: params.row.customerName,
                  id: params.row.customerID
                },
                on: {
                  'click': () => {
                    this.toCusIndex(params.row.customerID, params.row.customerName);
                  }
                }
              });
            }
          },
          {
            title: this.$t('labelPublic.sjh'),
            width: 80,
            key: 'mobile'
          },
          {
            title: this.$t('smsGroupRecord.colTit7'),
            width: 100,
            key: 'content',
          },
          {
            title: this.$t('smsGroupRecord.colTit1'),
            width: 80,
            render: (h, params) => {
							const index = this.list.findIndex(item => item.id === params.row.status);
							if(index >= 0) {
								return h('span', this.list[index].name);
							}
            }
          },
				],
				list: [
					{
						id: -1,
						name: this.$t('smsGroupRecord.colTit3')
					},
					{
						id: 0,
						name: this.$t('smsGroupRecord.colTit2')
					},
					{
						id: 1,
						name: this.$t('smsGroupRecord.colTit4')
					},
					{
						id: 2,
						name: this.$t('smsGroupRecord.colTit5')
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
        if(val === 'smsGroupRecord') {
          this.getList(this.pageNumber);
        }
      },
    },
    created() {
      this.getList(1)
    },
    methods: {
      getList(num) {
        let _vm = this
        _vm.$store.dispatch('setPageLoading', -1)
        _vm.$http.getPage({
          url: 'guard-webManager/smsGroup/getRecord.jhtml',
          data: {
            ID: _vm.$route.query.id,
            pageNumber: num,
            pageSize: 10,
          },
          success: function (res) {
            const _obj = res.data.content.group || {};
            const _data = res.data.content.page.content || [];
            if(_vm.langRouterKey !== 'smsGroupRecord') {
              _vm.titmes = _obj.name || '';
              _vm.data = _data;
            } else {
              _vm.requestList([_obj], ['name']).then(res => _vm.titmes = res[0].name);
              _vm.requestList(_data, ['content']).then(res => _vm.data = res);
            }
            _vm.total = res.data.content.page.total || 0
            _vm.pageNumber = res.data.content.page.pageNumber || 1
            _vm.totalPages = res.data.content.page.totalPages || 1
            _vm.failNum = res.data.content.failNum || 0
            _vm.successNum = res.data.content.successNum || 0
            _vm.waitNum = res.data.content.waitNum || 0
            _vm.$store.dispatch('setPageLoading', 1);
          },
          error: function (res) {
            console.log(res)
          }
        });
      },
      changePage(num) {
        this.getList(num)
      },
      edit(data) {
        this.$refs['formValidate'].resetFields()
        this.formValidate.ID = data.id
        this.formValidate.name = data.name
        this.formValidate.remark = data.remark
        this.modal = true
      },
      add() {
        let _vm = this
        _vm.$Modal.confirm({
          title: _vm.$t('publicSet.noticeTit'),
          content: _vm.$t('smsGroupRecord.msg4'),
          onOk: () => {
            _vm.$http.post({
              url: 'guard-webManager/smsGroup/sendMessage.jhtml',
              data: {
                ID: _vm.$route.query.id
              },
              success: function (res) {
                console.log(res)
                if (res.data.code === 0) {
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('publicSet.noticeSuccess')
                  });
                  _vm.getList(1)
                } else {
                  if(_vm.langRouterKey !== 'smsGroupRecord') {
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
        })
      },
      refresh() {
        let _vm = this
        _vm.$http.post({
          url: 'guard-webManager/smsGroup/getStatus.jhtml',
          data: {
            ID: _vm.$route.query.id
          },
          success: function (res) {
            console.log(res)
            if (res.data.code === 0) {
              _vm.$Notice.success({
								title: _vm.$t('publicSet.noticeTit'),
								desc: _vm.$t('publicSet.noticeSuccess')
							});
              _vm.getList(1)
            } else {
              if(_vm.langRouterKey !== 'smsGroupRecord') {
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
      toCusIndex(id, name) {
        let breadData = [{
            url: '/desktop',
            text: 'layoutNav.desk'
          },
          {
            url: '/customer',
            text: 'layoutNav.customerManage'
          },
          {
            url: '/customerIndex',
            text: name
          }
        ]
        sessionStorage.setItem("cusName", name)
        sessionStorage.setItem("cusId", id)
        this.$store.dispatch('setBreadData', breadData)
        this.$router.push({
          path: '/customerIndex',
          query: {
            id: id
          }
        })
      },
    }
  }

</script>
