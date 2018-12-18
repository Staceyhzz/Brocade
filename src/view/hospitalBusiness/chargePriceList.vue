/** 
 * 价格手册 
 */

<template>
  <div class="container-box">
    <div class="container-header">
      <h2>{{$t('layoutNav.chargePriceList')}}</h2>
    </div>
    <div class="container-body">
      <div class="chargeList">
        <div class="chargeLeft">
          <Tree :data="treeData" ref='treeList' @on-select-change='chooseTree'></Tree>
        </div>
        <div class="chargeRight">
          <Row :gutter="16" style='marginBottom:16px;'>
            <Col span="5">
							<Select v-model="formSearch.type">
								<Option :value="1">{{$t('chargePriceList.type1')}}</Option>
								<Option :value="2">{{$t('chargePriceList.type2')}}</Option>
								<Option :value="3">{{$t('chargePriceList.type3')}}</Option>
							</Select>
            </Col>
            <Col span="11">
            	<Input type="text" :maxlength='20' v-model.trim="formSearch.name" :placeholder="$t('chargePriceList.placeholder')" @on-enter="getList(formSearch, 1, 10)"></Input>
            </Col>
            <Col span="4">
            	<Button type="primary" long @click='getList(formSearch, 1, 10)'>{{$t('publicSet.search')}}</Button>
            </Col>
            <Col span="4">
            	<Button type="primary" long @click="handleReset('formSearch')">{{$t('publicSet.reset')}}</Button>
            </Col>
          </Row>
          <Table stripe :columns="col" :data="data"></Table>
          <div class="table-page">
            <div class="table-info">{{$t('publicSet.pageMsg', [pageNumber, totalPages, total])}}</div>
            <Page class="table-paginate" :total="total" @on-change='changePage' :current='pageNumber' show-elevator></Page>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        pageNumber: 1,
        totalPages: 1,
        total: 0,
        formSearch: {
          name: '',
          type: 1,
          categoryId: '',
        },
        col: [
					{
						title: this.$t('labelPublic.lx'),
						width: 80,
            key: 'categoryName'
          },
          {
						title: this.$t('labelPublic.mc'),
						width: 80,
            key: 'name'
          },
          {
						title: this.$t('chargePriceList.colTit'),
						width: 80,
            render: (h, params) => {
              if (params.row.detailList) {
                const box = params.row.detailList.split(',') || [];
                return h('ul', {
                  style: {
                    padding: '5px 0'
                  }
                }, box.map(item => {
                  return h('li', {
                    style: {
                      padding: '5px 0'
                    }
                  }, item)
                }))
              }
            }
          },
          {
						title: this.$t('labelPublic.bh'),
						width: 60,
            key: 'id'
          },
          {
						title: this.$t('labelPublic.pym'),
						width: 60,
            key: 'pinYin'
          },
          {
						title: this.$t('labelPublic.dw'),
						width: 60,
            key: 'unitName'
          },
          {
						title: this.$t('labelPublic.gg'),
						width: 60,
            key: 'size'
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
        ],
        data: [],
        treeData: [],
      }
		},
		computed: {
      langRouterKey () {
        return this.$store.getters.getLandRouterKey;
      },
    },
    watch: {
      langRouterKey (val) {
        if(val === 'chargePriceList') {
          this.getList(this.formSearch, 1, 10);
      		this.getTree();
        }
      },
    },
    created() {
      this.getList(this.formSearch, 1, 10);
      this.getTree();
    },
    methods: {
      getList(form, pageNumber, pageSize) {
        let _vm = this;
        form.pageSize = pageSize
        form.pageNumber = pageNumber
        _vm.$store.dispatch('setPageLoading', -1)
        _vm.$http.getPage({
          url: 'guard-webManager/liveDesk/serachCharge.jhtml',
          data: form,
          success: function (res) {
            const _data = res.data.content.content.map(item => {
              let obj = {
                ...item
              };
              if(obj.detailList && obj.detailList.length) {
                obj.detailList = obj.detailList.map(i => i.chargeName).join(',') || '';
              } else {
                obj.detailList = '';
              }
              return obj;
            }) || [];
            const _col = _vm.tableCount(_data, ['price']);
            _col.map(item => {
              const index = _vm.col.findIndex(col => col.key === item.key);
              console.log(item)
              if(index >= 0) {
                _vm.col[index].width = item.width;
              }
            });
            if(_vm.langRouterKey !== 'chargePriceList') {
              _vm.data = _data;
            } else {
              _vm.requestList(_data, ['categoryName', 'name', 'unitName', 'size', 'detailList']).then(res => _vm.data = res);
            }
            _vm.pageNumber = res.data.content.pageNumber || 1
            _vm.total = res.data.content.total || 0
            _vm.totalPages = res.data.content.totalPages || 1
            _vm.$store.dispatch('setPageLoading', 1);
          },
          error: function (res) {
            console.log(res)
          }
        })
      },
      getTree() {
        let _vm = this
        _vm.$http.get({
          url: 'guard-webManager/chargeCategory/list.jhtml',
          success: function (res) {
            if (res.data.code === 0) {
              console.log(res)
              let _data = res.data.content.map(item => {
                return {
                  id: item.id,
                  title: item.name,
                  level: item.level
                };
              }) || [];
              if(_vm.langRouterKey !== 'chargePriceList') {
                _vm.treeData = _vm.getTypeTree(_data, ['title', 'id'], false);
              } else {
                _vm.requestList(_data, ['title']).then(res => _vm.treeData = _vm.getTypeTree(res, ['title', 'id'], false));
              }
            }
          },
          error: function (res) {
            console.log(res)
          }
        })
      },
      chooseTree(data) {
        console.log(data)
        if (data.length) {
          this.formSearch.categoryId = data[0].id
        } else {
          this.formSearch.categoryId = ''
        }
        this.getList(this.formSearch, 1, 10)
      },
      changePage(num) {
        this.getList(this.formSearch, num, 10)
      },
      handleReset(name) {
        if(this.formSearch.categoryId) {
          this.$refs.treeList.getSelectedNodes()[0].selected = false;
        }
        this.formSearch.name = ''
        this.formSearch.categoryId = ''
        this.formSearch.type = 1
        this.getList(this.formSearch, 1, 10)
      },
    }
  }

</script>

<style scoped>
  .chargeList {
    overflow: hidden;
    width: 100%;
  }

  .chargeLeft {
		overflow: auto;
    float: left;
    width: 25%;
		height: 600px;
    padding: 0 20px;
  }

  .chargeRight {
    float: left;
    width: 75%;
  }

</style>
