/** * 推荐人管理 */
import verifyMessageVue from './verifyMessage.vue';

<template>
	<div class="container-box">
		<div class="container-header">
		<h2>推荐人管理</h2>
		</div>
		<div class="container-body">
		<RadioGroup type="button" v-model="vertical" @on-change="shent">
			<Radio style="margin:0 20px 0 0;" :label="1">
				<span>推荐人({{ management }})</span>
			</Radio>
			<Radio :label="2">
				<span>黑名单({{ ment }})</span>
			</Radio>
		</RadioGroup>
		<div style="margin:30px 0 0 0;" v-show="ent">
			<Form :label-width="66" inline ref='formSearch' :model='formSearch'>
				<FormItem label="注册日期" prop='startTime'>
					<Date-picker :transfer='true' type="daterange" placement="bottom-start" placeholder="选择日期" :value='timeBox' style="width: 180px;margin-left:3px;" @on-change='setTime' ref='clearTime'></Date-picker>
				</FormItem>
				<FormItem label="姓名" prop='name'>
					<Input :maxlength='15' v-model.trim="formSearch.name" placeholder="请输入姓名" @on-enter="getList('1', '10', formSearch)"></Input>
				</FormItem>
				<FormItem label="手机号" prop='mobile'>
					<Input :maxlength='15' v-model.trim="formSearch.mobile" placeholder="请输入手机号" @on-enter="getList('1', '10', formSearch)"></Input>
				</FormItem>
				<FormItem :label-width="80" label="推荐人编号" prop='promoterid'>
					<Input :maxlength='15' v-model.trim="formSearch.promoterid" placeholder="请输入推荐人编号" @on-enter="getList('1', '10', formSearch)"></Input>
				</FormItem>
				<FormItem label="状态" prop='status'>
				<Select v-model="formSearch.status" style='width:162px'>
					<Option :value="0">待审核</Option>
					<Option :value="1">审核通过</Option>
					<Option :value="2">审核不通过</Option>
				</Select>
				</FormItem>
				<ul class="header-btn-group not-float">
				<li class="header-item" @click="chaxun('formSearch')">
					<Icon type="search"></Icon>查询</li>
				<li class="header-item" @click="handleReset('formSearch')">
					<Icon type="refresh"></Icon>重置</li>
				</ul>
			</Form>
			<Table stripe :columns="col" :data="data"></Table>
			<div class="table-page">
				<div style="margin: 20px 10px 0 0;">
					<div class="table-info">当前第{{pageNum}}页，共{{totalPages}}页，总共{{Count}}条记录</div>
					<Page class="table-paginate" :total="Count" @on-change='changepage' :current='pageNum'></Page>
					<!-- <Page :total="Count" :current="pageNum" :page-size="pageSize" show-total class="paging" @on-change="changepage"></Page> -->
				</div>
			</div>
		</div>
		<div style="margin:30px 0 0 0;" v-show="rnt">
			<Form ref="formSearch" inline :model="formSearch" :label-width="62">
				<FormItem label="注册日期" prop='startTime'>
					<Date-picker :transfer='true' type="daterange" placement="bottom-start" placeholder="选择日期" style="width: 180px" @on-change='setTime' ref='clearTime'></Date-picker>
				</FormItem>
				<FormItem label="姓名" prop='name'>
					<Input :maxlength='15' v-model.trim="formSearch.name" placeholder="请输入姓名" @on-enter="getList('1', '10', formSearch)"></Input>
				</FormItem>
				<FormItem label="手机号" prop='mobile'>
					<Input :maxlength='15' v-model.trim="formSearch.mobile" placeholder="请输入手机号" @on-enter="getList('1', '10', formSearch)"></Input>
				</FormItem>
				<FormItem :label-width="80" label="推荐人编号" prop='promoterid'>
					<Input :maxlength='15' v-model.trim="formSearch.promoterid" placeholder="请输入推荐人编号" @on-enter="getList('1', '10', formSearch)"></Input>
				</FormItem>
				<ul class="header-btn-group not-float">
				<li class="header-item" @click="chaxun('formSearch')">
					<Icon type="search"></Icon>查询</li>
				<li class="header-item" @click="handleReset('formSearch')">
					<Icon type="refresh"></Icon>重置</li>
				</ul>
			</Form>
			<Table stripe :columns="col2" :data="data2"></Table>
			<div class="table-page">
				<div style="margin: 20px 10px 0 0;">
					<div class="table-info">当前第{{pageNumtwo}}页，共{{totalPagestwo}}页，总共{{dataCount}}条记录</div>
					<Page class="table-paginate" :total="dataCount" @on-change='changepage' :current='pageNum'></Page>
					<!-- <Page :total="dataCount" :current="pageNum" :page-size="pageSize" show-total class="paging" @on-change="changepage"></Page> -->
				</div>
			</div>
		</div>
		</div>
		<Modal title="审核推荐顾客信息" v-model="modal" :closable="false" class-name="vertical-center-modal">
		<Form ref="formValidate" :model="formValidate" :label-width="100" label-position="right">
			<Form-item label="顾客姓名：">
				<span>{{formValidate.name}}</span>
			</Form-item>
			<Form-item label="性别：">
				<span>{{formValidate.gender}}</span>
			</Form-item>
			<Form-item label="手机：">
				<span>{{formValidate.mobile}}</span>
			</Form-item>
			<Form-item label="注册时间：">
				<span>{{formValidate.createTime}}</span>
			</Form-item>
			<Form-item label="推荐人：">
				<span>{{formValidate.promoterName}}</span>
			</Form-item>
			<Form-item label="内容: ">
				<span>{{formValidate.content}}</span>
			</Form-item>
			<Form-item label="审核意见" prop="remark">
				<Input v-model="formValidate.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入审核意见"></Input>
			</Form-item>
		</Form>
		<div slot="footer" style="text-align:center">
			<Button type="primary" icon="checkmark" @click='save(1)' :loading='saveLoad'>通过并创建客户</Button>
			<Button type="error" icon="close" @click='save(2)' :loading='saveLoad'>审核不通过</Button>
		</div>
		</Modal>
		<Modal title="查看推荐顾客信息" v-model="modal1" :closable="false" class-name="vertical-center-modal">
		<Form ref="formView" :model="formView" :label-width="100" label-position="right">
			<Form-item label="顾客姓名：">
				<span>{{formView.name}}</span>
			</Form-item>
			<Form-item label="性别：">
				<span>{{gender}}</span>
			</Form-item>
			<Form-item label="手机：">
				<span>{{formView.mobile}}</span>
			</Form-item>
			<Form-item label="注册时间：">
				<span>{{formView.createTime}}</span>
			</Form-item>
			<Form-item label="推荐人：">
				<span>{{formView.promoterName}}</span>
			</Form-item>
			<Form-item label="内容: ">
				<span>{{formView.content}}</span>
			</Form-item>
			<Form-item label="状态: ">
				<span :style='{color: statusColor}'>{{statusText}}</span>
			</Form-item>
			<Form-item label="审核用户: ">
				<span>{{formView.auditUserName}}</span>
			</Form-item>
			<Form-item label="审核时间: ">
				<span>{{formView.auditTime}}</span>
			</Form-item>
			<Form-item label="审核意见: ">
				<span>{{formView.remark}}</span>
			</Form-item>
		</Form>
		</Modal>
		<!-- 取消关联 -->
		<Modal
			title="取消关联"
			v-model="modal9"
			@on-ok="cancel"
			:styles="{top: '300px'}">
			<p>确定要取消顾客关联的微信？</p>
		</Modal>
		<!-- 禁用帐号 -->
		<Modal
			title="禁用帐号"
			v-model="modal10"
			@on-ok="handleSubmit('formInline')"
			:loading="loading"
			:styles="{top: '300px'}">
			<p style="margin:0 0 10px 0;">确定禁用？</p>
			<span style="color:#a1a1a1;">禁用后，可以在黑名单中解除禁用</span>
			<Form ref="formInline" :model="formInline" :rules="ruleInline">
				<FormItem label="禁用原因:" prop="disab">
					<Input type="text" v-model="formInline.disab" :maxlength="30" placeholder=""></Input>
				</FormItem>
			</Form>
		</Modal>
		<!-- 解除禁用 -->
		<Modal
			title="解除禁用"
			v-model="modal11"
			@on-ok="Relieve"
			:styles="{top: '300px'}">
			<p>确定解除禁用？</p>
		</Modal>
	</div>
