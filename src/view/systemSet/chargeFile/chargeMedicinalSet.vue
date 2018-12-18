/**
* 修改项目耗材
*/

<template>
  <div class="container-box">
    <div class="container-header">
      <h2>{{$t('charge.modalTit4')}}</h2>
    </div>      
    <div class="container-body">
      <Alert>
        <p>{{$t('chargeMedicinalSet.msg')}}</p>
      </Alert>
      <Form ref="formEdit" :model='formEdit' label-position="left" style='margin-top:10px;'>   
        <Form-item prop="detailListStr" required :label-width="1"> 
          <Table stripe :columns="editCol" :data="editData"></Table>
        </Form-item>
        <Form-item :label="$t('chargeMedicinalSet.label3')" prop="productAdd" :label-width="150">
          <Radio-group v-model="formEdit.productAdd">
            <Radio :label="1">{{$t('chargeMedicinalSet.label4')}}</Radio>
            <Radio :label="0">{{$t('chargeMedicinalSet.label5')}}</Radio>
          </Radio-group>
        </Form-item>
      </Form>
      <div class="footer-btnGroup">
        <Button type="primary"  icon="checkmark"  @click='save' :loading='saveLoad'>{{$t('publicSet.save')}}</Button>
        <Button type="primary"  icon="android-arrow-back" @click='back'>{{$t('publicSet.back')}}</Button>
      </div>
    </div>
    <div class="container-header">
      <h2>{{$t('chargeMedicinalSet.tit')}}</h2>
    </div>
    <div class="container-body charge-med-set">
      <Form :label-width="60" inline :model="formSearch" ref='formSearch'>
        <Form-item :label="$t('labelPublic.mc')" prop='name'>
          <Input @on-enter="getList(1, formSearch)" :maxlength='20' v-model.trim="formSearch.name" :placeholder="$t('placeholderPublic.input')"></Input>
        </Form-item>
        <Form-item :label="$t('labelPublic.pym')" prop='pinyin'>
          <Input @on-enter="getList(1, formSearch)" :maxlength='20' v-model.trim="formSearch.pinyin" :placeholder="$t('placeholderPublic.input')"></Input>
        </Form-item>
        <Form-item :label="$t('labelPublic.lx')" prop='categoryId'>
          <cmptInputOpen :value='categoryName' :placeholder="$t('chargeMedicinalSet.placeHolder')" @on-open='addCategory' @on-clear='clearCategory'></cmptInputOpen>
        </Form-item>
        <ul class="header-btn-group not-float">
          <li class="header-item"  @click="getList(1, formSearch)"><Icon type="search"></Icon>{{$t('publicSet.search')}}</li>
          <li class="header-item" @click="handleReset('formSearch')"><Icon type="refresh"></Icon>{{$t('publicSet.reset')}}</li>
        </ul>
      </Form>
      <Table :columns="addCol" :data="addData" stripe></Table>
      <div class="table-page">
        <div class="table-info">{{$t('publicSet.pageMsg', [pageNumber, totalPages, total])}}</div>
        <Page class="table-paginate" :total="total" @on-change='changePage' :current='pageNumber' :page-size='5'></Page>
      </div>
    </div>
    <cmptProductCategoryChoose :placeHolder="$t('chargeMedicinalSet.placeHolder')" @on-change="chooseCategory" :openKey='categoryOpenKey'></cmptProductCategoryChoose>
  </div>
</template>

