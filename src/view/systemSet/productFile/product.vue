/**
* 药物品管理
*/

<template>
  <div class="container-box" ref="containerBox">
    <div class="container-header">
      <h2>{{$t('layoutNav.productManage')}}</h2>
      <ul class="header-btn-group">
        <li class="header-item" @click="toEdit('add')"><Icon type="plus-round"></Icon>{{$t('publicSet.add')}}</li>
        <li class="header-item" @click="exportTable" v-if="exportKey === '1'"><Icon type="ios-download-outline"></Icon>{{$t('publicSet.exportData')}}</li>
      </ul>
    </div>
    <div class="container-body">
    <form :action="exportURL" method="get" ref="formSubmit" v-show="false">
        <input name="content" :value="formSearch.content">
        <input name="categoryId" :value="formSearch.categoryId">
        <input name="status" :value="formSearch.status">
        <input name="adminToken" :value="adminToken">
      </form>
      <Form :label-width="90" :model="formSearch" ref='formSearch'>
        <Row type="flex" justify="start">
          <Col :xs='24' :sm='12' :md="8" :lg="6">
            <Form-item :label="$t('product.label1')" prop='content'>
              <Input v-model.trim="formSearch.content" :placeholder="$t('placeholderPublic.input')" @on-enter="getList(1, 10, formSearch)" :maxlength='20'></Input>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6">
            <Form-item :label="$t('labelPublic.lx')" prop='categoryId'>
              <cmptInputOpen :value='categoryName' :placeholder="$t('product.modalTit3')" @on-open='addCategory' @on-clear='clearCategory'></cmptInputOpen>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6">
            <Form-item :label="$t('labelPublic.zt')" prop='status'>
              <Select v-model="formSearch.status" clearable>
                <Option :value="1">{{$t('publicSet.enable')}}</Option>
                <Option :value="0">{{$t('publicSet.disable')}}</Option>
              </Select>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6">
            <ul class="header-btn-group">
              <li class="header-item"  @click="getList('1', '10', formSearch)"><Icon type="search"></Icon>{{$t('publicSet.search')}}</li>
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
    <cmptProductCategoryChoose :placeHolder="$t('product.modalTit3')" @on-change="chooseCategory" :openKey='categoryOpenKey' :activatedKey='activatedKey'></cmptProductCategoryChoose>
  </div>
</template>

