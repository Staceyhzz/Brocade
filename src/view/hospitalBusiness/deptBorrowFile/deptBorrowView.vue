/** 
 * 查看借用单 
 */

<template>
  <div class="container-box">
    <div class="container-header">
      <h2>{{$t('deptBorrowView.tit')}}</h2>
    </div>
    <div class="container-body">
      <h3 class="oreder-tit">{{$t('deptBorrow.colTit9')}}</h3>
      <Form ref="formShow" :model='formShow' :label-width="90" label-position="right" style='margin-top:10px;'>
        <Row type="flex" justify="start">
					<Col :xs='24' :sm='12' :md="8" :lg="6">
						<Form-item :label="$t('deptBorrow.colTit3')">
							<span>{{$t('deptBorrow.colTit9')}}</span>
						</Form-item>
					</Col>
					<Col :xs='24' :sm='12' :md="8" :lg="6">
						<Form-item :label="$t('deptBorrow.colTit5')">
							<span>{{formShow.no}}</span>
						</Form-item>
					</Col>
					<Col :xs='24' :sm='12' :md="8" :lg="6">
						<Form-item :label="$t('deptBorrow.colTit6')">
							<span>{{formShow.statusText}}</span>
						</Form-item>
					</Col>
					<Col :xs='24' :sm='12' :md="8" :lg="6">
						<Form-item :label="$t('deptBorrow.colTit1')">
							<span>{{formShow.toName}}</span>
						</Form-item>
					</Col>
					<Col :xs='24' :sm='12' :md="8" :lg="6">
						<Form-item :label="$t('deptBorrow.colTit2')">
							<span>{{formShow.doUserName}}</span>
						</Form-item>
					</Col>
					<Col :xs='24' :sm='12' :md="8" :lg="6">
						<Form-item :label="$t('deptBorrowView.label1')">
							<span>{{hospName}}</span>
						</Form-item>
					</Col>
					<Col :xs='24' :sm='12' :md="8" :lg="6">
						<Form-item :label="$t('deptBorrowView.label2')">
							<span>{{formShow.fromName}}</span>
						</Form-item>
					</Col>
					<Col :xs='24' :sm='12' :md="8" :lg="6">
						<Form-item :label="$t('deptBorrowView.label3')">
							<span>{{formShow.createDate}}</span>
						</Form-item>
					</Col>
					<Col :xs='24' :sm='24' :md="24" :lg="12">
						<Form-item :label="$t('deptBorrowView.label4')">
							<span>{{formShow.remark}}</span>
						</Form-item>
					</Col>
        </Row>
        <hr>
        <Form-item :label="$t('deptBorrowView.label5')">
          <Table stripe :columns="editCol" :data="editData"></Table>
          <p class="sumCount">{{$t('deptBorrowAdd.label9')}}
            <span>{{$t('deptBorrow.colTit7')}}: {{couNum}}</span>
          </p>
        </Form-item>
        <hr>
        <Form-item :label="$t('deptBorrowView.label6')">
          <Table stripe :columns="col1" :data="data1"></Table>
        </Form-item>
      </Form>
      <div class="footer-btnGroup">
        <Button type="primary" icon="checkmark" @click='save' :loading='saveLoad' v-if='this.$route.query.status == 1'>{{$t('deptBorrowView.btn')}}</Button>
        <Button type="primary" icon="printer" @click='print' v-else>{{$t('printView.btn')}}</Button>
        <Button type="primary" icon="android-arrow-back" @click='back'>{{$t('publicSet.back')}}</Button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        hospName: localStorage.getItem('hospName'),
        saveLoad: false,
        formShow: {},
        editCol: [
					{
						title: this.$t('deptBorrow.colTit13'),
						width: 60,
            key: 'name'
          },
          {
            title: this.$t('deptBorrowView.colTit1'),
						width: 60,
            key: 'alias'
          },
          {
            title: this.$t('labelPublic.gg'),
						width: 60,
            key: 'size'
          },
          {
            title: this.$t('labelPublic.dw'),
						width: 60,
            key: 'unitName'
          },
          {
            title: this.$t('deptBorrowView.colTit2'),
						width: 60,
            key: 'borrowNum',
          },
          {
            title: this.$t('deptBorrowView.colTit3'),
						width: 60,
            key: 'useNum',
          },
          {
            title: this.$t('deptBorrowView.colTit4'),
						width: 60,
            key: 'backNum',
          },
          {
            title: this.$t('deptBorrowView.colTit5'),
						width: 60,
            key: 'num',
          },
          {
            title: this.$t('labelPublic.ms'),
						width: 60,
            key: 'remark',
          }
        ],
        col1: [
					{
            title: this.$t('deptBorrowView.colTit6'),
						width: 60,
            key: 'customerName'
          },
          {
            title: this.$t('labelPublic.xm'),
						width: 60,
            key: 'chargeName'
          },
          {
            title: this.$t('deptBorrow.colTit7'),
						width: 60,
            key: 'borrowNum'
          },
          {
            title: this.$t('deptBorrowView.colTit7'),
						width: 60,
            key: 'operationTime'
          },
          {
            title: this.$t('deptBorrowView.colTit8'),
						width: 60,
            render: (h, params) => {
              return h('div', params.row.detailList.map(item => {
                const _text = typeof item.positionName == 'string' ? ': ' + item.positionName : ''
                return h('p', item.userName + _text)
              }))
            }
          },
          {
            title: this.$t('deptBorrow.colTit13'),
						width: 60,
            key: 'productName',
          },
          {
            title: this.$t('deptBorrowView.colTit9'),
						width: 60,
            key: 'operationNum',
          }
        ],
        editData: [],
        data1: [],
      }
    },
    computed: {
			borrowOrderStatus() {
        return this.$store.getters.getBorrowOrderStatus;
      },
      couNum() {
				const sum = this.editData.reduce((pre, cur) => cur.num + pre, 0) || 0;
				return sum;
			},
			langRouterKey () {
        return this.$store.getters.getLandRouterKey;
      },
		},
		watch: {
      langRouterKey (val) {
        if(val === 'deptBorrowView') {
          this.getList();
        }
      },
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        let _vm = this
        _vm.$store.dispatch('setPageLoading', -1)
        _vm.$http.getPage({
          url: 'guard-webManager/deptBorrow/getBorrowRetrun.jhtml',
          data: {
            borrowId: _vm.$route.query.id
          },
          success: function (res) {
            console.log(res)
            let _obj = res.data.content.borrow || {};
            _obj.createDate = _obj.createDate
              ? _obj.createDate.split(' ')[0]
              : '';
            const index = _vm.borrowOrderStatus.findIndex(item => item.id === _obj.status);
            _obj.statusText = index >= 0
              ? _vm.$t('borrowOrderStatus' + _obj.status)
              : '';

            const _data = _obj.detailList.map(item => {
              return {
                ...item.product,
                borrowNum: item.num,
                price: item.price,
                amount: item.amount,
                ProductID: item.product.id,
                num: item.returnNum,
                useNum: item.num - item.returnNum - item.backNum,
                backNum: item.backNum,
                stockInDetailID: item.stockInDetailID
              };
            }) || [];

            const _data1 = res.data.content.opList || [];
            if(_vm.langRouterKey !== 'deptBorrowView') {
              _vm.formShow = _obj;
              _vm.editData = _data;
              _vm.data1 = _data1;
            } else {
              _vm.requestList([_obj], ['fromName', 'toName', 'remark']).then(res => _vm.formShow = res[0]);
              _vm.requestList(_data, ['name', 'alias', 'unitName', 'size', 'remark']).then(res => _vm.editData = res);
              _vm.requestList(_data1, ['chargeName', 'productName']).then(res => _vm.data1 = res);
            }
            _vm.$store.dispatch('setPageLoading', 1);
          },
          error: function (res) {
            console.log(res)
          }
        })
      },
      save() {
				let _vm = this;
				let _data = {};
				let _url = '';
				const _bool = _vm.editData.findIndex(item => item.num !== 0) < 0
					? true
					: false;
        _vm.saveLoad = true;
        if (_bool) {
          _url = 'guard-webManager/deptBorrow/updateBorrowRetrun.jhtml'
          _data = {
            id: _vm.formShow.id
          }
        } else {
          _url = 'guard-webManager/deptBorrow/addBorrowRetrun.jhtml'
          _data = {
            fromWarehouseID: _vm.formShow.toWarehouseID,
            toWarehouseID: _vm.formShow.fromWarehouseID,
            borrowID: _vm.formShow.id,
            doUserID: _vm.formShow.doUserID,
            remark: _vm.formShow.remark,
            detailListStr: JSON.stringify(_vm.editData),
          }
        }
        _vm.$http.post({
          url: _url,
          data: _data,
          success: function (res) {
            if (res.data.code === 0) {
              _vm.$router.push('/deptBorrow')
              _vm.$Notice.success({
								title: _vm.$t('publicSet.noticeTit'),
								desc: _vm.$t('publicSet.noticeSuccess')
							});
            } else {
              _vm.saveLoad = false
              if(_vm.langRouterKey !== 'deptBorrowView') {
								_vm.$Notice.error({
									title: _vm.$t('publicSet.noticeTit'),
									desc: res.data.desc
								});
							} else {
								_vm.getLang.word(res.data.desc, (data) => {
									_vm.$Notice.error({
										title: _vm.$t('publicSet.noticeTit'),
										desc: data[0].dst
									});
								});
							}
            }
          },
          error: function (res) {
            console.log(res);
          }
        })
      },
      print() {
        let breadData = [
					{
            url: '/desktop',
            text: 'layoutNav.desk'
          },
          {
            url: '/deptBorrow',
            text: 'layoutNav.deptBorrow'
          },
          {
            url: '/printView',
            text: 'printView.tit'
          }
        ]
        this.$store.dispatch('setBreadData', breadData)
        this.$router.push({
          path: '/printView',
          query: {
            id: this.$route.query.id,
            type: 'borrow',
          }
        })
      },
      back() {
        this.$router.back(-1)
      }
    }

  }

</script>

<style scoped>
  hr {
    width: 100%;
    height: 1px;
    margin-bottom: 15px;
    border: none;
    background: rgba(65, 65, 65, 0.1);
  }

  .sumCount {
    padding: 15px 0;
  }

  .sumCount span {
    margin: 0px 15px;
  }

</style>