</template>

<script>
export default {
	data() {
		return {
			disableddisabled: false,
			promoterID: [],
			promoteridtwo: [],
			pageNumtwo: '',
			totalPages: '',
			totalPagestwo: '',
			none: '',
			loading: true,
			formInline: {
				disab: '',
			},
			ruleInline: {
				disab: [
					{ required: true, message: '请输入禁用原因', trigger: 'blur' }
				],
			},
			yuanying: '请输入禁用原因',
			pageNumber: 1,
			relieveid: '',
			cancelid: '',
			distableid: '',
			ment: '',
			timeBox: '',
			ajaxHistoryData:[],
            // 初始化信息总条数
			Count: 0,
            dataCount:0, // 初始化信息总条数
            pageNum: 1, // 页数
            pageSize: 10,
			modal11: false,
			modal10: false,
			modal9: false,
			appid: [],
			payAmountArr: [],
			management: '',
			ent: 1,
			rnt: false,
			vertical: 1,
			modal: false,
			modal1: false,
			quxiaoguanlian: '取消关联',
			saveLoad: false,
			formValidate: {
				id: '',
				name: '',
				gender: '',
				mobile: '',
				createTime: '',
				promoterName: '',
				content: '',
				remark: '',
				status: '',
			},
			formView: {},
			type: null,
			formSearch: {
				startTime: '',
				endTime: '',
				name: '',
				mobile: '',
				promoterid: '',
				status: '',
			},
			col: [
				{
					title: '序号',
					width: 70,
					render: (h, params) => {
						const _index = (this.pageNumber - 1) * 10
						return h('span', params.index + 1 + _index)
					}
				},
				{	
					width: 70,
					title: '编号',
					key: 'id'
				},
				{
					width: 100,
					title: '顾客姓名',
					key: 'name'
				},
				{
					width: 70,
					title: '性别',
					key: 'gender',
					render: (h, params) => {
						const _text = params.row.gender == 1 ? '男' : '女'
						return h('span', _text)
					}
				},
				{
					width: 134,
					title: '手机号',
					key: 'mobile'
				},
				{
					width: 130,
					title: '注册时间',
					key: 'createTime'
				},
				{
					width: 100,
					title: '推荐人编号',
					key: 'promoterid',
					render: (h, params) => {
						if (this.promoterID[params.index] == 0) {
							this.promoterID[params.index] = '';
						}
						return h("span", this.promoterID[params.index]);
					}
				},
				{
					width: 144,
					title: '推荐人',
					key: 'promoterName',
					render: (h, params) => {
						return h('p', {
						on: {
							click: () => {
							this.toCus(params.row.promoterid, params.row.promoterName)
							}
						},
						style: {
							cursor: 'pointer',
							color: 'orange',
						}
						}, [
						h('Icon', {
							props: {
							type: "person"
							},
							style: {
								display: this.none
							}
						}),
						h('span', params.row.promoterName)
						])
					}
				},
				{
					width: 144,
					title: '入会状态',
					key: '',
					render: (h, params) => {
						const text = params.row.duesMark === 1 ? '已入会' : '未入会';
						return h('span', text);
					}
				},
				{
					width: 144,
					title: '来源',
					key: 'appID',
					render: (h, params) => {
						if (this.appid[params.index] == "wx2cda971ec714f9fe") {
							this.appid[params.index] = "微信";
						}
						return h("span", this.appid[params.index]);
					}
				},
				{
					width: 144,
					title: '状态',
					key: 'status',
					render: (h, params) => {
						const _text = params.row.status == 0 ? '待审核' : params.row.status == 1 ? '审核通过' : '审核不通过'
						const _color = params.row.status == 0 ? 'orange' : params.row.status == 1 ? 'blue' : 'red'
						return h('span', {
						style: {
							color: _color
						}
						}, _text)
					}
				},
				{
					title: '审核',
					key: 'action',
					width: 80,
					align: 'center',
					render: (h, params) => {
						const _display = params.row.status == 0 ? 'inline-block' : 'none'
						const _display1 = params.row.status != 0 ? 'inline-block' : 'none'
						return h('div', [
						h('Button', {
							props: {
							type: 'primary',
							size: 'small',
							icon: 'eye'
							},
							style: {
							display: _display1
							},
							on: {
							click: () => {
								this.view(params.row)
							}
							}
						}, '查看'),
						h('Button', {
							props: {
							type: 'primary',
							size: 'small',
							icon: 'ios-checkmark-outline',
							},
							style: {
							display: _display
							},
							on: {
							click: () => {
								this.audit(params.row)
							}
							}
						}, '审核'),
						])
					}
				},
				{
					title: '操作',
					key: 'action',
					align: 'center',
					width: 250,
					render: (h, params) => {
						console.log('23123')
						console.log(params.row.wechat)
						const quxiaoguanlian = params.row.wechat ? '取消关联' : '已取消关联';
						const disableddisabled = params.row.wechat ? false : true;
						return h('div', [
							h('Button', {
								props: {
									type: 'info',
									size: 'small'
								},
								style: {
									marginRight: '5px'
								},
								on: {
									click: () => {
										this.toTree(params.row)
									}
								}
							}, '推荐人图谱'),
							h('Button', {
								props: {
									type: 'warning',
									size: 'small',
									disabled:  disableddisabled
								},
								style: {
									marginRight: '5px'
								},
								on: {
									click: () => {
										this.cancellation(params.row)
									}
								}
							}, quxiaoguanlian),
							h('Button', {
								props: {
									type: 'error',
									size: 'small',
								},
								on: {
									click: () => {
										this.disable(params.row)
									}
								}
							}, '禁用帐号')
						]);
					}
				}
			],
			data: [],
			col2: [
				{
					title: '序号',
					width: 70,
					render: (h, params) => {
						const _index = (this.pageNumber - 1) * 10
						return h('span', params.index + 1 + _index)
					}
				},
				{
					width: 181,
					title: '禁用时间',
					key: 'forbiddenTime',
				},
				{
					width: 181,
					title: '顾客姓名',
					key: 'name'
				},
				{
					width: 181,
					title: '手机号',
					key: 'mobile'
				},
				{
					width: 181,
					title: '注册时间',
					key: 'createTime'
				},
				{
					width: 181,
					title: '推荐人编号',
					key: 'promoterid',
					render: (h, params) => {
						if (this.promoteridtwo[params.index] == 0) {
							this.promoteridtwo[params.index] = '';
						}
						return h("span", this.promoteridtwo[params.index]);
					}
				},
				{
					width: 181,
					title: '来源',
					key: 'appID',
					render: (h, params) => {
						if (this.appid[params.index] == "wx2cda971ec714f9fe") {
							this.appid[params.index] = "微信";
						}
						return h("span", this.appid[params.index]);
					}
				},
				{
					width: 181,
					title: '禁用原因',
					key: 'forbiddenRemark'
				},
				{
					title: '操作',
					key: 'action',
					align: 'center',
					width: 250,
					render: (h, params) => {
						return h('div', [
							h('Button', {
								props: {
									type: 'error',
									size: 'small'
								},
								on: {
									click: () => {
										this.relieve(params.row)
									}
								}
							}, '解除禁用')
						]);
					}
				}
			],
			data2: []
		}
	},
	computed: {
		gender() {
			const _text = typeof this.formView.gender == 'undefined' ? '' : this.formView.gender == 1 ? '男' : '女'
			return _text
		},
		statusText() {
			const _text = typeof this.formView.status == 'undefined' ? '' : this.formView.status == 1 ? '审核通过' : '审核不通过'
			return _text
		},
		statusColor() {
			const _text = typeof this.formView.status == 'undefined' ? '' : this.formView.status == 1 ? 'blue' : 'red'
			return _text
		},
	},
	created() {
		this.getList('1', '10', this.formSearch)
	},
	methods: {
		toTree(data) {
			console.log('totree')
			console.log(data)
			let breadData = [{
				url: '/desktop',
				text: '桌面'
			},
			{
				url: '/store',
				text: '渠道管理'
			},
			{
				url: '/relationship',
				text: '关系图谱'
			}
			]
			this.$store.dispatch('setBreadData', breadData);
			this.$router.push({
			path: '/relationship',
			query: {
				id: data.id,
			}
			})
		},
		shent() {
			console.log(this.vertical)
			if(this.vertical == 1) {
				this.type = 0
				console.log('type0')
				console.log(this.type)
				this.getList()
				this.ent = true
				this.rnt = false
			} else if (this.vertical == 2) {
				this.type = 1
				console.log('type1')
				console.log(this.type)
				this.getList()
				this.ent = false
				this.rnt = true
			}
		},
		chaxun (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
					this.pageNum = 1
                    this.getList()
                } else {
                    this.$Message.error('Fail!');
                }
            })
        },
		// 推荐顾客列表管理
		getList() {
			var self = this
			self.$store.dispatch('setPageLoading', -1)
			self.$http.getPage({
				url: 'guard-webManager/promoteCustomer/list.jhtml',
				data: {
					pageSize : self.pageSize,
                    pageNumber : self.pageNum,
					startTime : self.formSearch.startTime,
					endTime : self.formSearch.endTime,
					name : self.formSearch.name,
					mobile : self.formSearch.mobile,
					promoterId: self.formSearch.promoterid,
					status : self.formSearch.status,
					blacklistType : self.type
				},
				success: function (res) {
					self.pageNum = res.data.content.whitelist.pageNumber
					// // 判断page
					// if(res){
                    //     self.ajaxHistoryData = res.data.content.content
                    //     self.dataCount = res.data.content.total
                    //    // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
                    //     if (res.data.content.total < self.pageSize) {
                    //         self.data = self.ajaxHistoryData;
                    //     } else {
                    //         self.data = self.ajaxHistoryData.slice(0, self.pageSize);
                    //     }
                    // }
					self.management = res.data.content.whitelist.total
					self.ment = res.data.content.blacklist.total 
					self.totalPages = res.data.content.whitelist.totalPages
					self.totalPagestwo = res.data.content.blacklist.totalPages
					self.pageNumtwo = res.data.content.blacklist.pageNumber
					self.data = res.data.content.whitelist.content
					self.data2 = res.data.content.blacklist.content
					self.promoterID = res.data.content.whitelist.content.map(item => item.promoterid)
					self.promoteridtwo = res.data.content.blacklist.content.map(item => item.promoterid)
					// params.row.promoterid, params.row.promoterName
					if(res.promoterid == null || promoterName == null) {
						self.none = 'none'
					}
					console.log('qwewqeqwe')
					console.log(res)
					self.Count = res.data.content.whitelist.total
					self.dataCount = res.data.content.blacklist.total
					// // 入会状态
					self.payAmountArr = res.data.content.blacklist.content.map(item => item.chargeID)
					self.appid = res.data.content.whitelist.content.map(item => item.appID)
					console.log('推荐')
					console.log(res)
					self.$store.dispatch('setPageLoading', 1);
				},
				error: function (res) {
				console.log(res);
				}
			});
		},
		// 分页
        changepage (index) {
            this.pageNum = index;
            this.getList()
        },
		setTime(date) {
			this.formSearch.startTime = date[0]
			this.formSearch.endTime = date[1]
		},
		changePage(num) {
			this.getList(num, '10', this.formSearch)
		},
		handleReset(name) {
			this.pageNum = 1
			this.formSearch.startTime = moment().startOf('isoWeek').format('YYYY-MM-DD')
            this.formSearch.endTime = moment().format('YYYY-MM-DD')
			this.timeBox = []
			this.formSearch.status = ''
			this.$refs[name].resetFields()
			this.$refs['clearTime'].handleClear()
			this.getList('1', '10', this.formSearch)
		},
		//跳转详情
		toCus(id, name) {
			let breadData = [
				{
					url: '/desktop',
					text: '桌面'
				},
				{
					url: '/promoteCustomer',
					text: '推荐顾客列表'
				},
				{
					url: '/cusPromoterRecord',
					text: name
				}
			]
			this.$store.dispatch('setBreadData', breadData)
			this.$router.push({
				path: '/cusPromoterRecord',
				query: {
					id: id
				}
			})
		},
		//审核
		audit(data) {
			this.formValidate.remark = ''
			this.formValidate.id = data.id
			this.formValidate.name = data.name
			this.formValidate.content = data.content
			this.formValidate.mobile = data.mobile
			this.formValidate.createTime = data.createTime
			this.formValidate.promoterName = data.promoterName
			this.formValidate.gender = data.gender == 1 ? '男' : '女'
			this.modal = true
		},
		// 取消关联弹窗
		cancellation(data) {
			this.modal9 = true
			console.log('取消关联id')
			console.log(data.id)
			this.cancelid = data.id
		},
		// 取消关联
		cancel() {
			var self = this
			self.$http.post({
				url: '/guard-webManager/promoteCustomer/cleanopenid.jhtml',
				data: {
					id : self.cancelid,
				},
				success: function (res) {
					self.$Message.success('已取消关联');
					self.getList();
				}
			})	
		},
		// 禁用帐号弹窗
		disable(data) {
			this.formInline.disab = ''
			this.modal10 = true
			console.log('禁用帐号id')
			console.log(data.id)
			this.distableid = data.id
		},
		handleSubmit(name) {
			var self = this
			self.$refs[name].validate((valid) => {
				if (valid) {
					self.$http.post({
						url: '/guard-webManager/promoteCustomer/forbiddenaccount.jhtml',
						data: {
							id : self.distableid,
							forbiddenRemark : self.formInline.disab
						},
						success: function (res) {
							self.modal10 = false
							self.$Message.success('已禁用该用户');
							self.getList();
						}
					})	
				} else {
					self.loading = false
						self.$nextTick(() => {
						self.loading = true
					})
				}
			})
		},
		// 禁用帐号
		distable() {
		},
		// 解除禁用弹窗
		relieve(data) {
			this.modal11 = true
			console.log('解除禁用id')
			console.log(data.id)
			this.relieveid = data.id

		},
		// 解除禁用
		Relieve() {
			var self = this
			self.$http.post({
				url: '/guard-webManager/promoteCustomer/startaccount.jhtml',
				data: {
					id : self.relieveid,
				},
				success: function (res) {
					self.$Message.success('已启用该账户');
					self.getList();
				}
			})	
		},
		save(type) {
			let _vm = this
			if (type === 1) {
				_vm.formValidate.status = 1
			} else {
				_vm.formValidate.status = 2
			}
			_vm.saveLoad = true
			_vm.$http.post({
				url: 'guard-webManager/promoteCustomer/saveInfo.jhtml',
				data: _vm.formValidate,
				success: function (res) {
				if (res.data.code == 0) {
					if (type === 2) {
					_vm.getList('1', '10', _vm.formSearch)
					_vm.saveLoad = false
					_vm.modal = false
					} else {
					let breadData = [
						{
							url: '/desktop',
							text: '桌面'
						},
						{
							url: '/promoteCustomer',
							text: '推荐顾客列表'
						},
						{
							url: '/promoteCustomerNew',
							text: '登记新客户'
						}
					]
					_vm.$store.dispatch('setBreadData', breadData)
					if(res.data.content == '审核通过') {
						_vm.getList('1', '10', _vm.formSearch)
						_vm.saveLoad = false
						_vm.modal = false
						_vm.$Notice.success({
						title: '系统提示！',
						desc: '审核成功！'
						})
					} else {
						_vm.$router.push({
							path: '/promoteCustomerNew',
							query: {
							id: _vm.formValidate.id,
							remark: _vm.formValidate.remark
							}
						})
						_vm.$Notice.success({
						title: '系统提示！',
						desc: '保存成功！'
						})
					}
					}

				} else {
					_vm.$Notice.error({
					title: '系统提示！',
					desc: res.data.desc
					})
					_vm.saveLoad = false
				}
				},
				error: function (res) {
				console.log(res)
				}
			})
		},
		//查看
		view(data) {
			let _vm = this
			_vm.$http.get({
				url: 'guard-webManager/promoteCustomer/view.jhtml',
				data: {
					id: data.id
				},
				success: function (res) {
					if (res.data.code == 0) {
						console.log('asdasdasd')
						console.log(res)
						_vm.formView = res.data.content
						_vm.modal1 = true;
					} 
				},
				error: function (res) {
				console.log(res)
				}
			})
		},
	}
}

</script>
