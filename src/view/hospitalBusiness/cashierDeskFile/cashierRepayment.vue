/** 
 * 还款收银 
 */
<template>
  <div class="container-box">
    <div class="container-header">
      <h2>{{$t('cashierRepayment')}}</h2>
    </div>
    <div class="container-body">
      <Form :model='formShow' :label-width="100" label-position="right">
        <Row type="flex" justify="start">
          <Col :xs='24' :sm='24' :md="12" :lg="12">
						<Form-item :label="$t('cashierDesk.colTit3')">
							<span>{{formShow.customerName}} ({{formShow.customerid}})</span>
						</Form-item>
					</Col>
					<Col :xs='24' :sm='24' :md="12" :lg="12">
						<Form-item :label="$t('cashierDesk.colTit5')">
							<span>{{formShow.createUserName}}</span>
						</Form-item>
					</Col>
					<Col :xs='24' :sm='24' :md="12" :lg="12">
						<Form-item :label="$t('cashierDesk.colTit6')">
							<span>{{formShow.createtime}}</span>
						</Form-item>
					</Col>
					<Col :xs='24' :sm='24' :md="12" :lg="12">
						<Form-item :label="$t('cashierDesk.label1')">
							<span>{{showAmount}}</span>
						</Form-item>
					</Col>
					<Col span="24">
						<Form-item :label="$t('labelPublic.ms')">
							<span>{{formShow.remark}}</span>
						</Form-item>
					</Col>
					<Col span="24">
						<Form-item :label="$t('cashierDesk.colTit12')">
							<Table stripe :columns="col" :data="data"></Table>
							<p class="sumCount">{{$t('cashierDesk.label2')}}
								<span>{{$t('cashierDesk.colTit4')}}: {{showAmount}}</span>
							</p>
						</Form-item>
					</Col>
				</Row>
      </Form>
    </div>
    <div class="container-header">
      <h2>{{$t('cashierDesk.tit')}}</h2>
    </div>
    <div class="container-body">
      <Form ref="formAdd" :model='formAdd' :label-width="100" label-position="right" :rules="ruleForm">
        <Form-item :label="$t('cashierDesk.label3')">
          <span>{{showDebt}}</span>
        </Form-item>
        <Form-item :label="$t('cashierDesk.label4')" prop="cash" required>
          <cmptInputNumber :max="formShow.debtAmount" :min="0" v-model="formAdd.cash" style="width:300px" @on-change='setCard'></cmptInputNumber>
        </Form-item>
        <Form-item :label="$t('cashierDesk.label5')" required prop="cardCategory1Id">
          <div style="margin-bottom: 10px;" v-for='(card, index) in selectBox' :key='index'>
            <Select v-model="card.id" style="width:200px">
              <Option v-for="item in cardList" :value="item.id" :key="item.id" :disabled="item.status === 0">{{item.name}}</Option>
            </Select>
            <cmptInputNumber :max="formShow.debtAmount" :min="0" v-model="card.val" @on-change='setCardVal(index)'></cmptInputNumber>
            <Button type="primary" size='small' icon="plus-round" @click='addCard' v-if='index === 0'></Button>
						<Button type="error" size='small' icon="ios-trash-outline" @click="delCard(index)" v-else></Button>
          </div>
        </Form-item>
        <Form-item :label="$t('labelPublic.ms')" prop="remark">
          <Input v-model="formAdd.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('placeholderPublic.input')"></Input>
        </Form-item>
      </Form>
    </div>
    <div class="footer-btnGroup">
      <Button type="error" icon="checkmark" @click="save(true)" :loading='saveLoad'>{{$t('cashierDesk.btn6')}}</Button>
      <Button type="primary" icon="checkmark" @click="save(false)" :loading='saveLoad'>{{$t('cashierDesk.btn5')}}</Button>
      <Button type="primary" icon="android-arrow-back" @click='back'>{{$t('publicSet.back')}}</Button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      const validateMoney = (rule, value, callback) => {
        const list = this.selectBox.filter(item => item.id !== '');
        const sum = list.reduce((prev, cur) => cur.val + prev, this.formAdd.cash);
        if (!this.useDebt) {
          if (sum.toFixed(2) !== this.formShow.debtAmount.toFixed(2)) {
            callback(new Error(this.$t('cashierDesk.valid1', [this.formShow.debtAmount])));
          } else {
            callback();
          }
        } else {
          if (sum.toFixed(2) >= this.formShow.debtAmount) {
            callback(new Error(this.$t('cashierDesk.valid4', [this.formShow.debtAmount])));
          } else {
            callback();
          }
        }
      };
      const validateChange = (rule, value, callback) => {
				const index = this.selectBox.findIndex(item => item.val > 0 && item.id === '');
				if(index >= 0) {
					callback(new Error(this.$t('cashierDesk.valid2')));
				}
				const list = this.selectBox.filter(item => item.id !== '').map(item => item.id);
				console.log(list)
				console.log(new Set(list))
				if([...new Set(list)].length !== list.length) {
					callback(new Error(this.$t('cashierDesk.valid3')));
				}
				callback();
      };
      return {
        saveLoad: false,
        useDebt: false,
        formAdd: {
          id: '',
          cash: 0,
          debt: '',
          card1: 0,
          card2: 0,
          card3: 0,
          card4: 0,
          card5: 0,
          cardCategory1Id: '',
          cardCategory2Id: '',
          cardCategory3Id: '',
          cardCategory4Id: '',
          cardCategory5Id: '',
          remark: '',
        },
        selectBox: [{id: '', val: 0}],
        cardList: [],
        formShow: {},
        col: [
					{
            title: this.$t('labelPublic.bh'),
            width: 60,
            key: 'chargeID'
          },
          {
            title: this.$t('labelPublic.mc'),
            width: 60,
            key: 'chargeName'
					},
					{
            title: this.$t('cashierDesk.colTit9'),
            width: 60,
            key: 'setName',
          },
          {
            title: this.$t('cashierDesk.colTit8'),
            width: 60,
            key: 'num'
          },
          {
            title: this.$t('cashierDesk.colTit4'),
            width: 60,
            align: 'right',
            key: 'price',
            render: (h, params) => {
              if(Number.isFinite(params.row.price)) {
                return h('span', params.row.price.toFixed(2));
              }
            }
          },
          {
            title: this.$t('cashierDesk.label18'),
            width: 60,
            align: 'right',
            key: 'finalPrice',
            render: (h, params) => {
              if(Number.isFinite(params.row.finalPrice)) {
                return h('span', params.row.finalPrice.toFixed(2));
              }
            }
          }
				],
				data: [],
        ruleForm: {
          cash: [{
            validator: validateMoney,
            trigger: 'blur'
          }],
          cardCategory1Id: [{
            validator: validateChange,
            trigger: 'change'
          }],
        }
      }
    },
    computed: {
      showAmount() {
        if(Number.isFinite(this.formShow.finalprice)) {
          return this.formShow.finalprice.toFixed(2);
        }
      },
      showDebt() {
				if(Number.isFinite(this.formShow.debtAmount)) {
          return this.formShow.debtAmount.toFixed(2);
        }
			},
			langRouterKey () {
        return this.$store.getters.getLandRouterKey;
      },
		},
		watch: {
      langRouterKey (val) {
        if(val === 'cashierRepayment') {
          this.getList(this.$route.query.id);
        }
      },
    },
    created() {
      this.formAdd.id = this.$route.query.id
      this.getList(this.$route.query.id)
    },
    mounted() {
      this.getCard()
    },
    methods: {
      getList(id) {
        let _vm = this;
        _vm.$store.dispatch('setPageLoading', -1)
        _vm.$http.getPage({
          url: 'guard-webManager/cashierDesk/cashierRepayment.jhtml',
          data: {
            id: id
          },
          success: function (res) {
            const _obj = res.data.content || {};
            const _data = _obj.detailList || [];
            _vm.formAdd.cash = _obj.debtamount
              ? _obj.debtamount
              : 0;
            const _col = _vm.tableCount(_data, ['price', 'finalPrice']);
            _col.map(item => {
              const index = _vm.col.findIndex(col => col.key === item.key);
              console.log(item)
              if(index >= 0) {
                _vm.col[index].width = item.width;
              }
            });
            if(_vm.langRouterKey !== 'cashierRepayment') {
              _vm.formShow = _obj;
              _vm.formShow.finalprice = _obj.finalprice
                ? _obj.finalprice
                : 0; 
              _vm.formShow.debtAmount = _obj.debtamount
                ? _obj.debtamount
                : 0;
              _vm.data = _data;
            } else {
              _vm.requestList([_obj], ['remark']).then(res => {
                _vm.formShow = res[0];
                _vm.formShow.finalprice = _obj.finalprice
                  ? _obj.finalprice
                  : 0; 
                _vm.formShow.debtAmount = _obj.debtamount
                  ? _obj.debtamount
                  : 0;
              });
              _vm.requestList(_data, ['chargeName', 'setName']).then(res => _vm.data = res);
            }
            _vm.$store.dispatch('setPageLoading', 1);
          },
          error: function (res) {
            console.log(res);
          }
        });
			},
			getCard() {
        let _vm = this;
        _vm.$http.get({
          url: 'guard-webManager/select/cardCategoryInfo.jhtml',
          success: function (res) {
            if (res.data.code === 0) {
              _vm.cardList = res.data.content || []
            }
          },
          error: function (res) {
            console.log(res);
          }
        });
      },
			setCard(val) {
        this.$nextTick(() => {
          this.formAdd.cash = parseFloat((val).toFixed(2));
          this.selectBox[0].val = parseFloat((this.formShow.debtAmount - parseFloat((val).toFixed(2))).toFixed(2));
        })
      },
      addCard() {
				if(this.selectBox.length < 5) {
					this.selectBox.push({
						id: '',
						val: 0
					});
				}
      },
      delCard(index) {
				this.selectBox.splice(index, 1);
      },
      setCardVal(index) {
				console.log(this.selectBox[index]);
				this.$nextTick(() => {
					this.selectBox[index].val = parseFloat((this.selectBox[index].val).toFixed(2));
				});
			},
      save(type) {
				let _vm = this;
				_vm.useDebt = type;
        _vm.$refs['formAdd'].validate((valid) => {
          if (valid) {
						_vm.saveLoad = true;
						const list = _vm.selectBox.filter(item => item.id !== '');
						const sum = list.reduce((prev, cur) => cur.val + prev, _vm.formAdd.cash);
						_vm.formAdd.debt = (_vm.formShow.debtAmount - sum).toFixed(2);
						for(let i = 0; i < list.length; i++) {
							_vm.formAdd['card' + (i + 1)] = list[i].val;
							_vm.formAdd['cardCategory' + (i + 1) + 'Id'] = list[i].id;
						}
            _vm.$http.post({
							url: 'guard-webManager/cashierDesk/repaymentEdit.jhtml',
              data: _vm.formAdd,
              success: function (res) {
                if (res.data.code === 0) {
                  let breadData = [
										{
                      url: '/desktop',
                      text: 'layoutNav.desk'
                    },
                    {
                      url: '/cashierDesk',
                      text: 'layoutNav.cashierDesk'
                    },
                    {
                      url: '/printView',
                      text: 'printView.tit'
                    }
                  ]
                  _vm.$store.dispatch('setBreadData', breadData)
                  _vm.$router.push({
                    path: '/printView',
                    query: {
                      id: res.data.content.id,
                      type: res.data.content.type,
                    }
                  })
                } else {
                  if(_vm.langRouterKey !== 'repayment') {
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
                  _vm.saveLoad = false
                }
              },
              error: function (res) {
                console.log(res);
              }
            });
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
  .sumCount {
    padding: 15px 0;
  }

  .sumCount span {
    margin: 0px 15px;
  }

</style>