<script>
  import cmptProductCategoryChoose from 'components/productCategoryChoose.vue';
  export default {
    name: 'view_product',
    components: {cmptProductCategoryChoose},
    data () {
      return {
        adminToken: this.$token.readToken('adminToken') || '',
        exportKey: localStorage.getItem('exportKey'),
        formSearch: {
          content: '',
          categoryId: '',
          status: ''
        },
        total: 0,
        totalPages: 0,
        pageNumber: 1,

        categoryName: '',
        categoryOpenKey: false,
        activatedKey: false,

        columns: [],
        colStart: [
          {   
            title: this.$t('labelPublic.xh'),
            width: 50,
            render: (h, params) => {
              const _index = (this.pageNumber - 1) * 10
              return h('span', params.index + 1 + _index)
            }
          },
          {
            title: this.$t('labelPublic.bh'),
            width: 50,
            key: 'id'
          },
          {
            title: this.$t('labelPublic.mc'),
            width: 60,
            key: 'name'
          },
          {
            title: this.$t('product.colTit1'),
            width: 60,
            key: 'alias'
          },
          {
            title: this.$t('product.colTit2'),
            width: 60,
            key: 'englishName'
          },
          {
            title: this.$t('product.colTit3'),
            width: 60,
            key: 'generalName'
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
            title: this.$t('product.colTit4'),
            width: 60,
            key: 'brand'
          },
          {
            title: this.$t('product.colTit5'),
            width: 60,
            key: 'approvalNumber'
          },
          {
            title: this.$t('product.colTit7'),
            width: 60,
            key: 'code'
          },
          {
            title: this.$t('labelPublic.lx'),
            width: 60,
            key: 'categoryName'
          },
          {
            title: this.$t('product.colTit6'),
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
            title: this.$t('labelPublic.dw'),
            width: 60,
            key: 'unitName'
          },
          {
            title: this.$t('labelPublic.zt'),
            width: 60,
            key: 'status',
            render: (h, params) => {
              const color = params.row.status === 1 
                ? '#4172F6' 
                : '#FF6F76';
              const text = params.row.status === 1 
                ? this.$t('publicSet.enable') 
                : this.$t('publicSet.disable');
              return h('span', {
                style: {
                  color: color
                }
              }, text);
            }
          },
        ],
        data: [],
        colAction: {
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
                  marginRight: '2px'
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
                on: {
                  click: () => {
                    this.remove(params.row)
                  }
                }
              }, this.$t('publicSet.del')),
              ])
          }
        },
        colCus: [],
        colNone: [],
      }
    },
    computed: {
      exportURL () {
        return this.$store.getters.getExportPrefixURL + '/guard-webManager/excelExport/product.jhtml'
      },
      langRouterKey () {
        return this.$store.getters.getLandRouterKey;
      },
    },
    watch: {
      langRouterKey (val) {
        if(val === 'product') {
          this.getList(this.pageNumber, 10, this.formSearch);
        }
      },
      colCus: {
        handler (newVal, oldVal) {
          let key = false;
          console.log(1, newVal)
          console.log(2, oldVal)
          if(oldVal.length) {
            newVal.map((item, index) => {
              if(item.name !== oldVal[index].name) {
                key = true;
              }
            });
          } else {
            key = true;
          }
          if(key) {
            console.log(123)
            this.columns = [...this.colStart];
            newVal.map(item => {
              const _str = item.properties[0].toLowerCase() + item.properties.substring(1, item.properties.length);
              console.log(item.name)
              this.columns.push({
                title: item.name,
                width: 60,
                key: _str
              });
            });
            this.columns.push(this.colAction);
            this.colNone.map(item => {
              const str = item.properties[0].toLowerCase() + item.properties.substring(1, item.properties.length);
              const index = this.columns.findIndex(col => col.key === str);
              this.columns.splice(index, 1);
            });
          }
        },
        deep: true
      },
      colNone: {
        handler (newVal, oldVal) {
          if(newVal.length !== oldVal.length) {
            this.columns = [...this.colStart];
            this.colCus.map(item => {
              const _str = item.properties[0].toLowerCase() + item.properties.substring(1, item.properties.length);
              this.columns.push({
                title: item.name,
                width: 60,
                key: _str
              });
            });
            this.columns.push(this.colAction);
            newVal.map(item => {
              const str = item.properties[0].toLowerCase() + item.properties.substring(1, item.properties.length);
              const index = this.columns.findIndex(col => col.key === str);
              this.columns.splice(index, 1);
            });
          }
        },
        deep: true
      },
    },
    activated () {
      console.log(111111111)
      this.getList(this.pageNumber, 10, this.formSearch)
    },
    deactivated () {
      this.activatedKey = !this.activatedKey;
    },
    methods: {
      //获取分页
      getList(pageNumber, pageSize, form) {
        let _vm = this
        _vm.$store.dispatch('setPageLoading', -1)
        form['pageNumber'] = pageNumber
        form['pageSize'] = pageSize
        _vm.$http.getPage({
          url: 'guard-webManager/product/page.jhtml',
          data: form,
          success: function(res){
            let _colCus = res.data.content.customList || [];
            let _data = res.data.content.page.content || [];
              _vm.data = _data;
            if(_vm.langRouterKey !== 'product') {
              _vm.colCus = _colCus;
            } else {
              _vm.requestList(_colCus, ['name']).then((res) => _vm.colCus = res);
              const props = ['name', 'alias', 'generalName', 'size', 'brand', 'approvalNumber', 'categoryName', 'unitName', 'custom1', 'custom2', 'custom3'];
              _vm.requestList(_data, props).then((res) => _vm.data = res);
            }
            _vm.colNone = res.data.content.productProperties || [];
            const _col = _vm.tableCount(_data, ['price']);
            _col.map(item => {
              const index = _vm.columns.findIndex(col => col.key === item.key);
              const index1 = _vm.colStart.findIndex(col => col.key === item.key);
              console.log(item)
              if(index >= 0) {
                _vm.columns[index].width = item.width;
              }
              if(index1 >= 0) {
                _vm.colStart[index1].width = item.width;
              }
            });
            _vm.total = res.data.content.page.total
            _vm.pageNumber = res.data.content.page.pageNumber
            _vm.totalPages = res.data.content.page.totalPages
            _vm.$store.dispatch('setPageLoading', 1);
          },
          error: function(res){
            console.log(res);
          }
        });
      },
      //获取类型
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
          breadText = 'product.modalTit2'
          id = data.id
        } else {
          breadText = 'product.modalTit1'
          id = data
        }
        let breadData = [
          {
            url: '/desktop',
            text: 'layoutNav.desk'
          },
          {
            url: '/product',
            text: 'layoutNav.productManage'
          },
          {
            url: '/productEdit',
            text: breadText
          }
        ];
        this.$store.dispatch('setBreadData', breadData);
        this.$router.push({
          path: '/productEdit',
          query: {
            id: id
          }
        })
      },
      remove (data) {
        let _vm = this;
        _vm.$Modal.confirm({
          title: _vm.$t('publicSet.noticeTit'),
          content: `<p>${_vm.$t('product.msg1')}</p>
          <p>${_vm.$t('product.msg2')}</p>
          <p>${_vm.$t('labelPublic.mc')}：${data.name}</p>`,
          onOk: () => {
            _vm.$http.post({
              url: 'guard-webManager/product/del.jhtml',
              data: {id: data.id},
              success: function(res){
                if(res.data.code == 0) {
                  _vm.getList('1', '10', _vm.formSearch)
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('publicSet.noticeSuccess')
                  });
                } else {
                  if(_vm.langRouterKey !== 'product') {
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
      //重置
      handleReset (name) {
        this.categoryName = '';
        this.$refs[name].resetFields()
        this.getList('1', '10', this.formSearch)
      },
      //分页
      changePage (num) {
        this.getList(num, '10', this.formSearch)
      },
      exportTable () {
        this.$refs.formSubmit.submit()
      }
    }
  }
</script>