/**
* 收费项目管理
*/

<template>
  <div class="container-box" ref="containerBox">
    <div class="container-header">
      <h2>{{$t('layoutNav.chargeManage')}}</h2>
      <ul class="header-btn-group">
        <li class="header-item" @click="toEdit('add')"><Icon type="plus-round"></Icon>{{$t('publicSet.add')}}</li>
        <li class="header-item" @click="exportTable" v-if="exportKey === '1'"><Icon type="ios-download-outline"></Icon>{{$t('publicSet.exportData')}}</li>
      </ul>
    </div>
    <div class="container-body">
      <form :action="exportURL" method="get" ref="formSubmit" v-show="false">
        <input name="name" :value="formSearch.name">
        <input name="pinYin" :value="formSearch.pinYin">
        <input name="categoryId" :value="formSearch.categoryId">
        <input name="status" :value="formSearch.status">
        <input name="adminToken" :value="adminToken">
      </form>
      <Form :label-width="90" :model="formSearch" ref='formSearch'>
        <Row type="flex" justify="start">
          <Col :xs='24' :sm='12' :md="8" :lg="6">
            <Form-item :label="$t('labelPublic.mc')" prop='name'>
              <Input :maxlength='20' v-model.trim="formSearch.name" :placeholder="$t('placeholderPublic.input')" @on-enter="getList(1, formSearch)"></Input>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6">
            <Form-item :label="$t('labelPublic.pym')" prop='pinYin'>
              <Input :maxlength='20' v-model.trim="formSearch.pinYin" :placeholder="$t('placeholderPublic.input')" @on-enter="getList(1, formSearch)"></Input>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6">
            <Form-item :label="$t('labelPublic.lx')" prop='categoryId'>
              <cmptInputOpen :value='categoryName' :placeholder="$t('charge.modalTit3')" @on-open='addCategory' @on-clear='clearCategory'></cmptInputOpen>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6">
            <Form-item :label="$t('labelPublic.zt')" prop='status'>
              <Select v-model="formSearch.status" clearable>
                <Option :value="1">{{$t('charge.label1')}}</Option>
                <Option :value="0">{{$t('charge.label2')}}</Option>
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
      <cmptChargeCategoryChoose :placeHolder="$t('charge.modalTit3')" @on-change="chooseCategory" :openKey='categoryOpenKey' :activatedKey='activatedKey'></cmptChargeCategoryChoose>
    </div>
  </div>
</template>

