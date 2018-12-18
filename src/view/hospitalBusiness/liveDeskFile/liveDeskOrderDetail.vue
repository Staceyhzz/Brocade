/** 
 * 添加咨询页面 
 */

<template>
  <div class="living-box" style='padding:10px'>
    <div class="addBtn" v-if='powerKey'>
      <Button type="primary" long @click='add'>{{$t('liveDeskOrderDetail.btn')}}</Button>
    </div>
    <div v-else>
      {{powerMsg}}
    </div>
    <Form :label-width="100" ref='formSearch' :model='formSearch'>
      <Row type="flex" justify="start">
				<Col :xs='24' :sm='12' :md="8" :lg="6">
          <Form-item :label="$t('liveDeskOrderDetail.colTit1')" prop='startTime'>
            <Date-picker :transfer='true' type="daterange" placement="bottom-start" style="width: 100%" @on-change='setTime' :clearable='false'
              :value='dateBox'></Date-picker>
          </Form-item>
        </Col>
        <Col :xs='24' :sm='12' :md="8" :lg="6">
          <Form-item :label="$t('labelPublic.yy')" prop='hospitalID'>
            <Select v-model="formSearch.hospitalID" clearable>
              <Option v-for="item in hospList" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
          </Form-item>
        </Col>
        <Col :xs='24' :sm='12' :md="8" :lg="6">
          <Form-item :label="$t('liveDeskOperation.colTit3')" prop='categoryID'>
            <cmptInputOpen :value='categoryName' :placeholder="$t('charge.modalTit3')" @on-open='addCategory' @on-clear='clearCategory'></cmptInputOpen>
          </Form-item>
        </Col>
        <Col :xs='24' :sm='12' :md="8" :lg="6">
          <Form-item :label="$t('liveDeskOperation.colTit4')" prop='chargeName'>
            <Input type="text" :maxlength='20' v-model.trim="formSearch.chargeName" :placeholder="$t('placeholderPublic.input')" @on-enter="getList()"></Input>
          </Form-item>
        </Col>
        <Col :xs='24' :sm='12' :md="8" :lg="6">
          <ul class="header-btn-group">
            <li class="header-item" @click="getList()">
              <Icon type="search"></Icon>{{$t('publicSet.search')}}</li>
            <li class="header-item" @click="handleReset('formSearch')">
              <Icon type="refresh"></Icon>{{$t('publicSet.reset')}}</li>
          </ul>
        </Col>
      </Row>
    </Form>
    <Table stripe :columns="col" :data="data"></Table>
    <cmptLiveOrder :_modalKey='modal' @orderSuccess='getList()' :_orderDocList='doctorList'></cmptLiveOrder>
    <cmptChargeCategoryChoose :placeHolder="$t('charge.modalTit3')" @on-change="chooseCategory" :openKey='categoryOpenKey'></cmptChargeCategoryChoose>
  </div>
</template>

