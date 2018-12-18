/**
* 套餐管理
*/

<template>
  <div class="container-box" ref="containerBox">
    <div class="container-header">
      <h2>{{$t('layoutNav.chargeSetManage')}}</h2>
      <ul class="header-btn-group">
        <li class="header-item" @click="toEdit('add')"><Icon type="plus-round"></Icon>{{$t('publicSet.add')}}</li>
      </ul>
    </div>
    <div class="container-body">
      <Form :label-width="90" :model="formSearch" ref='formSearch'>
        <Row type="flex" justify="start">
          <Col :xs='24' :sm='12' :md="8" :lg="6">
            <Form-item :label="$t('labelPublic.mc')" prop='name'>
              <Input :maxlength='20' v-model.trim="formSearch.name" :placeholder="$t('placeholderPublic.input')" @on-enter="getList(1, 10, formSearch)"></Input>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6">
            <Form-item :label="$t('labelPublic.pym')" prop='pinYin'>
              <Input :maxlength='20' v-model.trim="formSearch.pinYin" :placeholder="$t('placeholderPublic.input')" @on-enter="getList(1, 10, formSearch)"></Input>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6">
            <Form-item :label="$t('chargeSet.label')" prop="categoryId">
              <cmptInputOpen :value='categoryName' :placeholder="$t('chargeSet.modalTit3')" @on-open='addCategory' @on-clear='clearCategory'></cmptInputOpen>
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
              <li class="header-item"  @click="getList(1, 10, formSearch)"><Icon type="search"></Icon>{{$t('publicSet.search')}}</li>
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
    <cmptChargeCategoryChoose :placeHolder="$t('chargeSet.modalTit3')" @on-change="chooseCategory" :openKey='categoryOpenKey'></cmptChargeCategoryChoose>
  </div>
</template>

<script>
  import cmptChargeCategoryChoose from 'components/chargeCategoryChoose.vue';
  export default {
    components: {cmptChargeCategoryChoose},
    data () {
      return {
        formSearch: {
          name: '',
          pinYin: '',
          status: '',
          categoryId: '',
        },
        categoryName: '',
        categoryOpenKey: false,
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
            title: this.$t('labelPublic.mc'),
            width: 60,
            key: 'name'
          },
          {
            title: this.$t('labelPublic.pym'),
            width: 60,
            key: 'pinYin'
          },
          {
            title: this.$t('labelPublic.lx'),
            width: 60,
            key: 'categoryName'
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
            width: 70,
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
          }
        ],
        data: [],
        total: 0,
        totalPages: 0,
        pageNumber: 1,
      }
    },
    computed: {
      langRouterKey () {
        return this.$store.getters.getLandRouterKey;
      },
    },
    watch: {
      langRouterKey (val) {
        if(val === 'chargeSet') {
          this.getList(this.pageNumber, 10, this.formSearch);
        }
      },
    },
    created () {
      this.getList(1, 10, this.formSearch);
    },
    methods: {
      //获取分页
      getList(pageNumber, pageSize, form) {
        let _vm = this
        _vm.$store.dispatch('setPageLoading', -1)
        form['pageNumber'] = pageNumber
        form['pageSize'] = pageSize
        _vm.$http.getPage({
          url: 'guard-webManager/chargeSet/list.jhtml',
          data: form,
          success: function(res){
            const _data = res.data.content.content || [];
            const _col = _vm.tableCount(_data, ['price']);
            _col.map(item => {
              const index = _vm.columns.findIndex(col => col.key === item.key);
              console.log(item)
              if(index >= 0) {
                _vm.columns[index].width = item.width;
              }
            });
            if(_vm.langRouterKey !== 'chargeSet') {
              _vm.data = _data;
            } else {
              const props = ['name', 'categoryName'];
              _vm.requestList(_data, props).then(res => _vm.data = res);
            }
            _vm.total = res.data.content.total || 0;
            _vm.pageNumber = res.data.content.pageNumber || 1;
            _vm.totalPages = res.data.content.totalPages || 1;
            _vm.$store.dispatch('setPageLoading', 1);
          },
          error: function(res){
            console.log(res)
          }
        })
      },
      addCategory () {
        this.categoryOpenKey = !this.categoryOpenKey;
      },
      chooseCategory (data) {
        this.formSearch.categoryId = data.id;
        this.categoryName = data.name;
      },
      clearCategory () {
        this.formSearch.categoryId = '';
        this.categoryName = '';
      },
      toEdit (data) {
        let breadText = ''
        let id = ''
        if(typeof data == 'object') {
          breadText = 'chargeSet.modalTit2'
          id = data.id
        } else {
          breadText = 'chargeSet.modalTit1'
          id = data
        }
        let breadData = [
          {
            url: '/desktop',
            text: 'layoutNav.desk'
          },
          {
            url: '/chargeSet',
            text: 'layoutNav.chargeSetManage'
          },
          {
            url: '/chargeSetEdit',
            text: breadText
          }
        ];
        this.$store.dispatch('setBreadData', breadData);
        this.$router.push({
          path: '/chargeSetEdit',
          query: {
            id: id
          }
        })
      },
      remove (data) {
        let _vm = this;
        _vm.$Modal.confirm({
          title: _vm.$t('publicSet.noticeTit'),
          content: `<p>${_vm.$t('chargeSet.msg1')}</p>
          <p>${_vm.$t('chargeSet.msg2')}</p>
          <p>${_vm.$t('labelPublic.mc')}：${data.name}</p>`,
          onOk: () => {
            _vm.$http.post({
              url: 'guard-webManager/chargeSet/delete.jhtml',
              data: {id: data.id},
              success: function(res){
                if(res.data.code == 0) {
                  _vm.getList(1, 10, _vm.formSearch);
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('publicSet.noticeSuccess')
                  });
                } else {
                  if(_vm.langRouterKey !== 'chargeSet') {
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
    }
  }
</script>