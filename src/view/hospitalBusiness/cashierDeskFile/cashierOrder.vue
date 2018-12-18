/** 
 * 项目订单收银 
 */
<template>
  <div class="container-box">
    <div class="container-header">
      <h2>{{$t('cashierOrder')}}</h2>
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
          <span>{{showAmount}}</span>
        </Form-item>
        <Form-item :label="$t('cashierDesk.label6')">
          <span>{{showDiscount}}</span>
        </Form-item>
        <Form-item :label="$t('cashierDesk.label9')">
          <Table stripe :columns="col1" :data="data1" v-show='data1.length'></Table>
          <p class="sumCount" v-show='data1.length'>{{$t('cashierDesk.label2')}}
            <span>{{$t('cashierDesk.label7')}}: {{depositAll.toFixed(2)}}</span>
          </p>
          <p v-show='data1.length === 0'>{{$t('cashierDesk.msg1')}}</p>
        </Form-item>
        <Form-item :label="$t('cashierDesk.label10')">
          <Table stripe :columns="col2" :data="data2" v-show='data2.length'></Table>
          <p class="sumCount" v-show='data2.length'>{{$t('cashierDesk.label2')}}
            <span>{{$t('cashierDesk.label7')}}: {{couAll.toFixed(2)}}</span>
          </p>
          <p v-show='data2.length === 0'>{{$t('cashierDesk.msg2')}}</p>
        </Form-item>
        <Form-item :label="$t('cashierDesk.label4')" prop="cash" required>
          <cmptInputNumber :max="formShow.finalprice" :min="0" v-model="formAdd.cash" style="width:300px" @on-change='setCard'></cmptInputNumber>
        </Form-item>
        <Form-item :label="coinName" prop="virtualCurrencyBalance" required v-show='coinOpenKey'>
          <cmptInputNumber :min="0" :max='coinMax' v-model="formAdd.virtualCurrencyBalance" style="width:110px" @on-change='setCoin' :readonly='coinUseKey'></cmptInputNumber>
          <span style='margin: 0 10px'>当前可用余额{{coinMax}}</span>
          <Button type="primary" size='small' @click="getCoin">获取最新余额</Button>
        </Form-item>
        <Form-item :label="$t('cashierDesk.label5')" required prop="cardCategory1Id">
          <div style="margin-bottom: 10px;" v-for='(card, index) in selectBox' :key='index'>
            <Select v-model="card.id" style="width:200px">
              <Option v-for="item in cardList" :value="item.id" :key="item.id" :disabled="item.status === 0">{{item.name}}</Option>
            </Select>
            <cmptInputNumber :max="formShow.finalprice" :min="0" v-model="card.val" @on-change='setCardVal(index)'></cmptInputNumber>
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
      <Button type="error" icon="checkmark" @click="save(true)" v-if='key' :loading='saveLoad'>{{$t('cashierDesk.btn6')}}</Button>
      <Button type="primary" icon="checkmark" @click="save(false)" :loading='saveLoad'>{{$t('cashierDesk.btn5')}}</Button>
      <Button type="primary" icon="android-arrow-back" @click='back'>{{$t('publicSet.back')}}</Button>
    </div>
    <Modal
      title="获取余额"
      v-model="modalCoin"
      :closable="false"
      @on-ok="okCoin"
      :loading="loadingCoin"
      class-name="vertical-center-modal">
      <Form ref="formCoin" :model="formCoin" :rules="ruleForm1" :label-width="100" label-position="right" @submit.native.prevent>
        <Form-item label="财富码" prop="paymentCode" required>
          <Input v-model.trim="formCoin.paymentCode" placeholder="请输入财富码" :maxlength='20'></Input>
        </Form-item>
      </Form>
    </Modal>
  </div>
</template>

