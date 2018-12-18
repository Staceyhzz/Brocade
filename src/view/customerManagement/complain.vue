/** 
 * 投诉记录 
 */
<template>
  <div class="container-box" ref="containerBox">
    <div class="container-header">
      <h2>{{$t('layoutNav.complainManage')}}</h2>
    </div>
    <div class="container-body">
      <Form :label-width="90" :model="formSearch" ref='formSearch'>
				<Row type="flex" justify="start">
          <Col :xs='24' :sm='12' :md="8" :lg="6">
						<Form-item :label="$t('complain.label1')">
							<Date-picker :transfer='true' type="daterange" placement="bottom-start" style="width: 100%" format="yyyy-MM-dd" :clearable='false' @on-change="dateChange" :value="nowDate"></Date-picker>
						</Form-item>
					</Col>
					<Col :xs='24' :sm='12' :md="8" :lg="6">
						<Form-item :label="$t('labelPublic.lx')" prop='categoryId'>
							<Select v-model="formSearch.categoryId" clearable>
								<Option v-for="item in typeList" :value="item.id" :key="item.id">{{ item.name }}</Option>
							</Select>
						</Form-item>
					</Col>
					<Col :xs='24' :sm='12' :md="8" :lg="6">
						<Form-item :label="$t('labelPublic.gkbh')" prop='customerId'>
							<Input type="text" :placeholder="$t('placeholderPublic.input')" :maxlength='15' v-model.trim="formSearch.customerId" @on-enter="getList(1, formSearch)"></Input>
						</Form-item>
					</Col>
					<Col :xs='24' :sm='12' :md="8" :lg="6">
						<Form-item :label="$t('labelPublic.zt')" prop='status'>
							<Select v-model="formSearch.status" clearable>
								<Option v-for="item in statusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
							</Select>
						</Form-item>
					</Col>
					<Col :xs='24' :sm='12' :md="8" :lg="6">
						<ul class="header-btn-group">
              <li class="header-item" @click="getList(1, formSearch)"><Icon type="search"></Icon>{{$t('publicSet.search')}}</li>
              <li class="header-item" @click="handleReset('formSearch')"><Icon type="refresh"></Icon>{{$t('publicSet.reset')}}</li>
            </ul>
					</Col>
				</Row>
      </Form>
      <Table stripe :columns="columns" :data="data"></Table>
      <div class="table-page">
        <div class="table-info">{{$t('publicSet.pageMsg', [pageNumber, totalPages, total])}}</div>
        <Page class="table-paginate" :total="total" @on-change='changePage' :current='pageNumber' show-elevator></Page>
      </div>
    </div>
    <Modal :title="$t('complain.tit')" v-model="modal" :closable="false" @on-ok="ok" :loading="loading" class-name="vertical-center-modal">
      <Form ref="formValidate" :model="formValidate" :rules="ruleForm" :label-width="100" label-position="right">
        <Form-item :label="$t('labelPublic.gkxm')">
          <span>{{formValidate.customerName}} ({{formValidate.customerid}})</span>
        </Form-item>
        <Form-item :label="$t('complain.colTit5')">
          <span>{{formValidate.createtime}}</span>
        </Form-item>
        <Form-item :label="$t('complain.label4')">
          <span>{{formValidate.hospitalName}}</span>
        </Form-item>
        <Form-item :label="$t('complain.colTit6')">
          <span>{{formValidate.createUserName}}</span>
        </Form-item>
        <Form-item :label="$t('labelPublic.lx')">
          <span>{{formValidate.categoryName}}</span>
        </Form-item>
        <Form-item :label="$t('complain.colTit2')">
          <span>{{formValidate.targetUserName}}</span>
        </Form-item>
        <Form-item :label="$t('complain.colTit4')">
          <span>{{formValidate.content}}</span>
        </Form-item>
        <Form-item :label="$t('complain.colTit9')" prop="solution" required>
          <Input v-model.trim="formValidate.solution" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('placeholderPublic.input')"></Input>
        </Form-item>
        <Form-item :label="$t('complain.colTit10')" prop="feedback">
          <Input v-model.trim="formValidate.feedback" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('placeholderPublic.input')"></Input>
        </Form-item>
      </Form>
    </Modal>
  </div>
</template>

