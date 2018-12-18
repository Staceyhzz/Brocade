/** 
 * 病例管理页面 
 */

<template>
  <div class="customer-box index-order-detail">
    <Form :label-width="90" :model="formSearch" ref='formSearch'>
      <Row type="flex" justify="start">
        <Col :xs='24' :sm='12' :md="8" :lg="6">
          <Form-item label="病历号" prop='caseNumber'>
            <Input :maxlength='20' v-model.trim="formSearch.caseNumber" :placeholder="$t('placeholderPublic.input')" @on-enter="getId(1, formSearch)"></Input>
          </Form-item>
        </Col>
        <Col :xs='24' :sm='12' :md="8" :lg="6">
          <Form-item label="创建人" prop='createUserId'>
            <input-remote
              :list='userList' 
              :asyncKey='userAsyncKey' 
              @on-change-word='changeWordUser' 
              @on-clean='cleanUser'
              idProp='id' 
              nameProp='name' 
              :clearable='true'
              v-model="formSearch.createUserId"
              ref='createUser'
              :placeholder="$t('placeholderPublic.filter')">
              <template slot="title">
                <p style="width: 100%">{{$t('labelPublic.mc')}}</p>
              </template>
              <template scope="label">
                <p style="width: 100%">{{label.data.name}}</p>
              </template>
            </input-remote>
          </Form-item>
        </Col>
        <Col :xs='24' :sm='12' :md="8" :lg="6">
          <Form-item label="归档状态" prop='status'>
            <Select v-model="formSearch.status" clearable>
              <Option :value="1">已归档</Option>
              <Option :value="0">未归档</Option>
            </Select>
          </Form-item>
        </Col>
        <Col :xs='24' :sm='12' :md="8" :lg="6">
          <ul class="header-btn-group">
            <li class="header-item" @click="getId(1, formSearch)"><Icon type="search"></Icon>{{$t('publicSet.search')}}</li>
            <li class="header-item" @click="handleReset('formSearch')"><Icon type="refresh"></Icon>{{$t('publicSet.reset')}}</li>
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
</template>

