/** 
 * 借用工作台 
 */
<template>
  <div class="container-box">
    <div class="container-header">
      <h2>{{$t('layoutNav.deptBorrow')}}</h2>
      <ul class="header-btn-group">
        <li class="header-item" @click='toAdd' v-if='key'>
          <Icon type="plus-round"></Icon>{{$t('deptBorrow.btn1')}}</li>
      </ul>
    </div>
    <div class="container-body">
      <Alert type="error" v-if='!key'>{{$t('deptBorrow.msg1')}}</Alert>
      <Tabs value="name1" :animated='false'>
        <Tab-pane :label="$t('deptBorrow.menu1')" name="name1">
          <Table stripe :columns="col" :data="data"></Table>
        </Tab-pane>
        <Tab-pane :label="$t('deptBorrow.menu2')" name="name2">
          <Form :label-width="90" ref='formSearch' :model='formSearch' :rules="ruleForm">
            <Row type="flex" justify="start">
              <Col :xs='24' :sm='12' :md="8" :lg="6">
                <Form-item :label="$t('deptBorrow.colTit10')" prop='startTime'>
                  <Date-picker :transfer='true' type="daterange" placement="bottom-start" :clearable="false" style="width: 100%" @on-change='setDate'
                    :value='dateBox'></Date-picker>
                </Form-item>
              </Col>
              <Col :xs='24' :sm='12' :md="8" :lg="6">
                <Form-item :label="$t('deptBorrow.colTit11')" prop='productCategoryId'>
                  <Select v-model="formSearch.productCategoryId" clearable>
                    <Option v-for="item in productCategoryList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col :xs='24' :sm='12' :md="8" :lg="6">
                <Form-item :label="$t('deptBorrow.colTit12')" prop='productId'>
                  <Input type="text" v-model.trim="formSearch.productId" :placeholder="$t('placeholderPublic.input')" @on-enter="getSearch()" :maxlength='15'></Input>
                </Form-item>
              </Col>
              <Col :xs='24' :sm='12' :md="8" :lg="6">
                <Form-item :label="$t('deptBorrow.colTit13')" prop='productName'>
                  <Input type="text" v-model.trim="formSearch.productName" :placeholder="$t('placeholderPublic.input')" @on-enter="getSearch()" :maxlength='20'></Input>
                </Form-item>
              </Col>
              <Col :xs='24' :sm='12' :md="8" :lg="6">
                <ul class="header-btn-group">
                  <li class="header-item" @click="getSearch()">
                    <Icon type="search"></Icon>{{$t('publicSet.search')}}</li>
                  <li class="header-item" @click="handleReset('formSearch')">
                    <Icon type="refresh"></Icon>{{$t('publicSet.reset')}}</li>
                </ul>
              </Col>
            </Row>
          </Form>
          <Table stripe :columns="col1" :data="data1" style='marginBottom: 80px'></Table>
        </Tab-pane>
      </Tabs>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      const validateId = (rule, value, callback) => {
        if ((/[^\d]/g).test(value)) {
          callback(new Error(this.$t('validPublic.number')))
        } else {
          callback()
        }
      }
      return {
        formSearch: {
          startTime: moment().format('YYYY-MM-DD'),
          endTime: moment().format('YYYY-MM-DD'),
          productCategoryId: '',
          productName: '',
          productId: '',
        },
        dateBox: [moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')],
        col: [
          {
            title: this.$t('labelPublic.xh'),
            type: 'index',
            width: 60
          },
          {
            title: this.$t('deptBorrow.colTit1'),
            width: 60,
            key: 'deptName'
          },
          {
            title: this.$t('deptBorrow.colTit2'),
            width: 60,
            key: 'doUserName',
          },
          {
            title: this.$t('deptBorrow.colTit3'),
            width: 60,
            render: (h, params) => {
              return h('span', this.$t('deptBorrow.colTit9'));
            }
          },
          {
            title: this.$t('deptBorrow.colTit4'),
            width: 80,
            render: (h, params) => {
              if(params.row.createDate) {
                return h('span', params.row.createDate.split(' ')[0]);
              }
            }
          },
          {
            title: this.$t('deptBorrow.colTit5'),
            width: 60,
            key: 'no'
          },
          {
            title: this.$t('deptBorrow.colTit6'),
            width: 70,
            render: (h, params) => {
              const index = this.borrowOrderStatus.findIndex(item => item.id === params.row.status);
              if(index >= 0) {
                const lang = 'borrowOrderStatus' + params.row.status;
                return h('span', this.$t(lang));
              }
            }
          },
          {
            title: this.$t('deptBorrow.colTit7'),
            width: 60,
            key: 'num'
          },
          {
            title: this.$t('deptBorrow.colTit8'),
            width: 100,
            key: 'remark'
          },
          {
            title: this.$t('publicSet.tableAction'),
            key: 'action',
            width: 140,
            render: (h, params) => {
              const _display1 = params.row.status === 0 ? 'inline-block' : 'none';
              const _display2 = params.row.status === 1 ? 'inline-block' : 'none';
              const _display3 = params.row.status === 2 ? 'inline-block' : 'none';
              const _display4 = params.row.status === 1 ? 'none' : 'inline-block';
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small',
                    icon: 'ios-eye'
                  },
                  style: {
                    margin: '5px 2px 5px 0',
                    display: _display4
                  },
                  on: {
                    click: () => {
                      this.toView(params.row)
                    }
                  }
                }, this.$t('publicSet.check')),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small',
                    icon: 'ios-trash-outline'
                  },
                  style: {
                    margin: '5px 2px 5px 0',
                    display: _display1
                  },
                  on: {
                    click: () => {
                      this.remove(params.row, true)
                    }
                  }
                }, this.$t('deptBorrow.btn2')),
                h('Button', {
                  props: {
                    type: 'warning',
                    size: 'small',
                    icon: 'android-cancel'
                  },
                  style: {
                    margin: '5px 2px 5px 0',
                    display: _display3
                  },
                  on: {
                    click: () => {
                      this.remove(params.row, false)
                    }
                  }
                }, this.$t('deptBorrow.btn4')),
                h('Button', {
                  props: {
                    type: 'info',
                    size: 'small',
                    icon: 'edit'
                  },
                  style: {
                    margin: '5px 2px 5px 0',
                    display: _display2
                  },
                  on: {
                    click: () => {
                      this.toView(params.row)
                    }
                  }
                }, this.$t('deptBorrow.btn3'))
              ])
            }
          }
        ],
        col1: [
          {
            title: this.$t('labelPublic.xh'),
            type: 'index',
            width: 60
          },
          {
            title: this.$t('deptBorrow.colTit12'),
            width: 60,
            key: 'productID'
          },
          {
            title: this.$t('deptBorrow.colTit13'),
            width: 60,
            key: 'productName',
          },
          {
            title: this.$t('labelPublic.gg'),
            width: 60,
            key: 'productSize'
          },
          {
            title: this.$t('deptBorrow.colTit11'),
            width: 60,
            key: 'productCategoryName',
          },
          {
            title: this.$t('labelPublic.dw'),
            width: 60,
            key: 'productUnitName'
          },
          {
            title: this.$t('deptBorrow.colTit14'),
            width: 60,
            key: 'stockNum',
          },
          {
            title: this.$t('deptBorrow.colTit15'),
            width: 60,
            key: 'beginTotalNum'
          },
          {
            title: this.$t('deptBorrow.colTit16'),
            width: 60,
            key: 'inNum'
          },
          {
            title: this.$t('deptBorrow.colTit17'),
            width: 60,
            key: 'outNum',
          },
          {
            title: this.$t('deptBorrow.colTit18'),
            width: 60,
            key: 'endTotalNum',
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
                    icon: 'ios-eye'
                  },
                  on: {
                    click: () => {
                      this.toChange(params.row)
                    }
                  }
                }, this.$t('publicSet.check'))
              ])
            }
          }
        ],
        data: [],
        data1: [],
        key: true,
        returnKey: false,
        ruleForm: {
          productId: [{
            validator: validateId,
            trigger: 'blur'
          }],
        },
      }
    },
    computed: {
      borrowStatus() {
        return this.$store.getters.getDeptBorrowStatus
      },
      borrowOrderStatus() {
        return this.$store.getters.getBorrowOrderStatus;
      },
      productCategoryList() {
        return this.$store.getters.getSelectProductCategoryFirstList
      },
      langRouterKey () {
        return this.$store.getters.getLandRouterKey;
      },
    },
    created() {
      this.getList()
    },
    watch: {
      langRouterKey (val) {
        if(val === 'deptBorrow') {
          this.getList();
          this.getSearch();
        }
      },
    },
    mounted() {
      this.getSearch()
      this.$store.dispatch('setSelectProductCategoryFirstList')
    },
    methods: {
      getList() {
        let _vm = this
        _vm.$store.dispatch('setPageLoading', -1)
        _vm.$http.getPage({
          url: 'guard-webManager/deptBorrow/borrowList.jhtml',
          success: function (res) {
            let _data = res.data.content.list || [];
            if(_vm.langRouterKey !== 'deptBorrow') {
              _vm.data = _data;
            } else {
              _vm.requestList(_data, ['deptName', 'remark']).then(res => _vm.data = res);
            }
            _vm.$store.dispatch('setPageLoading', 1);
            _vm.key = res.data.content.status || false;
            if (_data.length > 0) {
              _data.map(item => {
                if (item.status !== 3) {
                  _vm.returnKey = true
                }
              })
            } else {
              _vm.returnKey = false
            }
            if (_vm.key && _vm.borrowStatus && _vm.returnKey) {
              _vm.$Notice.warning({
                title: _vm.$t('deptBorrow.msg2'),
                desc: _vm.$t('deptBorrow.msg3'),
                duration: 3
              })
              _vm.$store.dispatch('setDeptBorrowStatus', false)
            }
          },
          error: function (res) {
            console.log(res)
          }
        })
      },
      getSearch() {
        let _vm = this
        _vm.$refs['formSearch'].validate((valid) => {
          if (valid) {
            _vm.$http.get({
              url: 'guard-webManager/deptBorrow/getBorrowStock.jhtml',
              data: _vm.formSearch,
              success: function (res) {
                if (res.data.code === 0) {
                  let _data = res.data.content.List || [];
                  if(_vm.langRouterKey !== 'deptBorrow') {
                    _vm.data1 = _data;
                  } else {
                    _vm.requestList(_data, ['productCategoryName', 'productSize', 'productName', 'productUnitName']).then(res => _vm.data1 = res);
                  }
                } else {
                  console.log(res)
                }
              },
              error: function (res) {
                console.log(res)
              }
            })
          }
        })
      },
      setDate(date) {
        this.formSearch.startTime = date[0]
        this.formSearch.endTime = date[1]
      },
      handleReset(name) {
        this.$refs[name].resetFields()
        this.formSearch.startTime = moment().format('YYYY-MM-DD')
        this.formSearch.endTime = moment().format('YYYY-MM-DD')
        this.dateBox = [moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')]
        this.getSearch()
      },
      toAdd() {
        let breadData = [
          {
            url: '/desktop',
            text: 'layoutNav.desk'
          },
          {
            url: '/deptBorrow',
            text: 'layoutNav.deptBorrow'
          },
          {
            url: '/deptBorrowAdd',
            text: 'deptBorrowAdd.tit'
          }
        ]
        this.$store.dispatch('setBreadData', breadData)
        this.$router.push('/deptBorrowAdd')
      },
      toView(data) {
        let breadData = [
          {
            url: '/desktop',
            text: 'layoutNav.desk'
          },
          {
            url: '/deptBorrow',
            text: 'layoutNav.deptBorrow'
          },
          {
            url: '/deptBorrowView',
            text: 'deptBorrowView.tit'
          }
        ]
        this.$store.dispatch('setBreadData', breadData)
        this.$router.push({
          path: '/deptBorrowView',
          query: {
            id: data.id,
            status: data.status
          }
        })
      },
      toChange(data) {
        let breadData = [
          {
            url: '/desktop',
            text: 'layoutNav.desk'
          },
          {
            url: '/deptBorrow',
            text: 'layoutNav.deptBorrow'
          },
          {
            url: '/deptBorrowChange',
            text: 'deptBorrowChange.tit'
          }
        ]
        this.$store.dispatch('setBreadData', breadData)
        this.$router.push({
          path: '/deptBorrowChange',
          query: {
            id: data.productID,
          }
        })
      },
      remove(data, type) {
        let _vm = this;
        const _url = type
          ? 'guard-webManager/deptBorrow/deleteBorrow.jhtml'
          : 'guard-webManager/deptBorrow/deleteBorrowRetrun.jhtml';
        _vm.$Modal.confirm({
          title: _vm.$t('publicSet.noticeTit'),
          content: `<p>${_vm.$t('deptBorrow.msg4')}</p>
          <p>${_vm.$t('deptBorrow.msg5')}</p>`,
          onOk: () => {
            _vm.$http.post({
              url: _url,
              data: {
                id: data.id
              },
              success: function (res) {
                if (res.data.code === 0) {
                  _vm.getList()
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('publicSet.noticeSuccess')
                  });
                } else {
                  if(_vm.langRouterKey !== 'deptBorrow') {
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
            });
          },
          onCancel: () => {

          }
        })
      },
    }
  }

</script>

<style scoped>
  .container-body .container-header {
    padding: 0 20px 10px 15px;
    margin-top: -6px;
  }

</style>