<script>
  import resizeCus from 'components/tableResizeCus.vue';
  import resizeTime from 'components/tableResizeTime.vue';
  import resizeRemark from 'components/tableResizeRemark.vue';
  export default {
    components: {
      resizeRemark,
      resizeTime,
      resizeCus
    },
    data() {
      const validateText = (rule, value, callback) => {
        if (value === '' || !value) {
          callback(new Error(this.$t('complain.valid')));
        } else {
          callback();
        }
      };
      return {
				total: 0,
        totalPages: 0,
				pageNumber: 1,
				
				formSearch: {
					pageSize: 10,
					startTime: moment().startOf('isoWeek').format('YYYY-MM-DD'),
					endTime: moment().format('YYYY-MM-DD'),
					categoryId: '',
					customerId: '',
					status: ''
				},

				nowDate: [moment().startOf('isoWeek').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')],
				statusList: [
					{
            value: 1,
            label: this.$t('complain.label2')
          },
          {
            value: 2,
            label: this.$t('complain.label3')
          }
				],
				typeList: [],

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
            title: this.$t('labelPublic.gkxm'),
						width: 100,
            render: (h, params) => {
              return h(resizeCus, {
                props: {
                  name: params.row.customerName,
                  id: params.row.customerid,
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
            title: this.$t('complain.colTit1'),
            width: 60,
            key: 'categoryName'
          },
          {
            title: this.$t('complain.colTit2'),
            width: 60,
            key: 'targetUserName'
          },
          {
            title: this.$t('complain.colTit3'),
            width: 60,
            key: 'chargeName'
          },
          {
            title: this.$t('complain.colTit4'),
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
            title: this.$t('complain.colTit5'),
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
            title: this.$t('complain.colTit6'),
            width: 60,
            key: 'createUserName'
          },
          {
            title: this.$t('labelPublic.zt'),
            width: 60,
            render: (h, params) => {
              const color = params.row.status === 1 
                ? '#4172F6' 
                : '#FF6F76';
              const text = params.row.status === 1 
                ? this.$t('complain.label2') 
                : this.$t('complain.label3');
              return h('span', {
                style: {
                  color: color
                }
              }, text);
            }
          },
          {
            title: this.$t('complain.colTit7'),
            width: 60,
            key: 'finishUserName'
          },
          {
            title: this.$t('complain.colTit8'),
            width: 80,
            render: (h, params) => {
              if (params.row.finishtime) {
                return h(resizeTime, {
                  props: {
                    time: params.row.finishtime
                  }
                })
              }
            }
          },
          {
            title: this.$t('complain.colTit9'),
            width: 100,
            render: (h, params) => {
							if(params.row.solutionLang) {
								return h(resizeRemark, {
									props: {
										remark: params.row.solutionLang
									}
								})
							}
						}
          },
          {
            title: this.$t('complain.colTit10'),
            width: 100,
            render: (h, params) => {
							if(params.row.feedbackLang) {
								return h(resizeRemark, {
									props: {
										remark: params.row.feedbackLang
									}
								})
							}
						}
          },
          {
            title: this.$t('publicSet.tableAction'),
            key: 'action',
            width: 80,
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small',
                    icon: 'edit'
                  },
                  on: {
                    click: () => {
                      this.edit(params.row)
                    }
                  }
                }, this.$t('publicSet.tableAction'))
              ])
            }
          }
        ],
				data: [],

        modal: false,
        loading: true,
				formValidate: {},
        ruleForm: {
          solution: [{
            validator: validateText,
            trigger: 'blur'
          }],
        }
      }
    },
    computed: {
      langRouterKey () {
        return this.$store.getters.getLandRouterKey;
      },
    },
    watch: {
      langRouterKey (val) {
        if(val === 'complain') {
          this.getList(this.pageNumber, this.formSearch);
        }
      },
    },
    mounted() {
      this.getList(1, this.formSearch);
      this.getAllComplainCategoryInfo();
    },
    methods: {
      getList(pageNumber, form) {
        let _vm = this;
        _vm.$store.dispatch('setPageLoading', -1);
        form.pageNumber = pageNumber;
        _vm.$http.getPage({
          url: 'guard-webManager/complain/page.jhtml',
          data: form,
          success: function (res) {
            const obj = res.data.content || {};
            const _data = obj.content.map(item => {
              item.solutionLang = item.solution || '';
              item.feedbackLang = item.feedback || '';
              return item;
            }) || [];
            if(_vm.langRouterKey !== 'complain') {
              _vm.data = _data;
            } else {
              _vm.requestList(_data, ['categoryName', 'chargeName', 'solutionLang', 'content', 'feedbackLang']).then(res => _vm.data = res);
            }
            _vm.total = obj.total || 0;
            _vm.pageNumber = obj.pageNumber || 1;
            _vm.totalPages = obj.totalPages || 1;
						_vm.$store.dispatch('setPageLoading', 1);
          }
        });
      },
      getAllComplainCategoryInfo() {
        let _vm = this;
        _vm.$http.get({
          url: 'guard-webManager/select/allComplainCategoryInfo.jhtml',
          success: function (data) {
						if(res.data.code === 0) {
							_vm.typeList = res.data.content || [];
						}
          }
        });
      },
      dateChange(date) {
				this.formSearch.startTime = date[0];
				this.formSearch.endTime = date[1];
			},
			//重置
      handleReset (name) {
				this.$refs[name].resetFields();
				this.formSearch.startTime = moment().startOf('isoWeek').format('YYYY-MM-DD');
				this.formSearch.endTime = moment().format('YYYY-MM-DD');
				this.nowDate = [moment().startOf('isoWeek').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')];
        this.getList(1, this.formSearch);
      },
      //分页
      changePage (num) {
        this.getList(num, this.formSearch);
      },
      edit(data) {
        this.$refs.formValidate.resetFields();
        this.formValidate = Object.assign({}, data);
        this.modal = true;
      },
      ok() {
        let _vm = this;
        _vm.$refs['formValidate'].validate((valid) => {
          if (valid) {
            _vm.$http.post({
              url: 'guard-webManager/complain/update.jhtml',
              data: _vm.formValidate,
              success: function (res) {
                if (res.data.code === 0) {
                  _vm.getList(_vm.pageNumber, _vm.formSearch);
                  _vm.modal = false;
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('publicSet.noticeSuccess')
                  });
                } else {
                  if(_vm.langRouterKey !== 'complain') {
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
          } else {
            _vm.loading = false;
            _vm.$nextTick(() => {
              _vm.loading = true;
            })
          }
        })
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
        sessionStorage.setItem("cusName", name);
        sessionStorage.setItem("cusId", id);
        this.$store.dispatch('setBreadData', breadData);
        this.$router.push('/customerIndex');
      },
    }
  }

</script>
