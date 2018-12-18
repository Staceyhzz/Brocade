/** 
 * 生日提醒 
 */
<template>
  <div class="container-box" ref="containerBox">
    <div class="container-header">
      <h2>{{$t('layoutNav.birthdayRemind')}}</h2>
      <ul class="header-btn-group">
        <li class="header-item" @click="selectDate('day')">
          <Icon type="gear-b"></Icon>{{$t('birthday.btn1')}}</li>
        <li class="header-item" @click="selectDate('wek')">
          <Icon type="gear-b"></Icon>{{$t('birthday.btn2')}}</li>
        <li class="header-item" @click="selectDate('mou')">
          <Icon type="gear-b"></Icon>{{$t('birthday.btn3')}}</li>
      </ul>
    </div>
    <div class="container-body">
      <Form :label-width="90" inline @submit.native.prevent>
        <Form-item :label="$t('birthday.label')">
          <Date-picker :transfer='true' type="daterange" placement="bottom-start" style="width: 200px" format="MM-dd" :value="nowDate" @on-change="dateChange" :clearable='false' ref='time'></Date-picker>
        </Form-item>
      </Form>
      <Table stripe :columns="columns" :data="data"></Table>
      <div class="table-page">
        <div class="table-info">{{$t('publicSet.pageMsg', [pageNumber, totalPages, total])}}</div>
        <Page class="table-paginate" :total="total" @on-change='changePage' :current='pageNumber' show-elevator></Page>
      </div>
    </div>
  </div>
</template>

<script>
  import resizeCus from 'components/tableResizeCus.vue';
  import resizeTime from 'components/tableResizeTime.vue';
  export default {
    components: {
      resizeCus,
      resizeTime
    },
    data() {
      return {
        columns: [
					{
            title: this.$t('labelPublic.xh'),
            width: 60,
            render: (h, params) => {
              const _index = (this.pageNumber - 1) * 10;
              return h('span', params.index + 1 + _index);
            }
          },
          {
            title: this.$t('labelPublic.gkbh'),
            width: 60,
            key: 'id'
          },
          {
            title: this.$t('labelPublic.gkxm'),
						width: 80,
						render: (h, params) => {
              return h(resizeCus, {
                props: {
                  name: params.row.name,
									id: params.row.id,
									idKey: false
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
              const text = params.row.gender === 1 
                ? this.$t('publicSet.man') 
                : this.$t('publicSet.woman');
              return h('span', text);
            }
          },
          {
            title: this.$t('labelPublic.nl'),
						width: 60,
            render: (h, params) => {
              if (params.row.birthYear !== 0 && Number.isFinite(params.row.birthYear)) {
								const age = moment().format('YYYY') - params.row.birthYear;
                return h('span', age);
              }
            }
          },
          {
            title: this.$t('birthday.colTit1'),
						width: 60,
            key: 'birthDay'
          },
          {
            title: this.$t('birthday.colTit2'),
            width: 60,
            render: (h, params) => {
              const color = params.row.firstVisitTime
                ? '#4172F6' 
                : '#FF6F76';
              const text = params.row.firstVisitTime
                ? this.$t('birthday.colTit3') 
                : this.$t('birthday.colTit4');
              return h('span', {
                style: {
                  color: color
                }
              }, text);
            }
          },
          {
            title: this.$t('birthday.colTit5'),
            width: 60,
            render: (h, params) => {
              const color = params.row.firstDealTime
                ? '#4172F6' 
                : '#FF6F76';
              const text = params.row.firstDealTime
                ? this.$t('birthday.colTit6') 
                : this.$t('birthday.colTit7');
              return h('span', {
                style: {
                  color: color
                }
              }, text);
            }
          },
          {
            title: this.$t('birthday.colTit8'),
            width: 80,
            render: (h, params) => {
              if (params.row.firstVisitTime) {
                return h(resizeTime, {
                  props: {
                    time: params.row.firstVisitTime
                  }
                })
              }
            }
          },
          {
            title: this.$t('birthday.colTit9'),
            width: 80,
            render: (h, params) => {
              if (params.row.lastVisitTime) {
                return h(resizeTime, {
                  props: {
                    time: params.row.lastVisitTime
                  }
                })
              }
            }
          },
          {
            title: this.$t('birthday.colTit10'),
            width: 60,
            key: 'memberCategoryName'
          },
          {
            title: this.$t('labelPublic.kfry'),
            width: 60,
            key: 'exploitUserName'
          },
          {
            title: this.$t('labelPublic.zxry'),
            width: 60,
            key: 'managerUserName'
          },
          {
            title: this.$t('birthday.colTit11'),
            width: 90,
            key: 'mobile'
          }
        ],
        data: [],
				total: 0,
        totalPages: 0,
				pageNumber: 1,
        nowDate: [moment().startOf('isoWeek').format('MM-DD'), moment().format('MM-DD')],
      }
    },
    computed: {
      langRouterKey () {
        return this.$store.getters.getLandRouterKey;
      },
    },
    watch: {
      langRouterKey (val) {
        if(val === 'birthday') {
          this.getPageList();
        }
      },
    },
    mounted() {
      this.getPageList();
    },
    methods: {
      getPageList() {
        let _vm = this;
        _vm.$store.dispatch('setPageLoading', -1);
        _vm.$http.getPage({
          url: 'guard-webManager/birthday/list.jhtml',
          data: {
            pageNumber: _vm.pageNumber || 1,
            pageSize: 10,
            startTime: _vm.nowDate[0],
            endTime: _vm.nowDate[1],
          },
          success: function (res) {
						const obj = res.data.content.page || {};
            const _data = obj.content || [];
            if(_vm.langRouterKey !== 'birthday') {
              _vm.data = _data;
            } else {
              _vm.requestList(_data, ['memberCategoryName']).then(res => _vm.data = res);
            }
						_vm.total = obj.total || 0;
            _vm.pageNumber = obj.pageNumber || 1;
						_vm.totalPages = obj.totalPages || 1;
						_vm.$store.dispatch('setPageLoading', 1);
          }
        });
      },
      dateChange(date) {
				this.nowDate = date;
        this.getPageList();
      },
      changePage (num) {
				this.pageNumber = num;
        this.getPageList();
      },
      selectDate(type) {
        if (type === 'day') {
          this.nowDate = [moment().format('MM-DD'), moment().format('MM-DD')];
        } else if (type === 'wek') {
          this.nowDate = [moment().startOf('isoWeek').format('MM-DD'), moment().endOf('isoWeek').format('MM-DD')];
        } else {
          this.nowDate = [moment().startOf('month').format('MM-DD'), moment().endOf('month').format('MM-DD')];
				}
				this.$refs.time.handleClear();
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
            text: 'layoutNav.customerManage'
          },
          {
            url: '/customerIndex',
            text: name
          }
        ];
        sessionStorage.setItem("cusName", name);
        sessionStorage.setItem("cusId", id);
        this.$store.dispatch('setBreadData', breadData);
        this.$router.push('/customerIndex');
      },
    }
  }

</script>