<script>
  export default {
    data() {
      const validateMoney = (rule, value, callback) => {
        const list = this.selectBox.filter(item => item.id !== '');
        const amount = list.reduce((prev, cur) => cur.val + prev, this.formAdd.cash);
        const sum = amount + this.depositAll + this.couAll + this.formAdd.virtualCurrencyBalance;
        if (!this.useDebt) {
          if (sum.toFixed(2) !== this.formShow.finalprice.toFixed(2)) {
            callback(new Error(this.$t('cashierDesk.valid1', [this.formShow.finalprice])));
          } else {
            callback();
          }
        } else {
          if (sum.toFixed(2) >= this.formShow.finalprice) {
            callback(new Error(this.$t('cashierDesk.valid4', [this.formShow.finalprice])));
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
      const validateCoin = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入财富码'));
        } else {
          callback();
        }
      };
      return {
        saveLoad: false,
        key: false,
        useDebt: false,
        showDiscount: '',
        formAdd: {
          id: '',
          cash: 0,
          virtualCurrencyBalance: 0,
          distributionUserID: '',
          deposit: '',
          coupon: '',
          debt: '',
          depositListStr: '',
          couponListStr: '',
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
            title: this.$t('cashierDesk.label6'),
            width: 60,
            render: (h, params) => {
              if (params.row.finalPrice < params.row.price) {
                return h('span', (params.row.finalPrice / params.row.price * 100).toFixed(2) + '%');
              } else {
                return h('span', this.$t('cashierDesk.label11'));
              }
            }
          },
          {
            title: this.$t('cashierDesk.colTit10'),
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
            title: this.$t('cashierDesk.label3'),
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
        col1: [
          {
            title: this.$t('labelPublic.yy'),
            width: 60,
            key: 'hospitalName'
          },
          {
            title: this.$t('labelPublic.mc'),
            width: 60,
            render: (h, params) => {
              const _style = params.row.key 
                ? '' 
                : 'line-through';
              return h('span', {
                style: {
                  textDecoration: _style
                }
              }, params.row.chargeName);
            }
          },
          {
            title: this.$t('cashierDesk.label8'),
            width: 80,
            key: 'rest',
            render: (h, params) => {
              const _style = params.row.key 
                ? '' 
                : 'line-through';
              return h('span', {
                style: {
                  textDecoration: _style
                }
              }, params.row.rest.toFixed(2))
            }
          },
          {
            title: this.$t('cashierDesk.label7'),
            width: 90,
            render: (h, params) => {
              if (params.row.key) {
                return h('cmptInputNumber', {
                  props: {
                    size: 'small',
                    min: 0,
                    max: params.row.rest,
                    value: params.row.amount
                  },
                  on: {
                    'on-change': (val) => {
                      params.row.amount = parseFloat((val).toFixed(2));
                      this.data1[params.index] = params.row;
                    },
                    'on-blur': () => {
                      this.data1.splice(params.index, 1, this.data1[params.index]);
                      this.formAdd.cash = (this.formShow.finalprice - this.depositAll - this.couAll) < 0 
                        ? 0 
                        : parseFloat((this.formShow.finalprice - this.depositAll - this.couAll).toFixed(2));
                    }
                  }
                })
              } else {
                return h('span', params.row.remark);
              }
            }
          },
        ],
        col2: [
          {
            title: this.$t('labelPublic.yy'),
            width: 60,
            key: 'hospitalName'
          },
          {
            title: this.$t('labelPublic.mc'),
            width: 60,
            render: (h, params) => {
              const _style = params.row.key 
                ? '' 
                : 'line-through';
              return h('span', {
                style: {
                  textDecoration: _style
                }
              }, params.row.categoryName);
            }
          },
          {
            title: this.$t('cashierDesk.label8'),
            width: 80,
            key: 'rest',
            render: (h, params) => {
              const _style = params.row.key 
                ? '' 
                : 'line-through';
              return h('span', {
                style: {
                  textDecoration: _style
                }
              }, params.row.rest.toFixed(2));
            }
          },
          {
            title: this.$t('cashierDesk.label7'),
            width: 90,
            key: 'amount',
            render: (h, params) => {
              if (params.row.key) {
                return h('cmptInputNumber', {
                  props: {
                    size: 'small',
                    min: 0,
                    max: params.row.rest,
                    value: params.row.amount
                  },
                  on: {
                    'on-change': (val) => {
                      params.row.amount = parseFloat((val).toFixed(2));
                      this.data2[params.index] = params.row;
                    },
                    'on-blur': () => {
                      this.data2.splice(params.index, 1, this.data2[params.index]);
                      this.formAdd.cash = (this.formShow.finalprice - this.depositAll - this.couAll) < 0 
                        ? 0 
                        : parseFloat((this.formShow.finalprice - this.depositAll - this.couAll).toFixed(2));
                    }
                  }
                })
              } else {
                return h('span', params.row.remark);
              }
            }
          },
        ],
        data1: [],
        data2: [],
        ruleForm: {
          cash: [{
            validator: validateMoney,
            trigger: 'blur'
          }],
          cardCategory1Id: [{
            validator: validateChange,
            trigger: 'change'
          }],
        },

        coinName: '',
        coinOpenKey: false,
        coinUseKey: true,
        coinMax: 0,

        modalCoin: false,
        loadingCoin: true,
        formCoin: {
          paymentCode: ''
        },
        ruleForm1: {
          paymentCode: [{
            validator: validateCoin,
            trigger: 'blur'
          }],
        },
      }
    },
    computed: {
      showAmount() {
        if(Number.isFinite(this.formShow.finalprice)) {
          return this.formShow.finalprice.toFixed(2);
        }
      },
      depositAll() {
        return this.data1.reduce((pre, cur) => cur.amount + pre, 0);
      },
      couAll() {
        return this.data2.reduce((pre, cur) => cur.amount + pre, 0);
      },
      langRouterKey () {
        return this.$store.getters.getLandRouterKey;
      },
    },
    watch: {
      langRouterKey (val) {
        if(val === 'cashierOrder') {
          this.getList(this.$route.query.id);
        }
      },
    },
    created() {
      this.formAdd.id = this.$route.query.id;
      this.getList(this.$route.query.id);
    },
    mounted() {
      this.getCard();
    },
    methods: {
      getList(id) {
        let _vm = this;
        _vm.$store.dispatch('setPageLoading', -1)
        _vm.$http.getPage({
          url: 'guard-webManager/cashierDesk/cashierOrder.jhtml',
          data: {
            id: id
          },
          success: function (res) {
            const obj = res.data.content.Order || {};
            const data = obj.detailList || [];
            _vm.key = res.data.content.AllowDebt === '1'
              ? true
              : false;
            _vm.showDiscount = res.data.content.Discount || '';
            _vm.coinName = res.data.content.VirtualCurrencyName || '';
            _vm.coinOpenKey = res.data.content.DistributionOpen || false;
            const _col = _vm.tableCount(data, ['price', 'finalPrice']);
            _col.map(item => {
              const index = _vm.col.findIndex(col => col.key === item.key);
              console.log(item)
              if(index >= 0) {
                _vm.col[index].width = item.width;
              }
            });
            if(_vm.langRouterKey !== 'cashierOrder') {
              _vm.formShow = obj;
              _vm.formAdd.cash = obj.finalprice || 0;
              _vm.formShow.finalPrice = obj.finalprice || 0;
              _vm.data = data;
            } else {
              _vm.requestList([obj], ['remark']).then(res => {
                _vm.formShow = {...res[0]};
                _vm.formShow.finalprice = obj.finalprice || 0;
                _vm.formAdd.cash = obj.finalprice || 0;
              });
              _vm.requestList(data, ['chargeName', 'setName']).then(res => _vm.data = res);
            }
            const _depositList = res.data.content.DepositList.map(item => {
              return {
                ...item,
                amount: 0,
                rest: Number.isFinite(item.rest)
                  ? item.rest
                  : 0,
                key: true
              };
            }) || [];
            const _uselectDept = res.data.content.UselessDepositList.map(item => {
              return {
                ...item,
                amount: 0,
                rest: Number.isFinite(item.rest)
                  ? item.rest
                  : 0,
                key: false
              };
            }) || [];
            _vm.data1 = [..._depositList, ..._uselectDept];

            const _couponList = res.data.content.CouponList.map(item => {
              return {
                ...item,
                amount: 0,
                rest: Number.isFinite(item.rest)
                  ? item.rest
                  : 0,
                key: true
              };
            }) || [];
            const _uselectCou = res.data.content.UselessCouponList.map(item => {
              return {
                ...item,
                amount: 0,
                rest: Number.isFinite(item.rest)
                  ? item.rest
                  : 0,
                key: false
              };
            }) || [];
            _vm.data2 = [..._couponList, ..._uselectCou];
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
              _vm.cardList = res.data.content || [];
            }
          },
          error: function (res) {
            console.log(res);
          }
        });
      },
      setCard(val) {
        this.$nextTick(() => {
          this.formAdd.cash = parseFloat((val).toFixed(2))
          this.selectBox[0].val = (this.formShow.finalprice - parseFloat((val).toFixed(2)) - this.depositAll - this.couAll) < 0 
            ? 0 
            : parseFloat((this.formShow.finalprice - parseFloat((val).toFixed(2)) - this.depositAll - this.couAll)
              .toFixed(2));
        })
      },
      setCoin(val) {
        this.$nextTick(() => {
          this.formAdd.virtualCurrencyBalance = parseFloat((val).toFixed(2));
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
      //虚拟币
      getCoin() {
        this.$refs.formCoin.resetFields();
        this.modalCoin = true;
      },
      okCoin() {
        let _vm = this;
        _vm.$refs.formCoin.validate((valid) => {
          if (valid) {
            _vm.$http.post({
              url: 'guard-webManager/distributionUser/findVirtualCurrencyBalanceByPaymentCode.jhtml',
              data: _vm.formCoin,
              success: function(res){
                if(res.data.code === 0 ){
                  _vm.formAdd.distributionUserID = res.data.content.distributionUserID || '';
                  _vm.formAdd.virtualCurrencyBalance = 0;
                  _vm.coinMax = res.data.content.amount >= 0 ? res.data.content.amount : 0;
                  _vm.coinUseKey = false;
                  _vm.modalCoin = false;
                } else {
                  _vm.$Notice.error({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: res.data.desc
                  });
                  _vm.loadingCoin = false
                  _vm.$nextTick(() => {
                    _vm.loadingCoin = true;
                  })
                }
              },
              error: function(res){
                console.log(res);
              }
            });
          } else {
            _vm.loadingCoin = false
            _vm.$nextTick(() => {
              _vm.loadingCoin = true
            })
          }
        })
      },
      save(type) {
        let _vm = this;
        _vm.useDebt = type;
        _vm.$refs['formAdd'].validate((valid) => {
          if (valid) {
            const depositList = _vm.data1.filter(item => item.key).map(item => {
              return {
                depositID: item.id,
                amount: item.amount
              }
            });
            const couList = _vm.data2.filter(item => item.key).map(item => {
              return {
                couponID: item.id,
                amount: item.amount
              }
            });
            const list = _vm.selectBox.filter(item => item.id !== '');
            const amount = list.reduce((prev, cur) => cur.val + prev, _vm.formAdd.cash);
            const sum = amount + this.depositAll + this.couAll + _vm.formAdd.virtualCurrencyBalance;
            _vm.formAdd.depositListStr = JSON.stringify(depositList);
            _vm.formAdd.couponListStr = JSON.stringify(couList);
            _vm.formAdd.deposit = _vm.depositAll.toFixed(2);
            _vm.formAdd.coupon = _vm.couAll.toFixed(2);
            _vm.formAdd.debt = (_vm.formShow.finalprice - sum).toFixed(2);
            for(let i = 0; i < list.length; i++) {
							_vm.formAdd['card' + (i + 1)] = list[i].val;
							_vm.formAdd['cardCategory' + (i + 1) + 'Id'] = list[i].id;
						}
            _vm.saveLoad = true
            _vm.$http.post({
              url: 'guard-webManager/cashierDesk/orderEdit.jhtml',
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
                  if(_vm.langRouterKey !== 'cashierOrder') {
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
