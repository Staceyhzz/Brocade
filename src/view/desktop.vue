/**
* 桌面页面
*/

<template>
	<div class="container-box desktop">
		<div class="container-header">
			<h2>{{$t('desktop.mainTit')}}</h2>
		</div>
		<div class="container-body">
			<div class="desktop-item">
				<div class="item-tit tit">
					<h3>{{$t('desktop.itemTit1')}}</h3>
					<div class="tit-btn" v-if='meunUpDown'>
						<Button type="primary" icon='edit' v-show='menuKey' @click='editMenu'>{{$t('publicSet.edit')}}</Button>
						<Button type="primary" v-show='!menuKey' @click='saveMenu'>{{$t('publicSet.save')}}</Button>
						<Button type="ghost" class='meun-did' v-show='!menuKey' @click='cancleMenu'>{{$t('publicSet.cancel')}}</Button>
					</div>
					<div class="up-down" @click='changeUpDown(1)'>
						<Icon type="eye" v-if='meunUpDown'></Icon>
						<Icon type="eye-disabled" v-else class='down'></Icon>
					</div>
				</div>
				<ul class="menu-box" v-show='meunUpDown'>
					<li v-for='(item, index) in saveMenuList' :key='index' :class="[!menuKey ? 'edit' : '']" @click='removeMenu(index, item)'>
						{{$t('layoutNav.' + item.id)}}
						<Icon type="close-round" v-show='!menuKey'></Icon>
					</li>
					<li class="add" v-show='!menuKey' @click='addMenu'><Icon type="plus-round"></Icon>{{$t('publicSet.add')}}</li>
				</ul>
			</div>
			<div class="desktop-item" v-if='frontKey'>
				<div class="item-tit">
					<h3>{{$t('desktop.itemTit2')}}</h3>
					<div class="tit-btn" v-if='frontUpDown'>
						<ButtonGroup>
							<Button :type="formFront.dateType === 1 ? 'primary' : 'ghost'" @click='changeFrontTime(1)'>{{$t('desktop.week')}}</Button>
							<Button :type="formFront.dateType === 2 ? 'primary' : 'ghost'" @click='changeFrontTime(2)'>{{$t('desktop.month')}}</Button>
						</ButtonGroup>
						<ButtonGroup class='front-did'>
							<Button :type="formFront.newType === 1 ? 'primary' : 'ghost'" @click='changeNewOld(true)'>{{$t('publicSet.newCus')}}</Button>
							<Button :type="formFront.oldType === 1 ? 'primary' : 'ghost'" @click='changeNewOld(false)'>{{$t('publicSet.oldCus')}}</Button>
						</ButtonGroup>
					</div>
					<div class="up-down" @click='changeUpDown(2)'>
						<Icon type="eye" v-if='frontUpDown'></Icon>
						<Icon type="eye-disabled" v-else class='down'></Icon>
					</div>
				</div>
				<Row :gutter="24" v-show='frontUpDown'>
					<Col :sm="24" :md="12" :lg="6">
						<div class="mes-item">
							<h3>{{formFrontShow.amount2.toFixed(2)}}
								<span>
									<Icon type="arrow-up-a" :class="[frontAmount >= 0 ? 'up' : 'down']"></Icon>
									{{frontAmount}}%
								</span>
							</h3>
							<p>{{$t('desktop.mesTit1')}}</p>
						</div>
					</Col>
					<Col :sm="24" :md="12" :lg="6">
						<div class="mes-item">
							<h3>{{formFrontShow.dealNum2}}
								<span>
									<Icon type="arrow-up-a" :class="[frontDeal >= 0 ? 'up' : 'down']"></Icon>
									{{frontDeal}}%
								</span>
							</h3>
							<p>{{$t('desktop.mesTit2')}}</p>
						</div>
					</Col>
					<Col :sm="24" :md="12" :lg="6">
						<div class="mes-item">
							<h3>{{formFrontShow.triageNum2}}
								<span>
									<Icon type="arrow-up-a" :class="[frontTriage >= 0 ? 'up' : 'down']"></Icon>
									{{frontTriage}}%
								</span>
							</h3>
							<p>{{$t('desktop.mesTit3')}}</p>
						</div>
					</Col>
					<Col :sm="24" :md="12" :lg="6">
						<div class="mes-item">
							<h3>{{frontDealNum}}%
								<span>
									<Icon type="arrow-up-a" :class="[frontDealPercent >= 0 ? 'up' : 'down']"></Icon>
									{{frontDealPercent}}%
								</span>
							</h3>
							<p>{{$t('desktop.mesTit4')}}</p>
						</div>
					</Col>
				</Row>
				<Menu mode="horizontal" :active-name="frontType" @on-select='changeFrontChartType' v-show='frontUpDown'>
					<Menu-item name="dealMoney">{{$t('desktop.mesTit1') + $t('desktop.menuOther1')}}</Menu-item>
					<Menu-item name="dealNum">{{$t('desktop.mesTit2') + $t('desktop.menuOther1')}}</Menu-item>
					<Menu-item name="frontNum">{{$t('desktop.mesTit3') + $t('desktop.menuOther1')}}</Menu-item>
					<Menu-item name="dealRate">{{$t('desktop.mesTit4') + $t('desktop.menuOther1')}}</Menu-item>
				</Menu>
				<div class='chart-container' v-show='frontUpDown'>
					<div class="chart" ref='frontCharts'></div>
				</div>
			</div>
			<div class="desktop-item" v-if='appointmentKey'>
				<div class="item-tit">
					<h3>{{$t('desktop.itemTit3')}}</h3>
					<div class="up-down" @click='changeUpDown(3)'>
						<Icon type="eye" v-if='appointmentUpDown'></Icon>
						<Icon type="eye-disabled" v-else class='down'></Icon>
					</div>
				</div>
				<Table stripe :columns="appointmentCol" :data="appointmentData" v-show='appointmentUpDown'></Table>
			</div>
			<div class="desktop-item" v-if='callBackKey'>
				<div class="item-tit">
					<h3>{{$t('desktop.itemTit4')}}</h3>
					<div class="tit-btn" v-if='callBackUpDown'>
						<ButtonGroup>
							<Button :type="formCallBack.dateType === 1 ? 'primary' : 'ghost'" @click='changeCallTime(1)'>{{$t('desktop.week')}}</Button>
							<Button :type="formCallBack.dateType === 2 ? 'primary' : 'ghost'" @click='changeCallTime(2)'>{{$t('desktop.month')}}</Button>
						</ButtonGroup>
					</div>
					<div class="up-down" @click='changeUpDown(4)'>
						<Icon type="eye" v-if='callBackUpDown'></Icon>
						<Icon type="eye-disabled" v-else class='down'></Icon>
					</div>
				</div>
				<Row :gutter="24" v-show='callBackUpDown'>
					<Col :sm="24" :md="8">
						<div class="mes-item">
							<h3>{{formCallShow.total2}}
								<span>
									<Icon type="arrow-up-a" :class="[formCallTotal >= 0 ? 'up' : 'down']"></Icon>
									{{formCallTotal}}%
								</span>
							</h3>
							<p>{{$t('desktop.mesTit5')}}</p>
						</div>
					</Col>
					<Col :sm="24" :md="8">
						<div class="mes-item">
							<h3>{{formCallShow.finish2}}
								<span>
									<Icon type="arrow-up-a" :class="[formCallFinish >= 0 ? 'up' : 'down']"></Icon>
									{{formCallFinish}}%
								</span>
							</h3>
							<p>{{$t('desktop.mesTit6')}}</p>
						</div>
					</Col>
					<Col :sm="24" :md="8">
						<div class="mes-item">
							<h3>{{formCallFinishNum}}%
								<span>
									<Icon type="arrow-up-a" :class="[formCallFinishPercent >= 0 ? 'up' : 'down']"></Icon>
									{{formCallFinishPercent}}%
								</span>
							</h3>
							<p>{{$t('desktop.mesTit7')}}</p>
						</div>
					</Col>
				</Row>
				<div class="call-back-tab" v-show='callBackUpDown'>
					<Menu mode="horizontal" :active-name="callBackType" @on-select='changeCallChartType'>
						<Menu-item name="work">{{$t('desktop.menuTit1')}}</Menu-item>
						<Menu-item name="done">{{$t('desktop.mesTit7')}}</Menu-item>
					</Menu>
					<div class="call-back-btn">
						<Icon type="alert"></Icon>
						<div class="call-back-msg">
							<p>{{$t('desktop.msg1')}}</p>
							<p>{{$t('desktop.msg2')}}</p>
							<p>{{$t('desktop.msg3')}}<span>{{$t('desktop.msg4')}}</span>{{$t('desktop.msg5')}}</p>
							<p>{{$t('desktop.msg6')}}<span>{{$t('desktop.msg7')}}</span>{{$t('desktop.msg8')}}</p>
							<hr>
							<p>{{$t('desktop.msg9')}}</p>
							<p>{{$t('desktop.msg10')}}<span>{{$t('desktop.msg4')}}</span>{{$t('desktop.msg11')}}</p>
							<p>{{$t('desktop.msg12')}}</p>
							<p>{{$t('desktop.msg13')}}</p>
						</div>
					</div>
				</div>
				<div class='chart-container' v-show='callBackUpDown'>
					<div class="chart" ref='callCharts'></div>
				</div>
			</div>
		</div>
		<cmptMenuTagChoose :openKey='addMenuKey' :value='saveMenuList' @on-change='changeMenu'></cmptMenuTagChoose>
	</div>
