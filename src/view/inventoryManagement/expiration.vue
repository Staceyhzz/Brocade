/** 
 * 库存有效期预警 
 */

<template>
  <div class="container-box">
    <div class="container-header">
      <h2>库存有效期预警</h2>
    </div>
    <div class="container-body">
      <Form :label-width="90" ref='formSearch' :model='formSearch'>
				<Row type="flex" justify="start">
          <Col :xs='24' :sm='12' :md="8" :lg="6">
						<Form-item label="编号" prop='productId'>
							<Input :maxlength='15' v-model.trim="formSearch.productId" placeholder="请输入编号" @on-enter='getList'></Input>
						</Form-item>
					</Col>
					<Col :xs='24' :sm='12' :md="8" :lg="6">
						<Form-item label="名称" prop='productName'>
							<Input :maxlength='15' v-model.trim="formSearch.productName" placeholder="请输入名称" @on-enter='getList'></Input>
						</Form-item>
					</Col>
					<Col :xs='24' :sm='12' :md="8" :lg="6">
						<Form-item label="拼音码" prop='productPinYin'>
							<Input :maxlength='15' v-model.trim="formSearch.productPinYin" placeholder="请输入拼音码" @on-enter='getList'></Input>
						</Form-item>
					</Col>
					<Col :xs='24' :sm='12' :md="8" :lg="6">
						<Form-item label="剩余仓库" prop='warehouseId'>
							<Select v-model="formSearch.warehouseId">
								<Option v-for="item in allWarehouseList" :value="item.id" :key="item.id">{{ item.name }}</Option>
							</Select>
						</Form-item>
					</Col>
					<Col :xs='24' :sm='12' :md="8" :lg="6">
						<Form-item label="分类" prop='productCategoryId'>
							<Select v-model="formSearch.productCategoryId">
								<Option v-for="item in typeList" :value="item.id" :key="item.id">{{ item.name }}</Option>
							</Select>
						</Form-item>
					</Col>
					<Col :xs='24' :sm='12' :md="8" :lg="6">
						<Form-item label="到期时间" prop='days'>
							<Select v-model="formSearch.days" clearable>
								<Option v-for="item in dayList" :value="item.val" :key="item.val">{{ item.text }}</Option>
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
          days: 7,
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
        dayList: [{
            text: '已过期',
            val: 0,
          },
          {
            text: '近7天',
            val: 7,
          },
          {
            text: '近15天',
            val: 15,
          },
          {
            text: '近30天',
            val: 30,
          },
          {
            text: '近90天',
            val: 90,
          },
          {
            text: '近180天',
            val: 180,
          },
          {
            text: '近360天',
            val: 360,
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
						title: '名称',
						width: 60,
            key: 'productName'
          },
          {
						title: '编号 ',
						width: 60,
            key: 'productid'
          },
          {
						title: '批号',
						width: 60,
            key: 'batch'
          },
          {
						title: '规格',
						width: 60,
            key: 'productSize'
          },
          {
						title: '类别',
						width: 60,
            key: 'productCategoryName'
          },
          {
						title: '单位',
						width: 60,
            key: 'productUnitName'
          },
          {
						title: '生产日期',
						width: 80,
            key: 'purchaseDate',
            render: (h, params) => {
              const _text = moment(params.row.purchaseDate).format('YYYY-MM-DD')
              return h('span', _text)
            }
          },
          {
						title: '有效期(天)',
						width: 60,
            render: (h, params) => {
              const a = moment().format('YYYY-MM-DD')
              const b = moment(params.row.expiration)
              const _text = b.diff(a, 'days')
              return h('span', _text)
            }
          },
          {
						title: '失效日期',
						width: 80,
            key: 'expiration',
            render: (h, params) => {
              const _text = moment(params.row.expiration).format('YYYY-MM-DD')
              return h('span', _text)
            }
          },
          {
						title: '单价',
						width: 60,
            key: 'price'
          },
          {
						title: '库存量',
						width: 60,
            key: 'num'
          },
          {
						title: '库存成本',
						width: 60,
            key: 'amount'
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
      allWarehouseList() {
        return this.$store.getters.getSelectHospitalWarehouseList
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
      this.$store.dispatch('setSelectHospitalWarehouseList', localStorage.getItem('hospId'))
      this.$store.dispatch('setSelectProductCategoryFirstList')
    },
    methods: {
      getList(pageNumber, form) {
				let _vm = this;
				form.pageNumber = pageNumber;
        _vm.$store.dispatch('setPageLoading', -1)
        _vm.$http.get({
          url: 'guard-webManager/expiration/list.jhtml',
          data: _vm.formSearch,
          success: function (res) {
            if (res.data.code == 0) {
              console.log(res)
							_vm.allList = res.data.content.AllList || [];
							_vm.data = res.data.content.pageNum.content || [];
							_vm.total = res.data.content.pageNum.total || 0;
							_vm.pageNumber = res.data.content.pageNum.pageNumber || 1;
							_vm.totalPages = res.data.content.pageNum.totalPages || 1;
							_vm.$store.dispatch('setPageLoading', 1)
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
        this.$refs[name].resetFields()
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
