<!-- managerUsersDealDetail -->
<!-- 咨询人员成交明细表 -->
/**
* 咨询人员成交明细表
*/

<template>
  <div class="container-box" ref="containerBox">
    <div class="container-header">
      <h2>咨询人员成交明细表</h2>
      <ul class="header-btn-group">
        <li class="header-item" @click="exportTable" v-if="exportKey === '1'">
          <Icon type="ios-download-outline"></Icon>导出
        </li>
      </ul>
    </div>
    <div class="container-body">
      <form :action="exportPrefixURL" method="get" ref="formSubmit" v-show="show">
        <input name="startTime" :value="formSearch.startTime">
        <input name="endTime" :value="formSearch.endTime">
        <input name="newOldType" :value="formSearch.newOldType">
        <input name="clinicType" :value="formSearch.clinicType">
        <input name="orderType" :value="formSearch.orderType">
        <input name="dealStatus" :value="formSearch.dealStatus">
        <input name="itemGroupId" :value="formSearch.itemGroupId">
        <input name="itemId" :value="formSearch.itemId">
        <input name="customerId" :value="formSearch.customerId">
        <input name="channelId" :value="formSearch.channelId">
        <input name="channelGroupId" :value="formSearch.channelGroupId">
        <input name="managerUserId" :value="formSearch.managerUserId">
        <input name="exploitUserId" :value="formSearch.exploitUserId">
        <input name="storeId" :value="formSearch.storeId">
        <input name="customerName" :value="formSearch.customerName">
        <input name="firstDealTimeStart" :value="formSearch.firstDealTimeStart">
        <input name="firstDealTimeEnd" :value="formSearch.firstDealTimeEnd">
        <input name="adminToken" :value="adminToken">
      </form>
      <Form :label-width="100" inline :model="formSearch" ref='formSearch'>
        <Form-item label="收银日期" prop='startTime'>
          <Date-picker :transfer='true' type="daterange" placement="bottom-start" placeholder="选择日期" :clearable="false"
            style="width: 190px" @on-change='setDate_1' :value='dateBox_1'></Date-picker>
        </Form-item>
        <Form-item label="新老客" prop='newOldType'>
          <Select v-model="formSearch.newOldType" clearable style="width:200px">
            <Option v-for="item in newOldTypeList" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
        </Form-item>
        <Form-item label="门诊类型" prop='clinicType'>
          <Select v-model="formSearch.clinicType" clearable style="width:200px">
            <Option v-for="item in clinicTypeList" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
        </Form-item>
        <Form-item label="订单类型" prop='orderType'>
          <Select v-model="formSearch.orderType" clearable style="width:200px">
            <Option v-for="item in orderTypeList" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
        </Form-item>
        <Form-item label="成交状态" prop='dealStatus'>
          <Select v-model="formSearch.dealStatus" clearable style="width:200px">
            <Option v-for="item in dealStatusList" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
        </Form-item>
        <Form-item label="意向分类" prop='itemGroupId'>
          <Select v-model="formSearch.itemGroupId" clearable style="width:200px">
            <Option v-for="item in itemGroupList" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
        </Form-item>
        <Form-item label="消费意向" prop='itemId'>
          <Select v-model="formSearch.itemId" clearable style="width:200px">
            <Option v-for="item in itemList" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
        </Form-item>
        <Form-item label="客户来源归类" prop='channelGroupId'>
          <Select v-model="formSearch.channelGroupId" clearable style="width:200px">
            <Option v-for="item in channelGroupList" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
        </Form-item>
        <Form-item label="来源" prop='channelId'>
          <cmptRemoteFilterChannel _placeHolder='输入拼音汉字快捷搜索' @setChannelName='setChannelName' ref='remoteChannel'></cmptRemoteFilterChannel>
        </Form-item>
        <Form-item label="咨询人员" prop='managerUserId'>
          <cmptHospChooseUser _placeHolder="请选择用户" :_style="{width:'162px'}" :_userName="managerUserName"
            v-on:setUserName="setManagerUser"></cmptHospChooseUser>
        </Form-item>
        <Form-item label="开发人员" prop='exploitUserId'>
          <cmptHospChooseUser _placeHolder="请选择用户" :_style="{width:'162px'}" :_userName="exploitUserName"
            v-on:setUserName="setExploitUser"></cmptHospChooseUser>
        </Form-item>
        <Form-item label="渠道" prop='storeId'>
          <cmptRemoteFilterStore _placeHolder="选择渠道" @setStoreName="setStore" ref='remoteStore'></cmptRemoteFilterStore>
        </Form-item>
        <Form-item label="初次成交" prop='firstDealTimeStart'>
          <Date-picker :transfer='true' type="daterange" placement="bottom-start" placeholder="选择日期" :clearable="false"
            style="width: 190px" @on-change='setDate_2' ref='cleanDate'></Date-picker>
        </Form-item>
        <Form-item label="客户编号" prop='customerId'>
          <Input type="text" :maxlength='15' v-model.trim="formSearch.customerId" placeholder="请输入客户编号" @on-enter="getList(1, formSearch)"></Input>
        </Form-item>
        <Form-item label="客户名称" prop='customerName'>
          <Input type="text" :maxlength='15' v-model.trim="formSearch.customerName" placeholder="请输入名称" @on-enter="getList(1, formSearch)"></Input>
        </Form-item>
        <ul class="header-btn-group not-float">
          <li class="header-item" @click="getList(1, formSearch)">
            <Icon type="search"></Icon>查询
          </li>
          <li class="header-item" @click="handleReset('formSearch')">
            <Icon type="refresh"></Icon>重置
          </li>
        </ul>
      </Form>
      <Alert>
        <div v-html="TotalText">{{TotalText}}</div>
      </Alert>
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
        show: false,
        adminToken: this.$token.readToken('adminToken') || '',
        exportKey: localStorage.getItem('exportKey'),
        total: 0,
        message: '',
        totalPages: 1,
        pageNumber: 1,
        TotalText: '',
        managerUserName: '',
        exploitUserName: '',
        formSearch: {
          startTime: moment().format('YYYY-MM-DD'),
          endTime: moment().format('YYYY-MM-DD'),
          newOldType: '',
          clinicType: '',
          orderType: '',
          dealStatus: '',
          itemId: '',
          itemGroupId: '',
          channelId: '',
          channelGroupId: '',
          managerUserId: '',
          exploitUserId: '',
          storeId: '',
          firstDealTimeStart: '',
          firstDealTimeEnd: '',
          customerId: '',
          customerName: '',
        },
        dateBox_1: [moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')],
        newOldTypeList: [{
          id: 1,
          name: '新客'
        }, {
          id: 2,
          name: '老客'
        }],
        clinicTypeList: [{
            id: 1,
            name: '初诊'
          },
          {
            id: 2,
            name: '复诊'
          },
          {
            id: 3,
            name: '复查'
          },
          {
            id: 4,
            name: '再消费'
          }
        ],
        orderTypeList: [{
            id: 1,
            name: '项目单'
          },
          {
            id: 3,
            name: '预收款单'
          },
          {
            id: 5,
            name: '退预收款单'
          },
          {
            id: 4,
            name: '退项目单'
					},
					{
            id: 7,
            name: '渠道充值单'
          },
          {
            id: 10,
            name: '还款单'
          }
        ],
        dealStatusList: [{
          id: 0,
          name: '未成交'
        }, {
          id: 1,
          name: '已成交'
        }],
        col: [{
            title: '序号',
            width: 40,
            render: (h, params) => {
              const _index = (this.pageNumber - 1) * 10
              return h('span', params.index + 1 + _index)
            }
          },
          {
						title: '收银日期',
						width: 80,
            render: (h, params) => {
              const _text = moment(params.row.createDate).format('YYYY-MM-DD')
              return h('span', _text)
            }
          },
          {
						title: '收银时间',
						width: 80,
            key: 'createTime'
          },
          {
						title: '到诊医院',
						width: 60,
            key: 'hospitalName'
          },
          {
						title: '客户编号',
						width: 60,
            render: (h, params) => {
							const text = params.row.orderType === 7 ? params.row.distributionUserID : params.row.customerID;
							return h('span', text);
						}
          },
          {
						title: '客户姓名',
						width: 60,
            render: (h, params) => {
							const text = params.row.orderType === 7 ? params.row.distributionUserName : params.row.customerName;
							return h('span', text);
						}
          },
          {
						title: '年龄',
						width: 60,
            key: 'age'
          },
          {
						title: '渠道',
						width: 60,
            key: 'storeName'
          },
          {
						title: '初次成交',
						width: 80,
            key: 'firstDealTime'
          },
          {
						title: '客户来源归类',
						width: 60,
            key: 'channelGroupName'
          },
          {
						title: '来源',
						width: 60,
            key: 'channelName'
          },
          {
						title: '开发人员',
						width: 60,
            key: 'exploitUserName'
          },
          {
						title: '咨询人员',
						width: 60,
            key: 'managerUserName'
          },
          {
						title: '开单人员',
						width: 60,
            key: 'orderCreateUserName'
          },
          {
						title: '意向分类 ',
						width: 60,
            key: 'itemGroupName'
          },
          {
						title: '消费意向',
						width: 60,
            key: 'itemName'
          },
          {
						title: '项目',
						width: 60,
            key: 'chargeName'
          },
          {
						title: '主诊医生',
						width: 60,
            key: 'doctorUserName'
          },
          {
						title: '数量',
						width: 60,
            key: 'num'
          },
          {
						title: '类型',
						width: 60,
            key: 'orderType',
            render: (h, params) => {
              let text
              switch (params.row.orderType) {
                case 1:
                  text = '项目单'
                  break
                case 3:
                  text = '预收款单'
                  break
                case 5:
                  text = '退预收款单'
                  break
                case 4:
                  text = '退项目单'
                  break
                case 10:
                  text = '还款单'
                  break
              }
              return h('span', text)
            }
          },
          {
						title: '原价',
						width: 60,
            key: 'originalPrice'
          },
          {
						title: '应收金额',
						width: 60,
            key: 'amount'
          },
          {
						title: '现收金额',
						width: 60,
            key: 'cashCardAmount'
					},
					{
						title: '虚拟币',
						width: 60,
            key: 'virtualCurrencyBalance'
          },
          {
						title: '预收金额',
						width: 60,
            key: 'depositAmount'
          },
          {
						title: '劵金额',
						width: 60,
            key: 'couponAmount'
          },
          {
						title: '欠款',
						width: 60,
            key: 'debtAmount'
          },
          {
						title: '新老客',
						width: 60,
            key: 'newOld',
            render: (h, params) => {
              const color = params.row.newOld == 1 ? 'blue' : 'red'
              const _text = params.row.newOld == 1 ? '新客' : '老客'
              return h('span', {
                style: {
                  color: color
                }
              }, _text)
            }
          },
          {
						title: '门诊类型 ',
						width: 60,
            key: 'clinicType',
            render: (h, params) => {
              let text
              switch (params.row.clinicType) {
                case 1:
                  text = '初诊'
                  break
                case 2:
                  text = '复诊'
                  break
                case 3:
                  text = '复查'
                  break
                case 4:
                  text = '再消费'
                  break
              }
              return h('span', text)
            }
          },

          {
						title: '成交状态 ',
						width: 60,
            key: 'isDeal',
            render: (h, params) => {
              const color = params.row.isDeal == 1 ? 'blue' : 'red'
              const _text = params.row.isDeal == 1 ? '已成交' : '未成交'
              return h('span', {
                style: {
                  color: color
                }
              }, _text)
            }
          },
          {
						title: '成交金额',
						width: 60,
            key: 'dealAmount'
          }
        ],
        data: [],
      }
    },
    computed: {
      itemList() {
        return this.$store.getters.getSelectAllItemList
      },
      itemGroupList() {
        return this.$store.getters.getSelectAllItemGroupList
      },
      channelGroupList() {
        return this.$store.getters.getSelectChannelGroupList
      },
      pageSize() {
        return this.$store.getters.getPageSize
      },
      exportPrefixURL() {
        return this.$store.getters.getExportPrefixURL + '/guard-webManager/excelExport/managerUsersDealDetail.jhtml'
      }
    },
    created() {
      this.getList(1, this.formSearch)
    },
    mounted() {
      this.$store.dispatch('setSelectAllItemList', {});
      this.$store.dispatch('setSelectAllItemGroupList', {})
      this.$store.dispatch('setSelectChannelGroupList', {})
    },
    methods: {
      getList(pageNumber, form) {
        let _vm = this
        _vm.$store.dispatch('setPageLoading', -1)
        form['pageNumber'] = pageNumber
        form['pageSize'] = _vm.pageSize
        _vm.$http.get({
          url: 'guard-webManager/report/managerUsersDealDetail.jhtml',
          data: form,
          success: function (res) {
            if (res.data.code == 0) {
              _vm.data = res.data.content.Page.content
              _vm.total = res.data.content.Page.total
              _vm.pageNumber = res.data.content.Page.pageNumber
              _vm.totalPages = res.data.content.Page.totalPages
							_vm.TotalText = res.data.content.TotalText
							_vm.col.find(i => i.key === 'virtualCurrencyBalance').title = res.data.content.VirtualCurrencyName || '虚拟币';
              _vm.$store.dispatch('setPageLoading', 1)
              console.log(res)
            } else {
              console.log(res.data.desc)
            }
          },
          error: function (res) {
            console.log(res);
          }
        });
      },
      //获取弹窗用户
      setManagerUser(data) {
        this.managerUserName = data.name
        this.formSearch.managerUserId = data.id
      },
      setExploitUser(data) {
        this.exploitUserName = data.name
        this.formSearch.exploitUserId = data.id
      },
      //获取弹窗项目
      setStore(data) {
        this.formSearch.storeId = data.id
      },
      setDate_1(date) {
        this.formSearch.startTime = date[0]
        this.formSearch.endTime = date[1]
      },
      setDate_2(date) {
        this.formSearch.firstDealTimeStart = date[0]
        this.formSearch.firstDealTimeEnd = date[1]
      },
      setChannelName(data) {
        this.formSearch.channelId = data.id
      },
      changePage(num) {
        this.getList(num, this.formSearch)
      },
      handleReset(name) {
        this.$refs[name].resetFields();
        this.$refs.cleanDate.handleClear()
        if (name == 'formSearch') {
          this.formSearch.startTime = moment().format('YYYY-MM-DD')
          this.formSearch.endTime = moment().format('YYYY-MM-DD')
          this.dateBox_1 = [moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')]
          this.$refs.remoteChannel.clean()
          this.managerUserName = ''
          this.exploitUserName = ''
          this.$refs.remoteStore.clean()
          this.getList(1, this.formSearch)
        }
      },
      exportTable() {
        this.$refs.formSubmit.submit()
      }
    }
  }

</script>
