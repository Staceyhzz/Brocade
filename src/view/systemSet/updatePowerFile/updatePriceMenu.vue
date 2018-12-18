/**
* 设置进价查看
*/

<template>
  <div class="container-box update-price-menu">
    <div class="container-header">
      <h2>{{$t('userAuthCustomSet.msg6')}}</h2>
    </div>
    <div class="container-body">
      <div class="customer-item">
        <div class="customer-item-title">
          <h3><Icon type="pricetag"></Icon>{{$t('userUpdatePriceMenu.tit1')}}</h3>
        </div>
      </div>
      <RadioGroup v-model="formAdd.type" class='type'>
        <Radio label="all">{{$t('userCheck.price3')}}</Radio>
        <Radio label="parthide">{{$t('userCheck.price1')}}</Radio>
        <Radio label="allhide">{{$t('userCheck.price2')}}</Radio>
      </RadioGroup>
      <div class="customer-item">
        <div class="customer-item-title">
          <h3><Icon type="pricetag"></Icon>{{$t('userUpdatePriceMenu.tit2')}}</h3>
          <Button type="primary" icon="plus-round" size='small' class='btn' :disabled='!btnKey' @click='show'>{{$t('userUpdatePriceMenu.btn')}}</Button>
        </div>
      </div>
      <p class='msg'>{{$t('userUpdatePriceMenu.msg')}}</p>
      <Table stripe :columns="col" :data="data"></Table>
      <div class="footer-btnGroup">
        <Button type="primary"  icon="checkmark" @click='save' :loading='saveLoad'>{{$t('publicSet.save')}}</Button>
        <Button type="primary"  icon="android-arrow-back" @click='back'>{{$t('publicSet.back')}}</Button>
      </div>
    </div>
    <Modal
      :title="$t('userUpdatePriceMenu.modalTit')"
      v-model="modal"
      :closable="false"
      @on-ok="ok"
      width='700'
      class-name="vertical-center-modal">
      <Form :label-width="60" inline :model="formSearch" ref='formSearch'>
        <Form-item :label="$t('userUpdatePriceMenu.label')" prop='content' :label-width="100">
          <Input v-model.trim="formSearch.content" :placeholder="$t('placeholderPublic.input')" @on-enter="getSearch(1, formSearch)"></Input>
        </Form-item>
        <Form-item :label="$t('labelPublic.lx')" prop='categoryId'>
          <Input v-model="categoryName" readonly icon="ios-search" :placeholder="$t('userUpdatePriceMenu.placeholder')" @on-focus="showProduct"></Input>
        </Form-item>
        <ul class="header-btn-group not-float">
          <li class="header-item"  @click="getSearch(1, formSearch)"><Icon type="search"></Icon>{{$t('publicSet.search')}}</li>
          <li class="header-item" @click="handleReset('formSearch')"><Icon type="refresh"></Icon>{{$t('publicSet.reset')}}</li>
        </ul>
        <Table stripe :columns="columns" :data="data1" @on-selection-change='setChange'></Table>
        <Page :current="pageNumber" :total="total" simple @on-change='changePage'></Page>
      </Form>
    </Modal>
    <Modal
      :title="$t('userUpdatePriceMenu.placeholder')"
      width='400'
      v-model="modal1"
      :closable="false"
      class-name="vertical-center-modal">
      <Table height="350" stripe :columns="col1" :data="productList" @on-row-click='setProduct'></Table>
    </Modal>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        pageNumber: 1,
        total: 0,
        categoryName: '',
        saveLoad: false,
        key: true,
        modal: false,
        modal1: false,
        formAdd: {
          id: '',
          type: 'all',
          productList: ''
        },
        formSearch: {
          content: '',
          categoryId: '',
          status: 1,
          pageSize: 10
        },
        col: [
          {
            title: this.$t('labelPublic.bh'),
            key: 'id'
          },
          {
            title: this.$t('labelPublic.lx'),
            key: 'categoryName'
          },
          {
            title: this.$t('labelPublic.mc'),
            key: 'name'
          },
          {
            title: this.$t('labelPublic.pym'),
            key: 'pinYin'
          },
          {
            title: this.$t('labelPublic.gg'),
            key: 'size'
          },
          {
            title: this.$t('labelPublic.dw'),
            key: 'unitName'
          },
          {
            title: this.$t('publicSet.tableAction'),
            key: 'action',
            width: 70,
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
        columns: [
          {
            type: 'selection',
            width: 40,
            align: 'center'
          },
          {
            title: this.$t('labelPublic.bh'),
            key: 'id'
          },
          {
            title: this.$t('labelPublic.lx'),
            key: 'categoryName'
          },
          {
            title: this.$t('labelPublic.mc'),
            key: 'name'
          },
          {
            title: this.$t('labelPublic.pym'),
            key: 'pinYin'
          },
          {
            title: this.$t('labelPublic.gg'),
            key: 'size'
          },
          {
            title: this.$t('labelPublic.dw'),
            key: 'unitName'
          }
        ],
        col1: [
          {
            title: this.$t('labelPublic.mc'),
            key: 'name',
            render: (h, params) => {
              const level = params.row.level * 20 + 'px'
              return h('span', {
                style: {
                  paddingLeft: level
                }
              }, params.row.name)
            }
          },
        ],
        data1: [],
        data: [],
        productList: [],
        selectBox: [],
      }
    },
    computed: {
      btnKey () {
        if(this.formAdd.type === 'parthide') {
          return true
        } else {
          return false
        }
      },
    },
    created () {
      if(this.$route.query.type === 'user') {
        this.key = true
      } else if(this.$route.query.type === 'role') {
        this.key = false
      }
      this.formAdd.id = this.$route.query.id
      this.getList()
    },
    mounted () {
      this.getSearch(1, this.formSearch)
      this.getProductList()
    },
    methods: {
      getList () {
        let _vm = this,
        _url = ''
        if(_vm.key) {
          _url = 'guard-webManager/userAuthCustom/record.jhtml'
        } else {
          _url = 'guard-webManager/role/config.jhtml'
        }
        _vm.$store.dispatch('setPageLoading', -1)
        _vm.$http.getPage({
          url: _url,
          data: {id: _vm.$route.query.id},
          success: function(res){
            console.log(res.data.content)
            _vm.data = res.data.content.productList || []
            _vm.formAdd.type = res.data.content.priceHideAuth || 'all'
            _vm.$store.dispatch('setPageLoading', 1);
          },
          error: function(res){
            console.log(res)
          }
        })
      },
      getSearch(pageNumber, form) {
        let _vm = this
        form.pageNumber = pageNumber
        _vm.$http.get({
          url: 'guard-webManager/product/page.jhtml',
          data: form,
          success: function(res){
            if(res.data.code === 0){
              console.log(res.data.content)
              _vm.data1 = res.data.content.page.content || []
              _vm.total = res.data.content.page.total || 0
              _vm.pageNumber = res.data.content.page.pageNumber || 1
            } else {
              console.log(res.data.desc)
            }
          },
          error: function(res){
            console.log(res)
          }
        })
      },
      getProductList () {
        let _vm = this
        _vm.$http.get({
          url: 'guard-webManager/select/productCategoryList.jhtml',
          success: function(res){
            if(res.data.code === 0) {
              _vm.productList = res.data.content || []
            } else {
              console.log(res.data.desc)
            }
          },
          error: function(res){
            console.log(res)
          }
        });
      },
      show () {
        this.modal = true
      },
      showProduct () {
        this.modal1 = true
      },
      setChange (data) {
        this.selectBox = data
      },
      setProduct (data) {
        this.categoryName = data.name
        this.formSearch.categoryId = data.id
        this.modal1 = false
      },
      changePage (num) {
        this.getSearch(num, this.formSearch)
      },
      handleReset (name) {
        this.$refs[name].resetFields()
        this.categoryName = ''
        this.getSearch(1, this.formSearch)
      },
      ok () {
        this.selectBox.map(item => {
          const _index = this.data.findIndex(product => product.id === item.id)
          if(_index < 0) {
            this.data.push(item)
          }
        })
        this.modal = false
      },
      remove (index) {
        this.data.splice(index, 1)
      },
      save () {
        let _vm = this,
        _url = ''
        if(_vm.key) {
          _url = 'guard-webManager/userAuthCustom/updatePriceAuth.jhtml'
        } else {
          _url = 'guard-webManager/role/updatePriceAuthEdit.jhtml'
        }
        _vm.saveLoad = true
        const _ids = _vm.data.map(item => item.id)
        _vm.formAdd.productList = _ids.join(',')
        _vm.$http.post({
          url: _url,
          data: _vm.formAdd,
          success: function(res){
            if(res.data.code === 0){
              _vm.$router.back(-1)
              _vm.$Notice.success({
                title: _vm.$t('publicSet.noticeTit'),
                desc: _vm.$t('publicSet.noticeSuccess')
              });
            } else {
              _vm.$Notice.error({
                title: _vm.$t('publicSet.noticeTit'),
                desc: res.data.desc
              });
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
      }
    }
  }
</script>

<style scoped lang='less'>
  .update-price-menu {
    .type {
      padding-left: 20px;
      margin-bottom: 20px;
    }
    label {
      margin-right: 30px;
    }
    .msg {
      padding-left: 20px;
      margin-bottom: 10px;
      font-size: 12px;
    }
    .btn {
      float: right;
    }
  }
</style>