</template>

<script>
	import cmptMenuTagChoose from 'components/menuTagChoose.vue'
	import echarts from 'echarts'
	export default {
		components: {cmptMenuTagChoose},
		data () {
			return {
				msg: '',
				menuKey: true,
				addMenuKey: false,
				meunUpDown: true,
				saveMenuList: [],


				frontUpDown: true,
				frontKey: false,
				formFrontShow: {
					amount1: 0,
					amount2: 0,
					dealNum1: 0,
					dealNum2: 0,
					triageNum1: 0,
					triageNum2: 0
				},
				frontType: 'dealMoney',
				frontXAxis: [],
				frontChartsMenu: [
					{
						type: 'dealMoney',
						name: '单位：元',
						data1: [],
						data2: []
					},
					{
						type: 'dealNum',
						name: '单位：人',
						data1: [],
						data2: []
					},
					{
						type: 'frontNum',
						name: '单位：人',
						data1: [],
						data2: []
					},
					{
						type: 'dealRate',
						name: '单位：%',
						data1: [],
						data2: []
					}
				],
				formFront: {
					dateType: 1,
					newType: 1,
					oldType: 1,
					customerType: '',
				},
				chart: null,

				timer: null,

				appointmentUpDown: true,
				appointmentKey: false,
				appointmentData: [],
				appointmentCol: [
					{
						title: this.$t('desktop.colTit1'),
						width: 100,
						key: 'cusId',
						sortable: true,
						render: (h, params) => {
							return h('span', {
								style: {
									cursor: 'pointer',
									color: 'orange'
								},
								on: {
									click: () => {
										this.toCusIndex(params.row)
									}
								},
							}, params.row.cusName + '(' + params.row.cusId + ')')
						}
					},
					{
						title: this.$t('desktop.colTit2'),
						width: 110,
						key: 'time',
						sortable: true,
						render: (h, params) => {
							return h('p', params.row.start + '-' + params.row.end)
						}
					},
					{
						title: this.$t('desktop.colTit3'),
						width: 70,
						sortable: true,
						key: 'typeKey',
						render: (h, params) => {
							return h('span', params.row.type)
						}
					},
					{
						title: this.$t('desktop.colTit4'),
						width: 100,
						render: (h, params) => {
							return h('ul', params.row.chargeList.map(item => {
								return h('li', item)
							}))
						}
					},
					{
						title: this.$t('desktop.colTit5'),
						width: 120,
						key: 'remark'
					},
					{
						title: this.$t('desktop.colTit6'),
						width: 60,
						key: 'userName'
					}
				],

				chart1: null,
				callBackKey: false,
				callBackUpDown: true,
				formCallBack: {
					dateType: 1,
				},
				callBackType: 'work',
				formCallShow: {
					total1: 0,
					total2: 0,
					finish1: 0,
					finish2: 0,
				},
				callBackXAxis: [],
				callChartsMenu: [
					{
						type: 'work',
						name: '单位：次',
						opacity: 0,
						data1: [],
						data2: [],
						line1: [],
						line2: []
					},
					{
						type: 'done',
						name: '单位：%',
						opacity: 0.2,
						data1: [],
						data2: [],
						line1: [],
						line2: []
					}
				],
			}
		},
		watch: {
			viewResize (val) {
				console.log('menuTodo')
				this.init()
			},
		},
		computed: {
			viewResize () {
				return this.$store.getters.getViewResize;
			},
			frontAmount () {
				let num = null
				if(this.formFrontShow.amount1) {
					num = (this.formFrontShow.amount2 - this.formFrontShow.amount1) / Math.abs(this.formFrontShow.amount1) * 100
				} else {
					if(this.formFrontShow.amount2) {
						num = 100
					} else {
						num = 0
					}
				}
				return parseFloat(num.toFixed(2))
			},
			frontDeal () {
				let num = null
				if(this.formFrontShow.dealNum1) {
					num = (this.formFrontShow.dealNum2 - this.formFrontShow.dealNum1) / this.formFrontShow.dealNum1 * 100
				} else {
					if(this.formFrontShow.dealNum2) {
						num = 100
					} else {
						num = 0
					}
				}
				return parseFloat(num.toFixed(2))
			},
			frontTriage () {
				let num = null
				if(this.formFrontShow.triageNum1) {
					num = (this.formFrontShow.triageNum2 - this.formFrontShow.triageNum1) / this.formFrontShow.triageNum1 * 100
				} else {
					if(this.formFrontShow.triageNum2) {
						num = 100
					} else {
						num = 0
					}
				}
				return parseFloat(num.toFixed(2))
			},
			frontDealNum () {
				let num = null
				if(this.formFrontShow.triageNum2) {
					num = (this.formFrontShow.dealNum2) / this.formFrontShow.triageNum2 * 100 > 100
						? 100
						: (this.formFrontShow.dealNum2) / this.formFrontShow.triageNum2 * 100;
				} else {
					if(this.formFrontShow.dealNum2) {
						num = 100
					} else {
						num = 0
					}
				}
				return parseFloat(num.toFixed(2))
			},
			frontDealPercent () {
				let num = null,
				num1 = null
				if(this.formFrontShow.triageNum1) {
					num = this.formFrontShow.dealNum1 / this.formFrontShow.triageNum1 * 100 > 100
						? 100
						: this.formFrontShow.dealNum1 / this.formFrontShow.triageNum1 * 100;
				} else {
					if(this.formFrontShow.dealNum1) {
						num = 100
					} else {
						num = 0
					}
				}
				
				if(num) {
					num1 = (this.frontDealNum - num) / num * 100
				} else {
					if(this.frontDealNum) {
						num1 = 100
					} else {
						num1 = 0
					}
				}
				return parseFloat(num1.toFixed(2))
			},
			forntChartsTit () {
				if(this.formFront.dateType === 1) {
					return ['本周数据', '上周数据']
				} else {
					return ['本月数据', '上月数据']
				}
			},
			formCallTotal () {
				let num = null
				if(this.formCallShow.total1) {
					if(this.formCallShow.total2) {
						num = (this.formCallShow.total2 - this.formCallShow.total1) / this.formCallShow.total1 * 100
					} else {
						num = 0
					}
				} else {
					if(this.formCallShow.total2) {
						num = 100
					} else {
						num = 0
					}
				}
				return parseFloat(num.toFixed(2))
			},
			formCallFinish () {
				let num = null
				if(this.formCallShow.finish1) {
					num = (this.formCallShow.finish2 - this.formCallShow.finish1) / this.formCallShow.finish1 * 100
				} else {
					if(this.formCallShow.finish2) {
						num = 100
					} else {
						num = 0
					}
				}
				return parseFloat(num.toFixed(2))
			},
			formCallFinishNum () {
				let num = null
				if(this.formCallShow.total2) {
					num = this.formCallShow.finish2 / this.formCallShow.total2 * 100
				} else {
					if(this.formCallShow.finish2) {
						num = 100
					} else {
						num = 0
					}
				}
				return parseFloat(num.toFixed(2))
			},
			formCallFinishPercent () {
				let num = null,
				num1 = null
				if(this.formCallShow.total1) {
					num = this.formCallShow.finish1 / this.formCallShow.total1 * 100
				} else {
					if(this.formCallShow.finish1) {
						num = 100
					} else {
						num = 0
					}
				}
				
				if(num) {
					num1 = (this.formCallFinishNum - num) / num * 100
				} else {
					if(this.formCallFinishNum) {
						num1 = 100
					} else {
						num1 = 0
					}
				}
				return parseFloat(num1.toFixed(2))
			},
			callChartsTit () {
				if(this.formCallBack.dateType === 1) {
					return ['本周数据', '上周数据']
				} else {
					return ['本月数据', '上月数据']
				}
			},
		},
		created () {
			this.getMeunList()
		},
		mounted () {
			let _vm = this
			const navList = JSON.parse(localStorage.getItem('navLink'))
			const frontList = navList.filter(item => item.id === 'hospital')[0].child || []
			if(frontList.length) {
				const index = frontList.findIndex(item => item.id === 'liveDesk')
				if(index >= 0) {
					_vm.frontKey = true
					_vm.$nextTick(() => {
						_vm.initChart(1)
						_vm.getFrontDealList()
					})
				} else {
					_vm.frontKey = false
				}
				const index1 = frontList.findIndex(item => item.id === 'appointmentToday')
				if(index1 >= 0) {
					_vm.appointmentKey = true
					_vm.getAppointmentList()
				} else {
					_vm.appointmentKey = false
				}
				const index2 = frontList.findIndex(item => item.id === 'callbackDesk')
				if(index2 >= 0) {
					_vm.callBackKey = true
					_vm.$nextTick(() => {
						_vm.initChart(2)
						_vm.getCallBackList()
						
					})
				} else {
					_vm.callBackKey = false
				}
				if(_vm.callBackKey || _vm.frontKey) {
					window.addEventListener('resize', _vm.init)
				}
			}
		},
		beforeDestroy () {
			let _vm = this
			if(_vm.frontKey) {
				_vm.chart.dispose()
				_vm.chart = null
			}
			if(_vm.callBackKey) {
				_vm.chart1.dispose()
				_vm.chart1 = null
			}
			if(_vm.callBackKey || _vm.frontKey) {
				window.removeEventListener('resize', _vm.init)
			}
			_vm.timer = null;
		},
		methods: {
			getMeunList () {
				let _vm = this
				_vm.$store.dispatch('setPageLoading', -1)
				_vm.$http.get({
					url: 'guard-webManager/home/list.jhtml',
					success: function(res){
						console.log(res)
						if(res.data.code === 0) {
							_vm.saveMenuList = res.data.content.favMenuList || []
							_vm.$store.dispatch('setPageLoading', 1)
						}
					},
					error: function(res){
						console.log(res)
					}
				})
			},
			getFrontDealList () {
				let _vm = this
				if(_vm.formFront.newType && _vm.formFront.oldType) {
					_vm.formFront.customerType = 3
				} else if(_vm.formFront.newType && !_vm.formFront.oldType) {
					_vm.formFront.customerType = 1
				} else {
					_vm.formFront.customerType = 2
				}
				_vm.$http.get({
					url: 'guard-webManager/home/getDealChart.jhtml',
					data: _vm.formFront,
					success: function(res){
						console.log(res)
						if(res.data.code === 0) {
							_vm.formFrontShow = {
								amount1: res.data.content.totalAmount1 || 0,
								amount2: res.data.content.totalAmount2 || 0,
								dealNum1: res.data.content.totalDealNum1 || 0,
								dealNum2: res.data.content.totalDealNum2 || 0,
								triageNum1: res.data.content.totalTriageNum1 || 0,
								triageNum2: res.data.content.totalTriageNum2 || 0
							}
							_vm.frontXAxis = res.data.content.dateList || []
							_vm.frontChartsMenu[0].data1 = res.data.content.amountList1 || []
							_vm.frontChartsMenu[0].data2 = res.data.content.amountList2 || []
							_vm.frontChartsMenu[1].data1 = res.data.content.dealNumList1 || []
							_vm.frontChartsMenu[1].data2 = res.data.content.dealNumList2 || []
							_vm.frontChartsMenu[2].data1 = res.data.content.triageNumList1 || []
							_vm.frontChartsMenu[2].data2 = res.data.content.triageNumList2 || []
							_vm.frontChartsMenu[3].data1 = res.data.content.dealPercentList1.map(item => (item * 100).toFixed(2)) || []
							_vm.frontChartsMenu[3].data2 = res.data.content.dealPercentList2.map(item => (item * 100).toFixed(2))|| []
							_vm.undateLiveChart(_vm.frontType)
						}
					},
					error: function(res){
						console.log(res)
					}
				})
			},
			getAppointmentList () {
				let _vm = this
				_vm.$http.get({
					url: 'guard-webManager/home/getAppointment.jhtml',
					success: function(res){
						console.log(res)
						if(res.data.code === 0) {
							const _realTreat = res.data.content.treatList.map(item => {
								return {
									cusName: item.customerName || '',
									cusId: item.customerID || '',
									start: item.appointmentStartTime || '',
									end: item.appointmentEndTime || '',
									time: new Date(item.appointmentDate + ' ' + item.appointmentStartTime) || 0,
									type: '治疗(线下)',
									typeKey: 1,
									chargeList: [item.chargeName] || [],
									remark: item.remark || '',
									userName: item.userName || ''
								}
							}) || [] 
							const _realOnline = res.data.content.betterList.map(item => {
								return {
									cusName: item.customerName || '',
									cusId: item.guardCustomerId || '',
									start: item.appointStartTime || '',
									end: item.appointEndTime || '',
									time: new Date(item.appointDate + ' ' + item.appointStartTime) || 0,
									type: '治疗(线上)',
									typeKey: 2,
									chargeList: [item.guardChargeName] || [],
									remark: item.remark || '',
									userName: item.guardDoctorName || ''
								}
							}) || []
							const _realSurgery = res.data.content.surgeryList.map(item => {
								return {
									cusName: item.customerName || '',
									cusId: item.customerid || '',
									start: item.appointmenttimestart.split(' ')[1] || '',
									end: item.appointmenttimeend.split(' ')[1] || '',
									time: new Date(item.appointmenttimestart) || 0,
									type: '手术',
									typeKey: 3,
									chargeList: item.detailList.map(sur => sur.chargeName) || [],
									remark: item.remark || '',
									userName: item.userName || ''
								}
							}) || [] 
							const _realConsult = res.data.content.appList.map(item => {
								return {
									cusName: item.customerName || '',
									cusId: item.customerid || '',
									start: item.appointmentstarttime || '',
									end: item.appointmentendtime || '',
									time: new Date(item.appointmentdate.split(' ')[0] + ' ' + item.appointmentstarttime) || 0,
									type: '咨询',
									typeKey: 4,
									chargeList: [],
									remark: item.content || '',
									userName: item.userName || ''
								}
							}) || []
							_vm.appointmentData = [..._realTreat, ..._realOnline, ..._realSurgery, ..._realConsult]
						}
					},
					error: function(res){
						console.log(res)
					}
				})
			},
			getCallBackList () {
				let _vm = this
				_vm.$http.get({
					url: 'guard-webManager/home/getCallBack.jhtml',
					data: _vm.formCallBack,
					success: function(res){
						console.log(res)
						if(res.data.code === 0) {
							_vm.formCallShow = {
								total1: res.data.content.total1 || 0,
								total2: res.data.content.total2 || 0,
								finish1: res.data.content.totalFinish1 || 0,
								finish2: res.data.content.totalFinish2 || 0
							}
							_vm.callBackXAxis = res.data.content.dateList || []
							_vm.callChartsMenu[0].data1 = res.data.content.numList1 || []
							_vm.callChartsMenu[0].data2 = res.data.content.numList2 || []
							_vm.callChartsMenu[0].line1 = [
								{
									coord: [_vm.callBackXAxis[0], _vm.formCallShow.total1]
								},
								{
									coord: [_vm.callBackXAxis[_vm.callBackXAxis.length - 1], 0]
								}
							]
							_vm.callChartsMenu[0].line2 = [
								{
									coord: [_vm.callBackXAxis[0], _vm.formCallShow.total2]
								},
								{
									coord: [_vm.callBackXAxis[_vm.callBackXAxis.length - 1], 0]
								}
							]
							_vm.callChartsMenu[1].data1 = res.data.content.percentList1.map(item => (item * 100).toFixed(2)) || []
							_vm.callChartsMenu[1].data2 = res.data.content.percentList2.map(item => (item * 100).toFixed(2)) || []
							_vm.callChartsMenu[1].line1 = [
								{},{}
							]
							_vm.callChartsMenu[1].line2 = [
								{},{}
							]
							_vm.undateCallChart(_vm.callBackType)
						}
					},
					error: function(res){
						console.log(res)
					}
				})
			},
			editMenu () {
				this.menuKey = false
			},
			cancleMenu () {
				this.menuKey = true
				this.getMeunList()
			},
			addMenu () {
				this.addMenuKey = !this.addMenuKey
			},
			changeMenu (data) {
				this.saveMenuList.splice(0, this.saveMenuList.length, ...data)
			},
			removeMenu (index, data) {
				if(this.menuKey) {
					this.toView(data)
				} else {
					this.saveMenuList.splice(index, 1)
				}
			},
			saveMenu () {
				let _vm = this
				_vm.$http.post({
					url: 'guard-webManager/home/updateMenu.jhtml',
					data: {menuList: _vm.saveMenuList.map(item => item.id).join(',')},
					success: function(res){
						if(res.data.code === 0) {
							_vm.$Notice.success({
								title: '系统提示！',
								desc: '保存成功！'
							})
							_vm.menuKey = true
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
			toView (data) {
				let breadData = [
					{
						url: '/desktop',
						text: 'layoutNav.desk'
					},
					{
						url: data.url,
						text: 'layoutNav.' + data.id
					},
				]
				this.$store.dispatch('setBreadData', breadData)
				this.$router.push(data.url)
			},


			changeFrontTime (val) {
				this.formFront.dateType = val
				this.getFrontDealList()
			},
			changeNewOld (val) {
				if(val) {
					if(this.formFront.newType === 0) {
						this.formFront.newType = 1
					} else if(this.formFront.newType === 1 && this.formFront.oldType === 1){
						this.formFront.newType = 0
					}
				} else {
					if(this.formFront.oldType === 0) {
						this.formFront.oldType = 1
					} else if(this.formFront.newType === 1 && this.formFront.oldType === 1){
						this.formFront.oldType = 0
					}
				}
				this.getFrontDealList()
			},


			changeFrontChartType (type) {
				this.frontType = type
				this.undateLiveChart(type)
			},
			init () {
				clearTimeout(this.timer);
				this.timer = setTimeout(() => {
					console.log('+++++')
					if(this.chart) {
						console.log(11111111);
						this.chart.resize();
					};
					if(this.chart1) {
						console.log(222222222);
						this.chart1.resize();
					};
				}, 200);
			},
			initChart (type) {
				let _vm = this,
				_option = {
					legend: {
						itemWidth: 20,
						itemHeight: 10,
						itemGap: 30,
						right: 0,
						textStyle: {
							fontSize: 13,
						},
						data: []
					},
					tooltip: {
						trigger: 'axis',
					},
					grid: {
						left: '10px',
						right: '20px',
						bottom: '3%',
						containLabel: true
					},
					xAxis: {
						type: 'category',
						boundaryGap: false,
						data: []
					},
					yAxis: {
						type: 'value'
					},
					series: [
						{
							name: '本周数据',
							type: 'line',
							smooth: true,
							lineStyle: {
								normal: {
									width: 1
								}
							},
							itemStyle: {
								normal: {
									color: '#4172F6'
								}
							},
							label: {
								emphasis	: {
									show: true,
									position: 'top',
									textStyle: {
										color: '#4172F6',
									},
									formatter: (a) => {
										const num = a.data.toString().split('.')[0];
										const decimal = a.data.toString().split('.')[1]
											? '.' + a.data.toString().split('.')[1]
											: '';
										const val = num.replace(/(\d)(?=(\d{3})+$)/g, '$1,') + decimal;
										return val;
									}
								}
							},
							data: []
						},
						{
							name: '上周数据',
							type: 'line',
							smooth: true,
							lineStyle: {
								normal: {
									width: 1,
									color: '#FF6F76',
								}
							},
							itemStyle: {
								normal: {
									color: '#FF6F76'
								}
							},
							label: {
								emphasis	: {
									show: true,
									position: 'top',
									textStyle: {
										color: '#FF6F76',
									},
									formatter: (a) => {
										const num = a.data.toString().split('.')[0];
										const decimal = a.data.toString().split('.')[1]
											? '.' + a.data.toString().split('.')[1]
											: '';
										const val = num.replace(/(\d)(?=(\d{3})+$)/g, '$1,') + decimal;
										return val;
									}
								}
							},
							data: []
						},
					]
				}
				if(type === 1) {
					_vm.chart = echarts.init(_vm.$refs.frontCharts)
					_vm.chart.setOption(_option)
				} else {
					console.log('callback')
					_vm.chart1 = echarts.init(_vm.$refs.callCharts)
					_vm.chart1.setOption(_option)
				}
			},
			undateLiveChart (type) {
				this.chart.resize()
				const index = this.frontChartsMenu.findIndex(item => item.type === type)
				if(index >= 0) {
					this.chart.setOption({
						legend: {
							data: this.forntChartsTit
						},
						xAxis: {
							data: this.frontXAxis
						},
						yAxis : [
						{
							name: this.frontChartsMenu[index].name
						}
						],
						series: [
						{
							name: this.forntChartsTit[0],
							areaStyle: {
								normal: {
									color: '#4172F6',
									opacity: 0.2
								}
							},
							data: this.frontChartsMenu[index].data2
						},
						{
							name: this.forntChartsTit[1],
							data: this.frontChartsMenu[index].data1
						}
						] 
					})
				}
			},

			changeUpDown (type) {
				if(type === 1) {
					this.meunUpDown = !this.meunUpDown
				} else if(type === 2) {
					this.frontUpDown = !this.frontUpDown
					if(this.frontUpDown && this.chart) {
						this.$nextTick(() => {
							this.chart.resize()
						})
					}
				} else if(type === 3) {
					this.appointmentUpDown = !this.appointmentUpDown
				} else {
					this.callBackUpDown = !this.callBackUpDown
					if(this.callBackUpDown && this.chart1) {
						this.$nextTick(() => {
							this.chart1.resize()
						})
					}
				}
			},
			toCusIndex (data) {
				const breadData = [
				{
					url: '/desktop',
					text: 'layoutNav.desk'
				},
				{
					url: '/customer',
					text: 'layoutNav.customerManage'
				},
				{
					url: '/customerIndex',
					text: data.cusName
				}
				]
				this.$store.dispatch('setBreadData', breadData)
				this.$router.push({
					path: '/customerIndex',
					query: {
						id: data.cusId
					}
				})
				sessionStorage.setItem("cusName", data.cusName)
				sessionStorage.setItem("cusId", data.cusId)
			},



			changeCallTime (val) {
				this.formCallBack.dateType = val
				this.getCallBackList()
			},
			changeCallChartType (type) {
				this.callBackType = type
				this.undateCallChart(type)
			},
			undateCallChart (type) {
				this.chart1.resize()
				console.log(this.chart1)
				const index = this.callChartsMenu.findIndex(item => item.type === type)
				if(index >= 0) {
					this.chart1.setOption({
						legend: {
							data: this.callChartsTit
						},
						xAxis: {
							data: this.callBackXAxis
						},
						yAxis : [
						{
							name: this.callChartsMenu[index].name
						}
						],
						series: [
						{
							name: this.callChartsTit[0],
							areaStyle: {
								normal: {
									color: '#4172F6',
									opacity: this.callChartsMenu[index].opacity
								}
							},
							data: this.callChartsMenu[index].data2,
							markLine: {
								data: [this.callChartsMenu[index].line2]
							}
						},
						{
							name: this.callChartsTit[1],
							data: this.callChartsMenu[index].data1,
							markLine: {
								data: [this.callChartsMenu[index].line1]
							}
						}
						] 
					})
				}
			},
		}
	}
</script>

<style lang='less' scoped>
	.desktop {
		.container-body {
			padding: 0;
			background-color: #F2F4F8;
			border-radius: 0;
			box-shadow: none;
		}
		.desktop-item {
			margin-bottom: 2px;
			padding: 0 30px 18px;
			background-color: #fff;
			border-radius: 4px;
	    box-shadow: 0 3px 7px 0 rgba(42, 42, 68, 0.1);
		}
		.item-tit {
			position: relative;
			overflow: hidden;
			padding: 18px 32px 18px 0;
			margin-top: 20px;
			h3 {
				float: left;
				font-size: 16px;
				font-weight: normal;
				line-height: 32px;
				color: #181818;
			}
		}
		.tit {
			border: none;
			margin-top: 0;
		}
		.up-down {
			position: absolute;
			right: -3px;
			top: 23px;
			width: 30px;
			height: 30px;
			line-height: 20px;
			text-align: center;
			border-radius: 50%;
			cursor: pointer;
			i {
				font-size: 22px;
				color: #181818;
			}
		}
		.tit-btn {
			float: right;
		}
		.meun-did {
			margin-left: 10px;
			border-color: #4172F6;
			color: #4172F6;
		}
		.front-did {
			margin-left: 10px;
		}
		.meun-did {
			margin-left: 10px;
			border-color: #4172F6;
			color: #4172F6;
		}
		.menu-box {
			overflow: hidden;
			li {
				float: left;
				min-width: 60px;
				padding: 7px;
				border: 1px solid #dedede;
				margin: 0px 15px 15px 0;
				line-height: 16px;
				text-align: center;
				border-radius: 3px;
				cursor: pointer;
				&:hover {
					color: #fff;
					border-color: #4172F6;
					background-color: #4172F6;
				}
			}
			.add {
				border-style: dotted;
				i {
					margin-right: 5px;
				}
			}
			.edit {
				i {
					margin-left: 7px;
				}
			}
		}
		.mes-item {
			margin-bottom: 20px;
			h3 {
				font-size: 28px;
				font-weight: normal;
				line-height: 40px;
				color: #181818;
			}
			p {
				font-size: 14px;
				line-height: 20px;
			}
			span {
				display: inline-block;
				vertical-align: bottom;
				margin-left: 10px;
				font-size: 14px;
				line-height: 20px;
			}
			.up {
				color: #4172F6;
				transform:rotate(45deg);
			}
			.down {
				color: #FF6F76;
				transform:rotate(135deg);
			}
		}
		.chart-container {
			overflow: hidden;
			width: 100%;
			height: 300px;
			margin-top: 10px;
		}
		.chart {
			width: 100%;
			height: 100%;
		}
		.call-back-tab {
			position: relative;
		}
		.call-back-btn {
			position: absolute;
			right: 0;
			top: 15px;
			width: 40px;
			height: 40px;
			line-height: 40px;
			text-align: center;
			z-index: 901;
			cursor: pointer;
			i {
				font-size: 16px;
				color: #FF6F76;
			}
			&:hover .call-back-msg {
				display: block;
			}
		}
		.call-back-msg {
			position: absolute;
			top: 0;
			right: 0;
			width: 600px;
			padding: 15px;
			text-align: left;
			background: #fff;
			border-radius: 4px;
			box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
			display: none;
			p {
				margin-bottom: 5px;
				font-size: 13px;
				line-height: 20px;
			}
			hr {
				height: 1px;
				border: none;
				margin: 10px 0;
				background-color: #dbdbdb;
			}
			span {
				color: #FF6F76;
			}
		}
	}
</style>