<script>
  import inputRemote from 'components/InputRemote';
  import resizeRemark from 'components/tableResizeRemark';
  import resizeTime from 'components/tableResizeTime';
  export default {
    components: {inputRemote, resizeRemark, resizeTime},
    data() {
      return {
        pageNumber: 1,
        totalPages: 1,
        total: 0,
        cusName: '',
        formSearch: {
          pageSize: 10,
          hospitalId: '',
          caseNumber: '',
          createUserId: '',
          customerId: '',
          status: '',
        },

        //创建人快捷搜索
        userList: [],
        userAsyncKey: true,
        userIndex: 0,

        data: [],
        col: [
          {
            title: this.$t('labelPublic.xh'),
            type: 'index',
            width: 60,
            render: (h, params) => {
              const _index = (this.pageNumber - 1) * 10;
              return h('span', params.index + 1 + _index);
            }
          },
          {
            title: '病历号',
            width: 80,
            key: 'caseNumber'
          },
          {
            title: '备注',
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
            title: '创建时间',
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
            title: '创建人',
            width: 60,
            key: 'createUserName'
          },
          {
            title: '归档状态',
            width: 70,
            render: (h, params) => {
              const color = params.row.status === '1' ? '#4172F6' : '#FF6F76';
              const text = params.row.status === '1' ? '已归档' : '未归档';
              return h('span', {
                style: {
                  color: color
                }
              }, text);
            }
          },
          {
            title: '归档人',
            width: 60,
            key: 'filingPersonName'
          },
          {
            title: '归档时间',
            width: 80,
            render: (h, params) => {
              if (params.row.filingPersonTime) {
                return h(resizeTime, {
                  props: {
                    time: params.row.filingPersonTime
                  }
                })
              }
            }
          },
          {
            title: '归档医院',
            width: 70,
            key: 'filingHospitalName'
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
                    display: params.row.status === '1' ? 'none' : 'inlineBlock',
                    margin: '5px 3px 5px 0',
                    verticalAlign: 'middle'
                  },
                  on: {
                    click: () => {
                      this.toEdit(params.row)
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
                    display: params.row.status === '1' ? 'none' : 'inlineBlock',
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
                    type: 'warning',
                    size: 'small',
                    icon: 'document-text'
                  },
                  style: {
                    margin: '5px 3px 5px 0',
                    verticalAlign: 'middle'
                  },
                  on: {
                    click: () => {
                      this.toView(params.row)
                    }
                  }
                }, '查看'),
                h('Button', {
                  props: {
                    type: 'info',
                    size: 'small',
                    icon: 'wrench'
                  },
                  style: {
                    display: params.row.status === '1' ? 'none' : 'inlineBlock',
                    margin: '5px 3px 5px 0',
                    verticalAlign: 'middle'
                  },
                  on: {
                    click: () => {
                      this.toDisable(params.row, true);
                    }
                  }
                }, '归档'),
                h('Button', {
                  props: {
                    type: 'info',
                    size: 'small',
                    icon: 'wrench'
                  },
                  style: {
                    display: params.row.status === '0' ? 'none' : 'inlineBlock',
                    margin: '5px 3px 5px 0',
                    verticalAlign: 'middle'
                  },
                  on: {
                    click: () => {
                      this.toDisable(params.row, false);
                    }
                  }
                }, '取消归档'),
              ])
            }
          }
        ]
      }
    },
    created() {
      this.formSearch.customerId = sessionStorage.getItem('cusId');
      this.formSearch.hospitalId = localStorage.getItem('hospId');
      this.cusName = sessionStorage.getItem('cusName');
      this.getId(1, this.formSearch);
    },
    methods: {
      // 获取资料
      getId(pageNumber, form) {
        let _vm = this;
        form.pageNumber = pageNumber;
        _vm.$store.dispatch('setPageLoading', -1)
        _vm.$http.getPage({
          url: 'guard-webManager/case/findByCustomerIdSmartCaseTemplateResultPage.jhtml',
          data: form,
          success: function (res) {
            _vm.data = res.data.content.list || [];
            _vm.total = res.data.content.total || 0;
            _vm.pageNumber = res.data.content.pageNum || 1;
            _vm.totalPages = res.data.content.pages || 1;
						_vm.$store.dispatch('setPageLoading', 1);
          },
          error: function (res) {
            console.log(res)
          }
        });
      },
      changeWordUser(val) {
        let _vm = this;
        _vm.userAsyncKey = true;
        _vm.userIndex++;
        const _index = _vm.userIndex;
        _vm.$http.get({
          url: 'guard-webManager/todayCustomer/findByHospitalUserList.jhtml',
          data: {
            hospitalId: _vm.formSearch.hospitalId,
            value: val,
            type: '0'
          },
          success: function (res) {
						if(res.data.code === 0) {
              if(_index === _vm.userIndex) {
                _vm.userList = res.data.content.map(item => {
                  return {
                    id: item.Id,
                    name: item.name
                  };
                }) || [];
                _vm.userAsyncKey = false;
              }
            }
          },
          error: function (res) {
            console.log(res)
          }
        });
      },
      cleanUser() {
        this.formSearch.createUserId = '';
      },
      handleReset(name) {
        this.$refs[name].resetFields();
        this.$refs.createUser.clearQuery();
        this.getId(1, this.formSearch);
      },
      changePage(num) {
        this.getId(num, this.formSearch);
      },
      toDisable(data, type) {
        let _vm = this;
        const msg1 = type ? '确定归档' : '确定取消归档？';
        const msg2 = type ? '归档后此病历不能再次编辑修改' : '取消后此病历将可编辑修改，请慎重！';
        const status = type ? 1 : 0;
        _vm.$Modal.confirm({
          title: _vm.$t('publicSet.noticeTit'),
          content: `<p>${msg1}</p>
          <p>${msg2}</p>`,
          onOk: () => {
            _vm.$http.post({
              url: 'guard-webManager/case/updateByResultIdSmartCaseTemplateResultStatus.jhtml',
              data: {
                resultId: data.Id,
                filingHospitalId: _vm.formSearch.hospitalId,
                filingUserId: localStorage.getItem('userId'),
                customerId: _vm.formSearch.customerId,
                status: status
              },
              success: function(res){
                if(res.data.code === 0 ){
                  _vm.getId(1, _vm.formSearch);
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('publicSet.noticeSuccess')
                  });
                } else {
                  _vm.$Notice.error({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: res.data.desc
                  });
                }
              },
              error: function(res){
                console.log(res);
              }
            });
          },
        });
      },
      remove(data) {
        let _vm = this;
        _vm.$Modal.confirm({
          title: _vm.$t('publicSet.noticeTit'),
          content: `<p>确定删除此病例</p>
          <p>病例信息：</p>
          <p>病历号：${data.caseNumber}</p>`,
          onOk: () => {
            _vm.$http.post({
              url: 'guard-webManager/case/deleteByResultIdSmartCaseTemplateResult.jhtml',
              data: {
                userId: localStorage.getItem('userId'),
                resultId: data.Id,
                hospitalId: _vm.formSearch.hospitalId,
                customerId: _vm.formSearch.customerId
              },
              success: function(res){
                if(res.data.code === 0 ){
                  _vm.getId(1, _vm.formSearch);
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('publicSet.noticeSuccess')
                  });
                } else {
                  _vm.$Notice.error({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: res.data.desc
                  });
                }
              },
              error: function(res){
                console.log(res);
              }
            });
          },
          onCancel: () => {

          }
        });
      },
      toEdit(data) {
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
            url: '/caseManagementCusUpdate',
            text: '编辑病例'
          }
        ];
        this.$store.dispatch('setBreadData', breadData);
        this.$router.push({
          path: '/caseManagementCusUpdate',
          query: {
            no: data.caseNumber
          }
        });
      },
      toView(data) {
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
            url: '/caseManagementCusView',
            text: '查看病例'
          }
        ];
        this.$store.dispatch('setBreadData', breadData);
        this.$router.push({
          path: '/caseManagementCusView',
          query: {
            no: data.caseNumber
          }
        });
      },
    }
  }

</script>
<style scoped>
  .index-order-detail {
    padding-top: 20px;
  }

</style>
