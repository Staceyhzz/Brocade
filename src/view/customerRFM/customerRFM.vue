/**
* 顾客运营页面
*/

<template>
	<div class="container-box cus-RFM">
		<div class="container-header">
			<h2>顾客运营</h2>
		</div>
		<div class="container-body">
			<div class="tit">
				<h3>检索</h3>
				<span @click='showSearch'>
					<Icon type="eye" v-if='searchKey'></Icon>
					<Icon type="eye-disabled" v-else class='down'></Icon>
				</span>
			</div>
			<Form :label-width="90" :model="formSearch" ref='formSearch' label-position="right" v-show='searchKey'>
				<Row>
					<Col :sm='12' :md="8" :lg="6">
						<Form-item label="登记日期" prop='registerStartDate'>
							<Date-picker :transfer='true' type="daterange" placement="bottom" placeholder="选择日期" :options='options' @on-change='setCreateTime' ref='createDate' style='width:100%'></Date-picker>
						</Form-item>
					</Col>
					<Col :sm='12' :md="8" :lg="6">
						<Form-item label="初诊日期" prop='firstVisitStart'>
							<Date-picker :transfer='true' type="daterange" placement="bottom" placeholder="选择日期" :options='options' @on-change='setFirstTime' ref='firstDate' style='width:100%'></Date-picker>
						</Form-item>
					</Col>
					<Col :sm='12' :md="8" :lg="6">
						<Form-item label="顾客姓名" prop='name'>
							<Input v-model.trim="formSearch.name" placeholder="请输入顾客姓名" @on-enter="getCusList(1, formSearch)" :maxlength='20'></Input>
						</Form-item>
					</Col>
					<Col :sm='12' :md="8" :lg="6">
						<Form-item label="顾客编号" prop='id'>
							<Input v-model.trim="formSearch.id" placeholder="请输入顾客编号" @on-enter="getCusList(1, formSearch)" :maxlength='15'></Input>
						</Form-item>
					</Col>
					<Col :sm='12' :md="8" :lg="6">
						<Form-item label="咨询项目" prop='symptomId'>
							<Select v-model="formSearch.symptomId" clearable>
								<Option v-for="item in symptomList" :value="item.id" :key="item.id" :disabled="item.status == 0">{{ item.name }}</Option>
							</Select>
						</Form-item>
					</Col>
					<Col :sm='12' :md="8" :lg="6">
						<Form-item label="收费项目" prop='chargeId'>
							<Input v-model="chargeName" readonly icon="ios-search" placeholder="选择收费项目" @on-focus="showCharge"></Input>
						</Form-item>
					</Col>
					<Col :sm='12' :md="8" :lg="6">
						<Form-item label="R值" prop='r'>
							<Select v-model="formSearch.r" clearable>
								<Option :value="0">-</Option>
								<Option :value="1">活跃顾客</Option>
								<Option :value="2">睡眠顾客</Option>
								<Option :value="3">流失顾客</Option>
							</Select>
						</Form-item>
					</Col>
					<Col :sm='12' :md="8" :lg="6">
						<Form-item label="F值" prop='f'>
							<Select v-model="formSearch.f" clearable>
								<Option :value="0">-</Option>
								<Option :value="1">新顾客</Option>
								<Option :value="2">成熟顾客</Option>
								<Option :value="3">忠诚顾客</Option>
							</Select>
						</Form-item>
					</Col>
					<Col :sm='12' :md="8" :lg="6">
						<Form-item label="M值" prop='m'>
							<Select v-model="formSearch.m" clearable>
								<Option :value="0">-</Option>
								<Option :value="1">低贡献顾客</Option>
								<Option :value="2">中贡献顾客</Option>
								<Option :value="3">高贡献顾客</Option>
							</Select>
						</Form-item>
					</Col>
					<Col :sm='12' :md="8" :lg="6">
						<Form-item label="开发人员" prop='exploitUserId'>
							<Input v-model="exploitUser" readonly icon="ios-search" placeholder="选择开发人员" @on-focus="showUser(1)"></Input>
						</Form-item>
					</Col>
					<Col :sm='12' :md="8" :lg="6">
							<Form-item label="咨询人员" prop='managerUserId'>
								<Input v-model="managerUser" readonly icon="ios-search" placeholder="选择咨询人员" @on-focus="showUser(2)"></Input>
							</Form-item>
					</Col>
					<Col :sm='12' :md="8" :lg="6">
						<Form-item label="客户组" prop='customerGroupId'>
							<Select v-model="formSearch.customerGroupId" clearable>
								<Option v-for="item in custGroupList" :value="item.id" :key="item.id">{{ item.name }}</Option>
							</Select>
						</Form-item>
					</Col>
					<Col :sm='12' :md="8" :lg="6">
						<Form-item label="标签" prop='tagId'>
							<Input v-model="tagName" readonly icon="ios-search" placeholder="请选择标签" @on-focus="showTag(1)"></Input>
						</Form-item>
					</Col>
					<Col :sm='12' :md="8" :lg="6">
						<ul class="header-btn-group">
							<li class="header-item" @click="getCusList(1, formSearch)"><Icon type="search"></Icon>查询</li>
							<li class="header-item" @click="handleReset('formSearch')"><Icon type="refresh"></Icon>重置</li>
						</ul>
					</Col>
				</Row>
			</Form>
			<div class="tit">
				<h3>客户列表</h3>
			</div>
			<Table stripe :columns="cusCol" :data="cusData" @on-selection-change='changeCus' ref='table'></Table>
			<div class="table-page">
				<Page class="table-paginate" :total="total" @on-change='changePage' :current='pageNumber'></Page>
				<div class="table-btn">
					<Button :type="allKey ? 'primary' : 'ghost'" :disabled='cusData.length ? false : true' @click='chooseAll'>全选({{total}}人)</Button>
					<Button type="ghost" :disabled='selectCusBox.length ? false : true' @click='showUser(3)'>更换开发人</Button>
					<Button type="ghost":disabled='selectCusBox.length ? false : true' @click='showUser(4)'>更换咨询师</Button>
					<Button type="ghost":disabled='selectCusBox.length ? false : true' @click='showComCus(1)'>移入公共池</Button>
					<Button type="ghost":disabled='selectCusBox.length ? false : true' @click='showCall'>随访跟进</Button>
					<Button type="ghost":disabled='selectCusBox.length ? false : true' @click='showTag(2)'>标签</Button>
					<Button type="ghost":disabled='selectCusBox.length ? false : true' @click='showComCus(2)'>顾客分组</Button>
				</div>
			</div>
		</div>
		<Modal
			:title="userTitle"
			width='700'
			v-model="modalUser"
			:closable="false"
			class-name="vertical-center-modal">
			<Form :label-width="50" inline ref='formUser' :model='formUser'>
				<Form-item label="部门" prop='deptId'>
					<Select v-model="formUser.deptId" style="width:162px">
						<Option v-for="item in deptList" :value="item.id" :key="item.id">{{ item.name }}</Option>
					</Select>
				</Form-item>
				<Form-item label="账号" prop='account'>
					<Input v-model.trim="formUser.account" :maxlength='15' placeholder="请输入账号" @on-enter="getUser"></Input>
				</Form-item>
				<Form-item label="姓名" prop='name'>
					<Input v-model.trim="formUser.name" :maxlength='20' placeholder="请输入姓名" @on-enter="getUser"></Input>
				</Form-item>
				<ul class="header-btn-group not-float">
					<li class="header-item" @click="getUser"><Icon type="search"></Icon>查询</li>
					<li class="header-item" @click="handleReset('formUser')"><Icon type="refresh"></Icon>重置</li>
				</ul>
			</Form>
			<Table height="350" stripe :columns="userCol" :data="userData" @on-row-click='chooseUser'></Table>
		</Modal>
		<Modal
			:title="comCusTit"
			v-model="modalComCus"
			:closable="false"
			@on-ok="okComCus"
			:loading="loading"
			class-name="vertical-center-modal">
			<Form ref="formComCus" :model="formComCus" :rules="ruleForm" :label-width="120" label-position="left">
				<Form-item label="移入公共池类型" prop="move" required v-if='comCusType === 1'>
					<CheckboxGroup v-model="formComCus.move">
						<Checkbox label="exploit">开发人员</Checkbox>
						<Checkbox label="manager">咨询人员</Checkbox>
					</CheckboxGroup>
				</Form-item>
				<Form-item label="顾客分组" prop="groupId" required v-else>
					<Select v-model="formComCus.groupId">
						<Option v-for="item in custGroupList" :value="item.id" :key="item.id">{{ item.name }}</Option>
					</Select>
				</Form-item>
			</Form>
		</Modal>
		<cmptCallBackEdit :openKey='callBackKey' @saveCallBack='saveCallBack'></cmptCallBackEdit>
		<cmptCustomerTagChoose :openKey='tagKey' :tagType='tagType' :multiple='tagMultiple' @on-change='changeTag'></cmptCustomerTagChoose>
		<cmptChargeChoose placeHolder="选择指定项目" @on-change="setCharge" :openKey='chargeOpenKey'></cmptChargeChoose>
	</div>
