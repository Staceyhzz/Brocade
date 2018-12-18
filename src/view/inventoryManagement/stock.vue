/** 
 * 库存查询 
 */
<template>
  <div class="container-box">
    <div class="container-header">
      <h2>库存查询</h2>
    </div>
    <div class="container-body">
      <Form :label-width="90" ref='formSearch' :model='formSearch'>
				<Row type="flex" justify="start">
          <Col :xs='24' :sm='12' :md="8" :lg="6">
						<Form-item label="仓库" prop='warehouseId'>
							<Select v-model="formSearch.warehouseId" clearable>
								<Option v-for="item in warehouseList" :value="item.id" :key="item.id">{{ item.name }}</Option>
							</Select>
						</Form-item>
					</Col>
					<Col :xs='24' :sm='12' :md="8" :lg="6">
						<Form-item label="编号" prop='productId'>
							<Input :maxlength='15' v-model.trim="formSearch.productId" placeholder="请输入编号" @on-enter="getList()"></Input>
						</Form-item>
					</Col>
					<Col :xs='24' :sm='12' :md="8" :lg="6">
						<Form-item label="名称" prop='productName'>
							<Input :maxlength='15' v-model.trim="formSearch.productName" placeholder="请输入名称" @on-enter="getList()"></Input>
						</Form-item>
					</Col>
					<Col :xs='24' :sm='12' :md="8" :lg="6">
						<Form-item label="拼音码" prop='productPinYin'>
							<Input :maxlength='15' v-model.trim="formSearch.productPinYin" placeholder="请输入拼音码" @on-enter="getList()"></Input>
						</Form-item>
					</Col>
					<Col :xs='24' :sm='12' :md="8" :lg="6">
						<Form-item label="分类" prop='productCategoryId'>
							<Select v-model="formSearch.productCategoryId" clearable>
								<Option v-for="item in typeList" :value="item.id" :key="item.id">{{ item.name }}</Option>
							</Select>
						</Form-item>
					</Col>
					<Col :xs='24' :sm='12' :md="8" :lg="6">
						<Form-item label="库存" prop='compare'>
							<Select v-model="formSearch.compare" style="width:50px">
								<Option v-for="item in compareList" :key="item.name" :label="item.name" :value="item.name">{{item.name}}</Option>
							</Select>
							<cmptInputNumber :min="0" :max='1000000' v-model="formSearch.num" style="width:80px"></cmptInputNumber>
						</Form-item>
					</Col>
					<Col :xs='24' :sm='12' :md="8" :lg="6">
						<ul class="header-btn-group">
							<li class="header-item" @click="getList(1, formSearch)">
								<Icon type="search"></Icon>查询</li>
							<li class="header-item" @click="handleReset('formSearch')">
								<Icon type="refresh"></Icon>重置</li>
						</ul>
					</Col>
				</Row>
      </Form>
      <Table stripe :columns="col" :data="data"></Table>
			<div class="table-page">
        <div class="table-info">{{$t('publicSet.pageMsg', [pageNumber, totalPages, total])}}</div>
        <Page class="table-paginate" :total="total" @on-change='changePage' :current='pageNumber' show-elevator></Page>
      </div>
      <p class="sumCount">合计：
        <span>库存量：{{numAll}}</span>
        <span>库存成本：{{amountAll}}</span>
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
				total: 0,
        totalPages: 0,
        pageNumber: 1,
        formSearch: {
					pageSize: 10,
          warehouseId: '',
          productId: '',
          productName: '',
          productPinYin: '',
					productCategoryId: '',
					compare: '>=',
          num: 0,
				},
				compareList: [{
            name: '>=',
          },
          {
            name: '>',
          },
          {
            name: '=',
          },
          {
            name: '<=',
          },
          {
            name: '<',
          },
        ],
        col: [
					{
            title: '序号',
            type: 'index',
            width: 60
          },
          {
						title: '仓库',
						width: 60,
            key: 'warehouseName'
          },
          {
						title: '编号',
						width: 60,
            key: 'productid'
          },
          {
						title: '名称',
						width: 60,
            key: 'productName'
          },
          {
						title: '规格',
						width: 60,
            key: 'productSize'
          },
          {
						title: '单位',
						width: 60,
            key: 'productUnitName'
          },
          {
						title: '拼音码',
						width: 60,
            key: 'productPinYin'
          },
          {
						title: '类别',
						width: 60,
            key: 'productCategoryName'
          },
          {
						title: '库存数量',
						width: 60,
            key: 'num'
          },
          {
						title: '成本单价',
						width: 60,
            render: (h, params) => {
              const _text = (params.row.amount / params.row.num).toFixed(2)
              return h('span', _text)
            }
          },
          {
						title: '库存成本',
						width: 60,
            render: (h, params) => {
              const _text = params.row.amount.toFixed(2)
              return h('span', _text)
            }
          },
        ],
				data: [],
				allList: [],
      }
    },
    computed: {
      typeList() {
        return this.$store.getters.getSelectProductCategoryFirstList
      },
      warehouseList() {
        return this.$store.getters.getSelectUserWarehouseList
      },
      numAll() {
        return this.allList.reduce((pre, cur) => cur.num + pre, 0);
      },
      amountAll() {
        const num = this.allList.reduce((pre, cur) => cur.amount + pre, 0);
        return num.toFixed(2);
      },
    },
    created() {
      this.getList(1, this.formSearch);
    },
    mounted() {
      this.$store.dispatch('setSelectUserWarehouseList', localStorage.getItem('userId'))
      this.$store.dispatch('setSelectProductCategoryFirstList')
    },
    methods: {
      getList(pageNumber, form) {
				let _vm = this;
				form.pageNumber = pageNumber;
        _vm.$store.dispatch('setPageLoading', -1)
        _vm.$http.get({
          url: 'guard-webManager/stock/list.jhtml',
          data: _vm.formSearch,
          success: function (res) {
            if (res.data.code == 0) {
							_vm.allList = res.data.content.AllList || [];
							_vm.data = res.data.content.pageNum.content || [];
							_vm.total = res.data.content.pageNum.total || 0;
							_vm.pageNumber = res.data.content.pageNum.pageNumber || 1;
							_vm.totalPages = res.data.content.pageNum.totalPages || 1;
              _vm.$store.dispatch('setPageLoading', 1);
              
            } else {
              console.log(res.data.desc)
            }
          },
          error: function (res) {
						console.log(res);
          }
        });
      },
      //重置
      handleReset(name) {
				this.$refs[name].resetFields();
				this.formSearch.num = 0;
        this.getList(1, this.formSearch);
			},
			changePage (num) {
        this.getList(num, this.formSearch);
      },
    }
  }

</script>

<style scoped>
  .sumCount {
    padding: 15px 0;
  }

  .sumCount span {
    margin: 0px 15px;
  }

</style>