<script>
  import cmptChargeCategoryChoose from 'components/chargeCategoryChoose.vue';
  export default {
    name: 'view_charge',
    components: {cmptChargeCategoryChoose},
    data () {
      return {
        formSearch: {
          pageSize: 10,
          name: '',
          pinYin: '',
          categoryId: '',
          status: ''
        },
        total: 0,
        totalPages: 0,
        pageNumber: 1,
        categoryName: '',
        columns: [
          {   
            title: this.$t('labelPublic.xh'),
            width: 60,
            render: (h, params) => {
              const _index = (this.pageNumber - 1) * 10
              return h('span', params.index + 1 + _index)
            }
          },
          {
            title: this.$t('labelPublic.bh'),
            width: 60,
            key: 'id'
          },
          {
            title: this.$t('labelPublic.mc'),
            width: 60,
            key: 'name',
          },
          {
            title: this.$t('charge.colTit1'),
            width: 60,
            key: 'printName'
          },
          {
            title: this.$t('labelPublic.pym'),
            width: 60,
            key: 'pinYin'
          },
          {
            title: this.$t('labelPublic.gg'),
            width: 60,
            key: 'size'
          },
          {
            title: this.$t('charge.colTit2'),
            width: 60,
            key: 'code'
          },
          {
            title: this.$t('labelPublic.lx'),
            width: 60,
            key: 'categoryName'
          },
          {
            title: this.$t('labelPublic.dw'),
            width: 60,
            key: 'unitName'
          },
          {
            title: this.$t('labelPublic.price'),
            align: 'right',
            width: 60,
            key: 'price',
            render: (h, params) => {
              if(params.row.price || params.row.price === 0) {
                return h('span', params.row.price.toFixed(2));
              }
            }
          },
          {
            title: this.$t('labelPublic.zt'),
            width: 60,
            render: (h, params) => {
              const color = params.row.status === 1 
                ? '#4172F6' 
                : '#FF6F76';
              const text = params.row.status === 1 
                ? this.$t('charge.label1') 
                : this.$t('charge.label2');
              return h('span', {
                style: {
                  color: color
                }
              },text)
            }
          },
          {
            title: this.$t('publicSet.tableAction'),
            key: 'action',
            width: 140,
            render: (h, params) => {
              if(params.row.productType === 1) {
                return h('span', this.$t('charge.msg3'));
              }
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
                      this.toSet(params.row.id)
                    }
                  }
                }, this.$t('charge.btn')),
              ]);
            }
          }
        ],
        data: [],
        
        categoryOpenKey: false,
        activatedKey: false,

        exportKey: localStorage.getItem('exportKey'),
        adminToken: this.$token.readToken('adminToken') || '',
      }
    },
    computed: {
      exportURL () {
        return this.$store.getters.getExportPrefixURL + '/guard-webManager/excelExport/charge.jhtml'
      },
      langRouterKey () {
        return this.$store.getters.getLandRouterKey;
      },
    },
    watch: {
      langRouterKey (val) {
        console.log('我在缓存' + val)
        if(val === 'charge') {
          this.getList(this.pageNumber, this.formSearch);
        }
      },
    },
    activated () {
      this.getList(this.pageNumber, this.formSearch)
    },
    deactivated () {
      this.activatedKey = !this.activatedKey;
    },
    methods: {
      //获取分页
      getList(pageNumber, form) {
        let _vm = this;
        _vm.$store.dispatch('setPageLoading', -1);
        form['pageNumber'] = pageNumber
        _vm.$http.getPage({
          url: 'guard-webManager/charge/page.jhtml',
          data: form,
          success: function(res){
            console.log(res.data.content)
            const data = res.data.content.content || [];
            const _col = _vm.tableCount(data, ['price']);
            _col.map(item => {
              const index = _vm.columns.findIndex(col => col.key === item.key);
              console.log(item)
              if(index >= 0) {
                _vm.columns[index].width = item.width;
              }
            });
            _vm.total = res.data.content.total || 0;
            _vm.pageNumber = res.data.content.pageNumber || 1;
            _vm.totalPages = res.data.content.totalPages || 1;
            if(_vm.langRouterKey !== 'charge') {
              _vm.data = data;
            } else {
              const props = ['name', 'printName', 'size', 'code', 'categoryName', 'unitName'];
              _vm.requestList(data, props).then(res => _vm.data = res);
            }
            _vm.$store.dispatch('setPageLoading', 1);
          },
          error: function(res){
            console.log(res);
          }
        });
      },
      addCategory () {
        this.categoryOpenKey = !this.categoryOpenKey;
      },
      chooseCategory (data) {
        this.categoryName = data.name;
        this.formSearch.categoryId = data.id;
      },
      clearCategory () {
        this.categoryName = '';
        this.formSearch.categoryId = ''
      },
      toEdit (data) {
        let breadText = ''
        let id = ''
        if(typeof data == 'object') {
          breadText = 'charge.modalTit2'
          id = data.id
        } else {
          breadText = 'charge.modalTit1'
          id = data
        }
        let breadData = [
          {
            url: '/desktop',
            text: 'layoutNav.desk'
          },
          {
            url: '/charge',
            text: 'layoutNav.chargeManage'
          },
          {
            url: '/chargeEdit',
            text: breadText
          }
        ];
        this.$store.dispatch('setBreadData', breadData);
        this.$router.push({
          path: '/chargeEdit',
          query: {
            id: id
          }
        })
      },
      remove (data) {
        let _vm = this;
        _vm.$Modal.confirm({
          title: _vm.$t('publicSet.noticeTit'),
          content: `<p>${_vm.$t('charge.msg1')}</p>
          <p>${_vm.$t('charge.msg2')}</p>
          <p>${_vm.$t('labelPublic.mc')}：${data.name}</p>`,
          onOk: () => {
            _vm.$http.post({
              url: 'guard-webManager/charge/del.jhtml',
              data: {id: data.id},
              success: function(res){
                console.log(res)
                if(res.data.code === 0) {
                  _vm.getList(1, _vm.formSearch)
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('publicSet.noticeSuccess')
                  });
                } else {
                  if(_vm.langRouterKey !== 'charge') {
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
              error: function(res){
                console.log(res);
              }
            });
          },
          onCancel: () => {
          }
        });
      },
      toSet (id) {
        let breadData = [
          {
            url: '/desktop',
            text: 'layoutNav.desk'
          },
          {
            url: '/charge',
            text: 'layoutNav.chargeManage'
          },
          {
            url: '/chargeMedicinalSet',
            text: 'charge.modalTit4'
          }
        ];
        this.$store.dispatch('setBreadData', breadData);
        this.$router.push({
          path: '/chargeMedicinalSet',
          query: {
            id: id
          }
        }) 
      },
      //重置
      handleReset (name) {
        this.categoryName = '';
        this.$refs[name].resetFields()
        this.getList(1, this.formSearch)
      },
      //分页
      changePage (num) {
        this.getList(num, this.formSearch);
      },
      exportTable () {
        this.$refs.formSubmit.submit();
      }
    }
  }
</script>