</template>

<script>
	import resizeTime from 'components/tableResizeTime.vue'
	import cmptChargeChoose from 'components/chargeChoose.vue'
	import cmptCallBackEdit from 'components/callBackEdit.vue'
	import cmptCustomerTagChoose from 'components/customerTagChoose.vue'
	export default {
		name: 'view_customerRFM',
		components: {cmptChargeChoose, cmptCallBackEdit, cmptCustomerTagChoose, resizeTime},
		data () {
			const validateCom = (rule, value, callback) => {
				if (value.length) {
					callback()
				} else {
					callback(new Error('请选择'))
				}
			}
			const validateGroup = (rule, value, callback) => {
				console.log(typeof value)
				if (typeof value === 'number') {
					callback()
				} else {
					callback(new Error('请选择客户组'))
				}
			}
			return {
				formSearch: {
					pageSize: 10,
					registerStartDate: '',
					registerEndDate: '',
					firstVisitStart: '',
					firstVisitEnd: '',
					name: '',
					id: '',
					symptomId: '',
					chargeId: '',
					r: '',
					f: '',
					m: '',
					exploitUserId: '',
					managerUserId: '',
					customerGroupId: '',
					tagId: ''
				},
				total: 0,
				pageNumber: 1,
				searchKey: true,
				chargeName: '',
				exploitUser: '',
				managerUser: '',
				tagName: '',
				custGroupList: [],
				options: {
					disabledDate (date) {
						return date && date.valueOf() > Date.now()
					}
				},


				cusData: [],
				selectCusBox: [],
				cusCol: [
					{
						type: 'selection',
						width: 40,
						align: 'center'
					},
					{
						title: '顾客编号',
						width: 60,
						key: 'id'
					},
					{
						title: '顾客姓名',
						width: 60,
						render: (h, params) => {
							return h('p', {
								on: {
									click: () => {
										this.toCusIndex(params.row)
									}
								},
								style: {
									cursor: 'pointer',
									color: 'orange'
								}
							}, [
							h('Icon', {
								props: {
									type: "person"
								}
							}),
							h('span', params.row.name)
							])
						}
					},
					{
						title: 'R/F/M',
						width: 100,
						key: 'rfm'
					},
					{
						title: '首次咨询项目',
						width: 60,
						key: 'symptomName'
					},
					{
						title: '当前开发人',
						width: 60,
						key: 'exploitUserName'
					},
					{
						title: '当前咨询师',
						width: 60,
						key: 'managerUserName'
					},
					{
						title: '顾客分组',
						width: 60,
						key: 'customerGroup'
					},
					{
						title: '标签',
						width: 60,
						render: (h, params) => {
							if(params.row.tagList.length) {
								const _text = params.row.tagList.map(item => item.tagName).join('、')
								return h('span', _text)
							}
						}
					},
					{
						title: '初诊日期',
						width: 80,
						render: (h, params) => {
							if(params.row.firstVisitTime) {
								return h(resizeTime, {
									props: {
										time: params.row.firstVisitTime
									}
								})
							}
						}
					},
					{
						title: '登记日期',
						width: 80,
						render: (h, params) => {
							if(params.row.createTime) {
								return h(resizeTime, {
									props: {
										time: params.row.createTime
									}
								})
							}
						}
					}
				],


				modalUser: false,
				userType: 1,
				formUser: {
					hospitalId: localStorage.getItem('hospId'),
					deptId: '',
					account: '',
					name: ''
				},
				userCol: [
					{
						title: '账号',
						key: 'account'
					},
					{
						title: '姓名',
						key: 'name'
					},
					{
						title: '部门',
						key: 'deptName'
					},
					{
						title: '性别',
						key: 'gender'
					}
				],
				userData: [],


				modalComCus: false,
				loading: true,
				comCusType: 1,
				formComCus: {
					move: [],
					groupId: '',
				},
				ruleForm: {
					move: [
					{ validator: validateCom, trigger: 'change' }
					],
					groupId: [
					{ validator: validateGroup, trigger: 'change' }
					]
				},


				chargeOpenKey: false,
				callBackKey: false,
				tagKey: false,
				tagType: 'all',
				tagMultiple: false,


				allKey: false,
				allsql: '',
			}
		},
		computed: {
			userTitle () {
				if(this.userType === 1) {
					return '选择开发人员'
				} else if(this.userType === 2) {
					return '选择咨询人员'
				} else if(this.userType === 3) {
					return '选择更换的开发人员'
				} else if(this.userType === 4) {
					return '选择更换的咨询人员'
				}
			},
			comCusTit () {
				if(this.comCusType === 1) {
					return '选择移入公共池类型'
				} else {
					return '选择更换客户组'
				}
			},
			symptomList () {
				return this.$store.getters.getSelectAllSymptomInfoList
			},
			deptList () {
				return this.$store.getters.getSelectDeptList
			},
		},
		activated () {
			this.getCusList(this.pageNumber, this.formSearch)
			this.getCustGroupList()
			this.getUser()
			this.$store.dispatch('setSelectDeptList', this.formUser.hospitalId)
			this.$store.dispatch('setSelectAllSymptomInfoList')
		},
		methods: {
			getCusList (pageNumber, form) {
				let _vm = this
				_vm.selectCusBox = []
				form.pageNumber = pageNumber
				_vm.$store.dispatch('setPageLoading', -1)
				_vm.$http.get({
					url: 'guard-webManager/customer/page.jhtml',
					data: form,
					success: function(res){
						if(res.data.code === 0 ) {
							let data = res.data.content.page.content || []
							if(_vm.allKey && data.length) {
								_vm.selectCusBox.push({})
							} else {
								_vm.allKey = false
								_vm.selectCusBox = []
							}
							_vm.cusData = data.map(item => {
								if(_vm.allKey) {
									item._disabled = true
									item._checked = true
								} else {
									item._disabled = false
									item._checked = false
								}
								return item
							})
							_vm.pageNumber = res.data.content.page.pageNumber || 1
							_vm.total = res.data.content.page.total || 1
							_vm.allsql = res.data.content.sql || ''
							_vm.$store.dispatch('setPageLoading', 1)
						} else {
							console.log(res.data.desc)
						}
					},
					error: function(res){
						console.log(res)
					}
				})
			},
			getCustGroupList () {
				let _vm = this
				_vm.$http.get({
					url: 'guard-webManager/select/userCustomerGroupInfo.jhtml',
					data: {userId: localStorage.getItem('userId')},
					success: function(res){
						if(res.data.code === 0 ) {
							_vm.custGroupList = res.data.content || []
						} else {
							console.log(res.data.desc)
						}
					},
					error: function(res){
						console.log(res)
					}
				})
			},
			getUser () {
				let _vm = this
				_vm.$http.get({
					url: 'guard-webManager/select/hospitalUserList.jhtml',
					data: _vm.formUser,
					success: function(res){
						if(res.data.code === 0) {
							_vm.userData = res.data.content || []
						} else {
							console.log(res.data.desc)
						}
					},
					error: function(res){
						console.log(res)
					}
				})
			},
			showUser (type) {
				this.userType = type
				this.modalUser = true
			},
			chooseUser (data) {
				if(this.userType === 1) {
					this.formSearch.exploitUserId = data.id
					this.exploitUser = data.name
				} else if(this.userType === 2) {
					this.formSearch.managerUserId = data.id
					this.managerUser = data.name
				} else {
					if(this.allKey) {
						this.saveChangeCusUserAll(data)
					} else {
						this.saveChangeCusUser(data)
					}
				}
				this.modalUser = false
			},
			saveChangeCusUser (data) {
				let _vm = this,
				_url = '',
				_prop = ''
				if(_vm.userType === 3) {
					_url = 'guard-webManager/ownerShip/exploitUserBatchAdd.jhtml'
					_prop = 'exploitUserName'
				} else {
					_url = 'guard-webManager/ownerShip/managerUserBatchAdd.jhtml'
					_prop = 'managerUserName'
				}
				_vm.$http.post({
					url: _url,
					data: {
						ids: _vm.selectCusBox.map(item => item.id).join(','),
						userId: data.id
					},
					success: function(res){
						if(res.data.code === 0) {
							_vm.getCusList(_vm.pageNumber, _vm.formSearch)
							console.log(_vm.selectCusBox)
							_vm.$Notice.success({
								title: '系统提示！',
								desc: '操作成功'
							})
						} else {
							_vm.$Notice.error({
								title: '系统提示！',
								desc: res.data.desc
							})
						}
					},
					error: function(res){
						console.log(res)
					}
				})
			},
			saveChangeCusUserAll (data) {
				let _vm = this,
				_url = ''
				if(_vm.userType === 3) {
					_url = 'guard-webManager/customer/updateExploit.jhtml'
				} else {
					_url = 'guard-webManager/customer/updateManager.jhtml'
				}
				_vm.$http.post({
					url: _url,
					data: {
						sql: _vm.allsql,
						userId: data.id
					},
					success: function(res){
						if(res.data.code === 0) {
							_vm.getCusList(_vm.pageNumber, _vm.formSearch)
							console.log(_vm.selectCusBox)
							_vm.$Notice.success({
								title: '系统提示！',
								desc: '操作成功'
							})
						} else {
							_vm.$Notice.error({
								title: '系统提示！',
								desc: res.data.desc
							})
						}
					},
					error: function(res){
						console.log(res)
					}
				})
			},
			showSearch () {
				this.searchKey = !this.searchKey
			},
			showTag (type) {
				if(type === 1) {
					this.tagType = 'all'
					this.tagMultiple = false
				} else {
					this.tagType = 'use'
					this.tagMultiple = true
				}
				this.tagKey = !this.tagKey
			},
			changeTag (data) {
				console.log(data)
				if(this.tagMultiple) {
					this.saveChangeTags(data)
				} else {
					this.formSearch.tagId = data[0].id
					this.tagName = data[0].name
				}
			},
			saveChangeTags (data) {
				let _vm = this,
				_url = '',
				_data= {}
				if(_vm.allKey) {
					_url = 'guard-webManager/customer/addTagBatch.jhtml'
					_data = {
						sql: _vm.allsql,
						tagList: data.map(item => item.id).join(',')
					}
				} else {
					_url = 'guard-webManager/customer/addTag.jhtml'
					_data = {
						ids: _vm.selectCusBox.map(item => item.id).join(','),
						tagList: data.map(item => item.id).join(',')
					}
				}
				_vm.$http.post({
					url: _url,
					data: _data,
					success: function(res){
						if(res.data.code === 0) {
							_vm.getCusList(_vm.pageNumber, _vm.formSearch)
							_vm.$Notice.success({
								title: '系统提示！',
								desc: res.data.content
							})
						} else {
							_vm.$Notice.error({
								title: '系统提示！',
								desc: res.data.desc
							})
						}
					},
					error: function(res){
						console.log(res)
					}
				})
			},
			setCreateTime (date) {
				this.formSearch.registerStartDate = date[0]
				this.formSearch.registerEndDate = date[1]
			},
			setFirstTime (date) {
				this.formSearch.firstVisitStart = date[0]
				this.formSearch.firstVisitEnd = date[1]
			},
			showCharge () {
				this.chargeOpenKey = !this.chargeOpenKey;
			},
			setCharge (data) {
				this.formSearch.chargeId = data.id
				this.chargeName = data.name
			},
			changePage (num) {
				this.getCusList(num, this.formSearch)
			},
			handleReset (name) {
				this.$refs[name].resetFields()
				if(name === 'formSearch') {
					this.chargeName = ''
					this.exploitUser = ''
					this.managerUser = ''
					this.tagName = ''
					this.$refs.createDate.handleClear()
					this.$refs.firstDate.handleClear()
					this.getCusList(1, this.formSearch)
				} else if(name === 'formUser') {
					this.getUser()
				} else if(name === 'formTag') {
					this.getTag()
				}
			},
			showComCus (type) {
				this.comCusType = type
				this.$refs.formComCus.resetFields()
				this.modalComCus = true
			},
			okComCus () {
				let _vm = this,
				_url = '',
				_data = {}
				_vm.$refs.formComCus.validate((valid) => {
					if(valid) {
						if(_vm.comCusType === 1) {
							if(_vm.allKey) {
								_url = 'guard-webManager/customer/updateOwnershipBatch.jhtml'
								_data = {
									sql: _vm.allsql,
									exploit: _vm.formComCus.move.findIndex(item => item === 'exploit') >= 0 ? 'exploit' : null,
									manager: _vm.formComCus.move.findIndex(item => item === 'manager') >= 0 ? 'manager' : null
								}
							} else {
								_url = 'guard-webManager/customer/updateOwnership.jhtml'
								_data = {
									ids: _vm.selectCusBox.map(item => item.id).join(','),
									exploit: _vm.formComCus.move.findIndex(item => item === 'exploit') >= 0 ? 'exploit' : null,
									manager: _vm.formComCus.move.findIndex(item => item === 'manager') >= 0 ? 'manager' : null
								}
							}
						} else {
							if(_vm.allKey) {
								_url = 'guard-webManager/customer/updateCustomerGroup.jhtml',
								_data = {
									id: _vm.formComCus.groupId,
									sql: _vm.allsql
								}
							} else {
								_url = 'guard-webManager/customerGroup/importCustomerEdit.jhtml',
								_data = {
									id: _vm.formComCus.groupId,
									content: _vm.selectCusBox.map(item => item.id).join(',')
								}
							}
						}
						_vm.$http.post({
							url: _url,
							data: _data,
							success: function(res){
								if(res.data.code === 0) {
									_vm.getCusList(_vm.pageNumber, _vm.formSearch)
									_vm.$Notice.success({
										title: '系统提示！',
										desc: res.data.content
									})
									_vm.modalComCus = false
								} else {
									_vm.$Notice.error({
										title: '系统提示！',
										desc: res.data.desc
									})
									_vm.loading = false
									_vm.$nextTick(() => {
										_vm.loading = true
									})
								}
							},
							error: function(res){
								console.log(res)
							}
						})
					} else {
						_vm.loading = false
						_vm.$nextTick(() => {
							_vm.loading = true
						})
					}
				})
			},
			showCall () {
				this.callBackKey = !this.callBackKey
			},
			saveCallBack (time, data) {
				let _vm = this,
				_url = '',
				_data = {}
				if(_vm.allKey) {
					_url = 'guard-webManager/customer/addCallbackSetBatch.jhtml'
					_data = {
						sql: _vm.allsql,
						startTime: time,
						detailListStr: JSON.stringify(data)
					}
				} else {
					_url = 'guard-webManager/customer/addCallbackSet.jhtml'
					_data = {
						ids: _vm.selectCusBox.map(item => item.id).join(','),
						startTime: time,
						detailListStr: JSON.stringify(data)
					}
				}
				_vm.$http.post({
					url: _url,
					data: _data,
					success: function(res){
						if(res.data.code === 0) {
										// _vm.getCusList(_vm.pageNumber, _vm.formSearch)
										_vm.$Notice.success({
											title: '系统提示！',
											desc: '操作成功'
										})
									} else {
										_vm.$Notice.error({
											title: '系统提示！',
											desc: res.data.desc
										})
									}
								},
								error: function(res){
									console.log(res)
								}
							})
			},
			toCusIndex (data) {
				const breadData = [
				{
					url: '/desktop',
					text: '桌面'
				},
				{
					url: '/customerRFm',
					text: '客户运营'
				},
				{
					url: '/customerIndex',
					text: data.name
				}
				]
				this.$store.dispatch('setBreadData', breadData)
				this.$router.push({
					path: '/customerIndex',
					query: {
						id: data.id
					}
				})
				sessionStorage.setItem("cusName", data.name)
				sessionStorage.setItem("cusId", data.id)
			},
			changeCus (data) {
				this.selectCusBox = data
			},
			chooseAll () {
				this.allKey = !this.allKey
				if(this.allKey) {
					this.selectCusBox.push({})
				} else {
					this.selectCusBox = []
				}
				this.cusData.map(item => {
					if(this.allKey) {
						item._disabled = true
						item._checked = true
					} else {
						item._disabled = false
						item._checked = false
					}
				})
			},
		}
	}
</script>

<style scoped lang='less'>
	.cus-RFM {
		.tit {
			overflow: hidden;
			padding-bottom: 20px;
			h3 {
				float: left;
				font-size: 16px;
				font-weight: normal;
				line-height: 22px;
				color: #181818;
			}
			span {
				float: right;
				width: 22px;
				height: 22px;
				font-size: 22px;
				line-height: 22px;
				text-align: center;
				color: #181818;
				border-radius: 50%;
				cursor: pointer;
			}
		}
		.table-page {
			padding: 20px 0 0;
		}
		.table-paginate {
			margin-bottom: 20px;
		}
		.table-btn {
			float: left;
			button {
				min-width: 92px;
				border-color: #797979;
				margin: 0 20px 20px 0; 
				&:hover {
					border-color: #4172F6;
					color: #4172F6;
				}
			}
		}
	}
</style>

