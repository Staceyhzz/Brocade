/**
 * 渠道报单记录管理管理
 */

<template>
  <div class="container-box user" ref="containerBox">
    <div class="container-header">
      <h2>渠道报单记录管理</h2>
    </div>
    <div class="container-body">
      <Form :label-width="90" ref="formSearch" :model="formSearch">
        <Row type="flex" justify="start">
          <Col :xs='24' :sm='12' :md="8" :lg="6">
            <Form-item label="日期" prop='startTime'>
              <Date-picker :transfer='true' type="daterange" placement="bottom-start" :clearable="false" @on-change='setDate' :value='dateBox' style='width:100%'></Date-picker>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6">
            <Form-item label="渠道" prop='distributionUserID'>
              <input-remote
                :list='parentList' 
                :asyncKey='asyncKeyParent' 
                @on-change-word='changeParent'
                idProp='id' 
                nameProp='name' 
                :clearable='true'
                @on-clean='cleanParent'
                ref='parent'
                size='300px'
                :inputId='formSearch.distributionUserID'
                :inputVal='distributionUserName'
                v-model="formSearch.distributionUserID">
                <template slot="title">
                  <p style="width: 60%">{{$t('labelPublic.mc')}}</p>
                  <p style="width: 40%">手机号</p>
                </template>
                <template scope="label">
                  <p style="width: 60%">{{label.data.name}}</p>
                  <p style="width: 40%">{{label.data.mobile}}</p>
                </template>
              </input-remote>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6">
            <Form-item label="顾客姓名" prop='name'>
              <Input v-model.trim="formSearch.name" @on-enter="getList(1, formSearch)" :placeholder="$t('placeholderPublic.input')" :maxlength='20'></Input>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6">
            <Form-item label="性别" prop="gender">
              <Select v-model="formSearch.gender" clearable>
                <Option :value="1">男</Option>
                <Option :value="2">女</Option>
              </Select>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6">
            <Form-item label="状态" prop="status">
              <Select v-model="formSearch.status" clearable>
                <Option v-for="item in statusList" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6">
            <ul class="header-btn-group">
              <li class="header-item"  @click="getList(1, formSearch)"><Icon type="search"></Icon>{{$t('publicSet.search')}}</li>
              <li class="header-item" @click="handleReset"><Icon type="refresh"></Icon>{{$t('publicSet.reset')}}</li>
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
  </div>
</template>