<script>
  import cmptLiveOrder from 'components/liveOrder.vue';
  import cmptChargeCategoryChoose from 'components/chargeCategoryChoose.vue';
  export default {
    components: {
      cmptLiveOrder,
      cmptChargeCategoryChoose
    },
    data() {
      return {
        modal: false,
        powerKey: true,
        powerMsg: '',
        formSearch: {
          startTime: moment().startOf('month').format('YYYY-MM-DD'),
          endTime: moment().endOf('month').format('YYYY-MM-DD'),
          categoryID: '',
          hospitalID: '',
          customerID: sessionStorage.getItem('liveId'),
          chargeName: '',
        },
        categoryOpenKey: false,
        categoryName: '',
        dateBox: [moment().startOf('month').format('YYYY-MM-DD'), moment().endOf('month').format('YYYY-MM-DD')],
        col: [
					{
            title: this.$t('liveDeskOrderDetail.colTit1'),
            width: 80,
            key: 'orderCreateTime',
            render: (h, params) => {
              if (params.row.key) {
                return h('span', this.$t('liveDeskOrderDetail.colTit8'))
              } else {
                if (params.row.orderCreateTime) {
                  const _text = params.row.orderCreateTime.split(' ')[0]
                  return h('span', _text)
                }
              }
            }
          },
          {
            title: this.$t('labelPublic.yy'),
            width: 60,
            key: 'hospitalName'
          },
          {
            title: this.$t('liveDeskOrderDetail.colTit2'),
            width: 60,
            key: 'orderID'
          },
          {
            title: this.$t('liveDeskOrderDetail.colTit3'),
            width: 60,
            render: (h, params) => {
              let _color = '',
                _text = ''
              switch (params.row.orderPaidStatus) {
                case 1:
                  _text = this.$t('liveDeskOrderDetail.colTit9')
                  _color = 'orange'
                  break
                case 2:
                  _text = this.$t('liveDeskOrderDetail.colTit10')
                  _color = 'blue'
                  break
                case 3:
                  _text = this.$t('liveDeskOrderDetail.colTit11')
                  _color = 'red'
                  break
              }
              return h('span', {
                style: {
                  color: _color
                }
              }, _text)
            }
          },
          {
            title: this.$t('liveDeskOperation.colTit3'),
            width: 60,
            key: 'chargeCategoryName'
          },
          {
            title: this.$t('liveDeskOperation.colTit4'),
            width: 60,
            key: 'chargeName'
          },
          {
            title: this.$t('liveDeskOrderDetail.colTit4'),
            width: 80,
            render: (h, params) => {
              if (!params.row.key) {
                const _text = params.row.restNum + '/' + params.row.num
                return h('span', _text)
              }
            }
          },
          {
            title: this.$t('liveDeskOrderDetail.colTit5'),
            width: 80,
            render: (h, params) => {
              if (Number.isFinite(params.row.cardAmount) && Number.isFinite(params.row.cashAmount) && Number.isFinite(
                  params.row.depositAmount) && Number.isFinite(params.row.debtAmount) && Number.isFinite(params.row
                  .couponAmount)) {
                const _text = (params.row.cardAmount + params.row.cashAmount + params.row.couponAmount + params.row
                  .debtAmount + params.row.depositAmount).toFixed(2)
                return h('span', _text)
              }
            }
          },
          {
            title: this.$t('liveDeskOrderDetail.colTit6'),
            width: 80,
            render: (h, params) => {
              if (Number.isFinite(params.row.cardAmount) && Number.isFinite(params.row.cashAmount) && Number.isFinite(
                  params.row.depositAmount)) {
                const _text = (params.row.cardAmount + params.row.cashAmount + params.row.depositAmount).toFixed(2)
                return h('span', _text)
              }
            }
          },
          {
            title: this.$t('liveDeskOrderDetail.colTit7'),
            width: 80,
            render: (h, params) => {
              if (Number.isFinite(params.row.couponAmount)) {
                const _text = (params.row.couponAmount).toFixed(2)
                return h('span', _text)
              }
            }
          },
        ],
        data: [],
        doctorList: [],
      }
    },
    computed: {
      hospList() {
        return this.$store.getters.getSelectRealHospList
      },
      langRouterKey () {
        return this.$store.getters.getLandRouterKey;
      },
    },
    watch: {
      langRouterKey (val) {
        if(val === 'liveDeskOrderDetail') {
          this.getList();
        }
      },
    },
    created() {
      this.getPower()
    },
    mounted() {
      this.getList()
      this.$store.dispatch('setSelectRealHospList')
    },
    methods: {
      getPower() {
        let _vm = this
        _vm.$http.get({
          url: 'guard-webManager/customerRecord/orderAdd.jhtml',
          data: {
            customerId: sessionStorage.getItem('liveId')
          },
          success: function (res) {
            if (res.data.code === 0) {
              _vm.doctorList = eval(res.data.content.Arr) || []
            } else {
              _vm.powerMsg = res.data.desc
              _vm.powerKey = false
            }
          },
          error: function (res) {
            console.log(res)
          }
        })
      },
      getList() {
        let _vm = this
        _vm.$store.dispatch('setPageLoading', -1)
        _vm.$http.getPage({
          url: 'guard-webManager/liveDesk/getOrderdetail.jhtml',
          data: _vm.formSearch,
          success: function (res) {
            console.log(res)
            console.log(res)
            let _data = res.data.content.orderDetailList || []
            let _obj = {
              key: true,
              cardAmount: res.data.content.totalCardAmount || 0,
              cashAmount: res.data.content.totalCashAmount || 0,
              couponAmount: res.data.content.totalCouponAmount || 0,
              debtAmount: res.data.content.totalDebtAmount || 0,
              depositAmount: res.data.content.totalDepositAmount || 0,
            }
            _data.push(_obj)
            if(_vm.langRouterKey !== 'liveDeskOrderDetail') {
              _vm.data = _data;
            } else {
              _vm.requestList(_data, ['chargeCategoryName', 'chargeName']).then(res => _vm.data = res);
            }
            _vm.$store.dispatch('setPageLoading', 1);
          },
          error: function (res) {
            console.log(res)
          }
        })
      },
      setTime(date) {
        this.formSearch.startTime = date[0]
        this.formSearch.endTime = date[1]
      },
      addCategory() {
        this.categoryOpenKey = !this.categoryOpenKey;
      },
      chooseCategory(data) {
        this.formSearch.categoryID = data.id;
        this.categoryName = data.name;
      },
      clearCategory() {
        this.formSearch.categoryID = '';
        this.categoryName = '';
      },
      handleReset(name) {
        this.$refs[name].resetFields()
        this.dateBox = [moment().startOf('month').format('YYYY-MM-DD'), moment().endOf('month').format('YYYY-MM-DD')]
        this.formSearch.startTime = moment().startOf('month').format('YYYY-MM-DD')
        this.formSearch.endTime = moment().endOf('month').format('YYYY-MM-DD')
        this.categoryName = ''
        this.getList()
      },
      add() {
        this.modal = !this.modal
      },
    }
  }

</script>

<style scoped>
  .living-box .addBtn {
    width: 60%;
    margin: 10px auto 15px;
  }

</style>
