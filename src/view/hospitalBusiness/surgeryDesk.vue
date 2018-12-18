/** 
 * 手术工作台 
 */
<template>
  <div class="container-box">
    <div class="container-header">
      <h2>{{$t('layoutNav.surgeryDeskManage')}}</h2>
    </div>
    <div class="container-body">
      <Table stripe :columns="col" :data="data"></Table>
      <Modal :title="modalTit" v-model="modal" :closable="false" @on-ok="ok" :loading="loading" class-name="vertical-center-modal">
        <Form ref="formValidate" :model="formValidate" :label-width="100" label-position="right">
          <Form-item :label="$t('surgeryDesk.colTit1')">
            <span>{{formValidate.name}}</span>
          </Form-item>
          <Form-item :label="$t('surgeryDesk.colTit6')">
            <ul>
              <li v-for='item in formValidate.obj' :key='item'>{{item}}</li>
            </ul>
          </Form-item>
          <Form-item :label="this.labelValue">
            <Time-picker format="HH:mm" @on-change='setTime' :clearable='false' v-model="nowDate"></Time-picker>
          </Form-item>
        </Form>
      </Modal>
    </div>
  </div>
</template>

<script>
	import resizeTime from 'components/tableResizeTime.vue';
	import resizeCus from 'components/tableResizeCus.vue';
  export default {
		components: {
			resizeTime,
			resizeCus
    },
    data() {
      return {
        modal: false,
        loading: true,
        key: true,
				modalTit: '',
				labelValue: '',
        formValidate: {
          id: '',
          name: '',
          obj: [],
          startTime: '',
          endTime: '',
        },
        col: [
					{
            title: this.$t('labelPublic.xh'),
            type: 'index',
            width: 60
          },
          {
						title: this.$t('surgeryDesk.colTit1'),
						width: 60,
            render: (h, params) => {
              return h(resizeCus, {
                props: {
                  name: params.row.customerName,
                  id: params.row.customerid
                },
                on: {
                  'click': () => {
                    this.toCusIndex(params.row.customerid, params.row.customerName);
                  }
                }
              });
            }
          },
          {
            title: this.$t('surgeryDesk.colTit2'),
						width: 60,
            key: 'createUserName'
          },
          {
            title: this.$t('surgeryDesk.colTit3'),
						width: 120,
            render: (h, params) => {
              const _text = params.row.appointmenttimestart.split(' ')[1] + '—' + params.row.appointmenttimeend.split(
                ' ')[1]
              return h('span', _text)
            }
          },
          {
            title: this.$t('surgeryDesk.colTit4'),
						width: 60,
            key: 'userName'
          },
          {
            title: this.$t('surgeryDesk.colTit5'),
						width: 60,
            render: (h, params) => {
              const color = params.row.anesthesiatype === 1 
                ? '#4172F6' 
                : '#FF6F76';
              const text = params.row.anesthesiatype === 1 
                ? this.$t('surgeryDesk.status4') 
                : this.$t('surgeryDesk.status5');
              return h('span', {
                style: {
                  color: color
                }
              }, text);
            }
          },
          {
            title: this.$t('surgeryDesk.colTit6'),
						width: 60,
            render: (h, params) => {
							console.log(params.row.chargeName)
							const list = params.row.chargeName.split(',') || [];
              return h('ul', list.map(item => {
                return h('li', {
                  style: {
                    padding: '5px 2px'
                  }
                }, item)
              }))
            }
          },
          {
            title: this.$t('labelPublic.zt'),
						width: 60,
            render: (h, params) => {
              const _color = params.row.status === 0 ? 'blue' : params.row.status === 1 ? 'red' : 'orange'
              const _text = params.row.status === 0 ? this.$t('surgeryDesk.status1')  : params.row.status === 1 ? this.$t('surgeryDesk.status2')  : this.$t('surgeryDesk.status3') 
              return h('span', {
                style: {
                  color: _color
                }
              }, _text)
            }
          },
          {
            title: this.$t('surgeryDesk.colTit7'),
						width: 80,
						render: (h, params) => {
              if (params.row.starttime) {
                return h(resizeTime, {
                  props: {
                    time: params.row.starttime
                  }
                })
              }
            }
          },
          {
            title: this.$t('surgeryDesk.colTit8'),
						width: 80,
						render: (h, params) => {
              if (params.row.endtime) {
                return h(resizeTime, {
                  props: {
                    time: params.row.endtime
                  }
                })
              }
            }
          },
          {
            title: this.$t('publicSet.tableAction'),
            key: 'action',
            width: 100,
            render: (h, params) => {
              const _icon = params.row.status === 0 ? 'arrow-right-a' : params.row.status === 1 ? 'close-circled' :
                ''
              const _type = params.row.status === 0 ? 'primary' : params.row.status === 1 ? 'error' : ''
              const _text = params.row.status === 0 ? this.$t('surgeryDesk.btn1') : params.row.status === 1 ? this.$t('surgeryDesk.btn2') : ''
              if (params.row.status !== 2) {
                return h('div', [
                  h('Button', {
                    props: {
                      type: _type,
                      size: 'small',
                      icon: _icon
                    },
                    on: {
                      click: () => {
                        this.edit(params.row)
                      }
                    }
                  }, _text),
                ])
              }
            }
          }
        ],
        data: [],
        nowDate: '',
      }
		},
		computed: {
      langRouterKey () {
        return this.$store.getters.getLandRouterKey;
      },
    },
    watch: {
      langRouterKey (val) {
        if(val === 'surgeryDesk') {
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
          url: 'guard-webManager/surgeryDesk/list.jhtml',
          success: function (res) {
            const _data = res.data.content.map(item => {
              return {
                ...item,
                chargeName: item.detailList.map(c => c.chargeName).join(',') || ''
              }
            }) || [];
            if(_vm.langRouterKey !== 'surgeryDesk') {
              _vm.data = _data;
            } else {
              _vm.requestList(_data, ['chargeName']).then(res => _vm.data = res);
            }
            _vm.$store.dispatch('setPageLoading', 1);
          },
          error: function (res) {
            console.log(res);
          }
        });
      },
      edit(data) {
				if(data.status === 0) {
					this.key = true;
					this.modalTit = this.$t('surgeryDesk.modalTit1');
					this.labelValue = this.$t('surgeryDesk.colTit7');
				} else {
					this.key = false;
					this.modalTit = this.$t('surgeryDesk.modalTit2');
					this.labelValue = this.$t('surgeryDesk.colTit8');
				}
				this.nowDate = moment().format('HH:mm');
				this.formValidate = {
					id: data.id,
					name: data.customerName,
					obj: data.chargeName.split(',') || [],
					startTime: this.nowDate + ':00',
					endTime: this.nowDate + ':00'
				};
				this.modal = true;
      },
      setTime(date) {
				if(this.key) {
					this.formValidate.startTime = date + ':00';
				} else {
					this.formValidate.endTime = date + ':00';
				}
      },
      ok() {
        let _vm = this;
				let url = _vm.key 
					? 'guard-webManager/surgeryDesk/startSurgery.jhtml'
					: 'guard-webManager/surgeryDesk/editSurgery.jhtml';
				_vm.$http.post({
					url: url,
					data: _vm.formValidate,
					success: function (res) {
						if (res.data.code === 0) {
							_vm.getList()
							_vm.modal = false;
							_vm.$Notice.success({
								title: _vm.$t('publicSet.noticeTit'),
								desc: _vm.$t('publicSet.noticeSuccess')
							});
						} else {
							if(_vm.langRouterKey !== 'surgeryDesk') {
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
							_vm.loading = false;
							_vm.$nextTick(() => {
								_vm.loading = true;
							});
						}
					},
					error: function (res) {
						console.log(res);
					}
				});
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
    }
  }

</script>