<script>
  import resizeTime from 'components/tableResizeTime.vue';
  import inputRemote from 'components/InputRemote';
  export default {
    components: {inputRemote, resizeTime},
    data () {
      return {
        total: 0,
        totalPages: 1,
        pageNumber: 1,

        dateBox: [moment().startOf('month').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')],
        formSearch: {
          startTime: moment().startOf('month').format('YYYY-MM-DD'),
          endTime: moment().format('YYYY-MM-DD'),
          status: '',
          name: '',
          distributionUserID: '',
          gender: '',
        },

        parentList: [],
        asyncKeyParent: true,
        searchParentIndex: 0,
        distributionUserName: '',

        statusList: [
          {
            id: 0,
            name: '审核中',
            color: 'orange'
          },
          {
            id: 1,
            name: '推荐成功',
            color: '#4172F6'
          },
          {
            id: 2,
            name: '推荐无效',
            color: '#FF6F76'
          },
        ],

        columns: [
          {   
            title: this.$t('labelPublic.xh'),
            width: 50,
            render: (h, params) => {
              const _index = (this.pageNumber - 1) * 10;
              return h('span', params.index + 1 + _index);
            }
          },
          {
            title: '日期',
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
            title: '顾客姓名',
            width: 60,
            key: 'name'
          },
          {
            title: '性别',
            width: 60,
            render: (h, params) => {
              const text = params.row.gender === 1 ? '男' : '女';
              return h('span', text);
            }
          },
          {
            title: '渠道',
            width: 60,
            key: 'distributionUserName'
          },
          {
            title: '状态',
            width: 60,
            render: (h, params) => {
              const index = this.statusList.findIndex(item => item.id === params.row.status);
              if(index >= 0) {
                return h('span', {
                  style: {
                    color: this.statusList[index].color
                  }
                }, this.statusList[index].name);
              }
            }
          },
          {
            title: this.$t('publicSet.tableAction'),
            key: 'action',
            width: 120,
            render: (h, params) => {
              if(params.row.status === 0) {
                return h('div', [
                  h('Button', {
                    props: {
                      type: 'primary',
                      size: 'small',
                      icon: 'checkmark-round',
                      loading: this.btnLoad
                    },
                    style: {
                      margin: '5px 3px 5px 0',
                      verticalAlign: 'middle'
                    },
                    on: {
                      click: () => {
                        this.audit(params.row.id, 1);
                      }
                    }
                  }, '通过'),
                  h('Button', {
                    props: {
                      type: 'error',
                      size: 'small',
                      icon: 'close-round',
                      loading: this.btnLoad
                    },
                    style: {
                      margin: '5px 0px 5px 0',
                      verticalAlign: 'middle'
                    },
                    on: {
                      click: () => {
                        this.audit(params.row.id, 2);
                      }
                    }
                  }, '拒绝')
                ])
              }
            }
          }
        ],
        data: [],

        btnLoad: false,
      }
    },
    computed: {
      pageSize () {
        return this.$store.getters.getPageSize;
      },
    },
    beforeRouteUpdate (to, from, next) {
      next();
      const id = this.$route.query.id || '';
      this.formSearch.distributionUserID = id ? id * 1 : '';
      this.distributionUserName = this.$route.query.name || '';
      this.getList(1, this.formSearch);
    },
    created () {
      const id = this.$route.query.id || '';
      this.formSearch.distributionUserID = id ? id * 1 : '';
      this.distributionUserName = this.$route.query.name || '';
      this.getList(1, this.formSearch);
    },
    methods: {
      // 获取分页
      getList(pageNumber, form) {
        let _vm = this;
        _vm.$store.dispatch('setPageLoading', -1);
        form['pageIndex'] = pageNumber;
        form['pageSize'] = _vm.pageSize;
        _vm.$http.getPage({
          url: 'guard-webManager/distributionCustomer/findCustomerListByDistriburionCustomer.jhtml',
          data: form,
          success: function(res){
            _vm.data = res.data.content.content || [];
            _vm.total = res.data.content.total;
            _vm.pageNumber = res.data.content.pageNumber;
            _vm.totalPages = res.data.content.totalPages;
            _vm.$store.dispatch('setPageLoading', 1);
          },
          error: function(res){
            console.log(res);
          }
        });
      },
      setDate (date) {
        this.formSearch.startTime = date[0];
        this.formSearch.endTime = date[1];
      },
      //重置
      handleReset () {
        this.$refs.formSearch.resetFields();
        this.$refs.parent.clearQuery();
        this.formSearch.distributionUserID = '';
        this.formSearch.startTime = moment().startOf('month').format('YYYY-MM-DD');
        this.formSearch.endTime = moment().format('YYYY-MM-DD');
        this.dateBox = [moment().startOf('month').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')];
        this.getList(1, this.formSearch);
      },
      //分页
      changePage (num) {
        this.getList(num, this.formSearch);
      },
      //上级渠道商
      changeParent(val) {
        let _vm = this;
        _vm.asyncKeyParent = true;
        _vm.searchParentIndex++;
        const _index = _vm.searchParentIndex;
        _vm.$http.get({
          url: 'guard-webManager/distributionUser/finddistributionUserList.jhtml',
          data: {
            name: val
          },
          success: function(res){
            if(res.data.code === 0) {
              if(_index === _vm.searchParentIndex) {
                _vm.parentList = res.data.content.map(item => {
                  return {
                    id: item.id,
                    name: item.name,
                    mobile: item.mobile
                  };
                }) || [];
                _vm.asyncKeyParent = false;
              }
            }
          },
          error: function(res){
            console.log(res);
          }
        });
      },
      cleanParent() {
        this.formSearch.distributionUserID = '';
      },
      audit(id, type) {
        let _vm = this;
        _vm.btnLoad = true;
        _vm.$http.post({
          url: 'guard-webManager/distributionCustomer/updateDistributionCustomerStatus.jhtml',
          data: {
            id: id,
            status: type
          },
          success: function(res){
            if(res.data.code === 0) {
              _vm.getList(1, _vm.formSearch);
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
            _vm.btnLoad = false;
          },
          error: function(res){
            console.log(res);
          }
        });
      },
    }
  }
</script>
