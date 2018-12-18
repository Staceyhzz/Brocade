/** * 推荐人管理 */
<template>
	<div class="container-box">
		<div class="container-header">
		<h2>推荐人管理（暂无用）</h2>
		</div>
		<div class="container-body">
			<Form :label-width="60" inline ref='formSearch' :model='formSearch'>
				<Form-item label="编号" prop='id'>
				<Input @on-enter="getList('1', '10', formSearch)" :maxlength='15' v-model.trim="formSearch.id" placeholder="请输入编号"></Input>
				</Form-item>
				<Form-item label="姓名" prop='name'>
				<Input @on-enter="getList('1', '10', formSearch)" :maxlength='15' v-model.trim="formSearch.name" placeholder="请输入姓名"></Input>
				</Form-item>
				<Form-item label="手机号" prop='mobile'>
				<Input @on-enter="getList('1', '10', formSearch)" :maxlength='15' v-model.trim="formSearch.mobile" placeholder="请输入手机号"></Input>
				</Form-item>
				<ul class="header-btn-group not-float">
				<li class="header-item" @click="getList('1', '10', formSearch)">
					<Icon type="search"></Icon>查询</li>
				<li class="header-item" @click="handleReset('formSearch')">
					<Icon type="refresh"></Icon>重置</li>
				</ul>
			</Form>
			<Table stripe :columns="col" :data="data"></Table>
			<div class="table-page">
				<div class="table-info">当前第{{pageNumber}}页，共{{totalPages}}页，总共{{total}}条记录</div>
				<Page class="table-paginate" :total="total" @on-change='changePage' :current='pageNumber'></Page>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			total: 0,
			totalPages: 1,
			pageNumber: 1,
			formSearch: {
				id: '',
				name: '',
				mobile: '',
			},
			col: [
				{
					title: '序号',
					render: (h, params) => {
						const _index = (this.pageNumber - 1) * 10
						return h('span', params.index + 1 + _index)
					}
				},
				{
					title: '编号',
					key: 'id'
				},
				{
					title: '姓名',
					key: 'name',
					render: (h, params) => {
						return h('p', {
						on: {
							click: () => {
							this.toCus(params.row.id, params.row.name)
							}
						},
						style: {
							cursor: 'pointer',
							color: 'orange'
						}
						}, 
						[h('Icon', {
							props: {
							type: "person"
							}
						}),
						h('span', params.row.name)])
					}
				},
				{
					title: '手机',
					key: 'mobile'
				},
				{
					title: '注册时间',
					key: 'createtime'
				},
				{
					title: '客户编号',
					key: 'customerid'
				},
				{
					title: '入会状态',
					key: 'customerid'
				},
			],
			data: [],
		}
	},
	created() {
		// 获取推荐人管理列表
		this.getList('1', '10', this.formSearch)
	},
	methods: {
		getList(pageNumber, pageSize, form) {
			let _vm = this
			form['pageNumber'] = pageNumber
			form['pageSize'] = pageSize
			console.log(form)
			_vm.$store.dispatch('setPageLoading', -1)
			_vm.$http.getPage({
				url: 'guard-webManager/promoter/list.jhtml',
				data: form,
				success: function (res) {
					_vm.data = res.data.content.content
					_vm.total = res.data.content.total
					_vm.pageNumber = res.data.content.pageNumber
					_vm.totalPages = res.data.content.totalPages
					console.log('推荐人管理')
					console.log(res)
					_vm.$store.dispatch('setPageLoading', 1);
				},
				error: function (res) {
				console.log(res);
				}
			});
		},
		changePage(num) {
			this.getList(num, '10', this.formSearch)
		},
		handleReset(name) {
			this.$refs[name].resetFields()
			this.getList('1', '10', this.formSearch)
		},
		//跳转详情
		toCus(id, name) {
			let breadData = [{
				url: '/desktop',
				text: '桌面'
			},
			{
				url: '/promoter',
				text: '推荐人管理'
			},
				{
				url: '/promoterRecord',
				text: name
				}
			]
			this.$store.dispatch('setBreadData', breadData)
			this.$router.push({
				path: '/promoterRecord',
				query: {
				id: id
				}
			})
		},
	}
}

</script>
