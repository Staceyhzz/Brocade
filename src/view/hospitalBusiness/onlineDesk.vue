/** 
 * 网电工作台 
 */
<template>
  <div class="container-box">
    <div class="container-header">
      <h2>{{$t('layoutNav.onlineDesk')}}</h2>
    </div>
    <div class="container-body">
      <Tabs :animated='false'>
        <Tab-pane :label="$t('onlineDesk.menu1')">
          <Form inline ref='formSearch' :model='formSearch' @submit.native.prevent>
            <Form-item prop='query'>
              <Input v-model.trim="formSearch.query" :placeholder="$t('onlineDesk.placeholder')" style="width: 350px" @on-enter="getSearch(formSearch)"></Input>
            </Form-item>
            <ul class="header-btn-group not-float">
              <li class="header-item" @click="getSearch(formSearch)">
                <Icon type="search"></Icon>{{$t('publicSet.search')}}</li>
              <li class="header-item" @click="handleReset('formSearch')">
                <Icon type="refresh"></Icon>{{$t('publicSet.reset')}}</li>
            </ul>
          </Form>
          <Alert v-if='key'>
            {{$t('onlineDesk.searchTit')}}
            <div slot="desc" v-if='data.length === 0'>
              <p>{{$t('onlineDesk.searchMsgNo')}}</p>
              <Button type="primary" @click='toNew'>{{$t('onlineDesk.searchBtn')}}</Button>
            </div>
            <div slot="desc" v-else>
              <p>{{$t('onlineDesk.searchMsg',[data.length])}}</p>
            </div>
          </Alert>
          <Table stripe :columns="col" :data="data"></Table>
        </Tab-pane>
        <Tab-pane :label="$t('onlineDesk.menu2')">
          <Table stripe :columns="col1" :data="data1"></Table>
        </Tab-pane>
        <Tab-pane :label="$t('onlineDesk.menu3')">
          <Table stripe :columns="col2" :data="data2"></Table>
        </Tab-pane>
      </Tabs>
    </div>
  </div>
</template>