<script>
  import cmptProductCategoryChoose from 'components/productCategoryChoose.vue';
  export default {
    components: {cmptProductCategoryChoose},
    data () {
      return {
        saveLoad: false,
        formEdit: {
          id: '',
          productAdd: 1,
          detailListStr: '',
        },

        pageNumber: 1,
        totalPages: 1,
        total: 0,
        formSearch: {
          id: '',
          name: '',
          pinyin: '',
          categoryId: '',
        },

        categoryName: '',
        categoryOpenKey: false,

        editCol: [
          {
            title: this.$t('labelPublic.bh'),
            width: 60,
            key: 'productId'
          },
          {
            title: this.$t('labelPublic.mc'),
            width: 60,
            key: 'productName'
          },
          {
            title: this.$t('labelPublic.gg'),
            width: 60,
            key: 'productSize'
          },
          {
            title: this.$t('labelPublic.dw'),
            width: 60,
            key: 'productUnitName'
          },
          {
            title: this.$t('chargeMedicinalSet.label1'),
            width: 90,
            render: (h, params) => {
              return h('cmptInputNumber', {
                props: {
                  size: 'small',
                  min: 1,
                  max: 1000000,
                  value: params.row.num
                },
                on: {
                  'on-change': (val) => {
                    params.row.num = parseInt(val);
                    this.editData[params.index] = params.row;
                  },
                  'on-blur': () => {
                    this.editData.splice(params.index, 1, this.editData[params.index]);
                  }
                }
              })
            }
          },
          {
            title: this.$t('chargeMedicinalSet.label2'),
            width: 90,
            render: (h, params) => {
              return h('cmptInputNumber', {
                props: {
                  size: 'small',
                  min: 0,
                  max: 1000000,
                  value: params.row.maxNum
                },
                on: {
                  'on-change': (val) => {
                    params.row.maxNum = parseInt(val);
                    this.editData[params.index] = params.row;
                  },
                  'on-blur': () => {
                    this.editData.splice(params.index, 1, this.editData[params.index]);
                  }
                }
              })
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
                    type: 'error',
                    size: 'small',
                    icon: 'ios-trash-outline'
                  },
                  on: {
                    click: () => {
                      this.remove(params.index)
                    }
                  }
                }, this.$t('publicSet.del')),
                ])
            }
          }
        ],
        addCol: [
          {
            title: this.$t('labelPublic.bh'),
            width: 60,
            key: 'id'
          },
          {
            title: this.$t('labelPublic.mc'),
            width: 60,
            key: 'name'
          },
          {
            title: this.$t('labelPublic.gg'),
            width: 60,
            key: 'size'
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
            title: this.$t('publicSet.tableAction'),
            key: 'action',
            width: 80,
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small',
                    icon: 'checkmark'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.chooseCol(params.row)
                    }
                  }
                }, this.$t('chargeMedicinalSet.btn'))
                ])

            }
          },
        ],
        editData: [],
        addData:  [],
      }
    },
    computed: {
      setSave () {
        const _data = this.editData.map(item => {
          return {
            productID: item.productId,
            num: item.num,
            maxNum: item.maxNum
          }
        });
        return JSON.stringify(_data);
      },
    },
    created () {
      this.getId(this.$route.query.id)
      this.formEdit.id = this.$route.query.id
    },
    mounted () {
      this.getList(1, this.formSearch)
    },
    methods: {
      // 获取资料
      getId (id) {
        let _vm = this
        _vm.$store.dispatch('setPageLoading', -1)
        _vm.$http.getPage({
          url: 'guard-webManager/charge/get.jhtml',
          data: {id: id},
          success: function(res){
            console.log(res)
            _vm.editData = res.data.content.detailList.map(item => {
              return {
                productId: item.productid,
                productName: item.productName,
                productSize: item.productSize,
                productUnitName: item.productUnitName,
                num: item.num
                  ? item.num
                  : 1,
                maxNum: item.maxnum
                  ? item.maxnum
                  : 0
              };
            }) || [];
            _vm.formEdit.productAdd = res.data.content.productAdd === 0 
              ? 0 
              : 1;
            _vm.$store.dispatch('setPageLoading', 1);
          },
          error: function(res){
            console.log(res)
          }
        })
      },
      //查询项目
      getList (pageNumber, form) {
        let _vm = this
        form.pageNumber = pageNumber
        form.pageSize = 5
        _vm.$http.get({
          url: 'guard-webManager/select/productList.jhtml',
          data: form,
          success: function(res){
            if(res.data.code === 0) {
              _vm.addData = res.data.content.list || []
              _vm.pageNumber = res.data.content.pageNumber || 1
              _vm.total = res.data.content.total || 0
              _vm.totalPage = res.data.content.totalPage || 0
            } else {
              console.log(res)
            }
          },
          error: function(res){
            console.log(res)
          }
        })
      },
      //获取类型
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
      chooseCol (data) {
        const _index = this.editData.findIndex(item => item.productId === data.id);
        if(_index < 0) {
          this.editData.push({
            productId: data.id,
            productName: data.name,
            productSize: data.size,
            productUnitName: data.unitName,
            num: 1,
            maxNum: 0,
          });
        }
      },
      remove (index) {
        this.editData.splice(index, 1)
      },
      //重置
      handleReset (name) {
        this.categoryName = '';
        this.$refs[name].resetFields()
        this.getList(1, this.formSearch)
      },
      save () {
        let _vm = this
        _vm.formEdit.detailListStr = _vm.setSave
        console.log(_vm.formEdit)
        _vm.saveLoad = true
        _vm.$http.post({
          url: 'guard-webManager/charge/updateProduct.jhtml',
          data: _vm.formEdit,
          success: function(res){
            if(res.data.code === 0) {
              _vm.$router.back(-1)
              _vm.$Notice.success({
                title: _vm.$t('publicSet.noticeTit'),
                desc: _vm.$t('publicSet.noticeSuccess')
              });
            } else {
              _vm.$Notice.error({
                title: _vm.$t('publicSet.noticeTit'),
                desc: res.data.desc
              })
              _vm.saveLoad = false
            }
          },
          error: function(res){
            console.log(res)
          }
        })
      },
      back () {
        this.$router.back(-1)
      },
      changePage (num) {
        this.getList(num, this.formSearch)
      }
    }
  }
</script>   

<style scoped>
 .charge-med-set {
    padding-bottom: 30px;
  }
</style>