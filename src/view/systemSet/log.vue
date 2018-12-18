/**
* 系统日志记录
*/

<template>
  <div class="container-box" ref="containerBox">
    <div class="container-header">
      <h2>{{$t('layoutNav.logManage')}}</h2>
    </div>
    <div class="container-body">
      <Form :label-width="90" :model="formSearch" ref='formSearch' :rules="ruleForm">
        <Row type="flex" justify="start">
          <Col :xs='24' :sm='12' :md="8" :lg="6">
            <Form-item :label="$t('log.label1')" prop='date'>
              <Date-picker :transfer='true' type="daterange" placement="bottom-start" style="width: 100%" :options='options' @on-change='saveDate' ref='dateTime'></Date-picker>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6">
            <Form-item :label="$t('log.label2')" prop='type'>
              <Select v-model="formSearch.type" clearable>
                <Option v-for="item in typeList" :value="item.code" :key="item.code">{{ item.name }}</Option>
              </Select>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6" v-if='key'>
            <Form-item :label="$t('log.label3')" prop='hospitalId'>
              <Select v-model="formSearch.hospitalId" clearable>
                <Option v-for="item in hospList" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6">
            <Form-item :label="$t('labelPublic.zh')" prop='account'>
              <Input v-model.trim="formSearch.account" :maxlength='20' :placeholder="$t('placeholderPublic.input')" @on-enter="getList(1, 10, formSearch)"></Input>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6">
            <Form-item :label="$t('labelPublic.xm')" prop='name'>
              <Input v-model.trim="formSearch.name" :maxlength='20' :placeholder="$t('placeholderPublic.input')" @on-enter="getList(1, 10, formSearch)"></Input>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6">
            <Form-item :label="$t('labelPublic.gkbh')" prop='customerId'>
              <Input v-model.trim="formSearch.customerId" :maxlength='15' :placeholder="$t('placeholderPublic.input')" @on-enter="getList(1, 10, formSearch)"></Input>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6">
            <ul class="header-btn-group">
              <li class="header-item" @click="getList(1, 10, formSearch)"><Icon type="search"></Icon>{{$t('publicSet.search')}}</li>
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
  </div>
</template>

<script>
  import resizeTime from 'components/tableResizeTime.vue';
  export default {
    components: {resizeTime},
    data () {
      const validateId = (rule, value, callback) => {
        if ((/[^\d]/g).test(value)) {
          callback(new Error(this.$t('validPublic.number')));
        } else {
          callback()
        }
      }
      return {
        key: true,
        total: 0,
        totalPages: 0,
        pageNumber: 1,
        formSearch: {
          startTime: '',
          endTime: '',
          type: '',
          hospitalId: localStorage.getItem('hospId') * 1,
          account: '',
          name: '',
          customerId: ''
        },
        columns: [
          {   
            title: this.$t('labelPublic.xh'),
            width: 50,
            render: (h, params) => {
              const _index = (this.pageNumber - 1) * 10
              return h('span', params.index + 1 + _index)
            }
          },
          {
            title: this.$t('labelPublic.yy'),
            width: 60,
            key: 'hospitalName'
          },
          {
            title: this.$t('labelPublic.zh'),
            width: 60,
            key: 'userAccount'
          },
          {
            title: this.$t('labelPublic.xm'),
            width: 60,
            key: 'userName'
          },
          {
            title: this.$t('log.label2'),
            width: 60,
            render: (h, params) => {
              const text = this.typeList.find(item => item.code === params.row.type).name || '';
              return h('span', text);
            }
          },
          {
            title: this.$t('log.colTit1'),
            width: 60,
            key: 'ip'
          },
          {
            title: this.$t('log.label1'),
            width: 80,
            render: (h, params) => {
              if(params.row.createtime) {
                return h(resizeTime, {
                  props: {
                    time: params.row.createtime
                  }
                })
              }
            }
          },
          {
            title: this.$t('log.colTit2'),
            width: 60,
            key: 'customerName'
          },
          {
            title: this.$t('labelPublic.ms'),
            width: 100,
            key: 'description'
          }
        ],
        data: [],
        options: {
          disabledDate (date) {
            return date && date.valueOf() > Date.now();
          }
        },
        ruleForm: {
          customerId: [
            { validator: validateId, trigger: 'blur' }
          ],
        },
      }
    },
    computed: {
      hospList () {
        return this.$store.getters.getSelectAllHospList
      },
      typeList () {
        return this.$store.getters.getSelectLogTypeInfoList
      },
      langRouterKey () {
        return this.$store.getters.getLandRouterKey;
      },
    },
    watch: {
      langRouterKey (val) {
        if(val === 'log') {
          this.getList(this.pageNumber, 10, this.formSearch);
        }
      },
    },
    created () {
      this.key = this.getHeadquarters();
    },
    mounted () {
      this.$store.dispatch('setSelectAllHospList')
      this.$store.dispatch('setSelectLogTypeInfoList')
      this.getList(1, 10, this.formSearch)
    },
    methods: {
      //获取分页
      getList(pageNumber, pageSize, form) {
        let _vm = this
        _vm.$refs['formSearch'].validate((valid) => {
          if (valid) {
            _vm.$store.dispatch('setPageLoading', -1)
            form['pageNumber'] = pageNumber
            form['pageSize'] = pageSize
            _vm.$http.getPage({
              url: 'guard-webManager/log/page.jhtml',
              data: form,
              success: function(res){
                let _data = res.data.content.content || [];
                if(_vm.langRouterKey !== 'log') {
                  _vm.data = _data;
                } else {
                  const props = ['description'];
                  _vm.requestList(_data, props).then(res => _vm.data = res);
                }
                _vm.total = res.data.content.total
                _vm.pageNumber = res.data.content.pageNumber
                _vm.totalPages = res.data.content.totalPages
                _vm.$store.dispatch('setPageLoading', 1);
              },
              error: function(res){
                console.log(res);
              }
            })
          }
        })
      },
      //日期获取
      saveDate (date) {
        this.formSearch.startTime = date[0];
        this.formSearch.endTime = date[1];
      },
      //重置
      handleReset (name) {
        this.$refs[name].resetFields();
        this.$refs['dateTime'].handleClear();
        this.getList(1, 10, this.formSearch);
      },
      //分页
      changePage (num) {
        this.getList(num, '10', this.formSearch);
      },
    },
  }
</script>