<script>
	import resizeTime from 'components/tableResizeTime.vue';
  import resizeCus from 'components/tableResizeCus.vue';
  export default {
		components: {resizeTime, resizeCus},
    data() {
      return {
        key: false,
        formSearch: {
          query: ''
        },
        col: [
					{
            title: this.$t('labelPublic.xh'),
            type: 'index',
            width: 60
          },
          {
            title: this.$t('onlineDesk.colTit1'),
            width: 100,
						render: (h, params) => {
              return h(resizeCus, {
                props: {
                  name: params.row.name,
                  id: params.row.id
                },
                on: {
                  'click': () => {
                    this.toCusIndex(params.row.id, params.row.name);
                  }
                }
              });
            }
          },
          {
						title: this.$t('labelPublic.sjh'),
						width: 100,
            key: 'mobile'
          },
          {
						title: this.$t('labelPublic.xb'),
						width: 60,
            key: 'gender'
          },
          {
						title: this.$t('labelPublic.yh'),
						width: 80,
            key: 'memberCategoryName'
          },
          {
						title: this.$t('labelPublic.jtly'),
						width: 80,
            key: 'channelName'
          },
          {
						title: this.$t('labelPublic.nl'),
						width: 60,
            key: 'age'
          }
        ],
        col1: [
					{
            title: this.$t('labelPublic.xh'),
            type: 'index',
            width: 60
          },
          {
            title: this.$t('onlineDesk.colTit1'),
            width: 100,
						render: (h, params) => {
              return h(resizeCus, {
                props: {
                  name: params.row.name,
                  id: params.row.id
                },
                on: {
                  'click': () => {
                    this.toCusIndex(params.row.id, params.row.name);
                  }
                }
              });
            }
          },
          {
            title: this.$t('labelPublic.xb'),
						width: 60,
            render: (h, params) => {
							const _text = params.row.gender === 1 
								? this.$t('publicSet.man') 
								: this.$t('publicSet.woman');
              return h('span', _text)
            }
          },
          {
            title: this.$t('onlineDesk.colTit2'),
						width: 80,
						render: (h, params) => {
              if(params.row.createTime) {
                return h(resizeTime, {
                  props: {
                    time: params.row.createTime
                  }
                })
              }
            }
          },
          {
						title: this.$t('labelPublic.jtly'),
						width: 80,
            key: 'channelName'
          },
          {
						title: this.$t('onlineDesk.colTit3'),
						width: 80,
            key: 'symptomName'
          },
          {
						title: this.$t('onlineDesk.colTit4'),
						width: 100,
            key: 'consultContent',
          },
        ],
        col2: [
					{
            title: this.$t('labelPublic.xh'),
            type: 'index',
            width: 60
          },
          {
            title: this.$t('onlineDesk.colTit1'),
						width: 100,
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
            title: this.$t('onlineDesk.colTit2'),
						width: 80,
						render: (h, params) => {
              if(params.row.createTime) {
                return h(resizeTime, {
                  props: {
                    time: params.row.createTime
                  }
                })
              }
            }
          },
          {
						title: this.$t('onlineDesk.colTit5'),
						width: 80,
            key: 'hospitalName'
          },
          {
						title: this.$t('onlineDesk.colTit6'),
						width: 80,
            key: 'date'
          },
          {
						title: this.$t('onlineDesk.colTit7'),
						width: 130,
            key: 'time'
          },
          {
						title: this.$t('onlineDesk.colTit8'),
						width: 60,
            key: 'type'
          },
          {
						title: this.$t('onlineDesk.colTit9'),
						width: 100,
            render: (h, params) => {
              return h('div', {
                domProps: {
                  innerHTML: params.row.content
                }
              })
            }
          },
        ],
        data: [],
        data1: [],
        data2: [],
      }
		},
		computed: {
      langRouterKey () {
        return this.$store.getters.getLandRouterKey;
      },
    },
    watch: {
      langRouterKey (val) {
        if(val === 'onlineDesk') {
					this.getSearch(this.formSearch);
					this.getList();
        }
      },
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        let _vm = this
        _vm.$store.dispatch('setPageLoading', -1)
        _vm.$http.getPage({
          url: 'guard-webManager/onlineDesk/OnlineDeskList.jhtml',
          success: function (res) {
            const _data1 = res.data.content.CustomerList || [];
            const _data2 = res.data.content.AppointmentList || [];
            if(_vm.langRouterKey !== 'onlineDesk') {
              _vm.data1 = _data1;
              _vm.data2 = _data2;
            } else {
              const props1 = ['consultContent', 'symptomName', 'channelName'];
              const props2 = ['type', 'content'];
              _vm.requestList(_data1, props1).then(res => _vm.data1 = res);
              _vm.requestList(_data2, props2).then(res => _vm.data2 = res);
            }
            _vm.$store.dispatch('setPageLoading', 1);
          },
          error: function (res) {
            console.log(res);
          }
        });
      },
      //查询客户
      getSearch(form) {
        let _vm = this
        if (form.query.length == 0) {
          _vm.key = false
          _vm.data = []
        } else {
          _vm.$http.get({
            url: 'guard-webManager/frontDesk/query.jhtml',
            data: form,
            success: function (res) {
              if (res.data.code === 0) {
                _vm.key = true;
								const _data = res.data.content || [];
								if(_vm.langRouterKey !== 'onlineDesk') {
									console.log(_data)
									_vm.data = _data;
								} else {
									const props = ['gender', 'memberCategoryName', 'channelName'];
									_vm.requestList(_data, props).then(res => _vm.data = res);
								}
              } else {
                console.log(res.data.desc)
              }
            },
            error: function (res) {
              console.log(res);
            }
          });
        }
      },
      handleReset(name) {
        this.key = false
        this.$refs[name].resetFields()
        this.data = []
      },
      //跳转客户详情
      toCusIndex(id, name) {
        const breadData = [
					{
            url: '/desktop',
            text: 'layoutNav.desk'
          },
          {
            url: '/customer',
            text: 'layoutNav.onlineDesk'
          },
          {
            url: '/customerIndex',
            text: name
          }
        ]
        sessionStorage.setItem("cusName", name)
        sessionStorage.setItem("cusId", id)

        this.$store.dispatch('setBreadData', breadData);
        this.$router.push({
          path: '/customerIndex',
          query: {
            id: id
          }
        })
      },
      //添加客户
      toNew() {
        const breadData = [
					{
            url: '/desktop',
            text: 'layoutNav.desk'
          },
          {
            url: '/customer',
            text: 'layoutNav.onlineDesk'
          },
          {
            url: '/onlineAddNew',
            text: 'onlineDesk.tit'
          }
        ];
        this.$store.dispatch('setBreadData', breadData);
        this.$router.push({
          path: '/onlineAddNew',
          query: {
            type: 'online',
            mobile: this.formSearch.query
          }
        })
      },
    }
  }

</script>
