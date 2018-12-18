/** 
 * 退预收款单收银 
 */
<template>
  <div class="container-box">
    <div class="container-header">
      <h2>{{$t('cashierDepositRebateOrder')}}</h2>
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
        <Form-item :label="$t('cashierDesk.label12')">
          <span>{{showAmount}}</span>
        </Form-item>
        <Form-item :label="$t('cashierDesk.label4')" prop="cash" required>
          <cmptInputNumber :max="formShow.amount" :min="0" v-model="formAdd.cash" style="width:300px" @on-change='setCard'></cmptInputNumber>
        </Form-item>
        <Form-item :label="$t('cashierDesk.label5')" required prop="cardCategoryId">
          <Select v-model="formAdd.cardCategoryId" style="width:200px" @on-change='setCardId'>
            <Option v-for="item in cardList" :value="item.id" :key="item.id" :disabled="item.status === 0">{{item.name}}</Option>
          </Select>
          <cmptInputNumber :max="formShow.amount" :min="0" v-model="formAdd.card" @on-change='setCard1'></cmptInputNumber>
        </Form-item>
        <Form-item :label="$t('labelPublic.ms')" prop="remark">
          <Input v-model="formAdd.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('placeholderPublic.input')"></Input>
        </Form-item>
      </Form>
    </div>
    <div class="footer-btnGroup">
      <Button type="primary" icon="checkmark" @click="save" :loading='saveLoad'>{{$t('publicSet.save')}}</Button>
      <Button type="primary" icon="android-arrow-back" @click='back'>{{$t('publicSet.back')}}</Button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      const validateMoney = (rule, value, callback) => {
				const sum = this.formAdd.cardCategoryId
					? this.formAdd.cash + this.formAdd.card
					: this.formAdd.cash;
        if (sum.toFixed(2) !== this.formShow.amount.toFixed(2)) {
          callback(new Error(this.$t('cashierDesk.valid1', [this.formShow.amount])));
        } else {
          callback();
        }
      };
      const validateChange = (rule, value, callback) => {
        if (value === '' && this.formAdd.card > 0) {
          callback(new Error(this.$t('cashierDesk.valid2')));
        } else {
          callback();
        }
      };
      return {
        saveLoad: false,
        formAdd: {
          id: '',
          cash: 0,
          card: 0,
          cardCategoryId: '',
          remark: '',
        },
        cardList: [],
        formShow: {},
        col: [
					{
						title: this.$t('labelPublic.bh'),
						width: 60,
            key: 'id'
          },
          {
						title: this.$t('labelPublic.lx'),
						width: 100,
            key: 'depositChargeName',
          },
          {
            title: this.$t('cashierDesk.colTit4'),
            key: 'amount',
						width: 60,
						align: 'right',
            render: (h, params) => {
							if(Number.isFinite(params.row.amount)) {
								return h('span', params.row.amount.toFixed(2));
							}
            }
          },
				],
				data: [],
        ruleForm: {
          cash: [{
            validator: validateMoney,
            trigger: 'blur'
          }],
          deposit: [{
            validator: validateMoney,
            trigger: 'blur'
          }],
          cardCategoryId: [{
            validator: validateChange,
            trigger: 'change'
          }],
        }
      }
    },
    computed: {
      showAmount() {
        if(Number.isFinite(this.formShow.amount)) {
					return this.formShow.amount.toFixed(2);
				}
			},
			langRouterKey () {
        return this.$store.getters.getLandRouterKey;
      },
		},
		watch: {
      langRouterKey (val) {
        if(val === 'cashierDepositRebateOrder') {
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
          url: 'guard-webManager/cashierDesk/cashierDepositRebateOrder.jhtml',
          data: {
            id: id
          },
          success: function (res) {
            const obj = res.data.content || {};
            const _data = obj.detailList || [];
            const _col = _vm.tableCount(_data, ['amount']);
            _col.map(item => {
              const index = _vm.col.findIndex(col => col.key === item.key);
              console.log(item)
              if(index >= 0) {
                _vm.col[index].width = item.width;
              }
            });
            if(_vm.langRouterKey !== 'cashierDepositRebateOrder') {
              _vm.formShow = {...obj};
              _vm.data = _data;
              _vm.formShow.amount = obj.amount || 0;
              _vm.formAdd.cash = obj.amount || 0;
            } else {
              _vm.requestList([obj], ['remark']).then(res => {
                _vm.formShow = {...res[0]};
                _vm.formShow.amount = obj.amount || 0;
                _vm.formAdd.cash = obj.amount || 0;
              });
              _vm.requestList(_data, ['depositChargeName']).then(res => _vm.data = res);
            }
            _vm.$store.dispatch('setPageLoading', 1);
          },
          error: function (res) {
            console.log(res);
          }
        });
      },
      setCard(val) {
        this.$nextTick(() => {
          this.formAdd.cash = parseFloat((val).toFixed(2))
					this.formAdd.card = parseFloat((this.formShow.amount - parseFloat((val).toFixed(2))).toFixed(2))
					this.$refs.formAdd.validateField('cash');
        })
			},
			setCardId() {
				this.$refs.formAdd.validateField('cash');
			},
      setCard1(val) {
        this.$nextTick(() => {
					this.formAdd.card = parseFloat((val).toFixed(2))
					this.$refs.formAdd.validateField('cash');
        })
      },
      //获取银行卡
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
      save() {
        var _vm = this
        _vm.$refs['formAdd'].validate((valid) => {
          if (valid) {
            _vm.saveLoad = true
            _vm.$http.post({
              url: 'guard-webManager/cashierDesk/depositRebateOrderEdit.jhtml',
              data: _vm.formAdd,
              success: function (res) {
                if (res.data.code === 0) {
                  console.log(res)
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
                  if(_vm.langRouterKey !== 'cashierDepositRebateOrder') {
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
