/**
* 收费项目弹窗选择组件
*/
<template>
  <Modal
    :title="placeHolder"
    width='700'
    v-model="modal"
    :closable="false"
    class-name="vertical-center-modal">
    <Form  :label-width="50" inline ref='formSearch' :model='formSearch'>
      <Form-item :label="$t('labelPublic.mc')" prop='name'>
        <Input v-model.trim="formSearch.name" :placeholder="$t('placeholderPublic.input')" @on-enter='getChargeList(formSearch, 1, 5)' :maxlength='15'></Input>
      </Form-item>
      <Form-item :label="$t('labelPublic.pym')" prop='pinyin'>
        <Input v-model.trim="formSearch.pinyin" :placeholder="$t('placeholderPublic.input')" @on-enter='getChargeList(formSearch, 1, 5)' :maxlength='15'></Input>
      </Form-item>
      <ul class="header-btn-group not-float">
        <li class="header-item" @click="getChargeList(formSearch, 1, 5)"><Icon type="search"></Icon>{{$t('publicSet.search')}}</li>
        <li class="header-item" @click="handleReset('formSearch')"><Icon type="refresh"></Icon>{{$t('publicSet.reset')}}</li>
      </ul>
    </Form>
    <Table stripe :columns="col" :data="chargeList" @on-row-click='choose'></Table>
    <Page :current="pageNumber" :total="total" :page-size='5' simple @on-change='changePage'></Page>
  </Modal>
</template>

<script>
	export default {
		name: 'chargeChoose',
    props: {
      placeHolder: String,
      openKey: Boolean
    },
    data () {
      return {
        pageNumber: 1,
        total: 0,
        modal: false,
        formSearch: {
          name: '',
          pinyin: '',
          categoryId: '',
        },
        chargeList: [],
        col: [
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
        ],
      }
    },
    watch: {
      openKey (val) {
        this.modal = true;
      }
    },
    mounted () {
      this.getChargeList(this.formSearch, 1, 5);
    },
    methods: {
      //收费项目
      getChargeList (form, pageNumber, pageSize) {
        let _vm = this;
        form.pageNumber = pageNumber;
        form.pageSize = pageSize;
        _vm.$http.get({
          url: 'guard-webManager/select/chargeList.jhtml',
          data: form,
          success: function(res){
            if(res.data.code === 0) {
              console.log(res)
              _vm.chargeList = res.data.content.page || [];
              _vm.pageNumber = res.data.content.pageNumber;
              _vm.total = res.data.content.total;
              const _col = _vm.tableCount(_vm.chargeList, ['price']);
              _col.map(item => {
                const index = _vm.col.findIndex(col => col.key === item.key);
                console.log(item)
                if(index >= 0) {
                  _vm.col[index].width = item.width;
                }
              });
            } else {
              console.log(res.data.desc);
            }
          },
          error: function(res){
            console.log(res);
          }
        });
      },
      choose (data) {
        this.$emit('on-change', data);
        this.modal = false;
      },
      handleReset (name) {
        this.$refs[name].resetFields();
        this.getChargeList(this.formSearch, 1, 5);
      },
      changePage (num) {
        this.getChargeList(this.formSearch, num, 5);
      },
    }
  }
</script>
