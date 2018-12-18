/** 
 * 活动管理 
 */

<template>
  <div class="container-box">
    <div class="container-header">
      <h2>{{$t('layoutNav.activityManage')}}</h2>
      <ul class="header-btn-group">
        <li class="header-item" @click="edit('add')">
          <Icon type="plus-round"></Icon>{{$t('publicSet.add')}}</li>
      </ul>
    </div>
    <div class="container-body">
      <Form :label-width="90" ref='formSearch' :model='formSearch'>
				<Row type="flex" justify="start">
          <Col :xs='24' :sm='12' :md="8" :lg="6">
						<Form-item :label="$t('activity.label')" prop='startTime'>
							<Date-picker :transfer='true' type="daterange" placement="bottom-start" :placeholder="$t('activity.placeholder')" style="width: 100%" @on-change='setTime' ref='clearTime'></Date-picker>
						</Form-item>
					</Col>
					<Col :xs='24' :sm='12' :md="8" :lg="6" v-if='key'>
						<Form-item :label="$t('activity.colTit1')" prop='hospitalId'>
							<Select v-model="formSearch.hospitalId" clearable>
								<Option v-for="item in hospList" :value="item.id" :key="item.id">{{ item.name }}</Option>
							</Select>
						</Form-item>
					</Col>
					<Col :xs='24' :sm='12' :md="8" :lg="6">
						<Form-item :label="$t('labelPublic.mc')" prop='name'>
							<Input :maxlength='15' v-model.trim="formSearch.name" :placeholder="$t('placeholderPublic.input')" @on-enter='getList(1, 10, formSearch)'></Input>
						</Form-item>
					</Col>
					<Col :xs='24' :sm='12' :md="8" :lg="6">
						<ul class="header-btn-group">
							<li class="header-item" @click="getList('1', '10', formSearch)">
								<Icon type="search"></Icon>{{$t('publicSet.search')}}</li>
							<li class="header-item" @click="handleReset('formSearch')">
								<Icon type="refresh"></Icon>{{$t('publicSet.reset')}}</li>
						</ul>
					</Col>
				</Row>
      </Form>
      <Table stripe :columns="col" :data="data"></Table>
      <div class="table-page">
        <div class="table-info">{{$t('publicSet.pageMsg', [pageNumber, totalPages, total])}}</div>
        <Page class="table-paginate" :total="total" @on-change='changePage' :current='pageNumber' show-elevator></Page>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        key: true,
        total: 0,
        totalPages: 1,
        pageNumber: 1,
        formSearch: {
          startTime: '',
          endTime: '',
          name: '',
          hospitalId: '',
        },
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
            title: this.$t('labelPublic.mc'),
            width: 60,
            key: 'name'
          },
          {
            title: this.$t('activity.colTit1'),
            width: 60,
            key: 'hospitalName',
          },
          {
            title: this.$t('activity.colTit2'),
            width: 80,
            render: (h, params) => {
              const _text = moment(params.row.starttime).format('YYYY-MM-DD')
              return h('span', _text)
            }
          },
          {
            title: this.$t('activity.colTit3'),
            width: 80,
            render: (h, params) => {
              if (typeof params.row.endtime == 'string') {
                const _text = moment(params.row.endtime).format('YYYY-MM-DD')
                return h('span', _text)
              }
            }
          },
          {
            title: this.$t('labelPublic.ms'),
            width: 100,
            key: 'remark',
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
                    icon: 'edit'
                  },
                  style: {
                    margin: '5px 3px 5px 0',
                    verticalAlign: 'middle'
                  },
                  on: {
                    click: () => {
                      this.edit(params.row)
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
                    margin: '5px 3px 5px 0',
                    verticalAlign: 'middle'
                  },
                  on: {
                    click: () => {
                      this.remove(params.row)
                    }
                  }
                }, this.$t('publicSet.del')),
                h('Button', {
                  props: {
                    type: 'info',
                    size: 'small',
                    icon: 'wrench'
									},
									style: {
                    margin: '5px 0px 5px 0',
                    verticalAlign: 'middle'
                  },
                  on: {
                    click: () => {
                      this.toPower(params.row)
                    }
                  }
                }, this.$t('activity.btn'))
              ])
            }
          }
        ],
        data: [],
      }
    },
    computed: {
      hospList() {
        return this.$store.getters.getSelectAllHospList
			},
			langRouterKey () {
        return this.$store.getters.getLandRouterKey;
      },
		},
    watch: {
      langRouterKey (val) {
        if(val === 'activity') {
          this.getList(this.pageNumber, '10', this.formSearch);
        }
      },
    },
    created() {
			this.key = this.getHeadquarters();
			this.formSearch.hospitalId = localStorage.getItem('hospId') * 1;
      this.getList('1', '10', this.formSearch)
    },
    mounted() {
      this.$store.dispatch('setSelectAllHospList')
    },
    methods: {
      getList(pageNumber, pageSize, form) {
        let _vm = this
        form['pageNumber'] = pageNumber
        form['pageSize'] = pageSize
        _vm.$store.dispatch('setPageLoading', -1)
        _vm.$http.getPage({
          url: 'guard-webManager/activity/page.jhtml',
          data: form,
          success: function (res) {
            const _data = res.data.content.content || [];
            if(_vm.langRouterKey !== 'activity') {
              _vm.data = _data;
            } else {
              _vm.requestList(_data, ['name', 'remark']).then(res => _vm.data = res);
            }
            _vm.total = res.data.content.total
            _vm.pageNumber = res.data.content.pageNumber
            _vm.totalPages = res.data.content.totalPages
            console.log(res)
            _vm.$store.dispatch('setPageLoading', 1);
          },
          error: function (res) {
            console.log(res);
          }
        });
      },
      setTime(date) {
        this.formSearch.startTime = date[0]
        this.formSearch.endTime = date[1]
      },
      changePage(num) {
        this.getList(num, '10', this.formSearch)
      },
      handleReset(name) {
        this.$refs[name].resetFields()
        this.$refs['clearTime'].handleClear()
        this.getList('1', '10', this.formSearch)
      },
      remove(data) {
        let _vm = this
        _vm.$Modal.confirm({
          title: _vm.$t('publicSet.noticeTit'),
          content: `<p>${_vm.$t('activity.msg1')}</p>
          <p>${_vm.$t('activity.msg2')}</p>
          <p>${_vm.$t('labelPublic.mc')}：${data.name}</p>`,
          onOk: () => {
            _vm.$http.post({
              url: 'guard-webManager/activity/del.jhtml',
              data: {
                id: data.id
              },
              success: function (res) {
                if (res.data.code === 0) {
                  _vm.getList('1', '10', _vm.formSearch)
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('publicSet.noticeSuccess')
                  });
                } else {
                  if(_vm.langRouterKey !== 'activity') {
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
                console.log(res);
              }
            });
          },
          onCancel: () => {

          }
        });
      },
      edit(data) {
        let breadText = ''
        let id = ''
        let type = ''
        if (typeof data === 'object') {
          breadText = 'activity.tit2'
          id = data.id
          type = '1'
        } else {
          breadText = 'activity.tit1'
          id = data
          type = '2'
        }
        const breadData = [{
            url: '/desktop',
            text: 'layoutNav.desk'
          },
          {
            url: '/activity',
            text: 'layoutNav.activityManage'
          },
          {
            url: '/activityEdit',
            text: breadText
          }
        ];
        this.$store.dispatch('setBreadData', breadData);
        this.$router.push({
          path: '/activityEdit',
          query: {
            id: id,
            type: type
          }
        })
      },
      toPower(data) {
        const breadData = [{
            url: '/desktop',
            text: 'layoutNav.desk'
          },
          {
            url: '/activity',
            text: 'layoutNav.activityManage'
          },
          {
            url: '/activityRecord',
            text: data.name
          }
        ];
        this.$store.dispatch('setBreadData', breadData);
        this.$router.push({
          path: '/activityRecord',
          query: {
            id: data.id
          }
        })
      }
    }
  }

</script>
